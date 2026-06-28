import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      include: {
        landingPages: { select: { id: true, title: true, status: true, createdAt: true } },
        articles: { select: { id: true } },
        transactions: { select: { id: true, amount: true, status: true, createdAt: true } },
        notifications: { select: { id: true } },
        mediaFiles: { select: { id: true } },
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      phone: u.phone || '-',
      location: u.location || '-',
      plan: u.plan,
      tokens: u.tokens,
      provider: u.provider,
      image: u.image,
      joinedDate: u.createdAt.toISOString().split('T')[0],
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
      landingPageCount: u.landingPages.length,
      articleCount: u.articles.length,
      transactionCount: u.transactions.length,
      notificationCount: u.notifications.length,
      mediaFileCount: u.mediaFiles.length,
      landingPages: u.landingPages.map(lp => ({
        id: lp.id,
        title: lp.title,
        status: lp.status,
        createdAt: lp.createdAt.toISOString(),
      })),
      recentTransactions: u.transactions.slice(0, 5).map(t => ({
        id: t.id,
        amount: t.amount,
        status: t.status,
        createdAt: t.createdAt.toISOString(),
      })),
    }));

    return NextResponse.json({ success: true, message: 'Berhasil', data: formattedUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Nama, email, dan password wajib diisi.' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email sudah terdaftar.' }, { status: 400 });
    }

    // Hash password
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
        status: 'ACTIVE',
        provider: 'CREDENTIALS',
        tokens: 0, // Default tokens
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Pengguna berhasil ditambahkan',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
