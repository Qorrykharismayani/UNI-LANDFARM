import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const landingPages = await prisma.landingPage.findMany();
    const results = [];

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

        // Update the database record
        await prisma.landingPage.update({
          where: { id: page.id },
          data: { slug: uniqueSlug }
        });

        results.push({
          id: page.id,
          title: page.title,
          original: originalSlug,
          sanitized: uniqueSlug
        });
      }
    }

    return NextResponse.json({
      success: true,
      allPages: landingPages.map(p => ({ id: p.id, title: p.title, slug: p.slug })),
      updatedCount: results.length,
      details: results
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Error cleaning slugs'
    }, { status: 500 });
  }
}


