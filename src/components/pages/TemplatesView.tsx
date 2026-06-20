import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe } from 'lucide-react';

interface TemplatePreviewProps {
  setView: (v: string) => void;
  user?: any;
}

export const TemplatePreview = ({ setView, user }: TemplatePreviewProps) => (
  <section className="py-32 px-6 overflow-hidden bg-white dark:bg-slate-950 relative transition-colors duration-300">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 via-transparent to-brand-blue/5 blur-[80px]" 
      />
    </div>
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-base font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          Pustaka Template
        </motion.div>
        <h2 className="text-4xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Pilih Template Bisnis Anda</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-2xl sm:text-2xl font-medium leading-relaxed transition-colors">
          Desain profesional yang siap pakai untuk berbagai sektor bisnis modern. Jelajahi pustaka templat kami yang luas, dirancang khusus untuk memenuhi kebutuhan unik industri Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'AgriCorp Landing Page', seed: 'agriculture', type: 'Pertanian & Agribisnis', url: 'unibiz.com/template/agricorp', thumbnail: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&q=80' },
          { title: 'FreshMarket Store', seed: 'grocery', type: 'E-Commerce / Retail', url: 'unibiz.com/template/freshmarket', thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80' },
          { title: 'SmartFarm Tech', seed: 'tech', type: 'Teknologi & IoT', url: 'unibiz.com/template/smartfarm', thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80' }
        ].map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-[32px] shadow-premium border border-slate-100 dark:border-slate-700 overflow-hidden group cursor-pointer hover:shadow-premium-hover transition-all"
          >
            {/* Browser Header */}
            <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              </div>
              <div className="ml-4 bg-white dark:bg-slate-800 rounded-md px-3 py-1 text-base font-bold text-slate-400 dark:text-slate-500 w-full flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                <Globe className="w-3 h-3" />
                {t.url}
              </div>
            </div>

            {/* Template Image with Overlay */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={t.thumbnail} 
                alt={t.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                referrerPolicy="no-referrer"
              />
              
              {/* Info Overlay Card */}
              <div className="absolute inset-x-4 bottom-4 glass-card p-5 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-base font-black text-brand-blue uppercase tracking-[0.3em] mb-1.5">{t.type}</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.title}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setView('templates')}
                    className="flex-1 px-4 py-2.5 text-base font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Detail
                  </button>
                  <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setView('templates');
                    }}
                    className="flex-1 px-4 py-2.5 text-base font-black uppercase tracking-widest text-white bg-brand-blue rounded-lg shadow-blue"
                  >
                    Gunakan
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

interface TemplatesViewProps {
  setView: (v: string) => void;
  user?: any;
}

