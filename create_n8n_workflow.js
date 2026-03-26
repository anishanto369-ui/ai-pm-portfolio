/**
 * This script creates an n8n workflow programmatically via the n8n REST API.
 * 
 * Automation Description: 
 * A workflow that runs daily at 9:00 AM. It fetches the current top story 
 * from Hacker News using their public API, gets the story details, and 
 * sends an alert with the title and link to a specified Slack Webhook.
 *
 * Prerequisites:
 * 1. Ensure you have Node.js v18+ installed (for the native fetch API).
 * 2. Set N8N_HOST to your n8n instance url (e.g. http://localhost:5678).
 * 3. Set N8N_API_KEY to your n8n API key.
 * 4. (Optional) Replace YOUR_SLACK_WEBHOOK_URL in the script with a real one.
 * 
 * Usage:
 * N8N_API_KEY="your_api_key_here" N8N_HOST="http://localhost:5678" node create_n8n_workflow.js
 */

async function createWorkflow() {
  const apiKey = process.env.N8N_API_KEY;
  const host = process.env.N8N_HOST || 'http://localhost:5678';

  if (!apiKey) {
    console.error("\n❌ Error: Please set the N8N_API_KEY environment variable.");
    console.error("Usage example:");
    console.error('N8N_API_KEY="your_key" N8N_HOST="http://localhost:5678" node create_n8n_workflow.js\n');
    process.exit(1);
  }

  // The workflow definition (n8n JSON structure) - we send this to the API, avoiding outputting a raw JSON file.
  const workflowPayload = {
    name: "Hacker News Daily Top Story to Slack",
    nodes: [
      {
        parameters: {
          rule: {
            interval: [
              {
                field: "cronExpression",
                expression: "0 9 * * *"
              }
            ]
          }
        },
        name: "Schedule Trigger",
        type: "n8n-nodes-base.scheduleTrigger",
        typeVersion: 1.1,
        position: [250, 300]
      },
      {
        parameters: {
          url: "https://hacker-news.firebaseio.com/v0/topstories.json",
          options: {}
        },
        name: "Fetch Top Stories",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.1,
        position: [450, 300]
      },
      {
        parameters: {
          url: "={{'https://hacker-news.firebaseio.com/v0/item/' + $json[0] + '.json'}}",
          options: {}
        },
        name: "Fetch Top Story Details",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.1,
        position: [650, 300]
      },
      {
        parameters: {
          method: "POST",
          url: "YOUR_SLACK_WEBHOOK_URL",
          sendBody: true,
          bodyParameters: {
            parameters: [
              {
                name: "text",
                value: "={{'🚀 Top HN Story: ' + $json.title + '\\nURL: ' + $json.url}}"
              }
            ]
          },
          options: {}
        },
        name: "Send to Slack",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.1,
        position: [850, 300]
      }
    ],
    connections: {
      "Schedule Trigger": {
        "main": [
          [
            {
              "node": "Fetch Top Stories",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Fetch Top Stories": {
        "main": [
          [
            {
              "node": "Fetch Top Story Details",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Fetch Top Story Details": {
        "main": [
          [
            {
              "node": "Send to Slack",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    settings: {
      executionOrder: "v1"
    }
  };

  try {
    console.log(`\nConnecting to n8n instance at ${host}...`);
    const response = await fetch(`${host}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-N8N-API-KEY': apiKey
      },
      body: JSON.stringify(workflowPayload)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Workflow successfully created via n8n API!');
      console.log(`   Workflow ID: ${data.id}`);
      console.log(`   Name: ${data.name}`);
      console.log(`   You can view it at: ${host}/workflow/${data.id}\n`);
    } else {
      console.error('❌ Failed to create workflow.');
      console.error(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('❌ Error communicating with n8n API:', error.message);
  }
}

createWorkflow();
