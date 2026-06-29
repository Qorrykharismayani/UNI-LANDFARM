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
    const { packageName, packageTokens, amount, method, paymentCode, proofImage } = body;

    if (!packageName || !packageTokens || !amount || !method) {
      return NextResponse.json({ success: false, message: 'Data tidak lengkap.' }, { status: 400 });
    }

    // Generate unique ref ID
    const refId = `TX-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    // Create record as pending, do not add tokens yet
    let dataPayload: any = {
      userId: session.userId,
      packageName,
      packageTokens,
      amount,
      method,
      paymentCode: paymentCode || null,
      refId,
      status: 'pending',
    };

    if (proofImage) {
      dataPayload.proofImage = proofImage;
    }

    let transaction;
    try {
      transaction = await (prisma.transaction as any).create({ data: dataPayload });
    } catch (error: any) {
      console.error("Primary Prisma create failed, attempting fallback:", error);
      // Fallback: If the hosting provider (e.g. Vercel) failed to update the Prisma Client 
      // with the new proofImage column, we temporarily store it in paymentCode.
      delete dataPayload.proofImage;
      const code = paymentCode ? paymentCode : '';
      dataPayload.paymentCode = proofImage ? `${code}|||${proofImage}` : code;
      
      try {
        transaction = await (prisma.transaction as any).create({ data: dataPayload });
      } catch (fallbackError: any) {
        throw fallbackError;
      }
    }

    // Create a notification for this verification process
    await (prisma.notification as any).create({
      data: {
        userId: session.userId,
        title: 'Pembayaran Sedang Diverifikasi',
        message: `Pembelian paket ${packageName} sedang menunggu verifikasi admin. Bukti pembayaran telah diterima.`,
        type: 'info',
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Bukti pembayaran berhasil diunggah! Mohon tunggu konfirmasi admin.',
      data: {
        transaction,
        newTokenBalance: null, // Token not added yet
      },
    });
  } catch (error: any) {
    console.error('Transaction error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Gagal memproses transaksi.' }, { status: 500 });
  }
}
