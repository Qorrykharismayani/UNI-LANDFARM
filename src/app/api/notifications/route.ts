import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

// GET /api/notifications — Fetch all notifications for current user
export async function GET(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session) {
      return NextResponse.json({ success: false, message: 'Belum login.' }, { status: 401 });
    }

    const notifications = await (prisma.notification as any).findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: notifications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/notifications — Create a notification
export async function POST(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session) {
      return NextResponse.json({ success: false, message: 'Belum login.' }, { status: 401 });
    }

    const body = await request.json();
    const { title, message, type } = body;

    if (!title || !message) {
      return NextResponse.json({ success: false, message: 'Data tidak lengkap.' }, { status: 400 });
    }

    const notification = await (prisma.notification as any).create({
      data: {
        userId: session.userId,
        title,
        message,
        type: type || 'info',
        isRead: false,
      },
    });

    return NextResponse.json({ success: true, data: notification });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PATCH /api/notifications — Mark all or single notification as read
export async function PATCH(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session) {
      return NextResponse.json({ success: false, message: 'Belum login.' }, { status: 401 });
    }

    let id: number | undefined;
    try {
      const body = await request.json();
      if (body && body.id) {
        id = Number(body.id);
      }
    } catch (e) {
      // Body might be empty
    }

    if (id) {
      await (prisma.notification as any).updateMany({
        where: { id: id, userId: session.userId, isRead: false },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: 'Notifikasi ditandai dibaca.' });
    } else {
      await (prisma.notification as any).updateMany({
        where: { userId: session.userId, isRead: false },
        data: { isRead: true },
      });
      return NextResponse.json({ success: true, message: 'Semua notifikasi ditandai dibaca.' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/notifications — Delete all notifications for current user
export async function DELETE(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session) {
      return NextResponse.json({ success: false, message: 'Belum login.' }, { status: 401 });
    }

    await (prisma.notification as any).deleteMany({
      where: { userId: session.userId },
    });

    return NextResponse.json({ success: true, message: 'Semua notifikasi dihapus.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
