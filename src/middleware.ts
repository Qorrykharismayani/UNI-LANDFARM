import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge-compatible session cookie extractor (bypasses jsonwebtoken Node APIs)
function getSessionFromCookies(cookiesString: string | null): any {
  if (!cookiesString) return null;
  const match = cookiesString.match(/token=([^;]+)/);
  if (!match) return null;
  const token = match[1];
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  } catch (e) {
    return null;
  }
}


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Global Database Configuration Guard
  const dbUrl = process.env.DATABASE_URL;
  const isDbConfigured = dbUrl && dbUrl.trim() !== '';

  if (pathname.startsWith('/api') && pathname !== '/api/settings') {
    if (!isDbConfigured) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database MySQL belum terhubung. Silakan periksa konfigurasi DATABASE_URL pada file .env.' 
        },
        { status: 503 }
      );
    }
  }

  // 2. Protect admin API endpoints
  if (pathname.startsWith('/api/admin')) {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Sesi tidak valid. Harap login kembali.' },
        { status: 401 }
      );
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Akses ditolak. Anda bukan Administrator.' },
        { status: 403 }
      );
    }
  }

  // 3. Protect standard user workspace actions
  if (
    pathname.startsWith('/api/landing-pages') ||
    pathname.startsWith('/api/users/me') ||
    pathname.startsWith('/api/media')
  ) {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Sesi tidak valid atau telah berakhir. Akses ditolak.' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
