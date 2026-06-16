import React from 'react';
import { Layers, Search, Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface CmsPageProps {
  cmsPosts: any[];
  setCmsPosts: (fn: (prev: any[]) => any[]) => void;
  cmsSearchQuery: string;
  setCmsSearchQuery: (q: string) => void;
  cmsCurrentPage: number;
  setCmsCurrentPage: (fn: (prev: number) => number) => void;
}

const CmsPage = ({
  cmsPosts,
  setCmsPosts,
  cmsSearchQuery,
  setCmsSearchQuery,
  cmsCurrentPage,
  setCmsCurrentPage,
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
             Site Content Manager
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Manage posts and review your website with ease.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
          <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
            <div className="flex flex-col gap-1">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                 <Layers className="w-4 h-4 text-brand-blue" /> Site Content List
              </h3>
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Manual management of blog posts and visual content</p>
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
                  className="pl-9 pr-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-205 dark:border-slate-700 rounded-xl text-[10px] font-bold outline-none focus:border-brand-blue transition-all dark:text-white w-40"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Author</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">SEO Score</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Action</th>
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
                          <button className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm" onClick={() => setCmsPosts(prev => prev.filter(p => p.id !== post.id))}><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {cmsSearchQuery ? "No articles match the search query." : "Belum ada artikel."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/10 dark:bg-slate-800/5">
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Showing {filteredPosts.length > 0 ? indexOfFirstPost + 1 : 0}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
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
      </div>
    </div>
  );
};

export default CmsPage;
