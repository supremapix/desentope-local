import { useEffect } from 'react';

const SITE_URL = 'https://servicosnobairro.com.br';
const SITE_NAME = 'Serviços no Bairro';
const GEO_COORDS = { lat: -25.4284, lng: -49.2733 };

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  geoPosition?: { lat: number; lng: number };
  geoPlacename?: string;
}

export function useSEO({ title, description, canonical, type = 'website', jsonLd, geoPosition, geoPlacename }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    if (canonical) {
      setMeta('og:url', `${SITE_URL}${canonical}`, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = `${SITE_URL}${canonical}`;
    }

    // Geo meta tags
    const pos = geoPosition || GEO_COORDS;
    setMeta('geo.region', 'BR-PR');
    setMeta('geo.placename', geoPlacename || 'Curitiba, Paraná');
    setMeta('geo.position', `${pos.lat};${pos.lng}`);
    setMeta('ICBM', `${pos.lat}, ${pos.lng}`);

    // JSON-LD
    if (jsonLd) {
      const existing = document.querySelectorAll('script[data-seo-jsonld]');
      existing.forEach(el => el.remove());
      
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach(item => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'true');
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach(el => el.remove());
    };
  }, [title, description, canonical, type, jsonLd, geoPosition, geoPlacename]);
}

// JSON-LD builders
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Diretório de desentupidoras e encanadores em Curitiba e Região Metropolitana. Profissionais verificados, atendimento 24h, orçamento grátis.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/busca?local={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildLocalBusinessSchema(empresa: {
  nome: string;
  slug: string;
  descricao: string;
  telefone: string;
  email?: string;
  notaMedia: number;
  totalAvaliacoes: number;
  servicosOferecidos: string[];
  formasPagamento: string[];
  atende24h: boolean;
}, coords: { lat: number; lng: number }, bairroNome: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: empresa.nome,
    description: empresa.descricao,
    url: `${SITE_URL}/empresa/${empresa.slug}`,
    telephone: empresa.telefone,
    email: empresa.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Curitiba',
      addressRegion: 'PR',
      addressCountry: 'BR',
      streetAddress: bairroNome,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: empresa.notaMedia,
      reviewCount: empresa.totalAvaliacoes,
      bestRating: 5,
    },
    openingHoursSpecification: empresa.atende24h
      ? { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }
      : { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '18:30' },
    paymentAccepted: empresa.formasPagamento.join(', '),
    areaServed: {
      '@type': 'City',
      name: 'Curitiba',
    },
    priceRange: 'R$ 100 - R$ 1.200',
  };
}

export function buildFAQSchema(items: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.resposta,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildServiceSchema(serviceName: string, description: string, priceRange?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Curitiba',
      containedInPlace: { '@type': 'State', name: 'Paraná' },
    },
    ...(priceRange && { offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'BRL', price: priceRange } } }),
  };
}
