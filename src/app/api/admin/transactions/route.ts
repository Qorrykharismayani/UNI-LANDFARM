import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const transactions = await prisma.transaction.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const mappedTransactions = transactions.map((t: any) => {
      let proofImage = t.proofImage;
      let paymentCode = t.paymentCode;
      
      if (!proofImage && paymentCode && typeof paymentCode === 'string' && paymentCode.includes('|||')) {
        const parts = paymentCode.split('|||');
        paymentCode = parts[0] || null;
        proofImage = parts[1];
      }
      
      return {
        ...t,
        paymentCode,
        proofImage
      };
    });

    return NextResponse.json({ success: true, message: 'Berhasil', data: mappedTransactions });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
