import React from 'react';
import { Zap, Bot, Layout, Smartphone, CreditCard, BarChart } from 'lucide-react';
import { motion } from 'motion/react';

export const Features = ({ setView }: { setView?: (v: string) => void }) => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      iconBg: "bg-yellow-500/10",
      iconGlow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
      title: "Pembuatan Instan",
      desc: "Buat halaman lengkap hanya dengan deskripsi bisnis singkat."
    },
    {
      icon: <Bot className="w-6 h-6 text-brand-primary" />,
      iconBg: "bg-brand-primary/10",
      iconGlow: "shadow-[0_0_15px_rgba(255,176,0,0.3)]",
      title: "AI Agentic",
      desc: "AI yang mengerti konteks bisnis Anda dan memberikan saran konten."
    },
    {
      icon: <Layout className="w-6 h-6 text-purple-400" />,
      iconBg: "bg-purple-400/10",
      iconGlow: "shadow-[0_0_15px_rgba(192,132,252,0.3)]",
      title: "Pustaka Template",
      desc: "Puluhan template modern yang dioptimalkan untuk konversi tinggi."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-brand-secondary" />,
      iconBg: "bg-brand-secondary/10",
      iconGlow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
      title: "Responsif Seluler",
      desc: "Halaman Anda akan terlihat sempurna di semua perangkat secara otomatis."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-rose-400" />,
      iconBg: "bg-rose-400/10",
      iconGlow: "shadow-[0_0_15px_rgba(251,113,133,0.3)]",
      title: "Pembayaran Mudah",
      desc: "Integrasi pembayaran lokal Indonesia (QRIS, Bank Transfer, E-wallet)."
    },
    {
      icon: <BarChart className="w-6 h-6 text-teal-400" />,
      iconBg: "bg-teal-400/10",
      iconGlow: "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
      title: "Analitik",
      desc: "Pantau performa halaman Anda dengan dashboard analitik yang intuitif."
    }
  ];

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-emerald-50 via-amber-50 to-teal-50 dark:from-stone-800 dark:via-stone-800 dark:to-stone-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-black text-stone-900 dark:text-white mb-3 tracking-tight">Fitur Unggulan</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto text-sm font-medium">
            Semua yang Anda butuhkan untuk membangun kehadiran online yang kuat.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/90 dark:bg-stone-800/90 backdrop-blur-md p-5 rounded-2xl border border-white/50 dark:border-stone-700/50 hover:border-brand-primary/50 dark:hover:border-stone-500 transition-all group shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.iconBg} ${f.iconGlow}`}
              >
                {f.icon}
              </motion.div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1.5 tracking-tight">{f.title}</h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-xs">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
