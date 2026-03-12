import { regionais, bairrosPopulares } from './bairros';

export interface FaqBairroItem {
  id: string;
  categoria: 'emergencia' | 'precos' | 'tecnico' | 'localidade' | 'legal' | 'sustentavel';
  pergunta: string;
  resposta: string;
  tags: string[];
}

export interface FaqBairroData {
  bairro: string;
  regional: string;
  perfil: string;
  vizinhos: string[];
  perguntas: FaqBairroItem[];
}

const CTA = '\n\n📞 Ligue agora: (41) 3345-1194 | 💬 WhatsApp: (41) 98517-1966 — Atendimento 24h!';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getPerfilBairro(nome: string): string {
  const nobres = ['Batel', 'Água Verde', 'Bigorrilho', 'Cabral', 'Juvevê', 'Alto da Glória', 'Hugo Lange', 'Mercês', 'Seminário', 'Alto da Rua XV', 'São Francisco', 'Jardim Botânico'];
  const comerciais = ['Centro', 'Centro Cívico', 'Rebouças', 'Cidade Industrial'];
  const populares = ['Sítio Cercado', 'Tatuquara', 'CIC', 'Cajuru', 'Xaxim', 'Pinheirinho', 'Boqueirão', 'Alto Boqueirão', 'Ganchinho', 'Umbará', 'Caximba'];
  if (nobres.includes(nome)) return 'residencial-nobre';
  if (comerciais.includes(nome)) return 'comercial';
  if (populares.includes(nome)) return 'popular-residencial';
  return 'residencial-misto';
}

function getTipoImovel(perfil: string): string {
  switch (perfil) {
    case 'residencial-nobre': return 'apartamentos e casas de alto padrão';
    case 'comercial': return 'comércios, escritórios e edifícios comerciais';
    case 'popular-residencial': return 'casas, sobrados e conjuntos habitacionais';
    default: return 'casas, apartamentos e comércios';
  }
}

function getServicoMaisBuscado(perfil: string): string {
  switch (perfil) {
    case 'residencial-nobre': return 'desentupimento de vaso sanitário e conserto de vazamentos em apartamentos, seguido de manutenção preventiva de encanamento';
    case 'comercial': return 'desentupimento de caixa de gordura e esgoto comercial, além de hidrojateamento para redes de maior porte';
    case 'popular-residencial': return 'desentupimento de esgoto residencial e vaso sanitário, além de serviços de limpa-fossa';
    default: return 'desentupimento de vaso sanitário e pia de cozinha, seguido de conserto de vazamentos';
  }
}

function getVizinhosNomes(nome: string): string[] {
  for (const [, bairrosRegional] of Object.entries(regionais)) {
    if (bairrosRegional.includes(nome)) {
      return bairrosRegional.filter(b => b !== nome).slice(0, 4);
    }
  }
  return [];
}

function getRegional(nome: string): string {
  for (const [regional, bairrosRegional] of Object.entries(regionais)) {
    if (bairrosRegional.includes(nome)) return regional;
  }
  return 'Curitiba';
}

