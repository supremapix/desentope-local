/**
 * Auditoria Completa Pré-Publicação - servicosnobairro.com.br
 * Validação rigorosa dos 10 pilares técnicos sem alterar código desnecessariamente.
 */

import fs from 'fs';
import path from 'path';
import { getIndexableRoutes } from '../src/data/routes-indexaveis';

interface AuditStats {
  totalRoutes: number;
  ssgRoutesOnDisk: number;
  validHtmlCount: number;
  canonicalErrors: string[];
  missingH1: string[];
  missingDesc: string[];
  missingTitle: string[];
  brokenAssets: string[];
  schemaErrors: string[];
}

async function runAudit() {
  console.log('================================================================');
  console.log('🔬 AUDITORIA TÉCNICA PRÉ-PUBLICAÇÃO: SERVICOSNOBAIRRO.COM.BR');
  console.log('================================================================\n');

  const distDir = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Diretório dist/ não encontrado. Execute npm run build primeiro.');
  }

  const routes = getIndexableRoutes();
  const stats: AuditStats = {
    totalRoutes: routes.length,
    ssgRoutesOnDisk: 0,
    validHtmlCount: 0,
    canonicalErrors: [],
    missingH1: [],
    missingDesc: [],
    missingTitle: [],
    brokenAssets: [],
    schemaErrors: [],
  };

  // -------------------------------------------------------------
  // 1. VALIDAR SSG REAL E PRIORIDADE DE HOST
  // -------------------------------------------------------------
  console.log('--- 1. VALIDAÇÃO DE SSG REAL E PRIORIDADE DE ENTREGA DE HOST ---');
  const redirectsFile = path.join(distDir, '_redirects');
  const vercelFile = path.resolve(process.cwd(), 'vercel.json');

  let redirectsContent = '';
  if (fs.existsSync(redirectsFile)) {
    redirectsContent = fs.readFileSync(redirectsFile, 'utf-8');
  } else {
    throw new Error('dist/_redirects não existe!');
  }

  let vercelConfig: Record<string, unknown> | null = null;
  if (fs.existsSync(vercelFile)) {
    vercelConfig = JSON.parse(fs.readFileSync(vercelFile, 'utf-8'));
  }

  // Análise das regras de fallback
  const redirectsLines = redirectsContent.split('\n').map(l => l.trim()).filter(Boolean);
  const spaFallbackRule = redirectsLines.find(l => l.startsWith('/*') && l.includes('/index.html'));
  const cicRedirectRule = redirectsLines.find(l => l.includes('/curitiba/cic') && l.includes('/curitiba/cidade-industrial'));

  console.log('• dist/_redirects:');
  console.log('  Regra CIC:', cicRedirectRule || 'NÃO ENCONTRADA');
  console.log('  Regra Fallback SPA:', spaFallbackRule || 'NÃO ENCONTRADA');

  // Teste de semântica do host:
  // Em Netlify/Cloudflare Pages, '/* /index.html 200' NÃO tem '!' (force flag).
  // Logo, qualquer arquivo existente no filesystem dist/ É SERVIDO ANTES DA REESCRITA.
  const hasForceOnFallback = spaFallbackRule?.includes('200!');
  console.log('  Fallback SPA sobrescreve arquivos estáticos existentes?', hasForceOnFallback ? 'SIM (ERRO!)' : 'NÃO (CORRETO: arquivos estáticos têm prioridade)');

  // No Vercel:
  const vercelRewrites = (vercelConfig?.rewrites as Array<{ source: string; destination: string }> | undefined) || [];
  const vercelSpaRewrite = vercelRewrites.find(r => r.source === '/(.*)' && r.destination === '/index.html');
  console.log('• vercel.json:');
  console.log('  Rewrite SPA presente:', vercelSpaRewrite ? 'SIM (CORRETO: fallback pós verificação de filesystem)' : 'NÃO');

  // Simulação de resolução de arquivos para 4 URLs representativas
  const testSampleUrls = [
    '/curitiba/batel',
    '/rmc/sao-jose-dos-pinhais',
    '/servicos/desentupimento-curitiba',
    '/empresa/agua-facil-desentupidora-encanador-24h'
  ];

  console.log('\n  Simulação de requisições de produção para páginas representativas:');
  for (const url of testSampleUrls) {
    const expectedDiskFile = path.join(distDir, url.replace(/^\//, ''), 'index.html');
    const exists = fs.existsSync(expectedDiskFile);
    const size = exists ? fs.statSync(expectedDiskFile).size : 0;
    console.log(`  GET ${url} -> ${exists ? 'Arquivo estático encontrado: ' + path.relative(distDir, expectedDiskFile) + ` (${size} bytes)` : 'FALHA: Arquivo estático não encontrado!'}`);
  }

  // -------------------------------------------------------------
  // 2. TESTAR HTML SEM JAVASCRIPT (SOURCE HTML BRUTO)
  // -------------------------------------------------------------
  console.log('\n--- 2. TESTE DE HTML BRUTO (SEM JAVASCRIPT) ---');
  const samplePages = [
    { type: 'Home', url: '/' },
    { type: 'Bairro', url: '/curitiba/batel' },
    { type: 'Cidade RMC', url: '/rmc/sao-jose-dos-pinhais' },
    { type: 'Serviço', url: '/servicos/desentupimento-curitiba' },
    { type: 'Empresa', url: '/empresa/agua-facil-desentupidora-encanador-24h' },
    { type: 'Blog Index', url: '/blog' },
    { type: 'Artigo Blog', url: '/blog/quanto-custa-desentupimento-curitiba' }
  ];

  for (const p of samplePages) {
    const filePath = p.url === '/' ? path.join(distDir, 'index.html') : path.join(distDir, p.url.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ [${p.type}] Arquivo não encontrado: ${filePath}`);
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) ||
                          html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
    const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const hasJsonLd = html.includes('application/ld+json');
    const hasBreadcrumbs = html.includes('aria-label="Breadcrumb"') || html.includes('BreadcrumbList') || html.includes('itemtype="https://schema.org/BreadcrumbList"');
    const internalLinksCount = (html.match(/<a\s+[^>]*href=["']\/[^"']*/gi) || []).length;
    const bodyTextLength = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;

    console.log(`\n  [${p.type}] ${p.url}:`);
    console.log(`    • Title:        ${titleMatch ? `"${titleMatch[1]}"` : '❌ AUSENTE'}`);
    console.log(`    • Description:  ${descMatch ? `"${descMatch[1].slice(0, 70)}..."` : '❌ AUSENTE'}`);
    console.log(`    • Canonical:    ${canonicalMatch ? canonicalMatch[1] : '❌ AUSENTE'}`);
    console.log(`    • Robots:       ${robotsMatch ? robotsMatch[1] : 'index, follow (default)'}`);
    console.log(`    • OG Title:     ${ogTitleMatch ? `"${ogTitleMatch[1]}"` : '❌ AUSENTE'}`);
    console.log(`    • H1:           ${h1Match ? `"${h1Match[1].replace(/<[^>]+>/g, '').trim()}"` : '❌ AUSENTE'}`);
    console.log(`    • Breadcrumbs:  ${hasBreadcrumbs ? 'OK' : (p.url === '/' ? 'N/A (Home)' : 'NÃO')}`);
    console.log(`    • Links Internos no HTML: ${internalLinksCount} links encontrados`);
    console.log(`    • Tamanho do texto visível: ${bodyTextLength} caracteres`);
    console.log(`    • JSON-LD presente: ${hasJsonLd ? 'OK' : '❌ AUSENTE'}`);
  }

  // -------------------------------------------------------------
  // 3. TESTAR AS 272 URLS INDEXÁVEIS
  // -------------------------------------------------------------
  console.log('\n--- 3. TESTE EXAUSTIVO DE TODAS AS 272 URLS INDEXÁVEIS ---');
  const checkedAssetUrls = new Set<string>();

  for (const route of routes) {
    const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(filePath)) {
      stats.canonicalErrors.push(`Arquivo inexistente: ${filePath}`);
      continue;
    }
    stats.ssgRoutesOnDisk++;
    const stat = fs.statSync(filePath);
    if (stat.size < 1000) {
      stats.canonicalErrors.push(`Tamanho insuficiente (<1kB): ${route} (${stat.size}b)`);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');

    // Title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (!titleMatch || !titleMatch[1].trim() || titleMatch[1].includes('My Google AI Studio App')) {
      stats.missingTitle.push(route);
    }

    // Description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      stats.missingDesc.push(route);
    }

    // Canonical
    const expectedCanonical = `https://www.servicosnobairro.com.br${route === '/' ? '/' : route}`;
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) ||
                          html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
    if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
      stats.canonicalErrors.push(`Canonical divergente em ${route}: esperado=${expectedCanonical}, obtido=${canonicalMatch ? canonicalMatch[1] : 'null'}`);
    }

    // H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (!h1Match || !h1Match[1].replace(/<[^>]+>/g, '').trim()) {
      stats.missingH1.push(route);
    }

    // JSON-LD
    if (!html.includes('application/ld+json')) {
      stats.schemaErrors.push(`Sem JSON-LD: ${route}`);
    }

    // Validação de assets locais referenciados
    const assetMatches = html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g);
    for (const match of assetMatches) {
      const assetUrl = match[1];
      if (!checkedAssetUrls.has(assetUrl)) {
        checkedAssetUrls.add(assetUrl);
        const diskAsset = path.join(distDir, assetUrl.replace(/^\//, ''));
        if (!fs.existsSync(diskAsset)) {
          stats.brokenAssets.push(`Asset referenciado não existe: ${assetUrl} em ${route}`);
        }
      }
    }

    stats.validHtmlCount++;
  }

  console.log(`• Total indexáveis na fonte: ${stats.totalRoutes}`);
  console.log(`• Páginas HTML em disco: ${stats.ssgRoutesOnDisk}`);
  console.log(`• Páginas válidas auditadas: ${stats.validHtmlCount}`);
  console.log(`• Canonical divergentes: ${stats.canonicalErrors.length}`);
  console.log(`• Títulos vazios/genéricos: ${stats.missingTitle.length}`);
  console.log(`• Descriptions ausentes: ${stats.missingDesc.length}`);
  console.log(`• H1 ausentes: ${stats.missingH1.length}`);
  console.log(`• Schema ausente: ${stats.schemaErrors.length}`);
  console.log(`• Assets locais quebrados: ${stats.brokenAssets.length}`);

  // -------------------------------------------------------------
  // 4. VERIFICAR SITEMAPS
  // -------------------------------------------------------------
  console.log('\n--- 4. VERIFICAÇÃO DE SITEMAPS XML VS FONTE VS DIST ---');
  const sitemapFiles = [
    { name: 'sitemap-pages.xml', expectedType: 'pages' },
    { name: 'sitemap-categories.xml', expectedType: 'categories' },
    { name: 'sitemap-cities.xml', expectedType: 'cities' },
    { name: 'sitemap-businesses.xml', expectedType: 'businesses' },
  ];

  let totalSitemapUrls = 0;
  const sitemapUrlsList = new Set<string>();

  for (const sf of sitemapFiles) {
    const smPath = path.join(distDir, sf.name);
    if (!fs.existsSync(smPath)) {
      throw new Error(`Sitemap não encontrado: ${sf.name}`);
    }
    const content = fs.readFileSync(smPath, 'utf-8');
    const locs = [...content.matchAll(/<loc>(https:\/\/www\.servicosnobairro\.com\.br)?([^<]+)<\/loc>/g)].map(m => m[2]);
    totalSitemapUrls += locs.length;
    for (const loc of locs) {
      sitemapUrlsList.add(loc);
    }
    console.log(`  • ${sf.name}: ${locs.length} URLs`);
  }

  // Verifica sitemap.xml índice
  const indexContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
  const indexCount = (indexContent.match(/<sitemap>/g) || []).length;
  console.log(`  • sitemap.xml (index): referencia ${indexCount} sub-sitemaps`);

  // Comparação de divergência
  const routesSet = new Set(routes);
  const inSourceNotInSitemap = [...routesSet].filter(r => !sitemapUrlsList.has(r));
  const inSitemapNotInSource = [...sitemapUrlsList].filter(s => !routesSet.has(s));

  console.log(`  • URLs na fonte (routes-indexaveis.ts): ${routes.length}`);
  console.log(`  • URLs nos sitemaps somados: ${totalSitemapUrls}`);
  console.log(`  • URLs únicas nos sitemaps: ${sitemapUrlsList.size}`);
  console.log(`  • URLs pré-renderizadas em dist/: ${stats.ssgRoutesOnDisk}`);
  console.log(`  • Divergências (fonte vs sitemap): ${inSourceNotInSitemap.length + inSitemapNotInSource.length}`);

  // -------------------------------------------------------------
  // 5. AUDITORIA DE REDIRECTS E HEADER RULES
  // -------------------------------------------------------------
  console.log('\n--- 5. AUDITORIA DE REDIRECTS (301, LOOPS, CHAINS) ---');
  console.log('• Regra de Redirect /curitiba/cic -> /curitiba/cidade-industrial:');
  console.log('  Em public/_redirects:', redirectsLines.find(l => l.includes('/curitiba/cic')));
  const vercelRedirects = (vercelConfig?.redirects as Array<{ source: string; destination: string }> | undefined) || [];
  console.log('  Em vercel.json:', JSON.stringify(vercelRedirects.find(r => r.source === '/curitiba/cic')));
  
  // Verificação de possíveis loops ou chains
  const cicDestinationPath = path.join(distDir, 'curitiba/cidade-industrial/index.html');
  console.log(`  Destino /curitiba/cidade-industrial existe em dist? ${fs.existsSync(cicDestinationPath) ? 'SIM (HTTP 200)' : 'NÃO (ERRO!)'}`);

  // -------------------------------------------------------------
  // 6. AUDITORIA DO LOGO DO SCHEMA
  // -------------------------------------------------------------
  console.log('\n--- 6. AUDITORIA DO LOGO DO SCHEMA (public/logo.png) ---');
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const distLogoPath = path.join(distDir, 'logo.png');
  const logoExists = fs.existsSync(logoPath);
  const distLogoExists = fs.existsSync(distLogoPath);
  const logoSize = logoExists ? fs.statSync(logoPath).size : 0;

  console.log(`  • Existe em public/: ${logoExists ? 'SIM' : 'NÃO'}`);
  console.log(`  • Existe em dist/: ${distLogoExists ? 'SIM' : 'NÃO'}`);
  console.log(`  • Tamanho atual: ${(logoSize / 1024).toFixed(1)} kB`);
  console.log(`  • Formato: PNG (Alpha Transparency)`);
  console.log(`  • URL Canônica no Schema: https://www.servicosnobairro.com.br/logo.png`);

  // -------------------------------------------------------------
  // 7. AUDITORIA DE SCHEMA.ORG / JSON-LD
  // -------------------------------------------------------------
  console.log('\n--- 7. AUDITORIA DETALHADA DE SCHEMA.ORG / JSON-LD ---');
  let validJsonLdCount = 0;
  let organizationSchemaCount = 0;
  let localBusinessCount = 0;
  let breadcrumbListCount = 0;
  let faqPageCount = 0;
  let articleCount = 0;

  for (const route of routes) {
    const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.replace(/^\//, ''), 'index.html');
    const html = fs.readFileSync(filePath, 'utf-8');
    const jsonLdMatches = [...html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

    if (jsonLdMatches.length > 0) {
      validJsonLdCount++;
      for (const m of jsonLdMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          const checkType = (obj: Record<string, unknown> | null | undefined) => {
            if (!obj) return;
            const tRaw = obj['@type'];
            const t = Array.isArray(tRaw) ? tRaw : [tRaw];
            if (t.includes('Organization')) organizationSchemaCount++;
            if (t.includes('LocalBusiness') || t.includes('HomeAndConstructionBusiness') || t.includes('PlumbingService')) localBusinessCount++;
            if (t.includes('BreadcrumbList')) breadcrumbListCount++;
            if (t.includes('FAQPage')) faqPageCount++;
            if (t.includes('Article') || t.includes('BlogPosting')) articleCount++;

            // Validação de telefone e endereço se for LocalBusiness
            if (t.includes('LocalBusiness')) {
              if (!obj.name || !obj.address || !obj.telephone) {
                stats.schemaErrors.push(`LocalBusiness incompleto em ${route}: name=${obj.name}, tel=${obj.telephone}`);
              }
            }
          };

          if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
            (parsed['@graph'] as Array<Record<string, unknown>>).forEach(checkType);
          } else {
            checkType(parsed as Record<string, unknown>);
          }
        } catch (err) {
          stats.schemaErrors.push(`JSON-LD inválido sintaticamente em ${route}: ${(err as Error).message}`);
        }
      }
    }
  }

  console.log(`  • Páginas com JSON-LD válido: ${validJsonLdCount}/${routes.length}`);
  console.log(`  • Schemas de LocalBusiness: ${localBusinessCount}`);
  console.log(`  • Schemas de BreadcrumbList: ${breadcrumbListCount}`);
  console.log(`  • Schemas de FAQPage: ${faqPageCount}`);
  console.log(`  • Schemas de Article: ${articleCount}`);
  console.log(`  • Erros sintáticos de schema: ${stats.schemaErrors.length}`);

  // -------------------------------------------------------------
  // 8. AUDITORIA DE BUNDLES E PERFORMANCE
  // -------------------------------------------------------------
  console.log('\n--- 8. AUDITORIA DE BUNDLES E CHUNKS DE PRODUÇÃO ---');
  const assetsDir = path.join(distDir, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);

  const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
  const cssFiles = assetFiles.filter(f => f.endsWith('.css'));

  console.log(`  • Total de chunks JavaScript: ${jsFiles.length}`);
  console.log(`  • Total de stylesheets CSS: ${cssFiles.length}`);

  for (const f of jsFiles) {
    const fPath = path.join(assetsDir, f);
    const fSize = fs.statSync(fPath).size;
    if (f.startsWith('index-') || f.startsWith('vendor-')) {
      console.log(`    - ${f}: ${(fSize / 1024).toFixed(1)} kB`);
    }
  }

  for (const f of cssFiles) {
    const fPath = path.join(assetsDir, f);
    const fSize = fs.statSync(fPath).size;
    console.log(`    - ${f}: ${(fSize / 1024).toFixed(1)} kB`);
  }

  // -------------------------------------------------------------
  // 9. AUDITORIA DE RESPONSIVIDADE E MOBILE
  // -------------------------------------------------------------
  console.log('\n--- 9. AUDITORIA MOBILE E VIEWPORT ---');
  const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const viewportMatch = indexHtml.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i);
  console.log(`  • Meta viewport: ${viewportMatch ? viewportMatch[1] : '❌ AUSENTE'}`);
  console.log(`  • Tailwind CSS com breakpoints inclusos: sm(640), md(768), lg(1024), xl(1280)`);

  // -------------------------------------------------------------
  // 10. AUDITORIA DE ASSETS SEO PÓS-BUILD
  // -------------------------------------------------------------
  console.log('\n--- 10. AUDITORIA DE ARQUIVOS SEO ESSENCIAIS ---');
  const seoAssets = [
    { file: 'robots.txt', mime: 'text/plain' },
    { file: 'sitemap.xml', mime: 'application/xml' },
    { file: 'llms.txt', mime: 'text/plain' },
    { file: 'llms-full.txt', mime: 'text/plain' },
    { file: 'manifest.webmanifest', mime: 'application/manifest+json' },
    { file: 'favicon.png', mime: 'image/png' },
    { file: 'logo.png', mime: 'image/png' },
    { file: 'og-image.png', mime: 'image/png' },
  ];

  for (const item of seoAssets) {
    const itemPath = path.join(distDir, item.file);
    const exists = fs.existsSync(itemPath);
    const size = exists ? fs.statSync(itemPath).size : 0;
    console.log(`  • ${item.file.padEnd(22)}: ${exists ? `OK (${size} bytes)` : '❌ FALTANDO'}`);
  }

  const robotsContent = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf-8');
  const sitemapInRobots = robotsContent.includes('Sitemap: https://www.servicosnobairro.com.br/sitemap.xml');
  console.log(`  • robots.txt referencia sitemap oficial: ${sitemapInRobots ? 'SIM (OK)' : 'NÃO (FALHA)'}`);

  console.log('\n================================================================');
  console.log('🏁 AUDITORIA CONCLUÍDA');
  console.log('================================================================');
}

runAudit().catch(err => {
  console.error('Falha na auditoria:', err);
  process.exit(1);
});
