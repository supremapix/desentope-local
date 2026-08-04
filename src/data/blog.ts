/**
 * Blog editorial — conteúdo profundo (AEO/GEO) para captura de tráfego
 * informacional em Curitiba e Região Metropolitana.
 *
 * Regra editorial: cada artigo abre com uma resposta direta de 40-60 palavras
 * (formato citável por IA), tem no mínimo 600 palavras de conteúdo próprio,
 * dados de preço reais praticados na região e FAQ com perguntas de busca real.
 */

export interface BlogCategoria {
  slug: string;
  nome: string;
  titulo: string;
  descricao: string;
  intro: string;
}

export interface BlocoTabela {
  colunas: string[];
  linhas: string[][];
}

export interface BlogSecao {
  h2: string;
  paragrafos?: string[];
  lista?: string[];
  tabela?: BlocoTabela;
  destaque?: string;
}

export interface BlogFAQ {
  pergunta: string;
  resposta: string;
}

export interface BlogArtigo {
  slug: string;
  categoria: string;
  titulo: string;
  h1: string;
  descricao: string;
  respostaDireta: string;
  atualizadoEm: string;
  leituraMin: number;
  secoes: BlogSecao[];
  faq: BlogFAQ[];
  /** Slugs de /servicos/:slug relacionados */
  servicos: string[];
}

export const blogCategorias: BlogCategoria[] = [
  {
    slug: 'desentupimento',
    nome: 'Desentupimento',
    titulo: 'Desentupimento: Guias e Preços em Curitiba',
    descricao:
      'Guias práticos de desentupimento de vaso, pia, ralo e esgoto em Curitiba e RMC: causas, soluções, preços reais e quando chamar profissional.',
    intro:
      'Tudo sobre entupimentos: como identificar a origem, o que resolver sozinho com segurança, quando o problema está na rede da Sanepar e quanto custa cada tipo de desentupimento em Curitiba e na Região Metropolitana.',
  },
  {
    slug: 'encanamento',
    nome: 'Encanamento e Vazamentos',
    titulo: 'Encanamento e Vazamentos: Guias Técnicos',
    descricao:
      'Guias de encanamento em Curitiba: como localizar vazamento, conta de água alta, troca de tubulação antiga e reparos hidráulicos com preços reais.',
    intro:
      'Vazamentos, pressão baixa, tubulação antiga de ferro galvanizado e conta de água fora do normal. Conteúdo técnico para entender o problema antes de contratar um encanador em Curitiba e RMC.',
  },
  {
    slug: 'manutencao-preventiva',
    nome: 'Manutenção Preventiva',
    titulo: 'Manutenção Preventiva Hidráulica',
    descricao:
      'Rotinas de manutenção preventiva hidráulica para casas, prédios e comércios em Curitiba: caixa de gordura, fossa, caixa d’água e rede de esgoto.',
    intro:
      'Manutenção programada custa uma fração de uma emergência. Veja as rotinas recomendadas para caixa de gordura, fossa séptica, caixa d’água e prumadas em imóveis de Curitiba e da Região Metropolitana.',
  },
];

