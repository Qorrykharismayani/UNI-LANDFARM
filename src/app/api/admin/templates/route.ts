import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi. Khusus admin.' }, { status: 403 });
    }

    const { name, category, description, thumbnail, structureJson } = await request.json();

    if (!name || !category || !description || !thumbnail) {
      return NextResponse.json({ success: false, message: 'Harap isi seluruh field wajib template!' }, { status: 400 });
    }

    const newTemplate = await prisma.template.create({
      data: {
        name,
        category,
        description,
        thumbnail,
        structureJson: structureJson || { sections: [] },
        status: 'Aktif'
      }
    });

    return NextResponse.json({ success: true, message: 'Template berhasil ditambahkan!', data: newTemplate });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
