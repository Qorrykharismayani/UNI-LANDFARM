const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Scanning history files...');

try {
  const folders = fs.readdirSync(historyDir);
  let count = 0;
  for (const folder of folders) {
    const entriesPath = path.join(historyDir, folder, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
      if (data.resource) {
        console.log(`Folder: ${folder} | URI: ${data.resource}`);
        count++;
        if (count > 25) break;
      }
    }
  }
} catch (err) {
  console.error(err.message);
}
