import { Empresa, Bairro } from '@/types';
import { todosBairros, allCicSlugs, bairros, bairrosPopularesData } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { bairrosSaoPauloSlugs, cidadesSaoPauloSlugs, bairrosOsascoSlugs, cidadesOsasco10kmSlugs } from '@/data/bairros-sp';
import { bairrosSantaCatarinaSlugs, cidadesSantaCatarinaSlugs } from '@/data/cidades-sc';

// Segmentos que NÃO devem aparecer nas listagens hidráulicas por bairro/cidade
const SEGMENTOS_NAO_HIDRAULICOS = ['motofrete', 'lavanderia', 'refrigeracao', 'construcao', 'madeireira'] as const;
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
  'navegantes': { lat: -26.8953, lng: -48.6534 },
  'sc-navegantes-centro': { lat: -26.8953, lng: -48.6534 },
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

// Cache para empresas reais
const empresaCache = new Map<string, Empresa[]>();

export function getEmpresasPorBairro(bairroSlug: string): Empresa[] {
  if (empresaCache.has(`bairro-${bairroSlug}`)) {
    return empresaCache.get(`bairro-${bairroSlug}`)!;
  }
  const empresas = empresasReais.filter(emp =>
    isSegmentoHidraulico(emp) &&
    (emp.bairrosAtendidos.includes(bairroSlug) || emp.bairrosAtendidos.includes('centro') || emp.bairrosAtendidos.length > 50)
  );
  empresaCache.set(`bairro-${bairroSlug}`, empresas);
  return empresas;
}

export function getEmpresasPorCidade(cidadeSlug: string): Empresa[] {
  if (empresaCache.has(`cidade-${cidadeSlug}`)) {
    return empresaCache.get(`cidade-${cidadeSlug}`)!;
  }
  const empresas = empresasReais.filter(emp =>
    emp.tipoServico.includes('desentupimento') &&
    emp.cidadesAtendidas.includes(cidadeSlug)
  );
  empresaCache.set(`cidade-${cidadeSlug}`, empresas);
  return empresas;
}

export function getEmpresaBySlug(slug: string): Empresa | undefined {
  return empresasReais.find(
    e => e.slug === slug || (e.slug === 'madeireira-bairro-novo' && slug === 'madeireira-bairro-novo-curitiba')
  );
}

export function getEmpresasPorServico(servicoSlug: string): Empresa[] {
  return empresasReais.filter(e => e.servicosOferecidos.includes(servicoSlug));
}

/**
 * Empresas em destaque = empresas reais com marca de destaque.
 */
export function getEmpresasDestaque(limite = 6): Empresa[] {
  // Prioriza empresas marcadas como destaque, seguidas pelas verificadas,
  // mantendo a ordem inversa (últimas cadastradas primeiro) para rotatividade.
  const empresasRotacionadas = [...empresasReais].reverse();
  const destaque = empresasRotacionadas.filter(e => e.destaque);
  const verificadas = empresasRotacionadas.filter(e => e.verificada && !e.destaque);
  
  return [...destaque, ...verificadas].slice(0, limite);
}

