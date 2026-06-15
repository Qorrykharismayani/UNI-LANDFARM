const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all history folders for any App.tsx...');

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
            console.log(`Folder: ${folder} | URI: ${decodeURIComponent(data.resource)}`);
            count++;
            
            if (data.entries && Array.isArray(data.entries)) {
              data.entries.forEach(entry => {
                console.log(`  - Entry: ${entry.id} | Time: ${new Date(entry.timestamp).toLocaleString('id-ID')} | Size: ${fs.statSync(path.join(historyDir, folder, entry.id)).size} bytes`);
              });
            }
          }
        }
      } catch (err) {
        // Skip malformed entries.json
      }
    }
  }
  console.log(`Total matching App.tsx folders found: ${count}`);
} catch (err) {
  console.error(err.message);
}
