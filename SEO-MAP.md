# SEO-MAP.md — Arquitetura SEO / GEO / AIO

> Regra de migração: **nenhuma URL, canonical, title, description ou schema pode mudar.**
> Toda a lógica está concentrada em poucos pontos, listados abaixo.

## 1. Onde o SEO é aplicado

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Head estático (1º paint / fallback) | `index.html` | title, description, robots, OG, Twitter, geo meta, verificação Google, JSON-LD WebSite + Organization, hero pré-pintado para LCP |
| Head dinâmico por rota | `src/hooks/useSEO.ts` | injeta/atualiza title, description, robots, OG, Twitter, canonical, geo, JSON-LD a cada rota |
| Builders de schema | `src/hooks/useSEO.ts` | `buildWebsiteSchema`, `buildOrganizationSchema`, `buildBairroServiceSchema`, `buildLocalBusinessSchema`, `buildServiceSchema`, `buildCollectionPageSchema`, `buildFAQSchema`, `buildBreadcrumbSchema` |
| Sitemaps | `scripts/generate-sitemap.ts` (hooks `predev`/`prebuild`) | gera `sitemap.xml` (index) + 4 sitemaps por tipo |
| Crawlers | `public/robots.txt` | permissões + bloqueio de URLs parametrizadas |
| LLMs | `public/llms.txt`, `public/llms-full.txt` | resumo do portal para IAs |
| Redirects/rewrites | `vercel.json`, `public/_redirects` | 301 do `/curitiba/cic` + rewrite SPA |

### Comportamento do `useSEO`

- Reescreve **ou remove** o `<link rel="canonical">` a cada rota (evita herança de canonical em SPA).
- `robots`: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`; com `noindex: true` vira `noindex, follow`.
- OG image padrão: `https://www.servicosnobairro.com.br/og-image.png` (1200x630 PNG).
- Geo meta por página: `geo.region` (BR-PR por padrão), `geo.placename`, `geo.position`, `ICBM`.
- JSON-LD é marcado com `data-seo-jsonld` e removido no unmount da rota.

## 2. Constantes globais (`src/hooks/useSEO.ts`)

```
SITE_URL   = https://www.servicosnobairro.com.br
SITE_NAME  = Serviços no Bairro
OG_IMAGE   = /og-image.png
GEO_COORDS = { lat: -25.4284, lng: -49.2733 }  // Curitiba
PHONE_1    = +55-41-99272-1004
PHONE_2    = +55-41-98700-1004
EMAIL      = sac@aloanuncio.com.br
WHATSAPP   = https://wa.me/5541992721004
```

## 3. Schemas por tipo de página

| Página | Schemas |
|---|---|
| Home | WebSite (+SearchAction), Organization, FAQPage |
| `/curitiba` | BreadcrumbList, CollectionPage + ItemList, FAQPage |
| Bairro/Cidade | BreadcrumbList, Service (areaServed = bairro/cidade), FAQPage |
| Serviço | BreadcrumbList, Service + AggregateOffer, FAQPage |
| Empresa | LocalBusiness (ou subtipo), BreadcrumbList, FAQPage |
| Landing | BreadcrumbList, Service, FAQPage (quando há FAQ) |
| Blog artigo | BreadcrumbList, FAQPage |
| Institucionais | BreadcrumbList (+FAQPage em Como Funciona) |

Subtipos de `LocalBusiness` por `tipoServico` (`TIPO_LOCALBUSINESS`):
`desentupimento`/`encanamento` → `Plumber`; `motofrete` → `DeliveryService`;
`lavanderia` → `DryCleaningOrLaundry`; `refrigeracao` → `HVACBusiness`.

Regras de integridade já aplicadas e que devem ser mantidas:

- `@id` persistente por empresa: `{SITE_URL}/empresa/{slug}#business`.
- `aggregateRating` **só** quando `totalAvaliacoes > 0`; nunca inventado em hubs de bairro/serviço.
- NAP (nome/endereço/telefone) sempre da própria empresa, nunca do portal.
- FAQPage apenas quando as perguntas estão visíveis na página.

