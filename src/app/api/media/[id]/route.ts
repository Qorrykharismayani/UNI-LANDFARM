import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const media = await prisma.mediaFile.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json({ success: false, message: 'Berkas tidak ditemukan.' }, { status: 404 });
    }

    if (session.role !== 'ADMIN' && media.userId !== session.userId) {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    // Attempt to delete local file
    try {
      const filePath = join(process.cwd(), 'public', media.fileUrl);
      await unlink(filePath);
    } catch (e) {}

    await prisma.mediaFile.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Berkas berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
