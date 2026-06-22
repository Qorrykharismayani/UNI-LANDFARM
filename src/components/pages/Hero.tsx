import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Globe, Zap, ShoppingBag } from 'lucide-react';

interface HeroProps {
  setView: (v: string) => void;
  systemSettings?: any;
  user?: any;
}

const Hero = ({ setView, systemSettings, user }: HeroProps) => (
  <section className="pt-32 pb-48 px-6 overflow-visible relative min-h-[800px] flex items-center transition-colors duration-500 bg-white dark:bg-[#020617]">
    {/* Premium Background & Lighting */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#020617] dark:via-[#030712] dark:to-[#010816] pointer-events-none transition-colors duration-500"></div>

    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Warm Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-[#FFB000]/5 dark:bg-[#FFB000]/15 blur-[180px] transition-colors"
      />

      {/* Secondary Accent Glows */}
      <div className="absolute top-[15%] right-[0%] w-[50%] h-[50%] rounded-full bg-[#FFB000]/10 dark:bg-[#FFB000]/20 blur-[160px] transition-colors"></div>
      <div className="absolute bottom-[0%] left-[0%] w-[40%] h-[40%] rounded-full bg-amber-500/5 dark:bg-amber-500/15 blur-[140px] transition-colors"></div>
      <div className="absolute top-1/2 right-[10%] w-[25%] h-[25%] rounded-full bg-[#FFB000]/10 dark:bg-[#FFB000]/20 blur-[120px] animate-pulse transition-colors"></div>
    </div>

    <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-10 lg:gap-12 xl:gap-16 items-center relative z-10 pl-4 pr-6 lg:pl-8 lg:pr-16 w-full">
      
      {/* Left Column - Text Content */}
      <div className="flex flex-col items-start relative z-20 order-2 lg:order-1 mt-12 lg:mt-0 lg:pr-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50/80 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#FFB000]" />
          <span className="text-[11px] font-black tracking-[0.2em] text-[#FFB000] uppercase">AI-POWERED PRECISION • UNI-LANDFARM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[36px] sm:text-[42px] lg:text-[48px] xl:text-[56px] font-black text-[#1e293b] dark:text-white leading-[1.1] tracking-tighter mb-6"
        >
          Bangun Situs Web <br />
          <span className="text-[#FFB000] relative inline-block">
            Bisnis Modern
            <svg className="absolute w-full h-[10px] -bottom-1 left-0 text-[#FFB000]/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
              <path d="M2 10C50 4 150 2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
          <br />
          dengan AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-[500px] mb-8 leading-[1.5]"
        >
          Buat landing page profesional, toko online, dan konten bisnis secara instan bersama <span className="text-[#FFB000] font-bold">Uni-LandFarm</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => setView('signup')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFB000] hover:bg-[#E59E00] text-white rounded-[14px] font-black text-[15px] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(255,176,0,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(255,176,0,0.6)] hover:-translate-y-1"
          >
            Buat Situs Gratis
          </button>
          <button 
            className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[14px] font-black text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1"
          >
            Lihat Demo
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end scale-[0.9] sm:scale-95 lg:scale-90 xl:scale-95 origin-center lg:origin-right lg:-translate-x-8 xl:-translate-x-16"
        >
          <div className="absolute inset-0 bg-[#FFB000]/20 blur-[100px] -z-10 scale-125 opacity-50"></div>
          <div className="absolute inset-x-0 -bottom-10 h-24 bg-[#FFB000]/30 blur-[90px] -z-10 scale-110 opacity-50"></div>

          {/* Laptop Frame */}
          <div className="w-full h-full bg-[#0f172a] rounded-[32px] p-2.5 shadow-[0_80px_150px_-40px_rgba(0,0,0,0.9),0_0_100px_rgba(255,176,0,0.3)] border border-slate-700/50 overflow-hidden relative group">
            {/* Screen Content */}
            <div className="w-full h-full bg-white rounded-[22px] overflow-hidden flex flex-col shadow-inner">
              {/* Browser UI */}
              <div className="h-9 bg-slate-50 border-b border-slate-100 px-5 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <div className="px-4 py-0.5 bg-white border border-slate-200 rounded-md flex items-center gap-1.5">
                  <Globe className="w-2.5 h-2.5 text-brand-blue" />
                  <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest leading-none">velo-x.co.id</span>
                </div>
                <div className="w-4"></div>
              </div>
              {/* Website Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar-slim p-0">
                {/* Website Nav */}
                <div className="px-5 py-3 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-slate-950 rounded-md flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-[8px] font-black tracking-tight text-slate-950 uppercase">VELO-X</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    {['Model', 'Toko', 'Komunitas'].map(m => (
                      <span key={m} className="text-[6px] font-black text-slate-500 uppercase tracking-widest leading-none">{m}</span>
                    ))}
                    <ShoppingBag className="w-3 h-3 text-slate-400" />
                  </div>
                </div>

                {/* Hero Section */}
                <div className="px-5 pt-3 pb-4">
                  <div className="relative h-36 lg:h-44 rounded-[16px] bg-[#f8fafc] overflow-hidden group border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                      alt="Business Workspace"
                      className="absolute inset-y-0 -left-[10%] w-[120%] h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 p-4 flex flex-col justify-center bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent">
                      <span className="text-[6px] lg:text-[8px] text-[#FFB000] font-black uppercase tracking-[0.3em] mb-1 leading-none">Platform Bisnis</span>
                      <h2 className="text-[11px] lg:text-[14px] font-black text-white max-w-[130px] lg:max-w-[170px] mb-2 leading-[1.2] tracking-tighter">
                        SOLUSI DIGITAL <br /> UNTUK MASA DEPAN.
                      </h2>
                      <div className="w-16 h-5 lg:w-20 lg:h-6 bg-[#FFB000] rounded-md flex items-center justify-center shadow-lg shadow-[#FFB000]/30 border border-[#FFB000]/40 hover:bg-[#E59E00] cursor-pointer transition-colors">
                        <span className="text-[5px] lg:text-[7px] text-white font-black uppercase tracking-widest">Mulai Sekarang</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories Row */}
                <div className="px-5 pb-4">
                  <div className="flex gap-2 py-1">
                    {['Analitik', 'Pemasaran', 'Penjualan', 'Keuangan'].map((cat) => (
                      <div key={cat} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                        <span className="text-[5px] font-bold text-slate-500 uppercase tracking-tighter">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Mobile Smartphone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 30 }}
          animate={{ opacity: 1, x: 0, rotateZ: 4, y: [0, -12, 0] }}
          style={{ translateZ: 100, rotateX: 4, rotateY: 15 }}
          transition={{
            opacity: { delay: 1, duration: 0.8 },
            rotateZ: { delay: 1, duration: 1 },
            x: { delay: 1, duration: 0.8 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute right-4 lg:right-12 bottom-[-15px] z-30 w-[115px] lg:w-[145px] aspect-[9/19] shrink-0"
        >
          {/* Phone Frame */}
          <div className="w-full h-full bg-[#0f172a] rounded-[36px] p-2 shadow-[0_60px_120px_rgba(0,0,0,0.8),0_0_80px_rgba(255,176,0,0.4)] border border-slate-700/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-blue/20 blur-[50px] -z-10 pointer-events-none"></div>
            <div className="w-full h-full bg-white rounded-[30px] overflow-hidden flex flex-col">
              {/* Home Indicator Notch */}
              <div className="h-5 bg-slate-950 shrink-0 flex items-center justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full"></div>
              </div>

              {/* Mobile App View */}
              <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="px-3 py-3 border-b border-slate-50 flex items-center justify-between">
                  <Zap className="w-3.5 h-3.5 text-[#FFB000]" />
                  <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar-slim">
                  <div className="relative h-28 bg-slate-950 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 p-3 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 to-transparent">
                      <span className="text-[4px] text-[#FFB000] font-black uppercase tracking-[0.2em] mb-1 leading-none">Laporan 2024</span>
                      <h3 className="text-[10px] font-black text-white leading-tight mb-2 uppercase tracking-tighter">PANTAU <br /> METRIK <br /> BISNIS.</h3>
                      <div className="h-5 w-12 bg-[#FFB000] rounded-md flex items-center justify-center shadow-lg shadow-[#FFB000]/20">
                        <span className="text-[5px] text-white font-black uppercase tracking-widest">Lihat</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <div className="text-[6px] font-black text-slate-900 uppercase mb-1">Modul Aktif</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-16 bg-slate-50 rounded-[12px] p-1.5 flex flex-col border border-slate-100">
                          <div className="flex-1 bg-white rounded-lg border border-slate-100 overflow-hidden mb-1">
                            <img
                              src={i === 1 ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop" : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop"}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="w-full h-1 bg-slate-900 rounded-full mb-0.5"></div>
                          <div className="w-2/3 h-0.5 bg-[#FFB000] rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* iOS Home Indicator */}
                <div className="h-5 bg-slate-50 flex items-center justify-center shrink-0 border-t border-slate-100">
                  <div className="w-10 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
  </section >
);

export default Hero;