## 4. Indexação e controle de duplicidade

- `noindex`: `/busca` com qualquer parâmetro e a página 404.
- `robots.txt` bloqueia: `/busca?`, `/*?local=`, `/*?servico=`, `/*?24h=`, `/*?ordenar=`, `/*?q=`, `/*?utm_`.
- Landings de cidade (`/colombo`, `/pinhais`, `/sao-jose-dos-pinhais`) apontam canonical para `/rmc/{slug}` e ficam fora do sitemap.
- `/curitiba/cic` → 301 para `/curitiba/cidade-industrial`.
- Sitemap deduplica URLs entre os quatro arquivos e exclui as não indexáveis.

## 5. Sitemaps

`public/sitemap.xml` é um **sitemapindex** que aponta para:

| Arquivo | Conteúdo | URLs |
|---|---|---|
| `sitemap-pages.xml` | institucionais, hubs, blog (índice, categorias, artigos) | 28 |
| `sitemap-categories.xml` | 48 serviços + 5 landings canônicas | 53 |
| `sitemap-cities.xml` | 129 bairros de Curitiba + 27 cidades RMC + 29 locais de câmera de inspeção | 185 |
| `sitemap-businesses.xml` | 6 perfis de empresa | 6 |

Sem `<lastmod>` (evita timestamp genérico de build). Regenerado automaticamente em `predev` e `prebuild`.

## 6. GEO / SEO local

| Informação | Origem |
|---|---|
| Bairros de Curitiba + regional + vizinhos | `src/data/bairros.ts` |
| Cidades da RMC + distância em km | `src/data/cidades-rmc.ts` |
| Bairros/cidades de São Paulo e Osasco | `src/data/bairros-sp.ts` |
| Cidades e bairros de Santa Catarina | `src/data/cidades-sc.ts` |
| Coordenadas (lat/lng) por bairro | `getCoordenadasBairro()` em `src/data/empresas.ts` |
| Conteúdo local editorial (infraestrutura, Sanepar, fossa, drenagem) | `src/data/perfis-locais.ts` → `PerfilLocalSection.tsx` |
| FAQ por bairro / por cidade | `faq-bairros.ts`, `faq-cidades.ts` |
| `areaServed` das empresas | campos `bairrosAtendidos` e `cidadesAtendidas` em `empresas.ts` |
| Endereço/telefone da empresa | campos `endereco`, `telefone`, `whatsapp`, `cidadeBase`, `estadoBase` em `empresas.ts` |

Regra editorial mantida: bairro é **área geográfica**, nunca endereço de empresa; o portal é diretório e não executa serviços.

## 7. AIO / GEO para IAs

- `public/llms.txt` (resumo curto: identidade, escopo, principais URLs).
- `public/llms-full.txt` (detalhamento de categorias, cidades e empresas).
- Padrão de conteúdo nas páginas: resposta direta curta no topo → serviço → local → empresas → evidências → contato.
- FAQs visíveis com marcação `FAQPage` em quase todas as páginas de conteúdo.

## 8. Links internos

Home → Curitiba/RMC/SP/SC → bairro/cidade → empresa;
Serviço → cidades; Bairro → bairros vizinhos (`vizinhos` em `bairros.ts`);
Empresa → serviços e áreas atendidas; `RelatedLinks.tsx` e `Footer.tsx` distribuem os hubs; breadcrumbs reais em todas as páginas internas.

## 9. Limitação conhecida (importante na migração)

O projeto é **SPA sem SSR**: o HTML inicial entregue pelo servidor contém apenas o hero e o head de `index.html`. Google renderiza JS e lê os metadados dinâmicos, mas crawlers de preview social (WhatsApp, Facebook, X) veem sempre o OG global.
Migrar para uma plataforma com SSR/SSG/prerender resolve isso — e é a única melhoria de SEO pendente.
