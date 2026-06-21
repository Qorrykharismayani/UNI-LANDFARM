import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ success: false, message: 'Data Google OAuth tidak lengkap.' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      if (user.status !== 'Aktif') {
        return NextResponse.json({ success: false, message: 'Akun Anda sedang dinonaktifkan. Silakan hubungi admin.' }, { status: 403 });
      }

      // Update name and provider to google
      user = await prisma.user.update({
        where: { id: user.id },
        data: { 
          name,
          provider: 'google' 
        }
      });
    } else {
      // Create user automatically
      user = await prisma.user.create({
        data: {
          name,
          email,
          role: 'USER',
          status: 'Aktif',
          provider: 'google'
        }
      });


    }

    // Sign session token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      name: user.name
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login Google berhasil!',
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
