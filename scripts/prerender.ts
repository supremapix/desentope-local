/**
 * SSG Pre-renderer — gera HTML estático para as 272 URLs indexáveis.
 * Executado após `vite build`.
 * 
 * Fonte única da verdade das rotas: src/data/routes-indexaveis.ts
 */

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { getIndexableRoutes } from '../src/data/routes-indexaveis';

// Silencia avisos inócuos durante a pré-renderização estática
const originalWarn = console.warn;
const originalError = console.error;
console.warn = (...args: unknown[]) => {
  const msg = String(args[0] || '');
  if (
    msg.includes('Testing environment is not configured') ||
    msg.includes('React Router Future Flag Warning') ||
    msg.includes('startTransition') ||
    msg.includes('Relative route resolution')
  ) {
    return;
  }
  originalWarn(...args);
};
console.error = (...args: unknown[]) => {
  const msg = String(args[0] || '');
  if (
    msg.includes('Testing environment is not configured') ||
    msg.includes('act(...)')
  ) {
    return;
  }
  originalError(...args);
};

function setupGlobal(key: string, val: unknown) {
  try {
    Object.defineProperty(global, key, {
      value: val,
      writable: true,
      configurable: true,
    });
  } catch {
    (global as unknown as Record<string, unknown>)[key] = val;
  }
}

function attachGlobals(win: Record<string, unknown>) {
  setupGlobal('window', win);
  setupGlobal('document', win.document);
  setupGlobal('navigator', win.navigator);
  setupGlobal('HTMLElement', win.HTMLElement);
  setupGlobal('HTMLMetaElement', win.HTMLMetaElement);
  setupGlobal('HTMLLinkElement', win.HTMLLinkElement);
  setupGlobal('HTMLButtonElement', win.HTMLButtonElement);
  setupGlobal('location', win.location);
  win.scrollTo = () => {};
  win.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}

async function prerender() {
  console.log('🚀 Iniciando pré-renderização estática (SSG)...');
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html não encontrado. Execute vite build primeiro.');
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');
  const routes = getIndexableRoutes();
  console.log(`📋 Total de rotas indexáveis a pré-renderizar: ${routes.length}`);

  const React = await import('react');
  setupGlobal('React', React);
  const ReactDOM = await import('react-dom/client');
  const App = (await import('../src/App')).default;

  const startTime = Date.now();
  let completed = 0;

  for (const route of routes) {
    const url = `https://www.servicosnobairro.com.br${route}`;
    const dom = new JSDOM(baseTemplate, {
      url,
      pretendToBeVisual: true,
    });

    const win = dom.window;
    attachGlobals(win);

    const rootEl = win.document.getElementById('root');
    if (!rootEl) {
      throw new Error('Elemento #root não encontrado no template.');
    }

    const root = ReactDOM.createRoot(rootEl);
    root.render(React.createElement(App));

    // Aguarda montagem, resolução dos componentes lazy e execução dos efeitos do useSEO
    for (let i = 0; i < 45; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      if (win.document.title.length > 0 && win.document.querySelector('h1')) {
        break;
      }
    }

    // Pequeno intervalo extra para estabilização de tags no <head>
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Validações mínimas de integridade antes de salvar
    const title = win.document.title;
    const rootHtml = rootEl.innerHTML;

    if (!title || title.length === 0) {
      throw new Error(`Título vazio para rota ${route}`);
    }
    if (!rootHtml || rootHtml.length < 500) {
      throw new Error(`HTML renderizado insuficiente para rota ${route} (tam: ${rootHtml.length})`);
    }

    const serialized = dom.serialize();

    // Determina o caminho do arquivo de saída
    const outFilePath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');

    const outDir = path.dirname(outFilePath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outFilePath, serialized, 'utf-8');
    root.unmount();
    completed++;

    if (completed % 50 === 0 || completed === routes.length) {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      console.log(`  [${completed}/${routes.length}] rotas pré-renderizadas (${elapsed}s)...`);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`✅ Pré-renderização concluída com sucesso: ${completed} páginas em ${durationSec}s.`);

  // Pré-renderizar dist/404.html
  console.log('🚨 Gerando dist/404.html estático para tratamento de rotas inexistentes...');
  const dom404 = new JSDOM(baseTemplate, {
    url: 'https://www.servicosnobairro.com.br/404',
    pretendToBeVisual: true,
  });
  const win404 = dom404.window;
  attachGlobals(win404);

  const rootEl404 = win404.document.getElementById('root');
  if (rootEl404) {
    const root404 = ReactDOM.createRoot(rootEl404);
    root404.render(React.createElement(App));
    for (let i = 0; i < 45; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      if (win404.document.title.length > 0 && win404.document.querySelector('h1')) {
        break;
      }
    }
    fs.writeFileSync(path.join(distDir, '404.html'), dom404.serialize(), 'utf-8');
    root404.unmount();
    console.log('✅ dist/404.html gerado com sucesso.');
  }

  // Pré-renderizar dist/busca/index.html (para noindex, follow com HTML inicial)
  console.log('🔍 Gerando dist/busca/index.html estático (noindex, follow)...');
  const domBusca = new JSDOM(baseTemplate, {
    url: 'https://www.servicosnobairro.com.br/busca',
    pretendToBeVisual: true,
  });
  const winBusca = domBusca.window;
  attachGlobals(winBusca);

  const rootElBusca = winBusca.document.getElementById('root');
  if (rootElBusca) {
    const rootBusca = ReactDOM.createRoot(rootElBusca);
    rootBusca.render(React.createElement(App));
    for (let i = 0; i < 45; i++) {
      await new Promise((resolve) => setTimeout(resolve, 15));
      if (winBusca.document.title.length > 0 && winBusca.document.querySelector('h1')) {
        break;
      }
    }
    const buscaDir = path.join(distDir, 'busca');
    if (!fs.existsSync(buscaDir)) fs.mkdirSync(buscaDir, { recursive: true });
    fs.writeFileSync(path.join(buscaDir, 'index.html'), domBusca.serialize(), 'utf-8');
    rootBusca.unmount();
    console.log('✅ dist/busca/index.html gerado com sucesso.');
  }
}

prerender().catch((err) => {
  console.error('❌ Erro durante a pré-renderização:', err);
  process.exit(1);
});
