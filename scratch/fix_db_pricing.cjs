const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixPricing() {
  const settings = await prisma.systemSetting.findFirst();
  if (settings && settings.userPageJson) {
    const userPageJson = typeof settings.userPageJson === 'string' ? JSON.parse(settings.userPageJson) : settings.userPageJson;
    
    if (userPageJson.pricing) {
      userPageJson.pricing = [
        { name: 'PAKET BASIC', price: 'Rp 75.000', description: 'Untuk kebutuhan desain dasar.', features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '500 token'], buttonText: 'BELI 500 TOKEN', isPopular: false, gradient: 'from-blue-500 to-cyan-400' },
        { name: 'PAKET STANDARD', price: 'Rp 250.000', description: 'Pilihan terbaik untuk hasil profesional.', features: ['3 alternatif desain', 'Prompt detail', 'Branding sesuai website', 'Struktur visual profesional', '1000 token'], buttonText: 'BELI 1000 TOKEN', isPopular: true, gradient: 'from-amber-400 to-orange-500' },
        { name: 'PAKET PREMIUM', price: 'Rp 500.000', description: 'Solusi terlengkap untuk berbagai format visual.', features: ['Menggunakan screenshot website sebagai referensi', 'Prompt sangat detail', 'Storytelling visual', 'Layout presentasi/lomba/skripsi', '3000 token', 'Beberapa versi (poster, banner, slide)'], buttonText: 'BELI 3000 TOKEN', isPopular: false, gradient: 'from-violet-500 to-purple-600' }
      ];

      await prisma.systemSetting.update({
        where: { id: settings.id },
        data: { userPageJson }
      });
      console.log('Updated SystemSetting pricing array to use fixed token amounts.');
    }
  }
}

fixPricing().catch(console.error).finally(() => prisma.$disconnect());
