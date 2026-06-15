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

    const pubRequest = await prisma.publishRequest.findUnique({
      where: { id },
      include: { landingPage: true }
    });

    if (!pubRequest) {
      return NextResponse.json({ success: false, message: 'Permintaan publikasi tidak ditemukan.' }, { status: 404 });
    }

    // Set dynamic URL and status to 'Approved'
    const generatedUrl = `/site/${pubRequest.landingPage.slug}`;
    await prisma.landingPage.update({
      where: { id: pubRequest.landingPageId },
      data: {
        status: 'Approved',
        publicUrl: generatedUrl
      }
    });

    // Update request log
    await prisma.publishRequest.update({
      where: { id },
      data: {
        status: 'Approved',
        reviewedBy: session.userId,
        reviewedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: `Halaman ${pubRequest.landingPage.businessName} berhasil disetujui dan dipublikasikan di ${generatedUrl}!`,
      data: { url: generatedUrl }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
