import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  Share2, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  Lock, 
  RefreshCw, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';

interface PreviewLandingPageProps {
  pageId: string;
  onBack: () => void;
  onPublishSuccess: () => void;
}

export default function PreviewLandingPage({ pageId, onBack, onPublishSuccess }: PreviewLandingPageProps) {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [contentJson, setContentJson] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [publishLoading, setPublishLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/landing-pages/${pageId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setPageData(data.data);
          const page = data.data;
          const initialContent = page.content?.contentJson || page.template?.defaultContent || {};
          setContentJson(initialContent);
        } else {
          triggerToast('Gagal memuat data landing page.');
        }
      } catch (err) {
        console.error(err);
        triggerToast('Terjadi kesalahan koneksi.');
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  const handlePublish = async () => {
    setPublishLoading(true);
    try {
      const res = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Published',
          publishedAt: new Date().toISOString(),
          publicUrl: `/site/${pageData?.slug}`
        })
      });
      const data = await res.json();
      if (data.success) {
        triggerToast('Landing page berhasil dipublikasikan!');
        // Refresh page details
        const refreshed = await fetch(`/api/landing-pages/${pageId}`);
        const refData = await refreshed.json();
        if (refData.success && refData.data) {
          setPageData(refData.data);
        }
        setTimeout(() => {
          onPublishSuccess();
        }, 1500);
      } else {
        triggerToast(data.message || 'Gagal mempublikasikan landing page.');
      }
    } catch (err) {
      triggerToast('Gagal terhubung ke server.');
    } finally {
      setPublishLoading(false);
    }
  };

  const handleShare = () => {
    const publicUrl = `${window.location.origin}/site/${pageData?.slug || ''}`;
    navigator.clipboard.writeText(publicUrl);
    triggerToast('Link pratinjau berhasil disalin ke clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-[500px] bg-[#050816] flex items-center justify-center text-white rounded-[24px]">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs uppercase tracking-widest font-black text-slate-400">Memuat Preview Landing Page...</p>
        </div>
      </div>
    );
  }

  const isPublished = pageData?.status === 'Published';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-200 rounded-[24px] overflow-hidden relative border border-white/5">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

      {/* NAVBAR ATAS (Tinggi 72px) - Desktop Viewport */}
      <header className="h-[72px] bg-[#0B1223] border-b border-white/5 flex items-center justify-between px-6 shrink-0 relative z-30 shadow-md">
        {/* Left Section: Back button & Info */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Editor
          </button>
          
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-tight uppercase">{pageData?.businessName || pageData?.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[7.5px] font-black uppercase tracking-wider ${
                isPublished ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-slate-850 text-slate-400'
              }`}>
                {pageData?.status || 'Draft'}
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Device Switcher Toggle */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-white/5">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
              previewDevice === 'desktop'
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                : 'text-slate-500 hover:text-slate-350'
            }`}
          >
            <Monitor className="w-4 h-4" /> <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
              previewDevice === 'mobile'
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                : 'text-slate-500 hover:text-slate-350'
            }`}
          >
            <Smartphone className="w-4 h-4" /> <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right Section: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={handleShare}
            className="px-4 py-2.5 bg-slate-900 border border-white/5 text-slate-300 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>

          {!isPublished && (
            <button 
              onClick={handlePublish}
              disabled={publishLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-brand-blue to-indigo-650 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              {publishLoading ? 'Publishing...' : 'Publish'} <Rocket className="w-3.5 h-3.5" />
            </button>
          )}

          {isPublished && (
            <a
              href={`/site/${pageData?.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer"
            >
              Live Page <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* AREA UTAMA (Canvas dengan background abu-abu/gelap diluarnya) */}
      <main className="flex-1 bg-slate-900/60 p-6 flex items-center justify-center overflow-y-auto custom-scrollbar relative">
        <div 
          className={`transition-all duration-500 ease-out shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/5 relative overflow-hidden flex flex-col ${
            previewDevice === 'mobile' 
              ? 'w-[360px] h-[640px] rounded-[36px] border-[10px] border-slate-900' 
              : 'w-full max-w-[1000px] h-[95%] rounded-[20px] bg-[#0c1020]'
          }`}
        >
          {/* Desktop Mock Browser Header */}
          {previewDevice === 'desktop' && (
            <div className="bg-slate-900/85 border-b border-white/5 px-4 py-2 flex items-center gap-3 shrink-0 select-none z-20">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 max-w-[400px] mx-auto bg-slate-950/80 border border-white/5 rounded-lg py-1 px-3 flex items-center justify-between text-[9px] text-slate-500 font-bold leading-none">
                <div className="flex items-center gap-1.5 truncate">
                  <Lock className="w-2.5 h-2.5 text-emerald-500" />
                  <span className="truncate">landfarm.id/site/{pageData?.slug}</span>
                </div>
                <RefreshCw className="w-2.5 h-2.5 opacity-55 hover:opacity-100 cursor-pointer" />
              </div>
            </div>
          )}

          {/* Mobile Notch Mock */}
          {previewDevice === 'mobile' && (
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950 mr-4" />
              <div className="w-6 h-1 bg-slate-800 rounded-full" />
            </div>
          )}

          {/* Template Rendering Container */}
          <div className="flex-1 overflow-y-auto bg-white text-slate-900 custom-scrollbar">
            <TemplateRenderer 
              templateId={pageData?.template?.id || pageData?.template?.name} 
              contentJson={contentJson} 
            />
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM BAR UNTUK MOBILE SCREEN */}
      <div className="md:hidden bg-[#0B1223] border-t border-white/5 p-4 flex items-center gap-3 shrink-0 z-35 sticky bottom-0">
        <button 
          onClick={handleShare}
          className="flex-1 py-3 bg-slate-900 border border-white/5 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>

        {!isPublished && (
          <button 
            onClick={handlePublish}
            disabled={publishLoading}
            className="flex-[2] py-3 bg-gradient-to-r from-brand-blue to-indigo-650 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer font-black"
          >
            {publishLoading ? 'Publishing...' : 'Publish'} <Rocket className="w-3.5 h-3.5" />
          </button>
        )}

        {isPublished && (
          <a
            href={`/site/${pageData?.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex-[2] py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all cursor-pointer font-black"
          >
            Live Site <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#0B1223] border border-brand-blue/30 text-white px-5 py-3 rounded-2xl shadow-2xl z-[200] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