export const blogArtigos: BlogArtigo[] = [
  {
    slug: 'quanto-custa-desentupimento-curitiba',
    categoria: 'desentupimento',
    titulo: 'Quanto Custa um Desentupimento em Curitiba em 2026',
    h1: 'Quanto custa um desentupimento em Curitiba? Tabela de preços 2026',
    descricao:
      'Tabela de preços de desentupimento em Curitiba e RMC em 2026: vaso, pia, ralo, esgoto, caixa de gordura e hidrojateamento. O que encarece o serviço.',
    respostaDireta:
      'Em Curitiba, um desentupimento simples de vaso ou pia custa entre R$ 150 e R$ 350. Esgoto residencial fica entre R$ 200 e R$ 600, caixa de gordura entre R$ 150 e R$ 400 e hidrojateamento entre R$ 300 e R$ 800. Atendimento noturno e de fim de semana costuma somar 30% a 50%.',
    atualizadoEm: '2026-08-01',
    leituraMin: 7,
    secoes: [
      {
        h2: 'Tabela de preços por tipo de serviço',
        paragrafos: [
          'Os valores abaixo refletem a faixa praticada por desentupidoras que atendem Curitiba e a Região Metropolitana. São médias de mercado para imóveis residenciais de porte comum, com acesso normal ao ponto entupido e serviço em horário comercial.',
        ],
        tabela: {
          colunas: ['Serviço', 'Faixa em Curitiba', 'Tempo médio'],
          linhas: [
            ['Desentupimento de vaso sanitário', 'R$ 150 – R$ 350', '30 a 60 min'],
            ['Desentupimento de pia de cozinha', 'R$ 120 – R$ 280', '30 a 60 min'],
            ['Desentupimento de ralo', 'R$ 100 – R$ 250', '30 a 45 min'],
            ['Esgoto residencial (ramal)', 'R$ 200 – R$ 600', '1 a 3 h'],
            ['Caixa de gordura', 'R$ 150 – R$ 400', '1 a 2 h'],
            ['Hidrojateamento', 'R$ 300 – R$ 800', '2 a 4 h'],
            ['Câmera de inspeção', 'R$ 200 – R$ 500', '1 h'],
            ['Limpa fossa (caminhão até 6.000 L)', 'R$ 350 – R$ 900', '1 a 2 h'],
            ['Esgoto comercial / industrial', 'R$ 350 – R$ 1.200', '2 a 6 h'],
          ],
        },
      },
      {
        h2: 'O que faz o preço subir',
        lista: [
          'Horário: chamados entre 22h e 6h, domingos e feriados têm acréscimo típico de 30% a 50%.',
          'Profundidade e extensão do ramal: entupimentos a mais de 15 metros da caixa de inspeção exigem equipamento maior.',
          'Acesso difícil: apartamentos sem elevador de serviço, prumadas coletivas e caixas sob piso exigem mais tempo e mão de obra.',
          'Raízes de árvore na tubulação: comum em bairros arborizados como Bacacheri, Juvevê e Mercês, exige rototerra ou hidrojato.',
          'Quebra de piso ou alvenaria: quando não há caixa de inspeção acessível, o reparo civil entra como custo separado.',
          'Necessidade de câmera de inspeção para localizar trecho colapsado antes de orçar a troca de tubulação.',
        ],
      },
      {
        h2: 'Como pedir um orçamento sem levar surpresa',
        paragrafos: [
          'Peça sempre o valor fechado por serviço, e não por hora, quando o diagnóstico já estiver claro. Se a empresa só conseguir estimar após inspeção, combine antes quanto custa a visita técnica e se esse valor é abatido caso o serviço seja aprovado.',
          'Confirme por escrito, mesmo que por WhatsApp: o que está incluso, se há garantia, o prazo dessa garantia e se material (anéis, sifões, tubos) está no preço. Uma desentupidora séria em Curitiba entrega garantia de 30 a 90 dias para desentupimentos simples.',
        ],
        destaque:
          'Desconfie de valores muito abaixo da faixa de mercado: costumam ser preço de "visita" que sobe depois do equipamento já estar montado no local.',
      },
      {
        h2: 'Quando o custo é da Sanepar e não seu',
        paragrafos: [
          'A responsabilidade do morador termina na caixa de inspeção que liga o imóvel à rede pública. Se o refluxo acontece simultaneamente em vários imóveis da mesma rua, ou se a caixa da calçada está transbordando, o problema é da rede coletora e o reparo deve ser aberto junto à Sanepar, sem custo para você.',
          'Registre o protocolo do chamado. Se a desentupidora identificar que a obstrução está na rede pública, você não deve pagar pelo desentupimento — apenas pela visita de diagnóstico, quando combinada.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Qual o preço médio de desentupimento em Curitiba?',
        resposta:
          'A média para desentupimento residencial simples em Curitiba fica entre R$ 150 e R$ 350. Esgoto residencial completo vai de R$ 200 a R$ 600 e hidrojateamento de R$ 300 a R$ 800.',
      },
      {
        pergunta: 'Desentupidora cobra taxa de visita?',
        resposta:
          'Muitas empresas cobram entre R$ 80 e R$ 150 de visita técnica quando o serviço não é aprovado. Se o serviço for executado, esse valor normalmente é abatido do total.',
      },
      {
        pergunta: 'Desentupimento de madrugada é mais caro?',
        resposta:
          'Sim. Atendimentos entre 22h e 6h, aos domingos e feriados costumam ter acréscimo de 30% a 50% sobre a tabela de horário comercial.',
      },
      {
        pergunta: 'Quem paga o desentupimento em imóvel alugado?',
        resposta:
          'Entupimento causado pelo uso (gordura, cabelo, objetos) é do inquilino. Problema estrutural, como tubulação colapsada ou raízes, é responsabilidade do proprietário.',
      },
    ],
    servicos: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'hidrojateamento', 'desentupimento-caixa-gordura'],
  },
  {
    slug: 'como-desentupir-vaso-sanitario',
    categoria: 'desentupimento',
    titulo: 'Como Desentupir Vaso Sanitário sem Danificar a Louça',
    h1: 'Como desentupir vaso sanitário com segurança',
    descricao:
      'Passo a passo para desentupir vaso sanitário em casa: métodos que funcionam, o que nunca usar, sinais de entupimento no ramal e quando chamar desentupidora.',
    respostaDireta:
      'Para desentupir um vaso sanitário, use um desentupidor de borracha com bombeamento firme por 20 a 30 segundos, ou despeje 3 litros de água quente (não fervente) com detergente e aguarde 15 minutos. Nunca use soda cáustica: ela superaquece, danifica a louça e agrava obstruções sólidas.',
    atualizadoEm: '2026-08-01',
    leituraMin: 6,
    secoes: [
      {
        h2: 'Antes de tudo: identifique a origem',
        paragrafos: [
          'Se apenas o vaso está entupido e os outros ralos escoam normalmente, a obstrução está no sifão da própria louça ou no primeiro metro de tubulação. Nesse caso, métodos caseiros costumam resolver.',
          'Se o vaso enche quando você usa a máquina de lavar, se a água sobe no ralo do box ou se há borbulhamento, a obstrução está no ramal coletivo ou na caixa de inspeção. Aí nenhum desentupidor manual resolve — é serviço de equipamento.',
        ],
      },
      {
        h2: 'Métodos que funcionam',
        lista: [
          'Desentupidor de borracha (tipo sanfona): cubra completamente a saída, faça 20 a 30 bombeadas firmes e verticais. A força é a de sucção na volta, não a de empurrar.',
          'Água quente com detergente: 3 litros a cerca de 60 °C, despejados de uma altura de 40 cm, dissolvem gordura e sabão. Nunca use água fervente — o choque térmico trinca a louça.',
          'Bicarbonato (200 g) + vinagre (500 ml): deixe reagir 20 minutos e finalize com água morna. Funciona em obstruções orgânicas leves.',
          'Cabo flexível (sonda manual): introduza girando, sem forçar em curvas, para romper obstrução até 3 metros.',
          'Saco plástico com pano molhado sobre a saída para melhorar a vedação do desentupidor em vasos de saída larga.',
        ],
      },
      {
        h2: 'O que nunca fazer',
        lista: [
          'Soda cáustica: reação exotérmica que pode chegar a 80 °C, empenar PVC, queimar a pele e endurecer resíduos sólidos.',
          'Arame ou cabide de metal: risca o esmalte, trinca a louça e pode furar o sifão.',
          'Dar descarga repetidamente com o vaso cheio: só provoca transbordamento e contaminação do piso.',
          'Ácido muriático: agride a tubulação e libera vapores tóxicos em ambiente fechado.',
        ],
        destaque:
          'Se dois métodos caseiros falharam, pare. Insistir costuma empurrar o objeto para o ramal e transformar um serviço de R$ 200 em uma quebra de piso.',
      },
      {
        h2: 'Como o profissional resolve',
        paragrafos: [
          'A desentupidora começa pela caixa de inspeção mais próxima para descobrir se o problema é local ou de ramal. Objetos sólidos (escova, tampa, brinquedo, pano) são retirados com sonda de recuperação; gordura e papel são rompidos com rototerra ou hidrojato de alta pressão.',
          'Em prédios de Curitiba com prumada única, o serviço precisa ser feito pela coluna coletiva, com aviso aos moradores — desentupir só o apartamento resolve por poucos dias.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Água fervente desentope vaso sanitário?',
        resposta:
          'Água quente ajuda a dissolver gordura, mas fervente não deve ser usada: o choque térmico pode trincar a louça e deformar o PVC. Use água a cerca de 60 °C.',
      },
      {
        pergunta: 'Soda cáustica pode ser usada no vaso?',
        resposta:
          'Não. A soda cáustica esquenta acima de 80 °C, danifica tubulações de PVC, causa queimaduras graves e endurece resíduos sólidos, piorando o entupimento.',
      },
      {
        pergunta: 'Por que o vaso entope quando ligo a máquina de lavar?',
        resposta:
          'Isso indica obstrução no ramal comum de esgoto: a água da máquina não encontra vazão e retorna pelo ponto mais baixo. Precisa de desentupimento no ramal, não no vaso.',
      },
      {
        pergunta: 'Quanto tempo demora um desentupimento de vaso?',
        resposta:
          'Um desentupimento de vaso feito por profissional leva em média 30 a 60 minutos, incluindo teste de escoamento após a limpeza.',
      },
    ],
    servicos: ['desentupimento-vaso-sanitario', 'desentupimento-ralo', 'emergencia-24h', 'camera-inspecao-esgoto'],
  },
  {
    slug: 'esgoto-voltando-pelo-ralo',
    categoria: 'desentupimento',
    titulo: 'Esgoto Voltando pelo Ralo: Causas e o Que Fazer',
    h1: 'Esgoto voltando pelo ralo: causas, riscos e solução',
    descricao:
      'Por que o esgoto volta pelo ralo do banheiro ou da área de serviço, como saber se o problema é seu ou da rede pública e o que fazer imediatamente.',
    respostaDireta:
      'Esgoto voltando pelo ralo indica que o ramal coletivo está obstruído ou sobrecarregado. As causas mais comuns são gordura acumulada, raízes de árvore, tubulação colapsada e refluxo da rede pública em dias de chuva forte. Feche o uso de água e chame desentupidora com hidrojato para inspeção do ramal.',
    atualizadoEm: '2026-08-01',
    leituraMin: 6,
    secoes: [
      {
        h2: 'Como identificar a origem do refluxo',
        lista: [
          'Um único ralo afetado: obstrução local, geralmente cabelo e sabão no sifão.',
          'Vários pontos ao mesmo tempo: o ramal principal do imóvel está obstruído.',
          'Retorno só quando chove: infiltração de água pluvial na rede de esgoto ou ligação irregular de calha no ramal sanitário.',
          'Vizinhos com o mesmo problema: obstrução na rede coletora pública — chame a Sanepar e guarde o protocolo.',
          'Cheiro forte constante sem retorno de água: sifão seco ou ventilação da coluna obstruída.',
        ],
      },
      {
        h2: 'O que fazer nos primeiros minutos',
        lista: [
          'Interrompa o uso de água em todo o imóvel: cada descarga aumenta o volume que retorna.',
          'Isole o cômodo, calce botas de borracha e use luvas — o efluente carrega coliformes.',
          'Não jogue produtos químicos: eles ficam retidos e criam risco para quem for trabalhar no ramal.',
          'Fotografe o ponto de retorno e a caixa de inspeção; isso agiliza o diagnóstico e serve como registro para condomínio ou seguro.',
          'Após a normalização, desinfete o piso com solução de água sanitária a 2%.',
        ],
      },
      {
        h2: 'Causas estruturais mais comuns em Curitiba',
        paragrafos: [
          'Em bairros com casas construídas antes dos anos 1990 — como Portão, Água Verde, Cajuru e boa parte de Boa Vista — ainda existem trechos de manilha cerâmica. As juntas dessas manilhas abrem com o tempo e atraem raízes de árvores, que crescem dentro do tubo e formam uma malha que retém papel e gordura.',
          'Em regiões de várzea e solo mole, como as proximidades do rio Iguaçu e do Belém, o recalque do terreno cria contraflechas na tubulação: trechos onde o esgoto empoça em vez de escoar. Esse tipo de defeito só aparece em inspeção com câmera e exige troca do trecho, não apenas desentupimento.',
        ],
      },
      {
        h2: 'Solução definitiva x paliativo',
        paragrafos: [
          'O desentupimento mecânico devolve a vazão em poucas horas, mas se a causa for raiz ou tubo colapsado o problema volta em semanas. A sequência correta é: desobstruir, inspecionar com câmera e, com o laudo em mãos, decidir entre hidrojateamento periódico ou substituição do trecho danificado.',
          'Em condomínios, registre a ocorrência em ata: refluxo recorrente em prumada coletiva é manutenção predial e não pode ser cobrado individualmente de um morador.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Esgoto voltando pelo ralo é problema meu ou da Sanepar?',
        resposta:
          'Se o retorno acontece só no seu imóvel, a obstrução está no ramal interno e a responsabilidade é sua. Se atinge vários imóveis da rua ou a caixa da calçada transborda, é rede pública e cabe à Sanepar.',
      },
      {
        pergunta: 'É perigoso ficar em casa com esgoto retornando?',
        resposta:
          'O efluente carrega bactérias e gases. Evite contato, ventile o ambiente, não permita crianças e animais no cômodo e desinfete o piso após a limpeza.',
      },
      {
        pergunta: 'Hidrojateamento resolve refluxo por raiz?',
        resposta:
          'O hidrojato corta e remove a raiz temporariamente. Se a fissura no tubo permanece, a raiz volta em alguns meses; a solução definitiva é a troca do trecho.',
      },
    ],
    servicos: ['desentupimento-esgoto-residencial', 'hidrojateamento', 'camera-inspecao-esgoto', 'troca-tubulacao'],
  },
  {
    slug: 'como-encontrar-vazamento-de-agua',
    categoria: 'encanamento',
    titulo: 'Como Encontrar Vazamento de Água Escondido',
    h1: 'Como encontrar vazamento de água escondido em casa',
    descricao:
      'Teste do hidrômetro, sinais de vazamento em parede e piso, custo de caça-vazamento em Curitiba e quando o reparo é responsabilidade da Sanepar.',
    respostaDireta:
      'Para descobrir um vazamento escondido, feche todas as torneiras e aparelhos, anote a leitura do hidrômetro e confira depois de 2 horas. Se o número mudou, há vazamento na instalação. Manchas de umidade, piso quente e som contínuo de água confirmam o ponto aproximado.',
    atualizadoEm: '2026-08-01',
    leituraMin: 6,
    secoes: [
      {
        h2: 'Teste do hidrômetro passo a passo',
        lista: [
          'Feche todas as torneiras, chuveiros, máquina de lavar e a boia da caixa d’água.',
          'Anote a leitura completa do hidrômetro, incluindo os dígitos vermelhos.',
          'Observe a estrela indicadora: se ela gira com tudo fechado, o vazamento é antes da caixa.',
          'Aguarde 2 horas sem usar água e anote a leitura novamente.',
          'Diferença entre as leituras confirma vazamento. Repita fechando o registro geral do imóvel: se parar, o vazamento é interno; se continuar, está no ramal de entrada.',
        ],
      },
      {
        h2: 'Sinais de vazamento por local',
        tabela: {
          colunas: ['Sinal observado', 'Causa provável', 'Urgência'],
          linhas: [
            ['Mancha de umidade na parede', 'Tubo de água fria embutido rompido', 'Alta'],
            ['Piso morno em ponto localizado', 'Vazamento na rede de água quente', 'Alta'],
            ['Azulejo solto ou rejunte escuro', 'Infiltração lenta atrás do box', 'Média'],
            ['Som de água correndo à noite', 'Vazamento em prumada ou registro', 'Alta'],
            ['Conta de água dobrada sem mudança de uso', 'Boia travada ou vazamento enterrado', 'Alta'],
            ['Bolor no rodapé de um único cômodo', 'Infiltração vinda do vizinho ou do solo', 'Média'],
          ],
        },
      },
      {
        h2: 'Quanto custa localizar e reparar em Curitiba',
        paragrafos: [
          'A caça-vazamento não destrutiva, feita com geofone eletrônico e câmera termográfica, custa entre R$ 250 e R$ 600 em Curitiba, dependendo da metragem do imóvel. O valor costuma incluir laudo com a marcação do ponto.',
          'O reparo em si varia de R$ 150 a R$ 500 quando o tubo está acessível, e sobe conforme a necessidade de quebra e recomposição de piso ou revestimento. Vazamento em prumada de prédio envolve o condomínio e pode exigir desligamento da coluna.',
        ],
        destaque:
          'Vale contratar a localização antes do reparo: quebrar parede "no chute" costuma custar mais caro que o laudo técnico.',
      },
      {
        h2: 'Conta de água alta nem sempre é vazamento',
        lista: [
          'Boia da caixa d’água travada, com extravasor descarregando direto na chuva — sem mancha visível.',
          'Válvula de descarga com vedação gasta, que escoa continuamente em fio d’água.',
          'Registro de jardim ou torneira externa aberta parcialmente.',
          'Troca de hidrômetro recente com leitura reiniciada — confira a fatura contra a leitura real.',
          'Aumento sazonal de uso: piscina, lavagens, mais moradores no imóvel.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Como saber se tenho vazamento sem quebrar a parede?',
        resposta:
          'Faça o teste do hidrômetro com tudo fechado e, se confirmar consumo, contrate uma caça-vazamento com geofone e termografia, que localiza o ponto sem demolição.',
      },
      {
        pergunta: 'Quanto custa um caça-vazamento em Curitiba?',
        resposta:
          'A localização não destrutiva custa entre R$ 250 e R$ 600 em Curitiba, geralmente com laudo. O reparo é cobrado à parte, entre R$ 150 e R$ 500 em pontos acessíveis.',
      },
      {
        pergunta: 'A Sanepar conserta vazamento dentro do imóvel?',
        resposta:
          'Não. A Sanepar é responsável até o hidrômetro. Do cavalete para dentro, o reparo é do proprietário.',
      },
      {
        pergunta: 'Vazamento pode aparecer só na conta e não na parede?',
        resposta:
          'Sim. Vazamentos enterrados sob o piso ou no jardim podem escoar direto para o solo por meses sem deixar mancha visível.',
      },
    ],
    servicos: ['conserto-vazamento', 'encanador-residencial', 'troca-tubulacao', 'instalacao-hidraulica'],
  },
  {
    slug: 'quando-trocar-tubulacao-antiga',
    categoria: 'encanamento',
    titulo: 'Quando Trocar a Tubulação Antiga do Imóvel',
    h1: 'Quando trocar a tubulação antiga: sinais e custos',
    descricao:
      'Ferro galvanizado, manilha cerâmica e PVC antigo: sinais de que a tubulação precisa ser trocada, custo por metro em Curitiba e como planejar a obra.',
    respostaDireta:
      'A tubulação precisa ser trocada quando há água amarelada, pressão caindo ano após ano, vazamentos repetidos no mesmo trecho ou laudo de câmera mostrando tubo colapsado. Instalações de ferro galvanizado com mais de 30 anos e manilhas cerâmicas já estão além da vida útil e tendem a falhar em sequência.',
    atualizadoEm: '2026-08-01',
    leituraMin: 7,
    secoes: [
      {
        h2: 'Vida útil por tipo de material',
        tabela: {
          colunas: ['Material', 'Uso típico', 'Vida útil'],
          linhas: [
            ['Ferro galvanizado', 'Água fria em casas até 1985', '25 a 35 anos'],
            ['Manilha cerâmica', 'Esgoto em casas antigas', '30 a 50 anos'],
            ['PVC rígido', 'Água fria e esgoto atuais', '40 a 50 anos'],
            ['CPVC / PPR', 'Água quente', '40 a 50 anos'],
            ['PEX', 'Distribuição interna moderna', '40+ anos'],
            ['Cobre', 'Água quente e gás', '50+ anos'],
          ],
        },
      },
      {
        h2: 'Cinco sinais de que a troca não pode esperar',
        lista: [
          'Água sai amarelada ou com partículas ao abrir a torneira depois de horas parada — corrosão interna do galvanizado.',
          'Queda progressiva de pressão em todo o imóvel, mesmo com caixa d’água cheia: incrustação reduziu o diâmetro útil do tubo.',
          'Terceiro vazamento em menos de dois anos no mesmo trecho.',
          'Inspeção por câmera mostrando trinca longitudinal, desalinhamento de junta ou trecho com empoçamento.',
          'Reforma de banheiro ou cozinha em andamento: aproveitar a obra reduz o custo da troca em até 40%.',
        ],
      },
      {
        h2: 'Custos de referência em Curitiba',
        paragrafos: [
          'A troca de tubulação de água fria em um banheiro completo, com quebra e recomposição básica, fica entre R$ 1.500 e R$ 3.500. Um ramal de esgoto externo, escavado no quintal, custa entre R$ 200 e R$ 400 por metro linear, variando com profundidade e tipo de piso a recompor.',
          'A substituição total de um imóvel de 80 m² com instalação antiga de ferro galvanizado costuma ficar entre R$ 8.000 e R$ 18.000, incluindo material, mão de obra e acabamento. Em apartamentos, prumadas coletivas são responsabilidade do condomínio.',
        ],
        destaque:
          'Peça sempre o orçamento discriminando material, mão de obra e recomposição civil. É a única forma de comparar propostas de forma justa.',
      },
      {
        h2: 'Como planejar a obra sem ficar sem água',
        paragrafos: [
          'Trabalhe por setores: troque primeiro a rede da área de serviço e cozinha, depois os banheiros. Encanadores experientes deixam pontos provisórios (by-pass) para manter um banheiro em uso durante a obra.',
          'Antes de fechar as paredes, exija teste de estanqueidade com bomba a 1,5 vez a pressão de serviço por no mínimo uma hora, e fotografe todo o traçado. Esse registro vale ouro em qualquer manutenção futura.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Como saber se a tubulação é de ferro galvanizado?',
        resposta:
          'Encoste um ímã no tubo aparente: ferro galvanizado atrai. Também é comum em imóveis construídos antes de 1985 e produz água amarelada após horas parada.',
      },
      {
        pergunta: 'Quanto custa trocar toda a tubulação de uma casa em Curitiba?',
        resposta:
          'Uma casa de cerca de 80 m² fica entre R$ 8.000 e R$ 18.000, considerando material, mão de obra e recomposição de revestimentos.',
      },
      {
        pergunta: 'Dá para trocar tubulação sem quebrar tudo?',
        resposta:
          'Em muitos casos sim: técnicas de redistribuição por forro, rodapé técnico ou tubo dentro de tubo reduzem bastante a demolição, embora nem sempre substituam a troca convencional.',
      },
    ],
    servicos: ['troca-tubulacao', 'instalacao-hidraulica', 'conserto-vazamento', 'camera-inspecao-esgoto'],
  },
  {
    slug: 'limpeza-caixa-de-gordura',
    categoria: 'manutencao-preventiva',
    titulo: 'Limpeza de Caixa de Gordura: Frequência e Preço',
    h1: 'Limpeza de caixa de gordura: com que frequência fazer',
    descricao:
      'Frequência ideal de limpeza da caixa de gordura em casas, prédios e restaurantes de Curitiba, preços praticados e como evitar entupimento na cozinha.',
    respostaDireta:
      'A caixa de gordura residencial deve ser limpa a cada 6 meses; prédios e cozinhas comerciais precisam de limpeza mensal ou quinzenal. Em Curitiba, o serviço custa de R$ 150 a R$ 400 em residências e de R$ 300 a R$ 1.200 em estabelecimentos comerciais, conforme o volume da caixa.',
    atualizadoEm: '2026-08-01',
    leituraMin: 6,
    secoes: [
      {
        h2: 'Frequência recomendada por tipo de imóvel',
        tabela: {
          colunas: ['Tipo de imóvel', 'Frequência', 'Faixa de preço'],
          linhas: [
            ['Casa com até 4 moradores', 'A cada 6 meses', 'R$ 150 – R$ 300'],
            ['Casa com mais de 5 moradores', 'A cada 4 meses', 'R$ 180 – R$ 350'],
            ['Prédio residencial (caixa coletiva)', 'A cada 2 a 3 meses', 'R$ 400 – R$ 900'],
            ['Padaria e lanchonete', 'Mensal', 'R$ 300 – R$ 700'],
            ['Restaurante e churrascaria', 'Quinzenal', 'R$ 500 – R$ 1.200'],
            ['Cozinha industrial', 'Semanal a quinzenal', 'Sob consulta'],
          ],
        },
      },
      {
        h2: 'Sinais de que a limpeza está atrasada',
        lista: [
          'Pia da cozinha escoando devagar mesmo com sifão limpo.',
          'Odor de gordura rançosa na área de serviço ou no quintal.',
          'Tampa da caixa com transbordamento ou crosta visível.',
          'Ralos da cozinha borbulhando quando a máquina de lavar louça esvazia.',
          'Presença de moscas e baratas concentradas perto da caixa.',
        ],
      },
      {
        h2: 'Por que não basta jogar água quente',
        paragrafos: [
          'Água quente derrete a gordura apenas nos primeiros metros. Alguns metros adiante, com a temperatura já normalizada, ela volta a solidificar — normalmente em uma curva ou na entrada da caixa de inspeção, onde é muito mais difícil de remover.',
          'O procedimento correto é a remoção física da camada sólida com sucção ou concha, raspagem das paredes internas, retirada do material para destinação licenciada e enxágue final. Produtos biológicos à base de enzimas ajudam entre as limpezas, mas não substituem a remoção.',
        ],
        destaque:
          'Estabelecimentos comerciais em Curitiba devem guardar o comprovante de destinação do resíduo: ele é exigido em fiscalização sanitária.',
      },
      {
        h2: 'Rotina que reduz pela metade a necessidade de limpeza',
        lista: [
          'Raspe pratos e panelas no lixo antes de lavar; a maior parte da gordura entra assim.',
          'Guarde óleo usado em garrafa PET e leve a um ponto de coleta — nunca na pia.',
          'Use tela retentora no ralo da pia e limpe diariamente.',
          'Evite despejar restos de café e de sopa com gordura direto no ralo.',
          'Faça a limpeza preventiva na data programada, e não quando o problema aparecer.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'De quanto em quanto tempo limpar a caixa de gordura?',
        resposta:
          'Residências: a cada 6 meses. Prédios: a cada 2 a 3 meses. Restaurantes e cozinhas comerciais: quinzenal ou mensal, conforme o volume de produção.',
      },
      {
        pergunta: 'Quanto custa limpar caixa de gordura em Curitiba?',
        resposta:
          'De R$ 150 a R$ 400 em residências e de R$ 300 a R$ 1.200 em estabelecimentos comerciais, dependendo do tamanho da caixa e da frequência contratada.',
      },
      {
        pergunta: 'Posso limpar a caixa de gordura sozinho?',
        resposta:
          'Em residências pequenas é possível, com luvas e máscara, mas o resíduo não pode ir para o lixo comum nem para a rede de esgoto. Empresas licenciadas fazem a destinação correta.',
      },
    ],
    servicos: ['desentupimento-caixa-gordura', 'desentupimento-pia-cozinha', 'hidrojateamento', 'encanador-comercial'],
  },
  {
    slug: 'manutencao-preventiva-predial-hidraulica',
    categoria: 'manutencao-preventiva',
    titulo: 'Manutenção Hidráulica Predial: Calendário Anual',
    h1: 'Manutenção hidráulica predial: calendário anual completo',
    descricao:
      'Calendário de manutenção hidráulica para condomínios de Curitiba: caixa d’água, prumadas, caixa de gordura, bombas e rede de esgoto, com periodicidade e custos.',
    respostaDireta:
      'Um condomínio deve limpar a caixa d’água a cada 6 meses, a caixa de gordura a cada 2 a 3 meses, inspecionar prumadas anualmente e fazer hidrojateamento preventivo da rede coletora a cada 12 a 24 meses. Esse calendário reduz em até 70% os chamados de emergência por entupimento.',
    atualizadoEm: '2026-08-01',
    leituraMin: 7,
    secoes: [
      {
        h2: 'Calendário de manutenção por sistema',
        tabela: {
          colunas: ['Sistema', 'Periodicidade', 'O que é feito'],
          linhas: [
            ['Caixa d’água / reservatório', 'Semestral', 'Esvaziamento, escovação, desinfecção e laudo'],
            ['Caixa de gordura coletiva', 'Bimestral', 'Sucção, raspagem e destinação licenciada'],
            ['Rede coletora de esgoto', '12 a 24 meses', 'Hidrojateamento preventivo e inspeção por câmera'],
            ['Prumadas de água', 'Anual', 'Teste de pressão, verificação de registros e vazamentos'],
            ['Bombas de recalque', 'Trimestral', 'Verificação de selo, rolamento e quadro elétrico'],
            ['Ralos e grelhas de garagem', 'Trimestral', 'Limpeza de sedimentos e teste de escoamento'],
            ['Válvulas de retenção', 'Anual', 'Inspeção contra refluxo em dias de chuva'],
          ],
        },
      },
      {
        h2: 'Quanto o preventivo economiza',
        paragrafos: [
          'Um hidrojateamento preventivo da rede coletora de um prédio de médio porte custa entre R$ 1.200 e R$ 3.000 e é feito uma vez a cada um ou dois anos. Uma emergência de refluxo no mesmo prédio, com atendimento noturno, limpeza de garagem inundada e reparo civil, passa facilmente de R$ 6.000 — sem contar o desgaste com moradores.',
          'A inspeção por câmera permite programar trocas de trecho para períodos de baixa ocupação, evitando obra emergencial no meio do verão, quando o consumo é maior.',
        ],
        destaque:
          'Registre todas as manutenções em um livro de ocorrências com nota fiscal e laudo. É documento essencial em vistoria de seguro e em disputa condominial.',
      },
      {
        h2: 'Responsabilidades: condomínio x morador',
        lista: [
          'Prumadas coletivas, caixas de inspeção comuns, reservatórios e bombas: condomínio.',
          'Ramal interno da unidade, sifões, vasos e torneiras: morador.',
          'Entupimento em prumada que afeta várias unidades: condomínio, mesmo que se manifeste em um único apartamento.',
          'Dano causado por descarte indevido comprovado (estopa, entulho, gordura): responsabilidade do morador que deu causa.',
          'Refluxo por rede pública sobrecarregada: registrar protocolo junto à Sanepar.',
        ],
      },
      {
        h2: 'Contrato de manutenção ou chamado avulso?',
        paragrafos: [
          'Prédios com mais de 30 unidades costumam ter vantagem em contratar manutenção programada, com valor mensal fixo, prioridade de atendimento e relatórios periódicos. Condomínios menores tendem a se sair melhor com serviços avulsos programados em calendário, contratados de empresa de confiança.',
          'Em qualquer formato, exija ART ou documento de responsabilidade técnica para serviços que envolvam intervenção em rede coletiva, e confirme se a empresa possui destinação licenciada dos resíduos.',
        ],
      },
    ],
    faq: [
      {
        pergunta: 'Com que frequência limpar a caixa d’água do prédio?',
        resposta:
          'A recomendação é a cada 6 meses, com laudo de limpeza e desinfecção emitido pela empresa executante.',
      },
      {
        pergunta: 'Hidrojateamento preventivo vale a pena em condomínio?',
        resposta:
          'Sim. Custa entre R$ 1.200 e R$ 3.000 a cada um ou dois anos e evita emergências de refluxo que passam de R$ 6.000 com limpeza e reparo civil.',
      },
      {
        pergunta: 'Quem paga o desentupimento em condomínio?',
        resposta:
          'Se a obstrução está na prumada ou em área comum, o custo é do condomínio. Se está no ramal interno da unidade, é do morador.',
      },
    ],
    servicos: ['hidrojateamento', 'camera-inspecao-esgoto', 'desentupimento-esgoto-comercial', 'instalacao-caixa-dagua'],
  },
  {
    slug: 'como-funciona-camera-de-inspecao-de-esgoto',
    categoria: 'desentupimento',
    titulo: 'Como Funciona a Câmera de Inspeção de Esgoto',
    h1: 'Como funciona a câmera de inspeção de esgoto (vídeo inspeção)',
    descricao:
      'Como funciona a vídeo inspeção de tubulação: equipamento, etapas, o que a imagem revela, quanto custa em Curitiba e quando vale a pena inspecionar antes de quebrar.',
    respostaDireta:
      'A câmera de inspeção é uma sonda de vídeo em haste flexível introduzida na tubulação por um ponto de acesso já existente. Ela percorre o cano gravando o interior em alta definição e um transmissor marca na superfície a posição e a profundidade do defeito, permitindo diagnóstico completo sem quebrar piso ou parede.',
    atualizadoEm: '2026-08-04',
    leituraMin: 8,
    secoes: [
      {
        h2: 'O que é a vídeo inspeção de tubulação',
        paragrafos: [
          'A vídeo inspeção, também chamada de inspeção por câmera ou câmera de esgoto, é um exame de imagem do interior da tubulação. Em vez de abrir o piso para procurar onde está o problema, o técnico envia uma câmera pelo próprio cano e observa a rede por dentro.',
          'O equipamento é composto por um cabeçote de vídeo com iluminação LED, uma haste de fibra de vidro enrolada em carretel, um monitor com gravador e um transmissor de sinal (normalmente 512 Hz) captado por um receptor na superfície.',
          'É o mesmo princípio usado por concessionárias de saneamento para inspecionar coletores públicos, adaptado a diâmetros residenciais e prediais a partir de 40 mm.',
        ],
      },
      {
        h2: 'Passo a passo da inspeção',
        lista: [
          'Escolha do ponto de acesso: caixa de inspeção, caixa de gordura, ralo, tubo de queda ou vaso removido.',
          'Introdução do cabeçote e avanço da haste acompanhando curvas e conexões.',
          'Gravação contínua do percurso com contador de metragem sobreposto à imagem.',
          'Identificação do defeito: gordura, raiz, trinca, junta deslocada, contra-caimento ou esmagamento.',
          'Localização eletrônica: o receptor marca no piso a posição e a profundidade exatas.',
          'Entrega do vídeo e do relatório técnico com a solução recomendada.',
        ],
      },
      {
        h2: 'O que a imagem consegue revelar',
        paragrafos: [
          'A câmera diferencia dois tipos de achado. O primeiro é o depósito removível — gordura solidificada, incrustação, areia, papel e objetos — que se resolve com hidrojateamento ou rotosonda.',
          'O segundo é o dano estrutural: trinca longitudinal, manilha de barro quebrada, tubo ovalizado, junta aberta com entrada de raiz, afundamento com água parada e colapso do cano. Esse grupo exige reparo localizado, e é justamente aqui que a marcação do ponto evita quebrar metros de piso à toa.',
        ],
      },
      {
        h2: 'Quanto custa em Curitiba',
        tabela: {
          colunas: ['Tipo de inspeção', 'Preço médio 2026'],
          linhas: [
            ['Ramal residencial até 30 m', 'R$ 200 a R$ 400'],
            ['Ramal estendido de 30 a 60 m', 'R$ 350 a R$ 600'],
            ['Prumada ou coluna de condomínio', 'R$ 500 a R$ 1.200'],
            ['Inspeção com relatório técnico completo', 'R$ 350 a R$ 800'],
            ['Inspeção combinada com hidrojateamento', 'R$ 600 a R$ 1.500'],
          ],
        },
        destaque:
          'Uma quebra exploratória de piso mal localizada custa, entre demolição, material e reassentamento, mais do que a inspeção que teria evitado o erro.',
      },
      {
        h2: 'Quando vale a pena inspecionar antes de quebrar',
        lista: [
          'Entupimento que volta poucas semanas depois de desentupido.',
          'Mancha de umidade, piso frio ou afundamento sobre a linha de esgoto.',
          'Imóvel com mais de 20 anos antes de reforma ou compra.',
          'Condomínio que precisa justificar orçamento de manutenção em assembleia.',
          'Discussão com construtora, seguradora ou vizinho sobre origem do dano.',
        ],
      },
    ],
    faq: [
      { pergunta: 'A inspeção resolve o entupimento?', resposta: 'Não. Ela diagnostica. A desobstrução é feita depois por hidrojateamento, rotosonda ou reparo localizado, conforme o defeito encontrado.' },
      { pergunta: 'Precisa quebrar alguma coisa?', resposta: 'Não. O acesso é feito por caixas, ralos e tubos já existentes. A quebra, se necessária, ocorre só no ponto marcado pela sonda.' },
      { pergunta: 'Qual o alcance da câmera?', resposta: 'De 30 a 60 metros em equipamentos de haste e mais de 100 metros em sistemas robotizados com carretel motorizado.' },
      { pergunta: 'Recebo o vídeo?', resposta: 'Sim. Peça o arquivo digital completo, e não apenas capturas de tela, além do relatório com metragem e recomendação.' },
    ],
    servicos: ['camera-inspecao-esgoto', 'hidrojateamento', 'desentupimento-esgoto-residencial'],
  },
  {
    slug: 'video-inspecao-ou-hidrojateamento',
    categoria: 'desentupimento',
    titulo: 'Vídeo Inspeção ou Hidrojateamento: Qual Contratar',
    h1: 'Vídeo inspeção ou hidrojateamento: qual serviço contratar primeiro',
    descricao:
      'Diferença entre vídeo inspeção e hidrojateamento: um diagnostica, o outro trata. Veja quando contratar cada um, quanto custa em Curitiba e quando fazer os dois juntos.',
    respostaDireta:
      'Vídeo inspeção e hidrojateamento não competem: um diagnostica e o outro trata. A câmera mostra o que existe dentro do cano; o jato de água a alta pressão remove gordura e incrustação. Em entupimento recorrente, o caminho mais econômico costuma ser inspecionar, jatear e reinspecionar para confirmar o resultado.',
    atualizadoEm: '2026-08-04',
    leituraMin: 7,
    secoes: [
      {
        h2: 'A diferença essencial',
        paragrafos: [
          'A vídeo inspeção é um serviço de diagnóstico. Ela não remove nada: entrega imagem, metragem e localização do defeito.',
          'O hidrojateamento é um serviço de tratamento. Um jato de água entre 200 e 500 bar desprende gordura, incrustação, areia e raiz fina das paredes internas do tubo, devolvendo o diâmetro original.',
          'Contratar apenas o hidrojateamento resolve o sintoma quando a causa é acúmulo. Se a causa for estrutural — tubo rompido, afundado ou esmagado — o jato limpa e o problema volta, porque o defeito continua lá.',
        ],
      },
      {
        h2: 'Qual contratar em cada situação',
        tabela: {
          colunas: ['Situação', 'Serviço indicado'],
          linhas: [
            ['Primeiro entupimento, escoamento lento na cozinha', 'Desentupimento ou hidrojateamento'],
            ['Entupimento que volta em semanas', 'Vídeo inspeção primeiro'],
            ['Mau cheiro e umidade sem causa aparente', 'Vídeo inspeção'],
            ['Piso ou calçada afundando', 'Vídeo inspeção com localização'],
            ['Manutenção anual de restaurante', 'Hidrojateamento + inspeção final'],
            ['Prédio com refluxo em andares baixos', 'Inspeção da prumada e depois hidrojateamento'],
          ],
        },
      },
      {
        h2: 'Custos comparados em Curitiba',
        tabela: {
          colunas: ['Serviço', 'Preço médio 2026'],
          linhas: [
            ['Vídeo inspeção residencial', 'R$ 200 a R$ 600'],
            ['Hidrojateamento residencial', 'R$ 350 a R$ 800'],
            ['Hidrojateamento predial/comercial', 'R$ 800 a R$ 2.500'],
            ['Pacote inspeção + hidrojateamento', 'R$ 600 a R$ 1.500'],
          ],
        },
        destaque:
          'Peça o pacote combinado: muitas empresas abatem o valor da inspeção quando o hidrojateamento é contratado na sequência.',
      },
      {
        h2: 'A sequência ideal em casos recorrentes',
        lista: [
          'Inspecionar para identificar causa e material da tubulação.',
          'Jatear apenas o trecho que realmente precisa, com pressão compatível com o tubo.',
          'Reinspecionar após a limpeza para comprovar o resultado.',
          'Definir um plano preventivo com base no que foi encontrado.',
        ],
      },
    ],
    faq: [
      { pergunta: 'Hidrojateamento pode danificar tubo antigo?', resposta: 'Pode, se a pressão for incompatível com manilha de barro ou cimento amianto já deteriorado. Por isso a inspeção prévia importa: ela revela o material e o estado do tubo.' },
      { pergunta: 'Dá para fazer só a inspeção?', resposta: 'Dá, e é comum antes de compra de imóvel, reforma ou laudo. O relatório vale por si só como documento técnico.' },
      { pergunta: 'A inspeção depois do jateamento é necessária?', resposta: 'É a melhor forma de comprovar que o serviço entregou o resultado prometido e que não há dano estrutural escondido sob a incrustação.' },
    ],
    servicos: ['hidrojateamento', 'camera-inspecao-esgoto', 'desentupimento-caixa-gordura'],
  },
];

export function getCategoriaBySlug(slug: string): BlogCategoria | undefined {
  return blogCategorias.find((c) => c.slug === slug);
}

export function getArtigoBySlug(slug: string): BlogArtigo | undefined {
  return blogArtigos.find((a) => a.slug === slug);
}

export function getArtigosPorCategoria(slug: string): BlogArtigo[] {
  return blogArtigos.filter((a) => a.categoria === slug);
}

export function getArtigosRelacionados(artigo: BlogArtigo, limite = 3): BlogArtigo[] {
  const mesmaCategoria = blogArtigos.filter(
    (a) => a.slug !== artigo.slug && a.categoria === artigo.categoria,
  );
  const outros = blogArtigos.filter(
    (a) => a.slug !== artigo.slug && a.categoria !== artigo.categoria,
  );
  return [...mesmaCategoria, ...outros].slice(0, limite);
}
