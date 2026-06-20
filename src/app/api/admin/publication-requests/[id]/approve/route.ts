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

    const landingPage = await prisma.landingPage.findUnique({
      where: { id: Number(id) }
    });

    if (!landingPage || landingPage.status !== 'Pending Publish') {
      return NextResponse.json({ success: false, message: 'Permintaan publikasi tidak ditemukan atau tidak valid.' }, { status: 404 });
    }

    // Set dynamic URL and status to 'Approved'
    const generatedUrl = `/site/${landingPage.slug}`;
    await prisma.landingPage.update({
      where: { id: landingPage.id },
      data: {
        status: 'Approved',
        publicUrl: generatedUrl
      }
    });

    return NextResponse.json({
      success: true,
      message: `Halaman ${landingPage.businessName} berhasil disetujui dan dipublikasikan di ${generatedUrl}!`,
      data: { url: generatedUrl }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
