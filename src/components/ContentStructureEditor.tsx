import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Copy,
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
  Rocket,
  CheckCircle2,
  Calendar,
  Filter,
  AlertTriangle
} from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';
import { generateEditorCopy } from '../services/ai';
import { copyToClipboard } from '../lib/clipboard';

const getSectionIcon = (type: string, active: boolean) => {
  const colorClass = active ? "text-brand-blue" : "text-slate-500";
  const normalizedType = type ? type.split('-')[0] : '';
  switch (normalizedType) {
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

const getSectionDefaultTitle = (type: string) => {
  if (!type) return '';
  switch (type) {
    case 'logo': return 'Logo Website';
    case 'navbar': return 'Menu Navigasi';
    case 'hero': return 'Hero Banner';
    case 'about': return 'Tentang Usaha';
    case 'products': return 'Produk & Layanan';
    case 'advantages': return 'Keunggulan';
    case 'gallery': return 'Galeri Foto';
    case 'testimonials': return 'Testimoni';
    case 'cta': return 'CTA Penawaran';
    case 'contact': return 'Kontak';
    case 'socialMedia': return 'Media Sosial';
    case 'marketplaces': return 'Toko Online (Marketplace)';
    case 'footer': return 'Footer Halaman';
    default: return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

const getSectionCompleteness = (type: string, content: any) => {
  if (!content) return { text: '0/2 Konten Terisi', type: 'warning' };

  switch (type) {
    case 'logo':
      const logoFilled = typeof content === 'string' && content.trim().length > 0;
      return logoFilled
        ? { text: '1/1 Konten Terisi', type: 'success' }
        : { text: '0/1 Konten Terisi', type: 'warning' };

    case 'navbar':
      const brandFilled = !!content.brand?.trim();
      const itemsFilled = Array.isArray(content.items) && content.items.length > 0;
      const navCount = (brandFilled ? 1 : 0) + (itemsFilled ? 1 : 0);
      return {
        text: `${navCount}/2 Konten Terisi`,
        type: navCount === 2 ? 'success' : 'warning'
      };

    case 'hero':
      const headlineFilled = !!content.headline?.trim();
      const subheadlineFilled = !!content.subheadline?.trim();
      const ctaFilled = !!content.cta?.trim();
      const heroCount = (headlineFilled ? 1 : 0) + (subheadlineFilled ? 1 : 0) + (ctaFilled ? 1 : 0);
      return {
        text: `${heroCount}/3 Konten Terisi`,
        type: heroCount === 3 ? 'success' : 'warning'
      };

    case 'about':
      const descFilled = !!content.description?.trim();
      const profileFilled = !!content.profile?.trim();
      const storyFilled = !!content.story?.trim();
      const aboutCount = (descFilled ? 1 : 0) + (profileFilled ? 1 : 0) + (storyFilled ? 1 : 0);
      return {
        text: `${aboutCount}/3 Konten Terisi`,
        type: aboutCount === 3 ? 'success' : 'warning'
      };

    case 'products':
    case 'advantages':
    case 'gallery':
    case 'testimonials':
      const arrayLength = Array.isArray(content) ? content.length : 0;
      return {
        text: `${arrayLength >= 1 ? 1 : 0}/1 Konten Terisi`,
        type: arrayLength >= 1 ? 'success' : 'warning'
      };

    case 'cta':
      const ctaTitleFilled = !!content.title?.trim();
      const ctaDescFilled = !!content.description?.trim();
      const ctaBtnFilled = !!content.buttonText?.trim();
      const ctaCount = (ctaTitleFilled ? 1 : 0) + (ctaDescFilled ? 1 : 0) + (ctaBtnFilled ? 1 : 0);
      return {
        text: `${ctaCount}/3 Konten Terisi`,
        type: ctaCount === 3 ? 'success' : 'warning'
      };

    case 'contact':
      const whatsappFilled = !!content.whatsapp?.trim();
      const addressFilled = !!content.address?.trim();
      const contactCount = (whatsappFilled ? 1 : 0) + (addressFilled ? 1 : 0);
      return {
        text: `${contactCount}/2 Konten Terisi`,
        type: contactCount === 2 ? 'success' : 'warning'
      };

    case 'socialMedia':
      const igFilled = !!content.instagram?.trim();
      const ttFilled = !!content.tiktok?.trim();
      const socialCount = (igFilled ? 1 : 0) + (ttFilled ? 1 : 0);
      return {
        text: `${socialCount}/2 Konten Terisi`,
        type: socialCount === 2 ? 'success' : 'warning'
      };

    case 'marketplaces':
      const shopeeVal = (content.marketplaces?.shopee !== undefined ? content.marketplaces.shopee : content.shopee) || '';
      const tokpedVal = (content.marketplaces?.tokopedia !== undefined ? content.marketplaces.tokopedia : content.tokopedia) || '';
      const shopeeFilled = !!shopeeVal.trim();
      const tokpedFilled = !!tokpedVal.trim();
      const mpCount = (shopeeFilled ? 1 : 0) + (tokpedFilled ? 1 : 0);
      return {
        text: `${mpCount}/2 Konten Terisi`,
        type: mpCount === 2 ? 'success' : 'warning'
      };

    case 'footer':
      const footerBusinessNameFilled = !!content.businessName?.trim();
      const footerCopyrightFilled = !!content.copyright?.trim();
      const footerCount = (footerBusinessNameFilled ? 1 : 0) + (footerCopyrightFilled ? 1 : 0);
      return {
        text: `${footerCount}/2 Konten Terisi`,
        type: footerCount === 2 ? 'success' : 'warning'
      };

    default:
      return { text: '2/2 Konten Terisi', type: 'success' };
  }
};

const getSectionDefaultContent = (type: string, businessName = 'Uni-LandFarm', pageTitle = 'Platform Landing Page Mikro Berbasis AI CMS') => {
  switch (type) {
    case 'logo': return '/uploads/1781793939040-LOGO_Uni-LandFarm-removebg-preview-(1).png';
    case 'navbar': return { brand: businessName, items: [{ id: 'home', label: 'Beranda' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] };
    case 'hero': return { headline: pageTitle || 'Kembangkan Bisnis Anda', subheadline: 'Deskripsi singkat layanan/produk Anda.', banner: '', cta: 'Hubungi Kami' };
    case 'about': return { description: '', profile: '', story: '' };
    case 'products': return [];
    case 'advantages': return [
      { icon: 'Shield', title: 'Keamanan Terjamin', description: 'Perlindungan maksimal untuk seluruh data dan sistem Anda.' },
      { icon: 'Zap', title: 'Layanan Cepat', description: 'Respon instan dari tim support kami.' }
    ];
    case 'gallery': return [];
    case 'testimonials': return [];
    case 'cta': return { title: 'Mulai Sekarang!', description: 'Hubungi kami hari ini untuk penawaran khusus.', buttonText: 'Hubungi Kami' };
    case 'contact': return { whatsapp: '', email: '', address: '', operatingHours: '' };
    case 'socialMedia': return { instagram: '', tiktok: '', facebook: '', youtube: '' };
    case 'marketplaces': return { marketplaces: { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' } };
    case 'footer': return { logo: '', businessName: businessName, copyright: `© 2026 ${businessName}. All rights reserved.` };
    default: return {};
  }
};

const getSectionContentFromMapped = (list: any[], type: string, fallback: any) => {
  const sec = list.find((s: any) => s.type === type || s.id === type);
  return sec && sec.content !== undefined ? sec.content : fallback;
};

interface ContentStructureEditorProps {
  pageId?: string;
  onBack?: () => void;
  onPublishSuccess?: () => void;
  onCreateNewPage?: () => void;
}

export default function ContentStructureEditor({ pageId, onBack, onPublishSuccess, onCreateNewPage }: ContentStructureEditorProps) {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [isAiPage, setIsAiPage] = useState<boolean>(false);
  const [contentJson, setRawContentJson] = useState<any>(null);
  const [sitePages, setSitePages] = useState<any[]>([]);
  const [currentPageSlug, setCurrentPageSlug] = useState<string>('/');
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const syncContentAndSections = (newContent: any) => {
    if (!newContent) return;
    const typeKeyMap: Record<string, any> = {};
    Object.keys(newContent).forEach(key => {
      if (key !== 'sections') {
        typeKeyMap[key] = newContent[key];
      }
    });

    setSections(prev => {
      const updatedSections = prev.map((s, idx) => {
        const type = s.type || s.id;
        const updatedContent = typeKeyMap[type] !== undefined ? typeKeyMap[type] : s.content;
        return {
          ...s,
          content: updatedContent,
          order: idx + 1
        };
      });
      // Update newContent.sections array to match
      newContent.sections = updatedSections.map(s => ({
        id: s.id,
        type: s.type,
        title: s.title,
        isActive: s.isActive,
        order: s.order,
        content: s.content,
        styles: s.styles,
        status: s.isActive ? 'Aktif' : 'Nonaktif',
        name: s.title
      }));
      return updatedSections;
    });
  };

  const setContentJson = (newContent: any) => {
    if (typeof newContent === 'function') {
      setRawContentJson((prev: any) => {
        const updated = newContent(prev);
        if (updated && (isAiPage || updated.isAiGenerated)) {
          updated.isAiGenerated = true;
        }
        syncContentAndSections(updated);
        return updated;
      });
    } else {
      if (newContent && (isAiPage || newContent.isAiGenerated)) {
        newContent.isAiGenerated = true;
      }
      setRawContentJson(newContent);
      syncContentAndSections(newContent);
    }
  };

  const [activeAccordion, setActiveAccordion] = useState<string>('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving' | 'Error'>('Saved');
  const [editorToast, setEditorToast] = useState<string | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isSubmittingPublish, setIsSubmittingPublish] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);

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

  // Custom Scheduler Timeline States
  const [schedules, setSchedules] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleTime, setNewScheduleTime] = useState('');
  const [newScheduleTargetSection, setNewScheduleTargetSection] = useState('logo');
  const [newScheduleContent, setNewScheduleContent] = useState('');
  const [newScheduleImage, setNewScheduleImage] = useState('');
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [newScheduleStatus, setNewScheduleStatus] = useState('SCHEDULED');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(false);

  // Publish Modal Form States
  const [editPublishTitle, setEditPublishTitle] = useState('');
  const [editPublishBusinessName, setEditPublishBusinessName] = useState('');
  const [editPublishSlug, setEditPublishSlug] = useState('');

  // Accordion collapsed states for Property Editor
  const [isContentCollapsed, setIsContentCollapsed] = useState(false);
  const [isStyleCollapsed, setIsStyleCollapsed] = useState(true);

  // Auto-collapse style and expand content on active section change
  useEffect(() => {
    setIsContentCollapsed(false);
    setIsStyleCollapsed(true);
  }, [activeAccordion]);

  // Sections List State (Allows Reordering & Activation)
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [sections, setSections] = useState<any[]>([
    { id: 'logo', type: 'logo', title: 'Logo Website', isActive: true, order: 1, content: '/uploads/1781793939040-LOGO_Uni-LandFarm-removebg-preview-(1).png' },
    { id: 'navbar', type: 'navbar', title: 'Menu Navigasi', isActive: true, order: 2, content: { brand: 'Uni-LandFarm', items: [{ id: 'home', label: 'Beranda' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] } },
    { id: 'hero', type: 'hero', title: 'Hero Banner', isActive: true, order: 3, content: { headline: 'Kembangkan Bisnis Anda', subheadline: 'Deskripsi singkat layanan/produk Anda.', banner: '', cta: 'Hubungi Kami' } },
    { id: 'about', type: 'about', title: 'Tentang Usaha', isActive: true, order: 4, content: { description: '', profile: '', story: '' } },
    { id: 'products', type: 'products', title: 'Produk & Layanan', isActive: true, order: 5, content: [] },
    {
      id: 'advantages', type: 'advantages', title: 'Keunggulan', isActive: true, order: 6, content: [
        { icon: 'Shield', title: 'Keamanan Terjamin', description: 'Perlindungan maksimal untuk seluruh data dan sistem Anda.' },
        { icon: 'Zap', title: 'Layanan Cepat', description: 'Respon instan dari tim support kami.' }
      ]
    },
    { id: 'gallery', type: 'gallery', title: 'Galeri Foto', isActive: true, order: 7, content: [] },
    { id: 'testimonials', type: 'testimonials', title: 'Testimoni', isActive: true, order: 8, content: [] },
{ id: 'cta', type: 'cta', title: 'CTA Penawaran', isActive: true, order: 9, content: { title: 'Mulai Sekarang!', description: 'Hubungi kami hari ini untuk penawaran khusus.', buttonText: 'Hubungi Kami' } },
    { id: 'contact', type: 'contact', title: 'Kontak', isActive: true, order: 10, content: { whatsapp: '', email: '', address: '', operatingHours: '' } },
    { id: 'socialMedia', type: 'socialMedia', title: 'Media Sosial', isActive: true, order: 11, content: { instagram: '', tiktok: '', facebook: '', youtube: '' } },
    { id: 'marketplaces', type: 'marketplaces', title: 'Toko Online (Marketplace)', isActive: false, order: 12, content: { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' } },
    { id: 'footer', type: 'footer', title: 'Footer Halaman', isActive: true, order: 13, content: { logo: '', businessName: 'Uni-LandFarm', copyright: '© 2026 Uni-LandFarm. All rights reserved.' } }
  ]);

  const renderImageUpload = (label: string, value: string, onChange: (val: string) => void, desc: string) => {
    const isRequired = label.includes('*');
    const isEmpty = !value || !value.trim();
    const showWarning = isRequired && isEmpty;

    return (
      <div className={`border rounded-2xl p-6 shadow-sm space-y-4 transition-all duration-300 ${
        showWarning 
          ? 'bg-red-50/20 dark:bg-red-950/10 border-red-400 dark:border-red-900/55 ring-2 ring-red-500/10 shadow-md shadow-red-500/5' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">{label}</label>
          {showWarning && (
            <span className="text-[10px] font-bold text-red-500 dark:text-red-400 flex items-center gap-1 animate-pulse bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded">
              ⚠ Wajib Diisi!
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center shrink-0 overflow-hidden relative shadow-inner">
            {value ? (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="flex-1 w-full space-y-2">
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Masukkan URL gambar atau unggah..."
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm"
              />
              <label className="px-4 py-2.5 bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-sm text-xs font-bold whitespace-nowrap shrink-0">
                <Upload className="w-3.5 h-3.5 text-brand-blue" /> Pilih Gambar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, onChange)}
                />
              </label>
              <button
                onClick={() => onChange('')}
                className="p-2.5 bg-red-50 hover:bg-red-100 hover:text-red-655 text-red-500 rounded-xl border border-red-100 transition-all shadow-sm shrink-0"
                title="Hapus Gambar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {desc && <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{desc}</p>}
      </div>
    );
  };

  const renderInputCard = (label: string, value: string, onChange: (val: string) => void, desc: string, maxLen?: number, placeholder?: string) => {
    const isRequired = label.includes('*');
    const isEmpty = !value || !value.trim();
    const showWarning = isRequired && isEmpty;

    return (
      <div className={`border rounded-2xl p-6 shadow-sm space-y-2 transition-all duration-300 ${
        showWarning 
          ? 'bg-red-50/20 dark:bg-red-950/10 border-red-400 dark:border-red-900/55 ring-2 ring-red-500/10 shadow-md shadow-red-500/5' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">{label}</label>
          <div className="flex items-center gap-2">
            {showWarning && (
              <span className="text-[10px] font-bold text-red-500 dark:text-red-400 flex items-center gap-1 animate-pulse bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded">
                ⚠ Wajib Diisi!
              </span>
            )}
            {maxLen && (
              <span className="text-[10px] font-bold text-slate-400">
                {(value || '').length} / {maxLen}
              </span>
            )}
          </div>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLen}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm"
        />
        {desc && <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{desc}</p>}
      </div>
    );
  };

  const renderTextareaCard = (label: string, value: string, onChange: (val: string) => void, desc: string, maxLen?: number, placeholder?: string) => {
    const isRequired = label.includes('*');
    const isEmpty = !value || !value.trim();
    const showWarning = isRequired && isEmpty;

    return (
      <div className={`border rounded-2xl p-6 shadow-sm space-y-2 transition-all duration-300 ${
        showWarning 
          ? 'bg-red-50/20 dark:bg-red-950/10 border-red-400 dark:border-red-900/55 ring-2 ring-red-500/10 shadow-md shadow-red-500/5' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">{label}</label>
          <div className="flex items-center gap-2">
            {showWarning && (
              <span className="text-[10px] font-bold text-red-500 dark:text-red-400 flex items-center gap-1 animate-pulse bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded">
                ⚠ Wajib Diisi!
              </span>
            )}
            {maxLen && (
              <span className="text-[10px] font-bold text-slate-400">
                {(value || '').length} / {maxLen}
              </span>
            )}
          </div>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLen}
          rows={4}
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm resize-none"
        />
        {desc && <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{desc}</p>}
      </div>
    );
  };

  const [sectionSearchQuery, setSectionSearchQuery] = useState('');

  const triggerToast = (msg: string) => {
    setEditorToast(msg);
    setTimeout(() => setEditorToast(null), 3000);
  };

  const fetchPageData = useCallback(async () => {
    if (!pageId || pageId === 'undefined') {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/landing-pages/${pageId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setPageData(data.data);
        const page = data.data;
        const fetchedContent = page.content?.contentJson || page.template?.defaultContent || {};
        let initialContent = fetchedContent;
        if (fetchedContent.pages && Array.isArray(fetchedContent.pages)) {
          setSitePages(fetchedContent.pages);
          const homePage = fetchedContent.pages.find((p: any) => p.slug === '/') || fetchedContent.pages[0];
          setCurrentPageSlug(homePage.slug);
          initialContent = homePage.content;
        } else {
          setSitePages([{ slug: '/', name: 'Beranda', content: fetchedContent }]);
          setCurrentPageSlug('/');
          initialContent = fetchedContent;
        }

        const isAi = !!(
          fetchedContent.isAiGenerated ||
          initialContent?.isAiGenerated ||
          fetchedContent.themeColor ||
          initialContent?.themeColor ||
          page.themeColor ||
          (fetchedContent.pages && fetchedContent.pages.some((p: any) => p.content?.isAiGenerated || p.content?.themeColor))
        );
        setIsAiPage(isAi);

        // Fetch Schedules
        if (pageId && pageId !== 'undefined') {
          try {
            const schedRes = await fetch(`/api/content-schedules?landingPageId=${pageId}`);
            const schedData = await schedRes.json();
            if (schedData.success && schedData.data) {
              const mappedSchedules = schedData.data.map((s: any) => {
                const dateObj = new Date(s.scheduledAt);
                const formattedDate = dateObj.toLocaleString('id-ID', {
                  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
                return {
                  id: s.id,
                  title: s.title,
                  date: formattedDate,
                  timestamp: dateObj.getTime(),
                  status: s.status.toUpperCase(),
                  targetSection: s.sectionName,
                  component: s.component,
                  content: s.newValue
                };
              });
              setSchedules(mappedSchedules);
            }
          } catch (err) {
            console.error('Failed to fetch schedules', err);
          }
        }

        const defaultSectionsList = [
          { id: 'logo', type: 'logo', title: 'Logo Website', isActive: true, order: 1 },
          { id: 'navbar', type: 'navbar', title: 'Menu Navigasi', isActive: true, order: 2 },
          { id: 'hero', type: 'hero', title: 'Hero Banner', isActive: true, order: 3 },
          { id: 'about', type: 'about', title: 'Tentang Usaha', isActive: true, order: 4 },
          { id: 'products', type: 'products', title: 'Produk & Layanan', isActive: true, order: 5 },
          { id: 'advantages', type: 'advantages', title: 'Keunggulan', isActive: true, order: 6 },
          { id: 'gallery', type: 'gallery', title: 'Galeri Foto', isActive: true, order: 7 },
          { id: 'testimonials', type: 'testimonials', title: 'Testimoni', isActive: true, order: 8 },
          { id: 'cta', type: 'cta', title: 'CTA Penawaran', isActive: true, order: 9 },
          { id: 'contact', type: 'contact', title: 'Kontak', isActive: true, order: 10 },
          { id: 'socialMedia', type: 'socialMedia', title: 'Media Sosial', isActive: true, order: 11 },
          { id: 'marketplaces', type: 'marketplaces', title: 'Toko Online (Marketplace)', isActive: false, order: 12 },
          { id: 'footer', type: 'footer', title: 'Footer Halaman', isActive: true, order: 13 }
        ];

        const mappedSections = defaultSectionsList.map((defaultSec) => {
          let aiSec = null;
          let isStr = false;

          if (Array.isArray(initialContent.sections)) {
            aiSec = initialContent.sections.find((s: any) => {
              if (typeof s === 'string') return s === defaultSec.id || s === defaultSec.type;
              return s.id === defaultSec.id || s.type === defaultSec.type;
            });
            if (aiSec) isStr = typeof aiSec === 'string';
          }

          const secType = defaultSec.type;
          const secTitle = defaultSec.title;

          let secActive = defaultSec.isActive;
          if (aiSec && !isStr && aiSec.isActive !== undefined) {
            secActive = aiSec.isActive;
          } else if (aiSec && !isStr && aiSec.status !== undefined) {
            secActive = (aiSec.status === 'Aktif' || aiSec.status === true);
          }

          const secContent = initialContent[defaultSec.id] ||
            (aiSec && !isStr && aiSec.content ? aiSec.content : null) ||
            getSectionDefaultContent(secType, page.businessName, page.title);

          const secStyles = (aiSec && !isStr && aiSec.styles ? aiSec.styles : null) || {};

          return {
            id: defaultSec.id,
            type: secType,
            title: secTitle,
            isActive: secActive,
            order: defaultSec.order,
            content: secContent,
            styles: secStyles
          };
        });

        // Append any custom sections from AI that weren't in the default list
        if (Array.isArray(initialContent.sections)) {
          initialContent.sections.forEach((aiSec: any) => {
            const secType = typeof aiSec === 'string' ? aiSec : (aiSec.type || aiSec.id);
            if (!secType) return;

            const exists = mappedSections.find(s => s.type === secType || s.id === secType);
            if (!exists) {
              const isStr = typeof aiSec === 'string';
              mappedSections.push({
                id: isStr ? aiSec : (aiSec.id || secType),
                type: secType,
                title: isStr ? getSectionDefaultTitle(secType) : (aiSec.title || aiSec.name || getSectionDefaultTitle(secType)),
                isActive: isStr ? true : (aiSec.isActive !== undefined ? aiSec.isActive : (aiSec.status === 'Aktif' || aiSec.status === true || aiSec.status === undefined)),
                order: mappedSections.length + 1,
                content: isStr ? (initialContent[aiSec] || getSectionDefaultContent(secType, page.businessName, page.title)) : (aiSec.content || initialContent[aiSec.id] || getSectionDefaultContent(secType, page.businessName, page.title)),
                styles: isStr ? {} : (aiSec.styles || {})
              });
            }
          });
        }
        setSections(mappedSections);

        // Ensure standard structure is populated
        const normalized = {
          isAiGenerated: isAi,
          themeColor: initialContent.themeColor || fetchedContent.themeColor || page.themeColor || null,
          sections: mappedSections.map(s => ({
            id: s.id,
            type: s.type,
            title: s.title,
            isActive: s.isActive,
            order: s.order,
            content: s.content,
            styles: s.styles,
            status: s.isActive ? 'Aktif' : 'Nonaktif',
            name: s.title
          })),
          logo: getSectionContentFromMapped(mappedSections, 'logo', initialContent.logo || ''),
          navbar: getSectionContentFromMapped(mappedSections, 'navbar', initialContent.navbar || { brand: page.businessName || 'Uni-LandFarm', items: [{ id: 'home', label: 'Beranda' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] }),
          hero: getSectionContentFromMapped(mappedSections, 'hero', initialContent.hero || { headline: page.title || 'Kembangkan Bisnis Anda', subheadline: 'Deskripsi singkat layanan/produk Anda.', banner: '', cta: 'Hubungi Kami' }),
          about: getSectionContentFromMapped(mappedSections, 'about', initialContent.about || { description: '', profile: '', story: '' }),
          products: getSectionContentFromMapped(mappedSections, 'products', Array.isArray(initialContent.products) ? initialContent.products : []),
          advantages: getSectionContentFromMapped(mappedSections, 'advantages', Array.isArray(initialContent.advantages) ? initialContent.advantages : [
            { icon: 'Shield', title: 'Keamanan Terjamin', description: 'Perlindungan maksimal untuk seluruh data and sistem Anda.' },
            { icon: 'Zap', title: 'Layanan Cepat', description: 'Respon instan dari tim support kami.' }
          ]),
          gallery: getSectionContentFromMapped(mappedSections, 'gallery', Array.isArray(initialContent.gallery) ? initialContent.gallery : []),
          testimonials: getSectionContentFromMapped(mappedSections, 'testimonials', Array.isArray(initialContent.testimonials) ? initialContent.testimonials : []),
          cta: getSectionContentFromMapped(mappedSections, 'cta', initialContent.cta || { title: 'Mulai Sekarang!', description: 'Hubungi kami hari ini untuk penawaran khusus.', buttonText: 'Hubungi Kami' }),
          contact: getSectionContentFromMapped(mappedSections, 'contact', initialContent.contact || { whatsapp: '', email: '', address: '', operatingHours: '' }),
          socialMedia: getSectionContentFromMapped(mappedSections, 'socialMedia', initialContent.socialMedia || { instagram: '', tiktok: '', facebook: '', youtube: '' }),
          marketplaces: getSectionContentFromMapped(mappedSections, 'marketplaces', initialContent.marketplaces || { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' }),
          footer: getSectionContentFromMapped(mappedSections, 'footer', initialContent.footer || { logo: '', businessName: page.businessName || 'Uni-LandFarm', copyright: `© 2026 ${page.businessName || 'Uni-LandFarm'}. All rights reserved.` })
        };

        setRawContentJson(normalized);
      } else {
        triggerToast('Gagal memuat data landing page.');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  // Auto-Publish Scheduler Loop (Polling backend cron for dev environment)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!pageId || pageId === 'undefined') return;
      
      try {
        const schedRes = await fetch(`/api/content-schedules?landingPageId=${pageId}`);
        const schedData = await schedRes.json();
        
        if (schedData.success && schedData.data) {
          const now = new Date();
          const dueSchedules = schedData.data.filter((s: any) => 
            s.status === 'Scheduled' && new Date(s.scheduledAt) <= now
          );
          
          if (dueSchedules.length > 0) {
            // Trigger backend cron
            await fetch('/api/cron/process-schedules');
            
            // Notify and refresh
            triggerToast('Jadwal konten otomatis dieksekusi! Memperbarui data...');
            await fetchPageData();
          }
        }
      } catch (err) {
        console.error("Failed to check schedules:", err);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [pageId, fetchPageData]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

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
        const updatedPages = sitePages.map(p => p.slug === currentPageSlug ? { ...p, content: contentJson } : p);
        if (!updatedPages.find(p => p.slug === currentPageSlug)) {
          updatedPages.push({ slug: currentPageSlug, name: currentPageSlug === '/' ? 'Beranda' : 'Halaman Baru', content: contentJson });
        }
        setSitePages(updatedPages);
        const homePage = updatedPages.find(p => p.slug === '/') || updatedPages[0];
        const homeContent = homePage?.content || {};
        const res = await fetch(`/api/landing-pages/${pageId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentJson: {
              ...homeContent,
              pages: updatedPages
            }
          })
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
  }, [contentJson, pageId, sections]);

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
    if (!editPublishTitle || !editPublishTitle.trim()) {
      triggerToast('Nama Landing Page tidak boleh kosong!');
      return;
    }
    if (!editPublishBusinessName || !editPublishBusinessName.trim()) {
      triggerToast('Nama Bisnis tidak boleh kosong!');
      return;
    }
    if (!editPublishSlug || !editPublishSlug.trim()) {
      triggerToast('URL Slug tidak boleh kosong!');
      return;
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(editPublishSlug)) {
      triggerToast('URL Slug hanya boleh berisi huruf, angka, tanda hubung (-), dan garis bawah (_)!');
      return;
    }
    if (sections.filter(s => s.isActive).length === 0) {
      triggerToast('Minimal harus ada 1 section aktif untuk mempublikasikan!');
      return;
    }

    // Validate section completeness
    const incompleteSections = sections.filter(s => s.isActive && getSectionCompleteness(s.type || s.id, s.content).type === 'warning');
    if (incompleteSections.length > 0) {
      const incompleteNames = incompleteSections.map(s => {
        switch (s.type || s.id) {
          case 'logo': return 'Logo Website';
          case 'navbar': return 'Menu Navigasi';
          case 'hero': return 'Hero Banner';
          case 'about': return 'Tentang Usaha';
          case 'products': return 'Produk & Layanan';
          case 'advantages': return 'Keunggulan';
          case 'gallery': return 'Galeri Foto';
          case 'testimonials': return 'Testimoni';
          case 'cta': return 'CTA Penawaran';
          case 'contact': return 'Kontak';
          case 'socialMedia': return 'Media Sosial';
          case 'marketplaces': return 'Toko Online';
          case 'footer': return 'Footer Halaman';
          default: return s.title || s.type;
        }
      });
      triggerToast(`Gagal publikasi! Konten pada bagian berikut harus diisi: ${incompleteNames.join(', ')}`);
      return;
    }

    setIsSubmittingPublish(true);
    try {
      // 1. Save all data CMS and update status to Published
      setSaveStatus('Saving');
      const updatedPages = sitePages.map(p => p.slug === currentPageSlug ? { ...p, content: contentJson } : p);
      if (!updatedPages.find(p => p.slug === currentPageSlug)) {
        updatedPages.push({ slug: currentPageSlug, name: currentPageSlug === '/' ? 'Beranda' : 'Halaman Baru', content: contentJson });
      }
      setSitePages(updatedPages);

      const homePage = updatedPages.find(p => p.slug === '/') || updatedPages[0];
      const homeContent = homePage?.content || {};
      const saveRes = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentJson: {
            ...homeContent,
            pages: updatedPages
          },
          title: editPublishTitle.trim(),
          businessName: editPublishBusinessName.trim(),
          slug: editPublishSlug.trim(),
          status: 'Published',
          publishedAt: new Date().toISOString(),
          publicUrl: `/site/${editPublishSlug.trim()}`
        })
      });
      const saveData = await saveRes.json();
      if (!saveData.success) {
        triggerToast(saveData.message || 'Gagal menyimpan dan mempublikasikan halaman.');
        setIsSubmittingPublish(false);
        return;
      }
      setSaveStatus('Saved');

      triggerToast('Landing page berhasil diterbitkan secara live!');
      setPageData((prev: any) => prev ? {
        ...prev,
        title: editPublishTitle.trim(),
        businessName: editPublishBusinessName.trim(),
        slug: editPublishSlug.trim(),
        status: 'Published',
        publicUrl: `/site/${editPublishSlug.trim()}`
      } : null);
      setIsPublishedSuccess(true);
      onPublishSuccess();
    } catch (err) {
      triggerToast('Gagal terhubung ke server.');
    } finally {
      setIsSubmittingPublish(false);
    }
  };

  // Save manual draft with validation
  const handleSaveDraft = async () => {
    setSaveStatus('Saving');
    try {
      const updatedPages = sitePages.map(p => p.slug === currentPageSlug ? { ...p, content: contentJson } : p);
      if (!updatedPages.find(p => p.slug === currentPageSlug)) {
        updatedPages.push({ slug: currentPageSlug, name: currentPageSlug === '/' ? 'Beranda' : 'Halaman Baru', content: contentJson });
      }

      const homePage = updatedPages.find(p => p.slug === '/') || updatedPages[0];
      const homeContent = homePage?.content || {};
      const res = await fetch(`/api/landing-pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentJson: {
            ...homeContent,
            pages: updatedPages
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('Saved');
        triggerToast('Draf berhasil disimpan secara manual!');
      } else {
        setSaveStatus('Error');
        triggerToast(data.message || 'Gagal menyimpan draf.');
      }
    } catch (e) {
      setSaveStatus('Error');
      triggerToast('Terjadi kesalahan jaringan.');
    }
  };



  // Unified update helper for sync
  const updateContentJson = (newContent: any) => {
    const typeKeyMap: Record<string, any> = {};
    Object.keys(newContent).forEach(key => {
      if (key !== 'sections') {
        typeKeyMap[key] = newContent[key];
      }
    });

    const updatedSections = sections.map((s, idx) => {
      const type = s.type || s.id;
      const updatedContent = typeKeyMap[type] !== undefined ? typeKeyMap[type] : s.content;
      return {
        ...s,
        content: updatedContent,
        order: idx + 1
      };
    });

    newContent.sections = updatedSections.map(s => ({
      id: s.id,
      type: s.type,
      title: s.title,
      isActive: s.isActive,
      order: s.order,
      content: s.content,
      styles: s.styles,
      status: s.isActive ? 'Aktif' : 'Nonaktif',
      name: s.title
    }));

    setContentJson(newContent);
    setSections(updatedSections);
  };

  const updateSectionsState = (newSections: any[]) => {
    const mapped = newSections.map((s, idx) => ({
      ...s,
      order: idx + 1
    }));
    setSections(mapped);
    setContentJson((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated.sections = mapped.map(s => ({
        id: s.id,
        type: s.type,
        title: s.title,
        isActive: s.isActive,
        order: s.order,
        content: s.content,
        styles: s.styles,
        status: s.isActive ? 'Aktif' : 'Nonaktif',
        name: s.title
      }));
      // Keep root keys updated for TemplateRenderer
      mapped.forEach(s => {
        const type = s.type || s.id;
        updated[type] = s.content;
      });
      return updated;
    });
  };

  const activeSection = sections.find(s => s.id === activeAccordion);
  const activeSectionType = activeSection ? (activeSection.type || activeSection.id) : activeAccordion;

  const updateActiveSectionContent = (updater: (content: any) => any) => {
    const updatedSections = sections.map(s => {
      if (s.id === activeAccordion) {
        return {
          ...s,
          content: updater(s.content)
        };
      }
      return s;
    });
    updateSectionsState(updatedSections);
  };

  const updateSectionStyle = (key: 'backgroundColor' | 'textColor' | 'fontFamily', value: string) => {
    const updatedSections = sections.map(s => {
      if (s.id === activeAccordion) {
        return {
          ...s,
          styles: {
            ...(s.styles || {}),
            [key]: value
          }
        };
      }
      return s;
    });
    updateSectionsState(updatedSections);
  };

  const getMarketplaceValue = (mp: string) => {
    const content = activeSection?.content;
    if (!content) return '';
    if (content.marketplaces && content.marketplaces[mp] !== undefined) {
      return content.marketplaces[mp];
    }
    return content[mp] || '';
  };

  const updateMarketplaceValue = (mp: string, value: string) => {
    updateActiveSectionContent(c => {
      const next = { ...c };
      if (next.marketplaces) {
        next.marketplaces = { ...next.marketplaces, [mp]: value };
      } else {
        next[mp] = value;
      }
      return next;
    });
  };

  // State for confirming section deletion
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

  // Add section
  const handleAddSection = (type: string) => {
    const newId = `${type}-${Date.now()}`;
    const newTitle = getSectionDefaultTitle(type);
    const newContent = getSectionDefaultContent(type, pageData?.businessName, pageData?.title);
    const newSection = {
      id: newId,
      type: type,
      title: newTitle,
      isActive: true,
      order: sections.length + 1,
      content: newContent
    };
    const updatedSections = [...sections, newSection];
    updateSectionsState(updatedSections);
    setActiveAccordion(newId);
    setShowAddSectionDropdown(false);
    triggerToast(`Section ${newTitle} berhasil ditambahkan!`);
  };

  // Delete section
  const handleDeleteSection = (id: string) => {
    if (sections.length <= 1) {
      triggerToast('Minimal harus ada 1 section!');
      return;
    }

    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;

    const updatedSections = sections.filter(s => s.id !== id);

    // If the deleted section was active, move active section to the first remaining section.
    if (activeAccordion === id) {
      setActiveAccordion(updatedSections[0].id);
    }

    updateSectionsState(updatedSections);
    triggerToast('Section berhasil dihapus!');
    fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Section Dihapus', message: `Sebuah section telah dihapus dari halaman.`, type: 'info' })
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
        const nextActive = !sec.isActive;
        return {
          ...sec,
          isActive: nextActive,
          status: nextActive ? 'Aktif' : 'Nonaktif'
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
      // Fallback premium copywriting suggestions matching brand and command
      let fallbackHeadline = 'Solusi Pertanian Terbaik';
      let fallbackSubheadline = 'Dapatkan produk berkualitas unggul langsung dari sumber terpercaya.';
      let fallbackCta = 'Pesan Sekarang';

      const cmd = aiCommand.toLowerCase();
      if (cmd.includes('ramadhan') || cmd.includes('puasa')) {
        fallbackHeadline = 'Promo Spesial Ramadhan';
        fallbackSubheadline = 'Sambut bulan suci dengan penawaran menarik. Nikmati diskon eksklusif untuk setiap pembelian selama bulan puasa.';
        fallbackCta = 'Klaim Promo';
      } else if (cmd.includes('madu')) {
        fallbackHeadline = 'Madu Klanceng Alami Murni';
        fallbackSubheadline = 'Kaya khasiat dan terjaga kemurniannya. Solusi tepat untuk menjaga stamina dan kesehatan keluarga Anda setiap hari.';
        fallbackCta = 'Beli Madu Murni';
      } else if (cmd.includes('whatsapp') || cmd.includes('wa') || cmd.includes('kontak')) {
        fallbackHeadline = 'Konsultasi Gratis via WhatsApp';
        fallbackSubheadline = 'Punya pertanyaan tentang produk kami? Tim ahli kami siap membantu Anda kapan saja. Hubungi kami sekarang!';
        fallbackCta = 'Chat WhatsApp';
      } else if (cmd.includes('keunggulan') || cmd.includes('produk')) {
        fallbackHeadline = 'Kualitas Premium Terjamin';
        fallbackSubheadline = 'Diproduksi dengan standar tinggi untuk memastikan kepuasan Anda. Garansi kualitas terbaik di kelasnya.';
        fallbackCta = 'Lihat Detail';
      }

      setAiSuggestions({
        reply: `Saya telah menyesuaikan copywriting berdasarkan permintaan Anda: "${aiCommand.substring(0, 30)}..."`,
        suggestedData: {
          headline: fallbackHeadline,
          subheadline: fallbackSubheadline,
          cta: fallbackCta
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

    if (activeSectionType === 'hero') {
      updateActiveSectionContent(c => ({ ...c, headline, subheadline, cta: ctaText }));
    } else if (activeSectionType === 'cta') {
      updateActiveSectionContent(c => ({ ...c, title: headline, description: subheadline, buttonText: ctaText }));
    }
    setIsAiModalOpen(false);
    setAiSuggestions(null);
    setAiCommand('');
    triggerToast('Konten AI berhasil diterapkan ke form!');
  };

  // Add item to schedule list
  const handleAddSchedule = async () => {
    setScheduleError(null);
    if (!newScheduleTitle.trim() || !newScheduleTargetSection || (!newScheduleContent.trim() && !newScheduleImage.trim()) || !newScheduleDate || !newScheduleTime) {
      setScheduleError('Judul, target section, waktu harus diisi, dan minimal salah satu dari teks konten atau gambar!');
      return;
    }

    const scheduleDateTime = new Date(`${newScheduleDate}T${newScheduleTime}`);
    if (scheduleDateTime <= new Date()) {
      setScheduleError('Waktu jadwal harus di masa depan!');
      return;
    }

    try {
      const res = await fetch('/api/content-schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newScheduleTitle,
          landingPageId: Number(pageId),
          sectionName: newScheduleTargetSection,
          component: 'Content',
          newValue: JSON.stringify({ text: newScheduleContent, image: newScheduleImage }),
          scheduledAt: scheduleDateTime.toISOString(),
          status: 'Scheduled'
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        const formattedDate = scheduleDateTime.toLocaleString('id-ID', {
          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        setSchedules(prev => [
          {
            id: data.data.id,
            title: newScheduleTitle,
            date: formattedDate,
            timestamp: scheduleDateTime.getTime(),
            status: 'SCHEDULED',
            targetSection: newScheduleTargetSection,
            content: newScheduleContent
          },
          ...prev
        ]);

        setNewScheduleTitle('');
        setNewScheduleDate('');
        setNewScheduleTime('');
        setNewScheduleContent('');
        setNewScheduleImage('');
        setIsSchedulerModalOpen(false);
        triggerToast('Konten baru berhasil dijadwalkan!');
      } else {
        setScheduleError(data.message || 'Gagal menyimpan jadwal.');
      }
    } catch (err: any) {
      setScheduleError('Terjadi kesalahan jaringan.');
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    if (!confirm('Yakin ingin menghapus jadwal ini?')) return;
    try {
      const res = await fetch(`/api/content-schedules?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setSchedules(prev => prev.filter(s => s.id !== id));
        triggerToast('Jadwal berhasil dihapus!');
      } else {
        triggerToast(data.message || 'Gagal menghapus jadwal.');
      }
    } catch (err) {
      triggerToast('Terjadi kesalahan jaringan.');
    }
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
  const filteredSections = sections.filter(s => (s.title || s.name || '').toLowerCase().includes(sectionSearchQuery.toLowerCase()));

  if (showPublishConfirm) {
    if (!pageData) {
      return (
        <div className="fixed inset-0 bg-[#F8FAFC] text-slate-900 flex items-center justify-center z-[250]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 animate-pulse">Memuat data publikasi...</p>
          </div>
        </div>
      );
    }

    const status = pageData?.status || 'Draft';

    const formattedLastUpdate = pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB' : '-';

    const hostOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://unilandfarm.com';
    const publicSiteUrl = `${hostOrigin}/site/${editPublishSlug}`;

    // Validations
    const isContentComplete = !!pageData?.title?.trim() && !!pageData?.businessName?.trim() && sections.filter(s => s.isActive).length > 0;
    const isSlugValid = !!pageData?.slug?.trim() && /^[a-zA-Z0-9-_]+$/.test(pageData.slug);
    const isReadyToPublish = isContentComplete && isSlugValid;
    if (isPublishedSuccess) {
      /* SUCCESS SCREEN */
      return (
        <div className="fixed inset-0 bg-[#F8FAFC] text-slate-800 flex flex-col font-sans z-[200] overflow-y-auto items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce border border-amber-200">
              🎉
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Landing Page Berhasil Dipublikasikan</h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Landing page Anda sudah aktif dan dapat diakses secara online oleh publik.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl space-y-2 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">URL Landing Page</span>
              <div className="flex items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-xl p-2.5">
                <input
                   type="text"
                   readOnly
                   value={publicSiteUrl}
                   className="text-xs font-mono font-bold text-slate-800 bg-transparent outline-none w-full"
                   onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={() => {
                    copyToClipboard(publicSiteUrl);
                    setIsUrlCopied(true);
                    triggerToast('URL disalin ke clipboard!');
                    setTimeout(() => setIsUrlCopied(false), 2000);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shrink-0 ${isUrlCopied ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                >
                  {isUrlCopied ? (
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Tersalin!</span>
                  ) : (
                    'Salin URL'
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => window.open(publicSiteUrl, '_blank')}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
              >
                <Globe className="w-4 h-4" /> Buka Landing Page
              </button>

              <button
                onClick={() => {
                  setSaveStatus('Saved');
                  setIsPublishedSuccess(false);
                  setShowPublishConfirm(false);
                  if (onBack) onBack();
                }}
                className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer font-black"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
          {editorToast && (
            <div className="fixed bottom-6 right-6 bg-white border border-[#FFB000]/30 text-slate-800 px-5 py-3 rounded-2xl shadow-2xl z-[350] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFB000] animate-pulse" />
              <span className="text-base font-black uppercase tracking-wider">{editorToast}</span>
            </div>
          )}
        </div>
      );
    }

    const handleSavePublishChanges = async () => {
      if (!editPublishTitle || !editPublishTitle.trim()) {
        triggerToast('Nama Landing Page tidak boleh kosong!');
        setSaveStatus('Error');
        return;
      }
      if (!editPublishBusinessName || !editPublishBusinessName.trim()) {
        triggerToast('Nama Bisnis tidak boleh kosong!');
        setSaveStatus('Error');
        return;
      }
      if (!editPublishSlug || !editPublishSlug.trim()) {
        triggerToast('URL Slug tidak boleh kosong!');
        setSaveStatus('Error');
        return;
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(editPublishSlug)) {
        triggerToast('URL Slug hanya boleh berisi huruf, angka, tanda hubung (-), dan garis bawah (_)!');
        setSaveStatus('Error');
        return;
      }

      setSaveStatus('Saving');
      try {
        const res = await fetch(`/api/landing-pages/${pageId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editPublishTitle.trim(),
            businessName: editPublishBusinessName.trim(),
            slug: editPublishSlug.trim()
          })
        });
        const data = await res.json();
        if (data.success) {
          setPageData({
            ...pageData,
            title: editPublishTitle.trim(),
            businessName: editPublishBusinessName.trim(),
            slug: editPublishSlug.trim()
          });
          triggerToast('Perubahan berhasil disimpan!');
          setSaveStatus('Saved');
        } else {
          triggerToast(data.message || 'Gagal menyimpan perubahan.');
          setSaveStatus('Error');
        }
      } catch (e) {
        triggerToast('Terjadi kesalahan jaringan.');
        setSaveStatus('Error');
      }
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-tr from-[#E0F2FE]/50 via-white/80 to-[#DCFCE7]/40 text-[#0F172A] flex flex-col font-sans z-[200] overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[100px]" />
        </div>

        {/* Header */}
        <div className="h-[72px] px-6 border-b border-[#E5E7EB]/80 flex items-center bg-white/80 backdrop-blur-md shrink-0 shadow-sm z-30 relative gap-5">
          <button
            onClick={() => setShowPublishConfirm(false)}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all cursor-pointer shrink-0"
            title="Kembali ke Editor"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>

          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-[#FFB000] -mt-0.5" />
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-normal truncate">Publikasi</span>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative z-10">
          <div className="max-w-[1100px] mx-auto px-6 py-5 space-y-5 pb-32">

            {/* Section 1: Explainer */}
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Periksa informasi landing page sebelum dipublikasikan.
            </p>

            {/* Section 2: Summary Card (Editable) */}
            <div className="bg-[#ECFDF5] border-2 border-emerald-400 rounded-2xl px-6 py-4 shadow-md space-y-4 relative overflow-hidden">
              <div>
                <h3 className="text-lg font-bold text-emerald-950 tracking-tight">Ringkasan Landing Page</h3>
                <p className="text-sm text-emerald-800/80 mt-0">Kelola detail informasi identitas dan status dari landing page Anda.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {/* Left Column: Form Inputs */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Nama Landing Page</label>
                    <input
                      type="text"
                      value={editPublishTitle}
                      onChange={e => setEditPublishTitle(e.target.value)}
                      className="px-4 py-2 bg-white border border-emerald-200 hover:border-emerald-300 focus:border-emerald-500 rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Nama Bisnis</label>
                    <input
                      type="text"
                      value={editPublishBusinessName}
                      onChange={e => setEditPublishBusinessName(e.target.value)}
                      className="px-4 py-2 bg-white border border-emerald-200 hover:border-emerald-300 focus:border-emerald-500 rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider">URL Slug</label>
                    <div className="flex items-center shadow-sm rounded-xl overflow-hidden border border-emerald-200 hover:border-emerald-300 focus-within:border-emerald-500 transition-all bg-white">
                      <span className="px-4 py-2 bg-emerald-50/50 border-r border-emerald-100 text-sm font-mono text-emerald-600/70 select-none">
                        unilandfarm.com/site/
                      </span>
                      <input
                        type="text"
                        value={editPublishSlug}
                        onChange={e => setEditPublishSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className="flex-1 px-4 py-2 bg-transparent text-sm font-semibold text-slate-800 outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Metadata (Read-only) */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Template Website</span>
                    <div className="px-4 py-2 bg-white/90 border border-emerald-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">
                      {isAiPage ? 'Generate AI' : (pageData?.template?.name || pageData?.template || '-')}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Status</span>
                    <div className="px-4 py-2 bg-white/90 border border-emerald-200 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm">
                      <span className={`w-2.5 h-2.5 rounded-full ${status === 'Published' ? 'bg-emerald-500 shadow-sm animate-pulse' : 'bg-slate-400'}`} />
                      <span className={status === 'Published' ? 'text-emerald-600' : 'text-slate-600'}>{status}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Terakhir Update</span>
                    <div className="px-4 py-2 bg-white/90 border border-emerald-200 rounded-xl text-sm font-semibold text-slate-600 truncate shadow-sm">
                      {formattedLastUpdate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: URL Landing Page (Full Width Card) */}
            <div className="bg-[#FFFDF5] border-2 border-amber-400 rounded-2xl px-6 py-4 shadow-md flex flex-col space-y-3 relative overflow-hidden">
              <div>
                <h3 className="text-lg font-bold text-amber-950 tracking-tight">URL Landing Page</h3>
                <p className="text-sm text-amber-800/80 mt-0">Alamat web unik untuk mengakses landing page Anda secara online.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full text-sm font-mono font-semibold text-slate-800 bg-white border border-amber-200 rounded-xl py-2 px-4 break-all select-all shadow-sm">
                  {publicSiteUrl}
                </div>
                <button
                  onClick={() => {
                    copyToClipboard(publicSiteUrl);
                    setIsUrlCopied(true);
                    triggerToast('Link disalin ke clipboard!');
                    setTimeout(() => setIsUrlCopied(false), 2000);
                  }}
                  className={`w-full sm:w-auto px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-2 shrink-0 shadow-sm ${isUrlCopied
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                >
                  {isUrlCopied ? (
                    <>
                      <Check className="w-4 h-4" /> Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Salin URL
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                onClick={handleSavePublishChanges}
                disabled={saveStatus === 'Saving'}
                className="px-6 py-2.5 border border-[#E5E7EB] text-[#0F172A] hover:bg-slate-50 rounded-lg text-sm font-semibold transition-all cursor-pointer text-center disabled:opacity-50 shadow-sm bg-white"
              >
                {saveStatus === 'Saving' ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <button
                onClick={handlePublishSubmit}
                disabled={isSubmittingPublish}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm bg-[#F59E0B] hover:bg-[#D97706] hover:scale-105 text-white"
              >
                {isSubmittingPublish ? 'Memproses...' : 'Publish Landing Page'}
              </button>
            </div>

          </div>
        </div>
        {editorToast && (
          <div className="fixed bottom-6 right-6 bg-white border border-[#FFB000]/30 text-slate-800 px-5 py-3 rounded-2xl shadow-2xl z-[350] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB000] animate-pulse" />
            <span className="text-base font-black uppercase tracking-wider">{editorToast}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 z-[100] flex flex-col font-sans text-slate-800 dark:text-slate-100 visual-editor-container">
      {/* 1. TOP BAR CONTROL PANEL (Tinggi 72px) */}
      <div className="h-[72px] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 shrink-0 relative z-30 shadow-sm gap-5">
        {/* Left: Project Details */}
        <div className="flex items-center gap-4 w-1/3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-all cursor-pointer shrink-0"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-normal truncate">Visual Editor</span>
              <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${pageData?.status === 'Published' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                pageData?.status === 'Inactive' ? 'bg-red-500/10 text-red-600' :
                  'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                {pageData?.status || 'Draft'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400 leading-normal mt-1 min-w-0">
              <span className="truncate">Proyek: {pageData?.title || 'Situs Baru'}</span>
              <span className="shrink-0">•</span>
              <span className={`shrink-0 ${saveStatus === 'Saving' ? 'text-amber-500 animate-pulse' : saveStatus === 'Error' ? 'text-red-500' : 'text-emerald-500'}`}>
                {saveStatus === 'Saving' ? 'Menyimpan...' : saveStatus === 'Error' ? 'Gagal menyimpan' : 'Draft Tersimpan'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Main Tab Switching System */}
        <div className="flex items-center justify-center w-1/3">
          <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 gap-0.5">
            {[
              { id: 'sections', label: 'Daftar Section', icon: <Layers className="w-3 h-3" /> },
              { id: 'ai_writer', label: 'AI Content Scheduler', icon: <Bot className="w-3 h-3" /> },
              { id: 'preview', label: 'Preview Situs', icon: <Eye className="w-3 h-3" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-[#FFB000] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
              >
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Publish Button */}
        <div className="flex items-center justify-end gap-3 w-1/3 shrink-0">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue dark:bg-brand-blue/20 dark:hover:bg-brand-blue/30 dark:text-brand-blue-100 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            Simpan Draft
          </button>
          {pageData?.status !== 'Published' && pageData?.status !== 'Inactive' && (
            <button
              onClick={() => {
                setEditPublishTitle(pageData?.title || '');
                setEditPublishBusinessName(pageData?.businessName || '');
                setEditPublishSlug(pageData?.slug || '');
                setShowPublishConfirm(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-xs md:text-sm font-black uppercase tracking-wider hover:scale-105 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              Publish <Send className="w-3.5 h-3.5 hidden sm:block" />
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Workstation */}
      <div className="flex flex-1 overflow-hidden">

        {/* TAB 1: DAFTAR SECTION */}
        {activeTab === 'sections' && (
          <div className="flex flex-grow overflow-hidden">
            {/* PANEL KIRI: SECTION MANAGER (Lebar 340px) */}
            <aside className="w-[340px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 relative z-25 overflow-hidden shadow-sm">
              {/* Panel Header */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2.5 shrink-0 relative" ref={addSectionDropdownRef}>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Menu className="w-3.5 h-3.5 text-brand-blue" />
                    Section Manager
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddSectionDropdown(!showAddSectionDropdown);
                    }}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 dark:text-slate-400 hover:text-brand-blue transition-colors cursor-pointer"
                    title="Tambah Section Baru"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Search Sections */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={sectionSearchQuery}
                    onChange={(e) => setSectionSearchQuery(e.target.value)}
                    placeholder="Cari bagian..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-sm font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-brand-blue/30"
                  />
                </div>

                {/* Dropdown Add Section */}
                {showAddSectionDropdown && (
                  <div className="absolute top-[4.2rem] right-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-xl z-[60] space-y-0.5 max-h-[300px] w-56 overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2 duration-150">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-2 py-1 select-none">Halaman:</span>
                    {sitePages.map(page => (
                      <button
                        key={page.slug}
                        onClick={() => {
                          setShowAddSectionDropdown(false);
                          setCurrentPageSlug(page.slug);
                          setContentJson(page.content || {});
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between text-xs ${currentPageSlug === page.slug ? 'bg-brand-blue/10 text-brand-blue font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        <span className="truncate">{page.name}</span>
                        {currentPageSlug === page.slug && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setShowAddSectionDropdown(false);
                        setShowAddPageModal(true);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/15 rounded-lg transition-all flex items-center gap-2 text-xs text-brand-blue hover:text-brand-blue-600 dark:text-brand-blue-400 dark:hover:text-brand-blue-300 group cursor-pointer border-none mt-1"
                    >
                      <div className="w-5 h-5 rounded bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-[11px] tracking-tight">Tambah Halaman Baru</span>
                    </button>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-2 py-1 select-none">Pilih Section Baru:</span>
                    {[
                      { type: 'hero', name: 'Hero Banner' },
                      { type: 'about', name: 'Tentang Usaha' },
                      { type: 'products', name: 'Produk/Layanan' },
                      { type: 'advantages', name: 'Keunggulan' },
                      { type: 'gallery', name: 'Galeri' },
                      { type: 'testimonials', name: 'Testimoni' },
                      { type: 'contact', name: 'Kontak' },
                      { type: 'footer', name: 'Footer' }
                    ].map(sec => (
                      <button
                        key={sec.type}
                        onClick={() => handleAddSection(sec.type)}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/15 rounded-lg transition-all flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white group cursor-pointer border-none"
                      >
                        <div className="w-5 h-5 rounded bg-slate-50 dark:bg-slate-950 flex items-center justify-center group-hover:bg-brand-blue/10 dark:group-hover:bg-brand-blue/15 transition-colors">
                          {getSectionIcon(sec.type, false)}
                        </div>
                        <span className="font-bold text-[11px] tracking-tight">{sec.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                {filteredSections.map((sec, idx) => {
                  const isActive = activeAccordion === sec.id;
                  const isSectionAktif = sec.isActive;
                  const completeness = getSectionCompleteness(sec.type || sec.id, sec.content);
                  const isPenyebabGagal = isSectionAktif && completeness.type === 'warning';

                  return (
                    <div
                      key={sec.id || `section-${idx}`}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = 'move';
                        setDraggedSectionIndex(idx);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedSectionIndex !== null && draggedSectionIndex !== idx) {
                          const newSections = [...sections];
                          const draggedItem = newSections[draggedSectionIndex];
                          newSections.splice(draggedSectionIndex, 1);
                          newSections.splice(idx, 0, draggedItem);
                          updateSectionsState(newSections);
                          triggerToast('Urutan section diperbarui!');
                        }
                        setDraggedSectionIndex(null);
                      }}
                      onDragEnd={() => setDraggedSectionIndex(null)}
                      onClick={() => setActiveAccordion(sec.id)}
                      className={`group w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isPenyebabGagal
                          ? isActive
                            ? 'bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-500 ring-2 ring-red-500/20 text-red-900 dark:text-red-200 shadow-md shadow-red-500/5'
                            : 'bg-red-50/60 dark:bg-red-950/25 border-red-300 dark:border-red-900/60 text-red-800 dark:text-red-300 hover:bg-red-100/50 dark:hover:bg-red-950/35 hover:border-red-400'
                          : isActive
                            ? 'bg-amber-50/30 dark:bg-amber-950/10 border-[#FFB000] dark:border-[#FFB000]/80 text-slate-850 dark:text-white shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 mr-1">
                        <div className="w-6 h-6 bg-slate-50 dark:bg-slate-900 rounded flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                          {getSectionIcon(sec.type || sec.id, isSectionAktif)}
                        </div>

                        <div className="truncate min-w-0 flex-1 ml-0.5">
                          <span className={`text-[13px] font-extrabold flex items-center gap-1 block truncate leading-tight ${
                            isPenyebabGagal
                              ? 'text-red-700 dark:text-red-400 font-black'
                              : isSectionAktif
                                ? 'text-slate-800 dark:text-slate-200'
                                : 'text-slate-400 dark:text-slate-500'
                          }`}>
                            {isPenyebabGagal && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 animate-pulse" />}
                            {sec.title || sec.name}
                          </span>
                          
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 ${isSectionAktif ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' : 'bg-slate-50 text-slate-450 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-500 dark:border-slate-700/50'}`}>
                              {isSectionAktif ? 'AKTIF' : 'NONAKTIF'}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider whitespace-nowrap shrink-0 ${
                              completeness.type === 'success'
                                ? 'bg-blue-50 text-brand-blue border border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30'
                                : isPenyebabGagal
                                  ? 'bg-red-100 text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 animate-pulse'
                                  : 'bg-amber-50/70 text-amber-600 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30'
                            }`}>
                              {completeness.text}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right side controls: Move up/down, status toggle, delete */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(idx, 'up');
                          }}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                          title="Pindahkan Ke Atas"
                        >
                          <ChevronUp className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(idx, 'down');
                          }}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                          title="Pindahkan Ke Bawah"
                        >
                          <ChevronDown className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSectionActive(sec.id);
                          }}
                          className={`p-1.5 rounded ${isSectionAktif ? 'text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                          title={isSectionAktif ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          <Eye className="w-[18px] h-[18px]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (sections.length <= 1) {
                              triggerToast('Minimal harus ada 1 section!');
                              return;
                            }
                            setSectionToDelete(sec.id);
                          }}
                          className={`p-1.5 rounded transition-colors ${sections.length <= 1 ? 'text-slate-350 dark:text-slate-700 cursor-not-allowed' : 'text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500'}`}
                          title="Hapus Section"
                          disabled={sections.length <= 1}
                        >
                          <Trash2 className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Focused Property Editor (takes remaining space) */}
            <main className="flex-1 bg-slate-50 dark:bg-slate-950 flex flex-col h-full overflow-hidden">
              <div className="py-2.5 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
                <div>
                  <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-none">Property Editor</h2>
                  <span className="text-[15px] font-black text-brand-blue block mt-1">
                    Mengedit: {activeSection?.title || activeSection?.name || activeAccordion}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('ai_writer');
                    setAiCommand(`Tulis ${activeSection?.title || activeSection?.name || activeAccordion} untuk usaha ${pageData?.businessName || 'saya'}`);
                  }}
                  className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-650 dark:text-purple-400 rounded-lg transition-all border border-purple-500/20 flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                  title="Gunakan AI untuk menulis konten section ini"
                >
                  <Sparkles className="w-3 h-3 animate-pulse" /> AI Write
                </button>
              </div>
              
              {/* Contextual Properties Form Fields */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 max-w-4xl mx-auto w-full space-y-6 custom-scrollbar pb-24">
                  <div className="space-y-6">
                    {/* properties for: logo */}
                    {activeSectionType === 'logo' && (
                      renderImageUpload(
                        'Logo Utama Website *',
                        activeSection?.content || '',
                        (url) => updateActiveSectionContent(() => url),
                        'Rekomendasi ukuran: 512 x 512 piksel dengan format PNG transparan.'
                      )
                    )}

                    {/* properties for: navbar */}
                    {activeSectionType === 'navbar' && (
                      <div className="space-y-6">
                        {renderInputCard(
                          'Nama Brand / Judul Navigasi *',
                          activeSection?.content?.brand || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, brand: val })),
                          'Nama bisnis Anda yang akan ditampilkan di menu navigasi.',
                          50
                        )}
                                    <div className={`border rounded-2xl p-6 shadow-sm space-y-4 transition-all duration-300 ${
                          (!activeSection?.content?.items || activeSection.content.items.length === 0)
                            ? 'bg-red-50/20 dark:bg-red-950/10 border-red-400 dark:border-red-900/55 ring-2 ring-red-500/10 shadow-md shadow-red-500/5'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}>
                          <div className="flex justify-between items-center">
                            <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Menu Link Navigasi *</label>
                            {(!activeSection?.content?.items || activeSection.content.items.length === 0) && (
                              <span className="text-[10px] font-bold text-red-500 dark:text-red-400 animate-pulse bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded">
                                ⚠ Wajib Diisi!
                              </span>
                            )}
                          </div>
                          <div className="space-y-3">
                            {activeSection?.content?.items?.map((item: any, i: number) => (
                              <div key={item.id} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={item.label || ''}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const items = [...(c.items || [])];
                                    items[i] = { ...items[i], label: e.target.value };
                                    return { ...c, items };
                                  })}
                                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm"
                                />
                                <button
                                  onClick={() => updateActiveSectionContent(c => {
                                    const items = (c.items || []).filter((_: any, idx: number) => idx !== i);
                                    return { ...c, items };
                                  })}
                                  className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-100 transition-all cursor-pointer shadow-sm shrink-0"
                                  title="Hapus Menu"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => updateActiveSectionContent(c => {
                              const items = [...(c.items || [])];
                              items.push({ id: `menu-${Date.now()}`, label: 'Menu Baru' });
                              return { ...c, items };
                            })}
                            className="w-full text-center py-2.5 border-2 border-dashed border-slate-250 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 dark:border-slate-700 dark:hover:border-brand-blue rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                          >
                            + Tambah Menu Baru
                          </button>
                        </div>
                      </div>
                    )}

                    {/* properties for: hero */}
                    {activeSectionType === 'hero' && (
                      <div className="space-y-6">
                        {renderInputCard(
                          'Headline Utama *',
                          activeSection?.content?.headline || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, headline: val })),
                          'Judul besar yang menarik perhatian pengunjung pertama kali.',
                          100,
                          'Contoh: Kembangkan Bisnis Anda Bersama Kami'
                        )}
                        {renderTextareaCard(
                          'Subheadline / Deskripsi Singkat *',
                          activeSection?.content?.subheadline || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, subheadline: val })),
                          'Penjelasan singkat tentang produk, layanan, atau nilai utama bisnis Anda.',
                          300,
                          'Tulis deskripsi singkat di sini...'
                        )}
                        {renderImageUpload(
                          'Gambar Banner Utama',
                          activeSection?.content?.banner || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, banner: val })),
                          'Rekomendasi ukuran: 1200 x 800 piksel dengan format JPG/PNG.'
                        )}
                        {renderInputCard(
                          'Teks Tombol Aksi (CTA) *',
                          activeSection?.content?.cta || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, cta: val })),
                          'Teks untuk tombol aksi utama di banner.',
                          30,
                          'Contoh: Hubungi Kami'
                        )}
                      </div>
                    )}

                    {/* properties for: about */}
                    {activeSectionType === 'about' && (
                      <div className="space-y-6">
                        {renderTextareaCard(
                          'Tentang Kami / Deskripsi Usaha *',
                          activeSection?.content?.description || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, description: val })),
                          'Jelaskan secara detail siapa Anda dan apa yang Anda tawarkan.',
                          1000,
                          'Tulis profil lengkap usaha Anda...'
                        )}
                        {renderTextareaCard(
                          'Profil Bisnis / Keahlian *',
                          activeSection?.content?.profile || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, profile: val })),
                          'Jelaskan latar belakang, keahlian, atau kompetensi utama tim Anda.',
                          1000,
                          'Jelaskan kompetensi usaha Anda...'
                        )}
                        {renderTextareaCard(
                          'Kisah Perjalanan / Nilai Usaha *',
                          activeSection?.content?.story || '',
                          (val) => updateActiveSectionContent(c => ({ ...c, story: val })),
                          'Cerita awal mula berdirinya usaha atau nilai-nilai penting yang dijunjung.',
                          1000,
                          'Ceritakan kisah inspiratif usaha Anda...'
                        )}
                      </div>
                    )}

                    {/* properties for: products */}
                    {activeSectionType === 'products' && (
                      <div className="space-y-6">
                        {(!activeSection?.content || activeSection.content.length === 0) && (
                          <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 rounded-2xl border border-red-200/50 dark:border-red-900/30 text-xs font-bold flex items-center gap-2 animate-pulse">
                            ⚠ Daftar produk masih kosong! Anda harus menambahkan minimal 1 produk.
                          </div>
                        )}
                        {Array.isArray(activeSection?.content) && activeSection.content.map((prod: any, i: number) => (
                          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 relative">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                              <span className="text-[11px] font-black text-[#FFB000] uppercase tracking-wider">Produk #{i + 1}</span>
                              <button
                                onClick={() => updateActiveSectionContent(c => c.filter((_: any, idx: number) => idx !== i))}
                                className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-650 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Produk"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Nama Produk</label>
                                <input
                                  type="text"
                                  value={prod.name || ''}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr[i] = { ...arr[i], name: e.target.value };
                                    return arr;
                                  })}
                                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm"
                                  placeholder="Contoh: Kopi Robusta Premium"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Harga</label>
                                <input
                                  type="text"
                                  value={prod.price || ''}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr[i] = { ...arr[i], price: e.target.value };
                                    return arr;
                                  })}
                                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm"
                                  placeholder="Contoh: Rp 50.000 / kg"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Deskripsi Produk</label>
                                <textarea
                                  value={prod.description || ''}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr[i] = { ...arr[i], description: e.target.value };
                                    return arr;
                                  })}
                                  rows={3}
                                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm resize-none"
                                  placeholder="Tulis deskripsi detail produk..."
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Gambar Produk</label>
                                <div className="flex gap-3 items-center mt-1">
                                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative shadow-inner">
                                    {prod.image ? <img src={prod.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-400" />}
                                  </div>
                                  <input
                                    type="text"
                                    value={prod.image || ''}
                                    placeholder="URL Gambar"
                                    onChange={(e) => updateActiveSectionContent(c => {
                                      const arr = [...(c || [])];
                                      arr[i] = { ...arr[i], image: e.target.value };
                                      return arr;
                                    })}
                                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-white outline-none"
                                  />
                                  <label className="p-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 dark:hover:bg-slate-700 text-white rounded-xl cursor-pointer border border-transparent shadow-sm">
                                    <Upload className="w-3.5 h-3.5 text-brand-blue" />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleUpload(e, (url) => updateActiveSectionContent(c => {
                                        const arr = [...(c || [])];
                                        arr[i] = { ...arr[i], image: url };
                                        return arr;
                                      }))}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <button
                          onClick={() => updateActiveSectionContent(c => {
                            const arr = [...(c || [])];
                            arr.push({ name: 'Produk Baru', description: 'Deskripsi produk', price: 'Rp 10.000', image: '' });
                            return arr;
                          })}
                          className="w-full text-center py-3.5 border-2 border-dashed border-slate-350 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 dark:border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                        >
                          + Tambah Produk Baru
                        </button>
                      </div>
                    )}

                    {/* properties for: advantages */}
                    {activeSectionType === 'advantages' && (
                      <div className="space-y-6">
                        {(!activeSection?.content || activeSection.content.length === 0) && (
                          <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 rounded-2xl border border-red-200/50 dark:border-red-900/30 text-xs font-bold flex items-center gap-2 animate-pulse">
                            ⚠ Daftar keunggulan masih kosong! Anda harus menambahkan minimal 1 keunggulan.
                          </div>
                        )}
                        {Array.isArray(activeSection?.content) && activeSection.content.map((adv: any, i: number) => (
                          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 relative">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                              <span className="text-[11px] font-black text-[#FFB000] uppercase tracking-wider">Keunggulan #{i + 1}</span>
                              <button
                                onClick={() => updateActiveSectionContent(c => c.filter((_: any, idx: number) => idx !== i))}
                                className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-655 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Keunggulan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 block">Nama Keunggulan</label>
                                <input
                                  type="text"
                                  value={adv.title || ''}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr[i] = { ...arr[i], title: e.target.value };
                                    return arr;
                                  })}
                                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm"
                                  placeholder="Contoh: Layanan Cepat"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 block">Deskripsi</label>
                                <textarea
                                  value={adv.description || ''}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr[i] = { ...arr[i], description: e.target.value };
                                    return arr;
                                  })}
                                  rows={3}
                                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm resize-none"
                                  placeholder="Jelaskan detail keunggulan ini..."
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 block">Pilihan Icon</label>
                                <select
                                  value={adv.icon || 'Shield'}
                                  onChange={(e) => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr[i] = { ...arr[i], icon: e.target.value };
                                    return arr;
                                  })}
                                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 shadow-sm"
                                >
                                  <option value="Shield">Shield (Keamanan)</option>
                                  <option value="Zap">Zap (Kecepatan)</option>
                                  <option value="Heart">Heart (Kepedulian)</option>
                                  <option value="Sparkles">Sparkles (Kualitas)</option>
                                  <option value="Star">Star (Bintang)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <button
                          onClick={() => updateActiveSectionContent(c => {
                            const arr = [...(c || [])];
                            arr.push({ icon: 'Shield', title: 'Keunggulan Baru', description: 'Deskripsi keunggulan' });
                            return arr;
                          })}
                          className="w-full text-center py-3.5 border-2 border-dashed border-slate-350 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 dark:border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                        >
                          + Tambah Keunggulan Baru
                        </button>
                      </div>
                    )}

                    {/* properties for: gallery */}
                    {activeSectionType === 'gallery' && (
                      <div className={`border rounded-2xl p-6 shadow-sm space-y-4 transition-all duration-300 ${
                        (!activeSection?.content || activeSection.content.length === 0)
                          ? 'bg-red-50/20 dark:bg-red-950/10 border-red-400 dark:border-red-900/55 ring-2 ring-red-500/10 shadow-md shadow-red-500/5'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}>
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider block">Galeri Foto Usaha *</label>
                          {(!activeSection?.content || activeSection.content.length === 0) && (
                            <span className="text-[10px] font-bold text-red-500 dark:text-red-400 animate-pulse bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded">
                              ⚠ Wajib Diisi!
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {Array.isArray(activeSection?.content) && activeSection.content.map((img: string, i: number) => (
                            <div key={i} className="aspect-video bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden group shadow-inner">
                              {img ? (
                                <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] font-bold">[KOSONG]</div>
                              )}
                              <button
                                onClick={() => updateActiveSectionContent(c => {
                                  const arr = [...(c || [])];
                                  arr.splice(i, 1);
                                  return arr;
                                })}
                                className="absolute top-2 right-2 p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm cursor-pointer border border-red-100"
                                title="Hapus Foto"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2">
                          <label className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-950 dark:hover:bg-slate-700 text-white rounded-xl cursor-pointer transition-all text-xs font-bold shadow-sm">
                            <Upload className="w-3.5 h-3.5 text-brand-blue" /> Tambah Foto Galeri
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleUpload(e, (url) => updateActiveSectionContent(c => {
                                const arr = [...(c || [])];
                                arr.push(url);
                                return arr;
                              }))}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                        {/* properties for: testimonials */}
                        {activeSectionType === 'testimonials' && (
                          <div className="space-y-4">
                            {(!activeSection?.content || activeSection.content.length === 0) && (
                              <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 rounded-2xl border border-red-200/50 dark:border-red-900/30 text-xs font-bold flex items-center gap-2 animate-pulse">
                                ⚠ Daftar testimoni masih kosong! Anda harus menambahkan minimal 1 testimoni.
                              </div>
                            )}
                            {Array.isArray(activeSection?.content) && activeSection.content.map((t: any, i: number) => (
                              <div key={i} className="bg-slate-50/60 dark:bg-slate-900/40 p-3 border border-slate-200 dark:border-slate-800 rounded-xl relative space-y-2">
                                <button
                                  onClick={() => updateActiveSectionContent(c => {
                                    const arr = [...(c || [])];
                                    arr.splice(i, 1);
                                    return arr;
                                  })}
                                  className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <div className="space-y-1">
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Klien</label>
                                  <input
                                    type="text"
                                    value={t.name || ''}
                                    onChange={(e) => updateActiveSectionContent(c => {
                                      const arr = [...(c || [])];
                                      arr[i] = { ...arr[i], name: e.target.value };
                                      return arr;
                                    })}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-white outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Isi Testimoni</label>
                                  <textarea
                                    value={t.content || ''}
                                    onChange={(e) => updateActiveSectionContent(c => {
                                      const arr = [...(c || [])];
                                      arr[i] = { ...arr[i], content: e.target.value };
                                      return arr;
                                    })}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all shadow-sm resize-none h-24 "
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Foto Klien (URL/Upload)</label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={t.photo || ''}
                                      placeholder="https://link-avatar.jpg"
                                      onChange={(e) => updateActiveSectionContent(c => {
                                        const arr = [...(c || [])];
                                        arr[i] = { ...arr[i], photo: e.target.value };
                                        return arr;
                                      })}
                                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 dark:text-white outline-none"
                                    />
                                    <label className="p-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer flex items-center justify-center shrink-0 border border-slate-700 transition-all shadow-sm">
                                      <Upload className="w-3.5 h-3.5 text-brand-blue" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleUpload(e, (url) => updateActiveSectionContent(c => {
                                          const arr = [...(c || [])];
                                          arr[i] = { ...arr[i], photo: url };
                                          return arr;
                                        }))}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => updateActiveSectionContent(c => {
                                const arr = [...(c || [])];
                                arr.push({ name: 'Nama Pelanggan', content: 'Pelayanan sangat bagus!', photo: '' });
                                return arr;
                              })}
                              className="w-full text-center py-3.5 border-2 border-dashed border-slate-300 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4"
                            >
                              + Tambah Testimoni Baru
                            </button>
                          </div>
                        )}

                        {/* properties for: cta */}
                        {activeSectionType === 'cta' && (
                          <div className="space-y-6">
                            {renderInputCard(
                              'Judul Penawaran *',
                              activeSection?.content?.title || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, title: val })),
                              'Judul utama penawaran aksi Anda.',
                              100,
                              'Contoh: Mulai Sekarang!'
                            )}
                            {renderTextareaCard(
                              'Deskripsi Penawaran *',
                              activeSection?.content?.description || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, description: val })),
                              'Penjelasan detail penawaran aksi Anda.',
                              500,
                              'Contoh: Hubungi kami hari ini untuk penawaran khusus...'
                            )}
                            {renderInputCard(
                              'Teks Tombol CTA *',
                              activeSection?.content?.buttonText || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, buttonText: val })),
                              'Teks yang akan ditampilkan pada tombol.',
                              30,
                              'Contoh: Hubungi Kami'
                            )}
                          </div>
                        )}

                        {/* properties for: contact */}
                        {activeSectionType === 'contact' && (
                          <div className="space-y-6">
                            {renderInputCard(
                              'Nomor WhatsApp (Format: 628xxxx) *',
                              activeSection?.content?.whatsapp || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, whatsapp: val })),
                              'Gunakan format angka saja diawali dengan 62 (contoh: 628123456789).',
                              20,
                              '628xxxxxxxxxx'
                            )}
                            {renderInputCard(
                              'Email Bisnis',
                              activeSection?.content?.email || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, email: val })),
                              'Alamat email bisnis Anda untuk dihubungi pengunjung.',
                              50,
                              'nama@bisnis.com'
                            )}
                            {renderTextareaCard(
                              'Alamat Fisik *',
                              activeSection?.content?.address || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, address: val })),
                              'Alamat lengkap kantor atau toko fisik Anda.',
                              300,
                              'Tulis alamat lengkap...'
                            )}
                            {renderInputCard(
                              'Jam Operasional',
                              activeSection?.content?.operatingHours || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, operatingHours: val })),
                              'Jam operasional bisnis Anda.',
                              100,
                              'Senin - Jumat, 09:00 - 17:00 WIB'
                            )}
                          </div>
                        )}

                        {/* properties for: socialMedia */}
                        {activeSectionType === 'socialMedia' && (
                          <div className="space-y-6">
                            {['instagram', 'tiktok', 'facebook', 'youtube'].map((sm) => {
                              const isReq = sm === 'instagram' || sm === 'tiktok';
                              const label = sm.charAt(0).toUpperCase() + sm.slice(1) + (isReq ? ' *' : '');
                              return (
                                <React.Fragment key={sm}>
                                  {renderInputCard(
                                    label,
                                    activeSection?.content?.[sm] || '',
                                    (val) => updateActiveSectionContent(c => ({ ...c, [sm]: val })),
                                    `Tautan ke akun ${sm} bisnis Anda.`,
                                    150,
                                    `https://${sm}.com/username`
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        )}

                        {/* properties for: marketplaces */}
                        {activeSectionType === 'marketplaces' && (
                          <div className="space-y-6">
                            {['shopee', 'tokopedia', 'lazada', 'externalWebsite'].map((mp) => {
                              const isReq = mp === 'shopee' || mp === 'tokopedia';
                              const label = (mp === 'externalWebsite' ? 'Website Eksternal' : mp.charAt(0).toUpperCase() + mp.slice(1)) + (isReq ? ' *' : '');
                              return (
                                <React.Fragment key={mp}>
                                  {renderInputCard(
                                    label,
                                    getMarketplaceValue(mp),
                                    (val) => updateMarketplaceValue(mp, val),
                                    `Tautan ke toko ${mp === 'externalWebsite' ? 'website eksternal' : mp} bisnis Anda.`,
                                    150,
                                    'https://...'
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        )}

                        {/* properties for: footer */}
                        {activeSectionType === 'footer' && (
                          <div className="space-y-6">
                            {renderImageUpload(
                              'Logo Footer',
                              activeSection?.content?.logo || '',
                              (url) => updateActiveSectionContent(c => ({ ...c, logo: url })),
                              'Logo yang akan ditampilkan di bagian footer.'
                            )}
                            {renderInputCard(
                              'Nama Bisnis Footer *',
                              activeSection?.content?.businessName || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, businessName: val })),
                              'Nama bisnis yang akan ditampilkan pada footer.',
                              100,
                              'Contoh: Situs Baru'
                            )}
                            {renderInputCard(
                              'Teks Copyright *',
                              activeSection?.content?.copyright || '',
                              (val) => updateActiveSectionContent(c => ({ ...c, copyright: val })),
                              'Teks copyright hak cipta di bagian bawah footer.',
                              150,
                              'Contoh: © 2026 Situs Baru. All rights reserved.'
                            )}
                          </div>
                        )}
                      </div>

                  {/* 2. STYLE SECTION (Except for 'logo') */}
                  {activeSectionType !== 'logo' && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-850">
                        <Settings2 className="w-4 h-4 text-[#FFB000]" />
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200">
                          {activeSectionType === 'navbar' ? 'Style Navbar' : 'Gaya Visual Section (Style)'}
                        </h3>
                      </div>
                                      {/* Color Pickers */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-sans">
                          {activeSectionType === 'navbar' ? 'Warna Teks Menu' : 'Warna Teks'}
                        </label>
                        <div className="relative flex items-center">
                          <div className="absolute left-3 w-6 h-6 rounded-lg overflow-hidden border border-slate-250 dark:border-slate-700 shadow-sm cursor-pointer bg-white">
                            <input
                              type="color"
                              value={activeSection?.styles?.textColor || '#000000'}
                              onChange={(e) => updateSectionStyle('textColor', e.target.value)}
                              className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0 z-10"
                            />
                            <div 
                              className="w-full h-full rounded-lg" 
                              style={{ backgroundColor: activeSection?.styles?.textColor || '#000000' }} 
                            />
                          </div>
                          <input
                            type="text"
                            value={activeSection?.styles?.textColor || '#000000'}
                            placeholder="#000000"
                            onChange={(e) => updateSectionStyle('textColor', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-3.5 py-2.5 text-sm font-semibold text-slate-855 dark:text-white outline-none focus:border-brand-blue/50 shadow-sm font-mono focus:ring-4 focus:ring-brand-blue/10 transition-all"
                          />
                        </div>
                      </div>

                      {/* Background Color Picker */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-sans">
                            Warna Background
                          </label>
                        </div>
                        <div className="relative flex items-center">
                          <div className="absolute left-3 w-6 h-6 rounded-lg overflow-hidden border border-slate-250 dark:border-slate-700 shadow-sm cursor-pointer bg-white">
                            <input
                              type="color"
                              value={(activeSection?.styles?.backgroundColor === 'transparent' || !activeSection?.styles?.backgroundColor) ? '#ffffff' : activeSection?.styles?.backgroundColor}
                              onChange={(e) => updateSectionStyle('backgroundColor', e.target.value)}
                              className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0 z-10"
                            />
                            <div 
                              className="w-full h-full rounded-lg border border-slate-100 dark:border-slate-600" 
                              style={{ backgroundColor: activeSection?.styles?.backgroundColor === 'transparent' ? 'transparent' : (activeSection?.styles?.backgroundColor || '#ffffff') }} 
                            />
                          </div>
                          <input
                            type="text"
                            value={activeSection?.styles?.backgroundColor === 'transparent' ? '' : (activeSection?.styles?.backgroundColor || '')}
                            placeholder="Tanpa Warna (Sesuai Tema)"
                            onChange={(e) => updateSectionStyle('backgroundColor', e.target.value || 'transparent')}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-3.5 py-2.5 text-sm font-semibold text-slate-855 dark:text-white outline-none focus:border-brand-blue/50 shadow-sm font-mono focus:ring-4 focus:ring-brand-blue/10 transition-all"
                          />
                          {(!activeSection?.styles?.backgroundColor || activeSection?.styles?.backgroundColor === 'transparent') && (
                            <span className="absolute right-3 text-[9px] font-black bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Font Selector Dropdown */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Gaya Huruf (Font)</label>
                        <div className="relative">
                          <select
                            value={activeSection?.styles?.fontFamily || ''}
                            onChange={(e) => updateSectionStyle('fontFamily', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-850 dark:text-white outline-none focus:border-brand-blue/50 shadow-sm appearance-none cursor-pointer"
                          >
                            <option value="">Default (Sesuai Tema)</option>
                            <option value="Poppins">Poppins (Modern & Bulat)</option>
                            <option value="Inter">Inter (Bersih & Elegan)</option>
                            <option value="Montserrat">Montserrat (Geometris & Premium)</option>
                            <option value="Open Sans">Open Sans (Sederhana & Terbaca)</option>
                            <option value="Roboto">Roboto (Sistem Klasik)</option>
                            <option value="Playfair Display">Playfair Display (Serif Klasik & Mewah)</option>
                            <option value="Lora">Lora (Serif Elegan & Lembut)</option>
                            <option value="Oswald">Oswald (Kondensasi & Kuat)</option>
                            <option value="Raleway">Raleway (Tipis & Modern)</option>
                            <option value="Merriweather">Merriweather (Sangat Terbaca & Hangat)</option>
                            <option value="Nunito">Nunito (Ramah & Bulat)</option>
                            <option value="Quicksand">Quicksand (Bulat & Ceria)</option>
                            <option value="Josefin Sans">Josefin Sans (Vintage & Geometris)</option>
                            <option value="Cabin">Cabin (Kasual & Humanis)</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
            </main>
          </div>
        )}

        {/* TAB 2: AI CONTENT SCHEDULER (UNIFIED) */}
        {activeTab === 'ai_writer' && (
          <div className="flex-grow overflow-y-auto relative bg-[#f8faf9] dark:bg-slate-950 p-4 md:p-6 custom-scrollbar pb-24">

            {/* Soft Background Gradient Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br from-[#22c55e]/15 to-transparent rounded-full blur-[100px]"></div>
              <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-bl from-[#FFB000]/10 to-transparent rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
            </div>

            {/* Unified Main Header */}
            <div className="relative z-20 max-w-[1050px] mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden mb-6">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-[#FFB000]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 mb-1.5">
                  <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/30 rounded-lg flex items-center justify-center border border-orange-100 dark:border-orange-900/50">
                    <Bot className="w-5 h-5 text-[#FFB000]" />
                  </div>
                  AI Content Scheduler
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
                  Pusat kendali pintar Anda. Hasilkan copywriting landing page yang persuasif dengan AI dan atur jadwal publikasinya secara otomatis dalam satu tempat.
                </p>
              </div>
              <button
                onClick={() => setIsSchedulerModalOpen(true)}
                className="relative z-10 px-6 py-3 bg-gradient-to-r from-[#FFB000] to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer border border-amber-400"
              >
                <Plus className="w-4 h-4" /> Jadwal Baru
              </button>
            </div>

            <div className="relative z-20 max-w-[1050px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* KOLOM KIRI: AI Content Generator (lg:col-span-4) */}
              <div className="lg:col-span-5 space-y-6">

                {/* Input Form Card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-5 bg-[#FFB000] rounded-full"></div>
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-200">Intelligent writing assistant</h3>
                  </div>

                  <div className="space-y-5">
                    {/* Target Section */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Choose a section</label>
                      <div className="relative">
                        <select
                          value={activeAccordion}
                          onChange={(e) => setActiveAccordion(e.target.value)}
                          className="w-full bg-white/90 dark:bg-slate-950 border border-slate-100/50 shadow-sm rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-[#22c55e]/50 transition-all appearance-none cursor-pointer"
                        >
                          {sections.map((s, idx) => (
                            <option key={s.id || `opt-${idx}`} value={s.id}>{s.title || s.name}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Preset Chips */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Quick presets</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'headline', title: 'Headline', prompt: 'Buat headline yang menarik perhatian untuk target section Hero Banner' },
                          { id: 'cta', title: 'CTA', prompt: 'Buat ajakan tindakan WhatsApp yang meyakinkan untuk meningkatkan penjualan' },
                          { id: 'product', title: 'Produk', prompt: 'Buat deskripsi produk yang persuasif, informatif, dan menonjolkan keunggulan produk' },
                          { id: 'advantage', title: 'Keunggulan', prompt: 'Buat daftar keunggulan bisnis yang unik, kredibel, dan membujuk pembaca' }
                        ].map((preset) => {
                          const isActive = selectedPreset === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setAiCommand(preset.prompt);
                                setSelectedPreset(preset.id);
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${isActive
                                  ? 'bg-gradient-to-r from-[#22c55e] to-emerald-500 text-white border-none shadow-[0_4px_12px_rgba(34,197,94,0.25)]'
                                  : 'bg-white/90 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50 border border-slate-100/50'
                                }`}
                            >
                              {preset.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Prompt Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Describe your product</label>
                      <textarea
                        value={aiCommand}
                        onChange={(e) => {
                          setAiCommand(e.target.value);
                          setSelectedPreset(null);
                        }}
                        placeholder="Write a advertising copy for..."
                        className="w-full bg-white/90 dark:bg-slate-950 border border-slate-100/50 shadow-sm rounded-xl p-4 text-sm font-medium text-slate-800 dark:text-slate-200 outline-none resize-none h-32 focus:ring-2 focus:ring-[#22c55e]/50 transition-all leading-relaxed placeholder:text-slate-400"
                      />
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleAiGenerateSubmit}
                      disabled={isGeneratingCopy || !aiCommand.trim()}
                      className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-2xl text-sm font-bold uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:from-slate-200 disabled:to-slate-200 disabled:shadow-none disabled:active:scale-100 shadow-[0_8px_20px_rgba(15,23,42,0.15)] mt-4"
                    >
                      {isGeneratingCopy ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Proses AI...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#22c55e]" /> Generate Content
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN: Hasil AI & Scheduler (lg:col-span-8) */}
              <div className="lg:col-span-7 space-y-6">

                {/* Preview Card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all min-h-[200px] flex flex-col">
                  <div className="flex items-center gap-2 mb-6 shrink-0">
                    <div className="w-1 h-5 bg-[#22c55e] rounded-full"></div>
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-200">Hasil Draft AI</h3>
                  </div>

                  {!aiSuggestions ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-8 text-center space-y-4 bg-slate-50/50 dark:bg-slate-950/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                      <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                        ✨
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Menunggu Instruksi</h4>
                        <p className="text-xs max-w-sm text-slate-500 dark:text-slate-400 leading-relaxed mx-auto">
                          Hasil copywriting cerdas Anda akan muncul di sini. Silakan gunakan panel di sebelah kiri.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col justify-between space-y-6 animate-in fade-in zoom-in-95 duration-400">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {aiSuggestions.suggestedData?.headline && (
                          <div className="space-y-1.5 col-span-1 md:col-span-2">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Headline / Title</span>
                            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 relative group">
                              <p className="font-black text-slate-800 dark:text-slate-100 text-lg leading-snug">{aiSuggestions.suggestedData.headline}</p>
                              <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white shadow-sm border border-slate-200 rounded-md text-slate-400 hover:text-brand-blue"><Copy className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        )}
                        {aiSuggestions.suggestedData?.subheadline && (
                          <div className="space-y-1.5 col-span-1 md:col-span-2">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Subheadline / Deskripsi</span>
                            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 relative group">
                              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{aiSuggestions.suggestedData.subheadline}</p>
                              <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white shadow-sm border border-slate-200 rounded-md text-slate-400 hover:text-brand-blue"><Copy className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        )}
                        {aiSuggestions.suggestedData?.cta && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">CTA Button</span>
                            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative group">
                              <p className="font-black text-[#FFB000] text-sm uppercase tracking-wider">{aiSuggestions.suggestedData.cta}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
                        <button
                          onClick={applyAiCopy}
                          className="flex-1 py-3.5 bg-[#FFB000] hover:bg-[#e69e00] text-slate-900 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20 transition-all active:scale-[0.98]"
                        >
                          <Check className="w-4 h-4" /> Terapkan ke CMS
                        </button>
                        <button
                          onClick={() => {
                            setNewScheduleTargetSection(activeAccordion);
                            setNewScheduleContent(aiSuggestions?.suggestedData?.headline || aiSuggestions?.suggestedData?.subheadline || aiSuggestions?.suggestedData?.cta || aiSuggestions?.suggestedData?.description || '');
                            setIsSchedulerModalOpen(true);
                          }}
                          className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-blue/20 transition-all active:scale-[0.98]"
                        >
                          <Calendar className="w-4 h-4" /> Jadwalkan
                        </button>
                        <button
                          onClick={handleAiGenerateSubmit}
                          className="px-6 py-3.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow"
                        >
                          <RefreshCw className="w-4 h-4" /> Ulangi
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Table Scheduler Card */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 dark:bg-slate-900 dark:border-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col transition-all">
                  <div className="p-7 pb-6 border-b border-slate-100/50 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-5 bg-[#22c55e] rounded-full"></div>
                      <h3 className="text-[13px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-widest">Daftar Jadwal</h3>
                    </div>

                    <div className="relative">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="appearance-none flex items-center gap-2 pl-3.5 pr-8 py-2 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-slate-200/80 dark:border-slate-700 transition-colors shadow-sm outline-none cursor-pointer"
                      >
                        <option value="ALL">Semua</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                      </select>
                      <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                      <thead className="bg-slate-50/80 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold border-y border-slate-100 dark:border-slate-800">
                        <tr>
                          <th className="px-8 py-3.5 uppercase tracking-wider text-[11px] font-black">Judul Konten</th>
                          <th className="px-8 py-3.5 uppercase tracking-wider text-[11px] font-black">Waktu Publikasi</th>
                          <th className="px-8 py-3.5 uppercase tracking-wider text-[11px] font-black text-center">Status</th>
                          <th className="px-8 py-3.5 uppercase tracking-wider text-[11px] font-black text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {(() => {
                          const filteredSchedules = schedules.filter(s => {
                            if (filterStatus === 'ALL') return true;
                            return s.status === filterStatus;
                          });

                          if (filteredSchedules.length === 0) {
                            return (
                              <tr>
                                <td colSpan={4} className="px-8 py-10 text-center text-slate-500 font-medium text-sm">
                                  Belum ada jadwal.
                                </td>
                              </tr>
                            );
                          }

                          return filteredSchedules.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                              <td className="px-6 md:px-8 py-5">
                                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-blue transition-colors">{item.title}</span>
                              </td>
                              <td className="px-6 md:px-8 py-5 text-slate-500 dark:text-slate-400 font-medium">
                                {item.date}
                              </td>
                              <td className="px-6 md:px-8 py-5 text-center">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' :
                                    item.status === 'FAILED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50' :
                                    (item.status === 'SCHEDULED' || item.status === 'AI SCHEDULED') ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800/50' :
                                      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                  }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-6 md:px-8 py-5 text-right">
                                <button
                                  onClick={() => handleDeleteSchedule(item.id)}
                                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                  title="Hapus Jadwal"
                                >
                                  <Trash2 className="w-4 h-4" />
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

        {/* TAB 3: PREVIEW SITUS */}
        {activeTab === 'preview' && (
          <div className="flex flex-1 flex-col h-full overflow-hidden bg-slate-50">
            {/* Viewport Toolbar */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2 px-4 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-3">
              {/* Left: Viewport Size Switcher */}
              <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 gap-0.5">
                {[
                  { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-3.5 h-3.5" /> },
                  { id: 'mobile', label: 'Mobile (390px)', icon: <Smartphone className="w-3.5 h-3.5" /> }
                ].map(dev => (
                  <button
                    key={dev.id}
                    onClick={() => setPreviewMode(dev.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${previewMode === dev.id
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {dev.icon}
                    <span>{dev.label}</span>
                  </button>
                ))}
              </div>

              {/* Center: Zoom Controls */}
              <div className="flex items-center bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest">Skala: {Math.round(zoomScale * 100)}%</span>
                <button
                  onClick={() => setZoomScale(Math.max(0.5, zoomScale - 0.1))}
                  className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="px-2.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  Fit
                </button>
                <button
                  onClick={() => setZoomScale(Math.min(1.5, zoomScale + 0.1))}
                  className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

            </div>

            {/* Viewport Frame Container (centered in a large scrollable area) */}
            <div className="flex-1 bg-slate-50 overflow-auto p-8 flex justify-center items-start custom-scrollbar">
              <div
                className="transition-all duration-500 ease-out shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-slate-200 relative overflow-hidden bg-white flex flex-col"
                style={{
                  width: previewMode === 'mobile' ? '390px' : '100%',
                  maxWidth: previewMode === 'desktop' ? '1200px' : 'none',
                  minHeight: '750px',
                  height: 'calc(100vh - 250px)',
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'top center',
                  borderRadius: previewMode === 'desktop' ? '24px' : '40px',
                  borderWidth: previewMode === 'desktop' ? '1px' : '12px',
                  borderColor: previewMode === 'desktop' ? 'rgba(255,255,255,0.06)' : '#0f172a'
                }}
              >
                {/* Browser Header for Desktop Mockup */}
                {previewMode === 'desktop' && (
                  <div className="bg-slate-900/90 border-b border-slate-200 px-4 py-2 flex items-center gap-3 shrink-0 select-none z-20">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex-1 max-w-[400px] mx-auto bg-slate-100/90 border border-slate-200 rounded-lg py-1 px-3 flex items-center justify-between text-base text-slate-500 font-bold leading-none">
                      <div className="flex items-center gap-1.5 truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-500" />
                        <span className="truncate">landfarm.id/site/{pageData?.slug}</span>
                      </div>
                      <RefreshCw className="w-2.5 h-2.5 opacity-55 hover:opacity-100 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* Mobile Notch Mock */}
                {previewMode === 'mobile' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#0f172a] rounded-b-[20px] z-30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 mr-8 relative border border-slate-700/50">
                      <div className="absolute top-[2px] right-[2px] w-1 h-1 bg-blue-400/30 rounded-full" />
                    </div>
                    <div className="w-12 h-1.5 bg-slate-800/80 rounded-full border border-slate-700/50" />
                  </div>
                )}

                {/* Embed template renderer */}
                <div className={`w-full h-full overflow-y-auto bg-white text-slate-900 custom-scrollbar ${previewMode === 'mobile' ? 'pt-8' : 'pt-0'}`}>
                  <TemplateRenderer
                    templateId={pageData?.template?.id || pageData?.template?.name}
                    contentJson={contentJson}
                    isMobile={previewMode === 'mobile'}
                    themeColor={pageData?.themeColor}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Scheduler Modal */}
      {isSchedulerModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsSchedulerModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-blue" /> Jadwalkan Perubahan Konten
                </h3>
                <button onClick={() => setIsSchedulerModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Tentukan kapan pembaruan konten ini akan dipublikasikan secara otomatis ke situs Anda.
              </p>
            </div>

            <div className="space-y-4">
              {scheduleError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-bold border border-red-100 dark:border-red-900/50 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" />
                  {scheduleError}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Judul Konten</label>
                <input
                  type="text"
                  value={newScheduleTitle}
                  onChange={(e) => setNewScheduleTitle(e.target.value)}
                  placeholder="Contoh: Promo Ramadhan Kopi"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Target Section</label>
                <select
                  value={newScheduleTargetSection}
                  onChange={(e) => setNewScheduleTargetSection(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all shadow-sm"
                >
                  {sections.map((s, idx) => (
                    <option key={s.id || `opt-${idx}`} value={s.id}>{s.title || s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Konten yang akan diterapkan</label>
                <textarea
                  value={newScheduleContent}
                  onChange={(e) => setNewScheduleContent(e.target.value)}
                  placeholder="Tuliskan konten spesifik..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm font-medium text-slate-800 dark:text-slate-200 outline-none resize-none h-24 focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all leading-relaxed shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Upload Gambar (Opsional)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newScheduleImage}
                    onChange={(e) => setNewScheduleImage(e.target.value)}
                    placeholder="Masukkan URL gambar atau klik tombol upload..."
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all shadow-sm"
                  />
                  <label
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-bold text-sm transition-all flex items-center justify-center cursor-pointer"
                    title="Upload Gambar"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUpload(e, setNewScheduleImage)}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Tanggal</label>
                  <input
                    type="date"
                    value={newScheduleDate}
                    onChange={(e) => setNewScheduleDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">Jam</label>
                  <input
                    type="time"
                    value={newScheduleTime}
                    onChange={(e) => setNewScheduleTime(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsSchedulerModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all cursor-pointer border border-transparent shadow-sm"
              >
                Batal
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
              >
                Jadwalkan Konten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Page Modal */}
      {showAddPageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddPageModal(false)} />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Tambah Halaman Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Halaman</label>
                <input
                  type="text"
                  value={newPageName}
                  onChange={e => {
                    setNewPageName(e.target.value);
                    if (!newPageSlug || newPageSlug === '/' || newPageSlug === '/' + e.target.value.toLowerCase().replace(/\s+/g, '-')) {
                      setNewPageSlug('/' + e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
                    }
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  placeholder="Contoh: Tentang Kami"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">URL Slug</label>
                <input
                  type="text"
                  value={newPageSlug}
                  onChange={e => setNewPageSlug(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  placeholder="Contoh: /tentang-kami"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddPageModal(false)}
                  className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold border-none cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (!newPageName || !newPageSlug) return;
                    const newPage = { slug: newPageSlug, name: newPageName, content: {} };
                    const updatedPages = [...sitePages, newPage];
                    setSitePages(updatedPages);
                    setCurrentPageSlug(newPageSlug);
                    setContentJson({});
                    setShowAddPageModal(false);
                    setNewPageName('');
                    setNewPageSlug('');
                    triggerToast('Halaman baru berhasil ditambahkan!');
                  }}
                  className="flex-1 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold border-none cursor-pointer"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual confirmation modal for deleting sections */}
      {sectionToDelete && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setSectionToDelete(null)} />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 text-center space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">Konfirmasi Hapus</h3>
              <p className="text-xs text-slate-505 dark:text-slate-400 font-medium">Yakin ingin menghapus section ini?</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSectionToDelete(null)}
                className="flex-1 py-2 text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer text-slate-605 dark:text-slate-350"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleDeleteSection(sectionToDelete);
                  setSectionToDelete(null);
                }}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {editorToast && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 border border-brand-blue/30 dark:border-brand-blue/50 text-slate-800 dark:text-slate-100 px-5 py-3 rounded-2xl shadow-2xl z-[350] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-base font-black uppercase tracking-wider">{editorToast}</span>
        </div>
      )}
    </div>
  );
}
