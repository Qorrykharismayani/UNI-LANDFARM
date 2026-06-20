const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/components/TemplateRenderer.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Update Props Interface
const propsRegex = /interface TemplateRendererProps \{([\s\S]*?)\}/;
const newProps = `interface TemplateRendererProps {
  templateId: string | number;
  contentJson: any;
  isMobile?: boolean;
  siteConfig?: { slug: string, title: string, pages: any[] };
}`;
content = content.replace(propsRegex, newProps);

// 2. Update Component Signature
content = content.replace(
  /export default function TemplateRenderer\(\{ templateId, contentJson, isMobile = false \}: TemplateRendererProps\) \{/,
  `export default function TemplateRenderer({ templateId, contentJson, isMobile = false, siteConfig }: TemplateRendererProps) {`
);

// 3. Update Navbar Links rendering
const oldNavbarLinks = /\{Array\.isArray\(navbar\.items\) && navbar\.items\.map\(\(item: any\) => \(\s*<a key=\{item\.id\} href=\{`#\$\{item\.id\}`\} className="hover:text-brand-blue transition-colors" style=\{\{ '--tw-hover-text': primaryColor \} as any\}>\{item\.label\}<\/a>\s*\)\)\}/;
const newNavbarLinks = `
              {siteConfig && siteConfig.pages && siteConfig.pages.length > 1 ? (
                siteConfig.pages.map((p: any) => (
                  <a key={p.slug} href={\`/site/\${siteConfig.slug}\${p.slug === '/' ? '' : p.slug}\`} className="hover:text-brand-blue transition-colors" style={{ '--tw-hover-text': primaryColor } as any}>{p.name}</a>
                ))
              ) : (
                Array.isArray(navbar.items) && navbar.items.map((item: any) => (
                  <a key={item.id} href={\`#\${item.id}\`} className="hover:text-brand-blue transition-colors" style={{ '--tw-hover-text': primaryColor } as any}>{item.label}</a>
                ))
              )}
`;
content = content.replace(oldNavbarLinks, newNavbarLinks.trim());

fs.writeFileSync(targetFile, content);
console.log('TemplateRenderer updated successfully.');
