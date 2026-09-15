# SITE-MASTER.md — Como o site funciona

## 1. Identidade

- **Nome:** Serviços no Bairro (alternativo: Empresas no Bairro)
- **Domínio:** https://www.servicosnobairro.com.br
- **Posicionamento:** "Encontre serviços, empresas e profissionais perto de você."
- **Natureza:** DIRETÓRIO / MARKETPLACE de prestadores locais. O portal **não executa** nenhum serviço anunciado — essa regra aparece em textos, schemas e políticas e não pode ser removida.
- **Idioma:** pt-BR. **Mercados:** Curitiba e RMC (núcleo), São Paulo/Grande SP/Osasco, litoral norte e Vale do Itajaí (SC), com estrutura pronta para expansão nacional.
- **Contato do portal:** (41) 99272-1004 / (41) 98700-1004 · sac@aloanuncio.com.br · WhatsApp 5541992721004

## 2. Objetivo do produto

Usuário busca um serviço por cidade ou bairro → encontra empresas reais com perfil, áreas atendidas, horários e avaliações → fala direto com a empresa por WhatsApp ou telefone. Empresas entram pelo fluxo "Anuncie aqui / Cadastrar empresa".

## 3. Design system

- **Tipografia:** Inter (Google Fonts, carregada de forma não bloqueante em `index.html`), `font-sans` no Tailwind.
- **Tokens HSL em `src/index.css`** (claro e escuro), consumidos por `tailwind.config.ts`. Nunca usar cor hardcoded em componente.

| Token | Valor (claro) | Uso |
|---|---|---|
| `--primary` | `224 82% 47%` | azul institucional, hero, CTAs |
| `--secondary` | `24 100% 38%` | laranja de urgência |
| `--accent` | `145 100% 26%` | verde WhatsApp/confirmação |
| `--destructive` | `0 72% 44%` | alertas |
| `--muted` | `214 20% 94%` | fundos de seção |
| `--radius` | `0.625rem` | raio base |

- Animações extras: `animate-pulse-slow`, `animate-heartbeat` (botão WhatsApp), transições de rota em `PageTransition.tsx`.
- Biblioteca de UI: **shadcn/ui** (49 componentes em `src/components/ui/`) sobre Radix UI; ícones **lucide-react**.
- Responsividade: mobile-first com breakpoints Tailwind padrão, container centralizado com máximo de 1400px; hook `use-mobile` para variações de layout.

## 4. Mapa de componentes

| Componente | Usado em | Dados recebidos | Dependências | Função |
|---|---|---|---|---|
| `Header` | global (`App.tsx`) | — | `NavLink`, react-router | navegação principal e menu mobile |
| `Footer` | global | `servicos`, bairros, cidades | react-router | links internos por categoria, cidade, institucional |
| `EmergencyBanner` | global | — | — | faixa de atendimento emergencial |
| `WhatsAppFloating` / `WhatsAppButton` | global e páginas | telefone, mensagem | `getWhatsAppLink` | contato direto com mensagem pré-preenchida |
| `ScrollToTop` | global | — | router | reseta scroll na troca de rota |
| `PageTransition` | global | children | — | animação de entrada |
| `SearchBar` | Home, Busca, hubs | listas de serviços e locais | dados de bairros/cidades SP/RMC/SC | dois campos: "O que você precisa?" e "Onde você precisa?" |
| `CompanyCard` | Home, Busca, bairro, serviço | `Empresa` | `RatingStars`, `ServiceIcon`, logo da empresa | card de anunciante com CTA |
| `RatingStars` | `CompanyCard`, `EmpresaPage` | nota, total | — | exibe avaliações reais |
| `ServiceIcon` | catálogos e cards | nome do ícone | lucide-react | ícone por categoria (inclui moto/pacote/refrigeração) |
| `PerfilLocalSection` | `BairroPage` | perfil de `perfis-locais.ts` | — | conteúdo geográfico único por bairro/cidade |
| `RelatedLinks` | várias páginas | lista de links | router | links internos contextuais |
| `FaqPremium` | páginas de conteúdo | perguntas/respostas | shadcn accordion | FAQ visível sincronizada com FAQPage schema |
| `DicasRapidas` | páginas de serviço | textos | — | blocos de orientação |
| `NavLink` | `Header` | href, label | router | link com estado ativo |

