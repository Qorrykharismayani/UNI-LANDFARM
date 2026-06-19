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
        status: 'Scheduled',
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

        let contentJson = templateSection.contentJson ? JSON.parse(JSON.stringify(templateSection.contentJson)) : {};
        const sectionName = schedule.sectionName || 'hero';
        const component = schedule.component;
        const value = schedule.newValue;

        // Inisialisasi section object jika belum ada
        if (!contentJson[sectionName]) {
          contentJson[sectionName] = {};
        }

        // Logic memetakan component ke field di JSON content
        // Menyesuaikan dengan standar format section di UNI-LANDFARM
        if (component === 'Hero Title') {
          contentJson[sectionName].headline = value;
        } else if (component === 'Hero Subtitle') {
          contentJson[sectionName].subheadline = value;
        } else if (component === 'Banner Promosi') {
          contentJson[sectionName].banner = value;
        } else if (component === 'CTA Button') {
          contentJson[sectionName].cta = value;
          if (contentJson.cta) contentJson.cta.buttonText = value;
        } else if (component === 'Card Produk' && sectionName === 'products') {
          if (!Array.isArray(contentJson.products)) contentJson.products = [];
          if (contentJson.products.length > 0) {
            contentJson.products[0].description = value;
          } else {
            contentJson.products.push({ id: Date.now(), name: 'Produk Baru', description: value });
          }
        } else if (component === 'Card Layanan' && sectionName === 'advantages') {
          if (!Array.isArray(contentJson.advantages)) contentJson.advantages = [];
          if (contentJson.advantages.length > 0) {
            contentJson.advantages[0].description = value;
          } else {
            contentJson.advantages.push({ icon: 'Zap', title: 'Layanan Baru', description: value });
          }
        } else if (component === 'Testimoni' && sectionName === 'testimonials') {
          if (!Array.isArray(contentJson.testimonials)) contentJson.testimonials = [];
          if (contentJson.testimonials.length > 0) {
            contentJson.testimonials[0].quote = value;
            contentJson.testimonials[0].content = value;
          } else {
            contentJson.testimonials.push({ quote: value, content: value, author: 'Pelanggan', name: 'Pelanggan' });
          }
        } else if (component === 'Kontak' && sectionName === 'contact') {
          contentJson.contact.whatsapp = value;
        } else {
           // Fallback general update
           contentJson[sectionName][component] = value;
        }

        // Sinkronisasi array 'sections' jika diperlukan oleh Editor component
        if (Array.isArray(contentJson.sections)) {
          contentJson.sections = contentJson.sections.map((sec: any) => {
            const type = sec.type || sec.id;
            if (type === sectionName) {
              return { ...sec, content: contentJson[sectionName] };
            }
            // Juga sinkronkan CTA jika update diubah via hero CTA
            if (type === 'cta' && contentJson.cta && component === 'CTA Button') {
                return { ...sec, content: contentJson.cta };
            }
            return sec;
          });
        }

        // Simpan pembaruan ke TemplateSection
        await prisma.templateSection.update({
          where: { landingPageId: schedule.landingPageId },
          data: { contentJson }
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
