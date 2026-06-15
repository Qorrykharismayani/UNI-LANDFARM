import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Checks if MySQL DATABASE_URL is populated in the environment.
 */
export function isDatabaseConfigured(): boolean {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim() === '') {
    return false;
  }
  return true;
}

/**
 * Pings the MySQL database to verify connection stability.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;
  try {
    // Run a fast raw query to verify connectivity
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.warn('[MySQL Connection Warning] Failed to connect:', error);
    return false;
  }
}
