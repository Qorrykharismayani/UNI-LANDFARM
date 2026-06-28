import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const txId = Number(id);
    if (isNaN(txId)) {
      return NextResponse.json({ success: false, message: 'ID transaksi tidak valid.' }, { status: 400 });
    }

    await prisma.transaction.delete({
      where: { id: txId }
    });

    return NextResponse.json({ success: true, message: 'Transaksi berhasil dihapus!' });
  } catch (error: any) {
    console.error('Delete transaction error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
