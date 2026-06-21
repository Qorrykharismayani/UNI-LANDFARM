const fs = require('fs');
const path = require('path');

const dir = 'd:\\Uni-LandFarm\\public';
const files = [
  'media__1782045363557.jpg',
  'media__1782045363558.jpg',
  'media__1782045374081.jpg',
  'media__1782045374082.jpg',
  'media__1782045379660.jpg'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`${file} does not exist`);
    return;
  }
  const buffer = fs.readFileSync(filePath);
  const content = buffer.toString('binary').toLowerCase();
  
  const keywords = ['bni', 'gopay', 'bca', 'bri', 'mandiri'];
  const matches = [];
  keywords.forEach(kw => {
    if (content.includes(kw)) {
      matches.push(kw);
    }
  });
  
  console.log(`${file}: size=${buffer.length} matches=${matches.join(', ')}`);
});
