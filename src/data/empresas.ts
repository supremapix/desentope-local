import { Empresa, Bairro } from '@/types';
import { todosBairros } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';

const WHATSAPP = '5541985171966';
const TELEFONE = '(41) 3345-1194';
const EMAIL = 'adpencanadores@gmail.com';
const LOGO = 'https://img.supremamidia.com/suprema-img.png';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function capitalize(s: string): string {
  return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Coordenadas dos bairros principais
const coordenadas: Record<string, { lat: number; lng: number }> = {
  'centro': { lat: -25.4284, lng: -49.2733 },
  'agua-verde': { lat: -25.4489, lng: -49.2812 },
  'batel': { lat: -25.4411, lng: -49.2904 },
  'bigorrilho': { lat: -25.4356, lng: -49.3012 },
  'boqueirao': { lat: -25.5012, lng: -49.2589 },
  'bacacheri': { lat: -25.3889, lng: -49.2456 },
  'boa-vista': { lat: -25.3756, lng: -49.2634 },
  'cajuru': { lat: -25.4289, lng: -49.2134 },
  'campo-comprido': { lat: -25.4512, lng: -49.3345 },
  'capao-raso': { lat: -25.5089, lng: -49.3012 },
  'cidade-industrial': { lat: -25.4812, lng: -49.3567 },
  'fazendinha': { lat: -25.5134, lng: -49.3289 },
  'hauer': { lat: -25.4823, lng: -49.2534 },
  'merces': { lat: -25.4267, lng: -49.3012 },
  'novo-mundo': { lat: -25.5034, lng: -49.3145 },
  'pilarzinho': { lat: -25.3912, lng: -49.3145 },
  'pinheirinho': { lat: -25.5234, lng: -49.3234 },
  'portao': { lat: -25.4823, lng: -49.3012 },
  'reboucas': { lat: -25.4445, lng: -49.2634 },
  'santa-candida': { lat: -25.3556, lng: -49.2534 },
  'santa-felicidade': { lat: -25.3989, lng: -49.3456 },
  'sitio-cercado': { lat: -25.5312, lng: -49.2789 },
  'tatuquara': { lat: -25.5412, lng: -49.3312 },
  'uberaba': { lat: -25.4712, lng: -49.2234 },
  'xaxim': { lat: -25.5023, lng: -49.3089 },
  'sao-jose-dos-pinhais': { lat: -25.5355, lng: -49.2067 },
  'colombo': { lat: -25.2912, lng: -49.2234 },
  'araucaria': { lat: -25.5923, lng: -49.4012 },
  'pinhais': { lat: -25.4423, lng: -49.1867 },
  'campo-largo': { lat: -25.4590, lng: -49.5280 },
  'almirante-tamandare': { lat: -25.3234, lng: -49.3123 },
  'piraquara': { lat: -25.4401, lng: -49.0623 },
  'fazenda-rio-grande': { lat: -25.6612, lng: -49.3089 },
};

export function getCoordenadasBairro(slug: string) {
  return coordenadas[slug] || { lat: -25.4284, lng: -49.2733 };
}

// Templates de empresa por localidade
interface EmpresaTemplate {
  prefixo: string;
  sufixo: string;
  tipoServico: ('desentupimento' | 'encanamento')[];
  servicosOferecidos: string[];
  categoria: string;
  badges: string[];
  notaMedia: number;
  totalAvaliacoes: number;
  anosExperiencia: number;
  atende24h: boolean;
  atendeEmergencia: boolean;
  destaque: boolean;
  verificada: boolean;
}

const templates: EmpresaTemplate[] = [
  {
    prefixo: 'DesentupRápido',
    sufixo: '24h',
    tipoServico: ['desentupimento'],
    servicosOferecidos: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-pia-cozinha', 'hidrojateamento', 'camera-inspecao-esgoto', 'limpa-fossa', 'desentupimento-ralo', 'emergencia-24h'],
    categoria: 'Desentupidora',
    badges: ['VERIFICADO', '24H', 'EMERGÊNCIA'],
    notaMedia: 4.9,
    totalAvaliacoes: 127,
    anosExperiencia: 12,
    atende24h: true,
    atendeEmergencia: true,
    destaque: false,
    verificada: true,
  },
  {
    prefixo: 'Encanador Master',
    sufixo: '— Hidráulica',
    tipoServico: ['encanamento'],
    servicosOferecidos: ['encanador-residencial', 'encanador-comercial', 'conserto-vazamento', 'instalacao-hidraulica', 'troca-tubulacao', 'conserto-torneira-chuveiro', 'instalacao-aquecedor', 'instalacao-caixa-dagua'],
    categoria: 'Encanador / Hidráulica',
    badges: ['VERIFICADO', 'ESPECIALISTA', 'RÁPIDO'],
    notaMedia: 4.8,
    totalAvaliacoes: 98,
    anosExperiencia: 15,
    atende24h: false,
    atendeEmergencia: true,
    destaque: false,
    verificada: true,
  },
  {
    prefixo: 'Hidráulica Express',
    sufixo: '— Industrial',
    tipoServico: ['desentupimento'],
    servicosOferecidos: ['desentupimento-industrial', 'hidrojateamento', 'desentupimento-caixa-gordura', 'camera-inspecao-esgoto', 'desentupimento-esgoto-comercial', 'instalacao-caixa-dagua'],
    categoria: 'Desentupidora Industrial',
    badges: ['VERIFICADO', 'INDUSTRIAL', 'CNPJ'],
    notaMedia: 4.7,
    totalAvaliacoes: 74,
    anosExperiencia: 20,
    atende24h: false,
    atendeEmergencia: true,
    destaque: false,
    verificada: true,
  },
  {
    prefixo: 'SupremaHidro',
    sufixo: '— Desentupimento e Hidráulica',
    tipoServico: ['desentupimento', 'encanamento'],
    servicosOferecidos: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-pia-cozinha', 'hidrojateamento', 'camera-inspecao-esgoto', 'limpa-fossa', 'desentupimento-ralo', 'emergencia-24h', 'encanador-residencial', 'encanador-comercial', 'conserto-vazamento', 'instalacao-hidraulica', 'troca-tubulacao', 'deteccao-vazamento-oculto', 'instalacao-aquecedor', 'reforma-banheiro-hidraulica'],
    categoria: 'Serviços Hidráulicos Completos',
    badges: ['VERIFICADO', 'COMPLETO', '24H', 'DESTAQUE'],
    notaMedia: 5.0,
    totalAvaliacoes: 203,
    anosExperiencia: 18,
    atende24h: true,
    atendeEmergencia: true,
    destaque: true,
    verificada: true,
  },
  {
    prefixo: 'LimpaFossa',
    sufixo: '— Fossas e Reservatórios',
    tipoServico: ['desentupimento'],
    servicosOferecidos: ['limpa-fossa', 'instalacao-caixa-dagua', 'desentupimento-caixa-gordura', 'desentupimento-esgoto-residencial'],
    categoria: 'Limpeza de Fossas e Reservatórios',
    badges: ['VERIFICADO', 'ESPECIALISTA', 'LICENCIADO'],
    notaMedia: 4.8,
    totalAvaliacoes: 56,
    anosExperiencia: 10,
    atende24h: false,
    atendeEmergencia: false,
    destaque: false,
    verificada: true,
  },
];

const avaliacoesModelo = [
  { nomeCliente: 'Carlos M.', nota: 5, servicoRealizado: 'Desentupimento de esgoto', texto: 'Excelente atendimento! Vieram rápido e resolveram tudo com profissionalismo.' },
  { nomeCliente: 'Ana Paula S.', nota: 5, servicoRealizado: 'Conserto de vazamento', texto: 'Muito profissionais, preço justo e trabalho bem feito. Recomendo!' },
  { nomeCliente: 'Roberto L.', nota: 4, servicoRealizado: 'Hidrojateamento', texto: 'Bom serviço, equipe pontual e educada.' },
  { nomeCliente: 'Fernanda K.', nota: 5, servicoRealizado: 'Desentupimento de vaso', texto: 'Resolveram o problema rapidamente. Super recomendo!' },
  { nomeCliente: 'Marcos T.', nota: 5, servicoRealizado: 'Limpa fossa', texto: 'Serviço rápido e limpo. Equipe muito profissional.' },
];

function gerarEmpresasPorLocalidade(localNome: string, localSlug: string, cidade: string = 'Curitiba'): Empresa[] {
  return templates.map((tpl, idx) => {
    const nome = `${tpl.prefixo} ${localNome} ${tpl.sufixo}`.trim();
    const slug = toSlug(`${tpl.prefixo}-${localNome}`);
    const avaliacoes = avaliacoesModelo.slice(0, Math.min(3, idx + 2)).map((a, i) => ({
      ...a,
      id: `${slug}-${i}`,
      data: `2024-12-${String(15 - i).padStart(2, '0')}`,
    }));

    return {
      slug,
      nome,
      logo: LOGO,
      fotos: ['/placeholder.svg'],
      descricao: `${tpl.categoria} referência em ${localNome}, ${cidade}. Atendimento ${tpl.atende24h ? '24 horas' : 'rápido'} com profissionais qualificados.`,
      descricaoLonga: `A ${nome} é referência em ${tpl.categoria.toLowerCase()} em ${localNome}, ${cidade}. Com mais de ${tpl.anosExperiencia} anos de experiência, atendemos residências, condomínios e comércios com rapidez e qualidade. ${tpl.atende24h ? 'Disponíveis 24 horas por dia, inclusive feriados.' : 'Horário comercial estendido.'} Equipe treinada, equipamentos modernos e preço justo. Solicite orçamento agora pelo WhatsApp ou ligue para emergências.`,
      whatsapp: WHATSAPP,
      telefone: TELEFONE,
      email: EMAIL,
      cnpj: idx < 4 ? `${10 + idx}.${100 + idx}.${200 + idx}/0001-0${idx + 1}` : undefined,
      anosExperiencia: tpl.anosExperiencia,
      verificada: tpl.verificada,
      destaque: tpl.destaque,
      atende24h: tpl.atende24h,
      atendeEmergencia: tpl.atendeEmergencia,
      tipoServico: tpl.tipoServico,
      servicosOferecidos: tpl.servicosOferecidos,
      bairrosAtendidos: [localSlug],
      cidadesAtendidas: [toSlug(cidade)],
      formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
      horarios: tpl.atende24h
        ? [{ dia: 'Segunda a Domingo', abertura: '00:00', fechamento: '23:59' }]
        : [
            { dia: 'Segunda a Sexta', abertura: '07:30', fechamento: '18:30' },
            { dia: 'Sábado', abertura: '08:00', fechamento: '13:00' },
            { dia: 'Domingo', abertura: '', fechamento: '', fechado: true },
          ],
      avaliacoes,
      notaMedia: tpl.notaMedia,
      totalAvaliacoes: tpl.totalAvaliacoes,
    };
  });
}

// Cache para empresas geradas
const empresaCache = new Map<string, Empresa[]>();

export function getEmpresasPorBairro(bairroSlug: string): Empresa[] {
  if (empresaCache.has(`bairro-${bairroSlug}`)) {
    return empresaCache.get(`bairro-${bairroSlug}`)!;
  }
  const bairro = todosBairros.find(b => b.slug === bairroSlug);
  if (!bairro) return [];
  const empresas = gerarEmpresasPorLocalidade(bairro.nome, bairroSlug, 'Curitiba');
  empresaCache.set(`bairro-${bairroSlug}`, empresas);
  return empresas;
}

export function getEmpresasPorCidade(cidadeSlug: string): Empresa[] {
  if (empresaCache.has(`cidade-${cidadeSlug}`)) {
    return empresaCache.get(`cidade-${cidadeSlug}`)!;
  }
  const cidade = cidadesRMC.find(c => c.slug === cidadeSlug);
  if (!cidade) return [];
  const empresas = gerarEmpresasPorLocalidade(cidade.nome, cidadeSlug, cidade.nome);
  empresaCache.set(`cidade-${cidadeSlug}`, empresas);
  return empresas;
}

export function getEmpresaBySlug(slug: string): Empresa | undefined {
  // Search all caches
  for (const empresas of empresaCache.values()) {
    const found = empresas.find(e => e.slug === slug);
    if (found) return found;
  }
  // Try to generate from slug pattern
  for (const bairro of todosBairros) {
    const empresas = getEmpresasPorBairro(bairro.slug);
    const found = empresas.find(e => e.slug === slug);
    if (found) return found;
  }
  return undefined;
}

export function getEmpresasPorServico(servicoSlug: string): Empresa[] {
  // Return empresas from popular bairros that offer this service
  const popularBairros = ['centro', 'batel', 'agua-verde', 'boqueirao', 'portao'];
  const result: Empresa[] = [];
  for (const bSlug of popularBairros) {
    const empresas = getEmpresasPorBairro(bSlug);
    result.push(...empresas.filter(e => e.servicosOferecidos.includes(servicoSlug)));
  }
  // Deduplicate by template prefix
  const seen = new Set<string>();
  return result.filter(e => {
    const key = e.nome.split(' ').slice(0, 2).join(' ');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getEmpresasDestaque(): Empresa[] {
  const popularBairros = ['centro', 'batel', 'agua-verde', 'boqueirao'];
  const result: Empresa[] = [];
  for (const bSlug of popularBairros) {
    const empresas = getEmpresasPorBairro(bSlug);
    result.push(...empresas.filter(e => e.destaque));
  }
  return result.slice(0, 4);
}

// WhatsApp link with UTM tracking
export function getWhatsAppLink(empresaSlug: string, bairroSlug: string, empresaNome: string, bairroNome: string, cidade: string = 'Curitiba'): string {
  const msg = `Olá! Vi o anúncio da ${empresaNome} no ${bairroNome} em ${cidade}. Preciso de orçamento.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}&utm_source=site&utm_medium=listagem&utm_campaign=${bairroSlug}&utm_content=${empresaSlug}`;
}

// Keep exports compatible
export const empresas: Empresa[] = [];
