const fs = require('fs');
const path = 'd:\\Uni-LandFarm\\src\\components\\ContentStructureEditor.tsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/text-base font-black text-slate-500 uppercase tracking-wider/g, 'text-sm font-bold text-slate-600 uppercase tracking-widest');
code = code.replace(/text-base font-black text-brand-blue uppercase tracking-wider block mt-1\.5 font-black/g, 'text-sm font-bold text-slate-500 uppercase tracking-widest block mt-1.5');

// Improve input borders
code = code.replace(/bg-slate-50 border border-slate-200 rounded-xl p-3 text-base/g, 'bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm');
code = code.replace(/bg-slate-50 border border-slate-200 rounded-xl p-2\.5 text-base/g, 'bg-white border border-slate-300 rounded-xl p-2.5 text-sm shadow-sm');
code = code.replace(/bg-white border border-slate-200 rounded-xl/g, 'bg-white border border-slate-300 rounded-xl shadow-sm');

fs.writeFileSync(path, code);
console.log('Fixed form styles');