export const TemplatesView = ({ setView, user }: TemplatesViewProps) => {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const allTemplates = [
    // Korporat
    { title: "Corporate Business Suite", seed: "business-office", type: "Korporat", url: "unibiz.com/template/corporate", desc: "Desain profesional dan elegan untuk perusahaan skala besar dengan fitur lengkap." },
    { title: "Consulting Firm Site", seed: "consulting", type: "Korporat", url: "unibiz.com/template/consulting", desc: "Bangun kepercayaan klien dengan situs web konsultan yang profesional dan terpercaya." },
    { title: "Executive Partners", seed: "executive", type: "Korporat", url: "unibiz.com/template/executive", desc: "Tampilan modern untuk firma hukum atau kemitraan bisnis profesional." },
    // Retail
    { title: "Modern Retail Platform", seed: "retail-store", type: "Retail", url: "unibiz.com/template/retail", desc: "Tingkatkan penjualan dengan tampilan toko online yang modern dan responsif." },
    { title: "Boutique Fashion", seed: "fashion", type: "Retail", url: "unibiz.com/template/fashion", desc: "Tampilkan koleksi busana Anda dengan gaya yang chic dan minimalis." },
    { title: "Grocery Express", seed: "grocery", type: "Retail", url: "unibiz.com/template/grocery", desc: "Solusi cepat untuk toko kelontong atau supermarket lokal Anda." },
    // Teknologi
    { title: "Tech Startup Landing", seed: "tech-startup", type: "Teknologi", url: "unibiz.com/template/tech", desc: "Cocok untuk startup teknologi yang ingin menonjolkan inovasi dan produk terbaru." },
    { title: "SaaS Dashboard Pro", seed: "saas", type: "Teknologi", url: "unibiz.com/template/saas", desc: "Template landing page SaaS dengan fokus pada fitur dan konversi pengguna." },
    { title: "AI Solutions Hub", seed: "ai-tech", type: "Teknologi", url: "unibiz.com/template/ai", desc: "Desain futuristik untuk perusahaan yang berfokus pada kecerdasan buatan." },
    // Layanan
    { title: "Creative Agency Portfolio", seed: "creative-agency", type: "Layanan", url: "unibiz.com/template/agency", desc: "Tampilkan portofolio kreatif Anda dengan desain yang unik dan menarik perhatian." },
    { title: "Wellness & Spa", seed: "wellness", type: "Layanan", url: "unibiz.com/template/wellness", desc: "Ciptakan suasana tenang untuk bisnis kesehatan, spa, atau pusat meditasi." },
    { title: "Professional Cleaning", seed: "cleaning", type: "Layanan", url: "unibiz.com/template/cleaning", desc: "Template bersih dan terpercaya untuk jasa kebersihan rumah atau kantor." },
    // E-commerce
    { title: "E-Commerce Storefront", seed: "ecommerce", type: "E-commerce", url: "unibiz.com/template/shop", desc: "Platform e-commerce yang dioptimalkan untuk konversi tinggi dan pengalaman belanja yang mulus." },
    { title: "Gadget World", seed: "gadgets", type: "E-commerce", url: "unibiz.com/template/gadgets", desc: "Toko elektronik modern dengan fitur perbandingan produk dan ulasan." },
    { title: "Organic Food Market", seed: "organic", type: "E-commerce", url: "unibiz.com/template/organic", desc: "Jual produk organik dan sehat dengan desain yang segar dan ramah lingkungan." }
  ];

  const filteredTemplates = activeFilter === "Semua" 
    ? allTemplates 
    : allTemplates.filter(t => t.type === activeFilter);

  return (
    <section className="py-32 px-6 overflow-hidden bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-base font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(255,176,0,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            Pustaka Template
          </motion.div>
          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Pilih Template Bisnis Anda</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-2xl sm:text-2xl font-medium leading-relaxed transition-colors">
            Desain profesional yang siap pakai untuk berbagai sektor bisnis modern. Jelajahi pustaka templat kami yang luas, dirancang khusus untuk memenuhi kebutuhan unik industri Anda.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["Semua", "Korporat", "Retail", "Teknologi", "Layanan", "E-commerce"].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-base font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-brand-blue text-white shadow-blue' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((t, i) => (
            <motion.div 
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-[32px] shadow-premium border border-slate-100 dark:border-slate-700 overflow-hidden group cursor-pointer hover:shadow-premium-hover transition-all"
            >
              {/* Browser Header */}
              <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>
                <div className="ml-4 bg-white dark:bg-slate-800 rounded-md px-3 py-1 text-base font-bold text-slate-400 dark:text-slate-500 w-full flex items-center gap-2 border border-slate-100 dark:border-slate-700">
                  <Globe className="w-3 h-3" />
                  {t.url}
                </div>
              </div>

              {/* Template Image with Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={(t as any).thumbnail || `https://picsum.photos/seed/${t.seed}/800/600`} 
                  alt={t.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Info Overlay Card */}
                <div className="absolute inset-x-4 bottom-4 glass-card p-5 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-base font-black text-brand-blue uppercase tracking-[0.3em] mb-1.5">{t.type}</p>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{t.title}</h4>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 font-medium">{t.desc}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 px-4 py-2.5 text-base font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      Detail
                    </button>
                    <button 
                      onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setView(user ? 'dashboard:templates' : 'signup');
                      }}
                      className="flex-1 px-4 py-2.5 text-base font-black uppercase tracking-widest text-white bg-brand-blue rounded-lg shadow-blue"
                    >
                      Gunakan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TemplatesView;
