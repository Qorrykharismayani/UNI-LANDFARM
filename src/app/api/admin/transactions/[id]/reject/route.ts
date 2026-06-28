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

    const txId = Number(id);
    if (isNaN(txId)) {
      return NextResponse.json({ success: false, message: 'ID transaksi tidak valid.' }, { status: 400 });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: txId },
    });

    if (!transaction) {
      return NextResponse.json({ success: false, message: 'Transaksi tidak ditemukan.' }, { status: 404 });
    }

    if (transaction.status === 'berhasil') {
      return NextResponse.json({ success: false, message: 'Transaksi yang sudah berhasil tidak dapat ditolak.' }, { status: 400 });
    }

    const updatedTx = await prisma.transaction.update({
      where: { id: txId },
      data: { status: 'gagal' },
    });

    // Notify user
    await (prisma.notification as any).create({
      data: {
        userId: transaction.userId,
        title: 'Pembayaran Ditolak',
        message: `Bukti pembayaran untuk paket ${transaction.packageName} ditolak oleh admin. Silakan periksa kembali transfer Anda atau hubungi dukungan.`,
        type: 'warning',
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Transaksi berhasil ditolak.',
      data: updatedTx,
    });
  } catch (error: any) {
    console.error('Rejection error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
