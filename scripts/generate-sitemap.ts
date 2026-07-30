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

const BASE_URL = 'https://desentupa-agora-pr.lovable.app';

interface SitemapEntry {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

const staticPages: SitemapEntry[] = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
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
  { path: '/privacidade', changefreq: 'yearly', priority: '0.3' },
  { path: '/termos', changefreq: 'yearly', priority: '0.3' },
];

const entries: SitemapEntry[] = [
  ...staticPages,
  // Landing pages editoriais (serviço + cidade)
  ...landingPages.map((p) => ({ path: p.route, changefreq: 'weekly' as const, priority: '0.9' })),
  // Bairros de Curitiba
  ...todosBairros.map((b) => ({
    path: `/curitiba/${b.slug}`,
    changefreq: 'weekly' as const,
    priority: b.oficial ? '0.8' : '0.6',
  })),
  // Cidades da Região Metropolitana
  ...cidadesRMC.map((c) => ({ path: `/rmc/${c.slug}`, changefreq: 'weekly' as const, priority: '0.7' })),
  // Serviços
  ...servicos.map((s) => ({ path: `/servicos/${s.slug}`, changefreq: 'weekly' as const, priority: '0.7' })),
  // Empresas
  ...empresas.map((e) => ({ path: `/empresa/${e.slug}`, changefreq: 'weekly' as const, priority: '0.6' })),
];

// Deduplicate by path — landing pages and service routes can overlap.
const seen = new Set<string>();
const unique = entries.filter((e) => (seen.has(e.path) ? false : (seen.add(e.path), true)));

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

writeFileSync(resolve('public/sitemap.xml'), generateSitemap(unique));
console.log(`sitemap.xml gerado (${unique.length} URLs)`);
