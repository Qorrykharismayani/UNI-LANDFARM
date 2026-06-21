const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Q O R Y\\.gemini\\antigravity\\brain\\908acbc7-d936-4148-9148-2ed5d8999e8f';
const destDir = 'd:\\Uni-LandFarm\\public';

const mapping = {
  'media__1782045501343.jpg': 'livin.jpg',
  'media__1782045509255.jpg': 'bca_mobile.jpg',
  'media__1782045552670.jpg': 'ovo.jpg',
  'media__1782045609890.jpg': 'shopeepay.jpg',
  'media__1782045625767.jpg': 'dana.jpg'
};

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

Object.entries(mapping).forEach(([srcName, destName]) => {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcName} to ${destPath}`);
  } else {
    console.log(`File not found: ${srcPath}`);
  }
});
