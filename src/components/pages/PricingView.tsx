import React from 'react';
import { Sparkles, Rocket, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  setView: (v: string) => void;
}

export const PricingView = ({ setView }: PricingProps) => (
  <section className="py-32 px-6 bg-slate-50/50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ y: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-brand-blue/5 via-transparent to-indigo-500/5 blur-[120px]" 
      />
    </div>
    
    {/* Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,176,0,0.05)_0%,transparent_70%)] pointer-events-none"></div>
    <div className="absolute -top-48 right-0 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full"></div>
    <div className="absolute -bottom-48 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          PAKET TOKEN
        </motion.div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Pilih Paket Token Anda</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed transition-colors">
          Mulai dengan token gratis dan beli paket tambahan untuk fitur premium.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Paket Pemula", price: "Rp 25.000", desc: "Cocok untuk mencoba fitur dasar AI.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Akses Template Dasar", "Dukungan Komunitas"], color: "blue" },
          { title: "Paket Pertumbuhan", price: "Rp 100.000", desc: "Untuk bisnis yang aktif berkembang.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Akses Semua Template", "Dukungan Prioritas"], popular: true, color: "indigo" },
          { title: "Paket Pro", price: "Rp 350.000", desc: "Solusi skala besar untuk agensi.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Pengaturan Domain Kustom", "Agen AI Khusus"], color: "sky" }
        ].map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-premium border-2 transition-all relative overflow-hidden group ${plan.popular ? 'border-brand-blue scale-105 z-10 ring-4 ring-brand-blue/10' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-blue to-blue-600 text-white px-6 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                Paling Populer
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-colors ${plan.color === 'blue' ? 'bg-blue-50 text-blue-500' : plan.color === 'indigo' ? 'bg-indigo-50 text-indigo-500' : 'bg-sky-50 text-sky-500'}`}>
               <Rocket className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{plan.title}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className={`text-4xl font-black ${plan.popular ? 'text-brand-blue' : 'text-slate-900 dark:text-white'}`}>{plan.price}</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">{plan.desc}</p>
            <ul className="space-y-4 mb-10">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-brand-blue' : 'text-blue-500'}`} />
                  {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setView('login')}
              className={`w-full py-4 rounded-2xl font-black transition-all transform active:scale-95 ${plan.popular ? 'bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-blue hover:shadow-blue-lg hover:-translate-y-1' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
            >
              Beli Token
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const FinalCTA = ({ setView }: PricingProps) => (
  <section className="py-40 px-6 bg-slate-950 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-full h-full bg-brand-blue/5 blur-[120px]" 
      />
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,176,0,0.25)_0%,transparent_70%)]"></div>
    
    {/* Animated background blobs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 blur-[150px] -z-10 rounded-full animate-blob"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] -z-10 rounded-full animate-blob animation-delay-2000"></div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,255,255,0.05)]"
      >
        <Sparkles className="w-4 h-4 text-white animate-pulse" />
        GET STARTED
      </motion.div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight transition-colors">
        Siap Memulai Transformasi <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-blue-400">Digital Bisnis</span> Anda?
      </h2>
      <p className="text-slate-300 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed mb-10 transition-colors">
        Dapatkan akses instan ke platform Agentic AI tercanggih dan bangun masa depan bisnis Anda hari ini.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button 
          onClick={() => setView('signup')}
          className="px-12 py-6 bg-brand-blue text-white rounded-2xl font-black shadow-[0_20px_50px_-10px_rgba(255,176,0,0.4)] hover:scale-105 transition-all transform active:scale-95 text-lg"
        >
          Daftar Gratis Sekarang
        </button>
        <button 
          onClick={() => setView('features')}
          className="px-12 py-6 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 hover:border-white transition-all text-lg"
        >
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  </section>
);
