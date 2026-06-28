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

    // Get transaction details
    const transaction = await prisma.transaction.findUnique({
      where: { id: txId },
    });

    if (!transaction) {
      return NextResponse.json({ success: false, message: 'Transaksi tidak ditemukan.' }, { status: 404 });
    }

    if (transaction.status === 'berhasil') {
      return NextResponse.json({ success: false, message: 'Transaksi ini sudah berhasil disetujui sebelumnya.' }, { status: 400 });
    }

    // Atomically approve the transaction and increment user's token balance
    const [updatedTx, updatedUser] = await prisma.$transaction([
      prisma.transaction.update({
        where: { id: txId },
        data: { status: 'berhasil' },
      }),
      (prisma.user as any).update({
        where: { id: transaction.userId },
        data: {
          tokens: { increment: transaction.packageTokens },
        },
      }),
      (prisma.notification as any).create({
        data: {
          userId: transaction.userId,
          title: 'Pembelian Token Berhasil',
          message: `${transaction.packageTokens} Token dari paket ${transaction.packageName} telah ditambahkan ke akun Anda setelah pembayaran diverifikasi.`,
          type: 'success',
          isRead: false,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Transaksi berhasil disetujui dan token telah dikreditkan ke pengguna!',
      data: updatedTx,
    });
  } catch (error: any) {
    console.error('Approval error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
