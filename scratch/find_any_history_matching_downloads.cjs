const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all history folders for downloads/uni-landfarm-landing-page...');

try {
  const folders = fs.readdirSync(historyDir);
  let count = 0;
  for (const folder of folders) {
    const entriesPath = path.join(historyDir, folder, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
        if (data.resource) {
          const decoded = decodeURIComponent(data.resource).toLowerCase();
          if (decoded.includes('uni-landfarm') || decoded.includes('downloads')) {
            console.log(`Folder: ${folder} | URI: ${decodeURIComponent(data.resource)}`);
            count++;
          }
        }
      } catch (err) {
        // Skip
      }
    }
  }
  console.log(`Total matching history folders found: ${count}`);
} catch (err) {
  console.error(err.message);
}
