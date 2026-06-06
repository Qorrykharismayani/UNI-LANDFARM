const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
const heroPath = path.join(__dirname, 'src', 'components', 'Hero.tsx');

// 1. Fix unused imports in App.tsx
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');

  // Extract all used components/icons in App.tsx
  // This regex finds <IconName 
  const usedIcons = new Set();
  const iconRegex = /<([A-Z][a-zA-Z0-9]*)/g;
  let match;
  while ((match = iconRegex.exec(appContent)) !== null) {
    usedIcons.add(match[1]);
  }

  // Also catch icons used without brackets, like in arrays: icon: <MessageSquare />
  // Already caught by <([A-Z]...)

  // We have the original import block. Let's find it.
  const importMatch = appContent.match(/import\s+{([^}]+)}\s+from\s+'lucide-react';/);
  if (importMatch) {
    const importedIcons = importMatch[1].split(',').map(s => s.trim().split(' as ')[0]).filter(Boolean);
    const aliases = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    
    // Filter to only those used
    const iconsToKeep = aliases.filter(aliasDef => {
      const parts = aliasDef.split(' as ');
      const actualName = parts.length > 1 ? parts[1].trim() : parts[0].trim();
      return usedIcons.has(actualName);
    });

    const newImportString = `import { ${iconsToKeep.join(', ')} } from 'lucide-react';`;
    appContent = appContent.replace(importMatch[0], newImportString);
  }

  // 2. Fix Dashboard Logo & Remove Text
  const oldDashboardLogo = `<div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setView('home')}
          >
            <img 
              src="/logo.png" 
              alt="Uni-LandFarm Logo" 
              className="h-8 w-auto object-contain drop-shadow-sm" 
            />
          </div>
          <div>
            <h1 className="text-sm font-black text-stone-900 dark:text-white leading-none">UNI-LandFarm</h1>
            <p className="text-[8px] font-bold text-stone-400 dark:text-stone-500 tracking-widest uppercase mt-0.5">Agentic AI Platform</p>
          </div>
        </div>`;
        
  const newDashboardLogo = `<div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setView('home')}
          >
            <img 
              src="/logo.png" 
              alt="Uni-LandFarm Logo" 
              className="h-12 w-auto object-contain drop-shadow-md" 
            />
          </div>
        </div>`;
        
  appContent = appContent.replace(oldDashboardLogo, newDashboardLogo);

  // 3. Add smooth gradients to App.tsx backgrounds
  // We'll replace hard backgrounds with gradients.
  appContent = appContent.replace(/bg-stone-50\/50 dark:bg-stone-900 relative overflow-hidden/g, 'bg-gradient-to-b from-white via-stone-50 to-stone-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 relative overflow-hidden');
  appContent = appContent.replace(/bg-white dark:bg-stone-900 relative/g, 'bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative');
  appContent = appContent.replace(/bg-stone-50 dark:bg-stone-900 relative overflow-hidden/g, 'bg-gradient-to-b from-white to-stone-50 dark:from-stone-900 dark:to-stone-800 relative overflow-hidden');
  appContent = appContent.replace(/bg-stone-950 relative overflow-hidden/g, 'bg-stone-950 relative overflow-hidden'); // This one has radial gradient already inside

  fs.writeFileSync(appPath, appContent);
}

// 4. Update Hero Image
if (fs.existsSync(heroPath)) {
  let heroContent = fs.readFileSync(heroPath, 'utf8');
  // Change unsplash image to an analytics dashboard / web templates graphic
  // 1460925895917-afdab827c52f is an analytics dashboard with charts
  heroContent = heroContent.replace(/1586771107584-568728d11c75/g, '1460925895917-afdab827c52f');
  
  // Also add smooth gradient transition to Hero background
  heroContent = heroContent.replace(/bg-gradient-to-br from-yellow-50 via-green-50\/30 to-white dark:from-stone-800 dark:via-stone-800\/90 dark:to-stone-900/g, 'bg-gradient-to-b from-stone-50 via-white to-stone-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900');
  
  fs.writeFileSync(heroPath, heroContent);
}

console.log('Update script finished.');
