import React from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, FileText, Zap, Sparkles,
  Send, Edit3, Upload
} from 'lucide-react';
import { motion } from 'motion/react';
import TemplateRenderer from '../TemplateRenderer';

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
<<<<<<< HEAD
  isPublishing?: boolean;
=======
  templates: any[];
  isPublishing?: boolean;
  setActivePageId?: (id: string) => void;
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
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
<<<<<<< HEAD
  isPublishing,
=======
  templates = [],
  isPublishing = false,
  setActivePageId,
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
}: LandingPagePageProps) => {
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const [logoUploading, setLogoUploading] = React.useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLogoUploading(true);
    try {
      const uploadRes = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success && uploadData.data) {
        setManualData((prev: any) => ({ ...prev, logo: uploadData.data.fileUrl }));
      } else {
        alert(uploadData.message || 'Gagal mengunggah logo.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan koneksi saat mengunggah logo.');
    } finally {
      setLogoUploading(false);
      e.target.value = '';
    }
  };

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
              <div className="bg-brand-blue/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-1">
                <Zap className="w-10 h-10 text-brand-blue animate-bounce" />
              </div>
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

<<<<<<< HEAD

=======
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-8 h-8 text-brand-blue animate-pulse" />
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
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Kembali
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => { 
                if (generatedDraft?.id && setActivePageId) setActivePageId(generatedDraft.id);
                setSubView('cms'); 
                setCmsSubTab('editor'); 
              }}
              className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2"
            >
              <Edit3 className="w-3 h-3" /> Edit Struktur Konten
            </button>
            <button
<<<<<<< HEAD
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-6 py-2.5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-blue hover:shadow-blue-lg transition-all flex items-center gap-2 ${
                isPublishing ? 'bg-brand-blue/70 cursor-not-allowed' : 'bg-brand-blue'
              }`}
=======
              onClick={() => {
                if (generatedDraft?.id && setActivePageId) setActivePageId(generatedDraft.id);
                setSubView('cms');
                setCmsSubTab('publish');
              }}
              className="px-6 py-2.5 bg-brand-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-blue hover:shadow-blue-lg transition-all flex items-center gap-2"
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
            >
              <Send className={`w-3 h-3 ${isPublishing ? 'animate-pulse' : ''}`} /> {isPublishing ? 'Publishing...' : 'Publish Website'}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
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
          <div className="h-[70vh] overflow-y-auto bg-white text-slate-900 custom-scrollbar">
            <TemplateRenderer 
              templateId={generatedDraft.templateId || templates[0]?.id || 'tpl-umkm'} 
              contentJson={generatedDraft.contentJson || {
                hero: {
                  headline: generatedDraft.headline,
                  subheadline: generatedDraft.subheadline,
                  cta: generatedDraft.cta,
                },
                footer: {
                  copyright: `© 2026 ${manualData.name || 'Situs Bisnis AI'}. Dipersembahkan oleh Uni-LandFarm.`
                }
              }} 
            />
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
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nama Website</label>
                <input
                  type="text"
                  value={manualData.name}
                  onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                  placeholder="Masukkan nama brand, bisnis, atau perusahaan Anda"
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.name ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors`}
                />
                {formErrors.name && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Domain Website</label>
                <div className="flex">
                  <input
                    type="text"
                    value={manualData.subdomain}
                    onChange={(e) => setManualData({ ...manualData, subdomain: e.target.value })}
                    placeholder="contohbrand"
                    className={`flex-1 bg-slate-50 dark:bg-slate-800/50 border ${formErrors.subdomain ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-l-xl px-4 py-3 text-xs font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors`}
                  />
                  <span className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border border-l-0 border-slate-100 dark:border-slate-800 rounded-r-xl text-xs font-black text-slate-400">.uniland.ai</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-1.5 font-medium italic">Masukkan nama domain/subdomain: contohbrand.uniland.ai</p>
                {formErrors.subdomain && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.subdomain}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kategori Bisnis</label>
                <select
                  value={manualData.category}
                  onChange={(e) => setManualData({ ...manualData, category: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white outline-none appearance-none font-black"
                >
                  <option>E-Commerce / Toko Online</option>
                  <option>Portfolio</option>
                  <option>Company Profile</option>
                  <option>Jasa Profesional</option>
                  <option>Kuliner & Cafe</option>
                  <option>Teknologi & Startup</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Template Website</label>
                <select
                  value={manualData.templateId || (templates[0]?.id || '')}
                  onChange={(e) => setManualData({ ...manualData, templateId: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white outline-none appearance-none font-black"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Warna Brand Utama</label>
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
                    className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-mono font-bold dark:text-white uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Upload Logo Utama</label>
                <input 
                  type="file" 
                  ref={logoInputRef} 
                  onChange={handleLogoUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  onClick={() => logoInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[120px]"
                >
                  {logoUploading ? (
                    <div className="space-y-2">
                      <div className="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Mengunggah...</p>
                    </div>
                  ) : manualData.logo ? (
                    <div className="space-y-2 w-full">
                      <img src={manualData.logo} alt="Logo Preview" className="max-h-16 mx-auto object-contain rounded-lg shadow-sm" />
                      <p className="text-[8px] font-black text-brand-blue uppercase tracking-wider">Ganti Logo</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-300 mx-auto mb-2 group-hover:text-brand-blue transition-colors" />
                      <p className="text-[10px] font-black text-slate-400 uppercase">Upload logo bisnis Anda</p>
                      <p className="text-[8px] text-slate-400 uppercase mt-1">Format: PNG, JPG, SVG</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Deskripsi Singkat Bisnis</label>
                <textarea
                  value={manualData.description}
                  onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                  placeholder="Contoh: Kami menyediakan layanan digital marketing dan pembuatan website profesional untuk UMKM dan bisnis modern."
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.description ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl p-4 text-xs font-bold dark:text-white outline-none resize-none h-24 focus:border-brand-blue/50 transition-colors`}
                />
                {formErrors.description && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.description}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCmsNavMode('landing')}
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-500 whitespace-nowrap border border-transparent hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              Kembali
            </button>
            <button
              onClick={handleManualSetup}
              className="flex-grow py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
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
    <div className="max-w-5xl mx-auto py-16 relative outline-none border-none ring-0">
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

      <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand-blue/5 text-brand-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2 border border-brand-blue/10 shadow-sm transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          SETUP WEBSITE
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight max-w-2xl mx-auto transition-colors">
          Bangun Website Bisnis Anda <br />
          <span className="bg-gradient-to-r from-brand-blue via-blue-500 to-indigo-500 bg-clip-text text-transparent">melalui Pengisian Form</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed transition-colors">
          Lengkapi informasi bisnis Anda melalui form untuk membangun landing page yang profesional dan sesuai kebutuhan.
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
