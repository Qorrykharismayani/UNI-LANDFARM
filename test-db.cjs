const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('User:', await prisma.user.findFirst());
  console.log('Template:', await prisma.template.findFirst());
}

main().catch(console.error).finally(() => prisma.$disconnect());
