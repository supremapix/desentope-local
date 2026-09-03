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
 * Cidades de Santa Catarina (Litoral Norte, Vale do Itajaí e Foz do Rio Itajaí)
 * atendidas pela assistência técnica em refrigeração com base em Navegantes.
 * Distância aproximada a partir do Centro de Navegantes.
 */
export const cidadesSantaCatarina: CidadeRMC[] = [
  { slug: 'navegantes', nome: 'Navegantes', distanciaKm: 0 },
  { slug: 'penha', nome: 'Penha', distanciaKm: 14 },
  { slug: 'itajai', nome: 'Itajaí', distanciaKm: 8 },
  { slug: 'balneario-picarras', nome: 'Balneário Piçarras', distanciaKm: 20 },
  { slug: 'barra-velha', nome: 'Barra Velha', distanciaKm: 35 },
  { slug: 'balneario-camboriu', nome: 'Balneário Camboriú', distanciaKm: 18 },
  { slug: 'camboriu', nome: 'Camboriú', distanciaKm: 22 },
  { slug: 'itapema', nome: 'Itapema', distanciaKm: 30 },
  { slug: 'porto-belo', nome: 'Porto Belo', distanciaKm: 40 },
  { slug: 'bombinhas', nome: 'Bombinhas', distanciaKm: 48 },
  { slug: 'ilhota', nome: 'Ilhota', distanciaKm: 25 },
  { slug: 'luiz-alves', nome: 'Luiz Alves', distanciaKm: 32 },
  { slug: 'gaspar', nome: 'Gaspar', distanciaKm: 34 },
  { slug: 'blumenau', nome: 'Blumenau', distanciaKm: 52 },
  { slug: 'massaranduba', nome: 'Massaranduba', distanciaKm: 50 },
  { slug: 'brusque', nome: 'Brusque', distanciaKm: 47 },
  { slug: 'guabiruba', nome: 'Guabiruba', distanciaKm: 52 },
  { slug: 'sao-joao-do-itaperiu', nome: 'São João do Itaperiú', distanciaKm: 30 },
  { slug: 'araquari', nome: 'Araquari', distanciaKm: 55 },
  { slug: 'guaramirim', nome: 'Guaramirim', distanciaKm: 58 },
  { slug: 'balneario-barra-do-sul', nome: 'Balneário Barra do Sul', distanciaKm: 48 },
  { slug: 'sao-francisco-do-sul', nome: 'São Francisco do Sul', distanciaKm: 72 },
  { slug: 'joinville', nome: 'Joinville', distanciaKm: 65 },
];

export const cidadesSantaCatarinaSlugs = cidadesSantaCatarina.map(c => c.slug);

/**
 * Bairros das principais cidades atendidas — usados na busca por local
 * e nas listagens de cobertura da assistência em refrigeração.
 */
const bairrosPorCidade: Record<string, string[]> = {
  'Navegantes': ['Centro', 'São Domingos', 'Machados', 'Gravatá', 'Meia Praia', 'Nossa Senhora das Graças', 'Pontal', 'Escalvados', 'São Pedro', 'Volta Grande'],
  'Itajaí': ['Centro', 'Fazenda', 'Cordeiros', 'São Vicente', 'Vila Operária', 'Praia Brava', 'Itaipava', 'Cabeçudas', 'Dom Bosco', 'Salseiros'],
  'Balneário Camboriú': ['Centro', 'Pioneiros', 'Nações', 'Estados', 'Municípios', 'Praia dos Amores', 'Barra Sul'],
  'Penha': ['Centro', 'Armação', 'Gravatá', 'Praia Alegre', 'São João'],
  'Joinville': ['Centro', 'Costa e Silva', 'América', 'Bucarein', 'Glória', 'Boa Vista', 'Iririú'],
  'Blumenau': ['Centro', 'Velha', 'Garcia', 'Itoupava Norte', 'Ponta Aguda', 'Vila Nova'],
  'Brusque': ['Centro', 'Azambuja', 'Steffen', 'Santa Terezinha'],
  'Itapema': ['Centro', 'Meia Praia', 'Morretes'],
};

export const bairrosSantaCatarina: Bairro[] = Object.entries(bairrosPorCidade).flatMap(
  ([cidade, lista]) =>
    lista.map(nome => ({
      slug: `sc-${toSlug(cidade)}-${toSlug(nome)}`,
      nome: `${nome} — ${cidade}`,
      regional: `${cidade} / SC`,
      oficial: true,
      vizinhos: [],
    }))
);

export const bairrosSantaCatarinaSlugs = bairrosSantaCatarina.map(b => b.slug);

export function getBairroSCBySlug(slug: string): Bairro | undefined {
  return bairrosSantaCatarina.find(b => b.slug === slug);
}
