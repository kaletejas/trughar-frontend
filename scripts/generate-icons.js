const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '../public/icon.png');

async function generate() {
  await sharp(input)
    .resize(192, 192, { fit: 'contain', background: { r: 75, g: 45, b: 53, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/icon-192x192.png'));
  console.log('✅ Generated icon-192x192.png');

  await sharp(input)
    .resize(512, 512, { fit: 'contain', background: { r: 75, g: 45, b: 53, alpha: 1 } })
    .toFile(path.join(__dirname, '../public/icon-512x512.png'));
  console.log('✅ Generated icon-512x512.png');
}

generate().catch(console.error);
