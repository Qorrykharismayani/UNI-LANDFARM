import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const page = await prisma.landingPage.findUnique({
      where: { id: Number(id) },
      include: {
        content: true,
        template: true,
        publishRequests: {
          orderBy: { requestedAt: 'desc' },
          take: 1
        }
      }
    });

    if (!page) {
      return NextResponse.json({ success: false, message: 'Landing page tidak ditemukan.' }, { status: 404 });
    }

    if (session.role !== 'ADMIN' && page.userId !== session.userId) {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    const adminNote = page.publishRequests?.[0]?.rejectionReason || null;
    const responseData = {
      ...page,
      adminNote
    };

    return NextResponse.json({ success: true, message: 'Berhasil', data: responseData });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const page = await prisma.landingPage.findUnique({ where: { id: Number(id) } });
    if (!page) {
      return NextResponse.json({ success: false, message: 'Landing page tidak ditemukan.' }, { status: 404 });
    }

    if (session.role !== 'ADMIN' && page.userId !== session.userId) {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }


    const { title, businessName, slug, status, publicUrl, publishedAt, contentJson } = await request.json();

    const updated = await prisma.landingPage.update({
      where: { id: Number(id) },
      data: {
        title: title || undefined,
        businessName: businessName || undefined,
        slug: slug || undefined,
        status: status || undefined,
        publicUrl: publicUrl || undefined,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        content: contentJson ? {
          upsert: {
            create: { contentJson },
            update: { contentJson }
          }
        } : undefined
      },
      include: { content: true }
    });

    return NextResponse.json({ success: true, message: 'Landing page berhasil diperbarui!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const page = await prisma.landingPage.findUnique({ where: { id: Number(id) } });
    if (!page) {
      return NextResponse.json({ success: false, message: 'Landing page tidak ditemukan.' }, { status: 404 });
    }

    if (session.role !== 'ADMIN' && page.userId !== session.userId) {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    // Set landingPageId of associated MediaFile records to null to avoid foreign key restrict errors
    await prisma.mediaFile.updateMany({
      where: { landingPageId: Number(id) },
      data: { landingPageId: null }
    });

    await prisma.landingPage.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true, message: 'Landing page berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
