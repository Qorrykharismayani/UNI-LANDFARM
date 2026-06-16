import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const articles = await prisma.article.findMany({
      where: { userId: session.userId },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json({ success: true, message: 'Berhasil', data: articles });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { title, status, author, scoreBefore, scoreAfter, type } = await request.json();

    if (!title || title.trim() === '') {
      return NextResponse.json({ success: false, message: 'Judul artikel wajib diisi.' }, { status: 400 });
    }

    const newArticle = await prisma.article.create({
      data: {
        userId: session.userId,
        title: title.trim(),
        status: status || 'Draft',
        author: author || session.name || 'User',
        scoreBefore: scoreBefore !== undefined ? Number(scoreBefore) : 0,
        scoreAfter: scoreAfter !== undefined ? Number(scoreAfter) : 0,
        type: type || 'Blog Post'
      }
    });

    return NextResponse.json({ success: true, message: 'Artikel berhasil dibuat!', data: newArticle });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookiesString = request.headers.get('cookie');
    const session = getSessionFromCookies(cookiesString);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Tidak diotorisasi.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID artikel wajib disertakan.' }, { status: 400 });
    }

    const article = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (!article) {
      return NextResponse.json({ success: false, message: 'Artikel tidak ditemukan.' }, { status: 404 });
    }

    if (article.userId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Akses ditolak.' }, { status: 403 });
    }

    await prisma.article.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
