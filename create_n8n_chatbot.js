/**
 * This script creates an AI Chatbot n8n workflow programmatically via the n8n REST API.
 * 
 * Automation Description: 
 * An AI Chatbot that uses:
 * - Chat Trigger: For browser interaction.
 * - AI Agent: Conversational agent node.
 * - OpenAI Chat Model: Configured with gpt-4o.
 * - Window Buffer Memory: To remember conversation history.
 *
 * Usage:
 * N8N_API_KEY="your_api_key_here" N8N_HOST="http://localhost:5678" node create_n8n_chatbot.js
 */

async function createChatbot() {
  const apiKey = process.env.N8N_API_KEY;
  const host = process.env.N8N_HOST || 'http://localhost:5678';

  if (!apiKey) {
    console.error("\n❌ Error: Please set the N8N_API_KEY environment variable.");
    process.exit(1);
  }

  const workflowPayload = {
    name: "AI Chatbot (GPT-4o)",
    nodes: [
      {
        parameters: {
          options: {}
        },
        id: "chat-trigger-id",
        name: "Chat Trigger",
        type: "n8n-nodes-base.chatTrigger",
        typeVersion: 1.1,
        position: [100, 300]
      },
      {
        parameters: {
          options: {}
        },
        id: "ai-agent-id",
        name: "AI Agent",
        type: "n8n-nodes-base.aiAgent",
        typeVersion: 1.6,
        position: [400, 300]
      },
      {
        parameters: {
          model: "gpt-4o",
          options: {}
        },
        id: "openai-model-id",
        name: "OpenAI Chat Model",
        type: "n8n-nodes-base.lmChatOpenAi",
        typeVersion: 1,
        position: [350, 500]
      },
      {
        parameters: {
          options: {}
        },
        id: "memory-id",
        name: "Window Buffer Memory",
        type: "n8n-nodes-base.memoryBufferWindow",
        typeVersion: 1,
        position: [500, 500]
      }
    ],
    connections: {
      "Chat Trigger": {
        main: [
          [
            {
              node: "AI Agent",
              type: "main",
              index: 0
            }
          ]
        ]
      },
      "OpenAI Chat Model": {
        ai_languageModel: [
          [
            {
              node: "AI Agent",
              type: "ai_languageModel",
              index: 0
            }
          ]
        ]
      },
      "Window Buffer Memory": {
        ai_memory: [
          [
            {
              node: "AI Agent",
              type: "ai_memory",
              index: 0
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
      console.log('✅ AI Chatbot workflow successfully created!');
      console.log(`   Workflow ID: ${data.id}`);
      console.log(`   You can view it at: ${host}/workflow/${data.id}\n`);
    } else {
      console.error('❌ Failed to create workflow.');
      console.error(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('❌ Error communicating with n8n API:', error.message);
  }
}

createChatbot();