function gerarPerguntasBairro(nome: string): FaqBairroItem[] {
  const slug = toSlug(nome);
  const regional = getRegional(nome);
  const perfil = getPerfilBairro(nome);
  const tipoImovel = getTipoImovel(perfil);
  const servicoMaisBuscado = getServicoMaisBuscado(perfil);
  const vizinhos = getVizinhosNomes(nome);
  const vizinhosTexto = vizinhos.length > 0 ? vizinhos.join(', ') : 'bairros da mesma regional';

  return [
    {
      id: `${slug}-001`,
      categoria: 'emergencia',
      pergunta: `Tem desentupidora disponível 24h no ${nome} agora?`,
      resposta: `Sim! Temos empresas parceiras que atendem o ${nome} e toda a regional ${regional} de Curitiba 24 horas por dia, incluindo fins de semana e feriados. O tempo médio de chegada no ${nome} é de 30 a 60 minutos. Nossos profissionais são verificados e possuem equipamentos modernos como máquina rotativa, hidrojateamento e câmera de inspeção. Para emergências como esgoto transbordando, vaso entupido ou cano estourado, o atendimento é prioritário e o deslocamento acontece em caráter de urgência.${CTA}`,
      tags: ['24h', 'emergência', slug, 'curitiba', 'desentupidora'],
    },
    {
      id: `${slug}-002`,
      categoria: 'precos',
      pergunta: `Qual o preço de desentupimento de esgoto no ${nome}?`,
      resposta: `No ${nome} e região, o preço médio de desentupimento de esgoto residencial varia de R$ 200 a R$ 450, dependendo do tipo de entupimento e profundidade da tubulação. Desentupimento de vaso sanitário começa em R$ 150. Hidrojateamento custa entre R$ 350 e R$ 800. Os valores podem sofrer acréscimo de 20% a 50% para atendimentos noturnos, em finais de semana e feriados. Recomendamos solicitar pelo menos 2 orçamentos antes de contratar. Todas as empresas do nosso diretório oferecem orçamento sem compromisso.${CTA}`,
      tags: ['preço', 'orçamento', 'esgoto', slug, 'curitiba'],
    },
    {
      id: `${slug}-003`,
      categoria: 'localidade',
      pergunta: `Desentupidora atende ${tipoImovel} no ${nome}?`,
      resposta: `Sim! As desentupidoras e encanadores cadastrados no Serviços no Bairro atendem ${tipoImovel} no ${nome} e em toda a regional ${regional}. O ${nome} é um bairro com perfil ${perfil === 'residencial-nobre' ? 'residencial de alto padrão' : perfil === 'comercial' ? 'predominantemente comercial' : perfil === 'popular-residencial' ? 'residencial popular' : 'residencial misto'}, e nossos profissionais possuem experiência específica para atender as demandas da região. Para condomínios e prédios, oferecemos atendimento com equipes especializadas em colunas de esgoto e redes coletivas.${CTA}`,
      tags: ['atendimento', 'imóvel', slug, perfil],
    },
    {
      id: `${slug}-004`,
      categoria: 'tecnico',
      pergunta: `Tem encanador de confiança no ${nome}?`,
      resposta: `Sim! Nosso diretório lista encanadores verificados no ${nome} com avaliações reais de moradores da região. Todos os profissionais passam por processo de verificação antes de serem cadastrados no Serviços no Bairro. Você pode conferir a nota média, número de avaliações, serviços oferecidos, formas de pagamento e se o profissional atende 24 horas. Encanadores no ${nome} realizam serviços como conserto de vazamentos, troca de tubulação, instalação hidráulica, reforma de banheiro e muito mais.${CTA}`,
      tags: ['encanador', 'confiança', 'verificado', slug],
    },
    {
      id: `${slug}-005`,
      categoria: 'emergencia',
      pergunta: `Esgoto entupido no ${nome} — quem chamar agora?`,
      resposta: `Se você está com esgoto entupido no ${nome}, o primeiro passo é evitar usar qualquer ponto de água (pia, chuveiro, vaso) para não piorar a situação. Em seguida, chame uma desentupidora de emergência pelo telefone fixo (41) 3345-1194 ou WhatsApp (41) 98517-1966. O tempo médio de chegada no ${nome} é de 30 a 60 minutos. Nossos profissionais atendem 24 horas, inclusive madrugada, fins de semana e feriados. Entupimento de esgoto pode causar retorno de água suja e contaminação — resolva com urgência!${CTA}`,
      tags: ['esgoto', 'entupido', 'urgência', slug],
    },
    {
      id: `${slug}-006`,
      categoria: 'localidade',
      pergunta: `A desentupidora do ${nome} atende bairros vizinhos?`,
      resposta: `Sim! As desentupidoras que atendem o ${nome} também cobrem os bairros vizinhos: ${vizinhosTexto}. Como esses bairros pertencem à mesma regional (${regional}), o deslocamento é rápido e geralmente não há cobrança adicional de taxa de deslocamento. Além disso, muitas empresas do nosso diretório atendem toda a cidade de Curitiba e Região Metropolitana, incluindo cidades como Colombo, São José dos Pinhais, Araucária e Pinhais.${CTA}`,
      tags: ['vizinhos', 'regional', slug, ...vizinhos.map(toSlug)],
    },
    {
      id: `${slug}-007`,
      categoria: 'tecnico',
      pergunta: `Qual serviço hidráulico é mais pedido no ${nome}?`,
      resposta: `No ${nome}, o serviço hidráulico mais solicitado é ${servicoMaisBuscado}. Esses serviços correspondem a aproximadamente 70% dos chamados na região. A demanda varia conforme a época do ano: no verão, aumentam os chamados por entupimento de esgoto pluvial; no inverno, cresce a procura por conserto de aquecedores e vazamentos. Recomendamos manutenção preventiva a cada 6-12 meses para evitar emergências.${CTA}`,
      tags: ['serviço', 'popular', 'demanda', slug],
    },
    {
      id: `${slug}-008`,
      categoria: 'emergencia',
      pergunta: `Em quanto tempo a desentupidora chega no ${nome}?`,
      resposta: `O tempo médio de atendimento no ${nome} é de 30 a 60 minutos após o acionamento, dependendo do horário e trânsito. Em casos de emergência grave (esgoto transbordando, cano estourado, risco de contaminação), priorizamos o atendimento e o deslocamento pode ser ainda mais rápido. As equipes possuem viaturas equipadas com todo o material necessário, evitando idas e vindas. Para garantir atendimento imediato, informe claramente o endereço completo, tipo de problema e grau de urgência.${CTA}`,
      tags: ['tempo', 'chegada', 'rapidez', slug],
    },
    {
      id: `${slug}-009`,
      categoria: 'tecnico',
      pergunta: `Tem serviço de limpa-fossa e caixa d'água no ${nome}?`,
      resposta: `Sim! Oferecemos serviço completo de limpa-fossa e limpeza de caixa d'água no ${nome} e região. A limpeza de fossa séptica custa em média R$ 250 a R$ 700 e deve ser realizada a cada 1-3 anos, conforme o uso. A limpeza de caixa d'água custa entre R$ 150 e R$ 400 e é recomendada a cada 6 meses, conforme orientação da ANVISA. Ambos os serviços são essenciais para a saúde da família e para evitar problemas maiores como contaminação da água e transbordamento de fossa.${CTA}`,
      tags: ['fossa', 'caixa d\'água', 'limpeza', slug],
    },
    {
      id: `${slug}-010`,
      categoria: 'legal',
      pergunta: `Como saber se a desentupidora do ${nome} é confiável?`,
      resposta: `Para verificar a confiabilidade de uma desentupidora no ${nome}, observe os seguintes critérios: empresa com CNPJ ativo, avaliações reais de clientes anteriores, verificação de perfil no Serviços no Bairro (selo "Verificado"), garantia por escrito do serviço, orçamento transparente antes da execução, e profissionais uniformizados e identificados. No nosso diretório, todas as empresas verificadas passam por checagem de documentação e possuem avaliações reais. Desconfie de preços muito abaixo do mercado — podem indicar falta de equipamento adequado.${CTA}`,
      tags: ['confiável', 'verificação', 'segurança', slug],
    },
    {
      id: `${slug}-011`,
      categoria: 'tecnico',
      pergunta: `Tem empresa com câmera de inspeção de esgoto no ${nome}?`,
      resposta: `Sim! Diversas empresas que atendem o ${nome} oferecem serviço de câmera de inspeção de esgoto (também chamada de videoscopia). Esse equipamento permite visualizar o interior da tubulação em tempo real, identificando com precisão o ponto do entupimento, rachaduras, raízes invasoras e outros problemas. O custo médio é de R$ 200 a R$ 500. A câmera de inspeção é especialmente recomendada em casos de entupimentos recorrentes, para identificar a causa raiz e evitar retrabalho.${CTA}`,
      tags: ['câmera', 'inspeção', 'tecnologia', slug],
    },
    {
      id: `${slug}-012`,
      categoria: 'localidade',
      pergunta: `${nome} Curitiba desentupidora — como solicitar?`,
      resposta: `Para solicitar uma desentupidora no ${nome}, Curitiba, siga estes passos: 1) Acesse o Serviços no Bairro e busque por "${nome}" para ver empresas que atendem a região; 2) Compare avaliações, serviços e preços dos profissionais listados; 3) Clique no botão WhatsApp da empresa escolhida para solicitar orçamento gratuito; 4) Informe o tipo de problema, endereço e urgência; 5) Aguarde o profissional chegar (30-60 min). Você também pode ligar diretamente para agilizar o atendimento, especialmente em emergências.${CTA}`,
      tags: ['solicitar', 'contratar', 'passo a passo', slug, 'curitiba'],
    },
  ];
}

// Generate FAQ for all bairros
function gerarTodosFaqBairros(): Record<string, FaqBairroData> {
  const result: Record<string, FaqBairroData> = {};

  for (const [regional, bairrosNomes] of Object.entries(regionais)) {
    for (const nome of bairrosNomes) {
      const slug = toSlug(nome);
      const vizinhos = getVizinhosNomes(nome);
      result[slug] = {
        bairro: nome,
        regional,
        perfil: getPerfilBairro(nome),
        vizinhos,
        perguntas: gerarPerguntasBairro(nome),
      };
    }
  }

  // Popular bairros
  for (const nome of bairrosPopulares) {
    const slug = toSlug(nome);
    result[slug] = {
      bairro: nome,
      regional: 'Popular',
      perfil: 'popular-residencial',
      vizinhos: [],
      perguntas: gerarPerguntasBairro(nome),
    };
  }

  return result;
}

export const faqPorBairro = gerarTodosFaqBairros();

export function getFaqBairro(slug: string): FaqBairroItem[] {
  return faqPorBairro[slug]?.perguntas || [];
}
