# Checklist automático — cada nova empresa cadastrada

Executar TODOS os passos abaixo, sempre, a cada nova empresa ou nova categoria.

## 1. Cadastro
- Adicionar o objeto `Empresa` ao **final** do array `empresasReais` em `src/data/empresas.ts`
  (o final = mais recente; a home lista automaticamente as últimas cadastradas em "Empresas em Destaque").
- Preencher: slug, nome, logo próprio, fotos, descrição curta + longa (SEO), whatsapp, telefone,
  email, endereço, site, `youtubeVideoId` (se houver vídeo), horários, formas de pagamento,
  `verificada`, `destaque: true`, `atende24h`, `atendeEmergencia`, `anosExperiencia`,
  `notaMedia`/`totalAvaliacoes`, redes sociais.

## 2. Categoria / tipo de serviço
- Se for um segmento novo: adicionar o valor em `tipoServico` no tipo `Empresa`
  (`src/types/index.ts`) e nos rótulos de `src/components/CompanyCard.tsx` e `src/pages/EmpresaPage.tsx`.
- Criar/atualizar os serviços em `src/data/servicos.ts` (inclusive `categoriasRapidas` — seção
  "O que você precisa?" da home) com ícone próprio registrado em `src/components/ServiceIcon.tsx`.

## 3. Logo/ícone
- Gerar o logo próprio em `public/logos/logo-<empresa>.png` (fundo transparente) e usar em
  `logo` + `fotos`. Nunca reaproveitar ícone de outro segmento.

## 4. Filtros e busca
- `src/pages/BuscaPage.tsx`: garantir que a categoria aparece no filtro de tipo de serviço
  e que a empresa entra no pool de resultados (empresas reais são incluídas automaticamente).
- `src/components/SearchBar.tsx`: incluir bairros/cidades novos no `datalist` de locais.
- `src/data/empresas.ts`: preencher `bairrosAtendidos` e `cidadesAtendidas` com todos os slugs
  de cobertura; excluir a empresa das listagens de segmentos que ela não atende.
- Se a cidade/bairro ainda não existir, criar o dataset (ex.: `src/data/bairros-sp.ts`) e ligar
  na home, no SearchBar e na normalização de local da BuscaPage.

## 5. SEO / GEO
- Metadados via `useSEO` na página de perfil (title, description, canonical, JSON-LD
  LocalBusiness/Service/Breadcrumb/VideoObject quando houver vídeo).
- Links internos: home, página de serviço, bairros/cidades atendidas.
- Atualizar `public/llms.txt` com a nova empresa/categoria.

## 6. Sitemap e validação
- `npm run predev` (ou o script de sitemap) para regenerar `public/sitemap.xml`.
- Rodar `npx tsgo --noEmit`.
- Validar as rotas novas (perfil, serviço, busca por local) no preview.
