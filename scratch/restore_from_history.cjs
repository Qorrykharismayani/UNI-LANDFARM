const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';
const targetFileUri = 'file:///c%3A/Users/acer/Downloads/uni-landfarm-landing-page/src/App.tsx';
const targetFileUriAlt = 'file:///c:/Users/acer/Downloads/uni-landfarm-landing-page/src/App.tsx';

console.log('Searching VS Code Local History...');

let matches = [];

try {
  const folders = fs.readdirSync(historyDir);
  for (const folder of folders) {
    const folderPath = path.join(historyDir, folder);
    const entriesPath = path.join(folderPath, 'entries.json');
    
    if (fs.existsSync(entriesPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
        const resource = data.resource ? data.resource.toLowerCase() : '';
        
        if (resource.includes('uni-landfarm-landing-page') && resource.includes('app.tsx')) {
          console.log(`Found match in folder: ${folder}`);
          if (data.entries && Array.isArray(data.entries)) {
            for (const entry of data.entries) {
              const filePath = path.join(folderPath, entry.id);
              if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                matches.push({
                  folder,
                  id: entry.id,
                  timestamp: entry.timestamp,
                  timeString: new Date(entry.timestamp).toLocaleString('id-ID'),
                  filePath,
                  size: stats.size
                });
              }
            }
          }
        }
      } catch (err) {
        // Skip malformed JSON
      }
    }
  }
} catch (err) {
  console.error('Error reading history directory:', err.message);
}

if (matches.length === 0) {
  console.log('No backups of App.tsx found in VS Code Local History.');
  process.exit(1);
}

// Sort matches by timestamp descending (latest first)
matches.sort((a, b) => b.timestamp - a.timestamp);

console.log('\n--- MATCHING BACKUPS FOUND (Latest first) ---');
matches.slice(0, 10).forEach((m, idx) => {
  console.log(`[${idx}] File: ${m.filePath} | Waktu: ${m.timeString} | Size: ${m.size} bytes`);
});

// Find the latest backup before our edits. Our first edit was around 22:20 on May 30, 2026.
// Let's filter backups that are before May 30, 2026, 22:20 (1780154400000 or similar).
// Let's print out the recommended restoration file.
// We can automatically restore the latest backup from *before* our edits!
// Our session started at around 22:15 today.
const sessionStartTimestamp = new Date('2026-05-30T22:15:00+07:00').getTime();

const backupsBeforeSession = matches.filter(m => m.timestamp < sessionStartTimestamp);

if (backupsBeforeSession.length > 0) {
  const bestBackup = backupsBeforeSession[0];
  console.log(`\nRecommended backup to restore (from before edits): ${bestBackup.timeString}`);
  
  const destPath = path.join(__dirname, '..', 'src', 'App.tsx');
  fs.copyFileSync(bestBackup.filePath, destPath);
  console.log(`SUCCESS: Restored App.tsx to state from ${bestBackup.timeString}!`);
} else {
  // If no backups before session, fall back to matches[0] if the user wants
  console.log('\nNo backups found from before the session started.');
  if (matches.length > 0) {
    console.log(`Latest backup available: ${matches[0].timeString}`);
  }
}
