import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import newly created modular components
import { 
  Navbar, 
  Hero, 
  Features, 
  TemplatesView, 
  TemplatePreview,
  CMSLandingView, 
  Testimonials, 
  PricingView, 
  FAQ, 
  FinalCTA, 
  Footer,
  LoginPage as LoginView,
  SignupPage as SignupView,
  AboutUsView,
  ForgotPasswordPage
} from './components/pages/PublicViews';

import { DashboardView } from './components/pages/DashboardView';

export default function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState<any>(null);
  const [systemSettings, setSystemSettings] = useState<any>(null);
  const [prefilledEmail, setPrefilledEmail] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.data) {
          setSystemSettings(data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil settings:", err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success && data.data) {
          setUser(data.data);
          setView('dashboard');
        }
      } catch (err) {
        console.error("Check session error:", err);
      }
    };
    checkSession();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero setView={setView} user={user} />
            <Features setView={setView} />
            <TemplatePreview setView={setView} user={user} />
            <CMSLandingView setView={setView} user={user} />
            <Testimonials />
            <PricingView setView={setView} user={user} />
            <FAQ />
            <FinalCTA setView={setView} user={user} />
          </>
        );
      case 'features':
        return <Features setView={setView} />;
      case 'templates':
        return <TemplatesView setView={setView} user={user} />;
      case 'pricing':
        return <PricingView setView={setView} user={user} />;
      case 'cms':
        return <CMSLandingView setView={setView} user={user} />;
      case 'about':
        return <AboutUsView />;
      case 'login':
        return <LoginView setView={setView} setUser={setUser} prefilledEmail={prefilledEmail} setPrefilledEmail={setPrefilledEmail} />;
      case 'signup':
        return <SignupView setView={setView} setUser={setUser} prefilledEmail={prefilledEmail} setPrefilledEmail={setPrefilledEmail} />;
      case 'forgot-password':
        return <ForgotPasswordPage setView={setView} prefilledEmail={prefilledEmail} setPrefilledEmail={setPrefilledEmail} />;
    }
    
    if (view.startsWith('dashboard')) {
      const initialTab = view.includes(':') ? view.split(':')[1] : undefined;
      return <DashboardView setView={setView} theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} systemSettings={systemSettings} setSystemSettings={setSystemSettings} initialTab={initialTab} />;
    }

    return <Hero setView={setView} user={user} />;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-slate-950 transition-colors duration-500`}>
      {!view.startsWith('dashboard') && <Navbar setView={setView} currentView={view} theme={theme} toggleTheme={toggleTheme} user={user} />}
      <main className={!view.startsWith('dashboard') ? 'pt-20' : ''}>
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
      {!view.startsWith('dashboard') && <Footer setView={setView} systemSettings={systemSettings} />}
    </div>
  );
}
