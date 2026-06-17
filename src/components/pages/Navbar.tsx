import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, X, MoreHorizontal } from 'lucide-react';

interface NavbarProps {
  setView: (v: string) => void;
  currentView: string;
  theme: string;
  toggleTheme: () => void;
  systemSettings?: any;
}

const Navbar = ({ setView, currentView, theme, toggleTheme, systemSettings }: NavbarProps) => {
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
          {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
            <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[78px] object-contain" />
          ) : (
            <img src="/logo.png?v=8" alt="Uni-LandFarm Logo" className="h-[78px] object-contain" />
          )}
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

export default Navbar;
