# POST-MIGRATION-SEO-CHECKLIST.md — Checklist Operacional Pós-Migração

Este checklist operacional deve ser executado pelo responsável técnico/SEO logo após a conclusão da migração de hospedagem do portal **Serviços no Bairro** (`https://www.servicosnobairro.com.br`).

O objetivo é garantir que nenhuma URL, canônico, redirecionamento ou indexação sofra volatilidade ou perda no Google Search Console.

---

## 1. Verificação Imediata (D+0 — Primeiras 2 horas)

### 1.1 Status HTTP 200 nas Páginas-Chave (Páginas Pilares)
Acesse ou execute teste com curl/ferramenta de status nas seguintes URLs prioritárias:
- [ ] `https://www.servicosnobairro.com.br/` (Home) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/curitiba` (Hub Curitiba) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/curitiba/cidade-industrial` (Bairro maior) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/curitiba/batel` (Bairro de alta demanda) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/rmc/sao-jose-dos-pinhais` (Cidade RMC) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/servicos/desentupimento-curitiba` (Landing pilar) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/servicos/camera-inspecao-esgoto-curitiba` (Serviço pilar) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/empresa/agua-facil-desentupidora-encanador-24h` (Perfil empresa) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/blog` (Blog Hub) -> **200 OK**
- [ ] `https://www.servicosnobairro.com.br/blog/quanto-custa-desentupimento-curitiba` (Artigo monetização) -> **200 OK**

### 1.2 Verificação de Redirecionamento 301
- [ ] Testar acesso a: `https://www.servicosnobairro.com.br/curitiba/cic`
  - Deve redirecionar **imediatamente com código 301** para `https://www.servicosnobairro.com.br/curitiba/cidade-industrial`.
  - O destino final deve carregar com HTTP 200.
- [ ] Testar acesso com HTTP simples: `http://servicosnobairro.com.br` -> deve ir para `https://www.servicosnobairro.com.br` (301).
- [ ] Testar acesso com apex HTTPS: `https://servicosnobairro.com.br` -> deve ir para `https://www.servicosnobairro.com.br` (301).

### 1.3 Verificação dos Arquivos Estáticos de Rastreamento
- [ ] `https://www.servicosnobairro.com.br/robots.txt`
  - Validar se `User-agent: *` permite `/`.
  - Validar se `Sitemap: https://www.servicosnobairro.com.br/sitemap.xml` está presente na última linha.
  - Validar se os parâmetros de busca (`/busca?`, `/*?local=`, etc.) continuam em `Disallow`.
- [ ] `https://www.servicosnobairro.com.br/sitemap.xml`
  - Validar se carrega como XML e lista os 4 subsitemaps (`sitemap-pages.xml`, `sitemap-categories.xml`, `sitemap-cities.xml`, `sitemap-businesses.xml`).
  - Validar se todos os 4 sitemaps retornam 200 OK e somam 272 URLs.
- [ ] `https://www.servicosnobairro.com.br/llms.txt` e `llms-full.txt`
  - Validar se retornam 200 OK com texto legível para agentes de IA.

---

## 2. Auditoria no DOM Renderizado (D+1)

Como o site é uma SPA, o Googlebot renderiza o JavaScript para indexar. Use a ferramenta **Inspeção de URL** no Google Search Console ou DevTools do navegador:

### 2.1 Tags Canônicas
- [ ] Inspecionar a tag `<link rel="canonical" href="...">` no `<head>`:
  - Todas as 272 URLs do sitemap devem ter canonical autorreferencial exato (com `https://www.servicosnobairro.com.br`).
  - As URLs especiais (`/sao-jose-dos-pinhais`, `/colombo`, `/pinhais`) devem apontar canônico para `/rmc/:slug`.
  - Não deve haver canônicos duplicados no `<head>`.
  - Em transições de página na SPA, o canônico anterior deve ser removido/substituído pelo novo (comportamento garantido pelo `useSEO.ts`).

### 2.2 Meta Robots e Noindex
- [ ] Verificar se `<meta name="robots" content="index, follow, ...">` está ativo nas 272 páginas indexáveis.
- [ ] Confirmar que `noindex` está aplicado **APENAS** em:
  - Página 404 (`NotFound.tsx`)
  - Páginas de busca com parâmetros/filtros (`/busca?q=...`)

### 2.3 Dados Estruturados Schema.org (JSON-LD)
- [ ] Testar na ferramenta oficial: [Validador de Esquema do Google (Rich Results Test)](https://search.google.com/test/rich-results)
  - Home: `LocalBusiness` / `Organization` e `BreadcrumbList`.
  - Páginas de Bairro e Cidades: `LocalBusiness` com coordenadas geográficas locais e `BreadcrumbList`.
  - Páginas de Serviço: `Service` e `FAQPage`.
  - Artigos de Blog: `BlogPosting` e `BreadcrumbList`.
  - Empresas: `LocalBusiness` com CNPJ, endereço e avaliações.

### 2.4 Compartilhamento Social e Open Graph (WhatsApp / Facebook)
- [ ] Enviar links no WhatsApp para testar a renderização do card:
  - Imagem `og:image` de 1200x630px deve aparecer com prévia nítida.
  - Título e descrição devem corresponder ao conteúdo da página.
  - Testar tanto para uma página de bairro quanto para um artigo de blog.

---

## 3. Acompanhamento no Google Search Console (D+1 a D+14)

### 3.1 Reenvio e Leitura dos Sitemaps
- [ ] Acessar **Sitemaps** no Google Search Console.
- [ ] Reenviar o índice `https://www.servicosnobairro.com.br/sitemap.xml`.
- [ ] Verificar se o status exibe **"Sucesso"** e o total de 272 URLs descobertas.

### 3.2 Teste em Tempo Real (Live Test)
- [ ] No GSC, clicar em **Inspecionar URL** na Home, em 1 Bairro e em 1 Serviço.
- [ ] Clicar em **Testar URL ao vivo**.
- [ ] Verificar a aba **Página renderizada** (Screenshot) para garantir que o layout carrega completamente sem bloquear recursos críticos.
- [ ] Verificar a aba **Mais informações > Recursos de página** para assegurar que nenhum bundle `.js` ou CSS essencial esteja bloqueado pelo `robots.txt`.

### 3.3 Monitoramento de Cobertura e Indexação (D+3 a D+14)
- [ ] **Aba "Páginas" (Indexação):**
  - Monitorar se o número de páginas indexadas permanece estável (~272 páginas).
  - Verificar se não surgem alertas de *"Página com redirecionamento"* indevidos ou *"Soft 404"*.
  - Verificar se *"Rastreada, mas não indexada no momento"* não tem aumentos anormais.
- [ ] **Aba "Desempenho":**
  - Acompanhar cliques e impressões diárias. Pequenas flutuações de 5% a 10% são comuns na semana de troca de DNS/IP, mas a curva deve se manter linear.
- [ ] **Principais Palavras-chave:**
  - Conferir se posições para termos estratégicos (ex.: "desentupidora curitiba", "camera de inspeção de esgoto curitiba", "encanador agua verde") mantêm a mesma colocação nas SERPs.
