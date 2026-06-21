import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Lock, 
  Eye, 
  AlertCircle 
} from 'lucide-react';

interface LoginPageProps {
  setView: (v: string) => void;
  setUser: (u: any) => void;
  prefilledEmail?: string;
  setPrefilledEmail?: (e: string) => void;
  systemSettings?: any;
}

const LoginPage = ({ setView, setUser, prefilledEmail = '', setPrefilledEmail, systemSettings }: LoginPageProps) => {
  const [email, setEmail] = useState(prefilledEmail || '');
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

  const handleLogin = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setView('dashboard');
      } else {
        setErrors({ email: data.message });
      }
    } catch (err: any) {
      setErrors({ email: 'Gagal menghubungi server. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
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
          {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
            <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[105px] object-contain" />
          ) : (
            <img src="/logo.png?v=8" alt="Logo" className="h-[105px] object-contain" />
          )}
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Login ke akun {systemSettings?.platformName || 'Uni-LandFarm'} Anda</p>
        </div>

        {/* Google Button */}
        <button
          onClick={() => window.location.href = '/api/auth/login/google'}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 transition-all mb-5 shadow-sm group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Lanjutkan dengan Google</span>
        </button>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black">
            <span className="bg-white dark:bg-slate-800 px-3 text-slate-300 dark:text-slate-600">atau login dengan email</span>
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
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="nama@perusahaan.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.email
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
              <button 
                type="button" 
                onClick={() => {
                  setPrefilledEmail(email);
                  setView('forgot-password');
                }} 
                className="text-[10px] font-bold text-brand-blue hover:underline"
              >
                Lupa password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Minimal 6 karakter"
                className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.password
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
          className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-sm shadow-[0_10px_30px_-5px_rgba(255,176,0,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.5)] transition-all mb-5 flex items-center justify-center gap-2 disabled:opacity-70"
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
            <>Login</>
          )}
        </motion.button>

        <div className="text-center text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            Belum punya akun?{' '}
            <button
              id="goto-signup-btn"
              onClick={() => {
                setPrefilledEmail(email);
                setView('signup');
              }}
              className="text-brand-blue font-black hover:underline"
            >
              Sign Up sekarang
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
