const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/components/pages/ProfilePage.tsx');

let content = fs.readFileSync(targetFile, 'utf8');

// Replace specific bumped font sizes
content = content.replace(/text-xl font-black/g, 'text-3xl font-black');
content = content.replace(/text-\[11px\] font-black/g, 'text-xs font-black');
content = content.replace(/text-\[9px\] font-black/g, 'text-xs font-black');
content = content.replace(/text-\[12px\] font-bold/g, 'text-sm font-bold');
content = content.replace(/text-\[10px\] font-black/g, 'text-xs font-black');

fs.writeFileSync(targetFile, content);
console.log('Profile fonts bumped successfully!');
