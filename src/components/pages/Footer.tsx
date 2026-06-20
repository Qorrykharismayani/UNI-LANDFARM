import React from 'react';
import { Twitter, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  setView: (v: string) => void;
  systemSettings?: any;
  user?: any;
}

export const Footer = ({ setView, systemSettings, user }: FooterProps) => (
  <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 relative overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-8">
        <div className="col-span-1 md:col-span-1">
          <div className="h-[74px] flex items-center cursor-pointer group" onClick={() => setView('home')}>
            {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
              <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[74px] object-contain" />
            ) : (
              <img src="/logo.png?v=8" alt="UNI-LandFarm Logo" className="h-[74px] object-contain" />
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">
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
          <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Platform</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><button onClick={() => setView('features')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Fitur Utama <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('templates')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Pustaka Template <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('cms')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">AI Generator <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView(user ? 'dashboard:buat_situs' : 'signup')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Integrasi API <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Sumber Daya</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Tentang Kami <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Blog Bisnis <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Pusat Bantuan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setView('about')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Komunitas <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Kebijakan Privasi <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Ketentuan Layanan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group">Kebijakan Cookie <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
          {systemSettings?.footerText || '© 2026 Platform UNI-LandFarm. Hak cipta dilindungi undang-undang.'}
        </p>
        <div className="flex gap-8 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
          <a href="#" className="hover:text-brand-blue transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Ketentuan Layanan</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
