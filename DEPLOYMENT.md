# DEPLOYMENT.md — Guia de Deploy e Infraestrutura

Este documento especifica os requisitos de infraestrutura e hospedagem para o portal **Serviços no Bairro**, garantindo que a migração para qualquer provedor (Vercel, Cloudflare Pages, Netlify, AWS CloudFront + S3, Nginx ou Google Cloud Run) preserve 100% da integridade técnica e do patrimônio de SEO.

---

## 1. Informações Básicas do Projeto

- **Domínio Canônico:** `https://www.servicosnobairro.com.br`
- **Protocolo Obrigatório:** HTTPS com HSTS
- **Padronização de Subdomínio:** Redirecionamento 301 de `servicosnobairro.com.br` (apex / non-www) para `www.servicosnobairro.com.br`
- **Tipo de Aplicação:** Single Page Application (SPA) estática (React 18 + Vite 5 + Tailwind CSS + TypeScript)
- **Node.js Runtime Recomendado:** Node.js 20.x ou 22.x (LTS)

---

## 2. Parâmetros de Build e Saída

- **Comando de Instalação:** `npm install`
- **Comando de Build:** `npm run build`
- **Diretório de Saída (Output Directory):** `dist`
- **Arquivos Estáticos Raiz:** Todos os arquivos da pasta `/public` são copiados para a raiz do `/dist` durante o build do Vite (`robots.txt`, `sitemap.xml`, `sitemap-*.xml`, `llms.txt`, `llms-full.txt`, `og-image.png`, `favicon.png`, `manifest.webmanifest`, `_redirects`).

---

## 3. Regras de Roteamento, Rewrites e Fallback SPA

Como o projeto é uma SPA (Single Page Application) em React Router v6, o servidor web / CDN **deve reescrever todas as rotas não estáticas para `/index.html`** com status HTTP 200:

### 3.1 SPA Fallback Rewrite (Regra Principal)
- **Origem (Pattern):** `/(.*)` (todas as URLs exceto assets estáticos existentes)
- **Destino:** `/index.html`
- **Status:** `200 OK`

### 3.2 Redirecionamento Crítico 301 (Permanent Redirect)
Existe um redirecionamento canônico histórico de bairro que **NÃO pode ser quebrado**:
- **Origem:** `/curitiba/cic`
- **Destino:** `/curitiba/cidade-industrial`
- **Tipo:** `301 Permanent Redirect`
*(Nota: no client-side, o `src/App.tsx` também mantém um `<Navigate to="/curitiba/cidade-industrial" replace />` como fallback defensivo).*

---

## 4. Cabeçalhos HTTP de Segurança e Desempenho

O host de produção deve responder com os seguintes cabeçalhos HTTP:

### 4.1 Cabeçalhos Globais (todas as requisições HTML e rotas):
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 4.2 Cabeçalhos de Cache para Arquivos Estáticos com Hash (`/assets/*`):
```http
Cache-Control: public, max-age=31536000, immutable
```

### 4.3 Cabeçalhos de Cache para Arquivos Raiz (`/index.html`, `/robots.txt`, `/sitemap*.xml`):
```http
Cache-Control: public, max-age=0, must-revalidate
```
*(Garante que atualizações de SEO, sitemaps e código JS novo sejam refletidos imediatamente sem cache stale).*

---

## 5. Tratamento de Erros e 404

1. **Client-side 404:** Qualquer URL que caia no wildcard `*` do React Router aciona o componente `NotFound.tsx`.
2. **Diretiva de Indexação no 404:** O hook `useSEO` aplica dinamicamente `<meta name="robots" content="noindex, follow">` na página 404 e remove a tag canonical para evitar indexação de páginas inexistentes ou soft-404.
3. **No host (Edge/CDN):** Caso o host suporte páginas de erro customizadas, rotas não encontradas devem servir a SPA para que a experiência contextual com opções de busca seja entregue ao usuário.

---

## 6. Arquivos Especiais de SEO e IA

Os seguintes arquivos devem ser servidos diretamente na raiz do domínio sem passar pelo rewrite do React Router:

| Arquivo | Caminho Público | Content-Type | Função |
|---|---|---|---|
| `robots.txt` | `https://www.servicosnobairro.com.br/robots.txt` | `text/plain` | Diretivas de robôs e link do sitemap |
| `sitemap.xml` | `https://www.servicosnobairro.com.br/sitemap.xml` | `application/xml` | Índice de sitemaps (sitemapindex) |
| `sitemap-pages.xml` | `https://www.servicosnobairro.com.br/sitemap-pages.xml` | `application/xml` | 28 URLs institucionais e blog |
| `sitemap-categories.xml` | `https://www.servicosnobairro.com.br/sitemap-categories.xml` | `application/xml` | 53 URLs de serviços e landings |
| `sitemap-cities.xml` | `https://www.servicosnobairro.com.br/sitemap-cities.xml` | `application/xml` | 185 URLs de cidades e bairros |
| `sitemap-businesses.xml` | `https://www.servicosnobairro.com.br/sitemap-businesses.xml` | `application/xml` | 6 URLs de empresas |
| `llms.txt` | `https://www.servicosnobairro.com.br/llms.txt` | `text/plain` | Resumo padronizado para IA/LLMs |
| `llms-full.txt` | `https://www.servicosnobairro.com.br/llms-full.txt` | `text/plain` | Base completa para IA/LLMs |
| `og-image.png` | `https://www.servicosnobairro.com.br/og-image.png` | `image/png` | Imagem OpenGraph global (1200x630) |

---

## 7. Exemplos de Configuração por Provedor

### Vercel (`vercel.json`) — Configuração Atual já testada:
```json
{
  "redirects": [
    {
      "source": "/curitiba/cic",
      "destination": "/curitiba/cidade-industrial",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Netlify / Cloudflare Pages (`public/_redirects`):
```text
/curitiba/cic   /curitiba/cidade-industrial   301!
/*              /index.html                   200
```

### Nginx:
```nginx
server {
    server_name servicosnobairro.com.br;
    return 301 https://www.servicosnobairro.com.br$request_uri;
}

server {
    server_name www.servicosnobairro.com.br;
    root /var/www/servicosnobairro/dist;
    index index.html;

    # 301 Redirect
    location = /curitiba/cic {
        return 301 https://www.servicosnobairro.com.br/curitiba/cidade-industrial;
    }

    # Static Assets Cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # SPA Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
