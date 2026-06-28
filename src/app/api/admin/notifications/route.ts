import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/notifications — Fetch all notifications from database
export async function GET(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const notifications = await (prisma.notification as any).findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: notifications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/admin/notifications — Send notification to specific user or all users (broadcast)
export async function POST(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const body = await request.json();
    const { targetUserId, title, message, type } = body;

    if (!title || !message) {
      return NextResponse.json({ success: false, message: 'Judul dan pesan wajib diisi.' }, { status: 400 });
    }

    // Broadcast to all users
    if (targetUserId === 'ALL') {
      const allUsers = await prisma.user.findMany({ select: { id: true } });
      const notificationsData = allUsers.map(u => ({
        userId: u.id,
        title,
        message,
        type: type || 'system',
        isRead: false,
      }));

      await (prisma.notification as any).createMany({
        data: notificationsData,
      });

      return NextResponse.json({ success: true, message: `Berhasil mengirim notifikasi ke ${allUsers.length} pengguna.` });
    } else {
      // Send to single user
      const uId = Number(targetUserId);
      if (isNaN(uId)) {
        return NextResponse.json({ success: false, message: 'Target pengguna tidak valid.' }, { status: 400 });
      }

      const newNotif = await (prisma.notification as any).create({
        data: {
          userId: uId,
          title,
          message,
          type: type || 'system',
          isRead: false,
        },
      });

      return NextResponse.json({ success: true, message: 'Notifikasi berhasil dikirim.', data: newNotif });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/notifications — Delete a notification by ID
export async function DELETE(request: Request) {
  try {
    const session = getSessionFromCookies(request.headers.get('cookie'));
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID notifikasi wajib disertakan.' }, { status: 400 });
    }

    await (prisma.notification as any).delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Notifikasi berhasil dihapus.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
