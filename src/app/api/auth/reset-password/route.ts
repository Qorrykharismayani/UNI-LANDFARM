import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, token, password } = await request.json();

    if (!email || !token || !password) {
      return NextResponse.json({ success: false, message: 'Email, token reset, dan password baru wajib diisi.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: 'Password baru minimal 6 karakter.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        resetToken: token
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Token reset tidak valid untuk email ini.' }, { status: 400 });
    }

    // Check if token has expired
    if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
      return NextResponse.json({ success: false, message: 'Token reset sudah kedaluwarsa. Silakan ajukan ulang.' }, { status: 400 });
    }

    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password, reset provider if they were Google-only but set password, and clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        provider: 'credentials', // Allow credentials login now
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Password Anda berhasil diperbarui! Silakan login menggunakan password baru.'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
