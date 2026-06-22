import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, FileText, Zap, Sparkles,
  Send, Edit3, Upload, ChevronDown, Bot
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPagePageProps {
  user?: any;
  showNotification?: (msg: string, type?: 'success' | 'info') => void;
  cmsNavMode: string;
  setCmsNavMode: (mode: string) => void;
  genProgress: number;
  isGenerating: boolean;
  generatedDraft: any;
  manualData: any;
  setManualData: (data: any) => void;
  aiData: any;
  setAiData: (data: any) => void;
  formErrors: Record<string, string>;
  handleAiBuild: () => void;
  handleManualSetup: () => void;
  handlePublish: () => void;
  setSubView: (v: string) => void;
  setCmsSubTab: (tab: string) => void;
  isPublishing?: boolean;
}

const LandingPagePage = ({
  user,
  showNotification,
  cmsNavMode,
  setCmsNavMode,
  genProgress,
  isGenerating,
  generatedDraft,
  manualData,
  setManualData,
  aiData,
  setAiData,
  formErrors,
  handleAiBuild,
  handleManualSetup,
  handlePublish,
  setSubView,
  setCmsSubTab,
  isPublishing,
}: LandingPagePageProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        if (openDropdown === 'category') setOpenDropdown(null);
      }
      if (templateRef.current && !templateRef.current.contains(event.target as Node)) {
        if (openDropdown === 'template') setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  if (cmsNavMode === 'setup-progress') {
    return (
      <div className="max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-700">
        <div className="relative group">
          {/* Outer Glow Ring */}
          <div className="absolute -inset-10 bg-brand-blue/20 blur-[100px] rounded-full animate-pulse group-hover:bg-brand-blue/30 transition-all"></div>

          {/* Orbiting Particles */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-20%] left-1/2 w-4 h-4 bg-brand-blue rounded-full shadow-[0_0_20px_blue]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-20%] left-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_20px_indigo]"
            />
          </div>

          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="8" />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-brand-blue fill-none"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="440"
                animate={{ strokeDashoffset: 440 - (440 * genProgress) / 100 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-brand-blue/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-1 relative"
              >
                <Bot className="w-10 h-10 text-brand-blue" />
                {/* Thinking indicator dots */}
                <motion.div 
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_5px_#fbbf24]"
                />
                <motion.div 
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-0 right-0 w-1.5 h-1.5 bg-brand-blue rounded-full shadow-[0_0_5px_blue]"
                />
              </motion.div>
              <span className="text-xl font-black text-slate-900 dark:text-white">{genProgress}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-sm">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Membangun Ekosistem Digital</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] animate-pulse">
              {genProgress < 20 ? 'Menginisialisasi Arsitektur...' :
                genProgress < 40 ? 'Menyusun Struktur Konten...' :
                  genProgress < 60 ? 'Membangkitkan Aset AI...' :
                    genProgress < 85 ? 'Mengoptimasi User Experience...' :
                      'Finalisasi Deployment...'}
            </p>
          </div>

          <div className="flex gap-1.5 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-8 h-1.5 rounded-full transition-all duration-300 ${genProgress >= i * 20 ? 'bg-brand-blue shadow-[0_0_10px_brand-blue]' : 'bg-slate-100 dark:bg-slate-800'}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }



  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-36 h-36 border-[5px] border-slate-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-36 h-36 border-[5px] border-brand-blue rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ y: [0, -6, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center"
            >
              <Bot className="w-16 h-16 text-amber-500" />
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                className="absolute top-0 -right-2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24]"
              />
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-2 right-2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_orange]"
              />
            </motion.div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
            {cmsNavMode === 'ai' ? 'AI sedang membangun website...' : 'Menyiapkan website...'}
          </h3>
          <div className="w-64 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${genProgress}%` }}
              className="h-full bg-brand-blue"
            />
          </div>
          <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Proses: {genProgress}%</p>
        </div>
      </div>
    );
  }

  if (cmsNavMode === 'preview' && generatedDraft) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCmsNavMode('landing')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-blue uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Kembali
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => { setSubView('cms'); setCmsSubTab('editor'); }}
              className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center gap-2"
            >
              <Edit3 className="w-3 h-3" /> Edit Struktur Konten
            </button>
            <button

              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-6 py-2.5 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-blue hover:shadow-blue-lg transition-all flex items-center gap-2 ${
                isPublishing ? 'bg-brand-blue/70 cursor-not-allowed' : 'bg-brand-blue'
              }`}

            >
              <Send className={`w-3 h-3 ${isPublishing ? 'animate-pulse' : ''}`} /> {isPublishing ? 'Publishing...' : 'Publish Website'}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden preview-theme-override">
          <style>{`
            .preview-theme-override .bg-brand-blue { background-color: ${manualData.color || '#3b82f6'} !important; }
            .preview-theme-override .text-brand-blue { color: ${manualData.color || '#3b82f6'} !important; }
            .preview-theme-override .border-brand-blue { border-color: ${manualData.color || '#3b82f6'} !important; }
            .preview-theme-override .bg-brand-blue\\/10 { background-color: ${manualData.color || '#3b82f6'}1A !important; }
            .preview-theme-override .bg-brand-blue\\/20 { background-color: ${manualData.color || '#3b82f6'}33 !important; }
            .preview-theme-override .bg-brand-blue\\/70 { background-color: ${manualData.color || '#3b82f6'}B3 !important; }
            .preview-theme-override .shadow-blue { box-shadow: 0 4px 14px 0 ${manualData.color || '#3b82f6'}33 !important; }
            .preview-theme-override .shadow-blue-lg { box-shadow: 0 10px 25px -3px ${manualData.color || '#3b82f6'}4D !important; }
          `}</style>
          {/* Header Preview */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
            </div>
            <div className="bg-white dark:bg-slate-900 px-4 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 w-1/2 text-center truncate">
              {generatedDraft.url}
            </div>
            <div className="w-12"></div>
          </div>

          {/* Actual Website Content Preview */}
          <div className="h-[70vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 custom-scrollbar pb-12">
            
            {/* Navbar Preview */}
            <nav className="flex justify-between items-center py-4 px-8 border-b border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3">
                {generatedDraft.logo || manualData.logo ? (
                  <img src={generatedDraft.logo || manualData.logo} alt="Logo" className="h-8 w-auto max-w-[120px] object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white font-black text-sm">
                    {(generatedDraft.navbar?.brand || manualData.name || 'Situs Bisnis').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-extrabold text-slate-800 dark:text-white text-sm tracking-tight">
                  {generatedDraft.navbar?.brand || manualData.name || 'Situs Bisnis'}
                </span>
              </div>
              <div className="hidden sm:flex gap-6 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span className="hover:text-brand-blue cursor-pointer">Beranda</span>
                <span className="hover:text-brand-blue cursor-pointer">Tentang</span>
                <span className="hover:text-brand-blue cursor-pointer">Produk</span>
                <span className="hover:text-brand-blue cursor-pointer">Kontak</span>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="px-8">
              <section className="max-w-4xl mx-auto text-center space-y-8 py-20">
                <div className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-bounce">
                  🚀 Launching Soon
                </div>
                <h1 className="text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                  {generatedDraft.headline}
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                  {generatedDraft.subheadline}
                </p>
                <button className="px-10 py-5 bg-brand-blue text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-blue-lg hover:-translate-y-1 transition-transform">
                  {generatedDraft.cta}
                </button>
              </section>
            </div>

            {/* Features Section (Alternating - Theme Color Background) */}
            <section className="bg-brand-blue py-20 px-8">
              <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">Keunggulan Layanan</h2>
                  <div className="w-16 h-1.5 mx-auto rounded-full bg-white/30" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['Premium Quality', 'Agentic Workflow', 'High Efficiency'].map((feat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-sm text-center group hover:-translate-y-2 transition-all">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-black text-white uppercase mb-3">{feat}</h4>
                      <p className="text-[11px] text-white/80 leading-relaxed">Optimal dalam setiap detail untuk mendukung pertumbuhan bisnis Anda secara organik.</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Standard sections (Alternating back to White) */}
            <div className="px-8">
              {['Tentang Kami', 'Produk/Layanan', 'Galeri'].map((section, i) => (
                <section key={i} className={`py-20 ${i > 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''} text-center max-w-4xl mx-auto`}>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{section}</h2>
                  <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full mb-12" />
                  {section === 'Tentang Kami' ? (
                    <div className="bg-slate-100 dark:bg-slate-950 rounded-3xl p-8 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4 text-left">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                        {generatedDraft.about?.description || manualData.description || 'Penyedia produk kerajinan dan kuliner lokal unggulan.'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {generatedDraft.about?.profile || `Kami adalah bisnis yang bergerak di bidang ${manualData.category || 'layanan profesional'}.`}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl aspect-video flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">[ Placeholder Content for {section} ]</p>
                    </div>
                  )}
                </section>
              ))}
            </div>

              <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-[10px] font-black text-slate-400 tracking-widest mb-4">© 2026 {manualData.name || 'Situs Bisnis AI'}. Dipersembahkan oleh UNI-LandFarm.</p>
                <div className="flex justify-center gap-6">
                  {['Instagram', 'WhatsApp', 'LinkedIn'].map(link => (
                    <span key={link} className="text-[9px] font-black text-brand-blue uppercase cursor-pointer hover:underline">{link}</span>
                  ))}
                </div>
              </footer>
            </div>
          </div>
        </div>
    );
  }

  if (cmsNavMode === 'ai') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button
          onClick={() => setCmsNavMode('landing')}
          className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Kembali
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-10 border border-slate-100 dark:border-slate-800 shadow-premium">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
              <Sparkles className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Bangun dengan AI</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Jelaskan visi Anda, AI kami akan mengerjakan sisanya.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Deskripsi Bisnis & Tujuan Website</label>
              <textarea
                value={aiData.description}
                onChange={(e) => setAiData({ ...aiData, description: e.target.value })}
                placeholder="Contoh: Saya ingin toko kopi modern dengan nuansa minimalis yang fokus pada penjualan biji kopi artisan..."
                className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.description ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-2xl p-6 text-sm font-bold focus:ring-4 focus:ring-brand-blue/10 transition-all dark:text-white resize-none h-40 outline-none`}
              />
              {formErrors.description && <p className="text-[10px] font-black text-red-500 mt-2 uppercase tracking-widest">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Audiens</label>
                <input
                  type="text"
                  value={aiData.target}
                  onChange={(e) => setAiData({ ...aiData, target: e.target.value })}
                  placeholder="Misal: Pecinta kopi, 20-40 th"
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.target ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none`}
                />
                {formErrors.target && <p className="text-[10px] font-black text-red-500 mt-2 uppercase tracking-widest">{formErrors.target}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Style Visual</label>
                <select
                  value={aiData.style}
                  onChange={(e) => setAiData({ ...aiData, style: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none appearance-none font-black text-slate-500 uppercase"
                >
                  <option>Modern & Sleek</option>
                  <option>Classic & Elegant</option>
                  <option>Bold & Playful</option>
                  <option>Minimalist</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAiBuild}
              className="w-full py-5 bg-brand-blue text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-blue hover:shadow-blue-lg transition-all flex items-center justify-center gap-3"
            >
              <Zap className="w-4 h-4 fill-current" /> Bangun Website Saya
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cmsNavMode === 'manual') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <button
          onClick={() => setCmsNavMode('landing')}
          className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Kembali
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-10 border border-slate-100 dark:border-slate-800 shadow-premium">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-blue shadow-inner border border-slate-200 dark:border-slate-700">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Setup Website Manual</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Lengkapi detail website bisnis Anda untuk membuat landing page yang profesional, modern, dan sesuai kebutuhan brand.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nama Website</label>
                <input
                  type="text"
                  value={manualData.name}
                  onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                  placeholder="Masukkan nama brand, bisnis, atau perusahaan Anda"
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.name ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors`}
                />
                {formErrors.name && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Domain Website</label>
                <div className="flex">
                  <input
                    type="text"
                    value={manualData.subdomain}
                    onChange={(e) => setManualData({ ...manualData, subdomain: e.target.value })}
                    placeholder="contohbrand"
                    className={`flex-1 bg-slate-50 dark:bg-slate-800/50 border ${formErrors.subdomain ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-l-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors`}
                  />
                  <span className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border border-l-0 border-slate-100 dark:border-slate-800 rounded-r-xl text-sm font-bold text-slate-400">.uniland.ai</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-1.5 font-medium italic">Masukkan nama domain/subdomain: contohbrand.uniland.ai</p>
                {formErrors.subdomain && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.subdomain}</p>}
              </div>
              <div className="relative" ref={categoryRef}>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kategori Bisnis</label>
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white cursor-pointer flex justify-between items-center hover:border-brand-blue/50 transition-colors"
                >
                  <span className={manualData.category ? "text-slate-800 dark:text-white" : "text-slate-400"}>
                    {manualData.category || "Pilih kategori"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === 'category' ? 'rotate-180' : ''}`} />
                </div>
                {openDropdown === 'category' && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
                    {['E-Commerce / Toko Online', 'Portfolio', 'Company Profile', 'Jasa Profesional', 'Kuliner & Cafe', 'Teknologi & Startup'].map((cat) => (
                      <div
                        key={cat}
                        onClick={() => { setManualData({ ...manualData, category: cat }); setOpenDropdown(null); }}
                        className={`px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors ${manualData.category === cat ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative" ref={templateRef}>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Template Website</label>
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'template' ? null : 'template')}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white cursor-pointer flex justify-between items-center hover:border-brand-blue/50 transition-colors"
                >
                  <span className={manualData.template ? "text-slate-800 dark:text-white" : "text-slate-400"}>
                    {manualData.template || "Pilih template"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === 'template' ? 'rotate-180' : ''}`} />
                </div>
                {openDropdown === 'template' && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
                    {['Modern Dark Pro (Recommended)', 'Clean Light Agency', 'Minimalist Portfolio', 'Bold Storefront'].map((tpl) => (
                      <div
                        key={tpl}
                        onClick={() => { setManualData({ ...manualData, template: tpl }); setOpenDropdown(null); }}
                        className={`px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors ${manualData.template === tpl ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        {tpl}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Warna Brand Utama</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={manualData.color}
                    onChange={(e) => setManualData({ ...manualData, color: e.target.value })}
                    className="w-12 h-12 rounded-xl border-none cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={manualData.color}
                    onChange={(e) => setManualData({ ...manualData, color: e.target.value })}
                    className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-mono font-bold dark:text-white uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload Logo Utama</label>
                <div 
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        if (showNotification) showNotification('Mengunggah logo...', 'info');
                        const res = await fetch('/api/media/upload', {
                          method: 'POST',
                          body: formData
                        });
                        const data = await res.json();
                        if (data.success && data.data?.fileUrl) {
                          setManualData({ ...manualData, logo: data.data.fileUrl });
                          if (showNotification) showNotification('Logo berhasil diunggah!', 'success');
                        } else {
                          if (showNotification) showNotification(data.message || 'Gagal mengunggah logo.', 'info');
                        }
                      } catch (err) {
                        if (showNotification) showNotification('Koneksi upload bermasalah.', 'info');
                      }
                    }}
                  />
                  {manualData.logo ? (
                    <div className="flex flex-col items-center">
                       <img src={manualData.logo} alt="Logo preview" className="h-12 object-contain mb-2" />
                       <p className="text-xs font-bold text-slate-400 uppercase">Ganti logo bisnis Anda</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-300 mx-auto mb-2 group-hover:text-brand-blue transition-colors" />
                      <p className="text-xs font-bold text-slate-400 uppercase">Upload logo bisnis Anda</p>
                      <p className="text-[8px] text-slate-400 uppercase mt-1">Format: PNG, JPG, SVG</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Deskripsi Singkat Bisnis</label>
                <textarea
                  value={manualData.description}
                  onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                  placeholder="Contoh: Kami menyediakan layanan digital marketing dan pembuatan website profesional untuk UMKM dan bisnis modern."
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.description ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl p-4 text-sm font-bold dark:text-white outline-none resize-none h-24 focus:border-brand-blue/50 transition-colors`}
                />
                {formErrors.description && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.description}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCmsNavMode('landing')}
              className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs font-bold uppercase text-slate-500 whitespace-nowrap border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-700 transition-all"
            >
              Kembali
            </button>
            <button
              onClick={handleManualSetup}
              className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Mulai Setup Website
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default landing view
  return (
    <div className="max-w-5xl mx-auto pt-6 pb-16 relative">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-blue/5 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full"></div>

        {/* Decorative Abstract Line */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] pointer-events-none" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,1000 C300,800 400,200 1000,0" stroke="currentColor" fill="transparent" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
          Pilih Metode <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-600">Pembuatan</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Silakan pilih metode yang paling sesuai dengan kebutuhan Anda.
        </p>
      </div>

      <div className="flex justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
        <motion.div
          onClick={() => {
            if (user?.tokens < 500) {
              if (showNotification) showNotification('Token Anda tidak cukup (butuh 500). Silakan beli token terlebih dahulu.', 'info');
              setSubView('tokens');
              return;
            }
            setCmsNavMode('manual');
          }}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="group relative w-full max-w-md cursor-pointer"
        >
          {/* Subtle Card Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 rounded-[44px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

          <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[44px] border border-slate-200/50 dark:border-slate-800/50 shadow-premium transition-all duration-500 flex flex-col items-center text-center overflow-hidden h-full ring-1 ring-white/20 dark:ring-white/5">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <ArrowUpRight className="w-5 h-5 text-brand-blue" />
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-[24px] flex items-center justify-center relative z-10 shadow-lg shadow-brand-blue/20 group-hover:scale-110 transition-transform duration-500">
                <FileText className="w-8 h-8 text-white" />
              </div>
              {/* Decoration Particles */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white tracking-tight transition-colors">Pembuatan Website Manual</h3>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 max-w-[280px] transition-colors">
              Isi detail bisnis, layanan, kontak, dan preferensi tampilan untuk membuat landing page sesuai kebutuhan Anda.
            </p>

            <div className="w-full flex flex-col gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (user?.tokens < 500) {
                    if (showNotification) showNotification('Token Anda tidak cukup (butuh 500). Silakan beli token terlebih dahulu.', 'info');
                    setSubView('tokens');
                    return;
                  }
                  setCmsNavMode('manual');
                }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_-10px_rgba(255,176,0,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(255,176,0,0.6)] transition-all duration-500"
              >
                Mulai Isi Form
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Corner Decoration */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPagePage;
