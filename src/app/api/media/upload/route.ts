import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const landingPageIdVal = formData.get('landingPageId') as string | null;
    const landingPageId = landingPageIdVal && landingPageIdVal !== 'null' && landingPageIdVal !== 'undefined' ? Number(landingPageIdVal) : undefined;

    if (!file) {
      return NextResponse.json({ success: false, message: 'Tidak ada berkas yang diunggah.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally inside public/uploads folder
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(uploadDir, uniqueFileName);
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFileName}`;

    // Create database log
    const mediaLog = await prisma.mediaFile.create({
      data: {
        userId: session.userId,
        landingPageId: landingPageId ?? undefined,
        fileName: file.name,
        fileUrl: relativeUrl,
        fileType: file.type
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Berkas berhasil diunggah!',
      data: mediaLog
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
