const fs = require('fs');
const path = require('path');

const dir = 'd:\\Uni-LandFarm\\public';

const mapping = {
  'media__1782045363557.jpg': 'bni.jpg',
  'media__1782045363558.jpg': 'gopay.jpg',
  'media__1782045374081.jpg': 'bca.jpg',
  'media__1782045374082.jpg': 'bri.jpg',
  'media__1782045379660.jpg': 'mandiri.jpg'
};

Object.entries(mapping).forEach(([srcName, destName]) => {
  const srcPath = path.join(dir, srcName);
  const destPath = path.join(dir, destName);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied/Renamed ${srcName} to ${destPath}`);
  } else {
    console.log(`File not found: ${srcPath}`);
  }
});
