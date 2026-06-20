import React from 'react';
import { Sparkles, Rocket, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  setView: (v: string) => void;
  systemSettings?: any;
  user?: any;
}

export const PricingView = ({ setView, systemSettings, user }: PricingProps) => {
  const plans = systemSettings?.pricingJson?.length > 0 ? systemSettings.pricingJson : [
    { name: 'PAKET BASIC', price: 'Rp 75.000', description: 'Untuk kebutuhan desain dasar.', features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '500-800 token'], buttonText: 'BELI 800 TOKEN', isPopular: false, gradient: 'from-blue-500 to-cyan-400' },
    { name: 'PAKET STANDARD', price: 'Rp 250.000', description: 'Pilihan terbaik untuk hasil profesional.', features: ['3 alternatif desain', 'Prompt detail', 'Branding sesuai website', 'Struktur visual profesional', '1.000-2.500 token'], buttonText: 'BELI 2500 TOKEN', isPopular: true, gradient: 'from-amber-400 to-orange-500' },
    { name: 'PAKET PREMIUM', price: 'Rp 500.000', description: 'Solusi terlengkap untuk berbagai format visual.', features: ['Menggunakan screenshot website sebagai referensi', 'Prompt sangat detail', 'Storytelling visual', 'Layout presentasi/lomba/skripsi', '3.000-5.000 token', 'Beberapa versi (poster, banner, slide)'], buttonText: 'BELI 5000 TOKEN', isPopular: false, gradient: 'from-violet-500 to-purple-600' }
  ];

  return (
  <section className="py-32 px-6 bg-slate-50/50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300" id="pricing">
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
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md text-amber-500 text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          PAKET TOKEN
        </motion.div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Pilih Paket Token Anda</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed transition-colors">
          Mulai dengan token gratis dan beli paket tambahan untuk fitur premium.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 items-stretch mt-8">
        {plans.map((plan: any, i: number) => {
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col justify-between p-6 md:p-8 rounded-[32px] border transition-all duration-300 shadow-sm bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:scale-100 md:hover:scale-105 hover:z-10 hover:border-amber-400 dark:hover:border-amber-500/50 h-full space-y-8 cursor-pointer"
            >
              <div className="space-y-6 text-center pt-2">
                <div className={`w-16 h-16 mx-auto rounded-[20px] flex items-center justify-center text-white shadow-lg transition-all duration-300 bg-gradient-to-br ${plan.gradient || ['from-blue-500 to-cyan-400', 'from-amber-400 to-orange-500', 'from-violet-500 to-purple-600'][i % 3]}`}>
                  <Zap className="w-7 h-7" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight text-sm md:text-base group-hover:text-amber-500 transition-colors duration-300">{plan.name}</h3>
                  <div className="font-black text-slate-900 dark:text-white text-3xl md:text-4xl">{plan.price}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium px-4">{plan.description}</p>
                </div>
                
                <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors duration-300" />
                
                <ul className="space-y-4 text-left px-2">
                  {(plan.features || []).map((feat: string, j: number) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-colors duration-300 border-emerald-500 group-hover:border-amber-500">
                        <CheckCircle2 className="w-3 h-3 transition-colors duration-300 text-emerald-500 stroke-[3] group-hover:text-amber-500" />
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setView(user ? 'dashboard:tokens' : 'login');
                  }}
                  className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 border-2 bg-transparent border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:border-amber-500 group-hover:text-amber-500 hover:!bg-amber-50 dark:hover:!bg-slate-800"
                >
                  <Zap className="w-4 h-4" /> {plan.buttonText || 'BELI TOKEN SEKARANG'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export const FinalCTA = ({ setView, user }: PricingProps) => (
  <section className="py-36 px-6 bg-white dark:bg-[#020617] relative overflow-hidden transition-all duration-300">
    {/* Dot Grid Pattern overlay */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.03]" 
      style={{ 
        backgroundImage: 'radial-gradient(circle, #3a86ff 1.5px, transparent 1.5px)', 
        backgroundSize: '36px 36px' 
      }} 
    />
    
    {/* Giant mesh glows */}
    <div className="absolute -top-[30%] -left-[20%] w-[80%] aspect-square bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute -bottom-[30%] -right-[20%] w-[80%] aspect-square bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />
    
    <div className="max-w-4xl mx-auto relative z-10">
      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-slate-100 dark:bg-white/[0.07] border border-slate-200 dark:border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300 mb-8 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
          GET STARTED
        </motion.div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">
          Siap Memulai <br className="hidden sm:block" />
          <span className="text-brand-blue dark:text-amber-400">Transformasi</span> <span className="text-emerald-500 dark:text-emerald-400">Digital</span> Bisnis Anda?
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed mb-12 transition-colors">
          Dapatkan akses instan ke platform Agentic AI tercanggih dan bangun masa depan bisnis Anda hari ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <motion.button 
            onClick={() => setView(user ? 'dashboard:tokens' : 'signup')}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-brand-blue to-emerald-500 hover:brightness-110 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_15px_35px_rgba(255,176,0,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2.5 border-none"
          >
            Daftar Gratis Sekarang 
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button 
            onClick={() => setView('features')}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-5 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer border-none"
          >
            Pelajari Lebih Lanjut
          </motion.button>
        </div>
      </div>
    </div>
  </section>
);
