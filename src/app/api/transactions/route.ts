import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

// GET /api/transactions — Fetch all transactions for current user
export async function GET(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session) {
      return NextResponse.json({ success: false, message: 'Belum login.' }, { status: 401 });
    }

    const transactions = await (prisma.transaction as any).findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/transactions — Create a new token purchase transaction
export async function POST(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session) {
      return NextResponse.json({ success: false, message: 'Belum login.' }, { status: 401 });
    }

    const body = await request.json();
    const { packageName, packageTokens, amount, method, paymentCode } = body;

    if (!packageName || !packageTokens || !amount || !method) {
      return NextResponse.json({ success: false, message: 'Data tidak lengkap.' }, { status: 400 });
    }

    // Generate unique ref ID
    const refId = `TX-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    // Use a transaction to ensure atomicity: create record + update balance
    const [transaction, updatedUser] = await prisma.$transaction([
      (prisma.transaction as any).create({
        data: {
          userId: session.userId,
          packageName,
          packageTokens,
          amount,
          method,
          paymentCode,
          refId,
          status: 'berhasil',
        },
      }),
      (prisma.user as any).update({
        where: { id: session.userId },
        data: {
          tokens: { increment: packageTokens },
        },
        select: { tokens: true },
      }),
      // Also create a notification for this purchase
      (prisma.notification as any).create({
        data: {
          userId: session.userId,
          title: 'Pembelian Token Berhasil',
          message: `${packageTokens} Token dari ${packageName} telah ditambahkan ke akun Anda via ${method}.`,
          type: 'success',
          isRead: false,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Pembayaran berhasil!',
      data: {
        transaction,
        newTokenBalance: updatedUser.tokens,
      },
    });
  } catch (error: any) {
    console.error('Transaction error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Gagal memproses transaksi.' }, { status: 500 });
  }
}
