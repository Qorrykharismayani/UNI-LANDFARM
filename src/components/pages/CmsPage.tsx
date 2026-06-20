<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
import { Layers, Search, Trash2, ChevronLeft, ChevronRight, Bot, Zap, Globe, Edit } from 'lucide-react';
=======
import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Search, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Bot, 
  Zap, 
  Globe, 
  Edit, 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  AlertCircle,
  Plus,
  X,
  Play,
  FileText
} from 'lucide-react';
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
import React, { useState } from 'react';
import { Layers, Search, Trash2, ChevronLeft, ChevronRight, Bot, Zap, Globe, Edit } from 'lucide-react';
>>>>>>> orry

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
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
<<<<<<< HEAD
=======
  handleDeleteSchedule: (id: number) => Promise<void>;
  fetchSchedules: () => Promise<void>;
  setActivePageId: (id: string | null) => void;
  setIsCmsEditorOpen: (open: boolean) => void;
  handleDeleteProject: (id: string) => Promise<void>;
  showNotification?: (message: string, type?: 'success' | 'info') => void;
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
}

const CmsPage = ({
  cmsPosts,
  setCmsPosts,
  cmsSearchQuery,
  setCmsSearchQuery,
  cmsCurrentPage,
  setCmsCurrentPage,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
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
}: CmsPageProps) => {
  const [subTab, setSubTab] = useState<'list' | 'ai_scheduler' | 'projects'>('projects');

  const filteredPosts = cmsPosts.filter(post =>
    (post.title || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (post.author || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (post.type || '').toLowerCase().includes(cmsSearchQuery.toLowerCase())
<<<<<<< HEAD
=======
  userProjects = [],
  handleDeleteSchedule,
  fetchSchedules,
  setActivePageId,
  setIsCmsEditorOpen,
  handleDeleteProject,
  showNotification
}: CmsPageProps) => {
  const [subTab, setSubTab] = useState<'projects' | 'schedules' | 'ai_scheduler'>('projects');
  
  // AI Generator local states
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [aiComponent, setAiComponent] = useState('Hero Title');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('Profesional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStepText, setGenStepText] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  // Scheduling Modal local states
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleSection, setNewScheduleSection] = useState('hero');
  const [newScheduleComponent, setNewScheduleComponent] = useState('Hero Title');
  const [newScheduleValue, setNewScheduleValue] = useState('');
  const [newScheduleStatus, setNewScheduleStatus] = useState('Scheduled');
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null);

  // Sync default project ID
  useEffect(() => {
    if (userProjects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(String(userProjects[0].id));
    }
  }, [userProjects, selectedProjectId]);

  // Statistics calculation
  const totalActive = cmsSchedules.filter(s => s.status === 'Scheduled' || s.status === 'Queued').length;
  const totalScheduled = cmsSchedules.filter(s => s.status === 'Scheduled').length;
  const totalCompleted = cmsSchedules.filter(s => s.status === 'Completed' || s.status === 'Published').length;
  const totalFailed = cmsSchedules.filter(s => s.status === 'Failed').length;

  // Filter schedules list
  const filteredSchedules = cmsSchedules.filter(sched =>
    (sched.title || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (sched.component || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (sched.status || '').toLowerCase().includes(cmsSearchQuery.toLowerCase()) ||
    (sched.landingPage?.title || '').toLowerCase().includes(cmsSearchQuery.toLowerCase())
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2 flex items-center gap-2">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
            Site Content Manager
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Kelola postingan blog, tulis artikel pintar dengan AI, dan hubungkan langsung ke proyek Anda.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setSubTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              subTab === 'projects'
                ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-355'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Kelola Proyek
          </button>
          <button
            onClick={() => setSubTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              subTab === 'list'
                ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Daftar Artikel
          </button>
          <button
            onClick={() => setSubTab('ai_scheduler')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              subTab === 'ai_scheduler'
                ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            <Bot className="w-3.5 h-3.5 animate-pulse" />
            Tulis dengan AI & Jadwal
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {subTab === 'list' ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
            {/* Search and Table Control Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex flex-col gap-1">
                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-brand-blue" /> Site Content List
                </h3>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                  Manual management of blog posts and visual content
<<<<<<< HEAD
=======
            Kelola Proyek
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Kelola, edit, dan hapus situs landing page Anda dengan mudah.
          </p>
        </div>
      </div>

      {/* Tab Contents: schedules */}
      {subTab === 'schedules' ? (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Jadwal Aktif', value: totalActive, color: 'text-amber-500 bg-amber-500/10' },
              { label: 'Scheduled', value: totalScheduled, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'Completed', value: totalCompleted, color: 'text-emerald-500 bg-emerald-500/10' },
              { label: 'Failed', value: totalFailed, color: 'text-red-500 bg-red-500/10' }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[20px] p-5 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">{stat.label}</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</span>
                </div>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs bg-slate-50 dark:bg-slate-800 text-slate-500">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
            {/* Control Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex flex-col gap-1">
                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-brand-blue" /> CONTENT SCHEDULE LIST
                </h3>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                  Monitoring scheduled content updates for landing page components
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                    type="text"
                    placeholder="Search articles..."
                    value={cmsSearchQuery}
                    onChange={(e) => {
                      setCmsSearchQuery(e.target.value);
                      setCmsCurrentPage(() => 1);
                    }}
                    className="pl-9 pr-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold outline-none focus:border-brand-blue transition-all dark:text-white w-48"
<<<<<<< HEAD
=======
                     type="text"
                     placeholder="Cari jadwal..."
                     value={cmsSearchQuery}
                     onChange={(e) => {
                       setCmsSearchQuery(e.target.value);
                       setCmsCurrentPage(() => 1);
                     }}
                     className="pl-9 pr-3.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold outline-none focus:border-brand-blue transition-all dark:text-white w-48"
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                  />
                </div>
                <button
                  onClick={() => setSubTab('ai_scheduler')}
                  className="px-3.5 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
<<<<<<< HEAD
<<<<<<< HEAD
                  <Bot className="w-3.5 h-3.5" /> Buat Artikel
=======
                  <Bot className="w-3.5 h-3.5" /> Buat Jadwal AI
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                  <Bot className="w-3.5 h-3.5" /> Buat Artikel
>>>>>>> orry
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Title / Project</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Author</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">SEO Score</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-355">
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[340px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1.5">
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
                            <span className="text-[9px] font-black text-slate-900 dark:text-white">
                              {post.scoreAfter || post.scoreBefore || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm cursor-pointer"
                              onClick={() => handleDeleteArticle(post.id)}
<<<<<<< HEAD
=======
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Nama Jadwal / Proyek</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Komponen</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Nilai Baru</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Eksekusi</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
                  {currentSchedules.length > 0 ? (
                    currentSchedules.map((sched) => (
                      <tr key={sched.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[200px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1.5">
                            {sched.title}
                          </p>
                          <span className="px-1.5 py-0.5 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue text-[8px] font-black uppercase tracking-widest rounded">
                            {sched.landingPage?.title || 'Landing Page'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                            {sched.component}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[150px]" title={sched.newValue}>
                            {sched.newValue}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                            {new Date(sched.scheduledAt || sched.date || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            sched.status === 'Completed' || sched.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
                              : sched.status === 'Failed'
                              ? 'bg-red-50 text-red-500 dark:bg-red-500/10'
                              : sched.status === 'Queued'
                              ? 'bg-blue-50 text-blue-500 dark:bg-blue-500/10'
                              : 'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                          }`}>
                            {sched.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              className="p-1.5 text-slate-400 hover:text-brand-blue bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm cursor-pointer border-none"
                              onClick={() => {
                                setEditingScheduleId(sched.id);
                                setNewScheduleTitle(sched.title);
                                setNewScheduleSection(sched.sectionName || 'hero');
                                setNewScheduleComponent(sched.component);
                                setNewScheduleValue(sched.newValue);
                                setNewScheduleDate(formatForDateTimeLocal(sched.scheduledAt || sched.date));
                                setNewScheduleStatus(sched.status);
                                setSelectedProjectId(String(sched.landingPageId));
                                setIsScheduleModalOpen(true);
                              }}
                              title="Edit Jadwal"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm cursor-pointer border-none"
                              onClick={() => handleDeleteSchedule(sched.id)}
                              title="Hapus Jadwal"
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
<<<<<<< HEAD
<<<<<<< HEAD
                      <td colSpan={5} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {cmsSearchQuery ? "No articles match the search query." : "Belum ada artikel."}
=======
                      <td colSpan={6} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {cmsSearchQuery ? "Tidak ada jadwal yang cocok." : "Belum ada jadwal perubahan konten."}
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                      <td colSpan={5} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {cmsSearchQuery ? "No articles match the search query." : "Belum ada artikel."}
>>>>>>> orry
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/10 dark:bg-slate-800/5">
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
<<<<<<< HEAD
<<<<<<< HEAD
                Showing {filteredPosts.length > 0 ? indexOfFirstPost + 1 : 0}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
=======
                Showing {filteredSchedules.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredSchedules.length)} of {filteredSchedules.length} schedules
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                Showing {filteredPosts.length > 0 ? indexOfFirstPost + 1 : 0}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
>>>>>>> orry
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCmsCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[9px] font-black uppercase tracking-wider rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button
                  onClick={() => setCmsCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 disabled:opacity-50 text-[9px] font-black uppercase tracking-wider rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : subTab === 'ai_scheduler' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-500">
<<<<<<< HEAD
<<<<<<< HEAD
          {/* LEFT: AI CONTENT WRITER FORM */}
=======
          {/* LEFT: AI SCHEDULER FORM */}
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
          {/* LEFT: AI CONTENT WRITER FORM */}
>>>>>>> orry
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-slate-50 dark:border-slate-800/80 pb-4">
                <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shadow-inner shrink-0">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Content Writer</h4>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tulis artikel berkualitas tinggi secara otomatis untuk Proyek Anda</p>
                </div>
              </div>

              {isGeneratingAiPost ? (
<<<<<<< HEAD
=======
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Copywriter & Scheduler</h4>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Rancang dan jadwalkan perubahan elemen landing page otomatis</p>
                </div>
              </div>

              {isGenerating ? (
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                <div className="h-[280px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900 dark:text-white">{aiPostProgress}%</div>
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">AI sedang memproses draf</h5>
                    <p className="text-[9px] font-bold text-brand-blue uppercase tracking-widest animate-pulse">{aiPostStepText}</p>
<<<<<<< HEAD
=======
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900 dark:text-white">{genProgress}%</div>
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">AI sedang memproses draf</h5>
                    <p className="text-[9px] font-bold text-brand-blue uppercase tracking-widest animate-pulse">{genStepText}</p>
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                  {/* Select Project Link */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Asosiasi Proyek / Halaman</label>
                    <select
                      value={selectedCmsProjectId}
                      onChange={(e) => setSelectedCmsProjectId(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue"
                    >
                      <option value="">-- PILIH PROYEK / GENERAL BLOG --</option>
                      {userProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name} ({proj.type})
<<<<<<< HEAD
=======
                  {/* Select Landing Page */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Target Landing Page</label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue"
                    >
                      <option value="">-- PILIH TARGET LANDING PAGE --</option>
                      {userProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name || proj.businessName} ({proj.slug})
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                        </option>
                      ))}
                    </select>
                  </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                  {/* Title Input */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Topik / Judul Artikel</label>
                    <input
                      type="text"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      placeholder="Contoh: Manfaat Kopi Espresso bagi Kesehatan Jantung"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Tone Suara</label>
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
                      <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Panjang Artikel</label>
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
<<<<<<< HEAD
=======
                  {/* Component Dropdown */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Komponen yang akan diubah</label>
                    <select
                      value={aiComponent}
                      onChange={(e) => setAiComponent(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue"
                    >
                      <option>Menu Navigasi</option>
                      <option>Logo Website</option>
                      <option>Hero Banner</option>
                      <option>Tentang Usaha</option>
                      <option>Produk & Layanan</option>
                      <option>Keunggulan</option>
                      <option>Testimoni</option>
                      <option>Galeri Foto</option>
                      <option>CTA Penawaran</option>
                      <option>Kontak</option>
                      <option>Media Sosial</option>
                      <option>Toko Online (Marketplace)</option>
                      <option>Footer Halaman</option>
                    </select>
                  </div>

                  {/* Topic / Prompt */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Instruksi / Prompt Konten</label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Contoh: Buat promo diskon 30% menyambut liburan sekolah untuk produk kopi robusta"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-brand-blue/50 transition-colors resize-none h-20"
                    />
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Tone Copywriting</label>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-black text-slate-500 dark:text-white outline-none focus:border-brand-blue"
                    >
                      <option>Profesional</option>
                      <option>Kreatif & Santai</option>
                      <option>Persuasif & Promotif</option>
                    </select>
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
                  </div>
                </div>
              )}
            </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
            {!isGeneratingAiPost && (
              <button
                onClick={handleGenerateAiPost}
                className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-purple-600 hover:brightness-110 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Mulai Tulis Artikel
<<<<<<< HEAD
=======
            {!isGenerating && (
              <button
                onClick={handleGenerateAi}
                className="w-full py-3.5 bg-gradient-to-r from-brand-blue to-purple-600 hover:brightness-110 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-[0.98] cursor-pointer border-none"
              >
                Generate Salinan dengan AI
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
              </button>
            )}
          </div>

<<<<<<< HEAD
<<<<<<< HEAD
          {/* RIGHT: SCHEDULER & STATS INFO */}
=======
          {/* RIGHT: AI SUGGESTION PREVIEW & ACTION PLAN */}
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
          {/* RIGHT: SCHEDULER & STATS INFO */}
>>>>>>> orry
          <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-slate-50 dark:border-slate-800 pb-4">
                <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center shadow-inner shrink-0">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> orry
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Smart Publisher Recommendation</h4>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Optimasi SEO & Waktu Posting Terbaik</p>
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
              <div className="flex flex-col gap-1">
                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-brand-blue" /> Daftar Proyek Landing Page
                </h3>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                  Edit dan hapus situs landing page Anda secara langsung
                </p>
              </div>
            </div>

            {/* Table of projects */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Situs</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-350">
                  {userProjects.length > 0 ? (
                    userProjects.map((project) => (
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
                            <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[200px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1">
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
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            project.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
                              : project.status === 'Pending'
                              ? 'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                              : 'bg-slate-100 text-slate-550 dark:bg-slate-800/50'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => {
                                setActivePageId(project.id);
                                setIsCmsEditorOpen(true);
                              }}
                              className="px-2.5 py-1.5 text-white bg-green-500 hover:bg-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-sm cursor-pointer flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" /> Edit
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
                      <td colSpan={4} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Belum ada proyek yang dibuat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
<<<<<<< HEAD
=======
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Copywriting Output</h4>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Salinan siap terapkan atau dijadwalkan</p>
                </div>
              </div>

              {generatedContent ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-4 rounded-xl space-y-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-brand-blue block">Preview Teks</span>
                    <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-snug">
                      {generatedContent.headline}
                    </p>
                    {generatedContent.subheadline && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-2">
                        {generatedContent.subheadline}
                      </p>
                    )}
                    {generatedContent.cta && (
                      <span className="inline-block mt-3 px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-wider rounded-lg">
                        CTA: {generatedContent.cta}
                      </span>
                    )}
                  </div>

                  {/* Actions Grid */}
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => {
                        const finalVal = generatedContent.headline + (generatedContent.subheadline ? ` - ${generatedContent.subheadline}` : '');
                        handleApplyDirectly(selectedProjectId, aiComponent, finalVal);
                      }}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 cursor-pointer border-none"
                    >
                      <Check className="w-3.5 h-3.5" /> Simpan Langsung
                    </button>
                    <button
                      onClick={() => {
                        const finalVal = generatedContent.headline + (generatedContent.subheadline ? ` - ${generatedContent.subheadline}` : '');
                        setNewScheduleValue(finalVal);
                        setNewScheduleComponent(aiComponent);
                        setNewScheduleTitle(`Ubah ${aiComponent} via AI`);
                        setEditingScheduleId(null);
                        setIsScheduleModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 cursor-pointer border-none"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Jadwalkan Perubahan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <span className="text-3xl">🤖</span>
                  <div className="space-y-1">
                    <h5 className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Belum ada konten</h5>
                    <p className="text-[9.5px] font-medium text-slate-400 max-w-[200px] leading-relaxed">
                      Lakukan generate di panel kiri untuk memunculkan teks copywriting AI di sini.
                    </p>
                  </div>
                </div>
              )}
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
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
            {/* Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <div className="flex flex-col gap-1">
                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-brand-blue" /> Daftar Proyek Landing Page
                </h3>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                  Edit dan hapus situs landing page Anda secara langsung
                </p>
              </div>
            </div>

            {/* Table of projects */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Situs</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-slate-700 dark:text-slate-350">
                  {userProjects.length > 0 ? (
                    userProjects.map((project) => (
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
                            <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[200px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1">
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
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            project.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
                              : project.status === 'Pending'
                              ? 'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                              : 'bg-slate-100 text-slate-550 dark:bg-slate-800/50'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => {
                                setActivePageId(project.id);
                                setIsCmsEditorOpen(true);
                              }}
                              className="px-2.5 py-1.5 text-white bg-green-500 hover:bg-green-600 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-sm cursor-pointer flex items-center gap-1 border-none"
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm cursor-pointer border-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Belum ada proyek yang dibuat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Scheduler Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => {
            setIsScheduleModalOpen(false);
            setEditingScheduleId(null);
          }} />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[20px] p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                📅 {editingScheduleId ? 'Edit Perubahan Konten' : 'Jadwalkan Perubahan'}
              </h3>
              <button onClick={() => {
                setIsScheduleModalOpen(false);
                setEditingScheduleId(null);
              }} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-none bg-transparent cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Nama Jadwal</label>
                <input
                  type="text"
                  value={newScheduleTitle}
                  onChange={(e) => setNewScheduleTitle(e.target.value)}
                  placeholder="Contoh: Promo Diskon Akhir Pekan"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Target Section</label>
                <select
                  value={newScheduleSection}
                  onChange={(e) => setNewScheduleSection(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                >
                  <option value="hero">Hero</option>
                  <option value="about">About</option>
                  <option value="products">Products</option>
                  <option value="advantages">Advantages</option>
                  <option value="testimonials">Testimonials</option>
                  <option value="cta">CTA</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Target Komponen</label>
                <select
                  value={newScheduleComponent}
                  onChange={(e) => setNewScheduleComponent(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                >
                  <option>Menu Navigasi</option>
                  <option>Logo Website</option>
                  <option>Hero Banner</option>
                  <option>Tentang Usaha</option>
                  <option>Produk & Layanan</option>
                  <option>Keunggulan</option>
                  <option>Testimoni</option>
                  <option>Galeri Foto</option>
                  <option>CTA Penawaran</option>
                  <option>Kontak</option>
                  <option>Media Sosial</option>
                  <option>Toko Online (Marketplace)</option>
                  <option>Footer Halaman</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Nilai Baru (Konten)</label>
                <textarea
                  value={newScheduleValue}
                  onChange={(e) => setNewScheduleValue(e.target.value)}
                  placeholder="Konten perubahan..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none resize-none h-16"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Waktu Eksekusi</label>
                <input
                  type="datetime-local"
                  value={newScheduleDate}
                  onChange={(e) => setNewScheduleDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">Status</label>
                <select
                  value={newScheduleStatus}
                  onChange={(e) => setNewScheduleStatus(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  setEditingScheduleId(null);
                }}
                className="flex-1 py-2.5 text-[10px] font-black uppercase tracking-wider border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer text-slate-500 dark:text-slate-400 bg-transparent"
              >
                Batal
              </button>
              <button
                onClick={handleSaveSchedule}
                className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer border-none"
              >
                {editingScheduleId ? 'Simpan' : 'Jadwalkan'}
              </button>
            </div>
          </div>
        </div>
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
>>>>>>> orry
      )}
    </div>
  );
};

export default CmsPage;
