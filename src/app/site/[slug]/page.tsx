import { prisma } from '@/lib/db';
import { Eye } from 'lucide-react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getSessionFromCookies } from '@/lib/auth';
import TemplateRenderer from '@/components/TemplateRenderer';

export default async function PublicSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const page = await prisma.landingPage.findUnique({
    where: { slug },
    include: { 
      content: true,
      template: true
    }
  });

  if (!page) {
    notFound();
  }

  // Get session to check if admin or owner wants to preview
  const cookieStore = await cookies();
  const cookiesString = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
  const session = getSessionFromCookies(cookiesString);
  const isOwner = session && session.userId === page.userId;
  const isAdmin = session && session.role === 'ADMIN';

  if (page.status !== 'Published' && !isOwner && !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-200">
        <div className="w-20 h-20 bg-slate-900/60 rounded-full flex items-center justify-center mb-6 border border-slate-800">
          <Eye className="w-10 h-10 text-slate-500" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-wider mb-2">Halaman Tidak Aktif</h1>
        <p className="text-sm text-slate-400 max-w-md">
          Situs dengan alamat <span className="text-brand-blue font-bold">landfarm.id/site/{slug}</span> tidak ditemukan atau belum dipublikasikan.
        </p>
      </div>
    );
  }

  // Increment views dynamically upon visit (only for actual published visits, not previews)
  if (page.status === 'Published' && !isAdmin && !isOwner) {
    try {
      await prisma.landingPage.update({
        where: { id: page.id },
        data: { views: { increment: 1 } }
      });
    } catch (err) {
      console.error("Gagal mengupdate jumlah kunjungan:", err);
    }
  }

  const contentJson = page.content?.contentJson || page.template?.defaultContent || {};

  return (
    <TemplateRenderer 
      templateId={page.template.id} 
      contentJson={contentJson} 
    />
  );
}
