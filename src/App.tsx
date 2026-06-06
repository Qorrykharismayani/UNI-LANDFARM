import React, { useState } from 'react';
import { TrendingUp, Cpu, Globe, Zap, Bot, Database, Layout, BarChart3, Upload, MessageSquare, FileText, Instagram, ArrowRight, Copy, ShieldCheck, Brain, CheckCircle2, Search, Filter, Monitor, Smartphone, LineChart as LucideLineChart, Target, ChevronDown, Apple, Mail, Lock, Building2, Bell, User, Layers, ShoppingBag, Settings, LogOut, Plus, MoreHorizontal, Lightbulb, CreditCard, Banknote, Rocket, Facebook, MapPin, Music2, X, MousePointer2, Undo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export const ALL_TEMPLATES = [
  // Korporat
  { id: "corp-suite", title: "Corporate Business Suite", seed: "business-office", type: "Korporat", category: "Korporat", url: "unibiz.com/template/corporate", desc: "Desain profesional dan elegan untuk perusahaan skala besar dengan fitur lengkap.", tokenPrice: 50, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=600" },
  { id: "consulting", title: "Consulting Firm Site", seed: "consulting", type: "Korporat", category: "Korporat", url: "unibiz.com/template/consulting", desc: "Bangun kepercayaan klien dengan situs web konsultan yang profesional dan terpercaya.", tokenPrice: 30, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&h=600" },
  { id: "executive", title: "Executive Partners", seed: "executive", type: "Korporat", category: "Korporat", url: "unibiz.com/template/executive", desc: "Tampilan modern untuk firma hukum atau kemitraan bisnis profesional.", tokenPrice: 40, img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&h=600" },
  // Retail
  { id: "retail-mod", title: "Modern Retail Platform", seed: "retail-store", type: "Retail", category: "Retail", url: "unibiz.com/template/retail", desc: "Tingkatkan penjualan dengan tampilan toko online yang modern dan responsif.", tokenPrice: 25, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=600" },
  { id: "fashion-btq", title: "Boutique Fashion", seed: "fashion", type: "Retail", category: "Retail", url: "unibiz.com/template/fashion", desc: "Tampilkan koleksi busana Anda dengan gaya yang chic dan minimalis.", tokenPrice: 20, img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&h=600" },
  { id: "grocery", title: "Grocery Express", seed: "grocery", type: "Retail", category: "Retail", url: "unibiz.com/template/grocery", desc: "Solusi cepat untuk toko kelontong atau supermarket lokal Anda.", tokenPrice: 15, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&h=600" },
  // Teknologi
  { id: "startup-land", title: "Tech Startup Landing", seed: "tech-startup", type: "Teknologi", category: "Teknologi", url: "unibiz.com/template/tech", desc: "Cocok untuk startup teknologi yang ingin menonjolkan inovasi dan produk terbaru.", tokenPrice: 45, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600" },
  { id: "saas-pro", title: "SaaS Dashboard Pro", seed: "saas", type: "Teknologi", category: "Teknologi", url: "unibiz.com/template/saas", desc: "Template landing page SaaS dengan fokus pada fitur dan konversi pengguna.", tokenPrice: 60, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600" },
  { id: "ai-hub", title: "AI Solutions Hub", seed: "ai-tech", type: "Teknologi", category: "Teknologi", url: "unibiz.com/template/ai", desc: "Desain futuristik untuk perusahaan yang berfokus pada kecerdasan buatan.", tokenPrice: 55, img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=600" },
  // Layanan
  { id: "creative-agency", title: "Creative Agency Portfolio", seed: "creative-agency", type: "Layanan", category: "Layanan", url: "unibiz.com/template/agency", desc: "Tampilkan portofolio kreatif Anda dengan desain yang unik dan menarik perhatian.", tokenPrice: 35, img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&h=600" },
  { id: "wellness", title: "Wellness & Spa", seed: "wellness", type: "Layanan", category: "Layanan", url: "unibiz.com/template/wellness", desc: "Ciptakan suasana tenang untuk bisnis kesehatan, spa, atau pusat meditasi.", tokenPrice: 20, img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&h=600" },
  { id: "cleaning", title: "Professional Cleaning", seed: "cleaning", type: "Layanan", category: "Layanan", url: "unibiz.com/template/cleaning", desc: "Template bersih dan terpercaya untuk jasa kebersihan rumah atau kantor.", tokenPrice: 15, img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&h=600" },
  // E-commerce
  { id: "ecommerce-base", title: "E-Commerce Storefront", seed: "ecommerce", type: "E-commerce", category: "E-commerce", url: "unibiz.com/template/shop", desc: "Platform e-commerce yang dioptimalkan untuk konversi tinggi dan pengalaman belanja yang mulus.", tokenPrice: 50, img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&h=600" },
  { id: "gadget", title: "Gadget World", seed: "gadgets", type: "E-commerce", category: "E-commerce", url: "unibiz.com/template/gadgets", desc: "Toko elektronik modern dengan fitur perbandingan produk dan ulasan.", tokenPrice: 40, img: "https://images.unsplash.com/photo-1531297172868-b80c352edafb?auto=format&fit=crop&w=800&h=600" },
  { id: "organic", title: "Organic Food Market", seed: "organic", type: "E-commerce", category: "E-commerce", url: "unibiz.com/template/organic", desc: "Jual produk organik dan sehat dengan desain yang segar dan ramah lingkungan.", tokenPrice: 25, img: "https://images.unsplash.com/photo-1596199050105-6d5d32222916?auto=format&fit=crop&w=800&h=600" }
];



const TemplatePreview = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-16 px-6 overflow-hidden bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative">
    {/* Floating Illustrations - Enhanced UI Cards */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-20 left-[5%] z-0"
      >
        <div className="glass-card p-4 rounded-2xl border-white/40 dark:border-stone-700/40 shadow-2xl opacity-20 scale-125">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Layout className="text-white w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-16 bg-stone-200 dark:bg-stone-700 rounded"></div>
              <div className="h-1.5 w-10 bg-stone-100 dark:bg-stone-800 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-8 bg-stone-50 dark:bg-stone-800 rounded-md"></div>)}
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }} 
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-40 right-[5%] z-0"
      >
        <div className="glass-card p-4 rounded-2xl border-white/40 dark:border-stone-700/40 shadow-2xl opacity-20 scale-150">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div className="h-3 w-24 bg-stone-200 dark:bg-stone-700 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded"></div>
            <div className="h-2 w-[80%] bg-stone-100 dark:bg-stone-800 rounded"></div>
            <div className="h-2 w-[60%] bg-stone-100 dark:bg-stone-800 rounded"></div>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
        >
          Pustaka Template
        </motion.div>
        <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-white mb-6 tracking-tighter leading-none">Pilih Template Bisnis Anda</h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-3xl mx-auto text-base font-medium leading-relaxed">
          Desain profesional yang siap pakai untuk berbagai sektor bisnis modern. Jelajahi pustaka templat kami yang luas, dirancang khusus untuk memenuhi kebutuhan unik industri Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Corporate Business Suite", seed: "business-office", type: "Korporat", url: "unibiz.com/template/corporate" },
          { title: "Modern Retail Platform", seed: "retail-store", type: "Retail", url: "unibiz.com/template/retail" },
          { title: "Tech Startup Landing", seed: "tech-startup", type: "Teknologi", url: "unibiz.com/template/tech" }
        ].map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-[32px] shadow-premium border border-stone-100 dark:border-stone-700 overflow-hidden group cursor-pointer hover:shadow-premium-hover transition-all"
          >
            {/* Browser Header */}
            <div className="bg-stone-50 dark:bg-stone-900 px-5 py-3 flex items-center gap-2 border-b border-stone-100 dark:border-stone-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700"></div>
                <div className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700"></div>
                <div className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700"></div>
              </div>
              <div className="ml-4 bg-white dark:bg-stone-800 rounded-md px-3 py-1 text-[9px] font-bold text-stone-400 dark:text-stone-500 w-full flex items-center gap-2 border border-stone-100 dark:border-stone-700">
                <Globe className="w-3 h-3" />
                {t.url}
              </div>
            </div>

            {/* Template Image with Overlay */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${t.seed}/800/600`} 
                alt={t.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                referrerPolicy="no-referrer"
              />
              
              {/* Info Overlay Card */}
              <div className="absolute inset-x-4 bottom-4 glass-card p-5 rounded-2xl transform transtone-y-2 group-hover:transtone-y-0 transition-transform duration-700">
                <p className="text-[9px] font-black text-brand-primary uppercase tracking-[0.3em] mb-1.5">{t.type}</p>
                <h4 className="text-lg font-black text-stone-900 dark:text-white mb-4 tracking-tight">{t.title}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setView('templates')}
                    className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    Detail
                  </button>
                  <button 
                    onClick={() => setView('signup')}
                    className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-brand-primary rounded-lg shadow-primary"
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

const TemplatesView = ({ 
  setView, 
  tokenBalance, 
  setTokenBalance, 
  unlockedTemplates, 
  setUnlockedTemplates 
}: { 
  setView: (v: string) => void,
  tokenBalance: number,
  setTokenBalance: (v: number | ((prev: number) => number)) => void,
  unlockedTemplates: string[],
  setUnlockedTemplates: (v: string[] | ((prev: string[]) => string[])) => void
}) => {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const handleUnlockTemplate = (template: any) => {
    if (unlockedTemplates.includes(template.id)) {
      setView('dashboard');
      return;
    }

    if (tokenBalance < template.tokenPrice) {
      alert(`Saldo token tidak cukup. Anda butuh ${template.tokenPrice} token.`);
      setView('token-shop');
      return;
    }

    if (confirm(`Gunakan ${template.tokenPrice} Token untuk membuka template "${template.title}"?`)) {
      setTokenBalance(prev => prev - template.tokenPrice);
      setUnlockedTemplates(prev => [...(prev as any), template.id]);
      alert(`Berhasil membuka ${template.title}!`);
      setView('dashboard');
    }
  };

  const filteredTemplates = activeFilter === "Semua" 
    ? ALL_TEMPLATES 
    : ALL_TEMPLATES.filter(t => t.type === activeFilter);

  return (
    <section className="py-24 px-6 overflow-hidden bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
          >
            Pustaka Template
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-stone-900 dark:text-white mb-6 tracking-tighter leading-none">Pilih Template Bisnis Anda</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
            Desain profesional yang siap pakai untuk berbagai sektor bisnis modern. Beberapa template premium membutuhkan token untuk diakses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["Semua", "Korporat", "Retail", "Teknologi", "Layanan", "E-commerce"].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-brand-primary text-white shadow-primary' : 'bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-600 dark:hover:text-stone-300'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((t, i) => {
            const isUnlocked = unlockedTemplates.includes(t.id);
            return (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-stone-800 rounded-[32px] shadow-premium border border-stone-100 dark:border-stone-700 overflow-hidden group cursor-pointer hover:shadow-premium-hover transition-all"
              >
                {/* Browser Header */}
                <div className="bg-stone-50 dark:bg-stone-900 px-5 py-3 flex items-center gap-2 border-b border-stone-100 dark:border-stone-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700"></div>
                    <div className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700"></div>
                    <div className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700"></div>
                  </div>
                  <div className="ml-4 bg-white dark:bg-stone-800 rounded-md px-3 py-1 text-[9px] font-bold text-stone-400 dark:text-stone-500 w-full flex items-center gap-2 border border-stone-100 dark:border-stone-700">
                    <Globe className="w-3 h-3" />
                    {t.url}
                  </div>
                </div>

                {/* Template Image with Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${t.seed}/800/600`} 
                    alt={t.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Info Overlay Card */}
                  <div className="absolute inset-x-4 bottom-4 glass-card p-5 rounded-2xl transform transtone-y-2 group-hover:transtone-y-0 transition-transform duration-700">
                    <p className="text-[9px] font-black text-brand-primary uppercase tracking-[0.3em] mb-1.5">{t.type}</p>
                    <h4 className="text-lg font-black text-stone-900 dark:text-white mb-2 tracking-tight">{t.title}</h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mb-4 line-clamp-2">{t.desc}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setView('templates')}
                        className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                      >
                        Detail
                      </button>
                      <button 
                        onClick={() => handleUnlockTemplate(t)}
                        className={`flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white rounded-lg shadow-primary transition-all flex items-center justify-center gap-2 ${isUnlocked ? 'bg-brand-green shadow-green cursor-default' : 'bg-brand-primary'}`}
                      >
                        {isUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Terbuka
                          </>
                        ) : (
                          <>
                            Gunakan
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "CEO of TechFlow",
      content: "UNI-LandFarm benar-benar mengubah cara kami mengelola kehadiran digital. AI-nya sangat intuitif dan membantu kami menghemat waktu hingga 70%.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Sari Wijaya",
      role: "Founder of CreativeHub",
      content: "Landing page yang dihasilkan AI sangat profesional. Saya tidak menyangka bisa membangun situs sekelas agensi dalam hitungan menit.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Andi Pratama",
      role: "Marketing Director",
      content: "Fitur Agentic AI CMS adalah game changer. Konten kami sekarang teroptimasi secara otomatis untuk SEO dan audiens kami.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-stone-50 dark:from-stone-900 dark:to-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-white mb-4 tracking-tight">Apa Kata Mereka?</h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium max-w-2xl mx-auto">Bergabunglah dengan ribuan pebisnis yang telah beralih ke masa depan digital.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-stone-800 p-8 rounded-[32px] shadow-premium border border-stone-100 dark:border-stone-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/20" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-black text-stone-900 dark:text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic font-medium">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Apakah saya perlu keahlian coding?", a: "Tidak sama sekali. UNI-LandFarm dirancang untuk pebisnis tanpa latar belakang teknis. AI kami menangani semua aspek teknis." },
    { q: "Berapa lama waktu yang dibutuhkan untuk membuat situs?", a: "Hanya butuh sekitar 30-60 detik untuk menghasilkan draf pertama yang profesional." },
    { q: "Apakah situs saya akan SEO-friendly?", a: "Ya, AI kami secara otomatis mengoptimalkan struktur, meta tag, dan konten untuk mesin pencari." },
    { q: "Bisakah saya menggunakan domain sendiri?", a: "Tentu. Anda dapat menghubungkan domain kustom Anda dengan mudah di dashboard." }
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-stone-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-stone-900 dark:text-white mb-12 text-center tracking-tight">Pertanyaan Umum</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700"
            >
              <h4 className="font-black text-stone-900 dark:text-white mb-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-[10px]">?</div>
                {faq.q}
              </h4>
              <p className="text-stone-500 dark:text-stone-400 text-sm font-medium leading-relaxed ml-9">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-24 px-6 bg-stone-950 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,176,0,0.15)_0%,transparent_70%)]"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-none">
        Siap Memulai Transformasi <br />Digital Bisnis Anda?
      </h2>
      <p className="text-amber-100 text-lg mb-12 font-medium">
        Dapatkan akses instan ke platform Agentic AI tercanggih dan bangun masa depan bisnis Anda hari ini.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button 
          onClick={() => setView('signup')}
          className="px-12 py-5 bg-white text-brand-primary rounded-2xl font-black shadow-2xl hover:scale-105 transition-all active:scale-95"
        >
          Daftar Gratis Sekarang
        </button>
        <button 
          onClick={() => setView('features')}
          className="px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black hover:bg-white/10 transition-all"
        >
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  </section>
);

const DashboardPreview = ({ setView }: { setView?: (v: string) => void }) => (

  <section className="py-16 px-6 bg-stone-900 text-white overflow-hidden relative">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/15 blur-[180px] -z-10"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-green/10 blur-[150px] -z-10"></div>
    
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30 mb-8 shadow-lg shadow-brand-primary/10"
        >
          <Layout className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Agentic AI CMS Dashboard</span>
        </motion.div>
        <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-[1.1] tracking-tight">
          CMS Kuat dengan <br /><span className="text-brand-primary text-glow">Kecerdasan Bisnis AI</span>
        </h2>
        <p className="text-stone-400 text-base mb-10 leading-relaxed font-medium">
          Kelola seluruh ekosistem digital bisnis Anda dengan bantuan AI yang proaktif. Dari analisis pasar hingga penjadwalan konten pemasaran otomatis.
        </p>
        
        <div className="space-y-6 mb-12">
          {[
            { icon: <MessageSquare className="w-6 h-6" />, title: "AI Agent Panel", text: "Interaksi real-time dengan asisten otonom untuk manajemen konten." },
            { icon: <Upload className="w-6 h-6" />, title: "Knowledge Base", text: "Unggah data bisnis Anda untuk kustomisasi AI yang sangat spesifik." },
            { icon: <BarChart3 className="w-6 h-6" />, title: "Data Visualization", text: "Visualisasi data real-time untuk pengambilan keputusan yang lebih cepat." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-xl">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-black mb-1 group-hover:text-brand-primary transition-colors tracking-tight">{item.title}</h4>
                <p className="text-stone-500 text-sm font-medium leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => setView?.('signup')}
          className="px-10 py-4 bg-brand-primary text-white rounded-xl font-black shadow-primary hover:shadow-primary-lg transition-all transform hover:-transtone-y-1 active:scale-95"
        >
          Mulai Kelola Sekarang
        </button>
      </div>

      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 0.85, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 relative z-10 origin-center"
        >
          {/* Dashboard Header */}
          <div className="bg-stone-50 border-b border-stone-200 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <div className="h-4 w-32 bg-stone-200 rounded-full"></div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200"></div>
              <div className="w-10 h-10 rounded-full bg-stone-200"></div>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-12 gap-6">
            {/* Sidebar Mock - Real Content */}
            <div className="col-span-3 space-y-2">
              {[
                { icon: <Layout className="w-3 h-3" />, label: "Dashboard", active: true },
                { icon: <BarChart3 className="w-3 h-3" />, label: "Analitik" },
                { icon: <MessageSquare className="w-3 h-3" />, label: "Agen AI" },
                { icon: <Database className="w-3 h-3" />, label: "Pengetahuan" },
                { icon: <Globe className="w-3 h-3" />, label: "Editor Situs" },
                { icon: <Zap className="w-3 h-3" />, label: "Otomatisasi" }
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${item.active ? 'bg-brand-primary text-white shadow-primary' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}>
                  {item.icon}
                  <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* Main Content Mock - Scaled down further */}
            <div className="col-span-9 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Pendapatan", val: "Rp 124.500.000", color: "text-brand-primary", trend: "+24%" },
                  { label: "Pengguna Aktif", val: "12.402", color: "text-stone-900", trend: "+12%" },
                  { label: "Tugas AI", val: "842", color: "text-brand-green", trend: "Aktif" }
                ].map((item, i) => (
                  <div key={i} className="bg-stone-50 rounded-[20px] border border-stone-100 p-4 hover:border-brand-primary/30 transition-all hover:shadow-lg group relative overflow-hidden">
                    <p className="text-[8px] font-black text-stone-400 uppercase tracking-widest mb-1.5">{item.label}</p>
                    <div className="flex items-end justify-between">
                      <p className={`text-sm font-black ${item.color} tracking-tight group-hover:scale-105 transition-transform`}>{item.val}</p>
                      <span className="text-[6px] font-black text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded-full">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-stone-50 rounded-[24px] border border-stone-100 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h5 className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Analitik Performa</h5>
                    <p className="text-[8px] text-stone-400 font-bold">Pemantauan lalu lintas langsung</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-2 py-0.5 bg-brand-primary/10 rounded-full text-[7px] font-black text-brand-primary uppercase tracking-widest">Bulanan</div>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {[40, 70, 55, 90, 65, 100, 80, 95, 50, 75, 85, 60].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.8 }}
                      className="flex-1 bg-brand-primary/20 rounded-t-md hover:bg-brand-primary transition-all cursor-pointer relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -transtone-x-1/2 bg-stone-900 text-white text-[7px] font-black px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating Revenue Card to match image */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-2xl border border-stone-100 flex items-center gap-3 z-20"
                >
                  <div className="w-8 h-8 bg-brand-green/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-stone-900 uppercase">Pendapatan</p>
                    <p className="text-[10px] font-black text-brand-green">+24%</p>
                  </div>
                </motion.div>
              </div>

              {/* AI Agent Panel Float - Scaled down further */}
              <motion.div 
                initial={{ y: 15, opacity: 0, scale: 0.7 }}
                whileInView={{ y: 0, opacity: 1, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-4 right-4 w-56 bg-white rounded-[20px] shadow-2xl border border-stone-100 p-4 transform origin-bottom-right"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 bg-brand-green rounded-[10px] flex items-center justify-center shadow-lg shadow-brand-green/20">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-stone-900">Agen AI UNI-LandFarm</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-brand-green animate-pulse"></div>
                      <p className="text-[7px] text-brand-green font-black uppercase tracking-widest">Active Now</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-stone-50 p-2 rounded-[12px] text-[8px] text-stone-600 font-medium leading-relaxed border border-stone-100">Halo! Strategi pemasaran Anda telah dioptimalkan.</div>
                  <div className="bg-brand-primary text-white p-2 rounded-[12px] text-[8px] font-bold ml-3 shadow-md border border-brand-primary/10">Terima kasih, Agent!</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  </section>
);

const PricingView = ({ setView, isLoggedIn, setSelectedPack }: { setView: (v: string) => void, isLoggedIn?: boolean, setSelectedPack?: (p: any) => void }) => {
  const handleBuy = (pack: any) => {
    if (setSelectedPack) setSelectedPack(pack);
    if (!isLoggedIn) {
      setView('login');
    } else {
      setView('payment');
    }
  };

  return (
  <section className="py-24 px-6 bg-gradient-to-b from-white via-stone-50 to-stone-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
        >
          Paket Token
        </motion.div>
        <h2 className="text-4xl lg:text-5xl font-black text-stone-900 dark:text-white mb-6 tracking-tighter">Pilih Paket Token Anda</h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg font-medium">
          Mulai dengan token gratis dan beli paket tambahan untuk fitur premium.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Paket Pemula", tokens: 50, price: "Rp 25.000", desc: "Cocok untuk mencoba fitur dasar AI.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Akses Template Dasar", "Dukungan Komunitas"] },
          { title: "Paket Pertumbuhan", tokens: 250, price: "Rp 100.000", desc: "Untuk bisnis yang aktif berkembang.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Akses Semua Template", "Dukungan Prioritas"], popular: true },
          { title: "Paket Pro", tokens: 1000, price: "Rp 350.000", desc: "Solusi skala besar untuk agensi.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Pengaturan Domain Kustom", "Agen AI Khusus"] }
        ].map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white dark:bg-stone-800 p-10 rounded-[40px] shadow-premium border-2 transition-all relative overflow-hidden ${plan.popular ? 'border-brand-primary scale-105 z-10' : 'border-stone-100 dark:border-stone-700'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-brand-primary text-white px-6 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                Paling Populer
              </div>
            )}
            <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2 tracking-tight">{plan.title}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-stone-900 dark:text-white">{plan.price}</span>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 font-medium leading-relaxed">{plan.desc}</p>
            <ul className="space-y-4 mb-10">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium text-stone-600 dark:text-stone-300">
                  <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleBuy(plan)}
              className={`w-full py-4 rounded-2xl font-black transition-all ${plan.popular ? 'bg-brand-primary text-white shadow-primary hover:shadow-primary-lg' : 'bg-stone-50 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600'}`}
            >
              Beli Token
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

const TokenShopView = ({ setView, setSelectedPack }: { setView: (v: string) => void, setSelectedPack?: (p: any) => void }) => {
  const packs = [
    { name: "Starter Pack", tokens: 50, price: "Rp 25.000", desc: "Cukup untuk mencoba 1-2 template premium.", popular: false },
    { name: "Basic Pack", tokens: 100, price: "Rp 50.000", desc: "Pilihan terbaik untuk bisnis kecil.", popular: true },
    { name: "Pro Pack", tokens: 250, price: "Rp 100.000", desc: "Hemat 20% untuk agensi atau retail.", popular: false },
    { name: "Ultimate Pack", tokens: 1000, price: "Rp 350.000", desc: "Token tak terbatas untuk kebutuhan besar.", popular: false },
  ];

  return (
    <section className="py-24 px-6 bg-stone-50/50 dark:bg-stone-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
          >
            Token Shop
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-stone-900 dark:text-white mb-6 tracking-tighter">Beli Paket Token</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg font-medium">
            Token digunakan untuk membuka template eksklusif dan generate konten AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packs.map((pack, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white dark:bg-stone-800 p-8 rounded-[32px] border-2 transition-all flex flex-col ${pack.popular ? 'border-brand-primary shadow-xl shadow-brand-primary/10 scale-105 z-10' : 'border-white dark:border-stone-800 shadow-premium'}`}
            >
              <div className="flex-1">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white mb-1 tracking-tight">{pack.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black text-brand-primary">{pack.tokens}</span>
                  <span className="text-xs font-black text-stone-400 uppercase tracking-widest">Token</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-8 font-medium leading-relaxed">{pack.desc}</p>
              </div>
              <button 
                onClick={() => {
                  if (setSelectedPack) setSelectedPack(pack);
                  setView('payment');
                }}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${pack.popular ? 'bg-brand-primary text-white shadow-primary flex items-center justify-center gap-2' : 'bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-600'}`}
              >
                {pack.price}
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-white dark:bg-stone-800 rounded-[32px] border border-stone-100 dark:border-stone-700 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-brand-green" />
            </div>
            <div>
              <h4 className="text-lg font-black text-stone-900 dark:text-white tracking-tight">Pembayaran Aman & Instan</h4>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Mendukung QRIS, GoPay, OVO, dan Transfer Bank.</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="w-10 h-6 bg-stone-100 dark:bg-stone-700 rounded-md"></div>
             <div className="w-10 h-6 bg-stone-100 dark:bg-stone-700 rounded-md"></div>
             <div className="w-10 h-6 bg-stone-100 dark:bg-stone-700 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PaymentView = ({ setView, selectedPack, buyTokens, setSelectedPack }: any) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    { 
      category: "Dompet Digital (E-Wallet)", 
      options: [
        { id: "GoPay", logoText: "gopay", bg: "bg-[#00AED6]", text: "text-white" },
        { id: "OVO", logoText: "OVO", bg: "bg-[#4C2A86]", text: "text-white" },
        { id: "DANA", logoText: "DANA", bg: "bg-[#108EE9]", text: "text-white" },
        { id: "ShopeePay", logoText: "ShopeePay", bg: "bg-[#EE4D2D]", text: "text-white" }
      ] 
    },
    { 
      category: "Virtual Account", 
      options: [
        { id: "BCA VA", logoText: "BCA", bg: "bg-[#005DAA]", text: "text-white" },
        { id: "Mandiri VA", logoText: "mandiri", bg: "bg-[#FFC800]", text: "text-[#003D79]" },
        { id: "BNI VA", logoText: "BNI", bg: "bg-[#005E6A]", text: "text-[#F1592A]" },
        { id: "BRI VA", logoText: "BRI", bg: "bg-[#005CE6]", text: "text-white" }
      ] 
    },
    { 
      category: "Mobile Banking", 
      options: [
        { id: "BCA Mobile", logoText: "m-BCA", bg: "bg-[#005DAA]", text: "text-white" },
        { id: "Livin' by Mandiri", logoText: "livin'", bg: "bg-[#FFC800]", text: "text-[#003D79]" }
      ] 
    }
  ];

  const handleConfirm = () => {
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu!");
      return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
      buyTokens(selectedPack?.tokens || 0);
      if (setSelectedPack) setSelectedPack(null);
      setView('dashboard');
    }, 1000);
  };

  return (
    <section className="py-24 px-6 bg-stone-50/50 dark:bg-stone-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setView('token-shop')}
          className="flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-brand-primary mb-8 transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
          Kembali ke Pilihan Paket
        </button>

        <div className="bg-white dark:bg-stone-800 rounded-[32px] border border-stone-100 dark:border-stone-800 shadow-premium p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-2">Pilih Metode Pembayaran</h2>
            <p className="text-stone-500 dark:text-stone-400 font-medium">Anda akan membeli paket token berikut</p>
          </div>

          {selectedPack && (
            <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-[24px] p-6 mb-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">Paket Terpilih</p>
                <h3 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                  {selectedPack.name || selectedPack.title} <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px]">{selectedPack.tokens} Token</span>
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1">Total Tagihan</p>
                <p className="text-2xl font-black text-brand-primary">{selectedPack.price}</p>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {paymentMethods.map((group, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">{group.category}</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.options.map((method, j) => (
                    <button
                      key={j}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${selectedMethod === method.id ? 'border-brand-primary bg-brand-primary/5' : 'border-stone-100 dark:border-stone-700 hover:border-stone-200 dark:hover:border-stone-600'}`}
                    >
                      <div className={`w-14 h-8 ${method.bg} ${method.text} rounded-lg flex items-center justify-center font-black text-[9px] italic`}>
                        {method.logoText}
                      </div>
                      <span className="text-[10px] font-black text-stone-600 dark:text-stone-300 text-center leading-tight">{method.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-stone-100 dark:border-stone-800">
            <button 
              onClick={handleConfirm}
              disabled={!selectedMethod}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${selectedMethod ? 'bg-brand-primary text-white shadow-primary hover:scale-[1.02]' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed'}`}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutUsView = () => (
  <section className="py-24 px-6 bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
        >
          Tentang Kami
        </motion.div>
        <h2 className="text-4xl lg:text-5xl font-black text-stone-900 dark:text-white mb-6 tracking-tighter">Mengenal UNI-LandFarm</h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg font-medium">
          Kami hadir untuk merevolusi cara bisnis membangun dan mengelola kehadiran digital mereka melalui kekuatan Agentic AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-stone-50 dark:bg-stone-800 rounded-[32px] p-10 border border-stone-100 dark:border-stone-700 relative overflow-hidden"
        >
          <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Target className="w-7 h-7 text-brand-primary" />
          </div>
          <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-4 tracking-tight">Visi Kami</h3>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
            Menjadi platform terdepan yang mendemokratisasi teknologi web dan AI, memungkinkan setiap bisnis, dari UMKM hingga perusahaan besar, untuk memiliki kehadiran digital yang cerdas, otomatis, dan berdampak tinggi tanpa hambatan teknis.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-stone-50 dark:bg-stone-800 rounded-[32px] p-10 border border-stone-100 dark:border-stone-700 relative overflow-hidden"
        >
          <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6">
            <Rocket className="w-7 h-7 text-brand-green" />
          </div>
          <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-4 tracking-tight">Misi Kami</h3>
          <ul className="space-y-3 text-stone-600 dark:text-stone-300 font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <span>Menyediakan alat pembuatan web instan yang didukung AI.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <span>Mengotomatiskan pengelolaan konten melalui Agentic CMS.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <span>Memastikan keamanan, kecepatan, dan skalabilitas untuk setiap pengguna.</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="bg-stone-900 rounded-[40px] p-10 lg:p-16 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight">Teknologi Inti Kami</h3>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              Inovasi yang menggerakkan UNI-LandFarm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Bot className="w-6 h-6 text-brand-primary" />
                </div>
                <h4 className="text-2xl font-bold">CMS AI Agentic</h4>
              </div>
              <p className="text-stone-300 leading-relaxed">
                Sistem Manajemen Konten (CMS) kami tidak hanya menyimpan data, tetapi bertindak sebagai asisten cerdas. CMS AI Agentic dapat memahami konteks bisnis Anda, menyarankan pembaruan konten, mengoptimalkan SEO secara otomatis, dan bahkan merespons interaksi pengguna secara real-time berdasarkan basis pengetahuan yang Anda berikan.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Zap className="w-6 h-6 text-brand-green" />
                </div>
                <h4 className="text-2xl font-bold">Generator Web Instan</h4>
              </div>
              <p className="text-stone-300 leading-relaxed">
                Teknologi generator kami mengubah deskripsi singkat tentang bisnis Anda menjadi situs web fungsional yang indah dalam hitungan detik. Menggunakan model AI generatif canggih, sistem kami memilih tata letak yang optimal, menulis salinan yang menarik, dan menerapkan skema warna yang sesuai dengan identitas merek Anda secara otomatis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LoginView = ({ setView, onLoginSuccess }: { setView: (v: string) => void, onLoginSuccess?: () => void }) => (
  <section className="min-h-[calc(100vh-80px)] py-12 flex items-center justify-center px-6 bg-gradient-to-b from-white via-stone-50 to-stone-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[360px] bg-white dark:bg-stone-800 rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] border border-stone-200 dark:border-stone-700 relative z-10"
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-1 tracking-tight">Masuk ke Akun</h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">Gunakan email bisnis Anda</p>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-600 transition-all mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">Google</span>
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200 dark:border-stone-700"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-bold">
          <span className="bg-white dark:bg-stone-800 px-3 text-stone-400 dark:text-stone-500">Atau</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 ml-0.5">Email</label>
          <input type="email" placeholder="nama@perusahaan.com" className="w-full bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary dark:text-white transition-all" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Password</label>
            <a href="#" className="text-[10px] font-bold text-brand-primary hover:underline">Lupa?</a>
          </div>
          <input type="password" placeholder="••••••••" className="w-full bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary dark:text-white transition-all" />
        </div>
      </div>

      <button 
        onClick={() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            setView('dashboard');
          }
        }}
        className="w-full bg-brand-primary text-white py-2.5 rounded-lg font-bold text-sm hover:bg-amber-600 transition-all mb-6"
      >
        Masuk
      </button>

      <div className="text-center text-xs">
        <p className="text-stone-500 dark:text-stone-400">Belum punya akun? <button onClick={() => setView('signup')} className="text-brand-primary font-bold hover:underline">Daftar sekarang</button></p>
      </div>
    </motion.div>
  </section>
);

const SignupView = ({ setView, onLoginSuccess }: { setView: (v: string) => void, onLoginSuccess?: () => void }) => (
  <section className="min-h-[calc(100vh-80px)] py-12 flex items-center justify-center px-6 bg-gradient-to-b from-white via-stone-50 to-stone-100 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[360px] bg-white dark:bg-stone-800 rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] border border-stone-200 dark:border-stone-700 relative z-10"
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-1 tracking-tight">Daftar Akun</h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">Mulai bisnis digital Anda hari ini</p>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-600 transition-all mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">Google</span>
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200 dark:border-stone-700"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-bold">
          <span className="bg-white dark:bg-stone-800 px-3 text-stone-400 dark:text-stone-500">Atau</span>
        </div>
      </div>

      <form className="space-y-4 mb-6" onSubmit={(e) => {
        e.preventDefault();
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          setView('dashboard');
        }
      }}>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 ml-0.5">Nama Bisnis</label>
          <input type="text" placeholder="Contoh: Digital Agency X" className="w-full bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary dark:text-white transition-all" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 ml-0.5">Email</label>
          <input type="email" placeholder="nama@bisnis.com" className="w-full bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary dark:text-white transition-all" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 ml-0.5">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary dark:text-white transition-all" />
        </div>

        <button 
          type="submit"
          className="w-full bg-brand-primary text-white py-2.5 rounded-lg font-bold text-sm hover:bg-amber-600 transition-all mb-6 mt-4"
        >
          Daftar
        </button>
      </form>

      <div className="text-center text-xs">
        <p className="text-stone-500 dark:text-stone-400">Sudah punya akun? <button onClick={() => setView('login')} className="text-brand-primary font-bold hover:underline">Masuk</button></p>
      </div>
    </motion.div>
  </section>
);

const AuthShowcase = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-32 px-6 bg-white dark:bg-stone-900 overflow-hidden relative">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-stone-800 rounded-[32px] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-30px_rgba(0,102,255,0.15)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_30px_60px_-30px_rgba(0,102,255,0.2)] border border-stone-50 dark:border-stone-700 relative z-10"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-black text-stone-900 dark:text-white mb-2 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Masuk untuk mengelola Agentic AI bisnis Anda.</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Bisnis</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -transtone-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-500" />
              <input type="email" placeholder="nama@perusahaan.com" className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -transtone-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-500" />
              <input type="password" placeholder="••••••••" className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="flex-1 flex items-center justify-center gap-3 py-3 border border-stone-100 dark:border-stone-700 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-all">
            <div className="w-5 h-5 bg-stone-900 dark:bg-white rounded-full flex items-center justify-center text-[10px] text-white dark:text-stone-900 font-black">G</div>
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-3 py-3 border border-stone-100 dark:border-stone-700 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-all">
            <Apple className="w-5 h-5 text-stone-900 dark:text-white" />
            <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Apple</span>
          </button>
        </div>

        <button 
          onClick={() => setView('login')}
          className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black shadow-[0_15px_30px_-5px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all mb-8"
        >
          Masuk
        </button>

        <div className="flex items-center justify-between text-xs font-bold">
          <a href="#" className="text-brand-primary hover:underline">Lupa kata sandi?</a>
          <p className="text-stone-400 dark:text-stone-500">Belum punya akun? <button onClick={() => setView('signup')} className="text-brand-primary hover:underline">Daftar</button></p>
        </div>
      </motion.div>

      {/* Registration Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-stone-800 rounded-[32px] p-10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15),0_40px_80px_-30px_rgba(40,167,69,0.1)] dark:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5),0_40px_80px_-30px_rgba(40,167,69,0.15)] border border-stone-50 dark:border-stone-700 relative z-10"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-black text-stone-900 dark:text-white mb-2 tracking-tight">Mulai Bisnis Anda Gratis</h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium">Bangun landing page pertama Anda dalam 30 detik.</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nama Bisnis</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -transtone-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-500" />
              <input type="text" placeholder="Contoh: Digital Agency X" className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -transtone-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-500" />
              <input type="email" placeholder="nama@bisnis.com" className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Kategori Usaha</label>
            <div className="relative">
              <ChevronDown className="absolute right-4 top-1/2 -transtone-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-500 pointer-events-none" />
              <select className="w-full bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-700 rounded-2xl py-4 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-inner appearance-none dark:text-white">
                <option>Pilih Kategori...</option>
                <option>Agensi</option>
                <option>Kafe & Restoran</option>
                <option>Ritel & Toko</option>
                <option>Firma Hukum</option>
                <option>Studio Kreatif</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setView('signup')}
          className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black shadow-[0_20px_40px_-10px_rgba(0,102,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
        >
          Buat Akun Sekarang
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-stone-400 uppercase tracking-widest">
          <Zap className="w-3 h-3 text-brand-green" />
          Tanpa kartu kredit. Batalkan kapan saja.
        </div>
      </motion.div>

      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -transtone-x-1/2 -transtone-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="py-20 px-6 border-t border-stone-100 dark:border-stone-800 bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute top-0 left-1/2 -transtone-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-700 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div 
            className="flex items-center gap-3 mb-8 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-[0_8px_25px_-5px_rgba(0,98,255,0.4)] group-hover:scale-110 transition-transform">
              <Cpu className="text-white w-7 h-7 relative z-10" />
            </div>
            <span className="text-xl font-black tracking-tighter text-stone-900 dark:text-white">UNI-LandFarm</span>
          </div>
          <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed mb-8 font-medium">
            Platform revolusioner untuk membangun dan mengelola ekosistem digital bisnis modern dengan kekuatan Agentic AI.
          </p>
          <div className="flex gap-4">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <motion.a 
                key={i} 
                href="#" 
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all shadow-sm hover:shadow-primary"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-stone-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Platform</h4>
          <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400 font-medium">
            <li><button onClick={() => setView('features')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Fitur Utama <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('templates')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Pustaka Template <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('cms')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Agentic AI CMS <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('signup')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Integrasi API <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-stone-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Sumber Daya</h4>
          <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400 font-medium">
            <li><button onClick={() => setView('about')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Tentang Kami <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Blog Bisnis <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Pusat Bantuan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Komunitas <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-stone-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Legal</h4>
          <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400 font-medium">
            <li><a href="#" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Kebijakan Privasi <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Ketentuan Layanan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">Kebijakan Cookie <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -transtone-x-2 group-hover:transtone-x-0 transition-all" /></a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-stone-100 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-stone-400 dark:text-stone-500 text-xs font-medium">
          © 2026 Platform UNI-LandFarm. Hak cipta dilindungi undang-undang.
        </p>
        <div className="flex gap-8 text-[10px] text-stone-400 dark:text-stone-500 font-black uppercase tracking-widest">
          <a href="#" className="hover:text-brand-primary transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Ketentuan Layanan</a>
        </div>
      </div>
    </div>
  </footer>
);

const HowItWorks = ({ setView }: { setView: (v: string) => void }) => {
  const steps = [
    {
      number: "01",
      title: "Generate Instan",
      desc: "Masukkan nama dan jenis usaha Anda. AI kami akan membangun struktur situs web lengkap dalam hitungan detik.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      number: "02",
      title: "Integrasi Data",
      desc: "Hubungkan basis pengetahuan atau data bisnis Anda untuk memberikan konteks yang akurat pada AI.",
      icon: <Database className="w-5 h-5" />
    },
    {
      number: "03",
      title: "Otomatisasi Cerdas",
      desc: "Agentic AI akan mengelola pembaruan konten dan strategi pemasaran secara otonom.",
      icon: <Bot className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-stone-50 to-white dark:from-stone-800 dark:to-stone-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
            >
              Workflow
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-black text-stone-900 dark:text-white mb-6 tracking-tighter leading-none">
              Dari Pembuatan Instan Hingga <span className="text-brand-primary">Otomatisasi Cerdas</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-base font-medium leading-relaxed">
              Alur kerja yang disederhanakan untuk membawa bisnis Anda ke era digital tanpa hambatan teknis.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative items-stretch">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-0 w-full h-px bg-stone-100 dark:bg-stone-800 -z-10"></div>
          
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group h-full"
            >
              <div className="bg-white dark:bg-stone-800 p-8 rounded-[32px] border border-stone-100 dark:border-stone-700 shadow-premium group-hover:border-brand-primary/20 transition-all group-hover:shadow-premium-hover h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-500">
                    {s.icon}
                  </div>
                  <span className="text-5xl font-black text-stone-50 dark:text-stone-800/50 group-hover:text-brand-primary/5 transition-colors leading-none">
                    {s.number}
                  </span>
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed font-medium flex-1">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardView = ({ 
  setView,
  tokenBalance,
  setTokenBalance,
  unlockedTemplates,
  setUnlockedTemplates,
  buyTokens,
  setIsLoggedIn,
  setSelectedPack
}: { 
  setView: (v: string) => void,
  tokenBalance: number,
  setTokenBalance: (v: number | ((prev: number) => number)) => void,
  unlockedTemplates: string[],
  setUnlockedTemplates: (v: string[] | ((prev: string[]) => string[])) => void,
  buyTokens: (amount: number) => void,
  setIsLoggedIn: (v: boolean) => void,
  setSelectedPack: (p: any) => void
}) => {
  const [subView, setSubView] = useState('overview');
  const [activeDashboardFilter, setActiveDashboardFilter] = useState("Semua");

  const menuItems = [
    { id: 'overview', icon: <LucideLineChart className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'cms', icon: <Bot className="w-5 h-5" />, label: 'AI CMS' },
    { id: 'builder', icon: <Zap className="w-5 h-5" />, label: 'AI Generator' },
    { id: 'templates', icon: <Layout className="w-5 h-5" />, label: 'Template' },
    { id: 'integrations', icon: <Layers className="w-5 h-5" />, label: 'Integrasi' },
    { id: 'billing', icon: <Banknote className="w-5 h-5" />, label: 'Beli Token' },
  ];

  const [cmsStep, setCmsStep] = useState(1); // 1: Input, 2: Planning, 3: Review, 4: Refinement
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [showGeneratedResult, setShowGeneratedResult] = useState(false);
  const [genStep, setGenStep] = useState(1); // 1: Creating Web, 2: Result
  const [businessData, setBusinessData] = useState({
    name: '',
    product: '',
    target: '',
    goal: 'jualan', // jualan / branding
    tone: 'persuasive'
  });
  const [agenticStrategy, setAgenticStrategy] = useState<any>(null);
  const [generatedDraft, setGeneratedDraft] = useState<any>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [userFeedback, setUserFeedback] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const checkToken = (cost: number) => {
    if (tokenBalance < cost) {
      alert(`Saldo token tidak cukup. Anda butuh ${cost} token.`);
      setSubView('billing'); // Redirect to billing or shop
      return false;
    }
    return true;
  };

  const handleCreateRancangan = () => {
    if (!businessData.name || !businessData.product) {
      alert('Mohon isi nama bisnis dan produk Anda.');
      return;
    }

    const cost = 5;
    if (!checkToken(cost)) return;

    setTokenBalance(prev => prev - cost);
    setCmsStep(2); // Move to Planning
    // Simulate AI creating the plan
    setTimeout(() => {
      setAgenticStrategy({
        persona: `Pakar ${businessData.product} yang Terpercaya`,
        valueProp: `Solusi ${businessData.product} terbaik untuk ${businessData.target}`,
        tone: businessData.tone,
        sections: [
          { title: 'Hero Section', content: 'Headline emosional & CTA Utama' },
          { title: 'Benefit Section', content: '3 Keunggulan Utama Produk' },
          { title: 'Product Showcase', content: 'Visual & Deskripsi Detail' },
          { title: 'Social Proof', content: 'Testimoni Pelanggan' },
          { title: 'Final CTA', content: 'Tombol WhatsApp & Penawaran Terbatas' }
        ],
        copy: {
          headline: `${businessData.product} Premium: Solusi Tepat untuk ${businessData.target} 🚀`,
          subheadline: `Nikmati kemudahan dan kualitas terbaik dari ${businessData.name}. Dirancang khusus untuk memenuhi kebutuhan ${businessData.target}.`,
          cta: businessData.goal === 'jualan' ? 'Pesan Sekarang via WhatsApp' : 'Konsultasi Gratis Sekarang'
        }
      });
    }, 1500);
  };

  const handleGenerateWeb = () => {
    const cost = 10;
    if (!checkToken(cost)) return;

    setTokenBalance(prev => prev - cost);
    setSubView('builder');
    setIsGenerating(true);
    setShowGeneratedResult(false);
    setGenStep(1);
    setGenProgress(0);

    // Step 1: Receiving Instructions (1s)
    setTimeout(() => {
      setGenStep(2);
      setGenProgress(33);
    }, 1000);

    // Step 2: Building Visuals (1.5s)
    setTimeout(() => {
      setGenProgress(66);
    }, 2500);

    // Step 3: Result (3.5s)
    setTimeout(() => {
      const draft = {
        ...agenticStrategy.copy,
        url: `uni-landfarm.ai/${businessData.name.toLowerCase().replace(/\s+/g, '-')}`,
        sections: agenticStrategy.sections.map((s: any) => s.title)
      };
      setGeneratedDraft(draft);
      setVersions(prev => [draft, ...prev]);
      setIsGenerating(false);
      setShowGeneratedResult(true);
      setGenProgress(100);
      setGenStep(3);
    }, 3500);
  };

  const applySuggestion = (suggestion: string) => {
    const cost = 2;
    if (!checkToken(cost)) return;

    setTokenBalance(prev => prev - cost);
    setSelectedSuggestion(suggestion);
    // Update strategy based on suggestion
    const updatedStrategy = { ...agenticStrategy };
    if (suggestion.includes('Testimoni')) {
      updatedStrategy.copy.subheadline += " Dipercaya oleh ribuan pelanggan puas.";
    } else if (suggestion.includes('Headline')) {
      updatedStrategy.copy.headline = "Kualitas Terbaik, Harga Terjangkau untuk Keluarga Anda ✨";
    }
    setAgenticStrategy(updatedStrategy);
    handleGenerateWeb();
  };

  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      alert(`Situs Anda telah dipublikasikan di: https://${generatedDraft.url}`);
    }, 2000);
  };

  const resetWorkflow = () => {
    setBusinessData({
      name: '',
      product: '',
      target: '',
      goal: 'jualan',
      tone: 'persuasive'
    });
    setAgenticStrategy(null);
    setGeneratedDraft(null);
    setCmsStep(1);
    setGenStep(1);
    setShowGeneratedResult(false);
    setIsPublished(false);
    setSubView('cms');
  };
  const [integrations, setIntegrations] = useState([
    { name: "WhatsApp", icon: <MessageSquare className="text-green-500" />, status: "Terhubung", color: "bg-green-50" },
    { name: "Instagram", icon: <Instagram className="text-pink-500" />, status: "Hubungkan", color: "bg-pink-50" },
    { name: "Facebook", icon: <Facebook className="text-amber-600" />, status: "Terhubung", color: "bg-blue-50" },
    { name: "Google Maps", icon: <MapPin className="text-red-500" />, status: "Terhubung", color: "bg-red-50" },
    { name: "TikTok", icon: <Music2 className="text-stone-900" />, status: "Hubungkan", color: "bg-stone-100" },
    { name: "Shopee", icon: <ShoppingBag className="text-orange-600" />, status: "Hubungkan", color: "bg-orange-50" },
    { name: "Tokopedia", icon: <ShoppingBag className="text-green-600" />, status: "Hubungkan", color: "bg-green-50" },
    { name: "Midtrans", icon: <CreditCard className="text-amber-500" />, status: "Hubungkan", color: "bg-blue-50" },
  ]);

  const toggleIntegration = (index: number) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].status = newIntegrations[index].status === 'Terhubung' ? 'Hubungkan' : 'Terhubung';
    setIntegrations(newIntegrations);
  };

    const renderSubView = () => {
    switch (subView) {
      case 'overview':
        return (
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-1">Halo, Pebisnis Modern! 👋</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Siap untuk mengotomatisasi ekosistem digital Anda hari ini?</p>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Dashboard", value: "Real-time", icon: <LucideLineChart className="w-5 h-5" />, color: "text-amber-500", bg: "bg-blue-50 dark:bg-amber-500/10" },
                { title: "Total Web", value: "12", icon: <Globe className="w-5 h-5" />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
                { title: "Saldo Token", value: tokenBalance.toLocaleString(), icon: <Zap className="w-5 h-5" />, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-stone-100 dark:border-stone-800 shadow-premium flex items-center justify-between transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{stat.title}</p>
                      <p className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">{stat.value}</p>
                    </div>
                  </div>
                  {stat.title === "Saldo Token" && (
                    <button 
                      onClick={() => setSubView('billing')}
                      className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                    >
                      Top Up
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* AI INSIGHTS FEED */}
                <div className="bg-white dark:bg-stone-900 rounded-[40px] border border-stone-100 dark:border-stone-800 shadow-premium p-8 relative overflow-hidden transition-colors duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      Wawasan Kecerdasan AI
                    </h3>
                    <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2 py-1 rounded-lg uppercase">Analisis Langsung</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div 
                      onClick={() => setSubView('builder')}
                      className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 flex gap-6 items-start group hover:border-brand-primary/20 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-2xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 text-brand-green" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900 dark:text-white mb-1">Peluang Sektor Retail Meningkat</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium leading-relaxed">Analisis kami menunjukkan kenaikan trafik 15% pada sektor retail minggu ini. Pertimbangkan untuk memperbarui katalog produk Anda.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setSubView('cms')}
                      className="p-6 rounded-3xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 flex gap-6 items-start group hover:border-brand-primary/20 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-white dark:bg-stone-800 rounded-2xl shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Bot className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900 dark:text-white mb-1">Optimasi Konten AI</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium leading-relaxed">AI CMS mendeteksi 3 artikel draf yang siap dipublikasikan untuk meningkatkan SEO situs Anda.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECENT PROJECTS (EMPTY STATE) */}
                <div className="bg-white dark:bg-stone-900 p-10 rounded-[40px] border border-stone-100 dark:border-stone-800 shadow-premium text-center flex flex-col items-center justify-center min-h-[300px] transition-colors duration-300">
                  <div className="w-20 h-20 bg-stone-50 dark:bg-stone-800 rounded-[32px] flex items-center justify-center mb-6">
                    <Plus className="w-8 h-8 text-stone-200 dark:text-stone-600" />
                  </div>
                  <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2 tracking-tight">Belum Ada Proyek</h3>
                  <p className="text-stone-400 dark:text-stone-500 text-sm font-medium mb-8">Mulai bangun situs pertama Anda dengan AI Site Generator.</p>
                  <button 
                    onClick={() => setSubView('builder')}
                    className="px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                  >
                    Buat Sekarang
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="space-y-8">
                <div className="bg-brand-primary rounded-[32px] p-8 text-white shadow-xl shadow-brand-primary/20">
                  <Rocket className="w-8 h-8 mb-6" />
                  <h4 className="text-lg font-black tracking-tight mb-2">Siap Meluncur?</h4>
                  <p className="text-amber-100 text-xs font-medium leading-relaxed mb-8">
                    Dapatkan domain kustom dan hapus branding UNI-LandFarm dengan paket Pro.
                  </p>
                  <button 
                    onClick={() => setSubView('billing')}
                    className="w-full py-4 bg-white text-brand-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg"
                  >
                    Upgrade Sekarang
                  </button>
                </div>

                <div className="bg-white dark:bg-stone-900 rounded-[32px] border border-stone-100 dark:border-stone-800 shadow-premium p-8 transition-colors duration-300">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Pusat Sumber Daya</h4>
                  <div className="space-y-4">
                    {[
                      { title: "Panduan Agentic AI", icon: <FileText />, target: 'cms' },
                      { title: "Tips SEO 2024", icon: <TrendingUp />, target: 'cms' },
                      { title: "Integrasi API", icon: <Database />, target: 'integrations' },
                    ].map((res, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSubView(res.target as any)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer transition-all group"
                      >
                        <div className="text-stone-400 group-hover:text-brand-primary transition-colors">
                          {React.cloneElement(res.icon as React.ReactElement, { className: "w-4 h-4" })}
                        </div>
                        <span className="text-xs font-black text-stone-700 dark:text-stone-300">{res.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'templates':
        return (
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight mb-2">Pustaka Template</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Pilih fondasi untuk situs web Anda.</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -transtone-y-1/2 w-4 h-4 text-stone-400" />
                  <input type="text" placeholder="Cari template..." className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white" />
                </div>
                <button className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-400 hover:text-brand-primary transition-all">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {["Semua", "Korporat", "Retail", "Teknologi", "Layanan", "E-commerce"].map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveDashboardFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeDashboardFilter === cat ? 'bg-brand-primary text-white shadow-primary' : 'bg-white dark:bg-stone-900 text-stone-400 border border-stone-100 dark:border-stone-800 hover:border-brand-primary/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeDashboardFilter === "Semua" ? ALL_TEMPLATES : ALL_TEMPLATES.filter(t => t.category === activeDashboardFilter)).map((tpl, i) => (
                <div key={i} className="group relative bg-white dark:bg-stone-900 rounded-[32px] overflow-hidden border border-stone-100 dark:border-stone-800 shadow-premium hover:shadow-hover transition-all">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={tpl.img} alt={tpl.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-6">
                      <button 
                        onClick={() => setSubView('cms')}
                        className="w-full bg-white text-stone-900 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-xl"
                      >
                        Edit Template
                      </button>
                      <button 
                        onClick={() => setPreviewTemplate(tpl)}
                        className="w-full bg-white/20 backdrop-blur-md text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/40 transition-all border border-white/20"
                      >
                        Pratinjau Langsung
                      </button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">{tpl.category}</span>
                      <div className="flex gap-1">
                        <Monitor className="w-3 h-3 text-stone-300 dark:text-stone-600" />
                        <Smartphone className="w-3 h-3 text-stone-300 dark:text-stone-600" />
                      </div>
                    </div>
                    <h4 className="text-base font-black text-stone-900 dark:text-white tracking-tight">{tpl.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* PREVIEW MODAL */}
            {previewTemplate && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
                  onClick={() => setPreviewTemplate(null)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative w-full max-w-5xl h-full bg-white dark:bg-stone-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
                >
                  <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <Layout className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-widest">{previewTemplate.title}</h3>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{previewTemplate.category} • Pratinjau Responsif</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setSubView('cms')}
                        className="bg-brand-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-primary/20"
                      >
                        Gunakan & Edit
                      </button>
                      <button 
                        onClick={() => setPreviewTemplate(null)}
                        className="w-10 h-10 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 bg-stone-100 dark:bg-stone-900/50 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-stone-800 shadow-2xl rounded-2xl overflow-hidden min-h-[1000px]">
                      <img src={previewTemplate.img} alt="Preview" className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
                      <div className="p-12 space-y-8">
                        <div className="space-y-4">
                          <div className="h-4 w-24 bg-brand-primary/10 rounded-full"></div>
                          <div className="h-12 w-3/4 bg-stone-900 dark:bg-white rounded-2xl"></div>
                          <div className="h-4 w-full bg-stone-100 dark:bg-stone-700 rounded-full"></div>
                          <div className="h-4 w-5/6 bg-stone-100 dark:bg-stone-700 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 pt-12">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-4">
                              <div className="aspect-square bg-stone-50 dark:bg-stone-700 rounded-2xl"></div>
                              <div className="h-4 w-1/2 bg-stone-200 dark:bg-stone-600 rounded-full"></div>
                              <div className="h-3 w-full bg-stone-100 dark:bg-stone-700 rounded-full"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        );
      case 'builder':
        return (
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">AI Frontpage Generator</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Membangun situs berdasarkan kerangka cerdas dari Agentic AI.</p>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-stone-900 p-2 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-500 ${genStep === s ? 'bg-brand-primary text-white shadow-primary scale-110' : genStep > s ? 'bg-brand-green/20 text-brand-green' : 'bg-stone-50 dark:bg-stone-800 text-stone-300 dark:text-stone-600'}`}>
                    {genStep > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-0">
              <div className="lg:col-span-7 space-y-10">
                {genStep < 3 && (
                  <div className="space-y-12 animate-in fade-in zoom-in duration-500 py-12">
                    <div className="flex flex-col items-center text-center space-y-8">
                      <div className="relative">
                        <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center animate-pulse">
                          <Zap className="w-16 h-16 text-brand-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-stone-800 rounded-xl shadow-lg flex items-center justify-center">
                          <div className="w-2 h-2 bg-brand-primary rounded-full animate-ping" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
                          {genStep === 1 && "Menerima Instruksi Agentic..."}
                          {genStep === 2 && "Membangun Struktur Visual..."}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 font-medium max-w-md mx-auto leading-relaxed">
                          {genStep === 1 && "Generator sedang memproses rancangan struktur dan strategi konten dari Agentic AI Brain."}
                          {genStep === 2 && "Menyusun elemen UI, warna, dan tipografi berdasarkan persona bisnis yang telah ditentukan."}
                        </p>
                      </div>

                      <div className="w-full max-w-md space-y-2">
                        <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-brand-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${genProgress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-black text-stone-400 uppercase tracking-widest">
                          <span>Generator Execution</span>
                          <span>{genProgress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {genStep === 3 && generatedDraft && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 bg-brand-green/5 rounded-[32px] border border-brand-green/10 flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-8 h-8 text-brand-green" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900 dark:text-white mb-1">Website Berhasil Dibuat!</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium leading-relaxed">Situs Anda telah selesai dibangun berdasarkan spesifikasi dari Agentic AI.</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-stone-900 rounded-[32px] border border-stone-100 dark:border-stone-800 shadow-premium p-8 space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Detail Situs & Strategi</label>
                          <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[9px] font-black rounded-full uppercase tracking-widest">Laporan Eksekusi</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-700">
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Target Market & Persona</p>
                            <p className="text-xs font-bold text-stone-900 dark:text-white leading-relaxed mb-1">{businessData.target}</p>
                            <p className="text-[10px] font-medium text-stone-500 italic">{agenticStrategy?.persona}</p>
                          </div>
                          <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-700">
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Tujuan & Tone</p>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-brand-green/10 text-brand-green text-[8px] font-black rounded uppercase">{businessData.goal}</span>
                              <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[8px] font-black rounded uppercase">{businessData.tone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-6 bg-stone-900 rounded-3xl text-white shadow-xl">
                            <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-3">Copywriting Utama</p>
                            <div className="space-y-4">
                              <div>
                                <p className="text-[8px] font-black text-stone-500 uppercase mb-1">Headline Teroptimasi</p>
                                <p className="text-sm font-black text-white leading-tight">"{generatedDraft.headline}"</p>
                              </div>
                              <div>
                                <p className="text-[8px] font-black text-stone-500 uppercase mb-1">Sub-Headline Strategis</p>
                                <p className="text-[11px] font-medium text-stone-400 leading-relaxed">{generatedDraft.subheadline}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl shadow-sm">
                              <p className="text-[9px] font-black text-brand-primary uppercase mb-2">Call to Action</p>
                              <div className="px-3 py-2 bg-brand-primary rounded-lg text-white text-[10px] font-black text-center">
                                {generatedDraft.cta}
                              </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl shadow-sm">
                              <p className="text-[9px] font-black text-brand-primary uppercase mb-2">Struktur Alur</p>
                              <div className="space-y-1">
                                {generatedDraft.sections.slice(0, 3).map((s: string, idx: number) => (
                                  <p key={idx} className="text-[9px] font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-2 h-2 text-brand-green" /> {s}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            setSubView('cms');
                            setCmsStep(4);
                          }}
                          className="bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 px-8 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-stone-50 transition-all flex items-center gap-3"
                        >
                          <Undo className="w-5 h-5 text-amber-500" /> Perlu Perbaikan?
                        </button>
                        {isPublished && (
                          <button 
                            onClick={resetWorkflow}
                            className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-8 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3"
                          >
                            <Plus className="w-5 h-5" /> Buat Web Lainnya
                          </button>
                        )}
                      </div>
                      {!isPublished && (
                        <button 
                          onClick={handlePublish}
                          disabled={isPublishing}
                          className="bg-brand-primary text-white px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                        >
                          {isPublishing ? 'Mempublikasikan...' : 'Publikasikan Sekarang'} <Globe className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white dark:bg-stone-900 rounded-[40px] border border-stone-100 dark:border-stone-800 shadow-premium p-8 h-full flex flex-col transition-colors duration-300">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-8">Live Preview</h4>
                  <div className="flex-1 bg-stone-50 dark:bg-stone-800/50 rounded-[32px] border-2 border-dashed border-stone-200 dark:border-stone-700 flex flex-col items-center justify-center text-center p-10 group relative overflow-hidden">
                    {showGeneratedResult && generatedDraft ? (
                      <div className="absolute inset-0 bg-white dark:bg-stone-900 flex flex-col z-20 animate-in fade-in zoom-in duration-500">
                        {/* THE RENDERED PREVIEW (REAL LOGIC) */}
                        <div className="flex-1 overflow-y-auto bg-white dark:bg-stone-900 p-6 custom-scrollbar">
                          <div className="max-w-md mx-auto space-y-8 bg-white dark:bg-stone-900">
                            {/* MINI HERO */}
                            <div className="space-y-4 pt-4 border-b border-stone-50 dark:border-stone-800 pb-8 text-left">
                              <div className="w-12 h-1 bg-brand-primary rounded-full mb-4"></div>
                              <h1 className="text-2xl font-black text-stone-900 dark:text-white leading-tight">
                                {generatedDraft.headline}
                              </h1>
                              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 leading-relaxed">
                                {generatedDraft.subheadline}
                              </p>
                              <button className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-primary/20">
                                {generatedDraft.cta}
                              </button>
                            </div>
                            
                            {/* MINI SECTIONS */}
                            <div className="grid grid-cols-2 gap-4">
                              {[1, 2, 3, 4].map(i => (
                                <div key={i} className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-700/50">
                                  <div className="w-6 h-6 bg-white dark:bg-stone-700 rounded-lg mb-3 flex items-center justify-center">
                                    <CheckCircle2 className="w-3 h-3 text-brand-green" />
                                  </div>
                                  <div className="h-2 w-16 bg-stone-200 dark:bg-stone-600 rounded-full mb-2"></div>
                                  <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-700 rounded-full"></div>
                                </div>
                              ))}
                            </div>

                            {/* MINI CTA SECTION */}
                            <div className="p-10 bg-stone-900 dark:bg-brand-primary rounded-[32px] text-center space-y-4">
                              <h2 className="text-sm font-black text-white px-4">Siap Memulai dengan {businessData.name}?</h2>
                              <button className="px-8 py-3 bg-white text-stone-900 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">
                                {generatedDraft.cta}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* URL BAR - ONLY SHOWS AFTER PUBLISHED */}
                        {isPublished && (
                          <div className="p-6 bg-stone-50 dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700">
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Live Website URL</p>
                            <div className="flex items-center justify-between p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
                              <code className="text-[10px] font-bold text-brand-primary truncate mr-2">https://{generatedDraft.url}</code>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(`https://${generatedDraft.url}`);
                                  alert('Link berhasil disalin ke clipboard!');
                                }}
                                className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-all shrink-0"
                              >
                                <Copy className="w-3 h-3 text-stone-400" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-white dark:bg-stone-800 rounded-[24px] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Monitor className="w-10 h-10 text-stone-200 dark:text-stone-600" />
                        </div>
                        <h5 className="text-base font-black text-stone-900 dark:text-white mb-2">Visualisasi Output</h5>
                        <p className="text-xs text-stone-400 dark:text-stone-500 font-medium leading-relaxed">Situs Anda sedang dibangun...</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cms':
        const steps = [
          { id: 1, label: "Input Data", icon: <Target className="w-4 h-4" /> },
          { id: 2, label: "Rancangan", icon: <Layout className="w-4 h-4" /> },
          { id: 3, label: "Review", icon: <Zap className="w-4 h-4" /> },
          { id: 4, label: "Refinement", icon: <Undo className="w-4 h-4" /> },
        ];

        return (
          <div className="max-w-7xl mx-auto flex flex-col h-full gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">Agentic AI Brain</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Mekanisme cerdas untuk merancang kerangka dan strategi situs Anda.</p>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-stone-900 p-2 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm">
                {steps.map((step) => (
                  <button 
                    key={step.id}
                    onClick={() => setCmsStep(step.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${cmsStep === step.id ? 'bg-brand-primary text-white shadow-primary' : 'text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
                  >
                    {step.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
              {/* LEFT PANEL: AI AGENT STATUS */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-stone-900 rounded-[40px] p-8 text-white shadow-2xl border border-stone-800">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center border border-brand-primary/30">
                      <Bot className="w-6 h-6 text-brand-primary animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest">Agentic AI Brain</h4>
                      <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">Mekanisme Cerdas Aktif</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Tugas Saat Ini</p>
                      <p className="text-xs font-medium text-stone-300">
                        {cmsStep === 1 && "Menunggu input data bisnis dari Anda..."}
                        {cmsStep === 2 && "Menyusun rancangan struktur dan strategi konten..."}
                        {cmsStep === 3 && "Meninjau kerangka sebelum dikirim ke Generator..."}
                        {cmsStep === 4 && "Memberikan saran perbaikan berdasarkan feedback..."}
                      </p>
                    </div>

                    {cmsStep === 3 && (
                      <button 
                        onClick={handleGenerateWeb}
                        className="w-full bg-brand-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
                      >
                        Kirim ke AI Generator <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-500">
                      <span>Progres Agentic</span>
                      <span className="text-brand-primary">{cmsStep * 25}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-brand-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${cmsStep * 25}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 rounded-[40px] border border-stone-100 dark:border-stone-800 shadow-premium p-8 flex-1 overflow-hidden flex flex-col transition-colors duration-300">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Insight Strategis</h4>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {[
                      "Target pasar Anda sangat responsif terhadap bukti sosial (testimoni).",
                      "Gaya bahasa persuasif akan meningkatkan konversi hingga 40%.",
                      "Struktur landing page satu halaman lebih efektif untuk produk tunggal.",
                      "CTA WhatsApp memberikan kesan personal dan terpercaya."
                    ].map((saran, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700/50 flex gap-3 items-start group hover:border-brand-primary/20 transition-all">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 font-medium leading-relaxed">{saran}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: WORKSPACE */}
              <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-[40px] border border-stone-100 dark:border-stone-800 shadow-premium flex flex-col overflow-hidden transition-colors duration-300">
                <div className="p-8 border-b border-stone-50 dark:border-stone-800/50 flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                    Workspace: {steps.find(s => s.id === cmsStep)?.label}
                  </h4>
                  <div className="flex items-center gap-3">
                    {cmsStep > 1 && (
                      <button 
                        onClick={() => setCmsStep(cmsStep - 1)}
                        className="px-4 py-2 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-100 transition-all"
                      >
                        Kembali
                      </button>
                    )}
                    {cmsStep < 3 && (
                      <button 
                        onClick={cmsStep === 1 ? handleCreateRancangan : () => setCmsStep(cmsStep + 1)}
                        className="px-6 py-2 bg-brand-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20"
                      >
                        {cmsStep === 1 ? "Buat Rancangan" : "Lanjut ke Review"}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 bg-stone-50/30 dark:bg-stone-900/30">
                  <div className="max-w-3xl mx-auto">
                    {cmsStep === 1 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white dark:bg-stone-800 p-8 rounded-[32px] border border-stone-100 dark:border-stone-700 shadow-sm space-y-8">
                          <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight">Input Data Bisnis</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <p className="text-xs font-black text-stone-700 dark:text-stone-300">Nama Bisnis</p>
                              <input 
                                type="text" 
                                placeholder="Contoh: Frozen food homemade" 
                                value={businessData.name}
                                onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white" 
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-black text-stone-700 dark:text-stone-300">Produk / Jasa</p>
                              <input 
                                type="text" 
                                placeholder="Contoh: Makanan beku sehat" 
                                value={businessData.product}
                                onChange={(e) => setBusinessData({...businessData, product: e.target.value})}
                                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white" 
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-black text-stone-700 dark:text-stone-300">Target Market</p>
                              <input 
                                type="text" 
                                placeholder="Contoh: Ibu rumah tangga" 
                                value={businessData.target}
                                onChange={(e) => setBusinessData({...businessData, target: e.target.value})}
                                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white" 
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-black text-stone-700 dark:text-stone-300">Tujuan Halaman</p>
                              <select 
                                value={businessData.goal}
                                onChange={(e) => setBusinessData({...businessData, goal: e.target.value})}
                                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white"
                              >
                                <option value="jualan">Jualan (Conversion)</option>
                                <option value="branding">Branding (Awareness)</option>
                              </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <p className="text-xs font-black text-stone-700 dark:text-stone-300">Gaya Bahasa (Tone)</p>
                              <div className="flex gap-4">
                                {['formal', 'santai', 'persuasive'].map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setBusinessData({...businessData, tone: t})}
                                    className={`flex-1 p-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all ${businessData.tone === t ? 'bg-brand-primary text-white border-brand-primary shadow-primary' : 'bg-stone-50 dark:bg-stone-900 text-stone-400 border-stone-100 dark:border-stone-800'}`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {cmsStep === 2 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {!agenticStrategy ? (
                          <div className="flex flex-col items-center justify-center py-20 space-y-6">
                            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center animate-spin">
                              <Zap className="w-8 h-8 text-brand-primary" />
                            </div>
                            <p className="text-sm font-black text-stone-400 uppercase tracking-widest">AI Sedang Merancang Kerangka...</p>
                          </div>
                        ) : (
                          <div className="bg-white dark:bg-stone-800 p-8 rounded-[32px] border border-stone-100 dark:border-stone-700 shadow-sm space-y-8">
                            <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight">Rancangan Struktur & Strategi</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="p-6 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-3">Persona Terdeteksi</p>
                                <div className="flex items-center gap-3">
                                  <User className="w-4 h-4 text-brand-primary" />
                                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{agenticStrategy.persona}</span>
                                </div>
                              </div>
                              <div className="p-6 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                                <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-3">Value Proposition</p>
                                <p className="text-[11px] font-bold text-stone-700 dark:text-stone-300 leading-relaxed">"{agenticStrategy.valueProp}"</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Struktur Section Terencana</p>
                              <div className="space-y-3">
                                {agenticStrategy.sections.map((s: any, i: number) => (
                                  <div key={i} className="p-4 rounded-2xl border border-stone-100 dark:border-stone-700 flex items-center justify-between group hover:border-brand-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                      <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-[10px] font-black text-brand-primary">{i+1}</div>
                                      <div>
                                        <h4 className="text-sm font-black text-stone-900 dark:text-white">{s.title}</h4>
                                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{s.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {cmsStep === 3 && agenticStrategy && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white dark:bg-stone-800 rounded-[32px] border border-stone-100 dark:border-stone-700 shadow-sm p-10 space-y-8">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">Review Kerangka Konten</span>
                            <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[9px] font-black uppercase tracking-widest">Siap Generate</span>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Headline Terencana</p>
                              <h1 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">{agenticStrategy.copy.headline}</h1>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Subheadline Terencana</p>
                              <p className="text-base text-stone-500 dark:text-stone-400 font-medium leading-relaxed">{agenticStrategy.copy.subheadline}</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800">
                              <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">CTA Utama</p>
                              <div className="h-10 w-full bg-brand-primary rounded-lg flex items-center justify-center text-[10px] font-black text-white uppercase tracking-widest">
                                {agenticStrategy.copy.cta}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {cmsStep === 4 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white dark:bg-stone-800 p-8 rounded-[32px] border border-stone-100 dark:border-stone-700 shadow-sm space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                              <Undo className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight">Pusat Perbaikan Agentic</h3>
                              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Pilih saran perbaikan dari Agentic AI untuk menyempurnakan situs Anda.</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { title: "Perkuat Headline", desc: "Gunakan kata-kata yang lebih emosional dan menarik.", icon: <Zap className="text-brand-primary" /> },
                              { title: "Tambah Bukti Sosial", desc: "Tambahkan testimoni pelanggan untuk kepercayaan.", icon: <ShieldCheck className="text-brand-green" /> },
                              { title: "Sederhanakan CTA", desc: "Buat tombol aksi lebih menonjol dan jelas.", icon: <MousePointer2 className="text-amber-500" /> },
                              { title: "Optimasi Visual", desc: "Gunakan palet warna yang lebih kontras.", icon: <Layout className="text-purple-500" /> }
                            ].map((s, i) => (
                              <button 
                                key={i}
                                onClick={() => applySuggestion(s.title)}
                                className="p-6 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-100 dark:border-stone-800 text-left hover:border-brand-primary transition-all group"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 bg-white dark:bg-stone-800 rounded-lg flex items-center justify-center shadow-sm">
                                    {React.cloneElement(s.icon as React.ReactElement, { className: "w-4 h-4" })}
                                  </div>
                                  <h4 className="text-sm font-black text-stone-900 dark:text-white group-hover:text-brand-primary transition-colors">{s.title}</h4>
                                </div>
                                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium leading-relaxed">{s.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-[0.3em] mb-4"
              >
                Paket Token
              </motion.div>
              <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-4">Pengisian Token</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-medium max-w-2xl mx-auto">
                Beli token untuk membuka template premium dan generate konten dengan Agentic AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Paket Pemula", tokens: 50, price: "Rp 25.000", desc: "Cocok untuk mencoba fitur dasar AI.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Akses Template Dasar", "Dukungan Komunitas"] },
                { title: "Paket Pertumbuhan", tokens: 250, price: "Rp 100.000", desc: "Untuk bisnis yang aktif berkembang.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Akses Semua Template", "Dukungan Prioritas"], popular: true },
                { title: "Paket Pro", tokens: 1000, price: "Rp 350.000", desc: "Solusi skala besar untuk agensi.", features: ["10 Token / Generate Web", "2 Token / Revisi AI", "Pengaturan Domain Kustom", "Agen AI Khusus"] }
              ].map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white dark:bg-stone-800 p-10 rounded-[40px] shadow-premium border-2 transition-all relative overflow-hidden ${plan.popular ? 'border-brand-primary scale-105 z-10' : 'border-stone-100 dark:border-stone-700'}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-brand-primary text-white px-6 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                      Paling Populer
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2 tracking-tight">{plan.title}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-stone-900 dark:text-white">{plan.price}</span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 font-medium leading-relaxed">{plan.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-medium text-stone-600 dark:text-stone-300">
                        <CheckCircle2 className="w-5 h-5 text-brand-green" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPack(plan);
                      setView('payment');
                    }}
                    className={`w-full py-4 rounded-2xl font-black transition-all ${plan.popular ? 'bg-brand-primary text-white shadow-primary hover:shadow-primary-lg' : 'bg-stone-50 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600'}`}
                  >
                    Beli Token
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="bg-stone-900 dark:bg-stone-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-premium">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full -transtone-y-1/2 transtone-x-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-brand-primary rounded-full text-[9px] font-black uppercase tracking-widest">Saldo Anda</div>
                    <span className="text-2xl font-black tracking-tight">{tokenBalance} Token</span>
                  </div>
                  <p className="text-stone-400 text-sm font-medium max-w-sm">Gunakan token Anda dengan bijak untuk optimasi bisnis Agentic AI.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-1">Status Akun</p>
                    <p className="text-sm font-black text-brand-green uppercase tracking-widest">Aktif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight">Integrasi Aplikasi</h2>
                <p className="text-sm text-stone-500 font-medium">Hubungkan UNI-LandFarm dengan aplikasi bisnis favorit Anda.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -transtone-y-1/2 w-4 h-4 text-stone-400" />
                <input type="text" placeholder="Cari aplikasi..." className="bg-white border border-stone-200 rounded-xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-brand-primary/20 transition-all w-64" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {integrations.map((app, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-premium hover:shadow-hover transition-all group text-center flex flex-col items-center">
                  <div className={`w-20 h-20 ${app.color} rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    {React.cloneElement(app.icon as React.ReactElement, { className: "w-10 h-10" })}
                  </div>
                  <h4 className="text-base font-black text-stone-900 mb-1">{app.name}</h4>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-8">Integrasi Resmi</p>
                  <button 
                    onClick={() => toggleIntegration(i)}
                    className={`w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      app.status === 'Terhubung' ? 'bg-green-50 text-brand-green shadow-sm shadow-green-100' : 'bg-stone-100 text-stone-400 hover:bg-brand-primary hover:text-white'
                    }`}
                  >
                    {app.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-stone-900 tracking-tight mb-2">Pengaturan</h2>
              <p className="text-sm text-stone-500 font-medium">Kelola profil bisnis dan keamanan akun Anda.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* BUSINESS PROFILE */}
                <div className="bg-white rounded-[32px] border border-stone-100 shadow-premium p-8">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-8">Profil Bisnis</h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Nama Bisnis</label>
                        <input type="text" defaultValue="LandFarm Creative" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-brand-primary/20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Website URL</label>
                        <input type="text" defaultValue="landfarm.ai" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-brand-primary/20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Deskripsi Bisnis</label>
                      <textarea rows={4} className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-brand-primary/20 resize-none">
                        Platform universal untuk transformasi digital UMKM di seluruh Indonesia melalui teknologi Agentic AI.
                      </textarea>
                    </div>
                    <div className="pt-4">
                      <button 
                        onClick={() => alert('Perubahan profil berhasil disimpan!')}
                        className="bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-primary hover:scale-105 transition-all"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </div>

                {/* SECURITY */}
                <div className="bg-white rounded-[32px] border border-stone-100 shadow-premium p-8">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-8">Keamanan</h4>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Lock className="w-5 h-5 text-stone-400" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-stone-900">Autentikasi Dua Faktor</p>
                          <p className="text-[10px] font-bold text-stone-400">Amankan akun Anda dengan verifikasi tambahan.</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-stone-200 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  <button 
                    onClick={() => alert('Fitur Ganti Kata Sandi akan segera hadir!')}
                    className="text-brand-primary text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Ganti Kata Sandi
                  </button>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* LOGO UPLOAD */}
                <div className="bg-white rounded-[32px] border border-stone-100 shadow-premium p-8 text-center">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Logo Bisnis</h4>
                  <div className="w-24 h-24 bg-stone-50 rounded-[24px] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center mx-auto mb-6 cursor-pointer hover:border-brand-primary transition-all group">
                    <Upload className="w-6 h-6 text-stone-300 group-hover:text-brand-primary transition-colors" />
                  </div>
                  <p className="text-[10px] text-stone-400 font-bold mb-4">PNG, JPG hingga 5MB</p>
                  <button 
                    onClick={() => alert('Pilih file logo bisnis Anda...')}
                    className="text-brand-primary text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Unggah Baru
                  </button>
                </div>

                {/* TEAM MANAGEMENT */}
                <div className="bg-white rounded-[32px] border border-stone-100 shadow-premium p-8">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Anggota Tim</h4>
                  <div className="space-y-4">
                    {[
                      { name: "Admin Business", role: "Pemilik" },
                      { name: "Sarah AI", role: "Editor" },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-[10px] font-black text-stone-400">
                            {member.name[0]}
                          </div>
                          <div>
                            <p className="text-xs font-black text-stone-900">{member.name}</p>
                            <p className="text-[9px] font-bold text-stone-400 uppercase">{member.role}</p>
                          </div>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-stone-300 cursor-pointer" />
                      </div>
                    ))}
                    <button 
                      onClick={() => alert('Undang anggota tim baru...')}
                      className="w-full py-3 bg-stone-50 rounded-xl text-[10px] font-black text-stone-400 uppercase tracking-widest hover:bg-stone-100 transition-all mt-4"
                    >
                      Undang Anggota
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <MoreHorizontal className="w-10 h-10 text-stone-300" />
            </div>
            <h3 className="text-xl font-black text-stone-900 mb-2">Halaman Sedang Dikembangkan</h3>
            <p className="text-sm text-stone-500 max-w-sm mb-8 font-medium">
              Fitur <span className="text-brand-primary font-black uppercase">{subView}</span> akan segera hadir untuk meningkatkan pengalaman Anda.
            </p>
            <button 
              onClick={() => setSubView('overview')}
              className="px-8 py-3 bg-stone-900 text-white rounded-xl font-black text-xs"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex flex-col font-sans transition-colors duration-300">
      {/* SECTION 1: PERSISTENT HEADER BAR */}
      <header className="sticky top-0 z-50 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 h-16 flex items-center justify-between px-6 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setView('home')}
          >
            <img 
              src="/logo.png" 
              alt="Uni-LandFarm Logo" 
              className="h-12 w-auto object-contain drop-shadow-md" 
            />
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-12">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -transtone-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Cari proyek atau data..." 
              className="w-full bg-stone-100 dark:bg-stone-800 border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-brand-primary/20 transition-all dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 relative">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-stone-200 dark:border-stone-700">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-stone-900 dark:text-white">Akun Pengguna</p>
              <p className="text-[10px] font-bold text-stone-400">Paket Gratis</p>
            </div>
            <div className="w-9 h-9 bg-stone-200 dark:bg-stone-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-white dark:border-stone-800 shadow-sm">
              <User className="w-5 h-5 text-stone-400 dark:text-stone-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SECTION 2: ENRICHED SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col hidden lg:flex transition-colors duration-300">
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-6">
            {menuItems.map((item, i) => (
              <button 
                key={i}
                onClick={() => setSubView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${
                  subView === item.id 
                    ? 'bg-brand-primary/10 text-brand-primary shadow-sm' 
                    : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="px-4 py-2">
            <div className="h-px bg-stone-100 dark:bg-stone-800 w-full" />
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="p-4 space-y-2">
            <button 
              onClick={() => setSubView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black transition-all ${
                subView === 'settings' 
                  ? 'bg-brand-primary/10 text-brand-primary shadow-sm' 
                  : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              Pengaturan
            </button>
            <button 
              onClick={() => {
                setIsLoggedIn(false);
                setView('home');
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>

          <div className="p-4 border-t border-stone-100 dark:border-stone-800">
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-4">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Penyimpanan</p>
              <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-brand-primary w-[65%]" />
              </div>
              <p className="text-[9px] font-bold text-stone-500">650MB dari 1GB digunakan</p>
            </div>
          </div>
        </aside>

        {/* SECTION 3: MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 bg-stone-50/30 dark:bg-stone-900/50 transition-colors duration-300">
          {renderSubView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [unlockedTemplates, setUnlockedTemplates] = useState<string[]>([]);
  const [selectedPack, setSelectedPack] = useState<any>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    if (selectedPack) {
      setView('payment');
    } else {
      setView('dashboard');
    }
  };

  const buyTokens = (amount: number) => {
    setTokenBalance(prev => prev + amount);
    alert(`Pembayaran berhasil! Menambahkan ${amount} token. Saldo sekarang: ${tokenBalance + amount}`);
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero setView={setView} />
            <Features setView={setView} />
            <HowItWorks setView={setView} />
            <TemplatePreview setView={setView} />
            <DashboardPreview setView={setView} />
            <Testimonials />
            <PricingView setView={setView} isLoggedIn={isLoggedIn} setSelectedPack={setSelectedPack} />
            <FAQ />
            <FinalCTA setView={setView} />
          </>
        );
      case 'features':
        return <Features setView={setView} />;
      case 'templates':
        return (
          <TemplatesView 
            setView={setView} 
            tokenBalance={tokenBalance} 
            setTokenBalance={setTokenBalance} 
            unlockedTemplates={unlockedTemplates} 
            setUnlockedTemplates={setUnlockedTemplates} 
          />
        );
      case 'token-shop':
        return <TokenShopView setView={setView} setSelectedPack={setSelectedPack} />;
      case 'payment':
        return <PaymentView setView={setView} selectedPack={selectedPack} buyTokens={buyTokens} setSelectedPack={setSelectedPack} />;
      case 'cms':
        return <DashboardPreview setView={setView} />;
      case 'pricing':
        return <PricingView setView={setView} isLoggedIn={isLoggedIn} setSelectedPack={setSelectedPack} />;
      case 'about':
        return <AboutUsView />;
      case 'login':
        return <LoginView setView={setView} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <SignupView setView={setView} onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        return (
          <DashboardView 
            setView={setView} 
            tokenBalance={tokenBalance} 
            setTokenBalance={setTokenBalance} 
            unlockedTemplates={unlockedTemplates} 
            setUnlockedTemplates={setUnlockedTemplates} 
            buyTokens={buyTokens}
            setIsLoggedIn={setIsLoggedIn}
            setSelectedPack={setSelectedPack}
          />
        );
      default:
        return <Hero setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors duration-300">
      {view !== 'dashboard' && <Navbar setView={setView} currentView={view} isLoggedIn={isLoggedIn} onLogout={() => { setIsLoggedIn(false); setView('home'); }} />}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setView={setView} />
    </div>
  );
}
