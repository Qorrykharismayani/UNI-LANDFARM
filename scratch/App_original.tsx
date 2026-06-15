 import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink,
  PlusSquare,
  TrendingUp,
  Cpu,
  Globe, 
  Link2,
  Zap, 
  Bot, 
  Database, 
  Layout, 
  ChevronRight, 
  BarChart3, 
  LayoutDashboard,
  Upload, 
  MessageSquare,
  MessageCircle,
  FileText,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  ArrowLeft,
  Copy,
  Shield,
  ShieldCheck,
  Share2,
  Folder,
  PieChart,
  Cloud,
  Brain,
  CheckCircle2,
  Search,
  Filter,
  Monitor,
  Smartphone,
  Tablet,
  Heart,
  Briefcase,
  LineChart as LucideLineChart,
  Target,
  FolderOpen,
  FileSearch,
  BarChart as LucideBarChart,
  Leaf,
  ChevronDown,
  Apple,
  Mail,
  Lock,
  Building2,
  Bell,
  User,
  Layers,
  Sparkles,
  MousePointer2,
  Type,
  Image,
  Send,
  Activity,
  Coffee,
  ShoppingBag,
  ShoppingCart,
  Tractor,
  Settings,
  LogOut,
  AlertCircle,
  Eye,
  Plus,
  Minus,
  ArrowUpRight,
  MoreHorizontal,
  Lightbulb,
  CreditCard,
  Truck,
  Wallet,
  Banknote,
  Rocket,
  Facebook,
  MapPin,
  Music2,
  X,
  Undo,
  Redo,
  Undo2,
  Redo2,
  Trash2,
  Moon,
  Sun,
  Download,
  Palette,
  Camera,
  HelpCircle,
  Calendar,
  Clock,
  Edit3,
  Save,
  PenTool,
  Settings2,
  ArrowRightCircle,
  Columns,
  Box,
  Smile,
  Info,
  Package,
  PlusCircle,
  MinusCircle,
  GripVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronUp,
  XCircle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Play,
  Check,
  Maximize2,
  Link,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { generateWebsiteDraft, generateEditorCopy } from './services/ai';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

