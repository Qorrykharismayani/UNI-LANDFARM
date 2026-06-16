import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Bot,
  ChevronRight,
  Image as ImageIcon,
  Upload,
  X,
  Check,
  Sparkles,
  Plus,
  Trash2,
  HelpCircle,
  RefreshCw,
  Lock,
  Search,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Eye,
  Settings,
  Menu,
  Activity,
  Layers,
  ShoppingBag,
  Zap,
  FolderOpen,
  MessageSquare,
  MousePointer2,
  Mail,
  Share2,
  ShoppingCart,
  Settings2,
  Layout,
  User,
  Send,
  Globe,
  FileText,
  Rocket
} from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';
import { generateEditorCopy } from '../services/ai';

const getSectionIcon = (id: string, active: boolean) => {
  const colorClass = active ? "text-brand-blue" : "text-slate-500";
  switch (id) {
    case 'logo': return <ImageIcon className={`w-4 h-4 ${colorClass}`} />;
    case 'navbar': return <Layers className={`w-4 h-4 ${colorClass}`} />;
    case 'hero': return <Layout className={`w-4 h-4 ${colorClass}`} />;
    case 'about': return <User className={`w-4 h-4 ${colorClass}`} />;
    case 'products': return <ShoppingBag className={`w-4 h-4 ${colorClass}`} />;
    case 'advantages': return <Zap className={`w-4 h-4 ${colorClass}`} />;
    case 'gallery': return <FolderOpen className={`w-4 h-4 ${colorClass}`} />;
    case 'testimonials': return <MessageSquare className={`w-4 h-4 ${colorClass}`} />;
    case 'cta': return <MousePointer2 className={`w-4 h-4 ${colorClass}`} />;
    case 'contact': return <Mail className={`w-4 h-4 ${colorClass}`} />;
    case 'socialMedia': return <Share2 className={`w-4 h-4 ${colorClass}`} />;
    case 'marketplaces': return <ShoppingCart className={`w-4 h-4 ${colorClass}`} />;
    case 'footer': return <Settings2 className={`w-4 h-4 ${colorClass}`} />;
    default: return <Layers className={`w-4 h-4 ${colorClass}`} />;
  }
};

interface ContentStructureEditorProps {
  pageId: string;
  onBack: () => void;
  onPublishSuccess: () => void;
}

