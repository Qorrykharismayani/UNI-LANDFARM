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

    let pages;
    if (session.role === 'ADMIN') {
      pages = await prisma.landingPage.findMany({
        include: {
          user: { select: { name: true, email: true } },
          template: { select: { name: true, category: true, thumbnail: true } },
          publishRequests: {
            orderBy: { requestedAt: 'desc' },
            take: 1
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      pages = await prisma.landingPage.findMany({
        where: { userId: session.userId },
        include: {
          template: { select: { name: true, category: true, thumbnail: true } },
          publishRequests: {
            orderBy: { requestedAt: 'desc' },
            take: 1
          }
        },
        orderBy: { createdAt: 'desc' }
      });

    }

    // Map fields so frontend receives formatted outputs matching expected state variables
    const formattedPages = pages.map(p => ({
      id: p.id,
      userId: p.userId,
      // Nested objects for admin monitoring panel
      user: (p as any).user ? { name: (p as any).user.name, email: (p as any).user.email } : { name: 'Tidak Diketahui' },
      template: { name: p.template.name, category: p.template.category, thumbnail: p.template.thumbnail },
      // Flattened fields for backward compatibility (user dashboard)
      userName: (p as any).user?.name || 'Sarah Anderson',
      name: p.businessName,
      businessName: p.businessName,
      title: p.title,
      createdDate: p.createdAt.toISOString().split('T')[0],
      status: p.status,
      views: p.views,
      type: p.template.category,
      image: p.template.thumbnail,
      slug: p.slug,
      url: p.publicUrl,
      adminNote: (p as any).publishRequests?.[0]?.rejectionReason || null
    }));

    return NextResponse.json({ success: true, message: 'Berhasil', data: formattedPages });
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

    const { templateId, title, businessName, slug, contentJson, tokenCost = 500 } = await request.json();

    if (!templateId || !title || !businessName || !slug) {
      return NextResponse.json({ success: false, message: 'Form data pembuatan draf tidak lengkap.' }, { status: 400 });
    }

    const existingSlug = await prisma.landingPage.findUnique({ where: { slug } });
    if (existingSlug) {
      return NextResponse.json({ success: false, message: 'Nama/slug website sudah terpakai. Pilih nama lain.' }, { status: 409 });
    }

    // Periksa saldo token user
    const user = await (prisma.user as any).findUnique({
      where: { id: session.userId },
      select: { tokens: true }
    });

    if (!user || user.tokens < tokenCost) {
      return NextResponse.json({ success: false, message: `Token tidak cukup. Biaya pembuatan adalah ${tokenCost} Token. Silakan beli token terlebih dahulu.` }, { status: 402 });
    }

    // Gunakan transaksi agar pembuatan halaman dan pengurangan token terjadi bersamaan
    const [newPage] = await prisma.$transaction([
      prisma.landingPage.create({
        data: {
          userId: session.userId,
          templateId: Number(templateId),
          title,
          businessName,
          slug,
          status: 'Draft',
          views: 0,
          content: {
            create: {
              contentJson: contentJson || {
                hero: { headline: title, subheadline: 'Website CMS baru Anda.', cta: 'Hubungi Kami' }
              }
            }
          }
        },
      }),
      (prisma.user as any).update({
        where: { id: session.userId },
        data: { tokens: { decrement: tokenCost } }
      }),
      (prisma.notification as any).create({
        data: {
          userId: session.userId,
          title: 'Draft Website Tersimpan',
          message: `Berhasil menyimpan draft untuk website: ${title}`,
          type: 'template',
          isRead: false
        }
      })
    ]);

    return NextResponse.json({ success: true, message: 'Draf berhasil dibuat!', data: newPage }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating landing page:', error);
    return NextResponse.json({ success: false, message: error.message || 'Gagal membuat draf.' }, { status: 500 });
  }
}
