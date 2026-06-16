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
        return <LoginView setView={setView} setUser={setUser} prefilledEmail={prefilledEmail} setPrefilledEmail={setPrefilledEmail} />;
      case 'signup':
        return <SignupView setView={setView} setUser={setUser} prefilledEmail={prefilledEmail} setPrefilledEmail={setPrefilledEmail} />;
      case 'forgot-password':
        return <ForgotPasswordPage setView={setView} prefilledEmail={prefilledEmail} setPrefilledEmail={setPrefilledEmail} />;
      case 'dashboard':
        return <DashboardView setView={setView} theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} systemSettings={systemSettings} setSystemSettings={setSystemSettings} />;
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
      {view !== 'dashboard' && <Footer setView={setView} systemSettings={systemSettings} />}
    </div>
  );
}
