import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating system settings logo to /logo.png in the database...');
  const result = await prisma.systemSetting.update({
    where: { id: 'default' },
    data: { logo: '/logo.png' }
  });
  console.log('Database updated successfully:', result);
}

main()
  .catch((e) => {
    console.error('Error updating database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
