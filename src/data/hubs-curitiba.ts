import { empresas } from './empresas';
import type { Empresa, FAQItem } from '../types';

export interface HubServico {
  slug: string;
  nome: string;
  resumo: string;
  orientacoes: string[];
  /** Curadoria explícita: cidade ou categoria isoladas não comprovam esta cobertura. */
  empresasSlugs: string[];
  servicosExigidos: string[];
  cobertura?: string;
  linkServico?: string;
}

export interface HubCuritiba {
  slug: string;
  nome: string;
  icone: string;
  path: string;
  titulo: string;
  descricao: string;
  introducao: string;
  checklist: string[];
  servicos: HubServico[];
  perguntas: FAQItem[];
}

export const hubsCuritiba: HubCuritiba[] = [
  {
    slug: 'mudancas', nome: 'Mudanças', icone: 'home', path: '/categorias/mudancas/curitiba',
    titulo: 'Mudanças em Curitiba: guia para planejar e contratar',
    descricao: 'Planeje sua mudança em Curitiba: compare escopo, embalagem, acesso e orçamento. Guia com perguntas frequentes e cadastro de empresas em formação.',
    introducao: 'Mudar de endereço envolve mais do que escolher um caminhão. Para uma mudança em Curitiba, organize o que será levado, os acessos dos dois imóveis e o que ficará a cargo da equipe. Este guia ajuda a preparar o pedido de orçamento; não é um ranking de empresas.',
    checklist: [
      'Liste móveis, eletrodomésticos, caixas e itens frágeis. Inclua medidas dos volumes maiores e fotografias quando puder.',
      'Informe bairros de origem e destino, andar, elevador e distância entre a porta e o local de carga. Confirme regras e horários com os dois condomínios.',
      'Separe transporte, embalagem, desmontagem e remontagem no pedido. Pergunte quem fornece materiais e quem leva os objetos até o veículo.',
      'Combine por escrito data, equipe, itens incluídos, condições de pagamento e tratamento de danos. Tenha um plano para chuva e para mudanças de horário.',
    ],
    servicos: [
      { slug: 'mudanca-residencial', nome: 'Mudança residencial', resumo: 'Para transportar o conteúdo de uma casa ou apartamento. A cotação depende dos volumes, dos acessos e do trabalho incluído, não apenas da distância.', orientacoes: ['Faça um inventário por cômodo e identifique caixas com destino e fragilidade.', 'Confirme se embalagem, desmontagem, montagem e materiais estão incluídos.'], empresasSlugs: [], servicosExigidos: [] },
      { slug: 'pequena-mudanca', nome: 'Pequena mudança e carreto', resumo: 'Para poucos móveis, caixas ou um único item. Um carreto pode cobrir só o veículo e o trajeto; carregamento e ajudantes precisam ser combinados.', orientacoes: ['Meça o item, portas e elevador antes de pedir o veículo.', 'Informe peso aproximado e se há pessoas para carregar nas duas pontas.'], empresasSlugs: [], servicosExigidos: [] },
      { slug: 'mudanca-comercial', nome: 'Mudança comercial', resumo: 'Para escritórios e pequenos estabelecimentos. Organize a retirada por ambiente e defina a ordem de entrega para reduzir a interrupção do trabalho.', orientacoes: ['Identifique caixas, mesas e equipamentos por setor e responsável.', 'Defina quem cuida de equipamentos, arquivos e reconexões. Não presuma que o transporte inclua instalação.'], empresasSlugs: [], servicosExigidos: [] },
    ],
    perguntas: [
      { pergunta: 'Como comparar empresas de mudanças em Curitiba?', resposta: 'Envie o mesmo inventário e os mesmos acessos para cada empresa. Compare escopo, equipe, veículo, embalagem, horários e condições por escrito. Confira o contato e o perfil da empresa; preço isolado não mostra o que está incluído.' },
      { pergunta: 'Quanto custa uma mudança em Curitiba?', resposta: 'Não publicamos uma média sem uma base verificável. Distância, volume, andares, elevador, ajudantes, embalagem e montagem influenciam a proposta. Peça uma cotação para o seu caso e confirme eventuais custos extras antes de contratar.' },
      { pergunta: 'Qual é a diferença entre carreto e mudança completa?', resposta: 'Carreto costuma indicar o transporte de poucos volumes, mas o escopo varia por prestador. Uma mudança pode incluir equipe, embalagem e montagem, desde que isso esteja na proposta. Confirme cada tarefa em vez de se apoiar apenas no nome do serviço.' },
      { pergunta: 'O que informar sobre o prédio e o bairro?', resposta: 'Informe os dois bairros, andares, elevadores e condições de acesso. Consulte a administração do imóvel sobre reserva de elevador, horários e local permitido para carga e descarga. O prestador deve avaliar se o veículo e a equipe são adequados.' },
      { pergunta: 'Já há empresas de mudanças listadas neste guia?', resposta: 'O cadastro desta categoria está em formação. Só exibimos um perfil nesta página quando há relação explícita entre a empresa, o serviço e a cobertura em Curitiba. Empresas de entrega não são apresentadas automaticamente como empresas de mudança.' },
    ],
  },
  {
    slug: 'transportes', nome: 'Transportes', icone: 'truck', path: '/categorias/transportes/curitiba',
    titulo: 'Transportes em Curitiba: guia de fretes e pequenos volumes',
    descricao: 'Entenda como pedir transporte de cargas e pequenos volumes para Curitiba. Compare veículos, coleta e entrega, com perfis limitados à cobertura declarada.',
    introducao: 'O transporte adequado depende do que será levado, da origem, do destino e dos cuidados necessários. Um frete de móveis não é a mesma coisa que o envio de documentos ou caixas. Use este guia para definir o serviço e consultar apenas perfis compatíveis com o trajeto.',
    checklist: [
      'Descreva quantidade, medidas, peso aproximado e fragilidade dos volumes. Informe se podem ser empilhados e como estão embalados.',
      'Especifique origem, destino e janelas de coleta e entrega. Curitiba como destino não significa atendimento em qualquer bairro ou cidade vizinha.',
      'Confirme veículo, capacidade, ajudantes e quem será responsável por carregar, descarregar e receber a mercadoria.',
      'Peça proposta com percurso, pedágios e esperas quando aplicáveis. Pergunte sobre comprovação de entrega, cobertura para danos e restrições de carga.',
    ],
    servicos: [
      { slug: 'frete-local', nome: 'Frete local em Curitiba', resumo: 'Para deslocar móveis, caixas e mercadorias entre endereços da cidade. O serviço precisa ser compatível com o peso, o volume e os acessos.', orientacoes: ['Indique se precisa de ajudantes ou apenas do transporte.', 'Confirme condições de acondicionamento e amarração para o tipo de mercadoria.'], empresasSlugs: [], servicosExigidos: [] },
      { slug: 'transporte-regional', nome: 'Transporte regional e intermunicipal', resumo: 'Para trajetos entre Curitiba e outras cidades. A cobertura deve ser confirmada para a rota concreta; atender uma cidade não comprova viagens para todas as demais.', orientacoes: ['Informe as cidades e os pontos de coleta e entrega, sem presumir trajeto de retorno.', 'Compare coleta dedicada e compartilhada, quando oferecidas, e peça previsão acordada por escrito.'], empresasSlugs: [], servicosExigidos: [] },
      { slug: 'pequenos-volumes-sp-curitiba', nome: 'Pequenos volumes de São Paulo para Curitiba', resumo: 'Há um perfil cadastrado que declara coletas no Centro de São Paulo e região e viagens para Curitiba, para documentos, peças, encomendas e pequenos volumes.', orientacoes: ['Consulte se a origem está na área de coleta declarada e se o volume pode ser transportado.', 'Confirme data, destino e veículo diretamente com a empresa. O cadastro não comprova mudanças residenciais, cargas pesadas ou trajeto inverso.'], empresasSlugs: ['motofrete-sao-paulo-curitiba'], servicosExigidos: ['entrega-expressa-van'], cobertura: 'Cobertura declarada no cadastro: coleta em São Paulo e região, com destino Curitiba. Consulte disponibilidade e endereço atendido. Não é uma oferta de frete local geral em Curitiba.', linkServico: '/servicos/entrega-expressa-van' },
    ],
    perguntas: [
      { pergunta: 'Como escolher o veículo para um frete em Curitiba?', resposta: 'Informe medidas, peso, quantidade e embalagem dos volumes. Peça ao prestador que confirme a capacidade e o veículo indicado, incluindo acesso aos endereços. Não escolha apenas pelo nome do veículo ou pelo menor preço.' },
      { pergunta: 'O valor do frete inclui carregamento e descarregamento?', resposta: 'Não necessariamente. Pergunte se há ajudantes, quantos são, quais acessos estão previstos e se há cobrança por espera, escadas ou carga adicional. Registre o escopo na proposta.' },
      { pergunta: 'Posso contratar transporte de São Paulo para Curitiba?', resposta: 'O perfil Motofrete São Paulo — Centro e Região (60 km) declara esse trajeto para documentos, peças, encomendas e pequenos volumes. Consulte diretamente se a origem, o destino, a data e a carga são atendidos. Não há promessa de disponibilidade ou prazo neste guia.' },
      { pergunta: 'As empresas listadas fazem qualquer transporte?', resposta: 'Não. Um cadastro de pequenos volumes não comprova mudança completa, carga pesada, transporte refrigerado ou de passageiros. Cada seção só mostra empresas associadas ao serviço e à cobertura descritos.' },
      { pergunta: 'Como comparar propostas de transporte?', resposta: 'Compare propostas para os mesmos volumes e percurso, com as mesmas tarefas de carga e descarga. Confira prazo combinado, espera, custos adicionais, condições de pagamento e procedimento para comprovar entrega e tratar ocorrências.' },
    ],
  },
  {
    slug: 'entregas', nome: 'Entregas', icone: 'package', path: '/categorias/entregas/curitiba',
    titulo: 'Entregas em Curitiba: guia de documentos e encomendas',
    descricao: 'Saiba o que informar para contratar entrega de documentos, peças e encomendas em Curitiba. Guia com FAQ, limites de cobertura e cadastro em formação.',
    introducao: 'Antes de solicitar uma entrega, confira tamanho e peso da encomenda, origem, destino e quem estará disponível para receber. Motoboy, van e rota entre cidades têm capacidades e condições diferentes. Este guia separa essas necessidades sem prometer prazo ou cobertura ainda não confirmados.',
    checklist: [
      'Descreva o conteúdo permitido, tamanho, peso e embalagem. Avise sobre fragilidade ou cuidados específicos antes de aceitar a proposta.',
      'Informe os bairros ou cidades de coleta e destino e as janelas de atendimento. Confirme se o destinatário estará no local.',
      'Combine como será comprovada a entrega e o que acontece se o destinatário estiver ausente, se houver espera ou se for necessário retornar.',
      'Para envio recorrente, informe frequência e quantidade de paradas. Acorde coleta, comunicação e cobrança sem presumir entrega imediata.',
    ],
    servicos: [
      { slug: 'motoboy-curitiba', nome: 'Motoboy para entregas urbanas', resumo: 'Para documentos, peças e pequenos volumes compatíveis com o veículo. A aceitação depende de tamanho, peso, embalagem e condições do trajeto.', orientacoes: ['Confirme os dois endereços e os limites de volume antes de pedir a coleta.', 'Pergunte como são tratados espera, tentativa sem sucesso e devolução.'], empresasSlugs: [], servicosExigidos: [] },
      { slug: 'entregas-van-curitiba', nome: 'Entregas urbanas de caixas e encomendas', resumo: 'Para volumes que exigem outro veículo ou várias paradas. A prestação de entregas de van em outra cidade não comprova atendimento urbano em Curitiba.', orientacoes: ['Informe medidas das caixas, quantidade e se é possível empilhar.', 'Confirme ajuda para carga e descarga, ordem das paradas e comprovação de recebimento.'], empresasSlugs: [], servicosExigidos: [] },
      { slug: 'entregas-entre-cidades', nome: 'Entregas entre cidades', resumo: 'Para encomendas que precisam sair de Curitiba ou chegar de outra cidade. Origem e destino devem ser confirmados para cada trajeto, sem presumir rota de retorno ou distribuição urbana.', orientacoes: ['Consulte área de coleta, volumes aceitos e previsão para o trajeto desejado.', 'Para a rota declarada de São Paulo a Curitiba, consulte o guia de transportes ao final desta página. Não a confunda com entrega urbana em Curitiba.'], empresasSlugs: [], servicosExigidos: [] },
    ],
    perguntas: [
      { pergunta: 'Já há motoboys para entrega urbana em Curitiba neste guia?', resposta: 'O cadastro de entregas urbanas em Curitiba está em formação. O perfil disponível no guia de transportes declara coleta em São Paulo e região com destino Curitiba; isso não comprova coleta e entrega entre dois endereços de Curitiba.' },
      { pergunta: 'Motoboy ou van: qual serviço pedir?', resposta: 'Informe medidas, peso, embalagem e número de volumes para que o prestador confirme o veículo adequado. Documentos e pequenos volumes podem ter necessidades diferentes de caixas maiores; não presuma capacidade ou transporte de itens especiais.' },
      { pergunta: 'Entregas expressas chegam no mesmo dia?', resposta: 'O nome do serviço não garante um prazo. Confirme disponibilidade, horário de coleta, percurso e previsão de entrega diretamente com a empresa, antes da contratação. Este guia não promete atendimento imediato, entrega no mesmo dia ou plantão 24 horas.' },
      { pergunta: 'Como pedir orçamento de entrega?', resposta: 'Envie origem, destino, descrição e medidas do volume, peso aproximado e janela de coleta e recebimento. Informe paradas adicionais, necessidade de retorno e cuidados especiais. Confirme o valor e o que ele inclui antes de aceitar.' },
      { pergunta: 'O que combinar se ninguém receber a encomenda?', resposta: 'Antes de contratar, combine contato no destino, comprovação de recebimento e procedimento para espera, nova tentativa ou devolução. Pergunte se essas situações têm custo adicional e como a encomenda ficará protegida.' },
    ],
  },
];

export function getHubCuritiba(slug: string) {
  return hubsCuritiba.find((hub) => hub.slug === slug);
}

/** Nunca usa fallback por bairro, categoria ampla ou empresa em destaque. */
export function getEmpresasDoHubServico(servico: HubServico, cadastros: Empresa[] = empresas): Empresa[] {
  return cadastros.filter((empresa) =>
    servico.empresasSlugs.includes(empresa.slug)
    && empresa.cidadesAtendidas.includes('curitiba')
    && servico.servicosExigidos.length > 0
    && servico.servicosExigidos.some((slug) => empresa.servicosOferecidos.includes(slug)),
  );
}
