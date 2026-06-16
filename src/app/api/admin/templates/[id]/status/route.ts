import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json(); // "Aktif" or "Nonaktif"

    if (!status || (status !== 'Aktif' && status !== 'Nonaktif')) {
      return NextResponse.json({ success: false, message: 'Status tidak valid.' }, { status: 400 });
    }

    const updated = await prisma.template.update({
      where: { id: Number(id) },
      data: { status }
    });

    return NextResponse.json({ success: true, message: `Status template berhasil diubah menjadi ${status}!`, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
