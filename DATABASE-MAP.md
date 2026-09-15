# DATABASE-MAP.md — Banco de dados, autenticação, storage e funções

## Resumo executivo

**Este projeto NÃO possui banco de dados.**
Não há Supabase, Lovable Cloud, Firebase, API própria, CMS ou backend de qualquer tipo.

Verificação feita no workspace:

- Não existe diretório `supabase/`, nem `src/integrations/`, nem cliente Supabase instalado (`package.json` não contém `@supabase/supabase-js`).
- Não existem Edge Functions, migrations, policies (RLS), buckets, triggers, views ou roles.
- Não existe autenticação: não há login, cadastro de usuário, sessão, cookie de auth, nem área administrativa.
- Não existe upload de arquivos em runtime; todas as imagens são arquivos versionados em `public/`.
- Não há secrets no código. Nenhuma variável de ambiente é lida (`import.meta.env` customizado inexistente).

## Onde os "dados" realmente vivem

Todo o conteúdo é **estático, tipado em TypeScript**, compilado no bundle:

| "Tabela" lógica | Arquivo | Registros | Chave |
|---|---|---|---|
| Empresas/anunciantes | `src/data/empresas.ts` (`empresasReais` → export `empresas`) | 6 | `slug` |
| Serviços | `src/data/servicos.ts` (`servicos`) | 48 | `slug` |
| Categorias rápidas | `src/data/servicos.ts` (`categoriasRapidas`) | 20 (subconjunto de serviços) | `slug` |
| Bairros de Curitiba | `src/data/bairros.ts` (`bairros`, `bairrosPopularesData`, `todosBairros`) | 102 + 27 = 129 | `slug` |
| Regionais de Curitiba | `src/data/bairros.ts` (`regionais`) | 9 | nome |
| Cidades da RMC | `src/data/cidades-rmc.ts` (`cidadesRMC`, `entornoAmplo`) | 27 + 6 | `slug` |
| Bairros/cidades de SP | `src/data/bairros-sp.ts` | 49 bairros SP, 21 cidades Grande SP, 32 bairros região Osasco | `slug` |
| Cidades/bairros de SC | `src/data/cidades-sc.ts` | 23 cidades, 52 bairros | `slug` |
| Perfis locais (conteúdo geográfico) | `src/data/perfis-locais.ts` | 10 regionais + 18 cidades RMC | `slug` |
| Landing pages | `src/data/landing-pages.ts` | 8 | `route` |
| Blog | `src/data/blog.ts` | 9 artigos, 3 categorias | `slug` |
| FAQ geral / por bairro / cidade / serviço | `faq.ts`, `faq-bairros.ts`, `faq-cidades.ts`, `faq-servicos.ts` | geradas por função | `slug` |
| Conteúdo câmera de inspeção | `src/data/camera-inspecao.ts` | 32 FAQs, 30 locais | `slug` |
| Conteúdo cervejeira | `src/data/cervejeira.ts` | 8 FAQs, 23 cidades | — |

Tipos canônicos: `src/types/index.ts` (`Empresa`, `Servico`, `Bairro`, `CidadeRMC`, `Avaliacao`, `HorarioFuncionamento`, `FAQItem`, `FAQCategoria`).

### "Consultas" (funções que substituem SQL) — `src/data/empresas.ts`

- `getEmpresaBySlug(slug)`
- `getEmpresasPorBairro(bairroSlug)`
- `getEmpresasPorCidade(cidadeSlug)`
- `getEmpresasPorServico(servicoSlug)`
- `getEmpresasDestaque(limite = 4)` — retorna as **últimas cadastradas** (array invertido)
- `getWhatsAppLink(empresaSlug, bairroSlug, empresaNome, bairroNome, cidade)`
- `getCoordenadasBairro(slug)` — mapa estático de lat/lng por bairro

## Variáveis a configurar manualmente no novo ambiente

Nenhuma é obrigatória para o site funcionar como está hoje. Ver `.env.example`.
Valores hoje hardcoded que devem ser revisados após a migração:

| Valor | Onde está |
|---|---|
| Domínio canônico `https://www.servicosnobairro.com.br` | `src/hooks/useSEO.ts` (`SITE_URL`), `scripts/generate-sitemap.ts` (`BASE_URL`), `public/robots.txt`, `public/sitemap*.xml`, `index.html` |
| Google Site Verification | `index.html` (`<meta name="google-site-verification">`) |
| Telefones e e-mail do portal | `src/hooks/useSEO.ts` (`PHONE_1`, `PHONE_2`, `EMAIL`, `WHATSAPP_URL`) |

## Se for necessário criar banco depois da migração

Modelo mínimo equivalente ao conteúdo atual: `empresas`, `servicos`, `empresa_servicos`, `locais` (cidade/bairro), `empresa_areas`, `avaliacoes`, `artigos`, `faqs`.
Enquanto isso não existir, **preservar os arquivos `src/data/*.ts` intactos** — eles são a fonte de verdade de 100% do conteúdo publicado.