export function getUltimasEmpresasCadastradas(limite = 6): Empresa[] {
  return [...empresasReais].reverse().slice(0, limite);
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
    descricaoLonga: 'A Água Fácil é referência em desentupidora e encanadores 24 horas em Curitiba e em toda a Região Metropolitana (RMC). Atendemos os 75 bairros oficiais de Curitiba — Centro, Batel, Água Verde, Bigorrilho, Boqueirão, Cajuru, CIC, Portão, Santa Felicidade, Pinheirinho, Sítio Cercado, Xaxim, Hauer, Bacacheri, Boa Vista, Uberaba, Tatuquara, entre outros — além das vilas e regiões populares como Vila Sandra, Neoville, Vitória Régia, Caiuá, Sabará, Nossa Senhora da Luz, Vila Pantanal, Vila Torres, Vila Hauer, Vila Guaíra, Vila Oficinas, Pinheirinho Velho, Sítio Cercado Velho, Capão Raso Velho, Jardim Gabineto, Jardim Itatiaia e muito mais. Também atendemos São José dos Pinhais, Pinhais, Colombo, Araucária, Almirante Tamandaré, Campo Largo, Campo Magro, Fazenda Rio Grande, Quatro Barras, Campina Grande do Sul, Mandirituba, Balsa Nova, Rio Branco do Sul, Itaperuçu, Piraquara e Tijucas do Sul. Especialistas em desentupimento de esgoto, pia, vaso sanitário, ralo, caixa de gordura, hidrojateamento, câmera de inspeção, limpa fossa, caça vazamento, conserto de vazamento, troca de tubulação, instalação hidráulica e emergência 24h. Fale com Fátima pelo WhatsApp (41) 98517-1966 ou ligue (41) 3345-1194.',
    whatsapp: '5541985171966',
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
    cidadesAtendidas: ['curitiba', 'almirante-tamandare', 'piraquara'],
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
    cidadesAtendidas: ['curitiba', 'piraquara'],
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
  {
    slug: 'refrigeracao-navegantes-sc',
    nome: 'Refrigeração Navegantes SC',
    razaoSocial: 'Refrigeração Navegantes SC Assistência Técnica Ltda.',
    slogan: 'Assistência Técnica Especializada em Refrigeração Multimarcas',
    logo: '/logos/logo-santa-catarina-refrigeracao.webp',
    fotos: ['/logos/logo-santa-catarina-refrigeracao.webp', 'https://assistencia.santacatarinarefrigeracao.com.br/assets/hero-equip-BLoXzlRJ.png'],
    descricao: 'Assistência técnica em Navegantes e região. Conserto de geladeiras, cervejeiras e câmaras frias multimarcas com orçamento sem custo e garantia de 90 dias.',
    descricaoLonga: 'A Refrigeração Navegantes SC (Refrigeração Navegantes SC Assistência Técnica Ltda.) presta assistência técnica especializada em refrigeração residencial, comercial e industrial. Com base operacional em Navegantes e rota de atendimento programada para 23 municípios do litoral norte e Vale do Itajaí, atendemos clientes que precisam restabelecer o funcionamento de seus equipamentos de refrigeração e lavagem com segurança e pontualidade.\n\nNossos serviços abrangem o diagnóstico e conserto de geladeiras convencionais, refrigeradores side by side e french door, freezers, frigobares, adegas climatizadas e máquinas lava e seca. Na linha comercial e industrial, realizamos reparos e manutenção preventiva em cervejeiras, balcões refrigerados, câmaras frias e instalações frigoríficas completas para comércios, restaurantes e pousadas.\n\nTrabalhamos com as principais marcas do mercado nacional e importado: Brastemp, Consul, Electrolux, Samsung, LG, Midea, Panasonic, Philco, Continental, Metalfrio, Gelopar, Fricon, Esmaltec e Frigelar. O método de trabalho prioriza diagnósticos técnicos por medição e instrumentação, evitando substituições desnecessárias de componentes, sempre com peças originais ou equivalentes homologadas pelos fabricantes.\n\nO atendimento oferece orçamento gratuito antes da execução do serviço e garantia legal de 90 dias formalizada por escrito para peças e mão de obra. As visitas são realizadas em rota programada com horário marcado de segunda a sábado das 07h às 20h e aos domingos das 07h às 12h.\n\nPara agendar uma avaliação técnica em seu endereço, entre em contato com a equipe pelo telefone ou WhatsApp (47) 99194-7292.',
    whatsapp: '5547991947292',
    telefone: '(47) 99194-7292',
    email: 'info@refrigeracaosc.com.br',
    endereco: 'R. Ver. Nereu Liberato Nunes, 192 — Centro, Navegantes/SC, CEP 88370-232',
    site: 'https://refrigeracaonavegantessc.servicosnobairro.com.br/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Ver.+Nereu+Liberato+Nunes%2C+192+-+Centro%2C+Navegantes+-+SC%2C+88370-232',
    videoUrl: 'https://img.supremasite.com.br/santa-catarina.mp4',
    videoUrlAlternativo: 'https://img.supremasite.com.br/refrigeracao.mp4',
    videoPoster: 'https://assistencia.santacatarinarefrigeracao.com.br/assets/hero-equip-BLoXzlRJ.png',
    cidadeBase: 'Navegantes',
    estadoBase: 'SC',
    anosExperiencia: 10,
    verificada: true,
    destaque: true,
    atende24h: false,
    atendeEmergencia: true,
    tipoServico: ['refrigeracao'],
    servicosOferecidos: [
      'conserto-geladeira-refrigerador',
      'conserto-side-by-side-french-door',
      'manutencao-frigobar',
      'manutencao-freezer',
      'manutencao-camara-fria',
      'conserto-balcao-refrigerado',
      'manutencao-adega-climatizada',
      'conserto-cervejeira',
      'conserto-lava-e-seca',
      'refrigeracao-comercial',
      'refrigeracao-industrial',
      'manutencao-preventiva-refrigeracao',
      'assistencia-tecnica-refrigeracao',
    ],
    marcasAtendidas: [
      'Brastemp', 'Consul', 'Electrolux', 'Samsung', 'LG', 'Midea',
      'Panasonic', 'Philco', 'Continental', 'Metalfrio', 'Gelopar',
      'Fricon', 'Esmaltec', 'Frigelar',
    ],
    diferenciais: [
      'Garantia de 90 dias por escrito para peças e serviços',
      'Orçamento gratuito antes da execução do serviço',
      'Atendimento em rota programada com horário marcado',
      'Peças originais e equivalentes homologadas',
      'Diagnóstico por medição, sem troca de peça por adivinhação',
    ],
    faq: [
      {
        pergunta: 'A empresa cobra taxa de visita ou orçamento?',
        resposta: 'Não. O orçamento é fornecido gratuitamente antes de qualquer execução de serviço no endereço atendido.',
      },
      {
        pergunta: 'Os serviços e peças possuem garantia?',
        resposta: 'Sim. Todos os reparos e componentes substituídos acompanham garantia de 90 dias formalizada por escrito.',
      },
      {
        pergunta: 'Quais tipos de peças são utilizadas nos reparos?',
        resposta: 'Trabalhamos exclusivamente com peças originais dos fabricantes ou peças equivalentes homologadas com procedência técnica.',
      },
      {
        pergunta: 'Como funciona o agendamento do atendimento?',
        resposta: 'Os atendimentos são organizados em rotas programadas por cidade com agendamento de horário marcado, de segunda a sábado das 07h às 20h e domingos das 07h às 12h.',
      },
      {
        pergunta: 'Quais marcas de equipamentos a empresa atende?',
        resposta: 'Realizamos manutenção em Brastemp, Consul, Electrolux, Samsung, LG, Midea, Panasonic, Philco, Continental, Metalfrio, Gelopar, Fricon, Esmaltec e Frigelar.',
      },
    ],
    bairrosAtendidos: [...bairrosSantaCatarinaSlugs],
    cidadesAtendidas: [...cidadesSantaCatarinaSlugs],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
    horarios: [
      { dia: 'Segunda a Sábado', abertura: '07:00', fechamento: '20:00' },
      { dia: 'Domingo', abertura: '07:00', fechamento: '12:00' },
    ],
    avaliacoes: [
      { id: 'navrefri-1', nomeCliente: 'Cláudio R.', nota: 5, data: '2026-08-14', servicoRealizado: 'Conserto de geladeira French Door', texto: 'A geladeira parou de refrigerar a parte inferior. O técnico veio com hora marcada e fez o diagnóstico rápido por medição.' },
      { id: 'navrefri-2', nomeCliente: 'Mariana S.', nota: 4, data: '2026-07-29', servicoRealizado: 'Manutenção de cervejeira', texto: 'Cervejeira da pousada não chegava na temperatura ideal. Fizeram a limpeza do condensador e recarga técnica.' },
      { id: 'navrefri-3', nomeCliente: 'Felipe B.', nota: 4, data: '2026-06-18', servicoRealizado: 'Reparo em refrigerador Side by Side', texto: 'Muito bom o atendimento via WhatsApp e a pontualidade na rota em Penha. Garantia de 90 dias por escrito.' },
      { id: 'navrefri-4', nomeCliente: 'Renata L.', nota: 3, data: '2026-05-10', servicoRealizado: 'Conserto de freezer', texto: 'O serviço foi bem executado e o equipamento voltou a funcionar perfeitamente, apenas o agendamento foi para o período da tarde.' },
      { id: 'navrefri-5', nomeCliente: 'Valdir M.', nota: 3, data: '2026-04-02', servicoRealizado: 'Manutenção de câmara fria', texto: 'Atendimento técnico correto e resolveram o problema do degelo. Preço dentro do padrão.' },
    ],
    notaMedia: 3.8,
    totalAvaliacoes: 84,
  },
  {
    slug: 'borba-refrigeracao-curitiba',
    nome: 'Borba Refrigeração — Assistência Técnica e Equipamentos em Curitiba',
    logo: 'https://refrigeracao.servicosnobairro.com.br/images/borba-logo.png',
    fotos: [
      'https://refrigeracao.servicosnobairro.com.br/images/fachada-original.jpg',
      'https://refrigeracao.servicosnobairro.com.br/images/balcao-refrigerado.jpg',
      'https://refrigeracao.servicosnobairro.com.br/images/bancada-inox.jpg',
      'https://refrigeracao.servicosnobairro.com.br/images/buffet-inox.jpg'
    ],
    descricao: 'A Borba Refrigeração, localizada no Sítio Cercado, em Curitiba, oferece assistência técnica em geladeiras, freezers, expositores e balcões refrigerados para residências e comércios. Também trabalha com compra e venda de equipamentos e fabricação sob medida de bancadas e estruturas em inox.',
    descricaoLonga: 'A Borba Refrigeração, localizada no Sítio Cercado, em Curitiba, oferece assistência técnica em geladeiras, freezers, expositores e balcões refrigerados para residências e comércios. Também trabalha com compra e venda de equipamentos de refrigeração e fabricação sob medida de bancadas, balcões e estruturas em inox para restaurantes, buffets e cozinhas profissionais. Solicite atendimento ou orçamento pelo WhatsApp (41) 99609-1688. Envie seu bairro, fotos e uma descrição do que precisa. Disponibilidade, valores, prazos e condições são confirmados diretamente com a Borba.',
    whatsapp: '5541996091688',
    telefone: '(41) 99609-1688',
    email: 'mborba0304@gmail.com',
    endereco: 'Rua Marte, 942, Sítio Cercado, Curitiba – PR, CEP 81910-340',
    site: 'https://refrigeracao.servicosnobairro.com.br',
    cidadeBase: 'Curitiba',
    estadoBase: 'PR',
    verificada: false,
    destaque: false,
    atende24h: false,
    atendeEmergencia: true,
    tipoServico: ['refrigeracao'],
    servicosOferecidos: [
      'conserto-geladeira-refrigerador',
      'manutencao-freezer',
      'conserto-balcao-refrigerado',
      'fabricacao-inox-sob-medida',
      'assistencia-tecnica-refrigeracao'
    ],
    bairrosAtendidos: ['sitio-cercado', 'boqueirao', 'hauer', 'xaxim', 'pinheirinho'],
    cidadesAtendidas: ['Curitiba', 'São José dos Pinhais', 'Pinhais'],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'],
    horarios: [
      { dia: 'Segunda a Sexta', abertura: '08:00', fechamento: '18:00' }
    ],
    avaliacoes: [],
    notaMedia: 0,
    totalAvaliacoes: 0,
  },
  {
    slug: 'sangel-bebedouros-purificadores',
    nome: 'Sangel Bebedouros e Purificadores em Curitiba — Higienização e Manutenção',
    razaoSocial: 'SANGEL COMERCIO DE BEBEDOUROS E PURIFICADORES LTDA',
    cnpj: '17.354.635/0001-90',
    logo: 'https://purificcuritibacentro.com.br/wp-content/uploads/2025/10/Ativo-2@300x.png',
    fotoCapa: 'https://purificcuritibacentro.com.br/wp-content/uploads/2026/02/Bebedouro-industrial-Novo.jpg',
    fotos: [
      'https://purificcuritibacentro.com.br/wp-content/uploads/2026/02/Bebedouro-industrial-Novo.jpg',
      'https://purificcuritibacentro.com.br/wp-content/uploads/2026/02/Linha-de-Bebedouros-de-galao-mesa-e-colun.jpg',
      'https://purificcuritibacentro.com.br/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-02-at-14.46.18.jpeg',
    ],
    descricao: 'A Sangel trabalha com bebedouros e purificadores de água em Curitiba e Região Metropolitana, oferecendo venda de equipamentos, higienização, manutenção, conserto, instalação e troca de refil.',
    descricaoLonga: 'A Sangel trabalha com bebedouros e purificadores de água em Curitiba e Região Metropolitana, oferecendo venda de equipamentos, higienização, manutenção, conserto, instalação e troca de refil.\n\nAtendemos necessidades de residências, escritórios, comércios, escolas e empresas. Nossa equipe orienta sobre equipamentos e refis compatíveis e recebe solicitações de assistência para vazamentos, problemas de refrigeração e outras falhas de funcionamento.\n\nVisite nossa loja na Rua Cruz Machado, 392, no Centro de Curitiba. Para consultar modelos, valores ou disponibilidade de atendimento, envie uma mensagem pelo WhatsApp (41) 99522-0506. Se possível, informe o bairro, a marca e o modelo do equipamento.\n\nTelefone comercial: (41) 3222-1723.\nE-mail: sandra@sangel.com.br.\n\nConheça nossos produtos e serviços: https://purificcuritibacentro.com.br/',
    whatsapp: '5541995220506',
    telefone: '(41) 3222-1723',
    email: 'sandra@sangel.com.br',
    endereco: 'Rua Cruz Machado, 392, Centro, Curitiba/PR, CEP 80410-170',
    site: 'https://purificcuritibacentro.com.br/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Cruz+Machado%2C+392%2C+Centro%2C+Curitiba+-+PR%2C+80410-170',
    cidadeBase: 'Curitiba',
    estadoBase: 'PR',
    anosExperiencia: 13,
    verificada: true,
    destaque: false,
    atende24h: false,
    atendeEmergencia: false,
    tipoServico: ['refrigeracao'],
    servicosOferecidos: [
      'manutencao-bebedouros-purificadores',
      'higienizacao-bebedouros',
      'conserto-purificadores',
      'troca-de-refil',
      'venda-bebedouros-industriais',
      'instalacao-purificadores',
      'assistencia-tecnica-refrigeracao',
    ],
    bairrosAtendidos: [
      'centro', 'batel', 'agua-verde', 'bigorrilho', 'merces', 'reboucas',
      'boa-vista', 'portao', 'sitio-cercado', 'boqueirao', 'cajuru',
      'cabral', 'juveve', 'alto-da-xv', 'cristo-rei', 'jardim-botanico',
      'santa-felicidade', 'campo-comprido',
    ],
    cidadesAtendidas: [
      'Curitiba', 'São José dos Pinhais', 'Pinhais', 'Colombo',
      'Araucária', 'Campo Largo', 'Fazenda Rio Grande', 'Almirante Tamandaré', 'Piraquara',
    ],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
    horarios: [
      { dia: 'Segunda a Sexta', abertura: '08:30', fechamento: '18:00' },
    ],
    redesSociais: {
      instagram: 'https://www.instagram.com/sangelebebedouros/',
    },
    avaliacoes: [],
    notaMedia: 0,
    totalAvaliacoes: 0,
  },
  {
    slug: 'madeireira-bairro-novo',
    nome: 'Madeireira Bairro Novo',
    titleSeo: 'Madeireira Bairro Novo em Curitiba | Madeira de Pinus, Tábuas, Caibros e Vigas',
    razaoSocial: 'Bairro Novo Comércio de Madeiras Ltda.',
    cnpj: '44.205.587/0001-40',
    logo: 'https://pinus.madeireirabairronovo.com.br/img/madeira-pinus-in-natura.jpg',
    fotoCapa: 'https://pinus.madeireirabairronovo.com.br/img/madeira-pinus-in-natura.jpg',
    fotos: [
      'https://pinus.madeireirabairronovo.com.br/img/madeira-pinus-in-natura.jpg',
      'https://pinus.madeireirabairronovo.com.br/img/vigas-barrote-pinus.jpg',
      'https://pinus.madeireirabairronovo.com.br/img/escoras-pinus-laje.jpg',
      'https://http2.mlstatic.com/D_NQ_NP_2X_999161-MLB115526529167_082026-F-tabua-de-20-pinus-aparelhada-c-3-metros.webp',
      'https://images.cws.digital/produtos/gg/28/34/caibro-pinus-para-telhado-3000x55x55mm-118x22x22-polegadas-3m-madeiras-n-10573428-1744295482122.jpg',
      'https://static.kiaga.com.br/public/kiaga/imagens/produtos/media/ripa-de-madeira-pinus-natural-para-artesanato-4x2-646deb2fa511f.jpg',
    ],
    descricao: 'A Madeireira Bairro Novo, no Sítio Cercado em Curitiba, é especializada em madeira de pinus in natura para construção civil, telhados, caixarias e escoramentos. Estoque próprio, corte sob medida e entrega programada.',
    descricaoLonga: 'A Madeireira Bairro Novo, localizada no Sítio Cercado, em Curitiba, é especializada no fornecimento de madeira de pinus serrada in natura para construção civil, telhados, caixarias, fôrmas de concreto e escoramentos.\n\nCom estoque próprio, corte sob medida e frota própria, atende construtoras, empreiteiros, carpinteiros, profissionais da construção e consumidores que procuram madeira de pinus em Curitiba e Região Metropolitana.\n\nO catálogo inclui tábuas de pinus, caibros, vigas, barrotes, ripas, sarrafos e escoras para laje, com diferentes bitolas e comprimentos, conforme a necessidade de cada projeto.\n\nA empresa trabalha com pinus proveniente de reflorestamento, oferece atendimento direto e realiza entregas programadas mediante consulta de disponibilidade e frete.\n\nPrecisa de madeira de pinus para sua obra? Solicite seu orçamento diretamente com a Madeireira Bairro Novo pelo WhatsApp (41) 3013-4692 ou visite nossa loja na Rua Coronel Joaquim Antônio de Azevedo, 1459, no Sítio Cercado, Curitiba.',
    whatsapp: '554130134692',
    telefone: '(41) 3013-4692',
    email: 'bairronovomadeiras@gmail.com',
    endereco: 'Rua Coronel Joaquim Antônio de Azevedo, 1459 — Sítio Cercado, Curitiba/PR, CEP 81920-010',
    site: 'https://pinus.madeireirabairronovo.com.br/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Joaquim+Ant%C3%B4nio+de+Azevedo%2C+1459%2C+S%C3%ADtio+Cercado%2C+Curitiba+-+PR%2C+81920-010',
    cidadeBase: 'Curitiba',
    estadoBase: 'PR',
    anosExperiencia: 5,
    verificada: true,
    destaque: true,
    atende24h: false,
    atendeEmergencia: false,
    tipoServico: ['construcao', 'madeireira'],
    servicosOferecidos: [
      'madeira-de-pinus-curitiba',
      'tabuas-de-pinus-caixaria',
      'caibros-de-pinus',
      'vigas-e-barrotes-de-pinus',
      'ripas-e-sarrafos-de-pinus',
      'escoras-de-pinus-para-laje',
      'corte-de-madeira-sob-medida',
      'entrega-programada-de-madeira',
    ],
    bairrosAtendidos: [
      'sitio-cercado', 'ganchinho', 'umbara', 'alto-boqueirao', 'boqueirao',
      'xaxim', 'pinheirinho', 'capao-raso', 'cidade-industrial', 'novo-mundo',
      'portao', 'fazendinha', 'tatuquara', 'caximba', 'campo-de-santana',
      'centro', 'agua-verde', 'hauer', 'uberaba', 'cajuru'
    ],
    cidadesAtendidas: [
      'Curitiba', 'São José dos Pinhais', 'Fazenda Rio Grande', 'Araucária',
      'Colombo', 'Pinhais', 'Campo Largo', 'Almirante Tamandaré', 'Piraquara'
    ],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Transferência Bancária'],
    horarios: [
      { dia: 'Segunda a Sexta', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Sábado', abertura: '08:00', fechamento: '12:00' },
      { dia: 'Domingo', abertura: '', fechamento: '', fechado: true },
    ],
    diferenciais: [
      'Madeira de pinus in natura proveniente de reflorestamento sustentável',
      'Estoque próprio a pronta entrega e corte sob medida para obras',
      'Frota própria para entrega rápida e programada em Curitiba e RMC',
      'Atendimento direto e técnico para construtoras, carpinteiros e obras residenciais',
      'Linha completa: tábuas, caibros, vigas, barrotes, ripas, sarrafos e escoras',
    ],
    produtos: [
      {
        nome: 'Madeira de Pinus Serrada In Natura',
        descricao: 'Madeira bruta serrada de alta qualidade para obras civis, fôrmas, caixarias e estruturas em geral. Procedência de reflorestamento com corte sob medida.',
        imagem: 'https://pinus.madeireirabairronovo.com.br/img/madeira-pinus-in-natura.jpg',
        alt: 'Madeira de pinus serrada in natura para obras e construção civil em Curitiba - Madeireira Bairro Novo',
        preco: 'Consulte valores',
      },
      {
        nome: 'Tábuas de Pinus para Caixaria',
        descricao: 'Tábuas selecionadas para fôrmas de concreto, caixarias e fechamentos de obra. Disponíveis nas larguras de 15, 20, 25 e 30 cm, no comprimento padrão de 3 metros.',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_2X_999161-MLB115526529167_082026-F-tabua-de-20-pinus-aparelhada-c-3-metros.webp',
        alt: 'Tábuas de pinus para caixaria de 3 metros em Curitiba - Madeireira Bairro Novo',
        preco: 'Consulte valores',
      },
      {
        nome: 'Caibros de Pinus para Telhado',
        descricao: 'Caibros resistentes para estruturas de telhado, coberturas e armações. Bitolas de 5x5, 5x7 e 5x10 cm, com excelente alinhamento e resistência.',
        imagem: 'https://images.cws.digital/produtos/gg/28/34/caibro-pinus-para-telhado-3000x55x55mm-118x22x22-polegadas-3m-madeiras-n-10573428-1744295482122.jpg',
        alt: 'Caibros de pinus para telhados e estruturas em Curitiba - Madeireira Bairro Novo',
        preco: 'Consulte valores',
      },
      {
        nome: 'Vigas e Barrotes de Pinus',
        descricao: 'Vigas e barrotes estruturais para suporte, mezaninos, engradamentos de cobertura e apoios pesados de carpintaria e construção civil.',
        imagem: 'https://pinus.madeireirabairronovo.com.br/img/vigas-barrote-pinus.jpg',
        alt: 'Vigas e barrotes de pinus para estruturas e engradamentos em Curitiba - Madeireira Bairro Novo',
        preco: 'Consulte valores',
      },
      {
        nome: 'Ripas e Sarrafos de Pinus',
        descricao: 'Ripas e sarrafos para travamentos de telhado, fixação de telhas, esquadrias e reforço de fôrmas com madeira seca e padronizada.',
        imagem: 'https://static.kiaga.com.br/public/kiaga/imagens/produtos/media/ripa-de-madeira-pinus-natural-para-artesanato-4x2-646deb2fa511f.jpg',
        alt: 'Ripas e sarrafos de pinus para telhados e travamentos em Curitiba - Madeireira Bairro Novo',
        preco: 'Consulte valores',
      },
      {
        nome: 'Escoras de Pinus para Laje',
        descricao: 'Escoras brutas reforçadas para escoramento seguro de lajes, vigas e fôrmas em obras residenciais e comerciais de pequeno a grande porte.',
        imagem: 'https://pinus.madeireirabairronovo.com.br/img/escoras-pinus-laje.jpg',
        alt: 'Escoras de madeira de pinus para laje em Curitiba - Madeireira Bairro Novo',
        preco: 'Consulte valores',
      },
    ],
    faq: [
      {
        pergunta: 'Quais tipos de madeira a Madeireira Bairro Novo comercializa?',
        resposta: 'A empresa é especializada em madeira de pinus serrada in natura proveniente de reflorestamento, comercializando tábuas para caixaria (15, 20, 25 e 30 cm por 3m), caibros (5x5, 5x7 e 5x10 cm), vigas, barrotes, ripas, sarrafos e escoras brutas para laje.',
      },
      {
        pergunta: 'A Madeireira Bairro Novo realiza entregas em Curitiba e Região Metropolitana?',
        resposta: 'Sim. Contamos com frota própria para entregas programadas em todos os bairros de Curitiba (como Sítio Cercado, Ganchinho, Umbará, Boqueirão, CIC, Pinheirinho e Xaxim) e municípios da Região Metropolitana (São José dos Pinhais, Fazenda Rio Grande, Araucária, Colombo e Pinhais). Consulte disponibilidade de frete via WhatsApp.',
      },
      {
        pergunta: 'É possível solicitar corte de madeira sob medida?',
        resposta: 'Sim! Possuímos estrutura para corte sob medida de acordo com o projeto de caixaria, telhado ou escoramento da sua obra, minimizando desperdícios e agilizando a execução.',
      },
      {
        pergunta: 'Como solicitar um orçamento rápido de madeira?',
        resposta: 'O orçamento pode ser solicitado diretamente pelo WhatsApp (41) 3013-4692 ou na loja física na Rua Cel. Joaquim Antônio de Azevedo, 1459, Sítio Cercado. Informe a lista de materiais, bitolas e o bairro de entrega para receber as cotações.',
      },
      {
        pergunta: 'Qual o horário de funcionamento da Madeireira Bairro Novo?',
        resposta: 'Nosso atendimento funciona de segunda a sexta-feira das 08h às 18h e aos sábados das 08h às 12h. Aos domingos a empresa permanece fechada.',
      },
    ],
    avaliacoes: [],
    notaMedia: 0,
    totalAvaliacoes: 0,
  },
  {
    slug: 'toldos-soares-curitiba',
    nome: 'Toldos Soares',
    titleSeo: 'Toldos Soares em Curitiba | Toldos, Coberturas e Policarbonato',
    razaoSocial: 'Toldos Soares',
    logo: 'https://toldosoares.com.br/wp-content/uploads/2024/11/logo-toldo-soares.png',
    fotoCapa: 'https://toldosoares.com.br/wp-content/uploads/2024/12/COBERTURA-DE-POLICARBONATO-01.webp',
    fotos: [
      'https://toldosoares.com.br/wp-content/uploads/2024/12/COBERTURA-DE-POLICARBONATO-01.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/COBERTURA-DE-VIDRO-01-1.webp',
      'https://toldosoares.com.br/wp-content/uploads/2024/12/toldo-retratil.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/CORTINAS-ROLO-01.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/CORTINAS-DE-LONAS-.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/COBERTURAS-DE-ZINCO-03.webp',
      'https://toldosoares.com.br/wp-content/uploads/2024/12/sombreio-01.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/REFORMA-DE-TOLDOS-01-1.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/TROCA-DE-LONA-DE-TOLDOS-01.webp',
      'https://toldosoares.com.br/wp-content/uploads/2024/12/Troca-de-Chapa-de-Policarbonato.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/09/toldos-de-policarbonato-em-Curitiba.jpg',
      'https://toldosoares.com.br/wp-content/uploads/2025/01/venda-de-lona-01.webp',
      'https://toldosoares.com.br/wp-content/uploads/2024/12/COBERTURA-DE-POLICARBONATO-03.webp',
      'https://toldosoares.com.br/wp-content/uploads/2025/09/banner-toldos.webp',
    ],
    descricao: 'A Toldos Soares é especialista na fabricação, instalação e reforma de toldos retráteis, toldos de lona, coberturas em policarbonato, vidro e zinco, cortinas rolô e sombreiros em Curitiba e Região Metropolitana.',
    descricaoLonga: 'A Toldos Soares é uma empresa especializada na fabricação, instalação e reforma de toldos e coberturas em Curitiba e Região Metropolitana.\n\nLocalizada no bairro Sítio Cercado, oferece soluções personalizadas para residências, comércios e empresas, trabalhando com toldos retráteis, toldos de lona, coberturas de policarbonato, coberturas de vidro, coberturas de zinco, cortinas de lona, cortinas rolô, sombreiros e estruturas para proteção de áreas externas.\n\nA empresa também realiza reformas de toldos, substituição de lonas, troca de chapas de policarbonato e projetos personalizados de coberturas.\n\nCom mais de 15 anos de experiência informados em seu site institucional, a Toldos Soares desenvolve projetos que combinam funcionalidade, acabamento e proteção contra sol e chuva.\n\nAtende clientes em Curitiba e Grande Curitiba, oferecendo soluções para garagens, fachadas comerciais, varandas, corredores, áreas de lazer e demais ambientes externos.\n\nSolicite seu orçamento diretamente pelo WhatsApp (41) 99800-0366.',
    whatsapp: '5541998000366',
    telefone: '(41) 3550-2323',
    email: 'contato@toldosoares.com.br',
    endereco: 'Rua Delegado Ruy Rebello Vieira, 455 — Sítio Cercado, Curitiba/PR, CEP 81920-290',
    site: 'https://toldosoares.com.br/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Delegado+Ruy+Rebello+Vieira%2C+455%2C+S%C3%ADtio+Cercado%2C+Curitiba+-+PR%2C+81920-290',
    cidadeBase: 'Curitiba',
    estadoBase: 'PR',
    anosExperiencia: 15,
    verificada: true,
    destaque: true,
    atende24h: false,
    atendeEmergencia: false,
    tipoServico: ['construcao'],
    servicosOferecidos: [
      'toldos-retraveis-curitiba',
      'toldos-de-lona-curitiba',
      'coberturas-de-policarbonato-curitiba',
      'coberturas-de-vidro-curitiba',
      'coberturas-de-zinco-curitiba',
      'toldos-de-policarbonato-curitiba',
      'cortinas-de-lona-curitiba',
      'cortinas-rolo-curitiba',
      'reforma-manutencao-toldos',
      'troca-de-lonas-toldos',
      'troca-chapas-policarbonato',
      'sombreiros-areas-externas',
      'venda-de-lonas-curitiba',
      'coberturas-sob-medida-curitiba',
    ],
    bairrosAtendidos: [
      'sitio-cercado', 'bairro-novo', 'alto-boqueirao', 'boqueirao', 'xaxim',
      'pinheirinho', 'umbara', 'ganchinho', 'capao-raso', 'agua-verde',
      'centro', 'portao', 'cidade-industrial', 'novo-mundo', 'fazendinha',
      'tatuquara', 'caximba', 'campo-de-santana', 'hauer', 'uberaba',
      'cajuru', 'reboucas', 'cabral', 'juveve', 'santa-felicidade',
      'batel', 'cristo-rei', 'centro-civico', 'bigorrilho'
    ],
    cidadesAtendidas: [
      'Curitiba', 'São José dos Pinhais', 'Fazenda Rio Grande', 'Araucária',
      'Colombo', 'Pinhais', 'Campo Largo', 'Almirante Tamandaré', 'Piraquara'
    ],
    formasPagamento: ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Transferência Bancária', 'Parcelamento no Cartão'],
    horarios: [
      { dia: 'Segunda a Sexta', abertura: '08:00', fechamento: '18:00' },
      { dia: 'Sábado', abertura: '08:00', fechamento: '12:00' },
      { dia: 'Domingo', abertura: '', fechamento: '', fechado: true },
    ],
    diferenciais: [
      'Mais de 15 anos de experiência comprovada em toldos e coberturas em Curitiba',
      'Projetos 100% personalizados sob medida para ambientes residenciais e comerciais',
      'Estruturas de alta durabilidade com perfis de alumínio e aço galvanizado',
      'Materiais com proteção anti-UV, tratamento antimofo e alta resistência a intempéries',
      'Equipe própria para visita técnica no local, medição de precisão e instalação rápida',
      'Parcelamento facilitado no cartão de crédito e orçamento sem compromisso',
    ],
    produtos: [
      {
        nome: 'Toldos Retráteis em Curitiba',
        descricao: 'Fabricação e instalação de toldos retráteis sob medida com braços articulados ou pistões, ideais para sacadas, varandas, garagens e entradas comerciais com proteção solar e recolhimento prático.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2024/12/toldo-retratil.webp',
        alt: 'Toldos Retráteis sob medida em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Toldos de Lona Residenciais e Comerciais',
        descricao: 'Toldos fixos e móveis confeccionados em lona sintética ou acrílica de alta resistência, com tratamento anti-UV e antimofo, sob medida para residências, condomínios e fachadas comerciais.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/09/toldos-de-lona-no-centro-civico.jpg',
        alt: 'Toldos de Lona Residenciais e Comerciais em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Coberturas de Policarbonato',
        descricao: 'Coberturas em policarbonato alveolar ou compacto com estrutura reforçada de alumínio ou aço galvanizado, oferecendo alta luminosidade natural, proteção contra chuva e bloqueio de raios UV.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2024/12/COBERTURA-DE-POLICARBONATO-01.webp',
        alt: 'Coberturas de Policarbonato Alveolar e Compacto em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Coberturas de Vidro',
        descricao: 'Instalação de coberturas em vidro laminado ou temperado com perfis estruturais de alumínio de fino acabamento, proporcionando sofisticação, isolamento acústico e visual moderno.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/COBERTURA-DE-VIDRO-01-1.webp',
        alt: 'Cobertura de Vidro Laminado e Temperado em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Coberturas de Zinco',
        descricao: 'Coberturas metálicas com telhas de zinco e galvalume de alta resistência para galpões, garagens, depósitos e áreas de serviço com durabilidade contra intempéries e ótimo custo-benefício.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/COBERTURAS-DE-ZINCO-03.webp',
        alt: 'Coberturas de Zinco e Telhas Metálicas em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Toldos de Policarbonato',
        descricao: 'Toldos curvos ou retos com placas de policarbonato para proteção de portas, janelas e portões contra chuva e incidência direta de sol sem escurecer os ambientes internos.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/09/toldos-de-policarbonato-em-Curitiba.jpg',
        alt: 'Toldos de Policarbonato para Portas e Janelas em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Cortinas de Lona',
        descricao: 'Cortinas retráteis de lona com visor transparente ou opaca, acionamento por manivela ou mola, para fechamento de varandas, áreas gourmet, quiosques e sacadas.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/CORTINAS-DE-LONAS-.webp',
        alt: 'Cortinas de Lona para Fechamento de Áreas Externas em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Cortinas Rolô',
        descricao: 'Cortinas rolô externas para proteção contra vento, poeira e sol, com fácil enrolamento manual ou automatizado e tecido técnico resistente para sacadas e áreas de lazer.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/CORTINAS-ROLO-01.webp',
        alt: 'Cortinas Rolô Externas em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Reforma e Manutenção de Toldos',
        descricao: 'Reforma geral, reparo mecânico, alinhamento de braços, reforço de estruturas metálicas e regulagem de sistemas de toldos de todos os modelos e marcas.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/REFORMA-DE-TOLDOS-01-1.webp',
        alt: 'Reforma e Manutenção de Toldos e Coberturas em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Troca de Lonas para Toldos',
        descricao: 'Substituição profissional de lonas rasgadas, desbotadas ou ressecadas por lonas novas de primeira linha com solda eletrônica, reaproveitando a estrutura existente com economia.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/TROCA-DE-LONA-DE-TOLDOS-01.webp',
        alt: 'Troca de Lonas para Toldos em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Troca de Chapas de Policarbonato',
        descricao: 'Manutenção e substituição de chapas de policarbonato alveolar ou compacto danificadas por granizo, sol ou tempo, com vedação e perfis de união novos.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2024/12/Troca-de-Chapa-de-Policarbonato.webp',
        alt: 'Troca de Chapas de Policarbonato em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Sombreiros para Áreas Externas',
        descricao: 'Sombreiros e coberturas tensionadas com telas de sombreamento decorativas para estacionamentos, garagens descobertas, condomínios, áreas de piscina e lazer.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2024/12/sombreio-01.webp',
        alt: 'Sombreiros para Áreas Externas e Estacionamentos em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Venda de Lonas',
        descricao: 'Comercialização de lonas sintéticas, vinílicas e impermeáveis por metro ou rolo para projetos de toldos, coberturas, transportes e utilidades gerais em Curitiba.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2025/01/venda-de-lona-01.webp',
        alt: 'Venda de Lonas em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
      {
        nome: 'Fabricação e Instalação de Coberturas Sob Medida',
        descricao: 'Projetos completos personalizados desde a medição no local, cálculo estrutural, serralheria de precisão, pintura até a instalação final de coberturas residenciais e comerciais.',
        imagem: 'https://toldosoares.com.br/wp-content/uploads/2024/12/COBERTURA-DE-POLICARBONATO-03.webp',
        alt: 'Fabricação e Instalação de Coberturas Sob Medida em Curitiba — Toldos Soares',
        preco: 'Consulte valores',
      },
    ],
    faq: [
      {
        pergunta: 'Quais tipos de toldos e coberturas a Toldos Soares fabrica?',
        resposta: 'A Toldos Soares fabrica toldos retráteis, toldos fixos de lona, coberturas de policarbonato alveolar e compacto, coberturas em vidro laminado ou temperado, coberturas de zinco/galvalume, cortinas rolô e cortinas de lona com visor para proteção de áreas externas residenciais e comerciais.',
      },
      {
        pergunta: 'A Toldos Soares atende em quais bairros e cidades da Grande Curitiba?',
        resposta: 'Atendemos todos os bairros de Curitiba (como Sítio Cercado, Boqueirão, Xaxim, Pinheirinho, Água Verde, Batel, Portão, CIC, Centro, etc.) e cidades da Região Metropolitana (São José dos Pinhais, Fazenda Rio Grande, Araucária, Colombo, Pinhais, Campo Largo e região).',
      },
      {
        pergunta: 'Como solicitar orçamento ou agendar medição no local?',
        resposta: 'O orçamento pode ser solicitado diretamente pelo WhatsApp (41) 99800-0366 ou telefone fixo (41) 3550-2323. Nossa equipe agenda visita técnica no seu endereço para tirar medidas exatas e apresentar o melhor projeto sob medida.',
      },
      {
        pergunta: 'A Toldos Soares faz reforma e troca de lona em estruturas existentes?',
        resposta: 'Sim! Realizamos reformas mecânicas e estruturais completas, além da substituição de lonas ressecadas ou rasgadas por lonas novas com proteção UV, reaproveitando sua armação existente com excelente economia.',
      },
      {
        pergunta: 'Qual a durabilidade de uma cobertura de policarbonato ou vidro?',
        resposta: 'Nossas coberturas contam com materiais de primeira qualidade com tratamento contra raios UV e perfis resistentes a intempéries, proporcionando alta vida útil (mais de 10 a 15 anos) com excelente isolamento contra sol e chuva.',
      },
      {
        pergunta: 'Quais são as opções de pagamento e parcelamento?',
        resposta: 'Oferecemos condições facilitadas via PIX, cartões de crédito com parcelamento sem juros, cartões de débito e transferência bancária.',
      },
    ],
    avaliacoes: [],
    notaMedia: 0,
    totalAvaliacoes: 0,
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
