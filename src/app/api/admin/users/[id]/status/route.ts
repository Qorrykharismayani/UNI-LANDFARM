import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { status } = await request.json(); // "Aktif" or "Nonaktif"

    if (!status || (status !== 'Aktif' && status !== 'Nonaktif')) {
      return NextResponse.json({ success: false, message: 'Status pengguna tidak valid.' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      message: `Status akun pengguna ${updated.name} berhasil diubah menjadi ${status}!`,
      data: { id: updated.id, status: updated.status }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
