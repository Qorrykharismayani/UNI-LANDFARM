import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      where: { status: 'Aktif' },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, message: 'Berhasil', data: templates });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.', stack: error.stack }, { status: 200 });
  }
}
