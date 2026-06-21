"use client";

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Shield, 
  Zap, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Star,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  ShoppingCart,
  Send,
  Calendar,
  Check,
  User,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface TemplateRendererProps {
  templateId: string | number;
  contentJson: any;
  isMobile?: boolean;
  siteConfig?: { slug: string, title: string, pages: any[] };
  themeColor?: string | null;
}

export default function TemplateRenderer({ templateId, contentJson, isMobile = false, siteConfig, themeColor }: TemplateRendererProps) {
  const tid = String(templateId);
  // Normalize content JSON to avoid crashes
  const c = contentJson || {};
  const sectionsList = Array.isArray(c.sections) ? c.sections : [];

  // Extract all unique fonts used in sections
  const uniqueFonts = React.useMemo(() => {
    const fontsSet = new Set<string>();
    sectionsList.forEach((s: any) => {
      if (s.styles?.fontFamily) {
        fontsSet.add(s.styles.fontFamily);
      }
    });
    return Array.from(fontsSet);
  }, [sectionsList]);

  // Dynamically load Google Fonts link
  React.useEffect(() => {
    if (uniqueFonts.length === 0) return;
    const fontParam = uniqueFonts.map(f => f.replace(/\s+/g, '+')).join('|');
    const linkId = 'google-fonts-sections';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css?family=${fontParam}:wght@400;500;700;900&display=swap`;
  }, [uniqueFonts]);

  const getSectionStyle = (secId: string, defaultBg?: string, defaultColor?: string) => {
    const sec = sectionsList.find((s: any) => s.id === secId || s.type === secId);
    if (!sec) return {};
    
    const styles: React.CSSProperties = {};
    
    // Apply custom background color if available, otherwise use template default
    if (sec.styles?.backgroundColor) {
      styles.backgroundColor = sec.styles.backgroundColor;
    } else if (defaultBg) {
      styles.backgroundColor = defaultBg;
    }
    
    if (sec.styles?.textColor) {
      styles.color = sec.styles.textColor;
    } else if (defaultColor) {
      styles.color = defaultColor;
    }
    
    if (sec.styles?.fontFamily) {
      styles.fontFamily = sec.styles.fontFamily;
    }
    
    return styles;
  };

  const getTextColorStyle = (secId: string) => {
    const sec = sectionsList.find((s: any) => s.id === secId || s.type === secId);
    return sec?.styles?.textColor ? { color: sec.styles.textColor } : {};
  };

  const getSectionContent = (type: string, fallback: any) => {
    const sec = sectionsList.find((s: any) => s.type === type || s.id === type);
    return sec && sec.content !== undefined ? sec.content : fallback;
  };

  const navbar = getSectionContent('navbar', c.navbar || { brand: 'Situs Bisnis', items: [] });
  const logoContent = getSectionContent('logo', c.logo || '');
  const logo = logoContent === '/logo.png' ? '/logo.png?v=4' : (logoContent || '');
  const hero = getSectionContent('hero', c.hero || { headline: 'Selamat Datang', subheadline: 'Deskripsi bisnis', banner: '', cta: 'Hubungi Kami' });
  const about = getSectionContent('about', c.about || { description: '', profile: '', story: '' });
  const products = getSectionContent('products', Array.isArray(c.products) ? c.products : []);
  const advantages = getSectionContent('advantages', Array.isArray(c.advantages) ? c.advantages : []);
  const gallery = getSectionContent('gallery', Array.isArray(c.gallery) ? c.gallery : []);
  const testimonials = getSectionContent('testimonials', Array.isArray(c.testimonials) ? c.testimonials : []);
  const cta = getSectionContent('cta', c.cta || { title: '', description: '', buttonText: '' });
  const contact = getSectionContent('contact', c.contact || { whatsapp: '', email: '', address: '', operatingHours: '' });
  const socialMedia = getSectionContent('socialMedia', c.socialMedia || { instagram: '', tiktok: '', facebook: '', youtube: '' });
  const marketplaces = getSectionContent('marketplaces', c.marketplaces || { shopee: '', tokopedia: '', lazada: '', externalWebsite: '' });
  const footer = getSectionContent('footer', c.footer || { logo: '', businessName: '', copyright: '' });

  // Helper for rendering icons dynamically
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-6 h-6 text-brand-blue" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Heart': return <Heart className="w-6 h-6 text-red-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-500" />;
      case 'Star': return <Star className="w-6 h-6 text-yellow-500 fill-current" />;
      default: return <Sparkles className="w-6 h-6 text-brand-blue" />;
    }
  };

  // 1. UMKM Template Layout (Makanan & Retail)
  if (tid === 'tpl-umkm' || tid === 'Makanan & Retail') {
    const defaultSectionsList = [
      { id: 'logo', status: 'Aktif' },
      { id: 'navbar', status: 'Aktif' },
      { id: 'hero', status: 'Aktif' },
      { id: 'about', status: 'Aktif' },
      { id: 'products', status: 'Aktif' },
      { id: 'advantages', status: 'Aktif' },
      { id: 'gallery', status: 'Aktif' },
      { id: 'testimonials', status: 'Aktif' },
      { id: 'cta', status: 'Aktif' },
      { id: 'contact', status: 'Aktif' },
      { id: 'socialMedia', status: 'Aktif' },
      { id: 'marketplaces', status: 'Nonaktif' },
      { id: 'footer', status: 'Aktif' }
    ];

    const sectionsOrder = Array.isArray(c.sections) ? c.sections : defaultSectionsList;

    const isSecActive = (idOrType: string) => {
      const sec = sectionsOrder.find((s: any) => s.id === idOrType || s.type === idOrType);
      if (!sec) return false;
      return sec.isActive !== false && sec.status !== 'Nonaktif';
    };

    const isNavbarActive = isSecActive('navbar');
    const isFooterActive = isSecActive('footer');
    const isContactActive = isSecActive('contact');
    const isSocialActive = isSecActive('socialMedia');
    
    const layoutSections = sectionsOrder.filter((s: any) => {
      const type = s.type || s.id;
      const active = s.isActive !== false && s.status !== 'Nonaktif';
      return type !== 'navbar' && type !== 'footer' && type !== 'logo' && type !== 'contact' && type !== 'socialMedia' && active;
    });

    return (
      <div className={`w-full bg-[#fcfbf7] text-[#332f21] font-sans antialiased selection:bg-amber-100 selection:text-amber-900 ${isMobile ? 'py-2 px-1' : ''} min-h-screen`}>
        {/* Navigation */}
        {isNavbarActive && (() => {
          const navStyles = getSectionStyle('navbar');
          return (
            <nav 
              className={`backdrop-blur-md border-b flex justify-between items-center sticky top-0 z-50 shadow-sm ${isMobile ? 'py-2 px-3 gap-2' : 'py-4 px-6 md:px-12'}`}
              style={{
                backgroundColor: navStyles.backgroundColor || 'rgba(255, 255, 255, 0.8)',
                borderColor: navStyles.color ? `${navStyles.color}20` : 'rgba(245, 158, 11, 0.2)',
                color: navStyles.color || '#d97706',
                fontFamily: navStyles.fontFamily
              }}
            >
              <div className={`flex items-center ${isMobile ? 'gap-1.5 max-w-[65%]' : 'gap-3'}`}>
                {logo ? (
                  <img src={logo} alt="Logo" className={`${isMobile ? 'w-9 h-9' : 'w-16 h-16'} object-contain`} />
                ) : (
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white font-black" style={navStyles.color ? { backgroundColor: navStyles.color } : undefined}>L</div>
                )}
                <span 
                  className={`tracking-tight uppercase font-black text-amber-950 ${isMobile ? 'text-[10px] leading-tight line-clamp-2' : 'text-lg'}`}
                  style={getTextColorStyle('navbar')}
                >
                  {navbar.brand || 'UMKM Nusantara'}
                </span>
              </div>
              {!isMobile && (
                <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest" style={getTextColorStyle('navbar')}>
                  {Array.isArray(navbar.items) && navbar.items.map((item: any) => (
                    <a key={item.id} href={`#${item.id}`} className="hover:text-amber-600 transition-colors" style={getTextColorStyle('navbar')}>{item.label}</a>
                  ))}
                </div>
              )}
              {contact.whatsapp && (
                <a 
                  href={`https://wa.me/${contact.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-sm ${isMobile ? 'px-3 py-1.5 text-[9px] shrink-0' : 'px-5 py-2.5 text-xs'}`}
                  style={{ backgroundColor: navStyles.color || '#d97706' }}
                >
                  Order WA
                </a>
              )}
            </nav>
          );
        })()}

        {/* Dynamic Sections */}
        {layoutSections.map((sec: any) => {
          const secType = sec.type || sec.id;
          const secContent = sec.content || c[secType] || {};
          
          const hero = secType === 'hero' ? secContent : {};
          const about = secType === 'about' ? secContent : {};
          const products = secType === 'products' ? (Array.isArray(secContent) ? secContent : []) : [];
          const advantages = secType === 'advantages' ? (Array.isArray(secContent) ? secContent : []) : [];
          const gallery = secType === 'gallery' ? (Array.isArray(secContent) ? secContent : []) : [];
          const testimonials = secType === 'testimonials' ? (Array.isArray(secContent) ? secContent : []) : [];
          const cta = secType === 'cta' ? secContent : {};
          const marketplaces = secType === 'marketplaces' ? secContent : {};

          switch (secType) {
            case 'hero':
              return (
                <section 
                  id="home" 
                  key="hero" 
                  className={`max-w-6xl mx-auto grid gap-12 items-center ${isMobile ? 'py-8 px-4 grid-cols-1 gap-6' : 'py-16 md:py-24 px-6 md:px-12 grid-cols-1 md:grid-cols-2'}`}
                  style={getSectionStyle(sec.id)}
                >
                  <div className="space-y-6 text-left">
                    <div 
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200/50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm"
                      style={getTextColorStyle(sec.id)}
                    >
                      <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" style={getTextColorStyle(sec.id)} /> 100% Produk Lokal Asli
                    </div>
                    <h1 
                      className={`font-black text-amber-950 tracking-tight leading-tight uppercase ${isMobile ? 'text-xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      {hero.headline}
                    </h1>
                    <p 
                      className={`text-amber-900/70 font-medium leading-relaxed ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      {hero.subheadline}
                    </p>
                    {contact.whatsapp && (
                      <a 
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-3 bg-amber-600 text-white font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg hover:scale-105 ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                        style={{ backgroundColor: sec.styles?.textColor || '#d97706' }}
                      >
                        {hero.cta || 'Beli Sekarang'} <ShoppingCart className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full -z-10" style={sec.styles?.textColor ? { backgroundColor: `${sec.styles.textColor}15` } : undefined}></div>
                    {hero.banner ? (
                      <img src={hero.banner} alt="Banner" className="w-full aspect-[4/3] object-cover rounded-[32px] border-4 border-white shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500" />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-amber-100 rounded-[32px] flex items-center justify-center text-amber-400 font-bold uppercase tracking-widest border border-amber-200" style={getTextColorStyle(sec.id)}>[ Banner Produk ]</div>
                    )}
                  </div>
                </section>
              );

            case 'about':
              return (
                <section 
                  id="about" 
                  key="about" 
                  className={`bg-amber-50/50 border-y border-amber-100/40 ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`}
                  style={getSectionStyle(sec.id)}
                >
                  <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                    <div className="space-y-3">
                      <h2 
                        className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                        style={getTextColorStyle(sec.id)}
                      >
                        Kisah Di Balik Produk Kami
                      </h2>
                      <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: sec.styles?.textColor || '#d97706' }} />
                    </div>
                    <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                      <div 
                        className="bg-white p-6 rounded-2xl border border-amber-100/50 shadow-sm space-y-3"
                        style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}25` : undefined }}
                      >
                        <h4 
                          className="font-black text-amber-950 uppercase text-xs tracking-wider"
                          style={getTextColorStyle(sec.id)}
                        >
                          Tentang Kami
                        </h4>
                        <p className="text-xs font-medium leading-relaxed text-amber-900/70" style={getTextColorStyle(sec.id)}>
                            {(typeof about.description === 'string' && about.description) || 'Penyedia produk kerajinan dan kuliner lokal unggulan.'}
                        </p>
                      </div>
                      <div 
                        className="bg-white p-6 rounded-2xl border border-amber-100/50 shadow-sm space-y-3"
                        style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}25` : undefined }}
                      >
                        <h4 
                          className="font-black text-amber-950 uppercase text-xs tracking-wider"
                          style={getTextColorStyle(sec.id)}
                        >
                          Profil Usaha
                        </h4>
                        <p 
                          className="text-xs text-amber-900/70 font-medium leading-relaxed"
                          style={getTextColorStyle(sec.id)}
                        >
                          {about.profile || 'Kami didukung oleh tenaga terampil lokal berdedikasi tinggi.'}
                        </p>
                      </div>
                      <div 
                        className="bg-white p-6 rounded-2xl border border-amber-100/50 shadow-sm space-y-3"
                        style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}25` : undefined }}
                      >
                        <h4 
                          className="font-black text-amber-950 uppercase text-xs tracking-wider"
                          style={getTextColorStyle(sec.id)}
                        >
                          Visi & Nilai
                        </h4>
                        <p 
                          className="text-xs text-amber-900/70 font-medium leading-relaxed"
                          style={getTextColorStyle(sec.id)}
                        >
                          {about.story || 'Pemberdayaan ekonomi kreatif lokal yang ramah lingkungan.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              );

            case 'products':
              return (
                <section 
                  id="products" 
                  key="products" 
                  className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-16'}`}
                  style={getSectionStyle(sec.id)}
                >
                  <div className="text-center space-y-3">
                    <h2 
                      className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      Produk Pilihan Terbaik
                    </h2>
                    <p 
                      className={`text-amber-900/60 max-w-lg mx-auto font-bold uppercase tracking-widest ${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      Segar, berkualitas, diproduksi langsung dari petani & pengrajin lokal
                    </p>
                    <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: sec.styles?.textColor || '#d97706' }} />
                  </div>
                  <div className={`grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                    {products.map((prod, i) => (
                      <div 
                        key={i} 
                        className="bg-white rounded-3xl overflow-hidden border border-amber-100/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                        style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}25` : undefined }}
                      >
                        <div className="aspect-[4/3] overflow-hidden relative bg-amber-50">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold uppercase text-[10px] tracking-widest" style={getTextColorStyle(sec.id)}>[ Image {i+1} ]</div>
                          )}
                          <div className="absolute bottom-4 right-4 text-white font-black px-3 py-1 rounded-xl text-xs" style={{ backgroundColor: sec.styles?.textColor || '#d97706' }}>
                            {prod.price}
                          </div>
                        </div>
                        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 
                              className="text-sm font-black text-amber-950 uppercase tracking-tight"
                              style={getTextColorStyle(sec.id)}
                            >
                              {prod.name}
                            </h4>
                            <p 
                              className="text-xs text-amber-900/70 font-medium leading-relaxed line-clamp-3"
                              style={getTextColorStyle(sec.id)}
                            >
                              {typeof prod.description === 'string' ? prod.description : ''}
                            </p>
                          </div>
                          {contact.whatsapp && (
                            <a 
                              href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(prod.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 hover:bg-amber-600 hover:text-white text-amber-950 font-black rounded-xl text-[10px] uppercase tracking-wider text-center transition-all mt-4 inline-block"
                              style={{
                                backgroundColor: sec.styles?.textColor ? `${sec.styles.textColor}10` : 'rgba(217, 119, 6, 0.1)',
                                color: sec.styles?.textColor || '#d97706',
                                borderColor: sec.styles?.textColor ? `${sec.styles.textColor}30` : undefined
                              }}
                            >
                              Pesan via WA
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'advantages':
              return (
                <section 
                  key="advantages" 
                  className={`bg-amber-900 text-white ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`} 
                  style={getSectionStyle(sec.id, '#451a03', '#ffffff')}
                >
                  <div className={`max-w-4xl mx-auto grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                    {advantages.map((adv, i) => (
                      <div key={i} className="text-center space-y-4">
                        <div className="w-14 h-14 bg-amber-800/50 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-amber-700/50">
                          {renderIcon(adv.icon)}
                        </div>
                        <h4 
                          className="font-black text-base uppercase tracking-tight text-white"
                          style={getTextColorStyle(sec.id)}
                        >
                          {adv.title}
                        </h4>
                        <p 
                          className="text-xs text-amber-100/75 leading-relaxed"
                          style={getTextColorStyle(sec.id)}
                        >
                          {typeof adv.description === 'string' ? adv.description : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'gallery':
              return (
                <section 
                  key="gallery" 
                  className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-12'}`}
                  style={getSectionStyle(sec.id)}
                >
                  <div className="text-center space-y-3">
                    <h2 
                      className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      Galeri Kegiatan Kami
                    </h2>
                    <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: sec.styles?.textColor || '#d97706' }} />
                  </div>
                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 md:grid-cols-3'}`}>
                    {gallery.map((img, i) => (
                      <div key={i} className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-amber-100 bg-amber-50">
                        {img ? (
                          <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold uppercase text-[10px] tracking-widest">[ Image {i+1} ]</div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'testimonials':
              return (
                <section 
                  id="testimonials" 
                  key="testimonials" 
                  className={`bg-amber-50/50 border-y border-amber-100/40 ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`}
                  style={getSectionStyle(sec.id)}
                >
                  <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                    <div className="space-y-3">
                      <h2 
                        className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                        style={getTextColorStyle(sec.id)}
                      >
                        Ulasan Pelanggan
                      </h2>
                      <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: sec.styles?.textColor || '#d97706' }} />
                    </div>
                    <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {testimonials.map((t, i) => (
                        <div 
                          key={i} 
                          className="bg-white p-8 rounded-3xl border border-amber-100/50 shadow-sm space-y-4"
                          style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}25` : undefined }}
                        >
                          <div className="flex gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-4 h-4 fill-current" />)}
                          </div>
                          <p 
                            className="text-xs text-amber-900/80 italic font-medium leading-relaxed relative z-10"
                            style={getTextColorStyle(sec.id)}
                          >
                            "{typeof t.content === 'string' ? t.content : ''}"
                          </p>
                          <div className="flex items-center gap-3 border-t border-amber-50 pt-4">
                            <img src={t.photo || `https://i.pravatar.cc/100?img=${i}`} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            <h5 
                              className="text-xs font-black text-amber-950 uppercase tracking-wider"
                              style={getTextColorStyle(sec.id)}
                            >
                              {t.name}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'cta':
              return (
                <section 
                  key="cta" 
                  className={`max-w-5xl mx-auto text-center relative overflow-hidden bg-amber-50 border border-amber-200/50 my-12 ${isMobile ? 'py-8 px-4 rounded-[24px] space-y-6 my-6' : 'py-16 md:py-24 px-6 md:px-12 rounded-[40px] space-y-8'}`}
                  style={getSectionStyle(sec.id, '#fffbeb')}
                >
                  <div className="space-y-3">
                    <h2 
                      className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      {cta.title}
                    </h2>
                    <p 
                      className={`text-amber-900/70 max-w-xl mx-auto font-medium ${isMobile ? 'text-xs' : 'text-xs md:text-sm'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      {cta.description}
                    </p>
                  </div>
                  {contact.whatsapp && (
                    <a 
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 bg-amber-600 text-white font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                      style={{ backgroundColor: sec.styles?.textColor || '#d97706' }}
                    >
                      {cta.buttonText || 'Hubungi Kami'} <MessageCircle className="w-4.5 h-4.5" />
                    </a>
                  )}
                </section>
              );

            case 'marketplaces':
              return (
                <section 
                  key="marketplaces" 
                  className={`border-t border-amber-100 bg-white text-center ${isMobile ? 'py-8 px-4' : 'py-12 px-6'}`}
                  style={getSectionStyle(sec.id, '#ffffff')}
                >
                  <div className="max-w-4xl mx-auto space-y-4">
                    <p 
                      className="text-[10px] font-black text-amber-900/60 uppercase tracking-widest"
                      style={getTextColorStyle(sec.id)}
                    >
                      Tersedia Juga di Marketplace Resmi
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                      {marketplaces.shopee && <a href={marketplaces.shopee} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600" style={getTextColorStyle(sec.id)}>Shopee</a>}
                      {marketplaces.tokopedia && <a href={marketplaces.tokopedia} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600" style={getTextColorStyle(sec.id)}>Tokopedia</a>}
                      {marketplaces.lazada && <a href={marketplaces.lazada} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600" style={getTextColorStyle(sec.id)}>Lazada</a>}
                      {marketplaces.externalWebsite && <a href={marketplaces.externalWebsite} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600" style={getTextColorStyle(sec.id)}>Website Utama</a>}
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}

        {/* Footer */}
        {isFooterActive && (
          <footer id="contact" className={`bg-amber-950 text-amber-100 border-t border-amber-900/40 ${isMobile ? 'py-10 px-4' : 'py-16 px-6 md:px-12'}`}>
            <div className={`max-w-6xl mx-auto grid gap-12 mb-12 ${isMobile ? 'grid-cols-1 gap-8 mb-8' : 'grid-cols-1 md:grid-cols-3'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {logo ? <img src={logo} alt="Logo" className="w-14 h-14 object-contain" /> : null}
                  <h3 className="text-md font-black uppercase tracking-wider">{footer.businessName || navbar.brand}</h3>
                </div>
                <p className="text-xs text-amber-100/70 font-medium leading-relaxed">Mendukung perekonomian lokal melalui digitalisasi UMKM kreatif Nusantara.</p>
              </div>

              {isContactActive && (
                <div className="space-y-4 text-left">
                  <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">Kontak Info</h4>
                  <div className="space-y-2 text-xs text-amber-100/75">
                    {contact.whatsapp && <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> {contact.whatsapp}</p>}
                    {contact.email && <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" /> {contact.email}</p>}
                    {contact.address && <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> {contact.address}</p>}
                    {contact.operatingHours && <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> {contact.operatingHours}</p>}
                  </div>
                </div>
              )}

              {isSocialActive && (
                <div className="space-y-4 text-left">
                  <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">Ikuti Kami</h4>
                  <div className="flex gap-4 text-amber-100/70">
                    {socialMedia.instagram && <a href={socialMedia.instagram} target="_blank" rel="noreferrer" className="hover:text-amber-400"><Instagram className="w-5 h-5" /></a>}
                    {socialMedia.facebook && <a href={socialMedia.facebook} target="_blank" rel="noreferrer" className="hover:text-amber-400"><Facebook className="w-5 h-5" /></a>}
                    {socialMedia.youtube && <a href={socialMedia.youtube} target="_blank" rel="noreferrer" className="hover:text-amber-400"><Youtube className="w-5 h-5" /></a>}
                  </div>
                </div>
              )}
            </div>
            <div className="max-w-6xl mx-auto pt-8 border-t border-amber-900/60 text-center text-[10px] font-bold text-amber-100/50 uppercase tracking-widest">
              {footer.copyright || `© 2026 ${footer.businessName || navbar.brand}. All rights reserved.`}
            </div>
          </footer>
        )}
      </div>
    );
  }
  // Fallback for other templates (Jasa, Promo, Portfolio, Event)
  const isDarkTheme = tid === 'tpl-portfolio' || tid === 'Agensi & Kreatif' || tid === 'tpl-promo' || tid === 'Campaign & Promo';
  
  let primaryColor = '#3a86ff'; // Brand Blue
  let primaryColorHover = '#2563eb';
  let bgColor = isDarkTheme ? 'bg-[#0b0f19]' : 'bg-slate-50';
  let textColor = isDarkTheme ? 'text-slate-100' : 'text-slate-900';
  let cardColor = isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100';

  if (tid === 'tpl-jasa' || tid === 'Jasa & Konsultan') {
    primaryColor = '#0284c7'; // Sky Blue
    primaryColorHover = '#0369a1';
  } else if (tid === 'tpl-promo' || tid === 'Campaign & Promo') {
    primaryColor = '#ea580c'; // Orange-Red
    primaryColorHover = '#c2410c';
  } else if (tid === 'tpl-portfolio' || tid === 'Agensi & Kreatif') {
    primaryColor = '#8b5cf6'; // Purple
    primaryColorHover = '#7c3aed';
  } else if (tid === 'tpl-event' || tid === 'Event & Seminar') {
    primaryColor = '#eab308'; // Amber-Yellow
    primaryColorHover = '#ca8a04';
  }

  // Override with user's selected theme color if available
  if (themeColor) {
    primaryColor = themeColor;
    primaryColorHover = themeColor;
  }

  const defaultSectionsList = [
    { id: 'logo', status: 'Aktif' },
    { id: 'navbar', status: 'Aktif' },
    { id: 'hero', status: 'Aktif' },
    { id: 'about', status: 'Aktif' },
    { id: 'products', status: 'Aktif' },
    { id: 'advantages', status: 'Aktif' },
    { id: 'gallery', status: 'Aktif' },
    { id: 'testimonials', status: 'Aktif' },
    { id: 'cta', status: 'Aktif' },
    { id: 'contact', status: 'Aktif' },
    { id: 'socialMedia', status: 'Aktif' },
    { id: 'marketplaces', status: 'Nonaktif' },
    { id: 'footer', status: 'Aktif' }
  ];

  const sectionsOrder = Array.isArray(c.sections) ? c.sections : defaultSectionsList;

  const isSecActive = (idOrType: string) => {
    const sec = sectionsOrder.find((s: any) => s.id === idOrType || s.type === idOrType);
    if (!sec) return false;
    return sec.isActive !== false && sec.status !== 'Nonaktif';
  };

  const isNavbarActive = isSecActive('navbar');
  const isFooterActive = isSecActive('footer');
  const isContactActive = isSecActive('contact');
  const isSocialActive = isSecActive('socialMedia');
  
  const layoutSections = sectionsOrder.filter((s: any) => {
    const type = s.type || s.id;
    const active = s.isActive !== false && s.status !== 'Nonaktif';
    return type !== 'navbar' && type !== 'footer' && type !== 'logo' && type !== 'contact' && type !== 'socialMedia' && active;
  });

  return (
    <div className={`w-full ${bgColor} ${textColor} font-sans antialiased ${isMobile ? 'py-2 px-1' : ''} min-h-screen`}>
      {/* Navigation */}
      {isNavbarActive && (() => {
        const navStyles = getSectionStyle('navbar');
        return (
          <nav 
            className={`flex justify-between items-center ${isMobile ? 'relative' : 'sticky top-0'} z-50 shadow-sm backdrop-blur-md border-b ${isMobile ? 'py-2 px-3 gap-2' : 'py-4 px-6 md:px-12'}`}
            style={{
              backgroundColor: navStyles.backgroundColor || (isDarkTheme ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'),
              borderColor: navStyles.color ? `${navStyles.color}20` : (isDarkTheme ? 'rgba(30, 41, 59, 0.8)' : 'rgba(241, 245, 249, 0.8)'),
              color: navStyles.color || (isDarkTheme ? '#f8fafc' : '#0f172a'),
              fontFamily: navStyles.fontFamily
            }}
          >
            <div className={`flex items-center ${isMobile ? 'gap-1.5 max-w-[65%]' : 'gap-3'}`}>
              {logo ? (
                <img src={logo} alt="Logo" className={`${isMobile ? 'w-9 h-9' : 'w-16 h-16'} object-contain`} />
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black" style={{ backgroundColor: navStyles.color || primaryColor }}>L</div>
              )}
              <span 
                className={`tracking-tight uppercase font-black ${isMobile ? 'text-[10px] leading-tight line-clamp-2' : 'text-lg'}`}
                style={getTextColorStyle('navbar')}
              >
                {navbar.brand || footer.businessName || 'Situs Bisnis'}
              </span>
            </div>
            {!isMobile && (
              <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest" style={getTextColorStyle('navbar')}>
                {siteConfig && siteConfig.pages && siteConfig.pages.length > 1 ? (
                  siteConfig.pages.map((p: any) => (
                    <a key={p.slug} href={`/site/${siteConfig.slug}${p.slug === '/' ? '' : p.slug}`} className="hover:text-brand-blue transition-colors" style={getTextColorStyle('navbar')}>{p.name}</a>
                  ))
                ) : (
                  Array.isArray(navbar.items) && navbar.items.map((item: any) => (
                    <a key={item.id} href={`#${item.id}`} className="hover:text-brand-blue transition-colors" style={getTextColorStyle('navbar')}>{item.label}</a>
                  ))
                )}
              </div>
            )}
            {contact.whatsapp && (
              <a 
                href={`https://wa.me/${contact.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-sm ${isMobile ? 'px-3 py-1.5 text-[9px] shrink-0' : 'px-5 py-2.5 text-xs'}`}
                style={{ backgroundColor: navStyles.color || primaryColor }}
              >
                Hubungi Kami
              </a>
            )}
          </nav>
        );
      })()}

      {/* Dynamic Sections */}
      {layoutSections.map((sec: any) => {
        const secType = sec.type || sec.id;
        const secContent = sec.content || c[secType] || {};
        
        const hero = secType === 'hero' ? secContent : {};
        const about = secType === 'about' ? secContent : {};
        const products = secType === 'products' ? (Array.isArray(secContent) ? secContent : []) : [];
        const advantages = secType === 'advantages' ? (Array.isArray(secContent) ? secContent : []) : [];
        const gallery = secType === 'gallery' ? (Array.isArray(secContent) ? secContent : []) : [];
        const testimonials = secType === 'testimonials' ? (Array.isArray(secContent) ? secContent : []) : [];
        const cta = secType === 'cta' ? secContent : {};
        const marketplaces = secType === 'marketplaces' ? secContent : {};

        switch (secType) {
          case 'hero':
            return (
              <section 
                id="home" 
                key="hero" 
                className={`max-w-6xl mx-auto grid gap-12 items-center ${isMobile ? 'py-8 px-4 grid-cols-1 gap-6' : 'py-16 md:py-24 px-6 md:px-12 grid-cols-1 md:grid-cols-2'}`}
                style={getSectionStyle(sec.id)}
              >
                <div className="space-y-6 text-left">
                  <div 
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${isDarkTheme ? 'bg-purple-950/20 border-purple-800/30 text-purple-300' : 'bg-blue-50 border-blue-200/50 text-blue-700'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    <Sparkles className="w-4 h-4 animate-pulse" /> Layanan Profesional & Terpercaya
                  </div>
                  <h1 
                    className={`font-black tracking-tight leading-tight uppercase ${isMobile ? 'text-xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    {hero.headline}
                  </h1>
                  <p 
                    className={`font-medium leading-relaxed ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    {hero.subheadline}
                  </p>
                  {contact.whatsapp && (
                    <a 
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 text-white font-black uppercase tracking-widest transition-all shadow-lg hover:scale-105 ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                      style={{ backgroundColor: sec.styles?.textColor || primaryColor }}
                    >
                      {hero.cta || 'Mulai Sekarang'} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10" style={sec.styles?.textColor ? { backgroundColor: `${sec.styles.textColor}15` } : undefined}></div>
                  {hero.banner ? (
                    <img src={hero.banner} alt="Banner" className="w-full aspect-[4/3] object-cover rounded-[32px] border-4 border-slate-200/20 shadow-xl" />
                  ) : (
                    <div className={`w-full aspect-[4/3] rounded-[32px] flex items-center justify-center font-bold uppercase tracking-widest border ${isDarkTheme ? 'bg-slate-900 border-slate-800 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-400'}`} style={getTextColorStyle(sec.id)}>[ Banner Utama ]</div>
                  )}
                </div>
              </section>
            );

          case 'about':
            return (
              <section 
                id="about" 
                key="about" 
                className={`border-y ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`} 
                style={getSectionStyle(sec.id, primaryColor, '#ffffff')}
              >
                <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                  <div className="space-y-3">
                    <h2 
                      className={`font-black uppercase tracking-tight text-white ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      Mengenal Profil Kami
                    </h2>
                    <div className="w-16 h-1.5 mx-auto rounded-full bg-white/30" />
                  </div>
                  <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                    <div className="p-6 rounded-2xl border border-white/20 shadow-sm space-y-3 bg-white/10 backdrop-blur-sm">
                      <h4 className="font-black uppercase text-xs tracking-wider text-white">Tentang Kami</h4>
                      <p 
                        className="text-xs font-medium leading-relaxed text-white/80"
                        style={getTextColorStyle(sec.id)}
                      >
                        {(typeof about.description === 'string' && about.description) || 'Penyedia solusi profesional dan terintegrasi.'}
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/20 shadow-sm space-y-3 bg-white/10 backdrop-blur-sm">
                      <h4 className="font-black uppercase text-xs tracking-wider text-white">Profil Bisnis</h4>
                      <p 
                        className="text-xs font-medium leading-relaxed text-white/80"
                        style={getTextColorStyle(sec.id)}
                      >
                        {about.profile || 'Kami berdedikasi memberikan hasil kerja bermutu tinggi.'}
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/20 shadow-sm space-y-3 bg-white/10 backdrop-blur-sm">
                      <h4 className="font-black uppercase text-xs tracking-wider text-white">Kisah Perjalanan</h4>
                      <p 
                        className="text-xs font-medium leading-relaxed text-white/80"
                        style={getTextColorStyle(sec.id)}
                      >
                        {about.story || 'Mengawali langkah kecil demi mendigitalisasi jutaan bisnis lokal.'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'products':
            return (
              <section 
                id="products" 
                key="products" 
                className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-16'}`}
                style={getSectionStyle(sec.id)}
              >
                <div className="text-center space-y-3">
                  <h2 
                    className={`font-black uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    Layanan & Produk Unggulan
                  </h2>
                  <p 
                    className={`max-w-lg mx-auto font-bold uppercase tracking-widest ${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    Dukungan penuh untuk efisiensi ekosistem operasional Anda
                  </p>
                  <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: sec.styles?.textColor || primaryColor }} />
                </div>
                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {products.map((prod, i) => (
                    <div 
                      key={i} 
                      className={`rounded-3xl overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${cardColor}`}
                      style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}25` : undefined }}
                    >
                      <div className="aspect-[4/3] overflow-hidden relative bg-slate-800/40">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold uppercase text-[10px] tracking-widest" style={getTextColorStyle(sec.id)}>[ Image {i+1} ]</div>
                        )}
                        <div className="absolute bottom-4 right-4 text-white font-black px-3 py-1 rounded-xl text-xs" style={{ backgroundColor: sec.styles?.textColor || primaryColor }}>
                          {prod.price}
                        </div>
                      </div>
                      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 
                            className="text-sm font-black uppercase tracking-tight"
                            style={getTextColorStyle(sec.id)}
                          >
                            {prod.name}
                          </h4>
                          <p 
                            className="text-xs font-medium leading-relaxed line-clamp-3" 
                            style={sec.styles?.textColor ? { color: sec.styles.textColor } : undefined}
                          >
                            {typeof prod.description === 'string' ? prod.description : ''}
                          </p>
                        </div>
                        {contact.whatsapp && (
                          <a 
                            href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(prod.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 hover:text-white font-black rounded-xl text-[10px] uppercase tracking-wider text-center transition-all mt-4 inline-block border border-slate-200 dark:border-slate-800"
                            style={{ 
                              backgroundColor: sec.styles?.textColor ? `${sec.styles.textColor}10` : (isDarkTheme ? '#1e293b' : '#f8fafc'),
                              color: sec.styles?.textColor || primaryColor,
                              borderColor: sec.styles?.textColor ? `${sec.styles.textColor}30` : undefined
                            }}
                          >
                            Konsultasi Sekarang
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'advantages':
            return (
              <section 
                key="advantages" 
                className={`${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`} 
                style={getSectionStyle(sec.id, primaryColor, '#ffffff')}
              >
                <div className={`max-w-4xl mx-auto grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                  {advantages.map((adv, i) => (
                    <div key={i} className="text-center space-y-4">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-white/30 backdrop-blur-sm">
                        {renderIcon(adv.icon)}
                      </div>
                      <h4 
                        className="font-black text-base uppercase tracking-tight text-white"
                        style={getTextColorStyle(sec.id)}
                      >
                        {adv.title}
                      </h4>
                      <p 
                        className="text-xs text-white/90 leading-relaxed"
                        style={getTextColorStyle(sec.id)}
                      >
                        {typeof adv.description === 'string' ? adv.description : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'gallery':
            return (
              <section 
                key="gallery" 
                className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-12'}`}
                style={getSectionStyle(sec.id)}
              >
                <div className="text-center space-y-3">
                  <h2 
                    className={`font-black uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    Dokumentasi Portofolio
                  </h2>
                  <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: sec.styles?.textColor || primaryColor }} />
                </div>
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {gallery.map((img, i) => (
                    <div key={i} className={`aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border bg-slate-800/10 ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
                      {img ? (
                        <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold uppercase text-[10px] tracking-widest">[ Image {i+1} ]</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'testimonials':
            return (
              <section 
                id="testimonials" 
                key="testimonials" 
                className={`border-y ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`} 
                style={getSectionStyle(sec.id, primaryColor, '#ffffff')}
              >
                <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                  <div className="space-y-3">
                    <h2 
                      className={`font-black uppercase tracking-tight text-white ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}
                      style={getTextColorStyle(sec.id)}
                    >
                      Apa Kata Klien Kami?
                    </h2>
                    <div className="w-16 h-1.5 mx-auto rounded-full bg-white/30" />
                  </div>
                  <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {testimonials.map((t, i) => (
                      <div 
                        key={i} 
                        className="p-8 rounded-3xl border border-white/20 shadow-sm space-y-4 bg-white/10 backdrop-blur-sm"
                        style={{ borderColor: sec.styles?.textColor ? `${sec.styles.textColor}20` : undefined }}
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-4 h-4 text-yellow-400 fill-current" />)}
                        </div>
                        <p 
                          className="text-xs text-white/90 italic font-medium leading-relaxed"
                          style={getTextColorStyle(sec.id)}
                        >
                          "{typeof t.content === 'string' ? t.content : ''}"
                        </p>
                        <div className="flex items-center gap-3 border-t border-white/20 pt-4">
                          <img src={t.photo || `https://i.pravatar.cc/100?img=${i}`} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
                          <h5 
                            className="text-xs font-black uppercase tracking-wider text-white"
                            style={getTextColorStyle(sec.id)}
                          >
                            {t.name}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'cta':
            return (
              <section 
                key="cta" 
                className={`max-w-5xl mx-auto text-center relative overflow-hidden border my-12 ${cardColor} ${isMobile ? 'py-8 px-4 rounded-[24px] space-y-6 my-6' : 'py-16 md:py-24 px-6 md:px-12 rounded-[40px] space-y-8'}`}
                style={getSectionStyle(sec.id)}
              >
                <div className="space-y-3">
                  <h2 
                    className={`font-black uppercase tracking-tight ${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'}`}
                    style={getTextColorStyle(sec.id)}
                  >
                    {cta.title}
                  </h2>
                  <p 
                    className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium"
                    style={getTextColorStyle(sec.id)}
                  >
                    {cta.description}
                  </p>
                </div>
                {contact.whatsapp && (
                  <a 
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                    style={{ backgroundColor: sec.styles?.textColor || primaryColor }}
                  >
                    {cta.buttonText || 'Hubungi Kami'} <MessageCircle className="w-4.5 h-4.5" />
                  </a>
                )}
              </section>
            );

          case 'marketplaces':
            return (
              <section 
                key="marketplaces" 
                className={`border-t text-center ${isMobile ? 'py-8 px-4' : 'py-12 px-6'} ${isDarkTheme ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}
                style={getSectionStyle(sec.id)}
              >
                <div className="max-w-4xl mx-auto space-y-4">
                  <p 
                    className="text-[10px] font-black text-slate-505 uppercase tracking-widest"
                    style={getTextColorStyle(sec.id)}
                  >
                    Tautan Terkait Marketplace
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {marketplaces.shopee && <a href={marketplaces.shopee} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: sec.styles?.textColor || primaryColor }}>Shopee</a>}
                    {marketplaces.tokopedia && <a href={marketplaces.tokopedia} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: sec.styles?.textColor || primaryColor }}>Tokopedia</a>}
                    {marketplaces.lazada && <a href={marketplaces.lazada} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: sec.styles?.textColor || primaryColor }}>Lazada</a>}
                    {marketplaces.externalWebsite && <a href={marketplaces.externalWebsite} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: sec.styles?.textColor || primaryColor }}>Website Resmi</a>}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}

      {/* Footer */}
      {isFooterActive && (
        <footer id="contact" className={`border-t ${isMobile ? 'py-10 px-4' : 'py-16 px-6 md:px-12'} ${isDarkTheme ? 'bg-[#020617] border-slate-900 text-slate-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
          <div className={`max-w-6xl mx-auto grid gap-12 mb-12 ${isMobile ? 'grid-cols-1 gap-8 mb-8' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {logo ? <img src={logo} alt="Logo" className="w-14 h-14 object-contain" /> : null}
                <h3 className="text-md font-black uppercase tracking-wider text-white">{footer.businessName || navbar.brand}</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">Penyediaan solusi digital micro-landing page modern.</p>
            </div>
            
            {isContactActive && (
              <div className="space-y-4 text-left">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Kontak Kami</h4>
                <div className="space-y-2 text-xs text-slate-400">
                  {contact.whatsapp && <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500" /> {contact.whatsapp}</p>}
                  {contact.email && <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500" /> {contact.email}</p>}
                  {contact.address && <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" /> {contact.address}</p>}
                  {contact.operatingHours && <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" /> {contact.operatingHours}</p>}
                </div>
              </div>
            )}

            {isSocialActive && (
              <div className="space-y-4 text-left">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Media Sosial</h4>
                <div className="flex gap-4 text-slate-400">
                  {socialMedia.instagram && <a href={socialMedia.instagram} target="_blank" rel="noreferrer" className="hover:text-white"><Instagram className="w-5 h-5" /></a>}
                  {socialMedia.facebook && <a href={socialMedia.facebook} target="_blank" rel="noreferrer" className="hover:text-white"><Facebook className="w-5 h-5" /></a>}
                  {socialMedia.youtube && <a href={socialMedia.youtube} target="_blank" rel="noreferrer" className="hover:text-white"><Youtube className="w-5 h-5" /></a>}
                </div>
              </div>
            )}
          </div>
          <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {footer.copyright || `© 2026 ${footer.businessName || navbar.brand}. All rights reserved.`}
          </div>
        </footer>
      )}
    </div>
  );
}
