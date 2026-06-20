import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      include: {
        landingPages: { select: { id: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      joinedDate: u.createdAt.toISOString().split('T')[0],
      createdAt: u.createdAt.toISOString(),
      landingPageCount: u.landingPages.length
    }));

    return NextResponse.json({ success: true, message: 'Berhasil', data: formattedUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
