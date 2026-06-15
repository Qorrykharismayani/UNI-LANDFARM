const fs = require('fs');
const path = require('path');

const srcApp = 'c:\\Users\\acer\\OneDrive\\Pindaian\\Documents\\TA UNILAND\\uni-landfarm-landing-page\\src\\App.tsx';
const srcCss = 'c:\\Users\\acer\\OneDrive\\Pindaian\\Documents\\TA UNILAND\\uni-landfarm-landing-page\\src\\index.css';

const destApp = path.join(__dirname, 'App_original.tsx');
const destCss = path.join(__dirname, 'index_original.css');

console.log('Copying files from OneDrive to scratch folder...');

try {
  if (fs.existsSync(srcApp)) {
    fs.copyFileSync(srcApp, destApp);
    console.log('Successfully copied App.tsx to scratch/App_original.tsx');
  } else {
    console.log('Source App.tsx does not exist!');
  }

  if (fs.existsSync(srcCss)) {
    fs.copyFileSync(srcCss, destCss);
    console.log('Successfully copied index.css to scratch/index_original.css');
  } else {
    console.log('Source index.css does not exist!');
  }
} catch (err) {
  console.error('Error copying:', err.message);
}
