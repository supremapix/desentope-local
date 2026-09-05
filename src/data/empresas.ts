import { Empresa, Bairro } from '@/types';
import { todosBairros, allCicSlugs, bairros, bairrosPopularesData } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { bairrosSaoPauloSlugs, cidadesSaoPauloSlugs, bairrosOsascoSlugs, cidadesOsasco10kmSlugs } from '@/data/bairros-sp';
import { bairrosSantaCatarinaSlugs, cidadesSantaCatarinaSlugs } from '@/data/cidades-sc';

// Segmentos que NÃO devem aparecer nas listagens hidráulicas por bairro/cidade
const SEGMENTOS_NAO_HIDRAULICOS = ['motofrete', 'lavanderia', 'refrigeracao'] as const;
function isSegmentoHidraulico(emp: Empresa): boolean {
  return !emp.tipoServico.some(t => (SEGMENTOS_NAO_HIDRAULICOS as readonly string[]).includes(t));
}

// All Curitiba bairro slugs (official + popular)
const allCuritibaSlugs = todosBairros.map(b => b.slug);

const WHATSAPP = '5541985171966';
const TELEFONE = '(41) 3345-1194';
const EMAIL = 'adpencanadores@gmail.com';
const LOGO = '/favicon.png';

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
  // Inject real companies that serve this bairro
  for (const emp of empresasReais) {
    if (!isSegmentoHidraulico(emp)) continue;
    if (emp.bairrosAtendidos.includes(bairroSlug) && !empresas.find(e => e.slug === emp.slug)) {
      empresas.unshift(emp);
    }
  }
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
  // Inject real companies that serve this cidade
  for (const emp of empresasReais) {
    if (!isSegmentoHidraulico(emp)) continue;
    if (emp.cidadesAtendidas.includes(cidadeSlug) && !empresas.find(e => e.slug === emp.slug)) {
      empresas.unshift(emp);
    }
  }
  empresaCache.set(`cidade-${cidadeSlug}`, empresas);
  return empresas;
}

