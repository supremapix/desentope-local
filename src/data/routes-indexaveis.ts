import { todosBairros } from './bairros';
import { cidadesRMC } from './cidades-rmc';
import { servicos } from './servicos';
import { landingPages } from './landing-pages';
import { empresas } from './empresas';
import { blogArtigos, blogCategorias } from './blog';
import { locaisInspecao } from './camera-inspecao';

export const BASE_URL = 'https://www.servicosnobairro.com.br';

export interface SitemapEntry {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

/**
 * 16 Páginas estáticas indexáveis (exclui /busca, aliases e redirects).
 */
export const staticIndexablePages: SitemapEntry[] = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/curitiba', changefreq: 'weekly', priority: '0.9' },
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
  { path: '/servicos/conserto-cervejeira-navegantes', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/privacidade', changefreq: 'yearly', priority: '0.3' },
  { path: '/termos', changefreq: 'yearly', priority: '0.3' },
];

/**
 * Grupos canônicos de sitemap (totalizando 272 URLs indexáveis).
 */
export const sitemapGrupos: Record<string, SitemapEntry[]> = {
  // Páginas institucionais, hubs e conteúdo editorial (28 URLs)
  'sitemap-pages.xml': [
    ...staticIndexablePages,
    ...blogCategorias.map((c) => ({ path: `/blog/categoria/${c.slug}`, changefreq: 'weekly' as const, priority: '0.6' })),
    ...blogArtigos.map((a) => ({ path: `/blog/${a.slug}`, changefreq: 'monthly' as const, priority: '0.8' })),
  ],
  // Categorias e serviços (+ landing pages editoriais canônicas) (53 URLs)
  'sitemap-categories.xml': [
    ...servicos.map((s) => ({ path: `/servicos/${s.slug}`, changefreq: 'weekly' as const, priority: '0.7' })),
    ...landingPages
      .filter((pg) => !pg.canonical || pg.canonical === pg.route)
      .map((pg) => ({ path: pg.route, changefreq: 'weekly' as const, priority: '0.9' })),
  ],
  // Cidades e bairros (185 URLs)
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
  // Perfis de empresa (6 URLs)
  'sitemap-businesses.xml': [
    ...empresas.map((e) => ({ path: `/empresa/${e.slug}`, changefreq: 'weekly' as const, priority: '0.6' })),
  ],
};

/**
 * Fonte única de verdade para sitemap e pré-renderização estática (SSG).
 * Retorna as 272 URLs indexáveis sem duplicatas.
 */
export function getIndexableRoutes(): string[] {
  const seen = new Set<string>();
  const routes: string[] = [];
  for (const list of Object.values(sitemapGrupos)) {
    for (const item of list) {
      if (!seen.has(item.path)) {
        seen.add(item.path);
        routes.push(item.path);
      }
    }
  }
  return routes;
}
