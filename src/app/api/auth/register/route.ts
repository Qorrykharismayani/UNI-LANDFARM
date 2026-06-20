import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Formulir pendaftaran tidak lengkap.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email sudah terdaftar. Gunakan email lain.' }, { status: 409 });
    }

    // Hash password securely with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
        status: 'Aktif',
        provider: 'credentials'
      }
    });

    const defaultTemplate = await prisma.template.findFirst({
      where: { status: 'Aktif' }
    });
    if (defaultTemplate) {
      await prisma.landingPage.create({
        data: {
          userId: newUser.id,
          templateId: defaultTemplate.id,
          title: 'Situs Pertanian Uni-LandFarm',
          businessName: newUser.name || 'Madu Klanceng Alami',
          slug: `situs-baru-${String(newUser.id).substring(0, 5).toLowerCase()}`,
          status: 'Draft',
          views: 0,
          content: {
            create: {
              contentJson: defaultTemplate.defaultContent || {
                hero: { headline: 'Situs Pertanian Uni-LandFarm', subheadline: 'Madu Klanceng Alami', cta: 'Hubungi Kami' }
              }
            }
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran akun berhasil!',
      data: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan sistem.' }, { status: 500 });
  }
}
