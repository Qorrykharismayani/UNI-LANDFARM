import { NextResponse } from 'next/server';

// Deprecated endpoint since Article model is replaced by ContentSchedule
export async function GET() {
  return NextResponse.json({ success: true, message: 'Rute ini telah didepresiasi. Silakan gunakan /api/content-schedules.', data: [] });
}

export async function POST() {
  return NextResponse.json({ success: false, message: 'Rute ini telah didepresiasi. Silakan gunakan /api/content-schedules.' }, { status: 410 });
}
export async function DELETE() {
  return NextResponse.json({ success: false, message: 'Rute ini telah didepresiasi. Silakan gunakan /api/content-schedules.' }, { status: 410 });
}

export async function DELETE(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID artikel wajib disertakan.' }, { status: 400 });
    }

    const article = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (!article) {
      return NextResponse.json({ success: false, message: 'Artikel tidak ditemukan.' }, { status: 404 });
    }

    if (article.userId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    await prisma.article.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
