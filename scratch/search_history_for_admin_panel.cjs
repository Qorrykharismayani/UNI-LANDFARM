const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';

console.log('Searching all history folders for "admin_panel" or "Publication Requests"...');

try {
  const folders = fs.readdirSync(historyDir);
  const matches = [];

  for (const folder of folders) {
    const entriesPath = path.join(historyDir, folder, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
        if (data.entries && Array.isArray(data.entries)) {
          for (const entry of data.entries) {
            const filePath = path.join(historyDir, folder, entry.id);
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf8');
              if (content.includes('admin_panel') || content.includes('Publication Requests') || content.includes('Peninjauan Situs')) {
                const stats = fs.statSync(filePath);
                matches.push({
                  folder,
                  id: entry.id,
                  timestamp: entry.timestamp,
                  timeString: new Date(entry.timestamp).toLocaleString('id-ID'),
                  resource: decodeURIComponent(data.resource || ''),
                  filePath,
                  size: stats.size
                });
              }
            }
          }
        }
      } catch (err) {
        // Skip
      }
    }
  }

  // Sort matches by timestamp descending
  matches.sort((a, b) => b.timestamp - a.timestamp);

  console.log(`Found ${matches.length} matching file entries in local history:`);
  matches.forEach((m, idx) => {
    console.log(`[${idx}] Folder: ${m.folder} | Entry: ${m.id} | Resource: ${m.resource} | Time: ${m.timeString} | Size: ${m.size} bytes`);
  });

} catch (err) {
  console.error(err.message);
}
