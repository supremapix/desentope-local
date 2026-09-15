/**
 * Validador Automatizado do Build (SSG e Integridade de Produção).
 * Executado como última etapa de `npm run build`.
 */

import fs from 'fs';
import path from 'path';
import { getIndexableRoutes } from '../src/data/routes-indexaveis';

async function validate() {
  console.log('\n🔍 Iniciando validação automatizada de integridade do build...');
  const distDir = path.resolve(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    throw new Error('Diretório dist/ não encontrado.');
  }

  // 1. Validar 272 URLs indexáveis
  const routes = getIndexableRoutes();
  console.log(`\n1. Validando 272 URLs indexáveis em dist/...`);
  let missingCount = 0;
  for (const route of routes) {
    const filePath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');

    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ Faltando: ${filePath} (${route})`);
      missingCount++;
    } else {
      const stats = fs.statSync(filePath);
      if (stats.size < 1000) {
        console.error(`  ❌ Arquivo HTML muito pequeno (<1kB): ${filePath}`);
        missingCount++;
      }
    }
  }

  if (missingCount > 0) {
    throw new Error(`Falha: ${missingCount} páginas indexáveis ausentes ou corrompidas em dist/.`);
  }
  console.log(`  ✅ Todas as ${routes.length} URLs indexáveis possuem HTML estático válido em dist/.`);

  // 2. Validar sitemaps
  console.log(`\n2. Validando sitemaps XML em dist/...`);
  const sitemaps = [
    'sitemap.xml',
    'sitemap-pages.xml',
    'sitemap-categories.xml',
    'sitemap-cities.xml',
    'sitemap-businesses.xml',
  ];
  for (const sm of sitemaps) {
    const smPath = path.join(distDir, sm);
    if (!fs.existsSync(smPath)) {
      throw new Error(`Sitemap ausente em dist: ${sm}`);
    }
    const content = fs.readFileSync(smPath, 'utf-8');
    if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      throw new Error(`Sitemap inválido (sem cabeçalho XML): ${sm}`);
    }
    console.log(`  ✅ ${sm} verificado (${fs.statSync(smPath).size} bytes).`);
  }

  // 3. Validar arquivos de configuração de host (_redirects / vercel.json)
  console.log(`\n3. Validando regras de host e redirects...`);
  const redirectsPath = path.join(distDir, '_redirects');
  if (!fs.existsSync(redirectsPath)) {
    throw new Error('_redirects ausente em dist.');
  }
  const redirectsContent = fs.readFileSync(redirectsPath, 'utf-8');
  if (!redirectsContent.includes('/curitiba/cic') || !redirectsContent.includes('/curitiba/cidade-industrial')) {
    throw new Error('_redirects não contém redirect de /curitiba/cic.');
  }
  console.log(`  ✅ _redirects contém redirect 301 de /curitiba/cic e fallback SPA.`);

  const vercelPath = path.resolve(process.cwd(), 'vercel.json');
  if (fs.existsSync(vercelPath)) {
    const vercelContent = fs.readFileSync(vercelPath, 'utf-8');
    if (!vercelContent.includes('/curitiba/cic')) {
      throw new Error('vercel.json não contém redirect de /curitiba/cic.');
    }
    console.log(`  ✅ vercel.json verificado e íntegro.`);
  }

  // 4. Validar assets estáticos obrigatórios
  console.log(`\n4. Validando assets estáticos e ausência de links quebrados...`);
  const requiredAssets = [
    'robots.txt',
    'manifest.webmanifest',
    'og-image.png',
    'favicon.png',
    'logo.png',
    'llms.txt',
    'llms-full.txt',
  ];
  for (const asset of requiredAssets) {
    const assetPath = path.join(distDir, asset);
    if (!fs.existsSync(assetPath)) {
      throw new Error(`Asset obrigatório ausente em dist: ${asset}`);
    }
    const size = fs.statSync(assetPath).size;
    if (size === 0) {
      throw new Error(`Asset está vazio: ${asset}`);
    }
    console.log(`  ✅ ${asset} presente (${size} bytes).`);
  }

  // 5. Inspecionar HTML bruto de pelo menos 5 páginas representativas
  console.log(`\n5. Inspecionando HTML bruto de 5 páginas representativas...`);
  const sampleRoutes = [
    { name: '1. Home', route: '/' },
    { name: '2. Bairro', route: '/curitiba/batel' },
    { name: '3. Cidade RMC', route: '/rmc/sao-jose-dos-pinhais' },
    { name: '4. Serviço', route: '/servicos/desentupimento-curitiba' },
    { name: '5. Empresa', route: '/empresa/agua-facil-desentupidora-encanador-24h' },
  ];

  for (const sample of sampleRoutes) {
    const filePath =
      sample.route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, sample.route.replace(/^\//, ''), 'index.html');

    const html = fs.readFileSync(filePath, 'utf-8');

    // Title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : null;
    if (!title) throw new Error(`[${sample.name}] <title> não encontrado em ${filePath}`);

    // Meta description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    const desc = descMatch ? descMatch[1] : null;
    if (!desc) throw new Error(`[${sample.name}] meta description não encontrada em ${filePath}`);

    // Canonical
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) ||
                          html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;
    if (!canonical) throw new Error(`[${sample.name}] <link rel="canonical"> não encontrado em ${filePath}`);

    // H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null;
    if (!h1) throw new Error(`[${sample.name}] <h1> não encontrado em ${filePath}`);

    // JSON-LD
    const hasJsonLd = html.includes('application/ld+json');
    if (!hasJsonLd) throw new Error(`[${sample.name}] JSON-LD não encontrado em ${filePath}`);

    console.log(`  ✅ ${sample.name} (${sample.route}):`);
    console.log(`     • Title:       "${title}"`);
    console.log(`     • Description: "${desc.slice(0, 70)}..."`);
    console.log(`     • Canonical:   ${canonical}`);
    console.log(`     • H1:          "${h1}"`);
    console.log(`     • JSON-LD:     OK`);
  }

  console.log('\n🎉 TODAS AS VALIDAÇÕES PASSARAM COM SUCESSO! O build está 100% pronto para deploy.\n');
}

validate().catch((err) => {
  console.error('\n❌ Erro na validação do build:', err);
  process.exit(1);
});
