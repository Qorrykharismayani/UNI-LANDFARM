const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      walk(fullPath, results);
    } else {
      results.push({ path: fullPath, size: stat.size });
    }
  });
  return results;
}

console.log('Listing all files in src/app...');
if (fs.existsSync('src/app')) {
  const files = walk('src/app');
  files.forEach(f => {
    console.log(`File: ${f.path} (${f.size} bytes)`);
  });
} else {
  console.log('src/app does not exist');
}
