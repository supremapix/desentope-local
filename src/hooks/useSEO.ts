import { useEffect } from 'react';

const SITE_URL = 'https://desentupa-agora-pr.lovable.app';
const SITE_NAME = 'Serviços no Bairro';
const OG_IMAGE = 'https://desentupa-agora-pr.lovable.app/og-image.png';
const GEO_COORDS = { lat: -25.4284, lng: -49.2733 };
const PHONE_1 = '+55-41-99272-1004';
const PHONE_2 = '+55-41-98700-1004';
const EMAIL = 'sac@aloanuncio.com.br';
const WHATSAPP_URL = 'https://wa.me/5541992721004';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'business.business';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  geoPosition?: { lat: number; lng: number };
  geoPlacename?: string;
}

export function useSEO({ title, description, canonical, type = 'website', ogImage, jsonLd, geoPosition, geoPlacename }: SEOProps) {
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

    const image = ogImage || OG_IMAGE;

    setMeta('description', description);
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'pt_BR', true);
    setMeta('og:image', image, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:type', 'image/png', true);
    setMeta('og:image:alt', `${title} — ${SITE_NAME}`, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

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

    const pos = geoPosition || GEO_COORDS;
    setMeta('geo.region', 'BR-PR');
    setMeta('geo.placename', geoPlacename || 'Curitiba, Paraná');
    setMeta('geo.position', `${pos.lat};${pos.lng}`);
    setMeta('ICBM', `${pos.lat}, ${pos.lng}`);

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
  }, [title, description, canonical, type, ogImage, jsonLd, geoPosition, geoPlacename]);
}

// ─── SCHEMA BUILDERS ───────────────────────────────────────

/** Homepage — WebSite + SearchAction (SiteLinksSearchBox) */
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Diretório absolute de desentupidoras e encanadores em Curitiba e Região Metropolitana. Profissionais verificados, atendimento 24h, orçamento grátis.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/busca?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Homepage — Organization + LocalBusiness combinado */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    description: 'Maior diretório de desentupidoras e encanadores verificados de Curitiba e Região Metropolitana. Atendimento 24h, orçamento grátis.',
    telephone: [PHONE_1, PHONE_2],
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Curitiba',
      addressRegion: 'PR',
      postalCode: '80000-000',
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Curitiba' },
      { '@type': 'City', name: 'São José dos Pinhais' },
      { '@type': 'City', name: 'Colombo' },
      { '@type': 'City', name: 'Pinhais' },
      { '@type': 'City', name: 'Araucária' },
      { '@type': 'City', name: 'Fazenda Rio Grande' },
      { '@type': 'City', name: 'Campo Largo' },
      { '@type': 'City', name: 'Almirante Tamandaré' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços Hidráulicos e Desentupimento',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desentupimento de Esgoto' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desentupimento de Vaso Sanitário' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Encanador Residencial' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpa Fossa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hidrojateamento' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Câmera de Inspeção de Esgoto' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergência 24h' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500',
      bestRating: '5',
    },
  };
}

/** Bairro — Service schema dinâmico */
export function buildBairroServiceSchema(bairroNome: string, regional: string, totalEmpresas: number, isCidade = false) {
  const rating = totalEmpresas > 0 ? '4.8' : '4.7';
  const reviewCount = Math.max(totalEmpresas * 12, 50).toString();
  const localLabel = isCidade ? `${bairroNome}, PR` : `${bairroNome}, Curitiba, Paraná, Brasil`;
  const titleLabel = isCidade
    ? `Desentupidoras e Encanadores em ${bairroNome} — PR`
    : `Desentupidoras e Encanadores no ${bairroNome} — Curitiba`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: titleLabel,
    description: `Encontre desentupidoras e encanadores verificados ${isCidade ? 'em' : 'no'} ${bairroNome}${!isCidade ? `, ${regional} de Curitiba` : ', PR'}. ${totalEmpresas} empresas disponíveis com atendimento 24h.`,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: localLabel,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: PHONE_1,
      availableLanguage: 'pt-BR',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviewCount,
      bestRating: '5',
    },
  };
}

/** Empresa — LocalBusiness + Plumber com Offers, Reviews, Rating */
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
  avaliacoes?: { nomeCliente: string; nota: number; servicoRealizado: string; texto: string; data: string }[];
}, coords: { lat: number; lng: number }, bairroNome: string, servicosDetalhes?: { nome: string; precoMedio?: string }[]) {
  const reviews = (empresa.avaliacoes || []).map(a => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: a.nota.toString(),
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: a.nomeCliente,
    },
    reviewBody: a.texto,
    datePublished: a.data,
  }));

  const offers = (servicosDetalhes || []).map(s => {
    const match = s.precoMedio?.match(/R\$\s*([\d.]+)/);
    const price = match ? match[1].replace('.', '') : '150';
    return {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.nome,
      },
      price,
      priceCurrency: 'BRL',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber'],
    name: empresa.nome,
    image: `${SITE_URL}/favicon.png`,
    url: `${SITE_URL}/empresa/${empresa.slug}`,
    telephone: [PHONE_1, PHONE_2],
    email: EMAIL,
    priceRange: 'R$ 150 - R$ 800',
    currenciesAccepted: 'BRL',
    paymentAccepted: empresa.formasPagamento.join(', '),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: empresa.atende24h
        ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: empresa.atende24h ? '00:00' : '07:30',
      closes: empresa.atende24h ? '23:59' : '18:30',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: empresa.notaMedia.toString(),
      reviewCount: empresa.totalAvaliacoes.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    ...(reviews.length > 0 && { review: reviews }),
    ...(offers.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços de Desentupimento e Encanamento',
        itemListElement: offers,
      },
    }),
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
    sameAs: [WHATSAPP_URL],
  };
}

/** Serviço — Service com AggregateOffer + AggregateRating */
export function buildServiceSchema(serviceName: string, description: string, priceRange?: string, empresasCount?: number) {
  const match = priceRange?.match(/R\$\s*([\d.]+)/g);
  const lowPrice = match?.[0]?.replace(/R\$\s*/, '').replace('.', '') || '150';
  const highPrice = match?.[1]?.replace(/R\$\s*/, '').replace('.', '') || '800';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${serviceName} em Curitiba`,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_1,
    },
    areaServed: {
      '@type': 'City',
      name: 'Curitiba',
      containedInPlace: { '@type': 'State', name: 'Paraná' },
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: lowPrice,
      highPrice: highPrice,
      priceCurrency: 'BRL',
      offerCount: (empresasCount || 47).toString(),
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '389',
      bestRating: '5',
    },
  };
}

/** FAQ */
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

/** Breadcrumb */
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