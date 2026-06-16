import React, { useState } from 'react';
import { Globe, Eye, Plus, Search, ArrowLeft, Clipboard, ExternalLink, Edit, Trash2 } from 'lucide-react';

interface AllProjectsPageProps {
  userProjects: any[];
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  setSubView: (v: string) => void;
  setActivePageId: (id: string | null) => void;
  setIsCmsEditorOpen: (open: boolean) => void;
  fetchProjects: () => void;
}

// Format large numbers with k/M suffix for views display
const formatViews = (views: number): string => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return views.toString();
};

const AllProjectsPage = ({
  userProjects,
  showNotification,
  setSubView,
  setActivePageId,
  setIsCmsEditorOpen,
  fetchProjects,
}: AllProjectsPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Published' | 'Draft' | 'Inactive'>('ALL');

  // Filter projects based on query and status
  const filteredProjects = userProjects.filter((project) => {
    const name = (project.name || project.businessName || '').toLowerCase();
    const type = (project.type || '').toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || type.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }
    try {
      showNotification("Menghapus proyek...", "info");
      const res = await fetch(`/api/landing-pages/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Proyek berhasil dihapus!", "success");
        fetchProjects();
      } else {
        showNotification(data.message || "Gagal menghapus proyek.", "info");
      }
    } catch (err) {
      console.error(err);
      showNotification("Terjadi kesalahan koneksi.", "info");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Background Glows for Dark Mode */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-10000" />

      {/* Header and Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-md lg:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5 uppercase">
              Semua Proyek
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Kelola dan pantau seluruh landing page mikro yang telah Anda buat.
            </p>
          </div>
        </div>

        <button
          onClick={() => setSubView('templates')}
          className="px-5 py-2.5 bg-brand-blue text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" /> Buat Landing Page Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 rounded-xl text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-brand-blue dark:focus:border-brand-blue/50 transition-colors shadow-sm"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap w-full md:w-auto">
          {(['ALL', 'Published', 'Draft', 'Inactive'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === filter
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {filter === 'ALL' ? 'Semua Status' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900/50 dark:to-slate-950/50 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800/85 hover:border-brand-blue/20 dark:hover:border-brand-blue/30 hover:shadow-md transition-all flex flex-col gap-4 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm relative bg-slate-250 dark:bg-slate-800 shrink-0">
                <img
                  src={project.image || "https://picsum.photos/seed/placeholder/800/600"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <div className={`px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm ${
                    project.status === 'Published' ? 'bg-[#DCFCE7] text-[#15803D]' :
                    project.status === 'Pending' ? 'bg-amber-100 text-amber-600 border border-amber-200/50' :
                    project.status === 'Inactive' ? 'bg-red-50 text-red-500 border border-red-100/50' :
                    'bg-slate-200 text-slate-600 dark:bg-slate-850 dark:text-slate-400'
                  }`}>
                    {project.status === 'Published' && <span className="inline-block w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />}
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Info & Metadata */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{project.type || 'Landing Page'}</span>
                    <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[8px] font-bold uppercase">
                      <Eye className="w-2.5 h-2.5" /> <span>{formatViews(project.views ?? 0)}</span>
                    </div>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate tracking-tight uppercase">{project.name || 'Tanpa Nama'}</h4>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  {project.status === 'Published' ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/site/${project.slug}`, '_blank');
                          }}
                          className="bg-[#22C55E] hover:bg-[#15803D] text-white py-2 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-2.5 h-2.5" /> Buka Link
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(`${window.location.origin}/site/${project.slug}`);
                            showNotification('Tautan berhasil disalin!', 'success');
                          }}
                          className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Clipboard className="w-2.5 h-2.5" /> Salin Link
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePageId(project.id);
                            setIsCmsEditorOpen(true);
                          }}
                          className="bg-brand-blue text-white py-2.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit Situs
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-500 py-2.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ) : project.status === 'Inactive' ? (
                    <div className="space-y-2">
                      <div className="w-full bg-red-550/10 text-red-500 border border-red-500/20 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-center">
                        Situs Dinonaktifkan Admin
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePageId(project.id);
                            setIsCmsEditorOpen(true);
                          }}
                          className="bg-brand-blue text-white py-2.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-black"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit Situs
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-500 py-2.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 opacity-50 pointer-events-none">
                        <button
                          disabled
                          className="bg-slate-200 dark:bg-slate-800 text-slate-400 py-2 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm flex items-center justify-center gap-1"
                        >
                          Buka Link
                        </button>
                        <button
                          disabled
                          className="bg-slate-200 dark:bg-slate-800 text-slate-400 py-2 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm flex items-center justify-center gap-1"
                        >
                          Salin Link
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePageId(project.id);
                            setIsCmsEditorOpen(true);
                          }}
                          className="bg-brand-blue text-white py-2.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-black"
                        >
                          <Edit className="w-2.5 h-2.5" /> Edit Situs
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-500 py-2.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-slate-300 dark:text-slate-650" />
          </div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white mb-1 tracking-tight">Tidak Ada Proyek Ditemukan</h3>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium max-w-xs text-center mb-4">
            {searchQuery || statusFilter !== 'ALL'
              ? "Coba sesuaikan kata kunci pencarian atau filter status Anda."
              : "Buat landing page pertama Anda untuk memulai."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProjectsPage;
