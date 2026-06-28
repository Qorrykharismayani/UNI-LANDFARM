import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../lib/clipboard';
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
  BarChart3,
  BookOpen,
  Bell
} from 'lucide-react';

interface AdminPanelPageProps {
  showNotification: (msg: string, type?: 'success' | 'info') => void;
  onLogout?: () => void;
  onSwitchToUserView?: () => void;
  onSettingsUpdate?: (s: any) => void;
  adminView?: 'dashboard' | 'users' | 'landing_pages' | 'templates' | 'content' | 'profile' | 'analytics' | 'transactions' | 'notifications';
  setAdminView?: (v: 'dashboard' | 'users' | 'landing_pages' | 'templates' | 'content' | 'profile' | 'analytics' | 'transactions' | 'notifications') => void;
}

const AdminPanelPage = ({ 
  showNotification, 
  onLogout,
  onSwitchToUserView,
  onSettingsUpdate,
  adminView: propsAdminView,
  setAdminView: propsSetAdminView
}: AdminPanelPageProps) => {
  const [localAdminView, setLocalAdminView] = useState<'dashboard' | 'users' | 'landing_pages' | 'templates' | 'content' | 'profile' | 'analytics' | 'transactions' | 'notifications'>('dashboard');
  const adminView = propsAdminView || localAdminView;
  const setAdminView = propsSetAdminView || setLocalAdminView;
  const [adminNotifications, setAdminNotifications] = useState<any[]>([]);
  const [newNotifData, setNewNotifData] = useState({
    targetUserId: 'ALL',
    title: '',
    message: '',
    type: 'system'
  });
  const [notifSearchQuery, setNotifSearchQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [templatesList, setTemplatesList] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [systemSettings, setSystemSettings] = useState<any>({
    platformName: 'Uni-LandFarm',
    logo: '/uploads/1781793939040-LOGO_Uni-LandFarm-removebg-preview-(1).png',
    heroTitle: 'Bangun Situs Web Bisnis Modern dengan AI',
    heroDescription: 'Buat landing page profesional, toko online, dan konten bisnis secara instan bersama Uni-LandFarm.',
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
  const [lpSearchQuery, setLpSearchQuery] = useState('');
  const [lpStatusFilter, setLpStatusFilter] = useState<'ALL' | 'Published' | 'Draft' | 'Inactive'>('ALL');
  
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
    password: '',
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

  // Edit template form state
  const [showEditTemplateModal, setShowEditTemplateModal] = useState(false);
  const [editTemplateData, setEditTemplateData] = useState<any>(null);

  // (admin review/reject removed — publishing is now automatic)

  // CMS Tab state
  const [cmsSettingsTab, setCmsSettingsTab] = useState<'basic' | 'support' | 'seo' | 'features' | 'testimonials' | 'faqs' | 'user_dashboard' | 'pricing' | 'guides'>('basic');
  const [savingSettings, setSavingSettings] = useState(false);
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resUsers, resPages, resTemplates, resSettings, resAnalytics, resTransactions, resNotifications] = await Promise.all([
        fetch('/api/admin/users?t=' + new Date().getTime()).then(r => r.json()),
        fetch('/api/landing-pages?t=' + new Date().getTime()).then(r => r.json()),
        fetch('/api/admin/templates?t=' + new Date().getTime()).then(r => r.json()),
        fetch('/api/settings?t=' + new Date().getTime()).then(r => r.json()),
        fetch('/api/admin/analytics?t=' + new Date().getTime()).then(r => r.json()),
        fetch('/api/admin/transactions?t=' + new Date().getTime()).then(r => r.json()),
        fetch('/api/admin/notifications?t=' + new Date().getTime()).then(r => r.json())
      ]);

      if (resUsers.success) setUsers(resUsers.data);
      if (resPages.success) setLandingPages(resPages.data);
      if (resTemplates.success) setTemplatesList(resTemplates.data);
      if (resAnalytics?.success) setAnalyticsData(resAnalytics.data);
      if (resTransactions?.success) setTransactions(resTransactions.data);
      if (resNotifications?.success) setAdminNotifications(resNotifications.data);
      if (resSettings.success) {
        const fetched = resSettings.data || {};
        setSystemSettings({
          ...fetched,
          platformName: fetched.platformName || 'Uni-LandFarm',
          logo: fetched.logo || '/uploads/1781793939040-LOGO_Uni-LandFarm-removebg-preview-(1).png',
          heroTitle: fetched.heroTitle || 'Bangun Situs Web Bisnis Modern dengan AI',
          heroDescription: fetched.heroDescription || 'Buat landing page profesional, toko online, dan konten bisnis secara instan bersama Uni-LandFarm.',
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
          userPageJson: fetched.userPageJson ? {
            welcomeTitle: fetched.userPageJson.welcomeTitle || "Halo, Pebisnis Modern!",
            welcomeSubtitle: fetched.userPageJson.welcomeSubtitle || "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?",
            pricing: fetched.userPageJson?.pricing || [
              { name: 'PAKET BASIC', price: 'Rp 75.000', description: 'Untuk kebutuhan desain dasar.', features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '500 token'], buttonText: 'BELI 500 TOKEN', isPopular: false, gradient: 'from-blue-500 to-cyan-400' },
              { name: 'PAKET STANDARD', price: 'Rp 250.000', description: 'Pilihan terbaik untuk hasil profesional.', features: ['3 alternatif desain', 'Prompt detail', 'Branding sesuai website', 'Struktur visual profesional', '1000 token'], buttonText: 'BELI 1000 TOKEN', isPopular: true, gradient: 'from-amber-400 to-orange-500' },
              { name: 'PAKET PREMIUM', price: 'Rp 500.000', description: 'Solusi terlengkap untuk berbagai format visual.', features: ['Menggunakan screenshot website sebagai referensi', 'Prompt sangat detail', 'Storytelling visual', 'Layout presentasi/lomba/skripsi', '3000 token', 'Beberapa versi (poster, banner, slide)'], buttonText: 'BELI 3000 TOKEN', isPopular: false, gradient: 'from-violet-500 to-purple-600' }
            ]
          } : {
            welcomeTitle: "Halo, Pebisnis Modern!",
            welcomeSubtitle: "Siap untuk mengotomatisasi ekosistem digital Anda hari ini?",
            pricing: [
              { name: 'PAKET BASIC', price: 'Rp 75.000', description: 'Untuk kebutuhan desain dasar.', features: ['1 prompt', 'Rasio 16:9', '1 konsep infografis', '500 token'], buttonText: 'BELI 500 TOKEN', isPopular: false, gradient: 'from-blue-500 to-cyan-400' },
              { name: 'PAKET STANDARD', price: 'Rp 250.000', description: 'Pilihan terbaik untuk hasil profesional.', features: ['3 alternatif desain', 'Prompt detail', 'Branding sesuai website', 'Struktur visual profesional', '1000 token'], buttonText: 'BELI 1000 TOKEN', isPopular: true, gradient: 'from-amber-400 to-orange-500' },
              { name: 'PAKET PREMIUM', price: 'Rp 500.000', description: 'Solusi terlengkap untuk berbagai format visual.', features: ['Menggunakan screenshot website sebagai referensi', 'Prompt sangat detail', 'Storytelling visual', 'Layout presentasi/lomba/skripsi', '3000 token', 'Beberapa versi (poster, banner, slide)'], buttonText: 'BELI 3000 TOKEN', isPopular: false, gradient: 'from-violet-500 to-purple-600' }
            ]
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

  const [editingUser, setEditingUser] = useState<any>(null);
  
  const handleSaveUserEdit = async () => {
    if (!editingUser) return;
    setActionLoading(`edit-user-${editingUser.id}`);
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editingUser.role, status: editingUser.status })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message, 'success');
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, role: editingUser.role, status: editingUser.status } : u));
        setEditingUser(null);
      } else {
        showNotification(data.message || 'Gagal mengupdate pengguna.', 'info');
      }
    } catch (err) {
      showNotification('Terjadi kesalahan saat menyimpan data.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini secara permanen? Data yang berkaitan juga mungkin terhapus.')) return;
    setActionLoading(`delete-user-${userId}`);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message, 'success');
        setUsers(users.filter(u => u.id !== userId));
      } else {
        showNotification(data.message || 'Gagal menghapus pengguna.', 'info');
      }
    } catch (err) {
      showNotification('Terjadi kesalahan saat menghapus pengguna.', 'info');
    } finally {
      setActionLoading(null);
    }
  };


  const [selectedPageDetails, setSelectedPageDetails] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Published' | 'Draft' | 'Inactive'>('ALL');

  const togglePageStatus = async (pageId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Published' ? 'Inactive' : 'Published';
    setActionLoading(`page-${pageId}`);
    try {
      const res = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Status landing page berhasil diubah menjadi ${newStatus}!`, 'success');
        setLandingPages(landingPages.map(lp => lp.id === pageId ? { ...lp, status: newStatus } : lp));
        if (selectedPageDetails && selectedPageDetails.id === pageId) {
          setSelectedPageDetails(prev => prev ? { ...prev, status: newStatus } : null);
        }
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

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus landing page ini secara permanen?')) return;
    setActionLoading(`delete-page-${pageId}`);
    try {
      const res = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Landing page berhasil dihapus!', 'success');
        setLandingPages(landingPages.filter(lp => lp.id !== pageId));
        if (selectedPageDetails && selectedPageDetails.id === pageId) {
          setSelectedPageDetails(null);
        }
      } else {
        showNotification(data.message || 'Gagal menghapus landing page.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Gagal menghubungi server.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const [zoomReceiptUrl, setZoomReceiptUrl] = useState<string | null>(null);

  const handleApproveTransaction = async (txId: number) => {
    if (!confirm('Apakah Anda yakin ingin menyetujui pembayaran ini? Token akan segera dikreditkan ke akun user.')) return;
    setActionLoading(`approve-tx-${txId}`);
    try {
      const res = await fetch(`/api/admin/transactions/${txId}/approve`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Transaksi berhasil disetujui!', 'success');
        setTransactions(transactions.map(t => t.id === txId ? { ...t, status: 'berhasil' } : t));
      } else {
        showNotification(data.message || 'Gagal menyetujui transaksi.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Koneksi gagal.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectTransaction = async (txId: number) => {
    if (!confirm('Apakah Anda yakin ingin menolak pembayaran ini?')) return;
    setActionLoading(`reject-tx-${txId}`);
    try {
      const res = await fetch(`/api/admin/transactions/${txId}/reject`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Transaksi telah ditolak.', 'success');
        setTransactions(transactions.map(t => t.id === txId ? { ...t, status: 'gagal' } : t));
      } else {
        showNotification(data.message || 'Gagal menolak transaksi.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Koneksi gagal.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteTransaction = async (txId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus riwayat transaksi ini secara permanen dari database?')) return;
    setActionLoading(`delete-tx-${txId}`);
    try {
      const res = await fetch(`/api/admin/transactions/${txId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Transaksi berhasil dihapus!', 'success');
        setTransactions(transactions.filter(t => t.id !== txId));
      } else {
        showNotification(data.message || 'Gagal menghapus transaksi.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Koneksi gagal.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifData.title || !newNotifData.message) {
      showNotification('Judul dan pesan wajib diisi!', 'info');
      return;
    }
    setActionLoading('send-notif');
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotifData)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Notifikasi berhasil dikirim!', 'success');
        setNewNotifData({
          targetUserId: 'ALL',
          title: '',
          message: '',
          type: 'system'
        });
        // Reload notifications list
        const resList = await fetch('/api/admin/notifications?t=' + new Date().getTime()).then(r => r.json());
        if (resList.success) setAdminNotifications(resList.data);
      } else {
        showNotification(data.message || 'Gagal mengirim notifikasi.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Koneksi gagal.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteNotification = async (notifId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) return;
    setActionLoading(`delete-notif-${notifId}`);
    try {
      const res = await fetch(`/api/admin/notifications?id=${notifId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Notifikasi berhasil dihapus!', 'success');
        setAdminNotifications(adminNotifications.filter(n => n.id !== notifId));
      } else {
        showNotification(data.message || 'Gagal menghapus notifikasi.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Koneksi gagal.', 'info');
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

  const updatePricingPlan = (index: number, field: string, value: any) => {
    const userPage = { ...(systemSettings.userPageJson || {}) };
    const pricingList = [...(userPage.pricing || [])];
    pricingList[index] = { ...pricingList[index], [field]: value };
    userPage.pricing = pricingList;
    setSystemSettings({ ...systemSettings, userPageJson: userPage });
  };

  const updatePricingFeatures = (index: number, textValue: string) => {
    const featuresArray = textValue.split('\n').map(f => f.trim()).filter(Boolean);
    const userPage = { ...(systemSettings.userPageJson || {}) };
    const pricingList = [...(userPage.pricing || [])];
    pricingList[index] = { ...pricingList[index], features: featuresArray };
    userPage.pricing = pricingList;
    setSystemSettings({ ...systemSettings, userPageJson: userPage });
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

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email || !newUserData.password) {
      showNotification('Nama, email, dan password wajib diisi!', 'info');
      return;
    }
    setActionLoading('add-user');
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData)
      });
      const data = await res.json();
      if (data.success) {
        setUsers([data.data, ...users]);
        setShowAddUserModal(false);
        setNewUserData({ name: '', email: '', password: '', role: 'USER' });
        showNotification('User baru berhasil ditambahkan!', 'success');
      } else {
        showNotification(data.message || 'Gagal menambahkan user.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Gagal menghubungi server.', 'info');
    } finally {
      setActionLoading(null);
    }
  };


  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('add-template');
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTemplateData,
          thumbnail: newTemplateData.thumbnail || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'
        })
      });
      const data = await res.json();
      if (data.success) {
        setTemplatesList(prev => [data.data, ...prev]);
        setShowAddTemplateModal(false);
        setNewTemplateData({
          name: '',
          category: 'Makanan & Retail',
          description: '',
          thumbnail: '',
          status: 'Aktif'
        });
        showNotification('Template berhasil ditambahkan!', 'success');
      } else {
        showNotification(data.message || 'Gagal menambahkan template.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Gagal menghubungi server.', 'info');
    } finally {
      setActionLoading(null);
    }
  };


  const handleEditTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTemplateData) return;
    setActionLoading('edit-template');
    try {
      const res = await fetch(`/api/admin/templates/${editTemplateData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editTemplateData.name,
          category: editTemplateData.category,
          description: editTemplateData.description,
          thumbnail: editTemplateData.thumbnail,
          status: editTemplateData.status
        })
      });
      const data = await res.json();
      if (data.success) {
        setTemplatesList(prev => prev.map(t => t.id === editTemplateData.id ? data.data : t));
        setShowEditTemplateModal(false);
        setEditTemplateData(null);
        showNotification('Template berhasil diperbarui!', 'success');
      } else {
        showNotification(data.message || 'Gagal memperbarui template.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Gagal menghubungi server.', 'info');
    } finally {
      setActionLoading(null);
    }
  };

  const publishedPagesCount = landingPages.filter(p => p.status === 'Published').length;
  const draftPagesCount = landingPages.filter(p => p.status === 'Draft').length;
  const inactivePagesCount = landingPages.filter(p => p.status === 'Inactive').length;

  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { id: 'users', label: 'User Management', icon: <User className="w-4.5 h-4.5" /> },
    { id: 'landing_pages', label: 'Publications', icon: <Layers className="w-4.5 h-4.5" /> },
    { id: 'templates', label: 'Template Management', icon: <Layout className="w-4.5 h-4.5" /> },
    { id: 'content', label: 'Content Management (CMS)', icon: <Database className="w-4.5 h-4.5" /> },
    { id: 'transactions', label: 'Transaksi', icon: <Wallet className="w-4.5 h-4.5" /> },
    { id: 'notifications', label: 'Kelola Notifikasi', icon: <Bell className="w-4.5 h-4.5" /> },
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#070b19] text-slate-800 dark:text-slate-100 min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-[250px] bg-white dark:bg-[#0b1226] border-r border-slate-200 dark:border-slate-800/60 p-6 flex flex-col gap-6 shrink-0 z-10 transition-colors duration-300">
        <nav className="flex flex-col gap-1 flex-1">
          {sidebarMenu.map(menu => (
            <button
              key={menu.id}
              onClick={() => setAdminView(menu.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider transition-all text-left cursor-pointer ${
                adminView === menu.id
                  ? 'bg-brand-blue/10 text-brand-blue border-l-4 border-brand-blue shadow-[0_0_20px_rgba(255,176,0,0.1)]'
                  : 'text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue hover:bg-slate-100 dark:hover:bg-slate-800/30'
              }`}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={fetchAllData}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sync
            </button>
            <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase">v1.2.0</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT WINDOW */}
      <main className="flex-1 p-8 bg-slate-50 dark:bg-[#070b19] overflow-y-auto custom-scrollbar relative min-h-[500px] transition-colors duration-300">
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
                <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none uppercase">Selamat Datang, Admin Uni-LandFarm</h1>
                <p className="text-white/80 text-[11px] leading-relaxed font-medium">
                  Kelola sistem AI CMS, pantau landing page yang dipublikasikan, kelola data template, serta monitor aktivitas pengguna dari panel kendali terpusat.
                </p>
              </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Users", val: users.length, icon: <User className="w-5 h-5" />, bg: "bg-blue-500/10", border: "border-slate-800/80", text: "text-brand-blue" },
                { title: "Total Landing Pages", val: landingPages.length, icon: <Layers className="w-5 h-5" />, bg: "bg-indigo-500/10", border: "border-slate-800/80", text: "text-indigo-400" },
                { title: "Published Landing Pages", val: publishedPagesCount, icon: <Globe className="w-5 h-5" />, bg: "bg-emerald-500/10", border: "border-slate-800/80", text: "text-emerald-400" },
                { title: "Total Templates", val: templatesList.length, icon: <Layout className="w-5 h-5" />, bg: "bg-purple-500/10", border: "border-slate-800/80", text: "text-purple-400" }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[8.5px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-none">{stat.val}</h2>
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
              <div className="lg:col-span-7 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white">Landing Page Performance Overview</h3>
                  <p className="text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Grafik rasio status publikasi landing page</p>
                </div>

                {/* Legend */}
                <div className="px-6 flex items-center gap-4 pb-2">
                  {[
                    { label: 'Published', color: '#10b981', val: publishedPagesCount },
                    { label: 'Draft', color: '#f59e0b', val: draftPagesCount },
                    { label: 'Inactive', color: '#ef4444', val: inactivePagesCount },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-5 h-0.5 rounded-full inline-block" style={{ backgroundColor: s.color }}></span>
                      <span className="text-[8.5px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{s.label} ({s.val})</span>
                    </div>
                  ))}
                </div>

                {/* SVG Line Chart */}
                <div className="flex-1 min-h-0">
                  {(() => {
                    const now = new Date();
                    const past6Months = Array.from({length: 6}, (_, i) => {
                      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
                      return { year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString('id-ID', { month: 'short' }) };
                    });

                    const getCountUpTo = (status: string, year: number, month: number) => {
                      return landingPages.filter(lp => {
                        if (status !== 'ALL' && lp.status !== status) return false;
                        const d = new Date(lp.createdAt || lp.updatedAt || new Date());
                        return d.getFullYear() < year || (d.getFullYear() === year && d.getMonth() <= month);
                      }).length;
                    };

                    const maxVal = Math.max(1, ...past6Months.map(m => Math.max(
                      getCountUpTo('Aktif', m.year, m.month),
                      getCountUpTo('Draft', m.year, m.month),
                      getCountUpTo('Nonaktif', m.year, m.month)
                    )));

                    const W = 500, H = 180, padX = 32, padY = 20;
                    const chartW = W - padX * 2, chartH = H - padY * 2;
                    
                    const genPoints = (status: string) => {
                      return past6Months.map((m, i) => {
                        const v = getCountUpTo(status, m.year, m.month);
                        const x = padX + (i / 5) * chartW;
                        const y = padY + chartH - (v / maxVal) * chartH;
                        return { x, y, v };
                      });
                    };

                    const series = [
                      { status: 'Aktif', stroke: '#10b981', fill: 'rgba(16,185,129,0.08)' },
                      { status: 'Draft', stroke: '#f59e0b', fill: 'rgba(245,158,11,0.08)' },
                      { status: 'Nonaktif', stroke: '#ef4444', fill: 'rgba(239,68,68,0.08)' },
                    ];

                    return (
                      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full" style={{ minHeight: '160px' }}>
                        {/* Grid lines */}
                        {[0,1,2,3,4].map(i => {
                          const y = padY + (i / 4) * chartH;
                          return <line key={i} x1={padX} x2={W - padX} y1={y} y2={y} stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" className="text-slate-900 dark:text-slate-100" />;
                        })}

                        {series.map(({ status, stroke, fill }, si) => {
                          const pts = genPoints(status);
                          const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                          const area = `M ${pts[0].x} ${padY + chartH} L ${pts.map(p => `${p.x} ${p.y}`).join(' L ')} L ${pts[pts.length - 1].x} ${padY + chartH} Z`;
                          return (
                            <g key={si}>
                              <path d={area} fill={fill} />
                              <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                              {pts.map((p, i) => i === pts.length - 1 && (
                                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={stroke} stroke="white" strokeWidth="1.5" />
                              ))}
                            </g>
                          );
                        })}

                        {/* X-axis labels */}
                        {past6Months.map((m, i) => {
                          const x = padX + (i / 5) * chartW;
                          return <text key={i} x={x} y={H - 4} textAnchor="middle" className="fill-slate-400" fontSize="8" fontWeight="700" style={{ fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</text>;
                        })}
                      </svg>
                    );
                  })()}
                </div>
              </div>

              {/* Recent Activity (lg:span-5) */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 p-6 rounded-[24px] shadow-sm space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white">Recent Activity Section</h3>
                  <p className="text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Catatan log aktivitas administratif sistem</p>
                </div>

                <div className="flow-root">
                  <ul className="-mb-8">
                    {(() => {
                      const activities: any[] = [];
                      
                      users.forEach(u => {
                        if (u.createdAt) {
                          activities.push({
                            text: `User Registration: ${u.name} mendaftar akun baru`,
                            date: new Date(u.createdAt),
                            color: 'bg-brand-blue'
                          });
                        }
                      });

                      landingPages.forEach(lp => {
                        if (lp.createdAt) {
                          activities.push({
                            text: `Landing Page Created: ${lp.title || lp.name || lp.businessName} oleh ${lp.user?.name || 'Seseorang'}`,
                            date: new Date(lp.createdAt),
                            color: 'bg-amber-500'
                          });
                        }
                        if (lp.publishedAt && lp.status === 'Published') {
                          activities.push({
                            text: `Landing Page Published: ${lp.title || lp.name || lp.businessName} live di internet`,
                            date: new Date(lp.publishedAt),
                            color: 'bg-emerald-500'
                          });
                        }
                      });

                      templatesList.forEach(tpl => {
                        if (tpl.createdAt) {
                          activities.push({
                            text: `Template Added: Template ${tpl.name} ditambahkan`,
                            date: new Date(tpl.createdAt),
                            color: 'bg-purple-500'
                          });
                        }
                      });

                      activities.sort((a, b) => b.date.getTime() - a.date.getTime());
                      
                      const topActivities = activities.slice(0, 5).map(act => {
                        const diffMs = Date.now() - act.date.getTime();
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMins / 60);
                        const diffDays = Math.floor(diffHours / 24);
                        
                        let timeStr = 'Baru saja';
                        if (diffMins > 0 && diffMins < 60) timeStr = `${diffMins} menit lalu`;
                        else if (diffHours > 0 && diffHours < 24) timeStr = `${diffHours} jam lalu`;
                        else if (diffDays > 0) timeStr = `${diffDays} hari lalu`;

                        return { text: act.text, time: timeStr, color: act.color };
                      });

                      if (topActivities.length === 0) {
                        return <p className="text-xs text-slate-400">Belum ada aktivitas tercatat.</p>;
                      }

                      return topActivities.map((act, i) => (
                        <li key={i}>
                          <div className="relative pb-8">
                            {i !== topActivities.length - 1 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-800" aria-hidden="true" />}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-900 ${act.color} text-white`}>
                                  <Sparkles className="w-3.5 h-3.5" />
                                </span>
                              </div>
                              <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide leading-relaxed">{act.text}</p>
                                </div>
                                <div className="text-right text-[8px] font-black uppercase whitespace-nowrap text-slate-400 dark:text-slate-500">
                                  <span>{act.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW: USER MANAGEMENT */}
        {adminView === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <h2 className="text-md font-black uppercase tracking-widest text-slate-800 dark:text-white">User Management Panel</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-1">Kelola hak akses pengguna, status akun, dan memblokir sementara</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari pengguna..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue w-48 md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/60">
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Nama Lengkap</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Email</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{usr.name}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{usr.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded ${usr.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-slate-200/50 text-slate-500 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}>
                          {usr.role || 'USER'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border rounded ${usr.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                          {usr.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingUser(usr)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-[9px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(usr.id)}
                            disabled={actionLoading === `delete-user-${usr.id}`}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 rounded-xl text-[9px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest transition-all"
                          >
                            {actionLoading === `delete-user-${usr.id}` ? '...' : 'Hapus'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit User Modal — Detail + Edit Role/Status */}
            {editingUser && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-[#0b1226] border border-slate-200 dark:border-slate-700 rounded-[24px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#0b1226] z-10 rounded-t-[24px]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-indigo-600 flex items-center justify-center text-white font-black text-lg uppercase shadow-lg shadow-brand-blue/20">
                        {editingUser.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white">{editingUser.name}</h3>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">{editingUser.email}</p>
                      </div>
                    </div>
                    <button onClick={() => setEditingUser(null)} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer">
                      <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* User Info Cards (Read-Only) */}
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Informasi Pengguna</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { label: 'Telepon', value: editingUser.phone || '-' },
                          { label: 'Lokasi', value: editingUser.location || '-' },
                          { label: 'Paket', value: editingUser.plan || 'Regular Access' },
                          { label: 'Token', value: editingUser.tokens?.toLocaleString('id-ID') ?? '0' },
                          { label: 'Provider', value: editingUser.provider || 'credentials' },
                          { label: 'Bergabung', value: editingUser.joinedDate || '-' },
                        ].map((item, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl p-3">
                            <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">{item.label}</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-white truncate block">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity Stats (Read-Only) */}
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Riwayat Aktivitas</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { label: 'Landing Pages', value: editingUser.landingPageCount ?? 0, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                          { label: 'Artikel', value: editingUser.articleCount ?? 0, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                          { label: 'Transaksi', value: editingUser.transactionCount ?? 0, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                          { label: 'Notifikasi', value: editingUser.notificationCount ?? 0, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                          { label: 'Media', value: editingUser.mediaFileCount ?? 0, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                        ].map((item, i) => (
                          <div key={i} className={`${item.bg} border border-slate-200 dark:border-slate-800/40 rounded-xl p-3 text-center`}>
                            <span className={`text-xl font-black ${item.color} block`}>{item.value}</span>
                            <span className="text-[7.5px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5 block">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Landing Pages List (Read-Only) */}
                    {editingUser.landingPages && editingUser.landingPages.length > 0 && (
                      <div>
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Landing Pages ({editingUser.landingPages.length})</h4>
                        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 dark:border-slate-800/60">
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Judul</th>
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-4 py-2.5 text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Dibuat</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/40">
                              {editingUser.landingPages.slice(0, 5).map((lp: any) => (
                                <tr key={lp.id} className="hover:bg-white dark:hover:bg-slate-800/30 transition-colors">
                                  <td className="px-4 py-2 font-bold text-slate-700 dark:text-slate-200 truncate max-w-[200px]">{lp.title}</td>
                                  <td className="px-4 py-2">
                                    <span className={`px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest rounded ${
                                      lp.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' :
                                      lp.status === 'Draft' ? 'bg-amber-500/10 text-amber-500' :
                                      'bg-slate-200 dark:bg-slate-800 text-slate-500'
                                    }`}>{lp.status}</span>
                                  </td>
                                  <td className="px-4 py-2 text-slate-500 dark:text-slate-400 text-[10px]">
                                    {new Date(lp.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {editingUser.landingPages.length > 5 && (
                            <div className="px-4 py-2 text-center text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-t border-slate-200 dark:border-slate-800/60">
                              +{editingUser.landingPages.length - 5} landing page lainnya
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Editable Fields: Role & Status */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-brand-blue mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" /> Kelola Hak Akses
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Role Pengguna</label>
                          <select 
                            value={editingUser.role || 'USER'}
                            onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-white focus:border-brand-blue outline-none"
                          >
                            <option value="USER">USER (Pengguna Biasa)</option>
                            <option value="ADMIN">ADMIN (Hak Akses Penuh)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Status Akun</label>
                          <select 
                            value={editingUser.status || 'Aktif'}
                            onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-white focus:border-brand-blue outline-none"
                          >
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3 sticky bottom-0 bg-white dark:bg-[#0b1226] rounded-b-[24px]">
                    <button onClick={() => setEditingUser(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer">
                      Batal
                    </button>
                    <button onClick={handleSaveUserEdit} disabled={actionLoading === `edit-user-${editingUser.id}`} className="flex-1 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer">
                      {actionLoading === `edit-user-${editingUser.id}` ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: LANDING PAGE MONITORING */}
        {adminView === 'landing_pages' && (() => {
          const filteredLPs = landingPages.filter(lp => {
            const name = (lp.name || lp.businessName || lp.title || '').toLowerCase();
            const owner = (lp.user?.name || '').toLowerCase();
            const matchSearch = name.includes(lpSearchQuery.toLowerCase()) || owner.includes(lpSearchQuery.toLowerCase());
            const matchStatus = lpStatusFilter === 'ALL' || lp.status === lpStatusFilter;
            return matchSearch && matchStatus;
          });

          return (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div>
                  <h2 className="text-md font-black uppercase tracking-widest text-slate-800 dark:text-white">Kelola Publikasi</h2>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">Kelola seluruh landing page yang dipublikasikan pada platform UNI-LandFarm.</p>
                </div>
                <button
                  type="button"
                  onClick={fetchAllData}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Landing Page', val: landingPages.length, color: 'text-brand-blue', bg: 'bg-blue-500/10' },
                  { label: 'Published', val: publishedPagesCount, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Draft', val: draftPagesCount, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' },
                  { label: 'Inactive', val: inactivePagesCount, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-500/10' },
                ].map((s, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                      <span className={`text-lg font-black ${s.color}`}>{s.val}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Search + Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari nama landing page atau pemilik..."
                    value={lpSearchQuery}
                    onChange={e => setLpSearchQuery(e.target.value)}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-brand-blue w-full"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(['ALL','Published','Draft','Inactive'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setLpStatusFilter(f)}
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        lpStatusFilter === f
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {f === 'ALL' ? 'Semua' : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/60">
                        <th className="px-5 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Nama Landing Page</th>
                        <th className="px-5 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pemilik</th>
                        <th className="px-5 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">URL</th>
                        <th className="px-5 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-5 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Tanggal Publish</th>
                        <th className="px-5 py-3.5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                      {filteredLPs.length === 0 ? (
                        <tr><td colSpan={6} className="px-6 py-10 text-center text-xs text-slate-400 dark:text-slate-500 font-medium uppercase">Tidak ada data yang cocok.</td></tr>
                      ) : filteredLPs.map((lp) => (
                        <tr key={lp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-bold text-slate-800 dark:text-white uppercase text-[11px] leading-tight block">{lp.name || lp.businessName || lp.title || 'Tanpa Nama'}</span>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">{lp.template?.name || '-'}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-300 font-medium text-[10px]">{lp.user?.name || '-'}</td>
                          <td className="px-5 py-4">
                            <a 
                              href={`/site/${lp.slug}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-brand-blue hover:underline font-mono text-[10px] font-bold"
                            >
                              {lp.slug || '-'}
                            </a>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                              lp.status === 'Published' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                              lp.status === 'Inactive' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                              'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                            }`}>
                              {lp.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-medium text-[10px]">
                            {(() => {
                              const dateVal = lp.publishedAt || lp.createdAt;
                              if (!dateVal) return '-';
                              const d = new Date(dateVal);
                              return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                            })()}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedPageDetails(lp)}
                                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                Detail
                              </button>
                              {lp.status !== 'Draft' && (
                                <button
                                  onClick={() => {
                                    const origin = typeof window !== 'undefined' ? window.location.origin : '';
                                    copyToClipboard(`${origin}/site/${lp.slug}`);
                                    showNotification('URL disalin!', 'success');
                                  }}
                                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  Copy URL
                                </button>
                              )}
                              {lp.status === 'Published' && (
                                <button
                                  onClick={() => togglePageStatus(lp.id, lp.status)}
                                  disabled={actionLoading === `page-${lp.id}`}
                                  className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  {actionLoading === `page-${lp.id}` ? '...' : 'Deactivate'}
                                </button>
                              )}
                              {lp.status === 'Inactive' && (
                                <button
                                  onClick={() => togglePageStatus(lp.id, lp.status)}
                                  disabled={actionLoading === `page-${lp.id}`}
                                  className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  {actionLoading === `page-${lp.id}` ? '...' : 'Activate'}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeletePage(lp.id)}
                                disabled={actionLoading === `delete-page-${lp.id}`}
                                className="px-2.5 py-1 bg-red-600 dark:bg-red-600/90 hover:bg-red-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                {actionLoading === `delete-page-${lp.id}` ? '...' : 'Hapus'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail Modal */}
              {selectedPageDetails && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPageDetails(null)}>
                  <div className="bg-white dark:bg-[#0b1226] border border-slate-200 dark:border-slate-700 rounded-[24px] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white">{selectedPageDetails.name || selectedPageDetails.businessName || selectedPageDetails.title}</h3>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">Detail Landing Page</p>
                      </div>
                      <button onClick={() => setSelectedPageDetails(null)} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer">
                        <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                    </div>
                    <div className="p-6 space-y-5">
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-xs">
                        {[
                          { label: 'Nama Bisnis', val: selectedPageDetails.businessName || '-', icon: '🏢' },
                          { label: 'Pemilik', val: selectedPageDetails.user?.name || '-', icon: '👤' },
                          { label: 'Template', val: selectedPageDetails.template?.name || '-', icon: '🎨' },
                          { label: 'URL Slug', val: selectedPageDetails.slug || '-', icon: '🔗' },
                          { label: 'Status', val: selectedPageDetails.status || '-', icon: '📊' },
                          { label: 'Tanggal Publish', val: selectedPageDetails.publishedAt ? new Date(selectedPageDetails.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Belum Terbit', icon: '📅' },
                        ].map((item, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                            <span className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-1.5">{item.icon} {item.label}</span>
                            <span className={`font-bold text-[12px] truncate block ${item.label === 'Status' ? (item.val === 'Published' ? 'text-emerald-600 dark:text-emerald-400' : item.val === 'Inactive' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400') : 'text-slate-800 dark:text-white'}`}>{item.val}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(`/site/${selectedPageDetails.slug}`, '_blank')}
                          className="flex-1 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer text-center"
                        >
                          Buka Situs
                        </button>
                        {selectedPageDetails.status === 'Published' && (
                          <button
                            onClick={() => { togglePageStatus(selectedPageDetails.id, selectedPageDetails.status); }}
                            className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer text-center"
                          >
                            Nonaktifkan
                          </button>
                        )}
                        {selectedPageDetails.status === 'Inactive' && (
                          <button
                            onClick={() => { togglePageStatus(selectedPageDetails.id, selectedPageDetails.status); }}
                            className="flex-1 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer text-center"
                          >
                            Aktifkan
                          </button>
                        )}
                      </div>
                      <div className="rounded-xl border border-slate-800 overflow-hidden">
                        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                          </div>
                          <span className="text-[9px] font-mono text-slate-500">{(typeof window !== 'undefined' ? window.location.origin : '')}/site/{selectedPageDetails.slug}</span>
                        </div>
                        <iframe
                          src={`/site/${selectedPageDetails.slug}`}
                          className="w-full h-[400px] bg-white"
                          title={`Preview: ${selectedPageDetails.title}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* VIEW: TEMPLATE MANAGEMENT */}
        {adminView === 'templates' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <h2 className="text-md font-black uppercase tracking-widest text-slate-800 dark:text-white">Template Management Panel</h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">Kelola pustaka template situs, ubah status, dan tambahkan desain baru</p>
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
                  <div key={tpl.id} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md dark:hover:border-slate-700/80 transition-all flex flex-col group">
                    <div className="h-40 bg-slate-100 dark:bg-slate-950 relative overflow-hidden shrink-0 border-b border-slate-200 dark:border-slate-800/55">
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
                  <div key={tpl.id} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md dark:hover:border-slate-700/80 transition-all flex flex-col group">
                    <div className="h-40 bg-slate-100 dark:bg-slate-950 relative overflow-hidden shrink-0 border-b border-slate-200 dark:border-slate-800/55">
                      <img src={tpl.thumbnail || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[8px] font-black uppercase border ${tpl.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/80 text-slate-400 border-slate-700'}`}>{tpl.status}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-black text-brand-blue uppercase tracking-widest">{tpl.category}</span>
                        <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">{tpl.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">{tpl.description}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                        <button
                          onClick={async () => {
                            const nextStatus = tpl.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
                            try {
                              const res = await fetch(`/api/admin/templates/${tpl.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: nextStatus })
                              });
                              const data = await res.json();
                              if (data.success) {
                                setTemplatesList(prev => prev.map(t => t.id === tpl.id ? { ...t, status: nextStatus } : t));
                                showNotification(`Template ${tpl.name} diubah menjadi ${nextStatus}`, 'success');
                              } else {
                                showNotification(data.message || 'Gagal mengubah status', 'info');
                              }
                            } catch (err) {
                              showNotification('Gagal menghubungi server', 'info');
                            }
                          }}
                          className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer text-center"
                        >
                          Ubah Status
                        </button>
                        <button
                          onClick={() => {
                            setEditTemplateData({ ...tpl });
                            setShowEditTemplateModal(true);
                          }}
                          className="px-2 py-1.5 bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 text-blue-400 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                          title="Edit Template"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Yakin ingin menghapus template ${tpl.name}?`)) return;
                            try {
                              const res = await fetch(`/api/admin/templates/${tpl.id}`, {
                                method: 'DELETE'
                              });
                              const data = await res.json();
                              if (data.success) {
                                setTemplatesList(prev => prev.filter(t => t.id !== tpl.id));
                                showNotification(`Template ${tpl.name} berhasil dihapus!`, 'info');
                              } else {
                                showNotification(data.message || 'Gagal menghapus template', 'info');
                              }
                            } catch (err) {
                              showNotification('Gagal menghubungi server', 'info');
                            }
                          }}
                          className="px-2 py-1.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-500 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                          title="Hapus Template"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <h2 className="text-md font-black uppercase tracking-widest text-slate-800 dark:text-white">Global CMS Content Management</h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">Kelola informasi publik, teks promosi, kontak, dan pengaturan platform yang dipublikasikan sistem</p>
            </div>

            {/* Tabs for sections */}
            <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 pb-px overflow-x-auto scrollbar-none">
              {['basic', 'features', 'testimonials', 'faqs', 'user_dashboard', 'pricing', 'guides', 'seo', 'support'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCmsSettingsTab(tab as any)}
                  className={`px-4 py-2.5 text-[9.5px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                    cmsSettingsTab === tab
                      ? 'border-b-2 border-brand-blue text-brand-blue'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {tab === 'basic' ? 'Informasi Dasar' :
                   tab === 'features' ? 'Komponen Fitur' :
                   tab === 'testimonials' ? 'Testimoni' :
                   tab === 'faqs' ? 'Daftar FAQ' :
                   tab === 'user_dashboard' ? 'Welcome Dashboard' :
                   tab === 'pricing' ? '🏷️ Paket & Pembayaran' :
                   tab === 'guides' ? 'Pusat Panduan' :
                   tab === 'seo' ? 'Pengaturan SEO' : 'Kontak'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 bg-white dark:bg-slate-900/40 p-8 rounded-[24px] border border-slate-200 dark:border-slate-800/80 shadow-sm">
              {cmsSettingsTab === 'basic' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
                    <input
                      type="text"
                      value={systemSettings.platformName}
                      onChange={(e) => setSystemSettings({ ...systemSettings, platformName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Platform Logo</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-800/80 overflow-hidden relative shrink-0">
                        {systemSettings.logo ? (
                          <img src={systemSettings.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                        ) : (
                          <span className="text-[8px] font-black text-slate-400 uppercase">No Logo</span>
                        )}
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <div className="relative border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-4 text-center hover:border-brand-blue/30 transition-all cursor-pointer group overflow-hidden bg-slate-50 dark:bg-slate-950">
                          <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/svg+xml"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append('file', file);
                              try {
                                showNotification('Mengunggah logo...', 'info');
                                const res = await fetch('/api/media/upload', {
                                  method: 'POST',
                                  body: formData
                                });
                                const data = await res.json();
                                if (data.success && data.data?.fileUrl) {
                                  setSystemSettings({ ...systemSettings, logo: data.data.fileUrl });
                                  showNotification('Logo platform berhasil diunggah!', 'success');
                                } else {
                                  showNotification(data.message || 'Gagal mengunggah logo.', 'info');
                                }
                              } catch (err) {
                                showNotification('Koneksi upload bermasalah.', 'info');
                              }
                            }}
                          />
                          <p className="text-[10px] font-black text-slate-550 dark:text-slate-400 uppercase group-hover:text-brand-blue transition-colors">Upload File Logo Baru</p>
                          <p className="text-[8px] text-slate-400 uppercase mt-0.5">PNG, JPG, SVG (Maks. 2MB)</p>
                        </div>
                        <input
                          type="text"
                          value={systemSettings.logo || ''}
                          onChange={(e) => setSystemSettings({ ...systemSettings, logo: e.target.value })}
                          placeholder="Atau masukkan URL Logo di sini..."
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-white outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Judul Utama Hero (Landing Page)</label>
                    <input
                      type="text"
                      value={systemSettings.heroTitle}
                      onChange={(e) => setSystemSettings({ ...systemSettings, heroTitle: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Deskripsi Hero</label>
                    <textarea
                      value={systemSettings.heroDescription}
                      onChange={(e) => setSystemSettings({ ...systemSettings, heroDescription: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none min-h-[100px] resize-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {cmsSettingsTab === 'pricing' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Daftar Paket Token</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newPricing = [...(systemSettings.userPageJson?.pricing || [])];
                        newPricing.push({
                          name: 'PAKET BARU',
                          price: 'Rp 0',
                          description: 'Deskripsi paket',
                          features: ['Fitur 1'],
                          buttonText: 'BELI SEKARANG',
                          gradient: 'from-slate-500 to-slate-400'
                        });
                        updateUserPage('pricing', newPricing);
                      }}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah Paket
                    </button>
                  </div>

                  {(systemSettings.userPageJson?.pricing || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500 font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                      Sistem menggunakan paket default. Klik "Tambah Paket" untuk membuat paket khusus.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.userPageJson?.pricing || []).map((plan: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newPricing = systemSettings.userPageJson.pricing.filter((_: any, i: number) => i !== idx);
                                updateUserPage('pricing', newPricing);
                              }}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Hapus Paket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pr-16">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Nama Paket</label>
                              <input
                                type="text"
                                value={plan.name || ''}
                                onChange={(e) => {
                                  const np = [...systemSettings.userPageJson.pricing];
                                  np[idx].name = e.target.value;
                                  updateUserPage('pricing', np);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Harga</label>
                              <input
                                type="text"
                                value={plan.price || ''}
                                onChange={(e) => {
                                  const np = [...systemSettings.userPageJson.pricing];
                                  np[idx].price = e.target.value;
                                  updateUserPage('pricing', np);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5 col-span-2">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Deskripsi</label>
                              <input
                                type="text"
                                value={plan.description || ''}
                                onChange={(e) => {
                                  const np = [...systemSettings.userPageJson.pricing];
                                  np[idx].description = e.target.value;
                                  updateUserPage('pricing', np);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5 col-span-2">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Fitur (Satu per baris)</label>
                              <textarea
                                value={Array.isArray(plan.features) ? plan.features.join('\n') : ''}
                                onChange={(e) => {
                                  const np = [...systemSettings.userPageJson.pricing];
                                  np[idx].features = e.target.value.split('\n');
                                  updateUserPage('pricing', np);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none min-h-[60px] resize-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Teks Tombol</label>
                              <input
                                type="text"
                                value={plan.buttonText || ''}
                                onChange={(e) => {
                                  const np = [...systemSettings.userPageJson.pricing];
                                  np[idx].buttonText = e.target.value;
                                  updateUserPage('pricing', np);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Warna Gradien (Tailwind)</label>
                              <input
                                type="text"
                                value={plan.gradient || ''}
                                onChange={(e) => {
                                  const np = [...systemSettings.userPageJson.pricing];
                                  np[idx].gradient = e.target.value;
                                  updateUserPage('pricing', np);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="from-blue-500 to-cyan-400"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Payment Methods Section */}
                  <div className="flex justify-between items-center mt-8 mb-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Metode Pembayaran</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newMethods = [...(systemSettings.userPageJson?.paymentMethods || [])];
                        newMethods.push({
                          id: `PAY-${Date.now()}`,
                          name: 'METODE BARU',
                          type: 'EWALLET',
                          logo: '/icons/default.png'
                        });
                        updateUserPage('paymentMethods', newMethods);
                      }}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah Metode
                    </button>
                  </div>

                  {(systemSettings.userPageJson?.paymentMethods || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500 font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                      Klik "Tambah Metode" untuk membuat metode pembayaran kustom.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.userPageJson?.paymentMethods || []).map((method: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newMethods = systemSettings.userPageJson.paymentMethods.filter((_: any, i: number) => i !== idx);
                                updateUserPage('paymentMethods', newMethods);
                              }}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Hapus Metode"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pr-16">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">ID Pembayaran (Unik)</label>
                              <input
                                type="text"
                                value={method.id || ''}
                                onChange={(e) => {
                                  const nm = [...systemSettings.userPageJson.paymentMethods];
                                  nm[idx].id = e.target.value;
                                  updateUserPage('paymentMethods', nm);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Nama Layanan</label>
                              <input
                                type="text"
                                value={method.name || ''}
                                onChange={(e) => {
                                  const nm = [...systemSettings.userPageJson.paymentMethods];
                                  nm[idx].name = e.target.value;
                                  updateUserPage('paymentMethods', nm);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Tipe (VA/EWALLET/Qris)</label>
                              <select
                                value={method.type || 'EWALLET'}
                                onChange={(e) => {
                                  const nm = [...systemSettings.userPageJson.paymentMethods];
                                  nm[idx].type = e.target.value;
                                  updateUserPage('paymentMethods', nm);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              >
                                <option value="EWALLET">E-Wallet</option>
                                <option value="VA">Virtual Account</option>
                                <option value="QRIS">QRIS</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">URL Logo/Icon</label>
                              <input
                                type="text"
                                value={method.logo || ''}
                                onChange={(e) => {
                                  const nm = [...systemSettings.userPageJson.paymentMethods];
                                  nm[idx].logo = e.target.value;
                                  updateUserPage('paymentMethods', nm);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="/icons/gopay.svg"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {cmsSettingsTab === 'guides' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Pusat Panduan (Guide Center)</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newGuides = [...(systemSettings.userPageJson?.guides || [])];
                        newGuides.push({
                          title: 'PANDUAN BARU',
                          desc: 'Deskripsi panduan',
                          time: '3 Menit',
                          icon: 'Zap',
                          bg: 'from-blue-500 to-cyan-400',
                          steps: ['Langkah 1']
                        });
                        updateUserPage('guides', newGuides);
                      }}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah Panduan
                    </button>
                  </div>

                  {(systemSettings.userPageJson?.guides || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500 font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                      Sistem menggunakan panduan default. Klik "Tambah Panduan" untuk membuat panduan kustom.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.userPageJson?.guides || []).map((guide: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newGuides = systemSettings.userPageJson.guides.filter((_: any, i: number) => i !== idx);
                                updateUserPage('guides', newGuides);
                              }}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Hapus Panduan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pr-16">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Judul Panduan</label>
                              <input
                                type="text"
                                value={guide.title || ''}
                                onChange={(e) => {
                                  const ng = [...systemSettings.userPageJson.guides];
                                  ng[idx].title = e.target.value;
                                  updateUserPage('guides', ng);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Waktu Baca</label>
                              <input
                                type="text"
                                value={guide.time || ''}
                                onChange={(e) => {
                                  const ng = [...systemSettings.userPageJson.guides];
                                  ng[idx].time = e.target.value;
                                  updateUserPage('guides', ng);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              />
                            </div>
                            <div className="space-y-1.5 col-span-2">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Deskripsi</label>
                              <textarea
                                value={guide.desc || ''}
                                onChange={(e) => {
                                  const ng = [...systemSettings.userPageJson.guides];
                                  ng[idx].desc = e.target.value;
                                  updateUserPage('guides', ng);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none min-h-[50px] resize-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Ikon (Lucide)</label>
                              <select
                                value={guide.icon || 'Zap'}
                                onChange={(e) => {
                                  const ng = [...systemSettings.userPageJson.guides];
                                  ng[idx].icon = e.target.value;
                                  updateUserPage('guides', ng);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              >
                                <option value="Zap">Zap</option>
                                <option value="Database">Database</option>
                                <option value="Layout">Layout</option>
                                <option value="Rocket">Rocket</option>
                                <option value="BookOpen">BookOpen</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Warna Gradien (Tailwind)</label>
                              <input
                                type="text"
                                value={guide.bg || ''}
                                onChange={(e) => {
                                  const ng = [...systemSettings.userPageJson.guides];
                                  ng[idx].bg = e.target.value;
                                  updateUserPage('guides', ng);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="from-blue-500 to-cyan-400"
                              />
                            </div>
                            <div className="space-y-1.5 col-span-2">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Langkah-Langkah (Satu per baris)</label>
                              <textarea
                                value={Array.isArray(guide.steps) ? guide.steps.join('\n') : ''}
                                onChange={(e) => {
                                  const ng = [...systemSettings.userPageJson.guides];
                                  ng[idx].steps = e.target.value.split('\n');
                                  updateUserPage('guides', ng);
                                }}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none min-h-[60px] resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {cmsSettingsTab === 'seo' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Meta Deskripsi Default</label>
                    <textarea
                      value={systemSettings.heroDescription || ''}
                      onChange={(e) => setSystemSettings({ ...systemSettings, heroDescription: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none min-h-[100px] resize-none transition-colors"
                      placeholder="Deskripsi SEO yang digunakan sistem"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Default Footer Text</label>
                    <input
                      type="text"
                      value={systemSettings.footerText}
                      onChange={(e) => setSystemSettings({ ...systemSettings, footerText: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {cmsSettingsTab === 'support' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Email Kontak Utama</label>
                    <input
                      type="email"
                      value={systemSettings.contactEmail}
                      onChange={(e) => setSystemSettings({ ...systemSettings, contactEmail: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp Operasional</label>
                    <input
                      type="text"
                      value={systemSettings.whatsapp}
                      onChange={(e) => setSystemSettings({ ...systemSettings, whatsapp: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/60 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-colors"
                      placeholder="628123456..."
                    />
                  </div>
                </div>
              )}

              {cmsSettingsTab === 'features' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Daftar Fitur Platform</h3>
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
                        <div key={idx} className="relative bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
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
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Judul Fitur</label>
                              <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="Nama Fitur"
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Ikon (Lucide)</label>
                              <select
                                value={feature.icon || 'Zap'}
                                onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                              >
                                {['Zap', 'Folder', 'Smartphone', 'Wallet', 'BarChart3', 'Cpu', 'Globe', 'Database', 'Shield', 'Coffee', 'Leaf', 'Tractor'].map((ico) => (
                                  <option key={ico} value={ico}>{ico}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Deskripsi Fitur</label>
                            <textarea
                              value={feature.desc || ''}
                              onChange={(e) => updateFeature(idx, 'desc', e.target.value)}
                              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none min-h-[60px] resize-none"
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
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Daftar Testimoni Klien</h3>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah Testimoni
                    </button>
                  </div>

                  {(systemSettings.testimonialsJson || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-550 dark:text-slate-400 font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                      Belum ada testimoni. Klik "Tambah Testimoni" untuk memulai.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.testimonialsJson || []).map((testi: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
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
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Nama Klien</label>
                              <input
                                type="text"
                                value={testi.name || ''}
                                onChange={(e) => updateTestimonial(idx, 'name', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="Nama Lengkap"
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Jabatan / Perusahaan</label>
                              <input
                                type="text"
                                value={testi.role || ''}
                                onChange={(e) => updateTestimonial(idx, 'role', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="Contoh: CEO of TokoKopi"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Avatar URL</label>
                              <input
                                type="text"
                                value={testi.avatar || ''}
                                onChange={(e) => updateTestimonial(idx, 'avatar', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="https://picsum.photos/seed/..."
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Isi Testimoni</label>
                            <textarea
                              value={testi.content || ''}
                              onChange={(e) => updateTestimonial(idx, 'content', e.target.value)}
                              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none min-h-[60px] resize-none"
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
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Daftar Pertanyaan Umum (FAQ)</h3>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="px-3 py-1.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-brand-blue/10 animate-in fade-in"
                    >
                      <Plus className="w-3 h-3" /> Tambah FAQ
                    </button>
                  </div>

                  {(systemSettings.faqsJson || []).length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-550 dark:text-slate-400 font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl">
                      Belum ada FAQ. Klik "Tambah FAQ" untuk memulai.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      {(systemSettings.faqsJson || []).map((faq: any, idx: number) => (
                        <div key={idx} className="relative bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-3">
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
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Pertanyaan</label>
                              <input
                                type="text"
                                value={faq.q || ''}
                                onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
                                placeholder="Contoh: Apakah bisa custom domain?"
                                required
                              />
                            </div>
                            <div className="space-y-1.5 col-span-2 sm:col-span-1">
                              <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Aksen Warna (Tailwind)</label>
                              <select
                                value={faq.color || 'bg-blue-500'}
                                onChange={(e) => updateFaq(idx, 'color', e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none"
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
                            <label className="text-[8px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Jawaban</label>
                            <textarea
                              value={faq.a || ''}
                              onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-white outline-none min-h-[60px] resize-none"
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
                  <div className="border-b border-slate-200 dark:border-slate-800/50 pb-3 mb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">Header Welcome Dashboard Pengguna</h3>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Judul Selamat Datang (Welcome Title)</label>
                    <input
                      type="text"
                      value={systemSettings.userPageJson?.welcomeTitle || ''}
                      onChange={(e) => updateUserPage('welcomeTitle', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                      placeholder="Halo, Pebisnis Modern!"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Sub-judul Selamat Datang (Welcome Subtitle)</label>
                    <textarea
                      value={systemSettings.userPageJson?.welcomeSubtitle || ''}
                      onChange={(e) => updateUserPage('welcomeSubtitle', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none min-h-[80px] resize-none"
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
                { label: "Puncak Kunjungan Harian", value: analyticsData ? `${analyticsData.totalViews.toLocaleString('id-ID')} HITS` : "0 HITS", trend: "Total Tayangan Publik" },
                { label: "Rasio Konversi SEO", value: analyticsData ? `${analyticsData.conversionScore}% SCORE` : "0% SCORE", trend: "Halaman Berhasil Diterbitkan" },
                { label: "Total Halaman Aktif", value: analyticsData ? `${analyticsData.activePages} SITUS` : "0 SITUS", trend: "Sedang Live di Publik" }
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
                <div className="h-64 flex items-center justify-center bg-slate-950/40 rounded-2xl p-4 border border-slate-800">
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
                <div className="h-64 flex flex-col justify-around bg-slate-950/40 rounded-2xl p-6 border border-slate-800">
                  {(analyticsData?.categoryDistribution || []).length > 0 ? (
                    analyticsData.categoryDistribution.map((bar: any, idx: number) => {
                      const colors = ["bg-emerald-500", "bg-brand-blue", "bg-purple-500", "bg-amber-500"];
                      const color = colors[idx % colors.length];
                      const totalPages = Math.max(landingPages.length, 1);
                      const width = `${Math.round((bar.count / totalPages) * 100)}%`;
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-[9px] font-black uppercase text-slate-300">
                            <span>{bar.name}</span>
                            <span className="text-white">{bar.count} situs</span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full ${color} rounded-full`} style={{ width }}></div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-slate-500 text-xs py-10">Belum ada data kategori</div>
                  )}
                  {/* .map((bar, idx) => ( */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: TRANSAKSI */}
        {adminView === 'transactions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex justify-between items-end">
              <div>
                <h2 className="text-md font-black uppercase tracking-widest text-slate-800 dark:text-white">Riwayat Transaksi</h2>
                <p className="text-[9.5px] text-slate-500 dark:text-slate-400 font-bold mt-1">Pantau semua pembelian paket token oleh pengguna</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Order ID</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">User</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Paket</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Jumlah</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Bukti Bayar</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Tanggal</th>
                      <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 px-6 text-center text-slate-500 text-xs">Belum ada transaksi</td>
                      </tr>
                    ) : (
                      transactions.map((trx, idx) => (
                        <tr key={idx} className="border-b border-slate-200 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-6 text-xs text-slate-800 dark:text-white font-mono">{trx.refId || '-'}</td>
                          <td className="py-4 px-6 text-xs text-slate-700 dark:text-slate-300">
                            <div className="font-bold">{trx.user?.name || 'Unknown'}</div>
                            <div className="text-[9px] text-slate-500">{trx.user?.email || ''}</div>
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-700 dark:text-slate-300 font-medium">{trx.packageName}</td>
                          <td className="py-4 px-6 text-xs text-emerald-600 dark:text-emerald-400 font-bold">Rp {trx.amount.toLocaleString('id-ID')}</td>
                          <td className="py-4 px-6">
                            {trx.proofImage ? (
                              <img 
                                src={trx.proofImage} 
                                alt="Bukti Transfer" 
                                onClick={() => setZoomReceiptUrl(trx.proofImage)}
                                className="w-10 h-10 object-cover rounded border border-slate-200 dark:border-slate-800 hover:scale-110 cursor-zoom-in transition-all"
                              />
                            ) : (
                              <span className="text-[10px] text-slate-400 font-medium">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                              trx.status === 'berhasil' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-500/20' :
                              trx.status === 'pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20' :
                              'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-500/20'
                            }`}>
                              {trx.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 font-medium">{new Date(trx.createdAt).toLocaleDateString('id-ID')}</td>
                          <td className="py-4 px-6 text-right">
                            {trx.status === 'pending' ? (
                              <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                                <button
                                  onClick={() => handleApproveTransaction(trx.id)}
                                  disabled={actionLoading === `approve-tx-${trx.id}`}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[8px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectTransaction(trx.id)}
                                  disabled={actionLoading === `reject-tx-${trx.id}`}
                                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[8px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleDeleteTransaction(trx.id)}
                                disabled={actionLoading === `delete-tx-${trx.id}`}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[8px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                {actionLoading === `delete-tx-${trx.id}` ? '...' : 'Hapus'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Receipt Zoom Modal */}
            {zoomReceiptUrl && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm" onClick={() => setZoomReceiptUrl(null)}>
                <div className="relative max-w-3xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                  <img src={zoomReceiptUrl} alt="Receipt Zoomed" className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-slate-800" />
                  <button onClick={() => setZoomReceiptUrl(null)} className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: KELOLA NOTIFIKASI */}
        {adminView === 'notifications' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <h2 className="text-md font-black uppercase tracking-widest text-slate-800 dark:text-white">Kelola & Kirim Notifikasi</h2>
              <p className="text-[9.5px] text-slate-500 dark:text-slate-400 font-bold mt-1">Kirim notifikasi broadcast ke semua pengguna atau secara spesifik per akun</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Kirim Notifikasi (Col Span 4) */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] p-6 shadow-sm h-fit">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white border-b border-slate-150 dark:border-slate-800/60 pb-3 mb-4">Buat Notifikasi</h3>
                
                <form onSubmit={handleSendNotification} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Target Penerima</label>
                    <select
                      value={newNotifData.targetUserId}
                      onChange={(e) => setNewNotifData({ ...newNotifData, targetUserId: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white outline-none"
                    >
                      <option value="ALL">📢 SEMUA PENGGUNA (Broadcast)</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>👤 {u.name} ({u.email})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Tipe Notifikasi</label>
                    <select
                      value={newNotifData.type}
                      onChange={(e) => setNewNotifData({ ...newNotifData, type: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white outline-none"
                    >
                      <option value="system">⚙️ Sistem</option>
                      <option value="token">⚡ Token / Finansial</option>
                      <option value="template">📁 Desain / Template</option>
                      <option value="welcome">✨ Selamat Datang</option>
                      <option value="success">✅ Sukses / Konfirmasi</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Judul Notifikasi</label>
                    <input
                      type="text"
                      placeholder="Masukkan judul notifikasi..."
                      value={newNotifData.title}
                      onChange={(e) => setNewNotifData({ ...newNotifData, title: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Pesan Notifikasi</label>
                    <textarea
                      placeholder="Tulis pesan lengkap di sini..."
                      value={newNotifData.message}
                      onChange={(e) => setNewNotifData({ ...newNotifData, message: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white outline-none min-h-[100px] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading === 'send-notif'}
                    className="w-full py-3.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md shadow-brand-blue/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {actionLoading === 'send-notif' ? 'Mengirim...' : 'Kirim Notifikasi'}
                  </button>
                </form>
              </div>

              {/* Tabel Riwayat Notifikasi (Col Span 8) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex justify-between items-center bg-white dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-800/60 rounded-2xl gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari notifikasi berdasarkan judul/pesan..."
                      value={notifSearchQuery}
                      onChange={(e) => setNotifSearchQuery(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-850 dark:text-white outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                          <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Pengguna</th>
                          <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Notifikasi</th>
                          <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Tipe</th>
                          <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Dibaca</th>
                          <th className="py-4 px-6 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const filtered = adminNotifications.filter(n => 
                            n.title.toLowerCase().includes(notifSearchQuery.toLowerCase()) ||
                            n.message.toLowerCase().includes(notifSearchQuery.toLowerCase()) ||
                            n.user?.name?.toLowerCase().includes(notifSearchQuery.toLowerCase()) ||
                            n.user?.email?.toLowerCase().includes(notifSearchQuery.toLowerCase())
                          );

                          if (filtered.length === 0) {
                            return (
                              <tr>
                                <td colSpan={5} className="py-8 px-6 text-center text-slate-500 text-xs">Belum ada riwayat notifikasi</td>
                              </tr>
                            );
                          }

                          return filtered.map((notif, idx) => (
                            <tr key={idx} className="border-b border-slate-200 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-4 px-6 text-xs text-slate-700 dark:text-slate-300">
                                <div className="font-bold">{notif.user?.name || 'Sistem'}</div>
                                <div className="text-[9px] text-slate-500">{notif.user?.email || 'System Message'}</div>
                              </td>
                              <td className="py-4 px-6 text-xs text-slate-800 dark:text-white max-w-[200px]">
                                <div className="font-bold truncate">{notif.title}</div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5 line-clamp-2">{notif.message}</div>
                              </td>
                              <td className="py-4 px-6 text-xs">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                  notif.type === 'token' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                                  notif.type === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                  notif.type === 'template' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                                  notif.type === 'welcome' ? 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/10 dark:text-fuchsia-400' :
                                  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                  {notif.type}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-xs">
                                <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded ${notif.isRead ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500' : 'bg-red-500/10 text-red-500'}`}>
                                  {notif.isRead ? 'Sudah' : 'Belum'}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => handleDeleteNotification(notif.id)}
                                  disabled={actionLoading === `delete-notif-${notif.id}`}
                                  className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  {actionLoading === `delete-notif-${notif.id}` ? '...' : 'Hapus'}
                                </button>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
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
              <form onSubmit={handleAddUser} className="space-y-4">
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
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <input
                    type="password"
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="Minimal 6 karakter"
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
            <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddTemplateModal(false)} />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] p-6 shadow-2xl space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Tambah Template Baru</h3>
              </div>
              <form onSubmit={handleAddTemplate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Nama Template</label>
                  <input
                    type="text"
                    value={newTemplateData.name}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                    placeholder="Masukkan nama template"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                  <select
                    value={newTemplateData.category}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                  >
                    <option value="Makanan & Retail">Makanan & Retail</option>
                    <option value="Jasa Profesional">Jasa Profesional</option>
                    <option value="Pertanian & Agribisnis">Pertanian & Agribisnis</option>
                    <option value="Portofolio Kreatif">Portofolio Kreatif</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={newTemplateData.description}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, description: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                    placeholder="Deskripsi template"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Thumbnail URL</label>
                  <input
                    type="text"
                    value={newTemplateData.thumbnail}
                    onChange={(e) => setNewTemplateData({ ...newTemplateData, thumbnail: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTemplateModal(false)}
                    className="flex-1 py-3 text-[9px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white uppercase tracking-widest border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl transition-all cursor-pointer"
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

        {/* MODAL: EDIT TEMPLATE */}
        {showEditTemplateModal && editTemplateData && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowEditTemplateModal(false)} />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] p-6 shadow-2xl space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Edit Template</h3>
                <button onClick={() => setShowEditTemplateModal(false)} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer">
                  <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
              <form onSubmit={handleEditTemplate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Nama Template</label>
                  <input
                    type="text"
                    value={editTemplateData.name || ''}
                    onChange={(e) => setEditTemplateData({ ...editTemplateData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                    placeholder="Masukkan nama template"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                  <select
                    value={editTemplateData.category || ''}
                    onChange={(e) => setEditTemplateData({ ...editTemplateData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                  >
                    <option value="Makanan & Retail">Makanan & Retail</option>
                    <option value="Jasa Profesional">Jasa Profesional</option>
                    <option value="Pertanian & Agribisnis">Pertanian & Agribisnis</option>
                    <option value="Portofolio Kreatif">Portofolio Kreatif</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={editTemplateData.description || ''}
                    onChange={(e) => setEditTemplateData({ ...editTemplateData, description: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                    placeholder="Deskripsi template"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Thumbnail URL</label>
                  <input
                    type="text"
                    value={editTemplateData.thumbnail || ''}
                    onChange={(e) => setEditTemplateData({ ...editTemplateData, thumbnail: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEditTemplateModal(false)}
                    className="flex-1 py-3 text-[9px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white uppercase tracking-widest border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === 'edit-template'}
                    className="flex-1 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center"
                  >
                    {actionLoading === 'edit-template' ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
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
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] p-8 shadow-sm space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">Informasi Akun</h3>
                  <div className="space-y-4 text-xs">
                    <div className="flex flex-col gap-1.5 p-3.5 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
                      <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">EMAIL OPERASIONAL</span>
                      <span className="text-slate-800 dark:text-white font-bold">admin@unilanfarm.com</span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3.5 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
                      <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">TIPE HAK AKSES</span>
                      <span className="text-brand-blue font-bold">SYSTEM ROOT ADMINISTRATOR</span>
                    </div>
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="w-full mt-8 py-3.5 text-[9px] font-black text-red-500 hover:text-red-600 hover:border-red-500/50 uppercase tracking-widest border border-red-500/20 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer animate-in duration-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout Akun
                  </button>
                )}
              </div>

              {/* Right Card: Change Password Form */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-[24px] p-8 shadow-sm">
                <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/60">Keamanan & Ubah Password</h3>
                <form onSubmit={handleAdminChangePassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Password Saat Ini</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Password Baru</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-all"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition-all"
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
