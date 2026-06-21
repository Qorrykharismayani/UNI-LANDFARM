import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { id } = await params;
    const { name, category, description, thumbnail, structureJson, status } = await request.json();

    const updated = await prisma.template.update({
      where: { id: Number(id) },
      data: {
        name: name || undefined,
        category: category || undefined,
        description: description || undefined,
        thumbnail: thumbnail || undefined,
        structureJson: structureJson || undefined,
        status: status || undefined
      }
    });

    return NextResponse.json({ success: true, message: 'Template berhasil diperbarui!', data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { id } = await params;

    await prisma.template.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true, message: 'Template berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
