const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.systemSetting.findFirst();
  if (settings) {
    await prisma.systemSetting.update({
      where: { id: settings.id },
      data: {
        heroTitle: "PLATFORM LANDING PAGE MIKRO BERBASIS AI CMS",
        heroDescription: "BANTU KEMBANGKAN BISNIS AGRIKULTUR, UMKM, DAN PRODUK LOKAL ANDA DENGAN LANDING PAGE SUPER CEPAT YANG DIKELOLA KECERDASAN BUATAN."
      }
    });
    console.log("Updated existing settings.");
  } else {
    await prisma.systemSetting.create({
      data: {
        heroTitle: "PLATFORM LANDING PAGE MIKRO BERBASIS AI CMS",
        heroDescription: "BANTU KEMBANGKAN BISNIS AGRIKULTUR, UMKM, DAN PRODUK LOKAL ANDA DENGAN LANDING PAGE SUPER CEPAT YANG DIKELOLA KECERDASAN BUATAN."
      }
    });
    console.log("Created new settings.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
