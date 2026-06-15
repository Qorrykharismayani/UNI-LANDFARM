import React from 'react';
import { Globe, Eye, Zap, Plus, ChevronRight, Rocket, ArrowRight } from 'lucide-react';

interface DashboardPageProps {
  systemSettings: any;
  userProjects: any[];
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  setSubView: (v: string) => void;
  setActivePageId: (id: string | null) => void;
  setIsCmsEditorOpen: (open: boolean) => void;
  setShowAdminNoteModal: (note: string | null) => void;
  fetchProjects: () => void;
}

const DashboardPage = ({
  systemSettings,
  userProjects,
  showNotification,
  setSubView,
  setActivePageId,
  setIsCmsEditorOpen,
  setShowAdminNoteModal,
  fetchProjects,
}: DashboardPageProps) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Background Glows for Dark Mode */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-10000" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
        <div>
          <h2 className="text-md lg:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">
            {systemSettings?.userPageJson?.welcomeTitle || "Halo, Pebisnis Modern!"}
          </h2>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {systemSettings?.userPageJson?.welcomeSubtitle || "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'templates', title: "Total Web", value: "12", icon: <Globe className="w-3.5 h-3.5 text-glow" />, color: "text-blue-500", bg: "bg-blue-500/5 dark:bg-blue-600/10", glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
          { id: 'overview', title: "Total Views", value: "45.2k", icon: <Eye className="w-3.5 h-3.5 text-glow" />, color: "text-indigo-500", bg: "bg-indigo-500/5 dark:bg-indigo-600/10", glow: "group-hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]" },
          { id: 'tokens', title: "Token Point", value: "2,500", icon: <Zap className="w-3.5 h-3.5 text-glow" />, color: "text-amber-500", bg: "bg-amber-500/5 dark:bg-amber-600/10", glow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
        ].map((stat, i) => (
          <div
            key={i}
            onClick={() => setSubView(stat.id)}
            className={`bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-900/60 dark:to-slate-950/60 overflow-hidden min-h-[90px] p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 transition-all hover:translate-y-[-2px] cursor-pointer group flex items-center gap-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] ${stat.glow} ${stat.id === 'templates' ? 'border-blue-500/10 hover:border-blue-500/30' :
                stat.id === 'overview' ? 'border-indigo-500/10 hover:border-indigo-500/30' :
                  'border-amber-500/10 hover:border-amber-500/30'
              }`}
          >
            <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-105 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 leading-none">{stat.title}</p>
              <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-white to-blue-50/15 dark:from-slate-900/60 dark:to-slate-950/60 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.06)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.15)] flex flex-col hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white tracking-tight uppercase">Proyek Aktif</h3>
              <button onClick={() => setSubView('templates')} className="text-brand-blue text-[8.5px] font-black uppercase tracking-widest hover:underline px-3 py-1 bg-brand-blue/5 rounded-full transition-colors">Lihat Semua</button>
            </div>

            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {userProjects.map((project) => (
                  <div key={project.id} className="group bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-white/5 hover:border-brand-blue/20 transition-all flex flex-col gap-4 cursor-pointer shadow-sm">
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm relative">
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md ${
                          project.status === 'Published' ? 'bg-emerald-500 text-white' :
                          project.status === 'Approved' ? 'bg-blue-500 text-white animate-pulse' :
                          project.status === 'Pending Publish' ? 'bg-amber-500 text-white' :
                          project.status === 'Rejected' ? 'bg-red-500 text-white' :
                          'bg-slate-500 text-white'
                        }`}>
                          {project.status === 'Published' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                          {project.status === 'Approved' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                          {project.status === 'Pending Publish' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                          {project.status}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{project.type}</span>
                        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[8px] font-bold uppercase">
                          <Eye className="w-2.5 h-2.5" /> <span>{project.views}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white truncate tracking-tight uppercase">{project.name}</h4>
                      
                      <div className="space-y-2">
                        {project.status === 'Published' && (
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`/site/${project.slug}`, '_blank');
                              }} 
                              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer font-black"
                            >
                              Buka Link
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(`${window.location.origin}/site/${project.slug}`);
                                showNotification('Tautan berhasil disalin!', 'success');
                              }} 
                              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer font-black"
                            >
                              Salin Link
                            </button>
                          </div>
                        )}

                        {project.status === 'Approved' && (
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  const res = await fetch(`/api/landing-pages/${project.id}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      status: 'Published',
                                      publishedAt: new Date().toISOString(),
                                      publicUrl: `/site/${project.slug}`
                                    })
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    showNotification('Landing page berhasil diterbitkan!', 'success');
                                    fetchProjects();
                                  } else {
                                    showNotification(data.message || 'Gagal menerbitkan.', 'info');
                                  }
                                } catch (err) {
                                  showNotification('Kesalahan koneksi.', 'info');
                                }
                              }}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer font-black"
                            >
                              Terbitkan
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePageId(project.id);
                                setIsCmsEditorOpen(true);
                              }} 
                              className="bg-brand-blue hover:bg-blue-650 text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer font-black"
                            >
                              Edit Situs
                            </button>
                          </div>
                        )}

                        {project.status === 'Pending Publish' && (
                          <button 
                            disabled
                            className="w-full bg-amber-500/10 text-amber-500 border border-amber-500/20 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-not-allowed font-black"
                          >
                            Menunggu Persetujuan Admin
                          </button>
                        )}

                        {project.status === 'Rejected' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAdminNoteModal(project.adminNote || 'Tidak ada catatan khusus dari admin.');
                            }} 
                            className="w-full bg-red-500 hover:bg-red-650 text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
                          >
                            Lihat Catatan Admin
                          </button>
                        )}

                        {project.status !== 'Pending Publish' && project.status !== 'Approved' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePageId(project.id);
                              setIsCmsEditorOpen(true);
                            }} 
                            className="bg-brand-blue text-white w-full py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-black"
                          >
                            Edit Situs <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => setSubView('templates')}
                  className="border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all group min-h-[160px]"
                >
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-2 group-hover:bg-brand-blue/10 transition-all group-hover:scale-105 shadow-sm">
                    <Plus className="w-5 h-5 text-slate-300 group-hover:text-brand-blue" />
                  </div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-blue">Proyek Baru</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Plus className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">Belum Ada Proyek</h3>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium mb-6">Mulai bangun situs pertama Anda dengan AI Generator.</p>
                <button
                  onClick={() => setSubView('templates')}
                  className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
                >
                  Buat Sekarang
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL ACTIONS */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-brand-blue to-purple-600 rounded-2xl p-5 text-white shadow-lg overflow-hidden relative group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 blur-2xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            <Rocket className="w-5 h-5 mb-3 drop-shadow-md" />
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-[10px] font-black tracking-tight uppercase">Siap Meluncur?</h4>
              <span className="text-[7px] font-black bg-white/20 px-1.5 py-0.5 rounded-full">PRO</span>
            </div>
            <p className="text-white/80 text-[9px] font-medium leading-relaxed mb-4">
              Gunakan domain kustom sendiri dan hapus branding platform.
            </p>
            <button
              onClick={() => setSubView('tokens')}
              className="w-full py-2 bg-white text-brand-blue rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Upgrade <Zap className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50/15 dark:from-slate-900/60 dark:to-slate-950/60 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.06)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.15)] p-5 hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300">
            <h4 className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
              Panduan & Bantuan
              <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
            </h4>
            <div className="space-y-3">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Butuh bantuan belajar cara menggunakan Uni-LandFarm? Buka halaman panduan resmi kami.
              </p>
              <button
                onClick={() => setSubView('panduan')}
                className="w-full py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 group"
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
