const fs = require('fs');
const path = require('path');

const srcAppPath = path.join(__dirname, 'App_original.tsx');
const srcCssPath = path.join(__dirname, 'index_original.css');

const destAppPath = path.join(__dirname, '..', 'src', 'App.tsx');
const destCssPath = path.join(__dirname, '..', 'src', 'index.css');

console.log('Starting automated restoration and customization process...');

try {
  // 1. Restore pristine templates
  fs.copyFileSync(srcAppPath, destAppPath);
  fs.copyFileSync(srcCssPath, destCssPath);
  console.log('Restored original files into src/');

  // 2. Read App.tsx for modifications
  let appContent = fs.readFileSync(destAppPath, 'utf8');

  // Normalize CRLF to LF
  appContent = appContent.replace(/\r\n/g, '\n');

  const clean = (str) => str.replace(/\r\n/g, '\n');

  // A. Modify preview device container max-width to max-w-[840px]
  const targetPreviewContainer = clean(`        if (cmsNavMode === 'preview' && generatedDraft) {
          return (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">`);

  const replacementPreviewContainer = clean(`        if (cmsNavMode === 'preview' && generatedDraft) {
          return (
            <div className="max-w-[840px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-12">`);

  appContent = appContent.replace(targetPreviewContainer, replacementPreviewContainer);

  // B. Modify browser preview mockup border & styling
  const targetMockupBorder = clean(`              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">`);
  const replacementMockupBorder = clean(`              <div className="bg-white dark:bg-slate-900 rounded-[28px] border-[8px] border-slate-950 dark:border-slate-800 shadow-2xl overflow-hidden">`);

  appContent = appContent.replace(targetMockupBorder, replacementMockupBorder);

  // C. Modify browser preview mockup height
  const targetMockupHeight = clean(`                <div className="h-[70vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 custom-scrollbar">`);
  const replacementMockupHeight = clean(`                <div className="h-[52vh] overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 custom-scrollbar">`);

  appContent = appContent.replace(targetMockupHeight, replacementMockupHeight);

  // D. Append Footer inside DashboardView's scrollable container
  const targetDashboardMain = clean(`        {/* SECTION 3: MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50/10 dark:bg-slate-950/20 transition-colors duration-300 relative scroll-smooth custom-scrollbar">
          {renderSubView()}
        </main>`);

  const replacementDashboardMain = clean(`        {/* SECTION 3: MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-slate-50/10 dark:bg-slate-950/20 transition-colors duration-300 relative scroll-smooth custom-scrollbar flex flex-col justify-between">
          <div className="p-4 lg:p-8 flex-1">
            {renderSubView()}
          </div>
          <Footer setView={setView} />
        </main>`);

  appContent = appContent.replace(targetDashboardMain, replacementDashboardMain);

  // E. Modify CMS sub-tabs to show ONLY 'Daftar Artikel'
  const targetCmsTabs = clean(`              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {[
                  { id: 'manual', label: 'Daftar Artikel', icon: <Layers className="w-3.5 h-3.5" /> },
                  { id: 'ai_scheduler', label: 'Tulis dengan AI & Jadwal', icon: <Bot className="w-3.5 h-3.5" /> },
                  { id: 'preview', label: 'Pratinjau Situs', icon: <Eye className="w-3.5 h-3.5" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCmsSubTab(tab.id)}
                    className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all \${cmsSubTab === tab.id ? 'bg-white dark:bg-slate-900 text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>`);

  const replacementCmsTabs = clean(`              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white dark:bg-slate-900 text-brand-blue shadow-sm"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Daftar Artikel
                </button>
              </div>`);

  appContent = appContent.replace(targetCmsTabs, replacementCmsTabs);

  // F. Delete 'ai_scheduler' and 'preview' sub-view blocks in CMS
  // We locate from {cmsSubTab === 'ai_scheduler' && ( up to {cmsSubTab === 'preview' && (...) }) and delete it all!
  const blockStartIdx = appContent.indexOf("                {cmsSubTab === 'ai_scheduler' && (");
  const blockEndString = clean(`                {/* Panel Bawah: Tips Sederhana & Ramah Pengguna */}
                <div className="bg-slate-900 dark:bg-slate-950 rounded-[24px] p-5 text-white relative overflow-hidden shadow-premium border border-slate-800/50">
                  <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-brand-blue/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                       <Sparkles className="w-5 h-5 text-brand-blue animate-pulse" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <h4 className="text-xs font-black tracking-tight uppercase mb-1">💡 Tips Cepat Kelola Situs</h4>
                       <p className="text-[11px] text-slate-400 font-medium mb-0 leading-relaxed">
                         Gunakan fitur <strong className="text-white">Tulis dengan AI</strong> untuk membuat draf artikel berkualitas secara instan, lalu periksa pratinjaunya di tab <strong className="text-white">Pratinjau Situs</strong> sebelum dipublikasikan!
                       </p>
                    </div>
                  </div>
                </div>`);

  const blockEndIdx = appContent.indexOf(blockEndString);

  if (blockStartIdx !== -1 && blockEndIdx !== -1) {
    const replacementTips = clean(`                {/* Panel Bawah: Tips Sederhana & Ramah Pengguna */}
                <div className="bg-slate-900 dark:bg-slate-950 rounded-[24px] p-5 text-white relative overflow-hidden shadow-premium border border-slate-800/50">
                  <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-brand-blue/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                       <Sparkles className="w-5 h-5 text-brand-blue animate-pulse" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <h4 className="text-xs font-black tracking-tight uppercase mb-1">💡 Tips Cepat Kelola Situs</h4>
                       <p className="text-[11px] text-slate-400 font-medium mb-0 leading-relaxed">
                         Kelola postingan blog Anda secara langsung di tab <strong className="text-white">Daftar Artikel</strong> untuk memperbarui situs Anda!
                       </p>
                    </div>
                  </div>
                </div>`);

    appContent = appContent.slice(0, blockStartIdx) + replacementTips + appContent.slice(blockEndIdx + blockEndString.length);
    console.log('Successfully removed the two requested CMS tabs (AI Writer & Preview) and cleaned up Tips alert!');
  } else {
    console.log('Warning: Could not locate the CMS subtabs blocks for deletion!');
  }

  // 3. Write back changes
  fs.writeFileSync(destAppPath, appContent, 'utf8');
  console.log('Successfully completed all customizations in src/App.tsx!');

} catch (err) {
  console.error('Fatal error during execution:', err.message);
}
