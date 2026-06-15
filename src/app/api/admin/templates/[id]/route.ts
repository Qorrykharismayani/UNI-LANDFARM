import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, category, description, thumbnail, structureJson } = await request.json();

    const updated = await prisma.template.update({
      where: { id },
      data: {
        name: name || undefined,
        category: category || undefined,
        description: description || undefined,
        thumbnail: thumbnail || undefined,
        structureJson: structureJson || undefined
      }
    });

    return NextResponse.json({ success: true, message: 'Template berhasil diperbarui!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 550 });
  }
}
