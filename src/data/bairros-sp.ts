import { Bairro, CidadeRMC } from '@/types';

function toSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Bairros de São Paulo (capital) organizados por zona.
 * Usados na cobertura de motofrete e entregas com coleta no Centro de SP
 * e região, em um raio aproximado de 60 km.
 */
export const zonasSaoPaulo: Record<string, string[]> = {
  'Centro': [
    'Sé', 'República', 'Bela Vista', 'Consolação', 'Liberdade', 'Santa Cecília',
    'Bom Retiro', 'Cambuci', 'Brás', 'Pari',
  ],
  'Zona Sul': [
    'Vila Mariana', 'Moema', 'Itaim Bibi', 'Brooklin', 'Campo Belo', 'Saúde',
    'Ipiranga', 'Jabaquara', 'Santo Amaro', 'Morumbi', 'Vila Olímpia', 'Chácara Santo Antônio',
  ],
  'Zona Oeste': [
    'Pinheiros', 'Vila Madalena', 'Perdizes', 'Lapa', 'Butantã', 'Barra Funda',
    'Alto de Pinheiros', 'Jaguaré', 'Vila Leopoldina',
  ],
  'Zona Norte': [
    'Santana', 'Tucuruvi', 'Casa Verde', 'Freguesia do Ó', 'Vila Guilherme',
    'Mandaqui', 'Jaçanã', 'Brasilândia',
  ],
  'Zona Leste': [
    'Tatuapé', 'Mooca', 'Penha', 'Itaquera', 'São Miguel Paulista', 'Vila Prudente',
    'Belém', 'Vila Formosa', 'Aricanduva', 'Guaianases',
  ],
};

export const bairrosSaoPaulo: Bairro[] = Object.entries(zonasSaoPaulo).flatMap(([zona, nomes]) =>
  nomes.map(nome => ({
    slug: `sp-${toSlug(nome)}`,
    nome: `${nome} — São Paulo`,
    regional: `São Paulo / ${zona}`,
    oficial: true,
    vizinhos: nomes.filter(n => n !== nome).slice(0, 4).map(n => `sp-${toSlug(n)}`),
  }))
);

/** Cidades da Grande São Paulo e entorno em até ~60 km do Centro de SP. */
export const cidadesSaoPauloRegiao: CidadeRMC[] = [
  { slug: 'sao-paulo', nome: 'São Paulo', distanciaKm: 0 },
  { slug: 'osasco', nome: 'Osasco', distanciaKm: 17 },
  { slug: 'sao-caetano-do-sul', nome: 'São Caetano do Sul', distanciaKm: 13 },
  { slug: 'santo-andre', nome: 'Santo André', distanciaKm: 18 },
  { slug: 'sao-bernardo-do-campo', nome: 'São Bernardo do Campo', distanciaKm: 21 },
  { slug: 'diadema', nome: 'Diadema', distanciaKm: 20 },
  { slug: 'guarulhos', nome: 'Guarulhos', distanciaKm: 18 },
  { slug: 'taboao-da-serra', nome: 'Taboão da Serra', distanciaKm: 20 },
  { slug: 'barueri', nome: 'Barueri', distanciaKm: 28 },
  { slug: 'carapicuiba', nome: 'Carapicuíba', distanciaKm: 26 },
  { slug: 'cotia', nome: 'Cotia', distanciaKm: 33 },
  { slug: 'maua', nome: 'Mauá', distanciaKm: 28 },
  { slug: 'itapevi', nome: 'Itapevi', distanciaKm: 37 },
  { slug: 'suzano', nome: 'Suzano', distanciaKm: 43 },
  { slug: 'mogi-das-cruzes', nome: 'Mogi das Cruzes', distanciaKm: 52 },
  { slug: 'santana-de-parnaiba', nome: 'Santana de Parnaíba', distanciaKm: 36 },
  { slug: 'embu-das-artes', nome: 'Embu das Artes', distanciaKm: 27 },
  { slug: 'jandira', nome: 'Jandira', distanciaKm: 33 },
  { slug: 'ferraz-de-vasconcelos', nome: 'Ferraz de Vasconcelos', distanciaKm: 38 },
  { slug: 'aruja', nome: 'Arujá', distanciaKm: 42 },
  { slug: 'jundiai', nome: 'Jundiaí', distanciaKm: 58 },
];

export const bairrosSaoPauloSlugs = bairrosSaoPaulo.map(b => b.slug);
export const cidadesSaoPauloSlugs = cidadesSaoPauloRegiao.map(c => c.slug);

export function getBairroSPBySlug(slug: string): Bairro | undefined {
  return bairrosSaoPaulo.find(b => b.slug === slug);
}

/**
 * Bairros de Osasco e bairros vizinhos (São Paulo capital e cidades limítrofes)
 * dentro de um raio aproximado de 10 km do Centro de Osasco.
 * Usados na cobertura da lavanderia profissional em Osasco.
 */
export const bairrosOsascoRegiao: Bairro[] = [
  // Osasco
  ...[
    'Vila Osasco', 'Centro', 'Presidente Altino', 'Vila Yara', 'Jardim das Flores',
    'Bela Vista', 'Vila Campesina', 'Km 18', 'Bonfim', 'City Bussocaba',
    'Jardim Piratininga', 'Vila Yolanda', 'Jaguaribe', 'Munhoz Júnior', 'Rochdale',
    'Quitaúna', 'Novo Osasco', 'Helena Maria', 'Santo Antônio', 'Umuarama',
  ].map(nome => ({
    slug: `osasco-${toSlug(nome)}`,
    nome: `${nome} — Osasco`,
    regional: 'Osasco',
    oficial: true,
    vizinhos: [],
  })),
  // Vizinhos em até ~10 km (São Paulo capital e cidades limítrofes)
  ...[
    ['Lapa', 'São Paulo / Zona Oeste'],
    ['Vila Leopoldina', 'São Paulo / Zona Oeste'],
    ['Jaguaré', 'São Paulo / Zona Oeste'],
    ['Butantã', 'São Paulo / Zona Oeste'],
    ['Pirituba', 'São Paulo / Zona Norte'],
    ['Raposo Tavares', 'São Paulo / Zona Oeste'],
    ['Rio Pequeno', 'São Paulo / Zona Oeste'],
    ['Alphaville', 'Barueri'],
    ['Centro', 'Carapicuíba'],
    ['Cotia Centro', 'Cotia'],
    ['Centro', 'Taboão da Serra'],
    ['Centro', 'Jandira'],
  ].map(([nome, regional]) => ({
    slug: `osasco-vz-${toSlug(`${nome}-${regional}`)}`,
    nome: `${nome} — ${regional.split(' / ')[0]}`,
    regional: `Região de Osasco / ${regional}`,
    oficial: true,
    vizinhos: [],
  })),
];

export const bairrosOsascoSlugs = bairrosOsascoRegiao.map(b => b.slug);

/** Cidades em até ~10 km do Centro de Osasco. */
export const cidadesOsasco10kmSlugs = [
  'osasco', 'carapicuiba', 'barueri', 'taboao-da-serra', 'sao-paulo', 'cotia', 'jandira',
];
