import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart as LucideLineChart, 
  Shield, 
  Plus, 
  Layout, 
  Layers, 
  Banknote, 
  User, 
  MoreHorizontal,
  Moon,
  Sun,
  Bell,
  X,
  LogOut,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  Globe,
  MessageSquare,
  Facebook,
  Music2,
  CreditCard,
  Mail,
  Wallet,
  Building2,
  Zap,
  TrendingUp,
  ChevronDown,
  Bot,
  BarChart3,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateWebsiteDraft } from '../../services/ai';
import ContentStructureEditor from '../ContentStructureEditor';
import PreviewLandingPage from '../PreviewLandingPage';
import DashboardPage from './DashboardPage';
import ContentPlanPage from './ContentPlanPage';
import RepositoryPage from './RepositoryPage';
import CmsPage from './CmsPage';
import LandingPagePage from './LandingPagePage';
import TemplatePage from './TemplatePage';
import ProfilePage from './ProfilePage';
import AdminPanelPage from './AdminPanelPage';
import AllProjectsPage from './AllProjectsPage';
import NotificationsView from './NotificationsView';
import { Folder } from 'lucide-react';

interface DashboardFooterProps {
  setView: (v: string) => void;
  setSubView: (v: string) => void;
  systemSettings?: any;
}

export const DashboardFooter = ({ setView, setSubView, systemSettings }: DashboardFooterProps) => (
  <footer className="py-12 px-6 print:py-4 border-t border-slate-100 dark:border-slate-800 print:border-none bg-white dark:bg-slate-950 print:bg-transparent relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent print:hidden"></div>

    <div className="max-w-6xl mx-auto relative z-10 print:flex print:flex-col print:items-center print:-mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 w-full print:block print:mb-2 print:text-center">
        <div className="col-span-1 md:col-span-1 print:flex print:justify-center">
          <div className="h-[96px] flex items-center cursor-pointer group w-fit print:h-20" onClick={() => setView('home')}>
            {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
              <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[96px] print:h-20 object-contain" />
            ) : (
              <img src="/logo.png?v=8" alt="Uni-LandFarm Logo" className="h-[96px] print:h-20 object-contain" />
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium max-w-xs print:hidden">
            Platform revolusioner untuk membangun dan mengelola ekosistem digital bisnis modern dengan kekuatan Agentic AI.
          </p>
          <div className="flex gap-4 print:hidden">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white transition-all shadow-sm hover:shadow-blue"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="print:hidden">
          <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Platform</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><button onClick={() => setView('features')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Fitur Utama <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setSubView('templates')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Pustaka Template <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setSubView('cms')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">AI Generator <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setSubView('buat_situs')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Integrasi API <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div className="print:hidden">
          <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Sumber Daya</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><button onClick={() => setSubView('buat_situs')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Tentang Kami <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setSubView('panduan')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Blog Bisnis <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setSubView('panduan')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Pusat Bantuan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
            <li><button onClick={() => setSubView('panduan')} className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Komunitas <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></button></li>
          </ul>
        </div>

        <div className="print:hidden">
          <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Legal</h4>
          <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Kebijakan Privasi <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Ketentuan Layanan <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2 group text-left cursor-pointer">Kebijakan Cookie <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
          </ul>
        </div>
      </div>

      <div className="pt-10 print:pt-0 border-t border-slate-100 dark:border-slate-800 print:border-none flex flex-col md:flex-row justify-between print:justify-center items-center gap-6 print:gap-1">
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium print:text-center print:text-xs">
          {systemSettings?.footerText || "© 2026 Platform Uni-LandFarm. Hak cipta dilindungi undang-undang."}
        </p>
        <div className="flex gap-8 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest print:hidden">
          <a href="#" className="hover:text-brand-blue transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Ketentuan Layanan</a>
        </div>
      </div>
    </div>
  </footer>
);

interface DashboardViewProps {
  setView: (v: string) => void;
  theme: string;
  toggleTheme: () => void;
  user: any;
  setUser: (u: any) => void;
  systemSettings: any;
  setSystemSettings: (s: any) => void;
  initialTab?: string;
}

export const DashboardView = ({ 
  setView, 
  theme, 
  toggleTheme, 
  user, 
  setUser, 
  systemSettings, 
  setSystemSettings,
  initialTab
}: DashboardViewProps) => {
  const [subView, setSubView] = useState(() => initialTab || (user?.role === 'ADMIN' ? 'admin_panel' : 'overview'));
  const [adminView, setAdminView] = useState<'dashboard' | 'users' | 'landing_pages' | 'templates' | 'content' | 'profile' | 'analytics'>('dashboard');
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  useEffect(() => {
    if (user?.role === 'ADMIN' && subView !== 'admin_panel') {
      setSubView('admin_panel');
    }
  }, [user, subView]);

  const handleSetSubView = (val: string) => {
    if (user?.role === 'ADMIN') return;
    setSubView(val);
  };
  const [isCmsEditorOpen, setIsCmsEditorOpen] = useState(false);
  const [selectedEditorSection, setSelectedEditorSection] = useState('Hero Section');
  const [cmsNavMode, setCmsNavMode] = useState('landing'); // 'landing', 'manual', 'ai', 'editor', 'preview', 'drafts', 'setup-progress'

  const [cmsSubTab, setCmsSubTab] = useState('manual');
  const [cmsSearchQuery, setCmsSearchQuery] = useState('');
  const [cmsCurrentPage, setCmsCurrentPage] = useState(1);
  const [guideSearchQuery, setGuideSearchQuery] = useState('');
  const [cmsPosts, setCmsPosts] = useState<any[]>([]);
  const [selectedCmsProjectId, setSelectedCmsProjectId] = useState<string>('');
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('Profesional');
  const [aiLength, setAiLength] = useState('Sedang (600 kata)');
  const [isGeneratingAiPost, setIsGeneratingAiPost] = useState(false);
  const [aiPostProgress, setAiPostProgress] = useState(0);
  const [aiPostStepText, setAiPostStepText] = useState('');
  const [isSmartScheduling, setIsSmartScheduling] = useState(true);
  const [aiSchedulerFrequency, setAiSchedulerFrequency] = useState('3 postingan / minggu');
  const [aiPrompt, setAiPrompt] = useState('');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedAiFeatures, setSelectedAiFeatures] = useState<string[]>(['Headline', 'Subheadline']);

  const [aiData, setAiData] = useState({
    description: '',
    target: '',
    style: 'Modern & Sleek'
  });

  const [manualData, setManualData] = useState({
    name: '',
    subdomain: '',
    category: 'E-Commerce / Toko Online',
    template: 'Modern Dark Pro (Recommended)',
    color: '#3B82F6',
    description: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const menuItems = [
    { id: 'overview', icon: <LucideLineChart className="w-5 h-5" />, label: 'Dashboard' },
    ...(user?.role === 'ADMIN' ? [{ id: 'admin_panel', icon: <Shield className="w-5 h-5" />, label: 'Admin Panel' }] : []),
    { id: 'buat_situs', icon: <Plus className="w-5 h-5" />, label: 'Create Site' },
    { id: 'all_projects', icon: <Folder className="w-5 h-5" />, label: 'All Projects' },
    { id: 'templates', icon: <Layout className="w-5 h-5" />, label: 'Templates' },
    { id: 'cms', icon: <Layers className="w-5 h-5" />, label: 'CMS' },
    { id: 'tokens', icon: <Banknote className="w-5 h-5" />, label: 'Buy Tokens' },
  ];

  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [showAdminNoteModal, setShowAdminNoteModal] = useState<string | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/landing-pages');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setUserProjects(data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil daftar proyek:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }
    try {
      showNotification("Menghapus proyek...", "info");
      const res = await fetch(`/api/landing-pages/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Proyek berhasil dihapus!", "success");
        fetch('/api/notifications', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'Proyek Dihapus', message: `Proyek/website telah berhasil dihapus.`, type: 'info' }) 
        });
        fetchProjects();
      } else {
        showNotification(data.message || "Gagal menghapus proyek.", "info");
      }
    } catch (err) {
      console.error(err);
      showNotification("Terjadi kesalahan koneksi.", "info");
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTemplates(data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil daftar template:", err);
    }
  };

  const handlePublishRequest = async (pageId: string) => {
    if (!pageId) return;
    try {
      showNotification('Mengajukan permintaan publikasi...', 'info');
      const res = await fetch(`/api/landing-pages/${pageId}/publish-request`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Permintaan publikasi berhasil diajukan!', 'success');
        fetchProjects();
      } else {
        showNotification(data.message || 'Gagal mengajukan publikasi.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setView('home');
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCmsPosts(data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil daftar artikel:", err);
    }
  };

  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.error("Gagal mengambil notifikasi:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch('/api/notifications', { method: 'PATCH' });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (err) {}
  };

  const handleMarkRead = async (id: number) => {
    try {
      // Optimistically update the state
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      await fetch('/api/notifications', { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (err) {}
  };

  const handleClearAllNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', { method: 'DELETE' });
      if (res.ok) {
        setNotifications([]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchTemplates();
    fetchProjects();
    fetchArticles();
    fetchNotifications();
  }, []);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Anderson',
    email: user?.email || 'user@landfarm.id',
    phone: user?.phone || '0812-3456-7890',
    location: user?.location || 'Jakarta, ID'
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showNotification('Konfirmasi password baru tidak cocok.', 'info');
      return;
    }
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message || 'Password berhasil diperbarui!', 'success');
        setIsChangingPassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Refresh session to get updated provider/password status
        const meRes = await fetch('/api/auth/me');
        const meData = await meRes.json();
        if (meData.success && meData.data) {
          setUser(meData.data);
        }
      } else {
        showNotification(data.message || 'Gagal memperbarui password.', 'info');
      }
    } catch (err) {
      showNotification("Gagal mengambil proyek, silakan coba lagi.", "info");
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        location: user.location || ''
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          location: profileData.location
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
        setIsEditingProfile(false);
        showNotification('Profil berhasil diperbarui!', 'success');
      } else {
        showNotification(data.message || 'Gagal memperbarui profil.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      showNotification('Mengunggah foto profil...', 'info');
      const uploadRes = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success && uploadData.data) {
        const fileUrl = uploadData.data.fileUrl;

        const updateRes = await fetch('/api/users/me', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: fileUrl })
        });
        const updateData = await updateRes.json();
        if (updateData.success && updateData.data) {
          setUser(updateData.data);
          showNotification('Foto profil berhasil diperbarui!', 'success');
        } else {
          showNotification(updateData.message || 'Gagal menyimpan foto profil.', 'info');
        }
      } else {
        showNotification(uploadData.message || 'Gagal mengunggah gambar.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi.', 'info');
    }
  };

  const [showDomainManager, setShowDomainManager] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [businessData, setBusinessData] = useState({
    name: '',
    category: '',
    product: '',
    target: '',
    tone: 'Profesional',
    theme: 'Modern Blue',
    cta: ''
  });
  const [agenticStrategy, setAgenticStrategy] = useState<any>(null);
  const [generatedDraft, setGeneratedDraft] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    setShowDomainManager(false);
  }, [subView]);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAiBuild = async () => {
    if (user?.tokens < 1500) {
      showNotification('Token Anda tidak cukup (butuh 1500). Silakan beli token terlebih dahulu.', 'info');
      setSubView('tokens');
      return;
    }

    const errors: Record<string, string> = {};
    if (!aiData.description.trim()) errors.description = 'Deskripsi bisnis wajib diisi';
    if (!aiData.target.trim()) errors.target = 'Target audiens wajib diisi';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsGenerating(true);
    setGenProgress(0);

    // Simulation steps
    const steps = [
      { progress: 20, text: 'Menganalisis deskripsi bisnis...' },
      { progress: 40, text: 'Merancang struktur halaman...' },
      { progress: 60, text: 'Menyiapkan aset visual...' },
      { progress: 85, text: 'Mengoptimasi konten SEO...' },
      { progress: 100, text: 'Selesai!' }
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600));
      setGenProgress(step.progress);
    }

    try {
      const draft = await generateWebsiteDraft(
        'Situs Bisnis AI',
        'General',
        aiData.description
      );

      const finalDraft = {
        ...draft,
        isAiGenerated: true,
        sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer']
      };
      setGeneratedDraft(finalDraft);
      setSelectedColor(draft.themeColor);

      try {
        const res = await fetch('/api/landing-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: 1,
            title: 'Situs Bisnis AI',
            businessName: 'Situs Bisnis AI',
            slug: 'situs-bisnis-ai-' + Math.floor(Math.random() * 1000),
            contentJson: finalDraft,
            tokenCost: 1500
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          setActivePageId(data.data.id);
          fetchProjects();
        }
      } catch (err) {
        console.error('Failed saving generated AI draft to DB:', err);
      }

      setUser({ ...user, tokens: user.tokens - 1500 });
      setCmsNavMode('preview');
      showNotification('Website berhasil dibangun!', 'success');
    } catch (error) {      const defaultDraft = {
        headline: 'Selamat Datang di Bisnis Kami',
        subheadline: aiData.description,
        cta: 'Mulai Sekarang',
        url: 'uni-landfarm.ai/preview-site',
        sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer'],
        themeColor: '#3b82f6',
        isAiGenerated: true
      };
      setGeneratedDraft(defaultDraft);
      setSelectedColor('#3b82f6');

      try {
        const res = await fetch('/api/landing-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: 1,
            title: 'Situs Bisnis AI',
            businessName: 'Situs Bisnis AI',
            slug: 'situs-bisnis-ai-' + Math.floor(Math.random() * 1000),
            contentJson: defaultDraft,
            tokenCost: 1500
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          setActivePageId(data.data.id);
          fetchProjects();
        }
      } catch (err) {
        console.error('Failed saving default AI draft to DB:', err);
      }

      setUser({ ...user, tokens: user.tokens - 1500 });
      setCmsNavMode('preview');;
      showNotification('Gagal menghubungi AI, menggunakan draf default.', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualSetup = async () => {
    if (user?.tokens < 500) {
      showNotification('Token Anda tidak cukup (butuh 500). Silakan beli token terlebih dahulu.', 'info');
      setSubView('tokens');
      return;
    }

    const errors: Record<string, string> = {};
    if (!manualData.name.trim()) errors.name = 'Nama website wajib diisi';
    if (!manualData.subdomain.trim()) errors.subdomain = 'Domain wajib diisi';
    if (!manualData.description.trim()) errors.description = 'Deskripsi bisnis wajib diisi';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsGenerating(true);
    setGenProgress(0);

    const steps = [
      { progress: 20, text: 'Menyiapkan konfigurasi...' },
      { progress: 50, text: 'Membuat struktur dasar...' },
      { progress: 80, text: 'Menerapkan tema...' },
      { progress: 100, text: 'Selesai!' }
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 400));
      setGenProgress(step.progress);
    }

    try {
      const draft = await generateWebsiteDraft(
        manualData.name,
        manualData.category,
        manualData.description
      );

      const finalDraft = {
        ...draft,
        isAiGenerated: true,
        sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer']
      };
      setGeneratedDraft(finalDraft);
      setSelectedColor(manualData.color);

      try {
        const res = await fetch('/api/landing-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: 1,
            title: manualData.name,
            businessName: manualData.name,
            slug: manualData.subdomain,
            category: manualData.category,
            description: manualData.description,
            themeColor: manualData.color,
            contentJson: finalDraft,
            tokenCost: 500
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          setActivePageId(data.data.id);
          fetchProjects();
        }
      } catch (err) {
        console.error('Failed saving generated draft to DB:', err);
      }

      setUser({ ...user, tokens: user.tokens - 500 });


      setCmsNavMode('preview');
      showNotification('Website berhasil dikonfigurasi!', 'success');
    } catch (error: any) {
      console.error(error);
      const defaultDraft = {
        headline: manualData.name,
        subheadline: manualData.description,
        cta: 'Mulai Sekarang',
        url: manualData.subdomain + '.unilandfarm.ai',
        sections: ['Hero Section', 'Tentang Kami', 'Produk/Layanan', 'Galeri', 'CTA', 'Footer'],
        themeColor: manualData.color,
        isAiGenerated: true
      };
      setGeneratedDraft(defaultDraft);
      setSelectedColor(manualData.color);

      try {
        const res = await fetch('/api/landing-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: 1,
            title: manualData.name,
            businessName: manualData.name,
            slug: manualData.subdomain,
            category: manualData.category,
            description: manualData.description,
            themeColor: manualData.color,
            contentJson: defaultDraft,
            tokenCost: 500
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          setActivePageId(data.data.id);
          fetchProjects();
        }
      } catch (err) {
        console.error('Failed saving default draft to DB:', err);
      }
      
      setUser({ ...user, tokens: user.tokens - 500 });

      setCmsNavMode('preview');
      showNotification(error.message || 'Gagal memproses draf. Draf default digunakan.', 'info');
    } finally {
      setIsGenerating(false);
    }
  };



  const handleGenerateAiPost = async () => {
    if (!aiTopic.trim()) {
      showNotification('Silakan isi topik atau judul artikel terlebih dahulu!', 'info');
      return;
    }

    setIsGeneratingAiPost(true);
    setAiPostProgress(0);

    const steps = [
      { progress: 15, text: 'Melakukan riset kompetitor & keyword SEO...' },
      { progress: 35, text: 'Menyusun outline & kerangka heading artikel...' },
      { progress: 60, text: 'Membangkitkan konten berkualitas tinggi menggunakan AI...' },
      { progress: 85, text: 'Mengoptimasi kepadatan kata kunci & meta tag...' },
      { progress: 100, text: 'Menyimpan artikel ke draf CMS...' }
    ];

    for (const step of steps) {
      setAiPostStepText(step.text);
      await new Promise(r => setTimeout(r, 600));
      setAiPostProgress(step.progress);
    }

    // Determine target project name for article association
    let projectType = 'Blog Post';
    if (selectedCmsProjectId) {
      const proj = userProjects.find(p => String(p.id) === String(selectedCmsProjectId));
      if (proj) {
        projectType = proj.name; // Use the project's businessName as type/badge
      }
    }

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aiTopic,
          status: 'Draft',
          author: 'Agentic AI Writer',
          scoreBefore: Math.floor(Math.random() * 20) + 40,
          scoreAfter: Math.floor(Math.random() * 15) + 85,
          type: projectType
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCmsPosts(prev => [data.data, ...prev]);
        showNotification('Artikel AI berhasil dibuat dan disimpan ke Draf!', 'success');
      } else {
        showNotification(data.message || 'Gagal menyimpan artikel ke database.', 'info');
      }
    } catch (err) {
      console.error(err);
      showNotification('Terjadi kesalahan koneksi saat menyimpan artikel.', 'info');
    } finally {
      setIsGeneratingAiPost(false);
      setAiTopic('');
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      return;
    }
    try {
      showNotification("Menghapus artikel...", "info");
      const res = await fetch(`/api/articles?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Artikel berhasil dihapus!", "success");
        setCmsPosts(prev => prev.filter(p => p.id !== id));
      } else {
        showNotification(data.message || "Gagal menghapus artikel.", "info");
      }
    } catch (err) {
      console.error(err);
      showNotification("Terjadi kesalahan koneksi.", "info");
    }
  };

  const [activeTemplateFilter, setActiveTemplateFilter] = useState('Semua');
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  // States for creation modal
  const [templateForCreation, setTemplateForCreation] = useState<any>(null);
  const [creationWebsiteTitle, setCreationWebsiteTitle] = useState('');
  const [creationBusinessName, setCreationBusinessName] = useState('');
  const [creationSlug, setCreationSlug] = useState('');
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);

  const handleCreatePageFromTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.tokens < 500) {
      showNotification('Token Anda tidak cukup (butuh 500). Silakan beli token terlebih dahulu.', 'info');
      setSubView('tokens');
      return;
    }
    
    if (!creationWebsiteTitle.trim() || !creationBusinessName.trim() || !creationSlug.trim()) {
      setCreationError('Semua field wajib diisi.');
      return;
    }

    setIsCreatingPage(true);
    setCreationError(null);

    try {
      const res = await fetch('/api/landing-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: templateForCreation.id,
          title: creationWebsiteTitle.trim(),
          businessName: creationBusinessName.trim(),
          slug: creationSlug.trim().toLowerCase().replace(/\s+/g, '-'),
          contentJson: templateForCreation.defaultContent
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setUser({ ...user, tokens: user.tokens - 500 });
        showNotification('Situs baru berhasil dibuat dari template!', 'success');
        setTemplateForCreation(null);
        setCreationWebsiteTitle('');
        setCreationBusinessName('');
        setCreationSlug('');
        
        await fetchProjects();
        
        setActivePageId(data.data.id);
        setIsCmsEditorOpen(true);
      } else {
        if (data.status === 402 || data.message?.includes('Token')) {
          setSubView('tokens');
          setTemplateForCreation(null);
          showNotification('Token Anda tidak cukup. Silakan beli token.', 'info');
        } else {
          setCreationError(data.message || 'Gagal membuat situs.');
        }
      }
    } catch (err) {
      setCreationError('Terjadi kesalahan koneksi.');
    } finally {
      setIsCreatingPage(false);
    }
  };

  const mappedLibraryTemplates = templates.map(t => ({
    id: t.id,
    title: t.name,
    category: t.category,
    img: t.thumbnail || "https://picsum.photos/seed/design/800/600",
    description: t.description,
    defaultContent: t.defaultContent,
    type: "Landing Page"
  }));

  const filteredLibraryTemplates = activeTemplateFilter === 'Semua'
    ? mappedLibraryTemplates
    : mappedLibraryTemplates.filter(t => t.category === activeTemplateFilter);

  const templateCategories = ['Semua', ...Array.from(new Set(templates.map(t => t.category)))];

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (activePageId) {
        await fetch(`/api/landing-pages/${activePageId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Published' })
        });
      }
      showNotification('Situs berhasil dipublikasikan!');
      await fetchProjects();
      setSubView('overview');
      setCmsNavMode('landing');
    } catch (err) {
      showNotification('Gagal mempublikasikan situs', 'info');
    } finally {
      setIsPublishing(false);
    }
  };

  const [integrations, setIntegrations] = useState([
    { name: "Domain Kustom", icon: <Globe className="text-brand-blue" />, status: "Tersedia", color: "bg-blue-50" },
    { name: "Instagram Business", icon: <Instagram className="text-pink-500" />, status: "Hubungkan", color: "bg-pink-50" },
    { name: "WhatsApp Business", icon: <MessageSquare className="text-emerald-500" />, status: "Terhubung", color: "bg-emerald-50" },
    { name: "Facebook Pixel", icon: <Facebook className="text-blue-600" />, status: "Terhubung", color: "bg-blue-50" },
    { name: "Google Analytics", icon: <BarChart3 className="text-amber-500" />, status: "Hubungkan", color: "bg-amber-50" },
    { name: "TikTok Ads", icon: <Music2 className="text-pink-500" />, status: "Hubungkan", color: "bg-pink-50" },
    { name: "Payment Gateway", icon: <CreditCard className="text-indigo-500" />, status: "Hubungkan", color: "bg-indigo-50" },
    { name: "Email Marketing", icon: <Mail className="text-orange-500" />, status: "Hubungkan", color: "bg-orange-50" },
  ]);

  const toggleIntegration = (index: number) => {
    const newIntegrations = [...integrations];
    newIntegrations[index].status = newIntegrations[index].status === 'Terhubung' ? 'Hubungkan' : 'Terhubung';
    setIntegrations(newIntegrations);
  };

  const renderSubView = () => {
    switch (subView) {
      case 'admin_panel':
        return (
          <AdminPanelPage
            showNotification={showNotification}
            onSwitchToUserView={() => setSubView('overview')}
            onSettingsUpdate={setSystemSettings}
            adminView={adminView}
            setAdminView={setAdminView}
          />
        );
      case 'all_projects':
        return (
          <AllProjectsPage
            userProjects={userProjects}
            showNotification={showNotification}
            setSubView={setSubView}
            setActivePageId={setActivePageId}
            setIsCmsEditorOpen={setIsCmsEditorOpen}
            fetchProjects={fetchProjects}
          />
        );
      case 'panduan':
        return <ContentPlanPage guideSearchQuery={guideSearchQuery} />;
      case 'tokens':
        return (
          <RepositoryPage 
            showNotification={showNotification} 
            user={user}
            onTokenUpdate={(newTokens) => setUser({ ...user, tokens: newTokens })}
          />
        );
      case 'overview':
        return (
          <DashboardPage
            systemSettings={systemSettings}
            user={user}
            userProjects={userProjects}
            showNotification={showNotification}
            setSubView={setSubView}
            setActivePageId={setActivePageId}
            setIsCmsEditorOpen={setIsCmsEditorOpen}
            setShowAdminNoteModal={setShowAdminNoteModal}
            fetchProjects={fetchProjects}
          />
        );
      case 'templates':
        return (
          <TemplatePage
            templateCategories={templateCategories}
            filteredLibraryTemplates={filteredLibraryTemplates}
            activeTemplateFilter={activeTemplateFilter}
            setActiveTemplateFilter={setActiveTemplateFilter}
            previewTemplate={previewTemplate}
            setPreviewTemplate={setPreviewTemplate}
            templateForCreation={templateForCreation}
            setTemplateForCreation={(tpl) => {
              if (tpl && user?.tokens < 500) {
                showNotification('Token Anda tidak cukup (butuh 500). Silakan beli token terlebih dahulu.', 'info');
                setSubView('tokens');
                return;
              }
              setTemplateForCreation(tpl);
            }}
            creationWebsiteTitle={creationWebsiteTitle}
            setCreationWebsiteTitle={setCreationWebsiteTitle}
            creationBusinessName={creationBusinessName}
            setCreationBusinessName={setCreationBusinessName}
            creationSlug={creationSlug}
            setCreationSlug={setCreationSlug}
            isCreatingPage={isCreatingPage}
            creationError={creationError}
            handleCreatePageFromTemplate={handleCreatePageFromTemplate}
          />
        );
      case 'billing':
        return (
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Penagihan & Langganan</h2>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Kelola langganan dan riwayat transaksi Anda.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* CURRENT PLAN */}
                <div className="bg-slate-900 dark:bg-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-premium transition-colors duration-300">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-brand-blue rounded-full text-base font-black uppercase tracking-widest">Paket Saat Ini</div>
                        <span className="text-4xl font-black tracking-tight">AKUN PRO</span>
                      </div>
                      <p className="text-slate-400 text-xl font-medium max-w-sm">Anda menikmati akses penuh ke semua fitur Agentic AI dan integrasi tanpa batas.</p>
                      <div className="flex items-center gap-6 pt-4">
                        <div>
                          <p className="text-base font-black text-slate-500 uppercase tracking-widest mb-1">Penagihan Berikutnya</p>
                          <p className="text-xl font-black">15 April 2024</p>
                        </div>
                        <div>
                          <p className="text-base font-black text-slate-500 uppercase tracking-widest mb-1">Jumlah</p>
                          <p className="text-xl font-black">Rp 299.000</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => showNotification('Fitur Manajemen Paket akan segera hadir!', 'info')}
                      className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                    >
                      Kelola Paket
                    </button>
                  </div>
                </div>

                {/* INVOICE TABLE */}
                <div className="bg-gradient-to-br from-white to-blue-50/15 dark:from-slate-900/60 dark:to-slate-950/60 rounded-[32px] border border-slate-200/60 dark:border-slate-800/80 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.06)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.15)] overflow-hidden hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300">
                  <div className="p-6 border-b border-slate-50 dark:border-slate-800/50">
                    <h4 className="text-base font-black text-slate-400 uppercase tracking-widest">Riwayat Transaksi</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                          <th className="px-6 py-4 text-base font-black text-slate-400 uppercase tracking-widest">ID Faktur</th>
                          <th className="px-6 py-4 text-base font-black text-slate-400 uppercase tracking-widest">Tanggal</th>
                          <th className="px-6 py-4 text-base font-black text-slate-400 uppercase tracking-widest">Jumlah</th>
                          <th className="px-6 py-4 text-base font-black text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="px-6 py-4 text-base font-black text-slate-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {[
                          { id: "#INV-8821", date: "15 Mar 2024", amount: "Rp 299.000", status: "Lunas" },
                          { id: "#INV-7712", date: "15 Feb 2024", amount: "Rp 299.000", status: "Lunas" },
                          { id: "#INV-6603", date: "15 Jan 2024", amount: "Rp 299.000", status: "Lunas" },
                        ].map((inv, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 text-lg font-black text-slate-900 dark:text-white">{inv.id}</td>
                            <td className="px-6 py-4 text-lg font-bold text-slate-500 dark:text-slate-400">{inv.date}</td>
                            <td className="px-6 py-4 text-lg font-black text-slate-900 dark:text-white">{inv.amount}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-500 text-base font-black rounded-lg uppercase tracking-widest">{inv.status}</span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-brand-blue hover:underline text-base font-black uppercase tracking-widest">Unduh</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* PAYMENT METHODS */}
                <div className="bg-gradient-to-br from-white to-blue-50/15 dark:from-slate-900/60 dark:to-slate-950/60 rounded-[32px] border border-slate-200/60 dark:border-slate-800/80 shadow-[0_10px_35px_-5px_rgba(255,176,0,0.06)] dark:shadow-[0_15px_40px_-5px_rgba(255,176,0,0.15)] p-8 hover:border-brand-blue/20 dark:hover:border-brand-blue/30 transition-all duration-300">
                  <h4 className="text-base font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Metode Pembayaran</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border-2 border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-brand-blue" />
                        <div>
                          <p className="text-lg font-black text-slate-900 dark:text-white">Visa •••• 4242</p>
                          <p className="text-base font-bold text-slate-400 dark:text-slate-500 uppercase">Kedaluwarsa 12/26</p>
                        </div>
                      </div>
                      <div className="w-4 h-4 bg-brand-blue rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between hover:border-slate-200 dark:hover:border-slate-700 dark:bg-slate-900/40 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-lg font-black text-slate-900 dark:text-white">GoPay Wallet</p>
                          <p className="text-base font-bold text-slate-400 dark:text-slate-500 uppercase">Terhubung</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => showNotification('Fitur Tambah Metode Pembayaran akan segera hadir!', 'info')}
                      className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-base font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue dark:hover:text-brand-blue dark:hover:border-brand-blue transition-all"
                    >
                      Tambah Metode Baru
                    </button>
                  </div>
                </div>

                {/* UPGRADE BANNER */}
                <div className="bg-gradient-to-br from-purple-600 to-brand-blue rounded-[32px] p-8 text-white shadow-xl shadow-brand-blue/20">
                  <Building2 className="w-10 h-10 mb-6 opacity-50" />
                  <h4 className="text-2xl font-black mb-2">Paket Enterprise</h4>
                  <p className="text-lg text-white/70 font-medium mb-6 leading-relaxed">Butuh kontrol lebih untuk tim besar? Dapatkan fitur kustom dan dukungan prioritas 24/7.</p>
                  <button
                    onClick={() => showNotification('Menghubungkan ke Tim Sales...', 'info')}
                    className="w-full py-3 bg-white text-purple-600 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'buat_situs':
        return (
          <LandingPagePage
            user={user}
            showNotification={showNotification}
            cmsNavMode={cmsNavMode}
            setCmsNavMode={setCmsNavMode}
            genProgress={genProgress}
            isGenerating={isGenerating}
            generatedDraft={generatedDraft}
            manualData={manualData}
            setManualData={setManualData}
            aiData={aiData}
            setAiData={setAiData}
            formErrors={formErrors}
            handleAiBuild={handleAiBuild}
            handleManualSetup={handleManualSetup}
            handlePublish={handlePublish}
            setSubView={setSubView}
            setCmsSubTab={setCmsSubTab}
            isPublishing={isPublishing}
          />
        );
      case 'notifications':
        return (
          <NotificationsView 
            user={user} 
            notifications={notifications.map(n => ({
              id: n.id,
              type: n.type,
              title: n.title,
              desc: n.message,
              time: new Date(n.createdAt).toLocaleDateString(),
              read: n.isRead
            }))}
            onMarkAllRead={handleMarkAllRead}
            onMarkRead={handleMarkRead}
            onClearAll={handleClearAllNotifications}
          />
        );
      case 'cms':
        return (
          <CmsPage
            cmsPosts={cmsPosts}
            setCmsPosts={setCmsPosts}
            cmsSearchQuery={cmsSearchQuery}
            setCmsSearchQuery={setCmsSearchQuery}
            cmsCurrentPage={cmsCurrentPage}
            setCmsCurrentPage={setCmsCurrentPage}
            userProjects={userProjects}
            selectedCmsProjectId={selectedCmsProjectId}
            setSelectedCmsProjectId={setSelectedCmsProjectId}
            aiTopic={aiTopic}
            setAiTopic={setAiTopic}
            aiTone={aiTone}
            setAiTone={setAiTone}
            aiLength={aiLength}
            setAiLength={setAiLength}
            isGeneratingAiPost={isGeneratingAiPost}
            aiPostProgress={aiPostProgress}
            aiPostStepText={aiPostStepText}
            handleGenerateAiPost={handleGenerateAiPost}
            handleDeleteArticle={handleDeleteArticle}
            setActivePageId={setActivePageId}
            setIsCmsEditorOpen={setIsCmsEditorOpen}
            handleDeleteProject={handleDeleteProject}
          />
        );

      case 'preview_page': {
        return (
          <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
            <PreviewLandingPage
              pageId={activePageId || userProjects[0]?.id || ''}
              onBack={() => setSubView('cms')}
              onPublishSuccess={() => {
                fetchProjects();
                setSubView('cms');
              }}
            />
          </div>
        );
      }

      case 'profile': {
        return (
          <ProfilePage
            user={user}
            profileData={profileData}
            setProfileData={setProfileData}
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
            handleSaveProfile={handleSaveProfile}
            handleProfileImageChange={handleProfileImageChange}
            profileImageInputRef={profileImageInputRef}
            setIsChangingPassword={setIsChangingPassword}
            setOldPassword={setOldPassword}
            setNewPassword={setNewPassword}
            setConfirmPassword={setConfirmPassword}
            setShowLogoutConfirm={setShowLogoutConfirm}
          />
        );
      }
      default:
        return (
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <MoreHorizontal className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">Halaman Sedang Dikembangkan</h3>
            <p className="text-xl text-slate-500 max-w-sm mb-8 font-medium">
              Fitur <span className="text-brand-blue font-black uppercase">{subView}</span> akan segera hadir untuk meningkatkan pengalaman Anda.
            </p>
            <button
              onClick={() => setSubView('overview')}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-lg"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  const isEditorActive = isCmsEditorOpen || (subView === 'cms' && cmsSubTab === 'editor');
  const isAdminPanelActive = subView === 'admin_panel';

  return isEditorActive ? (
    <ContentStructureEditor
      pageId={activePageId || userProjects[0]?.id || ''}
      onBack={() => {
        setIsCmsEditorOpen(false);
        if (cmsSubTab === 'editor') {
          setCmsSubTab('manual');
        }
      }}
      onPublishSuccess={() => {
        fetchProjects();
      }}
      onCreateNewPage={() => {
        setIsCmsEditorOpen(false);
        setSubView('buat_situs');
      }}
    />
  ) : (
    <>
      {isAdminPanelActive ? (
        <div className="min-h-screen bg-[#070b19] dark:bg-[#070b19] bg-slate-50 flex flex-col font-sans relative pt-[72px] transition-colors duration-300">
          {/* ADMIN PERSISTENT HEADER BAR */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#070b19] border-b border-slate-200 dark:border-slate-800/60 h-[72px] flex items-center justify-between px-8 text-slate-800 dark:text-white transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div
                className="cursor-pointer hover:scale-105 transition-all"
                onClick={() => setView('home')}
              >
                {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
                  <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[88px] object-contain" />
                ) : (
                  <img src="/logo.png?v=8" alt="Logo" className="h-[88px] object-contain" />
                )}
              </div>
              <div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-md text-[8px] font-black uppercase tracking-wider">
                  Admin Panel
                </span>
                <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mt-0.5">Control Center</span>
              </div>
            </div>

            <div className="flex items-center gap-6 relative">
              {/* Dark/Light Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-brand-blue dark:hover:text-brand-blue transition-all cursor-pointer shadow-sm border-none flex items-center justify-center"
                title="Ganti Tema"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>

              {/* Admin User Info with Dropdown */}
              <div 
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-lg font-black uppercase tracking-tighter leading-none mb-1 text-slate-200 group-hover:text-brand-blue transition-colors">
                    Uni-Inside Administrator
                  </p>
                  <div className="flex items-center justify-end gap-1.5 leading-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Root Admin
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-sm overflow-hidden group-hover:border-brand-blue/50 transition-colors">
                  <div className="w-full h-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg font-black uppercase">
                    U
                  </div>
                </div>
              </div>

              {/* Admin Header Dropdown */}
              {isAdminDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsAdminDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 top-12 z-45 w-48 bg-[#0b1226] border border-slate-800 rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => {
                        setAdminView('profile');
                        setIsAdminDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left text-base font-black uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setAdminView('profile');
                        setIsAdminDropdownOpen(false);
                        setTimeout(() => {
                          const el = document.querySelector('input[placeholder="••••••••"]');
                          if (el) (el as HTMLInputElement).focus();
                        }, 100);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left text-base font-black uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Change Password</span>
                    </button>
                    <div className="border-t border-slate-800 my-1" />
                    <button
                      onClick={() => {
                        setIsAdminDropdownOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left text-base font-black uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Admin Panel content taking full width */}
          <main className="flex-grow min-w-0">
            <AdminPanelPage 
              showNotification={showNotification} 
              onLogout={() => setShowLogoutConfirm(true)}
              onSettingsUpdate={setSystemSettings}
              onSwitchToUserView={() => setSubView('overview')}
              adminView={adminView}
              setAdminView={setAdminView}
            />
          </main>
          <footer className="py-6 text-center text-lg text-slate-500 bg-[#070b19] border-t border-slate-800/60 font-medium select-none">
            © 2026 UNI-LandFarm | Admin Panel Uni-Inside
          </footer>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300 relative">
          {showAdminNoteModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowAdminNoteModal(null)} />
              <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl p-8 border border-slate-150 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Catatan Penolakan Admin</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-6">Berikut adalah alasan penolakan publikasi dari admin:</p>
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/30 p-4 rounded-2xl text-lg text-red-600 dark:text-red-400 font-medium leading-relaxed">
                  {showAdminNoteModal}
                </div>
                <button
                  onClick={() => setShowAdminNoteModal(null)}
                  className="w-full mt-6 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-base font-black uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-slate-50 transition-all shadow-sm cursor-pointer font-black"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
          
          {/* Mesh Gradient for Dark Mode */}
          <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
          </div>

          {/* Persistent Blue Atmosphere Glow at Bottom */}
          <div className="fixed -bottom-48 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-96 bg-brand-blue/15 blur-[120px] pointer-events-none opacity-40 dark:opacity-20 z-0"></div>

          {/* SECTION 1: PERSISTENT HEADER BAR */}
          <header className="print:static print:shadow-none print:border-none print:bg-transparent fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#020617] h-[72px] flex items-center justify-between px-8 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500">
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-0 dark:opacity-100 print:hidden"></div>
            <div className="flex items-center gap-4">
              <div
                className="cursor-pointer hover:scale-110 active:scale-95 transition-all"
                onClick={() => setView('home')}
              >
                {systemSettings?.logo && (systemSettings.logo.startsWith('http') || systemSettings.logo.startsWith('/')) ? (
                  <img src={systemSettings.logo.startsWith('/') ? `${systemSettings.logo}?v=8` : systemSettings.logo} alt="Logo" className="h-[88px] object-contain" />
                ) : (
                  <img src="/logo.png?v=8" alt="Logo" className="h-[88px] object-contain" />
                )}
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 pr-6 print:hidden">
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-blue transition-all border border-slate-50 dark:border-white/5"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>

                <button 
                  onClick={() => {
                    fetchNotifications();
                    setSubView('notifications');
                  }}
                  className="p-3 rounded-2xl text-slate-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-all relative group"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              </div>

              <div
                onClick={() => setSubView('profile')}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-1.5 group-hover:text-brand-blue transition-colors">{user?.name || 'Sarah Anderson'}</p>
                  <div className="flex items-center justify-end gap-2 leading-none">
                    <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)] ${
                      user?.plan && user.plan !== 'Regular Access' && user.plan !== '-' ? 'bg-emerald-500' : 'bg-slate-400'
                    }`} />
                    <p className="text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] leading-none">
                      {user?.plan || 'Regular Access'}
                    </p>
                  </div>
                </div>
                <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm group-hover:border-brand-blue/40 group-hover:scale-105 transition-all">
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center text-xl font-black">
                      {user?.name 
                        ? user.name.charAt(0).toUpperCase() 
                        : (user?.email ? user.email.charAt(0).toUpperCase() : '?')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col flex-grow pt-[72px]">
            {/* Row Container for Sidebar + Content */}
            <div className="flex flex-1 w-full">
              {/* SECTION 2: ENRICHED SIDEBAR */}
              <aside className="w-[280px] bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 flex flex-col hidden lg:flex transition-colors duration-300 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto z-20">
                <nav className="flex-1 px-4 space-y-3 py-6">
                  {menuItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSubView(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all group relative ${subView === item.id
                          ? 'bg-brand-blue/5 text-brand-blue shadow-[0_0_15px_rgba(255,176,0,0.05)] border border-brand-blue/10 dark:bg-brand-blue/10'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-slate-950 dark:hover:text-white border border-transparent'
                        }`}
                    >
                      <div className={`transition-all duration-300 ${subView === item.id ? 'text-brand-blue scale-110 drop-shadow-[0_0_8px_rgba(255,176,0,0.3)]' : 'text-slate-300 dark:text-slate-600 group-hover:text-brand-blue'}`}>
                        {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                      </div>
                      {item.label}
                      {subView === item.id && (
                        <motion.div layoutId="navGlow" className="absolute left-0 w-1.5 h-5 bg-brand-blue rounded-r-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* SECTION 3: MAIN DASHBOARD CONTENT AREA */}
              <main className="flex-1 bg-slate-50/10 dark:bg-slate-950/20 transition-colors duration-300 relative min-w-0">
                <div className="p-4 lg:p-8 w-full max-w-full box-border">
                  {renderSubView()}
                </div>
              </main>
            </div>

            {/* SECTION 4: FULL-WIDTH FOOTER */}
            <DashboardFooter setView={setView} setSubView={handleSetSubView} systemSettings={systemSettings} />
          </div>
        </div>
      )}

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-[200] px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border ${
              notification.type === 'success' 
                ? 'bg-slate-900 border-emerald-500/20 text-white dark:bg-white dark:text-slate-900' 
                : 'bg-slate-900 border-blue-500/20 text-white dark:bg-white dark:text-slate-900'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-brand-blue'}`} />
            <span className="text-lg font-black uppercase tracking-wider">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ubah Password Modal */}
      <AnimatePresence>
        {isChangingPassword && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setIsChangingPassword(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10 p-6 space-y-6 z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  Change Password
                </h3>
                <button 
                  onClick={() => setIsChangingPassword(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {user?.provider !== 'google' && (
                  <div className="space-y-1.5">
                    <label className="text-base font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Old Password</label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-lg font-black outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-base font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-lg font-black outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="At least 6 characters"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-brand-blue/30 rounded-2xl p-4 text-lg font-black outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="flex-1 py-3 text-base font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-blue text-white rounded-2xl text-base font-black uppercase tracking-widest shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10 p-6 text-center space-y-6 z-10"
            >
              <div className="mx-auto w-12 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Confirm Logout</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Are you sure you want to log out?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 text-base font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    handleLogout();
                  }}
                  className="flex-1 py-3 bg-red-500 text-white rounded-2xl text-base font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardView;
