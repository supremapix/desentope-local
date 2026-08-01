/**
 * Perfis locais — contexto editorial exclusivo por bairro de Curitiba e por
 * cidade da Região Metropolitana.
 *
 * Regra editorial: nenhum texto pode ser apenas "troca de nome". Cada perfil
 * descreve o tipo de imóvel, a infraestrutura hidráulica real da região e os
 * problemas de encanamento que efetivamente aparecem lá. Bairros sem verbete
 * próprio herdam o perfil da sua regional administrativa, que já é distinto
 * entre si (Matriz ≠ CIC ≠ Bairro Novo).
 */

export interface ProblemaLocal {
  titulo: string;
  texto: string;
}

export interface PerfilLocal {
  /** Bloco AEO/GEO: resposta objetiva de 40-60 palavras no topo da página. */
  respostaDireta: string;
  perfilResidencial: string;
  perfilComercial: string;
  imoveis: string;
  infraestrutura: string;
  demanda: string;
  problemas: ProblemaLocal[];
  /** Slugs de /servicos/:slug mais buscados na região. */
  servicosDestaque: string[];
}

type PerfilBase = Omit<PerfilLocal, 'respostaDireta'> & { respostaDireta?: string };

const SERVICOS_URBANOS = [
  'desentupimento-vaso-sanitario',
  'desentupimento-pia-cozinha',
  'desentupimento-esgoto-residencial',
  'desentupimento-caixa-gordura',
  'hidrojateamento',
  'conserto-vazamento',
];

const SERVICOS_RURAIS = [
  'limpa-fossa',
  'desentupimento-esgoto-residencial',
  'hidrojateamento',
  'camera-inspecao-esgoto',
  'troca-tubulacao',
  'instalacao-caixa-dagua',
];

const SERVICOS_COMERCIAIS = [
  'desentupimento-esgoto-comercial',
  'desentupimento-caixa-gordura',
  'hidrojateamento',
  'camera-inspecao-esgoto',
  'encanador-comercial',
  'emergencia-24h',
];

/* ------------------------------------------------------------------ */
/* Curitiba — perfis por regional administrativa                       */
/* ------------------------------------------------------------------ */

