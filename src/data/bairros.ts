import { Bairro } from '@/types';

export const regionais: Record<string, string[]> = {
  'Matriz': ['Centro', 'Centro Cívico', 'Alto da Glória', 'Alto da Rua XV', 'Bom Retiro', 'Cabral', 'Cristo Rei', 'Hugo Lange', 'Jardim Botânico', 'Jardim Social', 'Juvevê', 'Mercês', 'Prado Velho', 'Rebouças', 'São Francisco'],
  'Boa Vista': ['Abranches', 'Ahú', 'Atuba', 'Bacacheri', 'Bairro Alto', 'Barreirinha', 'Boa Vista', 'Cachoeira', 'Pilarzinho', 'Santa Cândida', 'Santo Inácio', 'Taboão', 'Tarumã', 'Tingui', 'Vista Alegre'],
  'Cajuru': ['Cajuru', 'Capão da Imbuia', 'Guabirotuba', 'Jardim das Américas', 'Uberaba'],
  'Boqueirão': ['Alto Boqueirão', 'Boqueirão', 'Hauer', 'Xaxim'],
  'CIC': ['Augusta', 'Cidade Industrial', 'Fazendinha', 'Riviera', 'São Miguel', 'Campo de Santana',
    // Vilas e regiões da CIC
    'CIC Norte', 'CIC Sul', 'CIC Oeste', 'CIC Industrial',
    'Vila Sandra', 'Neoville', 'Vila Nossa Senhora da Luz', 'Vila Verde', 'Vila Sabará',
    'Vila Barigui', 'Vila São Pedro', 'Vila Nova Barigui', 'Vila União', 'Vila Campos',
    'Vila Santa Rita', 'Vila Vitória', 'Vila Nossa Senhora do Carmo', 'Vila Jardim Gabineto',
    'Vila Oswaldo Cruz', 'Vila Caiuá', 'Vila São Vicente', 'Vila Terra Santa',
    'Vila Riviera', 'Vila Parolin CIC', 'Jardim Industrial', 'Jardim Gabineto', 'Vila Santa Helena',
  ],
  'Portão': ['Água Verde', 'Batel', 'Bigorrilho', 'Campo Comprido', 'Fanny', 'Guaíra', 'Lindóia', 'Novo Mundo', 'Orleans', 'Parolin', 'Portão', 'Santa Quitéria', 'São Braz', 'Seminário', 'Vila Izabel'],
  'Santa Felicidade': ['Butiatuvinha', 'Campina do Siqueira', 'Cascatinha', 'Lamenha Pequena', 'Mossunguê', 'Santa Felicidade', 'São João', 'São Lourenço', 'Tatuquara'],
  'Pinheirinho': ['Capão Raso', 'Ganchinho', 'Pinheirinho', 'Umbará'],
  'Bairro Novo': ['Caximba', 'Sítio Cercado'],
};

export const bairrosPopulares = [
  // Populares gerais
  'Champagnat', 'Ecoville', 'Mossunguê Ecoville', 'Vila Torres', 'Vila Guaíra', 'Vila Hauer',
  'Jardim Paranaense', 'Vila Oficinas', 'Vila Uberaba', 'Jardim Aliança',
  'Bom Jesus', 'Parolinzinho', 'Igapó', 'Iapi', 'Barigui', 'Gramado', 'Colônia Arbeiter', 'Embracur',
  // Regiões buscadas no CIC (SEO)
  'CIC Neoville', 'CIC Vila Sandra', 'CIC Caiuá', 'CIC Nossa Senhora da Luz',
  'CIC Vitória', 'CIC Sabará', 'CIC Riviera', 'CIC Campo Comprido Divisa', 'CIC Fazendinha Divisa',
];

function toSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getVizinhos(nome: string, regional: string): string[] {
  const bairrosRegional = regionais[regional] || [];
  return bairrosRegional.filter(b => b !== nome).slice(0, 4).map(toSlug);
}

export const bairros: Bairro[] = Object.entries(regionais).flatMap(([regional, nomes]) =>
  nomes.map(nome => ({
    slug: toSlug(nome),
    nome,
    regional,
    oficial: true,
    vizinhos: getVizinhos(nome, regional),
  }))
);

export const bairrosPopularesData: Bairro[] = bairrosPopulares.map(nome => ({
  slug: toSlug(nome),
  nome,
  regional: 'Popular',
  oficial: false,
  vizinhos: [],
}));

export const todosBairros = [...bairros, ...bairrosPopularesData];

export function getBairroBySlug(slug: string): Bairro | undefined {
  return todosBairros.find(b => b.slug === slug);
}

export function getBairrosPorRegional(regional: string): Bairro[] {
  return bairros.filter(b => b.regional === regional);
}

// All CIC slugs for company injection
export const allCicSlugs = bairros
  .filter(b => b.regional === 'CIC')
  .map(b => b.slug)
  .concat(bairrosPopularesData.filter(b => b.nome.startsWith('CIC ')).map(b => b.slug));
