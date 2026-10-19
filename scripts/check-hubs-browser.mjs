import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT_DIR || '../qa';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_PATH,
  headless: true,
  args: ['--no-sandbox'],
});
const report = [];
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    // Test only the local application; do not send messages or submit external forms.
    await context.route('**/*', (route) => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: /Mudanças em Curitiba.*Consultar guia/ }).click();
    await page.getByRole('heading', { level: 1, name: /Mudanças em Curitiba/ }).waitFor();
    assert.equal(await page.locator('main a[href^="/empresa/"]').count(), 0);
    await page.getByRole('link', { name: 'Pequena mudança e carreto', exact: true }).click();
    assert.equal(new URL(page.url()).hash, '#pequena-mudanca');
    const summary = page.locator('main summary').first();
    await summary.click();
    assert.equal(await page.locator('main details').first().getAttribute('open'), '');
    await summary.click();
    assert.equal(await page.locator('main details').first().getAttribute('open'), null);
    await page.getByRole('link', { name: 'Solicitar cadastro', exact: true }).click();
    await page.getByRole('heading', { level: 1, name: 'Cadastre sua Empresa' }).waitFor();
    const whatsapp = await page.getByRole('link', { name: 'Cadastrar via WhatsApp' }).getAttribute('href');
    assert.match(new URL(whatsapp).searchParams.get('text'), /Categoria: Mudanças. Cidade de atendimento: Curitiba/);
    await page.goBack();
    await page.getByRole('heading', { level: 1, name: /Mudanças em Curitiba/ }).waitFor();
    await page.getByRole('link', { name: 'Transportes em Curitiba', exact: true }).click();
    await page.getByRole('heading', { level: 1, name: /Transportes em Curitiba/ }).waitFor();
    assert.equal(await page.locator('main a[href^="/empresa/"]').count(), 2);
    assert.match(await page.locator('main').innerText(), /Não é uma oferta de frete local geral em Curitiba/);
    await page.getByRole('link', { name: 'Ver perfil completo', exact: true }).click();
    await page.getByRole('heading', { level: 1, name: /Motofrete São Paulo/ }).waitFor();
    await page.goBack();
    await page.getByRole('heading', { level: 1, name: /Transportes em Curitiba/ }).waitFor();
    await page.waitForFunction(() => document.querySelector('link[rel="canonical"]')?.href.endsWith('/categorias/transportes/curitiba'));
    await page.getByRole('link', { name: 'Entregas em Curitiba', exact: true }).click();
    await page.getByRole('heading', { level: 1, name: /Entregas em Curitiba/ }).waitFor();
    assert.equal(await page.locator('main a[href^="/empresa/"]').count(), 0);
    for (const slug of ['mudancas', 'transportes', 'entregas']) {
      await page.goto(`${base}/categorias/${slug}/curitiba`, { waitUntil: 'networkidle' });
      await page.locator('main h1').waitFor();
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, `${slug} horizontal overflow at ${viewport.width}px`);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://www.servicosnobairro.com.br/categorias/${slug}/curitiba`);
      await page.screenshot({ path: `${output}/${slug}-${viewport.width}.png`, fullPage: true });
    }
    await page.goto(`${base}/busca?categoria=mudancas`, { waitUntil: 'networkidle' });
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    await page.goto(`${base}/categorias/inexistente/curitiba`, { waitUntil: 'networkidle' });
    assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    assert.equal(await page.locator('link[rel="canonical"]').count(), 0);
    assert.deepEqual(errors, []);
    report.push({ viewport, passed: true, checks: 'Home → guia → seção; FAQ abre/fecha; cadastro contextual sem envio; guia → perfil → voltar; canonicals; três rotas diretas; mobile sem overflow; busca e 404 noindex; sem erros JS.' });
    await context.close();
  }
  fs.writeFileSync(`${output}/browser-report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
