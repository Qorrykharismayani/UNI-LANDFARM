import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface SignupPageProps {
  setView: (v: string) => void;
  setUser: (u: any) => void;
  prefilledEmail: string;
  setPrefilledEmail: (e: string) => void;
}

const SignupPage = ({ setView, setUser, prefilledEmail, setPrefilledEmail }: SignupPageProps) => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState(prefilledEmail || '');
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

  const handleSignup = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: businessName, email, password })
      });
      const data = await response.json();
      if (data.success) {
        setView('login');
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
        className="w-full max-w-[420px] bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png?v=8" alt="Uni-LandFarm Logo" className="h-[105px] object-contain" />
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Registrasi Akun</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Daftarkan bisnis Anda untuk mulai menggunakan UNI-LandFarm</p>
        </div>

        {/* Google Button */}
        <button
          onClick={() => window.location.href = '/api/auth/login/google'}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all mb-5 shadow-sm group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Registrasi dengan Google</span>
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
                onChange={(e) => { setBusinessName(e.target.value); if (errors.businessName) setErrors(prev => ({ ...prev, businessName: undefined })); }}
                placeholder="Contoh: Digital Agency X"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.businessName
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
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                placeholder="nama@bisnis.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.email
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
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                placeholder="Minimal 6 karakter"
                className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.password
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
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${password.length >= i * 2
                      ? password.length >= 8 ? 'bg-emerald-500' : password.length >= 6 ? 'bg-amber-500' : 'bg-red-400'
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
            onClick={() => { setAgree(!agree); if (errors.agree) setErrors(prev => ({ ...prev, agree: undefined })); }}
            className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${agree ? 'bg-brand-blue border-brand-blue' : errors.agree ? 'border-red-400' : 'border-slate-200 dark:border-slate-600 group-hover:border-brand-blue/50'
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
          className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-sm shadow-[0_10px_30px_-5px_rgba(255,176,0,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.5)] transition-all mb-5 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Mendaftar...
            </>
          ) : (
            'Daftar'
          )}
        </motion.button>

        <div className="text-center text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            Sudah punya akun?{' '}
            <button
              id="goto-login-btn"
              onClick={() => {
                setPrefilledEmail(email);
                setView('login');
              }}
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

export default SignupPage;
