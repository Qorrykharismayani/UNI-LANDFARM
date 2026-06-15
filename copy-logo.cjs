const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\711033ca-0229-4ef5-a721-e120829282fb\\media__1781448829853.png';
const dest = path.join(__dirname, 'public', 'logo.png');

try {
  fs.copyFileSync(src, dest);
  console.log('✅ Logo transparent berhasil disalin ke', dest);
} catch (err) {
  console.error('❌ Error menyalin logo:', err.message);
  process.exit(1);
}
