import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting slug cleanup...');
  const landingPages = await prisma.landingPage.findMany();
  console.log(`Found ${landingPages.length} landing pages.`);

  let updatedCount = 0;

  for (const page of landingPages) {
    const originalSlug = page.slug;
    
    // Sanitization logic:
    // Convert to lowercase, replace non-alphanumeric (except hyphens) with hyphens, remove multiple consecutive hyphens, trim hyphens
    let cleanSlug = originalSlug
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Fallback if slug becomes empty
    if (!cleanSlug) {
      cleanSlug = 'site';
    }

    if (cleanSlug !== originalSlug) {
      // Find a unique slug if conflicts arise
      let uniqueSlug = cleanSlug;
      let counter = 1;
      let conflict = true;

      while (conflict) {
        // Check if another page has this slug (excluding the current page itself!)
        const existing = await prisma.landingPage.findFirst({
          where: {
            slug: uniqueSlug,
            id: { not: page.id }
          }
        });
        if (existing) {
          uniqueSlug = `${cleanSlug}-${counter}`;
          counter++;
        } else {
          conflict = false;
        }
      }

      console.log(`Updating page ID ${page.id}: "${originalSlug}" -> "${uniqueSlug}"`);
      
      // Update the database record
      await prisma.landingPage.update({
        where: { id: page.id },
        data: { slug: uniqueSlug }
      });

      updatedCount++;
    } else {
      console.log(`Page ID ${page.id} slug is already clean: "${originalSlug}"`);
    }
  }

  console.log(`Cleanup finished. Updated ${updatedCount} pages.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
