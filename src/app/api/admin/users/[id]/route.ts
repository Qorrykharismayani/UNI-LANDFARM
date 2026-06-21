import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { role, status } = await request.json();
    
    if (role !== 'ADMIN' && role !== 'USER') {
      return NextResponse.json({ success: false, message: 'Role tidak valid.' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: parseInt(params.id, 10) },
      data: { role, status }
    });

    return NextResponse.json({ success: true, message: 'Data pengguna berhasil diperbarui.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    // Attempt to delete user. Will throw if foreign keys restrict it, which is fine for now.
    await prisma.user.delete({
      where: { id: parseInt(params.id, 10) }
    });

    return NextResponse.json({ success: true, message: 'Pengguna berhasil dihapus.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Gagal menghapus pengguna. Pengguna mungkin memiliki data terkait (Landing Page, dsb).' }, { status: 500 });
  }
}
