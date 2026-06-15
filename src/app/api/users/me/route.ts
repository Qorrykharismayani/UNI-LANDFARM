import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const user = await (prisma.user as any).findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        image: true,
        phone: true,
        location: true,
        plan: true,
        tokens: true
      }
    });

    return NextResponse.json({ success: true, message: 'Berhasil', data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { name, email, image, phone, location, plan, tokens } = await request.json();

    const updated = await (prisma.user as any).update({
      where: { id: session.userId },
      data: {
        name: name || undefined,
        email: email || undefined,
        image: image !== undefined ? image : undefined,
        phone: phone !== undefined ? phone : undefined,
        location: location !== undefined ? location : undefined,
        plan: plan !== undefined ? plan : undefined,
        tokens: tokens !== undefined ? tokens : undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        image: true,
        phone: true,
        location: true,
        plan: true,
        tokens: true
      }
    });

    return NextResponse.json({ success: true, message: 'Profil berhasil diperbarui!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
