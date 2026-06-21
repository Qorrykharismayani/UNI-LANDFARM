import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    // Hitung total kunjungan / hits
    const landingPages = await prisma.landingPage.findMany({
      select: { views: true, status: true, category: true }
    });
    
    const totalViews = landingPages.reduce((sum, page) => sum + (page.views || 0), 0);
    const activePages = landingPages.filter(p => p.status === 'Aktif' || p.status === 'Published').length;
    
    // Distribusi kategori
    const categoryDistribution: Record<string, number> = {};
    landingPages.forEach(p => {
      const cat = p.category || 'Lainnya';
      categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
    });

    const categoriesList = Object.keys(categoryDistribution).map(cat => ({
      name: cat,
      count: categoryDistribution[cat]
    })).sort((a, b) => b.count - a.count).slice(0, 4);

    // Rasio konversi (simulasi pintar berdasarkan halaman aktif vs tidak aktif)
    const totalPages = landingPages.length;
    const conversionScore = totalPages > 0 ? Math.round((activePages / totalPages) * 100) : 0;

    return NextResponse.json({ 
      success: true, 
      message: 'Berhasil', 
      data: {
        totalViews,
        activePages,
        conversionScore,
        categoryDistribution: categoriesList
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
