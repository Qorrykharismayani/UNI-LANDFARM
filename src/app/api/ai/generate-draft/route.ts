import { NextResponse } from 'next/server';
import { generateWebsiteDraft } from '@/services/ai-server';
import { getSessionFromCookies } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Silakan login.' }, { status: 401 });
    }

    const body = await request.json();
    const { businessName, category, description, templateName } = body;
    
    if (!description) {
      return NextResponse.json({ success: false, message: 'Deskripsi wajib diisi.' }, { status: 400 });
    }

    // Token check removed since it is handled by the landing page creation process

    const draft = await generateWebsiteDraft(
      businessName || 'Situs Bisnis AI',
      category || 'General',
      description,
      templateName
    );

    // Token deduction removed since it is handled by the landing page creation process

    return NextResponse.json({ success: true, data: draft });
  } catch (error: any) {
    console.error('Error generating website draft:', error);
    return NextResponse.json({ success: false, message: error.message || 'Gagal menghasilkan draft situs.' }, { status: 500 });
  }
}
