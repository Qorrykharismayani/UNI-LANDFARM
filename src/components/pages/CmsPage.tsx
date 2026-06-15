import React from 'react';
import { Layers, Search, Edit3, Trash2, ChevronLeft, ChevronRight, Bot, Calendar, FileText, Sparkles } from 'lucide-react';

interface CmsPageProps {
  cmsSubTab: string;
  setCmsSubTab: (tab: string) => void;
  cmsPosts: any[];
  setCmsPosts: (fn: (prev: any[]) => any[]) => void;
  cmsSearchQuery: string;
  setCmsSearchQuery: (q: string) => void;
  cmsCurrentPage: number;
  setCmsCurrentPage: (fn: (prev: number) => number) => void;
  aiTopic: string;
  setAiTopic: (v: string) => void;
  aiTone: string;
  setAiTone: (v: string) => void;
  aiLength: string;
  setAiLength: (v: string) => void;
  isGeneratingAiPost: boolean;
  aiPostProgress: number;
  aiPostStepText: string;
  isSmartScheduling: boolean;
  setIsSmartScheduling: (v: boolean) => void;
  aiSchedulerFrequency: string;
  setAiSchedulerFrequency: (v: string) => void;
  handleGenerateAiPost: () => void;
  showNotification: (msg: string, type?: 'success' | 'info') => void;
}

