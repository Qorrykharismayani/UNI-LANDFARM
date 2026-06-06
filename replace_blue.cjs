const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/App.tsx',
  'src/components/Navbar.tsx',
  'src/components/Hero.tsx',
  'src/components/Features.tsx',
  'src/index.css'
];

filesToProcess.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Replace all slate- with stone-
    content = content.replace(/slate-/g, 'stone-');
    content = content.replace(/bg-slate/g, 'bg-stone');
    content = content.replace(/text-slate/g, 'text-stone');
    content = content.replace(/border-slate/g, 'border-stone');
    content = content.replace(/from-slate/g, 'from-stone');
    content = content.replace(/via-slate/g, 'via-stone');
    content = content.replace(/to-slate/g, 'to-stone');

    // 2. Replace brand-blue with brand-primary
    content = content.replace(/brand-blue/g, 'brand-primary');

    // 3. Replace generic blue utility classes with amber/emerald
    content = content.replace(/blue-100/g, 'amber-100');
    content = content.replace(/blue-400/g, 'amber-400');
    content = content.replace(/blue-500/g, 'amber-500');
    content = content.replace(/blue-600/g, 'amber-600');
    content = content.replace(/cyan-400/g, 'teal-400');
    content = content.replace(/shadow-blue-lg/g, 'shadow-primary-lg');
    content = content.replace(/shadow-blue/g, 'shadow-primary');

    // 4. Emojis
    content = content.replace(/🔵/g, '✨');

    // 5. Hardcoded hex colors and CSS variables for blue
    if (file === 'src/index.css') {
      content = content.replace(/--color-brand-blue: #FFB000; \/\* Alias for easy migration \*\//g, '');
      // Ensure primary is strictly the yellow/amber we want
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
