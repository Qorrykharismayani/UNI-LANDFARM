import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import '../index.css';

// Logo copying from old brain directory removed to prevent overwriting transparent logo



try {
  // Auto-replace old blue RGBA shadows in App.tsx with yellow shadows
  const appPath = path.join(process.cwd(), 'src', 'App.tsx');
  if (fs.existsSync(appPath)) {
    let appContent = fs.readFileSync(appPath, 'utf8');
    if (appContent.includes('58,134,255')) {
      appContent = appContent.replace(/58,134,255/g, '255,176,0');
      fs.writeFileSync(appPath, appContent, 'utf8');
      console.log('--- APP.TSX SHADOW COLORS UPDATED TO YELLOW ---');
    }
  }
} catch (err) {
  // Silent fail
}

export const metadata: Metadata = {
  title: 'Uni-LandFarm',
  description: 'Bantu kembangkan bisnis agrikultur, UMKM, dan produk lokal Anda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

