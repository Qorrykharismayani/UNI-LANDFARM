import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function PATCH(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { 
      platformName, 
      logo, 
      heroTitle, 
      heroDescription, 
      contactEmail, 
      whatsapp, 
      socialLinksJson, 
      footerText,
      featuresJson,
      testimonialsJson,
      faqsJson,
      pricingJson,
      userPageJson
    } = await request.json();

    const existing = await prisma.systemSetting.findFirst();
    let updated;
    if (existing) {
      updated = await prisma.systemSetting.update({
        where: { id: existing.id },
        data: {
          platformName: platformName || undefined,
          logo: logo || undefined,
          heroTitle: heroTitle || undefined,
          heroDescription: heroDescription || undefined,
          contactEmail: contactEmail || undefined,
          whatsapp: whatsapp || undefined,
          socialLinksJson: socialLinksJson || undefined,
          footerText: footerText || undefined,
          featuresJson: featuresJson !== undefined ? featuresJson : undefined,
          testimonialsJson: testimonialsJson !== undefined ? testimonialsJson : undefined,
          faqsJson: faqsJson !== undefined ? faqsJson : undefined,
          pricingJson: pricingJson !== undefined ? pricingJson : undefined,
          userPageJson: userPageJson !== undefined ? userPageJson : undefined
        }
      });
    } else {
      updated = await prisma.systemSetting.create({
        data: {
          platformName: platformName || 'Uni-LanFaram',
          logo: logo || 'Uni-LanFaram',
          heroTitle: heroTitle || 'Platform Landing Page Mikro Berbasis AI CMS',
          heroDescription: heroDescription || 'Bantu kembangkan bisnis agrikultur, UMKM, dan produk lokal Anda dengan landing page super cepat yang dikelola kecerdasan buatan.',
          contactEmail: contactEmail || 'hello@unilanfarm.com',
          whatsapp: whatsapp || '0812-9999-8888',
          socialLinksJson: socialLinksJson || {
            instagram: 'https://instagram.com/unilanfarm',
            facebook: 'https://facebook.com/unilanfarm',
            linkedin: 'https://linkedin.com/company/unilanfarm'
          },
          footerText: footerText || '© 2026 Uni-LanFaram. Dipersembahkan oleh Uni-Inside.',
          featuresJson: featuresJson || [],
          testimonialsJson: testimonialsJson || [],
          faqsJson: faqsJson || [],
          pricingJson: pricingJson || [],
          userPageJson: userPageJson || {}
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Pengaturan platform berhasil disimpan!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
