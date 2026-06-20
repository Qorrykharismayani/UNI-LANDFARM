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
  'text-[10px]': 'text-sm',
  'text-[11px]': 'text-sm',
  'text-[12px]': 'text-base',
  'text-[12.5px]': 'text-base',
  'text-[13px]': 'text-base',
  'text-xs': 'text-base',
  'text-sm': 'text-base',
  'text-base': 'text-lg',
  'text-lg': 'text-xl',
  'text-xl': 'text-2xl'
};

const keys = Object.keys(sizeMap).map(k => k.replace(/\[/g, '\\[').replace(/\]/g, '\\]'));
const regex = new RegExp(`(?<![\\w\\-])(${keys.join('|')})(?![\\w\\-])`, 'g');

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let replacedCount = 0;
    
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
