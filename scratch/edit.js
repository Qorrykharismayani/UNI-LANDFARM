const fs = require('fs');
const file = 'c:/Users/acer/OneDrive/Pindaian/Documents/UNI-LANDFARM/src/components/pages/CmsPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace title
content = content.replace('AI Content & Scheduler', 'Kelola Proyek');
content = content.replace(
  'Jadwalkan perubahan konten elemen landing page Anda secara otomatis dan generate teks copywriting menggunakan AI.',
  'Kelola, edit, dan hapus situs landing page Anda dengan mudah.'
);

// Remove the Tab Switcher div block
content = content.replace(/\s*\{\/\* Tab Switcher \*\/\}[\s\S]*?<\/div>\r?\n\s*<\/div>/, '\n      </div>');

// Remove everything from the start of schedules tab to the start of the projects tab
content = content.replace(/\{\/\* Tab Contents: schedules \*\/\}[\s\S]*?\{subTab === 'schedules' \? \([\s\S]*?\) : \(\r?\n\s*<div className="space-y-6">/, '      <div className="space-y-6">');

// Remove the closing brace of the conditionals
content = content.replace(/<\/table>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*\)\}\r?\n\r?\n\s*\{\/\* Scheduler Modal \*\/\}/, '</table>\n            </div>\n          </div>\n        </div>\n\n      {/* Scheduler Modal */}');

fs.writeFileSync(file, content);
console.log('File edited successfully');
