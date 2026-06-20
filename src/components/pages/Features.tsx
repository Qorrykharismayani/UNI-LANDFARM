import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart as LucideBarChart, 
  Zap, 
  Folder, 
  Smartphone, 
  Wallet, 
  Cpu, 
  Globe, 
  Database, 
  Shield, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';

interface FeaturesProps {
  setView?: (v: string) => void;
  systemSettings?: any;
}

const Features = ({ setView, systemSettings }: FeaturesProps) => {

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-10 h-10 text-brand-blue" />;
      case 'Folder': return <Folder className="w-10 h-10 text-brand-blue" />;
      case 'Smartphone': return <Smartphone className="w-10 h-10 text-brand-blue" />;
      case 'Wallet': return <Wallet className="w-10 h-10 text-brand-blue" />;
      case 'BarChart3':
      case 'BarChart': return <LucideBarChart className="w-10 h-10 text-brand-blue" />;
      case 'Cpu': return <Cpu className="w-10 h-10 text-brand-blue" />;
      case 'Globe': return <Globe className="w-10 h-10 text-brand-blue" />;
      case 'Database': return <Database className="w-10 h-10 text-brand-blue" />;
      case 'Shield': return <Shield className="w-10 h-10 text-brand-blue" />;
      default: return <Zap className="w-10 h-10 text-brand-blue" />;
    }
  };

  const features = (systemSettings?.featuresJson && systemSettings.featuresJson.length > 0)
    ? systemSettings.featuresJson.map((f: any) => ({
        title: f.title,
        desc: f.desc,
        icon: getIcon(f.icon),
        num: f.num
      }))
    : [
        { 
          title: "Pembuatan Instan", 
          desc: "Buat landing page profesional hanya dalam hitungan menit dengan sistem otomatis berbasis AI.", 
          icon: <Zap className="w-10 h-10 text-brand-blue" />,
          num: "01"
        },
        { 
          title: "Pustaka Template", 
          desc: "Tersedia berbagai template modern dan premium yang siap digunakan untuk semua kebutuhan bisnis.", 
          icon: <Folder className="w-10 h-10 text-brand-blue" />,
          num: "02"
        },
        { 
          title: "Responsif Seluler", 
          desc: "Tampilan website otomatis menyesuaikan semua perangkat mulai dari mobile hingga desktop.", 
          icon: <Smartphone className="w-10 h-10 text-brand-blue" />,
          num: "03"
        },
        { 
          title: "Pembayaran Mudah", 
          desc: "Sistem pembayaran digital yang praktis, cepat, dan aman untuk berbagai kebutuhan transaksi online.", 
          icon: <Wallet className="w-10 h-10 text-brand-blue" />,
          num: "04"
        },
        { 
          title: "Analitik", 
          desc: "Pantau performa website dan aktivitas pengunjung melalui dashboard analitik real-time.", 
          icon: <LucideBarChart className="w-10 h-10 text-brand-blue" />,
          num: "05"
        },
      ];

  return (
    <section className="py-32 lg:py-40 px-6 bg-slate-50 dark:bg-[#0b1121] relative overflow-hidden transition-colors duration-300">
      {/* Premium Background Decoration (Circuit Pattern) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-full bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-full bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-20 rotate-180"></div>
      </div>
      
      {/* Ambient Neon Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-brand-blue/10 blur-[150px] rounded-[100%] opacity-50"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand-blue/5 blur-[120px] rounded-[100%]"></div>

      {/* Decorative Technology Background Icons - Floating on edges */}
      <div className="absolute top-40 -left-16 opacity-5 pointer-events-none rotate-12">
        <Cpu className="w-64 h-64 text-brand-blue" />
      </div>
      <div className="absolute top-1/4 -right-16 opacity-5 pointer-events-none -rotate-12">
        <Globe className="w-64 h-64 text-brand-blue" />
      </div>
      <div className="absolute bottom-40 -left-20 opacity-5 pointer-events-none -rotate-45">
        <Database className="w-72 h-72 text-brand-blue" />
      </div>
      <div className="absolute bottom-20 -right-20 opacity-5 pointer-events-none rotate-45">
        <Shield className="w-72 h-72 text-brand-blue" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            CAPABILITIES
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto transition-colors">
            Fitur <span className="text-brand-blue drop-shadow-[0_0_20px_rgba(255,176,0,0.4)]">Unggulan</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed transition-colors">
            Nikmati berbagai teknologi modern untuk membantu pembuatan landing page lebih cepat, mudah, dan profesional.
          </p>
        </div>

        {/* Flex Layout Responsif dengan Perataan Tengah untuk Baris Terbawah */}
        <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-6 relative z-20 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col pt-4 group shrink-0"
            >
              {/* Premium Card */}
              <div className="relative flex-1 bg-white/60 dark:bg-[#0b1226]/50 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/60 rounded-[24px] p-6 lg:p-8 transition-all duration-500 hover:border-brand-blue/50 group/card hover:bg-white dark:hover:bg-[#0b1226] shadow-[0_15px_35px_rgba(0,0,0,0.05),0_0_30px_rgba(58,134,255,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_40px_rgba(58,134,255,0.03)] hover:shadow-[0_25px_50px_-10px_rgba(58,134,255,0.18)] hover:-translate-y-1.5 flex flex-col items-start overflow-hidden min-h-[250px]">
                
                {/* Top Glowing Edge Accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl rounded-full pointer-events-none group-hover/card:bg-brand-blue/15 transition-all duration-700"></div>
                
                {/* Modern Backlit Number */}
                <div className="absolute top-8 right-8 select-none">
                   <span className="text-slate-400 dark:text-slate-800 italic font-black text-5xl tabular-nums opacity-25 group-hover/card:opacity-40 group-hover/card:scale-105 group-hover/card:text-brand-blue/60 transition-all duration-500 block">
                     {f.num}
                   </span>
                </div>

                {/* Cyber Icon Box */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-brand-blue/10 blur-xl rounded-full scale-125 group-hover/card:bg-brand-blue/30 transition-all duration-700"></div>
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center relative z-10 transition-all duration-500 group-hover/card:scale-110 group-hover/card:border-brand-blue/50 group-hover/card:shadow-[0_0_20px_rgba(58,134,255,0.25)] shadow-md">
                    {React.cloneElement(f.icon as React.ReactElement<any>, { className: "w-6 h-6 text-brand-blue" })}
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="text-lg font-black text-slate-900 dark:text-white/90 mb-3 tracking-tight leading-tight group-hover/card:text-brand-blue transition-colors duration-500">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed group-hover/card:text-slate-800 dark:group-hover/card:text-slate-200 transition-colors duration-500">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
