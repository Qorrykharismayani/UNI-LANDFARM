import React from 'react';
import { Zap, Database, Layout, Rocket, CheckCircle2 } from 'lucide-react';

interface ContentPlanPageProps {
  guideSearchQuery: string;
  systemSettings?: any;
}

const ContentPlanPage = ({ guideSearchQuery, systemSettings }: ContentPlanPageProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-brand-blue" />;
      case 'Database': return <Database className="w-4 h-4 text-purple-500" />;
      case 'Layout': return <Layout className="w-4 h-4 text-emerald-500" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-amber-500" />;
      default: return <Zap className="w-4 h-4 text-brand-blue" />;
    }
  };

  const rawGuides = systemSettings?.userPageJson?.guides || [];

  const guidesData = rawGuides.length > 0
    ? rawGuides.map((g: any) => ({
        title: g.title,
        desc: g.desc,
        time: g.time,
        icon: getIcon(g.icon),
        bg: g.bg || "bg-blue-500/5 dark:bg-blue-600/10",
        steps: g.steps || []
      }))
    : [
        {
          title: "Panduan Memulai Uni-LandFarm",
          desc: "Pelajari langkah awal membuat landing page menggunakan template yang tersedia.",
          time: "Membaca 3 Menit",
          icon: <Zap className="w-4 h-4 text-brand-blue" />,
          bg: "bg-blue-500/5 dark:bg-blue-600/10",
          steps: [
            "Pilih template landing page",
            "Isi data usaha",
            "Simpan landing page sebagai draft"
          ]
        },
        {
          title: "Panduan Pengelolaan CMS",
          desc: "Kelola konten landing page seperti teks, gambar, kontak, tautan, dan informasi promosi melalui CMS.",
          time: "Membaca 4 Menit",
          icon: <Database className="w-4 h-4 text-purple-500" />,
          bg: "bg-purple-500/5 dark:bg-purple-600/10",
          steps: [
            "Edit teks dan gambar",
            "Kelola navigasi dan section",
            "Simpan perubahan konten"
          ]
        },
        {
          title: "Panduan Template Landing Page",
          desc: "Pahami cara memilih dan menyesuaikan template landing page sesuai kebutuhan bisnis.",
          time: "Membaca 3 Menit",
          icon: <Layout className="w-4 h-4 text-emerald-500" />,
          bg: "bg-emerald-500/5 dark:bg-emerald-600/10",
          steps: [
            "Pilih template yang sesuai",
            "Sesuaikan konten dan tampilan",
            "Lihat hasil melalui preview"
          ]
        },
        {
          title: "Panduan Publikasi Landing Page",
          desc: "Pelajari proses publikasi instan hingga landing page langsung aktif dapat diakses oleh publik.",
          time: "Membaca 2 Menit",
          icon: <Rocket className="w-4 h-4 text-amber-500" />,
          bg: "bg-amber-500/5 dark:bg-amber-600/10",
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
    <div className="max-w-4xl mx-auto space-y-6 relative pb-16">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-10000" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-10000" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
        <div>
          <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">Pusat Panduan Uni-LandFarm</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pelajari cara menggunakan template, CMS, pengelolaan konten, dan proses publikasi landing page dengan mudah.</p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGuides.map((guide, i) => (
          <div key={i} className="bg-gradient-to-br from-white to-blue-50/15 dark:from-slate-900/60 dark:to-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.05)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.15)] hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300 group flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 ${guide.bg} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {guide.icon}
                </div>
              </div>
              <h3 className="text-xs lg:text-sm font-black text-slate-900 dark:text-white mb-1.5 uppercase tracking-tight leading-tight">{guide.title}</h3>
              <p className="text-[11px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">{guide.desc}</p>

              {/* Mock Steps */}
              <div className="border-t border-slate-50 dark:border-white/5 pt-3 space-y-2">
                <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Langkah Utama:</h4>
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] lg:text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPlanPage;
