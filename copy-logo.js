const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\711033ca-0229-4ef5-a721-e120829282fb\\transparent_logo_1781445188909.png';
const dest = path.join(__dirname, 'public', 'logo.png');

try {
  fs.copyFileSync(src, dest);
  console.log('Logo copied successfully to', dest);
} catch (err) {
  console.error('Error copying logo:', err.message);
  process.exit(1);
}