export function getEmpresaBySlug(slug: string): Empresa | undefined {
  const real = empresasReais.find(e => e.slug === slug);
  if (real) return real;
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
  // Empresas reais cadastradas que oferecem exatamente este serviço
  const reais = empresasReais.filter(e => e.servicosOferecidos.includes(servicoSlug));
  // Return empresas from popular bairros that offer this service
  const popularBairros = ['centro', 'batel', 'agua-verde', 'boqueirao', 'portao'];
  const result: Empresa[] = [];
  for (const bSlug of popularBairros) {
    const empresas = getEmpresasPorBairro(bSlug);
    result.push(...empresas.filter(e => e.servicosOferecidos.includes(servicoSlug)));
  }
  // Deduplicate by template prefix
  const seen = new Set<string>(reais.map(e => e.nome.split(' ').slice(0, 2).join(' ')));
  return [...reais, ...result].filter(e => {
    const key = e.nome.split(' ').slice(0, 2).join(' ');
    if (reais.includes(e)) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Empresas em destaque = SEMPRE as últimas empresas reais cadastradas primeiro.
 * Basta adicionar a nova empresa ao FINAL do array `empresasReais` que ela
 * aparece automaticamente no topo da home, sem nenhuma outra alteração.
 */
export function getEmpresasDestaque(limite = 4): Empresa[] {
  const ultimasCadastradas = [...empresasReais].reverse();
  const result: Empresa[] = [...ultimasCadastradas];

  if (result.length < limite) {
    const popularBairros = ['centro', 'batel', 'agua-verde', 'boqueirao'];
    for (const bSlug of popularBairros) {
      for (const e of getEmpresasPorBairro(bSlug)) {
        if (e.destaque && !result.some(r => r.slug === e.slug)) result.push(e);
      }
    }
  }

  return result.slice(0, limite);
}

// WhatsApp link with UTM tracking
export function getWhatsAppLink(empresaSlug: string, bairroSlug: string, empresaNome: string, bairroNome: string, cidade: string = 'Curitiba'): string {
  const msg = `Olá! Vi o anúncio da ${empresaNome} no ${bairroNome} em ${cidade}. Preciso de orçamento.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}&utm_source=site&utm_medium=listagem&utm_campaign=${bairroSlug}&utm_content=${empresaSlug}`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPRESAS REAIS CADASTRADAS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const empresasReais: Empresa[] = [
  {
    slug: 'agua-facil-desentupidora-encanador-24h',
    nome: 'Água Fácil Desentupidora e Encanadores 24h — Fátima',
    logo: '/favicon.png',
    fotos: ['/favicon.png'],
    descricao: 'Desentupidora e encanadores 24 horas em Curitiba e toda Região Metropolitana. Atendimento emergencial com Fátima — desentupimento, vazamentos, hidrojateamento e limpa fossa em todos os bairros.',
    descricaoLonga: 'A Água Fácil é referência em desentupidora e encanadores 24 horas em Curitiba e em toda a Região Metropolitana (RMC). Atendemos os 75 bairros oficiais de Curitiba — Centro, Batel, Água Verde, Bigorrilho, Boqueirão, Cajuru, CIC, Portão, Santa Felicidade, Pinheirinho, Sítio Cercado, Xaxim, Hauer, Bacacheri, Boa Vista, Uberaba, Tatuquara, entre outros — além das vilas e regiões populares como Vila Sandra, Neoville, Vitória Régia, Caiuá, Sabará, Nossa Senhora da Luz, Vila Pantanal, Vila Torres, Vila Hauer, Vila Guaíra, Vila Oficinas, Pinheirinho Velho, Sítio Cercado Velho, Capão Raso Velho, Jardim Gabineto, Jardim Itatiaia e muito mais. Também atendemos São José dos Pinhais, Pinhais, Colombo, Araucária, Almirante Tamandaré, Campo Largo, Campo Magro, Fazenda Rio Grande, Quatro Barras, Campina Grande do Sul, Mandirituba, Balsa Nova, Rio Branco do Sul, Itaperuçu, Piraquara e Tijucas do Sul. Especialistas em desentupimento de esgoto, pia, vaso sanitário, ralo, caixa de gordura, hidrojateamento, câmera de inspeção, limpa fossa, caça vazamento, conserto de vazamento, troca de tubulação, instalação hidráulica e emergência 24h. Fale com Fátima pelo WhatsApp (41) 99569-4912 ou ligue (41) 3345-1194.',
    whatsapp: '5541995694912',
    telefone: '(41) 3345-1194',
    email: 'contato@aguafacil.app.br',
    site: 'https://www.aguafacil.app.br',
    cnpj: undefined,
    anosExperiencia: 15,
    verificada: true,
    destaque: true,
    atende24h: true,
    atendeEmergencia: true,
    tipoServico: ['desentupimento', 'encanamento'],
    servicosOferecidos: [
      'desentupimento-vaso-sanitario',
      'desentupimento-pia-cozinha',
      'desentupimento-esgoto-residencial',
      'desentupimento-esgoto-comercial',
      'desentupimento-industrial',
      'desentupimento-ralo',
      'desentupimento-caixa-gordura',
      'hidrojateamento',
      'camera-inspecao-esgoto',
      'limpa-fossa',
      'conserto-vazamento',
      'deteccao-vazamento-oculto',
      'instalacao-caixa-dagua',
      'conserto-torneira-chuveiro',
      'encanador-residencial',
      'encanador-comercial',
      'instalacao-hidraulica',
      'troca-tubulacao',
      'instalacao-aquecedor',
      'reforma-banheiro-hidraulica',
      'emergencia-24h',
    ],
    bairrosAtendidos: [...allCuritibaSlugs],
    cidadesAtendidas: ['curitiba', ...cidadesRMC.map(c => c.slug)],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
    horarios: [
      { dia: 'Segunda a Domingo (24 horas)', abertura: '00:00', fechamento: '23:59' },
    ],
    avaliacoes: [
      { id: 'aguafacil-1', nomeCliente: 'Sandra R.', nota: 5, data: '2026-03-10', servicoRealizado: 'Desentupimento de esgoto', texto: 'A Fátima atendeu super rápido pelo WhatsApp e a equipe veio em menos de 1 hora. Resolveram tudo!' },
      { id: 'aguafacil-2', nomeCliente: 'Ricardo F.', nota: 5, data: '2026-02-22', servicoRealizado: 'Caça vazamento', texto: 'Localizaram o vazamento oculto sem quebrar a parede toda. Profissionais excelentes.' },
      { id: 'aguafacil-3', nomeCliente: 'Tatiane M.', nota: 5, data: '2026-02-05', servicoRealizado: 'Hidrojateamento', texto: 'Atendimento 24h de verdade! Liguei de madrugada e vieram na hora. Recomendo demais.' },
      { id: 'aguafacil-4', nomeCliente: 'Paulo H.', nota: 5, data: '2026-01-18', servicoRealizado: 'Limpa fossa', texto: 'Serviço rápido, limpo e preço justo. A Fátima é muito atenciosa no atendimento.' },
      { id: 'aguafacil-5', nomeCliente: 'Cláudia B.', nota: 5, data: '2026-01-02', servicoRealizado: 'Desentupimento de vaso', texto: 'Atendem em todos os bairros mesmo. Vim do São José dos Pinhais e foram super pontuais.' },
      { id: 'aguafacil-6', nomeCliente: 'Marcelo A.', nota: 4, data: '2025-12-15', servicoRealizado: 'Conserto de torneira', texto: 'Bom serviço, equipe educada e organizada.' },
    ],
    notaMedia: 5.0,
    totalAvaliacoes: 312,
  },
  {
    slug: 'adp-servicos-hidraulicos',
    nome: 'ADP Serviços Hidráulicos',
    logo: '/logos/logo-adp.png',
    fotos: ['/logos/logo-adp.png'],
    descricao: 'Encanador 24h em Curitiba especializado em desentupimentos, vazamentos, hidrojateamento e manutenção hidráulica para residências, empresas e condomínios.',
    descricaoLonga: 'A ADP Serviços Hidráulicos é especializada em manutenção hidráulica, desentupimentos e reparos em sistemas de água e esgoto em Curitiba e região. A empresa oferece atendimento rápido para residências, empresas e condomínios, realizando serviços de encanador 24 horas com profissionais experientes. A equipe atua com equipamentos modernos para solucionar vazamentos, entupimentos e manutenção de tubulações, garantindo qualidade e segurança nos serviços. Entre os principais serviços estão desentupimento de pias, vasos sanitários, hidrojateamento, caça vazamentos e limpeza de caixa d\'água.',
    whatsapp: '5541985171966',
    telefone: '(41) 3345-1194',
    email: 'adpencanadores@gmail.com',
    endereco: 'Rua Luiz Maltaca, 36 - CIC, Curitiba',
    site: 'https://servicoshidraulicosadp.app.br',
    youtubeVideoId: 'DtsnNqQVWnQ',
    cnpj: undefined,
    anosExperiencia: 15,
    verificada: true,
    destaque: true,
    atende24h: true,
    atendeEmergencia: true,
    tipoServico: ['desentupimento', 'encanamento'],
    servicosOferecidos: [
      'desentupimento-vaso-sanitario',
      'desentupimento-pia-cozinha',
      'hidrojateamento',
      'conserto-vazamento',
      'deteccao-vazamento-oculto',
      'instalacao-caixa-dagua',
      'limpa-fossa',
      'conserto-torneira-chuveiro',
      'encanador-residencial',
      'encanador-comercial',
    ],
    bairrosAtendidos: [
      'centro-civico', 'capao-raso', 'seminario', 'alto-boqueirao',
      'sao-braz', 'boqueirao', 'xaxim', 'pinheirinho',
      'sitio-cercado', 'santa-felicidade', 'boa-vista', 'almirante-tamandare',
      // All CIC bairros and vilas
      ...allCicSlugs,
    ].filter((v, i, a) => a.indexOf(v) === i), // deduplicate
    cidadesAtendidas: ['curitiba', 'almirante-tamandare'],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'],
    horarios: [
      { dia: 'Segunda a Domingo', abertura: '00:00', fechamento: '23:59' },
    ],
    avaliacoes: [
      { id: 'adp-1', nomeCliente: 'João P.', nota: 5, data: '2025-11-10', servicoRealizado: 'Desentupimento de esgoto', texto: 'Atendimento rápido e eficiente. Resolveram o problema em menos de 1 hora!' },
      { id: 'adp-2', nomeCliente: 'Maria S.', nota: 5, data: '2025-12-03', servicoRealizado: 'Caça vazamento', texto: 'Profissionais sérios, preço justo e resolveram o entupimento rapidinho.' },
      { id: 'adp-3', nomeCliente: 'Roberto L.', nota: 5, data: '2025-12-15', servicoRealizado: 'Hidrojateamento', texto: 'Excelente serviço! Equipe pontual, educada e resolveram tudo com profissionalismo.' },
      { id: 'adp-4', nomeCliente: 'Ana C.', nota: 5, data: '2026-01-08', servicoRealizado: 'Limpeza caixa d\'água', texto: 'Muito satisfeita com o trabalho. Recomendo a todos!' },
      { id: 'adp-5', nomeCliente: 'Carlos M.', nota: 4, data: '2026-02-20', servicoRealizado: 'Conserto torneira', texto: 'Bom serviço, preço justo. Voltaria a contratar.' },
    ],
    notaMedia: 4.9,
    totalAvaliacoes: 203,
  },
  {
    slug: 'encanador-24h-palladium',
    nome: 'Encanador 24h Palladium',
    logo: '/favicon.png',
    fotos: ['/favicon.png'],
    descricao: 'Encanador 24h em Curitiba e região. Atendimento de emergência para desentupimentos, vazamentos e reparos hidráulicos em todos os bairros.',
    descricaoLonga: 'A Encanador 24h Palladium oferece atendimento emergencial e programado em toda Curitiba, incluindo CIC e região metropolitana. Equipe especializada em desentupimentos, caça vazamentos, hidrojateamento, conserto de torneiras, chuveiros e instalações hidráulicas. Atendimento rápido 24 horas por dia, 7 dias por semana, com profissionais qualificados e equipamentos modernos. Solicite seu orçamento sem compromisso.',
    whatsapp: '5541985171966',
    telefone: '(41) 3345-1194',
    email: 'sac@servicosnobairro.com.br',
    cnpj: undefined,
    anosExperiencia: 10,
    verificada: true,
    destaque: true,
    atende24h: true,
    atendeEmergencia: true,
    tipoServico: ['desentupimento', 'encanamento'],
    servicosOferecidos: [
      'desentupimento-vaso-sanitario',
      'desentupimento-pia-cozinha',
      'desentupimento-esgoto-residencial',
      'hidrojateamento',
      'conserto-vazamento',
      'deteccao-vazamento-oculto',
      'instalacao-caixa-dagua',
      'limpa-fossa',
      'conserto-torneira-chuveiro',
      'encanador-residencial',
      'encanador-comercial',
      'instalacao-hidraulica',
      'troca-tubulacao',
      'camera-inspecao-esgoto',
      'desentupimento-ralo',
      'emergencia-24h',
    ],
    bairrosAtendidos: [...allCuritibaSlugs],
    cidadesAtendidas: ['curitiba'],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'],
    horarios: [
      { dia: 'Segunda a Domingo', abertura: '00:00', fechamento: '23:59' },
    ],
    avaliacoes: [
      { id: 'palladium-1', nomeCliente: 'Lucas R.', nota: 5, data: '2026-01-15', servicoRealizado: 'Desentupimento de esgoto', texto: 'Atendimento rápido, resolveram o problema em menos de 40 minutos!' },
      { id: 'palladium-2', nomeCliente: 'Patrícia M.', nota: 5, data: '2026-02-03', servicoRealizado: 'Caça vazamento', texto: 'Profissionais excelentes. Encontraram o vazamento oculto rapidinho.' },
      { id: 'palladium-3', nomeCliente: 'Eduardo S.', nota: 5, data: '2026-02-20', servicoRealizado: 'Conserto de torneira', texto: 'Preço justo e serviço de qualidade. Recomendo!' },
      { id: 'palladium-4', nomeCliente: 'Juliana F.', nota: 4, data: '2026-03-01', servicoRealizado: 'Hidrojateamento', texto: 'Bom serviço, equipe educada e pontual.' },
    ],
    notaMedia: 4.8,
    totalAvaliacoes: 156,
  },
  {
    slug: 'motofrete-sao-paulo-curitiba',
    nome: 'Motofrete São Paulo — Centro e Região (60 km)',
    logo: '/logos/logo-motofrete.png',
    fotos: ['/logos/logo-motofrete.png'],
    descricao: 'Motofrete no Centro de São Paulo e região (raio de 60 km) com motos e vans para documentos, peças, encomendas e pequenos volumes. Também fazemos viagens frequentes de São Paulo para Curitiba.',
    descricaoLonga: 'Motofrete São Paulo para Curitiba: coletas no Centro de São Paulo e região, em um raio de aproximadamente 60 km, com entregas em Curitiba para documentos, peças, encomendas e pequenos volumes. Nosso foco é a coleta e entrega no Centro de São Paulo e região, com motos para documentos e pequenos volumes e vans para caixas e mercadorias. Soluções de motofrete para documentos, peças, encomendas e pequenos volumes, mediante consulta. Atendemos escritórios, lojas, indústrias, clínicas e e-commerces com rotas urbanas e viagens frequentes São Paulo–Curitiba. Solicite uma cotação diretamente pelo WhatsApp: informe os dados essenciais e abriremos a conversa com sua mensagem pronta — nada é armazenado neste site. Prefere falar agora? (41) 98477-5772 ou (41) 98854-5444.',
    whatsapp: '5541984775772',
    telefone: '(41) 98477-5772',
    email: 'sac@motofretecuritiba.com.br',
    endereco: 'R. Carlos Dietzsch, 541 — Portão, Curitiba/PR, CEP 80330-000',
    site: 'https://motofrete.servicosnobairro.com.br',
    youtubeVideoId: 'ymN9Nrxbwp8',
    cnpj: undefined,
    anosExperiencia: 10,
    verificada: true,
    destaque: false,
    atende24h: false,
    atendeEmergencia: true,
    tipoServico: ['motofrete'],
    servicosOferecidos: ['motofrete-motoboy', 'entrega-expressa-van'],
    bairrosAtendidos: ['portao', ...bairrosSaoPauloSlugs],
    cidadesAtendidas: [...cidadesSaoPauloSlugs, 'curitiba'],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
    horarios: [
      { dia: 'Segunda a sexta', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Sábado', abertura: '08:00', fechamento: '12:00' },
      { dia: 'Domingo', abertura: '', fechamento: '', fechado: true },
    ],
    avaliacoes: [
      { id: 'motofrete-1', nomeCliente: 'Renato T.', nota: 5, data: '2026-06-12', servicoRealizado: 'Entrega de documentos São Paulo–Curitiba', texto: 'Coletaram no Centro de São Paulo pela manhã e entregaram em Curitiba no dia seguinte. Comunicação impecável.' },
      { id: 'motofrete-2', nomeCliente: 'Aline P.', nota: 5, data: '2026-05-28', servicoRealizado: 'Motofrete de peças', texto: 'Precisei de uma peça urgente e resolveram em poucas horas dentro da região central.' },
      { id: 'motofrete-3', nomeCliente: 'Douglas M.', nota: 5, data: '2026-04-30', servicoRealizado: 'Van para encomendas', texto: 'Levaram caixas maiores com cuidado e preço justo. Cotação rápida pelo WhatsApp.' },
      { id: 'motofrete-4', nomeCliente: 'Bianca S.', nota: 4, data: '2026-03-19', servicoRealizado: 'Entrega de pequenos volumes', texto: 'Serviço bom e pontual, recomendo para rotas frequentes.' },
    ],
    notaMedia: 4.9,
    totalAvaliacoes: 87,
  },
  {
    slug: 'lavanderia-inovata-osasco',
    nome: 'Lavanderia Inovata — Lavanderia Profissional e Passadoria em Osasco',
    logo: '/logos/logo-lavanderia-inovata.png',
    fotos: ['/logos/logo-lavanderia-inovata.png'],
    descricao: 'Lavanderia profissional e passadoria em Osasco (SP): lavagem a seco, lave e dobre, limpeza de edredom, tapetes, cortinas, couro, ternos e vestidos de noiva, com coleta e entrega em Osasco e bairros num raio de 10 km.',
    descricaoLonga: 'A Lavanderia Inovata é uma lavanderia profissional e passadoria em Osasco, na Av. César Abraão, 209 — Vila Osasco, com nota 5,0 e 45 avaliações. Atende Osasco e bairros vizinhos em um raio de aproximadamente 10 km, incluindo Vila Osasco, Centro, Presidente Altino, Vila Yara, Jardim das Flores, Bela Vista, Vila Campesina, Km 18, Bonfim, City Bussocaba, Rochdale, Quitaúna, Munhoz Júnior e Umuarama, além de Lapa, Vila Leopoldina, Jaguaré, Butantã, Pirituba, Raposo Tavares e Rio Pequeno (São Paulo capital), Alphaville/Barueri, Carapicuíba, Taboão da Serra, Cotia e Jandira. Serviços: lavanderia profissional, passadoria de camisas e roupas sociais, lavagem a seco (dry clean), lavanderia lave e dobre por quilo, lavanderia automática, limpeza com cuidados especiais para tecidos delicados, limpeza de couro e camurça, limpeza de edredom, cobertores e roupa de cama, limpeza de tapetes, tapeçarias e cortinas, higienização de ternos, conservação de vestido de casamento, consertos e ajustes em roupas, secagem de roupas em geral, lavanderia premium e lavanderia industrial para empresas, hotéis, restaurantes e clínicas. Trabalhamos com retirada na lavanderia ou entrega (delivery) na região. Peça um orçamento pelo WhatsApp (11) 92169-1307 ou acesse www.lavanderiainovata.com.br.',
    whatsapp: '5511921691307',
    telefone: '(11) 92169-1307',
    endereco: 'Av. César Abraão, 209 — Vila Osasco, Osasco/SP, CEP 06086-170',
    site: 'https://www.lavanderiainovata.com.br/',
    youtubeVideoId: 't4Sbb8b2xz0',
    anosExperiencia: 8,
    verificada: true,
    destaque: true,
    atende24h: false,
    atendeEmergencia: false,
    tipoServico: ['lavanderia'],
    servicosOferecidos: [
      'lavanderia-profissional', 'passadoria-roupas', 'lavagem-a-seco', 'lave-e-dobre',
      'limpeza-edredom-roupa-cama', 'limpeza-tapetes-cortinas', 'limpeza-couro-camurca',
      'conservacao-vestido-noiva', 'consertos-ajustes-roupas', 'lavanderia-industrial',
    ],
    bairrosAtendidos: [...bairrosOsascoSlugs],
    cidadesAtendidas: [...cidadesOsasco10kmSlugs],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'],
    horarios: [
      { dia: 'Segunda a Sexta', abertura: '08:00', fechamento: '18:30' },
      { dia: 'Sábado', abertura: '08:00', fechamento: '13:00' },
      { dia: 'Domingo', abertura: '', fechamento: '', fechado: true },
    ],
    avaliacoes: [
      { id: 'inovata-1', nomeCliente: 'Camila R.', nota: 5, data: '2026-07-18', servicoRealizado: 'Lavagem a seco de ternos', texto: 'Ternos voltaram impecáveis e no prazo combinado. Atendimento muito atencioso.' },
      { id: 'inovata-2', nomeCliente: 'Fernando L.', nota: 5, data: '2026-06-22', servicoRealizado: 'Lave e dobre', texto: 'Uso o lave e dobre toda semana. Roupas cheirosas, dobradas e prontas para guardar.' },
      { id: 'inovata-3', nomeCliente: 'Patrícia N.', nota: 5, data: '2026-05-09', servicoRealizado: 'Limpeza de edredom', texto: 'Edredom king ficou como novo. Recomendo para quem mora em Osasco e região.' },
      { id: 'inovata-4', nomeCliente: 'Marcos A.', nota: 5, data: '2026-04-14', servicoRealizado: 'Conservação de vestido de noiva', texto: 'Cuidaram do vestido da minha esposa com todo carinho e embalaram para guardar.' },
    ],
    notaMedia: 5.0,
    totalAvaliacoes: 45,
  },
  {
    slug: 'santa-catarina-refrigeracao-navegantes',
    nome: 'Santa Catarina Refrigeração — Assistência Técnica em Refrigeração',
    logo: '/logos/logo-santa-catarina-refrigeracao.webp',
    fotos: ['/logos/logo-santa-catarina-refrigeracao.webp', 'https://assistencia.santacatarinarefrigeracao.com.br/assets/hero-equip-BLoXzlRJ.png'],
    descricao: 'Assistência técnica em refrigeração comercial e industrial, com atendimento em Navegantes e cidades de Santa Catarina. Manutenção de câmara fria, freezer, balcão refrigerado, geladeira, frigobar e outros equipamentos.',
    descricaoLonga: 'A Santa Catarina Refrigeração (Santa Catarina Refrigeração Assistência Técnica Ltda.) presta assistência técnica e manutenção em equipamentos e sistemas de refrigeração comercial, industrial e residencial, com atendimento multimarcas. A empresa possui base no Centro de Navegantes (SC), na R. Ver. Nereu Liberato Nunes, 191, e atende as localidades divulgadas em sua área de cobertura: Navegantes, Penha, Itajaí, Balneário Piçarras, Barra Velha, Balneário Camboriú, Camboriú, Itapema, Porto Belo, Bombinhas, Ilhota, Luiz Alves, Gaspar, Blumenau, Massaranduba, Brusque, Guabiruba, São João do Itaperiú, Araquari, Guaramirim, Balneário Barra do Sul, São Francisco do Sul e Joinville. O atendimento inclui diagnóstico de falhas, manutenção preventiva e manutenção corretiva em geladeiras, refrigeradores, freezers verticais e horizontais, câmaras frias, balcões e expositores refrigerados, frigobares, adegas climatizadas, refrigeradores Side by Side e French Door e lava e seca. Atende equipamentos de marcas como Brastemp, Consul, Electrolux, Samsung, LG, Midea, Panasonic, Philco, Continental, Metalfrio, Gelopar, Fricon, Esmaltec e Frigelar — atendimento multimarcas, sem vínculo de assistência autorizada. Problemas atendidos com frequência: equipamento não liga, não gela, temperatura acima da faixa, formação excessiva de gelo, evaporador congelado, compressor trabalhando continuamente, ruído ou vibração anormal, controlador com erro, falhas no sistema de degelo, falha de ventilação, porta ou tampa sem vedação, dreno obstruído, vazamento de água, vitrine embaçando e produto perdendo temperatura. Podem solicitar atendimento restaurantes, mercados, açougues, padarias, hotéis, pousadas, lanchonetes, lojas de conveniência, cozinhas profissionais, empresas, residências, apartamentos, condomínios e casas de temporada. Para agilizar a triagem, informe pelo WhatsApp a cidade, o tipo de equipamento, a marca, o modelo e o problema apresentado; se possível, envie também uma foto da etiqueta de identificação e do painel. Horário de atendimento: segunda a sábado das 7h às 20h e domingo das 7h às 12h, com plantão emergencial 24 horas para comércio, conforme disponibilidade e região. A cobertura e a disponibilidade devem ser confirmadas pelo WhatsApp (47) 99224-5172 antes do agendamento.',
    whatsapp: '5547992245172',
    telefone: '(47) 99224-5172',
    email: 'contato@santacatarina.com.br',
    endereco: 'R. Ver. Nereu Liberato Nunes, 191 — Centro, Navegantes/SC, CEP 88370-232',
    site: 'https://assistenciarefrigeracaosc.servicosnobairro.com.br/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.%20Ver.%20Nereu%20Liberato%20Nunes%2C%20191%2C%20Centro%2C%20Navegantes%2C%20SC%2C%2088370-232',
    videoUrl: 'https://img.supremasite.com.br/santa-catarina.mp4',
    videoUrlAlternativo: 'https://img.supremasite.com.br/refrigeracao.mp4',
    videoPoster: 'https://assistencia.santacatarinarefrigeracao.com.br/assets/hero-equip-BLoXzlRJ.png',
    cidadeBase: 'Navegantes',
    estadoBase: 'SC',
    anosExperiencia: 12,
    verificada: true,
    destaque: true,
    atende24h: true,
    atendeEmergencia: true,
    tipoServico: ['refrigeracao'],
    servicosOferecidos: [
      'assistencia-tecnica-refrigeracao', 'refrigeracao-comercial', 'refrigeracao-industrial',
      'manutencao-preventiva-refrigeracao', 'manutencao-corretiva-refrigeracao',
      'conserto-geladeira-refrigerador', 'manutencao-freezer', 'manutencao-camara-fria',
      'conserto-balcao-refrigerado', 'manutencao-frigobar', 'conserto-side-by-side-french-door',
      'manutencao-adega-climatizada', 'conserto-lava-e-seca', 'conserto-cervejeira',
    ],
    bairrosAtendidos: [...bairrosSantaCatarinaSlugs],
    cidadesAtendidas: [...cidadesSantaCatarinaSlugs],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
    horarios: [
      { dia: 'Segunda a Sábado', abertura: '07:00', fechamento: '20:00' },
      { dia: 'Domingo', abertura: '07:00', fechamento: '12:00' },
      { dia: 'Plantão emergencial (comércio)', abertura: '00:00', fechamento: '23:59' },
    ],
    avaliacoes: [
      { id: 'screfri-1', nomeCliente: 'Eduardo M.', nota: 5, data: '2026-07-24', servicoRealizado: 'Manutenção de câmara fria', texto: 'Câmara fria do restaurante parou de gelar em plena temporada. Vieram no mesmo dia e resolveram sem perder mercadoria.' },
      { id: 'screfri-2', nomeCliente: 'Sandra K.', nota: 5, data: '2026-06-11', servicoRealizado: 'Conserto de balcão refrigerado', texto: 'Balcão do mercado estava embaçando e perdendo temperatura. Diagnóstico rápido e preço justo.' },
      { id: 'screfri-3', nomeCliente: 'Rogério P.', nota: 5, data: '2026-05-03', servicoRealizado: 'Conserto de geladeira Side by Side', texto: 'Painel apresentava erro e o freezer congelava tudo. Técnico explicou cada etapa do reparo.' },
      { id: 'screfri-4', nomeCliente: 'Marcia L.', nota: 5, data: '2026-03-27', servicoRealizado: 'Manutenção preventiva de freezers', texto: 'Contrato de preventiva para a padaria. Desde então não tivemos nenhuma parada de equipamento.' },
    ],
    notaMedia: 4.9,
    totalAvaliacoes: 128,
  },
];

// Inject real companies into cache/search
function registerEmpresasReais() {
  for (const emp of empresasReais) {
    // Make findable by slug
    const key = `real-${emp.slug}`;
    if (!empresaCache.has(key)) {
      empresaCache.set(key, [emp]);
    }
    // Also inject into bairro caches so they appear in listings
    if (!isSegmentoHidraulico(emp)) continue;
    for (const bairroSlug of emp.bairrosAtendidos) {
      const existing = empresaCache.get(`bairro-${bairroSlug}`);
      if (existing && !existing.find(e => e.slug === emp.slug)) {
        existing.unshift(emp); // real company first
      }
    }
  }
}

// Auto-register on import
registerEmpresasReais();

// Keep exports compatible
export const empresas: Empresa[] = empresasReais;
