# PROJECT-MIGRATION.md — Serviços no Bairro

Documento de migração integral. Fotografia fiel do estado atual do projeto (nenhum arquivo de aplicação foi alterado na auditoria).
Documentos complementares: `ROUTES-MAP.md`, `SITE-MASTER.md`, `SEO-MAP.md`, `DATABASE-MAP.md`, `.env.example`, `docs/CHECKLIST-NOVA-EMPRESA.md`.

---

## 1. Visão geral

Diretório/marketplace brasileiro de serviços locais (https://www.servicosnobairro.com.br). Single Page Application 100% estática: todo o conteúdo — empresas, serviços, cidades, bairros, blog e FAQs — vive em arquivos TypeScript versionados. Não há backend, banco, autenticação nem chaves de API. A estratégia central é SEO/SEO local/GEO/AIO com 272 URLs indexáveis.

## 2. Stack

| Item | Versão |
|---|---|
| React | 18.3.1 |
| TypeScript | 5.8.3 |
| Vite | 5.4.19 (`@vitejs/plugin-react-swc` 3.11) |
| Tailwind CSS | 3.4.17 (+ `tailwindcss-animate`, `@tailwindcss/typography`) |
| react-router-dom | 6.30.1 |
| @tanstack/react-query | 5.83 (provider montado; sem fetch remoto hoje) |
| shadcn/ui + Radix UI | 49 componentes |
| lucide-react | 0.462 |
| react-hook-form + zod | 7.61 / 3.25 |
| Testes | Vitest 3.2 + Testing Library + jsdom; Playwright 1.57 |
| Gerenciador | Bun (`bun.lock`); `package-lock.json` também presente |
| Build target | estático (`dist/`), deploy Vercel (`vercel.json`) |

Dependências exclusivas do Lovable: `lovable-tagger` (devDependency, só no modo development em `vite.config.ts`).

## 3. Árvore de arquivos (essencial)

```
index.html                 head global, JSON-LD, hero pré-pintado (LCP)
package.json  vite.config.ts  tailwind.config.ts  postcss.config.js
tsconfig*.json  eslint.config.js  vitest.config.ts  playwright.config.ts
vercel.json                rewrites SPA, 301 /curitiba/cic, headers de segurança e cache
components.json            config shadcn/ui
scripts/generate-sitemap.ts  gera os 4 sitemaps + index (predev/prebuild)
docs/CHECKLIST-NOVA-EMPRESA.md
public/
  robots.txt  sitemap.xml  sitemap-pages|categories|cities|businesses.xml
  llms.txt  llms-full.txt  manifest.webmanifest  _redirects
  favicon.ico  favicon.png  og-image.png  placeholder.svg  suprema-img.png
  logos/logo-adp.png  logo-motofrete.png  logo-lavanderia-inovata.png
        logo-santa-catarina-refrigeracao.webp
src/
  main.tsx  App.tsx  index.css  App.css  vite-env.d.ts
  types/index.ts           Empresa, Servico, Bairro, CidadeRMC, Avaliacao...
  hooks/useSEO.ts          head dinâmico + builders de schema
  hooks/use-mobile.tsx  hooks/use-toast.ts
  lib/utils.ts             cn()
  components/              17 componentes próprios + ui/ (49 shadcn)
  pages/                   25 páginas
  data/                    15 arquivos = toda a base de conteúdo
  test/setup.ts  test/example.test.ts
```

## 4. Instalação

```bash
bun install      # ou npm install
```

## 5. Execução

```bash
bun run dev      # predev regenera os sitemaps; Vite em http://localhost:8080
```

## 6. Build

```bash
bun run build        # prebuild regenera sitemaps → dist/
bun run preview      # serve o build
bun run lint
bun run test
```
Saída: `dist/` estático. Requer rewrite de todas as rotas para `index.html` no host.

## 7. Rotas

31 declarações de rota, 272 URLs indexáveis. Detalhamento completo em `ROUTES-MAP.md`.
Rotas dinâmicas: `/curitiba/:bairro`, `/rmc/:bairro`, `/servicos/:slug`, `/empresa/:slug`, `/camera-inspecao-esgoto/:local`, `/blog/:slug`, `/blog/categoria/:categoria`.

## 8. Banco de dados

Nenhum. Conteúdo estático em `src/data/*.ts`. Ver `DATABASE-MAP.md`.

## 9. Autenticação

Inexistente. Sem login, sessão, roles ou área administrativa.

## 10. APIs

Nenhuma API interna ou externa é chamada em runtime. Recursos de terceiros usados apenas como links/embeds: `wa.me`, YouTube, `img.supremasite.com.br` (vídeos MP4), Google Fonts.

## 11. Storage

Nenhum bucket. Imagens, logos e ícones são arquivos versionados em `public/` (ver seção 7 de inventário abaixo). Sem upload em runtime.

## 12. Variáveis de ambiente

Nenhuma é lida pelo código hoje. `.env.example` lista os nomes que farão sentido caso banco/API sejam adicionados, e aponta os valores hoje hardcoded (domínio canônico, verificação Google, telefones do portal).

## 13. SEO

Ver `SEO-MAP.md`. Pontos que **não podem mudar** na migração: URLs, canonicals, titles/descriptions, sitemaps (mesmos nomes de arquivo), `robots.txt`, 301 de `/curitiba/cic`, schemas e `@id`.

## 14. GEO

Dados geográficos em `bairros.ts`, `bairros-sp.ts`, `cidades-rmc.ts`, `cidades-sc.ts`, `perfis-locais.ts`; coordenadas em `getCoordenadasBairro()`; `areaServed` derivado de `bairrosAtendidos`/`cidadesAtendidas` das empresas; meta `geo.*`/`ICBM` por página.

## 15. AIO

`public/llms.txt` e `public/llms-full.txt`; padrão de resposta direta no topo das páginas; FAQs visíveis com `FAQPage`.

## 16. Schemas

`src/hooks/useSEO.ts` concentra todos os builders: WebSite+SearchAction, Organization, CollectionPage+ItemList, Service (+AggregateOffer), LocalBusiness com subtipos (Plumber, DeliveryService, DryCleaningOrLaundry, HVACBusiness), FAQPage, BreadcrumbList.

## 17. Páginas dinâmicas — como as URLs nascem

1. **Origem dos dados:** array tipado em `src/data/*.ts`.
2. **Slug:** campo `slug` (ou `route`, nas landings) — é a chave da URL.
3. **Router:** rota com parâmetro em `src/App.tsx` (lazy import).
4. **Template:** componente único por família de URL (`BairroPage`, `ServicoPage`, `EmpresaPage`, `BlogArtigoPage`, `CameraInspecaoPage`, `LandingPage`).
5. **Lookup:** `getBairroBySlug`, `getCidadeBySlug`, `getEmpresaBySlug`, `getArtigoBySlug`, `getLocalInspecao`, `landingPages.find(p => p.route === pathname)`. Slug inexistente cai no `NotFound` (noindex).
6. **SEO/canonical/schema:** `useSEO` recebe title/description/canonical/jsonLd montados com os dados do registro.
7. **Sitemap:** `scripts/generate-sitemap.ts` percorre os mesmos arrays — o sitemap nunca diverge das rotas.

Exemplos: `/curitiba/{slug}` a partir de `todosBairros` (129); `/rmc/{slug}` de `cidadesRMC` (27); `/servicos/{slug}` de `servicos` (48); `/empresa/{slug}` de `empresas` (6); `/camera-inspecao-esgoto/{slug}` de `locaisInspecao` (30).

## 18. Dados

| Conteúdo | Arquivo | Qtde |
|---|---|---|
| Empresas | `empresas.ts` | 6 |
| Serviços | `servicos.ts` | 48 (5 categorias, 20 categorias rápidas) |
| Bairros Curitiba | `bairros.ts` | 129 (9 regionais) |
| Cidades RMC | `cidades-rmc.ts` | 27 (+6 entorno) |
| São Paulo | `bairros-sp.ts` | 49 bairros, 21 cidades, 32 bairros Osasco |
| Santa Catarina | `cidades-sc.ts` | 23 cidades, 52 bairros |
| Perfis locais | `perfis-locais.ts` | 10 regionais + 18 cidades |
| Landing pages | `landing-pages.ts` | 8 |
| Blog | `blog.ts` | 9 artigos, 3 categorias |
| FAQs | `faq.ts`, `faq-bairros.ts`, `faq-cidades.ts`, `faq-servicos.ts` | geradas por slug |
| Câmera de inspeção | `camera-inspecao.ts` | 32 FAQs, 30 locais |
| Cervejeira | `cervejeira.ts` | 8 FAQs, 23 cidades |

## 19. Integrações

WhatsApp (links `wa.me`), YouTube (IDs `DtsnNqQVWnQ`, `ymN9Nrxbwp8`, `t4Sbb8b2xz0`), vídeos MP4 externos (`https://img.supremasite.com.br/santa-catarina.mp4` e `/refrigeracao.mp4`), Google Fonts (Inter), Google Search Console (meta em `index.html`). Nenhum SDK, nenhuma chave.

## 20. Deploy

Hoje: build Vite estático publicado com `vercel.json` (rewrite `/(.*) → /index.html`, 301 `/curitiba/cic`, headers `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, cache imutável em `/assets/*`). `public/_redirects` cobre hosts tipo Netlify. O domínio `www.servicosnobairro.com.br` aponta para esse deploy.
No destino é obrigatório reproduzir: rewrite SPA, o 301 e os headers.

## 21. Dependências do Lovable

| Recurso | Classificação | Observação |
|---|---|---|
| Código React/Vite/Tailwind/shadcn | **PORTÁVEL** | stack padrão, sem lock-in |
| Dados em `src/data/*.ts` | **PORTÁVEL** | arquivos comuns |
| `lovable-tagger` (vite.config.ts) | **PRECISA SER SUBSTITUÍDO** (trivial) | remover o plugin e a devDependency; só roda em dev |
| Lovable Cloud / Supabase | **NÃO SE APLICA** | nunca foi ativado |
| Auth / Storage / Edge Functions / Secrets | **NÃO SE APLICA** | inexistentes |
| Deploy e domínio | **PRECISA CONFIGURAÇÃO** | reapontar DNS e recriar rewrites/headers no novo host |
| Preview social por rota | **NÃO É PORTÁVEL sem SSR** | exige SSR/SSG/prerender no destino |
| `.lovable/plan.md`, `src/tailwind.config.lov.json` | **PORTÁVEL / descartável** | metadados internos, não afetam o build |

## 22. Passos para migração

1. Copiar o repositório inteiro, incluindo `public/` (imagens reais — não substituir por IA) e `src/data/`.
2. `bun install` (ou `npm install`) e `bun run build` para confirmar paridade.
3. Remover `lovable-tagger` do `vite.config.ts` e do `package.json` se o novo ambiente não o tiver.
4. Recriar no host: rewrite de todas as rotas para `index.html`, 301 de `/curitiba/cic`, headers de segurança e cache de `/assets/*`.
5. Manter o script `generate-sitemap.ts` ligado aos hooks `predev`/`prebuild`.
6. Manter `BASE_URL`/`SITE_URL` em `https://www.servicosnobairro.com.br` até (e depois de) o corte de DNS.
7. Manter a meta `google-site-verification` em `index.html`.
8. Se e somente se houver SSR no destino, mover title/description/canonical/JSON-LD do `useSEO` para o render do servidor — sem alterar valores.
9. Trocar o DNS só depois de validar as 272 URLs no novo ambiente.

## 23. Checklist pós-migração

- [ ] As 272 URLs do sitemap respondem 200 e renderizam o mesmo conteúdo
- [ ] `/curitiba/cic` responde 301 para `/curitiba/cidade-industrial`
- [ ] URL inexistente cai em 404 com `noindex, follow`
- [ ] `/busca?local=...` continua `noindex, follow`
- [ ] `robots.txt` e os 5 arquivos de sitemap acessíveis nos mesmos caminhos
- [ ] `llms.txt` e `llms-full.txt` acessíveis
- [ ] Canonical correto em amostras: home, bairro, cidade RMC, serviço, empresa, blog, landing
- [ ] JSON-LD válido no Rich Results Test (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList)
- [ ] Logos, `og-image.png`, favicon e vídeos das empresas carregando
- [ ] Botões de WhatsApp abrindo com a mensagem correta
- [ ] Busca e filtros funcionando
- [ ] Sitemap reenviado no Google Search Console após o corte de DNS
- [ ] Monitorar cobertura e posições por 30 dias

---

## Inventário rápido de arquivos públicos

Imagens/ícones: `favicon.ico`, `favicon.png`, `og-image.png` (1200x630), `placeholder.svg`, `suprema-img.png`, `logos/logo-adp.png`, `logos/logo-motofrete.png`, `logos/logo-lavanderia-inovata.png`, `logos/logo-santa-catarina-refrigeracao.webp`.
Sem fontes locais (Inter vem do Google Fonts), sem PDFs, sem AVIF, sem vídeos hospedados localmente.
Mídia externa: dois MP4 em `img.supremasite.com.br` e três vídeos do YouTube.
Não há pasta `src/assets` — nenhum import de imagem via ES6.
