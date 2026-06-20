import React from 'react';
import { Globe, Eye, Zap, Plus, ChevronRight, Rocket, ArrowRight, CheckCircle2, FileText } from 'lucide-react';

interface DashboardPageProps {
  systemSettings: any;
  user: any;
  userProjects: any[];
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  setSubView: (v: string) => void;
  setActivePageId: (id: string | null) => void;
  setIsCmsEditorOpen: (open: boolean) => void;
  setShowAdminNoteModal: (note: string | null) => void;
  fetchProjects: () => void;
}

// Format large numbers with k/M suffix for views display
const formatViews = (views: number): string => {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return views.toString();
};

// Format numbers with dot separator (Indonesian locale)
const formatNumber = (num: number): string => {
  return num.toLocaleString('id-ID');
};

const DashboardPage = ({
  systemSettings,
  user,
  userProjects,
  showNotification,
  setSubView,
  setActivePageId,
  setIsCmsEditorOpen,
  setShowAdminNoteModal,
  fetchProjects,
}: DashboardPageProps) => {
  // Calculate dynamic stats from real data
  const totalWeb = userProjects.length;
  const publishedCount = userProjects.filter(p => p.status === 'Published').length;
  const draftCount = userProjects.filter(p => p.status === 'Draft').length;
  const tokenPoint = user?.tokens ?? 0;

  // Build greeting with user's name
  const userName = user?.name;
  const greetingTitle = userName
    ? `Selamat datang, ${userName}! 👋`
    : `Selamat datang! 👋`;
  const greetingSubtitle = "Pantau dan kelola seluruh landing page Anda dari satu dashboard.";

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Background Glows for Dark Mode */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-10000" />

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-md lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">
            {greetingTitle}
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
            {greetingSubtitle}
          </p>
        </div>
      </div>

      {/* 3 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'templates', title: "Published", value: formatNumber(publishedCount), icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/5 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-400/50", gradient: "from-white to-emerald-50/20 dark:from-slate-900/40 dark:to-emerald-950/20" },
          { id: 'templates', title: "Draft", value: formatNumber(draftCount), icon: <FileText className="w-4 h-4" />, color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-500/5 dark:bg-slate-500/10", border: "border-slate-200 dark:border-slate-800/80 hover:border-slate-400/50", gradient: "from-white to-slate-50/30 dark:from-slate-900/40 dark:to-slate-950/20" },
          { id: 'tokens', title: "Token/Poin", value: formatNumber(tokenPoint), icon: <Zap className="w-4 h-4" />, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50/5 dark:bg-amber-50/10", border: "border-amber-100 dark:border-amber-900/30 hover:border-amber-400/50", gradient: "from-white to-amber-50/20 dark:from-slate-900/40 dark:to-amber-950/20" },
        ].map((stat, i) => (
          <div
            key={i}
            onClick={() => setSubView(stat.id)}
            className={`bg-gradient-to-br ${stat.gradient} overflow-hidden min-h-[95px] p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex items-center gap-4 shadow-sm hover:shadow-md ${stat.border}`}
          >
            <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shrink-0 shadow-inner`} data-uid="stat-card-icon">
              {stat.icon}
            </div>
            <div>
              <p className="text-[9.5px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 leading-none">{stat.title}</p>
              <h4 className="text-2xl lg:text-[28px] font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Projects list (2 columns on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col hover:border-brand-blue/10 transition-all duration-300">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">Proyek Terbaru</h3>
              <button
                onClick={() => setSubView('all_projects')}
                className="text-brand-blue text-[8.5px] font-black uppercase tracking-widest hover:underline px-3.5 py-1 bg-brand-blue/5 rounded-full transition-colors"
              >
                Lihat Semua
              </button>
            </div>

            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.slice(0, 2).map((project) => (
                  <div
                    key={project.id}
                    className="group bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-white/5 hover:border-brand-blue/20 hover:shadow-md transition-all flex flex-col gap-4 cursor-pointer"
                  >
                    {/* Compact Image aspect ratio */}
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm relative bg-slate-200 dark:bg-slate-800 shrink-0">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <div className={`px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm ${
                          project.status === 'Published' ? 'bg-[#DCFCE7] text-[#15803D]' :
                          project.status === 'Pending Publish' || project.status === 'Pending' ? 'bg-amber-100 text-amber-600 border border-amber-200/50' :
                          project.status === 'Inactive' ? 'bg-red-50 text-red-500 border border-red-100/50' :
                          'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {project.status === 'Published' && <span className="inline-block w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />}
                          {project.status === 'Pending Publish' || project.status === 'Pending' ? 'Pending' : project.status}
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{project.type}</span>
                          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[8px] font-bold uppercase">
                            <Eye className="w-2.5 h-2.5" /> <span>{formatViews(project.views ?? 0)}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white truncate tracking-tight uppercase">{project.name}</h4>
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                        {project.status === 'Published' ? (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`/site/${project.slug}`, '_blank');
                              }}
                              className="bg-[#22C55E] hover:bg-[#15803D] text-white py-2 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              Buka Link
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(`${window.location.origin}/site/${project.slug}`);
                                showNotification('Tautan berhasil disalin!', 'success');
                              }}
                              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-xl text-[8.5px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              Salin Link
                            </button>
                          </div>
                        ) : project.status === 'Inactive' ? (
                          <div className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-center">
                            Situs Dinonaktifkan Admin
                          </div>
                        ) : (
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
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Belum ada proyek</h3>
                <p className="text-slate-400 dark:text-slate-500 text-base font-medium mb-4">Buat landing page pertama Anda untuk memulai.</p>
                <button
                  onClick={() => setSubView('templates')}
                  className="px-6 py-2.5 bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3" /> Buat Landing Page
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Pro details & Panduan (1 column on lg) */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-brand-blue to-purple-600 rounded-3xl p-5 text-white shadow-lg overflow-hidden relative group border border-white/10">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 blur-2xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            <Rocket className="w-5 h-5 mb-3 drop-shadow-md" />
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-base font-black tracking-tight uppercase">Siap Meluncur?</h4>
              <span className="text-[7px] font-black bg-white/20 px-1.5 py-0.5 rounded-full">PRO</span>
            </div>
            <p className="text-white/80 text-base font-medium leading-relaxed mb-4">
              Gunakan domain kustom sendiri dan hapus branding platform.
            </p>
            <button
              onClick={() => setSubView('tokens')}
              className="w-full py-2 bg-white text-brand-blue rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Upgrade <Zap className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm p-5 hover:border-brand-blue/10 transition-all duration-300">
            <h4 className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
              Panduan & Bantuan
              <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
            </h4>
            <div className="space-y-3">
              <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Butuh bantuan belajar cara menggunakan Uni-LandFarm? Buka halaman panduan resmi kami.
              </p>
              <button
                onClick={() => setSubView('panduan')}
                className="w-full py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                Buka Panduan <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
