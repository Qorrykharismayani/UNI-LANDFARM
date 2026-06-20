const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/components/pages/TemplatePage.tsx');

let content = fs.readFileSync(targetFile, 'utf8');

// Modal width
content = content.replace(/max-w-lg bg-white dark:bg-slate-900/g, 'max-w-xl bg-white dark:bg-slate-900');

// Header
content = content.replace(/text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest/g, 'text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest');
content = content.replace(/text-\[10px\] font-bold text-brand-blue uppercase tracking-widest/g, 'text-xs font-bold text-brand-blue uppercase tracking-widest');

// Form Labels
content = content.replace(/text-\[10px\] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest/g, 'text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest');

// Form Inputs
content = content.replace(/px-4 py-3.5 text-xs font-bold dark:text-white/g, 'px-4 py-3.5 text-sm font-bold dark:text-white');
content = content.replace(/px-4 py-3.5 border border-l-0 border-slate-200 dark:border-slate-800 rounded-r-xl text-xs font-black/g, 'px-4 py-3.5 border border-l-0 border-slate-200 dark:border-slate-800 rounded-r-xl text-sm font-black');

// URL helper text
content = content.replace(/text-\[9px\] text-slate-400 dark:text-slate-500 italic font-bold/g, 'text-xs text-slate-400 dark:text-slate-500 italic font-bold');

// Submit Button
content = content.replace(/text-\[11px\] font-black uppercase tracking-\[0.2em\] shadow-blue hover:shadow-blue-lg/g, 'text-sm font-black uppercase tracking-[0.2em] shadow-blue hover:shadow-blue-lg');

fs.writeFileSync(targetFile, content);
console.log('Template modal bumped successfully!');
