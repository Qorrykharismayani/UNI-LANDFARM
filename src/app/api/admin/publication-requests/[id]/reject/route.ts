import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { reason } = await request.json();

    if (!reason) {
      return NextResponse.json({ success: false, message: 'Harap sertakan alasan penolakan publikasi.' }, { status: 400 });
    }

    const landingPage = await prisma.landingPage.findUnique({
      where: { id: Number(id) }
    });

    if (!landingPage || landingPage.status !== 'Pending Publish') {
      return NextResponse.json({ success: false, message: 'Permintaan publikasi tidak ditemukan atau tidak valid.' }, { status: 404 });
    }

    // Set page status to 'Rejected'
    await prisma.landingPage.update({
      where: { id: landingPage.id },
      data: { status: 'Rejected' }
    });

    return NextResponse.json({
      success: true,
      message: `Halaman ${landingPage.businessName} ditolak publikasinya dengan alasan: ${reason}`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
