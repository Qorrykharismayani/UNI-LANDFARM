import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  User,
  Layers,
  Layout,
  Database,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Search,
  Globe,
  Plus,
  Trash2,
  X,
  LogOut,
  Lock,
  Smartphone,
  Wallet,
  BarChart3
} from 'lucide-react';

interface AdminPanelPageProps {
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  onLogout?: () => void;
  onSwitchToUserView?: () => void;
  onSettingsUpdate?: (s: any) => void;
}

const AdminPanelPage = ({ 
  showNotification, 
  onLogout,
  onSwitchToUserView,
  onSettingsUpdate
}: AdminPanelPageProps) => {
  const [adminView, setAdminView] = useState<'dashboard' | 'users' | 'landing_pages' | 'templates' | 'content' | 'analytics' | 'profile'>('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [templatesList, setTemplatesList] = useState<any[]>([]);
  const [systemSettings, setSystemSettings] = useState<any>({
    platformName: '',
    logo: '',
    heroTitle: '',
    heroDescription: '',
    contactEmail: '',
    whatsapp: '',
    footerText: '',
    featuresJson: [],
    testimonialsJson: [],
    faqsJson: [],
    userPageJson: { welcomeTitle: '', welcomeSubtitle: '' }
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>('ALL');
  
  // Change password states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  const handleAdminChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      showNotification('Semua field password wajib diisi.', 'info');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification('Konfirmasi password baru tidak cocok.', 'info');
      return;
    }
    if (newPassword.length < 6) {
      showNotification('Password baru minimal harus 6 karakter.', 'info');
      return;
    }
    setChangePasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message || 'Password berhasil diperbarui!', 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showNotification(data.message || 'Gagal memperbarui password.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  // Add user form state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'USER'
  });

  // Add template form state
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [newTemplateData, setNewTemplateData] = useState({
    name: '',
    category: 'Makanan & Retail',
    description: '',
    thumbnail: '',
    status: 'Aktif'
  });

  // Rejection state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  // CMS Tab state
  const [cmsSettingsTab, setCmsSettingsTab] = useState<'basic' | 'support' | 'seo' | 'features' | 'testimonials' | 'faqs' | 'user_dashboard'>('basic');
  const [savingSettings, setSavingSettings] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resUsers, resPages, resRequests, resTemplates, resSettings] = await Promise.all([
        fetch('/api/admin/users').then(r => r.json()),
        fetch('/api/landing-pages').then(r => r.json()),
        fetch('/api/admin/publication-requests').then(r => r.json()),
        fetch('/api/templates').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
      ]);

      if (resUsers.success) setUsers(resUsers.data);
      if (resPages.success) setLandingPages(resPages.data);
      if (resRequests.success) setRequests(resRequests.data);
      if (resTemplates.success) setTemplatesList(resTemplates.data);
      if (resSettings.success) {
        const fetched = resSettings.data || {};
        setSystemSettings({
          ...fetched,
          featuresJson: fetched.featuresJson || [
            { title: "Pembuatan Instan", desc: "Buat landing page profesional hanya dalam hitungan menit dengan sistem otomatis berbasis AI.", icon: "Zap", num: "01" },
            { title: "Pustaka Template", desc: "Tersedia berbagai template modern dan premium yang siap digunakan untuk semua kebutuhan bisnis.", icon: "Folder", num: "02" },
            { title: "Responsif Seluler", desc: "Tampilan website otomatis menyesuaikan semua perangkat mulai dari mobile hingga desktop.", icon: "Smartphone", num: "03" },
            { title: "Pembayaran Mudah", desc: "Sistem pembayaran digital yang praktis, cepat, dan aman untuk berbagai kebutuhan transaksi online.", icon: "Wallet", num: "04" },
            { title: "Analitik", desc: "Pantau performa website dan aktivitas pengunjung melalui dashboard analitik real-time.", icon: "BarChart3", num: "05" }
          ],
          testimonialsJson: fetched.testimonialsJson || [
            { name: "Budi Santoso", role: "CEO of TechFlow", content: "Uni-LandFarm benar-benar mengubah cara kami mengelola kehadiran digital. AI-nya sangat intuitif dan membantu kami menghemat waktu hingga 70%.", avatar: "https://picsum.photos/seed/budi/100/100" },
            { name: "Sari Wijaya", role: "Founder of CreativeHub", content: "Landing page yang dihasilkan AI sangat profesional. Saya tidak menyangka bisa membangun situs sekelas agensi dalam hitungan menit.", avatar: "https://picsum.photos/seed/sari/100/100" },
            { name: "Andi Pratama", role: "Marketing Director", content: "Fitur Agentic AI CMS adalah game changer. Konten kami sekarang teroptimasi secara otomatis untuk SEO dan audiens kami.", avatar: "https://picsum.photos/seed/andi/100/100" }
          ],
          faqsJson: fetched.faqsJson || [
            { q: "Apakah saya perlu keahlian coding?", a: "Tidak sama sekali. Uni-LandFarm dirancang untuk pebisnis tanpa latar belakang teknis. AI kami menangani semua aspek teknis.", color: "bg-blue-500" },
            { q: "Berapa lama waktu yang dibutuhkan untuk membuat situs?", a: "Hanya butuh sekitar 30-60 detik untuk menghasilkan draf pertama yang profesional.", color: "bg-purple-500" },
            { q: "Apakah situs saya akan SEO-friendly?", a: "Ya, AI kami secara otomatis mengoptimalkan struktur, meta tag, dan konten untuk mesin pencari.", color: "bg-indigo-500" },
            { q: "Bisakah saya menggunakan domain sendiri?", a: "Tentu. Anda dapat menghubungkan domain kustom Anda dengan mudah di dashboard.", color: "bg-violet-500" }
          ],
          userPageJson: fetched.userPageJson || {
            welcomeTitle: "Halo, Pebisnis Modern!",
            welcomeSubtitle: "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?"
          }
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data admin:", err);
      showNotification("Gagal menyelaraskan data.", "info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Aktif' ? 'Nonaktif' : 'Aktif';
    setActionLoading(`user-${userId}`);
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Status pengguna berhasil diubah menjadi ${newStatus}!`, 'success');
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      } else {
        showNotification(data.message || 'Gagal mengubah status.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Gagal menghubungi server.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (requestId: string) => {
    setActionLoading(`approve-${requestId}`);
    try {
      const res = await fetch(`/api/admin/publication-requests/${requestId}/approve`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Permintaan publikasi disetujui!', 'success');
        setRequests(requests.filter(r => r.id !== requestId));
        // Refresh landing pages
        const resPages = await fetch('/api/landing-pages').then(r => r.json());
        if (resPages.success) setLandingPages(resPages.data);
      } else {
        showNotification(data.message || 'Gagal menyetujui.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      showNotification('Harap isi alasan penolakan.', 'info');
      return;
    }
    setActionLoading(`reject-${rejectingId}`);
    try {
      const res = await fetch(`/api/admin/publication-requests/${rejectingId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: reason })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Pengajuan berhasil ditolak.', 'success');
        setRequests(requests.filter(r => r.id !== rejectingId));
        setRejectingId(null);
        setReason('');
        // Refresh landing pages
        const resPages = await fetch('/api/landing-pages').then(r => r.json());
        if (resPages.success) setLandingPages(resPages.data);
      } else {
        showNotification(data.message || 'Gagal menolak.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const updateFeature = (index: number, field: string, value: any) => {
    const list = [...(systemSettings.featuresJson || [])];
    list[index] = { ...list[index], [field]: value };
    setSystemSettings({ ...systemSettings, featuresJson: list });
  };

  const addFeature = () => {
    const list = [...(systemSettings.featuresJson || [])];
    const nextNum = String(list.length + 1).padStart(2, '0');
    list.push({ title: '', desc: '', icon: 'Zap', num: nextNum });
    setSystemSettings({ ...systemSettings, featuresJson: list });
  };

  const removeFeature = (index: number) => {
    const list = (systemSettings.featuresJson || []).filter((_: any, i: number) => i !== index);
    const updated = list.map((item: any, i: number) => ({
      ...item,
      num: String(i + 1).padStart(2, '0')
    }));
    setSystemSettings({ ...systemSettings, featuresJson: updated });
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const list = [...(systemSettings.testimonialsJson || [])];
    list[index] = { ...list[index], [field]: value };
    setSystemSettings({ ...systemSettings, testimonialsJson: list });
  };

  const addTestimonial = () => {
    const list = [...(systemSettings.testimonialsJson || [])];
    list.push({ name: '', role: '', content: '', avatar: 'https://picsum.photos/seed/' + Math.floor(Math.random() * 1000) + '/100/100' });
    setSystemSettings({ ...systemSettings, testimonialsJson: list });
  };

  const removeTestimonial = (index: number) => {
    const list = (systemSettings.testimonialsJson || []).filter((_: any, i: number) => i !== index);
    setSystemSettings({ ...systemSettings, testimonialsJson: list });
  };

  const updateFaq = (index: number, field: string, value: any) => {
    const list = [...(systemSettings.faqsJson || [])];
    list[index] = { ...list[index], [field]: value };
    setSystemSettings({ ...systemSettings, faqsJson: list });
  };

  const addFaq = () => {
    const list = [...(systemSettings.faqsJson || [])];
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-indigo-500', 'bg-violet-500', 'bg-pink-500', 'bg-emerald-500'];
    const randomColor = colors[list.length % colors.length];
    list.push({ q: '', a: '', color: randomColor });
    setSystemSettings({ ...systemSettings, faqsJson: list });
  };

  const removeFaq = (index: number) => {
    const list = (systemSettings.faqsJson || []).filter((_: any, i: number) => i !== index);
    setSystemSettings({ ...systemSettings, faqsJson: list });
  };

  const updateUserPage = (field: string, value: any) => {
    const obj = { ...(systemSettings.userPageJson || { welcomeTitle: '', welcomeSubtitle: '' }), [field]: value };
    setSystemSettings({ ...systemSettings, userPageJson: obj });
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(systemSettings)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Pengaturan global CMS berhasil disimpan!', 'success');
        if (onSettingsUpdate) {
          onSettingsUpdate(data.data);
        }
      } else {
        showNotification(data.message || 'Gagal menyimpan pengaturan.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Koneksi gagal.', 'info');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAddUserMock = (e: React.FormEvent) => {
    e.preventDefault();
    const mockNewUser = {
      id: `MOCK-U-${Date.now()}`,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      landingPageCount: 0,
      status: 'Aktif'
    };
    setUsers([mockNewUser, ...users]);
    setShowAddUserModal(false);
    setNewUserData({ name: '', email: '', role: 'USER' });
    showNotification('User baru berhasil ditambahkan (simulasi)!', 'success');
  };

  const handleAddTemplateMock = (e: React.FormEvent) => {
    e.preventDefault();
    const mockNewTpl = {
      id: `MOCK-T-${Date.now()}`,
      name: newTemplateData.name,
      category: newTemplateData.category,
      description: newTemplateData.description,
      thumbnail: newTemplateData.thumbnail || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
      status: newTemplateData.status
    };
    setTemplatesList([mockNewTpl, ...templatesList]);
    setShowAddTemplateModal(false);
    setNewTemplateData({
      name: '',
      category: 'Makanan & Retail',
      description: '',
      thumbnail: '',
      status: 'Aktif'
    });
    showNotification('Template baru berhasil ditambahkan (simulasi)!', 'success');
  };

  const publishedPagesCount = landingPages.filter(p => p.status === 'Published').length;
  const pendingPagesCount = requests.length;

  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { id: 'users', label: 'User Management', icon: <User className="w-4.5 h-4.5" /> },
    { id: 'landing_pages', label: 'Landing Page Management', icon: <Layers className="w-4.5 h-4.5" /> },
    { id: 'templates', label: 'Template Management', icon: <Layout className="w-4.5 h-4.5" /> },
    { id: 'content', label: 'Content Management (CMS)', icon: <Database className="w-4.5 h-4.5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4.5 h-4.5" /> },
    { id: 'profile', label: 'Profile', icon: <ShieldCheck className="w-4.5 h-4.5" /> },
  ];

  return (
    <div className="bg-[#070b19] text-slate-100 min-h-screen flex flex-col md:flex-row font-sans">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-[250px] bg-[#0b1226] border-r border-slate-800/60 p-6 flex flex-col gap-6 shrink-0 z-10">
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarMenu.map(menu => (
            <button
              key={menu.id}
              onClick={() => setAdminView(menu.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider transition-all text-left cursor-pointer ${
                adminView === menu.id
                  ? 'bg-brand-blue/10 text-brand-blue border-l-4 border-brand-blue shadow-[0_0_20px_rgba(255,176,0,0.1)]'
                  : 'text-slate-400 hover:text-brand-blue hover:bg-slate-800/30'
              }`}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="pt-4 border-t border-slate-800/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={fetchAllData}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sync
            </button>
            <span className="text-[8px] font-bold text-slate-500 uppercase">v1.2.0</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT WINDOW */}
      <main className="flex-1 p-8 bg-[#070b19] overflow-y-auto custom-scrollbar relative min-h-[500px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070b19]/80 backdrop-blur-sm z-30">
            <div className="w-10 h-10 border-4 border-slate-800 border-t-brand-blue rounded-full animate-spin"></div>
            <p className="text-[9.5px] font-black text-slate-500 uppercase tracking-widest mt-4">Menyelaraskan data...</p>
          </div>
        ) : null}

        {/* VIEW: DASHBOARD (HOME) */}
        {adminView === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Welcome Card Banner */}
            <div className="bg-gradient-to-r from-blue-700/80 to-indigo-950/80 p-8 rounded-[24px] text-white shadow-md relative overflow-hidden border border-blue-500/20">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 max-w-xl space-y-2.5">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[8.5px] font-black uppercase tracking-widest">Selamat Datang</span>
                <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none uppercase">Selamat Datang, Admin Uni-LandFarm</h1>
                <p className="text-white/80 text-[11px] leading-relaxed font-medium">
                  Kelola sistem AI CMS, tinjau permintaan publikasi draf landing page, pantau data template, serta monitor aktivitas pengguna dari panel kendali terpusat.
                </p>
              </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Users", val: users.length, icon: <User className="w-5 h-5" />, bg: "bg-blue-500/10", border: "border-slate-800/80", text: "text-brand-blue" },
                { title: "Total Landing Pages", val: landingPages.length, icon: <Layers className="w-5 h-5" />, bg: "bg-indigo-500/10", border: "border-slate-800/80", text: "text-indigo-400" },
                { title: "Published Landing Pages", val: publishedPagesCount, icon: <Globe className="w-5 h-5" />, bg: "bg-emerald-500/10", border: "border-slate-800/80", text: "text-emerald-400" },
                { title: "Total Templates", val: templatesList.length || 5, icon: <Layout className="w-5 h-5" />, bg: "bg-purple-500/10", border: "border-slate-800/80", text: "text-purple-400" }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <h2 className="text-2xl font-black text-white leading-none">{stat.val}</h2>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.text} flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Section: Performance & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Performance Overview (lg:span-7) */}
              <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/80 p-6 rounded-[24px] shadow-sm space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">Landing Page Performance Overview</h3>
                  <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Metrik performa pengunjung dan rasio status penerbitan</p>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-880/50">
                  <div className="text-center py-2">
                    <span className="text-[7.5px] font-black text-slate-400 uppercase block mb-1">Total Visitors</span>
                    <span className="text-lg font-black text-slate-200">{landingPages.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()}</span>
                  </div>
                  <div className="text-center py-2 border-x border-slate-800/60">
                    <span className="text-[7.5px] font-black text-slate-400 uppercase block mb-1">Published Pages</span>
                    <span className="text-lg font-black text-emerald-400">{publishedPagesCount}</span>
                  </div>
                  <div className="text-center py-2">
                    <span className="text-[7.5px] font-black text-slate-400 uppercase block mb-1">Active Pages</span>
                    <span className="text-lg font-black text-brand-blue">{landingPages.filter(p => p.status !== 'Draft').length}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity (lg:span-5) */}
              <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800/80 p-6 rounded-[24px] shadow-sm space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">Recent Activity Section</h3>
                  <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Catatan log aktivitas administratif sistem</p>
                </div>

                <div className="flow-root">
                  <ul className="-mb-8">
                    {[
                      { text: "User registration: Sarah Anderson mendaftar akun baru", time: "Baru saja", color: "bg-brand-blue" },
                      { text: "Landing page publication: Toko Kopi Merdeka live di internet", time: "1 jam lalu", color: "bg-indigo-500" },
                      { text: "Content updates: Jasa Bersih Merdeka memperbarui detail kontak", time: "3 jam lalu", color: "bg-amber-500" },
                      { text: "Template updates: Template Makanan & Retail dimodifikasi", time: "1 hari lalu", color: "bg-purple-500" }
                    ].map((act, i) => (
                      <li key={i}>
                        <div className="relative pb-8">
                          {i !== 3 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-850" aria-hidden="true" />}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-slate-900 ${act.color} text-white`}>
                                <Sparkles className="w-3.5 h-3.5" />
                              </span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wide leading-relaxed">{act.text}</p>
                              </div>
                              <div className="text-right text-[8px] font-black uppercase whitespace-nowrap text-slate-550">
                                <span>{act.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW: USER MANAGEMENT */}
        {adminView === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-805 pb-5">
              <div>
                <h2 className="text-md font-black uppercase tracking-widest text-white">User Management Panel</h2>
                <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Kelola hak akses pengguna, status akun, dan memblokir sementara</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-550" />
                  <input
                    type="text"
                    placeholder="Cari pengguna..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-4 py-2 text-xs font-bold text-white outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue w-48 md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-[24px] shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/40 border-b border-slate-800/60">
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{usr.name}</td>
                      <td className="px-6 py-4 text-slate-400 font-medium">{usr.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded ${usr.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                          {usr.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleUserStatus(usr.id, usr.status)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[9px] font-black text-slate-200 uppercase tracking-widest transition-all"
                        >
                          Ubah Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: LANDING PAGE MANAGEMENT */}
        {adminView === 'landing_pages' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* PENDING PUBLICATION REQUESTS */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Permintaan Publikasi Pending ({requests.length})</h3>
              {requests.length === 0 ? (
                <div className="p-6 bg-slate-900/30 border border-slate-800/60 rounded-2xl text-center text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Tidak ada permintaan publikasi yang tertunda.
                </div>
              ) : (
                <div className="bg-slate-900/50 border border-slate-800/80 rounded-[24px] shadow-sm overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950/40 border-b border-slate-800/60">
                        <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Situs</th>
                        <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                        <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Subdomain</th>
                        <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/20 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-white uppercase">{req.landingPage?.businessName || req.landingPage?.title || 'Tanpa Nama'}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-medium uppercase text-[10px]">{req.landingPage?.category || '-'}</td>
                          <td className="px-6 py-4 text-brand-blue font-bold text-[11px]">{req.landingPage?.subdomain || '-'}.unilanfarm.com</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => handleApprove(req.id)}
                              disabled={actionLoading === `approve-${req.id}`}
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              {actionLoading === `approve-${req.id}` ? '...' : 'Setujui'}
                            </button>
                            <button
                              onClick={() => setRejectingId(req.id)}
                              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Tolak
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ALL LANDING PAGES LIST */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Semua Landing Page ({landingPages.length})</h3>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-[24px] shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950/40 border-b border-slate-800/60">
                      <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Situs</th>
                      <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-3.5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {landingPages.map((lp) => (
                      <tr key={lp.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-white uppercase">{lp.name || lp.businessName || lp.title || 'Tanpa Nama'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                            lp.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/65 text-slate-400 border-slate-700'
                          }`}>
                            {lp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => window.open(`/site/${lp.slug}`, '_blank')}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                          >
                            Tinjau
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: TEMPLATE MANAGEMENT */}
        {adminView === 'templates' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-md font-black uppercase tracking-widest text-white">Template Management Panel</h2>
                <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Kelola pustaka template situs, ubah status, dan tambahkan desain baru</p>
              </div>
              <button
                onClick={() => setShowAddTemplateModal(true)}
                className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9.5px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_4px_15px_rgba(255,176,0,0.2)] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Template
              </button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templatesList.length === 0 ? (
                // Mockup fallbacks if empty
                [
                  { id: 't1', name: 'AgriCorp Landing Page', category: 'Pertanian & Agribisnis', thumbnail: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500&q=80', status: 'Aktif', description: 'Desain profesional untuk agribisnis modern.' },
                  { id: 't2', name: 'FreshMarket Store', category: 'E-Commerce / Retail', thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80', status: 'Aktif', description: 'Template e-commerce sayur, buah, dan pangan segar.' },
                  { id: 't3', name: 'SmartFarm Tech', category: 'Teknologi & IoT', thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80', status: 'Aktif', description: 'Tampilan futuristik untuk teknologi IoT pertanian.' }
                ].map((tpl) => (
                  <div key={tpl.id} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700/80 transition-all flex flex-col group">
                    <div className="h-40 bg-slate-950 relative overflow-hidden shrink-0 border-b border-slate-800/55">
                      <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{tpl.status}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-black text-brand-blue uppercase tracking-widest">{tpl.category}</span>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{tpl.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2">{tpl.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                templatesList.map((tpl) => (
                  <div key={tpl.id} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700/80 transition-all flex flex-col group">
                    <div className="h-40 bg-slate-950 relative overflow-hidden shrink-0 border-b border-slate-800/55">
                      <img src={tpl.thumbnail || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-black uppercase border ${tpl.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/80 text-slate-400 border-slate-700'}`}>{tpl.status}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-black text-brand-blue uppercase tracking-widest">{tpl.category}</span>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{tpl.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2">{tpl.description}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-850 flex gap-2">
                        <button
                          onClick={() => {
                            const nextStatus = tpl.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
                            setTemplatesList(templatesList.map(t => t.id === tpl.id ? { ...t, status: nextStatus } : t));
                            showNotification(`Template ${tpl.name} diubah menjadi ${nextStatus}`, 'success');
                          }}
                          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer text-center"
                        >
                          Ubah Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW: CONTENT MANAGEMENT (CMS) */}
        {adminView === 'content' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-5">
              <h2 className="text-md font-black uppercase tracking-widest text-white">Global CMS Content Management</h2>
              <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Kelola informasi publik, teks promosi, dan kontak yang dipublikasikan sistem</p>
            </div>

            {/* Tabs for sections */}
            <div className="flex gap-2 border-b border-slate-800 pb-px overflow-x-auto scrollbar-none">
              {['basic', 'features', 'testimonials', 'faqs', 'user_dashboard', 'seo', 'support'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCmsSettingsTab(tab as any)}
                  className={`px-4 py-2.5 text-[9.5px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                    cmsSettingsTab === tab
                      ? 'border-b-2 border-brand-blue text-brand-blue'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'basic' ? 'Informasi Dasar' :
                   tab === 'features' ? 'Komponen Fitur' :
                   tab === 'testimonials' ? 'Testimoni' :
                   tab === 'faqs' ? 'Daftar FAQ' :
                   tab === 'user_dashboard' ? 'Welcome Dashboard' :
                   tab === 'seo' ? 'Pengaturan SEO' : 'Kontak'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 bg-slate-900/40 p-8 rounded-[24px] border border-slate-800/80">
              {cmsSettingsTab === 'basic' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
                    <input
                      type="text"
                      value={systemSettings.platformName}
                      onChange={(e) => setSystemSettings({ ...systemSettings, platformName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Logo (URL)</label>
                    <input
                      type="text"
                      value={systemSettings.logo}
                      onChange={(e) => setSystemSettings({ ...systemSettings, logo: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Utama Hero (Landing Page)</label>
                    <input
                      type="text"
                      value={systemSettings.heroTitle}
                      onChange={(e) => setSystemSettings({ ...systemSettings, heroTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Hero</label>
                    <textarea
                      value={systemSettings.heroDescription}
                      onChange={(e) => setSystemSettings({ ...systemSettings, heroDescription: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              )}

              {cmsSettingsTab === 'seo' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Deskripsi Default</label>
                    <textarea
                      value={systemSettings.heroDescription || ''}
                      onChange={(e) => setSystemSettings({ ...systemSettings, heroDescription: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none min-h-[100px] resize-none"
                      placeholder="Deskripsi SEO yang digunakan sistem"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Footer Text</label>
                    <input
                      type="text"
                      value={systemSettings.footerText}
                      onChange={(e) => setSystemSettings({ ...systemSettings, footerText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {cmsSettingsTab === 'support' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Kontak Utama</label>
                    <input
                      type="email"
                      value={systemSettings.contactEmail}
                      onChange={(e) => setSystemSettings({ ...systemSettings, contactEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp Operasional</label>
                    <input
                      type="text"
                      value={systemSettings.whatsapp}
                      onChange={(e) => setSystemSettings({ ...systemSettings, whatsapp: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      placeholder="628123456..."
                    />
                  </div>
                </div>
              )}

              {cmsSettingsTab === 'features' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Daftar Fitur Platform</h3>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah Fitur
                    </button>
                  </div>

                  {(systemSettings.featuresJson || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500 font-bold uppercase tracking-wider bg-slate-950/40 border border-dashed border-slate-800/80 rounded-xl">
                      Belum ada fitur. Klik "Tambah Fitur" untuk memulai.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.featuresJson || []).map((feature: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 font-black italic">#{feature.num || String(idx + 1).padStart(2, '0')}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(idx)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Hapus Fitur"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pr-12">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Judul Fitur</label>
                              <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                                placeholder="Nama Fitur"
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Ikon (Lucide)</label>
                              <select
                                value={feature.icon || 'Zap'}
                                onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                              >
                                {['Zap', 'Folder', 'Smartphone', 'Wallet', 'BarChart3', 'Cpu', 'Globe', 'Database', 'Shield', 'Coffee', 'Leaf', 'Tractor'].map((ico) => (
                                  <option key={ico} value={ico}>{ico}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Fitur</label>
                            <textarea
                              value={feature.desc || ''}
                              onChange={(e) => updateFeature(idx, 'desc', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none min-h-[60px] resize-none"
                              placeholder="Deskripsi lengkap kegunaan fitur ini..."
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {cmsSettingsTab === 'testimonials' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Daftar Testimoni Klien</h3>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah Testimoni
                    </button>
                  </div>

                  {(systemSettings.testimonialsJson || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500 font-bold uppercase tracking-wider bg-slate-950/40 border border-dashed border-slate-800/80 rounded-xl">
                      Belum ada testimoni. Klik "Tambah Testimoni" untuk memulai.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.testimonialsJson || []).map((testi: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                          <div className="absolute top-4 right-4">
                            <button
                              type="button"
                              onClick={() => removeTestimonial(idx)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Hapus Testimoni"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pr-12">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nama Klien</label>
                              <input
                                type="text"
                                value={testi.name || ''}
                                onChange={(e) => updateTestimonial(idx, 'name', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                                placeholder="Nama Lengkap"
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Jabatan / Perusahaan</label>
                              <input
                                type="text"
                                value={testi.role || ''}
                                onChange={(e) => updateTestimonial(idx, 'role', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                                placeholder="Contoh: CEO of TokoKopi"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Avatar URL</label>
                              <input
                                type="text"
                                value={testi.avatar || ''}
                                onChange={(e) => updateTestimonial(idx, 'avatar', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                                placeholder="https://picsum.photos/seed/..."
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Isi Testimoni</label>
                            <textarea
                              value={testi.content || ''}
                              onChange={(e) => updateTestimonial(idx, 'content', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none min-h-[60px] resize-none"
                              placeholder="Ulasan positif klien..."
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {cmsSettingsTab === 'faqs' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Daftar Pertanyaan Umum (FAQ)</h3>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah FAQ
                    </button>
                  </div>

                  {(systemSettings.faqsJson || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500 font-bold uppercase tracking-wider bg-slate-950/40 border border-dashed border-slate-800/80 rounded-xl">
                      Belum ada FAQ. Klik "Tambah FAQ" untuk memulai.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.faqsJson || []).map((faq: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full ${faq.color || 'bg-blue-500'} opacity-75`} title="Warna Aksen" />
                            <button
                              type="button"
                              onClick={() => removeFaq(idx)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Hapus FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pr-16">
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pertanyaan</label>
                              <input
                                type="text"
                                value={faq.q || ''}
                                onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                                placeholder="Contoh: Apakah bisa custom domain?"
                                required
                              />
                            </div>
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Aksen Warna (Tailwind)</label>
                              <select
                                value={faq.color || 'bg-blue-500'}
                                onChange={(e) => updateFaq(idx, 'color', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                              >
                                <option value="bg-blue-500">Blue (Biru)</option>
                                <option value="bg-purple-500">Purple (Ungu)</option>
                                <option value="bg-indigo-500">Indigo</option>
                                <option value="bg-violet-500">Violet</option>
                                <option value="bg-pink-500">Pink</option>
                                <option value="bg-emerald-500">Emerald (Hijau)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Jawaban</label>
                            <textarea
                              value={faq.a || ''}
                              onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-white outline-none min-h-[60px] resize-none"
                              placeholder="Tulis jawaban lengkap di sini..."
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {cmsSettingsTab === 'user_dashboard' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800/50 pb-3 mb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Header Welcome Dashboard Pengguna</h3>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Selamat Datang (Welcome Title)</label>
                    <input
                      type="text"
                      value={systemSettings.userPageJson?.welcomeTitle || ''}
                      onChange={(e) => updateUserPage('welcomeTitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      placeholder="Halo, Pebisnis Modern!"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-judul Selamat Datang (Welcome Subtitle)</label>
                    <textarea
                      value={systemSettings.userPageJson?.welcomeSubtitle || ''}
                      onChange={(e) => updateUserPage('welcomeSubtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none min-h-[80px] resize-none"
                      placeholder="Siap untuk mengotomatisasi ekosistem digital Anda hari ini?"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={savingSettings}
                className="w-full py-3.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9.5px] font-black uppercase tracking-widest transition-all shadow-md shadow-brand-blue/20 cursor-pointer animate-in duration-200"
              >
                {savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan'}
              </button>
            </form>
          </div>
        )}

        {/* VIEW: ANALYTICS */}
        {adminView === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-5">
              <h2 className="text-md font-black uppercase tracking-widest text-white">System Growth & Analytics</h2>
              <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">Pantau grafik pertumbuhan pengunjung, pembuatan halaman, dan keaktifan sistem</p>
            </div>

            {/* Analytics Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Puncak Kunjungan Harian", value: "3.482 HITS", trend: "+12.4% dari kemarin" },
                { label: "Rasio Konversi SEO", value: "94.2% SCORE", trend: "Sangat Optimal" },
                { label: "Halaman Baru Bulan Ini", value: "+38 SITUS", trend: "Target bulanan tercapai 110%" }
              ].map((an, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl shadow-sm space-y-1">
                  <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block">{an.label}</span>
                  <h3 className="text-xl font-black text-white leading-none">{an.value}</h3>
                  <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider block pt-2">{an.trend}</span>
                </div>
              ))}
            </div>

            {/* Graphic Chart representation using SVG */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SVG Area Chart: Tren Pengunjung */}
              <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-[24px] space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">Grafik Kunjungan 7 Hari Terakhir</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total tayangan halaman unik dari semua situs user</p>
                </div>
                <div className="h-64 flex items-center justify-center bg-slate-950/40 rounded-2xl p-4 border border-slate-850">
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="0" y1="190" x2="500" y2="190" stroke="#1e293b" strokeWidth="1.5" />

                    {/* Area Fill */}
                    <path
                      d="M 0 190 L 0 150 L 80 130 L 160 160 L 240 100 L 320 80 L 400 110 L 500 40 L 500 190 Z"
                      fill="url(#gradBlue)"
                      opacity="0.15"
                    />

                    {/* Line Path */}
                    <path
                      d="M 0 150 L 80 130 L 160 160 L 240 100 L 320 80 L 400 110 L 500 40"
                      fill="none"
                      stroke="#3a86ff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Points / Dots */}
                    {[
                      { x: 0, y: 150 },
                      { x: 80, y: 130 },
                      { x: 160, y: 160 },
                      { x: 240, y: 100 },
                      { x: 320, y: 80 },
                      { x: 400, y: 110 },
                      { x: 500, y: 40 }
                    ].map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="5.5"
                        fill="#3a86ff"
                        stroke="#070b19"
                        strokeWidth="2.5"
                      />
                    ))}

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3a86ff" />
                        <stop offset="100%" stopColor="#3a86ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">
                  <span>Senin</span>
                  <span>Selasa</span>
                  <span>Rabu</span>
                  <span>Kamis</span>
                  <span>Jumat</span>
                  <span>Sabtu</span>
                  <span>Minggu</span>
                </div>
              </div>

              {/* SVG Bar Chart: Distribusi Kategori */}
              <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-[24px] space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">Distribusi Kategori Situs</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Persentase landing page terbit berdasarkan model bisnis</p>
                </div>
                <div className="h-64 flex flex-col justify-around bg-slate-950/40 rounded-2xl p-6 border border-slate-850">
                  {[
                    { name: "Pertanian & Pangan", count: 45, width: "85%", color: "bg-emerald-500" },
                    { name: "Makanan & Retail", count: 28, width: "60%", color: "bg-brand-blue" },
                    { name: "Jasa Profesional", count: 15, width: "38%", color: "bg-purple-500" },
                    { name: "IoT & Smart Tech", count: 12, width: "25%", color: "bg-amber-500" }
                  ].map((bar, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black uppercase text-slate-300">
                        <span>{bar.name}</span>
                        <span className="text-white">{bar.count} situs</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                        <div className={`h-full ${bar.color} rounded-full`} style={{ width: bar.width }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD USER */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddUserModal(false)} />
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[28px] p-6 shadow-2xl space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Tambah Pengguna Baru</h3>
              </div>
              <form onSubmit={handleAddUserMock} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="contoh@domain.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Peran / Role</label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="flex-1 py-3 text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-widest border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Tambah User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD TEMPLATE */}
        {showAddTemplateModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddTemplateModal(false)} />
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[28px] p-6 shadow-2xl space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Tambah Template Baru</h3>
              </div>
              <form onSubmit={handleAddTemplateMock} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Template</label>
                  <input
                    type="text"
                    value={newTemplateData.name}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="Masukkan nama template"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                  <select
                    value={newTemplateData.category}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                  >
                    <option value="Makanan & Retail">Makanan & Retail</option>
                    <option value="Jasa Profesional">Jasa Profesional</option>
                    <option value="Pertanian & Agribisnis">Pertanian & Agribisnis</option>
                    <option value="Portofolio Kreatif">Portofolio Kreatif</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={newTemplateData.description}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="Deskripsi template"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Thumbnail URL</label>
                  <input
                    type="text"
                    value={newTemplateData.thumbnail}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, thumbnail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTemplateModal(false)}
                    className="flex-1 py-3 text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-widest border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Tambah Desain
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: REJECT REQUEST */}
        {rejectingId && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setRejectingId(null)} />
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[28px] p-6 shadow-2xl space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Tolak Permintaan Publikasi</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Alasan Penolakan</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none min-h-[100px] resize-none"
                    placeholder="Masukkan alasan penolakan agar dipelajari oleh pemilik situs..."
                    required
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => { setRejectingId(null); setReason(''); }}
                    className="flex-1 py-3 text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-widest border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={actionLoading === `reject-${rejectingId}`}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-650 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    {actionLoading === `reject-${rejectingId}` ? 'Memproses...' : 'Kirim Penolakan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ADMIN PROFILE */}
        {adminView === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-5">
              <h2 className="text-md font-black uppercase tracking-widest text-white">Administrator Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {/* Left Card: Account Information */}
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-[24px] p-8 shadow-sm space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 pb-4 border-b border-slate-800/60">Informasi Akun</h3>
                  <div className="space-y-4 text-xs">
                    <div className="flex flex-col gap-1.5 p-3.5 bg-slate-950/40 border border-slate-850 rounded-2xl">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">EMAIL OPERASIONAL</span>
                      <span className="text-white font-bold">admin@unilanfarm.com</span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3.5 bg-slate-950/40 border border-slate-850 rounded-2xl">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TIPE HAK AKSES</span>
                      <span className="text-brand-blue font-bold">SYSTEM ROOT ADMINISTRATOR</span>
                    </div>
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="w-full mt-8 py-3.5 text-[9px] font-black text-red-500 hover:text-red-650 hover:border-red-500/50 uppercase tracking-widest border border-red-500/20 rounded-xl hover:bg-red-500/10 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer animate-in duration-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout Akun
                  </button>
                )}
              </div>

              {/* Right Card: Change Password Form */}
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-[24px] p-8 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 pb-4 border-b border-slate-800/60">Keamanan & Ubah Password</h3>
                <form onSubmit={handleAdminChangePassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Saat Ini</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Baru</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all"
                      placeholder="Ulangi password baru"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={changePasswordLoading}
                    className="w-full mt-2 py-3.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md shadow-brand-blue/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {changePasswordLoading ? (
                      <>Memproses...</>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        Simpan Password Baru
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanelPage;