## 5. Navegação e estrutura de URLs

```
/  → /curitiba → /curitiba/{bairro}
                /rmc/{cidade}
   → /servicos/{slug}  (48 serviços + 3 pilares + 5 landings)
   → /empresa/{slug}
   → /blog → /blog/categoria/{slug} → /blog/{slug}
   → /busca (filtros, noindex com parâmetros)
   → institucionais: /quem-somos /como-funciona /como-selecionamos-profissionais
                     /politica-editorial /contato /privacidade /termos
   → comercial: /anuncie-aqui /cadastrar-empresa
```
Detalhamento completo em `ROUTES-MAP.md`.

## 6. Categorias, serviços, locais e anunciantes

- **5 categorias de serviço:** desentupimento, encanamento, motofrete, lavanderia, refrigeração (`Servico.categoria`).
- **48 serviços** em `src/data/servicos.ts`; 20 deles aparecem como "categorias rápidas" na home e no hub.
- **Locais:** 129 bairros de Curitiba (9 regionais), 27 cidades da RMC (+6 de entorno), 49 bairros de São Paulo, 21 cidades da Grande SP, 32 bairros na região de Osasco, 23 cidades e 52 bairros em SC.
- **6 empresas cadastradas:** Água Fácil (desentupimento/encanamento 24h, Curitiba+RMC), ADP Serviços Hidráulicos, Encanador 24h Palladium, Motofrete São Paulo/Curitiba, Lavanderia Inovata (Osasco), Santa Catarina Refrigeração (Navegantes).
- Empresas em destaque na home são **as últimas cadastradas** (`getEmpresasDestaque` inverte o array).

## 7. Funcionalidades

| Recurso | Como funciona |
|---|---|
| Busca | `SearchBar` monta querystring e navega para `/busca`; `BuscaPage` filtra o array de empresas em memória |
| Filtros | serviço, local, 24h, ordenação — tudo client-side, com `fieldset/legend/ARIA` e contagem de resultados; URL com parâmetro vira `noindex` |
| Página de empresa | perfil completo: descrição, serviços, áreas, horários, avaliações, vídeo (YouTube ID ou MP4 com fonte alternativa e poster), site, mapa/links, FAQ própria |
| WhatsApp | `getWhatsAppLink` monta `https://wa.me/...` com mensagem contextual (empresa + bairro + cidade) |
| Cadastro de empresa / Anuncie aqui | páginas de conversão que encaminham o contato por WhatsApp/e-mail — **não há backend, formulário não grava em banco** |
| Blog | 9 artigos e 3 categorias em `blog.ts`, com seções, tabelas e FAQ por artigo |
| Páginas geográficas | `BairroPage` decide entre modo bairro (`/curitiba/...`) e modo cidade (`/rmc/...`) pela rota |
| Login / admin / uploads / mapas interativos | **não existem** |

## 8. Regras de conteúdo (não violar na migração)

1. Nunca afirmar que o portal executa os serviços.
2. Nunca inventar avaliações, CNPJ verificado, garantia, atendimento 24h ou tempo de resposta para empresas que não declararam isso.
3. Bairro é área geográfica; jamais usar como endereço fictício de empresa.
4. Nada de doorway pages: não gerar todas as combinações serviço × bairro × cidade; página sem empresa ou sem conteúdo real fica fora do índice.
5. Conteúdo local precisa ser específico (`perfis-locais.ts`), não troca de nome de bairro.
6. Não misturar NAP entre empresas diferentes.

## 9. SEO, GEO, AIO e schema

Resumo em `SEO-MAP.md`. Pontos-chave: canonical reescrito por rota em `useSEO`, quatro sitemaps num index, `robots.txt` bloqueando URLs parametrizadas, `llms.txt`/`llms-full.txt`, schemas WebSite/Organization/CollectionPage/Service/LocalBusiness/FAQPage/BreadcrumbList com `@id` persistentes.

## 10. Integrações externas

WhatsApp (wa.me), YouTube (embed por ID), vídeos MP4 em `img.supremasite.com.br`, Google Fonts, Google Search Console (meta de verificação). Nenhuma chave de API é usada.
