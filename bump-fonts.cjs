const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'DashboardView.tsx',
  'DashboardPage.tsx',
  'AllProjectsPage.tsx',
  'TemplatesView.tsx',
  'CmsPage.tsx',
  'RepositoryPage.tsx'
].map(f => path.join(__dirname, 'src', 'components', 'pages', f));

const sizeMap = {
  'text-[9px]': 'text-[11px]',
  'text-[10px]': 'text-[12px]',
  'text-[11px]': 'text-sm',
  'text-xs': 'text-sm',
  'text-sm': 'text-base',
  'text-base': 'text-lg',
  'text-lg': 'text-xl',
  'text-xl': 'text-2xl',
  'text-2xl': 'text-3xl',
  'text-3xl': 'text-4xl'
};

const regex = new RegExp(`\\b(${Object.keys(sizeMap).map(k => k.replace(/\[/g, '\\[').replace(/\]/g, '\\]')).join('|')})\\b`, 'g');

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let replacedCount = 0;
    
    // Replace by iterating over matches to avoid double replacement
    content = content.replace(regex, (match) => {
      replacedCount++;
      return sizeMap[match] || match;
    });

    if (replacedCount > 0) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${replacedCount} font classes in ${path.basename(file)}`);
    } else {
      console.log(`No font classes matched in ${path.basename(file)}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
