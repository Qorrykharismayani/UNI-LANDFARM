const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Q O R Y\\.gemini\\antigravity\\brain\\908acbc7-d936-4148-9148-2ed5d8999e8f';
const destDir = 'd:\\Uni-LandFarm\\public';

const srcFile = 'media__1782045753844.jpg';
const destFile = 'bca_mobile.jpg';

const srcPath = path.join(srcDir, srcFile);
const destPath = path.join(destDir, destFile);

if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, destPath);
  console.log(`Successfully replaced ${destFile} with ${srcFile}`);
} else {
  console.log(`Source file not found: ${srcPath}`);
}
