const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\acer\\AppData\\Roaming\\Code\\User\\History';
const targetFolder = path.join(historyDir, '636d1b26');
const destDir = path.join(__dirname); // scratch folder

console.log(`Copying files from ${targetFolder} to ${destDir}...`);

try {
  if (fs.existsSync(targetFolder)) {
    const files = fs.readdirSync(targetFolder);
    files.forEach(f => {
      const src = path.join(targetFolder, f);
      const dest = path.join(destDir, 'backup_' + f);
      fs.copyFileSync(src, dest);
      console.log(`Copied ${f} to backup_${f}`);
    });
  } else {
    // If not 636d1b26, let's search for any folder in historyDir that has entries.json containing "uni-landfarm-landing-page/src/App.tsx"
    console.log('Target folder does not exist at ' + targetFolder);
    const folders = fs.readdirSync(historyDir);
    for (const folder of folders) {
      const entriesPath = path.join(historyDir, folder, 'entries.json');
      if (fs.existsSync(entriesPath)) {
        const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
        if (data.resource && decodeURIComponent(data.resource).includes('uni-landfarm-landing-page/src/App.tsx')) {
          console.log(`Found correct history folder: ${folder}`);
          const files = fs.readdirSync(path.join(historyDir, folder));
          files.forEach(f => {
            const src = path.join(historyDir, folder, f);
            const dest = path.join(destDir, 'backup_' + f);
            fs.copyFileSync(src, dest);
            console.log(`Copied ${f} to backup_${f}`);
          });
        }
      }
    }
  }
} catch (err) {
  console.error('Error:', err.message);
}
