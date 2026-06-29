import React, { useState } from 'react';
import { Layers, Search, Trash2, ChevronLeft, ChevronRight, Bot, Zap, Globe, Edit, Eye } from 'lucide-react';

interface CmsPageProps {
  cmsPosts: any[];
  setCmsPosts: (fn: (prev: any[]) => any[]) => void;
  cmsSearchQuery: string;
  setCmsSearchQuery: (q: string) => void;
  cmsCurrentPage: number;
  setCmsCurrentPage: (fn: (prev: number) => number) => void;
  userProjects: any[];
  selectedCmsProjectId: string;
  setSelectedCmsProjectId: (id: string) => void;
  aiTopic: string;
  setAiTopic: (topic: string) => void;
  aiTone: string;
  setAiTone: (tone: string) => void;
  aiLength: string;
  setAiLength: (length: string) => void;
  isGeneratingAiPost: boolean;
  aiPostProgress: number;
  aiPostStepText: string;
  handleGenerateAiPost: () => Promise<void>;
  handleDeleteArticle: (id: number) => Promise<void>;
  setActivePageId: (id: string | null) => void;
  setIsCmsEditorOpen: (open: boolean) => void;
  handleDeleteProject: (id: string) => Promise<void>;
  onEditProject?: (id: string) => void;
  onPreviewProject?: (id: string) => void;
}

