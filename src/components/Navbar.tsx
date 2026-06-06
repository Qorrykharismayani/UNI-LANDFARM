import React, { useState } from 'react';
import { Cpu, ChevronDown, Zap, Bot, Database, Moon, Sun, ArrowRight, Monitor, Smartphone, BarChart3, LineChart, Layout, CreditCard, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = ({ setView, currentView, isLoggedIn, onLogout }: { setView: (v: string) => void, currentView: string, isLoggedIn?: boolean, onLogout?: () => void }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const theme = 'light';

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-100 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
          onClick={() => setView('home')}
        >
          <img 
            src="/logo.png" 
            alt="Uni-LandFarm Logo" 
            className="h-16 w-auto lg:h-20 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md" 
          />
        </div>
        
        <div className="hidden lg:flex items-center gap-10 ml-16">
          <button 
            onClick={() => setView('home')}
            className={`text-[15px] font-bold transition-all flex items-center gap-2 group ${currentView === 'home' ? 'text-brand-primary' : 'text-stone-500 dark:text-stone-400 hover:text-brand-primary dark:hover:text-brand-primary'}`}
          >
            Beranda
            <div className={`w-1 h-1 rounded-full bg-brand-primary transition-transform ${currentView === 'home' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
          </button>

          <button 
            onClick={() => setView('about')}
            className={`text-[15px] font-bold transition-all flex items-center gap-2 group ${currentView === 'about' ? 'text-brand-primary' : 'text-stone-500 dark:text-stone-400 hover:text-brand-primary dark:hover:text-brand-primary'}`}
          >
            Tentang Kami
            <div className={`w-1 h-1 rounded-full bg-brand-primary transition-transform ${currentView === 'about' ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
          </button>

          <div 
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button 
              onClick={() => setView('features')}
              className={`text-[15px] font-bold transition-all flex items-center gap-2 group py-8 ${currentView === 'features' ? 'text-brand-primary' : 'text-stone-500 dark:text-stone-400 hover:text-brand-primary dark:hover:text-brand-primary'}`}
            >
              Fitur <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 w-[600px] bg-white dark:bg-stone-900 rounded-[24px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-stone-100 dark:border-stone-800 p-8 grid grid-cols-3 gap-6"
                >
                  {[
                    { id: 'webgen', icon: <Zap className="w-6 h-6 text-brand-primary" />, title: "Web Gen Instan", desc: "Bisnis Agensi, Ritel, & Layanan." },
                    { id: 'copilot', icon: <Bot className="w-6 h-6 text-brand-primary" />, title: "Kopilot Agentic", desc: "Konten bisnis otomatis." },
                    { id: 'knowledge', icon: <Database className="w-6 h-6 text-brand-primary" />, title: "Basis Pengetahuan", desc: "Sinkronisasi data bisnis kustom." }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="group/item cursor-pointer"
                      onClick={() => {
                        setView('features');
                        setIsMegaMenuOpen(false);
                      }}
                    >
                      <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-xl flex items-center justify-center mb-4 group-hover/item:bg-brand-primary/10 transition-colors">
                        {item.icon}
                      </div>
                      <h5 className="text-sm font-black text-stone-900 dark:text-white mb-2">{item.title}</h5>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { id: 'templates', label: "Template" },
            { id: 'cms', label: "CMS" },
            { id: 'pricing', label: "Harga" }
          ].map((item, i) => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={`text-[15px] font-bold transition-all flex items-center gap-2 group relative ${currentView === item.id ? 'text-brand-primary' : 'text-stone-500 dark:text-stone-400 hover:text-brand-primary dark:hover:text-brand-primary'}`}
            >
              {item.label}
              <div className={`w-1 h-1 rounded-full bg-brand-primary transition-transform ${currentView === item.id ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="p-2.5 rounded-full bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-brand-primary transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setView('dashboard')}
              >
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary overflow-hidden group-hover:scale-105 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7m-3-3h6"/></svg>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="px-5 py-2 text-sm font-bold text-stone-500 hover:text-rose-500 transition-colors"
              >
                Keluar
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setView('login')}
                className={`px-6 py-2.5 text-[15px] font-black transition-all ${currentView === 'login' ? 'text-brand-primary' : 'text-stone-600 dark:text-stone-300 hover:text-brand-primary dark:hover:text-brand-primary'}`}
              >
                Masuk
              </button>
              <button 
                onClick={() => setView('signup')}
                className="px-8 py-3 text-[15px] font-black text-white bg-brand-primary rounded-full shadow-primary hover:shadow-primary-lg transition-all transform hover:-transtone-y-0.5 active:scale-95"
              >
                Daftar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
