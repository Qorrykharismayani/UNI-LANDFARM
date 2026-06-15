import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const template = await prisma.template.findUnique({
      where: { id }
    });

    if (!template) {
      return NextResponse.json({ success: false, message: 'Template tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Berhasil', data: template });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
