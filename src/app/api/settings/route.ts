import { NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/db';

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({
      success: true,
      message: 'Offline / Database belum terhubung. Menggunakan data default.',
      data: {
        id: 1,
        platformName: 'Uni-LanFaram',
        logo: 'Uni-LanFaram',
        heroTitle: 'Platform Landing Page Mikro Berbasis AI CMS',
        heroDescription: 'Bantu kembangkan bisnis agrikultur, UMKM, dan produk lokal Anda dengan landing page super cepat yang dikelola kecerdasan buatan.',
        contactEmail: 'hello@unilanfarm.com',
        whatsapp: '0812-9999-8888',
        socialLinksJson: {
          instagram: 'https://instagram.com/unilanfarm',
          facebook: 'https://facebook.com/unilanfarm',
          linkedin: 'https://linkedin.com/company/unilanfarm'
        },
        footerText: '© 2026 Uni-LanFaram. Dipersembahkan oleh Uni-Inside.',
        featuresJson: [
          { title: "Pembuatan Instan", desc: "Buat landing page profesional hanya dalam hitungan menit dengan sistem otomatis berbasis AI.", icon: "Zap", num: "01" },
          { title: "Pustaka Template", desc: "Tersedia berbagai template modern dan premium yang siap digunakan untuk semua kebutuhan bisnis.", icon: "Folder", num: "02" },
          { title: "Responsif Seluler", desc: "Tampilan website otomatis menyesuaikan semua perangkat mulai dari mobile hingga desktop.", icon: "Smartphone", num: "03" },
          { title: "Pembayaran Mudah", desc: "Sistem pembayaran digital yang praktis, cepat, dan aman untuk berbagai kebutuhan transaksi online.", icon: "Wallet", num: "04" },
          { title: "Analitik", desc: "Pantau performa website dan aktivitas pengunjung melalui dashboard analitik real-time.", icon: "BarChart3", num: "05" }
        ],
        testimonialsJson: [
          { name: "Budi Santoso", role: "CEO of TechFlow", content: "Uni-LandFarm benar-benar mengubah cara kami mengelola kehadiran digital. AI-nya sangat intuitif dan membantu kami menghemat waktu hingga 70%.", avatar: "https://picsum.photos/seed/budi/100/100" },
          { name: "Sari Wijaya", role: "Founder of CreativeHub", content: "Landing page yang dihasilkan AI sangat profesional. Saya tidak menyangka bisa membangun situs sekelas agensi dalam hitungan menit.", avatar: "https://picsum.photos/seed/sari/100/100" },
          { name: "Andi Pratama", role: "Marketing Director", content: "Fitur Agentic AI CMS adalah game changer. Konten kami sekarang teroptimasi secara otomatis untuk SEO dan audiens kami.", avatar: "https://picsum.photos/seed/andi/100/100" }
        ],
        faqsJson: [
          { q: "Apakah saya perlu keahlian coding?", a: "Tidak sama sekali. Uni-LandFarm dirancang untuk pebisnis tanpa latar belakang teknis. AI kami menangani semua aspek teknis.", color: "bg-blue-500" },
          { q: "Berapa lama waktu yang dibutuhkan untuk membuat situs?", a: "Hanya butuh sekitar 30-60 detik untuk menghasilkan draf pertama yang profesional.", color: "bg-purple-500" },
          { q: "Bagaimana cara mengubah konten landing page?", a: "Anda dapat mengubah teks, gambar, tombol, dan informasi lainnya langsung melalui CMS Editor. Perubahan dapat disimpan atau dijadwalkan untuk diterapkan secara otomatis.", color: "bg-indigo-500" },
          { q: "Bisakah saya menggunakan domain sendiri?", a: "Tentu. Anda dapat menghubungkan domain kustom Anda dengan mudah di dashboard.", color: "bg-violet-500" }
        ],
        pricingJson: [
          { name: 'PAKET BASIC', price: 'Rp 75.000', description: 'Untuk kebutuhan desain dasar.', features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '500-800 token'], buttonText: 'BELI 800 TOKEN', isPopular: false, gradient: 'from-blue-500 to-cyan-400' },
          { name: 'PAKET STANDARD', price: 'Rp 150.000', description: 'Untuk pebisnis profesional.', features: ['3 prompt', 'Bebas Rasio', '3 konsep infografis', '1500-2000 token', 'Revisi 1x'], buttonText: 'BELI 2000 TOKEN', isPopular: true, gradient: 'from-amber-400 to-orange-500' },
          { name: 'PAKET PREMIUM', price: 'Rp 300.000', description: 'Solusi lengkap agensi digital.', features: ['Bebas prompt', 'Semua fitur AI', 'Unlimited konsep', '5000+ token', 'Revisi unlimited', 'Prioritas Support'], buttonText: 'BELI 5000+ TOKEN', isPopular: false, gradient: 'from-violet-500 to-purple-600' }
        ],
        userPageJson: {
          welcomeTitle: "Halo, Pebisnis Modern!",
          welcomeSubtitle: "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?",
          guides: [
            {
              title: "Panduan Memulai Uni-LandFarm",
              desc: "Pelajari langkah awal membuat landing page menggunakan template yang tersedia.",
              time: "Membaca 3 Menit",
              icon: "Zap",
              bg: "bg-blue-500/5 dark:bg-blue-600/10",
              steps: [
                "Pilih template landing page",
                "Isi data usaha",
                "Simpan landing page sebagai draft"
              ]
            },
            {
              title: "Panduan Pengelolaan CMS",
              desc: "Kelola konten landing page seperti teks, gambar, kontak, tautan, dan informasi promosi melalui CMS.",
              time: "Membaca 4 Menit",
              icon: "Database",
              bg: "bg-purple-500/5 dark:bg-purple-600/10",
              steps: [
                "Edit teks dan gambar",
                "Kelola navigasi dan section",
                "Simpan perubahan konten"
              ]
            },
            {
              title: "Panduan Template Landing Page",
              desc: "Pahami cara memilih dan menyesuaikan template landing page sesuai kebutuhan bisnis.",
              time: "Membaca 3 Menit",
              icon: "Layout",
              bg: "bg-emerald-500/5 dark:bg-emerald-600/10",
              steps: [
                "Pilih template yang sesuai",
                "Sesuaikan konten dan tampilan",
                "Lihat hasil melalui preview"
              ]
            },
            {
              title: "Panduan Publikasi Landing Page",
              desc: "Pelajari proses publikasi instan hingga landing page langsung aktif dapat diakses oleh publik.",
              time: "Membaca 2 Menit",
              icon: "Rocket",
              bg: "bg-amber-500/5 dark:bg-amber-600/10",
              steps: [
                "Periksa preview landing page",
                "Klik Publish Landing Page",
                "Situs langsung aktif secara online"
              ]
            }
          ]
        }
      }
    });
  }

  try {
    const settings = await prisma.systemSetting.findFirst();
    const defaultGuides = [
      {
        title: "Panduan Memulai Uni-LandFarm",
        desc: "Pelajari langkah awal membuat landing page menggunakan template yang tersedia.",
        time: "Membaca 3 Menit",
        icon: "Zap",
        bg: "bg-blue-500/5 dark:bg-blue-600/10",
        steps: [
          "Pilih template landing page",
          "Isi data usaha",
          "Simpan landing page sebagai draft"
        ]
      },
      {
        title: "Panduan Pengelolaan CMS",
        desc: "Kelola konten landing page seperti teks, gambar, kontak, tautan, dan informasi promosi melalui CMS.",
        time: "Membaca 4 Menit",
        icon: "Database",
        bg: "bg-purple-500/5 dark:bg-purple-600/10",
        steps: [
          "Edit teks dan gambar",
          "Kelola navigasi dan section",
          "Simpan perubahan konten"
        ]
      },
      {
        title: "Panduan Template Landing Page",
        desc: "Pahami cara memilih dan menyesuaikan template landing page sesuai kebutuhan bisnis.",
        time: "Membaca 3 Menit",
        icon: "Layout",
        bg: "bg-emerald-500/5 dark:bg-emerald-600/10",
        steps: [
          "Pilih template yang sesuai",
          "Sesuaikan konten dan tampilan",
          "Lihat hasil melalui preview"
        ]
      },
      {
        title: "Panduan Publikasi Landing Page",
        desc: "Pelajari proses publikasi instan hingga landing page langsung aktif dapat diakses oleh publik.",
        time: "Membaca 2 Menit",
        icon: "Rocket",
        bg: "bg-amber-500/5 dark:bg-amber-600/10",
        steps: [
          "Periksa preview landing page",
          "Klik Publish Landing Page",
          "Situs langsung aktif secara online"
        ]
      }
    ];

    if (settings) {
      if (!settings.featuresJson) {
        settings.featuresJson = [
          { title: "Pembuatan Instan", desc: "Buat landing page profesional hanya dalam hitungan menit dengan sistem otomatis berbasis AI.", icon: "Zap", num: "01" },
          { title: "Pustaka Template", desc: "Tersedia berbagai template modern dan premium yang siap digunakan untuk semua kebutuhan bisnis.", icon: "Folder", num: "02" },
          { title: "Responsif Seluler", desc: "Tampilan website otomatis menyesuaikan semua perangkat mulai dari mobile hingga desktop.", icon: "Smartphone", num: "03" },
          { title: "Pembayaran Mudah", desc: "Sistem pembayaran digital yang praktis, cepat, dan aman untuk berbagai kebutuhan transaksi online.", icon: "Wallet", num: "04" },
          { title: "Analitik", desc: "Pantau performa website dan aktivitas pengunjung melalui dashboard analitik real-time.", icon: "BarChart3", num: "05" }
        ];
      }
      if (!settings.testimonialsJson) {
        settings.testimonialsJson = [
          { name: "Budi Santoso", role: "CEO of TechFlow", content: "Uni-LandFarm benar-benar mengubah cara kami mengelola kehadiran digital. AI-nya sangat intuitif dan membantu kami menghemat waktu hingga 70%.", avatar: "https://picsum.photos/seed/budi/100/100" },
          { name: "Sari Wijaya", role: "Founder of CreativeHub", content: "Landing page yang dihasilkan AI sangat profesional. Saya tidak menyangka bisa membangun situs sekelas agensi dalam hitungan menit.", avatar: "https://picsum.photos/seed/sari/100/100" },
          { name: "Andi Pratama", role: "Marketing Director", content: "Fitur Agentic AI CMS adalah game changer. Konten kami sekarang teroptimasi secara otomatis untuk SEO dan audiens kami.", avatar: "https://picsum.photos/seed/andi/100/100" }
        ];
      }
      if (!settings.faqsJson) {
        settings.faqsJson = [
          { q: "Apakah saya perlu keahlian coding?", a: "Tidak sama sekali. Uni-LandFarm dirancang untuk pebisnis tanpa latar belakang teknis. AI kami menangani semua aspek teknis.", color: "bg-blue-500" },
          { q: "Berapa lama waktu yang dibutuhkan untuk membuat situs?", a: "Hanya butuh sekitar 30-60 detik untuk menghasilkan draf pertama yang profesional.", color: "bg-purple-500" },
          { q: "Bagaimana cara mengubah konten landing page?", a: "Anda dapat mengubah teks, gambar, tombol, dan informasi lainnya langsung melalui CMS Editor. Perubahan dapat disimpan atau dijadwalkan untuk diterapkan secara otomatis.", color: "bg-indigo-500" },
          { q: "Bisakah saya menggunakan domain sendiri?", a: "Tentu. Anda dapat menghubungkan domain kustom Anda dengan mudah di dashboard.", color: "bg-violet-500" }
        ];
      }
      if (!settings.pricingJson) {
        settings.pricingJson = [
          { name: 'PAKET BASIC', price: 'Rp 75.000', description: 'Untuk kebutuhan desain dasar.', features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '500-800 token'], buttonText: 'BELI 800 TOKEN', isPopular: false, gradient: 'from-blue-500 to-cyan-400' },
          { name: 'PAKET STANDARD', price: 'Rp 150.000', description: 'Untuk pebisnis profesional.', features: ['3 prompt', 'Bebas Rasio', '3 konsep infografis', '1500-2000 token', 'Revisi 1x'], buttonText: 'BELI 2000 TOKEN', isPopular: true, gradient: 'from-amber-400 to-orange-500' },
          { name: 'PAKET PREMIUM', price: 'Rp 300.000', description: 'Solusi lengkap agensi digital.', features: ['Bebas prompt', 'Semua fitur AI', 'Unlimited konsep', '5000+ token', 'Revisi unlimited', 'Prioritas Support'], buttonText: 'BELI 5000+ TOKEN', isPopular: false, gradient: 'from-violet-500 to-purple-600' }
        ];
      }
      if (!settings.userPageJson) {
        settings.userPageJson = {
          welcomeTitle: "Halo, Pebisnis Modern!",
          welcomeSubtitle: "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?",
          guides: defaultGuides
        };
      } else {
        const userPage = settings.userPageJson as any;
        if (!userPage.guides) {
          userPage.guides = defaultGuides;
          settings.userPageJson = userPage;
        }
      }
    }
    return NextResponse.json({ success: true, message: 'Berhasil', data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
