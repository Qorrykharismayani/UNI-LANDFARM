import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../lib/clipboard';
import { motion } from 'motion/react';
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
  Clock,
  Receipt,
  Wallet,
  Leaf,
  QrCode,
  Smartphone,
  Copy,
  Timer,
  ChevronUp,
  BellRing
} from 'lucide-react';

interface RepositoryPageProps {
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  user?: any;
  onTokenUpdate?: (newTokens: number) => void;
  onTransactionComplete?: () => void;
}

const RepositoryPage = ({ showNotification, user, onTokenUpdate, onTransactionComplete }: RepositoryPageProps) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'history'>('checkout');
  const [checkoutStep, setCheckoutStep] = useState<'package' | 'payment' | 'input' | 'processing' | 'receipt'>('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [printTargetTx, setPrintTargetTx] = useState<any>(null);
  const [isPrintingAll, setIsPrintingAll] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<number>(user?.tokens || 0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [packagesData, setPackagesData] = useState<any[]>([]);
  const [paymentMethodsData, setPaymentMethodsData] = useState<any[]>([]);
  const [lastReceiptRef, setLastReceiptRef] = useState('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [vaAccordion, setVaAccordion] = useState<string>('atm');
  const [pushState, setPushState] = useState<'input' | 'waiting'>('input');
  const [generatedVa, setGeneratedVa] = useState<string>('');

  const isPromoApplied = promoCode.trim() === 'INIPROMOHARIAN';
  const isPromoInvalid = promoCode.trim() !== '' && promoCode.trim() !== 'INIPROMOHARIAN';
  const discountPercent = isPromoApplied ? 10 : 0;
  const discountAmount = selectedPackage ? Math.round((selectedPackage.price * discountPercent) / 100) : 0;
  const finalPrice = selectedPackage ? selectedPackage.price - discountAmount : 0;

  const [timerSeconds, setTimerSeconds] = useState(86399);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutStep === 'input') {
      setTimerSeconds(86399); // Reset to 23:59:59
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [checkoutStep]);

  const formatCountdown = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Fetch transactions from API on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setTokenBalance(user?.tokens || 0);
  }, [user?.tokens]);

  const fetchTransactions = async () => {
    setIsLoadingHistory(true);
    try {
      const [resTx, resSet] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/settings')
      ]);
      const dataTx = await resTx.json();
      const dataSet = await resSet.json();
      
      if (dataTx.success && Array.isArray(dataTx.data)) {
        setTransactions(dataTx.data);
      }

      const defaultPackages = [
        {
          id: 'basic', name: 'Paket Basic', price: 75000, tokens: 800, description: 'Untuk kebutuhan desain dasar.',
          features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '800 token'], popular: false, gradient: 'from-blue-500 to-cyan-400'
        },
        {
          id: 'standard', name: 'Paket Standard', price: 250000, tokens: 2500, description: 'Pilihan terbaik untuk hasil profesional.',
          features: ['3 alternatif desain', 'Prompt detail', 'Branding sesuai website', 'Struktur visual profesional', '2500 token'], popular: true, gradient: 'from-amber-400 to-orange-500'
        },
        {
          id: 'premium', name: 'Paket Premium', price: 500000, tokens: 5000, description: 'Solusi terlengkap untuk berbagai format visual.',
          features: ['Menggunakan screenshot website sebagai referensi', 'Prompt sangat detail', 'Storytelling visual', 'Layout presentasi/lomba/skripsi', '5000 token', 'Beberapa versi (poster, banner, slide)'], popular: false, gradient: 'from-violet-500 to-purple-600'
        }
      ];

      const defaultPaymentMethods = [
        { id: 'gopay', name: 'GoPay', group: 'DOMPET DIGITAL (E-WALLET)', color: '#00AED6', logo: '/gopay.jpg' },
        { id: 'ovo', name: 'OVO', group: 'DOMPET DIGITAL (E-WALLET)', color: '#4C2A86', logo: '/ovo.jpg' },
        { id: 'dana', name: 'DANA', group: 'DOMPET DIGITAL (E-WALLET)', color: '#108EE9', logo: '/dana.jpg' },
        { id: 'shopeepay', name: 'ShopeePay', group: 'DOMPET DIGITAL (E-WALLET)', color: '#EE4D2D', logo: '/shopeepay.jpg' },
        { id: 'bca_va', name: 'BCA VA', group: 'VIRTUAL ACCOUNT', color: '#0060AF', logo: '/bca.jpg' },
        { id: 'mandiri_va', name: 'Mandiri VA', group: 'VIRTUAL ACCOUNT', color: '#FFC425', logo: '/mandiri.jpg' },
        { id: 'bni_va', name: 'BNI VA', group: 'VIRTUAL ACCOUNT', color: '#005E6A', logo: '/bni.jpg' },
        { id: 'bri_va', name: 'BRI VA', group: 'VIRTUAL ACCOUNT', color: '#00529C', logo: '/bri.jpg' },
        { id: 'bca_mobile', name: 'BCA Mobile', group: 'MOBILE BANKING', color: '#0060AF', logo: '/bca_mobile.png' },
        { id: 'livin_mandiri', name: "Livin' by Mandiri", group: 'MOBILE BANKING', color: '#FFC425', logo: '/livin.jpg' },
      ];

      if (dataSet.success && dataSet.data?.userPageJson) {
        const p = dataSet.data.userPageJson.pricing;
        const m = dataSet.data.userPageJson.paymentMethods;
        setPackagesData(Array.isArray(p) && p.length > 0 ? p.map((pkg, i) => ({
          ...pkg, 
          id: pkg.id || `pkg-${i}`, 
          price: parseInt(pkg.price.toString().replace(/\D/g, '')) || 0,
          tokens: parseInt((pkg.features.find((f:string) => f.includes('token')) || '0').split('-').pop()?.replace(/\D/g, '') || '0') || 0,
          popular: pkg.isPopular || false
        })) : defaultPackages);
        
        setPaymentMethodsData(Array.isArray(m) && m.length > 0 ? m.map((method, i) => ({
          ...method,
          group: method.type === 'EWALLET' ? 'DOMPET DIGITAL (E-WALLET)' : method.type === 'VA' ? 'VIRTUAL ACCOUNT' : method.type === 'QRIS' ? 'QRIS' : 'Lainnya',
          color: '#1e293b'
        })) : defaultPaymentMethods);
      } else {
        setPackagesData(defaultPackages);
        setPaymentMethodsData(defaultPaymentMethods);
      }

    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const packages = packagesData;
  const paymentMethods = paymentMethodsData;

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = (tx.refId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.packageName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.method || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'semua' || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePayment = () => {
    if (activeTab === 'checkout' && (!selectedPackage || !selectedPayment)) return;

    if (isPromoInvalid) {
      showNotification('Kode promo tidak valid! Silakan koreksi atau kosongkan kolom promo.', 'info');
      return;
    }
    
    let prefix = '8806';
    if (selectedPayment?.toLowerCase().includes('bca')) prefix = '39358';
    else if (selectedPayment?.toLowerCase().includes('bni')) prefix = '8273';
    else if (selectedPayment?.toLowerCase().includes('bri')) prefix = '2240';
    
    const newVa = prefix + Math.floor(10000000 + Math.random() * 90000000).toString();
    setGeneratedVa(newVa);
    
    // Buka accordion Internet mBanking secara default saat awal dimuat
    setVaAccordion((selectedPayment || '').toLowerCase() + '_ib');
    
    setCheckoutStep('input');
  };

  const processPayment = async () => {
    const paymentGroup = paymentMethods.find(m => m.name === selectedPayment)?.group;
    if (paymentGroup === 'MOBILE BANKING' && !accountNumber) {
      showNotification('Masukkan nomor akun/rekening Anda.', 'info');
      return;
    }
    setCheckoutStep('processing');

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName: selectedPackage?.name,
          packageTokens: selectedPackage?.tokens,
          amount: finalPrice,
          method: selectedPayment,
          paymentCode: generatedVa
        }),
      });

      const data = await res.json();

      if (data.success) {
        const { transaction, newTokenBalance } = data.data;
        setLastReceiptRef(transaction.refId);
        setTokenBalance(newTokenBalance);
        
        // Update parent's user tokens
        if (onTokenUpdate) onTokenUpdate(newTokenBalance);
        
        // Tell parent to refresh notifications
        if (onTransactionComplete) onTransactionComplete();
        
        // Refresh local transaction list
        await fetchTransactions();

        setCheckoutStep('receipt');
        showNotification('Pembayaran berhasil dikonfirmasi!', 'success');
        setAccountNumber('');
      } else {
        showNotification(data.message || 'Gagal memproses pembayaran.', 'info');
        setCheckoutStep('input');
      }
    } catch (err) {
      console.error('Payment error:', err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
      setCheckoutStep('input');
    }
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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 print:hidden">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl flex items-center border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => { setActiveTab('checkout'); setCheckoutStep('package'); }}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'checkout' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-md' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <span className="flex items-center gap-2"><Coins className="w-4 h-4" /> Beli Token</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'history' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-md' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center max-w-lg mx-auto">
                <div className="inline-flex items-center gap-2 bg-brand-blue/5 text-brand-blue px-4 py-1.5 rounded-full text-lg font-bold uppercase tracking-wider mb-4 border border-brand-blue/10">
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
                    {pkg.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-[0.15em] px-5 py-1.5 rounded-full shadow-lg shadow-amber-400/30 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" /> Populer
                        </div>
                      </div>
                    )}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-wide">{pkg.name}</h4>
                    <span className="text-3xl font-black text-slate-900 dark:text-white mb-1">Rp {pkg.price.toLocaleString()}</span>
                    <p className="text-xs font-medium text-slate-400 mb-6">{pkg.description}</p>
                    <div className="space-y-3 w-full mb-8 text-left pt-5 border-t border-slate-100 dark:border-slate-800">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedPackage(pkg); nextStep(); }}
                      className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-2 ${pkg.popular
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
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={prevStep} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-brand-blue transition-all cursor-pointer hover:bg-slate-100">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Metode Pembayaran</h3>
                    <p className="text-lg font-medium text-slate-400">Pilih cara bayar yang paling nyaman</p>
                  </div>
                </div>
                <div className="text-right bg-brand-blue/5 px-5 py-3 rounded-xl border border-brand-blue/10">
                  <p className="text-base font-bold text-brand-blue uppercase mb-0.5">Total Bayar</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">Rp {finalPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {Array.from(new Set(paymentMethods.map(m => m.group))).map((group, gIdx) => (
                    <div key={gIdx} className="space-y-3">
                      <h4 className="text-base font-black text-slate-400 uppercase tracking-widest">{group}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.filter(m => m.group === group).map((method) => (
                          <button key={method.id} onClick={() => setSelectedPayment(method.name)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all group relative overflow-hidden cursor-pointer ${selectedPayment === method.name ? 'border-brand-blue bg-brand-blue/5 shadow-md' : 'border-slate-100 dark:border-slate-800 hover:border-brand-blue/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                            {selectedPayment === method.name && (
                              <div className="absolute top-0 right-0 w-7 h-7 bg-brand-blue flex items-center justify-center rounded-bl-lg"><CheckCircle2 className="w-3.5 h-3.5 text-white" /></div>
                            )}
                            <div 
                              className="w-16 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm overflow-hidden bg-white border border-slate-100/80" 
                              style={{ 
                                backgroundColor: method.logo ? '#fff' : method.color, 
                                color: isTextDark(method.color) ? '#1e293b' : '#fff' 
                              }}
                            >
                              {method.logo ? (
                                <img 
                                  src={method.logo} 
                                  alt={method.name} 
                                  className={`w-full h-full object-contain ${
                                    method.id === 'bca_va' ? 'scale-[1.15]' : 
                                    method.id === 'mandiri_va' ? 'scale-[1.4] p-0' : 
                                    method.id === 'bni_va' ? 'p-0.5' : 
                                    method.id === 'bri_va' ? 'scale-[1.25] p-0' : 
                                    method.id === 'bca_mobile' ? 'scale-[2.1]' : 
                                    method.id === 'gopay' ? 'p-0.5' : 
                                    method.id === 'dana' ? 'p-0.5' : 
                                    'p-1'
                                  }`} 
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <span className="text-[9px] font-black uppercase tracking-wider">{method.name.split(' ')[0].substring(0, 6)}</span>
                              )}
                            </div>
                            <span className={`text-lg font-bold text-left leading-tight ${selectedPayment === method.name ? 'text-brand-blue' : 'text-slate-600 dark:text-slate-400'}`}>{method.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h4 className="text-lg font-black text-slate-400 uppercase tracking-wider mb-6 text-center flex items-center justify-center gap-2"><Receipt className="w-4 h-4" /> Ringkasan Pesanan</h4>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-sm lg:text-base"><span className="font-medium text-slate-500">Paket</span><span className="font-bold text-slate-900 dark:text-white">{selectedPackage?.name}</span></div>
                      <div className="flex justify-between items-center text-sm lg:text-base"><span className="font-medium text-slate-500">Token</span><span className="font-bold text-slate-900 dark:text-white flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> {selectedPackage?.tokens} Token</span></div>
                      <div className="flex justify-between items-center text-sm lg:text-base"><span className="font-medium text-slate-500">Metode</span><span className="font-bold text-slate-900 dark:text-white">{selectedPayment || '-'}</span></div>
                      {isPromoApplied && (
                        <div className="flex justify-between items-center text-sm lg:text-base"><span className="font-medium text-slate-500">Promo (INIPROMOHARIAN)</span><span className="font-bold text-emerald-500">-Rp {discountAmount.toLocaleString()} (10%)</span></div>
                      )}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
                        <span className="text-base font-bold text-slate-400 uppercase">Total</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">Rp {finalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <input 
                        type="text" 
                        placeholder="KODE PROMO (OPSIONAL)" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())} 
                        className={`w-full bg-white dark:bg-slate-900 border rounded-xl py-2.5 px-4 text-sm font-bold uppercase tracking-wider outline-none focus:ring-2 transition-all ${
                          promoCode.trim() === '' 
                            ? 'border-slate-200 dark:border-slate-700 focus:ring-brand-blue/20 focus:border-brand-blue/30' 
                            : isPromoApplied 
                              ? 'border-emerald-500 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500/20 focus:border-emerald-500/30' 
                              : 'border-rose-500 dark:border-rose-500/50 text-rose-600 dark:text-rose-400 focus:ring-rose-500/20 focus:border-rose-500/30'
                        }`} 
                      />
                      {promoCode.trim() !== '' && (
                        <p className={`text-[11px] font-bold text-left leading-relaxed ${isPromoApplied ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isPromoApplied ? '✓ Kode promo "INIPROMOHARIAN" berhasil digunakan. Diskon 10%!' : '✗ Kode promo tidak valid!'}
                        </p>
                      )}
                    </div>
                  </div>
                  <button onClick={handlePayment} disabled={!selectedPayment || isPromoInvalid}
                    className={`w-full py-3.5 rounded-xl text-base font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer ${
                      selectedPayment && !isPromoInvalid 
                        ? 'bg-brand-blue text-white shadow-brand-blue/20 hover:bg-amber-500 hover:shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99]' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    Bayar Sekarang
                  </button>
                  <p className="text-center text-xs font-medium text-slate-400">🔒 Transaksi diamankan dengan enkripsi SSL 256-bit</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* INPUT STEP */}
          {checkoutStep === 'input' && (() => {
            const paymentGroup = paymentMethods.find(m => m.name === selectedPayment)?.group;
            let vaNumber = generatedVa;
            
            const getBankInstructions = (paymentName: string, vaNum: string, price: number | undefined) => {
              const name = paymentName.toLowerCase();
              const priceStr = price ? `Rp ${price.toLocaleString()}` : '';
              const ibTitle = "Internet mBanking Payment";
              const atmTitle = "ATM Payment";
              const ibKey = name + '_ib';
              const atmKey = name + '_atm';

              let ibContent = null;
              let atmContent = null;

              if (name.includes('mandiri')) {
                ibContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Buka situs web <strong>Mandiri Internet Banking</strong> (https://ibank.bankmandiri.co.id) melalui browser di laptop atau PC kamu.</li>
                    <li>Lakukan login dengan memasukkan User ID dan PIN/Password.</li>
                    <li>Pada halaman utama, pilih menu <strong>Bayar</strong> di deretan menu sebelah kiri.</li>
                    <li>Klik pada pilihan <strong>Multipayment</strong>.</li>
                    <li>Pada kolom Penyedia Jasa, pilih nama merchant atau masukkan Kode Perusahaan (contoh: <strong>70012</strong>).</li>
                    <li>Masukkan Nomor Virtual Account pesanan kamu: <strong>{vaNum}</strong> pada kolom No. VA, lalu klik <strong>Lanjutkan</strong>.</li>
                    <li>Layar akan menampilkan rincian tagihan (Nama Merchant dan Total Pembayaran <strong>{priceStr}</strong>). Centang pada tagihan yang sesuai, lalu klik <strong>Lanjutkan</strong>.</li>
                    <li>Siapkan Token Mandiri kamu. Tekan tombol merah untuk menyalakan token, lalu masukkan PIN Token kamu.</li>
                    <li>Tekan angka 1 pada token untuk masuk ke mode <strong>APPLI 1</strong>.</li>
                    <li>Masukkan Challenge Code (angka yang muncul di layar komputer) ke dalam Token Mandiri.</li>
                    <li>Token Mandiri akan menghasilkan angka respon. Masukkan angka respon tersebut ke dalam kolom PIN Mandiri (APPLI 1) yang ada di layar komputer, lalu klik <strong>Kirim</strong>.</li>
                    <li>Selesai! Layar akan menampilkan bukti transaksi berhasil. Simpan atau cetak resi tersebut sebagai bukti pembayaran.</li>
                  </ol>
                );
                atmContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Masukkan kartu ATM Mandiri kamu dan ketik PIN.</li>
                    <li>Pada menu utama, pilih menu <strong>Bayar/Beli</strong>.</li>
                    <li>Pilih menu <strong>Lainnya</strong>, lalu pilih <strong>Lainnya</strong> lagi, kemudian tekan menu <strong>Multipayment</strong>.</li>
                    <li>Masukkan Kode Perusahaan (contoh: <strong>70012</strong>) lalu tekan Benar.</li>
                    <li>Masukkan Nomor Virtual Account pesanan kamu: <strong>{vaNum}</strong> lalu tekan Benar.</li>
                    <li>Layar ATM akan menampilkan konfirmasi data tagihan (Nama, Merchant, dan Total Tagihan <strong>{priceStr}</strong>).</li>
                    <li>Jika data sudah benar, tekan angka 1 (atau ikuti instruksi pilihan di layar) dan tekan Ya.</li>
                    <li>Transaksi selesai! Mesin ATM akan mengeluarkan struk. Simpan struk sebagai bukti pembayaran yang sah.</li>
                  </ol>
                );
              } else if (name.includes('bca')) {
                ibContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Buka halaman <strong>KlikBCA</strong> (https://ibank.klikbca.com) dan lakukan login menggunakan USER ID dan PIN.</li>
                    <li>Pilih menu <strong>Transfer Dana</strong> di menu sebelah kiri.</li>
                    <li>Pilih <strong>Transfer ke BCA Virtual Account</strong>.</li>
                    <li>Masukkan Nomor Virtual Account pesanan kamu: <strong>{vaNum}</strong>, lalu klik <strong>Lanjutkan</strong>.</li>
                    <li>Detail pembayaran akan muncul di layar. Pastikan nama merchant dan total tagihan (<strong>{priceStr}</strong>) sudah benar.</li>
                    <li>Aktifkan token KeyBCA, masukkan PIN, lalu tekan <strong>APPLI 1</strong>.</li>
                    <li>Masukkan angka respon dari KeyBCA ke kolom yang tersedia di layar KlikBCA, lalu klik <strong>Kirim</strong>.</li>
                    <li>Transaksi selesai. Layar akan menampilkan bukti pembayaran yang bisa kamu simpan/cetak.</li>
                  </ol>
                );
                atmContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Masukkan kartu ATM BCA dan ketik PIN kamu.</li>
                    <li>Pilih menu <strong>Penarikan Tunai / Transaksi Lainnya</strong>.</li>
                    <li>Pilih menu <strong>Transaksi Lainnya</strong>.</li>
                    <li>Pilih menu <strong>Transfer</strong>.</li>
                    <li>Pilih menu <strong>Ke Rek BCA Virtual Account</strong>.</li>
                    <li>Masukkan Nomor Virtual Account (contoh: <strong>{vaNum}</strong>) lalu tekan Benar.</li>
                    <li>Layar akan menampilkan halaman konfirmasi (Nama Merchant dan Total Tagihan <strong>{priceStr}</strong>). Jika nominal sudah sesuai, tekan Ya.</li>
                    <li>Transaksi selesai! Mesin ATM akan mengeluarkan struk sebagai bukti pembayaran.</li>
                  </ol>
                );
              } else if (name.includes('bni')) {
                ibContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Buka situs web <strong>BNI Internet Banking</strong> (https://ibank.bni.co.id) dan lakukan login.</li>
                    <li>Pilih menu <strong>Transfer</strong> pada deretan menu di sebelah kiri.</li>
                    <li>Pilih menu <strong>Virtual Account Billing</strong>.</li>
                    <li>Masukkan Nomor Virtual Account pesanan kamu: <strong>{vaNum}</strong>, lalu klik <strong>Lanjut</strong>.</li>
                    <li>Periksa detail konfirmasi pembayaran (<strong>{priceStr}</strong>) yang muncul di layar.</li>
                    <li>Nyalakan Token BNI e-Secure, lalu masukkan Kode Otentikasi dari token tersebut ke kolom yang tersedia di layar.</li>
                    <li>Klik <strong>Proses</strong>.</li>
                    <li>Transaksi selesai! Kamu bisa mencetak atau menyimpan resi buktinya.</li>
                  </ol>
                );
                atmContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Masukkan kartu ATM BNI dan ketik PIN kamu.</li>
                    <li>Pilih <strong>Menu Lain</strong>.</li>
                    <li>Pilih menu <strong>Transfer</strong>.</li>
                    <li>Pilih menu <strong>Virtual Account Billing</strong>.</li>
                    <li>Masukkan Nomor Virtual Account pesanan kamu: <strong>{vaNum}</strong>, lalu tekan Benar.</li>
                    <li>Layar akan menampilkan rincian pembayaran. Jika data merchant dan nominal (<strong>{priceStr}</strong>) sudah sesuai, tekan Ya.</li>
                    <li>Selesai! Ambil struk dari mesin ATM sebagai bukti pembayaran yang sah.</li>
                  </ol>
                );
              } else if (name.includes('bri')) {
                ibContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Buka situs web <strong>Internet Banking BRI</strong> (https://ib.bri.co.id) melalui browser dan login menggunakan User ID dan Password.</li>
                    <li>Pilih menu <strong>Pembayaran &amp; Pembelian</strong>.</li>
                    <li>Pilih submenu <strong>BRIVA</strong>.</li>
                    <li>Masukkan Nomor BRIVA pesanan kamu: <strong>{vaNum}</strong> di kolom yang tersedia, lalu klik <strong>Kirim</strong>.</li>
                    <li>Detail tagihan (<strong>{priceStr}</strong>) akan muncul di layar. Jika sudah benar, masukkan Password Internet Banking dan m-Token (yang dikirimkan via SMS ke nomor terdaftar).</li>
                    <li>Klik <strong>Kirim</strong>.</li>
                    <li>Transaksi selesai! Simpan atau cetak bukti pembayaran.</li>
                  </ol>
                );
                atmContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Masukkan kartu ATM BRI dan ketik PIN kamu.</li>
                    <li>Pilih menu <strong>Transaksi Lain</strong>.</li>
                    <li>Pilih menu <strong>Pembayaran</strong>.</li>
                    <li>Pilih menu <strong>Lainnya</strong>, lalu tekan <strong>BRIVA</strong>.</li>
                    <li>Masukkan Nomor BRIVA pesanan kamu: <strong>{vaNum}</strong>, lalu tekan Benar.</li>
                    <li>Layar akan menampilkan konfirmasi tagihan. Jika nama dan nominal (<strong>{priceStr}</strong>) sudah sesuai, tekan Ya.</li>
                    <li>Transaksi selesai! Mesin ATM akan mengeluarkan struk sebagai bukti pembayaran.</li>
                  </ol>
                );
              } else {
                ibContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Buka layanan <strong>Internet Banking</strong> bank pilihan kamu.</li>
                    <li>Pilih menu <strong>Transfer &gt; Virtual Account</strong>.</li>
                    <li>Masukkan nomor VA <strong>{vaNum}</strong>.</li>
                    <li>Pastikan detail tagihan (<strong>{priceStr}</strong>) sudah benar.</li>
                    <li>Selesaikan pembayaran.</li>
                  </ol>
                );
                atmContent = (
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>Kunjungi mesin <strong>ATM</strong> terdekat sesuai bank kamu.</li>
                    <li>Pilih menu <strong>Transfer &gt; Virtual Account</strong>.</li>
                    <li>Masukkan nomor VA <strong>{vaNum}</strong>.</li>
                    <li>Pastikan detail tagihan (<strong>{priceStr}</strong>) sudah benar.</li>
                    <li>Selesaikan pembayaran.</li>
                  </ol>
                );
              }

              return [
                { key: ibKey, title: ibTitle, content: ibContent },
                { key: atmKey, title: atmTitle, content: atmContent }
              ];
            };
            
            return (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`${paymentGroup === 'VIRTUAL ACCOUNT' ? 'max-w-4xl' : 'max-w-md'} mx-auto bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl`}>
                
                {paymentGroup === 'DOMPET DIGITAL (E-WALLET)' && (
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><QrCode className="w-8 h-8 text-brand-blue" /></div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 text-center">Bayar via {selectedPayment}</h3>
                    
                    <div className="flex gap-4 mb-6">
                      <button className="flex-1 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-amber-500 hover:shadow-md hover:shadow-amber-500/20 transition-all">Buka via HP</button>
                      <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">Scan QR</button>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                      <p className="text-sm text-slate-500 mb-4 font-medium">Buka aplikasi {selectedPayment} di HP Anda, atau scan QR code di bawah ini.</p>
                      <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                        <QrCode className="w-full h-full text-slate-900" />
                      </div>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-200">Rp {finalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {paymentGroup === 'VIRTUAL ACCOUNT' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* KOLOM KIRI: CARA PEMBAYARAN */}
                    <div className="space-y-3 md:pr-4">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Cara Pembayaran</p>
                      {getBankInstructions(selectedPayment || '', vaNumber, finalPrice).map((item) => (
                        <div key={item.key} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                          <button 
                            onClick={() => setVaAccordion(vaAccordion === item.key ? '' : item.key)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                          >
                            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{item.title}</span>
                            {vaAccordion === item.key ? <ChevronUp className="w-4 h-4 text-brand-blue"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
                          </button>
                          {vaAccordion === item.key && (
                            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                              {item.content}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* KOLOM KANAN: DETAIL VIRTUAL ACCOUNT & TOMBOL */}
                    <div className="space-y-6 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {(() => {
                              const methodObj = paymentMethods.find(m => m.name === selectedPayment);
                              return methodObj?.logo ? (
                                <div className="w-20 h-14 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-sm border border-slate-200 shrink-0">
                                  <img 
                                    src={methodObj.logo} 
                                    alt={selectedPayment} 
                                    className={`w-full h-full object-contain ${
                                      methodObj.id === 'bca_va' ? 'scale-[1.15]' : 
                                      methodObj.id === 'mandiri_va' ? 'scale-[1.4] p-0' : 
                                      methodObj.id === 'bni_va' ? 'p-0.5' : 
                                      methodObj.id === 'bri_va' ? 'scale-[1.25] p-0' : 
                                      methodObj.id === 'bca_mobile' ? 'scale-[2.1]' : 
                                      methodObj.id === 'gopay' ? 'p-0.5' : 
                                      methodObj.id === 'dana' ? 'p-0.5' : 
                                      'p-1.5'
                                    }`} 
                                  />
                                </div>
                              ) : (
                                <div className="w-20 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center shrink-0"><CreditCard className="w-8 h-8 text-brand-blue" /></div>
                              );
                            })()}
                            <div>
                              <h3 className="text-xl font-black text-slate-900 dark:text-white">Transfer VA</h3>
                              <p className="text-sm font-medium text-slate-500">{selectedPayment}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-end gap-1"><Timer className="w-3 h-3"/> Batas Waktu</p>
                            <p className="text-lg font-bold text-orange-500 tabular-nums">{formatCountdown(timerSeconds)}</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-center space-y-4 shadow-sm">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor Virtual Account</p>
                            <div className="flex items-center justify-center gap-3">
                              <p className="text-2xl font-mono font-black text-brand-blue tracking-widest">{vaNumber}</p>
                              <button 
                                onClick={() => { copyToClipboard(vaNumber.replace(/\s/g, '')); showNotification('Nomor VA berhasil disalin!', 'success'); }}
                                className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all cursor-pointer" 
                                title="Salin"
                              >
                                <Copy className="w-4 h-4"/>
                              </button>
                            </div>
                          </div>
                          <div className="w-full h-px bg-slate-200 dark:bg-slate-700"></div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tagihan</p>
                            <div className="flex items-center justify-center gap-3">
                              <p className="text-2xl font-black text-slate-900 dark:text-white">Rp {finalPrice.toLocaleString()}</p>
                              <button 
                                onClick={() => { copyToClipboard(finalPrice.toString()); showNotification('Total tagihan berhasil disalin!', 'success'); }}
                                className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all cursor-pointer" 
                                title="Salin"
                              >
                                <Copy className="w-4 h-4"/>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-8">
                        <button onClick={() => setCheckoutStep('package')} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer">Batal</button>
                        <button onClick={processPayment} className="flex-1 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-md shadow-brand-blue/20 hover:bg-amber-500 hover:shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">Saya Sudah Bayar</button>
                      </div>
                    </div>
                  </div>
                )}

                {paymentGroup === 'MOBILE BANKING' && (
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><Smartphone className="w-8 h-8 text-brand-blue" /></div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 text-center">Direct Push {selectedPayment}</h3>
                    
                    {pushState === 'input' ? (
                      <>
                        <p className="text-sm text-slate-500 mb-6 font-medium text-center">Masukkan nomor HP yang terdaftar pada {selectedPayment} Anda.</p>
                        <div className="space-y-4">
                          <div className="space-y-2 text-left">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nomor HP</label>
                            <input 
                              type="text" 
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              placeholder="0812-3456-XXXX" 
                              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-brand-blue/40 rounded-xl py-4 px-5 font-bold text-slate-900 dark:text-white outline-none transition-all focus:ring-4 focus:ring-brand-blue/10" 
                            />
                          </div>
                          <button 
                            onClick={() => {
                              if (accountNumber.trim().length < 10) {
                                showNotification('Silakan masukkan nomor HP yang valid', 'info');
                                return;
                              }
                              setPushState('waiting');
                            }} 
                            className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-md hover:bg-amber-500 hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                          >
                            <BellRing className="w-5 h-5"/> Kirim Notifikasi ke Aplikasi
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-brand-blue rounded-full border-t-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Smartphone className="w-8 h-8 text-brand-blue animate-pulse" />
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Menunggu Persetujuan</h4>
                        <p className="text-sm text-slate-500 font-medium">Buka aplikasi {selectedPayment} Anda dan setujui transaksi sebesar <strong>Rp {finalPrice.toLocaleString()}</strong>.</p>
                        <button onClick={() => setPushState('input')} className="mt-6 text-sm font-bold text-brand-blue hover:text-blue-700 transition-all">Ganti Nomor HP?</button>
                      </div>
                    )}
                  </div>
                )}

                {(!paymentGroup) && (
                  <>
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6"><CreditCard className="w-8 h-8 text-brand-blue" /></div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 text-center">Konfirmasi {selectedPayment}</h3>
                    <p className="text-xl text-slate-500 mb-8 font-medium text-center">Selesaikan pembayaran Anda.</p>
                  </>
                )}

                {paymentGroup !== 'VIRTUAL ACCOUNT' && (
                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setCheckoutStep('package')} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer">Batal</button>
                    {(paymentGroup !== 'MOBILE BANKING' || pushState === 'waiting') && (
                       <button onClick={processPayment} className="flex-1 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-md shadow-brand-blue/20 hover:bg-amber-500 hover:shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer">Saya Sudah Bayar</button>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })()}

          {/* PROCESSING */}
          {checkoutStep === 'processing' && (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-brand-blue/20 rounded-full"></div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-brand-blue rounded-full border-t-transparent" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Memproses Transaksi...</h3>
              <p className="text-xl text-slate-500 font-medium">Jangan tutup halaman ini, sistem sedang memverifikasi pembayaran Anda.</p>
            </div>
          )}

          {/* RECEIPT */}
          {checkoutStep === 'receipt' && (
            <motion.div style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 print:shadow-none print:m-auto print:bg-white print:scale-[0.75] print:origin-top print:-mt-8 print:mb-0">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 pt-8 pb-16 px-8 md:px-10 text-white relative overflow-hidden" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15)_0%,transparent_60%)]"></div>
                
                {/* Logo Text Top Right */}
                <div className="absolute top-6 right-8 font-black italic tracking-widest text-white/80 text-sm md:text-base z-20">
                  Uni-LandFarm
                </div>

                {/* Illustration on Right */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-6 md:pr-10 pointer-events-none opacity-100 z-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mt-4">
                    <Coins className="absolute bottom-4 left-4 w-20 h-20 text-white drop-shadow-2xl" strokeWidth={1.5} />
                    <Leaf className="absolute top-2 right-8 w-12 h-12 text-emerald-100 rotate-[30deg] drop-shadow-lg" strokeWidth={1.5} />
                    <Sparkles className="absolute top-8 left-0 w-8 h-8 text-white drop-shadow-md animate-pulse-slow" strokeWidth={2} />
                    <Wallet className="absolute -bottom-2 -right-2 w-16 h-16 text-orange-100 drop-shadow-2xl -rotate-12" strokeWidth={1.5} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  </div>
                </div>

                {/* Left Aligned Content */}
                <div className="relative z-10 w-2/3 text-left">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5 border-[2px] border-white/30 backdrop-blur-sm shadow-xl">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-2 drop-shadow-md leading-tight">Transaksi<br/>Berhasil!</h3>
                  <p className="text-sm md:text-base font-medium text-white/90 leading-snug drop-shadow-sm max-w-[200px]">Token Anda telah berhasil ditambahkan.</p>
                </div>

                {/* Slanted Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 md:h-16 text-white dark:text-slate-900 fill-current">
                    <path d="M0 120L1200 120 1200 0 0 120z"></path>
                  </svg>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 py-4 border-y-2 border-dashed border-slate-100 dark:border-slate-800">
                  <div className="space-y-4">
                    <div><p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Reference ID</p><p className="text-base md:text-lg font-black text-slate-900 dark:text-white font-mono">#{lastReceiptRef}</p></div>
                    <div><p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Waktu Pembayaran</p><p className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p></div>
                  </div>
                  <div className="space-y-4 text-right">
                    <div><p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Metode</p><p className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{selectedPayment}</p></div>
                    <div><p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Paket</p><p className="text-base md:text-lg font-bold text-slate-900 dark:text-white">{selectedPackage?.name}</p></div>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl space-y-3">
                  {isPromoApplied ? (
                    <>
                      <div className="flex justify-between items-center text-sm md:text-base"><span className="font-bold text-slate-500">Harga Normal</span><span className="font-bold text-slate-400 line-through">Rp {selectedPackage?.price.toLocaleString()}</span></div>
                      <div className="flex justify-between items-center text-sm md:text-base"><span className="font-bold text-slate-500">Potongan Promo (10%)</span><span className="font-bold text-emerald-500">-Rp {discountAmount.toLocaleString()}</span></div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700"><span className="text-base font-bold text-slate-600 dark:text-slate-200">Total Dibayar</span><span className="text-2xl md:text-3xl font-black text-emerald-500">Rp {finalPrice.toLocaleString()}</span></div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center"><span className="text-base font-bold text-slate-500">Total Dibayar</span><span className="text-2xl md:text-3xl font-black text-emerald-500">Rp {finalPrice.toLocaleString()}</span></div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2"><div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500"><Zap className="w-3.5 h-3.5" /></div><span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Token Ditambahkan</span></div>
                    <span className="text-xl md:text-2xl font-black text-emerald-600">+{selectedPackage?.tokens}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Saldo Baru</span>
                    <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white">{tokenBalance.toLocaleString()} Token</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2 print:hidden">
                  <button onClick={() => { setCheckoutStep('package'); setActiveTab('history'); }} className="flex-1 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md cursor-pointer">Lihat Riwayat</button>
                  <button onClick={() => setCheckoutStep('package')} className="flex-1 py-3 bg-brand-blue text-white rounded-xl text-sm font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-brand-blue/20 cursor-pointer">Beli Lagi</button>
                  <button onClick={() => window.print()} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all cursor-pointer" title="Cetak"><Download className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* HISTORY TAB */
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`space-y-6 ${printTargetTx || isPrintingAll ? 'print:hidden' : ''}`}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Riwayat Transaksi</h3>
                <p className="text-lg text-slate-400 font-medium mt-1">Menampilkan riwayat pengisian token Anda</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 print:hidden">
                <button 
                  onClick={() => {
                    setIsPrintingAll(true);
                    setTimeout(() => {
                      window.print();
                      setTimeout(() => setIsPrintingAll(false), 500);
                    }, 100);
                  }} 
                  className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-brand-blue dark:hover:bg-brand-blue hover:text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Semua
                </button>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Cari transaksi..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 w-48 transition-all" />
                </div>
                <div className="relative">
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                    <option value="semua">Semua Status</option>
                    <option value="berhasil">✅ Berhasil</option>
                    <option value="gagal">❌ Gagal</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    {['Tanggal', 'Ref', 'Paket', 'Nominal', 'Metode', 'Status'].map((h) => (
                      <th key={h} className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right print:hidden">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {isLoadingHistory ? (
                    <tr><td colSpan={7} className="px-6 py-20 text-center"><p className="text-xl text-slate-400 animate-pulse">Memuat riwayat...</p></td></tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-700"><Receipt className="w-8 h-8 text-slate-300 dark:text-slate-600" /></div>
                          <div>
                            <p className="text-xl font-bold text-slate-800 dark:text-white mb-1">Belum Ada Transaksi</p>
                            <p className="text-sm text-slate-500 max-w-xs mx-auto">Riwayat pembelian token Anda akan muncul di sini setelah melakukan transaksi pertama.</p>
                          </div>
                          <button onClick={() => { setActiveTab('checkout'); setCheckoutStep('package'); }} className="mt-2 px-6 py-2 bg-brand-blue text-white rounded-xl text-base font-bold uppercase tracking-wider hover:bg-amber-500 transition-all shadow-md shadow-brand-blue/20 hover:shadow-amber-500/20 cursor-pointer">Beli Token Sekarang</button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx, i) => (
                      <tr key={tx.id || i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{formatDate(tx.createdAt)}</p>
                          <p className="text-xs font-medium text-slate-400">{formatTime(tx.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm font-mono font-bold text-slate-400 group-hover:text-brand-blue transition-colors">#{tx.refId}</span></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue"><Layers className="w-3 h-3" /></div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.packageName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Rp {tx.amount?.toLocaleString()}</td>
                        <td className="px-6 py-4"><span className="text-sm font-medium text-slate-500 dark:text-slate-400">{tx.method}</span></td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${tx.status === 'berhasil' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-600 border border-red-200 dark:border-red-500/20'}`}>
                            {tx.status === 'berhasil' ? '✓' : '✕'} {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right print:hidden">
                          <button 
                            onClick={() => {
                              setPrintTargetTx(tx);
                              setTimeout(() => {
                                window.print();
                                setTimeout(() => setPrintTargetTx(null), 500);
                              }, 100);
                            }}
                            className="p-2 text-slate-400 hover:text-brand-blue bg-slate-50 dark:bg-slate-800 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Unduh PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
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

      {/* HIDDEN RECEIPT FOR INDIVIDUAL TRANSACTION PRINT */}
      {printTargetTx && (
        <div className="hidden print:block print:w-full print:max-w-none print:m-0 print:scale-[0.75] print:origin-top print:-mt-8">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 pt-8 pb-16 px-8 text-white relative overflow-hidden rounded-t-3xl" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15)_0%,transparent_60%)]"></div>
                <div className="absolute top-6 right-8 font-black italic tracking-widest text-white/80 text-sm z-20">Uni-LandFarm</div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-8 pointer-events-none opacity-100 z-0">
                  <div className="relative w-32 h-32 mt-4">
                    <Coins className="absolute bottom-4 left-4 w-20 h-20 text-white drop-shadow-2xl" strokeWidth={1.5} />
                    <Leaf className="absolute top-2 right-8 w-12 h-12 text-emerald-100 rotate-[30deg] drop-shadow-lg" strokeWidth={1.5} />
                    <Sparkles className="absolute top-8 left-0 w-8 h-8 text-white drop-shadow-md animate-pulse-slow" strokeWidth={2} />
                    <Wallet className="absolute -bottom-2 -right-2 w-16 h-16 text-orange-100 drop-shadow-2xl -rotate-12" strokeWidth={1.5} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  </div>
                </div>
                <div className="relative z-10 w-2/3 text-left">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5 border-[2px] border-white/30 backdrop-blur-sm shadow-xl">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-2 drop-shadow-md leading-tight">Detail<br/>Transaksi!</h3>
                  <p className="text-sm font-medium text-white/90 leading-snug drop-shadow-sm max-w-[200px]">Bukti pembayaran resmi Anda.</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 text-white fill-current"><path d="M0 120L1200 120 1200 0 0 120z"></path></svg>
                </div>
              </div>
              <div className="p-8 space-y-6 bg-white border border-slate-200 rounded-b-3xl" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                <div className="grid grid-cols-2 gap-4 py-4 border-y-2 border-dashed border-slate-100">
                  <div className="space-y-4">
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reference ID</p><p className="text-lg font-black text-slate-900 font-mono">#{printTargetTx.refId}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Waktu Pembayaran</p><p className="text-lg font-bold text-slate-900">{formatDate(printTargetTx.createdAt)} &bull; {formatTime(printTargetTx.createdAt)} WIB</p></div>
                  </div>
                  <div className="space-y-4 text-right">
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Metode</p><p className="text-lg font-bold text-slate-900">{printTargetTx.method}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Paket</p><p className="text-lg font-bold text-slate-900">{printTargetTx.packageName}</p></div>
                  </div>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl space-y-3 border border-slate-100">
                  <div className="flex justify-between items-center"><span className="text-base font-bold text-slate-500">Total Dibayar</span><span className="text-3xl font-black text-emerald-500">Rp {printTargetTx.amount?.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2"><div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500"><Zap className="w-3.5 h-3.5" /></div><span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Status Transaksi</span></div>
                    <span className="text-xl font-black text-emerald-600 uppercase">{printTargetTx.status}</span>
                  </div>
                </div>
              </div>
        </div>
      )}

      {/* HIDDEN RECEIPT FOR ALL TRANSACTIONS PRINT */}
      {isPrintingAll && (
        <div className="hidden print:block print:w-full print:max-w-none print:m-0 print:scale-[0.80] print:origin-top print:-mt-8">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 pt-8 pb-16 px-8 text-white relative overflow-hidden rounded-t-3xl" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15)_0%,transparent_60%)]"></div>
                <div className="absolute top-6 right-8 font-black italic tracking-widest text-white/80 text-sm z-20">Uni-LandFarm</div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-8 pointer-events-none opacity-100 z-0">
                  <div className="relative w-32 h-32 mt-4">
                    <Coins className="absolute bottom-4 left-4 w-20 h-20 text-white drop-shadow-2xl" strokeWidth={1.5} />
                    <Leaf className="absolute top-2 right-8 w-12 h-12 text-emerald-100 rotate-[30deg] drop-shadow-lg" strokeWidth={1.5} />
                    <Sparkles className="absolute top-8 left-0 w-8 h-8 text-white drop-shadow-md animate-pulse-slow" strokeWidth={2} />
                    <Wallet className="absolute -bottom-2 -right-2 w-16 h-16 text-orange-100 drop-shadow-2xl -rotate-12" strokeWidth={1.5} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                  </div>
                </div>
                <div className="relative z-10 w-2/3 text-left">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5 border-[2px] border-white/30 backdrop-blur-sm shadow-xl">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wider mb-2 drop-shadow-md leading-tight">Laporan<br/>Transaksi!</h3>
                  <p className="text-sm font-medium text-white/90 leading-snug drop-shadow-sm max-w-[200px]">Riwayat pembelian token Anda secara keseluruhan.</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 text-white fill-current"><path d="M0 120L1200 120 1200 0 0 120z"></path></svg>
                </div>
              </div>
              <div className="p-8 bg-white border border-slate-200 rounded-b-3xl" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                <table className="w-full text-left mb-6">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal</th>
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Ref ID</th>
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Paket</th>
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Metode</th>
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map(tx => (
                      <tr key={tx.id}>
                        <td className="py-4 text-sm font-bold text-slate-900">{formatDate(tx.createdAt)}</td>
                        <td className="py-4 text-sm font-mono font-medium text-slate-500">#{tx.refId}</td>
                        <td className="py-4 text-sm font-bold text-slate-900">{tx.packageName}</td>
                        <td className="py-4 text-sm font-medium text-slate-500">{tx.method}</td>
                        <td className="py-4 text-sm font-black text-emerald-600 text-right">Rp {tx.amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-slate-50 p-5 rounded-2xl space-y-3 border border-slate-100">
                  <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-500">Total Transaksi</span><span className="text-xl font-black text-slate-900">{filteredTransactions.length} Pembelian</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <span className="text-sm font-bold text-slate-500">Total Pengeluaran</span>
                    <span className="text-2xl font-black text-emerald-600">Rp {filteredTransactions.reduce((acc, curr) => acc + (curr.amount || 0), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryPage;
