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

    const { searchParams } = new URL(request.url);
    const landingPageId = searchParams.get('landingPageId');

    const whereClause: any = { userId: session.userId };
    if (landingPageId) {
      whereClause.landingPageId = Number(landingPageId);
    }

    const schedules = await prisma.contentSchedule.findMany({
      where: whereClause,
      include: {
        landingPage: {
          select: {
            title: true
          }
        }
      },
      orderBy: { scheduledAt: 'desc' }
    });

    return NextResponse.json({ success: true, message: 'Berhasil', data: schedules });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { id, title, sectionName, component, newValue, oldValue, scheduledAt, status } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID jadwal wajib disertakan.' }, { status: 400 });
    }

    const schedule = await prisma.contentSchedule.findUnique({
      where: { id: Number(id) }
    });

    if (!schedule) {
      return NextResponse.json({ success: false, message: 'Jadwal tidak ditemukan.' }, { status: 404 });
    }

    if (schedule.userId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (sectionName !== undefined) updateData.sectionName = sectionName.trim();
    if (component !== undefined) updateData.component = component.trim();
    if (newValue !== undefined) updateData.newValue = newValue.trim();
    if (oldValue !== undefined) updateData.oldValue = oldValue;
    if (scheduledAt !== undefined) updateData.scheduledAt = new Date(scheduledAt);
    if (status !== undefined) updateData.status = status;

    const updatedSchedule = await prisma.contentSchedule.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        landingPage: {
          select: {
            title: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Jadwal berhasil diperbarui!',
      data: updatedSchedule
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { title, landingPageId, sectionName, component, newValue, oldValue, scheduledAt, status } = await request.json();

    if (!title || title.trim() === '') {
      return NextResponse.json({ success: false, message: 'Nama jadwal wajib diisi.' }, { status: 400 });
    }
    if (!landingPageId) {
      return NextResponse.json({ success: false, message: 'Landing page wajib diasosiasikan.' }, { status: 400 });
    }
    if (!sectionName || sectionName.trim() === '') {
      return NextResponse.json({ success: false, message: 'Section wajib diisi.' }, { status: 400 });
    }
    if (!component || component.trim() === '') {
      return NextResponse.json({ success: false, message: 'Komponen yang diubah wajib diisi.' }, { status: 400 });
    }
    if (!newValue || newValue.trim() === '') {
      return NextResponse.json({ success: false, message: 'Nilai baru wajib diisi.' }, { status: 400 });
    }

    const parsedDate = scheduledAt ? new Date(scheduledAt) : new Date();

    const newSchedule = await prisma.contentSchedule.create({
      data: {
        userId: session.userId,
        landingPageId: Number(landingPageId),
        title: title.trim(),
        sectionName: sectionName.trim(),
        component: component.trim(),
        oldValue: oldValue || null,
        newValue: newValue.trim(),
        scheduledAt: parsedDate,
        status: status || 'Scheduled'
      },
      include: {
        landingPage: {
          select: {
            title: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, message: 'Jadwal konten berhasil dibuat!', data: newSchedule });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID jadwal wajib disertakan.' }, { status: 400 });
    }

    const schedule = await prisma.contentSchedule.findUnique({ where: { id: Number(id) } });
    if (!schedule) {
      return NextResponse.json({ success: false, message: 'Jadwal tidak ditemukan.' }, { status: 404 });
    }

    if (schedule.userId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    await prisma.contentSchedule.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true, message: 'Jadwal berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
