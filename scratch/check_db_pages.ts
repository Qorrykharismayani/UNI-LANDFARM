import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Querying database users...');
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users:`);
    users.forEach((u, idx) => {
      console.log(`[${idx}] ID: ${u.id} | Name: ${u.name} | Email: ${u.email} | Role: ${u.role} | Plan: ${u.plan}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
