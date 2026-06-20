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

function resolveConflicts(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalLength = content.length;
  
  // Double conflict pattern
  const doubleRegex = /<<<<<<< HEAD\r?\n<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [a-f0-9]+\r?\n=======\r?\n[\s\S]*?>>>>>>> [a-zA-Z0-9_\-]+\r?\n/g;
  content = content.replace(doubleRegex, '$1');

  // Single conflict pattern
  const singleRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [a-zA-Z0-9_\-]+\r?\n/g;
  content = content.replace(singleRegex, '$1');
  
  // Single conflict pattern (with hash)
  const hashRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [a-f0-9]+\r?\n/g;
  content = content.replace(hashRegex, '$1');
  
  if (content.length !== originalLength) {
    fs.writeFileSync(filePath, content);
    console.log(`Resolved conflicts in ${filePath}`);
  }
}

walkDir('src/components', resolveConflicts);
walkDir('src/app', resolveConflicts);