const perfisRegional: Record<string, PerfilBase> = {
  Matriz: {
    perfilResidencial:
      'A regional Matriz concentra a maior densidade vertical de Curitiba: edifícios antigos do miolo do Centro convivem com torres novas em Alto da Glória, Juvevê e Cabral. Boa parte do estoque residencial tem mais de 30 anos e ainda opera com colunas de esgoto em ferro fundido ou cerâmica.',
    perfilComercial:
      'É também o polo de escritórios, clínicas, bares e restaurantes da cidade. Cozinhas comerciais em prédios mistos dividem a mesma prumada dos apartamentos, o que faz um entupimento de caixa de gordura afetar vários pavimentos ao mesmo tempo.',
    imoveis: 'Edifícios de 4 a 20 pavimentos, sobrados históricos, salas comerciais e imóveis tombados.',
    infraestrutura:
      'Rede coletora da Sanepar bem consolidada, porém com ramais internos de prédios antigos que raramente foram substituídos. Ruas com galerias pluviais sobrecarregadas em chuvas fortes.',
    demanda:
      'Chamados concentrados em prumadas de esgoto, refluxo em apartamentos de andar baixo e desentupimento noturno em bares e restaurantes.',
    problemas: [
      { titulo: 'Prumada coletiva entupida', texto: 'Em prédios de 8 andares ou mais, gordura e resíduos se acumulam na coluna vertical e o refluxo aparece primeiro nos apartamentos do térreo e do 1º andar.' },
      { titulo: 'Ferro fundido corroído', texto: 'Tubulações originais de edifícios das décadas de 1960-80 perdem seção interna por incrustação; a inspeção com câmera evita quebra desnecessária de parede.' },
      { titulo: 'Caixa de gordura de restaurante', texto: 'Cozinhas com alto volume no Centro e no Alto da Rua XV precisam de limpeza mensal; sem isso o entupimento ocorre em plena operação noturna.' },
      { titulo: 'Refluxo em subsolo e garagem', texto: 'Garagens abaixo do nível da rua sofrem retorno pela grelha em temporais, exigindo hidrojateamento das galerias internas.' },
    ],
    servicosDestaque: SERVICOS_COMERCIAIS,
  },

  'Boa Vista': {
    perfilResidencial:
      'Regional predominantemente residencial e arborizada, com casas de terreno amplo em Bacacheri, Ahú e Jardim Social e forte adensamento recente em Bairro Alto, Santa Cândida e Atuba. A mistura de casas antigas com prédios novos cria realidades hidráulicas bem diferentes na mesma rua.',
    perfilComercial:
      'Comércio de vizinhança, padarias, escolas e clínicas ao longo das avenidas Paraná, Erasto Gaertner e Anita Garibaldi, com demanda constante por caixa de gordura e manutenção preventiva.',
    imoveis: 'Casas térreas e sobrados em lotes de 300 a 600 m², condomínios horizontais e edifícios de até 12 andares.',
    infraestrutura:
      'Rede de esgoto ampliada por etapas; áreas próximas ao rio Atuba e à bacia do Bacacheri têm lençol freático alto e caixas de inspeção que alagam com facilidade.',
    demanda:
      'Alta procura por caça vazamentos em casas com jardim, desobstrução de ramal externo e limpeza de calhas e ralos de área de serviço.',
    problemas: [
      { titulo: 'Raízes de árvore no ramal', texto: 'A arborização densa de Bacacheri e Ahú faz raízes invadirem juntas de tubulação de 100 mm; o corte com hidrojato e câmera é o procedimento indicado.' },
      { titulo: 'Lençol freático alto', texto: 'Perto do Atuba e do Tingui, caixas de inspeção enchem de água limpa e mascaram entupimentos reais.' },
      { titulo: 'Vazamento oculto em piso de casa', texto: 'Casas com hidráulica embutida em contrapiso apresentam conta de água elevada sem sinal visível — caso típico de detecção eletrônica.' },
      { titulo: 'Ramal externo com caimento errado', texto: 'Ampliações feitas sem projeto deixam trechos sem declividade, provocando entupimentos recorrentes no mesmo ponto.' },
    ],
    servicosDestaque: ['conserto-vazamento', 'deteccao-vazamento-oculto', 'desentupimento-esgoto-residencial', 'hidrojateamento', 'camera-inspecao-esgoto', 'encanador-residencial'],
  },

  Cajuru: {
    perfilResidencial:
      'Regional de altíssima densidade populacional, com grande número de casas geminadas, kitnets e conjuntos habitacionais. Jardim das Américas e Guabirotuba concentram moradia estudantil pela proximidade com a UFPR e a PUCPR.',
    perfilComercial:
      'Comércio popular intenso na Avenida Prefeito Maurício Fruet e na Rua Ubaldino do Amaral, além de repúblicas, pensionatos e lanchonetes com uso pesado da rede.',
    imoveis: 'Casas geminadas, sobrados divididos em unidades, kitnets e pequenos edifícios sem elevador.',
    infraestrutura:
      'Rede antiga em várias quadras, com ramais compartilhados entre imóveis desmembrados — origem frequente de disputa entre vizinhos quando ocorre entupimento.',
    demanda:
      'Predomina desentupimento de vaso sanitário e de esgoto residencial em imóveis alugados, com forte pico em início e fim de semestre letivo.',
    problemas: [
      { titulo: 'Ramal compartilhado entre unidades', texto: 'Terrenos subdivididos mantêm uma única saída de esgoto para três ou quatro moradias; a obstrução afeta todos ao mesmo tempo.' },
      { titulo: 'Uso indevido do vaso em imóvel alugado', texto: 'Papel, absorventes e panos são a causa campeã de chamados em kitnets e repúblicas da região.' },
      { titulo: 'Caixa de gordura subdimensionada', texto: 'Muitas casas geminadas têm caixa de gordura de 30 litros para duas famílias, o que exige limpeza a cada dois meses.' },
      { titulo: 'Ralo de área de serviço obstruído', texto: 'Fiapos de tecido e areia acumulam no sifão do tanque, causando retorno na lavanderia.' },
    ],
    servicosDestaque: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-ralo', 'desentupimento-caixa-gordura', 'encanador-residencial', 'emergencia-24h'],
  },

  Boqueirão: {
    perfilResidencial:
      'Bairros consolidados de classe média com predominância de casas térreas e sobrados em lotes regulares, e adensamento vertical crescente ao longo da Marechal Floriano e da Linha Verde.',
    perfilComercial:
      'Forte comércio de rua, oficinas mecânicas, mercados de bairro e distribuidoras — perfil que gera muito resíduo sólido e gordura na rede.',
    imoveis: 'Casas térreas, sobrados, pequenos prédios e galpões comerciais.',
    infraestrutura:
      'Região plana da bacia do Iguaçu, com baixa declividade natural. Esse é o fator técnico que mais influencia entupimentos: o esgoto escoa devagar e sedimenta.',
    demanda:
      'Grande volume de hidrojateamento preventivo e desobstrução de rede externa, além de limpeza de caixa de gordura em comércios.',
    problemas: [
      { titulo: 'Baixa declividade da rede', texto: 'O relevo plano do Boqueirão faz sólidos sedimentarem no ramal; o jato de alta pressão remove o que a mola não alcança.' },
      { titulo: 'Alagamento em temporal', texto: 'Ruas próximas ao canal do Belém e ao rio Iguaçu recebem retorno pluvial nas grelhas e garagens.' },
      { titulo: 'Gordura de oficina e lanchonete', texto: 'Óleo mineral e vegetal despejados na rede endurecem no ramal e criam obstruções extensas.' },
      { titulo: 'Caixa de inspeção enterrada', texto: 'Reformas cobriram tampas de inspeção com piso; localizar o ponto exige câmera e detector de linha.' },
    ],
    servicosDestaque: ['hidrojateamento', 'desentupimento-esgoto-residencial', 'desentupimento-caixa-gordura', 'camera-inspecao-esgoto', 'desentupimento-esgoto-comercial', 'emergencia-24h'],
  },

  CIC: {
    perfilResidencial:
      'A Cidade Industrial de Curitiba é o maior bairro da cidade em área e população, formado por dezenas de vilas e jardins com padrões construtivos muito distintos — de conjuntos habitacionais planejados a ocupações consolidadas com hidráulica improvisada.',
    perfilComercial:
      'Convive com o maior parque industrial do estado: indústrias, transportadoras, refeitórios coletivos e galpões logísticos com redes de grande diâmetro e caixas separadoras de óleo.',
    imoveis: 'Casas populares, sobrados geminados, conjuntos habitacionais, galpões e plantas industriais.',
    infraestrutura:
      'Coexistem trechos com rede pública da Sanepar e áreas ainda servidas por fossa e sumidouro, principalmente nas vilas mais periféricas e em Campo de Santana.',
    demanda:
      'Mistura pouco comum: limpa fossa e desentupimento residencial de baixo custo lado a lado com desentupimento industrial e hidrojateamento de grande porte.',
    problemas: [
      { titulo: 'Fossa e sumidouro saturados', texto: 'Em vilas sem rede coletora, o sumidouro colmatado faz a fossa transbordar — a solução é sucção com caminhão e avaliação do solo.' },
      { titulo: 'Hidráulica ampliada sem projeto', texto: 'Puxadinhos e edículas ligados ao ramal original sobrecarregam uma tubulação dimensionada para uma família.' },
      { titulo: 'Rede industrial com sólidos pesados', texto: 'Galpões e refeitórios exigem hidrojato de alta vazão e caixa separadora limpa dentro da norma ambiental.' },
      { titulo: 'Ligação clandestina de pluvial no esgoto', texto: 'Água de chuva lançada na rede sanitária provoca refluxo generalizado nas casas mais baixas da quadra.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-esgoto-residencial', 'desentupimento-industrial', 'hidrojateamento', 'desentupimento-vaso-sanitario', 'emergencia-24h'],
  },

  Portão: {
    perfilResidencial:
      'Regional nobre e verticalizada: Batel, Água Verde, Bigorrilho e Vila Izabel têm alta concentração de edifícios com garagem em subsolo, piscina e área gourmet, ao lado de bolsões de casas antigas em Parolin e Fanny.',
    perfilComercial:
      'Eixo gastronômico e de serviços da cidade, com restaurantes, cafés, shoppings e clínicas de alto padrão que operam com caixas de gordura de grande volume.',
    imoveis: 'Edifícios de alto padrão, condomínios com subsolo, casarões adaptados a restaurantes e salas comerciais.',
    infraestrutura:
      'Rede pública consolidada, mas com forte pressão de uso e muitas edificações antigas convertidas em comércio sem readequação hidráulica.',
    demanda:
      'Contratos de manutenção preventiva com condomínios, limpeza programada de caixa de gordura e caça vazamentos em áreas comuns.',
    problemas: [
      { titulo: 'Área gourmet ligada ao ramal comum', texto: 'Churrasqueiras e cozinhas de festa em condomínios do Batel jogam gordura direto na prumada, sem caixa própria.' },
      { titulo: 'Subsolo com bomba de recalque parada', texto: 'Poços de esgoto pressurizado de garagens só se revelam entupidos quando a bomba falha e o nível sobe.' },
      { titulo: 'Restaurante em casa adaptada', texto: 'Imóveis residenciais convertidos em bares na Água Verde mantêm tubulação de 50 mm insuficiente para uso comercial.' },
      { titulo: 'Vazamento em prumada de água quente', texto: 'Edifícios com aquecimento central apresentam vazamentos internos que só a detecção eletrônica localiza sem quebrar acabamento.' },
    ],
    servicosDestaque: ['desentupimento-caixa-gordura', 'deteccao-vazamento-oculto', 'hidrojateamento', 'desentupimento-esgoto-comercial', 'conserto-vazamento', 'encanador-comercial'],
  },

  'Santa Felicidade': {
    perfilResidencial:
      'Regional de contrastes: chácaras e casas de colônia italiana em Santa Felicidade e Butiatuvinha, condomínios de altíssimo padrão em Mossunguê e Campina do Siqueira, e núcleos populares em Tatuquara e São João.',
    perfilComercial:
      'Polo gastronômico mais famoso do Paraná, com cantinas de grande porte que produzem volume expressivo de gordura, além de escritórios e torres corporativas no Ecoville.',
    imoveis: 'Chácaras, casas de alvenaria antiga, condomínios fechados de luxo e torres comerciais.',
    infraestrutura:
      'Rede coletora presente no eixo urbano, mas com áreas de chácara em Lamenha Pequena e Butiatuvinha ainda dependentes de fossa séptica e poço artesiano.',
    demanda:
      'Limpeza de caixa de gordura em cantinas, limpa fossa em chácaras e manutenção hidráulica de condomínios de alto padrão.',
    problemas: [
      { titulo: 'Cantinas com caixa de gordura sobrecarregada', texto: 'Restaurantes que servem centenas de refeições por dia precisam de limpeza quinzenal e destinação com nota fiscal.' },
      { titulo: 'Chácara com fossa séptica antiga', texto: 'Fossas de anel de concreto sem manutenção há anos apresentam colmatação e mau cheiro no terreno.' },
      { titulo: 'Terreno em declive acentuado', texto: 'A topografia da regional cria trechos com velocidade excessiva e outros com acúmulo, favorecendo obstruções pontuais.' },
      { titulo: 'Poço artesiano e caixa d\u2019água contaminados', texto: 'Imóveis sem abastecimento público exigem limpeza e desinfecção periódica do reservatório.' },
    ],
    servicosDestaque: ['desentupimento-caixa-gordura', 'limpa-fossa', 'hidrojateamento', 'instalacao-caixa-dagua', 'desentupimento-esgoto-comercial', 'camera-inspecao-esgoto'],
  },

  Pinheirinho: {
    perfilResidencial:
      'Bairros residenciais de perfil popular e médio, com loteamentos regulares, muitas casas térreas e presença marcante de chácaras e áreas de transição rural em Umbará e Ganchinho.',
    perfilComercial:
      'Comércio de bairro forte no entorno do terminal do Pinheirinho, com mercados, açougues e lanchonetes de alto giro.',
    imoveis: 'Casas térreas, sobrados populares, chácaras e pequenos comércios.',
    infraestrutura:
      'Cobertura de rede pública desigual: o núcleo urbano é atendido, enquanto Umbará, Ganchinho e Caximba mantêm grande número de fossas.',
    demanda:
      'Alternância entre desentupimento residencial simples e serviços de limpa fossa com caminhão em áreas de chácara.',
    problemas: [
      { titulo: 'Fossa em área de transição rural', texto: 'Lotes grandes em Umbará e Ganchinho ainda usam fossa e sumidouro que precisam de sucção a cada 1 a 3 anos.' },
      { titulo: 'Solo argiloso com baixa absorção', texto: 'A argila da região reduz a infiltração do sumidouro e antecipa a saturação do sistema.' },
      { titulo: 'Rede de bairro com sólidos', texto: 'Ramais próximos ao terminal recebem descarte irregular e obstruem com frequência.' },
      { titulo: 'Caixa d\u2019água sem tampa adequada', texto: 'Casas antigas apresentam reservatório exposto, com sedimento que entope registros e chuveiros.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'instalacao-caixa-dagua', 'hidrojateamento', 'encanador-residencial'],
  },

  'Bairro Novo': {
    perfilResidencial:
      'Sítio Cercado e Caximba formam uma das maiores concentrações habitacionais do sul de Curitiba, com conjuntos populares, casas geminadas e ocupações consolidadas em área de várzea.',
    perfilComercial:
      'Comércio local de pequeno porte, mercearias, salões e lanchonetes com estrutura hidráulica simples.',
    imoveis: 'Casas populares, geminados de conjunto habitacional e edificações autoconstruídas.',
    infraestrutura:
      'Área plana e baixa, próxima ao rio Iguaçu, com lençol freático raso e histórico de alagamento — condição que agrava qualquer obstrução na rede.',
    demanda:
      'Predomínio de desentupimento emergencial de vaso e esgoto residencial, com pedido frequente de atendimento noturno.',
    problemas: [
      { titulo: 'Lençol freático raso', texto: 'A água do solo invade caixas de inspeção e reduz a capacidade de escoamento do ramal.' },
      { titulo: 'Autoconstrução sem caixa de gordura', texto: 'Muitas casas ligam a pia direto no esgoto, o que faz a gordura obstruir o ramal externo em poucos meses.' },
      { titulo: 'Retorno em dia de chuva forte', texto: 'Na várzea do Iguaçu, o pico pluvial pressiona a rede e provoca refluxo em ralos e vasos.' },
      { titulo: 'Tubulação de pequeno diâmetro', texto: 'Ramais de 40 e 50 mm em ampliações caseiras entopem com qualquer sólido.' },
    ],
    servicosDestaque: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-ralo', 'emergencia-24h', 'desentupimento-caixa-gordura', 'hidrojateamento'],
  },

  Popular: {
    perfilResidencial:
      'Região de nome popular usada no dia a dia pelos moradores, com ocupação mista de casas, geminados e pequenos prédios. O padrão construtivo varia bastante de rua para rua, o que muda o tipo de chamado hidráulico.',
    perfilComercial:
      'Comércio de vizinhança — mercados, padarias, salões e lanchonetes — com caixas de gordura de pequeno volume e manutenção irregular.',
    imoveis: 'Casas térreas, geminados, sobrados e pequenos comércios de rua.',
    infraestrutura:
      'Atendimento por rede pública na maior parte das quadras, com trechos antigos de tubulação cerâmica e caixas de inspeção de difícil acesso.',
    demanda:
      'Chamados de desentupimento de vaso, pia e ramal externo, com procura crescente por hidrojateamento preventivo.',
    problemas: [
      { titulo: 'Tubulação cerâmica trincada', texto: 'Trechos antigos permitem entrada de raiz e terra, criando obstruções que voltam a cada poucos meses.' },
      { titulo: 'Gordura no ramal da cozinha', texto: 'Sem caixa de gordura dimensionada, a pia entope de forma recorrente no mesmo trecho.' },
      { titulo: 'Ralo de área externa entupido', texto: 'Folhas e areia bloqueiam grelhas e causam alagamento na garagem em chuvas fortes.' },
      { titulo: 'Vazamento em registro antigo', texto: 'Metais com mais de 15 anos vazam por dentro da parede e elevam a conta de água sem sinal aparente.' },
    ],
    servicosDestaque: SERVICOS_URBANOS,
  },
};

/* ------------------------------------------------------------------ */
/* Curitiba — verbetes exclusivos para bairros de maior demanda        */
/* ------------------------------------------------------------------ */

const perfisBairro: Record<string, Partial<PerfilBase>> = {
  batel: {
    perfilResidencial:
      'O Batel é o endereço mais verticalizado de alto padrão de Curitiba, com torres de dois a quatro apartamentos por andar, subsolos profundos e áreas comuns extensas. A hidráulica é complexa: prumadas longas, bombas de recalque e sistemas de água quente central.',
    perfilComercial:
      'Concentra restaurantes premiados, shoppings, clínicas e escritórios. A densidade gastronômica da Avenida do Batel e da Rua Bispo Dom José faz da caixa de gordura o ponto crítico do bairro.',
    imoveis: 'Torres residenciais de alto padrão, shoppings, casarões convertidos em restaurantes e lajes corporativas.',
    infraestrutura: 'Rede consolidada e de boa capacidade, porém com ramais internos de edifícios dos anos 1980 e forte carga comercial concentrada em poucas quadras.',
    demanda: 'Manutenção preventiva contratada por condomínios e restaurantes, atendimento discreto e fora do horário de pico.',
    problemas: [
      { titulo: 'Caixa de gordura de restaurante saturada', texto: 'Cozinhas de alto volume exigem limpeza quinzenal com destinação documentada dos resíduos.' },
      { titulo: 'Bomba de recalque de subsolo', texto: 'Poço de esgoto pressurizado entope com panos e resíduos, e a falha só aparece com transbordo na garagem.' },
      { titulo: 'Prumada de torre com incrustação', texto: 'Colunas de mais de 15 andares acumulam gordura e sabão; o hidrojato com bico rotativo restaura a seção.' },
      { titulo: 'Vazamento em água quente central', texto: 'Sistemas de aquecimento central exigem detecção eletrônica para não quebrar acabamento de alto custo.' },
    ],
    servicosDestaque: ['desentupimento-caixa-gordura', 'hidrojateamento', 'deteccao-vazamento-oculto', 'desentupimento-esgoto-comercial', 'encanador-comercial', 'emergencia-24h'],
  },

  'agua-verde': {
    perfilResidencial:
      'Água Verde é um dos bairros mais densos de Curitiba, com quarteirões inteiros de edifícios de 8 a 16 andares construídos entre 1980 e 2010 e ruas residenciais tranquilas nas bordas.',
    perfilComercial:
      'A Avenida República Argentina e a Rua Brasílio Itiberê concentram padarias, academias, clínicas e restaurantes de bairro com uso intenso da rede.',
    imoveis: 'Edifícios de médio e alto padrão, sobrados antigos e salas comerciais em pavimentos térreos.',
    infraestrutura: 'Rede pública madura, com prumadas de edifícios de três décadas que nunca passaram por limpeza programada.',
    demanda: 'Síndicos buscam hidrojateamento anual de prumadas e desobstrução rápida de coluna sem interditar o prédio.',
    problemas: [
      { titulo: 'Coluna de esgoto de edifício', texto: 'A obstrução na prumada aparece como refluxo simultâneo em vários apartamentos do mesmo alinhamento.' },
      { titulo: 'Ralo de sacada com folhas', texto: 'Sacadas altas acumulam folhagem e sujeira, causando infiltração na unidade de baixo.' },
      { titulo: 'Gordura em pia de apartamento', texto: 'A ausência de caixa de gordura individual transfere todo o resíduo para a coluna coletiva.' },
      { titulo: 'Vazamento entre unidades', texto: 'Infiltração no teto do vizinho exige localização precisa antes de qualquer obra.' },
    ],
    servicosDestaque: ['hidrojateamento', 'desentupimento-esgoto-residencial', 'deteccao-vazamento-oculto', 'desentupimento-pia-cozinha', 'conserto-vazamento', 'emergencia-24h'],
  },

  centro: {
    perfilResidencial:
      'O Centro reúne o estoque de edifícios mais antigo da cidade, muitos com mais de 50 anos, apartamentos compactos alugados e prédios mistos com comércio no térreo.',
    perfilComercial:
      'Galerias, lanchonetes, bares, hotéis e escritórios funcionam no mesmo prédio das moradias, somando cargas hidráulicas muito diferentes na mesma tubulação.',
    imoveis: 'Edifícios mistos, galerias comerciais, hotéis e apartamentos compactos.',
    infraestrutura: 'Rede pública antiga sob calçamento histórico, com dificuldade de acesso a caixas de inspeção e necessidade de trabalho noturno em algumas quadras.',
    demanda: 'Atendimento 24 horas para bares e hotéis, além de desobstrução de prumada em prédios sem manutenção documentada.',
    problemas: [
      { titulo: 'Prédio misto com carga comercial', texto: 'Lanchonete no térreo despeja gordura na mesma coluna dos apartamentos, que sofrem refluxo nos andares baixos.' },
      { titulo: 'Tubulação de ferro fundido dos anos 60', texto: 'A corrosão interna reduz o diâmetro útil e provoca entupimentos repetidos no mesmo trecho.' },
      { titulo: 'Acesso restrito à rede', texto: 'Calçadas e pisos históricos dificultam abertura; a câmera de inspeção evita intervenção destrutiva.' },
      { titulo: 'Grelha de galeria comercial', texto: 'Pontos de coleta pluvial entupidos alagam corredores internos em temporais de verão.' },
    ],
    servicosDestaque: ['emergencia-24h', 'camera-inspecao-esgoto', 'hidrojateamento', 'desentupimento-esgoto-comercial', 'desentupimento-caixa-gordura', 'desentupimento-vaso-sanitario'],
  },

  'cidade-industrial': {
    perfilResidencial:
      'A CIC abriga mais de 170 mil moradores distribuídos em dezenas de vilas com padrões muito distintos: conjuntos habitacionais planejados, loteamentos regulares e núcleos autoconstruídos.',
    perfilComercial:
      'É o maior distrito industrial do Paraná, com montadoras, fornecedores, transportadoras e refeitórios coletivos que operam redes de grande diâmetro e caixas separadoras.',
    imoveis: 'Casas populares, geminados, conjuntos habitacionais, galpões logísticos e plantas industriais.',
    infraestrutura: 'Rede da Sanepar em boa parte do bairro, com vilas periféricas ainda em fossa e sumidouro e ramais industriais independentes.',
    demanda: 'Duas frentes distintas: emergência residencial de baixo custo e desentupimento industrial com hidrojato de alta vazão.',
    problemas: [
      { titulo: 'Fossa saturada em vila sem rede', texto: 'Sucção com caminhão e avaliação do sumidouro resolvem transbordo e mau cheiro no terreno.' },
      { titulo: 'Rede industrial com resíduo pesado', texto: 'Galpões e refeitórios acumulam sólidos e óleo que só saem com jato de alta pressão.' },
      { titulo: 'Ampliação residencial sem projeto', texto: 'Edículas ligadas ao ramal original sobrecarregam tubulação dimensionada para uma família.' },
      { titulo: 'Ligação de água de chuva no esgoto', texto: 'A prática provoca refluxo generalizado nas casas mais baixas durante temporais.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-industrial', 'hidrojateamento', 'desentupimento-esgoto-residencial', 'camera-inspecao-esgoto', 'emergencia-24h'],
  },

  portao: {
    perfilResidencial:
      'O Portão combina verticalização recente ao longo da Avenida República Argentina com ruas internas de casas antigas de família, muitas com hidráulica original em ferro galvanizado.',
    perfilComercial:
      'Shopping, concessionárias, mercados e restaurantes formam um dos corredores comerciais mais movimentados do sul da cidade.',
    imoveis: 'Edifícios de médio porte, casas de alvenaria antiga e grandes lojas de rua.',
    infraestrutura: 'Rede pública consolidada, com ramais residenciais antigos de tubulação galvanizada que perderam diâmetro por incrustação.',
    demanda: 'Troca de tubulação em casas antigas e desobstrução de rede comercial de grande volume.',
    problemas: [
      { titulo: 'Tubo galvanizado incrustado', texto: 'Pressão baixa e água amarelada indicam corrosão interna; a solução definitiva é a substituição por PPR ou PEX.' },
      { titulo: 'Rede comercial de alto volume', texto: 'Mercados e restaurantes exigem hidrojateamento programado para não parar a operação.' },
      { titulo: 'Caixa de inspeção sob piso novo', texto: 'Reformas cobriram tampas e obrigam localização por câmera e sonda.' },
      { titulo: 'Vazamento em ramal de entrada', texto: 'O trecho entre o cavalete e a casa costuma vazar em imóveis com mais de 30 anos.' },
    ],
    servicosDestaque: ['troca-tubulacao', 'hidrojateamento', 'desentupimento-esgoto-comercial', 'conserto-vazamento', 'camera-inspecao-esgoto', 'encanador-residencial'],
  },

  boqueirao: {
    perfilResidencial:
      'Bairro residencial extenso e plano, com predominância de casas térreas e sobrados de família e verticalização concentrada na Marechal Floriano Peixoto.',
    perfilComercial:
      'Comércio de rua vigoroso, com oficinas, mercados, distribuidoras e lanchonetes que descartam óleo e gordura em volume alto.',
    imoveis: 'Casas térreas, sobrados, pequenos prédios, oficinas e galpões.',
    infraestrutura: 'A baixa declividade da bacia do Iguaçu é a marca técnica do bairro: o esgoto escoa devagar e sedimenta no ramal.',
    demanda: 'Hidrojateamento preventivo, desobstrução de rede externa e limpeza de caixa de gordura comercial.',
    problemas: [
      { titulo: 'Sedimentação por relevo plano', texto: 'Sólidos param no meio do ramal e formam tampão que a mola atravessa sem remover — o jato é necessário.' },
      { titulo: 'Refluxo em temporal', texto: 'Ruas próximas ao canal recebem retorno pela grelha da garagem em chuvas intensas.' },
      { titulo: 'Óleo de oficina na rede', texto: 'Óleo mineral endurece na tubulação e cria obstruções longas e difíceis.' },
      { titulo: 'Ramal externo com raiz', texto: 'Árvores de calçada invadem juntas antigas e reduzem a passagem.' },
    ],
    servicosDestaque: ['hidrojateamento', 'desentupimento-esgoto-residencial', 'desentupimento-caixa-gordura', 'camera-inspecao-esgoto', 'desentupimento-ralo', 'emergencia-24h'],
  },

  'sitio-cercado': {
    perfilResidencial:
      'Um dos bairros mais populosos de Curitiba, formado por grandes conjuntos habitacionais e loteamentos populares com casas geminadas de terreno estreito.',
    perfilComercial:
      'Comércio de vizinhança intenso na Avenida Izaac Ferreira da Cruz, com mercearias, lanchonetes e salões de pequeno porte.',
    imoveis: 'Geminados de conjunto habitacional, sobrados populares e pequenos comércios.',
    infraestrutura: 'Terreno plano e baixo, com lençol freático raso e ramais de pequeno diâmetro em boa parte das casas.',
    demanda: 'Volume alto de desentupimento de vaso sanitário e esgoto residencial, muitas vezes em regime de emergência noturna.',
    problemas: [
      { titulo: 'Ramal de pequeno diâmetro', texto: 'Tubos de 40 e 50 mm em ampliações caseiras entopem com qualquer sólido.' },
      { titulo: 'Casa sem caixa de gordura', texto: 'A pia ligada direto ao esgoto faz a gordura endurecer no trecho externo.' },
      { titulo: 'Lençol freático alto', texto: 'A água do solo reduz a capacidade da caixa de inspeção e agrava o refluxo.' },
      { titulo: 'Geminado com ramal compartilhado', texto: 'Duas casas na mesma saída significam obstrução conjunta e necessidade de acordo entre vizinhos.' },
    ],
    servicosDestaque: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'emergencia-24h', 'desentupimento-ralo', 'desentupimento-caixa-gordura', 'hidrojateamento'],
  },

  cajuru: {
    perfilResidencial:
      'O Cajuru é um dos bairros mais populosos da cidade, com forte presença de casas geminadas, vilas e conjuntos habitacionais, além de moradia estudantil no entorno da PUCPR.',
    perfilComercial:
      'Comércio popular denso na Avenida Prefeito Maurício Fruet, com lanchonetes, mercados e oficinas de alto giro.',
    imoveis: 'Casas geminadas, vilas, kitnets e pequenos prédios sem elevador.',
    infraestrutura: 'Rede antiga em várias quadras, com ramais compartilhados entre imóveis desmembrados ao longo dos anos.',
    demanda: 'Desentupimento de vaso e esgoto em imóveis alugados, com picos no início e no fim do semestre universitário.',
    problemas: [
      { titulo: 'Saída única para várias moradias', texto: 'Terrenos subdivididos mantêm um só ramal; a obstrução afeta todas as unidades simultaneamente.' },
      { titulo: 'Descarte indevido no vaso', texto: 'Papel e panos são a causa mais comum de chamado em kitnets e repúblicas.' },
      { titulo: 'Caixa de gordura pequena demais', texto: 'Volume de 30 litros para duas famílias exige limpeza a cada dois meses.' },
      { titulo: 'Sifão de tanque entupido', texto: 'Fiapos e areia bloqueiam o ralo da lavanderia e provocam retorno.' },
    ],
    servicosDestaque: ['desentupimento-vaso-sanitario', 'desentupimento-esgoto-residencial', 'desentupimento-caixa-gordura', 'desentupimento-ralo', 'encanador-residencial', 'emergencia-24h'],
  },

  'santa-felicidade': {
    perfilResidencial:
      'Bairro de colonização italiana com casas de alvenaria antiga em lotes grandes, chácaras remanescentes e condomínios novos nas bordas.',
    perfilComercial:
      'Maior polo gastronômico do Paraná: cantinas que servem centenas de refeições por dia e produzem volume elevado de gordura e resíduo orgânico.',
    imoveis: 'Casas de colônia, chácaras, cantinas de grande porte e condomínios fechados.',
    infraestrutura: 'Rede coletora no eixo da Avenida Manoel Ribas, com áreas de chácara ainda em fossa séptica e poço artesiano.',
    demanda: 'Limpeza programada de caixa de gordura de restaurante e limpa fossa em propriedades rurais urbanas.',
    problemas: [
      { titulo: 'Caixa de gordura de cantina', texto: 'Alto volume diário exige limpeza quinzenal e comprovante de destinação ambiental.' },
      { titulo: 'Fossa de anel de concreto', texto: 'Sistemas antigos de chácara colmatam e exigem sucção completa com caminhão.' },
      { titulo: 'Terreno em declive', texto: 'A topografia acentuada gera trechos de acúmulo em curvas do ramal.' },
      { titulo: 'Reservatório de poço artesiano', texto: 'Sem limpeza periódica, o sedimento entope registros, chuveiros e filtros.' },
    ],
    servicosDestaque: ['desentupimento-caixa-gordura', 'limpa-fossa', 'desentupimento-esgoto-comercial', 'hidrojateamento', 'instalacao-caixa-dagua', 'camera-inspecao-esgoto'],
  },

  bacacheri: {
    perfilResidencial:
      'Bairro arborizado e residencial, com casas de terreno amplo, condomínios horizontais e edifícios de médio porte próximos ao Parque Bacacheri.',
    perfilComercial:
      'Comércio de bairro qualificado, escolas, clínicas e restaurantes ao longo da Avenida Erasto Gaertner.',
    imoveis: 'Casas em lotes de 400 a 700 m², condomínios horizontais e prédios de até 12 andares.',
    infraestrutura: 'Rede pública consolidada, mas com arborização de grande porte que interfere nos ramais e lençol freático elevado perto do parque.',
    demanda: 'Caça vazamentos em jardim e piscina, corte de raiz em ramal e manutenção hidráulica de casas antigas.',
    problemas: [
      { titulo: 'Raiz em ramal de esgoto', texto: 'Árvores maduras invadem juntas de 100 mm; o corte mecanizado com jato é a solução duradoura.' },
      { titulo: 'Vazamento em piscina e jardim', texto: 'Perda de água em áreas externas exige geofone e teste de estanqueidade.' },
      { titulo: 'Caixa de inspeção alagada', texto: 'O lençol elevado perto do parque mantém a caixa com água e dificulta o diagnóstico.' },
      { titulo: 'Hidráulica embutida em contrapiso', texto: 'Casas dos anos 1980 escondem vazamentos que só a detecção eletrônica localiza.' },
    ],
    servicosDestaque: ['deteccao-vazamento-oculto', 'conserto-vazamento', 'hidrojateamento', 'camera-inspecao-esgoto', 'desentupimento-esgoto-residencial', 'encanador-residencial'],
  },

  uberaba: {
    perfilResidencial:
      'Bairro extenso e plano da regional Cajuru, com loteamentos residenciais, conjuntos habitacionais e áreas de várzea próximas ao rio Iguaçu.',
    perfilComercial:
      'Comércio de rua espalhado pela Avenida das Torres e pela Rua Frei Orlando, com mercados, oficinas e lanchonetes.',
    imoveis: 'Casas térreas, sobrados, geminados e galpões de pequeno porte.',
    infraestrutura: 'Área baixa com histórico de alagamento; a proximidade do Iguaçu deixa o solo saturado boa parte do ano.',
    demanda: 'Desobstrução de rede externa e hidrojateamento após períodos de chuva, além de emergências noturnas.',
    problemas: [
      { titulo: 'Solo saturado em várzea', texto: 'A saturação reduz a infiltração e faz o sistema trabalhar no limite em dias de chuva.' },
      { titulo: 'Retorno em ralo de banheiro', texto: 'A pressão da rede pública em picos pluviais empurra esgoto de volta para dentro do imóvel.' },
      { titulo: 'Gordura acumulada em ramal longo', texto: 'Lotes profundos têm ramais de 20 metros ou mais, com acúmulo no meio do trecho.' },
      { titulo: 'Grelha de garagem obstruída', texto: 'Areia e folhas bloqueiam a captação e alagam a entrada da casa.' },
    ],
    servicosDestaque: ['hidrojateamento', 'desentupimento-esgoto-residencial', 'desentupimento-ralo', 'emergencia-24h', 'camera-inspecao-esgoto', 'desentupimento-caixa-gordura'],
  },

  xaxim: {
    perfilResidencial:
      'Bairro residencial de classe média consolidado, com muitas casas de família construídas entre 1970 e 1995 e verticalização pontual nas avenidas.',
    perfilComercial:
      'Comércio de bairro ativo na Rua Nossa Senhora da Luz e na Avenida das Torres, com padarias, farmácias e restaurantes.',
    imoveis: 'Casas térreas e sobrados de alvenaria, pequenos edifícios e lojas de rua.',
    infraestrutura: 'Rede pública madura, com muitas residências ainda usando tubulação original de cimento amianto ou cerâmica no ramal externo.',
    demanda: 'Troca de tubulação, inspeção por câmera e desobstrução de ramal externo com raiz.',
    problemas: [
      { titulo: 'Ramal cerâmico com infiltração de raiz', texto: 'Juntas antigas permitem entrada de raiz fina que cresce e forma tampão.' },
      { titulo: 'Baixa declividade nas quadras internas', texto: 'Trechos planos favorecem sedimentação e obstruções repetidas.' },
      { titulo: 'Caixa de gordura de padaria', texto: 'Comércios de alimentação sem limpeza programada obstruem a rede da quadra.' },
      { titulo: 'Vazamento em ramal de água antigo', texto: 'Tubos de PVC dos anos 1980 rompem em pontos de solda e causam perda oculta.' },
    ],
    servicosDestaque: ['camera-inspecao-esgoto', 'troca-tubulacao', 'hidrojateamento', 'desentupimento-esgoto-residencial', 'conserto-vazamento', 'desentupimento-caixa-gordura'],
  },

  pinheirinho: {
    perfilResidencial:
      'Bairro popular e populoso do sul de Curitiba, com loteamentos regulares, casas térreas e forte movimentação no entorno do terminal de ônibus.',
    perfilComercial:
      'Comércio de alto giro perto do terminal: mercados, açougues, lanchonetes e lojas de rua com uso intenso da rede sanitária.',
    imoveis: 'Casas térreas, sobrados populares, pequenos comércios e galpões.',
    infraestrutura: 'Rede pública presente na quase totalidade do bairro, com ramais antigos e caixas de inspeção de difícil acesso em lotes reformados.',
    demanda: 'Desentupimento residencial de vaso e pia, além de limpeza de caixa de gordura no comércio do terminal.',
    problemas: [
      { titulo: 'Gordura de açougue e lanchonete', texto: 'Descarte de gordura animal solidifica no ramal e afeta toda a quadra comercial.' },
      { titulo: 'Vaso sanitário com sólidos', texto: 'Panos e brinquedos são causa comum de chamado emergencial em casas com crianças.' },
      { titulo: 'Ramal externo sedimentado', texto: 'Trechos longos e planos acumulam areia trazida por lavagem de calçada.' },
      { titulo: 'Reservatório sem manutenção', texto: 'Caixas d\u2019água antigas liberam sedimento que entope registros e chuveiros.' },
    ],
    servicosDestaque: ['desentupimento-vaso-sanitario', 'desentupimento-caixa-gordura', 'desentupimento-pia-cozinha', 'hidrojateamento', 'instalacao-caixa-dagua', 'emergencia-24h'],
  },

  tatuquara: {
    perfilResidencial:
      'Região do extremo sul com grandes conjuntos habitacionais, loteamentos populares e áreas ainda em consolidação urbana.',
    perfilComercial:
      'Comércio local de pequeno porte, com mercearias, salões e lanchonetes de estrutura hidráulica simples.',
    imoveis: 'Casas populares, geminados de programa habitacional e edificações autoconstruídas.',
    infraestrutura: 'Cobertura de rede em expansão, com bolsões que ainda dependem de fossa séptica e sumidouro.',
    demanda: 'Combinação de limpa fossa e desentupimento emergencial de esgoto residencial.',
    problemas: [
      { titulo: 'Fossa e sumidouro colmatados', texto: 'Sem rede coletora, o sistema satura e transborda no quintal, exigindo sucção.' },
      { titulo: 'Solo argiloso de baixa absorção', texto: 'A argila reduz a infiltração e antecipa a saturação do sumidouro.' },
      { titulo: 'Ampliação sem caixa de gordura', texto: 'Cozinhas ligadas direto ao ramal entopem o trecho externo em poucos meses.' },
      { titulo: 'Ramal raso e frágil', texto: 'Tubulação com pouca cobertura de terra trinca com o tráfego de veículos no lote.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-esgoto-residencial', 'desentupimento-vaso-sanitario', 'emergencia-24h', 'hidrojateamento', 'troca-tubulacao'],
  },

  mossungue: {
    perfilResidencial:
      'Mossunguê, o Ecoville, é a área de verticalização de alto padrão mais recente de Curitiba, com torres altas, subsolos de múltiplos níveis e condomínios-clube.',
    perfilComercial:
      'Torres corporativas, universidades e restaurantes de alto padrão convivem com o uso residencial, gerando cargas hidráulicas simultâneas.',
    imoveis: 'Torres residenciais e comerciais de alto padrão, condomínios-clube e lajes corporativas.',
    infraestrutura: 'Infraestrutura moderna, com estações elevatórias e bombas de recalque em praticamente todos os empreendimentos.',
    demanda: 'Contratos preventivos de condomínio: hidrojateamento de prumada, limpeza de poço de esgoto e inspeção por câmera.',
    problemas: [
      { titulo: 'Poço de recalque com resíduo', texto: 'Panos e lenços umedecidos travam bombas trituradoras de subsolo profundo.' },
      { titulo: 'Prumada alta com gordura e sabão', texto: 'Torres de 20 andares acumulam incrustação que exige jato rotativo.' },
      { titulo: 'Área gourmet coletiva', texto: 'Espaços de festa sem caixa de gordura própria lançam resíduo direto na coluna.' },
      { titulo: 'Vazamento em garagem multinível', texto: 'Infiltração entre pavimentos exige detecção precisa antes de romper concreto.' },
    ],
    servicosDestaque: ['hidrojateamento', 'camera-inspecao-esgoto', 'desentupimento-caixa-gordura', 'deteccao-vazamento-oculto', 'encanador-comercial', 'emergencia-24h'],
  },

  'capao-raso': {
    perfilResidencial:
      'Bairro residencial consolidado do sul da cidade, com casas de família, condomínios de médio padrão e verticalização ao longo da Avenida Republica Argentina.',
    perfilComercial:
      'Corredor comercial forte no entorno do terminal do Capão Raso, com clínicas, mercados e restaurantes.',
    imoveis: 'Casas térreas, sobrados, edifícios de médio porte e salas comerciais.',
    infraestrutura: 'Rede pública consolidada e relevo levemente ondulado, com ramais antigos em quadras residenciais mais velhas.',
    demanda: 'Desobstrução de esgoto residencial, hidrojateamento preventivo e reparo de vazamento em casa antiga.',
    problemas: [
      { titulo: 'Ramal antigo com incrustação', texto: 'Casas dos anos 1980 têm tubulação com seção reduzida por acúmulo de gordura e sabão.' },
      { titulo: 'Caixa de gordura de clínica e restaurante', texto: 'O corredor comercial demanda limpeza programada para evitar parada no horário de pico.' },
      { titulo: 'Refluxo em apartamento térreo', texto: 'Unidades de andar baixo recebem primeiro qualquer obstrução da coluna coletiva.' },
      { titulo: 'Vazamento em ramal enterrado', texto: 'Perdas no trecho entre cavalete e imóvel elevam a conta sem sinal visível.' },
    ],
    servicosDestaque: ['desentupimento-esgoto-residencial', 'hidrojateamento', 'desentupimento-caixa-gordura', 'conserto-vazamento', 'deteccao-vazamento-oculto', 'encanador-residencial'],
  },
};

/* ------------------------------------------------------------------ */
/* Região Metropolitana — perfis exclusivos por cidade                 */
/* ------------------------------------------------------------------ */

const perfisCidade: Record<string, PerfilBase> = {
  'quatro-barras': {
    perfilResidencial:
      'Quatro Barras é uma cidade pequena e verticalmente contida, encostada na Serra do Mar, com bairros residenciais como Menino Deus e Jardim Graciosa e um cinturão extenso de chácaras e sítios de lazer.',
    perfilComercial:
      'Economia ligada à BR-116 e à Estrada da Graciosa: postos, transportadoras, pousadas e restaurantes de beira de estrada com caixas de gordura de uso intenso.',
    imoveis: 'Casas em lotes grandes, chácaras de lazer, pousadas, condomínios de serra e galpões às margens da rodovia.',
    infraestrutura:
      'Rede coletora atende o núcleo urbano, mas a maior parte da área rural e dos condomínios de serra opera com fossa séptica, filtro anaeróbio e sumidouro.',
    demanda:
      'Limpa fossa com caminhão é o serviço mais pedido, seguido por desobstrução de galerias e tubulação longa em terrenos de grande extensão.',
    problemas: [
      { titulo: 'Fossa séptica em chácara', texto: 'Casas de campo com uso intermitente saturam o sistema em finais de semana e feriados prolongados.' },
      { titulo: 'Tubulação longa em terreno grande', texto: 'Ramais de 30 a 60 metros até a fossa acumulam sólidos no meio do percurso e exigem hidrojato com mangueira longa.' },
      { titulo: 'Galeria pluvial com terra da encosta', texto: 'A proximidade da serra traz sedimento e folhagem que bloqueiam bocas de lobo em chuvas fortes.' },
      { titulo: 'Poço artesiano e reservatório', texto: 'Sem abastecimento público em parte da zona rural, o reservatório precisa de limpeza e desinfecção periódica.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  piraquara: {
    perfilResidencial:
      'Piraquara reúne dois mundos: o Guarituba, uma das maiores áreas de ocupação urbana adensada da Região Metropolitana, e a zona de mananciais com chácaras, sítios e condomínios rurais protegidos por legislação ambiental.',
    perfilComercial:
      'Comércio de bairro no centro e na Vila Fuck, pousadas e restaurantes rurais na região das represas e do Marumbi.',
    imoveis: 'Casas populares no Guarituba, chácaras em área de manancial, condomínios rurais e pequenos comércios.',
    infraestrutura:
      'Município de mananciais: boa parte do território não pode receber rede convencional e depende de fossa séptica com filtro, o que torna o limpa fossa um serviço essencial e recorrente.',
    demanda:
      'Limpeza de fossa e sumidouro lidera com folga, seguida de desentupimento de esgoto em áreas adensadas do Guarituba.',
    problemas: [
      { titulo: 'Fossa em área de manancial', texto: 'A legislação ambiental exige fossa séptica com filtro e destinação correta do resíduo por empresa licenciada.' },
      { titulo: 'Guarituba com rede sobrecarregada', texto: 'A alta densidade em ramais de pequeno diâmetro provoca entupimentos frequentes e refluxo em dias de chuva.' },
      { titulo: 'Lençol freático muito alto', texto: 'Próximo às represas, o solo encharcado reduz a absorção do sumidouro e antecipa a saturação.' },
      { titulo: 'Tubulação longa até a fossa', texto: 'Chácaras com casa distante da fossa acumulam sólidos no percurso e exigem hidrojateamento.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-esgoto-residencial', 'hidrojateamento', 'desentupimento-vaso-sanitario', 'camera-inspecao-esgoto', 'emergencia-24h'],
  },

  pinhais: {
    perfilResidencial:
      'Menor município do Paraná em área e o mais denso da Região Metropolitana, Pinhais é praticamente contínuo a Curitiba, com bairros consolidados como Weissópolis, Emiliano Perneta e Alto Tarumã e verticalização crescente.',
    perfilComercial:
      'Forte concentração industrial e logística ao longo da Avenida das Torres e da Rodovia João Leopoldo Jacomel, com indústrias de alimentos, distribuidoras e refeitórios coletivos.',
    imoveis: 'Casas de alvenaria, sobrados, prédios de médio porte, galpões industriais e centros de distribuição.',
    infraestrutura:
      'Boa cobertura de rede coletora da Sanepar, com pontos críticos na várzea do rio Iraí e do Palmital, onde o solo é baixo e alaga.',
    demanda:
      'Perfil urbano clássico: desentupimento residencial rápido, caixa de gordura de indústria de alimentos e hidrojateamento de rede comercial.',
    problemas: [
      { titulo: 'Várzea do Iraí e do Palmital', texto: 'Bairros baixos sofrem refluxo e alagamento de garagem quando o rio sobe.' },
      { titulo: 'Refeitório e indústria de alimentos', texto: 'Cozinhas industriais geram gordura em volume que exige limpeza mensal e caixa dimensionada.' },
      { titulo: 'Adensamento sobre rede antiga', texto: 'Novos prédios ligados a ramais dimensionados para casas sobrecarregam a rede da quadra.' },
      { titulo: 'Divisa com Curitiba', texto: 'Ruas na divisa têm ramais que cruzam municípios, o que confunde a responsabilidade de manutenção.' },
    ],
    servicosDestaque: ['desentupimento-esgoto-residencial', 'desentupimento-caixa-gordura', 'hidrojateamento', 'desentupimento-esgoto-comercial', 'emergencia-24h', 'conserto-vazamento'],
  },

  colombo: {
    perfilResidencial:
      'Colombo é uma cidade-dormitório de grande população, com bairros densos na divisa com Curitiba — Maracanã, Guaraituba, Roça Grande, Alto Maracanã — e um cinturão agrícola de colônia italiana ao norte.',
    perfilComercial:
      'Comércio de rua forte no centro e no Maracanã, além de olarias, marcenarias e granjas na zona rural.',
    imoveis: 'Casas populares e de classe média, sobrados, chácaras de colônia e pequenos galpões.',
    infraestrutura:
      'Rede coletora presente nos bairros próximos a Curitiba, mas com percentual relevante de imóveis em fossa nas áreas mais afastadas e no cinturão agrícola.',
    demanda:
      'Divisão equilibrada entre desentupimento urbano de vaso e esgoto e limpa fossa nas colônias.',
    problemas: [
      { titulo: 'Bairro de divisa com rede saturada', texto: 'Maracanã e Guaraituba cresceram rápido sobre rede antiga, o que gera entupimentos recorrentes.' },
      { titulo: 'Fossa em chácara de colônia', texto: 'Propriedades agrícolas ao norte dependem de fossa e sumidouro com manutenção espaçada demais.' },
      { titulo: 'Relevo acidentado', texto: 'Ruas em aclive acentuado criam trechos de ramal com caimento irregular após reformas de calçada.' },
      { titulo: 'Solo cárstico da região', texto: 'A geologia calcária de Colombo exige cuidado extra na execução de sumidouros e na detecção de vazamento no solo.' },
    ],
    servicosDestaque: ['desentupimento-esgoto-residencial', 'limpa-fossa', 'desentupimento-vaso-sanitario', 'hidrojateamento', 'camera-inspecao-esgoto', 'conserto-vazamento'],
  },

  araucaria: {
    perfilResidencial:
      'Araucária combina bairros residenciais consolidados como Costeira, Fazenda Velha e Capela Velha com uma área rural extensa de agricultura familiar.',
    perfilComercial:
      'Sedia a refinaria e um dos maiores parques industriais do estado, com indústrias químicas, metalúrgicas e refeitórios de grande porte, sujeitos a normas ambientais rígidas.',
    imoveis: 'Casas de classe média e popular, condomínios, plantas industriais, refeitórios e propriedades rurais.',
    infraestrutura:
      'Rede coletora consolidada na malha urbana; a área industrial opera com redes próprias, caixas separadoras de água e óleo e exigência de destinação documentada.',
    demanda:
      'Forte demanda por desentupimento industrial, hidrojateamento de alta vazão e limpeza de caixa separadora, além do atendimento residencial comum.',
    problemas: [
      { titulo: 'Caixa separadora de água e óleo', texto: 'Indústrias e postos precisam de limpeza periódica com manifesto de resíduo para atender à fiscalização ambiental.' },
      { titulo: 'Rede industrial de grande diâmetro', texto: 'Tubulações de 200 mm ou mais exigem hidrojato de alta vazão, fora do alcance de equipamento residencial.' },
      { titulo: 'Área rural com fossa', texto: 'Propriedades agrícolas no interior do município dependem de fossa séptica e sucção com caminhão.' },
      { titulo: 'Bacia do rio Barigui', texto: 'Bairros próximos ao rio têm cotas baixas e sofrem retorno em temporais.' },
    ],
    servicosDestaque: ['desentupimento-industrial', 'hidrojateamento', 'desentupimento-esgoto-comercial', 'limpa-fossa', 'camera-inspecao-esgoto', 'emergencia-24h'],
  },

  'campo-largo': {
    perfilResidencial:
      'Campo Largo tem centro histórico consolidado, bairros residenciais como Jardim Itália e Vila Solene e distritos afastados como Bateias, Três Córregos e Ferraria, com perfil semirrural.',
    perfilComercial:
      'Conhecida como Capital da Louça, concentra cerâmicas, olarias e indústrias de porcelana, além de comércio central e restaurantes na BR-277.',
    imoveis: 'Casas antigas de centro, loteamentos novos, cerâmicas, olarias e propriedades rurais nos distritos.',
    infraestrutura:
      'Rede coletora no núcleo urbano e ampla dependência de fossa nos distritos. O solo com argila cerâmica é característico e reduz a absorção do sumidouro.',
    demanda:
      'Limpa fossa nos distritos, desentupimento residencial no centro e serviços industriais nas cerâmicas.',
    problemas: [
      { titulo: 'Argila cerâmica de baixa permeabilidade', texto: 'O mesmo solo que sustenta a indústria de louça dificulta a infiltração e satura sumidouros mais rápido.' },
      { titulo: 'Distritos sem rede coletora', texto: 'Bateias, Três Córregos e Ferraria dependem de caminhão limpa fossa com deslocamento maior.' },
      { titulo: 'Tubulação centenária no centro', texto: 'Imóveis do centro histórico mantêm ramais em manilha cerâmica sujeitos a colapso.' },
      { titulo: 'Resíduo sólido de cerâmica na rede', texto: 'Pó e barro lançados no ralo sedimentam e formam obstrução dura, que só o hidrojato remove.' },
    ],
    servicosDestaque: ['limpa-fossa', 'hidrojateamento', 'desentupimento-esgoto-residencial', 'camera-inspecao-esgoto', 'troca-tubulacao', 'desentupimento-industrial'],
  },

  'fazenda-rio-grande': {
    perfilResidencial:
      'Município jovem e de crescimento acelerado, com grandes loteamentos populares em Eucaliptos, Nações, Santa Terezinha e Green Field, ocupados majoritariamente por famílias que trabalham em Curitiba.',
    perfilComercial:
      'Comércio de bairro em expansão ao longo da BR-116, com mercados, lanchonetes e centros de distribuição.',
    imoveis: 'Casas de programa habitacional, sobrados populares, condomínios econômicos e galpões logísticos.',
    infraestrutura:
      'A expansão urbana foi mais rápida que a rede coletora: muitos loteamentos ainda funcionam com fossa séptica, e os trechos com rede recebem carga acima do projeto original.',
    demanda:
      'Alta procura por limpa fossa em loteamentos novos e desentupimento de esgoto residencial em casas de programa habitacional.',
    problemas: [
      { titulo: 'Loteamento novo sem rede coletora', texto: 'Casas entregues com fossa séptica saturam em dois a três anos quando o sumidouro é subdimensionado.' },
      { titulo: 'Terreno plano e baixo', texto: 'A topografia do município favorece acúmulo e refluxo em dias de chuva intensa.' },
      { titulo: 'Ramal de pequeno diâmetro em casa popular', texto: 'Tubulações de 40 mm em ampliações caseiras entopem com facilidade.' },
      { titulo: 'Caixa de gordura padrão saturada', texto: 'A caixa mínima entregue pelas construtoras exige limpeza a cada dois ou três meses.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-esgoto-residencial', 'desentupimento-caixa-gordura', 'desentupimento-vaso-sanitario', 'hidrojateamento', 'emergencia-24h'],
  },

  'sao-jose-dos-pinhais': {
    perfilResidencial:
      'A maior cidade da Região Metropolitana em economia, São José dos Pinhais tem centro urbano denso, bairros consolidados como Afonso Pena e Costeira e uma zona rural extensa em Colônia Murici, Campo Largo da Roseira e São Marcos.',
    perfilComercial:
      'Abriga montadoras, o Aeroporto Afonso Pena e um parque industrial de grande porte, além de comércio central forte e restaurantes coloniais na área rural.',
    imoveis: 'Apartamentos e casas no centro, condomínios, plantas industriais, hotéis próximos ao aeroporto e chácaras coloniais.',
    infraestrutura:
      'Rede coletora ampla na malha urbana, com toda a zona rural e as colônias operando em fossa séptica. Redes industriais têm exigências ambientais específicas.',
    demanda:
      'A cidade mais heterogênea da região: emergência 24h no centro, hidrojateamento industrial no eixo do aeroporto e limpa fossa nas colônias.',
    problemas: [
      { titulo: 'Centro adensado com rede antiga', texto: 'Prédios novos ligados a ramais antigos provocam refluxo em unidades térreas.' },
      { titulo: 'Zona rural com fossa séptica', texto: 'Colônia Murici e São Marcos dependem de caminhão limpa fossa com deslocamento de até 40 km.' },
      { titulo: 'Restaurante colonial de alto volume', texto: 'Casas de refeição típica geram gordura acima da média e precisam de limpeza quinzenal.' },
      { titulo: 'Complexo industrial e aeroportuário', texto: 'Redes de grande diâmetro e caixas separadoras exigem hidrojato de alta vazão e manifesto de resíduo.' },
    ],
    servicosDestaque: ['emergencia-24h', 'limpa-fossa', 'hidrojateamento', 'desentupimento-esgoto-comercial', 'desentupimento-caixa-gordura', 'desentupimento-industrial'],
  },

  'campina-grande-do-sul': {
    perfilResidencial:
      'Cidade de perfil interiorano encostada na Serra do Mar, com centro compacto, o bairro Jardim Paulista e um território rural amplo, incluindo a região de Campina do Taquaral.',
    perfilComercial:
      'Economia ligada à BR-116 e à extração mineral, com postos, transportadoras e restaurantes de estrada.',
    imoveis: 'Casas em lotes grandes, chácaras, sítios, pousadas e galpões de beira de rodovia.',
    infraestrutura:
      'Rede coletora limitada ao núcleo urbano; a maioria das propriedades usa fossa séptica com sumidouro, e há captação por poço em boa parte da zona rural.',
    demanda:
      'Limpa fossa e manutenção de sistemas individuais de esgoto respondem pela maior parte dos chamados.',
    problemas: [
      { titulo: 'Fossa de sítio sem manutenção', texto: 'Sistemas com mais de cinco anos sem sucção transbordam e contaminam o entorno.' },
      { titulo: 'Solo de encosta com pedra', texto: 'A proximidade da serra dificulta escavação e execução de sumidouro eficiente.' },
      { titulo: 'Chuva orográfica intensa', texto: 'Volumes altos de chuva na serra saturam o solo e inundam caixas de inspeção.' },
      { titulo: 'Ramal longo em propriedade rural', texto: 'Distâncias grandes entre casa e fossa exigem hidrojato com mangueira estendida.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  'almirante-tamandare': {
    perfilResidencial:
      'Município contíguo a Curitiba pelo norte, com bairros densos e populares como Areia Branca dos Assis, Cachoeira e Jardim Paranaense, e área rural com forte presença de mineração de calcário.',
    perfilComercial:
      'Comércio de bairro, olarias e empresas de extração e beneficiamento de calcário.',
    imoveis: 'Casas populares, sobrados, loteamentos em encosta e pequenas indústrias.',
    infraestrutura:
      'Cobertura de rede desigual, com bairros inteiros ainda em fossa. O relevo é acidentado e o subsolo é cárstico, com cavidades calcárias.',
    demanda:
      'Limpa fossa e desentupimento residencial predominam, com atenção especial a vazamentos no solo por causa da geologia.',
    problemas: [
      { titulo: 'Subsolo cárstico', texto: 'A rocha calcária com cavidades exige cuidado na execução de sumidouro e no diagnóstico de perda de água no terreno.' },
      { titulo: 'Loteamento em encosta', texto: 'Declives acentuados criam ramais com caimento excessivo em um trecho e acúmulo em outro.' },
      { titulo: 'Bairro sem rede coletora', texto: 'Áreas periféricas dependem integralmente de fossa e sucção com caminhão.' },
      { titulo: 'Poeira de calcário na rede', texto: 'Regiões próximas às mineradoras acumulam pó fino que sedimenta no ramal.' },
    ],
    servicosDestaque: ['limpa-fossa', 'desentupimento-esgoto-residencial', 'deteccao-vazamento-oculto', 'hidrojateamento', 'desentupimento-vaso-sanitario', 'camera-inspecao-esgoto'],
  },

  'campo-magro': {
    perfilResidencial:
      'Município pequeno e verde a oeste de Curitiba, formado por chácaras de lazer, condomínios rurais e um núcleo urbano enxuto no entorno da Rodovia dos Minérios.',
    perfilComercial:
      'Restaurantes rurais, hortifrútis, pesqueiros e pequenos comércios de estrada.',
    imoveis: 'Chácaras, condomínios rurais, casas de campo e pequenos comércios.',
    infraestrutura:
      'Cobertura de rede coletora muito restrita: quase todo o município opera com fossa séptica, filtro e sumidouro, muitos com captação por poço.',
    demanda:
      'Limpa fossa é o principal serviço, seguido de manutenção de sistemas hidráulicos com poço e reservatório.',
    problemas: [
      { titulo: 'Chácara de uso intermitente', texto: 'Casas usadas só em finais de semana têm fossa com decomposição irregular e mau cheiro.' },
      { titulo: 'Sumidouro em solo de baixa absorção', texto: 'Trechos argilosos reduzem a infiltração e provocam retorno na caixa de gordura.' },
      { titulo: 'Poço artesiano com sedimento', texto: 'Água de poço carrega areia que entope filtros, registros e válvulas de descarga.' },
      { titulo: 'Acesso de caminhão em estrada de terra', texto: 'Vias rurais exigem planejamento do atendimento em dias de chuva.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  'rio-branco-do-sul': {
    perfilResidencial:
      'Cidade do Vale do Ribeira paranaense com núcleo urbano compacto, bairros residenciais simples e vasta área rural entre morros calcários.',
    perfilComercial:
      'Polo de cimento e cal do estado, com grandes plantas industriais, além de comércio local e propriedades agrícolas.',
    imoveis: 'Casas urbanas simples, sítios, plantas industriais de cimento e pequenos comércios.',
    infraestrutura:
      'Rede coletora restrita ao centro; a zona rural depende de fossa. O subsolo calcário e a poeira industrial marcam a manutenção hidráulica local.',
    demanda:
      'Limpa fossa em propriedades rurais e desobstrução de rede afetada por sedimento mineral.',
    problemas: [
      { titulo: 'Sedimento de cal e cimento', texto: 'Resíduo mineral endurece dentro da tubulação e forma incrustação que exige hidrojato.' },
      { titulo: 'Relevo cárstico', texto: 'Cavidades no calcário afetam a execução de sumidouros e a estabilidade do ramal.' },
      { titulo: 'Distância até a zona rural', texto: 'Sítios afastados demandam programação do caminhão e mangueira de sucção longa.' },
      { titulo: 'Água dura de poço', texto: 'A dureza elevada da água acelera incrustação em aquecedores, torneiras e chuveiros.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  itaperucu: {
    perfilResidencial:
      'Município do Vale do Ribeira com centro urbano pequeno, bairros residenciais de perfil popular e ocupação rural dispersa entre áreas de mineração.',
    perfilComercial:
      'Economia baseada em extração e beneficiamento de calcário, com comércio local de pequeno porte.',
    imoveis: 'Casas populares, sítios, pequenas mineradoras e comércios de rua.',
    infraestrutura:
      'Baixa cobertura de rede coletora; a fossa séptica é o padrão dominante, inclusive em parte da área urbana.',
    demanda:
      'Limpa fossa lidera, com desentupimento de esgoto residencial e reparos hidráulicos simples em seguida.',
    problemas: [
      { titulo: 'Fossa urbana em lote pequeno', texto: 'Terrenos estreitos limitam o sumidouro e obrigam sucção mais frequente.' },
      { titulo: 'Poeira mineral no ralo', texto: 'Áreas próximas às pedreiras acumulam pó que sedimenta e endurece na tubulação.' },
      { titulo: 'Rede rural dispersa', texto: 'Propriedades distantes exigem atendimento programado, com caminhão de menor porte em vias estreitas.' },
      { titulo: 'Reservatório sem limpeza', texto: 'Captação própria sem manutenção deixa sedimento que entope registros e chuveiros.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  'balsa-nova': {
    perfilResidencial:
      'Cidade pequena às margens da BR-277, com distritos como Bugre e São Luiz do Purunã, forte presença de propriedades rurais, haras e pousadas de campo.',
    perfilComercial:
      'Turismo rural em Purunã, restaurantes de estrada, transportadoras e cimenteiras ao longo da rodovia.',
    imoveis: 'Sítios, haras, pousadas, casas de campo e galpões de beira de rodovia.',
    infraestrutura:
      'Rede coletora presente apenas no núcleo urbano; pousadas e propriedades rurais dependem de fossa séptica com filtro e de captação por poço.',
    demanda:
      'Limpa fossa em pousadas e sítios, com picos em alta temporada e feriados prolongados.',
    problemas: [
      { titulo: 'Pousada com pico de ocupação', texto: 'A lotação em feriados multiplica o volume e satura a fossa em poucos dias.' },
      { titulo: 'Altitude e clima frio de Purunã', texto: 'Temperaturas baixas retardam a decomposição biológica na fossa e reduzem a eficiência do sistema.' },
      { titulo: 'Ramal longo em propriedade extensa', texto: 'Trechos de dezenas de metros exigem hidrojato com mangueira estendida.' },
      { titulo: 'Estrada de terra no acesso', texto: 'O planejamento do atendimento precisa considerar acesso do caminhão em dias chuvosos.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  contenda: {
    perfilResidencial:
      'Município agrícola de população pequena, com centro urbano compacto de casas térreas e ampla área rural de produção de grãos e batata.',
    perfilComercial:
      'Cooperativas agrícolas, armazéns, granjas e comércio local de apoio ao produtor.',
    imoveis: 'Casas térreas urbanas, sítios, granjas, armazéns e barracões agrícolas.',
    infraestrutura:
      'Rede coletora limitada; propriedades rurais e granjas operam com fossa séptica e sistemas de tratamento próprios.',
    demanda:
      'Limpa fossa em propriedades rurais e granjas, além de desentupimento residencial no centro.',
    problemas: [
      { titulo: 'Granja com efluente concentrado', texto: 'A criação animal gera efluente de carga orgânica alta que satura a fossa muito mais rápido.' },
      { titulo: 'Solo agrícola compactado', texto: 'A compactação por maquinário reduz a infiltração do sumidouro.' },
      { titulo: 'Barro e terra na rede', texto: 'A lavagem de implementos e botas leva barro ao ralo, formando sedimento duro.' },
      { titulo: 'Centro com tubulação antiga', texto: 'Casas do núcleo urbano mantêm manilhas cerâmicas sujeitas a trinca e raiz.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  lapa: {
    perfilResidencial:
      'A Lapa tem um centro histórico tombado, com casarões coloniais que exigem intervenção hidráulica cuidadosa, além de bairros residenciais e uma área rural extensa com colônias e faxinais.',
    perfilComercial:
      'Turismo histórico, pousadas, restaurantes, cooperativas agrícolas e indústria de madeira.',
    imoveis: 'Casarões tombados, casas urbanas, pousadas, sítios e barracões agrícolas.',
    infraestrutura:
      'Rede coletora no centro e nos bairros consolidados, com zona rural em fossa. O patrimônio histórico impõe restrições a obras e escavações.',
    demanda:
      'Inspeção por câmera para evitar quebra em imóvel tombado, limpa fossa na zona rural e manutenção em pousadas.',
    problemas: [
      { titulo: 'Imóvel tombado sem planta hidráulica', texto: 'Casarões históricos exigem câmera de inspeção e método não destrutivo para localizar a obstrução.' },
      { titulo: 'Tubulação centenária em manilha', texto: 'Trechos originais colapsam e permitem entrada de terra e raiz.' },
      { titulo: 'Pousada com ocupação sazonal', texto: 'Feriados concentram carga e saturam a fossa em poucos dias.' },
      { titulo: 'Distância dos faxinais', texto: 'Comunidades rurais afastadas exigem programação do caminhão limpa fossa.' },
    ],
    servicosDestaque: ['camera-inspecao-esgoto', 'limpa-fossa', 'hidrojateamento', 'troca-tubulacao', 'desentupimento-esgoto-residencial', 'conserto-vazamento'],
  },

  mandirituba: {
    perfilResidencial:
      'Cidade rural ao sul da região metropolitana, com centro pequeno, distrito de Areia Branca dos Assis e forte presença de agricultura familiar e avicultura.',
    perfilComercial:
      'Granjas, aviários, hortifrutigranjeiros e comércio de apoio ao produtor rural.',
    imoveis: 'Casas térreas, sítios, aviários, estufas e pequenos comércios.',
    infraestrutura:
      'Rede coletora restrita ao centro; a fossa séptica é o padrão em praticamente toda a área rural, com muitos sistemas antigos.',
    demanda:
      'Limpa fossa em propriedades rurais e aviários, com necessidade de destinação ambiental correta do resíduo.',
    problemas: [
      { titulo: 'Aviário com efluente de alta carga', texto: 'A criação intensiva gera resíduo que exige sucção frequente e destinação licenciada.' },
      { titulo: 'Fossa antiga de alvenaria', texto: 'Sistemas construídos há décadas perdem estanqueidade e contaminam o entorno.' },
      { titulo: 'Estrada rural estreita', texto: 'O acesso limita o porte do caminhão e exige avaliação prévia do trajeto.' },
      { titulo: 'Poço raso com areia', texto: 'A captação superficial traz sedimento que danifica bombas e entope registros.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },

  'tijucas-do-sul': {
    perfilResidencial:
      'Município de serra e turismo rural, com condomínios de casas de campo, pousadas, hotéis-fazenda e comunidades rurais espalhadas por um território amplo.',
    perfilComercial:
      'Hotelaria de campo, restaurantes, vinícolas e pequenos comércios ao longo da BR-376.',
    imoveis: 'Casas de campo, condomínios de lazer, pousadas, hotéis-fazenda e sítios.',
    infraestrutura:
      'Praticamente todo o município opera com fossa séptica e filtro anaeróbio, com captação por poço ou nascente e forte exigência ambiental por estar em área de proteção.',
    demanda:
      'Limpa fossa em pousadas e casas de campo, com picos em feriados e temporada de inverno.',
    problemas: [
      { titulo: 'Hotel-fazenda em alta temporada', texto: 'A ocupação concentrada satura o sistema em dias e exige sucção emergencial.' },
      { titulo: 'Clima frio de serra', texto: 'Temperaturas baixas reduzem a atividade biológica da fossa e diminuem sua eficiência.' },
      { titulo: 'Área de proteção ambiental', texto: 'O resíduo precisa de transporte e destinação por empresa licenciada, com comprovante.' },
      { titulo: 'Casa de campo fechada por meses', texto: 'O desuso prolongado resseca sifões e concentra sólidos no ramal.' },
    ],
    servicosDestaque: SERVICOS_RURAIS,
  },
};

/* ------------------------------------------------------------------ */
/* Fallbacks                                                           */
/* ------------------------------------------------------------------ */

function perfilCidadeGenerico(nome: string, distanciaKm: number): PerfilBase {
  const rural = distanciaKm > 40;
  return {
    perfilResidencial: rural
      ? `${nome} tem núcleo urbano compacto e território majoritariamente rural, com sítios, chácaras e comunidades afastadas do centro. A distância de ${distanciaKm} km de Curitiba faz do atendimento programado a forma mais econômica de contratar o serviço.`
      : `${nome} é um município da Região Metropolitana de Curitiba a ${distanciaKm} km da capital, com bairros residenciais consolidados no centro e ocupação mais dispersa nas bordas, onde ainda predominam lotes grandes.`,
    perfilComercial: rural
      ? `O comércio local é de pequeno porte e se concentra no centro, com apoio à atividade agrícola e ao turismo rural.`
      : `O comércio de bairro é ativo, com mercados, padarias e restaurantes que precisam de limpeza periódica de caixa de gordura.`,
    imoveis: rural
      ? 'Casas térreas no centro, sítios, chácaras e pequenos comércios.'
      : 'Casas térreas, sobrados, pequenos prédios e comércios de rua.',
    infraestrutura: rural
      ? 'Rede coletora limitada ao centro; a maior parte dos imóveis opera com fossa séptica, filtro e sumidouro, muitos com captação por poço.'
      : 'Rede coletora presente na área central, com bairros periféricos ainda atendidos por fossa séptica.',
    demanda: rural
      ? 'Limpa fossa com caminhão responde pela maioria dos chamados, seguido de desobstrução de ramais longos.'
      : 'Desentupimento residencial e limpeza de fossa dividem a demanda, com procura crescente por hidrojateamento preventivo.',
    problemas: [
      { titulo: 'Fossa séptica saturada', texto: `Sem rede coletora em boa parte de ${nome}, a fossa precisa de sucção a cada 1 a 3 anos conforme o número de moradores.` },
      { titulo: 'Ramal longo até o sistema de tratamento', texto: 'Lotes amplos criam trechos extensos onde os sólidos param no meio do caminho.' },
      { titulo: 'Deslocamento de Curitiba', texto: `Os ${distanciaKm} km até a capital podem gerar taxa de deslocamento; agendar em horário programado reduz o custo.` },
      { titulo: 'Reservatório e captação própria', texto: 'Imóveis abastecidos por poço acumulam sedimento no reservatório e entopem registros.' },
    ],
    servicosDestaque: rural ? SERVICOS_RURAIS : SERVICOS_URBANOS,
  };
}

function montarRespostaDireta(nome: string, contexto: 'bairro' | 'cidade', servicos: string[]): string {
  const local = contexto === 'bairro' ? `no ${nome}, em Curitiba` : `em ${nome}, na Região Metropolitana de Curitiba`;
  const nomes = servicos.slice(0, 4).map(nomeServico).join(', ');
  return `O Serviços no Bairro reúne desentupidoras e encanadores verificados que atendem ${local}, 24 horas por dia, inclusive fins de semana e feriados. Os serviços mais solicitados na região são ${nomes}. O orçamento é gratuito, feito por WhatsApp, e o atendimento de emergência costuma chegar em 40 a 90 minutos.`;
}

const NOMES_SERVICOS: Record<string, string> = {
  'desentupimento-vaso-sanitario': 'desentupimento de vaso sanitário',
  'desentupimento-pia-cozinha': 'desentupimento de pia de cozinha',
  'desentupimento-pia-banheiro': 'desentupimento de pia de banheiro',
  'desentupimento-esgoto-residencial': 'desentupimento de esgoto residencial',
  'desentupimento-esgoto-comercial': 'desentupimento de esgoto comercial',
  'desentupimento-caixa-gordura': 'limpeza de caixa de gordura',
  hidrojateamento: 'hidrojateamento',
  'camera-inspecao-esgoto': 'inspeção com câmera',
  'limpa-fossa': 'limpa fossa',
  'desentupimento-ralo': 'desentupimento de ralo',
  'desentupimento-industrial': 'desentupimento industrial',
  'emergencia-24h': 'atendimento de emergência 24h',
  'encanador-residencial': 'encanador residencial',
  'encanador-comercial': 'encanador comercial',
  'conserto-vazamento': 'conserto de vazamento',
  'instalacao-hidraulica': 'instalação hidráulica',
  'troca-tubulacao': 'troca de tubulação',
  'instalacao-caixa-dagua': 'instalação de caixa d\u2019água',
  'deteccao-vazamento-oculto': 'caça vazamentos',
};

export function nomeServico(slug: string): string {
  return NOMES_SERVICOS[slug] || slug.replace(/-/g, ' ');
}

/**
 * Perfil local de um bairro de Curitiba.
 */
export function getPerfilBairro(slug: string, nome: string, regional: string): PerfilLocal {
  const base = perfisRegional[regional] || perfisRegional.Popular;
  const override = perfisBairro[slug];
  const merged: PerfilBase = { ...base, ...(override || {}) };
  return {
    ...merged,
    respostaDireta: merged.respostaDireta || montarRespostaDireta(nome, 'bairro', merged.servicosDestaque),
  };
}

/**
 * Perfil local de uma cidade da Região Metropolitana.
 */
export function getPerfilCidade(slug: string, nome: string, distanciaKm: number): PerfilLocal {
  const base = perfisCidade[slug] || perfilCidadeGenerico(nome, distanciaKm);
  return {
    ...base,
    respostaDireta: base.respostaDireta || montarRespostaDireta(nome, 'cidade', base.servicosDestaque),
  };
}
