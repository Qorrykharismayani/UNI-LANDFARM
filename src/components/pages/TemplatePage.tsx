import React from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, Monitor, Smartphone, Layout, X, RefreshCw, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TemplateRenderer from '../TemplateRenderer';

interface TemplatePageProps {
  templateCategories: string[];
  filteredLibraryTemplates: any[];
  activeTemplateFilter: string;
  setActiveTemplateFilter: (cat: string) => void;
  previewTemplate: any;
  setPreviewTemplate: (tpl: any) => void;
  templateForCreation: any;
  setTemplateForCreation: (tpl: any) => void;
  creationWebsiteTitle: string;
  setCreationWebsiteTitle: (v: string) => void;
  creationBusinessName: string;
  setCreationBusinessName: (v: string) => void;
  creationSlug: string;
  setCreationSlug: (v: string) => void;
  isCreatingPage: boolean;
  creationError: string | null;
  handleCreatePageFromTemplate: (e: React.FormEvent) => void;
}

const TemplatePage = ({
  templateCategories,
  filteredLibraryTemplates,
  activeTemplateFilter,
  setActiveTemplateFilter,
  previewTemplate,
  setPreviewTemplate,
  templateForCreation,
  setTemplateForCreation,
  creationWebsiteTitle,
  setCreationWebsiteTitle,
  creationBusinessName,
  setCreationBusinessName,
  creationSlug,
  setCreationSlug,
  isCreatingPage,
  creationError,
  handleCreatePageFromTemplate,
}: TemplatePageProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const finalDisplayedTemplates = filteredLibraryTemplates.filter(tpl => 
    tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (tpl.description && tpl.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Pustaka Template</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">Pilih fondasi untuk situs web Anda.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-within:text-brand-blue transition-colors" />
            <input 
              type="text" 
              placeholder="Cari template..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-brand-blue/20 transition-all dark:text-white" 
            />
          </div>
          <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-brand-blue transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {templateCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTemplateFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTemplateFilter === cat ? 'bg-brand-blue text-white shadow-blue' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-brand-blue/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {finalDisplayedTemplates.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            Tidak ada template yang cocok dengan pencarian "{searchQuery}".
          </div>
        ) : finalDisplayedTemplates.map((tpl, i) => (
          <div key={i} className="group relative bg-gradient-to-br from-white to-blue-50/15 dark:from-slate-900/60 dark:to-slate-950/60 rounded-[32px] overflow-hidden border border-slate-200/60 dark:border-slate-800/80 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.05)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.15)] hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={tpl.img} alt={tpl.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-6">
                <button
                  onClick={() => {
                    setTemplateForCreation(tpl);
                    setCreationWebsiteTitle('');
                    setCreationBusinessName('');
                    setCreationSlug('');
                  }}
                  className="w-full bg-white text-slate-900 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                >
                  Gunakan Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="w-full bg-white/20 backdrop-blur-md text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/40 transition-all border border-white/20"
                >
                  Pratinjau Langsung
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">{tpl.category}</span>
                <div className="flex gap-1">
                  <Monitor className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                  <Smartphone className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                </div>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2">{tpl.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">{tpl.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FULL-SCREEN LIVE PREVIEW MODAL (ThemeForest style) */}
      {previewTemplate && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col bg-slate-950">
          {/* Top Bar */}
          <div className="h-[64px] bg-[#0B1223] border-b border-white/5 flex items-center justify-between px-5 shrink-0 z-30">
            {/* Left: Back & Info */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Tutup
              </button>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white tracking-tight uppercase">{previewTemplate.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[7.5px] font-black uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                    {previewTemplate.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Label */}
            <div className="hidden md:flex items-center gap-2">
              <Monitor className="w-4 h-4 text-slate-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Screen Preview</span>
            </div>

            {/* Right: Use Template */}
            <button
              onClick={() => {
                const currentTemplate = previewTemplate;
                setPreviewTemplate(null);
                setTemplateForCreation(currentTemplate);
                setCreationWebsiteTitle('');
                setCreationBusinessName('');
                setCreationSlug('');
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-brand-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Rocket className="w-3.5 h-3.5" /> Gunakan Template
            </button>
          </div>

          {/* Live Preview Canvas */}
          <div className="flex-1 bg-slate-900/60 overflow-y-auto custom-scrollbar">
            <div className="bg-white min-h-full">
              <TemplateRenderer
                templateId={previewTemplate.id || previewTemplate.title}
                contentJson={previewTemplate.defaultContent || {}}
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* CREATION MODAL */}
      {templateForCreation && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            onClick={() => setTemplateForCreation(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col border border-slate-100 dark:border-slate-800"
          >
            <div className="p-8 border-b border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
                  <img src={templateForCreation.img} alt={templateForCreation.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Gunakan Template</h3>
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">{templateForCreation.title} ({templateForCreation.category})</p>
                </div>
              </div>
              <button
                onClick={() => setTemplateForCreation(null)}
                className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePageFromTemplate} className="p-8 space-y-6">
              {creationError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-semibold uppercase tracking-wider">
                  {creationError}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nama Website</label>
                <input
                  type="text"
                  value={creationWebsiteTitle}
                  onChange={(e) => setCreationWebsiteTitle(e.target.value)}
                  placeholder="Contoh: Toko Kopi Merdeka"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nama Bisnis / Brand</label>
                <input
                  type="text"
                  value={creationBusinessName}
                  onChange={(e) => setCreationBusinessName(e.target.value)}
                  placeholder="Contoh: Kopi Merdeka Indonesia"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Subdomain Slug</label>
                <div className="flex">
                  <input
                    type="text"
                    value={creationSlug}
                    onChange={(e) => {
                      const val = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, '')
                        .replace(/-+/g, '-');
                      setCreationSlug(val);
                    }}
                    placeholder="kopimerdeka"
                    className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-l-xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-brand-blue/20 transition-all outline-none"
                    required
                  />
                  <span className="bg-slate-100 dark:bg-slate-800 px-4 py-3.5 border border-l-0 border-slate-200 dark:border-slate-800 rounded-r-xl text-sm font-black text-slate-400 dark:text-slate-500 flex items-center">
                    /site/[slug]
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 italic font-bold">Alamat publik website Anda nantinya akan menjadi: /site/{creationSlug || '[slug]'}</p>
              </div>

              <button
                type="submit"
                disabled={isCreatingPage}
                className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-blue hover:shadow-blue-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCreatingPage ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sedang Membuat...
                  </>
                ) : (
                  <>
                    Buat & Edit Situs <Rocket className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TemplatePage;
