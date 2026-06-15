import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Download, 
  Search, 
  Zap, 
  CreditCard 
} from 'lucide-react';

interface RepositoryPageProps {
  showNotification: (msg: string, type?: 'success' | 'info') => void;
}

const RepositoryPage = ({ showNotification }: RepositoryPageProps) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'history'>('checkout');
  const [checkoutStep, setCheckoutStep] = useState<'package' | 'payment' | 'input' | 'processing' | 'receipt'>('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('semua');

  const packages = [
    {
      id: 'pemula',
      name: 'Paket Pemula',
      price: 25000,
      tokens: 10,
      description: 'Cocok untuk mencoba fitur dasar AI.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Akses Template Dasar', 'Dukungan Komunitas'],
      popular: false
    },
    {
      id: 'pertumbuhan',
      name: 'Paket Pertumbuhan',
      price: 100000,
      tokens: 250,
      description: 'Untuk bisnis yang aktif berkembang.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Akses Semua Template', 'Dukungan Prioritas'],
      popular: true
    },
    {
      id: 'pro',
      name: 'Paket Pro',
      price: 350000,
      tokens: 1000,
      description: 'Solusi skala besar untuk agensi.',
      features: ['10 Token / Generate Web', '2 Token / Revisi AI', 'Pengaturan Domain Kustom', 'Agen AI Khusus'],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#00AED6]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#00AED6] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#00AED6]/30">gopay</div> },
    { id: 'ovo', name: 'OVO', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#4C2A86]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#4C2A86] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#4C2A86]/30">ovo</div> },
    { id: 'dana', name: 'DANA', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#108EE9]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#108EE9] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#108EE9]/30">dana</div> },
    { id: 'shopeepay', name: 'ShopeePay', group: 'DOMPET DIGITAL (E-WALLET)', color: 'bg-[#EE4D2D]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#EE4D2D] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#EE4D2D]/30">shopee</div> },
    { id: 'bca_va', name: 'BCA VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#0060AF]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#0060AF] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#0060AF]/30">bca</div> },
    { id: 'mandiri_va', name: 'Mandiri VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#FFC425]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#FFC425] rounded-xl text-[8px] font-black text-slate-900 uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#FFC425]/30">mandiri</div> },
    { id: 'bni_va', name: 'BNI VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#005E6A]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#005E6A] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#005E6A]/30">bni</div> },
    { id: 'bri_va', name: 'BRI VA', group: 'VIRTUAL ACCOUNT', color: 'bg-[#00529C]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#00529C] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#00529C]/30">bri</div> },
    { id: 'bca_mobile', name: 'BCA Mobile', group: 'MOBILE BANKING', color: 'bg-[#0060AF]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#0060AF] rounded-xl text-[8px] font-black text-white uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#0060AF]/30">m-bca</div> },
    { id: 'livin_mandiri', name: 'Livin\' by Mandiri', group: 'MOBILE BANKING', color: 'bg-[#FFC425]', icon: <div className="w-10 h-10 flex items-center justify-center bg-[#FFC425] rounded-xl text-[8px] font-black text-slate-900 uppercase group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-[#FFC425]/30">livin'</div> },
  ];

  const transactions = [
    { id: 'TX-9021', date: '01 Mei 2024', package: 'Paket Pemula', amount: 'Rp 25.000', method: 'GoPay', status: 'berhasil' },
    { id: 'TX-8945', date: '28 Apr 2024', package: 'Paket Pro', amount: 'Rp 350.000', method: 'VA BCA', status: 'gagal' },
    { id: 'TX-8832', date: '20 Apr 2024', package: 'Paket Pertumbuhan', amount: 'Rp 100.000', method: 'Dana', status: 'berhasil' },
    { id: 'TX-8711', date: '15 Apr 2024', package: 'Paket Pemula', amount: 'Rp 25.000', method: 'OVO', status: 'berhasil' },
    { id: 'TX-8654', date: '10 Apr 2024', package: 'Paket Pertumbuhan', amount: 'Rp 100.000', method: 'VA Mandiri', status: 'berhasil' },
  ];

  const filteredTransactions = transactions.filter(tx => {
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
    setTimeout(() => {
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

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* TABS SELECTOR - NEAT & ALIGNED */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-[16px] flex items-center shadow-inner border border-slate-200 dark:border-slate-800 self-start">
          <button
            onClick={() => { setActiveTab('checkout'); setCheckoutStep('package'); }}
            className={`px-6 py-2 rounded-[12px] text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'checkout' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-lg shadow-black/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Beli Token
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-[12px] text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'history' ? 'bg-white dark:bg-slate-800 text-brand-blue shadow-lg shadow-black/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Riwayat
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900/40 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center gap-3 pr-4 border-r border-slate-200 dark:border-slate-800">
            <div className="bg-brand-blue/20 p-1 rounded-md text-brand-blue text-[6px] font-black uppercase tracking-widest shadow-inner border border-brand-blue/20">
              SALDO
            </div>
            <span className="text-sm font-black dark:text-white">250 Token</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-0.5 leading-none">Status Akun</p>
            <span className="text-emerald-450 text-[9px] font-black uppercase tracking-widest leading-none">Aktif</span>
          </div>
        </div>
      </div>

      {activeTab === 'checkout' ? (
        <div className="space-y-12">
          {checkoutStep === 'package' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative bg-white dark:bg-slate-900 rounded-[24px] p-6 border-2 transition-all flex flex-col items-center text-center group ${selectedPackage?.id === pkg.id
                        ? 'border-brand-blue shadow-premium-hover'
                        : 'border-white dark:border-slate-800 shadow-premium'
                      }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 p-1">
                        <div className="bg-brand-blue text-white text-[6px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-bl-2xl rounded-tr-[20px] shadow-lg">Populer</div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase">{pkg.name}</h4>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-black text-slate-900 dark:text-white transition-colors group-hover:text-brand-blue">Rp {pkg.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[9px] font-medium text-slate-400 mt-2 h-6 uppercase tracking-wider">{pkg.description}</p>
                    </div>

                    <div className="space-y-2.5 w-full mb-8 text-left pt-4 border-t border-slate-50 dark:border-slate-800">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        nextStep();
                      }}
                      className={`w-full py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${pkg.popular
                          ? 'bg-brand-blue text-white shadow-xl shadow-brand-blue/20 hover:bg-blue-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-brand-blue hover:text-white'
                        }`}
                    >
                      Beli Token
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto bg-white dark:bg-slate-900/60 backdrop-blur-2xl rounded-[64px] border border-slate-100 dark:border-white/5 shadow-premium-hover overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={prevStep} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 hover:text-brand-blue transition-all">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Metode Pembayaran</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Pilih cara bayar yang paling nyaman</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-brand-blue uppercase mb-1">Total Bayar</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">Rp {selectedPackage?.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  {Array.from(new Set(paymentMethods.map(m => m.group))).map((group, gIdx) => (
                    <div key={gIdx} className="space-y-4">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{group}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.filter(m => m.group === group).map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.name)}
                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all group relative overflow-hidden ${selectedPayment === method.name
                                ? 'border-brand-blue bg-brand-blue/5 shadow-md'
                                : 'border-slate-100 dark:border-slate-800 hover:border-brand-blue/20'
                              }`}
                          >
                            {selectedPayment === method.name && (
                              <div className="absolute top-0 right-0 w-8 h-8 bg-brand-blue flex items-center justify-center rounded-bl-xl">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className="shrink-0">
                              {method.icon}
                            </div>
                            <span className={`text-[10px] font-black uppercase text-left leading-tight tracking-tight ${selectedPayment === method.name ? 'text-brand-blue' : 'text-slate-500'}`}>{method.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="bg-white dark:bg-slate-800/30 p-10 rounded-[48px] border-2 border-slate-50 dark:border-slate-800 shadow-inner">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Ringkasan Pesanan</h4>
                    <div className="space-y-5 mb-10">
                      <>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                          <span>Paket</span>
                          <span className="text-slate-900 dark:text-white uppercase">{selectedPackage?.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                          <span>Tokens</span>
                          <span className="text-slate-900 dark:text-white">{selectedPackage?.tokens} Tokens</span>
                        </div>
                      </>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                        <span>Metode</span>
                        <span className="text-slate-900 dark:text-white">{selectedPayment || '-'}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Total Netto</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">Rp {selectedPackage?.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {activeTab === 'checkout' && (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="KODE PROMO"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-5 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand-blue/20"
                        />
                        <button className="w-full py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue transition-all">Gunakan Promo</button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedPayment}
                    className={`w-full py-5 rounded-[24px] text-[12px] font-black uppercase tracking-widest transition-all shadow-xl ${selectedPayment
                        ? 'bg-brand-blue text-white shadow-brand-blue/20 transform hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    Bayar Sekarang
                  </button>

                  <p className="text-center text-[9px] font-bold text-slate-400 leading-relaxed tracking-widest">
                    Amankan transaksi Anda dengan enkripsi SSL 256-bit.<br />Layanan oleh Uni-LandFarm Finance.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {checkoutStep === 'input' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl"
            >
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase text-center">Konfirmasi {selectedPayment}</h3>
              <p className="text-xs text-slate-500 mb-8 font-medium text-center leading-relaxed">
                Masukkan nomor akun untuk verifikasi pembayaran Anda.
              </p>

              <div className="space-y-5 mb-8 text-left">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Akun / E-Wallet / VA</label>
                  <input
                    type="text"
                    placeholder={selectedPayment?.includes('VA') ? '8806 0812 XXXX' : '0812-3456-XXXX'}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 shadow-inner"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setCheckoutStep('payment')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Batal</button>
                <button id="process-payment-btn" onClick={processPayment} className="flex-1 py-4 bg-brand-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Konfirmasi Bayar</button>
              </div>
            </motion.div>
          )}

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
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Memproses Transaksi...</h3>
              <p className="text-sm text-slate-500 font-medium">Jangan tutup halaman ini, sistem kami sedang memverifikasi pembayaran Anda.</p>
            </div>
          )}

          {checkoutStep === 'receipt' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-[48px] overflow-hidden shadow-premium-hover border-4 border-slate-50 dark:border-slate-800"
            >
              {/* RECEIPT HEADER - DOCUMENT STYLE */}
              <div className={`${(activeTab as string) === 'history' ? 'bg-brand-blue' : 'bg-emerald-500'} p-10 text-center text-white relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-20"></div>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/40 shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-widest mb-1">Transaksi Sukses</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Pembayaran Berhasil Dikonfirmasi</p>
              </div>

              {/* RECEIPT BODY */}
              <div className="p-12 space-y-10">
                <div className="grid grid-cols-2 gap-8 py-8 border-y-2 border-dashed border-slate-100 dark:border-slate-800 relative">
                  <div className="absolute -top-4 -left-14 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full"></div>
                  <div className="absolute -top-4 -right-14 w-8 h-8 bg-slate-50 dark:bg-slate-950 rounded-full"></div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Reference ID</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white font-mono uppercase">#{Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Tanggal</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="space-y-6 text-right">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Metode</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{selectedPayment}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Item</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{selectedPackage?.name} Tokens</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[32px] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Dibayar</span>
                    <span className="text-3xl font-black text-emerald-500 tracking-tighter">Rp {selectedPackage?.price.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Token Ditambahkan</span>
                    </div>
                    <span className="text-lg font-black text-emerald-600">+{selectedPackage?.tokens}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => { setCheckoutStep('package'); setActiveTab('history'); }}
                    className="flex-1 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl"
                  >
                    Selesai & Ke Dashboard
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-8 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* HISTORY TAB - SEPARATE PAGE FEEL */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
            <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Semua Transaksi</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Menampilkan riwayat pengisian token Anda</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {/* Search removed */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-brand-blue/20"
                >
                  <option value="semua">Semua Status</option>
                  <option value="berhasil">Berhasil</option>
                  <option value="gagal">Gagal</option>
                </select>
                <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  {['Tanggal', 'Ref', 'Paket', 'Nominal', 'Metode', 'Status'].map((h) => (
                    <th key={h} className="px-6 py-4 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filteredTransactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all group">
                    <td className="px-6 py-4">
                      <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">{tx.date}</p>
                      <p className="text-[8px] font-bold text-slate-300">14:20 WIB</p>
                    </td>
                    <td className="px-6 py-4 text-[9px] font-black text-slate-300 group-hover:text-brand-blue transition-colors">#{tx.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600">
                          <Layers className="w-3 h-3" />
                        </div>
                        <p className="text-[11px] font-black text-slate-900 dark:text-white">{tx.package}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-black text-slate-900 dark:text-white">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">{tx.method}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm ${tx.status === 'berhasil' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' :
                          tx.status === 'gagal' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-amber-50 text-amber-500 border border-amber-100'
                        }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-10 py-20 text-center">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-6 h-6 text-slate-200 shadow-inner" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Transaksi tidak ditemukan</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="p-8 border-t border-slate-50 dark:border-slate-800 text-center">
              <button className="text-[10px] font-black text-slate-400 hover:text-brand-blue uppercase tracking-widest transition-colors">Tampilkan Lebih Banyak</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RepositoryPage;
