const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all history folders for App.tsx entries in any workspace...');

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
          if (decoded.includes('app.tsx')) {
            console.log(`Folder: ${folder}`);
            console.log(`  Resource: ${decodeURIComponent(data.resource)}`);
            if (data.entries && Array.isArray(data.entries)) {
              data.entries.forEach(entry => {
                const entryFilePath = path.join(historyDir, folder, entry.id);
                const exists = fs.existsSync(entryFilePath);
                console.log(`    - Entry: ${entry.id} | Timestamp: ${entry.timestamp} | Date: ${new Date(entry.timestamp).toLocaleString('id-ID')} | Exists: ${exists} | Size: ${exists ? fs.statSync(entryFilePath).size : 0} bytes`);
              });
            }
            count++;
          }
        }
      } catch (err) {
        // Skip
      }
    }
  }
  console.log(`Total App.tsx folders found: ${count}`);
} catch (err) {
  console.error(err.message);
}
