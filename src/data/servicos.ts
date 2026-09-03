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
  // Motofrete e entregas
  { slug: 'motofrete-motoboy', nome: 'Motofrete e Motoboy', icone: 'bike', categoria: 'motofrete', descricao: 'Motoboy para coleta e entrega de documentos, peças e pequenos volumes no seu bairro.', precoMedio: 'Sob consulta' },
  { slug: 'entrega-expressa-van', nome: 'Entrega Expressa e Van', icone: 'package', categoria: 'motofrete', descricao: 'Transporte de caixas, encomendas e mercadorias com van e motofrete dedicado.', precoMedio: 'Sob consulta' },
  // Lavanderia e passadoria
  { slug: 'lavanderia-profissional', nome: 'Lavanderia Profissional', icone: 'shirt', categoria: 'lavanderia', descricao: 'Lavagem profissional de roupas do dia a dia, uniformes e peças delicadas com coleta e entrega.', precoMedio: 'Sob consulta' },
  { slug: 'passadoria-roupas', nome: 'Passadoria de Roupas', icone: 'wind', categoria: 'lavanderia', descricao: 'Serviço de passadoria de camisas, calças, ternos e roupas sociais com acabamento profissional.', precoMedio: 'Sob consulta' },
  { slug: 'lavagem-a-seco', nome: 'Lavagem a Seco (Dry Clean)', icone: 'sparkles', categoria: 'lavanderia', descricao: 'Lavagem a seco para ternos, vestidos, casacos e tecidos que não podem ser lavados com água.', precoMedio: 'Sob consulta' },
  { slug: 'lave-e-dobre', nome: 'Lave e Dobre', icone: 'washing-machine', categoria: 'lavanderia', descricao: 'Lavanderia lave e dobre por quilo: roupas lavadas, secas e dobradas prontas para guardar.', precoMedio: 'Sob consulta' },
  { slug: 'limpeza-edredom-roupa-cama', nome: 'Limpeza de Edredom e Roupa de Cama', icone: 'bed-double', categoria: 'lavanderia', descricao: 'Higienização de edredons, cobertores, colchas e limpeza geral de roupas de cama.', precoMedio: 'Sob consulta' },
  { slug: 'limpeza-tapetes-cortinas', nome: 'Limpeza de Tapetes, Cortinas e Tapeçaria', icone: 'sofa', categoria: 'lavanderia', descricao: 'Limpeza de tapetes, cortinas e tapeçarias com produtos específicos para cada tecido.', precoMedio: 'Sob consulta' },
  { slug: 'limpeza-couro-camurca', nome: 'Limpeza de Couro e Camurça', icone: 'briefcase', categoria: 'lavanderia', descricao: 'Limpeza e hidratação de jaquetas, bolsas e peças em couro e camurça.', precoMedio: 'Sob consulta' },
  { slug: 'conservacao-vestido-noiva', nome: 'Conservação de Vestido de Noiva', icone: 'sparkles', categoria: 'lavanderia', descricao: 'Limpeza especializada e conservação de vestidos de casamento e trajes de festa.', precoMedio: 'Sob consulta' },
  { slug: 'consertos-ajustes-roupas', nome: 'Consertos e Ajustes em Roupas', icone: 'scissors', categoria: 'lavanderia', descricao: 'Costura, barras, ajustes de cintura e pequenos reparos em peças de roupa.', precoMedio: 'Sob consulta' },
  { slug: 'lavanderia-industrial', nome: 'Lavanderia Industrial e Empresarial', icone: 'factory', categoria: 'lavanderia', descricao: 'Lavanderia para hotéis, restaurantes, clínicas e empresas com contratos de uniformes e enxoval.', precoMedio: 'Sob consulta' },
  // Refrigeração
  { slug: 'assistencia-tecnica-refrigeracao', nome: 'Assistência Técnica em Refrigeração', icone: 'snowflake', categoria: 'refrigeracao', descricao: 'Assistência técnica multimarcas em equipamentos e sistemas de refrigeração comercial, industrial e residencial.', precoMedio: 'Sob consulta' },
  { slug: 'refrigeracao-comercial', nome: 'Refrigeração Comercial', icone: 'store', categoria: 'refrigeracao', descricao: 'Manutenção de equipamentos de refrigeração para mercados, padarias, restaurantes, açougues e lojas de conveniência.', precoMedio: 'Sob consulta' },
  { slug: 'refrigeracao-industrial', nome: 'Refrigeração Industrial', icone: 'factory', categoria: 'refrigeracao', descricao: 'Manutenção de sistemas de refrigeração industrial e instalações de grande porte com atendimento programado.', precoMedio: 'Sob consulta' },
  { slug: 'manutencao-preventiva-refrigeracao', nome: 'Manutenção Preventiva de Refrigeração', icone: 'clipboard-list', categoria: 'refrigeracao', descricao: 'Limpeza de condensador, verificação de degelo, vedação, controlador e temperatura para evitar paradas.', precoMedio: 'Sob consulta' },
  { slug: 'manutencao-corretiva-refrigeracao', nome: 'Manutenção Corretiva de Refrigeração', icone: 'wrench', categoria: 'refrigeracao', descricao: 'Diagnóstico de falhas e reparo de equipamentos que não ligam, não gelam ou trabalham fora da faixa de temperatura.', precoMedio: 'Sob consulta' },
  { slug: 'conserto-geladeira-refrigerador', nome: 'Conserto de Geladeira e Refrigerador', icone: 'refrigerator', categoria: 'refrigeracao', descricao: 'Conserto de geladeiras e refrigeradores multimarcas: não gela, forma gelo em excesso, faz ruído ou vaza água.', precoMedio: 'Sob consulta' },
  { slug: 'manutencao-freezer', nome: 'Manutenção de Freezer Vertical e Horizontal', icone: 'thermometer-snowflake', categoria: 'refrigeracao', descricao: 'Manutenção de freezers verticais e horizontais com ajuste de temperatura, degelo e vedação.', precoMedio: 'Sob consulta' },
  { slug: 'manutencao-camara-fria', nome: 'Manutenção de Câmara Fria', icone: 'warehouse', categoria: 'refrigeracao', descricao: 'Manutenção preventiva e corretiva de câmaras frias comerciais, com controle de temperatura e degelo.', precoMedio: 'Sob consulta' },
  { slug: 'conserto-balcao-refrigerado', nome: 'Conserto de Balcão e Expositor Refrigerado', icone: 'boxes', categoria: 'refrigeracao', descricao: 'Conserto de balcões refrigerados e expositores que embaçam, perdem temperatura ou congelam o evaporador.', precoMedio: 'Sob consulta' },
  { slug: 'manutencao-frigobar', nome: 'Manutenção de Frigobar', icone: 'snowflake', categoria: 'refrigeracao', descricao: 'Manutenção de frigobares para hotéis, pousadas, casas de temporada e residências.', precoMedio: 'Sob consulta' },
  { slug: 'conserto-side-by-side-french-door', nome: 'Conserto de Side by Side e French Door', icone: 'refrigerator', categoria: 'refrigeracao', descricao: 'Assistência técnica em refrigeradores Side by Side e French Door: painel com erro, degelo e ventilação.', precoMedio: 'Sob consulta' },
  { slug: 'manutencao-adega-climatizada', nome: 'Manutenção de Adega Climatizada', icone: 'wine', categoria: 'refrigeracao', descricao: 'Manutenção de adegas climatizadas com ajuste de temperatura e verificação do sistema de refrigeração.', precoMedio: 'Sob consulta' },
  { slug: 'conserto-lava-e-seca', nome: 'Conserto de Lava e Seca', icone: 'washing-machine', categoria: 'refrigeracao', descricao: 'Conserto de lava e seca multimarcas com diagnóstico de falhas e reposição de peças.', precoMedio: 'Sob consulta' },
];

export function getServicoBySlug(slug: string): Servico | undefined {
  return servicos.find(s => s.slug === slug);
}

export const categoriasRapidas = servicos.filter(s => [
  'desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-esgoto-comercial',
  'encanador-residencial', 'conserto-vazamento', 'desentupimento-pia-cozinha',
  'limpa-fossa', 'camera-inspecao-esgoto', 'instalacao-hidraulica',
  'emergencia-24h', 'motofrete-motoboy', 'entrega-expressa-van',
  'lavanderia-profissional', 'passadoria-roupas', 'lavagem-a-seco', 'lave-e-dobre',
  'assistencia-tecnica-refrigeracao', 'refrigeracao-comercial', 'conserto-geladeira-refrigerador',
  'manutencao-camara-fria'
].includes(s.slug));

