const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Locating backup files in history...');

try {
  const folders = fs.readdirSync(historyDir);
  for (const folder of folders) {
    const folderPath = path.join(historyDir, folder);
    if (fs.existsSync(path.join(folderPath, 'wV8N.tsx'))) {
      console.log(`Found wV8N.tsx in: ${folderPath}`);
    }
    if (fs.existsSync(path.join(folderPath, 'lJ00.tsx'))) {
      console.log(`Found lJ00.tsx in: ${folderPath}`);
    }
    if (fs.existsSync(path.join(folderPath, 'ZKzY.tsx'))) {
      console.log(`Found ZKzY.tsx in: ${folderPath}`);
    }
    if (fs.existsSync(path.join(folderPath, '57Xb.tsx'))) {
      console.log(`Found 57Xb.tsx in: ${folderPath}`);
    }
  }
} catch (err) {
  console.error(err.message);
}
