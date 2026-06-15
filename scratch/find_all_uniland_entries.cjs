const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all history entries for uni-landfarm-landing-page...');

try {
  const folders = fs.readdirSync(historyDir);
  let count = 0;
  for (const folder of folders) {
    const entriesPath = path.join(historyDir, folder, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
      if (data.resource && data.resource.toLowerCase().includes('uni-landfarm')) {
        console.log(`Folder: ${folder} | URI: ${data.resource}`);
        count++;
      }
    }
  }
  console.log(`Total matching project folders found: ${count}`);
} catch (err) {
  console.error(err.message);
}
