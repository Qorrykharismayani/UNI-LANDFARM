const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/components/ContentStructureEditor.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add new state variables for pages
const stateHookPos = content.indexOf('const [contentJson, setRawContentJson] = useState<any>(null);');
if (stateHookPos !== -1) {
  const injection = `
  const [sitePages, setSitePages] = useState<any[]>([]);
  const [currentPageSlug, setCurrentPageSlug] = useState<string>('/');
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
`;
  content = content.slice(0, stateHookPos + 61) + injection + content.slice(stateHookPos + 61);
}

// 2. Modify data initialization
const initDataPos = content.indexOf('if (data && data.success) {');
if (initDataPos !== -1) {
  const endInitDataPos = content.indexOf('setLoading(false);', initDataPos);
  
  const oldInitLogic = content.slice(initDataPos, endInitDataPos);
  const newInitLogic = `if (data && data.success) {
        setPageData(data.data);
        const fetchedContent = data.data.content?.contentJson || data.data.template?.defaultContent || {};
        
        if (fetchedContent.pages && Array.isArray(fetchedContent.pages)) {
          setSitePages(fetchedContent.pages);
          const homePage = fetchedContent.pages.find((p:any) => p.slug === '/') || fetchedContent.pages[0];
          setCurrentPageSlug(homePage.slug);
          setContentJson(homePage.content);
        } else {
          // Initialize with a single page
          setSitePages([{ slug: '/', name: 'Beranda', content: fetchedContent }]);
          setCurrentPageSlug('/');
          setContentJson(fetchedContent);
        }
      } else {
        triggerToast('Gagal memuat data halaman');
      }
      `;
  
  content = content.replace(oldInitLogic, newInitLogic);
}

// 3. Modify Save logic to save pages instead of just current content
const saveFuncPos = content.indexOf('const saveRes = await fetch(`/api/landing-pages/${pageId}`, {');
if (saveFuncPos !== -1) {
  const savePayloadPos = content.indexOf('body: JSON.stringify({ content: contentToSave }),', saveFuncPos);
  if (savePayloadPos !== -1) {
    const payloadReplacement = `body: JSON.stringify({ 
        content: { 
          pages: sitePages.map(p => p.slug === currentPageSlug ? { ...p, content: contentToSave } : p)
        } 
      }),`;
    content = content.replace('body: JSON.stringify({ content: contentToSave }),', payloadReplacement);
  }
}

// 4. Also update sitePages state when debounced auto-save triggers so UI is in sync
const autoSavePos = content.indexOf('saveToDb(debouncedContentJson);');
if (autoSavePos !== -1) {
  content = content.replace('saveToDb(debouncedContentJson);', `
      setSitePages(prev => prev.map(p => p.slug === currentPageSlug ? { ...p, content: debouncedContentJson } : p));
      saveToDb(debouncedContentJson);
  `);
}

// 5. Update the "Tambah Halaman Baru" button logic
const addPageBtnRegex = /<button[\s\S]*?onClick=\{\(\) => \{\s*setShowAddSectionDropdown\(false\);\s*if \(onCreateNewPage\) onCreateNewPage\(\);\s*else if \(onBack\) onBack\(\);\s*\}\}[\s\S]*?<span className="font-bold text-\[11px\] tracking-tight">Tambah Halaman Baru<\/span>[\s\S]*?<\/button>/m;

const newAddPageBtn = `<button
                      onClick={() => {
                        setShowAddSectionDropdown(false);
                        setShowAddPageModal(true);
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/15 rounded-lg transition-all flex items-center gap-2 text-xs text-brand-blue hover:text-brand-blue-600 dark:text-brand-blue-400 dark:hover:text-brand-blue-300 group cursor-pointer border-none"
                    >
                      <div className="w-5 h-5 rounded bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-[11px] tracking-tight">Tambah Halaman Baru</span>
                    </button>`;

content = content.replace(addPageBtnRegex, newAddPageBtn);

// 6. Render the Page Switcher in the dropdown
const pageDropdownHeaderRegex = /<span className="text-\[9px\] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-2 py-1 select-none">Halaman:<\/span>/;
const newPageDropdownHeader = `<span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-2 py-1 select-none">Halaman:</span>
                    {sitePages.map(page => (
                      <button
                        key={page.slug}
                        onClick={() => {
                          setShowAddSectionDropdown(false);
                          setCurrentPageSlug(page.slug);
                          setContentJson(page.content || {});
                        }}
                        className={\`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between text-xs \${currentPageSlug === page.slug ? 'bg-brand-blue/10 text-brand-blue font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}\`}
                      >
                        <span className="truncate">{page.name}</span>
                        {currentPageSlug === page.slug && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                    ))}
`;
content = content.replace(pageDropdownHeaderRegex, newPageDropdownHeader);

// 7. Inject the Add Page Modal
const modalInjectionPoint = content.indexOf('{/* Add Section Overlay */}');
if (modalInjectionPoint !== -1) {
  const addPageModalHtml = `
      {/* Add Page Modal */}
      {showAddPageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddPageModal(false)} />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">Tambah Halaman Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nama Halaman</label>
                <input 
                  type="text" 
                  value={newPageName}
                  onChange={e => {
                    setNewPageName(e.target.value);
                    if (!newPageSlug || newPageSlug === '/' || newPageSlug === '/' + e.target.value.toLowerCase().replace(/\\s+/g, '-')) {
                      setNewPageSlug('/' + e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
                    }
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  placeholder="Contoh: Tentang Kami"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">URL Slug</label>
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
                  className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold"
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
                    // Auto-save will pick up the new contentJson and save
                  }}
                  className="flex-1 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  `;
  content = content.slice(0, modalInjectionPoint) + addPageModalHtml + content.slice(modalInjectionPoint);
}

fs.writeFileSync(targetFile, content);
console.log('ContentStructureEditor multi-page logic injected!');
