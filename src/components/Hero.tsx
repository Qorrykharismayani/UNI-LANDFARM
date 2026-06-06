import React, { useState } from 'react';
import { Cpu, ChevronDown, Zap, Bot, Database, Moon, Sun, ArrowRight, Monitor, Smartphone, BarChart3, LineChart, Layout, CreditCard, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Hero = ({ setView }: { setView: (v: string) => void }) => (
  <section className="pt-20 pb-16 px-6 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-green-50/30 to-white dark:from-stone-800 dark:via-stone-800/90 dark:to-stone-900 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary border border-brand-primary/10 mb-6 shadow-soft">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">✨ AGENTIC AI V2.0 TELAH HADIR</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-stone-900 dark:text-white leading-[1.1] mb-6 tracking-tighter">
          Bangun Situs Web <br />
          <span className="text-brand-primary relative">
            Bisnis Modern
          </span>
          <br />
          & Kelola dengan AI.
        </h1>
        <p className="text-lg text-stone-500 dark:text-stone-400 mb-8 max-w-xl leading-relaxed font-medium">
          Dari pembuatan instan hingga otomatisasi konten cerdas semuanya dalam satu platform UNI-LandFarm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setView('signup')}
            className="px-8 py-4 text-base font-black text-white bg-brand-primary rounded-xl shadow-primary-lg hover:shadow-[0_20px_60px_rgba(0,98,255,0.4)] transition-all transform hover:-transtone-y-1 flex items-center justify-center gap-3 group active:scale-95"
          >
            Buat Situs Sekarang
            <ArrowRight className="w-5 h-5 group-hover:transtone-x-1.5 transition-transform" />
          </button>
          <button 
            onClick={() => setView('cms')}
            className="px-8 py-4 text-base font-black text-stone-600 dark:text-stone-300 bg-white dark:bg-stone-800 border-2 border-stone-100 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 hover:border-stone-200 dark:hover:border-stone-600 transition-all flex items-center justify-center gap-3 shadow-soft"
          >
            Lihat Demo
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 0.9 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative origin-center"
      >
        {/* Device Showcase Container */}
        <div className="relative z-20 scale-90">
          {/* Laptop Mockup */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative transform -rotate-1"
          >
            <div className="bg-stone-900 rounded-[32px] p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-stone-800">
              <div className="bg-white rounded-[24px] overflow-hidden aspect-[16/10] relative">
                <img 
                  src="https://images.unsplash.com/photo-1586771107584-568728d11c75?auto=format&fit=crop&w=1200&h=800" 
                  alt="Modern Business Template" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Internal UI Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="glass-card p-3 rounded-xl border-white/20">
                    <p className="text-[8px] font-black text-brand-primary uppercase tracking-widest mb-0.5">Pratinjau Langsung</p>
                    <p className="text-[10px] font-bold text-stone-900">Suite Bisnis Modern v2</p>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Monitor className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Smartphone className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tablet Mockup */}
          <motion.div 
            initial={{ x: 50, y: 30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-2 -right-2 w-1/2 z-30 transform rotate-3"
          >
            <div className="bg-stone-900 rounded-[32px] p-2 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] border border-stone-800">
              <div className="bg-white rounded-[24px] overflow-hidden aspect-[3/4] p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-brand-primary rounded-lg flex items-center justify-center">
                      <Cpu className="w-3 h-3 text-white" />
                    </div>
                    <div className="h-3 w-16 bg-stone-100 rounded-full"></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-stone-200"></div>
                    <div className="w-2 h-2 rounded-full bg-stone-200"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-24 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-xl border border-brand-primary/10 flex flex-col items-center justify-center gap-2">
                    <div className="relative">
                      <BarChart3 className="w-8 h-8 text-brand-primary/30" />
                    </div>
                    <p className="text-[8px] font-black text-brand-primary uppercase tracking-widest">Analitik Real-time</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-12 bg-stone-50 rounded-xl border border-stone-100"></div>
                    <div className="h-12 bg-stone-50 rounded-xl border border-stone-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating UI Elements - Scaled down and repositioned */}
        <motion.div 
          animate={{ y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-4 left-4 z-40 glass-card p-3 rounded-xl flex items-center gap-3 border-white/60 shadow-xl scale-90"
        >
          <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
            <Database className="text-brand-primary w-5 h-5 relative z-10" />
          </div>
          <div>
            <p className="text-[9px] font-black text-stone-900 uppercase tracking-widest mb-0.5">Sinkronisasi Data</p>
            <p className="text-[8px] font-bold text-brand-primary">98% Selesai</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0], rotate: [0.5, -0.5, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute top-1/2 right-4 z-40 glass-card p-3 rounded-xl flex flex-col gap-2 border-white/60 shadow-xl min-w-[140px] scale-90"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-green/10 rounded-md flex items-center justify-center">
                <LineChart className="text-brand-green w-3 h-3" />
              </div>
              <p className="text-[9px] font-black text-stone-900 uppercase tracking-widest">Pendapatan</p>
            </div>
            <span className="text-[8px] font-black text-brand-green">+24%</span>
          </div>
        </motion.div>

        {/* AI Agent Tag - Adjusted position to be more inside */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute top-1/4 left-1/2 -transtone-x-1/2 z-50 bg-white/95 backdrop-blur-xl px-3 py-2 rounded-lg border border-brand-green/20 shadow-xl flex items-center gap-2 scale-90"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-brand-green" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-brand-green rounded-full border-2 border-white"></div>
          </div>
          <span className="text-[9px] font-black text-stone-900 tracking-tight">Agen AI Aktif</span>
        </motion.div>

        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 -transtone-x-1/2 -transtone-y-1/2 w-[100%] h-[100%] bg-brand-primary/5 blur-[120px] -z-20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 transtone-x-1/2 transtone-y-1/2 w-[80%] h-[80%] bg-brand-green/5 blur-[120px] -z-20 rounded-full"></div>
      </motion.div>
    </div>
  </section>
);


