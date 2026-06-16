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

const getSectionDefaultContent = (type: string, businessName = 'Situs Baru', pageTitle = 'Kembangkan Bisnis Anda') => {
  switch (type) {
    case 'logo': return '';
    case 'navbar': return { brand: businessName, items: [{ id: 'home', label: 'Home' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] };
    case 'hero': return { headline: pageTitle, subheadline: 'Deskripsi singkat layanan/produk Anda.', banner: '', cta: 'Hubungi Kami' };
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
  pageId: string;
  onBack: () => void;
  onPublishSuccess: () => void;
}

export default function ContentStructureEditor({ pageId, onBack, onPublishSuccess }: ContentStructureEditorProps) {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);
  const [contentJson, setRawContentJson] = useState<any>(null);

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
        syncContentAndSections(updated);
        return updated;
      });
    } else {
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
  const [schedules, setSchedules] = useState<any[]>([
    { title: "Promo Ramadhan Kopi Nusantara", date: "Besok 09:00", status: "Scheduled" },
    { title: "Tips Memilih Biji Kopi Robusta", date: "Besok 10:00", status: "Queued" },
    { title: "Promo Akhir Pekan", date: "Jumat 08:00", status: "Published" }
  ]);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleStatus, setNewScheduleStatus] = useState('Scheduled');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(false);

  // Sections List State (Allows Reordering & Activation)
  const [sections, setSections] = useState<any[]>([
    { id: 'logo', type: 'logo', title: 'Logo Website', isActive: true, order: 1, content: '' },
    { id: 'navbar', type: 'navbar', title: 'Menu Navigasi', isActive: true, order: 2, content: { brand: 'Situs Baru', items: [{ id: 'home', label: 'Home' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] } },
    { id: 'hero', type: 'hero', title: 'Hero Banner', isActive: true, order: 3, content: { headline: 'Kembangkan Bisnis Anda', subheadline: 'Deskripsi singkat...', banner: '', cta: 'Hubungi Kami' } },
    { id: 'about', type: 'about', title: 'Tentang Usaha', isActive: true, order: 4, content: { description: '', profile: '', story: '' } },
    { id: 'products', type: 'products', title: 'Produk & Layanan', isActive: true, order: 5, content: [] },
    { id: 'advantages', type: 'advantages', title: 'Keunggulan', isActive: true, order: 6, content: [
      { icon: 'Shield', title: 'Keamanan Terjamin', description: 'Perlindungan maksimal untuk seluruh data dan sistem Anda.' },
      { icon: 'Zap', title: 'Layanan Cepat', description: 'Respon instan dari tim support kami.' }
    ] },
    { id: 'gallery', type: 'gallery', title: 'Galeri Foto', isActive: true, order: 7, content: [] },
    { id: 'testimonials', type: 'testimonials', title: 'Testimoni', isActive: true, order: 8, content: [] },
    { id: 'cta', type: 'cta', title: 'CTA Penawaran', isActive: true, order: 9, content: { title: 'Mulai Sekarang!', description: 'Hubungi kami hari ini untuk penawaran khusus.', buttonText: 'Hubungi Kami' } },
    { id: 'contact', type: 'contact', title: 'Kontak', isActive: true, order: 10, content: { whatsapp: '', email: '', address: '', operatingHours: '' } },
    { id: 'socialMedia', type: 'socialMedia', title: 'Media Sosial', isActive: true, order: 11, content: { instagram: '', tiktok: '', facebook: '', youtube: '' } },
    { id: 'marketplaces', type: 'marketplaces', title: 'Toko Online (Marketplace)', isActive: false, order: 12, content: { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' } },
    { id: 'footer', type: 'footer', title: 'Footer Halaman', isActive: true, order: 13, content: { logo: '', businessName: 'Situs Baru', copyright: '© 2026 Situs Baru. All rights reserved.' } }
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

          const loadedSections = initialContent.sections || defaultSectionsList;
          const mappedSections = loadedSections.map((s: any, idx: number) => {
            const secType = s.type || s.id;
            const secTitle = s.title || s.name || getSectionDefaultTitle(secType);
            const secActive = s.isActive !== undefined ? s.isActive : (s.status === 'Aktif');
            const secContent = s.content || initialContent[s.id] || getSectionDefaultContent(secType, page.businessName, page.title);
            return {
              id: s.id,
              type: secType,
              title: secTitle,
              isActive: secActive,
              order: s.order || (idx + 1),
              content: secContent
            };
          });
          setSections(mappedSections);

          // Ensure standard structure is populated
          const normalized = {
            sections: mappedSections.map(s => ({
              id: s.id,
              type: s.type,
              title: s.title,
              isActive: s.isActive,
              order: s.order,
              content: s.content,
              status: s.isActive ? 'Aktif' : 'Nonaktif',
              name: s.title
            })),
            logo: getSectionContentFromMapped(mappedSections, 'logo', initialContent.logo || ''),
            navbar: getSectionContentFromMapped(mappedSections, 'navbar', initialContent.navbar || { brand: page.businessName || 'Situs Baru', items: [{ id: 'home', label: 'Home' }, { id: 'about', label: 'Tentang' }, { id: 'products', label: 'Produk' }, { id: 'testimonials', label: 'Testimoni' }, { id: 'contact', label: 'Kontak' }] }),
            hero: getSectionContentFromMapped(mappedSections, 'hero', initialContent.hero || { headline: page.title || 'Kembangkan Bisnis Anda', subheadline: 'Deskripsi singkat layanan/produk Anda.', banner: '', cta: 'Hubungi Kami' }),
            about: getSectionContentFromMapped(mappedSections, 'about', initialContent.about || { description: '', profile: '', story: '' }),
            products: getSectionContentFromMapped(mappedSections, 'products', Array.isArray(initialContent.products) ? initialContent.products : []),
            advantages: getSectionContentFromMapped(mappedSections, 'advantages', Array.isArray(initialContent.advantages) ? initialContent.advantages : [
              { icon: 'Shield', title: 'Keamanan Terjamin', description: 'Perlindungan maksimal untuk seluruh data dan sistem Anda.' },
              { icon: 'Zap', title: 'Layanan Cepat', description: 'Respon instan dari tim support kami.' }
            ]),
            gallery: getSectionContentFromMapped(mappedSections, 'gallery', Array.isArray(initialContent.gallery) ? initialContent.gallery : []),
            testimonials: getSectionContentFromMapped(mappedSections, 'testimonials', Array.isArray(initialContent.testimonials) ? initialContent.testimonials : []),
            cta: getSectionContentFromMapped(mappedSections, 'cta', initialContent.cta || { title: 'Mulai Sekarang!', description: 'Hubungi kami hari ini untuk penawaran khusus.', buttonText: 'Hubungi Kami' }),
            contact: getSectionContentFromMapped(mappedSections, 'contact', initialContent.contact || { whatsapp: '', email: '', address: '', operatingHours: '' }),
            socialMedia: getSectionContentFromMapped(mappedSections, 'socialMedia', initialContent.socialMedia || { instagram: '', tiktok: '', facebook: '', youtube: '' }),
            marketplaces: getSectionContentFromMapped(mappedSections, 'marketplaces', initialContent.marketplaces || { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' }),
            footer: getSectionContentFromMapped(mappedSections, 'footer', initialContent.footer || { logo: '', businessName: page.businessName || 'Situs Baru', copyright: `© 2026 ${page.businessName || 'Situs Baru'}. All rights reserved.` })
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
      setIsPublishedSuccess(true);
      onPublishSuccess();
    } catch (err) {
      triggerToast('Gagal terhubung ke server.');
    } finally {
      setIsSubmittingPublish(false);
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
  const handleAddSchedule = () => {
    if (!newScheduleTitle.trim() || !newScheduleDate.trim()) {
      triggerToast('Judul dan waktu publikasi harus diisi!');
      return;
    }
    setSchedules(prev => [
      ...prev,
      { title: newScheduleTitle, date: newScheduleDate, status: newScheduleStatus }
    ]);
    setNewScheduleTitle('');
    setNewScheduleDate('');
    setNewScheduleStatus('Scheduled');
    setIsSchedulerModalOpen(false);
    triggerToast('Konten baru berhasil dijadwalkan!');
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
    const publicSiteUrl = `${hostOrigin}/site/${pageData?.slug}`;

    // Validations
    const isContentComplete = !!pageData?.title?.trim() && !!pageData?.businessName?.trim() && sections.filter(s => s.isActive).length > 0;
    const isSlugValid = !!pageData?.slug?.trim() && /^[a-zA-Z0-9-_]+$/.test(pageData.slug);
    const isReadyToPublish = isContentComplete && isSlugValid;
    if (isPublishedSuccess) {
      /* SUCCESS SCREEN */
      return (
        <div className="fixed inset-0 bg-[#F8FAFC] text-slate-800 flex flex-col font-sans z-[200] overflow-y-auto items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-[#DCFCE7] text-[#22C55E] rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
              🎉
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Landing Page Berhasil Dipublikasikan</h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Landing page Anda sudah aktif dan dapat diakses secara online oleh publik.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl space-y-2 text-left">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#15803D] block">URL Landing Page</span>
              <div className="flex items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-xl p-2.5">
                <span className="text-xs font-mono font-bold text-slate-800 truncate select-all">{publicSiteUrl}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(publicSiteUrl);
                    triggerToast('URL disalin ke clipboard!');
                  }}
                  className="px-2.5 py-1 bg-[#0F172A] hover:bg-slate-800 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer shrink-0"
                >
                  Salin URL
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => window.open(publicSiteUrl, '_blank')}
                className="w-full py-3 bg-[#22C55E] hover:bg-[#15803D] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
              >
                <Globe className="w-4 h-4" /> Buka Landing Page
              </button>
              
              <button
                onClick={() => {
                  setIsPublishedSuccess(false);
                  setShowPublishConfirm(false);
                  onBack();
                }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-[#E2E8F0] rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer font-black"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-[#F8FAFC] text-slate-800 flex flex-col font-sans z-[200] overflow-hidden">
        {/* Header (Vercel/Notion Style) */}
        <div className="h-[64px] px-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-black uppercase tracking-widest text-[#0F172A] flex items-center gap-2">
              🚀 Publish Landing Page
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
              status === 'Published' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-slate-100 text-slate-500'
            }`}>
              {status}
            </span>
          </div>
          <button
            onClick={() => setShowPublishConfirm(false)}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-250 border border-[#E2E8F0] text-slate-600 hover:text-[#0F172A] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
          >
            Kembali ke Editor
          </button>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 max-w-5xl mx-auto w-full space-y-6 custom-scrollbar pb-24">
          
          {/* Section 1: Subtitle / Explainer */}
          <div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Landing page Anda siap dipublikasikan dan diakses secara online.
            </p>
          </div>

          {/* Section 2: Summary Card Grid */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ringkasan Landing Page</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block mb-1">Nama Landing Page</span>
                <span className="font-extrabold text-slate-800 truncate block uppercase leading-snug">{pageData?.title || '-'}</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block mb-1">Nama Bisnis</span>
                <span className="font-extrabold text-slate-800 truncate block uppercase leading-snug">{pageData?.businessName || '-'}</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block mb-1">Template</span>
                <span className="font-extrabold text-slate-800 truncate block uppercase leading-snug">{pageData?.template?.name || pageData?.template || '-'}</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block mb-1">URL Slug</span>
                <span className="font-extrabold text-[#3a86ff] truncate block select-all leading-snug">{pageData?.slug || '-'}</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <span className={`font-extrabold block uppercase leading-snug ${status === 'Published' ? 'text-[#22C55E]' : 'text-slate-500'}`}>{status}</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block mb-1">Terakhir Update</span>
                <span className="font-extrabold text-slate-700 block leading-snug">{formattedLastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column: Checklist */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">✅ Checklist Publikasi</h3>
              
              <div className="space-y-3">
                {/* Check 1 */}
                <div className="flex gap-3 items-start p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <span className="text-base leading-none select-none">{isContentComplete ? '✅' : '❌'}</span>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-800 leading-none mb-1">Konten Lengkap</h4>
                    <p className="text-[9.5px] text-slate-500 font-medium leading-relaxed">Nama landing page, nama bisnis, dan minimal 1 section aktif harus terisi.</p>
                  </div>
                </div>

                {/* Check 2 */}
                <div className="flex gap-3 items-start p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <span className="text-base leading-none select-none">{isSlugValid ? '✅' : '❌'}</span>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-800 leading-none mb-1">URL Valid</h4>
                    <p className="text-[9.5px] text-slate-500 font-medium leading-relaxed">Subdomain/slug terisi dan menggunakan format penulisan yang benar.</p>
                  </div>
                </div>

                {/* Check 3 */}
                <div className="flex gap-3 items-start p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <span className="text-base leading-none select-none">{isReadyToPublish ? '✅' : '❌'}</span>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-800 leading-none mb-1">Landing Page Siap Dipublikasikan</h4>
                    <p className="text-[9.5px] text-slate-500 font-medium leading-relaxed">Semua parameter wajib telah terpenuhi dan draf siap diluncurkan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Preview URL */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">🌐 URL Landing Page</h3>
              
              <div className="space-y-4">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-800 break-all select-all">
                    {publicSiteUrl}
                  </div>
                  {status !== 'Published' && (
                    <p className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wide leading-none">
                      URL akan aktif setelah landing page dipublikasikan.
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(publicSiteUrl);
                      triggerToast('Link disalin ke clipboard!');
                    }}
                    className="flex-1 py-2.5 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer text-center"
                  >
                    Salin URL
                  </button>
                  {status === 'Published' && (
                    <button
                      onClick={() => window.open(publicSiteUrl, '_blank')}
                      className="flex-1 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer text-center"
                    >
                      Buka Link
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => setShowPublishConfirm(false)}
              className="w-full sm:w-auto px-6 py-3 border border-[#E2E8F0] text-slate-600 hover:bg-[#F8FAFC] rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer text-center"
            >
              Kembali ke Editor
            </button>
            <button
              onClick={async () => {
                setSaveStatus('Saving');
                try {
                  const res = await fetch(`/api/landing-pages/${pageId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contentJson })
                  });
                  const data = await res.json();
                  if (data.success) {
                    setSaveStatus('Saved');
                    triggerToast('Draf berhasil disimpan!');
                  }
                } catch (e) {
                  setSaveStatus('Error');
                }
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer text-center"
            >
              Simpan Draft
            </button>
            <button
              onClick={handlePublishSubmit}
              disabled={isSubmittingPublish || !isReadyToPublish}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isReadyToPublish
                  ? 'bg-[#22C55E] hover:bg-[#15803D] text-white hover:shadow-lg hover:scale-[1.01]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmittingPublish ? 'Memproses...' : 'Publish Landing Page'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 z-[100] flex flex-col font-sans text-slate-800 dark:text-slate-100">
      {/* 1. TOP BAR CONTROL PANEL (Tinggi 56px) */}
      <div className="h-[56px] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 shrink-0 relative z-30 shadow-sm">
        {/* Left: Project Details */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-all cursor-pointer"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">{pageData?.businessName || 'Visual Editor'}</span>
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${pageData?.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 dark:text-emerald-450' :
                  pageData?.status === 'Inactive' ? 'bg-red-500/10 text-red-400' :
                    'bg-slate-250 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                {pageData?.status || 'Draft'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-1">
              <span>Template: {pageData?.template?.name || pageData?.template}</span>
              <span>•</span>
              <span className={saveStatus === 'Saving' ? 'text-amber-500 animate-pulse' : saveStatus === 'Error' ? 'text-red-500' : 'text-emerald-500'}>
                {saveStatus === 'Saving' ? 'Menyimpan...' : saveStatus === 'Error' ? 'Gagal menyimpan' : 'Draft Tersimpan'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Main Tab Switching System */}
        <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 gap-0.5">
          {[
            { id: 'sections', label: 'Daftar Section', icon: <Layers className="w-3 h-3" /> },
            { id: 'ai_writer', label: 'Tulis dengan AI & Jadwal', icon: <Bot className="w-3 h-3" /> },
            { id: 'preview', label: 'Preview Situs', icon: <Eye className="w-3 h-3" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Publish Button */}
        <div className="flex items-center gap-3">
          {pageData?.status !== 'Published' && pageData?.status !== 'Inactive' && (
            <button
              onClick={() => setShowPublishConfirm(true)}
              className="px-4 py-1.5 bg-gradient-to-r from-brand-blue to-indigo-650 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:scale-105 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Publish <Send className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Workstation */}
      <div className="flex flex-1 overflow-hidden">

        {/* TAB 1: DAFTAR SECTION */}
        {activeTab === 'sections' && (
          <div className="flex flex-grow overflow-hidden">
            {/* PANEL KIRI: SECTION MANAGER (Lebar 280px) */}
            <aside className="w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 relative z-25 overflow-hidden shadow-sm">
              {/* Panel Header */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2.5 shrink-0 relative" ref={addSectionDropdownRef}>
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 flex items-center gap-1.5">
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
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-brand-blue/30"
                  />
                </div>

                {/* Dropdown Add Section */}
                {showAddSectionDropdown && (
                  <div className="absolute top-[4.2rem] right-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-xl z-[60] space-y-0.5 max-h-[220px] w-52 overflow-y-auto custom-scrollbar animate-in slide-in-from-top-2 duration-150">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-2 py-1 select-none">Pilih Section Baru:</span>
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

              {/* Sections List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                {filteredSections.map((sec, idx) => {
                  const isActive = activeAccordion === sec.id;
                  const isSectionAktif = sec.isActive;

                  return (
                    <div
                      key={sec.id}
                      onClick={() => setActiveAccordion(sec.id)}
                      className={`group w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${isActive
                          ? 'bg-gradient-to-r from-brand-blue/10 to-indigo-500/5 dark:from-brand-blue/20 dark:to-indigo-900/10 border-brand-blue/40 dark:border-brand-blue/50 text-brand-blue shadow-md shadow-brand-blue/5 scale-[1.01]'
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-350 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm hover:translate-y-[-0.5px]'
                        }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 mr-1">
                        {/* Grip Icon for visual aesthetics */}
                        <GripVertical className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0 select-none" />

                        <div className="w-6 h-6 bg-slate-50 dark:bg-slate-955 rounded flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                          {getSectionIcon(sec.type || sec.id, isSectionAktif)}
                        </div>

                        <div className="truncate min-w-0 flex-1">
                          <span className="text-[11px] font-bold block truncate text-slate-850 dark:text-slate-200">{sec.title || sec.name}</span>
                          <span className={`text-[8px] font-black uppercase tracking-widest leading-none block mt-0.5 ${isSectionAktif ? 'text-brand-blue' : 'text-slate-400 dark:text-slate-550'}`}>
                            {isSectionAktif ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>
                      </div>

                      {/* Right side controls: Move up/down, status toggle, delete */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(idx, 'up');
                          }}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                          title="Pindahkan Ke Atas"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(idx, 'down');
                          }}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                          title="Pindahkan Ke Bawah"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSectionActive(sec.id);
                          }}
                          className={`p-1 rounded ${isSectionAktif ? 'text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                          title={isSectionAktif ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          <Eye className="w-3 h-3" />
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
                          className={`p-1 rounded transition-colors ${sections.length <= 1 ? 'text-slate-350 dark:text-slate-700 cursor-not-allowed' : 'text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500'}`}
                          title="Hapus Section"
                          disabled={sections.length <= 1}
                        >
                          <Trash2 className="w-3 h-3" />
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
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-455 dark:text-slate-500 leading-none">Property Editor</h2>
                  <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wide block mt-1 font-black">
                    Mengedit: {activeSection?.title || activeSection?.name || activeAccordion}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('ai_writer');
                    setAiCommand(`Tulis ${activeSection?.title || activeSection?.name || activeAccordion} untuk usaha ${pageData?.businessName || 'saya'}`);
                  }}
                  className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-650 dark:text-purple-400 rounded-lg transition-all border border-purple-500/20 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider"
                  title="Gunakan AI untuk menulis konten section ini"
                >
                  <Sparkles className="w-3 h-3 animate-pulse" /> AI Write
                </button>
              </div>

              {/* Contextual Properties Form Fields */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 max-w-4xl mx-auto w-full space-y-4 custom-scrollbar pb-16">

                {/* properties for: navbar */}
                {activeSectionType === 'navbar' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Nama Brand / Judul Navigasi</label>
                      <input
                        type="text"
                        value={activeSection?.content?.brand || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, brand: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-brand-blue/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Menu Link Navigasi</label>
                      {activeSection?.content?.items?.map((item: any, i: number) => (
                        <div key={item.id} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={item.label}
                            placeholder="Label Menu"
                            onChange={(e) => updateActiveSectionContent(c => {
                              const items = [...c.items];
                              items[i] = { ...items[i], label: e.target.value };
                              return { ...c, items };
                            })}
                            className="flex-1 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-white outline-none"
                          />
                          <button
                            onClick={() => updateActiveSectionContent(c => {
                              const items = [...c.items];
                              items.splice(i, 1);
                              return { ...c, items };
                            })}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => updateActiveSectionContent(c => {
                          const items = [...(c.items || [])];
                          const newId = `menu-${Date.now()}`;
                          items.push({ id: newId, label: 'Menu Baru' });
                          return { ...c, items };
                        })}
                        className="px-3 py-1.5 text-[10px] font-black uppercase text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 border border-brand-blue/20 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Tambah Menu
                      </button>
                    </div>
                  </div>
                )}

                {/* properties for: logo */}
                {activeSectionType === 'logo' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Logo URL / Unggah Gambar</label>
                      <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                          {activeSection?.content ? (
                            <img src={activeSection.content} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <input
                          type="text"
                          value={activeSection?.content || ''}
                          onChange={(e) => updateActiveSectionContent(c => e.target.value)}
                          placeholder="https://link-logo.png"
                          className="flex-1 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-white outline-none"
                        />
                      </div>
                      <div className="pt-1">
                        <label className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg cursor-pointer transition-colors text-xs font-bold text-slate-655">
                          <Upload className="w-3.5 h-3.5 text-brand-blue" /> Unggah File Logo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => updateActiveSectionContent(c => url))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* properties for: hero */}
                {activeSectionType === 'hero' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Headline Utama</label>
                      <input
                        type="text"
                        value={activeSection?.content?.headline || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, headline: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-850 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Sub-headline Copywriter</label>
                      <textarea
                        value={activeSection?.content?.subheadline || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, subheadline: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-white outline-none resize-none h-16"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Gambar Utama (Banner)</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={activeSection?.content?.banner || ''}
                          onChange={(e) => updateActiveSectionContent(c => ({ ...c, banner: e.target.value }))}
                          placeholder="https://link-gambar-banner.jpg"
                          className="flex-1 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-white outline-none"
                        />
                        <label className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors border border-slate-700 flex items-center justify-center shrink-0">
                          <Upload className="w-3.5 h-3.5 text-brand-blue" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => updateActiveSectionContent(c => ({ ...c, banner: url })))}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Teks Tombol Aksi (CTA)</label>
                      <input
                        type="text"
                        value={activeSection?.content?.cta || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, cta: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: about */}
                {activeSectionType === 'about' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Deskripsi Singkat</label>
                      <textarea
                        value={activeSection?.content?.description || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, description: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-white outline-none resize-none h-14"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Profil Usaha</label>
                      <textarea
                        value={activeSection?.content?.profile || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, profile: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-white outline-none resize-none h-14"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Sejarah Singkat / Kisah</label>
                      <textarea
                        value={activeSection?.content?.story || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, story: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-white outline-none resize-none h-14"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: products */}
                {activeSectionType === 'products' && (
                  <div className="space-y-4">
                    {Array.isArray(activeSection?.content) && activeSection.content.map((prod: any, i: number) => (
                      <div key={i} className="bg-slate-50/60 dark:bg-slate-900/40 p-3 border border-slate-200 dark:border-slate-800 rounded-xl relative space-y-2">
                        <button
                          onClick={() => updateActiveSectionContent(c => {
                            const arr = [...(c || [])];
                            arr.splice(i, 1);
                            return arr;
                          })}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="text-[9px] font-black text-brand-blue uppercase tracking-widest leading-none mb-1">PRODUK #{i + 1}</div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Nama Produk</label>
                          <input
                            type="text"
                            value={prod.name || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], name: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Harga Produk</label>
                          <input
                            type="text"
                            value={prod.price || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], price: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Deskripsi Singkat</label>
                          <textarea
                            value={prod.description || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], description: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none h-12 resize-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Gambar Produk</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={prod.image || ''}
                              placeholder="https://link-gambar.jpg"
                              onChange={(e) => updateActiveSectionContent(c => {
                                const arr = [...(c || [])];
                                arr[i] = { ...arr[i], image: e.target.value };
                                return arr;
                              })}
                              className="flex-1 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                            />
                            <label className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer flex items-center justify-center shrink-0 border border-slate-700">
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
                    ))}
                    <button
                      onClick={() => updateActiveSectionContent(c => {
                        const arr = [...(c || [])];
                        arr.push({ name: 'Produk Baru', description: 'Deskripsi produk', price: 'Rp 10.000', image: '' });
                        return arr;
                      })}
                      className="w-full text-center py-2 border border-dashed border-slate-350 hover:border-brand-blue hover:text-brand-blue rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      + Tambah Produk Baru
                    </button>
                  </div>
                )}

                {/* properties for: advantages */}
                {activeSectionType === 'advantages' && (
                  <div className="space-y-4">
                    {Array.isArray(activeSection?.content) && activeSection.content.map((adv: any, i: number) => (
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
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Icon Keunggulan</label>
                          <select
                            value={adv.icon || 'Shield'}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], icon: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                          >
                            <option value="Shield" className="dark:bg-slate-900 dark:text-white">Keamanan (Shield)</option>
                            <option value="Zap" className="dark:bg-slate-900 dark:text-white">Kecepatan (Zap)</option>
                            <option value="Heart" className="dark:bg-slate-900 dark:text-white">Kepuasan (Heart)</option>
                            <option value="Sparkles" className="dark:bg-slate-900 dark:text-white">Premium (Sparkles)</option>
                            <option value="Star" className="dark:bg-slate-900 dark:text-white">Rating (Star)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Judul</label>
                          <input
                            type="text"
                            value={adv.title || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], title: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Deskripsi Singkat</label>
                          <textarea
                            value={adv.description || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], description: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none h-12 resize-none"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => updateActiveSectionContent(c => {
                        const arr = [...(c || [])];
                        arr.push({ icon: 'Sparkles', title: 'Fitur Unggulan', description: 'Nilai tambah bisnis Anda' });
                        return arr;
                      })}
                      className="w-full text-center py-2 border border-dashed border-slate-350 hover:border-brand-blue hover:text-brand-blue rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      + Tambah Keunggulan Baru
                    </button>
                  </div>
                )}

                {/* properties for: gallery */}
                {activeSectionType === 'gallery' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {Array.isArray(activeSection?.content) && activeSection.content.map((img: string, i: number) => (
                        <div key={i} className="aspect-square bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden group">
                          {img ? (
                            <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px] font-black">[KOSONG]</div>
                          )}
                          <button
                            onClick={() => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr.splice(i, 1);
                              return arr;
                            })}
                            className="absolute top-1 right-1 p-1 bg-red-500/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-1">
                      <label className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg cursor-pointer transition-colors text-xs font-bold text-slate-655">
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
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Nama Klien</label>
                          <input
                            type="text"
                            value={t.name || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], name: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Isi Testimoni</label>
                          <textarea
                            value={t.content || ''}
                            onChange={(e) => updateActiveSectionContent(c => {
                              const arr = [...(c || [])];
                              arr[i] = { ...arr[i], content: e.target.value };
                              return arr;
                            })}
                            className="w-full bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none h-12 resize-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Foto Klien (URL/Upload)</label>
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
                              className="flex-1 bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-md p-1.5 text-xs text-slate-805 dark:text-white outline-none"
                            />
                            <label className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer flex items-center justify-center shrink-0 border border-slate-700">
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
                      className="w-full text-center py-2 border border-dashed border-slate-350 hover:border-brand-blue hover:text-brand-blue rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      + Tambah Testimoni Baru
                    </button>
                  </div>
                )}

                {/* properties for: cta */}
                {activeSectionType === 'cta' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Judul Penawaran</label>
                      <input
                        type="text"
                        value={activeSection?.content?.title || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, title: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Deskripsi Penawaran</label>
                      <textarea
                        value={activeSection?.content?.description || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, description: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-808 dark:text-white outline-none h-14 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Teks Tombol CTA</label>
                      <input
                        type="text"
                        value={activeSection?.content?.buttonText || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, buttonText: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: contact */}
                {activeSectionType === 'contact' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Nomor WhatsApp (Format: 628xxxx)</label>
                      <input
                        type="text"
                        value={activeSection?.content?.whatsapp || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, whatsapp: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Email Bisnis</label>
                      <input
                        type="email"
                        value={activeSection?.content?.email || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, email: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Alamat Fisik</label>
                      <textarea
                        value={activeSection?.content?.address || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, address: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-808 dark:text-white outline-none h-14 resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Jam Operasional</label>
                      <input
                        type="text"
                        value={activeSection?.content?.operatingHours || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, operatingHours: e.target.value }))}
                        placeholder="Senin - Jumat, 09:00 - 17:00 WIB"
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* properties for: socialMedia */}
                {activeSectionType === 'socialMedia' && (
                  <div className="space-y-3">
                    {['instagram', 'tiktok', 'facebook', 'youtube'].map((sm) => (
                      <div key={sm} className="space-y-1">
                        <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">{sm}</label>
                        <input
                          type="text"
                          value={activeSection?.content?.[sm] || ''}
                          onChange={(e) => updateActiveSectionContent(c => ({ ...c, [sm]: e.target.value }))}
                          placeholder={`https://${sm}.com/username`}
                          className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* properties for: marketplaces */}
                {activeSectionType === 'marketplaces' && (
                  <div className="space-y-3">
                    {['shopee', 'tokopedia', 'lazada', 'externalWebsite'].map((mp) => (
                      <div key={mp} className="space-y-1">
                        <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">{mp === 'externalWebsite' ? 'Website Eksternal' : mp}</label>
                        <input
                          type="text"
                          value={getMarketplaceValue(mp)}
                          onChange={(e) => updateMarketplaceValue(mp, e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* properties for: footer */}
                {activeSectionType === 'footer' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Logo Footer (URL)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={activeSection?.content?.logo || ''}
                          onChange={(e) => updateActiveSectionContent(c => ({ ...c, logo: e.target.value }))}
                          className="flex-1 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                        />
                        <label className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer border border-slate-700 flex items-center justify-center shrink-0">
                          <Upload className="w-3.5 h-3.5 text-brand-blue" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(e, (url) => updateActiveSectionContent(c => ({ ...c, logo: url })))}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Nama Bisnis Footer</label>
                      <input
                        type="text"
                        value={activeSection?.content?.businessName || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, businessName: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Teks Copyright</label>
                      <input
                        type="text"
                        value={activeSection?.content?.copyright || ''}
                        onChange={(e) => updateActiveSectionContent(c => ({ ...c, copyright: e.target.value }))}
                        className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-855 dark:text-white outline-none"
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
          <div className="flex-grow overflow-y-auto p-4 md:p-5 max-w-5xl mx-auto w-full space-y-5 custom-scrollbar pb-16">
            {/* Redesigned AI Header with Gradient and premium layout */}
            <div className="bg-gradient-to-br from-green-500 to-amber-500 rounded-[20px] p-5 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-wide flex items-center gap-1.5 leading-none">
                    🤖 AI Copywriting & Scheduling Assistant
                  </h2>
                  <p className="text-xs text-white/90 font-medium mt-1 max-w-xl leading-relaxed">
                    Buat konten landing page yang persuasif dan jadwalkan publikasi secara otomatis dengan bantuan AI.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Kiri: Input AI (45% -> lg:col-span-5) */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-805/80 pb-3">
                  <div className="w-2 h-4 bg-green-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Workspace Input</h3>
                </div>

                {/* 1. Target Section Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-400 uppercase tracking-wider block">Target Section</label>
                  <select
                    value={activeAccordion}
                    onChange={(e) => setActiveAccordion(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  >
                    {sections.map(s => (
                      <option key={s.id} value={s.id}>{s.title || s.name}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Preset AI Grid */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 dark:text-slate-400 uppercase tracking-wider block">Preset AI</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        id: 'headline',
                        title: '✨ Headline Hero',
                        desc: 'Buat headline yang menarik perhatian',
                        prompt: 'Buat headline yang menarik perhatian untuk target section Hero Banner'
                      },
                      {
                        id: 'cta',
                        title: '✨ CTA WhatsApp',
                        desc: 'Buat ajakan tindakan yang meningkatkan konversi',
                        prompt: 'Buat ajakan tindakan WhatsApp yang meyakinkan untuk meningkatkan penjualan'
                      },
                      {
                        id: 'product',
                        title: '✨ Deskripsi Produk',
                        desc: 'Buat deskripsi yang persuasif',
                        prompt: 'Buat deskripsi produk yang persuasif, informatif, dan menonjolkan keunggulan produk'
                      },
                      {
                        id: 'advantage',
                        title: '✨ Keunggulan Bisnis',
                        desc: 'Tonjolkan nilai unik usaha',
                        prompt: 'Buat daftar keunggulan bisnis yang unik, kredibel, dan membujuk pembaca'
                      }
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
                          className={`text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col justify-between h-20 shadow-sm cursor-pointer select-none ${
                            isActive
                              ? 'bg-green-50/50 dark:bg-green-950/20 border-green-500 ring-1 ring-green-500'
                              : 'bg-slate-50/50 dark:bg-slate-950/50 hover:bg-green-50 dark:hover:bg-green-950/20 border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-800/50'
                          }`}
                        >
                          <span className={`font-black uppercase tracking-tight text-[10px] ${isActive ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            {preset.title}
                          </span>
                          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold leading-normal">
                            {preset.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Prompt Custom */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-wider block">Prompt Custom</label>
                  <textarea
                    value={aiCommand}
                    onChange={(e) => {
                      setAiCommand(e.target.value);
                      setSelectedPreset(null);
                    }}
                    placeholder="Tuliskan instruksi untuk AI. Contoh: Buat headline yang meyakinkan untuk jasa kebersihan rumah dengan gaya profesional dan terpercaya."
                    className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-200 outline-none resize-none h-24 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all leading-relaxed placeholder:text-slate-400"
                  />
                </div>

                {/* 4. Tombol Generate */}
                <button
                  onClick={handleAiGenerateSubmit}
                  disabled={isGeneratingCopy || !aiCommand.trim()}
                  className="w-full py-3 bg-[#22C55E] hover:bg-[#15803D] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isGeneratingCopy ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Menulis salinan copywriting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> ✨ Generate Konten AI
                    </>
                  )}
                </button>
              </div>

              {/* Kanan: Hasil AI (55% -> lg:col-span-7) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 min-h-[360px] flex flex-col">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4 shrink-0">
                  <div className="w-2 h-4 bg-amber-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Hasil Generasi AI</h3>
                </div>

                {!aiSuggestions ? (
                  /* Empty State */
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-green-500">
                      🤖
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">AI siap membantu Anda</h4>
                      <p className="text-[10px] max-w-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                        Pilih preset atau tulis instruksi, lalu klik Generate Konten AI untuk menghasilkan copywriting secara instan.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setAiCommand('Buat headline yang meyakinkan untuk bisnis kami dengan gaya profesional.');
                        setSelectedPreset('headline');
                      }}
                      className="px-5 py-2 bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Generate Sekarang
                    </button>
                  </div>
                ) : (
                  /* Results Available (Card with light green border) */
                  <div className="flex-grow flex flex-col justify-between space-y-4 animate-in fade-in duration-300">
                    <div className="flex-1 p-4 bg-green-50/20 dark:bg-green-950/10 border border-green-500/20 dark:border-green-800/50 rounded-xl space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-green-500/10 dark:border-green-800/20 pb-2">
                        <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Konten Rekomendasi AI</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                          Target: {sections.find(s => s.id === activeAccordion)?.title || sections.find(s => s.id === activeAccordion)?.name}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {aiSuggestions.suggestedData?.headline && (
                          <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-850 shadow-sm space-y-1">
                            <span className="text-[9px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-widest block">Headline / Title</span>
                            <p className="font-extrabold text-slate-800 dark:text-slate-100 text-xs leading-snug">{aiSuggestions.suggestedData.headline}</p>
                          </div>
                        )}
                        {aiSuggestions.suggestedData?.subheadline && (
                          <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-850 shadow-sm space-y-1">
                            <span className="text-[9px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-widest block">Subheadline / Deskripsi</span>
                            <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold leading-relaxed">{aiSuggestions.suggestedData.subheadline}</p>
                          </div>
                        )}
                        {aiSuggestions.suggestedData?.cta && (
                          <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-850 shadow-sm space-y-1">
                            <span className="text-[9px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-widest block">CTA Button</span>
                            <p className="font-extrabold text-green-600 dark:text-green-400 text-xs uppercase tracking-wider">{aiSuggestions.suggestedData.cta}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2 shrink-0">
                      <button
                        onClick={applyAiCopy}
                        className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" /> Gunakan Konten
                      </button>
                      <button
                        onClick={handleAiGenerateSubmit}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 border border-slate-200/50 dark:border-slate-700"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Generate Ulang
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Redesigned Jadwal Publikasi AI (Timeline) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-4 bg-amber-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-1">
                    📅 Jadwal Publikasi AI
                  </h3>
                </div>
                <button
                  onClick={() => setIsSchedulerModalOpen(true)}
                  className="px-3.5 py-1.5 bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Jadwalkan Konten
                </button>
              </div>

              {/* Vertical Timeline Layout */}
              <div className="relative pl-6 space-y-4 border-l border-slate-100 dark:border-slate-800 ml-3 py-1">
                {schedules.map((q, i) => {
                  let statusBg = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
                  let dotBg = 'bg-slate-400';
                  
                  if (q.status === 'Scheduled' || q.status === 'AI Scheduled') {
                    statusBg = 'bg-amber-100/60 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50';
                    dotBg = 'bg-amber-500';
                  } else if (q.status === 'Published') {
                    statusBg = 'bg-green-100/60 dark:bg-green-950/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900/50';
                    dotBg = 'bg-green-500';
                  } else if (q.status === 'Queued') {
                    statusBg = 'bg-blue-100/60 dark:bg-blue-950/20 text-blue-600 dark:text-blue-450 border-blue-200 dark:border-blue-900/50';
                    dotBg = 'bg-blue-500';
                  }

                  return (
                    <div key={i} className="relative flex items-center justify-between gap-4 group">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[30px] w-2.5 h-2.5 rounded-full ${dotBg} border-2 border-white dark:border-slate-900 z-10 transition-transform group-hover:scale-125`} />
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-green-50/50 dark:group-hover:bg-green-950/20 group-hover:text-green-500 transition-colors">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h6 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase leading-none mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {q.title}
                          </h6>
                          <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            {q.date}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[8px] font-black border px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm ${statusBg}`}>
                        {q.status}
                      </span>
                    </div>
                  );
                })}
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${previewMode === dev.id
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
              <div className="flex items-center bg-slate-50 dark:bg-slate-955 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 gap-2">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-450 tracking-widest">Skala: {Math.round(zoomScale * 100)}%</span>
                <button
                  onClick={() => setZoomScale(Math.max(0.5, zoomScale - 0.1))}
                  className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="px-2.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  Fit
                </button>
                <button
                  onClick={() => setZoomScale(Math.min(1.5, zoomScale + 0.1))}
                  className="px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
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
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0f172a] rounded-full z-30 flex items-center justify-center border border-slate-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-100 mr-8" />
                    <div className="w-8 h-1 bg-slate-800 rounded-full" />
                  </div>
                )}

                {/* Embed template renderer */}
                <div className="w-full h-full overflow-y-auto bg-white text-slate-900 custom-scrollbar pt-1">
                  <TemplateRenderer
                    templateId={pageData?.template?.id || pageData?.template?.name}
                    contentJson={contentJson}
                    isMobile={previewMode === 'mobile'}
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
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[20px] p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-205 flex items-center gap-1.5">📅 Jadwalkan Konten Baru</h3>
              <button onClick={() => setIsSchedulerModalOpen(false)} className="text-slate-400 hover:text-slate-655 dark:hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-wider block">Judul Konten</label>
                <input
                  type="text"
                  value={newScheduleTitle}
                  onChange={(e) => setNewScheduleTitle(e.target.value)}
                  placeholder="Contoh: Promo Ramadhan Kopi"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-205 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>


              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-wider block">Waktu Publikasi</label>
                <input
                  type="text"
                  value={newScheduleDate}
                  onChange={(e) => setNewScheduleDate(e.target.value)}
                  placeholder="Contoh: Besok 09:00, atau Jumat 15:30"
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-205 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-455 dark:text-slate-400 uppercase tracking-wider block">Status</label>
                <select
                  value={newScheduleStatus}
                  onChange={(e) => setNewScheduleStatus(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-205 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Queued">Queued</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsSchedulerModalOpen(false)}
                className="flex-1 py-2.5 text-[10px] font-black uppercase tracking-wider border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer text-slate-500 dark:text-slate-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Jadwalkan
              </button>
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
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-805 dark:text-slate-200">Konfirmasi Hapus</h3>
              <p className="text-xs text-slate-505 dark:text-slate-400 font-medium">Yakin ingin menghapus section ini?</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSectionToDelete(null)}
                className="flex-1 py-2 text-[10px] font-black uppercase tracking-wider border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer text-slate-605 dark:text-slate-350"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleDeleteSection(sectionToDelete);
                  setSectionToDelete(null);
                }}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {editorToast && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 border border-brand-blue/30 dark:border-brand-blue/50 text-slate-850 dark:text-slate-100 px-5 py-3 rounded-2xl shadow-2xl z-[200] animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
          <span className="text-base font-black uppercase tracking-wider">{editorToast}</span>
        </div>
      )}
    </div>
  );
}
