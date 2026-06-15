const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all history folders for App.tsx in TA UNILAND...');

try {
  const folders = fs.readdirSync(historyDir);
  let count = 0;
  for (const folder of folders) {
    const entriesPath = path.join(historyDir, folder, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
      if (data.resource) {
        const resLower = data.resource.toLowerCase();
        if (resLower.includes('ta%20uniland') && resLower.includes('app.tsx')) {
          console.log(`Folder: ${folder} | URI: ${data.resource}`);
          count++;
          
          if (data.entries && Array.isArray(data.entries)) {
            data.entries.forEach(entry => {
              console.log(`  - Entry: ${entry.id} | Time: ${new Date(entry.timestamp).toLocaleString('id-ID')}`);
            });
          }
        }
      }
    }
  }
  console.log(`Total matching App.tsx folders found: ${count}`);
} catch (err) {
  console.error(err.message);
}
