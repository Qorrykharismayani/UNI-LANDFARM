import React from 'react';
import { 
  MessageSquare, 
  Upload, 
  LineChart as LucideLineChart, 
  LayoutDashboard, 
  ChevronDown, 
  User, 
  BarChart3, 
  Bot, 
  Database, 
  Image, 
  Zap, 
  TrendingUp, 
  Layout 
} from 'lucide-react';
import { motion } from 'motion/react';

interface CMSProps {
  setView: (v: string) => void;
}

export const CMSLandingView = ({ setView }: CMSProps) => {
  const features = [
    { num: "01", title: "AI Agent Panel", desc: "Interaksi real-time dengan asisten otonom untuk manajemen konten.", icon: <MessageSquare className="w-5 h-5" /> },
    { num: "02", title: "Knowledge Base", desc: "Unggah data bisnis Anda untuk kustomisasi AI yang sangat spesifik.", icon: <Upload className="w-5 h-5" /> },
    { num: "03", title: "Data Visualization", desc: "Visualisasi data real-time untuk pengambilan keputusan yang lebih cepat.", icon: <LucideLineChart className="w-5 h-5" /> }
  ];

  return (
    <section id="cms-section" className="py-24 lg:py-32 px-8 bg-white dark:bg-[#020617] text-slate-900 dark:text-white relative overflow-hidden font-sans border-t border-slate-200 dark:border-white/5 transition-all duration-300">
      {/* Background Decorative Glows */}
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] -z-10 rounded-full"></div>
      
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-[48%_52%] gap-12 lg:gap-16 items-center relative z-10 lg:px-6">
        {/* LEFT COLUMN */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-blue animate-pulse" />
              CMS DASHBOARD
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">
              CMS Kuat dengan <br />
              <span className="text-brand-blue">Kecerdasan Bisnis AI</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed max-w-lg transition-colors">
              Kelola seluruh ekosistem digital bisnis Anda dengan bantuan AI yang proaktif. Dari analisis pasar hingga penjadwal konten pemasaran otomatis.
            </p>
          </div>
          
          {/* Feature List */}
          <div className="space-y-6">
            {features.map((item, i) => (
              <div 
                key={i}
                className="flex items-start gap-5 group transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-brand-blue/40 group-hover:text-brand-blue transition-all duration-300 shrink-0">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-lg font-black text-slate-900/90 dark:text-white/90 group-hover:text-brand-blue transition-colors tracking-tight leading-tight">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-sm transition-colors group-hover:text-slate-800 dark:group-hover:text-slate-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="pt-2"
          >
            <button 
              onClick={() => setView('signup')}
              className="px-8 py-3.5 bg-brand-blue text-white rounded-xl font-black text-[12px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-[0_15px_30px_-10px_rgba(255,176,0,0.4)]"
            >
              Mulai Kelola Sekarang
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - Dashboard Mockup (Smaller & More Detailed) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.7, x: 50 }}
          whileInView={{ opacity: 1, scale: 0.85, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative group w-full lg:-mr-32 xl:-mr-40"
        >
          {/* Enhanced Blue Light Glow Effect */}
          <div className="absolute -inset-20 bg-brand-blue/30 blur-[100px] -z-10 rounded-full animate-pulse-slow"></div>
          <div className="absolute -inset-60 bg-brand-blue/15 blur-[150px] -z-10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[140%] bg-cyan-400/15 blur-[160px] -z-10 rounded-[100px] animate-pulse-slow"></div>
          <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-brand-blue/20 blur-[200px] -z-10 rounded-full animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 blur-[140px] -z-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-blue/30 blur-[140px] -z-10 rounded-full"></div>
          <div className="absolute -bottom-60 -right-40 w-[700px] h-[700px] bg-brand-blue/10 blur-[220px] -z-10 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-brand-blue/5 blur-[80px] -z-10 rounded-[48px]"></div>
          
          {/* Dashboard Container */}
          <div className="bg-[#020617] rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_0_40px_rgba(255,176,0,0.15)] overflow-hidden flex flex-col w-full aspect-[1.4/1] md:aspect-[1.2/1] border border-white/5 relative">
            {/* Top Bar (Mac Style) */}
            <div className="h-14 px-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">PREMIUM AI DASHBOARD</div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-20 border-r border-white/5 bg-black/20 py-8 flex flex-col items-center gap-10 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,176,0,0.5)]">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col gap-8">
                  {[BarChart3, Bot, Database, Image, Zap].map((Icon, idx) => (
                    <div key={idx} className="text-slate-500 hover:text-brand-blue transition-colors cursor-pointer group/nav">
                      <Icon className="w-5 h-5 group-hover/nav:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1 overflow-hidden flex flex-col bg-[#020617]">
                {/* Header Section */}
                <div className="p-8 pb-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-white font-black text-xl tracking-tight">PRODUKTIVITAS BISNIS</h2>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase opacity-60">DASHBOARD UTAMA • LIVE ANALYTICS</p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <span>MINGGUAN</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
                
                {/* Main Content Scrollable */}
                <div className="px-6 pb-6 space-y-4 overflow-visible">
                  {/* Top Summary Cards */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'KUNJUNGAN', val: '4.2k', trend: '↑ 18%', color: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]' },
                      { label: 'SKOR SEO', val: '92', trend: 'Optimal', color: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]' },
                      { label: 'AGEN AI', val: '24', trend: 'Online', color: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(192,132,252,0.1)]' },
                      { label: 'POSTINGAN', val: '12', trend: 'Auto', color: 'text-brand-blue', glow: 'shadow-[0_0_20px_rgba(255,176,0,0.1)]' }
                    ].map((card, i) => (
                      <div key={i} className={`p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2 hover:border-white/10 transition-all cursor-default group relative overflow-hidden backdrop-blur-sm ${card.glow}`}>
                        <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none">{card.label}</p>
                        <h6 className="text-lg font-black text-white leading-none">{card.val}</h6>
                        <span className={`text-[7px] font-bold ${card.color} tracking-wider`}>{card.trend}</span>
                      </div>
                    ))}
                  </div>
                   
                  <div className="grid grid-cols-[1.5fr_1fr] gap-6">
                    {/* Growth Analytics Card */}
                    <div className="bg-white/[0.03] rounded-3xl border border-white/5 p-6 flex flex-col gap-4 relative overflow-hidden group">
                      <div className="flex items-center justify-between">
                        <h5 className="font-black text-slate-400 text-[9px] uppercase tracking-widest">ANALITIK PERTUMBUHAN</h5>
                        <div className="px-2 py-1 bg-white/5 rounded-md text-[7px] font-black text-slate-500">7 Hari</div>
                      </div>
                         
                      {/* SVG Line Chart Mockup */}
                      <div className="relative h-32 w-full mt-4">
                        <svg viewBox="0 0 400 100" className="w-full h-full">
                          {/* Grid lines */}
                          {[20, 40, 60, 80].map((y) => (
                            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="4 4" />
                          ))}
                          {/* Data Line */}
                          <motion.path
                            d="M0,80 Q50,70 80,85 T160,60 T240,75 T320,50 T400,30"
                            fill="none"
                            stroke="url(#blue-glow)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                          {/* Points */}
                          <circle cx="400" cy="30" r="4" fill="#3a86ff" className="animate-pulse shadow-[0_0_10px_#3a86ff]" />
                          <defs>
                            <linearGradient id="blue-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3a86ff" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#3a86ff" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute bottom-0 w-full flex justify-between text-[6px] font-black text-slate-600 uppercase tracking-widest mt-2 px-1">
                          <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights Card */}
                    <div className="bg-gradient-to-br from-[#0a0f1e] to-[#020617] rounded-3xl border border-brand-blue/10 p-6 flex flex-col gap-4 relative overflow-hidden group">
                      <div className="flex items-center gap-2">
                        <h5 className="font-black text-brand-blue text-[9px] uppercase tracking-widest">INSIGHT AI</h5>
                        <Zap className="w-3 h-3 text-brand-blue animate-pulse" />
                      </div>
                         
                      <div className="space-y-1 relative z-10">
                        <p className="text-[11px] font-black text-slate-300 leading-relaxed uppercase tracking-tight">OPTIMASI METADATA UNTUK SEO MAKSIMAL & JANGKAUAN LUAS.</p>
                      </div>

                      {/* AI Face Mockup */}
                      <div className="mt-auto flex justify-end">
                        <div className="relative">
                          <Bot className="w-20 h-20 text-brand-blue/20 rotate-12" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full blur-[2px] animate-pulse"></div>
                            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full blur-[2px] animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Top Revenue Card */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -top-6 -right-6 bg-[#0a0f1e] backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 z-30"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">REVENUE GROWTH</p>
              <h6 className="text-sm font-black text-white leading-none">+28.5%</h6>
            </div>
          </motion.div>

          {/* Floating Bottom AI Status */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-8 -left-8 bg-[#0a0f1e] backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 z-30"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-brand-blue animate-spin"></div>
              <div className="absolute inset-2 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
              </div>
            </div>
            <div>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">AI STATUS</p>
              <h6 className="text-[10px] font-black text-brand-blue leading-none">SYSTEM READY</h6>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const CMSPreview = ({ setView }: CMSProps) => (
  <section className="py-20 px-6 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30 mb-6 uppercase tracking-widest text-[9px] font-black shadow-[0_0_20px_rgba(255,176,0,0.1)] transition-colors">
          <Bot className="w-3.5 h-3.5" />
          Modern Agentic AI CMS
        </div>
        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight uppercase transition-colors">
          CMS Kuat dengan <br />
          <span className="text-brand-blue">Kecerdasan Bisnis AI</span>
        </h2>
        <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium transition-colors">
          Kelola seluruh ekosistem digital bisnis Anda dengan bantuan AI yang proaktif. Dari analisis pasar hingga penjadwal konten pemasaran otomatis.
        </p>
        
        <div className="space-y-4 mb-10">
          {[
            { title: "AI Agent Panel", desc: "Interaksi real-time dengan asisten otonom.", icon: <MessageSquare className="w-4 h-4" /> },
            { title: "Knowledge Base", desc: "Unggah data bisnis untuk kustomisasi AI.", icon: <Upload className="w-4 h-4" /> },
            { title: "Data Visualization", desc: "Visualisasi data real-time untuk keputusan cepat.", icon: <BarChart3 className="w-4 h-4" /> }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-9 h-9 bg-brand-blue/10 border border-slate-200 dark:border-white/5 rounded-lg flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 text-sm">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight transition-colors">{item.title}</h4>
                <p className="text-[10px] text-slate-600 dark:text-slate-500 font-medium transition-colors">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setView('cms')}
          className="px-8 py-4 bg-brand-blue text-white rounded-xl font-black shadow-[0_15px_40px_rgba(255,176,0,0.25)] hover:scale-105 transition-all text-[10px] uppercase tracking-widest"
        >
          Mulai Kelola Sekarang
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative pointer-events-none select-none max-w-sm mx-auto lg:ml-auto"
      >
        {/* Main Dashboard Mockup - Refined to match image */}
        <div className="bg-white rounded-[32px] border-[10px] border-slate-900 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10] flex flex-col relative">
          {/* Mockup Header */}
          <div className="h-10 bg-white border-b border-slate-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[6px] font-black text-emerald-600 uppercase tracking-widest">Live</span>
              </div>
              <div className="h-1.5 w-20 bg-slate-100 rounded-full"></div>
            </div>
          </div>

          {/* Mockup Main */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-12 bg-white border-r border-slate-50 flex flex-col items-center py-4 gap-4">
              <div className="w-6 h-6 bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-md shadow-brand-blue/20 scale-110">
                <Cpu className="w-3 h-3" />
              </div>
              {[Layout, BarChart3, Bot].map((Icon, i) => (
                <div key={i} className="text-slate-100">
                  <Icon className="w-3 h-3" />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-slate-50/10 p-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Traffic Card */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100/50">
                  <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-1">Traffic</p>
                  <h5 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">14.2k</h5>
                  <div className="text-emerald-500 text-[6px] font-bold">+12.5%</div>
                </div>

                {/* Uptime Card (Dark) */}
                <div className="bg-slate-950 p-3 rounded-xl shadow-md relative overflow-hidden">
                  <p className="text-[6px] font-black text-slate-500 uppercase tracking-widest mb-1">Uptime</p>
                  <h5 className="text-sm font-black text-white tracking-tight leading-none">99.9%</h5>
                  <div className="mt-2 h-0.5 w-full bg-slate-900 rounded-full">
                    <div className="h-full w-[99%] bg-brand-blue" />
                  </div>
                </div>
              </div>

              {/* Chart Box */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100/50 h-16 flex flex-col">
                <div className="h-1 w-12 bg-slate-50 rounded-full mb-3" />
                <div className="flex-1 flex items-end gap-0.5">
                  {[30, 45, 35, 60, 40, 75, 90, 65, 85].map((h, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${h}%` }} 
                      className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-brand-blue' : 'bg-slate-50'}`} 
                      />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Phone Overlay */}
          <div className="absolute -bottom-8 -right-4 w-32 aspect-[9/18.5] bg-white rounded-[28px] border-[4px] border-slate-900 shadow-xl z-20 overflow-hidden flex flex-col">
            <div className="h-6 flex items-center justify-center">
              <div className="w-2.5 h-0.5 bg-slate-900 rounded-full mt-0.5" />
            </div>
            <div className="flex-1 p-2.5 flex flex-col gap-3">
              <div className="h-4 w-4 rounded-full bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue self-center">
                <Zap className="w-2 h-2" />
              </div>
              <div className="h-1 w-2/3 bg-slate-50 rounded-full mx-auto" />
              <div className="h-5 w-full bg-slate-900 rounded-lg" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-brand-blue/5 p-1.5 rounded-lg text-center">
                  <p className="text-[7px] font-black text-brand-blue">84%</p>
                </div>
                <div className="bg-emerald-50 p-1.5 rounded-lg text-center">
                  <p className="text-[7px] font-black text-emerald-500">$2.4k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
