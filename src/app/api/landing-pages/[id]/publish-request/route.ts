import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const page = await prisma.landingPage.findUnique({ where: { id: Number(id) } });
    if (!page) {
      return NextResponse.json({ success: false, message: 'Landing page tidak ditemukan.' }, { status: 404 });
    }

    if (page.userId !== session.userId) {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    // Set page status to 'Pending Publish' (Pending Review)
    await prisma.landingPage.update({
      where: { id: Number(id) },
      data: { status: 'Pending Publish' }
    });

    return NextResponse.json({
      success: true,
      message: 'Permintaan publikasi berhasil diajukan!',
      data: { status: 'Pending' }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
