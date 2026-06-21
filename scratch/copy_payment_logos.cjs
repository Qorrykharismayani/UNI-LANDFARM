const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Q O R Y\\.gemini\\antigravity\\brain\\908acbc7-d936-4148-9148-2ed5d8999e8f';
const destDir = 'd:\\Uni-LandFarm\\public';

const files = [
  'media__1782045363557.jpg',
  'media__1782045363558.jpg',
  'media__1782045374081.jpg',
  'media__1782045374082.jpg',
  'media__1782045379660.jpg'
];

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

files.forEach((file, index) => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to ${destPath}`);
  } else {
    console.log(`File not found: ${srcPath}`);
  }
});
