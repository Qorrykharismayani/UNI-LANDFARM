const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/components/pages/CmsPage.tsx');

let content = fs.readFileSync(targetFile, 'utf8');

// Replace specific bumped font sizes down
content = content.replace(/text-lg/g, 'text-sm');
content = content.replace(/text-base/g, 'text-[10px]');
content = content.replace(/text-xl/g, 'text-base');

fs.writeFileSync(targetFile, content);
console.log('Fonts in CmsPage.tsx have been shrunk');
