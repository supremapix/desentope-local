import { CidadeRMC } from '@/types';

export const cidadesRMC: CidadeRMC[] = [
  { slug: 'pinhais', nome: 'Pinhais', distanciaKm: 8 },
  { slug: 'almirante-tamandare', nome: 'Almirante Tamandaré', distanciaKm: 13 },
  { slug: 'colombo', nome: 'Colombo', distanciaKm: 16 },
  { slug: 'campo-magro', nome: 'Campo Magro', distanciaKm: 19 },
  { slug: 'sao-jose-dos-pinhais', nome: 'São José dos Pinhais', distanciaKm: 20 },
  { slug: 'piraquara', nome: 'Piraquara', distanciaKm: 21 },
  { slug: 'araucaria', nome: 'Araucária', distanciaKm: 22 },
  { slug: 'fazenda-rio-grande', nome: 'Fazenda Rio Grande', distanciaKm: 26 },
  { slug: 'campo-largo', nome: 'Campo Largo', distanciaKm: 27 },
  { slug: 'quatro-barras', nome: 'Quatro Barras', distanciaKm: 28 },
  { slug: 'campina-grande-do-sul', nome: 'Campina Grande do Sul', distanciaKm: 30 },
  { slug: 'mandirituba', nome: 'Mandirituba', distanciaKm: 32 },
  { slug: 'itaperucu', nome: 'Itaperuçu', distanciaKm: 35 },
  { slug: 'contenda', nome: 'Contenda', distanciaKm: 38 },
  { slug: 'balsa-nova', nome: 'Balsa Nova', distanciaKm: 40 },
  { slug: 'bocaiuva-do-sul', nome: 'Bocaiúva do Sul', distanciaKm: 42 },
  { slug: 'rio-branco-do-sul', nome: 'Rio Branco do Sul', distanciaKm: 45 },
  { slug: 'lapa', nome: 'Lapa', distanciaKm: 70 },
  { slug: 'adrianopolis', nome: 'Adrianópolis', distanciaKm: 75 },
  { slug: 'agudos-do-sul', nome: 'Agudos do Sul', distanciaKm: 60 },
  { slug: 'campo-do-tenente', nome: 'Campo do Tenente', distanciaKm: 80 },
  { slug: 'cerro-azul', nome: 'Cerro Azul', distanciaKm: 85 },
  { slug: 'doutor-ulysses', nome: 'Doutor Ulysses', distanciaKm: 110 },
  { slug: 'pien', nome: 'Piên', distanciaKm: 75 },
  { slug: 'quitandinha', nome: 'Quitandinha', distanciaKm: 65 },
  { slug: 'tijucas-do-sul', nome: 'Tijucas do Sul', distanciaKm: 55 },
  { slug: 'tunas-do-parana', nome: 'Tunas do Paraná', distanciaKm: 90 },
];

export const entornoAmplo: CidadeRMC[] = [
  { slug: 'palmeira', nome: 'Palmeira', distanciaKm: 75 },
  { slug: 'ponta-grossa', nome: 'Ponta Grossa', distanciaKm: 115 },
  { slug: 'rio-negro', nome: 'Rio Negro', distanciaKm: 105 },
  { slug: 'morretes', nome: 'Morretes', distanciaKm: 70 },
  { slug: 'antonina', nome: 'Antonina', distanciaKm: 85 },
  { slug: 'paranagua', nome: 'Paranaguá', distanciaKm: 90 },
];

export function getCidadeBySlug(slug: string): CidadeRMC | undefined {
  return [...cidadesRMC, ...entornoAmplo].find(c => c.slug === slug);
}
