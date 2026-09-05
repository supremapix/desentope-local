import { useEffect } from 'react';

const SITE_URL = 'https://www.servicosnobairro.com.br';
const SITE_NAME = 'Serviços no Bairro';
const OG_IMAGE = 'https://www.servicosnobairro.com.br/og-image.png';
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
  /** Marca a página como noindex (ex.: 404, resultados de busca). */
  noindex?: boolean;
}

export function useSEO({ title, description, canonical, type = 'website', ogImage, jsonLd, geoPosition, geoPlacename, noindex = false }: SEOProps) {
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
    setMeta(
      'robots',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
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

    // SPA: o canonical precisa ser reescrito OU removido a cada rota, senão a
    // página herda o canonical da rota anterior.
    const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      setMeta('og:url', `${SITE_URL}${canonical}`, true);
      const link = existingCanonical ?? document.createElement('link');
      link.rel = 'canonical';
      link.href = `${SITE_URL}${canonical}`;
      if (!existingCanonical) document.head.appendChild(link);
    } else {
      existingCanonical?.remove();
      document.querySelector('meta[property="og:url"]')?.remove();
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
  }, [title, description, canonical, type, ogImage, jsonLd, geoPosition, geoPlacename, noindex]);
}

// ─── SCHEMA BUILDERS ───────────────────────────────────────

/** Homepage — WebSite + SearchAction (SiteLinksSearchBox) */
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Plataforma para encontrar empresas e profissionais de serviços por categoria, cidade e bairro no Brasil.',
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
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Empresas no Bairro',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      'Serviços no Bairro é um diretório que conecta moradores e empresas a prestadores de serviços locais, organizados por categoria, cidade e bairro. O portal não executa os serviços anunciados.',
    email: EMAIL,
    telephone: [PHONE_1, PHONE_2],
    areaServed: [
      { '@type': 'Country', name: 'Brasil' },
      { '@type': 'City', name: 'Curitiba' },
      { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Curitiba' },
      { '@type': 'City', name: 'São Paulo' },
      { '@type': 'City', name: 'Osasco' },
      { '@type': 'City', name: 'Navegantes' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_1,
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: 'Portuguese',
      },
    ],
    sameAs: [WHATSAPP_URL],
  };
}

/** Bairro — Service schema dinâmico */
export function buildBairroServiceSchema(bairroNome: string, regional: string, totalEmpresas: number, isCidade = false) {
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
  };
}

/** Empresa — LocalBusiness com NAP proprio da empresa (nunca do portal). */
const TIPO_LOCALBUSINESS: Record<string, string> = {
  desentupimento: 'Plumber',
  encanamento: 'Plumber',
  motofrete: 'DeliveryService',
  lavanderia: 'DryCleaningOrLaundry',
  refrigeracao: 'HVACBusiness',
};

export function buildLocalBusinessSchema(empresa: {
  nome: string;
  slug: string;
  descricao: string;
  telefone: string;
  whatsapp?: string;
  email?: string;
  logo?: string;
  site?: string;
  endereco?: string;
  cnpj?: string;
  cidadeBase?: string;
  estadoBase?: string;
  googleMapsUrl?: string;
  tipoServico?: string[];
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

  const tipo = TIPO_LOCALBUSINESS[empresa.tipoServico?.[0] || ''] || 'LocalBusiness';
  const cidade = empresa.cidadeBase || 'Curitiba';
  const uf = empresa.estadoBase || 'PR';
  const sameAs = [
    empresa.site,
    empresa.googleMapsUrl,
    empresa.whatsapp ? `https://wa.me/${empresa.whatsapp}` : undefined,
  ].filter(Boolean) as string[];

  return {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/empresa/${empresa.slug}#business`,
    '@type': tipo === 'LocalBusiness' ? 'LocalBusiness' : ['LocalBusiness', tipo],
    name: empresa.nome,
    description: empresa.descricao,
    image: empresa.logo ? `${SITE_URL}${empresa.logo}` : `${SITE_URL}/og-image.png`,
    ...(empresa.logo && { logo: `${SITE_URL}${empresa.logo}` }),
    url: `${SITE_URL}/empresa/${empresa.slug}`,
    telephone: empresa.telefone,
    ...(empresa.email && { email: empresa.email }),
    ...(empresa.cnpj && { taxID: empresa.cnpj }),
    ...(empresa.site && { mainEntityOfPage: empresa.site }),
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
    ...(empresa.totalAvaliacoes > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: empresa.notaMedia.toString(),
        reviewCount: empresa.totalAvaliacoes.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    }),
    ...(reviews.length > 0 && { review: reviews }),
    ...(offers.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Serviços — ${empresa.nome}`,
        itemListElement: offers,
      },
    }),
    address: {
      '@type': 'PostalAddress',
      ...(empresa.endereco && { streetAddress: empresa.endereco }),
      addressLocality: cidade,
      addressRegion: uf,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    },
    ...(sameAs.length > 0 && { sameAs }),
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
      ...(empresasCount ? { offerCount: empresasCount.toString() } : {}),
      availability: 'https://schema.org/InStock',
    },
  };
}

/** Hub de localidade/categoria — CollectionPage + ItemList.
 *  Sem aggregateRating: um hub nao e um produto avaliado. */
export function buildCollectionPageSchema({
  name,
  description,
  url,
  about,
  items,
}: {
  name: string;
  description: string;
  url: string;
  about?: Record<string, unknown>;
  items: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${url}#webpage`,
    name,
    description,
    url: `${SITE_URL}${url}`,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(about && { about }),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: `${SITE_URL}${item.url}`,
      })),
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