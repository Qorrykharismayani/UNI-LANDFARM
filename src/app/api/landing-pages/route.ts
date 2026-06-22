import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
          content: true
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      pages = await prisma.landingPage.findMany({
        where: { userId: session.userId },
        include: {
          user: { select: { name: true, email: true } },
          template: { select: { name: true, category: true, thumbnail: true } },
          content: true
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    const formattedPages = pages.map((p) => {
      const contentJson = (p.content?.contentJson as any) || {};
      
      // Determine nested content if pages array exists
      let targetContent = contentJson;
      if (contentJson.pages && Array.isArray(contentJson.pages) && contentJson.pages.length > 0) {
        if (contentJson.pages[0].content) {
          targetContent = contentJson.pages[0].content;
        }
      }

      // Determine category: priority is p.category -> targetContent.category -> p.template.category
      const displayCategory = p.category || targetContent.category || p.template.category;
      
      // Determine thumbnail: priority is targetContent.hero?.banner -> targetContent.logo -> p.template.thumbnail
      let displayImage = p.template.thumbnail;
      if (targetContent.hero && targetContent.hero.banner) {
        displayImage = targetContent.hero.banner;
      } else if (targetContent.logo) {
        displayImage = targetContent.logo;
      } else if (targetContent.products && Array.isArray(targetContent.products) && targetContent.products.length > 0 && targetContent.products[0].image) {
        displayImage = targetContent.products[0].image;
      } else if (targetContent.gallery && Array.isArray(targetContent.gallery) && targetContent.gallery.length > 0 && typeof targetContent.gallery[0] === 'string') {
        displayImage = targetContent.gallery[0];
      }

      return {
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
        createdAt: p.createdAt.toISOString(),
        publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
        status: p.status,
        views: p.views,
        type: displayCategory,
        image: displayImage,
        slug: p.slug,
        url: p.publicUrl,
        adminNote: null
      };
    });

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

    const { templateId, title, businessName, slug, category, description, themeColor, contentJson, tokenCost = 500 } = await request.json();

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
      await (prisma.notification as any).create({
        data: {
          userId: session.userId,
          title: 'Token Habis / Tidak Cukup',
          message: `Pembuatan website gagal karena token tidak cukup. Dibutuhkan ${tokenCost} Token.`,
          type: 'warning',
          isRead: false
        }
      });
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
          category: category || null,
          description: description || null,
          themeColor: themeColor || null,
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
      }),
      (prisma.notification as any).create({
        data: {
          userId: session.userId,
          title: 'Token Berkurang',
          message: `Sebanyak ${tokenCost} Token telah digunakan untuk membuat Landing Page ${title}.`,
          type: 'info',
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
