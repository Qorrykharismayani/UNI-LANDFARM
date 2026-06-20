const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let lines = fs.readFileSync(filePath, 'utf8').split('\n');
  let newLines = [];
  let state = 'NORMAL'; // NORMAL, IN_HEAD, IN_THEIRS
  let hasChanges = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (line.startsWith('<<<<<<< HEAD')) {
      if (state === 'NORMAL') {
        state = 'IN_HEAD';
      }
      hasChanges = true;
      continue;
    }
    
    if (line.startsWith('=======')) {
      if (state === 'IN_HEAD') {
        state = 'IN_THEIRS';
      }
      hasChanges = true;
      continue;
    }
    
    if (line.startsWith('>>>>>>>')) {
      if (state === 'IN_THEIRS' || state === 'IN_HEAD') {
        state = 'NORMAL';
      }
      hasChanges = true;
      continue;
    }
    
    if (state === 'NORMAL' || state === 'IN_HEAD') {
      newLines.push(line);
    }
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log('Fixed', filePath);
  }
}

walkDir('src', processFile);
