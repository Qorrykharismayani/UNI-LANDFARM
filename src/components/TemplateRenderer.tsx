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
}

export default function TemplateRenderer({ templateId, contentJson, isMobile = false }: TemplateRendererProps) {
  const tid = String(templateId);
  // Normalize content JSON to avoid crashes
  const c = contentJson || {};
  const sectionsList = Array.isArray(c.sections) ? c.sections : [];

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
        {isNavbarActive && (
          <nav className={`bg-white/80 backdrop-blur-md border-b border-amber-100/50 flex justify-between items-center sticky top-0 z-50 shadow-sm ${isMobile ? 'py-2 px-3 gap-2' : 'py-4 px-6 md:px-12'}`}>
            <div className={`flex items-center ${isMobile ? 'gap-1.5 max-w-[65%]' : 'gap-3'}`}>
              {logo ? (
                <img src={logo} alt="Logo" className={`${isMobile ? 'w-9 h-9' : 'w-16 h-16'} object-contain`} />
              ) : (
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white font-black">L</div>
              )}
              <span className={`tracking-tight uppercase font-black text-amber-950 ${isMobile ? 'text-[10px] leading-tight line-clamp-2' : 'text-lg'}`}>{navbar.brand || 'UMKM Nusantara'}</span>
            </div>
            {!isMobile && (
              <div className="hidden md:flex gap-8 text-xs font-bold text-amber-900/70 uppercase tracking-widest">
                {Array.isArray(navbar.items) && navbar.items.map((item: any) => (
                  <a key={item.id} href={`#${item.id}`} className="hover:text-amber-600 transition-colors">{item.label}</a>
                ))}
              </div>
            )}
            {contact.whatsapp && (
              <a 
                href={`https://wa.me/${contact.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-sm ${isMobile ? 'px-3 py-1.5 text-[9px] shrink-0' : 'px-5 py-2.5 text-xs'}`}
<<<<<<< HEAD
<<<<<<< HEAD
                style={{ backgroundColor: '#d97706' }}
=======
                style={{ backgroundColor: primaryColor }}
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                style={{ backgroundColor: '#d97706' }}
>>>>>>> orry
              >
                Order WA
              </a>
            )}
          </nav>
        )}

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
                <section id="home" key="hero" className={`max-w-6xl mx-auto grid gap-12 items-center ${isMobile ? 'py-8 px-4 grid-cols-1 gap-6' : 'py-16 md:py-24 px-6 md:px-12 grid-cols-1 md:grid-cols-2'}`}>
                  <div className="space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200/50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" /> 100% Produk Lokal Asli
                    </div>
                    <h1 className={`font-black text-amber-950 tracking-tight leading-tight uppercase ${isMobile ? 'text-xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}>
                      {hero.headline}
                    </h1>
                    <p className={`text-amber-900/70 font-medium leading-relaxed ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>
                      {hero.subheadline}
                    </p>
                    {contact.whatsapp && (
                      <a 
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-3 bg-amber-600 text-white font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg hover:scale-105 ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                        style={{ backgroundColor: '#d97706' }}
                      >
                        {hero.cta || 'Beli Sekarang'} <ShoppingCart className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full -z-10"></div>
                    {hero.banner ? (
                      <img src={hero.banner} alt="Banner" className="w-full aspect-[4/3] object-cover rounded-[32px] border-4 border-white shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500" />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-amber-100 rounded-[32px] flex items-center justify-center text-amber-400 font-bold uppercase tracking-widest border border-amber-200">[ Banner Produk ]</div>
                    )}
                  </div>
                </section>
              );

            case 'about':
              return (
                <section id="about" key="about" className={`bg-amber-50/50 border-y border-amber-100/40 ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`}>
                  <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                    <div className="space-y-3">
                      <h2 className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Kisah Di Balik Produk Kami</h2>
<<<<<<< HEAD
<<<<<<< HEAD
                      <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
=======
                      <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                      <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
>>>>>>> orry
                    </div>
                    <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                      <div className="bg-white p-6 rounded-2xl border border-amber-100/50 shadow-sm space-y-3">
                        <h4 className="font-black text-amber-950 uppercase text-xs tracking-wider">Tentang Kami</h4>
                        <p className="text-xs text-amber-900/70 font-medium leading-relaxed">{about.description || 'Penyedia produk kerajinan dan kuliner lokal unggulan.'}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-amber-100/50 shadow-sm space-y-3">
                        <h4 className="font-black text-amber-950 uppercase text-xs tracking-wider">Profil Usaha</h4>
                        <p className="text-xs text-amber-900/70 font-medium leading-relaxed">{about.profile || 'Kami didukung oleh tenaga terampil lokal berdedikasi tinggi.'}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-amber-100/50 shadow-sm space-y-3">
                        <h4 className="font-black text-amber-950 uppercase text-xs tracking-wider">Visi & Nilai</h4>
                        <p className="text-xs text-amber-900/70 font-medium leading-relaxed">{about.story || 'Pemberdayaan ekonomi kreatif lokal yang ramah lingkungan.'}</p>
                      </div>
                    </div>
                  </div>
                </section>
              );

            case 'products':
              return (
                <section id="products" key="products" className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-16'}`}>
                  <div className="text-center space-y-3">
                    <h2 className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Produk Pilihan Terbaik</h2>
                    <p className={`text-amber-900/60 max-w-lg mx-auto font-bold uppercase tracking-widest ${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'}`}>Segar, berkualitas, diproduksi langsung dari petani & pengrajin lokal</p>
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
=======
                    <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                    <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
>>>>>>> orry
                  </div>
                  <div className={`grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                    {products.map((prod, i) => (
                      <div key={i} className="bg-white rounded-3xl overflow-hidden border border-amber-100/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                        <div className="aspect-[4/3] overflow-hidden relative bg-amber-50">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold uppercase text-[10px] tracking-widest">[ Image {i+1} ]</div>
                          )}
                          <div className="absolute bottom-4 right-4 bg-amber-600 text-white font-black px-3 py-1 rounded-xl text-xs" style={{ backgroundColor: '#d97706' }}>
                            {prod.price}
                          </div>
                        </div>
                        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-black text-amber-950 uppercase tracking-tight">{prod.name}</h4>
                            <p className="text-xs text-amber-900/70 font-medium leading-relaxed line-clamp-3">{prod.description}</p>
                          </div>
                          {contact.whatsapp && (
                            <a 
                              href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(prod.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 bg-amber-100 hover:bg-amber-600 hover:text-white text-amber-950 font-black rounded-xl text-[10px] uppercase tracking-wider text-center transition-all mt-4 inline-block"
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
                <section key="advantages" className={`bg-amber-900 text-white ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`} style={{ backgroundColor: '#451a03' }}>
                  <div className={`max-w-4xl mx-auto grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                    {advantages.map((adv, i) => (
                      <div key={i} className="text-center space-y-4">
                        <div className="w-14 h-14 bg-amber-800/50 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-amber-700/50">
                          {renderIcon(adv.icon)}
                        </div>
                        <h4 className="font-black text-base uppercase tracking-tight">{adv.title}</h4>
                        <p className="text-xs text-amber-100/75 leading-relaxed">{adv.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'gallery':
              return (
                <section key="gallery" className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-12'}`}>
                  <div className="text-center space-y-3">
                    <h2 className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Galeri Kegiatan Kami</h2>
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
=======
                    <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                    <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
>>>>>>> orry
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
                <section id="testimonials" key="testimonials" className={`bg-amber-50/50 border-y border-amber-100/40 ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'}`}>
                  <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                    <div className="space-y-3">
                      <h2 className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Ulasan Pelanggan</h2>
<<<<<<< HEAD
<<<<<<< HEAD
                      <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
=======
                      <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
>>>>>>> 9995911289d2ae90948c14bfe01c98aa5445ce6c
=======
                      <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" style={{ backgroundColor: '#d97706' }} />
>>>>>>> orry
                    </div>
                    <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-amber-100/50 shadow-sm space-y-4">
                          <div className="flex gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-4 h-4 fill-current" />)}
                          </div>
                          <p className="text-xs text-amber-900/80 italic font-medium leading-relaxed">"{t.content}"</p>
                          <div className="flex items-center gap-3 border-t border-amber-50 pt-4">
                            <img src={t.photo || `https://i.pravatar.cc/100?img=${i}`} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider">{t.name}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'cta':
              return (
                <section key="cta" className={`max-w-5xl mx-auto text-center relative overflow-hidden bg-amber-50 border border-amber-200/50 my-12 ${isMobile ? 'py-8 px-4 rounded-[24px] space-y-6 my-6' : 'py-16 md:py-24 px-6 md:px-12 rounded-[40px] space-y-8'}`}>
                  <div className="space-y-3">
                    <h2 className={`font-black text-amber-950 uppercase tracking-tight ${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'}`}>{cta.title}</h2>
                    <p className={`text-amber-900/70 max-w-xl mx-auto font-medium ${isMobile ? 'text-xs' : 'text-xs md:text-sm'}`}>{cta.description}</p>
                  </div>
                  {contact.whatsapp && (
                    <a 
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 bg-amber-600 text-white font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                      style={{ backgroundColor: '#d97706' }}
                    >
                      {cta.buttonText || 'Hubungi Kami'} <MessageCircle className="w-4.5 h-4.5" />
                    </a>
                  )}
                </section>
              );

            case 'marketplaces':
              return (
                <section key="marketplaces" className={`border-t border-amber-100 bg-white text-center ${isMobile ? 'py-8 px-4' : 'py-12 px-6'}`}>
                  <div className="max-w-4xl mx-auto space-y-4">
                    <p className="text-[10px] font-black text-amber-900/60 uppercase tracking-widest">Tersedia Juga di Marketplace Resmi</p>
                    <div className="flex flex-wrap justify-center gap-6">
                      {marketplaces.shopee && <a href={marketplaces.shopee} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600">Shopee</a>}
                      {marketplaces.tokopedia && <a href={marketplaces.tokopedia} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600">Tokopedia</a>}
                      {marketplaces.lazada && <a href={marketplaces.lazada} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600">Lazada</a>}
                      {marketplaces.externalWebsite && <a href={marketplaces.externalWebsite} target="_blank" rel="noreferrer" className="text-xs font-black uppercase text-amber-800 hover:text-amber-600">Website Utama</a>}
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
      {isNavbarActive && (
        <nav className={`flex justify-between items-center sticky top-0 z-50 shadow-sm backdrop-blur-md border-b ${isDarkTheme ? 'bg-[#0f172a]/95 border-slate-800/80' : 'bg-white/95 border-slate-100/80'} ${isMobile ? 'py-2 px-3 gap-2' : 'py-4 px-6 md:px-12'}`}>
          <div className={`flex items-center ${isMobile ? 'gap-1.5 max-w-[65%]' : 'gap-3'}`}>
            {logo ? (
              <img src={logo} alt="Logo" className={`${isMobile ? 'w-9 h-9' : 'w-16 h-16'} object-contain`} />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black" style={{ backgroundColor: primaryColor }}>L</div>
            )}
            <span className={`tracking-tight uppercase font-black ${isDarkTheme ? 'text-white' : 'text-slate-900'} ${isMobile ? 'text-[10px] leading-tight line-clamp-2' : 'text-lg'}`}>{navbar.brand || footer.businessName || 'Situs Bisnis'}</span>
          </div>
          {!isMobile && (
            <div className={`hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
              {Array.isArray(navbar.items) && navbar.items.map((item: any) => (
                <a key={item.id} href={`#${item.id}`} className="hover:text-brand-blue transition-colors" style={{ '--tw-hover-text': primaryColor } as any}>{item.label}</a>
              ))}
            </div>
          )}
          {contact.whatsapp && (
            <a 
              href={`https://wa.me/${contact.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-sm ${isMobile ? 'px-3 py-1.5 text-[9px] shrink-0' : 'px-5 py-2.5 text-xs'}`}
              style={{ backgroundColor: primaryColor }}
            >
              Hubungi Kami
            </a>
          )}
        </nav>
      )}

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
              <section id="home" key="hero" className={`max-w-6xl mx-auto grid gap-12 items-center ${isMobile ? 'py-8 px-4 grid-cols-1 gap-6' : 'py-16 md:py-24 px-6 md:px-12 grid-cols-1 md:grid-cols-2'}`}>
                <div className="space-y-6 text-left">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${isDarkTheme ? 'bg-purple-950/20 border-purple-800/30 text-purple-300' : 'bg-blue-50 border-blue-200/50 text-blue-700'}`}>
                    <Sparkles className="w-4 h-4 animate-pulse" /> Layanan Profesional & Terpercaya
                  </div>
                  <h1 className={`font-black tracking-tight leading-tight uppercase ${isMobile ? 'text-xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}>
                    {hero.headline}
                  </h1>
                  <p className={`font-medium leading-relaxed ${isMobile ? 'text-xs' : 'text-sm md:text-base'} ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
                    {hero.subheadline}
                  </p>
                  {contact.whatsapp && (
                    <a 
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 text-white font-black uppercase tracking-widest transition-all shadow-lg hover:scale-105 ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                      style={{ backgroundColor: primaryColor }}
                    >
                      {hero.cta || 'Mulai Sekarang'} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10"></div>
                  {hero.banner ? (
                    <img src={hero.banner} alt="Banner" className="w-full aspect-[4/3] object-cover rounded-[32px] border-4 border-slate-200/20 shadow-xl" />
                  ) : (
                    <div className={`w-full aspect-[4/3] rounded-[32px] flex items-center justify-center font-bold uppercase tracking-widest border ${isDarkTheme ? 'bg-slate-900 border-slate-800 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>[ Banner Utama ]</div>
                  )}
                </div>
              </section>
            );

          case 'about':
            return (
              <section id="about" key="about" className={`border-y ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'} ${isDarkTheme ? 'bg-[#111827]/40 border-slate-900' : 'bg-slate-100/50 border-slate-200/50'}`}>
                <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                  <div className="space-y-3">
                    <h2 className={`font-black uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Mengenal Profil Kami</h2>
                    <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
                  </div>
                  <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                    <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${cardColor}`}>
                      <h4 className="font-black uppercase text-xs tracking-wider" style={{ color: primaryColor }}>Tentang Kami</h4>
                      <p className={`text-xs font-medium leading-relaxed ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>{about.description || 'Penyedia solusi profesional dan terintegrasi.'}</p>
                    </div>
                    <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${cardColor}`}>
                      <h4 className="font-black uppercase text-xs tracking-wider" style={{ color: primaryColor }}>Profil Bisnis</h4>
                      <p className={`text-xs font-medium leading-relaxed ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>{about.profile || 'Kami berdedikasi memberikan hasil kerja bermutu tinggi.'}</p>
                    </div>
                    <div className={`p-6 rounded-2xl border shadow-sm space-y-3 ${cardColor}`}>
                      <h4 className="font-black uppercase text-xs tracking-wider" style={{ color: primaryColor }}>Kisah Perjalanan</h4>
                      <p className={`text-xs font-medium leading-relaxed ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>{about.story || 'Mengawali langkah kecil demi mendigitalisasi jutaan bisnis lokal.'}</p>
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'products':
            return (
              <section id="products" key="products" className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-16'}`}>
                <div className="text-center space-y-3">
                  <h2 className={`font-black uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Layanan & Produk Unggulan</h2>
                  <p className={`max-w-lg mx-auto font-bold uppercase tracking-widest ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'} ${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'}`}>Dukungan penuh untuk efisiensi ekosistem operasional Anda</p>
                  <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
                </div>
                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {products.map((prod, i) => (
                    <div key={i} className={`rounded-3xl overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${cardColor}`}>
                      <div className="aspect-[4/3] overflow-hidden relative bg-slate-800/40">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold uppercase text-[10px] tracking-widest">[ Image {i+1} ]</div>
                        )}
                        <div className="absolute bottom-4 right-4 text-white font-black px-3 py-1 rounded-xl text-xs" style={{ backgroundColor: primaryColor }}>
                          {prod.price}
                        </div>
                      </div>
                      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight">{prod.name}</h4>
                          <p className="text-xs font-medium leading-relaxed line-clamp-3" style={{ color: isDarkTheme ? '#94a3b8' : '#64748b' }}>{prod.description}</p>
                        </div>
                        {contact.whatsapp && (
                          <a 
                            href={`https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(prod.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 hover:text-white font-black rounded-xl text-[10px] uppercase tracking-wider text-center transition-all mt-4 inline-block border border-slate-200 dark:border-slate-800"
                            style={{ backgroundColor: isDarkTheme ? '#1e293b' : '#f8fafc' }}
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
              <section key="advantages" className={`${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'} ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-slate-900 text-white'}`}>
                <div className={`max-w-4xl mx-auto grid gap-8 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3'}`}>
                  {advantages.map((adv, i) => (
                    <div key={i} className="text-center space-y-4">
                      <div className="w-14 h-14 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-slate-700/50">
                        {renderIcon(adv.icon)}
                      </div>
                      <h4 className="font-black text-base uppercase tracking-tight">{adv.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{adv.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'gallery':
            return (
              <section key="gallery" className={`max-w-6xl mx-auto ${isMobile ? 'py-8 px-4 space-y-6' : 'py-20 px-6 md:px-12 space-y-12'}`}>
                <div className="text-center space-y-3">
                  <h2 className={`font-black uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Dokumentasi Portofolio</h2>
                  <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
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
              <section id="testimonials" key="testimonials" className={`border-y ${isMobile ? 'py-8 px-4' : 'py-20 px-6 md:px-12'} ${isDarkTheme ? 'bg-[#111827]/40 border-slate-900' : 'bg-slate-100/50 border-slate-200/50'}`}>
                <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'space-y-6' : 'space-y-12'}`}>
                  <div className="space-y-3">
                    <h2 className={`font-black uppercase tracking-tight ${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'}`}>Apa Kata Klien Kami?</h2>
                    <div className="w-16 h-1.5 mx-auto rounded-full" style={{ backgroundColor: primaryColor }} />
                  </div>
                  <div className={`grid gap-8 text-left ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {testimonials.map((t, i) => (
                      <div key={i} className={`p-8 rounded-3xl border shadow-sm space-y-4 ${cardColor}`}>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-4 h-4 text-yellow-500 fill-current" />)}
                        </div>
                        <p className="text-xs text-slate-500 italic font-medium leading-relaxed">"{t.content}"</p>
                        <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                          <img src={t.photo || `https://i.pravatar.cc/100?img=${i}`} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                          <h5 className="text-xs font-black uppercase tracking-wider">{t.name}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'cta':
            return (
              <section key="cta" className={`max-w-5xl mx-auto text-center relative overflow-hidden border my-12 ${cardColor} ${isMobile ? 'py-8 px-4 rounded-[24px] space-y-6 my-6' : 'py-16 md:py-24 px-6 md:px-12 rounded-[40px] space-y-8'}`}>
                <div className="space-y-3">
                  <h2 className={`font-black uppercase tracking-tight ${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'}`}>{cta.title}</h2>
                  <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">{cta.description}</p>
                </div>
                {contact.whatsapp && (
                  <a 
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg ${isMobile ? 'px-5 py-3 text-xs rounded-xl' : 'px-8 py-4 text-sm rounded-2xl'}`}
                    style={{ backgroundColor: primaryColor }}
                  >
                    {cta.buttonText || 'Hubungi Kami'} <MessageCircle className="w-4.5 h-4.5" />
                  </a>
                )}
              </section>
            );

          case 'marketplaces':
            return (
              <section key="marketplaces" className={`border-t text-center ${isMobile ? 'py-8 px-4' : 'py-12 px-6'} ${isDarkTheme ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="max-w-4xl mx-auto space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tautan Terkait Marketplace</p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {marketplaces.shopee && <a href={marketplaces.shopee} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: primaryColor }}>Shopee</a>}
                    {marketplaces.tokopedia && <a href={marketplaces.tokopedia} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: primaryColor }}>Tokopedia</a>}
                    {marketplaces.lazada && <a href={marketplaces.lazada} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: primaryColor }}>Lazada</a>}
                    {marketplaces.externalWebsite && <a href={marketplaces.externalWebsite} target="_blank" rel="noreferrer" className="text-xs font-black uppercase hover:text-brand-blue" style={{ color: primaryColor }}>Website Resmi</a>}
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
