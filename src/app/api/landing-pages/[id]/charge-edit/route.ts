import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const projectId = Number(id);
    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, message: 'ID proyek tidak valid.' }, { status: 400 });
    }

    // Verify if landing page belongs to this user (or if admin)
    const page = await prisma.landingPage.findUnique({
      where: { id: projectId }
    });

    if (!page) {
      return NextResponse.json({ success: false, message: 'Landing page tidak ditemukan.' }, { status: 404 });
    }

    if (session.role !== 'ADMIN' && page.userId !== session.userId) {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    // Admins don't pay tokens
    if (session.role === 'ADMIN') {
      return NextResponse.json({ success: true, message: 'Admin bebas biaya edit.' });
    }

    const tokenCost = 350;

    // Check user tokens
    const user = await (prisma.user as any).findUnique({
      where: { id: session.userId },
      select: { tokens: true }
    });

    if (!user || user.tokens < tokenCost) {
      return NextResponse.json({ 
        success: false, 
        message: `Token Anda tidak cukup. Mengedit website memerlukan ${tokenCost} Token.` 
      }, { status: 402 });
    }

    // Deduct tokens
    await prisma.$transaction([
      (prisma.user as any).update({
        where: { id: session.userId },
        data: { tokens: { decrement: tokenCost } }
      }),
      (prisma.notification as any).create({
        data: {
          userId: session.userId,
          title: 'Token Berkurang',
          message: `Sebanyak ${tokenCost} Token telah digunakan untuk sesi edit website "${page.title}".`,
          type: 'info',
          isRead: false
        }
      })
    ]);

    return NextResponse.json({ 
      success: true, 
      message: `${tokenCost} Token berhasil dipotong.`,
      newTokens: user.tokens - tokenCost 
    });
  } catch (error: any) {
    console.error('Error charging edit tokens:', error);
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
