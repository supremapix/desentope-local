import { Bairro } from '@/types';

export const regionais: Record<string, string[]> = {
  'Matriz': ['Centro', 'Centro Cívico', 'Alto da Glória', 'Alto da Rua XV', 'Cabral', 'Cristo Rei', 'Hugo Lange', 'Jardim Botânico', 'Juvevê', 'Mercês', 'Prado Velho', 'Rebouças', 'São Francisco'],
  'Boa Vista': ['Abranches', 'Ahú', 'Atuba', 'Bacacheri', 'Bairro Alto', 'Barreirinha', 'Boa Vista', 'Cachoeira', 'Pilarzinho', 'Santa Cândida', 'Taboão', 'Tingui', 'Vista Alegre'],
  'Cajuru': ['Cajuru', 'Capão da Imbuia', 'Guabirotuba', 'Jardim das Américas', 'Uberaba'],
  'Boqueirão': ['Alto Boqueirão', 'Boqueirão', 'Hauer', 'Xaxim'],
  'CIC': ['Augusta', 'Cidade Industrial', 'Fazendinha', 'São Miguel', 'Riviera'],
  'Portão': ['Água Verde', 'Batel', 'Bigorrilho', 'Campo Comprido', 'Fanny', 'Guaíra', 'Lindóia', 'Novo Mundo', 'Orleans', 'Parolin', 'Portão', 'Santa Quitéria', 'São Braz', 'Seminário', 'Vila Izabel'],
  'Santa Felicidade': ['Butiatuvinha', 'Campina do Siqueira', 'Cascatinha', 'Lamenha Pequena', 'Mossunguê', 'Santa Felicidade', 'São João', 'São Lourenço', 'Tatuquara'],
  'Pinheirinho': ['Capão Raso', 'Ganchinho', 'Pinheirinho', 'Umbará'],
  'Bairro Novo': ['Caximba', 'Sítio Cercado'],
};

export const bairrosPopulares = [
  'Neo Ville', 'Vila Carmo', 'Vila Sandra', 'Bom Jesus', 'Parolinzinho', 'Igapó', 'Iapi', 'Barigui', 'Gramado', 'Colônia Arbeiter', 'Embracur'
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
