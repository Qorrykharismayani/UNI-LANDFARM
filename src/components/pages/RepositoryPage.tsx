import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Download, 
  Search, 
  Zap, 
  CreditCard,
  ChevronDown,
  Coins,
  Sparkles,
  TrendingUp,
  Clock,
  Receipt,
  Wallet
} from 'lucide-react';

interface RepositoryPageProps {
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  user?: any;
  onTokenUpdate?: (newTokens: number) => void;
  onNewNotification?: (notif: { type: string; title: string; desc: string }) => void;
}

const RepositoryPage = ({ showNotification, user, onTokenUpdate, onNewNotification }: RepositoryPageProps) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'history'>('checkout');
  const [checkoutStep, setCheckoutStep] = useState<'package' | 'payment' | 'input' | 'processing' | 'receipt'>('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [tokenBalance, setTokenBalance] = useState<number>(user?.tokens || 0);
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [lastReceiptRef, setLastReceiptRef] = useState('');

  const packages = [
    {
      id: 'pemula',
      name: 'Paket Pemula',
      price: 25000,
      tokens: 10,
      description: 'Cocok untuk mencoba fitur dasar AI.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Akses Template Dasar', 'Dukungan Komunitas'],
      popular: false,
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'pertumbuhan',
      name: 'Paket Pertumbuhan',
      price: 100000,
      tokens: 250,
      description: 'Untuk bisnis yang aktif berkembang.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Akses Semua Template', 'Dukungan Prioritas'],
      popular: true,
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      id: 'pro',
      name: 'Paket Pro',
      price: 350000,
      tokens: 1000,
      description: 'Solusi skala besar untuk agensi.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Pengaturan Domain Kustom', 'Agen AI Khusus'],
      popular: false,
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', group: 'DOMPET DIGITAL (E-WALLET)', color: '#00AED6' },
    { id: 'ovo', name: 'OVO', group: 'DOMPET DIGITAL (E-WALLET)', color: '#4C2A86' },
    { id: 'dana', name: 'DANA', group: 'DOMPET DIGITAL (E-WALLET)', color: '#108EE9' },
    { id: 'shopeepay', name: 'ShopeePay', group: 'DOMPET DIGITAL (E-WALLET)', color: '#EE4D2D' },
    { id: 'bca_va', name: 'BCA VA', group: 'VIRTUAL ACCOUNT', color: '#0060AF' },
    { id: 'mandiri_va', name: 'Mandiri VA', group: 'VIRTUAL ACCOUNT', color: '#FFC425' },
    { id: 'bni_va', name: 'BNI VA', group: 'VIRTUAL ACCOUNT', color: '#005E6A' },
    { id: 'bri_va', name: 'BRI VA', group: 'VIRTUAL ACCOUNT', color: '#00529C' },
    { id: 'bca_mobile', name: 'BCA Mobile', group: 'MOBILE BANKING', color: '#0060AF' },
    { id: 'livin_mandiri', name: "Livin' by Mandiri", group: 'MOBILE BANKING', color: '#FFC425' },
  ];

  const allTransactions = [...purchaseHistory];

  const filteredTransactions = allTransactions.filter(tx => {
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
    const refId = `TX-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setLastReceiptRef(refId);

    setTimeout(() => {
      // Update token balance
      const newBalance = tokenBalance + (selectedPackage?.tokens || 0);
      setTokenBalance(newBalance);

      // Add to purchase history
      const newTransaction = {
        id: refId,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        package: selectedPackage?.name,
        amount: `Rp ${selectedPackage?.price.toLocaleString()}`,
        method: selectedPayment,
        status: 'berhasil',
        tokens: selectedPackage?.tokens
      };
      setPurchaseHistory(prev => [newTransaction, ...prev]);

      // Fire callback to update parent user object
      if (onTokenUpdate) {
        onTokenUpdate(newBalance);
      }

      // Fire notification callback
      if (onNewNotification) {
        onNewNotification({
          type: 'token',
          title: 'Pembelian Token Berhasil',
          desc: `${selectedPackage?.tokens} Token dari ${selectedPackage?.name} telah ditambahkan ke akun Anda via ${selectedPayment}.`
        });
      }

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

  const isTextDark = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Tabs */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl flex items-center border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => { setActiveTab('checkout'); setCheckoutStep('package'); }}
              className={`px-7 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'checkout' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-md' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <span className="flex items-center gap-2"><Coins className="w-4 h-4" /> Beli Token</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-7 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'history' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-md' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <span className="flex items-center gap-2"><Receipt className="w-4 h-4" /> Riwayat</span>
            </button>
          </div>
        </div>

        {/* Saldo Widget */}
        <div className="flex items-center gap-5 bg-white dark:bg-slate-900 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/20">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Saldo Token</p>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-none tabular-nums">{tokenBalance.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-100 dark:bg-slate-800" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-emerald-500">Aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {activeTab === 'checkout' ? (
        <div className="space-y-10">
          {/* PACKAGE SELECTION */}
          {checkoutStep === 'package' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Section Header */}
              <div className="text-center max-w-lg mx-auto">
                <div className="inline-flex items-center gap-2 bg-brand-blue/5 text-brand-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-blue/10">
                  <Sparkles className="w-3.5 h-3.5" /> Pilih Paket Token
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Tingkatkan Kapasitas AI Anda</h2>
                <p className="text-sm text-slate-500 mt-2">Pilih paket yang sesuai kebutuhan bisnis Anda</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer ${selectedPackage?.id === pkg.id
                        ? 'border-brand-blue shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]'
                        : 'border-slate-100 dark:border-slate-800 hover:border-amber-300/50 hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)]'
                      }`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-[0.15em] px-5 py-1.5 rounded-full shadow-lg shadow-amber-400/30 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" /> Populer
                        </div>
                      </div>
                    )}

                    {/* Token Count Badge */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Zap className="w-7 h-7 text-white" />
                    </div>

                    <h4 className="text-base font-black text-slate-900 dark:text-white mb-1 uppercase tracking-wide">{pkg.name}</h4>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">Rp {pkg.price.toLocaleString()}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-400 mb-6">{pkg.description}</p>

                    <div className="space-y-3 w-full mb-8 text-left pt-5 border-t border-slate-100 dark:border-slate-800">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                        nextStep();
                      }}
                      className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-2 ${pkg.popular
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-amber-400/30'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-brand-blue hover:border-brand-blue hover:text-white hover:shadow-lg hover:shadow-brand-blue/30'
                        }`}
                    >
                      <span className="flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> Beli {pkg.tokens} Token</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PAYMENT METHOD */}
          {checkoutStep === 'payment' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={prevStep} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-brand-blue transition-all cursor-pointer hover:bg-slate-100">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Metode Pembayaran</h3>
                    <p className="text-xs font-medium text-slate-400">Pilih cara bayar yang paling nyaman</p>
                  </div>
                </div>
                <div className="text-right bg-brand-blue/5 px-5 py-3 rounded-xl border border-brand-blue/10">
                  <p className="text-[10px] font-bold text-brand-blue uppercase mb-0.5">Total Bayar</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white tabular-nums">Rp {selectedPackage?.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {Array.from(new Set(paymentMethods.map(m => m.group))).map((group, gIdx) => (
                    <div key={gIdx} className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.filter(m => m.group === group).map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.name)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all group relative overflow-hidden cursor-pointer ${selectedPayment === method.name
                                ? 'border-brand-blue bg-brand-blue/5 shadow-md'
                                : 'border-slate-100 dark:border-slate-800 hover:border-brand-blue/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                              }`}
                          >
                            {selectedPayment === method.name && (
                              <div className="absolute top-0 right-0 w-7 h-7 bg-brand-blue flex items-center justify-center rounded-bl-lg">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-[7px] font-black uppercase shrink-0 transition-transform group-hover:scale-105 shadow-md"
                              style={{ 
                                backgroundColor: method.color,
                                color: isTextDark(method.color) ? '#1e293b' : '#ffffff'
                              }}
                            >
                              {method.name.split(' ')[0].substring(0, 6)}
                            </div>
                            <span className={`text-xs font-bold text-left leading-tight ${selectedPayment === method.name ? 'text-brand-blue' : 'text-slate-600 dark:text-slate-400'}`}>{method.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-6 text-center flex items-center justify-center gap-2"><Receipt className="w-4 h-4" /> Ringkasan Pesanan</h4>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-slate-500">Paket</span>
                        <span className="font-bold text-slate-900 dark:text-white">{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-slate-500">Token</span>
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> {selectedPackage?.tokens} Token</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-slate-500">Metode</span>
                        <span className="font-bold text-slate-900 dark:text-white">{selectedPayment || '-'}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-400 uppercase">Total</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white">Rp {selectedPackage?.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="KODE PROMO (OPSIONAL)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/30 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedPayment}
                    className={`w-full py-4.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer ${selectedPayment
                        ? 'bg-brand-blue text-white shadow-brand-blue/20 hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99]'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      }`}
                  >
                    Bayar Sekarang
                  </button>

                  <p className="text-center text-[10px] font-medium text-slate-400 leading-relaxed">
                    🔒 Transaksi diamankan dengan enkripsi SSL 256-bit
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* INPUT STEP */}
          {checkoutStep === 'input' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 text-center">Konfirmasi {selectedPayment}</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium text-center">
                Masukkan nomor akun untuk verifikasi pembayaran.
              </p>

              <div className="space-y-5 mb-8 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nomor Akun / E-Wallet / VA</label>
                  <input
                    type="text"
                    placeholder={selectedPayment?.includes('VA') ? '8806 0812 XXXX' : '0812-3456-XXXX'}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-brand-blue/40 rounded-xl py-4 px-5 text-sm font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 focus:ring-4 focus:ring-brand-blue/10"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setCheckoutStep('payment')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer">Kembali</button>
                <button id="process-payment-btn" onClick={processPayment} className="flex-1 py-4 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/20 hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">Konfirmasi Bayar</button>
              </div>
            </motion.div>
          )}

          {/* PROCESSING */}
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
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Memproses Transaksi...</h3>
              <p className="text-sm text-slate-500 font-medium">Jangan tutup halaman ini, sistem sedang memverifikasi pembayaran Anda.</p>
            </div>
          )}

          {/* RECEIPT */}
          {checkoutStep === 'receipt' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15)_0%,transparent_60%)]"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-white/30 backdrop-blur-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-1">Transaksi Berhasil!</h3>
                  <p className="text-sm font-medium opacity-80">Token telah ditambahkan ke akun Anda</p>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="grid grid-cols-2 gap-6 py-6 border-y-2 border-dashed border-slate-100 dark:border-slate-800">
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reference ID</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white font-mono">#{lastReceiptRef}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="space-y-5 text-right">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Metode</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPayment}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Paket</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedPackage?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500">Total Dibayar</span>
                    <span className="text-2xl font-black text-emerald-500">Rp {selectedPackage?.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Token Ditambahkan</span>
                    </div>
                    <span className="text-xl font-black text-emerald-600">+{selectedPackage?.tokens}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Baru</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{tokenBalance.toLocaleString()} Token</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setCheckoutStep('package'); setActiveTab('history'); }}
                    className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg cursor-pointer"
                  >
                    Lihat Riwayat
                  </button>
                  <button
                    onClick={() => { setCheckoutStep('package'); }}
                    className="flex-1 py-4 bg-brand-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-brand-blue/20 cursor-pointer"
                  >
                    Beli Lagi
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* HISTORY TAB */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Riwayat Transaksi</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Menampilkan riwayat pengisian token Anda</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 w-48 transition-all"
                  />
                </div>
                {/* Status Dropdown */}
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <option value="semua">Semua Status</option>
                    <option value="berhasil">✅ Berhasil</option>
                    <option value="gagal">❌ Gagal</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                <button className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-brand-blue hover:border-brand-blue/30 transition-all cursor-pointer">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    {['Tanggal', 'Ref', 'Paket', 'Nominal', 'Metode', 'Status'].map((h) => (
                      <th key={h} className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-700">
                            <Receipt className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-slate-800 dark:text-white mb-1">Belum Ada Transaksi</p>
                            <p className="text-sm text-slate-500 max-w-xs mx-auto">Riwayat pembelian token Anda akan muncul di sini setelah melakukan transaksi pertama.</p>
                          </div>
                          <button 
                            onClick={() => { setActiveTab('checkout'); setCheckoutStep('package'); }}
                            className="mt-2 px-6 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
                          >
                            Beli Token Sekarang
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{tx.date}</p>
                          <p className="text-[10px] font-medium text-slate-400">{tx.time}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-brand-blue transition-colors">#{tx.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                              <Layers className="w-3.5 h-3.5" />
                            </div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{tx.package}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">{tx.amount}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{tx.method}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            tx.status === 'berhasil' 
                              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-500/20' 
                              : 'bg-red-50 dark:bg-red-500/10 text-red-600 border border-red-200 dark:border-red-500/20'
                          }`}>
                            {tx.status === 'berhasil' ? '✓' : '✕'} {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RepositoryPage;