const CmsPage = ({
  cmsSubTab,
  setCmsSubTab,
  cmsPosts,
  setCmsPosts,
  cmsSearchQuery,
  setCmsSearchQuery,
  cmsCurrentPage,
  setCmsCurrentPage,
  aiTopic,
  setAiTopic,
  aiTone,
  setAiTone,
  aiLength,
  setAiLength,
  isGeneratingAiPost,
  aiPostProgress,
  aiPostStepText,
  isSmartScheduling,
  setIsSmartScheduling,
  aiSchedulerFrequency,
  setAiSchedulerFrequency,
  handleGenerateAiPost,
  showNotification,
}: CmsPageProps) => {
  const filteredPosts = cmsPosts.filter(post =>
    post.title.toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(cmsSearchQuery.toLowerCase())
  );
  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPage = Math.min(cmsCurrentPage, Math.max(totalPages, 1));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2 flex items-center gap-2">
             Pengelola Konten Situs
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Kelola postingan, tulis artikel dengan AI, dan tinjau situs web Anda dengan mudah.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {[
            { id: 'manual', label: 'Daftar Artikel', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'ai_scheduler', label: 'Tulis dengan AI & Jadwal', icon: <Bot className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCmsSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${cmsSubTab === tab.id ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {cmsSubTab === 'manual' && (
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
            <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex flex-col gap-1">
                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-brand-blue" /> Daftar Konten Situs
                </h3>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Manajemen postingan blog dan materi visual secara manual</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={cmsSearchQuery}
                    onChange={(e) => {
                      setCmsSearchQuery(e.target.value);
                      setCmsCurrentPage(() => 1);
                    }}
                    className="pl-9 pr-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-205 dark:border-slate-700 rounded-xl text-[10px] font-bold outline-none focus:border-brand-blue transition-all dark:text-white w-40"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Judul</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Penulis</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Skor SEO</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[340px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1.5">{post.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{post.type}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{post.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            post.status === 'Published' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10' :
                            'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold text-slate-600 dark:text-slate-500">{post.author}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-blue shadow-[0_0_8px_rgba(255,176,0,0.5)]" style={{ width: `${post.scoreAfter}%` }} />
                            </div>
                            <span className="text-[9px] font-black text-slate-900 dark:text-white">{post.scoreAfter}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button onClick={() => setCmsSubTab('editor')} className="p-1.5 text-slate-400 hover:text-brand-blue bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm" onClick={() => setCmsPosts(prev => prev.filter(p => p.id !== post.id))}><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Tidak ada artikel yang cocok dengan pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/10 dark:bg-slate-800/5">
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Menampilkan {filteredPosts.length > 0 ? indexOfFirstPost + 1 : 0}-{Math.min(indexOfLastPost, filteredPosts.length)} dari {filteredPosts.length} artikel
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCmsCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[9px] font-black uppercase tracking-wider rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  onClick={() => setCmsCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[9px] font-black uppercase tracking-wider rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {cmsSubTab === 'ai_scheduler' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
            
            {/* LEFT COLUMN: AI CONTENT WRITER */}
            <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shadow-inner">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Writer & Publisher</h4>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tulis artikel berkualitas tinggi secara otomatis</p>
                  </div>
                </div>

                {isGeneratingAiPost ? (
                  <div className="h-[260px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-400">{aiPostProgress}%</div>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">AI Sedang Menulis Artikel</h5>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">{aiPostStepText}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Topik / Ide Artikel</label>
                      <input 
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="Contoh: Manfaat Kopi Espresso bagi Kesehatan Jantung"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tone Suara</label>
                        <select 
                          value={aiTone}
                          onChange={(e) => setAiTone(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-black text-slate-500 dark:text-white outline-none"
                        >
                          <option>Profesional</option>
                          <option>Kreatif & Santai</option>
                          <option>Persuasif & Promotif</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Panjang Artikel</label>
                        <select 
                          value={aiLength}
                          onChange={(e) => setAiLength(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-black text-slate-500 dark:text-white outline-none"
                        >
                          <option>Pendek (300 kata)</option>
                          <option>Sedang (600 kata)</option>
                          <option>Panjang (1000 kata)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!isGeneratingAiPost && (
                <button 
                  onClick={handleGenerateAiPost}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-brand-blue to-indigo-650 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Bangkitkan Artikel AI
                </button>
              )}
            </div>

            {/* RIGHT COLUMN: SMART AI SCHEDULER */}
            <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shadow-inner">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Smart AI Scheduler</h4>
                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Optimasi jadwal posting berbasis AI</p>
                  </div>
                </div>

                {/* Switch Toggle */}
                <div 
                  onClick={() => {
                    setIsSmartScheduling(!isSmartScheduling);
                    showNotification(isSmartScheduling ? 'AI Smart Scheduling dinonaktifkan' : 'AI Smart Scheduling diaktifkan!', 'info');
                  }}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isSmartScheduling ? 'bg-brand-blue' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isSmartScheduling ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>

              {isSmartScheduling && (
                <div className="space-y-4 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/30 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Frekuensi Auto-Post</label>
                    <select 
                      value={aiSchedulerFrequency}
                      onChange={(e) => setAiSchedulerFrequency(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black text-slate-500 dark:text-white outline-none"
                    >
                      <option>1 postingan / hari</option>
                      <option>3 postingan / minggu</option>
                      <option>1 postingan / minggu</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                     <div className="w-1 h-auto bg-brand-blue rounded-full"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase leading-none mb-1">Rekomendasi Waktu Tayang AI</p>
                        <p className="text-[9px] font-bold text-slate-500 leading-none">09.00 - 11.00 WIB (Puncak Trafik SEO)</p>
                     </div>
                  </div>
                </div>
              )}

              {/* Visual Timeline queue */}
              <div className="space-y-3">
                <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Antrean Publish Mendatang</h5>
                <div className="space-y-2">
                  {[
                    { title: "Promo Lebaran Kopi", date: "Besok, 09:00", badge: "AI Recommended" },
                    { title: "Manfaat Espresso Murni", date: "Lusa, 10:00", badge: "Smart Queued" }
                  ].map((q, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between hover:border-brand-blue/30 transition-colors shadow-sm group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h6 className="text-[10px] font-black text-slate-900 dark:text-white uppercase leading-none mb-1 group-hover:text-brand-blue transition-colors">{q.title}</h6>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{q.date}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-black text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">{q.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CmsPage;
