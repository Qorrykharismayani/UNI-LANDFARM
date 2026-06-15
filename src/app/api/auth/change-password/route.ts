import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Harap login kembali.' }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, message: 'Password baru minimal harus 6 karakter.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId }
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User tidak ditemukan.' }, { status: 404 });
    }

    // Verify old password if user has password set in database
    if (user.password) {
      if (!oldPassword) {
        return NextResponse.json({ success: false, message: 'Password lama wajib diisi.' }, { status: 400 });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Password lama Anda salah.' }, { status: 400 });
      }
    }

    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        provider: 'credentials'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Password Anda berhasil diperbarui!'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
