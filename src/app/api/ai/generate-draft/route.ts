import { NextResponse } from 'next/server';
import { generateWebsiteDraft } from '@/services/ai-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, category, description, templateName } = body;
    
    if (!description) {
      return NextResponse.json({ success: false, message: 'Deskripsi wajib diisi.' }, { status: 400 });
    }

    const draft = await generateWebsiteDraft(
      businessName || 'Situs Bisnis AI',
      category || 'General',
      description,
      templateName
    );

    return NextResponse.json({ success: true, data: draft });
  } catch (error: any) {
    console.error('Error generating website draft:', error);
    return NextResponse.json({ success: false, message: error.message || 'Gagal menghasilkan draft situs.' }, { status: 500 });
  }
}
