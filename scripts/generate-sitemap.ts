/**
 * Sitemap generator - run with: npx tsx scripts/generate-sitemap.ts
 * Also used as reference for the static sitemap.xml
 */

const DOMAIN = 'https://desentupa-agora-pr.lovable.app';
const TODAY = new Date().toISOString().split('T')[0];

// Bairros from regionais
const regionais: Record<string, string[]> = {
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

const bairrosPopulares = [
  'Neo Ville', 'Vila Carmo', 'Vila Sandra', 'Bom Jesus', 'Parolinzinho', 'Igapó', 'Iapi', 'Barigui', 'Gramado', 'Colônia Arbeiter', 'Embracur'
];

const cidadesRMC = [
  'pinhais', 'almirante-tamandare', 'colombo', 'campo-magro', 'sao-jose-dos-pinhais',
  'piraquara', 'araucaria', 'fazenda-rio-grande', 'campo-largo', 'quatro-barras',
  'campina-grande-do-sul', 'mandirituba', 'itaperucu', 'contenda', 'balsa-nova',
  'bocaiuva-do-sul', 'rio-branco-do-sul', 'lapa', 'adrianopolis', 'agudos-do-sul',
  'campo-do-tenente', 'cerro-azul', 'doutor-ulysses', 'pien', 'quitandinha',
  'tijucas-do-sul', 'tunas-do-parana',
  'palmeira', 'ponta-grossa', 'rio-negro', 'morretes', 'antonina', 'paranagua',
];

const servicos = [
  'desentupimento-vaso-sanitario', 'desentupimento-pia-cozinha', 'desentupimento-pia-banheiro',
  'desentupimento-esgoto-residencial', 'desentupimento-esgoto-comercial', 'desentupimento-caixa-gordura',
  'hidrojateamento', 'camera-inspecao-esgoto', 'limpa-fossa', 'desentupimento-ralo',
  'desentupimento-industrial', 'emergencia-24h', 'encanador-residencial', 'encanador-comercial',
  'conserto-vazamento', 'instalacao-hidraulica', 'troca-tubulacao', 'instalacao-caixa-dagua',
  'conserto-torneira-chuveiro', 'instalacao-aquecedor', 'reforma-banheiro-hidraulica', 'deteccao-vazamento-oculto',
];

const empresaPrefixos = ['desentuprapido', 'encanador-master', 'hidraulica-express', 'supremahidro', 'limpafossa'];

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

console.log('Generating sitemap...');

const allBairros = Object.values(regionais).flat().concat(bairrosPopulares);
const bairroSlugs = allBairros.map(toSlug);

let totalUrls = 0;

// Count
const staticPages = ['', '/faq', '/busca', '/cadastrar-empresa', '/anuncie-aqui'];
totalUrls += staticPages.length;
totalUrls += bairroSlugs.length; // /curitiba/:bairro
totalUrls += cidadesRMC.length; // /rmc/:cidade
totalUrls += servicos.length; // /servicos/:slug
totalUrls += bairroSlugs.length * empresaPrefixos.length; // /empresa/:slug per bairro
totalUrls += cidadesRMC.length * empresaPrefixos.length; // /empresa/:slug per cidade

console.log(`Total URLs: ${totalUrls}`);
