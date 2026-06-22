import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 1 minute max duration for vercel hobby

export async function GET(request: Request) {
  try {
    // Note: To secure this in production, you should check for a cron secret header.
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }

    const now = new Date();

    // Cari jadwal yang perlu dieksekusi
    const dueSchedules = await prisma.contentSchedule.findMany({
      where: {
        status: { in: ['Scheduled', 'SCHEDULED'] },
        scheduledAt: { lte: now }
      },
      include: { landingPage: true }
    });

    if (dueSchedules.length === 0) {
      return NextResponse.json({ success: true, message: 'Tidak ada jadwal yang perlu dieksekusi.', executedCount: 0 });
    }

    let executedCount = 0;
    const errors: any[] = [];

    for (const schedule of dueSchedules) {
      try {
        const templateSection = await prisma.templateSection.findUnique({
          where: { landingPageId: schedule.landingPageId }
        });

        if (!templateSection) {
          throw new Error('Template section tidak ditemukan.');
        }

        let dbContentJson = templateSection.contentJson ? JSON.parse(JSON.stringify(templateSection.contentJson)) : {};

        // Penanganan struktur multi-page UNI-LANDFARM
        let targetContent = dbContentJson;
        if (dbContentJson.pages && Array.isArray(dbContentJson.pages) && dbContentJson.pages.length > 0) {
          // Asumsikan update halaman pertama (Beranda)
          if (!dbContentJson.pages[0].content) dbContentJson.pages[0].content = {};
          targetContent = dbContentJson.pages[0].content;
        }

        const sectionName = schedule.sectionName || 'hero';
        const component = schedule.component;
        let value = schedule.newValue;
        let imageUrl = null;
        let aiPayload: any = null;
        
        try {
          const parsed = JSON.parse(schedule.newValue);
          if (typeof parsed === 'object' && parsed !== null) {
            if ('text' in parsed || 'image' in parsed) {
              value = parsed.text || '';
              imageUrl = parsed.image || null;
            }
            if ('aiPayload' in parsed) {
              aiPayload = parsed.aiPayload;
            }
          }
        } catch (e) {
          // Fallback to raw string jika bukan JSON
        }

        // Inisialisasi section object jika belum ada
        if (!targetContent[sectionName]) {
          targetContent[sectionName] = {};
        }

        // Logic memetakan component ke field di JSON content
        // Frontend mengirim component: 'Content', jadi kita map berdasar sectionName
        if (component === 'Hero Title' || (sectionName === 'hero' && component === 'Content')) {
          if (aiPayload) {
            targetContent[sectionName].headline = aiPayload.headline || value;
            targetContent[sectionName].subheadline = aiPayload.subheadline || '';
            if (aiPayload.cta) targetContent[sectionName].cta = aiPayload.cta;
          } else {
            targetContent[sectionName].headline = value;
          }
          if (imageUrl) targetContent[sectionName].image = imageUrl;
        } else if (component === 'Hero Subtitle') {
          targetContent[sectionName].subheadline = value;
        } else if (component === 'Banner Promosi') {
          targetContent[sectionName].banner = value;
        } else if (component === 'CTA Button' || (sectionName === 'cta' && component === 'Content')) {
          if (!targetContent.cta) targetContent.cta = {};
          if (aiPayload) {
            targetContent.cta.title = aiPayload.headline || value;
            targetContent.cta.description = aiPayload.subheadline || '';
            targetContent.cta.buttonText = aiPayload.cta || '';
          } else {
            targetContent.cta.headline = value;
            targetContent.cta.buttonText = value;
          }
          if (imageUrl) targetContent.cta.image = imageUrl;
        } else if (component === 'Card Produk' || (sectionName === 'products' && component === 'Content')) {
          if (!Array.isArray(targetContent.products)) targetContent.products = [];
          if (aiPayload) {
             if (targetContent.products.length > 0) {
               targetContent.products[0] = { ...targetContent.products[0], name: aiPayload.headline, description: aiPayload.subheadline, price: aiPayload.price || '' };
               if (imageUrl) targetContent.products[0].image = imageUrl;
             } else {
               targetContent.products.push({ name: aiPayload.headline, description: aiPayload.subheadline, price: aiPayload.price || '', image: imageUrl || '' });
             }
          } else {
            if (targetContent.products.length > 0) {
              targetContent.products[0].description = value;
              if (imageUrl) targetContent.products[0].image = imageUrl;
            } else {
              targetContent.products.push({ id: Date.now(), name: schedule.title || 'Produk', description: value, image: imageUrl });
            }
          }
        } else if (component === 'Card Layanan' || (sectionName === 'advantages' && component === 'Content')) {
          if (!Array.isArray(targetContent.advantages)) targetContent.advantages = [];
          if (aiPayload) {
            if (targetContent.advantages.length > 0) {
              targetContent.advantages[0] = { ...targetContent.advantages[0], title: aiPayload.headline, description: aiPayload.subheadline };
              if (imageUrl) targetContent.advantages[0].image = imageUrl;
            } else {
              targetContent.advantages.push({ icon: 'Star', title: aiPayload.headline, description: aiPayload.subheadline, image: imageUrl || '' });
            }
          } else {
            if (targetContent.advantages.length > 0) {
              targetContent.advantages[0].description = value;
              if (imageUrl) targetContent.advantages[0].image = imageUrl;
            } else {
              targetContent.advantages.push({ icon: 'Zap', title: schedule.title || 'Layanan', description: value, image: imageUrl });
            }
          }
        } else if (component === 'Testimoni' || (sectionName === 'testimonials' && component === 'Content')) {
          if (!Array.isArray(targetContent.testimonials)) targetContent.testimonials = [];
          if (aiPayload) {
            if (targetContent.testimonials.length > 0) {
              targetContent.testimonials[0] = { ...targetContent.testimonials[0], name: aiPayload.headline, content: aiPayload.subheadline };
              if (imageUrl) targetContent.testimonials[0].photo = imageUrl;
            } else {
              targetContent.testimonials.push({ name: aiPayload.headline, content: aiPayload.subheadline, photo: imageUrl || '' });
            }
          } else {
            if (targetContent.testimonials.length > 0) {
              targetContent.testimonials[0].quote = value;
              targetContent.testimonials[0].content = value;
              if (imageUrl) targetContent.testimonials[0].photo = imageUrl;
            } else {
              targetContent.testimonials.push({ quote: value, content: value, author: schedule.title || 'Pelanggan', name: schedule.title || 'Pelanggan', photo: imageUrl });
            }
          }
        } else if (component === 'Kontak' || (sectionName === 'contact' && component === 'Content')) {
          if (!targetContent.contact) targetContent.contact = {};
          if (aiPayload) {
             targetContent.contact.address = aiPayload.subheadline || value;
          } else {
             targetContent.contact.whatsapp = value;
          }
        } else if (sectionName === 'about' && component === 'Content') {
          if (aiPayload) {
            targetContent[sectionName].description = aiPayload.subheadline || value;
          } else {
            targetContent[sectionName].description = value;
          }
          if (imageUrl) targetContent[sectionName].image = imageUrl;
        } else if (sectionName === 'logo' && component === 'Content') {
          if (typeof targetContent.logo === 'object' && targetContent.logo !== null) {
            targetContent.logo.url = imageUrl || value;
          } else {
            targetContent.logo = imageUrl || value;
          }
        } else if (sectionName === 'navbar' && component === 'Content') {
          targetContent.navbar = targetContent.navbar || {};
          targetContent.navbar.businessName = value;
        } else if (sectionName === 'footer' && component === 'Content') {
          targetContent.footer = targetContent.footer || {};
          targetContent.footer.copyright = value;
        } else if (sectionName === 'gallery' && component === 'Content') {
          if (!Array.isArray(targetContent.gallery)) targetContent.gallery = [];
          if (imageUrl) {
            targetContent.gallery.push({ id: Date.now(), url: imageUrl, caption: value });
          }
        } else {
           // Fallback general update
           targetContent[sectionName][component] = value;
        }

        // Sinkronisasi array 'sections' jika diperlukan oleh Editor component
        if (Array.isArray(targetContent.sections)) {
          targetContent.sections = targetContent.sections.map((sec: any) => {
            const type = sec.type || sec.id;
            if (type === sectionName) {
              return { ...sec, content: targetContent[sectionName] };
            }
            // Juga sinkronkan CTA jika update diubah via hero CTA
            if (type === 'cta' && targetContent.cta && (component === 'CTA Button' || (sectionName === 'cta' && component === 'Content'))) {
                return { ...sec, content: targetContent.cta };
            }
            return sec;
          });
        }

        // Simpan pembaruan ke TemplateSection
        await prisma.templateSection.update({
          where: { landingPageId: schedule.landingPageId },
          data: { contentJson: dbContentJson }
        });

        // Update status ContentSchedule menjadi Completed
        await prisma.contentSchedule.update({
          where: { id: schedule.id },
          data: { 
            status: 'Completed',
            executedAt: new Date()
          }
        });

        executedCount++;
      } catch (err: any) {
        console.error(`Gagal mengeksekusi jadwal ID ${schedule.id}:`, err);
        errors.push({ scheduleId: schedule.id, error: err.message });
        
        // Tandai sebagai Failed
        await prisma.contentSchedule.update({
          where: { id: schedule.id },
          data: { 
            status: 'Failed',
            executedAt: new Date()
          }
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Berhasil mengeksekusi ${executedCount} jadwal.`,
      executedCount,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ success: false, message: 'Gagal menjalankan proses jadwal konten.', error: error.message }, { status: 500 });
  }
}
