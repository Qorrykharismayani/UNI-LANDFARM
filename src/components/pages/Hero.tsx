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
      {/* Primary Electric Blue Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-brand-blue/5 dark:bg-brand-blue/25 blur-[180px] transition-colors" 
      />
      
      {/* Secondary Accent Glows */}
      <div className="absolute top-[15%] right-[0%] w-[50%] h-[50%] rounded-full bg-brand-blue/5 dark:bg-brand-blue/15 blur-[160px] transition-colors"></div>
      <div className="absolute bottom-[0%] left-[0%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/15 blur-[140px] transition-colors"></div>
      <div className="absolute top-1/2 right-[10%] w-[25%] h-[25%] rounded-full bg-brand-blue/10 dark:bg-brand-blue/25 blur-[120px] animate-pulse transition-colors"></div>
    </div>

    <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-20 lg:gap-24 items-center relative z-10 pl-2 pr-6 lg:pl-4 lg:pr-16 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-8 shadow-[0_0_25px_rgba(255,176,0,0.15)] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-[11px] font-black tracking-[0.25em] uppercase">AI-Powered Precision • Uni-LandFarm</span>
        </div>
        <h1 
          className="text-[32px] sm:text-[46px] lg:text-[56px] xl:text-[66px] font-black text-slate-900 dark:text-white leading-[1.15] mb-8 tracking-tight transition-colors"
          dangerouslySetInnerHTML={{ 
            __html: (!systemSettings?.heroTitle || systemSettings.heroTitle === 'Bangun Situs Web Bisnis Modern dengan AI') ? `Bangun Situs Web <br />
          <span class="text-brand-blue relative inline-block">
            Bisnis Modern
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-brand-blue/30" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
              <path d="M0 15C50 5 150 5 200 15" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
            </svg>
          </span> <br />
          dengan AI` : systemSettings.heroTitle
          }}
        />
        <p 
          className="text-[16px] sm:text-[19px] text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed font-medium transition-colors"
          dangerouslySetInnerHTML={{
            __html: (!systemSettings?.heroDescription || systemSettings.heroDescription === 'Buat landing page profesional, toko online, dan konten bisnis secara instan bersama Uni-LandFarm.') ? `Buat landing page profesional, toko online, dan konten bisnis secara instan bersama <span class="text-brand-blue font-bold">Uni-LandFarm</span>.` : systemSettings.heroDescription
          }}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView?.(user ? 'dashboard:buat_situs' : 'signup')}
            className="px-8 py-4 text-[15px] font-black text-white bg-brand-blue rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,176,0,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(255,176,0,0.6)] transition-all flex items-center justify-center gap-4 group"
          >
            Buat Situs Gratis
          </motion.button>
          <motion.button 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView?.('cms')}
            className="px-8 py-4 text-[15px] font-black text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-xl"
          >
            Lihat Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Illustration - Desktop & Mobile Composition */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
        className="relative perspective-2500"
      >
        <div className="w-full h-full flex items-center justify-center lg:justify-end transform-style-3d">
          
          {/* Main Desktop Mockup */}
          <motion.div 
            style={{ rotateX: 6, rotateY: -10 }}
            className="relative z-20 w-full max-w-[450px] xl:max-w-[550px] aspect-[16/13] shrink-0"
          >
            <div className="absolute inset-0 bg-brand-blue/30 blur-[100px] -z-10 scale-125 opacity-50"></div>
            <div className="absolute inset-x-0 -bottom-10 h-24 bg-brand-blue/40 blur-[90px] -z-10 scale-110 opacity-50"></div>
            
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
                        src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200" 
                        alt="Bike" 
                        className="absolute inset-y-0 -left-[10%] w-[120%] h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-center bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent">
                        <span className="text-[6px] lg:text-[8px] text-brand-blue font-black uppercase tracking-[0.3em] mb-1 leading-none">Seri Elit 2024</span>
                        <h2 className="text-[11px] lg:text-[14px] font-black text-white max-w-[130px] lg:max-w-[170px] mb-2 leading-[1.2] tracking-tighter">
                          SEPEDA MODERN <br /> MOBILITAS HARIAN.
                        </h2>
                        <div className="w-16 h-5 lg:w-20 lg:h-6 bg-brand-blue rounded-md flex items-center justify-center shadow-lg shadow-brand-blue/30 border border-brand-blue/40 hover:bg-brand-blue/90 cursor-pointer transition-colors">
                          <span className="text-[5px] lg:text-[7px] text-white font-black uppercase tracking-widest">Beli Sekarang</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categories Row */}
                  <div className="px-5 pb-4">
                    <div className="flex gap-2 py-1">
                      {['Urban', 'Road', 'Mountain', 'Electric'].map((cat) => (
                        <div key={cat} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                          <span className="text-[5px] font-bold text-slate-500 uppercase tracking-tighter">{cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shop Section */}
                  <div className="px-5 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[8px] font-black text-slate-950 uppercase tracking-tight">Koleksi Unggulan</h3>
                      <div className="w-10 h-0.5 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: "Terrain X2", price: "Rp 12.5jt", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600" },
                        { name: "Urban Glide", price: "Rp 8.7jt", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600" },
                        { name: "Road Pro", price: "Rp 15.2jt", img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600" }
                      ].map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                          <div className="aspect-square rounded-[12px] bg-slate-50 mb-1.5 overflow-hidden relative border border-slate-100">
                            <img src={item.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <h4 className="font-black text-slate-900 text-[6px] mb-0.5 uppercase tracking-tighter leading-tight">{item.name}</h4>
                          <p className="text-brand-blue text-[5px] font-bold">{item.price}</p>
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
            className="absolute -right-6 lg:-right-10 bottom-[-15px] z-30 w-[125px] lg:w-[155px] aspect-[9/19] shrink-0"
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
                    <Zap className="w-3.5 h-3.5 text-brand-blue" />
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar-slim">
                    <div className="relative h-28 bg-slate-950 shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-3 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 to-transparent">
                        <span className="text-[4px] text-brand-blue font-black uppercase tracking-[0.2em] mb-1 leading-none">Edisi 2024</span>
                        <h3 className="text-[10px] font-black text-white leading-tight mb-2 uppercase tracking-tighter">SEPEDA <br /> IMPIAN <br /> ANDA.</h3>
                        <div className="h-5 w-12 bg-brand-blue rounded-md flex items-center justify-center shadow-lg shadow-brand-blue/20">
                          <span className="text-[5px] text-white font-black uppercase tracking-widest">Beli</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                       <div className="text-[6px] font-black text-slate-900 uppercase mb-1">Populer</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-16 bg-slate-50 rounded-[12px] p-1.5 flex flex-col border border-slate-100">
                            <div className="flex-1 bg-white rounded-lg border border-slate-100 overflow-hidden mb-1">
                              <img 
                                src={i === 1 ? "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&auto=format&fit=crop" : "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=400&auto=format&fit=crop"} 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer" 
                              />
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded-full mb-0.5"></div>
                            <div className="w-2/3 h-0.5 bg-brand-blue rounded-full"></div>
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

          {/* AI Sparkle Float Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={{ 
              scale: { delay: 1.5, duration: 0.5 },
              opacity: { delay: 1.5, duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute left-[78%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-40 lg:block hidden"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-blue blur-3xl opacity-60"></div>
              <div className="relative w-14 h-14 bg-white rounded-2xl shadow-[0_20px_40px_-5px_rgba(255,176,0,0.3)] flex items-center justify-center border border-brand-blue/30 backdrop-blur-xl">
                <Sparkles className="w-7 h-7 text-brand-blue animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
