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
      userPageJson
    } = await request.json();

    const updated = await prisma.systemSetting.update({
      where: { id: 'default' },
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
        userPageJson: userPageJson !== undefined ? userPageJson : undefined
      }
    });

    return NextResponse.json({ success: true, message: 'Pengaturan platform berhasil disimpan!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
