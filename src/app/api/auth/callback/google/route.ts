import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?auth_error=${encodeURIComponent(errorParam)}`
      );
    }

    if (!code) {
      return NextResponse.json({ success: false, message: 'Google OAuth code tidak ditemukan.' }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/callback/google`;

    if (!clientId || !clientSecret || clientId.startsWith('YOUR_') || clientSecret.startsWith('YOUR_')) {
      return NextResponse.json(
        { success: false, message: 'Kredensial Google OAuth belum dikonfigurasi di file .env.' },
        { status: 500 }
      );
    }

    // 1. Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json(
        { success: false, message: `Gagal menukar kode otorisasi: ${tokenData.error_description || tokenData.error}` },
        { status: 400 }
      );
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch user profile information using access token
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    if (!userData.email) {
      return NextResponse.json({ success: false, message: 'Gagal mengambil email dari Google.' }, { status: 400 });
    }

    const email = userData.email;
    const name = userData.name || userData.given_name || 'Google User';
    const image = userData.picture || null;

    // 3. Find or create user in database
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      if (user.status !== 'Aktif') {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?auth_error=${encodeURIComponent(
            'Akun Anda sedang dinonaktifkan. Silakan hubungi admin.'
          )}`
        );
      }

      // Update name, provider and image (if not set) to google
      user = await prisma.user.update({
        where: { id: user.id },
        data: { 
          name,
          image: user.image || image,
          provider: 'google' 
        }
      });
    } else {
      // Create a brand new user
      user = await prisma.user.create({
        data: {
          name,
          email,
          image,
          role: 'USER',
          status: 'Aktif',
          provider: 'google'
        }
      });
    }

    // Migrate seeded data from mock users to this logged-in Google user, then delete the mock users
    const mockEmails = ['user@unilanfarm.com', 'andi@unilanfarm.com', 'budi@unilanfarm.com'];
    const mockUsers = await prisma.user.findMany({
      where: {
        email: { in: mockEmails },
        id: { not: user.id }
      }
    });

    if (mockUsers.length > 0) {
      const mockUserIds = mockUsers.map(u => u.id);

      // Reassign landing pages to the Google user
      await prisma.landingPage.updateMany({
        where: {
          userId: { in: mockUserIds }
        },
        data: {
          userId: user.id
        }
      });

      // Reassign media files
      await prisma.mediaFile.updateMany({
        where: {
          userId: { in: mockUserIds }
        },
        data: {
          userId: user.id
        }
      });

      // Reassign notifications
      await prisma.notification.updateMany({
        where: {
          userId: { in: mockUserIds }
        },
        data: {
          userId: user.id
        }
      });

      // Update publish requests requestedBy field
      await prisma.publishRequest.updateMany({
        where: {
          requestedBy: { in: mockUserIds }
        },
        data: {
          requestedBy: user.id
        }
      });

      // Delete the mock users now that their data has been migrated
      await prisma.user.deleteMany({
        where: {
          id: { in: mockUserIds }
        }
      });
    }

    // 4. Sign our custom session JWT
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      name: user.name
    });

    // 5. Create redirect response and set cookie
    const response = NextResponse.redirect(new URL('/', request.url));
    response.headers.set(
      'Set-Cookie',
      `token=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