const Navbar = ({ setView, currentView, theme, toggleTheme }: { setView: (v: string) => void, currentView: string, theme: string, toggleTheme: () => void }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'features', label: 'Features' },
    { id: 'templates', label: 'Templates' },
    { id: 'cms', label: 'CMS' },
    { id: 'pricing', label: 'Pricing' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2 lg:px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(58,134,255,0.5)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            <Cpu className="text-white w-6 h-6 relative z-10" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">Uni-LandFarm</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 ml-8">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)}
              className={`text-[17px] font-bold transition-all flex items-center gap-3 group whitespace-nowrap ${currentView === item.id ? 'text-brand-blue' : 'text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue'}`}
            >
              {item.label}
              <div className={`w-1 h-1 rounded-full bg-brand-blue transition-transform ${currentView === item.id ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-brand-blue transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <div className="hidden lg:flex items-center gap-2">
            <button 
              onClick={() => setView('login')}
              className={`px-6 py-2.5 text-[15px] font-black transition-all ${currentView === 'login' ? 'text-brand-blue' : 'text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-brand-blue'}`}
            >
              Masuk
            </button>
            <button 
              onClick={() => setView('signup')}
              className="px-7 py-2.5 text-[15px] font-black text-white bg-brand-blue rounded-full shadow-blue hover:shadow-blue-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Daftar
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MoreHorizontal className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setView(item.id); setIsMobileMenuOpen(false); }}
                  className={`text-left py-2 font-black text-lg ${currentView === item.id ? 'text-brand-blue' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button 
                  onClick={() => { setView('login'); setIsMobileMenuOpen(false); }}
                  className="py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm"
                >
                  Masuk
                </button>
                <button 
                  onClick={() => { setView('signup'); setIsMobileMenuOpen(false); }}
                  className="py-4 rounded-2xl bg-brand-blue text-white font-black text-sm shadow-blue"
                >
                  Daftar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ setView }: { setView: (v: string) => void }) => (
  <section className="pt-32 pb-48 px-6 overflow-visible relative min-h-[800px] flex items-center transition-colors duration-500 bg-white dark:bg-[#020617]">
    {/* Premium Background & Lighting */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#020617] dark:via-[#030712] dark:to-[#010816] pointer-events-none transition-colors duration-500"></div>
    
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Electric Blue Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-brand-blue/5 dark:bg-brand-blue/25 blur-[180px] transition-colors" 
      />
      
      {/* Secondary Accent Glows */}
      <div className="absolute top-[15%] right-[0%] w-[50%] h-[50%] rounded-full bg-brand-blue/5 dark:bg-brand-blue/15 blur-[160px] transition-colors"></div>
      <div className="absolute bottom-[0%] left-[0%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/15 blur-[140px] transition-colors"></div>
      <div className="absolute top-1/2 right-[10%] w-[25%] h-[25%] rounded-full bg-brand-blue/10 dark:bg-brand-blue/25 blur-[120px] animate-pulse transition-colors"></div>
    </div>

    <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-20 lg:gap-24 items-center relative z-10 pl-2 pr-6 lg:pl-4 lg:pr-16 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-8 shadow-[0_0_25px_rgba(58,134,255,0.15)] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-[11px] font-black tracking-[0.25em] uppercase">AI-Powered Precision • Uni-LandFarm</span>
        </div>
        <h1 className="text-[32px] sm:text-[46px] lg:text-[56px] xl:text-[66px] font-black text-slate-900 dark:text-white leading-[1.15] mb-8 tracking-tight transition-colors">
          Bangun Situs Web <br />
          <span className="text-brand-blue relative inline-block">
            Bisnis Modern
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue/30" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
              <path d="M0 15C50 5 150 5 200 15" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </span> <br />
          dengan AI
        </h1>
        <p className="text-[16px] sm:text-[19px] text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed font-medium transition-colors">
          Buat landing page profesional, toko online, dan konten bisnis secara instan bersama <span className="text-brand-blue font-bold">Uni-LandFarm</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView?.('signup')}
            className="px-8 py-4 text-[15px] font-black text-white bg-brand-blue rounded-2xl shadow-[0_20px_40px_-10px_rgba(58,134,255,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(58,134,255,0.6)] transition-all flex items-center justify-center gap-4 group"
          >
            Buat Situs Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
          <motion.button 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView?.('cms')}
            className="px-8 py-4 text-[15px] font-black text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-xl"
          >
            Lihat Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Illustration - Desktop & Mobile Composition - Scaled Down & Balanced */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
        className="relative perspective-2500"
      >
        <div className="w-full h-full flex items-center justify-center lg:justify-end transform-style-3d">
          
          {/* Main Desktop Mockup - Scaled Down by 20% */}
          <motion.div 
            style={{ rotateX: 6, rotateY: -10 }}
            className="relative z-20 w-full max-w-[450px] xl:max-w-[550px] aspect-[16/13] shrink-0"
          >
            <div className="absolute inset-0 bg-brand-blue/30 blur-[100px] -z-10 scale-125 opacity-50"></div>
            <div className="absolute inset-x-0 -bottom-10 h-24 bg-brand-blue/40 blur-[90px] -z-10 scale-110 opacity-50"></div>
            
            {/* Laptop Frame */}
            <div className="w-full h-full bg-[#0f172a] rounded-[32px] p-2.5 shadow-[0_80px_150px_-40px_rgba(0,0,0,0.9),0_0_100px_rgba(58,134,255,0.3)] border border-slate-700/50 overflow-hidden relative group">
              {/* Screen Content */}
              <div className="w-full h-full bg-white rounded-[22px] overflow-hidden flex flex-col shadow-inner">
                {/* Browser UI */}
                <div className="h-9 bg-slate-50 border-b border-slate-100 px-5 flex items-center justify-between shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="px-4 py-0.5 bg-white border border-slate-200 rounded-md flex items-center gap-1.5">
                    <Globe className="w-2.5 h-2.5 text-brand-blue" />
                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest leading-none">velo-x.co.id</span>
                  </div>
                  <div className="w-4"></div>
                </div>                {/* Website Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar-slim p-0">
                  {/* Website Nav */}
                  <div className="px-5 py-3 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-slate-950 rounded-md flex items-center justify-center">
                        <Zap className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-[8px] font-black tracking-tight text-slate-950 uppercase">VELO-X</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      {['Model', 'Toko', 'Komunitas'].map(m => (
                        <span key={m} className="text-[6px] font-black text-slate-500 uppercase tracking-widest leading-none">{m}</span>
                      ))}
                      <ShoppingBag className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Hero Section - Scaled Down */}
                  <div className="px-5 pt-3 pb-4">
                    <div className="relative h-36 lg:h-44 rounded-[16px] bg-[#f8fafc] overflow-hidden group border border-slate-100">
                      <img 
                        src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200" 
                        alt="Bike" 
                        className="absolute inset-y-0 -left-[10%] w-[120%] h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-center bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent">
                        <span className="text-[6px] lg:text-[8px] text-brand-blue font-black uppercase tracking-[0.3em] mb-1 leading-none">Seri Elit 2024</span>
                        <h2 className="text-[11px] lg:text-[14px] font-black text-white max-w-[130px] lg:max-w-[170px] mb-2 leading-[1.2] tracking-tighter">
                          SEPEDA MODERN <br /> MOBILITAS HARIAN.
                        </h2>
                        <div className="w-16 h-5 lg:w-20 lg:h-6 bg-brand-blue rounded-md flex items-center justify-center shadow-lg shadow-brand-blue/30 border border-brand-blue/40 hover:bg-brand-blue/90 cursor-pointer transition-colors">
                          <span className="text-[5px] lg:text-[7px] text-white font-black uppercase tracking-widest">Beli Sekarang</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categories Row - Added Structure */}
                  <div className="px-5 pb-4">
                    <div className="flex gap-2 py-1">
                      {['Urban', 'Road', 'Mountain', 'Electric'].map((cat) => (
                        <div key={cat} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                          <span className="text-[5px] font-bold text-slate-500 uppercase tracking-tighter">{cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shop Section - Scaled Down */}
                  <div className="px-5 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[8px] font-black text-slate-950 uppercase tracking-tight">Koleksi Unggulan</h3>
                      <div className="w-10 h-0.5 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { name: "Terrain X2", price: "Rp 12.5jt", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600" },
                        { name: "Urban Glide", price: "Rp 8.7jt", img: "https://images.unsplash.com/photo-1576433734880-9f55f2c9847b?auto=format&fit=crop&q=80&w=600" },
                        { name: "Road Pro", price: "Rp 15.2jt", img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600" }
                      ].map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                          <div className="aspect-square rounded-[12px] bg-slate-50 mb-1.5 overflow-hidden relative border border-slate-100">
                            <img src={item.img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <h4 className="font-black text-slate-900 text-[6px] mb-0.5 uppercase tracking-tighter leading-tight">{item.name}</h4>
                          <p className="text-brand-blue text-[5px] font-bold">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Mobile Smartphone Mockup - Fully Visible & Scaled Down */}
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, rotateZ: 4, y: [0, -12, 0] }}
            style={{ translateZ: 100, rotateX: 4, rotateY: 15 }}
            transition={{ 
              opacity: { delay: 1, duration: 0.8 },
              rotateZ: { delay: 1, duration: 1 },
              x: { delay: 1, duration: 0.8 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -right-6 lg:-right-10 bottom-[-15px] z-30 w-[125px] lg:w-[155px] aspect-[9/19] shrink-0"
          >
            {/* Phone Frame */}
            <div className="w-full h-full bg-[#0f172a] rounded-[36px] p-2 shadow-[0_60px_120px_rgba(0,0,0,0.8),0_0_80px_rgba(58,134,255,0.4)] border border-slate-700/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-blue/20 blur-[50px] -z-10 pointer-events-none"></div>
              <div className="w-full h-full bg-white rounded-[30px] overflow-hidden flex flex-col">
                {/* Home Indicator Notch */}
                <div className="h-5 bg-slate-950 shrink-0 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                </div>

                {/* Mobile App View */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                  <div className="px-3 py-3 border-b border-slate-50 flex items-center justify-between">
                    <Zap className="w-3.5 h-3.5 text-brand-blue" />
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar-slim">
                    <div className="relative h-28 bg-slate-950 shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-3 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 to-transparent">
                        <span className="text-[4px] text-brand-blue font-black uppercase tracking-[0.2em] mb-1 leading-none">Edisi 2024</span>
                        <h3 className="text-[10px] font-black text-white leading-tight mb-2 uppercase tracking-tighter">SEPEDA <br /> IMPIAN <br /> ANDA.</h3>
                        <div className="h-5 w-12 bg-brand-blue rounded-md flex items-center justify-center shadow-lg shadow-brand-blue/20">
                          <span className="text-[5px] text-white font-black uppercase tracking-widest">Beli</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                       <div className="text-[6px] font-black text-slate-900 uppercase mb-1">Populer</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-16 bg-slate-50 rounded-[12px] p-1.5 flex flex-col border border-slate-100">
                            <div className="flex-1 bg-white rounded-lg border border-slate-100 overflow-hidden mb-1">
                              <img 
                                src={i === 1 ? "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&auto=format&fit=crop" : "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=400&auto=format&fit=crop"} 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer" 
                              />
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded-full mb-0.5"></div>
                            <div className="w-2/3 h-0.5 bg-brand-blue rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* iOS Home Indicator */}
                  <div className="h-5 bg-slate-50 flex items-center justify-center shrink-0 border-t border-slate-100">
                    <div className="w-10 h-1 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Sparkle Float Icon - Adjusted for Smaller Layout */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={{ 
              scale: { delay: 1.5, duration: 0.5 },
              opacity: { delay: 1.5, duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute left-[78%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-40 lg:block hidden"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-blue blur-3xl opacity-60"></div>
              <div className="relative w-14 h-14 bg-white rounded-2xl shadow-[0_20px_40px_-5px_rgba(58,134,255,0.3)] flex items-center justify-center border border-brand-blue/30 backdrop-blur-xl">
                <Sparkles className="w-7 h-7 text-brand-blue animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);
const Features = ({ setView }: { setView?: (v: string) => void }) => {
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
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            CAPABILITIES
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight max-w-4xl mx-auto transition-colors">
            Fitur <span className="text-brand-blue drop-shadow-[0_0_20px_rgba(58,134,255,0.4)]">Unggulan</span>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-brand-blue hover:border-brand-blue hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button 
            ref={swiperNextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-center text-white hover:bg-brand-blue hover:border-brand-blue hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shadow-xl"
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
                    
                    {/* Number - Top Right */}
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

const TemplatePreview = ({ setView }: { setView: (v: string) => void }) => (
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
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          Pustaka Template
        </motion.div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Pilih Template Bisnis Anda</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed transition-colors">
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
            className="bg-white dark:bg-slate-800 rounded-[32px] shadow-premium border border-slate-100 dark:border-slate-700 overflow-hidden group cursor-pointer hover:shadow-premium-hover transition-all"
          >
            {/* Browser Header */}
            <div className="bg-slate-50 dark:bg-slate-900 px-5 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              </div>
              <div className="ml-4 bg-white dark:bg-slate-800 rounded-md px-3 py-1 text-[9px] font-bold text-slate-400 dark:text-slate-500 w-full flex items-center gap-2 border border-slate-100 dark:border-slate-700">
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
              <div className="absolute inset-x-4 bottom-4 glass-card p-5 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-[9px] font-black text-brand-blue uppercase tracking-[0.3em] mb-1.5">{t.type}</p>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.title}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setView('templates')}
                    className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Detail
                  </button>
                  <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setView('signup');
                    }}
                    className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-brand-blue rounded-lg shadow-blue"
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

const TemplatesView = ({ setView }: { setView: (v: string) => void }) => {
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
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            Pustaka Template
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">Pilih Template Bisnis Anda</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed transition-colors">
            Desain profesional yang siap pakai untuk berbagai sektor bisnis modern. Jelajahi pustaka templat kami yang luas, dirancang khusus untuk memenuhi kebutuhan unik industri Anda.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["Semua", "Korporat", "Retail", "Teknologi", "Layanan", "E-commerce"].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-brand-blue text-white shadow-blue' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300'}`}
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
              <div className="ml-4 bg-white dark:bg-slate-800 rounded-md px-3 py-1 text-[9px] font-bold text-slate-400 dark:text-slate-500 w-full flex items-center gap-2 border border-slate-100 dark:border-slate-700">
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
              <div className="absolute inset-x-4 bottom-4 glass-card p-5 rounded-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-[9px] font-black text-brand-blue uppercase tracking-[0.3em] mb-1.5">{t.type}</p>
                <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2 tracking-tight">{t.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 font-medium">{t.desc}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Detail
                  </button>
                  <button 
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setView('signup');
                    }}
                    className="flex-1 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-brand-blue rounded-lg shadow-blue"
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

const Testimonials = () => {
  const testimonials = [
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
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
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

const CMSLandingView = ({ setView }: { setView: (v: string) => void }) => {
  const features = [
    { num: "01", title: "AI Agent Panel", desc: "Interaksi real-time dengan asisten otonom untuk manajemen konten.", icon: <MessageSquare className="w-5 h-5" /> },
    { num: "02", title: "Knowledge Base", desc: "Unggah data bisnis Anda untuk kustomisasi AI yang sangat spesifik.", icon: <Upload className="w-5 h-5" /> },
    { num: "03", title: "Data Visualization", desc: "Visualisasi data real-time untuk pengambilan keputusan yang lebih cepat.", icon: <LucideLineChart className="w-5 h-5" /> }
  ];

  return (
    <section id="cms-section" className="py-24 lg:py-32 px-8 bg-white dark:bg-[#020617] text-slate-900 dark:text-white relative overflow-hidden font-sans border-t border-slate-200 dark:border-white/5 transition-all duration-300">
      {/* Background Decorative Glows */}
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] -z-10 rounded-full"></div>
      
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-[48%_52%] gap-12 lg:gap-16 items-center relative z-10 lg:px-6">
        {/* LEFT COLUMN */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-blue animate-pulse" />
              CMS DASHBOARD
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">
              CMS Kuat dengan <br />
              <span className="text-brand-blue">Kecerdasan Bisnis AI</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed max-w-lg transition-colors">
              Kelola seluruh ekosistem digital bisnis Anda dengan bantuan AI yang proaktif. Dari analisis pasar hingga penjadwal konten pemasaran otomatis.
            </p>
          </div>
          
          {/* Feature List */}
          <div className="space-y-6">
            {features.map((item, i) => (
              <div 
                key={i}
                className="flex items-start gap-5 group transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-brand-blue/40 group-hover:text-brand-blue transition-all duration-300 shrink-0">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-lg font-black text-slate-900/90 dark:text-white/90 group-hover:text-brand-blue transition-colors tracking-tight leading-tight">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-sm transition-colors group-hover:text-slate-800 dark:group-hover:text-slate-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="pt-2"
          >
            <button 
              onClick={() => setView('signup')}
              className="px-8 py-3.5 bg-brand-blue text-white rounded-xl font-black text-[12px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-[0_15px_30px_-10px_rgba(58,134,255,0.4)]"
            >
              Mulai Kelola Sekarang
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - Dashboard Mockup (Smaller & More Detailed) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.7, x: 50 }}
          whileInView={{ opacity: 1, scale: 0.85, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative group w-full lg:-mr-32 xl:-mr-40"
        >
          {/* Enhanced Blue Light Glow Effect */}
          <div className="absolute -inset-20 bg-brand-blue/30 blur-[100px] -z-10 rounded-full animate-pulse-slow"></div>
          <div className="absolute -inset-60 bg-brand-blue/15 blur-[150px] -z-10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[140%] bg-cyan-400/15 blur-[160px] -z-10 rounded-[100px] animate-pulse-slow"></div>
          <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-brand-blue/20 blur-[200px] -z-10 rounded-full animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 blur-[140px] -z-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-blue/30 blur-[140px] -z-10 rounded-full"></div>
          <div className="absolute -bottom-60 -right-40 w-[700px] h-[700px] bg-brand-blue/10 blur-[220px] -z-10 rounded-full animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-brand-blue/5 blur-[80px] -z-10 rounded-[48px]"></div>
                   {/* Dashboard Container */}
          <div className="bg-[#020617] rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_0_40px_rgba(58,134,255,0.15)] overflow-hidden flex flex-col w-full aspect-[1.4/1] md:aspect-[1.2/1] border border-white/5 relative">
            {/* Top Bar (Mac Style) */}
            <div className="h-14 px-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">PREMIUM AI DASHBOARD</div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-20 border-r border-white/5 bg-black/20 py-8 flex flex-col items-center gap-10 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-[0_0_20px_rgba(58,134,255,0.5)]">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col gap-8">
                  {[BarChart3, Bot, Database, Image, Zap].map((Icon, idx) => (
                    <div key={idx} className="text-slate-500 hover:text-brand-blue transition-colors cursor-pointer group/nav">
                      <Icon className="w-5 h-5 group-hover/nav:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1 overflow-hidden flex flex-col bg-[#020617]">
                {/* Header Section */}
                <div className="p-8 pb-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-white font-black text-xl tracking-tight">PRODUKTIVITAS BISNIS</h2>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase opacity-60">DASHBOARD UTAMA â€¢ LIVE ANALYTICS</p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <span>MINGGUAN</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
                
                {/* Main Content Scrollable */}
                <div className="px-6 pb-6 space-y-4 overflow-visible">
                   {/* Top Summary Cards */}
                   <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: 'KUNJUNGAN', val: '4.2k', trend: 'â†‘ 18%', color: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]' },
                        { label: 'SKOR SEO', val: '92', trend: 'Optimal', color: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]' },
                        { label: 'AGEN AI', val: '24', trend: 'Online', color: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(192,132,252,0.1)]' },
                        { label: 'POSTINGAN', val: '12', trend: 'Auto', color: 'text-brand-blue', glow: 'shadow-[0_0_20px_rgba(58,134,255,0.1)]' }
                      ].map((card, i) => (
                        <div key={i} className={`p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2 hover:border-white/10 transition-all cursor-default group relative overflow-hidden backdrop-blur-sm ${card.glow}`}>
                           <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none">{card.label}</p>
                           <h6 className="text-lg font-black text-white leading-none">{card.val}</h6>
                           <span className={`text-[7px] font-bold ${card.color} tracking-wider`}>{card.trend}</span>
                        </div>
                      ))}
                   </div>
                   
                   <div className="grid grid-cols-[1.5fr_1fr] gap-6">
                      {/* Growth Analytics Card */}
                      <div className="bg-white/[0.03] rounded-3xl border border-white/5 p-6 flex flex-col gap-4 relative overflow-hidden group">
                         <div className="flex items-center justify-between">
                            <h5 className="font-black text-slate-400 text-[9px] uppercase tracking-widest">ANALITIK PERTUMBUHAN</h5>
                            <div className="px-2 py-1 bg-white/5 rounded-md text-[7px] font-black text-slate-500">7 Hari</div>
                         </div>
                         
                         {/* SVG Line Chart Mockup */}
                         <div className="relative h-32 w-full mt-4">
                            <svg viewBox="0 0 400 100" className="w-full h-full">
                               {/* Grid lines */}
                               {[20, 40, 60, 80].map((y) => (
                                 <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="4 4" />
                               ))}
                               {/* Data Line */}
                               <motion.path
                                 d="M0,80 Q50,70 80,85 T160,60 T240,75 T320,50 T400,30"
                                 fill="none"
                                 stroke="url(#blue-glow)"
                                 strokeWidth="3"
                                 initial={{ pathLength: 0 }}
                                 whileInView={{ pathLength: 1 }}
                                 transition={{ duration: 2, ease: "easeInOut" }}
                               />
                               {/* Points */}
                               <circle cx="400" cy="30" r="4" fill="#3a86ff" className="animate-pulse shadow-[0_0_10px_#3a86ff]" />
                               <defs>
                                 <linearGradient id="blue-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3a86ff" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#3a86ff" />
                                 </linearGradient>
                               </defs>
                            </svg>
                            <div className="absolute bottom-0 w-full flex justify-between text-[6px] font-black text-slate-600 uppercase tracking-widest mt-2 px-1">
                               <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                            </div>
                         </div>
                      </div>

                      {/* AI Insights Card */}
                      <div className="bg-gradient-to-br from-[#0a0f1e] to-[#020617] rounded-3xl border border-brand-blue/10 p-6 flex flex-col gap-4 relative overflow-hidden group">
                         <div className="flex items-center gap-2">
                           <h5 className="font-black text-brand-blue text-[9px] uppercase tracking-widest">INSIGHT AI</h5>
                           <Zap className="w-3 h-3 text-brand-blue animate-pulse" />
                         </div>
                         
                         <div className="space-y-1 relative z-10">
                            <p className="text-[11px] font-black text-slate-300 leading-relaxed uppercase tracking-tight">OPTIMASI METADATA UNTUK SEO MAKSIMAL & JANGKAUAN LUAS.</p>
                         </div>

                         {/* AI Face Mockup */}
                         <div className="mt-auto flex justify-end">
                            <div className="relative">
                               <Bot className="w-20 h-20 text-brand-blue/20 rotate-12" />
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full blur-[2px] animate-pulse"></div>
                                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full blur-[2px] animate-pulse"></div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Floating Top Revenue Card */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -top-6 -right-6 bg-[#0a0f1e] backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 z-30"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-blue">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">REVENUE GROWTH</p>
              <h6 className="text-sm font-black text-white leading-none">+28.5%</h6>
            </div>
          </motion.div>

          {/* Floating Bottom AI Status */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-8 -left-8 bg-[#0a0f1e] backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-4 z-30"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-brand-blue animate-spin"></div>
              <div className="absolute inset-2 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
              </div>
            </div>
            <div>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">AI STATUS</p>
              <h6 className="text-[10px] font-black text-brand-blue leading-none">SYSTEM READY</h6>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const CMSPreview = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-20 px-6 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30 mb-6 uppercase tracking-widest text-[9px] font-black shadow-[0_0_20px_rgba(58,134,255,0.1)] transition-colors">
          <Bot className="w-3.5 h-3.5" />
          Modern Agentic AI CMS
        </div>
        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight uppercase transition-colors">
          CMS Kuat dengan <br />
          <span className="text-brand-blue">Kecerdasan Bisnis AI</span>
        </h2>
        <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium transition-colors">
          Kelola seluruh ekosistem digital bisnis Anda dengan bantuan AI yang proaktif. Dari analisis pasar hingga penjadwal konten pemasaran otomatis.
        </p>
        
        <div className="space-y-4 mb-10">
          {[
            { title: "AI Agent Panel", desc: "Interaksi real-time dengan asisten otonom.", icon: <MessageSquare className="w-4 h-4" /> },
            { title: "Knowledge Base", desc: "Unggah data bisnis untuk kustomisasi AI.", icon: <Upload className="w-4 h-4" /> },
            { title: "Data Visualization", desc: "Visualisasi data real-time untuk keputusan cepat.", icon: <BarChart3 className="w-4 h-4" /> }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-9 h-9 bg-brand-blue/10 border border-slate-200 dark:border-white/5 rounded-lg flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 text-sm">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight transition-colors">{item.title}</h4>
                <p className="text-[10px] text-slate-600 dark:text-slate-500 font-medium transition-colors">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setView('cms')}
          className="px-8 py-4 bg-brand-blue text-white rounded-xl font-black shadow-[0_15px_40px_rgba(58,134,255,0.25)] hover:scale-105 transition-all text-[10px] uppercase tracking-widest"
        >
          Mulai Kelola Sekarang
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative pointer-events-none select-none max-w-sm mx-auto lg:ml-auto"
      >
        {/* Main Dashboard Mockup - Refined to match image */}
        <div className="bg-white rounded-[32px] border-[10px] border-slate-900 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10] flex flex-col relative">
          {/* Mockup Header */}
          <div className="h-10 bg-white border-b border-slate-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[6px] font-black text-emerald-600 uppercase tracking-widest">Live</span>
              </div>
              <div className="h-1.5 w-20 bg-slate-100 rounded-full"></div>
            </div>
          </div>

          {/* Mockup Main */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-12 bg-white border-r border-slate-50 flex flex-col items-center py-4 gap-4">
              <div className="w-6 h-6 bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-md shadow-brand-blue/20 scale-110">
                <Cpu className="w-3 h-3" />
              </div>
              {[Layout, BarChart3, Bot].map((Icon, i) => (
                <div key={i} className="text-slate-100">
                  <Icon className="w-3 h-3" />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-slate-50/10 p-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Traffic Card */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100/50">
                  <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-1">Traffic</p>
                  <h5 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">14.2k</h5>
                  <div className="text-emerald-500 text-[6px] font-bold">+12.5%</div>
                </div>

                {/* Uptime Card (Dark) */}
                <div className="bg-slate-950 p-3 rounded-xl shadow-md relative overflow-hidden">
                  <p className="text-[6px] font-black text-slate-500 uppercase tracking-widest mb-1">Uptime</p>
                  <h5 className="text-sm font-black text-white tracking-tight leading-none">99.9%</h5>
                  <div className="mt-2 h-0.5 w-full bg-slate-900 rounded-full">
                    <div className="h-full w-[99%] bg-brand-blue" />
                  </div>
                </div>
              </div>

              {/* Chart Box */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100/50 h-16 flex flex-col">
                <div className="h-1 w-12 bg-slate-50 rounded-full mb-3" />
                <div className="flex-1 flex items-end gap-0.5">
                  {[30, 45, 35, 60, 40, 75, 90, 65, 85].map((h, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${h}%` }} 
                      className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-brand-blue' : 'bg-slate-50'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Phone Overlay */}
          <div className="absolute -bottom-8 -right-4 w-32 aspect-[9/18.5] bg-white rounded-[28px] border-[4px] border-slate-900 shadow-xl z-20 overflow-hidden flex flex-col">
            <div className="h-6 flex items-center justify-center">
               <div className="w-2.5 h-0.5 bg-slate-900 rounded-full mt-0.5" />
            </div>
            <div className="flex-1 p-2.5 flex flex-col gap-3">
              <div className="h-4 w-4 rounded-full bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue self-center">
                 <Zap className="w-2 h-2" />
               </div>
              <div className="h-1 w-2/3 bg-slate-50 rounded-full mx-auto" />
              <div className="h-5 w-full bg-slate-900 rounded-lg" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-brand-blue/5 p-1.5 rounded-lg text-center">
                  <p className="text-[7px] font-black text-brand-blue">84%</p>
                </div>
                <div className="bg-emerald-50 p-1.5 rounded-lg text-center">
                  <p className="text-[7px] font-black text-emerald-500">$2.4k</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FAQ = () => {
  const faqs = [
    { q: "Apakah saya perlu keahlian coding?", a: "Tidak sama sekali. Uni-LandFarm dirancang untuk pebisnis tanpa latar belakang teknis. AI kami menangani semua aspek teknis.", color: "bg-blue-500" },
    { q: "Berapa lama waktu yang dibutuhkan untuk membuat situs?", a: "Hanya butuh sekitar 30-60 detik untuk menghasilkan draf pertama yang profesional.", color: "bg-purple-500" },
    { q: "Apakah situs saya akan SEO-friendly?", a: "Ya, AI kami secara otomatis mengoptimalkan struktur, meta tag, dan konten untuk mesin pencari.", color: "bg-indigo-500" },
    { q: "Bisakah saya menggunakan domain sendiri?", a: "Tentu. Anda dapat menghubungkan domain kustom Anda dengan mudah di dashboard.", color: "bg-violet-500" }
  ];

  return (
    <section className="py-32 px-6 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-blue/5 to-transparent blur-[80px]" 
        />
      </div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand-blue/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] rounded-full"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
            SUPPORT
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
            Pertanyaan <span className="text-brand-blue">Umum</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-1 h-full ${faq.color} opacity-20 group-hover:opacity-100 transition-all`}></div>
              <h4 className="font-black text-slate-900 dark:text-white mb-3 flex items-center gap-3 text-lg tracking-tight group-hover:text-brand-blue transition-colors">
                <div className={`w-7 h-7 rounded-full ${faq.color}/10 text-brand-blue flex items-center justify-center text-[10px] font-black shadow-sm group-hover:scale-110 transition-transform`}>?</div>
                {faq.q}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed ml-10">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-40 px-6 bg-slate-950 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-full h-full bg-brand-blue/5 blur-[120px]" 
      />
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.25)_0%,transparent_70%)]"></div>
    
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
          className="px-12 py-6 bg-brand-blue text-white rounded-2xl font-black shadow-[0_20px_50px_-10px_rgba(58,134,255,0.4)] hover:scale-105 transition-all transform active:scale-95 text-lg"
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

const DashboardPreview = ({ setView }: { setView?: (v: string) => void }) => (
  <section className="py-32 px-6 bg-slate-900 text-white overflow-visible relative transition-colors duration-300">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/20 blur-[200px] -z-10 animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-500/10 blur-[150px] -z-10"></div>
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/10 blur-[120px] rounded-full -z-10 animate-blob"></div>
    
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 pb-20 lg:pb-32">
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30 mb-8 shadow-lg shadow-brand-blue/10"
        >
          <Layout className="w-4 h-4 mr-2 inline-block" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">CMS Dashboard</span>
        </motion.div>
        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[1.1]">
          CMS Kuat dengan <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-500 to-indigo-400">Kecerdasan Bisnis AI</span>
        </h2>
        <p className="text-slate-400 text-base lg:text-lg mb-10 leading-relaxed font-medium">
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
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-xl">
                {item.icon}
              </div>
              <div>
                <h4 className="text-base font-black mb-1 group-hover:text-brand-blue transition-colors tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => setView?.('signup')}
          className="px-10 py-4 bg-brand-blue text-white rounded-xl font-black shadow-blue hover:shadow-blue-lg transition-all transform hover:-translate-y-1 active:scale-95"
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
          className="bg-white rounded-[24px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] border border-white/10 relative z-10 origin-center"
        >
          {/* Dashboard Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex items-center justify-between rounded-t-[24px]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/20">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200"></div>
              <div className="w-10 h-10 rounded-xl bg-slate-200"></div>
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
                <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${item.active ? 'bg-brand-blue text-white shadow-blue' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                  {item.icon}
                  <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* Main Content Mock - Scaled down further */}
            <div className="col-span-9 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Pendapatan", val: "Rp 124.500.000", color: "text-brand-blue", trend: "+24%" },
                  { label: "Pengguna Aktif", val: "12.402", color: "text-slate-900", trend: "+12%" },
                  { label: "Tugas AI", val: "842", color: "text-purple-500", trend: "Aktif" }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-[20px] border-2 border-slate-200 p-4 hover:border-brand-blue/30 transition-all hover:shadow-xl group relative overflow-hidden">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-[11px] font-black tracking-tight group-hover:scale-105 transition-transform leading-none whitespace-nowrap ${item.color}`}>{item.val}</p>
                      <span className="text-[6px] font-black text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-[24px] border-2 border-slate-200 p-6 relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Analitik Performa</h5>
                    <p className="text-[8px] text-slate-400 font-bold">Pemantauan lalu lintas langsung</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-2 py-0.5 bg-brand-blue/10 rounded-full text-[7px] font-black text-brand-blue uppercase tracking-widest">Bulanan</div>
                  </div>
                </div>
                <div className="flex items-end gap-2 h-32 mb-2">
                  {[40, 70, 55, 90, 65, 100, 80, 95, 50, 75, 85, 60].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 0.8 }}
                      className="flex-1 bg-brand-blue/20 rounded-t-lg hover:bg-brand-blue transition-all cursor-pointer relative group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[7px] font-black px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating Revenue Card - Repositioned to bottom center area to avoid chart overlap */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 right-6 bg-white p-3 rounded-2xl shadow-2xl border-2 border-slate-100 flex items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-none mb-1">Pendapatan</p>
                    <p className="text-[10px] font-black text-purple-500 leading-none">+24.8%</p>
                  </div>
                </motion.div>
              </div>

              {/* AI Agent Panel Float - Adjusted position to be clear of main mockup */}
              <motion.div 
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-10 -right-4 lg:-right-10 w-72 bg-white rounded-[24px] shadow-2xl border-2 border-slate-200 p-6 z-30 hidden md:block"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Agen AI Uni-LandFarm</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                      <p className="text-[9px] text-indigo-500 font-black uppercase tracking-[0.2em]">Aktif Sekarang</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3.5 rounded-[20px] text-xs text-slate-600 font-medium leading-relaxed border border-slate-100">Strategi pemasaran otomatis Anda siap dijalankan!</div>
                  <div className="bg-brand-blue text-white p-3.5 rounded-[20px] text-xs font-black text-right shadow-md border border-brand-blue/10">Tolong aktifkan penjadwalan.</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  </section>
);

const PricingView = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-32 px-6 bg-slate-50/50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ y: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-brand-blue/5 via-transparent to-indigo-500/5 blur-[120px]" 
      />
    </div>
    
    {/* Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
    <div className="absolute -top-48 right-0 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full"></div>
    <div className="absolute -bottom-48 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(58,134,255,0.15)]"
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

const AboutUsView = () => (
  <section className="py-32 px-6 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
    {/* â”€â”€ Background Mesh Glows â”€â”€ */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-blue/8 dark:bg-brand-blue/12 rounded-full blur-[140px]" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/6 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[5%] left-[30%] w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/8 rounded-full blur-[100px]" />
    </div>

    {/* â”€â”€ Dot Grid Pattern â”€â”€ */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
      style={{
        backgroundImage: 'radial-gradient(circle, #3a86ff 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />

    <div className="max-w-6xl mx-auto relative z-10">

      {/* â”€â”€ Section Header â”€â”€ */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/25 backdrop-blur-md text-brand-blue text-[11px] font-black uppercase tracking-[0.25em] mb-6 shadow-[0_0_30px_rgba(58,134,255,0.18)]"
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

      {/* â”€â”€ Visi & Misi Cards â”€â”€ */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">

        {/* Visi Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(58,134,255,0.13)] dark:hover:shadow-[0_20px_60px_rgba(58,134,255,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden"
        >
          {/* Card glow accent */}
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-[32px] bg-gradient-to-r from-brand-blue via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center gap-5 mb-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-brand-blue/20 blur-[14px] group-hover:blur-[20px] group-hover:bg-brand-blue/30 transition-all duration-500" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-brand-blue to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(58,134,255,0.4)] group-hover:scale-110 transition-transform duration-500">
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
          className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(58,134,255,0.13)] dark:hover:shadow-[0_20px_60px_rgba(58,134,255,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 rounded-t-[32px] bg-gradient-to-r from-brand-blue via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center gap-5 mb-8">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-brand-blue/20 blur-[14px] group-hover:blur-[20px] group-hover:bg-brand-blue/30 transition-all duration-500" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-brand-blue to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(58,134,255,0.4)] group-hover:scale-110 transition-transform duration-500">
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

      {/* â”€â”€ Teknologi Inti â€“ Cyber Panel â”€â”€ */}
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-widest mb-5 shadow-[0_0_20px_rgba(58,134,255,0.15)]">
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
            <div className="group relative bg-white/[0.04] border border-white/[0.07] hover:border-brand-blue/40 hover:bg-white/[0.07] rounded-[24px] p-8 transition-all duration-400 hover:shadow-[0_0_40px_rgba(58,134,255,0.12)]">
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
            <div className="group relative bg-white/[0.04] border border-white/[0.07] hover:border-brand-blue/40 hover:bg-white/[0.07] rounded-[24px] p-8 transition-all duration-400 hover:shadow-[0_0_40px_rgba(58,134,255,0.12)]">
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

const LoginView = ({ setView }: { setView: (v: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid';
    if (!password) newErrors.password = 'Password wajib diisi';
    else if (password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    return newErrors;
  };

  const handleLogin = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('dashboard');
    }, 1200);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] py-12 flex items-center justify-center px-6 bg-slate-50/50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(58,134,255,0.5)]">
            <Cpu className="text-white w-7 h-7" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Masuk ke akun Uni-LandFarm Anda</p>
        </div>

        {/* Google Button */}
        <button
          onClick={() => setView('dashboard')}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 transition-all mb-5 shadow-sm group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Lanjutkan dengan Google</span>
        </button>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black">
            <span className="bg-white dark:bg-slate-800 px-3 text-slate-300 dark:text-slate-600">atau masuk dengan email</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({...prev, email: undefined})); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="nama@perusahaan.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${
                  errors.email
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                    : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1">
                <AlertCircle className="w-3 h-3" />{errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-0.5">
              <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">Password</label>
              <button type="button" className="text-[10px] font-bold text-brand-blue hover:underline">Lupa password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({...prev, password: undefined})); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Minimal 6 karakter"
                className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${
                  errors.password
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                    : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1">
                <AlertCircle className="w-3 h-3" />{errors.password}
              </p>
            )}
          </div>
        </div>

        <motion.button
          id="login-submit-btn"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-sm shadow-[0_10px_30px_-5px_rgba(58,134,255,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(58,134,255,0.5)] transition-all mb-5 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Memproses...
            </>
          ) : (
            <>Masuk ke Dashboard <ArrowRight className="w-4 h-4" /></>
          )}
        </motion.button>

        <div className="text-center text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            Belum punya akun?{' '}
            <button
              id="goto-signup-btn"
              onClick={() => setView('signup')}
              className="text-brand-blue font-black hover:underline"
            >
              Daftar sekarang
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const SignupView = ({ setView }: { setView: (v: string) => void }) => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ businessName?: string; email?: string; password?: string; agree?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!businessName.trim()) newErrors.businessName = 'Nama bisnis wajib diisi';
    if (!email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid';
    if (!password) newErrors.password = 'Password wajib diisi';
    else if (password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    if (!agree) newErrors.agree = 'Anda harus menyetujui syarat & ketentuan';
    return newErrors;
  };

  const handleSignup = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('dashboard');
    }, 1500);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] py-12 flex items-center justify-center px-6 bg-slate-50/50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(58,134,255,0.5)]">
            <Cpu className="text-white w-7 h-7" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Buat Akun Gratis</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Mulai bisnis digital Anda dalam 30 detik</p>
        </div>

        {/* Google Button */}
        <button
          onClick={() => setView('dashboard')}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 transition-all mb-5 shadow-sm group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Daftar dengan Google</span>
        </button>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black">
            <span className="bg-white dark:bg-slate-800 px-3 text-slate-300 dark:text-slate-600">atau daftar dengan email</span>
          </div>
        </div>

        <div className="space-y-4 mb-5">
          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Nama Bisnis</label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
              <input
                id="signup-business"
                type="text"
                value={businessName}
                onChange={(e) => { setBusinessName(e.target.value); if (errors.businessName) setErrors(prev => ({...prev, businessName: undefined})); }}
                placeholder="Contoh: Digital Agency X"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${
                  errors.businessName
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                    : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                }`}
              />
            </div>
            {errors.businessName && <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{errors.businessName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({...prev, email: undefined})); }}
                placeholder="nama@bisnis.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${
                  errors.email
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                    : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({...prev, password: undefined})); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                placeholder="Minimal 6 karakter"
                className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${
                  errors.password
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                    : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                }`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            {password && (
              <div className="flex gap-1 mt-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                    password.length >= i * 2
                      ? password.length >= 8 ? 'bg-emerald-400' : password.length >= 6 ? 'bg-amber-400' : 'bg-red-400'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`} />
                ))}
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
          </div>
        </div>

        {/* Agreement */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <div
            onClick={() => { setAgree(!agree); if (errors.agree) setErrors(prev => ({...prev, agree: undefined})); }}
            className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${
              agree ? 'bg-brand-blue border-brand-blue' : errors.agree ? 'border-red-400' : 'border-slate-200 dark:border-slate-600 group-hover:border-brand-blue/50'
            }`}
          >
            {agree && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Saya menyetujui <span className="text-brand-blue font-bold">Syarat & Ketentuan</span> serta{' '}
            <span className="text-brand-blue font-bold">Kebijakan Privasi</span> Uni-LandFarm
          </span>
        </label>
        {errors.agree && <p className="text-xs text-red-500 font-bold flex items-center gap-1 -mt-4 mb-4 ml-1"><AlertCircle className="w-3 h-3" />{errors.agree}</p>}

        <motion.button
          id="signup-submit-btn"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignup}
          disabled={isLoading}
          className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-sm shadow-[0_10px_30px_-5px_rgba(58,134,255,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(58,134,255,0.5)] transition-all mb-5 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Membuat akun...
            </>
          ) : (
            <>Buat Akun Sekarang <ArrowRight className="w-4 h-4" /></>
          )}
        </motion.button>

        <div className="text-center text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            Sudah punya akun?{' '}
            <button
              id="goto-login-btn"
              onClick={() => setView('login')}
              className="text-brand-blue font-black hover:underline"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const AuthShowcase = ({ setView }: { setView: (v: string) => void }) => (
  <section className="py-12 px-6 bg-white dark:bg-slate-900 overflow-hidden relative">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-800 rounded-[32px] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-30px_rgba(0,102,255,0.15)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_30px_60px_-30px_rgba(0,102,255,0.2)] border border-slate-50 dark:border-slate-700 relative z-10"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Masuk untuk mengelola Agentic AI bisnis Anda.</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Bisnis</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-500" />
              <input type="email" placeholder="nama@perusahaan.com" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-500" />
              <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="flex-1 flex items-center justify-center gap-3 py-3 border border-slate-100 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
            <div className="w-5 h-5 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center text-[10px] text-white dark:text-slate-900 font-black">G</div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-3 py-3 border border-slate-100 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
            <Apple className="w-5 h-5 text-slate-900 dark:text-white" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Apple</span>
          </button>
        </div>

        <button 
          onClick={() => setView('login')}
          className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black shadow-[0_15px_30px_-5px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all mb-8"
        >
          Masuk
        </button>

        <div className="flex items-center justify-between text-xs font-bold">
          <a href="#" className="text-brand-blue hover:underline">Lupa kata sandi?</a>
          <p className="text-slate-400 dark:text-slate-500">Belum punya akun? <button onClick={() => setView('signup')} className="text-brand-blue hover:underline">Daftar</button></p>
        </div>
      </motion.div>

      {/* Registration Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-800 rounded-[32px] p-10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15),0_40px_80px_-30px_rgba(58,134,255,0.1)] dark:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5),0_40px_80px_-30px_rgba(58,134,255,0.15)] border border-slate-50 dark:border-slate-700 relative z-10"
      >
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Mulai Bisnis Anda Gratis</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm lg:text-base">Bangun landing page pertama Anda dalam 30 detik.</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Bisnis</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-500" />
              <input type="text" placeholder="Contoh: Digital Agency X" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-500" />
              <input type="email" placeholder="nama@bisnis.com" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner dark:text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori Usaha</label>
            <div className="relative">
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-500 pointer-events-none" />
              <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner appearance-none dark:text-white">
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
          onClick={() => setView('dashboard')}
          className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black shadow-[0_20px_40px_-10px_rgba(0,102,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
        >
          Buat Akun Sekarang
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <Zap className="w-3 h-3 text-brand-blue" />
          Tanpa kartu kredit. Batalkan kapan saja.
        </div>
      </motion.div>

      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 relative overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
    
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-8">
        <div className="col-span-1 md:col-span-1">
          <div 
            className="flex items-center gap-3 mb-8 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-[0_8px_25px_-5px_rgba(58,134,255,0.4)] group-hover:scale-110 transition-transform">
              <Cpu className="text-white w-7 h-7 relative z-10" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">Uni-LandFarm</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 font-medium">
            Platform revolusioner untuk membangun dan mengelola ekosistem digital bisnis modern dengan kekuatan Agentic AI.
          </p>
          <div className="flex gap-4">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <motion.a 
                key={i} 
                href="#" 
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white transition-all shadow-sm hover:shadow-blue"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Platform</h4>
          <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><button onClick={() => setView('features')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Fitur Utama <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('templates')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Pustaka Template <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('cms')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">AI Generator <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('signup')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Integrasi API <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Sumber Daya</h4>
          <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Tentang Kami <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Blog Bisnis <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Pusat Bantuan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Komunitas <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase text-[10px] tracking-[0.3em]">Legal</h4>
          <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Kebijakan Privasi <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Ketentuan Layanan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Kebijakan Cookie <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
          © 2026 Platform Uni-LandFarm. Hak cipta dilindungi undang-undang.
        </p>
        <div className="flex gap-8 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
          <a href="#" className="hover:text-brand-blue transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Ketentuan Layanan</a>
        </div>
      </div>
    </div>
  </footer>
);



const TokenDashboardContent = ({ showNotification }: { showNotification: (m: string, t?: 'success' | 'info') => void }) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'history'>('checkout');
  const [checkoutStep, setCheckoutStep] = useState<'package' | 'payment' | 'input' | 'processing' | 'receipt'>('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('semua');

  const packages = [
    { 
      id: 'pemula', 
      name: 'Paket Pemula', 
      price: 25000, 
      tokens: 10,
      description: 'Cocok untuk mencoba fitur dasar AI.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Akses Template Dasar', 'Dukungan Komunitas'],
      popular: false
    },
    { 
      id: 'pertumbuhan', 
      name: 'Paket Pertumbuhan', 
      price: 100000, 
      tokens: 250,
      description: 'Untuk bisnis yang aktif berkembang.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Akses Semua Template', 'Dukungan Prioritas'],
      popular: true
    },
    { 
      id: 'pro', 
      name: 'Paket Pro', 
      price: 350000, 
      tokens: 1000,
      description: 'Solusi skala besar untuk agensi.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Pengaturan Domain Kustom', 'Agen AI Khusus'],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#00AED6]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#00AED6] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#00AED6]/30">gopay</div> },
    { id: 'ovo', name: 'OVO', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#4C2A86]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#4C2A86] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#4C2A86]/30">ovo</div> },
    { id: 'dana', name: 'DANA', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#108EE9]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#108EE9] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#108EE9]/30">dana</div> },
    { id: 'shopeepay', name: 'ShopeePay', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#EE4D2D]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#EE4D2D] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#EE4D2D]/30">shopee</div> },
    { id: 'bca_va', name: 'BCA VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#0060AF]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#0060AF] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#0060AF]/30">bca</div> },
    { id: 'mandiri_va', name: 'Mandiri VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#FFC425]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#FFC425] rounded-xl text-[8px] font-black text-slate-900 uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#FFC425]/30">mandiri</div> },
    { id: 'bni_va', name: 'BNI VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#005E6A]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#005E6A] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#005E6A]/30">bni</div> },
    { id: 'bri_va', name: 'BRI VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#00529C]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#00529C] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#00529C]/30">bri</div> },
    { id: 'bca_mobile', name: 'BCA Mobile', group: 'MOBILE BANKING', color: 'bg-[#0060AF]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#0060AF] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#0060AF]/30">m-bca</div> },
    { id: 'livin_mandiri', name: 'Livin\' by Mandiri', group: 'MOBILE BANKING', color: 'bg-[#FFC425]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#FFC425] rounded-xl text-[8px] font-black text-slate-900 uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#FFC425]/30">livin'</div> },
  ];

  const transactions = [
    { id: 'TX-9021', date: '01 Mei 2024', package: 'Paket Pemula', amount: 'Rp 25.000', method: 'GoPay', status: 'berhasil' },
    { id: 'TX-8945', date: '28 Apr 2024', package: 'Paket Pro', amount: 'Rp 350.000', method: 'VA BCA', status: 'gagal' },
    { id: 'TX-8832', date: '20 Apr 2024', package: 'Paket Pertumbuhan', amount: 'Rp 100.000', method: 'Dana', status: 'berhasil' },
    { id: 'TX-8711', date: '15 Apr 2024', package: 'Paket Pemula', amount: 'Rp 25.000', method: 'OVO', status: 'berhasil' },
    { id: 'TX-8654', date: '10 Apr 2024', package: 'Paket Pertumbuhan', amount: 'Rp 100.000', method: 'VA Mandiri', status: 'berhasil' },
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.method.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'semua' || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePayment = () => {
    if (activeTab === 'checkout' && (!selectedPackage || !selectedPayment)) return;
    setCheckoutStep('input');
  };

  const processPayment = () => {
    if (!accountNumber) {
        showNotification('Masukkan nomor akun/rekening Anda.', 'info');
        return;
    }
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('receipt');
      showNotification('Pembayaran berhasil dikonfirmasi!', 'success');
      setAccountNumber('');
    }, 2000);
  };

  const nextStep = () => {
    if (selectedPackage) setCheckoutStep('payment');
  };

  const prevStep = () => {
    setCheckoutStep('package');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* TABS SELECTOR - NEAT & ALIGNED */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-[16px] flex items-center shadow-inner border border-slate-200 dark:border-slate-800 self-start">
            <button 
              onClick={() => { setActiveTab('checkout'); setCheckoutStep('package'); }}
              className={`px-6 py-2 rounded-[12px] text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'checkout' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-lg shadow-black/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              Beli Token
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-[12px] text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'history' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-lg shadow-black/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              Riwayat
            </button>
          </div>

          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900/40 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
             <div className="flex items-center gap-3 pr-4 border-r border-slate-200 dark:border-slate-800">
                <div className="bg-brand-blue/20 p-1 rounded-md text-brand-blue text-[6px] font-black uppercase tracking-widest shadow-inner border border-brand-blue/20">
                  SALDO
                </div>
                <span className="text-sm font-black dark:text-white">250 Token</span>
             </div>
             <div className="flex flex-col justify-center">
                <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5 leading-none">Status Akun</p>
                <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest leading-none">Aktif</span>
             </div>
          </div>
      </div>

      {activeTab === 'checkout' ? (
        <div className="space-y-12">
          {checkoutStep === 'package' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <motion.div 
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative bg-white dark:bg-slate-900 rounded-[24px] p-6 border-2 transition-all flex flex-col items-center text-center group ${
                      selectedPackage?.id === pkg.id 
                      ? 'border-brand-blue shadow-premium-hover' 
                      : 'border-white dark:border-slate-800 shadow-premium'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 p-1">
                        <div className="bg-brand-blue text-white text-[6px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-bl-2xl rounded-tr-[20px] shadow-lg">Populer</div>
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase">{pkg.name}</h4>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-black text-slate-900 dark:text-white transition-colors group-hover:text-brand-blue">Rp {pkg.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[9px] font-medium text-slate-400 mt-2 h-6 uppercase tracking-wider">{pkg.description}</p>
                    </div>

                    <div className="space-y-2.5 w-full mb-8 text-left pt-4 border-t border-slate-50 dark:border-slate-800">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedPackage(pkg);
                        nextStep();
                      }}
                      className={`w-full py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                        pkg.popular 
                        ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/20 hover:bg-blue-600' 
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-brand-blue hover:text-white'
                      }`}
                    >
                      Beli Token
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-5xl mx-auto bg-white dark:bg-slate-900/60 backdrop-blur-2xl rounded-[64px] border border-slate-100 dark:border-white/5 shadow-premium-hover overflow-hidden"
            >
               <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button onClick={prevStep} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 hover:text-brand-blue transition-all">
                        <ArrowLeft className="w-5 h-5" />
                     </button>
                     <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Metode Pembayaran</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Pilih cara bayar yang paling nyaman</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-brand-blue uppercase mb-1">Total Bayar</p>
                     <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">Rp {selectedPackage?.price.toLocaleString()}</p>
                  </div>
               </div>

               <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                     {Array.from(new Set(paymentMethods.map(m => m.group))).map((group, gIdx) => (
                        <div key={gIdx} className="space-y-4">
                           <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{group}</h4>
                           <div className="grid grid-cols-2 gap-3">
                              {paymentMethods.filter(m => m.group === group).map((method) => (
                                 <button 
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.name)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all group relative overflow-hidden ${
                                       selectedPayment === method.name 
                                       ? 'border-brand-blue bg-brand-blue/5 shadow-md' 
                                       : 'border-slate-100 dark:border-slate-800 hover:border-brand-blue/20'
                                    }`}
                                 >
                                    {selectedPayment === method.name && (
                                       <div className="absolute top-0 right-0 w-8 h-8 bg-brand-blue flex items-center justify-center rounded-bl-xl">
                                          <CheckCircle2 className="w-4 h-4 text-white" />
                                       </div>
                                    )}
                                    <div className="shrink-0">
                                       {method.icon}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase text-left leading-tight tracking-tight ${selectedPayment === method.name ? 'text-brand-blue' : 'text-slate-500'}`}>{method.name}</span>
                                 </button>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-8">
                     <div className="bg-white dark:bg-slate-800/30 p-10 rounded-[48px] border-2 border-slate-50 dark:border-slate-800 shadow-inner">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Ringkasan Pesanan</h4>
                        <div className="space-y-5 mb-10">
                            <>
                               <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                  <span>Paket</span>
                                  <span className="text-slate-900 dark:text-white uppercase">{selectedPackage?.name}</span>
                               </div>
                               <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                                  <span>Tokens</span>
                                  <span className="text-slate-900 dark:text-white">{selectedPackage?.tokens} Tokens</span>
                               </div>
                            </>
                           <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                              <span>Metode</span>
                              <span className="text-slate-900 dark:text-white">{selectedPayment || '-'}</span>
                           </div>
                           <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
                              <span className="text-[10px] font-black text-slate-400 uppercase">Total Netto</span>
                              <span className="text-xl font-black text-slate-900 dark:text-white">Rp {selectedPackage?.price.toLocaleString()}</span>
                           </div>
                        </div>

                        {activeTab === 'checkout' && (
                          <div className="space-y-3">
                             <input 
                                type="text" 
                                placeholder="KODE PROMO" 
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand-blue/20"
                             />
                             <button className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue transition-all">Gunakan Promo</button>
                          </div>
                        )}
                     </div>

                     <button 
                        onClick={handlePayment}
                        disabled={!selectedPayment}
                        className={`w-full py-5 rounded-[24px] text-[12px] font-black uppercase tracking-widest transition-all shadow-xl ${
                           selectedPayment
                           ? 'bg-brand-blue text-white shadow-brand-blue/20 transform hover:scale-[1.02] active:scale-[0.98]' 
                           : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                     >
                        Bayar Sekarang
                     </button>

                     <p className="text-center text-[9px] font-bold text-slate-400 leading-relaxed tracking-widest">
                        Amankan transaksi Anda dengan enkripsi SSL 256-bit.<br/>Layanan oleh Uni-LandFarm Finance.
                     </p>
                  </div>
               </div>
            </motion.div>
          )}

          {checkoutStep === 'input' && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="max-w-md mx-auto bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl"
            >
               <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
                    <CreditCard className="w-6 h-6" />
                  </div>
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase text-center">Konfirmasi {selectedPayment}</h3>
               <p className="text-xs text-slate-500 mb-8 font-medium text-center leading-relaxed">
                  Masukkan nomor akun untuk verifikasi pembayaran Anda.
               </p>
               
               <div className="space-y-5 mb-8 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Akun / E-Wallet / VA</label>
                    <input 
                      type="text" 
                      placeholder={selectedPayment?.includes('VA') ? '8806 0812 XXXX' : '0812-3456-XXXX'} 
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 shadow-inner"
                    />
                  </div>
               </div>

               <div className="flex gap-4">
                  <button onClick={() => setCheckoutStep('payment')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Batal</button>
                  <button id="process-payment-btn" onClick={processPayment} className="flex-1 py-4 bg-brand-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Konfirmasi Bayar</button>
               </div>
            </motion.div>
          )}

          {checkoutStep === 'processing' && (
            <div className="max-w-md mx-auto text-center py-20">
               <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-brand-blue/20 rounded-full"></div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-brand-blue rounded-full border-t-transparent"
                  />
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Memproses Transaksi...</h3>
               <p className="text-sm text-slate-500 font-medium">Jangan tutup halaman ini, sistem kami sedang memverifikasi pembayaran Anda.</p>
            </div>
          )}

          {checkoutStep === 'receipt' && (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-[48px] overflow-hidden shadow-premium-hover border-4 border-slate-50 dark:border-slate-800"
            >
               {/* RECEIPT HEADER - DOCUMENT STYLE */}
               <div className={`${activeTab === 'history' ? 'bg-brand-blue' : 'bg-emerald-500'} p-10 text-center text-white relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-20"></div>
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/40 shadow-inner">
                     <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-1">Transaksi Sukses</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Pembayaran Berhasil Dikonfirmasi</p>
               </div>

               {/* RECEIPT BODY */}
               <div className="p-12 space-y-10">
                  <div className="grid grid-cols-2 gap-8 py-8 border-y-2 border-dashed border-slate-100 dark:border-slate-800 relative">
                     <div className="absolute -top-4 -left-14 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
                     <div className="absolute -top-4 -right-14 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
                     
                     <div className="space-y-6">
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Reference ID</p>
                           <p className="text-sm font-black text-slate-900 dark:text-white font-mono uppercase">#{Math.random().toString(36).substring(7).toUpperCase()}</p>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Tanggal</p>
                           <p className="text-sm font-black text-slate-900 dark:text-white">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                     </div>
                     <div className="space-y-6 text-right">
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Metode</p>
                           <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{selectedPayment}</p>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Item</p>
                           <p className="text-sm font-black text-slate-900 dark:text-white">{selectedPackage?.name} Tokens</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[32px] space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Dibayar</span>
                        <span className="text-3xl font-black text-emerald-500 tracking-tighter">Rp {selectedPackage?.price.toLocaleString()}</span>
                     </div>
                     
                     <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                              <Zap className="w-4 h-4" />
                           </div>
                           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Token Ditambahkan</span>
                        </div>
                        <span className="text-lg font-black text-emerald-600">+{selectedPackage?.tokens}</span>
                     </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setCheckoutStep('package'); setActiveTab('history'); }}
                      className="flex-1 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl"
                    >
                      Selesai & Ke Dashboard
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="px-8 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
               </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* HISTORY TAB - SEPARATE PAGE FEEL */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
             <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Semua Transaksi</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Menampilkan riwayat pengisian token Anda</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                   {/* Search removed */}
                   <select 
                     value={filterStatus}
                     onChange={(e) => setFilterStatus(e.target.value)}
                     className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-brand-blue/20"
                   >
                     <option value="semua">Semua Status</option>
                     <option value="berhasil">Berhasil</option>
                     <option value="gagal">Gagal</option>
                   </select>
                   <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm">
                      <Download className="w-5 h-5" />
                   </button>
                </div>
             </div>
             <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                     {['Tanggal', 'Ref', 'Paket', 'Nominal', 'Metode', 'Status'].map((h) => (
                       <th key={h} className="px-6 py-4 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                     ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {filteredTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all group">
                      <td className="px-6 py-4">
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">{tx.date}</p>
                        <p className="text-[8px] font-bold text-slate-300">14:20 WIB</p>
                      </td>
                      <td className="px-6 py-4 text-[9px] font-black text-slate-300 group-hover:text-brand-blue transition-colors">#{tx.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600">
                              <Layers className="w-3 h-3" />
                           </div>
                           <p className="text-[11px] font-black text-slate-900 dark:text-white">{tx.package}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[11px] font-black text-slate-900 dark:text-white">{tx.amount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                           <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">{tx.method}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm ${
                          tx.status === 'berhasil' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 
                          tx.status === 'gagal' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-amber-50 text-amber-500 border border-amber-100'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="w-6 h-6 text-slate-200 shadow-inner" />
                        </div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Transaksi tidak ditemukan</p>
                      </td>
                    </tr>
                  )}
                </tbody>
             </table>
             <div className="p-8 border-t border-slate-50 dark:border-slate-800 text-center">
                <button className="text-[10px] font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors">Tampilkan Lebih Banyak</button>
             </div>
          </div>
        </motion.div>
      )}

      {/* INVOICE MODAL (REMOVED AS PER REQUEST) */}
    </div>
  );
};

// --- Constant Data for UI Components ---
const COMPONENT_PALETTE = [
  { id: 'hero', name: 'Hero Section', icon: <Sparkles className="w-4 h-4" />, category: 'Layout' },
  { id: 'text', name: 'Text Block', icon: <Type className="w-4 h-4" />, category: 'Content' },
  { id: 'image', name: 'Visual Image', icon: <Image className="w-4 h-4" />, category: 'Media' },
  { id: 'button', name: 'Action Button', icon: <MousePointer2 className="w-4 h-4" />, category: 'Interactive' },
  { id: 'gallery', name: 'Image Gallery', icon: <Maximize2 className="w-4 h-4" />, category: 'Media' },
  { id: 'product', name: 'Product Display', icon: <Package className="w-4 h-4" />, category: 'Commerce' },
  { id: 'testimonial', name: 'Social Proof', icon: <MessageSquare className="w-4 h-4" />, category: 'Social' },
  { id: 'cta', name: 'Conversion CTA', icon: <ArrowRightCircle className="w-4 h-4" />, category: 'Conversion' },
  { id: 'footer', name: 'Site Footer', icon: <Columns className="w-4 h-4" />, category: 'Navigation' },
];

interface ContentBlock {
  id: string;
  type: string;
  content: any;
  style?: {
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: 'none' | 'soft' | 'full' | string;
    paddingY?: number;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    gap?: number;
    [key: string]: any;
  };
}

const InlineEditable = ({ 
  value, 
  onChange, 
  className,
  placeholder = "Type here..."
}: { 
  value: string; 
  onChange: (val: string) => void; 
  className?: string;
  placeholder?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = () => {
    if (ref.current) {
      onChange(ref.current.innerText);
    }
  };

  return (
    <div className="relative group/editable min-h-[1em]">
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 5, x: '-50%' }}
            animate={{ opacity: 1, y: -48, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            className="absolute -top-2 left-1/2 flex items-center bg-slate-950 border border-white/20 rounded-xl p-1 z-[70] shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
          >
             <div className="flex items-center gap-0.5 px-1">
                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"><Type className="w-3.5 h-3.5" /></button>
                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                <button className="p-2 text-slate-400 hover:text-white transition-colors font-black text-[12px] px-3 rounded-lg hover:bg-white/5">B</button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors italic font-serif text-[12px] px-3 rounded-lg hover:bg-white/5">I</button>
                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"><Smile className="w-3.5 h-3.5" /></button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"><Link2 className="w-3.5 h-3.5" /></button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={() => { handleInput(); setIsFocused(false); }}
        className={`outline-none focus:ring-2 focus:ring-brand-blue/30 rounded-lg px-2 py-1 transition-all min-h-[1em] empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 cursor-text selection:bg-brand-blue selection:text-white group-hover/editable:bg-brand-blue/5 ${className}`}
        data-placeholder={placeholder}
      >
        {value}
      </div>
    </div>
  );
};

const SectionControls = ({ block, onUpdateStyle }: { block: ContentBlock, onUpdateStyle: (style: any) => void }) => {
  return (
    <div className="absolute top-0 right-full mr-6 flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 z-50">
       <div className="bg-[#0c111d] border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 backdrop-blur-2xl">
          <label className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em] text-center mb-1">Padding</label>
          <div className="flex flex-col gap-1">
             <button 
               onClick={() => onUpdateStyle({ paddingY: Math.max(0, (block.style?.paddingY || 40) + 20) })}
               className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all"
               title="Increase Spacing"
             >
                <Plus className="w-3 h-3" />
             </button>
             <button 
               onClick={() => onUpdateStyle({ paddingY: Math.max(0, (block.style?.paddingY || 40) - 20) })}
               className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all"
               title="Decrease Spacing"
             >
                <MinusCircle className="w-3 h-3" />
             </button>
          </div>
       </div>

       <div className="bg-[#0c111d] border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-2 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
             {['#FFFFFF', '#F8FAFC', '#0F172A', '#3A86FF'].map(c => (
                <button 
                  key={c}
                  onClick={() => onUpdateStyle({ backgroundColor: c })}
                  className={`w-6 h-6 rounded-full border-2 border-transparent transition-all hover:scale-110 ${block.style?.backgroundColor === c ? 'border-brand-blue ring-4 ring-brand-blue/20' : ''}`}
                  style={{ backgroundColor: c }}
                />
             ))}
          </div>
       </div>
    </div>
  );
};

const SortableBlock = ({ 
  block, 
  isSelected, 
  onClick,
  onDelete,
  onDuplicate,
  onAddAfter,
  onUpdateContent,
  onUpdateStyle
}: { 
  key?: React.Key,
  block: ContentBlock, 
  isSelected: boolean, 
  onClick: () => void,
  onDelete: () => void,
  onDuplicate: () => void,
  onAddAfter: () => void,
  onUpdateContent: (content: any) => void,
  onUpdateStyle: (style: any) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id });

    const getBlockStyle = () => {
      const textAlignMap: Record<string, string> = {
        left: 'text-left',
        center: 'text-center flex flex-col items-center',
        right: 'text-right flex flex-col items-end'
      };

      const borderRadiusMap: Record<string, string> = {
        none: 'rounded-none',
        soft: 'rounded-2xl',
        full: 'rounded-[40px]'
      };

      return `${textAlignMap[block.style?.textAlign || 'left']} ${borderRadiusMap[block.style?.borderRadius || 'none']}`;
    };

    const dndStyle = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const containerStyle = {
      paddingTop: `${block.style?.paddingY || 40}px`,
      paddingBottom: `${block.style?.paddingY || 40}px`,
      backgroundColor: block.style?.backgroundColor || 'transparent',
      ...dndStyle
    };

    return (
      <div
        ref={setNodeRef}
        style={containerStyle}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`group relative transition-all duration-500 rounded-[28px] ${
          isDragging ? 'opacity-20 z-50 scale-[0.98] ring-4 ring-brand-blue/30 shadow-2xl' : 
          isSelected ? 'z-20 ring-2 ring-brand-blue ring-offset-8 ring-offset-white' : 'hover:ring-1 hover:ring-brand-blue/20 ring-offset-4 ring-offset-white'
        }`}
      >
        {/* Floating Toolbar - Centered Above Section */}
        <AnimatePresence>
          {isSelected && !isDragging && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: -48, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
              className="absolute top-0 left-1/2 flex items-center bg-[#0c111d] border border-white/10 rounded-2xl p-1.5 z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-3xl ring-1 ring-white/5"
            >
               <div {...attributes} {...listeners} className="p-2 text-slate-500 hover:text-white cursor-grab active:cursor-grabbing transition-colors rounded-xl hover:bg-white/5" title="Drag">
                  <GripVertical className="w-4 h-4" />
               </div>
               <div className="w-[1px] h-5 bg-white/5 mx-1" />
               <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-2 text-slate-500 hover:text-brand-blue transition-colors rounded-xl hover:bg-white/5" title="Duplicate">
                  <Copy className="w-4 h-4" />
               </button>
               <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 text-slate-500 hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/10" title="Delete">
                  <Trash2 className="w-4 h-4" />
               </button>
               <div className="w-[1px] h-5 bg-white/5 mx-1" />
               <button className="p-2 text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-white/5" title="Settings">
                  <Settings2 className="w-4 h-4" />
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`px-12 md:px-24 ${getBlockStyle()} relative transition-all duration-700`}>
          <div className="w-full">
            {block.type === 'hero' && (
               <div className="flex flex-col lg:flex-row items-center gap-20 py-24 lg:py-40 lg:min-h-[600px] max-w-7xl mx-auto">
                  <div className="flex-1 space-y-10 text-left animate-in fade-in slide-in-from-left-8 duration-700">
                     <div className="space-y-4">
                        <span className="px-4 py-1.5 bg-brand-blue/5 text-brand-blue rounded-full text-[11px] font-black uppercase tracking-[0.3em] inline-block border border-brand-blue/10">Kecerdasan Next-Gen</span>
                        <InlineEditable 
                          className="text-7xl md:text-8xl font-black text-slate-900 tracking-[-0.04em] leading-[0.95] max-w-3xl"
                          value={block.content?.title || 'Masa Depan Bisnis Anda'}
                          onChange={(val) => onUpdateContent({ title: val })}
                        />
                     </div>
                     <InlineEditable 
                       className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl"
                       value={block.content?.subtitle || 'Solusi integrasi AI terlengkap untuk mengotomatisasi alur kerja bisnis Anda.'}
                       onChange={(val) => onUpdateContent({ subtitle: val })}
                     />
                     <div className="flex flex-wrap gap-6 pt-6">
                        <div className="px-12 py-6 bg-slate-950 text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-[13px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-[1.05] hover:shadow-brand-blue/30 transition-all cursor-pointer group">
                           <InlineEditable value={block.content?.ctaText || 'Mulai Gratis'} onChange={(val) => onUpdateContent({ ctaText: val })} />
                        </div>
                        <div className="px-12 py-6 bg-white border border-slate-200 text-slate-900 rounded-[24px] font-black uppercase tracking-[0.3em] text-[13px] hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                           <InlineEditable value={block.content?.secText || 'Lihat Demo'} onChange={(val) => onUpdateContent({ secText: val })} />
                        </div>
                     </div>
                  </div>
                  <div className="flex-1 w-full lg:w-auto min-h-[500px] bg-slate-50 dark:bg-slate-900 rounded-[64px] border border-slate-200/50 dark:border-white/5 relative overflow-hidden group/hero shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] flex items-center justify-center p-16 transition-colors">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.08] via-transparent to-purple-500/[0.05]" />
                     <div className="relative z-10 w-full h-full bg-white dark:bg-slate-800 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white dark:border-white/5 p-10 flex flex-col gap-8 transform group-hover:scale-[1.03] transition-all duration-1000 ease-out">
                        <div className="w-1/3 h-6 bg-slate-50 dark:bg-slate-700 rounded-full" />
                        <div className="w-full h-56 bg-slate-100/50 dark:bg-slate-700/50 rounded-[32px]" />
                        <div className="grid grid-cols-2 gap-8">
                           <div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-[32px]" />
                           <div className="h-32 bg-slate-50 dark:bg-slate-700 rounded-[32px]" />
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {block.type === 'text' && (
               <div className="max-w-3xl">
                  <InlineEditable 
                    className="text-xl text-slate-700 leading-relaxed font-medium"
                    value={block.content?.text || 'Platform kami didesain untuk memberikan efisiensi maksimal dengan kecerdasan buatan terdepan.'}
                    onChange={(val) => onUpdateContent({ text: val })}
                  />
               </div>
            )}

            {block.type === 'image' && (
               <div className="w-full aspect-[21/9] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-sm relative group/img">
                  {block.content?.url ? (
                    <img src={block.content.url} alt="Content" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                      <Image className="w-16 h-16 mb-4 opacity-10" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Neural Canvas Asset</span>
                    </div>
                  )}
               </div>
            )}

            {block.type === 'button' && (
               <div className="flex gap-4">
                  <div className="px-12 py-5 bg-brand-blue text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-blue/30 text-[12px] hover:scale-105 transition-all">
                     <InlineEditable 
                        value={block.content?.text || 'Get Started Now'}
                        onChange={(val) => onUpdateContent({ text: val })}
                      />
                  </div>
               </div>
            )}

            {block.type === 'testimonial' && (
               <div className="max-w-3xl mx-auto text-center space-y-8 bg-slate-50/50 p-16 rounded-[64px] border border-slate-100/50">
                  <div className="flex justify-center gap-1.5 text-brand-blue opacity-40">
                     {[1, 2, 3, 4, 5].map(star => <Sparkles key={star} className="w-4 h-4" />)}
                  </div>
                  <InlineEditable 
                    className="text-3xl font-black text-slate-900 leading-tight tracking-tight italic"
                    value={block.content?.text || 'This platform changed everything.'}
                    onChange={(val) => onUpdateContent({ text: val })}
                  />
                  <div className="flex flex-col items-center pt-4">
                    <InlineEditable 
                      className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]"
                      value={block.content?.name || 'Alex Morgan'}
                      onChange={(val) => onUpdateContent({ name: val })}
                    />
                    <InlineEditable 
                      className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]"
                      value={block.content?.role || 'CEO at Flux Inc'}
                      onChange={(val) => onUpdateContent({ role: val })}
                    />
                  </div>
               </div>
            )}

            {block.type === 'cta' && (
               <div className="w-full bg-slate-950 p-20 md:p-32 rounded-[80px] text-center space-y-10 relative overflow-hidden group/cta">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 space-y-6">
                    <InlineEditable 
                        className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none"
                        value={block.content?.title || 'Start Your Journey.'}
                        onChange={(val) => onUpdateContent({ title: val })}
                    />
                  </div>
                  <div className="flex justify-center relative z-10 pt-4">
                     <div className="px-16 py-6 bg-white text-slate-950 rounded-full font-black uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105 text-[12px]">
                        <InlineEditable 
                            value={block.content?.buttonText || 'Join Now'}
                            onChange={(val) => onUpdateContent({ buttonText: val })}
                        />
                     </div>
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Add Section Helper Button */}
        {isSelected && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-[50]">
             <button 
               onClick={(e) => { e.stopPropagation(); onAddAfter(); }}
               className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-brand-blue/60 transition-all cursor-pointer border-[5px] border-white dark:border-[#0c111d] group/add"
             >
                <Plus className="w-4 h-4 transition-transform group-hover/add:rotate-90" />
             </button>
          </div>
        )}
      </div>
    );
};

const ContentStructureEditor = ({ onBack, initialName, onPublish }: { onBack: () => void, initialName?: string, onPublish?: (name: string) => void }) => {
  const [activeAccordion, setActiveAccordion] = useState<string>('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [websiteName] = useState(initialName || 'Toko Kopi Merdeka');
  const [editorLayoutMode, setEditorLayoutMode] = useState<'edit-only' | 'preview-only'>('edit-only');
  
  // States for form inputs
  const [heroData, setHeroData] = useState({
    headline: 'Your Micro-Landing Page Title',
    subheadline: 'Craft a compelling description here, linking your headlines content...',
    cta: 'Get Started'
  });

  // States for AI Copilot in Editor
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const [aiCommand, setAiCommand] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ sender: 'user' | 'ai', text: string, data?: typeof heroData }>>([
    { sender: 'ai', text: 'Halo! Saya AI Copilot yang mengelola CMS Anda. Saya bisa membantu Anda menulis konten headline/subheadline premium, merekomendasikan kata-kata persuasif, dan menjadwalkan pembaruan situs secara otomatis. Apa yang ingin Anda lakukan hari ini?' }
  ]);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  
  // Scheduling states in editor
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2026-05-25');
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [scheduleFrequency, setScheduleFrequency] = useState('Sekali saja');
  const [isScheduleSaving, setIsScheduleSaving] = useState(false);
  
  // Toast notifications in editor
  const [editorToast, setEditorToast] = useState<string | null>(null);
  
  const triggerToast = (msg: string) => {
    setEditorToast(msg);
    setTimeout(() => setEditorToast(null), 3000);
  };

  const handleAiCommandSubmit = async () => {
    if (!aiCommand.trim()) return;
    
    const userMsg = aiCommand;
    setAiChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiCommand('');
    setIsGeneratingCopy(true);
    
    try {
      const result = await generateEditorCopy(userMsg, heroData);
      setAiChatHistory(prev => [...prev, { 
        sender: 'ai', 
        text: result.reply, 
        data: result.suggestedData 
      }]);
    } catch (error) {
      console.warn("Gemini Live Copilot error, using smart local fallback:", error);
      
      // Smart Fallback
      setTimeout(() => {
        let reply = 'Saya telah menganalisis instruksi Anda (Offline Fallback). ';
        let suggestedData = undefined;
        
        const lower = userMsg.toLowerCase();
        if (lower.includes('kopi') || lower.includes('robusta') || lower.includes('arabika') || lower.includes('toko')) {
          suggestedData = {
            headline: 'Cita Rasa Kopi Nusantara Asli',
            subheadline: 'Dibuat dari biji kopi pilihan petani lokal, dipanggang dengan keahlian presisi untuk menghasilkan kenikmatan secangkir kopi murni terbaik di setiap tegukan Anda.',
            cta: 'Beli Sekarang'
          };
          reply += 'Berikut adalah rekomendasi konten Landing Page bertema Kopi premium yang telah saya optimasi secara SEO & copywriting persuasif. Anda dapat langsung menerapkannya ke formulir editor di sebelah kiri.';
        } else if (lower.includes('jadwal') || lower.includes('pembaruan') || lower.includes('schedule') || lower.includes('update')) {
          reply += 'Untuk menjadwalkan pembaruan ini, silakan gunakan panel Penjadwalan Pembaruan AI di bawah. Saya merekomendasikan penjadwalan pada hari Selasa pukul 10:00 WIB untuk performa trafik & SEO yang optimal berdasarkan analisis tren industri Anda.';
        } else {
          suggestedData = {
            headline: 'Solusi Agroteknologi Modern & Berkelanjutan',
            subheadline: 'Menggabungkan kecerdasan buatan dan inovasi ramah lingkungan untuk melipatgandakan hasil panen serta menjaga kelestarian bumi demi masa depan pertanian yang lebih cerah.',
            cta: 'Mulai Uji Coba'
          };
          reply += 'Saya telah merancang materi visual dan copywriting dengan gaya modern dan persuasif untuk bisnis Anda. Klik tombol di bawah untuk menerapkannya ke formulir.';
        }
        
        setAiChatHistory(prev => [...prev, { sender: 'ai', text: reply, data: suggestedData }]);
        setIsGeneratingCopy(false);
      }, 1000);
      return;
    }
    
    setIsGeneratingCopy(false);
  };

  return (
    <div className="fixed inset-0 bg-[#0a0f1c] z-[100] flex flex-col animate-in fade-in duration-500 font-sans text-slate-200">
      
      {/* PREMIUM GLOBAL TOP BAR */}
      <div className="h-[72px] border-b border-slate-800 bg-[#0f172a] flex items-center justify-between px-6 shrink-0 relative z-30 shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 shadow-sm"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">PROYEK WEBSITE</div>
            <span className="text-sm font-black text-white tracking-tight uppercase leading-none">{websiteName}</span>
          </div>
        </div>

        {/* Layout Selector Toggles */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800">
          {[
            { id: 'edit-only', label: 'Form Only', icon: <Edit3 className="w-4 h-4" /> },
            { id: 'preview-only', label: 'Preview Only', icon: <Eye className="w-4 h-4" /> }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setEditorLayoutMode(mode.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                editorLayoutMode === mode.id 
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {mode.icon}
              <span className="hidden md:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Device Toggles (only active if preview is shown) */}
          {editorLayoutMode !== 'edit-only' && (
            <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800">
              {[
                { id: 'desktop', icon: <Monitor className="w-4 h-4" /> },
                { id: 'tablet', icon: <Tablet className="w-4 h-4" /> },
                { id: 'mobile', icon: <Smartphone className="w-4 h-4" /> }
              ].map(dev => (
                <button 
                  key={dev.id}
                  onClick={() => setPreviewMode(dev.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center justify-center ${
                    previewMode === dev.id 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                  title={`Pratinjau ${dev.id}`}
                >
                  {dev.icon}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              isAiSidebarOpen 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20' 
                : 'bg-slate-900 border border-slate-800 text-purple-400 hover:text-purple-300 hover:bg-slate-850'
            }`}
            title="Toggle AI Copilot Assistant"
          >
            <Bot className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          <button 
            onClick={() => onPublish && onPublish(websiteName)} 
            className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-blue/20 flex items-center gap-2"
          >
            Publish <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE AREA */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR: CONTENT EDITOR */}
        {editorLayoutMode !== 'preview-only' && (
          <div className={`${editorLayoutMode === 'edit-only' ? 'flex-1 max-w-4xl mx-auto border-x border-slate-800' : 'w-[420px]'} bg-[#111827] border-r border-slate-800 flex flex-col h-full shrink-0 shadow-2xl relative z-10 overflow-hidden transition-all duration-300`}>
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
               <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
                 <Edit3 className="w-4 h-4 text-brand-blue" /> Content Editor Form
               </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
               {/* Accordion 1: Hero Section */}
               <div className={`rounded-2xl border transition-colors duration-300 ${activeAccordion === 'hero' ? 'bg-[#182136] border-slate-700 shadow-lg' : 'bg-transparent border-slate-800 hover:border-slate-700'} backdrop-blur-sm bg-white/5`}>
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === 'hero' ? '' : 'hero')}
                    className="w-full flex items-center justify-between p-5"
                  >
                    <div className="flex items-center gap-3">
                       <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === 'hero' ? 'rotate-90 text-brand-blue' : ''}`} />
                       <span className={`text-sm font-bold ${activeAccordion === 'hero' ? 'text-white' : 'text-slate-300'}`}>Hero Section</span>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeAccordion === 'hero' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 space-y-5">
                           {/* Headline */}
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-500">Headline</label>
                              <input 
                                value={heroData.headline}
                                onChange={(e) => setHeroData({...heroData, headline: e.target.value})}
                                className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl p-3 text-sm font-medium text-white outline-none focus:border-brand-blue/50 transition-colors"
                              />
                           </div>
                           
                           {/* Subheadline with Image 1 Upload */}
                           <div className="flex flex-col gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-500">Subheadline</label>
                                <textarea 
                                  value={heroData.subheadline}
                                  onChange={(e) => setHeroData({...heroData, subheadline: e.target.value})}
                                  className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl p-3 text-xs font-medium text-white outline-none focus:border-brand-blue/50 transition-colors h-24 resize-none"
                                />
                              </div>
                              <div className="flex gap-3">
                                <button className="flex-1 h-12 bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center gap-2 transition-colors group">
                                   <Image className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                   <span className="text-[9px] font-bold text-slate-400 group-hover:text-white">Image 1</span>
                                </button>
                                <button className="flex-1 h-12 bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center gap-2 transition-colors group">
                                   <Upload className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                   <span className="text-[9px] font-bold text-slate-400 group-hover:text-white">Upload</span>
                                </button>
                              </div>
                           </div>

                           {/* Image Slots */}
                           <div className="flex gap-3">
                              <button className="flex-1 h-16 bg-slate-800/30 border border-slate-700 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors group">
                                 <Image className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                 <span className="text-[9px] font-bold text-slate-500">Image 1</span>
                              </button>
                              <button className="flex-[2] h-16 bg-slate-800/30 border border-slate-700 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors group">
                                 <Image className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                 <span className="text-[9px] font-bold text-slate-500">Image 2</span>
                              </button>
                              <button className="flex-1 h-16 bg-slate-800/30 border border-slate-700 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors group">
                                 <Upload className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                 <span className="text-[9px] font-bold text-slate-500">Upload</span>
                              </button>
                           </div>

                           {/* CTA Button */}
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-500">CTA Button</label>
                              <div className="flex gap-3">
                                <input 
                                  value={heroData.cta}
                                  onChange={(e) => setHeroData({...heroData, cta: e.target.value})}
                                  className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl p-3 text-sm font-medium text-white outline-none focus:border-brand-blue/50 transition-colors"
                                />
                                <button className="px-4 bg-slate-800/50 border border-slate-700 hover:bg-slate-700 rounded-xl flex items-center gap-2 transition-colors">
                                   <LayoutGrid className="w-4 h-4 text-slate-400" />
                                   <span className="text-xs font-bold text-slate-300">Icon</span>
                                </button>
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Other Accordions */}
               {['About Product', 'Pricing', 'Features'].map((title) => (
                 <div key={title} className={`rounded-2xl border transition-colors duration-300 ${activeAccordion === title ? 'bg-[#182136] border-slate-700 shadow-lg' : 'bg-[#0a0f1c]/50 border-slate-800 hover:border-slate-700'}`}>
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === title ? '' : title)}
                      className="w-full flex items-center justify-between p-5"
                    >
                      <div className="flex items-center gap-3">
                         <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeAccordion === title ? 'rotate-90 text-brand-blue' : ''}`} />
                         <span className={`text-sm font-bold ${activeAccordion === title ? 'text-white' : 'text-slate-400'}`}>{title}</span>
                      </div>
                    </button>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* RIGHT AREA: RESPONSIVE PREVIEW */}
        {editorLayoutMode !== 'edit-only' && (
          <div className="flex-1 flex items-center justify-center overflow-auto p-8 custom-scrollbar">
                <div 
                  className={`transition-all duration-500 ease-out-expo shadow-[0_45px_100px_rgba(0,0,0,0.8)] relative overflow-hidden bg-slate-900 border border-slate-800 ${
                    previewMode === 'mobile' ? 'w-[320px] h-[640px] rounded-[48px] border-[14px] border-slate-800 ring-2 ring-white/10' : 
                    previewMode === 'tablet' ? 'w-[640px] h-[800px] rounded-[36px] border-[14px] border-slate-800 ring-2 ring-white/10' : 
                    'w-[92%] max-w-[960px] h-[80%] max-h-[560px] rounded-3xl border border-slate-800 bg-[#0f172a]'
                  }`}
                >
                  {/* Fake Content for Live Preview based on Editor Input */}
                  <div className="w-full h-full flex flex-col bg-slate-50 text-slate-900 overflow-hidden relative">
                    {/* Browser Mock Header for Desktop */}
                    {previewMode === 'desktop' && (
                      <div className="bg-slate-100/90 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5 flex items-center gap-3 shrink-0 select-none z-20">
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90" />
                        </div>
                        <div className="flex-1 max-w-[480px] mx-auto bg-white/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg py-1 px-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold leading-none">
                          <div className="flex items-center gap-1.5 truncate">
                            <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{websiteName.toLowerCase().replace(/\s+/g, '-')}.landfarm.id</span>
                          </div>
                          <RefreshCw className="w-2.5 h-2.5 opacity-55 hover:opacity-100 transition-opacity cursor-pointer shrink-0" />
                        </div>
                      </div>
                    )}

                    {/* Mobile Dynamic Notch */}
                    {previewMode === 'mobile' && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center border border-white/5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-8" />
                        <div className="w-8 h-1 bg-slate-800 rounded-full" />
                      </div>
                    )}

                    {/* Scrollable Viewport Content */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col custom-scrollbar">
                      <header className="px-8 py-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-10">
                        <div className="text-lg font-black tracking-tighter text-brand-blue uppercase">{websiteName}</div>
                        <div className="flex gap-6 hidden md:flex">
                           <span className="text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-900">About</span>
                           <span className="text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-900">Features</span>
                           <span className="text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-900">Pricing</span>
                        </div>
                      </header>
                      <main className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-b from-white to-slate-50 relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
                           <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">{heroData.headline}</h1>
                           <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">{heroData.subheadline}</p>
                           <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                              {heroData.cta}
                           </button>
                        </div>
                        {/* Placeholder for images to show the image slots actually mattering */}
                        <div className="mt-16 w-full max-w-4xl grid grid-cols-3 gap-6 opacity-80 relative z-10">
                           <div className="col-span-1 aspect-square bg-slate-200 rounded-3xl animate-pulse flex items-center justify-center">
                              <Image className="w-8 h-8 text-slate-400" />
                           </div>
                           <div className="col-span-2 aspect-video bg-slate-200 rounded-3xl animate-pulse flex items-center justify-center">
                              <Image className="w-12 h-12 text-slate-400" />
                           </div>
                        </div>
                     </main>
                  </div>
                </div>
             </div>
          </div>
         )}

        {isAiSidebarOpen && (
           <div className="w-[360px] bg-[#0f172a] border-l border-slate-800 flex flex-col h-full shrink-0 shadow-2xl relative z-20 overflow-hidden transition-all duration-300">
             {/* Header */}
             <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#131e35] shrink-0">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-purple-300 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400 animate-bounce" /> AI Copilot Manager
                </h3>
                <button 
                  onClick={() => setIsAiSidebarOpen(false)} 
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
             </div>
             
             {/* Scrollable Content */}
             <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                {/* AI Assistant Chat Console */}
                <div className="space-y-4">
                   <div className="space-y-3 bg-[#0a0f1c] border border-slate-800/80 p-4 rounded-2xl h-[280px] overflow-y-auto custom-scrollbar flex flex-col gap-2.5">
                      {aiChatHistory.map((chat, i) => (
                        <div key={i} className={`flex flex-col gap-1 max-w-[85%] ${chat.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                          <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-widest">{chat.sender === 'user' ? 'Anda' : 'AI Copilot'}</span>
                          <div className={`p-3 rounded-2xl text-[10px] leading-relaxed ${
                            chat.sender === 'user' 
                              ? 'bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-500/10' 
                              : 'bg-[#182136] text-slate-200 rounded-tl-none border border-slate-700/30'
                          }`}>
                            {chat.text}
                          </div>
                          {chat.data && (
                            <button
                              onClick={() => {
                                setHeroData({
                                  headline: chat.data!.headline,
                                  subheadline: chat.data!.subheadline,
                                  cta: chat.data!.cta
                                });
                                triggerToast('Konten AI berhasil diterapkan!');
                              }}
                              className="mt-1.5 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-350 border border-purple-500/20 rounded-lg text-[8.5px] font-black uppercase tracking-wider transition-all flex items-center gap-1 self-start"
                            >
                              <Check className="w-3 h-3 text-purple-400" /> Terapkan ke Formulir
                            </button>
                          )}
                        </div>
                      ))}
                      {isGeneratingCopy && (
                        <div className="self-start flex flex-col gap-1">
                          <span className="text-[7.5px] font-black text-purple-400 uppercase tracking-widest">AI Sedang Menulis...</span>
                          <div className="bg-[#182136] p-3 rounded-2xl rounded-tl-none text-[10px] text-slate-400 border border-slate-700/30 animate-pulse">
                            Menganalisis perintah & merumuskan copywriting terbaik...
                          </div>
                        </div>
                      )}
                   </div>
                   
                   {/* Chat Input */}
                   <div className="flex gap-2">
                      <input 
                        value={aiCommand}
                        onChange={(e) => setAiCommand(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAiCommandSubmit(); }}
                        placeholder="Perintahkan AI (cth: Tulis copywriting kopi)"
                        className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500/50"
                      />
                      <button 
                        onClick={handleAiCommandSubmit}
                        className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center hover:bg-purple-500 transition-colors shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                
                {/* Scheduling Center */}
                <div className="space-y-4 pt-5 border-t border-slate-800">
                   <h4 className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                     <Calendar className="w-4 h-4 text-purple-400" /> Penjadwalan Pembaruan AI
                   </h4>
                   
                   <div className="bg-[#182136]/30 border border-slate-800/80 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-300">Aktifkan Penjadwalan</span>
                        <div 
                          onClick={() => setIsScheduleEnabled(!isScheduleEnabled)}
                          className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${isScheduleEnabled ? 'bg-purple-600' : 'bg-slate-800'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${isScheduleEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      
                      {isScheduleEnabled ? (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[7.5px] font-black text-slate-500 uppercase tracking-wider">Tanggal Rilis</label>
                              <input 
                                type="date"
                                value={scheduleDate}
                                onChange={(e) => setScheduleDate(e.target.value)}
                                className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg p-2 text-[10px] text-white outline-none focus:border-purple-500/50"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[7.5px] font-black text-slate-500 uppercase tracking-wider">Waktu Rilis</label>
                              <input 
                                type="time"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg p-2 text-[10px] text-white outline-none focus:border-purple-500/50"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[7.5px] font-black text-slate-500 uppercase tracking-wider">Frekuensi Pembaruan</label>
                            <select 
                              value={scheduleFrequency}
                              onChange={(e) => setScheduleFrequency(e.target.value)}
                              className="w-full bg-[#0a0f1c] border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 outline-none"
                            >
                              <option>Sekali saja</option>
                              <option>Setiap Hari</option>
                              <option>Setiap Minggu (Hari rekomendasi AI)</option>
                            </select>
                          </div>
                          
                          <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-xl text-[9px] text-purple-300 leading-relaxed">
                             💡 **Rekomendasi AI**: Waktu publish terpilih bertepatan dengan lonjakan trafik organik hari kerja. AI menyarankan tanggal **26 Mei 2026 pukul 10:00 WIB** untuk performa retensi maksimal.
                          </div>
                          
                          <button
                            onClick={() => {
                              setIsScheduleSaving(true);
                              setTimeout(() => {
                                setIsScheduleSaving(false);
                                triggerToast('Jadwal pembaruan berhasil disimpan!');
                              }, 1000);
                            }}
                            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5"
                          >
                            {isScheduleSaving ? 'Menyimpan...' : (
                              <>
                                <Check className="w-3.5 h-3.5" /> Konfirmasi Jadwal AI
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <p className="text-[9px] text-slate-500 leading-relaxed">
                          Aktifkan toggle di atas untuk menunda dan menjadwalkan publikasi pembaruan halaman ini secara otomatis menggunakan kecerdasan AI.
                        </p>
                      )}
                   </div>
                </div>
             </div>
           </div>
        )}
      </div>

      {/* Toast Notification */}
      {editorToast && (
        <div className="fixed bottom-6 right-6 bg-[#131e35] border border-purple-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl z-[200] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-450 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider">{editorToast}</span>
        </div>
      )}
    </div>
  );
};
const DashboardView = ({ setView, theme, toggleTheme }: { setView: (v: string) => void, theme: string, toggleTheme: () => void }) => {
  const [subView, setSubView] = useState('overview');
  const [isCmsEditorOpen, setIsCmsEditorOpen] = useState(false);
  const [selectedEditorSection, setSelectedEditorSection] = useState('Hero Section');
  const [cmsNavMode, setCmsNavMode] = useState('landing'); // 'landing', 'manual', 'ai', 'editor', 'preview', 'drafts', 'setup-progress'
  const [savedDrafts, setSavedDrafts] = useState<any[]>([
    { 
      id: 'DRAFT-7712', 
      name: 'Bengkel Cepat Jaya', 
      category: 'Jasa Profesional', 
      description: 'Layanan servis motor dan mobil cepat, terpercaya, dan bergaransi dengan mekanik handal.', 
      createdAt: '24 Mei 2026', 
      color: '#3B82F6', 
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80' 
    }
  ]);
  const [cmsSubTab, setCmsSubTab] = useState('manual');
  const [cmsPosts, setCmsPosts] = useState([
    { id: 1, title: "Strategi Kopi 2026", status: "Published", author: "Sarah Anderson", score: 92, date: "24 Mei 2026", type: "Blog Post" },
    { id: 2, title: "Menemukan Biji Terbaik", status: "Draft", author: "Sarah Anderson", score: 78, date: "23 Mei 2026", type: "Blog Post" },
    { id: 3, title: "Teknik Brewing Modern", status: "Published", author: "Admin", score: 88, date: "22 Mei 2026", type: "Blog Post" },
    { id: 4, title: "Membangun UMKM Digital", status: "Published", author: "Sarah Anderson", score: 95, date: "20 Mei 2026", type: "Blog Post" },
    { id: 5, title: "Tren Bisnis Kopi Global", status: "Published", author: "Admin", score: 84, date: "18 Mei 2026", type: "Blog Post" },
  ]);
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('Profesional');
  const [aiLength, setAiLength] = useState('Sedang (600 kata)');
  const [isGeneratingAiPost, setIsGeneratingAiPost] = useState(false);
  const [aiPostProgress, setAiPostProgress] = useState(0);
  const [aiPostStepText, setAiPostStepText] = useState('');
  const [isSmartScheduling, setIsSmartScheduling] = useState(true);
  const [aiSchedulerFrequency, setAiSchedulerFrequency] = useState('3 postingan / minggu');
  const [aiPrompt, setAiPrompt] = useState('');

  const [aiData, setAiData] = useState({
    description: '',
    target: '',
    style: 'Modern & Sleek'
  });

  const [manualData, setManualData] = useState({
    name: '',
    subdomain: '',
    category: 'E-Commerce / Toko Online',
    template: 'Modern Dark Pro (Recommended)',
    color: '#3B82F6',
    description: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const menuItems = [
    { id: 'overview', icon: <LucideLineChart className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'buat_situs', icon: <Plus className="w-5 h-5" />, label: 'Create Site' },
    { id: 'templates', icon: <Layout className="w-5 h-5" />, label: 'Templates' },
    { id: 'cms', icon: <Layers className="w-5 h-5" />, label: 'CMS' },
    { id: 'tokens', icon: <Banknote className="w-5 h-5" />, label: 'Buy Tokens' },
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  const [userProjects, setUserProjects] = useState([
    { id: 'PROJ-01', name: 'Toko Kopi Merdeka', status: 'Online', views: '2.4k', type: 'E-Commerce', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80' },
    { id: 'PROJ-02', name: 'Bengkel Cepat Jaya', status: 'Draft', views: '0', type: 'Landing Page', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80' },
  ]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Anderson',
    email: 'user@landfarm.id',
    phone: '0812-3456-7890',
    location: 'Jakarta, ID'
  });

  const [cmsStep, setCmsStep] = useState(1); // 1: Input, 2: Planning, 3: Review, 4: Refinement
  const [showDomainManager, setShowDomainManager] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [showGeneratedResult, setShowGeneratedResult] = useState(false);
  const [genStep, setGenStep] = useState(1); // 1: Creating Web, 2: Result
  const [businessData, setBusinessData] = useState({
    name: '',
    category: '',
    product: '',
    target: '',
    tone: 'Profesional',
    theme: 'Modern Blue',
    cta: ''
  });
  const [agenticStrategy, setAgenticStrategy] = useState<any>(null);
  const [generatedDraft, setGeneratedDraft] = useState<any>(null);
  const [versions, setVersions] = useState<any[]>([]);
  const [userFeedback, setUserFeedback] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState('Modern');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedFont, setSelectedFont] = useState('Sans-Serif');
  const [editorPreviewMode, setEditorPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [editorTab, setEditorTab] = useState<'content' | 'layout' | 'style'>('content');
  const [fontSize, setFontSize] = useState(48);
  const [vPadding, setVPadding] = useState(16);
  const [editorTheme, setEditorTheme] = useState<'dark' | 'light'>('dark');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  useEffect(() => {
    setShowDomainManager(false);
  }, [subView]);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAiBuild = async () => {
    const errors: Record<string, string> = {};
    if (!aiData.description.trim()) errors.description = 'Deskripsi bisnis wajib diisi';
    if (!aiData.target.trim()) errors.target = 'Target audiens wajib diisi';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsGenerating(true);
    setGenProgress(0);
    setGenStep(1);

    // Simulation steps
    const steps = [
      { progress: 20, text: 'Menganalisis deskripsi bisnis...' },
      { progress: 40, text: 'Merancang struktur halaman...' },
      { progress: 60, text: 'Menyiapkan aset visual...' },
      { progress: 85, text: 'Mengoptimasi konten SEO...' },
      { progress: 100, text: 'Selesai!' }
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600));
      setGenProgress(step.progress);
    }

    try {
      const draft = await generateWebsiteDraft(
        'Situs Bisnis AI',
        'General',
        aiData.description
      );
      
      setGeneratedDraft({
        ...draft,
        sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer']
      });
      setSelectedColor(draft.themeColor);
      setCmsNavMode('preview');
      showNotification('Website berhasil dibangun!', 'success');
    } catch (error) {
      setGeneratedDraft({
        headline: 'Selamat Datang di Bisnis Kami',
        subheadline: aiData.description,
        cta: 'Mulai Sekarang',
        url: 'uni-landfarm.ai/preview-site',
        sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer'],
        themeColor: '#3B82F6'
      });
      setCmsNavMode('preview');
      showNotification('Gagal menghubungi AI, menggunakan draf default.', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualSetup = async () => {
    const errors: Record<string, string> = {};
    if (!manualData.name.trim()) errors.name = 'Nama website wajib diisi';
    if (!manualData.subdomain.trim()) errors.subdomain = 'Domain wajib diisi';
    if (!manualData.description.trim()) errors.description = 'Deskripsi bisnis wajib diisi';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsGenerating(true);
    
    const draft = await generateWebsiteDraft(
      manualData.name,
      manualData.category,
      manualData.description
    );
    
    setGeneratedDraft({
      ...draft,
      sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer']
    });
    setSelectedColor(manualData.color);
    
    setIsGenerating(false);
    setCmsNavMode('preview');
    showNotification('Website berhasil dikonfigurasi!', 'success');
  };

  const handleCreateRancangan = async () => {
    const errors: Record<string, string> = { ...formErrors };
    if (!manualData.link) {
      if (!manualData.name.trim()) errors.name = 'Nama website wajib diisi';
      if (!manualData.description.trim()) errors.description = 'Deskripsi bisnis wajib diisi';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setIsGenerating(true);
    setGenProgress(0);

    try {
      // Simulate saving
      const newDraft = {
        id: `DRAFT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        name: manualData.name,
        category: manualData.category,
        description: manualData.description,
        color: manualData.color,
        createdAt: new Date().toLocaleDateString('id-ID'),
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'
      };

      await new Promise(r => setTimeout(r, 1500));
      setSavedDrafts(prev => [newDraft, ...prev]);
      setCmsNavMode('drafts');
      showNotification('Rancangan draf berhasil disimpan!', 'success');
    } catch (e) {
      showNotification('Gagal menyimpan draf.', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAiPost = async () => {
    if (!aiTopic.trim()) {
      showNotification('Silakan isi topik atau judul artikel terlebih dahulu!', 'info');
      return;
    }
    
    setIsGeneratingAiPost(true);
    setAiPostProgress(0);
    
    const steps = [
      { progress: 15, text: 'Melakukan riset kompetitor & keyword SEO...' },
      { progress: 35, text: 'Menyusun outline & kerangka heading artikel...' },
      { progress: 60, text: 'Membangkitkan konten berkualitas tinggi menggunakan AI...' },
      { progress: 85, text: 'Mengoptimasi kepadatan kata kunci & meta tag...' },
      { progress: 100, text: 'Menyimpan artikel ke draf CMS...' }
    ];
    
    for (const step of steps) {
      setAiPostStepText(step.text);
      await new Promise(r => setTimeout(r, 600));
      setAiPostProgress(step.progress);
    }
    
    const newPost = {
      id: cmsPosts.length + 1,
      title: aiTopic,
      status: "Draft",
      author: "Agentic AI Writer",
      score: Math.floor(Math.random() * 15) + 85,
      date: new Date().toLocaleDateString('id-ID'),
      type: "Blog Post"
    };
    
    setCmsPosts(prev => [newPost, ...prev]);
    setIsGeneratingAiPost(false);
    setAiTopic('');
    showNotification('Artikel AI berhasil dibuat dan disimpan ke Draf!', 'success');
    setCmsSubTab('manual'); // Redirect to Manual CMS to see it!
  };

  const handleGenerateFromPrompt = async () => {
    if (!aiPrompt) {
      showNotification('Tuliskan dulu bagaimana situs yang Anda inginkan.', 'info');
      return;
    }
    setCmsNavMode('editor');
    setIsGenerating(true);
    try {
      const draft = await generateWebsiteDraft(
        'Visi Baru',
        'Kustom',
        aiPrompt
      );
      
      setAgenticStrategy({
        persona: 'AI Visionary Creator',
        valueProp: aiPrompt,
        tone: 'Futuristik',
        theme: 'Space Black',
        sections: draft.sections.map(s => ({ title: s, content: `AI Generated Content for ${s}` })),
        copy: {
          headline: draft.headline,
          subheadline: draft.subheadline,
          cta: draft.cta
        }
      });
      
      setGeneratedDraft({
        headline: draft.headline,
        subheadline: draft.subheadline,
        cta: draft.cta,
        url: draft.url,
        sections: draft.sections
      });
      
      if (draft.themeColor) {
        setSelectedColor(draft.themeColor);
      }

      showNotification('Visi Anda telah diwujudkan oleh AI!', 'success');
    } catch (error) {
      console.error(error);
      showNotification('AI sedang sibuk. Menggunakan draft standar.', 'info');
      
      setGeneratedDraft({
        headline: 'Masa Depan Digital',
        subheadline: aiPrompt,
        cta: 'Coba AI Sekarang',
        url: 'uni-landfarm.ai/visionary-site',
        sections: ['Hero', 'Features', 'Beta']
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateWeb = () => {
    setSubView('templates');
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

  const [activeTemplateFilter, setActiveTemplateFilter] = useState('Semua');
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  const allLibraryTemplates = [
    { title: "Minimalist Law Firm", category: "Legal", img: "https://picsum.photos/seed/law/800/600", type: "Landing Page" },
    { title: "Vibrant Coffee Shop", category: "Makanan", img: "https://picsum.photos/seed/coffee/800/600", type: "E-Commerce" },
    { title: "Tech Startup Portfolio", category: "Teknologi", img: "https://picsum.photos/seed/tech/800/600", type: "SaaS" },
    { title: "Modern Real Estate", category: "Properti", img: "https://picsum.photos/seed/house/800/600", type: "Landing Page" },
    { title: "Creative Design Studio", category: "Kreatif", img: "https://picsum.photos/seed/design/800/600", type: "Portfolio" },
    { title: "Industrial Solutions", category: "Manufaktur", img: "https://picsum.photos/seed/factory/800/600", type: "Korporat" },
    { title: "E-learning Hub", category: "Teknologi", img: "https://picsum.photos/seed/edu/800/600", type: "Layanan" },
    { title: "Gourmet Garden", category: "Makanan", img: "https://picsum.photos/seed/garden/800/600", type: "E-Commerce" },
  ];

  const filteredLibraryTemplates = activeTemplateFilter === 'Semua' 
    ? allLibraryTemplates 
    : allLibraryTemplates.filter(t => t.category === activeTemplateFilter);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      showNotification('Situs berhasil dipublikasikan!');
      
      // Update userProjects when published
      const newProject = {
        id: `PROJ-0${userProjects.length + 1}`,
        name: businessData.name || 'Situs Baru',
        status: 'Online',
        views: '0',
        type: businessData.category || 'Landing Page',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'
      };
      setUserProjects([newProject, ...userProjects]);
      setSubView('overview');
      setCmsNavMode('landing');
    }, 2000);
  };

  const handleUpdateCurrentProject = () => {
    showNotification('Perubahan berhasil disimpan! Proyek akan diperbarui.');
  };

  const [integrations, setIntegrations] = useState([
    { name: "Domain Kustom", icon: <Globe className="text-brand-blue" />, status: "Tersedia", color: "bg-blue-50" },
    { name: "Instagram Business", icon: <Instagram className="text-pink-500" />, status: "Hubungkan", color: "bg-pink-50" },
    { name: "WhatsApp Business", icon: <MessageSquare className="text-emerald-500" />, status: "Terhubung", color: "bg-emerald-50" },
    { name: "Facebook Pixel", icon: <Facebook className="text-blue-600" />, status: "Terhubung", color: "bg-blue-50" },
    { name: "Google Analytics", icon: <BarChart3 className="text-amber-500" />, status: "Hubungkan", color: "bg-amber-50" },
    { name: "TikTok Ads", icon: <Music2 className="text-pink-500" />, status: "Hubungkan", color: "bg-pink-50" },
    { name: "Payment Gateway", icon: <CreditCard className="text-indigo-500" />, status: "Hubungkan", color: "bg-indigo-50" },
    { name: "Email Marketing", icon: <Mail className="text-orange-500" />, status: "Hubungkan", color: "bg-orange-50" },
  ]);

  const toggleIntegration = (index: number) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].status = newIntegrations[index].status === 'Terhubung' ? 'Hubungkan' : 'Terhubung';
    setIntegrations(newIntegrations);
  };

    const renderSubView = () => {
    switch (subView) {
      case 'panduan':
        return (
          <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-10000" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-10000" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-6">
              <div>
                <button 
                  onClick={() => setSubView('overview')}
                  className="flex items-center gap-2 text-[9px] font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors mb-2.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard
                </button>
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2.5">Pusat Panduan AI</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pelajari cara memaksimalkan landing page bisnis Anda dengan asisten AI kami.</p>
              </div>
              <div className="relative shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari panduan..." 
                  className="w-full md:w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-brand-blue/20 transition-all dark:text-white" 
                />
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Panduan AI Gen",
                  desc: "Mulai bangun situs web bisnis pertama Anda dengan memasukkan deskripsi produk. Asisten AI akan merancang tata letak, aset visual, dan salinan pemasaran secara instan.",
                  time: "Membaca 3 Menit",
                  icon: <Zap className="w-5 h-5 text-brand-blue" />,
                  bg: "bg-blue-500/5 dark:bg-blue-600/10",
                  steps: ["Pilih template awal", "Ketik deskripsi produk/bisnis Anda", "Klik 'Buat dengan AI' dan saksikan keajaibannya"]
                },
                {
                  title: "Tips SEO 2024",
                  desc: "Temukan taktik mutakhir untuk memastikan bisnis Anda ditemukan oleh calon pelanggan. Optimalkan kata kunci, deskripsi meta, dan integrasi analitik bawaan platform kami.",
                  time: "Membaca 5 Menit",
                  icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
                  bg: "bg-emerald-500/5 dark:bg-emerald-600/10",
                  steps: ["Atur meta title & description spesifik", "Gunakan kata kunci lokal (misal: 'sepeda jakarta')", "Hubungkan Google Analytics / Pixel"]
                },
                {
                  title: "Sistem Manajemen CMS",
                  desc: "Kelola halaman, edit isi draf, simpan perubahan, dan atur domain kustom Anda. Platform kami mendukung penyimpanan instan dan publikasi satu klik.",
                  time: "Membaca 4 Menit",
                  icon: <Database className="w-5 h-5 text-purple-500" />,
                  bg: "bg-purple-500/5 dark:bg-purple-600/10",
                  steps: ["Gunakan editor draf untuk mengedit cepat", "Kelola semua file proyek aktif Anda", "Publikasikan dengan satu klik untuk tayang online"]
                },
                {
                  title: "Pengelolaan Token & Akun",
                  desc: "Ketahui cara menggunakan point token Anda untuk meregenerasi aset teks/gambar AI dan keuntungan melakukan upgrade ke akun Pro.",
                  time: "Membaca 2 Menit",
                  icon: <Sparkles className="w-5 h-5 text-amber-500" />,
                  bg: "bg-amber-500/5 dark:bg-amber-600/10",
                  steps: ["Gunakan token secara bijak untuk teks marketing", "Upgrade ke Pro untuk domain kustom gratis", "Nikmati token tak terbatas pada paket korporat"]
                }
              ].map((guide, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-premium-hover transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 ${guide.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                        {guide.icon}
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{guide.time}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight leading-tight">{guide.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">{guide.desc}</p>
                    
                    {/* Mock Steps */}
                    <div className="border-t border-slate-50 dark:border-white/5 pt-4 space-y-2">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Langkah Utama:</h4>
                      {guide.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
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
      case 'tokens':
        return <TokenDashboardContent showNotification={showNotification} />;
      case 'overview':
        return (
          <div className="max-w-6xl mx-auto space-y-6 relative">
            {/* Background Glows for Dark Mode */}
            <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-10000" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse delay-5000 duration-10000" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
              <div>
                <h2 className="text-md lg:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">Halo, Pebisnis Modern!</h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Siap untuk mengotomatisasi ekosistem digital Anda hari ini?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'templates', title: "Total Web", value: "12", icon: <Globe className="w-3.5 h-3.5 text-glow" />, color: "text-blue-500", bg: "bg-blue-500/5 dark:bg-blue-600/10", glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
                { id: 'overview', title: "Total Views", value: "45.2k", icon: <Eye className="w-3.5 h-3.5 text-glow" />, color: "text-indigo-500", bg: "bg-indigo-500/5 dark:bg-indigo-600/10", glow: "group-hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]" },
                { id: 'tokens', title: "Token Point", value: "2,500", icon: <Zap className="w-3.5 h-3.5 text-glow" />, color: "text-amber-500", bg: "bg-amber-500/5 dark:bg-amber-600/10", glow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => setSubView(stat.id)}
                  className={`bg-white dark:bg-slate-900 overflow-hidden min-h-[90px] p-4 rounded-2xl border transition-all hover:translate-y-[-2px] cursor-pointer group flex items-center gap-4 shadow-sm ${stat.glow} ${
                    stat.id === 'templates' ? 'border-blue-500/5 hover:border-blue-500/20' :
                    stat.id === 'overview' ? 'border-indigo-500/5 hover:border-indigo-500/20' :
                    'border-amber-500/5 hover:border-amber-500/20'
                  }`}
                >
                  <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-105 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 leading-none">{stat.title}</p>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[11px] font-black text-slate-900 dark:text-white tracking-tight uppercase">Proyek Aktif</h3>
                  <button onClick={() => setSubView('templates')} className="text-brand-blue text-[8.5px] font-black uppercase tracking-widest hover:underline px-3 py-1 bg-brand-blue/5 rounded-full transition-colors">Lihat Semua</button>
                </div>
                
                {userProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {userProjects.map((project) => (
                      <div key={project.id} className="group bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-white/5 hover:border-brand-blue/20 transition-all flex flex-col gap-4 cursor-pointer shadow-sm">
                        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm relative">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-2 right-2 flex gap-1.5">
                            <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md ${project.status === 'Online' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                              {project.status === 'Online' && <span className="inline-block w-1 h-1 bg-white rounded-full animate-pulse" />}
                              {project.status}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{project.type}</span>
                            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[8px] font-bold uppercase">
                              <Eye className="w-2.5 h-2.5" /> <span>{project.views}</span>
                            </div>
                          </div>
                          <h4 className="text-xs font-black text-slate-900 dark:text-white truncate tracking-tight uppercase">{project.name}</h4>
                          <button onClick={() => setSubView('buat_situs')} className="bg-brand-blue text-white w-full py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                            Edit Situs <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={() => setSubView('templates')}
                      className="border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all group min-h-[160px]"
                    >
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-2 group-hover:bg-brand-blue/10 transition-all group-hover:scale-105 shadow-sm">
                        <Plus className="w-5 h-5 text-slate-300 group-hover:text-brand-blue" />
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-blue">Proyek Baru</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1 py-12">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                      <Plus className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">Belum Ada Proyek</h3>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium mb-6">Mulai bangun situs pertama Anda dengan AI Generator.</p>
                    <button 
                      onClick={() => setSubView('templates')}
                      className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
                    >
                      Buat Sekarang
                    </button>
                  </div>
                )}
              </div>
              </div>

              {/* RIGHT PANEL ACTIONS */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-brand-blue to-purple-600 rounded-2xl p-5 text-white shadow-lg overflow-hidden relative group">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 blur-2xl rounded-full transition-transform group-hover:scale-150 duration-700" />
                  <Rocket className="w-5 h-5 mb-3 drop-shadow-md" />
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-[10px] font-black tracking-tight uppercase">Siap Meluncur?</h4>
                    <span className="text-[7px] font-black bg-white/20 px-1.5 py-0.5 rounded-full">PRO</span>
                  </div>
                  <p className="text-white/80 text-[9px] font-medium leading-relaxed mb-4">
                    Gunakan domain kustom sendiri dan hapus branding platform.
                  </p>
                  <button 
                    onClick={() => setSubView('tokens')}
                    className="w-full py-2 bg-white text-brand-blue rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Upgrade <Zap className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 transition-colors duration-300">
                  <h4 className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                    Panduan & Bantuan
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                  </h4>
                  <div className="space-y-3">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Butuh bantuan belajar cara menggunakan Uni-LandFarm? Buka halaman panduan resmi kami.
                    </p>
                    <button 
                      onClick={() => setSubView('panduan')}
                      className="w-full py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 group"
                    >
                      Buka Panduan <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
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
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2">Pustaka Template</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pilih fondasi untuk situs web Anda.</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-within:text-brand-blue transition-colors" />
                  <input type="text" placeholder="Cari template..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-brand-blue/20 transition-all dark:text-white" />
                </div>
                <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-brand-blue transition-all">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {["Semua", "Teknologi", "Makanan", "Legal", "Kreatif", "Manufaktur", "Properti"].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveTemplateFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTemplateFilter === cat ? 'bg-brand-blue text-white shadow-blue' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-brand-blue/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLibraryTemplates.map((tpl, i) => (
                <div key={i} className="group relative bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-hover transition-all">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={tpl.img} alt={tpl.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm p-6">
                      <button 
                        onClick={async () => {
                          setBusinessData({
                            ...businessData,
                            name: tpl.title,
                            category: tpl.category,
                            product: `Layanan platform ${tpl.title} yang inovatif untuk sektor ${tpl.category}.`
                          });
                          
                          setSubView('buat_situs');
                          setCmsNavMode('editor');
                          setIsGenerating(true);
                          try {
                            const draft = await generateWebsiteDraft(
                              tpl.title,
                              tpl.category,
                              `Layanan platform ${tpl.title} yang inovatif untuk sektor ${tpl.category}.`
                            );
                            setGeneratedDraft({
                              headline: draft.headline,
                              subheadline: draft.subheadline,
                              cta: draft.cta,
                              url: draft.url,
                              sections: draft.sections
                            });
                            if (draft.themeColor) setSelectedColor(draft.themeColor);
                            showNotification('Templat berhasil dimuat dengan AI!', 'success');
                          } catch (error) {
                            setGeneratedDraft({
                              headline: tpl.title,
                              subheadline: `Solusi masa depan untuk platform ${tpl.category} Anda.`,
                              cta: 'Gunakan Sekarang',
                              url: `landfarm.ai/${tpl.title.toLowerCase().replace(/\s+/g, '-')}`,
                              sections: ['Header', 'Hero', 'Features', 'CTA']
                            });
                            setSelectedColor('#3B82F6');
                            showNotification('Gagal menghubungi AI. Menggunakan draft standar.', 'info');
                          } finally {
                            setIsGenerating(false);
                          }
                        }}
                        className="w-full bg-white text-slate-900 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                      >
                        Gunakan Template
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
                      <span className="text-[9px] font-black text-brand-blue uppercase tracking-[0.2em]">{tpl.category}</span>
                      <div className="flex gap-1">
                        <Monitor className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                        <Smartphone className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                      </div>
                    </div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{tpl.title}</h4>
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
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                  onClick={() => setPreviewTemplate(null)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative w-full max-w-5xl h-full bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
                >
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                        <Layout className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{previewTemplate.title}</h3>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{previewTemplate.category} â€¢ Pratinjau Responsif</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                    onClick={async () => {
                      setBusinessData({
                        ...businessData,
                        name: previewTemplate.title,
                        category: previewTemplate.category,
                        product: `Solusi cerdas untuk platform ${previewTemplate.category}.`
                      });
                      
                      setSubView('buat_situs');
                      setCmsNavMode('editor');
                      setIsGenerating(true);
                      const currentTemplate = previewTemplate;
                      setPreviewTemplate(null);
                      
                      try {
                        const draft = await generateWebsiteDraft(
                          currentTemplate.title,
                          currentTemplate.category,
                          `Solusi cerdas untuk platform ${currentTemplate.category}.`
                        );
                        setGeneratedDraft({
                          headline: draft.headline,
                          subheadline: draft.subheadline,
                          cta: draft.cta,
                          url: draft.url,
                          sections: draft.sections
                        });
                        if (draft.themeColor) setSelectedColor(draft.themeColor);
                        showNotification('Templat siap dengan konten AI!', 'success');
                      } catch (error) {
                        setGeneratedDraft({
                          headline: currentTemplate.title,
                          subheadline: `Memperkenalkan platform ${currentTemplate.category} masa depan.`,
                          cta: 'Pelajari Lebih Lanjut',
                          url: `landfarm.ai/${currentTemplate.title.toLowerCase().replace(/\s+/g, '-')}`,
                          sections: ['Header', 'Hero', 'Features', 'Testimonial', 'CTA']
                        });
                        setSelectedColor('#3B82F6');
                        showNotification('AI sibuk. Menggunakan draft standar.', 'info');
                      } finally {
                        setIsGenerating(false);
                      }
                    }}
                    className="bg-brand-blue text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-blue/20"
                  >
                    Gunakan & Edit
                  </button>
                      <button 
                        onClick={() => setPreviewTemplate(null)}
                        className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-900/50 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-2xl rounded-2xl overflow-hidden min-h-[1000px]">
                      <img src={previewTemplate.img} alt="Preview" className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
                      <div className="p-12 space-y-8">
                        <div className="space-y-4">
                          <div className="h-4 w-24 bg-brand-blue/10 rounded-full"></div>
                          <div className="h-12 w-3/4 bg-slate-900 dark:bg-white rounded-2xl"></div>
                          <div className="h-4 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full"></div>
                          <div className="h-4 w-5/6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 pt-12">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-4">
                              <div className={`aspect-square rounded-2xl ${i === 1 ? 'bg-blue-50 dark:bg-blue-900/20' : i === 2 ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-purple-50 dark:bg-purple-900/20'}`}></div>
                              <div className={`h-4 w-1/2 rounded-full ${i === 1 ? 'bg-blue-100 dark:bg-blue-800/30' : i === 2 ? 'bg-emerald-100 dark:bg-emerald-800/30' : 'bg-purple-100 dark:bg-purple-800/30'}`}></div>
                              <div className={`h-3 w-full rounded-full ${i === 1 ? 'bg-blue-50 dark:bg-blue-900/10' : i === 2 ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-purple-50 dark:bg-purple-900/10'}`}></div>
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
      case 'billing':
        return (
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Penagihan & Langganan</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Kelola langganan dan riwayat transaksi Anda.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* CURRENT PLAN */}
                <div className="bg-slate-900 dark:bg-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-premium transition-colors duration-300">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-brand-blue rounded-full text-[9px] font-black uppercase tracking-widest">Paket Saat Ini</div>
                        <span className="text-2xl font-black tracking-tight">AKUN PRO</span>
                      </div>
                      <p className="text-slate-400 text-sm font-medium max-w-sm">Anda menikmati akses penuh ke semua fitur Agentic AI dan integrasi tanpa batas.</p>
                      <div className="flex items-center gap-6 pt-4">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Penagihan Berikutnya</p>
                          <p className="text-sm font-black">15 April 2024</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Jumlah</p>
                          <p className="text-sm font-black">Rp 299.000</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => showNotification('Fitur Manajemen Paket akan segera hadir!', 'info')}
                      className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                    >
                      Kelola Paket
                    </button>
                  </div>
                </div>

                {/* INVOICE TABLE */}
                <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden transition-colors duration-300">
                  <div className="p-6 border-b border-slate-50 dark:border-slate-800/50">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Riwayat Transaksi</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Faktur</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jumlah</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {[
                          { id: "#INV-8821", date: "15 Mar 2024", amount: "Rp 299.000", status: "Lunas" },
                          { id: "#INV-7712", date: "15 Feb 2024", amount: "Rp 299.000", status: "Lunas" },
                          { id: "#INV-6603", date: "15 Jan 2024", amount: "Rp 299.000", status: "Lunas" },
                        ].map((inv, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 text-xs font-black text-slate-900 dark:text-white">{inv.id}</td>
                            <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">{inv.date}</td>
                            <td className="px-6 py-4 text-xs font-black text-slate-900 dark:text-white">{inv.amount}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-500 text-[9px] font-black rounded-lg uppercase tracking-widest">{inv.status}</span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-brand-blue hover:underline text-[10px] font-black uppercase tracking-widest">Unduh</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* PAYMENT METHODS */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-premium p-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Metode Pembayaran</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border-2 border-brand-blue bg-brand-blue/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-brand-blue" />
                        <div>
                          <p className="text-xs font-black text-slate-900">Visa â€¢â€¢â€¢â€¢ 4242</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Kedaluwarsa 12/26</p>
                        </div>
                      </div>
                      <div className="w-4 h-4 bg-brand-blue rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-xs font-black text-slate-900">GoPay Wallet</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Terhubung</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => showNotification('Fitur Tambah Metode Pembayaran akan segera hadir!', 'info')}
                      className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue transition-all"
                    >
                      Tambah Metode Baru
                    </button>
                  </div>
                </div>

                {/* UPGRADE BANNER */}
                <div className="bg-gradient-to-br from-purple-600 to-brand-blue rounded-[32px] p-8 text-white shadow-xl shadow-brand-blue/20">
                  <Building2 className="w-10 h-10 mb-6 opacity-50" />
                  <h4 className="text-lg font-black mb-2">Paket Enterprise</h4>
                  <p className="text-xs text-white/70 font-medium mb-6 leading-relaxed">Butuh kontrol lebih untuk tim besar? Dapatkan fitur kustom dan dukungan prioritas 24/7.</p>
                  <button 
                    onClick={() => showNotification('Menghubungkan ke Tim Sales...', 'info')}
                    className="w-full py-3 bg-white text-purple-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'buat_situs':
        if (cmsNavMode === 'setup-progress') {
          return (
            <div className="max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-700">
               <div className="relative group">
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-10 bg-brand-blue/20 blur-[100px] rounded-full animate-pulse group-hover:bg-brand-blue/30 transition-all"></div>
                  
                  {/* Orbiting Particles */}
                  <div className="absolute inset-0">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute top-[-20%] left-1/2 w-4 h-4 bg-brand-blue rounded-full shadow-[0_0_20px_blue]"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute bottom-[-20%] left-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_20px_indigo]"
                    />
                  </div>

                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="70" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="8" />
                      <motion.circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        className="stroke-brand-blue fill-none" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="440"
                        animate={{ strokeDashoffset: 440 - (440 * genProgress) / 100 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="bg-brand-blue/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-1">
                        <Rocket className="w-10 h-10 text-brand-blue animate-bounce" />
                      </div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">{genProgress}%</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-6 max-w-sm">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Membangun Ekosistem Digital</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] animate-pulse">
                      {genProgress < 20 ? 'Menginisialisasi Arsitektur...' : 
                       genProgress < 40 ? 'Menyusun Struktur Konten...' : 
                       genProgress < 60 ? 'Membangkitkan Aset AI...' : 
                       genProgress < 85 ? 'Mengoptimasi User Experience...' : 
                       'Finalisasi Deployment...'}
                    </p>
                  </div>
                  
                  <div className="flex gap-1.5 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-1.5 rounded-full transition-all duration-300 ${genProgress >= i * 20 ? 'bg-brand-blue shadow-[0_0_10px_brand-blue]' : 'bg-slate-100 dark:bg-slate-800'}`} 
                      />
                    ))}
                  </div>
               </div>
            </div>
          );
        }

        if (cmsNavMode === 'drafts') {
          return (
            <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                  <div>
                    <button 
                      onClick={() => setCmsNavMode('landing')}
                      className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors mb-4"
                    >
                      <ArrowLeft className="w-3 h-3" /> Kembali ke Setup
                    </button>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">Rancangan Draf</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Lihat dan lanjutkan penyempurnaan website yang telah Anda simpan.</p>
                  </div>
                  <button 
                    onClick={() => setCmsNavMode('landing')}
                    className="px-8 py-4 bg-brand-blue text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-blue hover:shadow-blue-lg transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Buat Rancangan Baru
                  </button>
               </div>

               {savedDrafts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                   {savedDrafts.map((draft, i) => (
                     <div key={draft.id} className="group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-hover hover:-translate-y-2 transition-all duration-500">
                       <div className="aspect-[16/10] overflow-hidden relative">
                         <img src={draft.image} alt={draft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 backdrop-blur-[2px]">
                           <button 
                             onClick={() => {
                               setManualData({
                                 name: draft.name,
                                 category: draft.category,
                                 description: draft.description,
                                 subdomain: draft.name.toLowerCase().replace(/\s+/g, '-'),
                                 color: draft.color,
                                 template: 'Modern Dark Pro (Recommended)'
                               });
                               setCmsNavMode('manual');
                             }}
                             className="bg-white text-slate-900 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-brand-blue hover:text-white transition-all"
                           >
                              Lanjutkan Setup
                           </button>
                         </div>
                         <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-800 shadow-sm">{draft.category}</span>
                         </div>
                       </div>
                       <div className="p-8 space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest">ID: {draft.id}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">{draft.createdAt}</span>
                         </div>
                         <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">{draft.name}</h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed">{draft.description}</p>
                         <div className="flex gap-2 pt-2">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: draft.color }} />
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warna Utama: {draft.color}</span>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="w-28 h-28 bg-white dark:bg-slate-900 rounded-[40px] flex items-center justify-center text-brand-blue shadow-premium border border-slate-100 dark:border-slate-800 relative group">
                       <div className="absolute inset-0 bg-brand-blue/5 rounded-[40px] scale-0 group-hover:scale-110 transition-transform duration-500" />
                       <FileSearch className="w-12 h-12 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute -bottom-2 -right-2 bg-brand-blue text-white p-2 rounded-xl shadow-lg shadow-brand-blue/30">
                          <Plus className="w-4 h-4" />
                       </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-3">Belum Ada Draf</h3>
                      <p className="text-base text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">Mulai simpan rancangan website Anda untuk menemukannya di sini dan mengelolanya dengan mudah.</p>
                    </div>
                    <button 
                      onClick={() => setCmsNavMode('manual')}
                      className="relative z-10 px-10 py-5 bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_-10px_rgba(58,134,255,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(58,134,255,0.6)] flex items-center gap-3 group"
                    >
                      Buka Setup Website
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
               )}
            </div>
          );
        }

        if (isGenerating) {
          return (
            <div className="max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500">
               <div className="relative">
                  <div className="w-24 h-24 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-brand-blue animate-pulse" />
                  </div>
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
                    {cmsNavMode === 'ai' ? 'AI sedang membangun website...' : 'Menyiapkan website...'}
                  </h3>
                  <div className="w-64 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${genProgress}%` }}
                      className="h-full bg-brand-blue"
                    />
                  </div>
                  <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Proses: {genProgress}%</p>
               </div>
            </div>
          );
        }

        if (cmsNavMode === 'preview' && generatedDraft) {
          return (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setCmsNavMode('landing')}
                  className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> Kembali
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setSubView('cms'); setCmsSubTab('editor'); }}
                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Struktur Konten
                  </button>
                  <button 
                    onClick={handlePublish}
                    className="px-6 py-2.5 bg-brand-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-blue hover:shadow-blue-lg transition-all flex items-center gap-2"
                  >
                    <Send className="w-3 h-3" /> Publish Website
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
                {/* Header Preview */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 px-4 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 w-1/2 text-center truncate">
                    {generatedDraft.url}
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Actual Website Content Preview */}
                <div className="h-[70vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 custom-scrollbar">
                  <div className="max-w-4xl mx-auto space-y-24 py-12">
                    {/* Hero Section */}
                    <section className="text-center space-y-8 py-12">
                      <div className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-bounce">
                        🚀 Launching Soon
                      </div>
                      <h1 className="text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                        {generatedDraft.headline}
                      </h1>
                      <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        {generatedDraft.subheadline}
                      </p>
                      <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl">
                        {generatedDraft.cta}
                      </button>
                    </section>

                    {/* Features/About Section */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {['Premium Quality', 'Agentic Workflow', 'High Efficiency'].map((feat, i) => (
                         <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm text-center group hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                               <Sparkles className="w-6 h-6 text-brand-blue" />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-3">{feat}</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Optimal dalam setiap detail untuk mendukung pertumbuhan bisnis Anda secara organik.</p>
                         </div>
                       ))}
                    </section>

                    {/* Standard sections listed by user */}
                    {['Tentang Kami', 'Produk/Layanan', 'Galeri'].map((section, i) => (
                      <section key={i} className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight uppercase mb-4">{section}</h2>
                        <div className="w-20 h-1 bg-brand-blue mx-auto rounded-full mb-8" />
                        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl aspect-video flex items-center justify-center border border-slate-200 dark:border-slate-800">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">[ Placeholder Content for {section} ]</p>
                        </div>
                      </section>
                    ))}

                    <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
                       <p className="text-[10px] font-black text-slate-400 tracking-widest mb-4">Â© 2024 {manualData.name || 'Situs Bisnis AI'}. Dipersembahkan oleh Uni-LandFarm.</p>
                       <div className="flex justify-center gap-6">
                         {['Instagram', 'WhatsApp', 'LinkedIn'].map(link => (
                           <span key={link} className="text-[9px] font-black text-brand-blue uppercase cursor-pointer hover:underline">{link}</span>
                         ))}
                       </div>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (cmsNavMode === 'ai') {
          return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <button 
                onClick={() => setCmsNavMode('landing')}
                className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors mb-4"
              >
                <ArrowLeft className="w-3 h-3" /> Kembali
              </button>
              
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-10 border border-slate-100 dark:border-slate-800 shadow-premium">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Bangun dengan AI</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Jelaskan visi Anda, AI kami akan mengerjakan sisanya.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Deskripsi Bisnis & Tujuan Website</label>
                    <textarea 
                      value={aiData.description}
                      onChange={(e) => setAiData({...aiData, description: e.target.value})}
                      placeholder="Contoh: Saya ingin toko kopi modern dengan nuansa minimalis yang fokus pada penjualan biji kopi artisan..."
                      className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.description ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-2xl p-6 text-sm font-bold focus:ring-4 focus:ring-brand-blue/10 transition-all dark:text-white resize-none h-40 outline-none`}
                    />
                    {formErrors.description && <p className="text-[10px] font-black text-red-500 mt-2 uppercase tracking-widest">{formErrors.description}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Audiens</label>
                      <input 
                        type="text" 
                        value={aiData.target}
                        onChange={(e) => setAiData({...aiData, target: e.target.value})}
                        placeholder="Misal: Pecinta kopi, 20-40 th" 
                        className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.target ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none`} 
                      />
                      {formErrors.target && <p className="text-[10px] font-black text-red-500 mt-2 uppercase tracking-widest">{formErrors.target}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Style Visual</label>
                      <select 
                        value={aiData.style}
                        onChange={(e) => setAiData({...aiData, style: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none appearance-none font-black text-slate-500 uppercase"
                      >
                        <option>Modern & Sleek</option>
                        <option>Classic & Elegant</option>
                        <option>Bold & Playful</option>
                        <option>Minimalist</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleAiBuild}
                    className="w-full py-5 bg-brand-blue text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-blue hover:shadow-blue-lg transition-all flex items-center justify-center gap-3"
                  >
                    <Zap className="w-4 h-4 fill-current" /> Bangun Website Saya
                  </button>
                </div>
              </div>
            </div>
          );
        }

        if (cmsNavMode === 'manual') {
          return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <button 
                onClick={() => setCmsNavMode('landing')}
                className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors mb-4"
              >
                <ArrowLeft className="w-3 h-3" /> Kembali
              </button>
              
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-10 border border-slate-100 dark:border-slate-800 shadow-premium">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-blue shadow-inner border border-slate-200 dark:border-slate-700">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Setup Website Manual</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Lengkapi detail website bisnis Anda untuk membuat landing page yang profesional, modern, dan sesuai kebutuhan brand.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nama Website</label>
                      <input 
                        type="text" 
                        value={manualData.name}
                        onChange={(e) => setManualData({...manualData, name: e.target.value})}
                        placeholder="Masukkan nama brand, bisnis, atau perusahaan Anda" 
                        className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.name ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors`} 
                      />
                      {formErrors.name && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Domain Website</label>
                      <div className="flex">
                        <input 
                          type="text" 
                          value={manualData.subdomain}
                          onChange={(e) => setManualData({...manualData, subdomain: e.target.value})}
                          placeholder="contohbrand" 
                          className={`flex-1 bg-slate-50 dark:bg-slate-800/50 border ${formErrors.subdomain ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-l-xl px-4 py-3 text-xs font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors`} 
                        />
                        <span className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border border-l-0 border-slate-100 dark:border-slate-800 rounded-r-xl text-xs font-black text-slate-400">.uniland.ai</span>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1.5 font-medium italic">Masukkan nama domain/subdomain: contohbrand.uniland.ai</p>
                      {formErrors.subdomain && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.subdomain}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kategori Bisnis</label>
                      <select 
                        value={manualData.category}
                        onChange={(e) => setManualData({...manualData, category: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none appearance-none text-slate-500 font-black"
                      >
                        <option>E-Commerce / Toko Online</option>
                        <option>Portfolio</option>
                        <option>Company Profile</option>
                        <option>Jasa Profesional</option>
                        <option>Kuliner & Cafe</option>
                        <option>Teknologi & Startup</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Template Website</label>
                      <select 
                        value={manualData.template}
                        onChange={(e) => setManualData({...manualData, template: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none appearance-none text-slate-500 font-black"
                      >
                        <option>Modern Dark Pro (Recommended)</option>
                        <option>Clean Light Agency</option>
                        <option>Minimalist Portfolio</option>
                        <option>Bold Storefront</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Warna Brand Utama</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={manualData.color}
                          onChange={(e) => setManualData({...manualData, color: e.target.value})}
                          className="w-12 h-12 rounded-xl border-none cursor-pointer p-0 bg-transparent" 
                        />
                        <input 
                          type="text" 
                          value={manualData.color}
                          onChange={(e) => setManualData({...manualData, color: e.target.value})}
                          className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-mono font-bold dark:text-white uppercase" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Upload Logo Utama</label>
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-all cursor-pointer group">
                        <Upload className="w-6 h-6 text-slate-300 mx-auto mb-2 group-hover:text-brand-blue transition-colors" />
                        <p className="text-[10px] font-black text-slate-400 uppercase">Upload logo bisnis Anda</p>
                        <p className="text-[8px] text-slate-400 uppercase mt-1">Format: PNG, JPG, SVG</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Deskripsi Singkat Bisnis</label>
                      <textarea 
                        value={manualData.description}
                        onChange={(e) => setManualData({...manualData, description: e.target.value})}
                        placeholder="Contoh: Kami menyediakan layanan digital marketing dan pembuatan website profesional untuk UMKM dan bisnis modern."
                        className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${formErrors.description ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} rounded-xl p-4 text-xs font-bold dark:text-white outline-none resize-none h-24 focus:border-brand-blue/50 transition-colors`}
                      />
                      {formErrors.description && <p className="text-[8px] font-black text-red-500 mt-1 uppercase">{formErrors.description}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setCmsNavMode('landing')} 
                    className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-500 whitespace-nowrap border border-transparent hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    Kembali
                  </button>
                  <button 
                    onClick={handleCreateRancangan}
                    className="flex-1 py-4 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Simpan Draft
                  </button>
                  <button 
                    onClick={handleManualSetup}
                    className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Mulai Setup Website
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="max-w-5xl mx-auto py-16 relative">
            {/* Premium Background Decorations */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
              
              {/* Ambient Glows */}
              <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-brand-blue/5 blur-[140px] rounded-full animate-pulse"></div>
              <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full"></div>
              
              {/* Decorative Abstract Line */}
              <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] pointer-events-none" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,1000 C300,800 400,200 1000,0" stroke="currentColor" fill="transparent" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-top-8 duration-1000">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand-blue/5 text-brand-blue rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2 border border-brand-blue/10 shadow-sm transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                SETUP WEBSITE
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight max-w-2xl mx-auto transition-colors">
                Bangun Website Bisnis Anda <br/>
                <span className="bg-gradient-to-r from-brand-blue via-blue-500 to-indigo-500 bg-clip-text text-transparent">melalui Pengisian Form</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed transition-colors">
                Lengkapi informasi bisnis Anda melalui form untuk membangun landing page yang profesional dan sesuai kebutuhan.
              </p>
            </div>
            
            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <motion.div 
                onClick={() => setCmsNavMode('manual')}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative w-full max-w-md cursor-pointer"
              >
                {/* Subtle Card Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-brand-blue/10 to-indigo-500/10 rounded-[44px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                
                <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[44px] border border-slate-200/50 dark:border-slate-800/50 shadow-premium transition-all duration-500 flex flex-col items-center text-center overflow-hidden h-full ring-1 ring-white/20 dark:ring-white/5">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-5 h-5 text-brand-blue" />
                  </div>
                  
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-[24px] flex items-center justify-center relative z-10 shadow-lg shadow-brand-blue/20 group-hover:scale-110 transition-transform duration-500">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    {/* Decoration Particles */}
                    <div className="absolute -top-2 -right-2">
                       <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white tracking-tight transition-colors">Pembuatan Website Manual</h3>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 max-w-[280px] transition-colors">
                    Isi detail bisnis, layanan, kontak, dan preferensi tampilan untuk membuat landing page sesuai kebutuhan Anda.
                  </p>
                  
                  <div className="w-full flex flex-col gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCmsNavMode('manual');
                      }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_-10px_rgba(58,134,255,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(58,134,255,0.6)] transition-all duration-500"
                    >
                      Mulai Isi Form
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCmsNavMode('drafts');
                      }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300"
                    >
                      Buka Rancangan Draf
                      <FolderOpen className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'cms':
        return (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2 flex items-center gap-2">
                   Pengelola Konten Situs
                </h2>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Kelola postingan, tulis artikel dengan AI, dan tinjau situs web Anda dengan mudah.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {[
                  { id: 'manual', label: 'Daftar Artikel', icon: <Layers className="w-3.5 h-3.5" /> },
                  { id: 'ai_scheduler', label: 'Tulis dengan AI & Jadwal', icon: <Bot className="w-3.5 h-3.5" /> },
                  { id: 'preview', label: 'Pratinjau Situs', icon: <Eye className="w-3.5 h-3.5" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCmsSubTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${cmsSubTab === tab.id ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area - Full Width for neater visual flow */}
            <div className="space-y-6">
                {cmsSubTab === 'manual' && (
                  <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500">
                    <div className="p-5 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2.5">
                          <Layers className="w-4 h-4 text-brand-blue" /> Daftar Konten Situs
                        </h3>
                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Manajemen postingan blog dan materi visual secara manual</p>
                      </div>
                      <div className="flex gap-2">
                         <div className="px-3.5 py-2 bg-brand-blue text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-brand-blue/20 cursor-pointer hover:bg-brand-blue/90 transition-colors" onClick={() => setCmsSubTab('editor')}>Buat Baru</div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                            <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Judul</th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Penulis</th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Skor SEO</th>
                            <th className="px-6 py-4 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                          {cmsPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                              <td className="px-6 py-4">
                                <p className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[340px] uppercase tracking-tight group-hover:text-brand-blue transition-colors leading-none mb-1.5">{post.title}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{post.type}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                  <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{post.date}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                  post.status === 'Published' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10' :
                                  'bg-amber-50 text-amber-500 dark:bg-amber-500/10'
                                }`}>
                                  {post.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-[10px] font-bold text-slate-600 dark:text-slate-500">{post.author}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-blue shadow-[0_0_8px_rgba(58,134,255,0.5)]" style={{ width: `${post.score}%` }} />
                                  </div>
                                  <span className="text-[9px] font-black text-slate-900 dark:text-white">{post.score}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex gap-1.5 justify-end">
                                  <button onClick={() => setCmsSubTab('editor')} className="p-1.5 text-slate-400 hover:text-brand-blue bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm"><Edit3 className="w-3.5 h-3.5" /></button>
                                  <button className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg transition-all hover:scale-110 shadow-sm" onClick={() => setCmsPosts(prev => prev.filter(p => p.id !== post.id))}><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {cmsSubTab === 'ai_scheduler' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                    
                    {/* LEFT COLUMN: AI CONTENT WRITER */}
                    <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center shadow-inner">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Writer & Publisher</h4>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tulis artikel berkualitas tinggi secara otomatis</p>
                          </div>
                        </div>

                        {isGeneratingAiPost ? (
                          <div className="h-[260px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                            <div className="relative">
                              <div className="w-20 h-20 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brand-blue rounded-full border-t-transparent animate-spin"></div>
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-400">{aiPostProgress}%</div>
                            </div>
                            <div className="space-y-1.5">
                              <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">AI Sedang Menulis Artikel</h5>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">{aiPostStepText}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Topik / Ide Artikel</label>
                              <input 
                                type="text"
                                value={aiTopic}
                                onChange={(e) => setAiTopic(e.target.value)}
                                placeholder="Contoh: Manfaat Kopi Espresso bagi Kesehatan Jantung"
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold dark:text-white outline-none focus:border-brand-blue/50 transition-colors"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tone Suara</label>
                                <select 
                                  value={aiTone}
                                  onChange={(e) => setAiTone(e.target.value)}
                                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-black text-slate-500 dark:text-white outline-none"
                                >
                                  <option>Profesional</option>
                                  <option>Kreatif & Santai</option>
                                  <option>Persuasif & Promotif</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Panjang Artikel</label>
                                <select 
                                  value={aiLength}
                                  onChange={(e) => setAiLength(e.target.value)}
                                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-black text-slate-500 dark:text-white outline-none"
                                >
                                  <option>Pendek (300 kata)</option>
                                  <option>Sedang (600 kata)</option>
                                  <option>Panjang (1000 kata)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {!isGeneratingAiPost && (
                        <button 
                          onClick={handleGenerateAiPost}
                          className="w-full mt-8 py-4 bg-gradient-to-r from-brand-blue to-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" /> Bangkitkan Artikel AI
                        </button>
                      )}
                    </div>

                    {/* RIGHT COLUMN: SMART AI SCHEDULER */}
                    <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-100 dark:border-slate-800 shadow-premium space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shadow-inner">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Smart AI Scheduler</h4>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Optimasi jadwal posting berbasis AI</p>
                          </div>
                        </div>

                        {/* Switch Toggle */}
                        <div 
                          onClick={() => {
                            setIsSmartScheduling(!isSmartScheduling);
                            showNotification(isSmartScheduling ? 'AI Smart Scheduling dinonaktifkan' : 'AI Smart Scheduling diaktifkan!', 'info');
                          }}
                          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isSmartScheduling ? 'bg-brand-blue' : 'bg-slate-200 dark:bg-slate-800'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isSmartScheduling ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                      </div>

                      {isSmartScheduling && (
                        <div className="space-y-4 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/30 animate-in fade-in duration-300">
                          <div>
                            <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Frekuensi Auto-Post</label>
                            <select 
                              value={aiSchedulerFrequency}
                              onChange={(e) => setAiSchedulerFrequency(e.target.value)}
                              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2 text-[10px] font-black text-slate-500 dark:text-white outline-none"
                            >
                              <option>1 postingan / hari</option>
                              <option>3 postingan / minggu</option>
                              <option>1 postingan / minggu</option>
                            </select>
                          </div>
                          <div className="flex gap-3">
                             <div className="w-1 h-auto bg-brand-blue rounded-full"></div>
                             <div>
                                <p className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase leading-none mb-1">Rekomendasi Waktu Tayang AI</p>
                                <p className="text-[9px] font-bold text-slate-500 leading-none">09.00 - 11.00 WIB (Puncak Trafik SEO)</p>
                             </div>
                          </div>
                        </div>
                      )}

                      {/* Visual Timeline queue */}
                      <div className="space-y-3">
                        <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Antrean Publish Mendatang</h5>
                        <div className="space-y-2">
                          {[
                            { title: "Promo Lebaran Kopi", date: "Besok, 09:00", badge: "AI Recommended" },
                            { title: "Manfaat Espresso Murni", date: "Lusa, 10:00", badge: "Smart Queued" }
                          ].map((q, i) => (
                            <div key={i} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between hover:border-brand-blue/30 transition-colors shadow-sm group">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                  <h6 className="text-[10px] font-black text-slate-900 dark:text-white uppercase leading-none mb-1 group-hover:text-brand-blue transition-colors">{q.title}</h6>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{q.date}</p>
                                </div>
                              </div>
                              <span className="text-[8px] font-black text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">{q.badge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {cmsSubTab === 'preview' && (
                  <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden animate-in fade-in duration-500 flex flex-col">
                    {/* Header Bar Browser Preview */}
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <div className="flex gap-1.5 items-center">
                        <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                        
                        {/* Device Toggles */}
                        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5 ml-4">
                          <button 
                            onClick={() => setEditorPreviewMode('desktop')} 
                            className={`px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-wider transition-all ${editorPreviewMode === 'desktop' ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm' : 'text-slate-500'}`}
                          >
                            Desktop
                          </button>
                          <button 
                            onClick={() => setEditorPreviewMode('mobile')} 
                            className={`px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-wider transition-all ${editorPreviewMode === 'mobile' ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm' : 'text-slate-500'}`}
                          >
                            Mobile
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-950 px-4 py-1.5 rounded-xl text-[9px] font-bold text-slate-400 dark:text-slate-500 w-1/3 text-center truncate border border-slate-100 dark:border-slate-800/50">
                        {manualData.subdomain ? `${manualData.subdomain}.landfarm.id` : 'tokokopimerdeka.landfarm.id'}
                      </div>
                      
                      <button 
                        onClick={() => { setCmsSubTab('editor'); }}
                        className="px-4 py-2 bg-brand-blue text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-brand-blue/90 shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Site
                      </button>
                    </div>

                    {/* Preview Viewport Canvas */}
                    <div className="bg-[#050810] p-6 min-h-[500px] flex items-center justify-center overflow-auto custom-scrollbar">
                      <div 
                        className={`bg-white text-slate-900 shadow-2xl transition-all duration-500 overflow-hidden relative ${
                          editorPreviewMode === 'mobile' 
                            ? 'w-[360px] h-[640px] rounded-[36px] border-[10px] border-[#1e293b]' 
                            : 'w-full max-w-4xl min-h-[500px] rounded-2xl border border-slate-800'
                        }`}
                      >
                        <div className="w-full h-full overflow-y-auto bg-slate-50 flex flex-col custom-scrollbar text-left text-slate-900">
                          {/* Fake live preview structure inside CMS */}
                          <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-10">
                            <div className="text-sm font-black tracking-tighter text-brand-blue uppercase">{manualData.name || 'Toko Kopi Merdeka'}</div>
                            <div className="flex gap-4">
                              <span className="text-[9px] font-black text-slate-400 uppercase">About</span>
                              <span className="text-[9px] font-black text-slate-400 uppercase">Features</span>
                              <span className="text-[9px] font-black text-slate-400 uppercase">Pricing</span>
                            </div>
                          </header>
                          
                          <main className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-slate-50 relative min-h-[350px]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 blur-3xl rounded-full pointer-events-none" />
                            <div className="max-w-xl mx-auto space-y-6 relative z-10 py-6">
                              <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-[8px] font-black uppercase tracking-[0.2em]">🚀 Live Preview</span>
                              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter">
                                {manualData.name ? `Selamat Datang di ${manualData.name}` : 'Seduh Kopi Terbaik Nusantara'}
                              </h1>
                              <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                                {manualData.description || 'Menyajikan biji kopi pilihan langsung dari petani lokal dengan dedikasi tinggi untuk secangkir kebahagiaan Anda.'}
                              </p>
                              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">
                                Hubungi Kami
                              </button>
                            </div>
                          </main>
                          
                          <footer className="py-6 border-t border-slate-100 text-center bg-white">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">© 2026 {manualData.name || 'Toko Kopi Merdeka'}. LandFarm Power.</p>
                          </footer>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Panel Bawah: Tips Sederhana & Ramah Pengguna */}
                <div className="bg-slate-900 dark:bg-slate-950 rounded-[24px] p-5 text-white relative overflow-hidden shadow-premium border border-slate-800/50">
                  <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-brand-blue/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                       <Sparkles className="w-5 h-5 text-brand-blue animate-pulse" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <h4 className="text-xs font-black tracking-tight uppercase mb-1">💡 Tips Cepat Kelola Situs</h4>
                       <p className="text-[11px] text-slate-400 font-medium mb-0 leading-relaxed">
                         Gunakan fitur <strong className="text-white">Tulis dengan AI</strong> untuk membuat draf artikel berkualitas secara instan, lalu periksa pratinjaunya di tab <strong className="text-white">Pratinjau Situs</strong> sebelum dipublikasikan!
                       </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
            {/* Profile Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            
            <div className="flex items-center gap-6 mb-4">
               <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl relative group">
                  <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
               </div>
               <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">Sarah Anderson</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 rounded-full border border-brand-blue/10 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
                      <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest">User Pro Access</p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5">UID-99021</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl p-6 rounded-[24px] border border-slate-100 dark:border-white/10 shadow-premium">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-white/5">Informasi Akun</h4>
                    <button 
                      onClick={() => setIsEditingProfile(!isEditingProfile)} 
                      className={`text-[8.5px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all ${isEditingProfile ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-brand-blue hover:bg-brand-blue/5'}`}
                    >
                      {isEditingProfile ? 'Batal' : 'Edit Profil'}
                    </button>
                  </div>
                  
                  {isEditingProfile ? (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                          <input 
                            type="text" 
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Bisnis</label>
                          <input 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nomor Telepon</label>
                          <input 
                            type="text" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Domisili</label>
                          <input 
                            type="text" 
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-xs font-black outline-none transition-all text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <button 
                        onClick={() => { setIsEditingProfile(false); showNotification('Profil berhasil diperbarui!', 'success'); }}
                        className="w-full py-4 bg-brand-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-slate-100 dark:border-white/10 pl-3">Email</label>
                          <p className="text-sm font-black text-slate-900 dark:text-white pl-3">{profileData.email}</p>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-slate-100 dark:border-white/10 pl-3">Phone</label>
                          <p className="text-sm font-black text-slate-900 dark:text-white pl-3">{profileData.phone}</p>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-slate-100 dark:border-white/10 pl-3">Location</label>
                          <p className="text-sm font-black text-slate-900 dark:text-white pl-3">{profileData.location}</p>
                       </div>
                    </div>
                  )}
               </div>

               <div className="space-y-6">
                  {/* Status & Keamanan */}
                  <div className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl p-6 rounded-[24px] border border-slate-100 dark:border-white/10 shadow-premium">
                    <h4 className="text-[8.5px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">Status & Keamanan</h4>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                         <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">Tipe Akun</span>
                         <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest bg-brand-blue/15 dark:bg-brand-blue/20 px-2.5 py-1 rounded-lg">Pro Access</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                         <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">Token Point</span>
                         <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight">2.500 PTS</span>
                      </div>
                    </div>

                    <button className="w-full py-3 text-[8.5px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-white/5 rounded-2xl hover:text-brand-blue hover:border-brand-blue/50 dark:hover:bg-slate-900/50 transition-all shadow-sm">
                      Ubah Password
                    </button>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <MoreHorizontal className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Halaman Sedang Dikembangkan</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-8 font-medium">
              Fitur <span className="text-brand-blue font-black uppercase">{subView}</span> akan segera hadir untuk meningkatkan pengalaman Anda.
            </p>
            <button 
              onClick={() => setSubView('overview')}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  const isEditorActive = isCmsEditorOpen || (subView === 'cms' && cmsSubTab === 'editor');

  return isEditorActive ? (
    <ContentStructureEditor 
      onBack={() => {
        setIsCmsEditorOpen(false);
        if (cmsSubTab === 'editor') {
          setCmsSubTab('manual');
        }
      }} 
      initialName={manualData.name || businessData.name} 
      onPublish={(name) => {
        const newProject = {
          id: `PROJ-0${userProjects.length + 1}`,
          name: name || 'Situs Baru',
          status: 'Online',
          views: '0',
          type: manualData.category || businessData.category || 'Landing Page',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'
        };
        setUserProjects([newProject, ...userProjects]);
        setIsCmsEditorOpen(false);
        if (cmsSubTab === 'editor') {
          setCmsSubTab('manual');
        }
      }}
    />
  ) : (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Mesh Gradient for Dark Mode */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-blob"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
         <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      {/* Persistent Blue Atmosphere Glow at Bottom */}
      <div className="fixed -bottom-48 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-96 bg-brand-blue/15 blur-[120px] pointer-events-none opacity-40 dark:opacity-20 z-0"></div>
      
      {/* SECTION 1: PERSISTENT HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-white/10 h-[72px] flex items-center justify-between px-8 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-0 dark:opacity-100"></div>
        <div className="flex items-center gap-4">
          <div 
            className="w-11 h-11 bg-brand-blue rounded-2xl flex items-center justify-center cursor-pointer shadow-[0_10px_25px_rgba(58,134,255,0.3)] hover:scale-110 active:scale-95 transition-all group overflow-hidden relative"
            onClick={() => setView('home')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <Cpu className="text-white w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black text-slate-900 dark:text-white leading-none tracking-tighter">Uni-LandFarm</h1>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 border-r border-slate-100 dark:border-white/10 pr-6">
            <button 
              onClick={toggleTheme} 
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-blue transition-all border border-slate-50 dark:border-white/5"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button className="p-3 rounded-2xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all relative group border border-transparent hover:border-slate-100 dark:hover:border-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#020617]"></span>
            </button>
          </div>
          
          <div 
            onClick={() => setSubView('profile')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-1 group-hover:text-brand-blue transition-colors">Sarah Anderson</p>
              <div className="flex items-center justify-end gap-2 leading-none">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <p className="text-[9px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] leading-none">PRO ACCOUNT</p>
              </div>
            </div>
            <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm group-hover:border-brand-blue/40 group-hover:scale-105 transition-all">
              <img src="https://i.pravatar.cc/150?u=sarah" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden pt-[72px]">
        {/* SECTION 2: ENRICHED SIDEBAR */}
        <aside className="w-[240px] bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 flex flex-col hidden lg:flex transition-colors duration-300">
          <nav className="flex-1 px-4 space-y-0.5 py-4">
            {menuItems.map((item, i) => (
              <button 
                key={i}
                onClick={() => setSubView(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all group relative ${
                  subView === item.id 
                    ? 'bg-brand-blue/5 text-brand-blue shadow-[0_0_15px_rgba(58,134,255,0.05)] border border-brand-blue/10 dark:bg-brand-blue/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-slate-950 dark:hover:text-white border border-transparent'
                }`}
              >
                <div className={`transition-all duration-300 ${subView === item.id ? 'text-brand-blue scale-110 drop-shadow-[0_0_8px_rgba(58,134,255,0.3)]' : 'text-slate-300 dark:text-slate-600 group-hover:text-brand-blue'}`}>
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-4 h-4" })}
                </div>
                {item.label}
                {subView === item.id && (
                  <motion.div layoutId="navGlow" className="absolute left-0 w-1.5 h-5 bg-brand-blue rounded-r-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="px-6 py-2">
            <div className="h-px bg-slate-50 dark:bg-slate-900 w-full" />
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="p-4">
            <button 
              onClick={() => setView('home')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Keluar
            </button>
          </div>
        </aside>

        {/* SECTION 3: MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50/10 dark:bg-slate-950/20 transition-colors duration-300 relative scroll-smooth custom-scrollbar">
          {renderSubView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero setView={setView} />
            <Features setView={setView} />

            <TemplatePreview setView={setView} />
            <CMSLandingView setView={setView} />
            <Testimonials />
            <PricingView setView={setView} />
            <FAQ />
            <FinalCTA setView={setView} />
          </>
        );
      case 'features':
        return <Features setView={setView} />;
      case 'templates':
        return <TemplatesView setView={setView} />;
      case 'pricing':
        return <PricingView setView={setView} />;
      case 'cms':
        return <CMSLandingView setView={setView} />;
      case 'about':
        return <AboutUsView />;
      case 'login':
        return <LoginView setView={setView} />;
      case 'signup':
        return <SignupView setView={setView} />;
      case 'dashboard':
        return <DashboardView setView={setView} theme={theme} toggleTheme={toggleTheme} />;
      default:
        return <Hero setView={setView} />;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-slate-950 transition-colors duration-500`}>
      {view !== 'dashboard' && <Navbar setView={setView} currentView={view} theme={theme} toggleTheme={toggleTheme} />}
      <main className={view !== 'dashboard' ? 'pt-20' : ''}>
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
      {view !== 'dashboard' && <Footer setView={setView} />}
    </div>
  );
}
