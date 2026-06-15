import { NextResponse } from 'next/server';
import { generateEditorCopy } from '@/services/ai-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { command, currentData } = body;
    
    if (!command) {
      return NextResponse.json({ success: false, message: 'Instruksi wajib diisi.' }, { status: 400 });
    }

    const result = await generateEditorCopy(command, currentData);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error generating editor copy:', error);
    return NextResponse.json({ success: false, message: error.message || 'Gagal merumuskan teks AI.' }, { status: 500 });
  }
}
