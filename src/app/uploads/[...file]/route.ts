import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFile, stat } from 'fs/promises';
import { extname } from 'path';

export async function GET(
  request: Request,
  { params }: { params: { file: string[] } }
) {
  try {
    const filename = params.file.join('/');
    // Protect against directory traversal
    if (filename.includes('..')) {
      return new NextResponse('Invalid Path', { status: 400 });
    }

    const filePath = join(process.cwd(), 'public', 'uploads', filename);

    // Check if file exists
    try {
      await stat(filePath);
    } catch (e) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await readFile(filePath);
    const ext = extname(filename).toLowerCase();

    // Determine content type
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.pdf') contentType = 'application/pdf';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
