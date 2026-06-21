const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixTypos() {
  const settings = await prisma.systemSetting.findFirst();
  if (settings) {
    console.log('Current platformName:', settings.platformName);
    let updated = false;
    let newPlatformName = settings.platformName;
    
    if (newPlatformName && newPlatformName.toLowerCase().includes('lanfaram')) {
      newPlatformName = newPlatformName.replace(/lanfaram/gi, 'LandFarm');
      updated = true;
    }
    
    if (newPlatformName && newPlatformName.includes('Uni-')) {
      newPlatformName = newPlatformName.replace(/Uni-/g, 'UNI-');
      updated = true;
    }

    if (updated) {
      await prisma.systemSetting.update({
        where: { id: settings.id },
        data: { platformName: newPlatformName }
      });
      console.log('Updated SystemSetting platformName to:', newPlatformName);
    }
  }

  // Check Users
  const users = await prisma.user.findMany();
  for (const user of users) {
    if (user.email.includes('lanfaram')) {
      const newEmail = user.email.replace(/lanfaram/gi, 'landfarm');
      await prisma.user.update({
        where: { id: user.id },
        data: { email: newEmail }
      });
      console.log(`Updated User email from ${user.email} to ${newEmail}`);
    }
  }
  
  console.log('Database typo fix completed.');
}

fixTypos().catch(console.error).finally(() => prisma.$disconnect());
