/**
 * Sitemap generator — runs before `vite dev` and `vite build` (predev/prebuild).
 * Writes public/sitemap.xml from the real application data so URLs never drift
 * from the routes and content that actually exist.
 *
 * Utiliza src/data/routes-indexaveis.ts como FONTE ÚNICA DA VERDADE.
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { BASE_URL, sitemapGrupos, SitemapEntry } from '../src/data/routes-indexaveis';

function generateSitemap(list: SitemapEntry[]) {
  const urls = list.map((e) =>
    [
      '  <url>',
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

const seen = new Set<string>();
let total = 0;

for (const [arquivo, lista] of Object.entries(sitemapGrupos)) {
  const unicos = lista.filter((e) => {
    if (seen.has(e.path)) return false;
    seen.add(e.path);
    return true;
  });
  writeFileSync(resolve(`public/${arquivo}`), generateSitemap(unicos));
  total += unicos.length;
  console.log(`${arquivo} gerado (${unicos.length} URLs)`);
}

const indexXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(sitemapGrupos).map((f) => `  <sitemap>\n    <loc>${BASE_URL}/${f}</loc>\n  </sitemap>`),
  '</sitemapindex>',
  '',
].join('\n');

writeFileSync(resolve('public/sitemap.xml'), indexXml);
console.log(`sitemap.xml (index) gerado — ${total} URLs em ${Object.keys(sitemapGrupos).length} arquivos`);
