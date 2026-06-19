import React, { useState } from 'react';
import { Sparkles, Target, Rocket, CheckCircle2, Bot, Zap, ChevronDown, Wand2, Edit3, BrainCircuit, CalendarClock, Send, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials = ({ systemSettings }: { systemSettings?: any }) => {
  const testimonials = (systemSettings?.testimonialsJson && systemSettings.testimonialsJson.length > 0)
    ? systemSettings.testimonialsJson
    : [
        {
          name: "Budi Santoso",
          role: "CEO of TechFlow",
          content: "Uni-LandFarm benar-benar mengubah cara kami mengelola kehadiran digital. AI-nya sangat intuitif dan membantu kami menghemat waktu hingga 70%.",
          avatar: "https://picsum.photos/seed/budi/100/100"
        },
        {
          name: "Sari Wijaya",
          role: "Founder of CreativeHub",
          content: "Landing page yang dihasilkan AI sangat profesional. Saya tidak menyangka bisa membangun situs sekelas agensi dalam hitungan menit.",
          avatar: "https://picsum.photos/seed/sari/100/100"
        },
        {
          name: "Andi Pratama",
          role: "Marketing Director",
          content: "Fitur Agentic AI CMS adalah game changer. Konten kami sekarang teroptimasi secara otomatis untuk SEO dan audiens kami.",
          avatar: "https://picsum.photos/seed/andi/100/100"
        }
      ];

  return (
    <section className="py-32 px-6 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-brand-blue/5 blur-[120px]" 
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            Testimonials
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Apa Kata Mereka?</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors">Bergabunglah dengan ribuan pebisnis yang telah beralih ke masa depan digital.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-premium border border-slate-100 dark:border-slate-700 hover:shadow-premium-hover transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue/20" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{t.name}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = ({ systemSettings }: { systemSettings?: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = (systemSettings?.faqsJson && systemSettings.faqsJson.length > 0) ? systemSettings.faqsJson : [
    { 
      q: "Apakah saya dapat membuat landing page tanpa kemampuan teknis?", 
      a: "Ya. UNI-LandFarm menggunakan konsep low-code/no-code sehingga pengguna dapat membuat dan mengelola landing page tanpa perlu menulis kode program.", 
      icon: Wand2,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    { 
      q: "Bagaimana cara mengubah konten landing page?", 
      a: "Konten dapat diubah langsung melalui CMS Editor. Pengguna dapat mengelola teks, gambar, tombol, informasi kontak, dan berbagai komponen lainnya secara mudah.", 
      icon: Edit3,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-500/10"
    },
    { 
      q: "Apa fungsi AI Content Assistant?", 
      a: "AI Content Assistant membantu memberikan rekomendasi headline, deskripsi, CTA, dan ide promosi yang sesuai dengan kebutuhan bisnis Anda.", 
      icon: BrainCircuit,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    { 
      q: "Apakah perubahan konten dapat dijadwalkan otomatis?", 
      a: "Ya. Pengguna dapat menjadwalkan perubahan konten pada tanggal dan waktu tertentu. Sistem akan memperbarui landing page secara otomatis tanpa perlu menjalankan proses secara manual.", 
      icon: CalendarClock,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-500/10"
    },
    { 
      q: "Bagaimana cara mempublikasikan landing page?", 
      a: "Setelah landing page selesai dibuat, pengguna cukup menekan tombol Publish dan sistem akan langsung menghasilkan URL yang dapat dibagikan.", 
      icon: Send,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    { 
      q: "Apakah landing page dapat diakses melalui perangkat mobile?", 
      a: "Ya. Landing page yang dibuat menggunakan desain responsif sehingga dapat diakses dengan baik melalui desktop, tablet, maupun smartphone.", 
      icon: Smartphone,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-500/10"
    }
  ];

  return (
    <section className="py-32 px-6 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-emerald-500/5 to-transparent blur-[80px]" 
        />
      </div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Bantuan
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors mb-6">
            Pertanyaan yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-yellow-500">Sering Diajukan</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors">
            Temukan jawaban mengenai pengelolaan landing page, CMS, Agentic AI, dan penjadwalan konten pada UNI-LandFarm.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, i: number) => {
            const isOpen = openIndex === i;
            const Icon = faq.icon || Sparkles;
            return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white dark:bg-slate-900 border-emerald-500/30 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)]' : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className={`font-black text-sm sm:text-base tracking-tight transition-colors ${isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
                    {faq.q}
                  </h4>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-emerald-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/20 group-hover:text-emerald-500'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 pl-[72px]">
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

export const AboutUsView = () => (
  <section className="py-32 px-6 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
    {/* —— Background Mesh Glows —— */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-blue/8 dark:bg-brand-blue/12 rounded-full blur-[140px]" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/6 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[5%] left-[30%] w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/8 rounded-full blur-[100px]" />
    </div>

    {/* —— Dot Grid Pattern —— */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
      style={{
        backgroundImage: 'radial-gradient(circle, #3a86ff 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />

    <div className="max-w-6xl mx-auto relative z-10">

      {/* —— Section Header —— */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/25 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_30px_rgba(255,176,0,0.18)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          TENTANG KAMI
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-tight"
        >
          <span className="text-slate-900 dark:text-white">Mengenal </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-indigo-500 to-blue-400">
            Uni-LandFarm
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed"
        >
          Kami hadir untuk merevolusi cara bisnis membangun dan mengelola kehadiran digital mereka melalui kekuatan Agentic AI.
        </motion.p>
      </div>

      {/* —— Visi & Misi Cards —— */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">

        {/* Visi Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,176,0,0.13)] dark:hover:shadow-[0_20px_60px_rgba(255,176,0,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden"
        >
          {/* Card glow accent */}
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-[32px] bg-gradient-to-r from-brand-blue via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center gap-5 mb-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-brand-blue/20 blur-[14px] group-hover:blur-[20px] group-hover:bg-brand-blue/30 transition-all duration-500" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-brand-blue to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(255,176,0,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Target className="w-7 h-7" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] mb-0.5">Vision</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Visi Kami</h3>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-justify text-sm flex-1">
            Menjadi platform terdepan yang mendemokratisasi teknologi web dan AI, memungkinkan setiap bisnis, dari UMKM hingga perusahaan besar, untuk memiliki kehadiran digital yang cerdas, otomatis, dan berdampak tinggi tanpa hambatan teknis.
          </p>
        </motion.div>

        {/* Misi Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,176,0,0.13)] dark:hover:shadow-[0_20px_60px_rgba(255,176,0,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-[32px] bg-gradient-to-r from-brand-blue via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center gap-5 mb-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-brand-blue/20 blur-[14px] group-hover:blur-[20px] group-hover:bg-brand-blue/30 transition-all duration-500" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-brand-blue to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(255,176,0,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Rocket className="w-7 h-7" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] mb-0.5">Mission</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Misi Kami</h3>
            </div>
          </div>

          <ul className="space-y-3.5 flex-1">
            {[
              'Menyediakan alat pembuatan web instan yang didukung AI.',
              'Mengotomatiskan pengelolaan konten melalui Agentic CMS.',
              'Memastikan keamanan, kecepatan, dan skalabilitas untuk setiap pengguna.',
            ].map((item, idx) => (
              <li
                key={idx}
                className="group/item flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-transparent hover:border-brand-blue/20 hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10 hover:translate-x-1.5 transition-all duration-300 cursor-default"
              >
                <div className="w-6 h-6 rounded-full bg-brand-blue/15 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-brand-blue/25 transition-colors duration-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                </div>
                <span className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* —— Teknologi Inti – Cyber Panel —— */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative bg-slate-950 border border-slate-800 rounded-[40px] p-12 lg:p-16 overflow-hidden text-white shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-blue/15 rounded-full blur-[130px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/12 rounded-full blur-[110px] -ml-32 -mb-32 pointer-events-none" />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #3a86ff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top border glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent" />

        <div className="relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-widest mb-5 shadow-[0_0_20px_rgba(255,176,0,0.15)]">
              <Zap className="w-3 h-3" />
              Core Technology
            </div>
            <h3 className="text-2xl lg:text-4xl font-black tracking-tight mb-4">Teknologi Inti Kami</h3>
            <p className="text-slate-400 max-w-xl mx-auto text-sm lg:text-base">
              Inovasi yang menggerakkan Uni-LandFarm ke masa depan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* AI Generator Agentic Card */}
            <div className="group relative bg-white/[0.04] border border-white/[0.07] hover:border-brand-blue/40 hover:bg-white/[0.07] rounded-[24px] p-8 transition-all duration-400 hover:shadow-[0_0_40px_rgba(255,176,0,0.12)]">
              <div className="absolute top-0 left-0 w-full h-px rounded-t-[24px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-brand-blue/30 blur-[12px] group-hover:blur-[18px] group-hover:bg-brand-blue/40 transition-all duration-500" />
                  <div className="relative w-14 h-14 bg-gradient-to-br from-brand-blue/30 to-indigo-600/30 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                    <Bot className="w-7 h-7 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-brand-blue/70 uppercase tracking-[0.2em] mb-0.5">AI Powered</p>
                  <h4 className="text-lg font-black tracking-tight">AI Generator Agentic</h4>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm text-justify">
                Sistem AI Generator kami tidak hanya menyimpan data, tetapi bertindak sebagai asisten cerdas. AI Generator Agentic dapat memahami konteks bisnis Anda, menyarankan pembaruan konten, mengoptimalkan SEO secara otomatis, dan bahkan merespons interaksi pengguna secara real-time berdasarkan basis pengetahuan yang Anda berikan.
              </p>
            </div>

            {/* Generator Web Instan Card */}
            <div className="group relative bg-white/[0.04] border border-white/[0.07] hover:border-brand-blue/40 hover:bg-white/[0.07] rounded-[24px] p-8 transition-all duration-400 hover:shadow-[0_0_40px_rgba(255,176,0,0.12)]">
              <div className="absolute top-0 left-0 w-full h-px rounded-t-[24px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-brand-blue/30 blur-[12px] group-hover:blur-[18px] group-hover:bg-brand-blue/40 transition-all duration-500" />
                  <div className="relative w-14 h-14 bg-gradient-to-br from-brand-blue/30 to-indigo-600/30 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                    <Zap className="w-7 h-7 text-brand-blue" />
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-brand-blue/70 uppercase tracking-[0.2em] mb-0.5">Instant Build</p>
                  <h4 className="text-lg font-black tracking-tight">Generator Web Instan</h4>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm text-justify">
                Teknologi generator kami mengubah deskripsi singkat tentang bisnis Anda menjadi situs web fungsional yang indah dalam hitungan detik. Menggunakan model AI generatif canggih, sistem kami memilih tata letak yang optimal, menulis salinan yang menarik, dan menerapkan skema warna yang sesuai dengan identitas merek Anda secara otomatis.
              </p>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  </section>
);
