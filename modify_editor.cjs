const fs = require('fs');
const path = 'd:\\Uni-LandFarm\\src\\components\\ContentStructureEditor.tsx';
let code = fs.readFileSync(path, 'utf8');

// Colors
code = code.replace(/bg-\[\#050816\]/g, 'bg-slate-50');
code = code.replace(/bg-\[\#0B1223\]/g, 'bg-white');
code = code.replace(/bg-\[\#0b1223\]/g, 'bg-white');
code = code.replace(/bg-\[\#0e172d\]/g, 'bg-white');
code = code.replace(/bg-\[\#080d19\]/g, 'bg-slate-50');
code = code.replace(/border-white\/5/g, 'border-slate-200');
code = code.replace(/border-white\/10/g, 'border-slate-300');
code = code.replace(/border-slate-700\/30/g, 'border-slate-300');

// Slate backgrounds
code = code.replace(/bg-slate-900\/40/g, 'bg-white');
code = code.replace(/bg-slate-950\/60/g, 'bg-slate-50');
code = code.replace(/bg-slate-950/g, 'bg-slate-100');
code = code.replace(/w-full bg-slate-900 border/g, 'w-full bg-white border');
code = code.replace(/flex-1 bg-slate-900 border/g, 'flex-1 bg-white border');
code = code.replace(/bg-slate-800\/50/g, 'bg-slate-100');

// Text colors
code = code.replace(/text-slate-200/g, 'text-slate-800');
code = code.replace(/text-slate-350/g, 'text-slate-600');
code = code.replace(/text-slate-400/g, 'text-slate-600');
code = code.replace(/text-slate-300/g, 'text-slate-700');
code = code.replace(/text-slate-550/g, 'text-slate-500');
code = code.replace(/text-slate-600/g, 'text-slate-500');

// Replace text-white ONLY in specific known places where background became light
code = code.replace(/text-white flex items-center justify-center/g, 'text-slate-900 flex items-center justify-center');
code = code.replace(/text-white outline-none/g, 'text-slate-900 outline-none'); 
code = code.replace(/text-white overflow-hidden/g, 'text-slate-900 overflow-hidden');
code = code.replace(/text-white block truncate/g, 'text-slate-900 block truncate');
code = code.replace(/text-white leading-none/g, 'text-slate-900 leading-none');
code = code.replace(/text-white uppercase text/g, 'text-slate-900 uppercase text');
code = code.replace(/text-white text-\[11px\]/g, 'text-slate-900 text-[11px]');

// Font size scaling (bumping up)
code = code.replace(/text-\[7px\]/g, 'text-[9px]');
code = code.replace(/text-\[7\.5px\]/g, 'text-[10px]');
code = code.replace(/text-\[8px\]/g, 'text-[10px]');
code = code.replace(/text-\[8\.5px\]/g, 'text-[11px]');
code = code.replace(/text-\[9px\]/g, 'text-xs');
code = code.replace(/text-\[9\.5px\]/g, 'text-xs');
code = code.replace(/text-\[10px\]/g, 'text-sm');
code = code.replace(/text-\[11px\]/g, 'text-base');
code = code.replace(/text-xs/g, 'text-sm');
code = code.replace(/text-sm/g, 'text-base');

fs.writeFileSync(path, code);
console.log('Modifications applied');
