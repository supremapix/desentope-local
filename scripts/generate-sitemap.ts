/**
 * Sitemap generator — runs before `vite dev` and `vite build` (predev/prebuild).
 * Writes public/sitemap.xml from the real application data so URLs never drift
 * from the routes and content that actually exist.
 *
 * Run manually: bun scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { todosBairros } from '../src/data/bairros';
import { cidadesRMC } from '../src/data/cidades-rmc';
import { servicos } from '../src/data/servicos';
import { landingPages } from '../src/data/landing-pages';
import { empresas } from '../src/data/empresas';
import { blogArtigos, blogCategorias } from '../src/data/blog';
import { locaisInspecao } from '../src/data/camera-inspecao';

const BASE_URL = 'https://www.servicosnobairro.com.br';

interface SitemapEntry {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

const staticPages: SitemapEntry[] = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/curitiba', changefreq: 'weekly', priority: '0.9' },
  { path: '/busca', changefreq: 'daily', priority: '0.8' },
  { path: '/faq', changefreq: 'weekly', priority: '0.7' },
  { path: '/quem-somos', changefreq: 'monthly', priority: '0.6' },
  { path: '/como-funciona', changefreq: 'monthly', priority: '0.6' },
  { path: '/como-selecionamos-profissionais', changefreq: 'monthly', priority: '0.6' },
  { path: '/politica-editorial', changefreq: 'yearly', priority: '0.4' },
  { path: '/contato', changefreq: 'monthly', priority: '0.5' },
  { path: '/cadastrar-empresa', changefreq: 'monthly', priority: '0.5' },
  { path: '/anuncie-aqui', changefreq: 'monthly', priority: '0.6' },
  { path: '/servicos/guia-limpa-fossa', changefreq: 'monthly', priority: '0.8' },
  { path: '/servicos/camera-inspecao-esgoto-curitiba', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/privacidade', changefreq: 'yearly', priority: '0.3' },
  { path: '/termos', changefreq: 'yearly', priority: '0.3' },
];

const grupos: Record<string, SitemapEntry[]> = {
  // Páginas institucionais, hubs e conteúdo editorial
  'sitemap-pages.xml': [
    ...staticPages,
    ...blogCategorias.map((c) => ({ path: `/blog/categoria/${c.slug}`, changefreq: 'weekly' as const, priority: '0.6' })),
    ...blogArtigos.map((a) => ({ path: `/blog/${a.slug}`, changefreq: 'monthly' as const, priority: '0.8' })),
  ],
  // Categorias e serviços (+ landing pages editoriais canônicas)
  'sitemap-categories.xml': [
    ...servicos.map((s) => ({ path: `/servicos/${s.slug}`, changefreq: 'weekly' as const, priority: '0.7' })),
    ...landingPages
      .filter((pg) => !pg.canonical || pg.canonical === pg.route)
      .map((pg) => ({ path: pg.route, changefreq: 'weekly' as const, priority: '0.9' })),
  ],
  // Cidades e bairros
  'sitemap-cities.xml': [
    ...todosBairros.map((b) => ({
      path: `/curitiba/${b.slug}`,
      changefreq: 'weekly' as const,
      priority: b.oficial ? '0.8' : '0.6',
    })),
    ...cidadesRMC.map((c) => ({ path: `/rmc/${c.slug}`, changefreq: 'weekly' as const, priority: '0.7' })),
    ...locaisInspecao
      .filter((l) => l.slug !== 'curitiba')
      .map((l) => ({ path: `/camera-inspecao-esgoto/${l.slug}`, changefreq: 'monthly' as const, priority: '0.7' })),
  ],
  // Perfis de empresa
  'sitemap-businesses.xml': [
    ...empresas.map((e) => ({ path: `/empresa/${e.slug}`, changefreq: 'weekly' as const, priority: '0.6' })),
  ],
};

// URLs não canônicas / não indexáveis nunca entram no sitemap.
const NAO_INDEXAVEIS = new Set(['/busca']);

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

for (const [arquivo, lista] of Object.entries(grupos)) {
  const unicos = lista.filter((e) => {
    if (NAO_INDEXAVEIS.has(e.path) || seen.has(e.path)) return false;
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
  ...Object.keys(grupos).map((f) => `  <sitemap>\n    <loc>${BASE_URL}/${f}</loc>\n  </sitemap>`),
  '</sitemapindex>',
  '',
].join('\n');

writeFileSync(resolve('public/sitemap.xml'), indexXml);
console.log(`sitemap.xml (index) gerado — ${total} URLs em ${Object.keys(grupos).length} arquivos`);
