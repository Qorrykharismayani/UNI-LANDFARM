import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

async function executeSchedule(scheduleId: number) {
  try {
    const schedule = await prisma.contentSchedule.findUnique({
      where: { id: scheduleId },
      include: { landingPage: true }
    });

    if (!schedule) {
      throw new Error('Jadwal tidak ditemukan');
    }

    if (schedule.status === 'Completed' || schedule.status === 'Failed') {
      return schedule;
    }

    const templateSection = await prisma.templateSection.findUnique({
      where: { landingPageId: schedule.landingPageId }
    });

    if (!templateSection) {
      throw new Error('Template section untuk landing page ini tidak ditemukan');
    }

    let contentJson = templateSection.contentJson ? JSON.parse(JSON.stringify(templateSection.contentJson)) : {};

    const component = schedule.component;
    const value = schedule.newValue;

    if (component === 'Hero Title') {
      if (!contentJson.hero) contentJson.hero = {};
      contentJson.hero.headline = value;
    } else if (component === 'Hero Subtitle') {
      if (!contentJson.hero) contentJson.hero = {};
      contentJson.hero.subheadline = value;
    } else if (component === 'Banner Promosi') {
      if (!contentJson.hero) contentJson.hero = {};
      contentJson.hero.banner = value;
    } else if (component === 'CTA Button') {
      if (!contentJson.hero) contentJson.hero = {};
      contentJson.hero.cta = value;
      if (!contentJson.cta) contentJson.cta = {};
      contentJson.cta.buttonText = value;
    } else if (component === 'Card Produk') {
      if (!Array.isArray(contentJson.products)) contentJson.products = [];
      if (contentJson.products.length > 0) {
        contentJson.products[0].description = value;
      } else {
        contentJson.products.push({ id: Date.now(), name: 'Produk Baru', description: value });
      }
    } else if (component === 'Card Layanan') {
      if (!Array.isArray(contentJson.advantages)) contentJson.advantages = [];
      if (contentJson.advantages.length > 0) {
        contentJson.advantages[0].description = value;
      } else {
        contentJson.advantages.push({ icon: 'Zap', title: 'Layanan Baru', description: value });
      }
    } else if (component === 'Testimoni') {
      if (!Array.isArray(contentJson.testimonials)) contentJson.testimonials = [];
      if (contentJson.testimonials.length > 0) {
        contentJson.testimonials[0].quote = value;
        contentJson.testimonials[0].content = value;
      } else {
        contentJson.testimonials.push({ quote: value, content: value, author: 'Pelanggan', name: 'Pelanggan' });
      }
    } else if (component === 'Kontak') {
      if (!contentJson.contact) contentJson.contact = {};
      contentJson.contact.whatsapp = value;
    }

    if (Array.isArray(contentJson.sections)) {
      contentJson.sections = contentJson.sections.map((sec: any) => {
        const type = sec.type || sec.id;
        if (type === 'hero' && contentJson.hero) {
          return { ...sec, content: contentJson.hero };
        }
        if (type === 'cta' && contentJson.cta) {
          return { ...sec, content: contentJson.cta };
        }
        if (type === 'products' && contentJson.products) {
          return { ...sec, content: contentJson.products };
        }
        if (type === 'advantages' && contentJson.advantages) {
          return { ...sec, content: contentJson.advantages };
        }
        if (type === 'testimonials' && contentJson.testimonials) {
          return { ...sec, content: contentJson.testimonials };
        }
        if (type === 'contact' && contentJson.contact) {
          return { ...sec, content: contentJson.contact };
        }
        return sec;
      });
    }

    await prisma.templateSection.update({
      where: { landingPageId: schedule.landingPageId },
      data: { contentJson }
    });

    const updatedSchedule = await prisma.contentSchedule.update({
      where: { id: scheduleId },
      data: { status: 'Completed' }
    });

    return updatedSchedule;
  } catch (error: any) {
    console.error(`Gagal eksekusi jadwal ${scheduleId}:`, error);
    try {
      await prisma.contentSchedule.update({
        where: { id: scheduleId },
        data: { status: 'Failed' }
      });
    } catch (dbErr) {
      console.error('Gagal memperbarui status ke Failed:', dbErr);
    }
    throw error;
  }
}

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

    const now = new Date();
    const dueSchedules = await prisma.contentSchedule.findMany({
      where: {
        userId: session.userId,
        status: { in: ['Scheduled', 'Queued'] },
        date: { lte: now }
      }
    });

    if (dueSchedules.length > 0) {
      await Promise.allSettled(
        dueSchedules.map(sched => executeSchedule(sched.id))
      );
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
      orderBy: { date: 'desc' }
    });

    return NextResponse.json({ success: true, message: 'Berhasil', data: schedules });
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

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

    const updated = await executeSchedule(schedule.id);

    return NextResponse.json({
      success: true,
      message: 'Jadwal berhasil dieksekusi secara manual!',
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Terjadi kesalahan sistem saat eksekusi.'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { id, title, component, newValue, date, status } = await request.json();

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
    if (component !== undefined) updateData.component = component.trim();
    if (newValue !== undefined) updateData.newValue = newValue.trim();
    if (date !== undefined) updateData.date = new Date(date);
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

    const { title, landingPageId, component, newValue, date, status } = await request.json();

    if (!title || title.trim() === '') {
      return NextResponse.json({ success: false, message: 'Nama jadwal wajib diisi.' }, { status: 400 });
    }
    if (!landingPageId) {
      return NextResponse.json({ success: false, message: 'Landing page wajib diasosiasikan.' }, { status: 400 });
    }
    if (!component || component.trim() === '') {
      return NextResponse.json({ success: false, message: 'Komponen yang diubah wajib diisi.' }, { status: 400 });
    }
    if (!newValue || newValue.trim() === '') {
      return NextResponse.json({ success: false, message: 'Nilai baru wajib diisi.' }, { status: 400 });
    }

    const parsedDate = date ? new Date(date) : new Date();

    const newSchedule = await prisma.contentSchedule.create({
      data: {
        userId: session.userId,
        landingPageId: Number(landingPageId),
        title: title.trim(),
        component: component.trim(),
        newValue: newValue.trim(),
        date: parsedDate,
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
