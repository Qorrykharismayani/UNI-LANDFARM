import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const defaultContentTemplate = (title: string, desc: string, cta: string, banner: string) => ({
  logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80",
  navbar: {
    brand: title,
    items: [
      { id: "home", label: "Home" },
      { id: "about", label: "Tentang Kami" },
      { id: "products", label: "Produk & Layanan" },
      { id: "testimonials", label: "Testimoni" },
      { id: "contact", label: "Kontak" }
    ]
  },
  hero: {
    headline: `Kembangkan ${title} Anda Bersama Kami`,
    subheadline: desc,
    banner: banner,
    cta: cta
  },
  about: {
    description: `Kami berfokus menyediakan layanan terbaik untuk klien kami di bidang ${title}.`,
    profile: "Kami didukung oleh tenaga profesional berpengalaman di bidangnya selama bertahun-tahun.",
    story: "Perjalanan kami dimulai dari tekad untuk membantu memberdayakan bisnis lokal di Indonesia agar dapat tumbuh secara digital dan modern."
  },
  products: [
    { name: `${title} Paket Basic`, description: "Pilihan hemat dengan fitur esensial lengkap untuk permulaan.", price: "Rp 150.000", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
    { name: `${title} Paket Premium`, description: "Layanan penuh dengan optimasi tingkat lanjut dan prioritas tinggi.", price: "Rp 350.000", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" }
  ],
  advantages: [
    { icon: "Shield", title: "Keamanan Terjamin", description: "Perlindungan maksimal untuk seluruh data dan sistem Anda." },
    { icon: "Zap", title: "Layanan Cepat", description: "Respon instan dari tim support kami dalam waktu kurang dari 1 jam." },
    { icon: "Heart", title: "Dukungan Penuh", description: "Pendampingan berkelanjutan untuk menjamin kelancaran bisnis Anda." }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80"
  ],
  testimonials: [
    { name: "Andi Pratama", content: "Luar biasa! Halaman saya jadi sangat profesional dan mendatangkan banyak pelanggan baru.", photo: "https://picsum.photos/seed/andi/100/100" },
    { name: "Siti Rahma", content: "Sistem CMS-nya mudah sekali digunakan, bahkan bagi saya yang tidak mengerti coding.", photo: "https://picsum.photos/seed/siti/100/100" }
  ],
  cta: {
    title: "Mulai Transformasi Bisnis Anda Sekarang!",
    description: "Hubungi kami hari ini untuk konsultasi gratis dan penawaran khusus.",
    buttonText: "Hubungi Kami"
  },
  contact: {
    whatsapp: "081234567890",
    email: "kontak@bisnisanda.com",
    address: "Kavling AgroTech No. 12, Jakarta Selatan",
    operatingHours: "Senin - Jumat, 09:00 - 17:00 WIB"
  },
  socialMedia: {
    instagram: "https://instagram.com/bisnisanda",
    tiktok: "https://tiktok.com/@bisnisanda",
    facebook: "https://facebook.com/bisnisanda",
    youtube: "https://youtube.com/bisnisanda"
  },
  marketplaces: {
    shopee: "https://shopee.co.id/bisnisanda",
    tokopedia: "https://tokopedia.com/bisnisanda",
    lazada: "https://lazada.co.id/bisnisanda",
    externalWebsite: "https://bisnisanda.com"
  },
  footer: {
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80",
    businessName: title,
    copyright: `© 2026 ${title}. All rights reserved.`,
    shortContact: "Hubungi: 081234567890",
    socialLinks: {
      instagram: "https://instagram.com/bisnisanda",
      facebook: "https://facebook.com/bisnisanda"
    }
  }
});

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim() === '') {
    console.log('\n⚠️  KONEKSI DATABASE BELUM DIKONFIGURASI:');
    console.log('Database MySQL belum terhubung. Silakan periksa konfigurasi DATABASE_URL pada file .env.');
    console.log('Proses seeding dibatalkan secara aman tanpa erorr.\n');
    return;
  }

  console.log('Seeding database...');

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const userPasswordHash = await bcrypt.hash('user123', 10);
  const clientPasswordHash = await bcrypt.hash('client123', 10);

  // 1. Create Default Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@unilanfarm.com' },
    update: {},
    create: {
      name: 'Uni-Inside Administrator',
      email: 'admin@unilanfarm.com',
      password: adminPasswordHash,
      role: 'ADMIN',
      status: 'Aktif'
    }
  });
  console.log('Admin seeded:', admin.email);

  // 2. Create Default Users (3 Users)
  const user1 = await prisma.user.upsert({
    where: { email: 'user@unilanfarm.com' },
    update: {},
    create: {
      name: 'Sarah Anderson',
      email: 'user@unilanfarm.com',
      password: userPasswordHash,
      role: 'USER',
      status: 'Aktif'
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'andi@unilanfarm.com' },
    update: {},
    create: {
      name: 'Andi Pratama',
      email: 'andi@unilanfarm.com',
      password: clientPasswordHash,
      role: 'USER',
      status: 'Aktif'
    }
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'budi@unilanfarm.com' },
    update: {},
    create: {
      name: 'Budi Santoso',
      email: 'budi@unilanfarm.com',
      password: clientPasswordHash,
      role: 'USER',
      status: 'Aktif'
    }
  });
  console.log('Users seeded');

  // 3. Create Templates (5 Templates)
  const templateList = [
    {
      id: 'tpl-umkm',
      name: 'Produk UMKM',
      category: 'Makanan & Retail',
      description: 'Template khusus produk UMKM, makanan, kerajinan tangan, dan produk retail lokal.',
      thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
      status: 'Aktif',
      structureJson: {
        sections: ['hero', 'about', 'products', 'advantages', 'gallery', 'testimonials', 'cta', 'contact', 'footer']
      },
      defaultContent: defaultContentTemplate(
        "Kriya & Kuliner Lokal",
        "Menyediakan berbagai produk kerajinan tangan dan makanan olahan lokal dengan kualitas premium bebas bahan kimia berbahaya.",
        "Beli Sekarang",
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=1200&q=80"
      )
    },
    {
      id: 'tpl-jasa',
      name: 'Jasa/Layanan',
      category: 'Jasa & Konsultan',
      description: 'Didesain khusus untuk mempromosikan jasa profesional, kebersihan, konsultasi, dan servis kendaraan.',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
      status: 'Aktif',
      structureJson: {
        sections: ['hero', 'about', 'products', 'advantages', 'gallery', 'testimonials', 'cta', 'contact', 'footer']
      },
      defaultContent: defaultContentTemplate(
        "Jasa Bersih Mandiri",
        "Layanan kebersihan profesional untuk rumah, apartemen, dan kantor Anda dengan staf tepercaya serta tersertifikasi.",
        "Pesan Jasa",
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80"
      )
    },
    {
      id: 'tpl-promo',
      name: 'Promo Campaign',
      category: 'Campaign & Promo',
      description: 'Template dengan fokus konversi tinggi, cocok untuk promo musiman, diskon kilat, dan landing page penjualan produk tunggal.',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80',
      status: 'Aktif',
      structureJson: {
        sections: ['hero', 'about', 'products', 'advantages', 'gallery', 'testimonials', 'cta', 'contact', 'footer']
      },
      defaultContent: defaultContentTemplate(
        "Promo Kilat Akhir Tahun",
        "Dapatkan diskon kilat hingga 50% untuk seluruh paket bundling produk kami khusus pembelian hari ini saja!",
        "Ambil Promo",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80"
      )
    },
    {
      id: 'tpl-portfolio',
      name: 'Portfolio Bisnis',
      category: 'Agensi & Kreatif',
      description: 'Sempurna untuk profil bisnis, portofolio desainer, arsitek, fotografer, agensi digital, atau pekerja kreatif lainnya.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
      status: 'Aktif',
      structureJson: {
        sections: ['hero', 'about', 'products', 'advantages', 'gallery', 'testimonials', 'cta', 'contact', 'footer']
      },
      defaultContent: defaultContentTemplate(
        "Studio Kreatif Merdeka",
        "Kami membantu merancang identitas visual, branding, dan strategi pemasaran digital untuk menumbuhkan bisnis Anda.",
        "Lihat Karya",
        "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1200&q=80"
      )
    },
    {
      id: 'tpl-event',
      name: 'Event / Launching Produk',
      category: 'Event & Seminar',
      description: 'Template dinamis untuk mempromosikan acara webinar, peluncuran produk baru, konser musik, atau pameran lokal.',
      thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80',
      status: 'Aktif',
      structureJson: {
        sections: ['hero', 'about', 'products', 'advantages', 'gallery', 'testimonials', 'cta', 'contact', 'footer']
      },
      defaultContent: defaultContentTemplate(
        "Festival Kopi Nusantara 2026",
        "Hadirilah perayaan kopi terbesar tahun ini yang mempertemukan petani kopi lokal dan roaster profesional di seluruh Indonesia.",
        "Daftar Sekarang",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"
      )
    }
  ];

  for (const t of templateList) {
    await prisma.template.upsert({
      where: { id: t.id },
      update: {
        name: t.name,
        category: t.category,
        description: t.description,
        thumbnail: t.thumbnail,
        structureJson: t.structureJson,
        defaultContent: t.defaultContent,
        status: t.status
      },
      create: t
    });
  }
  console.log('Templates seeded successfully!');

  // 4. Create System Settings
  const settings = await prisma.systemSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
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
        { q: "Apakah situs saya akan SEO-friendly?", a: "Ya, AI kami secara otomatis mengoptimalkan struktur, meta tag, dan konten untuk mesin pencari.", color: "bg-indigo-500" },
        { q: "Bisakah saya menggunakan domain sendiri?", a: "Tentu. Anda dapat menghubungkan domain kustom Anda dengan mudah di dashboard.", color: "bg-violet-500" }
      ],
      userPageJson: {
        welcomeTitle: "Halo, Pebisnis Modern!",
        welcomeSubtitle: "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?"
      }
    }
  });
  console.log('Settings seeded:', settings.platformName);

  // 5. Create 3 Landing Pages
  // Page 1: Toko Kopi Merdeka (Sarah Anderson, Published)
  const page1 = await prisma.landingPage.upsert({
    where: { slug: 'toko-kopi-merdeka' },
    update: {},
    create: {
      id: 'lp-1',
      userId: user1.id,
      templateId: 'tpl-umkm',
      title: 'Toko Kopi Merdeka',
      businessName: 'Toko Kopi Merdeka',
      slug: 'toko-kopi-merdeka',
      status: 'Published',
      views: 2400,
      publicUrl: '/site/toko-kopi-merdeka',
      content: {
        create: {
          contentJson: defaultContentTemplate(
            "Toko Kopi Merdeka",
            "Kopi robusta dan arabika murni langsung dari perkebunan petani lokal Indonesia.",
            "Pesan Kopi",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
          )
        }
      }
    }
  });

  // Page 2: Jasa Bersih Merdeka (Andi Pratama, Published)
  const page2 = await prisma.landingPage.upsert({
    where: { slug: 'jasa-bersih-merdeka' },
    update: {},
    create: {
      id: 'lp-2',
      userId: user2.id,
      templateId: 'tpl-jasa',
      title: 'Jasa Bersih Merdeka',
      businessName: 'Jasa Bersih Merdeka',
      slug: 'jasa-bersih-merdeka',
      status: 'Published',
      views: 180,
      publicUrl: '/site/jasa-bersih-merdeka',
      content: {
        create: {
          contentJson: defaultContentTemplate(
            "Jasa Bersih Merdeka",
            "Solusi kebersihan terpercaya untuk kenyamanan rumah dan kantor Anda.",
            "Pesan Layanan",
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80"
          )
        }
      }
    }
  });

  // Page 3: Festival Kopi 2026 (Budi Santoso, Pending Publish)
  const page3 = await prisma.landingPage.upsert({
    where: { slug: 'festival-kopi-2026' },
    update: {},
    create: {
      id: 'lp-3',
      userId: user3.id,
      templateId: 'tpl-event',
      title: 'Festival Kopi 2026',
      businessName: 'Festival Kopi 2026',
      slug: 'festival-kopi-2026',
      status: 'Pending Publish',
      views: 12,
      content: {
        create: {
          contentJson: defaultContentTemplate(
            "Festival Kopi 2026",
            "Ajang festival kopi terbesar tahun ini untuk mengenalkan cita rasa nusantara.",
            "Daftar Event",
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80"
          )
        }
      }
    }
  });

  // Create request trail for Page 3 (Festival Kopi 2026)
  await prisma.publishRequest.create({
    data: {
      landingPageId: page3.id,
      requestedBy: user3.id,
      status: 'Pending'
    }
  });

  console.log('Landing pages seeded successfully!');
}

main()
  .catch((e) => {
    console.error('\n❌ GAGAL MENJALANKAN SEED DATABASE:');
    if (e.message && (e.message.includes("Can't reach database server") || e.message.includes("Error validating datasource"))) {
      console.error('Prisma tidak dapat terhubung ke database. Harap periksa konfigurasi DATABASE_URL di file .env.');
      console.error('Detail Error:', e.message);
    } else {
      console.error(e);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
