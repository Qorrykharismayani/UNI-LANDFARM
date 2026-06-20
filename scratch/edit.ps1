$file = 'c:\Users\acer\OneDrive\Pindaian\Documents\UNI-LANDFARM\src\components\pages\CmsPage.tsx'
$content = Get-Content $file -Raw
$content = $content -replace 'AI Content & Scheduler', 'Kelola Proyek'
$content = $content -replace 'Jadwalkan perubahan konten elemen landing page Anda secara otomatis dan generate teks copywriting menggunakan AI.', 'Kelola, edit, dan hapus situs landing page Anda dengan mudah.'
$content = $content -replace '(?s)\s*\{\/\* Tab Switcher \*\/\}.*?<\/div>\r?\n      <\/div>', "`n      </div>"
$content = $content -replace '(?s)\{\/\* Tab Contents: schedules \*\/\}.*?\{subTab === ''schedules'' \? \([\s\S]*?\) : \(\r?\n        <div className="space-y-6">', '      <div className="space-y-6">'
$content = $content -replace '(?s)<\/table>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n      \)\}\r?\n\r?\n      \{\/\* Scheduler Modal \*\/\}', "</table>`n            </div>`n          </div>`n        </div>`n`n      {/* Scheduler Modal */}"
[IO.File]::WriteAllText($file, $content)
Write-Output "File replaced successfully"
