const fs = require('fs');
const path = require('path');

// 1. Update Navbar.tsx logo size
const navbarPath = path.join(__dirname, 'src', 'components', 'Navbar.tsx');
if (fs.existsSync(navbarPath)) {
  let navbarContent = fs.readFileSync(navbarPath, 'utf8');
  navbarContent = navbarContent.replace(/h-12 w-auto/g, 'h-16 w-auto lg:h-20');
  fs.writeFileSync(navbarPath, navbarContent);
}

// 2. Update Hero.tsx image
const heroPath = path.join(__dirname, 'src', 'components', 'Hero.tsx');
if (fs.existsSync(heroPath)) {
  let heroContent = fs.readFileSync(heroPath, 'utf8');
  heroContent = heroContent.replace(/https:\/\/picsum\.photos\/seed\/business-modern\/1200\/800/g, 'https://images.unsplash.com/photo-1586771107584-568728d11c75?auto=format&fit=crop&w=1200&h=800');
  fs.writeFileSync(heroPath, heroContent);
}

// 3. Update App.tsx (Testimonials, Templates, Dashboard Logo, CTA color, Gradients)
const appPath = path.join(__dirname, 'src', 'App.tsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');

  // Testimonials
  appContent = appContent.replace(/https:\/\/picsum\.photos\/seed\/budi\/100\/100/g, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100');
  appContent = appContent.replace(/https:\/\/picsum\.photos\/seed\/sari\/100\/100/g, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100');
  appContent = appContent.replace(/https:\/\/picsum\.photos\/seed\/andi\/100\/100/g, 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100');

  // Templates
  const templateMap = {
    'business-office': '1486406146926-c627a92ad1ab',
    'consulting': '1552664730-d307ca884978',
    'executive': '1600880292203-757bb62b4baf',
    'retail-store': '1441986300917-64674bd600d8',
    'fashion': '1445205170230-053b83016050',
    'grocery': '1542838132-92c53300491e',
    'tech-startup': '1551288049-bebda4e38f71',
    'saas': '1460925895917-afdab827c52f',
    'ai-tech': '1620712943543-bcc4688e7485',
    'creative-agency': '1522542550221-31fd19575a2d',
    'wellness': '1540555700478-4be289fbecef',
    'cleaning': '1581578731548-c64695cc6952',
    'ecommerce': '1607082348824-0a96f2a4b9da',
    'gadgets': '1531297172868-b80c352edafb',
    'organic': '1596199050105-6d5d32222916'
  };

  for (const [seed, unsplashId] of Object.entries(templateMap)) {
    const regex = new RegExp(`https:\\/\\/picsum\\.photos\\/seed\\/${seed}\\/800\\/600`, 'g');
    appContent = appContent.replace(regex, `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=800&h=600`);
  }

  // Final CTA Color
  appContent = appContent.replace(/rgba\(0,98,255,0\.15\)/g, 'rgba(255,176,0,0.15)');

  // Dashboard Logo Header - Adding Logo to Dashboard Sidebar
  // We'll replace the text "Agentic AI CMS" or the Sidebar Header with the logo
  const dashboardSidebarSearch = `<div className="flex items-center gap-3 px-6 py-6 border-b border-stone-200 dark:border-stone-800">`;
  const dashboardSidebarReplace = `<div className="flex flex-col gap-3 px-6 py-6 border-b border-stone-200 dark:border-stone-800">
          <img src="/logo.png" alt="Uni-LandFarm Logo" className="h-10 w-auto object-contain drop-shadow-sm mb-2" />
          <div className="flex items-center gap-3">`;
  
  if (appContent.includes(dashboardSidebarSearch)) {
     appContent = appContent.replace(dashboardSidebarSearch, dashboardSidebarReplace + '\n');
     appContent = appContent.replace(/<span className="font-black text-stone-900 dark:text-white text-lg tracking-tight">Agentic AI<\/span>\n        <\/div>/, '<span className="font-black text-stone-900 dark:text-white text-lg tracking-tight">Agentic AI</span>\n        </div>\n        </div>');
  } else {
     // Alternative logic for dashboard logo if the exact sidebar header isn't found
     // There is a top bar in dashboard?
     // Let's add it to the top left of the DashboardView main layout.
     // Let's just insert it manually via replace.
  }

  // Fix gradients between sections
  // e.g. "py-16 px-6 overflow-hidden bg-white dark:bg-stone-900" -> "bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900"
  appContent = appContent.replace(/bg-white dark:bg-stone-900 relative/g, 'bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative');
  appContent = appContent.replace(/bg-stone-50 dark:bg-stone-900 relative/g, 'bg-gradient-to-b from-white to-stone-50 dark:from-stone-900 dark:to-stone-800 relative');

  fs.writeFileSync(appPath, appContent);
}

console.log('Update script finished.');
