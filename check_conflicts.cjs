const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function checkConflicts(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  let inConflict = false;
  let conflictLines = [];
  let conflictCount = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('<<<<<<<')) {
      inConflict = true;
      conflictCount++;
    }
    if (inConflict) {
      conflictLines.push(`${i+1}: ${lines[i]}`);
    }
    if (lines[i].startsWith('>>>>>>>')) {
      inConflict = false;
      conflictLines.push('---');
    }
  }
  if (conflictCount > 0) {
    console.log(`\n=== ${filePath} (${conflictCount} conflicts) ===`);
    console.log(conflictLines.join('\n'));
  }
}

walkDir('src/components', checkConflicts);
walkDir('src/app', checkConflicts);
