const fs = require('fs');
const path = require('path');

const dirA = 'c:\\Users\\acer\\Downloads\\uni-landfarm-landing-page\\src';
const dirB = 'C:\\Users\\acer\\OneDrive\\Pindaian\\Documents\\TA UNILAND\\uni-landfarm-landing-page\\src';

function compare(pA, pB) {
  if (!fs.existsSync(pA)) {
    console.log(`Only in B: ${pB}`);
    return;
  }
  if (!fs.existsSync(pB)) {
    console.log(`Only in A: ${pA}`);
    return;
  }
  
  const statA = fs.statSync(pA);
  const statB = fs.statSync(pB);
  
  if (statA.isDirectory() && statB.isDirectory()) {
    const filesA = fs.readdirSync(pA);
    const filesB = fs.readdirSync(pB);
    const all = new Set([...filesA, ...filesB]);
    for (const f of all) {
      compare(path.join(pA, f), path.join(pB, f));
    }
  } else if (statA.isFile() && statB.isFile()) {
    const contentA = fs.readFileSync(pA, 'utf8');
    const contentB = fs.readFileSync(pB, 'utf8');
    if (contentA !== contentB) {
      console.log(`Different content: ${pA} vs ${pB}`);
    }
  }
}

console.log('Comparing A (Downloads) and B (OneDrive)...');
compare(dirA, dirB);
