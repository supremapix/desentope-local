## Antes de tudo: um alerta honesto

O pedido, como está, geraria dezenas de milhares de páginas (serviço × bairro × cidade × problema). Em um domínio novo, isso quase sempre resulta em **"Descoberto - no momento não indexado"** no Search Console: o Google rastreia, considera conteúdo raso/duplicado e não indexa nada — inclusive prejudicando as páginas boas que já existem.

Além disso, o site hoje é uma **SPA Vite sem SSR**: o Googlebot renderiza JS, mas ChatGPT, Perplexity, Claude e os crawlers de preview social **não executam JavaScript**. Ou seja, hoje eles veem uma página em branco. Para o objetivo "ser citado por IA", isso é o bloqueio número 1 — mais importante que qualquer volume de páginas.

Minha recomendação: **menos páginas, mais profundas, e resolver a renderização primeiro**.

## Estado atual (análise)

- Rotas: home, `/curitiba/:bairro`, `/rmc/:cidade`, `/empresa/:slug`, `/servicos/:slug`, 8 landings fixas, FAQ, busca, cadastro, anuncie, privacidade, termos.
- Nicho atual: **apenas hidráulica** (desentupimento + encanamento), 22 serviços.
- SEO: hook `useSEO` com JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb), `robots.txt` e `llms.txt` já liberando GPTBot/ClaudeBot/PerplexityBot. Boa base.
- Problemas: sitemap estático com `lastmod` uniforme e defasado, `index.html` com comentários TODO, sem `manifest`, sem preconnect/preload, conteúdo por bairro majoritariamente templatizado.

## Fase 1 — Fundação técnica (o que realmente destrava IA e Google)

1. **Migrar para SSR/SSG (TanStack Start)** — única forma de ChatGPT/Perplexity/Claude lerem o conteúdo. [O que o upgrade traz](https://lovable.dev/blog/building-apps-using-tanstack-start). Alternativa mais barata: pré-renderização estática das rotas no build (`vite-plugin-prerender`), mantendo o stack atual.
2. Limpar `index.html` (TODOs, tags duplicadas), adicionar `manifest.webmanifest`, `preconnect`, `preload` do LCP.
3. Trocar o `sitemap.xml` estático pelo gerador em `scripts/generate-sitemap.ts` ligado a `predev`/`prebuild`, removendo `lastmod` fabricado.
4. Corrigir domínio canônico único (`www.servicosnobairro.com.br`) em canonical, og:url, sitemap e robots.
5. Core Web Vitals: code splitting por rota (`React.lazy`), imagens em WebP/AVIF com `loading="lazy"` e `width/height` (evita CLS), fontes com `font-display: swap`.

## Fase 2 — Conteúdo profundo no nicho que você já domina

Antes de abrir 50 profissões, ganhar as buscas de hidráulica:

- **10 a 15 páginas substanciais**, não milhares: `desentupidora-curitiba`, `encanador-24h-curitiba`, `desentupidora-perto-de-mim`, `quanto-custa-desentupimento-curitiba`, `limpa-fossa-curitiba`, + as 8 a 10 cidades RMC de maior volume.
- Cada uma com: tabela de preços real, tempo médio de atendimento, o que está incluso, quando é emergência, FAQ específico, empresas verificadas da região.
- **Páginas de bairro**: manter apenas os ~25 bairros com demanda real (Centro, Batel, Água Verde, Cabral, Portão, CIC, Sítio Cercado, Boqueirão, Cajuru, Santa Felicidade...), cada uma com conteúdo próprio — problemas hidráulicos típicos da região, tempo de deslocamento, empresas que atendem. Os demais bairros viram seções dentro da página da regional, não URLs próprias.
- **Blog / Content Hub**: 8 a 12 guias reais (não 200 posts finos), ex.: "Quanto custa desentupir em Curitiba em 2026", "Como saber se o entupimento é seu ou da Sanepar", "Caixa de gordura: com que frequência limpar".

## Fase 3 — Schema e GEO (otimização para IA)

- `Organization` + `WebSite` com `SearchAction` no `index.html`.
- Por rota: `LocalBusiness`/`Plumber` com `geo`, `areaServed`, `openingHours`; `Service` com `offers`; `FAQPage`; `BreadcrumbList`; `ItemList` nas listagens; `Article` no blog.
- `speakable` nos blocos de resposta direta.
- Formato "resposta primeiro": cada página abre com um parágrafo de 40-60 palavras respondendo objetivamente a query — é o formato que AI Overviews e Perplexity citam.
- Atualizar `llms.txt` com um índice curado das páginas-âncora.

## Fase 4 — EEAT e malha interna

- Criar `/quem-somos`, `/como-funciona`, `/como-selecionamos-profissionais`, `/politica-editorial`, `/contato`.
- Componente de links relacionados reutilizável: cada página aponta para 4-6 páginas irmãs (bairros vizinhos, serviços relacionados, guia do blog correspondente).
- Reviews em Schema **apenas** de avaliações reais e verificáveis — Review falso é penalidade manual.

## Fase 5 — Expansão (só depois de indexação comprovada)

Ampliar profissões (eletricista, pintor, chaveiro, dedetização...) e cidades **por lote**, medindo indexação de cada lote no Search Console antes do próximo. Expandir para PR/SC/SP/RS só quando Curitiba estiver rankeando.

## Detalhes técnicos

- Nada de identidade visual alterada; todos os componentes existentes (`CompanyCard`, `SearchBar`, `FaqPremium`, `useSEO`) são reutilizados.
- Conteúdo novo entra como dados tipados em `src/data/`, renderizado pelas páginas já existentes — sem rotas duplicadas.
- `vercel.json` e `public/_redirects` são ignorados pela hospedagem Lovable (o fallback SPA é automático); mantidos apenas se você publica também na Vercel.
- Sem geração programática de páginas sem conteúdo único.

## Como quero começar

Sugiro executar a **Fase 1 + Fase 3** agora (fundação técnica + schema/GEO), que beneficiam tudo o que já existe, e depois a Fase 2. Me diga se prefere outra ordem — ou se realmente quer o volume massivo de páginas mesmo com o risco descrito.
