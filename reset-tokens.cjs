const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.updateMany({
    data: { tokens: 0 }
  });
  console.log("Tokens reset to 0 for all users.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
