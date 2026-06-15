import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface FeaturesProps {
  setView?: (v: string) => void;
}

const Features = ({ setView }: FeaturesProps) => {
  const swiperPrevRef = useRef<HTMLButtonElement>(null);
  const swiperNextRef = useRef<HTMLButtonElement>(null);

  const features = [
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

        {/* Swiper Slider Wrapper with Navigation Buttons */}
        <div className="relative group px-12 lg:px-16">
          {/* Custom Navigation Arrows */}
          <button 
            ref={swiperPrevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-brand-blue hover:border-brand-blue hover:shadow-[0_0_20px_rgba(255,176,0,0.4)] transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button 
            ref={swiperNextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-brand-blue hover:border-brand-blue hover:shadow-[0_0_20px_rgba(255,176,0,0.4)] transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shadow-xl"
          >
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              el: '.custom-pagination-dots',
            }}
            navigation={{
              prevEl: swiperPrevRef.current,
              nextEl: swiperNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = swiperPrevRef.current;
                swiper.params.navigation.nextEl = swiperNextRef.current;
              }
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="features-swiper !overflow-visible pb-20"
          >
            {features.map((f, i) => (
              <SwiperSlide key={i} className="h-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative h-full flex flex-col pt-4"
                >
                  {/* Glassmorphism Card with Blue Gradient Default State */}
                  <div className="relative flex-1 bg-gradient-to-br from-brand-blue/10 to-slate-200/50 dark:to-[#111827]/40 backdrop-blur-3xl border border-slate-200 dark:border-brand-blue/20 rounded-[32px] p-8 lg:p-10 transition-all duration-700 hover:border-brand-blue/50 group/card hover:bg-white dark:hover:bg-[#111827]/80 shadow-premium dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] hover:shadow-premium-hover dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col items-start overflow-hidden min-h-[320px]">
                    
                    {/* Interior Glow Effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl rounded-full pointer-events-none group-hover/card:bg-brand-blue/15 transition-colors duration-700"></div>
                    
                    {/* Number - Bottom Right */}
                    <div className="absolute top-8 right-8">
                       <span className="text-slate-400 dark:text-white italic font-black text-xl tabular-nums opacity-40 group-hover/card:opacity-100 transition-all duration-500">
                         {f.num}
                       </span>
                    </div>

                    {/* Icon Section */}
                    <div className="mb-10 relative">
                      <div className="absolute inset-0 bg-brand-blue/10 blur-xl rounded-full scale-125 group-hover/card:bg-brand-blue/30 transition-all duration-700"></div>
                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 flex items-center justify-center relative z-10 transition-all duration-500 group-hover/card:scale-110 group-hover/card:border-brand-blue/50 shadow-lg">
                        {/* Adjust icon size to match HowItWorks (w-6 h-6) */}
                        {React.cloneElement(f.icon as React.ReactElement, { className: "w-6 h-6 text-brand-blue" })}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-black text-slate-900 dark:text-white/90 mb-4 tracking-tight leading-tight group-hover/card:text-brand-blue transition-colors duration-500">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed group-hover/card:text-slate-800 dark:group-hover/card:text-slate-200 transition-colors duration-500">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Glowing Pagination Dots */}
        <div className="flex justify-center items-center gap-4 custom-pagination-dots mt-12 mb-8 relative z-20">
          {/* Swiper will inject bullets here */}
        </div>
      </div>

      <style>{`
        .custom-pagination-dots .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: transparent;
          border: 2px solid rgba(58, 134, 255, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 50%;
          margin: 0 8px !important;
        }
        .custom-pagination-dots .swiper-pagination-bullet-active {
          background: #3a86ff;
          border-color: #3a86ff;
          box-shadow: 0 0 20px rgba(58, 134, 255, 0.8), 0 0 40px rgba(58, 134, 255, 0.4);
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Features;
