import React, { useState } from 'react';
import { copyToClipboard } from '../../lib/clipboard';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  AlertCircle, 
  ArrowLeft,
  CheckCircle2,
  Key
} from 'lucide-react';

interface ForgotPasswordPageProps {
  setView: (v: string) => void;
  prefilledEmail?: string;
  setPrefilledEmail?: (e: string) => void;
  systemSettings?: any;
}

const ForgotPasswordPage = ({ setView, prefilledEmail = '', setPrefilledEmail, systemSettings }: ForgotPasswordPageProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState(prefilledEmail);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState<{ email?: string; token?: string; password?: string; confirmPassword?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [devToken, setDevToken] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateStep1 = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors: typeof errors = {};
    if (!token) newErrors.token = 'Token reset wajib diisi';
    else if (token.length !== 6) newErrors.token = 'Token reset harus 6 digit angka';
    
    if (!password) newErrors.password = 'Password baru wajib diisi';
    else if (password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Konfirmasi password baru tidak cocok';
    return newErrors;
  };

  const handleRequestToken = async () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.success) {
        setEmailSent(!!data.emailSent);
        setDevToken(data.token || null);
        if (data.token) {
          setShowTokenModal(true);
        }
        setStep(2);
      } else {
        setErrors({ email: data.message });
      }
    } catch (err: any) {
      setErrors({ email: 'Gagal menghubungi server. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password })
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Password berhasil direset! Anda akan dialihkan ke halaman login...');
        setTimeout(() => {
          setView('login');
        }, 3000);
      } else {
        setErrors({ general: data.message });
      }
    } catch (err: any) {
      setErrors({ general: 'Gagal menghubungi server. Silakan coba lagi.' });
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
        {/* Back Button */}
        <button 
          onClick={() => {
            if (setPrefilledEmail) {
              setPrefilledEmail(email);
            }
            setView('login');
          }}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue transition-colors cursor-pointer group font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Kembali
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6 mt-4">
          {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
            <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[105px] object-contain" />
          ) : (
            <img src="/logo.png?v=8" alt="Logo" className="h-[105px] object-contain" />
          )}
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">Lupa Password</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {step === 1 
              ? 'Masukkan email terdaftar Anda untuk menerima token reset password.' 
              : 'Masukkan token reset yang Anda peroleh beserta password baru Anda.'}
          </p>
        </div>

        {/* Alert Success */}
        {successMessage && (
          <div className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl flex gap-3 text-emerald-600 dark:text-emerald-400 text-xs font-semibold leading-relaxed">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Real Email Reset Token Notification Banner */}
        {step === 2 && emailSent && (
          <div className="mb-5 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-2xl flex gap-3 text-blue-600 dark:text-blue-400 text-xs font-semibold leading-relaxed">
            <Mail className="w-5 h-5 shrink-0 text-blue-500" />
            <div>
              <p className="font-bold mb-0.5">Email Terkirim!</p>
              <p className="text-[11px] leading-normal text-slate-500 dark:text-slate-400">Token reset password telah dikirim ke alamat email Anda. Silakan periksa kotak masuk atau folder spam Anda.</p>
            </div>
          </div>
        )}

        {/* Dev Token Simulation Banner removed as it is now shown in a pop-up modal */}

        {errors.general && (
          <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl flex gap-3 text-red-500 text-xs font-semibold leading-relaxed">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleRequestToken()}
                    placeholder="nama@bisnis.com"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.email
                        ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                        : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                      }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequestToken}
                disabled={isLoading}
                className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-sm shadow-[0_10px_30px_-5px_rgba(255,176,0,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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
                  'Minta Token Reset'
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {/* Token */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Token Reset (6 Digit)</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
                  <input
                    type="text"
                    maxLength={6}
                    value={token}
                    onChange={(e) => { setToken(e.target.value.replace(/\D/g, '')); if (errors.token) setErrors(prev => ({ ...prev, token: undefined })); }}
                    placeholder="Contoh: 123456"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white tracking-widest ${errors.token
                        ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                        : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                      }`}
                  />
                </div>
                {errors.token && <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{errors.token}</p>}
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Password Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }}
                    placeholder="Minimal 6 karakter"
                    className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.password
                        ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                        : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                      }`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider ml-0.5">Konfirmasi Password Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined })); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
                    placeholder="Ketik ulang password baru"
                    className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-700/50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all dark:text-white ${errors.confirmPassword
                        ? 'border-red-300 dark:border-red-500/50 focus:ring-red-200'
                        : 'border-slate-200 dark:border-slate-600 focus:ring-brand-blue/20 focus:border-brand-blue'
                      }`}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-sm shadow-[0_10px_30px_-5px_rgba(255,176,0,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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
                  'Reset Password'
                )}
              </motion.button>

              <div className="flex justify-between items-center text-xs px-1 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-bold hover:underline cursor-pointer"
                >
                  Ubah Email
                </button>
                <button
                  type="button"
                  onClick={handleRequestToken}
                  disabled={isLoading}
                  className="text-brand-blue hover:underline font-bold disabled:opacity-50 cursor-pointer"
                >
                  Kirim Ulang Token
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modern Pop-up Modal for Simulation Token */}
      <AnimatePresence>
        {showTokenModal && devToken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-700 text-center relative overflow-hidden"
            >
              {/* Top border bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />
              
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-500">
                <Key className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                Token Reset Diperoleh!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Ini adalah token simulasi. Gunakan token di bawah untuk melanjutkan pengaturan ulang password.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 mb-6 border border-slate-100 dark:border-slate-700/50">
                <span className="font-mono text-3xl font-black tracking-widest text-brand-blue block select-all">
                  {devToken}
                </span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      await copyToClipboard(devToken);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    } catch (err) {}
                  }}
                  className="flex-1 bg-brand-blue text-white py-3 rounded-xl font-bold text-xs shadow-[0_5px_15px_-3px_rgba(255,176,0,0.4)] hover:shadow-[0_8px_20px_-3px_rgba(255,176,0,0.5)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Tersalin!
                    </>
                  ) : (
                    'Salin Token'
                  )}
                </button>
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ForgotPasswordPage;