const CmsPage = ({
  cmsPosts,
  setCmsPosts,
  cmsSearchQuery,
  setCmsSearchQuery,
  cmsCurrentPage,
  setCmsCurrentPage,
  userProjects,
  selectedCmsProjectId,
  setSelectedCmsProjectId,
  aiTopic,
  setAiTopic,
  aiTone,
  setAiTone,
  aiLength,
  setAiLength,
  isGeneratingAiPost,
  aiPostProgress,
  aiPostStepText,
  handleGenerateAiPost,
  handleDeleteArticle,
  setActivePageId,
  setIsCmsEditorOpen,
  handleDeleteProject,
  onEditProject,
  onPreviewProject,
}: CmsPageProps) => {
  const [subTab, setSubTab] = useState<'list' | 'ai_scheduler' | 'projects'>('projects');

  const filteredPosts = cmsPosts.filter(post =>
    (post.title || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (post.author || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (post.type || '').toLowerCase().includes(cmsSearchQuery.toLowerCase())
  );
  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPage = Math.min(cmsCurrentPage, Math.max(totalPages, 1));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const filteredProjects = userProjects.filter((project) => {
    const name = (project.name || project.businessName || '').toLowerCase();
    const type = (project.category || project.type || '').toLowerCase();
    return name.includes(cmsSearchQuery.toLowerCase()) || type.includes(cmsSearchQuery.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-md lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5 flex items-center gap-2">
            Pengelola Konten Situs
          </h2>
          <p className="text-base font-medium text-slate-500 dark:text-slate-400">Kelola dan pantau semua proyek situs web Anda dengan mudah.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64 lg:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Cari situs landing page..."
            value={cmsSearchQuery}
            onChange={(e) => setCmsSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 rounded-xl text-sm font-bold text-slate-800 dark:text-white outline-none focus:border-brand-blue dark:focus:border-brand-blue/50 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Tab Contents */}
      {subTab === 'list' ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
            {/* Search and Table Control Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex flex-col gap-1">
                <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-brand-blue" /> Site Content List
                </h3>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                  Manual management of blog posts and visual content
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={cmsSearchQuery}
                    onChange={(e) => {
                      setCmsSearchQuery(e.target.value);
                      setCmsCurrentPage(() => 1);
                    }}
                    className="pl-9 pr-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:border-brand-blue transition-all dark:text-white w-48"
                  />
                </div>
                <button
                  onClick={() => setSubTab('ai_scheduler')}
                  className="px-3.5 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" /> Buat Artikel
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Title / Project</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Author</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">SEO Score</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-355">
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[340px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1.5">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue text-[8px] font-black uppercase tracking-widest rounded">
                              {post.type || 'Blog Post'}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-750"></span>
                            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                              {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            post.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
                              : 'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold text-slate-600 dark:text-slate-500">{post.author}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-blue shadow-[0_0_8px_rgba(255,176,0,0.5)]"
                                style={{ width: `${post.scoreAfter || post.scoreBefore || 0}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-black text-slate-900 dark:text-white">
                              {post.scoreAfter || post.scoreBefore || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm cursor-pointer"
                              onClick={() => handleDeleteArticle(post.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {cmsSearchQuery ? "No articles match the search query." : "Belum ada artikel."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/10 dark:bg-slate-800/5">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Showing {filteredPosts.length > 0 ? indexOfFirstPost + 1 : 0}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCmsCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[10px] font-black uppercase tracking-wider rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  onClick={() => setCmsCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[10px] font-black uppercase tracking-wider rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : subTab === 'ai_scheduler' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-500">
          {/* LEFT: AI CONTENT WRITER FORM */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-slate-50 dark:border-slate-800/80 pb-4">
                <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shadow-inner shrink-0">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Content Writer</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tulis artikel berkualitas tinggi secara otomatis untuk Proyek Anda</p>
                </div>
              </div>

              {isGeneratingAiPost ? (
                <div className="h-[280px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900 dark:text-white">{aiPostProgress}%</div>
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">AI sedang memproses draf</h5>
                    <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest animate-pulse">{aiPostStepText}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select Project Link */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Asosiasi Proyek / Halaman</label>
                    <select
                      value={selectedCmsProjectId}
                      onChange={(e) => setSelectedCmsProjectId(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue"
                    >
                      <option value="">-- PILIH PROYEK / GENERAL BLOG --</option>
                      {userProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name} ({proj.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title Input */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Topik / Judul Artikel</label>
                    <input
                      type="text"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      placeholder="Contoh: Manfaat Kopi Espresso bagi Kesehatan Jantung"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Tone Suara</label>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-black text-slate-500 dark:text-white outline-none"
                      >
                        <option>Profesional</option>
                        <option>Kreatif & Santai</option>
                        <option>Persuasif & Promotif</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Panjang Artikel</label>
                      <select
                        value={aiLength}
                        onChange={(e) => setAiLength(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-black text-slate-500 dark:text-white outline-none"
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
                className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-purple-600 hover:brightness-110 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Mulai Tulis Artikel
              </button>
            )}
          </div>

          {/* RIGHT: SCHEDULER & STATS INFO */}
          <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-slate-50 dark:border-slate-800 pb-4">
                <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Smart Publisher Recommendation</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Optimasi SEO & Waktu Posting Terbaik</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-brand-blue block">Analitik SEO AI</span>
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                    AI kami secara otomatis menganalisis kepadatan kata kunci, meta description, dan struktur heading agar artikel Anda mendapatkan skor di atas 90 saat dipublikasikan.
                  </p>
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 block">Waktu Posting Terbaik</span>
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                    Rekomendasi Waktu Rilis: Hari kerja (Selasa - Kamis) antara pukul 09:00 - 11:00 WIB untuk mendapatkan traffic retensi organik tertinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
            {/* Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex items-start gap-2.5">
                <Globe className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Daftar Proyek Landing Page
                  </h3>
                  <p className="text-xs lowercase font-medium text-slate-400 dark:text-slate-500 mt-1">
                    edit dan hapus situs landing page anda secara langsung
                  </p>
                </div>
              </div>
            </div>

            {/* Table of projects */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Situs</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-350">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm shrink-0">
                            <img
                              src={project.image || "https://picsum.photos/seed/placeholder/800/600"}
                              alt={project.name || project.businessName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[200px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1">
                              {project.name || project.businessName}
                            </p>
                            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                              /{project.slug}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-wider">
                          {project.category || 'General'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            project.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
                              : project.status === 'Pending'
                              ? 'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                              : 'bg-slate-100 text-slate-550 dark:bg-slate-800/50'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-1.5 justify-center">
                            <button
                              onClick={() => {
                                if (onEditProject) {
                                  onEditProject(project.id);
                                } else {
                                  setActivePageId(project.id);
                                  setIsCmsEditorOpen(true);
                                }
                              }}
                              className="px-2.5 py-1.5 text-white bg-green-500 hover:bg-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-sm cursor-pointer flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => onPreviewProject && onPreviewProject(project.id)}
                              className="px-2.5 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-sm cursor-pointer flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> Preview
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {cmsSearchQuery ? "Tidak ada proyek yang sesuai dengan pencarian." : "Belum ada proyek yang dibuat."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsPage;
