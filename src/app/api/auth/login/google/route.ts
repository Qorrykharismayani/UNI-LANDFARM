import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/callback/google`;

  if (!clientId || clientId.startsWith('YOUR_')) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Password tidak valid atau email tidak valid.' 
      },
      { status: 500 }
    );
  }

  // Generate Google Auth URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid profile email',
      access_type: 'offline',
      prompt: 'consent'
    }).toString();

  return NextResponse.redirect(googleAuthUrl);
}
