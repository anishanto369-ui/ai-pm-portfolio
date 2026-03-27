const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const INPUT_DIR = path.join(__dirname, 'frames');
const OUTPUT_DIR = path.join(__dirname, 'compressed_frames');
const COMPRESSION_QUALITY = 60; // Adjust for <30KB targets

async function compressFrames() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Error: Input directory not found at ${INPUT_DIR}`);
    console.log('Please place your raw frames in the /frames directory first.');
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const files = fs.readdirSync(INPUT_DIR).filter(file => file.match(/\.(png|jpg|jpeg|webp)$/i));
  
  if (files.length === 0) {
    console.log('No valid image files found in the /frames directory.');
    return;
  }

  console.log(`Found ${files.length} frames. Starting heavy WebP compression...`);

  let processed = 0;
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    // Force output to .webp format regardless of input
    const filenameWithoutExt = path.parse(file).name;
    const outputPath = path.join(OUTPUT_DIR, `${filenameWithoutExt}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true }) // Downscale massive 4k sources
        .webp({ quality: COMPRESSION_QUALITY, effort: 6 }) // effort: 6 enables max compression engine
        .toFile(outputPath);
        
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      processed++;
      console.log(`[${processed}/${files.length}] Compressed ${file} -> ${sizeKB}KB`);
    } catch (err) {
      console.error(`Failed to compress ${file}:`, err.message);
    }
  }

  console.log('\nCompression complete! You can now securely upload /compressed_frames to Supabase.');
}

compressFrames();
