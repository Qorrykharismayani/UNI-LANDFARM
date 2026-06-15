const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all VS Code History folders for files containing "cmsNavMode"...');

try {
  const folders = fs.readdirSync(historyDir);
  let count = 0;
  const matches = [];

  for (const folder of folders) {
    const entriesPath = path.join(historyDir, folder, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
        if (data.resource) {
          const decoded = decodeURIComponent(data.resource);
          if (data.entries && Array.isArray(data.entries)) {
            for (const entry of data.entries) {
              const filePath = path.join(historyDir, folder, entry.id);
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                if (content.includes('cmsNavMode') || content.includes('Pusat Panduan AI')) {
                  const stats = fs.statSync(filePath);
                  matches.push({
                    folder,
                    id: entry.id,
                    timestamp: entry.timestamp,
                    timeString: new Date(entry.timestamp).toLocaleString('id-ID'),
                    resource: decoded,
                    filePath,
                    size: stats.size
                  });
                }
              }
            }
          }
        }
      } catch (err) {
        // Skip malformed
      }
    }
  }

  // Sort matches by timestamp descending
  matches.sort((a, b) => b.timestamp - a.timestamp);

  console.log(`Found ${matches.length} matching file entries:`);
  matches.forEach((m, idx) => {
    console.log(`[${idx}] Folder: ${m.folder} | Entry: ${m.id} | Resource: ${m.resource} | Time: ${m.timeString} | Size: ${m.size} bytes`);
  });

} catch (err) {
  console.error(err.message);
}
