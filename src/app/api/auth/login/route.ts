import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email dan password harus diisi.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Password tidak valid atau email tidak valid.' }, { status: 401 });
    }

    if (user.status !== 'Aktif') {
      return NextResponse.json({ success: false, message: 'Akun Anda sedang dinonaktifkan. Silakan hubungi admin.' }, { status: 403 });
    }

    if (!user.password || user.provider !== 'credentials') {
      return NextResponse.json({ 
        success: false, 
        message: 'Akun ini terdaftar menggunakan Google. Silakan klik tombol "Lanjutkan dengan Google".' 
      }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Password tidak valid atau email tidak valid.' }, { status: 401 });
    }

    // Sign session token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      name: user.name
    });

    // Create a login notification
    await (prisma.notification as any).create({
      data: {
        userId: user.id,
        title: 'Login Berhasil',
        message: 'Anda baru saja login ke akun Uni-LandFarm.',
        type: 'system',
        isRead: false
      }
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        image: user.image,
        phone: user.phone,
        location: user.location,
        plan: (user as any).plan,
        tokens: (user as any).tokens
      }
    });

    // Write HttpOnly secure cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
