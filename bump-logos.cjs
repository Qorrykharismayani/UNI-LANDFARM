const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const [search, replace] of replacements) {
    // using split and join to replace all occurrences
    content = content.split(search).join(replace);
  }
  fs.writeFileSync(fullPath, content);
}

replaceInFile('src/components/pages/DashboardView.tsx', [
  ['h-[82px]', 'h-[96px]'],
  ['h-[74px]', 'h-[88px]']
]);

replaceInFile('src/components/pages/Footer.tsx', [
  ['h-[60px]', 'h-[74px]']
]);

replaceInFile('src/components/pages/Navbar.tsx', [
  ['h-[78px]', 'h-[90px]']
]);

replaceInFile('src/components/pages/LoginPage.tsx', [
  ['h-[90px]', 'h-[105px]']
]);

replaceInFile('src/components/pages/SignupPage.tsx', [
  ['h-[90px]', 'h-[105px]']
]);

replaceInFile('src/components/pages/ForgotPasswordPage.tsx', [
  ['h-[90px]', 'h-[105px]']
]);

console.log('Logo sizes bumped successfully!');
