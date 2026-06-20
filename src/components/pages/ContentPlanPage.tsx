import React from 'react';
import { Zap, Database, Layout, Rocket, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface ContentPlanPageProps {
  guideSearchQuery: string;
  systemSettings?: any;
}

const ContentPlanPage = ({ guideSearchQuery, systemSettings }: ContentPlanPageProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-white" />;
      case 'Database': return <Database className="w-5 h-5 text-white" />;
      case 'Layout': return <Layout className="w-5 h-5 text-white" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-white" />;
      default: return <BookOpen className="w-5 h-5 text-white" />;
    }
  };

  const rawGuides = systemSettings?.userPageJson?.guides || [];

  const guidesData = rawGuides.length > 0
    ? rawGuides.map((g: any) => ({
        title: g.title,
        desc: g.desc,
        time: g.time,
        icon: getIcon(g.icon),
        gradient: g.bg || "from-blue-500 to-indigo-600",
        steps: g.steps || []
      }))
    : [
        {
          title: "Panduan Memulai Uni-LandFarm",
          desc: "Pelajari langkah awal membuat landing page menggunakan template yang tersedia secara instan dan efisien.",
          time: "3 Menit",
          icon: <Zap className="w-5 h-5 text-white" />,
          gradient: "from-blue-500 to-cyan-400",
          steps: [
            "Pilih template landing page",
            "Isi data usaha",
            "Simpan landing page sebagai draft"
          ]
        },
        {
          title: "Panduan Pengelolaan CMS",
          desc: "Kelola konten landing page seperti teks, gambar, kontak, tautan, dan informasi promosi melalui sistem CMS cerdas kami.",
          time: "4 Menit",
          icon: <Database className="w-5 h-5 text-white" />,
          gradient: "from-purple-500 to-fuchsia-400",
          steps: [
            "Edit teks dan gambar",
            "Kelola navigasi dan section",
            "Simpan perubahan konten"
          ]
        },
        {
          title: "Panduan Template Landing Page",
          desc: "Pahami cara memilih dan menyesuaikan template landing page agar sangat sesuai dengan kebutuhan unik bisnis Anda.",
          time: "3 Menit",
          icon: <Layout className="w-5 h-5 text-white" />,
          gradient: "from-emerald-500 to-teal-400",
          steps: [
            "Pilih template yang sesuai",
            "Sesuaikan konten dan tampilan",
            "Lihat hasil melalui preview"
          ]
        },
        {
          title: "Panduan Publikasi Landing Page",
          desc: "Pelajari proses publikasi instan hingga landing page Anda aktif dan siap diakses oleh audiens publik secara global.",
          time: "2 Menit",
          icon: <Rocket className="w-5 h-5 text-white" />,
          gradient: "from-amber-500 to-orange-400",
          steps: [
            "Periksa preview landing page",
            "Klik Publish Landing Page",
            "Situs langsung aktif secara online"
          ]
        }
      ];

  const filteredGuides = guidesData.filter(
    (g: any) =>
      g.title.toLowerCase().includes(guideSearchQuery.toLowerCase()) ||
      g.desc.toLowerCase().includes(guideSearchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 relative pb-20 pt-8 px-4">
      {/* Background Glows */}
      <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-brand-blue/5 dark:bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-[10000ms]" />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-blue text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Dokumentasi & Bantuan
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
        >
          Pusat Panduan <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">Uni-LandFarm</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
        >
          Kuasai seluruh fitur platform mulai dari pemilihan template, manajemen CMS cerdas, hingga publikasi landing page dalam hitungan menit.
        </motion.p>
      </div>

      {/* Empty State */}
      {filteredGuides.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Panduan tidak ditemukan</h3>
          <p className="text-slate-500">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      )}

      {/* Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredGuides.map((guide, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            key={i} 
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Card Background */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${guide.gradient} opacity-5 dark:opacity-10 rounded-bl-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500`} />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${guide.gradient} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  {guide.icon}
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  waktu baca <span className="text-slate-700 dark:text-slate-200">{guide.time}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-brand-blue transition-colors">
                {guide.title}
              </h3>
              <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-grow">
                {guide.desc}
              </p>

              {/* Steps Area */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-4">
                  Langkah Utama:
                </h4>
                <div className="space-y-3">
                  {guide.steps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:border-brand-blue/30 transition-colors">
                        <span className="text-[10px] font-bold text-brand-blue">{idx + 1}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fake Action Button (UI Only) */}
              <div className="mt-6 flex justify-end">
                <button className="text-brand-blue text-sm font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Pelajari <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentPlanPage;