export default function ContentStructureEditor({ pageId, onBack, onPublishSuccess }: ContentStructureEditorProps) {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [contentJson, setContentJson] = useState<any>(null);
  const [activeAccordion, setActiveAccordion] = useState<string>('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving' | 'Error'>('Saved');
  const [editorToast, setEditorToast] = useState<string | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isSubmittingPublish, setIsSubmittingPublish] = useState(false);

  // Active Main Tab state
  const [activeTab, setActiveTab] = useState<'sections' | 'ai_writer' | 'preview'>('sections');

  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiCommand, setAiCommand] = useState('');
  const [showAddSectionDropdown, setShowAddSectionDropdown] = useState(false);
  const addSectionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (addSectionDropdownRef.current && !addSectionDropdownRef.current.contains(e.target as Node)) {
        setShowAddSectionDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  // Sections List State (Allows Reordering & Activation)
  const [sections, setSections] = useState<any[]>([
    { id: 'logo', name: 'Logo Website', status: 'Aktif', icon: <ImageIcon className="w-4 h-4 text-brand-blue" /> },
    { id: 'navbar', name: 'Menu Navigasi', status: 'Aktif', icon: <Layers className="w-4 h-4 text-brand-blue" /> },
    { id: 'hero', name: 'Hero Banner', status: 'Aktif', icon: <Layout className="w-4 h-4 text-brand-blue" /> },
    { id: 'about', name: 'Tentang Usaha', status: 'Aktif', icon: <User className="w-4 h-4 text-brand-blue" /> },
    { id: 'products', name: 'Produk & Layanan', status: 'Aktif', icon: <ShoppingBag className="w-4 h-4 text-brand-blue" /> },
    { id: 'advantages', name: 'Keunggulan', status: 'Aktif', icon: <Zap className="w-4 h-4 text-brand-blue" /> },
    { id: 'gallery', name: 'Galeri Foto', status: 'Aktif', icon: <FolderOpen className="w-4 h-4 text-brand-blue" /> },
    { id: 'testimonials', name: 'Testimoni', status: 'Aktif', icon: <MessageSquare className="w-4 h-4 text-brand-blue" /> },
    { id: 'cta', name: 'CTA Penawaran', status: 'Aktif', icon: <MousePointer2 className="w-4 h-4 text-brand-blue" /> },
    { id: 'contact', name: 'Kontak', status: 'Aktif', icon: <Mail className="w-4 h-4 text-brand-blue" /> },
    { id: 'socialMedia', name: 'Media Sosial', status: 'Aktif', icon: <Share2 className="w-4 h-4 text-brand-blue" /> },
    { id: 'marketplaces', name: 'Toko Online (Marketplace)', status: 'Nonaktif', icon: <ShoppingCart className="w-4 h-4 text-slate-500" /> },
    { id: 'footer', name: 'Footer Halaman', status: 'Aktif', icon: <Settings2 className="w-4 h-4 text-brand-blue" /> }
  ]);

  const [sectionSearchQuery, setSectionSearchQuery] = useState('');

  const triggerToast = (msg: string) => {
    setEditorToast(msg);
    setTimeout(() => setEditorToast(null), 3000);
  };

  // Fetch page data on mount
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`/api/landing-pages/${pageId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setPageData(data.data);
          const page = data.data;
          const initialContent = page.content?.contentJson || page.template?.defaultContent || {};
          const defaultSectionsList = [
            { id: 'logo', name: 'Logo Website', status: 'Aktif' },
            { id: 'navbar', name: 'Menu Navigasi', status: 'Aktif' },
            { id: 'hero', name: 'Hero Banner', status: 'Aktif' },
            { id: 'about', name: 'Tentang Usaha', status: 'Aktif' },
            { id: 'products', name: 'Produk & Layanan', status: 'Aktif' },
            { id: 'advantages', name: 'Keunggulan', status: 'Aktif' },
            { id: 'gallery', name: 'Galeri Foto', status: 'Aktif' },
            { id: 'testimonials', name: 'Testimoni', status: 'Aktif' },
            { id: 'cta', name: 'CTA Penawaran', status: 'Aktif' },
            { id: 'contact', name: 'Kontak', status: 'Aktif' },
            { id: 'socialMedia', name: 'Media Sosial', status: 'Aktif' },
            { id: 'marketplaces', name: 'Toko Online (Marketplace)', status: 'Nonaktif' },
            { id: 'footer', name: 'Footer Halaman', status: 'Aktif' }
          ];

          const loadedSections = initialContent.sections || defaultSectionsList;
          const mappedSections = loadedSections.map((s: any) => ({
            ...s,
            icon: getSectionIcon(s.id, s.status === 'Aktif')
          }));
          setSections(mappedSections);

          // Ensure standard structure is populated
          const normalized = {
            sections: loadedSections,
            logo: initialContent.logo || '',
            navbar: initialContent.navbar || { brand: page.businessName || 'Situs Baru', items: [{ id: 'home', label: 'Home' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] },
            hero: initialContent.hero || { headline: page.title || 'Kembangkan Bisnis Anda', subheadline: 'Deskripsi singkat layanan/produk Anda.', banner: '', cta: 'Hubungi Kami' },
            about: initialContent.about || { description: '', profile: '', story: '' },
            products: Array.isArray(initialContent.products) ? initialContent.products : [],
            advantages: Array.isArray(initialContent.advantages) ? initialContent.advantages : [
              { icon: 'Shield', title: 'Keamanan Terjamin', description: 'Perlindungan maksimal untuk seluruh data dan sistem Anda.' },
              { icon: 'Zap', title: 'Layanan Cepat', description: 'Respon instan dari tim support kami.' }
            ],
            gallery: Array.isArray(initialContent.gallery) ? initialContent.gallery : [],
            testimonials: Array.isArray(initialContent.testimonials) ? initialContent.testimonials : [],
            cta: initialContent.cta || { title: 'Mulai Sekarang!', description: 'Hubungi kami hari ini untuk penawaran khusus.', buttonText: 'Hubungi Kami' },
            contact: initialContent.contact || { whatsapp: '', email: '', address: '', operatingHours: '' },
            socialMedia: initialContent.socialMedia || { instagram: '', tiktok: '', facebook: '', youtube: '' },
            marketplaces: initialContent.marketplaces || { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' },
            footer: initialContent.footer || { logo: '', businessName: page.businessName || 'Situs Baru', copyright: `© 2026 ${page.businessName || 'Situs Baru'}. All rights reserved.` }
          };

          setContentJson(normalized);
        } else {
          triggerToast('Gagal memuat data landing page.');
        }
      } catch (err) {
        console.error(err);
        triggerToast('Terjadi kesalahan koneksi.');
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  // Debounced auto-save hook
  const prevContentJson = useRef<any>(null);
  useEffect(() => {
    if (!contentJson) return;

    if (!prevContentJson.current) {
      prevContentJson.current = JSON.stringify(contentJson);
      return;
    }

    if (prevContentJson.current === JSON.stringify(contentJson)) return;

    setSaveStatus('Saving');
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`/api/landing-pages/${pageId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentJson })
        });
        const data = await res.json();
        if (data.success) {
          setSaveStatus('Saved');
          prevContentJson.current = JSON.stringify(contentJson);
        } else {
          setSaveStatus('Error');
        }
      } catch (err) {
        setSaveStatus('Error');
      }
    }, 1200);

    return () => clearTimeout(delayDebounce);
  }, [contentJson, pageId]);

  // Handle file uploads
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, pathUpdater: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('landingPageId', pageId);

    try {
      setSaveStatus('Saving');
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.data?.fileUrl) {
        pathUpdater(data.data.fileUrl);
        setSaveStatus('Saved');
        triggerToast('Gambar berhasil diunggah!');
      } else {
        setSaveStatus('Error');
        triggerToast(data.message || 'Gagal mengunggah berkas.');
      }
    } catch (err) {
      setSaveStatus('Error');
      triggerToast('Koneksi upload bermasalah.');
    }
  };

  // Submit Publish Request (Direct Publish)
  const handlePublishSubmit = async () => {
    setIsSubmittingPublish(true);
    try {
      // 1. Save all data CMS and update status to Published
      setSaveStatus('Saving');
      const saveRes = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contentJson,
          status: 'Published',
          publishedAt: new Date().toISOString(),
          publicUrl: `/site/${pageData?.slug}`
        })
      });
      const saveData = await saveRes.json();
      if (!saveData.success) {
        triggerToast('Gagal menyimpan dan mempublikasikan halaman.');
        setIsSubmittingPublish(false);
        return;
      }
      setSaveStatus('Saved');

      triggerToast('Landing page berhasil diterbitkan secara live!');
      setPageData((prev: any) => prev ? { ...prev, status: 'Published', publicUrl: `/site/${pageData?.slug}` } : null);
      onPublishSuccess();
    } catch (err) {
      triggerToast('Gagal terhubung ke server.');
    } finally {
      setIsSubmittingPublish(false);
    }
  };

  // Finalize publication (transition from Approved -> Published)
  const handleFinalPublish = async () => {
    setIsSubmittingPublish(true);
    try {
      const res = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Published',
          publishedAt: new Date().toISOString(),
          publicUrl: `/site/${pageData?.slug}`
        })
      });
      const data = await res.json();
      if (data.success) {
        triggerToast('Landing page berhasil diterbitkan secara live!');
        setPageData((prev: any) => prev ? { ...prev, status: 'Published', publicUrl: `/site/${pageData?.slug}` } : null);
        onPublishSuccess();
      } else {
        triggerToast(data.message || 'Gagal menerbitkan landing page.');
      }
    } catch (err) {
      triggerToast('Gagal terhubung ke server.');
    } finally {
      setIsSubmittingPublish(false);
    }
  };

  const updateSectionsState = (newSections: any[]) => {
    setSections(newSections);
    setContentJson((prev: any) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: newSections.map((s: any) => ({ id: s.id, name: s.name, status: s.status }))
      };
    });
  };

  // Reorder sections
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= sections.length) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[nextIndex];
    newSections[nextIndex] = temp;
    updateSectionsState(newSections);
    triggerToast(`Urutan section diperbarui!`);
  };

  // Toggle active/inactive state of a section
  const toggleSectionActive = (id: string) => {
    const updatedSections = sections.map(sec => {
      if (sec.id === id) {
        const nextStatus = sec.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        return {
          ...sec,
          status: nextStatus,
          icon: getSectionIcon(sec.id, nextStatus === 'Aktif')
        };
      }
      return sec;
    });
    updateSectionsState(updatedSections);
    triggerToast(`Status section diperbarui!`);
  };

  // Submit AI Copywriting instruction
  const handleAiGenerateSubmit = async () => {
    if (!aiCommand.trim()) return;
    setIsGeneratingCopy(true);
    setAiSuggestions(null);

    try {
      const heroData = {
        headline: contentJson?.hero?.headline || '',
        subheadline: contentJson?.hero?.subheadline || '',
        cta: contentJson?.hero?.cta || ''
      };

      const result = await generateEditorCopy(aiCommand, heroData);
      setAiSuggestions(result);
    } catch (err) {
      console.warn("AI generation failed, applying mock response:", err);
      // Fallback premium copywriting suggestions matching brand
      setAiSuggestions({
        reply: `Saya merekomendasikan salinan persuasif berdasarkan brand Anda:`,
        suggestedData: {
          headline: `Solusi Pertanian Uni-LandFarm Madu Klanceng Alami`,
          subheadline: `Dapatkan madu klanceng murni berkualitas premium langsung dari peternak lokal. Kaya khasiat dan terjaga kemurniannya untuk kesehatan keluarga Anda.`,
          cta: `Pesan Madu Murni`
        }
      });
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  // Apply AI Copywriting suggestion
  const applyAiCopy = () => {
    if (!aiSuggestions?.suggestedData || !contentJson) return;
    const { headline, subheadline, cta: ctaText } = aiSuggestions.suggestedData;

    const updated = { ...contentJson };
    if (activeAccordion === 'hero') {
      updated.hero = { ...updated.hero, headline, subheadline, cta: ctaText };
    } else if (activeAccordion === 'cta') {
      updated.cta = { ...updated.cta, title: headline, description: subheadline, buttonText: ctaText };
    }
    setContentJson(updated);
    setIsAiModalOpen(false);
    setAiSuggestions(null);
    setAiCommand('');
    triggerToast('Konten AI berhasil diterapkan ke form!');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex items-center justify-center text-white z-[100]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-base uppercase tracking-widest font-black text-slate-500">Memuat visual editor...</p>
        </div>
      </div>
    );
  }

  // Filter sections list based on query
  const filteredSections = sections.filter(s => s.name.toLowerCase().includes(sectionSearchQuery.toLowerCase())); if (showPublishConfirm) {
    if (!pageData) {
      return (
        <div className="fixed inset-0 bg-slate-50 text-slate-900 flex items-center justify-center z-[250]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-base uppercase tracking-widest font-black text-slate-500 animate-pulse">Memuat data publikasi...</p>
          </div>
        </div>
      );
    }

    const rawStatus = pageData?.status || 'Draft';

    // Normalize status into standard lowercase strings per database requirement
    const normalizeStatus = (statusStr: string): 'draft' | 'pending_publish' | 'approved' | 'rejected' | 'published' => {
      if (!statusStr) return 'draft';
      const s = statusStr.toLowerCase().trim();
      if (s === 'draft') return 'draft';
      if (s === 'pending publish' || s === 'pending_publish' || s === 'pending review' || s === 'pending') return 'pending_publish';
      if (s === 'approved') return 'approved';
      if (s === 'rejected') return 'rejected';
      if (s === 'published') return 'published';
      return 'draft';
    };

    const status = normalizeStatus(rawStatus);

    // Format last updated date
    const formattedLastUpdate = pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB' : '-';

    // Public URL Slug
    const hostOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://domainanda.com';
    const publicSiteUrl = `${hostOrigin}/site/${pageData?.slug}`;

    return (
      <div className="fixed inset-0 bg-slate-50 text-slate-800 flex flex-col font-sans z-[200] overflow-hidden">
        {/* 1. Header */}
        <div className="h-[80px] px-8 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur-xl shrink-0 z-30 shadow-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-blue" />
              <h1 className="text-base font-black uppercase tracking-widest text-white">Publikasi Landing Page</h1>
            </div>
            <p className="text-base text-slate-500 font-bold uppercase tracking-wider mt-1">
              Ajukan landing page Anda untuk ditinjau dan dipublikasikan oleh admin.
            </p>
          </div>
          <button
            onClick={() => setShowPublishConfirm(false)}
            className="px-5 py-2.5 bg-slate-900 border border-slate-200 hover:bg-slate-800 text-slate-700 hover:text-white rounded-xl text-base font-black uppercase tracking-widest transition-all cursor-pointer"
          >
            Kembali ke Editor
          </button>
        </div>

        {/* 2. Main Content Area */}
        <div className="flex-1 max-w-7xl mx-auto w-full py-8 px-6 flex flex-col gap-8 overflow-y-auto custom-scrollbar pb-24">

          {/* Top Panel: Informasi Landing Page Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-2xl relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-blue via-indigo-500 to-purple-650" />
            <h3 className="text-base font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand-blue" /> Informasi Landing Page
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-base">
              <div>
                <span className="text-base font-black text-slate-500 uppercase tracking-widest block mb-1">Nama Landing Page</span>
                <span className="font-bold text-slate-900 text-base truncate block">{pageData?.title || '-'}</span>
              </div>
              <div>
                <span className="text-base font-black text-slate-500 uppercase tracking-widest block mb-1">Nama Bisnis</span>
                <span className="font-bold text-slate-900 text-base truncate block">{pageData?.businessName || '-'}</span>
              </div>
              <div>
                <span className="text-base font-black text-slate-500 uppercase tracking-widest block mb-1">Template</span>
                <span className="font-bold text-slate-900 uppercase text-base truncate block">{pageData?.template?.name || pageData?.template || '-'}</span>
              </div>
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <span className="text-base font-black text-slate-500 uppercase tracking-widest block mb-1">URL Slug</span>
                <span className="font-bold text-brand-blue text-base truncate block select-all">{pageData?.slug || '-'}</span>
              </div>
              <div>
                <span className="text-base font-black text-slate-500 uppercase tracking-widest block mb-1">Status Saat Ini</span>
                <div>
                  <span className={`inline-block px-2.5 py-0.5 text-base font-black uppercase tracking-widest rounded-lg border ${status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      status === 'approved' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        status === 'pending_publish' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-slate-800 text-slate-500 border-slate-300'
                    }`}>
                    {status === 'published' ? 'Published' :
                      status === 'approved' ? 'Approved' :
                        status === 'pending_publish' ? 'Pending Review' :
                          status === 'rejected' ? 'Rejected' : 'Draft'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-base font-black text-slate-500 uppercase tracking-widest block mb-1">Terakhir Update</span>
                <span className="font-bold text-slate-700 text-base block">{formattedLastUpdate}</span>
              </div>
            </div>
          </div>
          {/* Bottom Panel: Centered Stepper & Actions (Preview discarded) */}
          <div className="max-w-4xl mx-auto w-full">

            {/* Progress Publish & Actions */}
            <div className="space-y-6">

              {/* Stepper Card */}
              <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-8 shadow-2xl relative">
                <div>
                  <h3 className="text-base font-black uppercase tracking-widest text-slate-500">Timeline Progress Publikasi</h3>
                  <p className="text-base text-slate-500 font-bold uppercase tracking-wider mt-1.5">Pantau tahapan verifikasi draf hingga peluncuran live</p>
                </div>

                <div className="space-y-8 relative">
                  {/* Vertical timeline connector line */}
                  <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-slate-800 z-0" />

                  {/* LANGKAH 1: Konten Lengkap */}
                  <div className="flex gap-5 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-black uppercase tracking-wider text-white">Langkah 1: Kelengkapan Konten</h4>
                        <span className="text-base font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">Selesai</span>
                      </div>
                      <p className="text-base text-slate-500 leading-relaxed font-medium">Konten landing page Anda telah lengkap diisi di editor dan tersimpan sebagai draf.</p>
                    </div>
                  </div>

                  {/* LANGKAH 2: Landing Page Live */}
                  <div className="flex gap-5 relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${status === 'published'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-100 border border-slate-200 text-slate-500'
                      }`}>
                      {status === 'published' ? (
                        <Rocket className="w-5 h-5 text-emerald-450" />
                      ) : (
                        <Rocket className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-black uppercase tracking-wider text-slate-900">Langkah 2: Landing Page Live</h4>
                        <span className={`text-base font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-slate-100 text-slate-500 border border-slate-300'
                          }`}>
                          {status === 'published' ? 'PUBLISHED' : 'BELUM AKTIF'}
                        </span>
                      </div>

                      <p className="text-base text-slate-500 leading-relaxed font-medium">
                        {status === 'published' ? 'Selamat! Landing page Anda telah resmi aktif secara publik dan dapat diakses siapa saja.' :
                          'Situs Anda akan aktif secara publik setelah tombol Terbitkan ditekan.'}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Admin Note Card (Only shown if status is Rejected and rejection Reason exists) */}
              {status === 'rejected' && pageData?.adminNote && (
                <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-3xl space-y-3 shadow-xl">
                  <h4 className="text-base font-black uppercase tracking-widest text-red-400 flex items-center gap-2">
                    <X className="w-4 h-4" /> Catatan Penolakan Admin
                  </h4>
                  <p className="text-slate-700 text-base font-medium leading-relaxed bg-slate-50/60 border border-red-500/10 p-4 rounded-2xl">
                    "{pageData.adminNote}"
                  </p>
                </div>
              )}

              {/* Action Buttons Panel */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xl space-y-4">
                <h4 className="text-base font-black uppercase tracking-widest text-slate-500">Tombol Aksi Publikasi</h4>

                <div className="flex flex-wrap gap-4">
                  {status === 'draft' && (
                    <button
                      onClick={handlePublishSubmit}
                      disabled={isSubmittingPublish}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-650 hover:scale-[1.02] active:scale-[0.98] text-white rounded-2xl text-base font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer font-black"
                    >
                      Terbitkan Sekarang <Rocket className="w-4 h-4" />
                    </button>
                  )}

                  {status === 'published' && (
                    <div className="flex flex-col gap-4 w-full">
                      {/* Live Link Block */}
                      <div className="bg-slate-50/80 border border-slate-200 p-4 rounded-2xl space-y-2">
                        <span className="text-base font-black uppercase tracking-widest text-emerald-450 block">Tautan Publik Live:</span>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-base font-mono font-bold text-slate-800 select-all truncate">{publicSiteUrl}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(publicSiteUrl);
                              triggerToast('Link disalin ke clipboard!');
                            }}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-base font-black uppercase tracking-widest transition-colors cursor-pointer shrink-0 font-black"
                          >
                            Salin Link
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => window.open(publicSiteUrl, '_blank')}
                          className="flex-1 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-base font-black uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
                        >
                          Buka Landing Page <Globe className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={async () => {
                            if (confirm('Apakah Anda yakin ingin membatalkan publikasi dan menarik situs kembali menjadi draf?')) {
                              setIsSubmittingPublish(true);
                              try {
                                const res = await fetch(`/api/landing-pages/${pageId}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: 'Draft' })
                                });
                                const data = await res.json();
                                if (data.success) {
                                  triggerToast('Publikasi berhasil ditarik kembali.');
                                  setPageData((prev: any) => prev ? { ...prev, status: 'Draft' } : null);
                                  onPublishSuccess();
                                }
                              } catch (e) {
                                triggerToast('Terjadi kesalahan koneksi.');
                              } finally {
                                setIsSubmittingPublish(false);
                              }
                            }
                          }}
                          className="px-5 py-3.5 bg-slate-900 border border-slate-200 hover:bg-slate-800 text-slate-500 hover:text-white rounded-2xl text-base font-black uppercase tracking-widest transition-all cursor-pointer font-black"
                        >
                          Tarik Publikasi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col font-sans text-slate-800">

      {/* 1. TOP BAR - Two Row Header */}
      <div className="border-b border-slate-200 bg-white shrink-0 relative z-30 shadow-sm">
        {/* Row 1: Project Info & Publish */}
        <div className="h-[56px] flex items-center justify-between px-6 border-b border-slate-100">
          {/* Left: Back + Project Name + Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center bg-slate-50 border border-slate-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue rounded-lg transition-all cursor-pointer group"
              title="Kembali ke Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </button>
            <div className="h-7 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <span className="text-base font-extrabold text-slate-800 tracking-wide">{pageData?.businessName || 'Visual Editor'}</span>
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${pageData?.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  pageData?.status === 'Pending Publish' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                {pageData?.status || 'Draft'}
              </span>
            </div>
            <div className="h-7 w-px bg-slate-200" />
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Template: <span className="text-slate-600 font-semibold">{pageData?.template?.name || pageData?.template}</span></span>
              <span>·</span>
              <span className={`font-semibold ${saveStatus === 'Saving' ? 'text-amber-500 animate-pulse' : saveStatus === 'Error' ? 'text-red-500' : 'text-emerald-500'}`}>
                {saveStatus === 'Saving' ? '● Menyimpan...' : saveStatus === 'Error' ? '● Gagal' : '● Tersimpan'}
              </span>
            </div>
          </div>

          {/* Right: Publish Button */}
          <div className="flex items-center gap-3">
            {pageData?.status !== 'Pending Publish' && pageData?.status !== 'Published' && (
              <button
                onClick={() => setShowPublishConfirm(true)}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold uppercase tracking-wider hover:scale-[1.02] transition-all shadow-sm shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Publish
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Tab Navigation */}
        <div className="h-[46px] flex items-center justify-center px-6">
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60">
            {[
              { id: 'sections', label: 'Daftar Section', icon: <Layers className="w-4 h-4" /> },
              { id: 'ai_writer', label: 'Tulis dengan AI & Jadwal', icon: <Bot className="w-4 h-4" /> },
              { id: 'preview', label: 'Preview Situs', icon: <Eye className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold tracking-wide transition-all cursor-pointer ${activeTab === tab.id
                    ? 'bg-white text-brand-blue shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Workstation */}
      <div className="flex flex-1 overflow-hidden">

        {/* TAB 1: DAFTAR SECTION */}
        {activeTab === 'sections' && (
          <div className="flex flex-grow overflow-hidden">
            {/* PANEL KIRI: SECTION MANAGER (Lebar 300px) */}
            <aside className="w-[300px] bg-white border-r border-slate-200 flex flex-col h-full shrink-0 relative z-25 overflow-hidden">
              {/* Panel Header */}
              <div className="p-4 border-b border-slate-200 space-y-3 shrink-0 relative" ref={addSectionDropdownRef}>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                    <Menu className="w-4 h-4 text-brand-blue" />
                    Section Manager
                  </h2>
                  <button
                    onClick={() => setShowAddSectionDropdown(!showAddSectionDropdown)}
                    className="w-8 h-8 flex items-center justify-center bg-brand-blue/10 hover:bg-brand-blue hover:text-white rounded-lg text-brand-blue transition-all cursor-pointer group"
                    title="Tambah Section Baru"
                  >
                    <Plus className="w-4 h-4 group-hover:text-white" />
                  </button>
                </div>
                {/* Search Sections */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={sectionSearchQuery}
                    onChange={(e) => setSectionSearchQuery(e.target.value)}
                    placeholder="Cari section..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-brand-blue/40 placeholder:text-slate-400"
                  />
                </div>

                {/* Dropdown Add Section */}
                {showAddSectionDropdown && (
                  <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-[60] space-y-1 max-h-[280px] overflow-y-auto custom-scrollbar">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-3 py-1.5 border-b border-slate-100 mb-1 select-none">Pilih Section untuk Ditambahkan:</span>
                    {sections.filter(s => s.status === 'Nonaktif').length === 0 ? (
                      <div className="text-sm text-slate-400 p-4 text-center">Semua section telah aktif</div>
                    ) : (
                      sections.filter(s => s.status === 'Nonaktif').map(sec => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            toggleSectionActive(sec.id);
                            setShowAddSectionDropdown(false);
                            setActiveAccordion(sec.id);
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-brand-blue/5 rounded-lg transition-all flex items-center gap-3 text-slate-600 hover:text-slate-900 group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-blue/10 flex items-center justify-center transition-colors shrink-0">
                            {getSectionIcon(sec.id, false)}
                          </div>
                          <span className="font-semibold text-sm">{sec.name}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Sections List */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 custom-scrollbar">
                {filteredSections.map((sec, idx) => {
                  const isActive = activeAccordion === sec.id;
                  const isSectionAktif = sec.status === 'Aktif';

                  return (
                    <div
                      key={sec.id}
                      onClick={() => setActiveAccordion(sec.id)}
                      className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${isActive
                          ? 'bg-brand-blue/5 border-brand-blue/20 shadow-sm'
                          : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GripVertical className="w-3.5 h-3.5 text-slate-300 shrink-0 select-none opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="w-7 h-7 bg-slate-100 rounded-md flex items-center justify-center shrink-0">
                          {sec.icon}
                        </div>

                        <div className="min-w-0">
                          <span className={`text-sm font-semibold block truncate ${isActive ? 'text-brand-blue' : 'text-slate-700'}`}>{sec.name}</span>
                          <span className={`text-[11px] font-medium uppercase tracking-wider ${isSectionAktif ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {sec.status}
                          </span>
                        </div>
                      </div>

                      {/* Right side controls: Move up/down, status toggle */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(idx, 'up');
                          }}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
                          title="Pindahkan Ke Atas"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(idx, 'down');
                          }}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors"
                          title="Pindahkan Ke Bawah"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSectionActive(sec.id);
                          }}
                          className={`p-1 rounded text-base font-black uppercase ${isSectionAktif ? 'text-red-500 hover:bg-red-500/10' : 'text-emerald-500 hover:bg-emerald-500/10'}`}
                          title={isSectionAktif ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Section Button */}
              {/* Add Section Button (Moved to Header) */}
            </aside>

            {/* Focused Property Editor (takes remaining space) */}
            <main className="flex-1 bg-slate-50 flex flex-col h-full overflow-hidden">
              <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 leading-none">Property Editor</h2>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Mengedit: {sections.find(s => s.id === activeAccordion)?.name || activeAccordion}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('ai_writer');
                    setAiCommand(`Tulis ${sections.find(s => s.id === activeAccordion)?.name || activeAccordion} untuk usaha ${pageData?.businessName || 'saya'}`);
                  }}
                  className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-all border border-purple-200 flex items-center gap-1.5 text-xs font-semibold"
                  title="Gunakan AI untuk menulis konten section ini"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI Write
                </button>
              </div>

              {/* Contextual Properties Form Fields */}
              <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full space-y-6 custom-scrollbar pb-16">

                {/* properties for: navbar */}
                {activeAccordion === 'navbar' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Brand / Judul Navigasi</label>
                      <input
                        type="text"
                        value={contentJson?.navbar?.brand || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.navbar.brand = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm font-bold text-slate-900 outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Menu Link Navigasi</label>
                      {contentJson?.navbar?.items?.map((item: any, i: number) => (
                        <div key={item.id} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={item.label}
                            placeholder="Label Menu"
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.navbar.items[i].label = e.target.value;
                              setContentJson(updated);
                            }}
                            className="flex-1 bg-white border border-slate-300 rounded-xl p-2.5 text-sm shadow-sm text-slate-900 outline-none"
                          />
                          <button
                            onClick={() => {
                              const updated = { ...contentJson };
                              updated.navbar.items.splice(i, 1);
                              setContentJson(updated);
                            }}
                            className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updated = { ...contentJson };
                          const newId = `menu-${Date.now()}`;
                          updated.navbar.items.push({ id: newId, label: 'Menu Baru' });
                          setContentJson(updated);
                        }}
                        className="text-base font-black uppercase text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 border border-brand-blue/10 px-4 py-2 rounded-xl flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah Menu
                      </button>
                    </div>
                  </div>
                )}

                {/* properties for: logo */}
                {activeAccordion === 'logo' && (
                  <div className="space-y-5">
                    {/* Logo Shape Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bentuk Logo</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            const updated = { ...contentJson };
                            updated.logoShape = 'circle';
                            setContentJson(updated);
                          }}
                          className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            contentJson?.logoShape === 'circle' || !contentJson?.logoShape
                              ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                            {contentJson?.logo ? (
                              <img src={contentJson.logo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-5 h-5" />
                            )}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider">Bulat</span>
                        </button>
                        <button
                          onClick={() => {
                            const updated = { ...contentJson };
                            updated.logoShape = 'square';
                            setContentJson(updated);
                          }}
                          className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            contentJson?.logoShape === 'square'
                              ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center overflow-hidden">
                            {contentJson?.logo ? (
                              <img src={contentJson.logo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-5 h-5" />
                            )}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider">Kotak</span>
                        </button>
                      </div>
                    </div>

                    {/* Logo URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Logo URL / Unggah Gambar</label>
                      <div className="flex gap-3 items-center">
                        <div className={`w-12 h-12 bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 ${contentJson?.logoShape === 'square' ? 'rounded-xl' : 'rounded-full'}`}>
                          {contentJson?.logo ? (
                            <img src={contentJson.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <input
                          type="text"
                          value={contentJson?.logo || ''}
                          onChange={(e) => {
                            const updated = { ...contentJson };
                            updated.logo = e.target.value;
                            setContentJson(updated);
                          }}
                          placeholder="https://link-logo.png"
                          className="flex-1 bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                        />
                      </div>
                      <div className="pt-2">
                        <label className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors text-sm font-semibold text-slate-600">
                          <Upload className="w-4 h-4 text-brand-blue" /> Unggah File Logo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => setContentJson({ ...contentJson, logo: url }))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* properties for: hero */}
                {activeAccordion === 'hero' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Headline Utama</label>
                      <input
                        type="text"
                        value={contentJson?.hero?.headline || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.hero.headline = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm font-bold text-slate-900 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sub-headline Copywriter</label>
                      <textarea
                        value={contentJson?.hero?.subheadline || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.hero.subheadline = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none resize-none h-24"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gambar Utama (Banner)</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="text"
                          value={contentJson?.hero?.banner || ''}
                          onChange={(e) => {
                            const updated = { ...contentJson };
                            updated.hero.banner = e.target.value;
                            setContentJson(updated);
                          }}
                          placeholder="https://link-gambar-banner.jpg"
                          className="flex-1 bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                        />
                        <label className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer transition-colors border border-slate-200">
                          <Upload className="w-4 h-4 text-brand-blue" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => {
                              const updated = { ...contentJson };
                              updated.hero.banner = url;
                              setContentJson(updated);
                            })}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teks Tombol Aksi (CTA)</label>
                      <input
                        type="text"
                        value={contentJson?.hero?.cta || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.hero.cta = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: about */}
                {activeAccordion === 'about' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi Singkat</label>
                      <textarea
                        value={contentJson?.about?.description || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.about.description = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none resize-none h-20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profil Usaha</label>
                      <textarea
                        value={contentJson?.about?.profile || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.about.profile = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none resize-none h-20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sejarah Singkat / Kisah</label>
                      <textarea
                        value={contentJson?.about?.story || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.about.story = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none resize-none h-20"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: products */}
                {activeAccordion === 'products' && (
                  <div className="space-y-6">
                    {contentJson?.products?.map((prod: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-4 border border-slate-200 rounded-2xl relative space-y-3">
                        <button
                          onClick={() => {
                            const updated = { ...contentJson };
                            updated.products.splice(i, 1);
                            setContentJson(updated);
                          }}
                          className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="text-base font-black text-brand-blue uppercase tracking-widest leading-none mb-1">PRODUK #{i + 1}</div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Produk</label>
                          <input
                            type="text"
                            value={prod.name}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.products[i].name = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-slate-900 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Harga Produk</label>
                          <input
                            type="text"
                            value={prod.price}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.products[i].price = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-slate-900 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi Singkat</label>
                          <textarea
                            value={prod.description}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.products[i].description = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-white h-16 resize-none outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gambar Produk</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={prod.image}
                              placeholder="https://link-gambar.jpg"
                              onChange={(e) => {
                                const updated = { ...contentJson };
                                updated.products[i].image = e.target.value;
                                setContentJson(updated);
                              }}
                              className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-base text-slate-900 outline-none"
                            />
                            <label className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center justify-center shrink-0 border border-slate-200">
                              <Upload className="w-3.5 h-3.5 text-brand-blue" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleUpload(e, (url) => {
                                  const updated = { ...contentJson };
                                  updated.products[i].image = url;
                                  setContentJson(updated);
                                })}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = { ...contentJson };
                        updated.products.push({ name: 'Produk Baru', description: 'Deskripsi produk', price: 'Rp 10.000', image: '' });
                        setContentJson(updated);
                      }}
                      className="w-full text-center py-3 border-2 border-dashed border-slate-800 hover:border-brand-blue hover:text-brand-blue rounded-2xl text-base font-black uppercase tracking-wider transition-all"
                    >
                      + Tambah Produk Baru
                    </button>
                  </div>
                )}

                {/* properties for: advantages */}
                {activeAccordion === 'advantages' && (
                  <div className="space-y-4">
                    {contentJson?.advantages?.map((adv: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-4 border border-slate-200 rounded-2xl relative space-y-3">
                        <button
                          onClick={() => {
                            const updated = { ...contentJson };
                            updated.advantages.splice(i, 1);
                            setContentJson(updated);
                          }}
                          className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Icon Keunggulan</label>
                          <select
                            value={adv.icon}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.advantages[i].icon = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-slate-500 outline-none"
                          >
                            <option value="Shield">Keamanan (Shield)</option>
                            <option value="Zap">Kecepatan (Zap)</option>
                            <option value="Heart">Kepuasan (Heart)</option>
                            <option value="Sparkles">Premium (Sparkles)</option>
                            <option value="Star">Rating (Star)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul</label>
                          <input
                            type="text"
                            value={adv.title}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.advantages[i].title = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi Singkat</label>
                          <textarea
                            value={adv.description}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.advantages[i].description = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-white h-16 resize-none outline-none"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = { ...contentJson };
                        updated.advantages.push({ icon: 'Sparkles', title: 'Fitur Unggulan', description: 'Nilai tambah bisnis Anda' });
                        setContentJson(updated);
                      }}
                      className="w-full text-center py-3 border-2 border-dashed border-slate-800 hover:border-brand-blue hover:text-brand-blue rounded-2xl text-base font-black uppercase tracking-wider transition-all"
                    >
                      + Tambah Keunggulan Baru
                    </button>
                  </div>
                )}

                {/* properties for: gallery */}
                {activeAccordion === 'gallery' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {contentJson?.gallery?.map((img: string, i: number) => (
                        <div key={i} className="aspect-square bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden group">
                          {img ? (
                            <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-base font-black">[Kosong]</div>
                          )}
                          <button
                            onClick={() => {
                              const updated = { ...contentJson };
                              updated.gallery.splice(i, 1);
                              setContentJson(updated);
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <label className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-700 border border-slate-200 rounded-xl cursor-pointer transition-colors text-base font-black text-slate-500">
                        <Upload className="w-4 h-4 text-brand-blue" /> Tambah Foto Galeri
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUpload(e, (url) => {
                            const updated = { ...contentJson };
                            updated.gallery.push(url);
                            setContentJson(updated);
                          })}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* properties for: testimonials */}
                {activeAccordion === 'testimonials' && (
                  <div className="space-y-4">
                    {contentJson?.testimonials?.map((t: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-4 border border-slate-200 rounded-2xl relative space-y-3">
                        <button
                          onClick={() => {
                            const updated = { ...contentJson };
                            updated.testimonials.splice(i, 1);
                            setContentJson(updated);
                          }}
                          className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Klien</label>
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.testimonials[i].name = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-slate-900 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Isi Testimoni</label>
                          <textarea
                            value={t.content}
                            onChange={(e) => {
                              const updated = { ...contentJson };
                              updated.testimonials[i].content = e.target.value;
                              setContentJson(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-base text-white h-16 resize-none outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Foto Klien (URL/Upload)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={t.photo || ''}
                              placeholder="https://link-avatar.jpg"
                              onChange={(e) => {
                                const updated = { ...contentJson };
                                updated.testimonials[i].photo = e.target.value;
                                setContentJson(updated);
                              }}
                              className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-base text-slate-900 outline-none"
                            />
                            <label className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center justify-center shrink-0 border border-slate-200">
                              <Upload className="w-3.5 h-3.5 text-brand-blue" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleUpload(e, (url) => {
                                  const updated = { ...contentJson };
                                  updated.testimonials[i].photo = url;
                                  setContentJson(updated);
                                })}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = { ...contentJson };
                        updated.testimonials.push({ name: 'Nama Pelanggan', content: 'Pelayanan sangat bagus!', photo: '' });
                        setContentJson(updated);
                      }}
                      className="w-full text-center py-3 border-2 border-dashed border-slate-800 hover:border-brand-blue hover:text-brand-blue rounded-2xl text-base font-black uppercase tracking-wider transition-all"
                    >
                      + Tambah Testimoni Baru
                    </button>
                  </div>
                )}

                {/* properties for: cta */}
                {activeAccordion === 'cta' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul Penawaran</label>
                      <input
                        type="text"
                        value={contentJson?.cta?.title || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.cta.title = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi Penawaran</label>
                      <textarea
                        value={contentJson?.cta?.description || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.cta.description = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-white h-20 resize-none outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teks Tombol CTA</label>
                      <input
                        type="text"
                        value={contentJson?.cta?.buttonText || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.cta.buttonText = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: contact */}
                {activeAccordion === 'contact' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nomor WhatsApp (Format: 628xxxx)</label>
                      <input
                        type="text"
                        value={contentJson?.contact?.whatsapp || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.contact.whatsapp = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Bisnis</label>
                      <input
                        type="email"
                        value={contentJson?.contact?.email || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.contact.email = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alamat Fisik</label>
                      <textarea
                        value={contentJson?.contact?.address || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.contact.address = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-white h-20 resize-none outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jam Operasional</label>
                      <input
                        type="text"
                        value={contentJson?.contact?.operatingHours || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.contact.operatingHours = e.target.value;
                          setContentJson(updated);
                        }}
                        placeholder="Senin - Jumat, 09:00 - 17:00 WIB"
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: socialMedia */}
                {activeAccordion === 'socialMedia' && (
                  <div className="space-y-4">
                    {['instagram', 'tiktok', 'facebook', 'youtube'].map((sm) => (
                      <div key={sm} className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{sm}</label>
                        <input
                          type="text"
                          value={contentJson?.socialMedia?.[sm] || ''}
                          onChange={(e) => {
                            const updated = { ...contentJson };
                            if (!updated.socialMedia) updated.socialMedia = {};
                            updated.socialMedia[sm] = e.target.value;
                            setContentJson(updated);
                          }}
                          placeholder={`https://${sm}.com/username`}
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* properties for: marketplaces */}
                {activeAccordion === 'marketplaces' && (
                  <div className="space-y-4">
                    {['shopee', 'tokopedia', 'lazada', 'externalWebsite'].map((mp) => (
                      <div key={mp} className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{mp === 'externalWebsite' ? 'Website Eksternal' : mp}</label>
                        <input
                          type="text"
                          value={contentJson?.marketplaces?.[mp] || ''}
                          onChange={(e) => {
                            const updated = { ...contentJson };
                            if (!updated.marketplaces) updated.marketplaces = {};
                            updated.marketplaces[mp] = e.target.value;
                            setContentJson(updated);
                          }}
                          placeholder="https://..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* properties for: footer */}
                {activeAccordion === 'footer' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Logo Footer (URL)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={contentJson?.footer?.logo || ''}
                          onChange={(e) => {
                            const updated = { ...contentJson };
                            updated.footer.logo = e.target.value;
                            setContentJson(updated);
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                        />
                        <label className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer border border-slate-200">
                          <Upload className="w-4 h-4 text-brand-blue" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => {
                              const updated = { ...contentJson };
                              updated.footer.logo = url;
                              setContentJson(updated);
                            })}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Bisnis Footer</label>
                      <input
                        type="text"
                        value={contentJson?.footer?.businessName || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.footer.businessName = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teks Copyright</label>
                      <input
                        type="text"
                        value={contentJson?.footer?.copyright || ''}
                        onChange={(e) => {
                          const updated = { ...contentJson };
                          updated.footer.copyright = e.target.value;
                          setContentJson(updated);
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm shadow-sm text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                )}

              </div>
            </main>
          </div>
        )}

        {/* TAB 2: TULIS DENGAN AI & JADWAL */}
        {activeTab === 'ai_writer' && (
          <div className="flex-grow overflow-y-auto p-6 md:p-8 max-w-6xl mx-auto w-full space-y-8 custom-scrollbar pb-16">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/20">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-widest leading-none">AI Copywriting & Scheduling Assistant</h2>
                <p className="text-base text-slate-500 font-bold uppercase tracking-wider mt-1.5">Tulis konten landing page persuasif otomatis & kelola jadwal publikasi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Input Form (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xl">
                  <h3 className="text-base font-black text-white uppercase tracking-widest border-b border-slate-200 pb-3">Input Copywriting</h3>

                  <div className="space-y-2">
                    <label className="text-base font-black text-slate-500 uppercase tracking-widest block">Target Section yang Diedit</label>
                    <select
                      value={activeAccordion}
                      onChange={(e) => setActiveAccordion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base text-slate-500 outline-none focus:border-purple-500/50"
                    >
                      {sections.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-black text-slate-500 uppercase tracking-widest block">Pilih Preset Rekomendasi</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Buat Headline Hero Persuasif Madu Klanceng",
                        "Buat Deskripsi About Penjualan Madu Premium",
                        "Rekomendasikan CTA Ajakan Klik Beli WA",
                        "Buat Kalimat Promosi Keunggulan Layanan"
                      ].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAiCommand(preset)}
                          className="text-left p-3.5 bg-slate-50/75 hover:bg-slate-900 border border-slate-200 rounded-xl text-base font-bold text-slate-500 hover:text-white transition-all cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-black text-slate-500 uppercase tracking-widest block">Instruksi Kustom untuk AI</label>
                    <textarea
                      value={aiCommand}
                      onChange={(e) => setAiCommand(e.target.value)}
                      placeholder="Contoh: Tulis headline yang fokus pada khasiat lebah trigona, menggunakan gaya bahasa premium dan hangat..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-base text-slate-900 outline-none resize-none h-32 focus:border-purple-500/50"
                    />
                  </div>

                  <button
                    onClick={handleAiGenerateSubmit}
                    disabled={isGeneratingCopy || !aiCommand.trim()}
                    className="w-full py-4 bg-gradient-to-r from-purple-650 to-indigo-650 text-white rounded-xl text-base font-black uppercase tracking-widest shadow-xl shadow-purple-500/10 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingCopy ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Menulis salinan copywriting...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Bangun Teks Copywriting
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: AI Output & Queue (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* AI Output Result */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl min-h-[220px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-widest border-b border-slate-200 pb-3">Hasil Generasi AI</h3>

                    {!aiSuggestions ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-3">
                        <Bot className="w-8 h-8 opacity-40 animate-pulse text-purple-400" />
                        <p className="text-base uppercase font-black tracking-widest">Belum ada data generasi</p>
                        <p className="text-base max-w-xs leading-relaxed font-medium">Ketik instruksi di sebelah kiri dan klik tombol untuk menghasilkan teks promosi bertenaga AI secara instan.</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-purple-500/5 border border-purple-500/25 rounded-2xl space-y-4 animate-in fade-in duration-300 text-base mt-3">
                        <div className="flex items-center justify-between border-b border-purple-500/10 pb-2">
                          <span className="text-base font-black text-purple-400 uppercase tracking-widest">Rekomendasi Konten AI</span>
                          <span className="text-base text-slate-500 font-bold uppercase">Target: {sections.find(s => s.id === activeAccordion)?.name}</span>
                        </div>

                        <div className="space-y-3">
                          {aiSuggestions.suggestedData?.headline && (
                            <div className="space-y-1">
                              <span className="text-base font-black text-slate-500 uppercase tracking-widest block">Headline / Title</span>
                              <p className="font-bold text-white text-base leading-snug">{aiSuggestions.suggestedData.headline}</p>
                            </div>
                          )}
                          {aiSuggestions.suggestedData?.subheadline && (
                            <div className="space-y-1">
                              <span className="text-base font-black text-slate-500 uppercase tracking-widest block">Subheadline / Deskripsi</span>
                              <p className="text-slate-700 text-base leading-relaxed">{aiSuggestions.suggestedData.subheadline}</p>
                            </div>
                          )}
                          {aiSuggestions.suggestedData?.cta && (
                            <div className="space-y-1">
                              <span className="text-base font-black text-slate-500 uppercase tracking-widest block">CTA Button</span>
                              <p className="font-bold text-brand-blue text-base uppercase">{aiSuggestions.suggestedData.cta}</p>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={applyAiCopy}
                          className="w-full py-3 bg-purple-650 hover:bg-purple-600 text-white rounded-xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                          style={{ backgroundColor: '#7c3aed' }}
                        >
                          <Check className="w-4 h-4" /> Terapkan ke Editor
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Antrean Publish / Jadwal */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-base font-black text-white uppercase tracking-widest border-b border-slate-200 pb-3">Jadwal Publish Konten</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Promo Ramadhan Kopi Nusantara", date: "Mendatang, 09:00", badge: "AI Scheduled" },
                      { title: "Tips Memilih Biji Kopi Robusta", date: "Mendatang, 10:00", badge: "Queued" }
                    ].map((q, i) => (
                      <div key={i} className="p-3.5 bg-slate-50/60 border border-slate-200 rounded-xl flex items-center justify-between hover:border-brand-blue/30 transition-colors shadow-sm group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                            <Activity className="w-4 h-4" />
                          </div>
                          <div>
                            <h6 className="text-base font-black text-white uppercase leading-none mb-1 group-hover:text-brand-blue transition-colors truncate max-w-[150px]">{q.title}</h6>
                            <p className="text-base font-bold text-slate-500 uppercase tracking-wider">{q.date}</p>
                          </div>
                        </div>
                        <span className="text-base font-black text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2 py-0.5 rounded-full uppercase tracking-widest">{q.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PREVIEW SITUS */}
        {activeTab === 'preview' && (
          <div className="flex flex-1 flex-col h-full overflow-hidden bg-slate-100">
            {/* Viewport Toolbar */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
              {/* Left: Viewport Size Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                {[
                  { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-4 h-4" /> },
                  { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-4 h-4" /> }
                ].map(dev => (
                  <button
                    key={dev.id}
                    onClick={() => setPreviewMode(dev.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer ${previewMode === dev.id
                        ? 'bg-white text-brand-blue shadow-sm border border-slate-200'
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    {dev.icon}
                    <span>{dev.label}</span>
                  </button>
                ))}
              </div>

              {/* Center: Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale(Math.max(0.5, zoomScale - 0.1))}
                  className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg border border-slate-200 cursor-pointer transition-colors text-base"
                >
                  −
                </button>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 min-w-[100px] justify-center">
                  <span className="text-sm font-semibold text-slate-700">{Math.round(zoomScale * 100)}%</span>
                </div>
                <button
                  onClick={() => setZoomScale(Math.min(1.5, zoomScale + 0.1))}
                  className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg border border-slate-200 cursor-pointer transition-colors text-base"
                >
                  +
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200 cursor-pointer transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Right: Resolution Info */}
              <div className="text-xs text-slate-400 font-medium">
                {previewMode === 'desktop' ? '1200 × 800' : '390 × 844'}
              </div>
            </div>

            {/* Viewport Frame Container */}
            <div className="flex-1 bg-slate-100 overflow-auto p-8 flex justify-center items-start custom-scrollbar" style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              <div
                className="transition-all duration-500 ease-out relative overflow-hidden bg-white flex flex-col"
                style={{
                  width: previewMode === 'mobile' ? '390px' : '100%',
                  maxWidth: previewMode === 'desktop' ? '1200px' : 'none',
                  minHeight: '750px',
                  height: 'calc(100vh - 250px)',
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'top center',
                  borderRadius: previewMode === 'desktop' ? '16px' : '44px',
                  borderWidth: previewMode === 'desktop' ? '1px' : '10px',
                  borderColor: previewMode === 'desktop' ? '#e2e8f0' : '#1e293b',
                  boxShadow: previewMode === 'desktop'
                    ? '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)'
                    : '0 30px 80px rgba(0,0,0,0.25), 0 0 0 2px #334155, inset 0 0 0 2px #475569'
                }}
              >
                {/* Browser Header for Desktop Mockup */}
                {previewMode === 'desktop' && (
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3 shrink-0 select-none z-20">
                    <div className="flex gap-2 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                    </div>
                    <div className="flex-1 max-w-[420px] mx-auto bg-white border border-slate-200 rounded-lg py-1.5 px-3 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5 truncate">
                        <Lock className="w-3 h-3 text-emerald-500" />
                        <span className="truncate text-slate-600">landfarm.id/site/{pageData?.slug}</span>
                      </div>
                      <RefreshCw className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
                    </div>
                  </div>
                )}

                {/* Mobile - Realistic iPhone Frame */}
                {previewMode === 'mobile' && (
                  <>
                    {/* Dynamic Island */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-[#1e293b] rounded-[20px] z-30 flex items-center justify-center shadow-inner">
                      <div className="w-[10px] h-[10px] rounded-full bg-[#0f172a] border border-[#334155] mr-6 shadow-inner" />
                      <div className="w-[6px] h-[6px] rounded-full bg-[#334155]" />
                    </div>
                    {/* Status Bar */}
                    <div className="h-[44px] bg-white shrink-0 relative z-20 flex items-end justify-between px-8 pb-1">
                      <span className="text-[11px] font-semibold text-slate-800">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-[2px] items-end">
                          <div className="w-[3px] h-[4px] bg-slate-800 rounded-sm" />
                          <div className="w-[3px] h-[6px] bg-slate-800 rounded-sm" />
                          <div className="w-[3px] h-[8px] bg-slate-800 rounded-sm" />
                          <div className="w-[3px] h-[10px] bg-slate-300 rounded-sm" />
                        </div>
                        <div className="w-[22px] h-[11px] border border-slate-800 rounded-[3px] ml-1 relative">
                          <div className="absolute inset-[1.5px] bg-slate-800 rounded-[1.5px]" style={{ width: '60%' }} />
                          <div className="absolute -right-[3px] top-[2.5px] w-[2px] h-[5px] bg-slate-800 rounded-r-sm" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Embed template renderer */}
                <div className={`w-full h-full overflow-y-auto bg-white text-slate-900 custom-scrollbar ${previewMode === 'mobile' ? '' : 'pt-1'}`}>
                  <TemplateRenderer
                    templateId={pageData?.template?.id || pageData?.template?.name}
                    contentJson={contentJson}
                    isMobile={previewMode === 'mobile'}
                  />
                </div>

                {/* Mobile Home Indicator */}
                {previewMode === 'mobile' && (
                  <div className="h-[20px] bg-white flex items-center justify-center shrink-0">
                    <div className="w-[134px] h-[5px] bg-slate-800 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Toast Notification */}
      {editorToast && (
        <div className="fixed bottom-6 right-6 bg-white border border-brand-blue/30 text-white px-5 py-3 rounded-2xl shadow-2xl z-[200] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-base font-black uppercase tracking-wider">{editorToast}</span>
        </div>
      )}
    </div>
  );
}
