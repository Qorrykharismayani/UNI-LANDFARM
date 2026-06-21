const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../src'),
  path.join(__dirname, '../prisma')
];
const rootFiles = [
  path.join(__dirname, '../README.md')
];

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/Uni-LandFarm/g, 'UNI-LandFarm');
  newContent = newContent.replace(/Uni-LanFaram/g, 'UNI-LandFarm');
  newContent = newContent.replace(/uni-lanfaram/gi, 'UNI-LandFarm');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md') || fullPath.endsWith('.json')) {
      replaceInFile(fullPath);
    }
  }
}

for (const dir of directories) {
  walkDir(dir);
}
for (const file of rootFiles) {
  replaceInFile(file);
}
