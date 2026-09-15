# ROUTES-MAP.md — Mapa completo de rotas

Roteamento: **react-router-dom v6** (`BrowserRouter`) declarado em `src/App.tsx`.
SPA puro: todas as URLs caem em `index.html` (`vercel.json` rewrites + `public/_redirects`).
Metadados e JSON-LD são injetados no `<head>` em runtime pelo hook `src/hooks/useSEO.ts`.

Base canônica: `https://www.servicosnobairro.com.br`

## Rotas estáticas

| URL | Tipo | Componente | Origem dos dados | Indexação | Canonical | Schema |
|---|---|---|---|---|---|---|
| `/` | estática (eager) | `src/pages/Index.tsx` | `empresas.ts`, `servicos.ts`, `bairros.ts`, `cidades-rmc.ts`, `bairros-sp.ts`, `cidades-sc.ts` | index | `/` | WebSite, Organization, FAQPage |
| `/curitiba` | hub de cidade | `CuritibaHubPage.tsx` | `bairros.ts`, `servicos.ts`, `empresas.ts` | index | `/curitiba` | BreadcrumbList, CollectionPage+ItemList, FAQPage |
| `/busca` | busca/filtros | `BuscaPage.tsx` | `empresas.ts`, `servicos.ts`, todos os datasets de local | index sem parâmetros; **noindex com qualquer query string** | `/busca` | BreadcrumbList |
| `/faq` | conteúdo | `FAQPage.tsx` | `faq.ts` | index | `/faq` | FAQPage (20 primeiras), BreadcrumbList |
| `/blog` | índice editorial | `BlogIndexPage.tsx` | `blog.ts` | index | `/blog` | BreadcrumbList |
| `/cadastrar-empresa` | formulário | `CadastrarEmpresaPage.tsx` | estático | index | `/cadastrar-empresa` | — |
| `/anuncie-aqui` | comercial | `AnuncieAquiPage.tsx` | estático | index | `/anuncie-aqui` | — |
| `/quem-somos` | institucional (E-E-A-T) | `QuemSomosPage.tsx` | estático | index | `/quem-somos` | BreadcrumbList |
| `/como-funciona` | institucional | `ComoFuncionaPage.tsx` | estático | index | `/como-funciona` | BreadcrumbList, FAQPage |
| `/como-selecionamos-profissionais` | institucional | `ComoSelecionamosPage.tsx` | estático | index | `/como-selecionamos-profissionais` | BreadcrumbList |
| `/politica-editorial` | institucional | `PoliticaEditorialPage.tsx` | estático | index | `/politica-editorial` | BreadcrumbList |
| `/contato` | institucional | `ContatoPage.tsx` | estático | index | `/contato` | BreadcrumbList |
| `/privacidade` | legal | `PrivacidadePage.tsx` | estático | index | `/privacidade` | BreadcrumbList |
| `/termos` | legal | `TermosPage.tsx` | estático | index | `/termos` | BreadcrumbList |
| `/servicos/guia-limpa-fossa` | pilar editorial | `GuiaLimpaFossaPage.tsx` | estático no componente | index | mesma URL | BreadcrumbList, FAQPage |
| `/servicos/camera-inspecao-esgoto-curitiba` | pilar de serviço | `CameraInspecaoPage.tsx` | `camera-inspecao.ts` | index | mesma URL | BreadcrumbList, Service, FAQPage |
| `/servicos/conserto-cervejeira-navegantes` | anúncio/serviço | `ConsertoCervejeiraPage.tsx` | `cervejeira.ts`, `empresas.ts` | index | mesma URL | BreadcrumbList, Service, FAQPage |
| `*` (404) | fallback | `NotFound.tsx` | — | **noindex, follow** | nenhum (removido) | — |

## Landing pages editoriais (`landing-pages.ts` → `LandingPage.tsx`) — 8 rotas

| URL | Canonical | Indexação |
|---|---|---|
| `/servicos/desentupimento-curitiba` | própria | index |
| `/servicos/encanador-curitiba` | própria | index |
| `/servicos/desentupidora-24h-curitiba` | própria | index |
| `/servicos/limpa-fossa-curitiba` | própria | index |
| `/servicos/hidrojateamento-curitiba` | própria | index |
| `/sao-jose-dos-pinhais` | `/rmc/sao-jose-dos-pinhais` | canonical cruzado (fora do sitemap) |
| `/colombo` | `/rmc/colombo` | canonical cruzado (fora do sitemap) |
| `/pinhais` | `/rmc/pinhais` | canonical cruzado (fora do sitemap) |

Schema: BreadcrumbList + Service (+ FAQPage quando a landing tem FAQ).

## Rotas dinâmicas

| Padrão | Componente | Origem dos dados | Qtde atual | Canonical | Schema |
|---|---|---|---|---|---|
| `/curitiba/:bairro` | `BairroPage.tsx` | `bairros.ts` (`todosBairros`) + `empresas.ts` + `perfis-locais.ts` + `faq-bairros.ts` | 129 | `/curitiba/{slug}` | BreadcrumbList, Service (por bairro), FAQPage |
| `/rmc/:bairro` | `BairroPage.tsx` (modo cidade) | `cidades-rmc.ts` + `faq-cidades.ts` | 27 | `/rmc/{slug}` | BreadcrumbList, Service, FAQPage |
| `/servicos/:slug` | `ServicoPage.tsx` | `servicos.ts` + `faq-servicos.ts` + `empresas.ts` | 48 | `/servicos/{slug}` | Service, BreadcrumbList, FAQPage |
| `/empresa/:slug` | `EmpresaPage.tsx` | `empresas.ts` | 6 | `/empresa/{slug}` | LocalBusiness (subtipo), BreadcrumbList, FAQPage |
| `/camera-inspecao-esgoto/:local` | `CameraInspecaoPage.tsx` | `camera-inspecao.ts` (`locaisInspecao`, 30 locais) | 29 no sitemap (`curitiba` usa a URL pilar) | `/camera-inspecao-esgoto/{slug}` | BreadcrumbList, Service, FAQPage |
| `/blog/:slug` | `BlogArtigoPage.tsx` | `blog.ts` (`blogArtigos`) | 9 | `/blog/{slug}` | BreadcrumbList, FAQPage |
| `/blog/categoria/:categoria` | `BlogCategoriaPage.tsx` | `blog.ts` (`blogCategorias`) | 3 | `/blog/categoria/{slug}` | BreadcrumbList |

## Redirects

| Origem | Destino | Tipo |
|---|---|---|
| `/curitiba/cic` | `/curitiba/cidade-industrial` | 301 em `vercel.json` + `<Navigate replace>` no router |
| `/(.*)` | `/index.html` | rewrite SPA (`vercel.json`) e `public/_redirects` (`200`) |

## Totais no sitemap (gerado por `scripts/generate-sitemap.ts`)

- `sitemap-pages.xml`: 28
- `sitemap-categories.xml`: 53
- `sitemap-cities.xml`: 185
- `sitemap-businesses.xml`: 6
- **Total indexável: 272 URLs** (`/busca` é explicitamente excluída do sitemap)
