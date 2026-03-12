import { Servico } from '@/types';

export const servicos: Servico[] = [
  // Desentupimento
  { slug: 'desentupimento-vaso-sanitario', nome: 'Desentupimento de Vaso Sanitário', icone: 'bath', categoria: 'desentupimento', descricao: 'Desentupimento profissional de vasos sanitários com equipamentos modernos.', precoMedio: 'R$ 150 - R$ 350' },
  { slug: 'desentupimento-pia-cozinha', nome: 'Desentupimento de Pia de Cozinha', icone: 'utensils', categoria: 'desentupimento', descricao: 'Desentupimento de pias de cozinha, sifão e ramal.', precoMedio: 'R$ 120 - R$ 280' },
  { slug: 'desentupimento-pia-banheiro', nome: 'Desentupimento de Pia de Banheiro', icone: 'shower-head', categoria: 'desentupimento', descricao: 'Desentupimento de pias de banheiro e lavatórios.', precoMedio: 'R$ 100 - R$ 250' },
  { slug: 'desentupimento-esgoto-residencial', nome: 'Desentupimento de Esgoto Residencial', icone: 'home', categoria: 'desentupimento', descricao: 'Desentupimento de rede de esgoto residencial completa.', precoMedio: 'R$ 200 - R$ 600' },
  { slug: 'desentupimento-esgoto-comercial', nome: 'Desentupimento de Esgoto Comercial', icone: 'building-2', categoria: 'desentupimento', descricao: 'Desentupimento de esgoto para comércios e empresas.', precoMedio: 'R$ 350 - R$ 1.200' },
  { slug: 'desentupimento-caixa-gordura', nome: 'Desentupimento de Caixa de Gordura', icone: 'utensils', categoria: 'desentupimento', descricao: 'Limpeza e desentupimento de caixa de gordura.', precoMedio: 'R$ 150 - R$ 400' },
  { slug: 'hidrojateamento', nome: 'Hidrojateamento', icone: 'waves', categoria: 'desentupimento', descricao: 'Limpeza de tubulações com jato de água de alta pressão.', precoMedio: 'R$ 300 - R$ 800' },
  { slug: 'camera-inspecao-esgoto', nome: 'Câmera de Inspeção de Esgoto', icone: 'camera', categoria: 'desentupimento', descricao: 'Inspeção por câmera para diagnóstico preciso de tubulações.', precoMedio: 'R$ 200 - R$ 500' },
  { slug: 'limpa-fossa', nome: 'Limpa Fossa', icone: 'truck', categoria: 'desentupimento', descricao: 'Serviço de limpeza e sucção de fossas sépticas.', precoMedio: 'R$ 250 - R$ 700' },
  { slug: 'desentupimento-ralo', nome: 'Desentupimento de Ralo', icone: 'circle-dot', categoria: 'desentupimento', descricao: 'Desentupimento de ralos de banheiro, área de serviço e garagem.', precoMedio: 'R$ 100 - R$ 250' },
  { slug: 'desentupimento-industrial', nome: 'Desentupimento Industrial', icone: 'factory', categoria: 'desentupimento', descricao: 'Desentupimento de redes industriais de grande porte.', precoMedio: 'Sob consulta' },
  { slug: 'emergencia-24h', nome: 'Emergência 24h', icone: 'alert-triangle', categoria: 'desentupimento', descricao: 'Atendimento emergencial 24 horas para situações urgentes.', precoMedio: 'R$ 200 - R$ 500' },
  // Encanamento
  { slug: 'encanador-residencial', nome: 'Encanador Residencial', icone: 'wrench', categoria: 'encanamento', descricao: 'Serviços de encanamento para residências.', precoMedio: 'R$ 100 - R$ 400' },
  { slug: 'encanador-comercial', nome: 'Encanador Comercial', icone: 'store', categoria: 'encanamento', descricao: 'Serviços de encanamento para comércios e empresas.', precoMedio: 'R$ 200 - R$ 800' },
  { slug: 'conserto-vazamento', nome: 'Conserto de Vazamento', icone: 'droplet', categoria: 'encanamento', descricao: 'Localização e reparo de vazamentos de água.', precoMedio: 'R$ 150 - R$ 500' },
  { slug: 'instalacao-hidraulica', nome: 'Instalação Hidráulica', icone: 'hard-hat', categoria: 'encanamento', descricao: 'Instalação completa de sistemas hidráulicos.', precoMedio: 'R$ 500 - R$ 3.000' },
  { slug: 'troca-tubulacao', nome: 'Troca de Tubulação', icone: 'cog', categoria: 'encanamento', descricao: 'Substituição de tubulações antigas ou danificadas.', precoMedio: 'R$ 300 - R$ 1.500' },
  { slug: 'instalacao-caixa-dagua', nome: 'Instalação de Caixa d\'Água', icone: 'glass-water', categoria: 'encanamento', descricao: 'Instalação e manutenção de caixas d\'água.', precoMedio: 'R$ 200 - R$ 600' },
  { slug: 'conserto-torneira-chuveiro', nome: 'Conserto de Torneira e Chuveiro', icone: 'shower-head', categoria: 'encanamento', descricao: 'Reparo e substituição de torneiras e chuveiros.', precoMedio: 'R$ 80 - R$ 250' },
  { slug: 'instalacao-aquecedor', nome: 'Instalação de Aquecedor', icone: 'flame', categoria: 'encanamento', descricao: 'Instalação de aquecedores a gás e elétricos.', precoMedio: 'R$ 200 - R$ 500' },
  { slug: 'reforma-banheiro-hidraulica', nome: 'Reforma de Banheiro (Hidráulica)', icone: 'bath', categoria: 'encanamento', descricao: 'Parte hidráulica de reformas de banheiro.', precoMedio: 'R$ 800 - R$ 3.000' },
  { slug: 'deteccao-vazamento-oculto', nome: 'Detecção de Vazamento Oculto', icone: 'search', categoria: 'encanamento', descricao: 'Detecção eletrônica de vazamentos não visíveis.', precoMedio: 'R$ 200 - R$ 600' },
];

export function getServicoBySlug(slug: string): Servico | undefined {
  return servicos.find(s => s.slug === slug);
}

export const categoriasRapidas = servicos.filter(s => [
  'desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-esgoto-comercial',
  'encanador-residencial', 'conserto-vazamento', 'desentupimento-pia-cozinha',
  'limpa-fossa', 'camera-inspecao-esgoto', 'instalacao-hidraulica',
  'emergencia-24h', 'desentupimento-industrial', 'instalacao-caixa-dagua'
].includes(s.slug));
