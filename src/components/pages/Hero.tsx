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
    {/* Main Container */}
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center justify-between relative z-10 pt-16 lg:pt-0">
      
      {/* LEFT COLUMN: Text */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 lg:pr-8 lg:pl-8 xl:pl-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50/80 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#FFB000]" />
          <span className="text-[11px] font-black tracking-[0.2em] text-[#FFB000] uppercase">AI-POWERED PRECISION • {systemSettings?.platformName ? systemSettings.platformName.toUpperCase() : 'UNI-LANDFARM'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[34px] sm:text-[40px] lg:text-[46px] xl:text-[54px] font-black text-[#1e293b] dark:text-white leading-[1.1] tracking-tighter mb-6"
        >
          {(() => {
            const title = systemSettings?.heroTitle;
            const defaultMarkup = (
              <>
                Bangun Situs Web <br />
                <span className="text-[#FFB000] relative inline-block">
                  Bisnis Modern
                  <svg className="absolute w-full h-[10px] -bottom-1 left-0 text-[#FFB000]/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 10C50 4 150 2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                dengan AI
              </>
            );

            if (!title || title === 'Bangun Situs Web Bisnis Modern dengan AI') {
              return defaultMarkup;
            }

            const parts = title.split('*');
            if (parts.length >= 3) {
              return (
                <>
                  {parts[0].trim()} {parts[0].trim() && <br />}
                  <span className="text-[#FFB000] relative inline-block">
                    {parts[1].trim()}
                    <svg className="absolute w-full h-[10px] -bottom-1 left-0 text-[#FFB000]/40" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 10C50 4 150 2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                  {parts[2].trim() && <br />}
                  {parts[2].trim()}
                </>
              );
            }

            return <>{title}</>;
          })()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-[500px] mb-8 leading-[1.5]"
        >
          {systemSettings?.heroDescription ? (
            <>{systemSettings.heroDescription}</>
          ) : (
            <>
              Buat landing page profesional, toko online, dan konten bisnis secara instan bersama <span className="text-[#FFB000] font-bold">{systemSettings?.platformName || 'Uni-LandFarm'}</span>.
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center lg:justify-start gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => setView('signup')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFB000] hover:bg-[#E59E00] text-white rounded-[14px] font-black text-[15px] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(255,176,0,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(255,176,0,0.6)] hover:-translate-y-1"
          >
            Buat Situs Gratis
          </button>
          <button 
            onClick={() => setView('templates')}
            className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[14px] font-black text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1"
          >
            Lihat Demo
          </button>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Images */}
      <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end mt-12 lg:mt-0 lg:-translate-x-16 xl:-translate-x-28">
        <div className="relative w-full max-w-[320px] lg:max-w-[390px] xl:max-w-[450px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[5/4]"
          >
          <div className="absolute inset-0 bg-[#FFB000]/20 blur-[100px] -z-10 scale-125 opacity-50"></div>
          <div className="absolute inset-x-0 -bottom-10 h-24 bg-[#FFB000]/30 blur-[90px] -z-10 scale-110 opacity-50"></div>

          {/* Laptop Frame */}
          <div className="w-full h-full bg-[#0f172a] rounded-[32px] p-2.5 shadow-[0_80px_150px_-40px_rgba(0,0,0,0.9),0_0_100px_rgba(255,176,0,0.3)] border border-slate-700/50 overflow-hidden relative group">
            {/* Screen Content */}
            <div 
              className="w-full h-full bg-white rounded-[22px] overflow-hidden relative shadow-inner"
              style={{ containerType: 'size' }}
            >
              {/* Scaled Website Content Wrapper */}
              <div 
                className="absolute top-0 left-0 origin-top-left flex flex-col bg-white"
                style={{
                  width: '635px',
                  height: 'calc(635px * 100cqh / 100cqw)',
                  transform: 'scale(calc(100cqw / 635px))',
                }}
              >
                {/* Browser UI */}
                <div className="h-12 bg-slate-50 border-b border-slate-100 px-6 flex items-center justify-between shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="px-5 py-1.5 bg-white border border-slate-200 rounded-md flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-brand-blue" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">velo-x.co.id</span>
                  </div>
                  <div className="w-6"></div>
                </div>

                {/* Website Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar-slim p-0">
                  {/* Website Nav */}
                  <div className="px-12 py-5 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-950 rounded-md flex items-center justify-center">
                        <Zap className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-tight text-slate-950 uppercase">VELO-X</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      {['Model', 'Toko', 'Komunitas'].map(m => (
                        <span key={m} className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none">{m}</span>
                      ))}
                      <ShoppingBag className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="px-12 pt-6 pb-6">
                    <div className="relative h-[280px] rounded-[24px] bg-[#f8fafc] overflow-hidden group border border-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200"
                        alt="Bike"
                        className="absolute inset-y-0 -left-[10%] w-[120%] h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-10 flex flex-col justify-center bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent">
                        <span className="text-[10px] text-[#FFB000] font-black uppercase tracking-[0.3em] mb-1.5 leading-none">Seri Elit 2024</span>
                        <h2 className="text-3xl font-black text-white max-w-[380px] mb-4 leading-[1.2] tracking-tighter">
                          SEPEDA MODERN <br /> MOBILITAS HARIAN.
                        </h2>
                        <div className="w-36 h-10 bg-[#FFB000] rounded-md flex items-center justify-center shadow-lg shadow-[#FFB000]/30 border border-[#FFB000]/40 hover:bg-[#E59E00] cursor-pointer transition-colors">
                          <span className="text-xs text-white font-black uppercase tracking-widest">Beli Sekarang</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categories Row */}
                  <div className="px-12 pb-5">
                    <div className="flex gap-3 py-1">
                      {['Urban', 'Road', 'Mountain', 'Electric'].map((cat) => (
                        <div key={cat} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shop Section */}
                  <div className="px-12 pb-10">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-sm font-black text-slate-950 uppercase tracking-tight">Koleksi Unggulan</h3>
                      <div className="w-24 h-0.5 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { name: "Terrain X2", price: "Rp 12.5jt", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600" },
                        { name: "Urban Glide", price: "Rp 8.7jt", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600" },
                        { name: "Road Pro", price: "Rp 15.2jt", img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600" }
                      ].map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                          <div className="aspect-square rounded-[16px] bg-slate-50 mb-3 overflow-hidden relative border border-slate-100">
                            <img src={item.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <h4 className="font-black text-slate-900 text-xs mb-1 uppercase tracking-tighter leading-tight">{item.name}</h4>
                          <p className="text-[#FFB000] text-[11px] font-bold">{item.price}</p>
                        </div>
                      ))}
                    </div>
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
          className="absolute -right-[8%] -bottom-[8%] z-30 w-[32%] aspect-[9/19] shrink-0"
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
              <div 
                className="flex-1 flex flex-col bg-white overflow-hidden relative"
                style={{ containerType: 'size' }}
              >
                <div 
                  className="absolute top-0 left-0 origin-top-left flex flex-col bg-white"
                  style={{
                    width: '340px',
                    height: 'calc(340px * 100cqh / 100cqw)',
                    transform: 'scale(calc(100cqw / 340px))',
                  }}
                >
                  <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between shrink-0">
                    <Zap className="w-6 h-6 text-[#FFB000]" />
                    <ShoppingBag className="w-6 h-6 text-slate-400" />
                  </div>

                  <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar-slim">
                    <div className="relative h-56 bg-slate-950 shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 to-transparent">
                        <span className="text-[11px] text-[#FFB000] font-black uppercase tracking-[0.2em] mb-1.5 leading-none">Edisi 2024</span>
                        <h3 className="text-lg font-black text-white leading-tight mb-3 uppercase tracking-tighter">SEPEDA <br /> IMPIAN <br /> ANDA.</h3>
                        <div className="h-9 w-24 bg-[#FFB000] rounded-md flex items-center justify-center shadow-lg shadow-[#FFB000]/20">
                          <span className="text-xs text-white font-black uppercase tracking-widest">Beli</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="text-xs font-black text-slate-900 uppercase mb-1">Populer</div>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-36 bg-slate-50 rounded-[12px] p-2 flex flex-col border border-slate-100">
                            <div className="flex-1 bg-white rounded-lg border border-slate-100 overflow-hidden mb-2">
                              <img
                                src={i === 1 ? "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&auto=format&fit=crop" : "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=400&auto=format&fit=crop"}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full mb-1"></div>
                            <div className="w-2/3 h-1 bg-[#FFB000] rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured Collection for Mobile */}
                    <div className="px-6 pb-6 space-y-4">
                      <div className="text-sm font-black text-slate-900 uppercase mb-1">Koleksi Unggulan</div>
                      <div className="space-y-3.5">
                        {[
                          { name: "Terrain X2", price: "Rp 12.5jt", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=400" },
                          { name: "Urban Glide", price: "Rp 8.7jt", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-5 bg-slate-50 border border-slate-100 rounded-[20px] p-4">
                            <div className="w-18 h-18 rounded-[14px] bg-white overflow-hidden border border-slate-100 shrink-0">
                              <img src={item.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-black text-slate-900 text-[13px] uppercase tracking-tight leading-tight">{item.name}</h4>
                              <p className="text-[#FFB000] text-xs font-black mt-1.5">{item.price}</p>
                            </div>
                            <div className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors shrink-0">
                              Beli
                            </div>
                          </div>
                        ))}
                      </div>
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
      </div>
    </div>
  </section>
);

export default Hero;
