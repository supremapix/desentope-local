export interface LandingPageData {
  slug: string;
  route: string;
  title: string;
  metaDescription: string;
  h1: string;
  cidade: string;
  servicoSlug?: string;
  breadcrumb: { name: string; url: string }[];
  heroSubtitle: string;
  buscaQuery: string;
  /** Unique SEO content blocks — at least 600 words per page */
  contentBlocks: {
    heading: string;
    content: string;
    type?: 'text' | 'table';
    tableData?: { servico: string; preco: string }[];
  }[];
}

export const landingPages: LandingPageData[] = [
  // ── PÁGINA 1: Desentupimento Curitiba ──────────────────
  {
    slug: 'desentupimento-curitiba',
    route: '/servicos/desentupimento-curitiba',
    title: 'Desentupimento em Curitiba — 24h | Serviços no Bairro',
    metaDescription: 'Desentupimento em Curitiba com profissionais verificados. Vaso sanitário, pia, esgoto, caixa de gordura. Emergência 24h, orçamento grátis via WhatsApp.',
    h1: 'Desentupimento em Curitiba — Profissionais 24h',
    cidade: 'Curitiba',
    servicoSlug: 'desentupimento-esgoto',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Serviços', url: '/busca' },
      { name: 'Desentupimento em Curitiba', url: '/servicos/desentupimento-curitiba' },
    ],
    heroSubtitle: 'Encontre desentupidoras verificadas em Curitiba para resolver entupimentos de vaso sanitário, pia, esgoto, caixa de gordura e ralo. Atendimento 24 horas com orçamento gratuito.',
    buscaQuery: '/busca?servico=desentupimento-esgoto&cidade=curitiba',
    contentBlocks: [
      {
        heading: 'O que é desentupimento e quando chamar um profissional?',
        content: `O desentupimento é o processo de desobstrução de tubulações, ralos, vasos sanitários, pias e sistemas de esgoto que ficaram bloqueados por acúmulo de resíduos. Em Curitiba, o clima úmido e as chuvas frequentes agravam o problema, causando entupimentos recorrentes especialmente em bairros mais antigos como Centro, Batel e Rebouças.\n\nVocê deve chamar um profissional quando perceber sinais como água voltando pelo ralo, mau cheiro persistente no banheiro ou cozinha, vaso sanitário que não dá descarga corretamente ou água acumulando na área de serviço. Tentar resolver com métodos caseiros como soda cáustica pode danificar as tubulações de PVC e causar problemas ainda mais graves.\n\nAs desentupidoras profissionais utilizam equipamentos como máquinas rotativas, hidrojateamento de alta pressão e câmeras de inspeção para localizar e resolver o entupimento sem quebrar paredes ou pisos. O atendimento em Curitiba é disponível 24 horas por dia, 7 dias por semana, incluindo feriados.`,
      },
      {
        heading: 'Quanto custa desentupimento em Curitiba?',
        content: 'Os preços variam de acordo com o tipo de serviço, a complexidade do entupimento e a localização. Confira a tabela com valores médios praticados em Curitiba em 2026:',
        type: 'table',
        tableData: [
          { servico: 'Desentupimento de vaso sanitário', preco: 'R$ 150 a R$ 350' },
          { servico: 'Desentupimento de pia', preco: 'R$ 120 a R$ 280' },
          { servico: 'Desentupimento de esgoto residencial', preco: 'R$ 200 a R$ 500' },
          { servico: 'Desentupimento de caixa de gordura', preco: 'R$ 180 a R$ 400' },
          { servico: 'Desentupimento de ralo', preco: 'R$ 100 a R$ 250' },
          { servico: 'Desentupimento industrial', preco: 'R$ 500 a R$ 2.000' },
          { servico: 'Hidrojateamento de tubulação', preco: 'R$ 350 a R$ 1.200' },
        ],
      },
      {
        heading: 'Como escolher uma desentupidora em Curitiba?',
        content: `Escolher a desentupidora certa em Curitiba exige atenção a alguns critérios fundamentais. Primeiro, verifique se a empresa possui CNPJ ativo e alvará de funcionamento — empresas informais não oferecem garantia do serviço e podem causar danos à tubulação.\n\nSegundo, confira as avaliações de outros clientes. No Serviços no Bairro, todas as empresas possuem avaliações reais verificadas, com nota média de 4.8 de 5 estrelas. Isso garante que você está contratando profissionais confiáveis.\n\nTerceiro, peça orçamento antes de fechar. As melhores desentupidoras de Curitiba oferecem visita técnica gratuita e orçamento sem compromisso. Desconfie de empresas que cobram taxa de visita ou que dão preço por telefone sem ver o problema.\n\nPor fim, dê preferência a empresas que atendem o seu bairro específico. Uma desentupidora que já conhece a região chega mais rápido e conhece as particularidades da rede de esgoto local. No Serviços no Bairro, você pode filtrar por bairro e encontrar profissionais perto de você.`,
      },
      {
        heading: 'Bairros atendidos em Curitiba',
        content: `Nosso diretório cobre todos os 75 bairros oficiais de Curitiba, organizados por regional: Centro (Matriz), Batel, Água Verde, Bigorrilho, Rebouças, Alto da XV, Cristo Rei no eixo central; Bacacheri, Boa Vista, Pilarzinho, Santa Cândida, Tingui na regional Boa Vista; Cajuru, Capão da Imbuia, Jardim das Américas, Uberaba na regional Cajuru; Boqueirão, Alto Boqueirão, Hauer, Xaxim na regional Boqueirão; CIC (Cidade Industrial), com todas as vilas internas como Neoville, Vila Sandra, Vila Caiuá, Vila Sabará; Portão, Novo Mundo, Fazendinha, Santa Quitéria na regional Portão; Santa Felicidade, Mossunguê, Campo Comprido, Butiatuvinha; Pinheirinho, Capão Raso, Tatuquara na regional Pinheirinho; e Sítio Cercado, Ganchinho, Umbará na regional Bairro Novo.\n\nAlém dos bairros oficiais, também cobrimos regiões populares como Champagnat, Ecoville, Vila Guaíra e Vila Hauer, que são termos muito buscados por moradores de Curitiba.`,
      },
    ],
  },

  // ── PÁGINA 2: Encanador Curitiba ──────────────────
  {
    slug: 'encanador-curitiba',
    route: '/servicos/encanador-curitiba',
    title: 'Encanador em Curitiba — Hidráulica 24h | Serviços no Bairro',
    metaDescription: 'Encanador em Curitiba verificado e com avaliações reais. Conserto de vazamento, instalação hidráulica, emergência 24h. Orçamento grátis.',
    h1: 'Encanador em Curitiba — Serviços Hidráulicos 24h',
    cidade: 'Curitiba',
    servicoSlug: 'encanador-residencial',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Serviços', url: '/busca' },
      { name: 'Encanador em Curitiba', url: '/servicos/encanador-curitiba' },
    ],
    heroSubtitle: 'Encontre encanadores profissionais em Curitiba para conserto de vazamentos, instalação hidráulica, troca de tubulação e emergências. Orçamento gratuito via WhatsApp.',
    buscaQuery: '/busca?servico=encanador-residencial&cidade=curitiba',
    contentBlocks: [
      {
        heading: 'O que faz um encanador e quando você precisa de um?',
        content: `O encanador é o profissional responsável por toda a parte hidráulica de residências, condomínios, comércios e indústrias. Em Curitiba, a demanda por encanadores qualificados é alta durante o ano inteiro, mas especialmente nos meses de inverno, quando canos podem trincar devido às baixas temperaturas.\n\nVocê precisa de um encanador quando identificar vazamentos em torneiras, chuveiros ou tubulações, quando a pressão da água cair repentinamente, quando precisar instalar ou trocar um aquecedor de água, quando for reformar o banheiro ou a cozinha, ou quando houver infiltração em paredes e tetos.\n\nOs encanadores cadastrados no Serviços no Bairro são profissionais verificados que realizam desde reparos simples até instalações hidráulicas completas. Todos oferecem garantia de serviço e utilizam materiais de qualidade com nota fiscal.`,
      },
      {
        heading: 'Quanto custa um encanador em Curitiba?',
        content: 'O custo de serviços de encanamento varia conforme a complexidade e o material necessário. Veja os preços médios em Curitiba:',
        type: 'table',
        tableData: [
          { servico: 'Conserto de torneira/registro', preco: 'R$ 80 a R$ 200' },
          { servico: 'Reparo de vazamento simples', preco: 'R$ 120 a R$ 300' },
          { servico: 'Troca de sifão ou flexível', preco: 'R$ 80 a R$ 180' },
          { servico: 'Instalação de chuveiro elétrico', preco: 'R$ 100 a R$ 250' },
          { servico: 'Troca de tubulação (metro)', preco: 'R$ 150 a R$ 400' },
          { servico: 'Instalação de caixa d\'água', preco: 'R$ 300 a R$ 800' },
          { servico: 'Instalação de aquecedor a gás', preco: 'R$ 400 a R$ 1.200' },
        ],
      },
      {
        heading: 'Como escolher um encanador confiável em Curitiba?',
        content: `Encontrar um encanador confiável em Curitiba pode ser desafiador, mas existem critérios que facilitam a escolha. Primeiro, busque profissionais com avaliações verificadas — no Serviços no Bairro, cada avaliação é de um cliente real que utilizou o serviço.\n\nVerifique se o profissional oferece nota fiscal e garantia por escrito. Encanadores sérios sempre documentam o serviço realizado e garantem a mão de obra por pelo menos 90 dias.\n\nPeça sempre orçamento detalhado antes de autorizar qualquer serviço. O orçamento deve incluir mão de obra, materiais, prazo de execução e condições de pagamento. Desconfie de valores muito abaixo da média — pode indicar uso de materiais de baixa qualidade.\n\nPriorize profissionais que atendem o seu bairro. Um encanador que trabalha na sua região conhece as particularidades da rede hidráulica local e consegue chegar mais rápido em caso de emergência.`,
      },
      {
        heading: 'Bairros atendidos em Curitiba',
        content: `Nosso diretório conecta você a encanadores em todos os bairros de Curitiba. Das regiões centrais como Batel, Centro, Bigorrilho e Água Verde, até bairros mais afastados como CIC, Tatuquara, Sítio Cercado e Campo de Santana. Também cobrimos regiões populares como Ecoville, Champagnat e as vilas internas da CIC — Neoville, Vila Sandra, Vila Caiuá e Vila Sabará.\n\nPara cada bairro, exibimos os encanadores disponíveis com nota média, número de avaliações, se atendem 24h e os serviços oferecidos. Você pode solicitar orçamento direto pelo WhatsApp sem precisar ligar.`,
      },
    ],
  },

  // ── PÁGINA 3: Desentupidora 24h Curitiba ──────────────────
  {
    slug: 'desentupidora-24h-curitiba',
    route: '/servicos/desentupidora-24h-curitiba',
    title: 'Desentupidora 24h em Curitiba | Emergência | Serviços no Bairro',
    metaDescription: 'Desentupidora 24h em Curitiba para emergências. Esgoto voltando? Vaso transbordando? Atendimento imediato em todos os bairros. Orçamento grátis.',
    h1: 'Desentupidora 24h em Curitiba — Atendimento de Emergência',
    cidade: 'Curitiba',
    servicoSlug: 'emergencia-24h',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Serviços', url: '/busca' },
      { name: 'Desentupidora 24h Curitiba', url: '/servicos/desentupidora-24h-curitiba' },
    ],
    heroSubtitle: 'Emergência hidráulica agora? Esgoto voltando, vaso transbordando ou alagamento? Encontre desentupidoras com atendimento imediato 24 horas em todos os bairros de Curitiba.',
    buscaQuery: '/busca?24h=true&cidade=curitiba',
    contentBlocks: [
      {
        heading: 'Quando ligar para uma desentupidora 24h?',
        content: `Situações de emergência hidráulica não escolhem hora para acontecer. Esgoto voltando pelo ralo, vaso sanitário transbordando, alagamento por cano estourado — esses problemas exigem atendimento imediato, seja de madrugada, no fim de semana ou em feriados.\n\nEm Curitiba, as desentupidoras 24h estão preparadas para atender chamados urgentes em qualquer bairro da cidade. O tempo médio de chegada é de 30 a 45 minutos, dependendo da região. Bairros centrais como Batel, Centro e Água Verde costumam ter atendimento ainda mais rápido.\n\nOs principais sinais de que você precisa de atendimento emergencial são: água suja saindo pelo ralo do banheiro, cheiro forte de esgoto dentro de casa, vaso sanitário que não desce de jeito nenhum, e água escura acumulando no piso do box ou da área de serviço. Não espere a situação piorar — quanto antes chamar, menor será o custo do reparo.`,
      },
      {
        heading: 'Quanto custa o atendimento de emergência 24h em Curitiba?',
        content: 'O atendimento emergencial tem preço ligeiramente superior ao serviço agendado, devido à urgência e ao deslocamento fora de horário comercial. Veja os valores médios:',
        type: 'table',
        tableData: [
          { servico: 'Desentupimento emergencial (vaso/pia)', preco: 'R$ 200 a R$ 450' },
          { servico: 'Desentupimento de esgoto (emergência)', preco: 'R$ 300 a R$ 700' },
          { servico: 'Cano estourado (reparo emergencial)', preco: 'R$ 250 a R$ 600' },
          { servico: 'Vazamento grave (madrugada/feriado)', preco: 'R$ 200 a R$ 500' },
          { servico: 'Hidrojateamento emergencial', preco: 'R$ 500 a R$ 1.500' },
        ],
      },
      {
        heading: 'Como funciona o atendimento 24h em Curitiba?',
        content: `O processo é simples e rápido. Primeiro, você acessa o Serviços no Bairro e filtra por empresas com atendimento 24h. Depois, envia uma mensagem pelo WhatsApp descrevendo o problema — pode ser um texto curto como "esgoto voltando pelo ralo, preciso de atendimento urgente".\n\nA empresa responde em até 15 minutos com a previsão de chegada e o valor estimado. Não é cobrada taxa de visita — o orçamento é gratuito e sem compromisso. Se você aprovar, o técnico se desloca imediatamente para o local.\n\nTodas as empresas 24h no nosso diretório possuem equipe de plantão com veículos equipados, o que significa que o profissional já chega com as ferramentas necessárias para resolver o problema no primeiro atendimento. Isso evita idas e vindas e reduz o tempo total do serviço.\n\nOs pagamentos podem ser feitos por PIX, cartão de crédito/débito ou dinheiro — você combina diretamente com o profissional.`,
      },
      {
        heading: 'Bairros com cobertura 24h em Curitiba',
        content: `Todos os 75 bairros de Curitiba possuem cobertura de desentupidoras 24h no nosso diretório. As regionais com maior disponibilidade são Matriz (Centro, Batel, Rebouças), Boa Vista (Bacacheri, Pilarzinho), Portão (Água Verde, Novo Mundo) e CIC — que por ser um dos maiores bairros da cidade, possui equipes dedicadas em vilas como Neoville, Vila Sandra e Vila Caiuá.\n\nNos finais de semana e feriados, recomendamos priorizar empresas que tenham selo "24h Verificado" no perfil — isso significa que confirmamos que a empresa realmente atende fora do horário comercial.`,
      },
    ],
  },

  // ── PÁGINA 4: Limpa Fossa Curitiba ──────────────────
  {
    slug: 'limpa-fossa-curitiba',
    route: '/servicos/limpa-fossa-curitiba',
    title: 'Limpa Fossa em Curitiba — Preços e Empresas | Serviços no Bairro',
    metaDescription: 'Limpa fossa em Curitiba com empresas verificadas. Preço médio R$250-700. Atendimento em todos os bairros. Orçamento grátis via WhatsApp.',
    h1: 'Limpa Fossa em Curitiba — Empresas Verificadas',
    cidade: 'Curitiba',
    servicoSlug: 'limpa-fossa',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Serviços', url: '/busca' },
      { name: 'Limpa Fossa em Curitiba', url: '/servicos/limpa-fossa-curitiba' },
    ],
    heroSubtitle: 'Serviço de limpeza de fossa séptica em Curitiba com caminhão limpa-fossa. Empresas verificadas com licença ambiental, preços justos e atendimento em todos os bairros.',
    buscaQuery: '/busca?servico=limpa-fossa&cidade=curitiba',
    contentBlocks: [
      {
        heading: 'O que é limpeza de fossa e com que frequência fazer?',
        content: `A limpeza de fossa séptica é o processo de esgotamento e sucção dos resíduos acumulados no tanque séptico da sua residência ou empresa. Em Curitiba, muitos imóveis — especialmente em bairros como Tatuquara, Campo de Santana, Ganchinho e Umbará — ainda utilizam sistema de fossa em vez de ligação direta à rede de esgoto da Sanepar.\n\nA frequência recomendada para limpeza de fossa é a cada 12 a 18 meses para residências, e a cada 6 a 12 meses para estabelecimentos comerciais com alto volume de uso. Ignorar a manutenção pode causar transbordamento, contaminação do solo, mau cheiro e até multas ambientais.\n\nO serviço é realizado com caminhão limpa-fossa (caminhão de sucção a vácuo) que remove todo o conteúdo do tanque e transporta para estação de tratamento licenciada. É fundamental que a empresa possua licença ambiental do IAP/IBAMA para realizar o descarte correto dos resíduos.`,
      },
      {
        heading: 'Quanto custa limpa fossa em Curitiba?',
        content: 'O preço depende do volume da fossa, da distância e da necessidade de equipamentos especiais. Valores médios em Curitiba:',
        type: 'table',
        tableData: [
          { servico: 'Limpeza de fossa residencial (até 3m³)', preco: 'R$ 250 a R$ 450' },
          { servico: 'Limpeza de fossa residencial (até 5m³)', preco: 'R$ 400 a R$ 600' },
          { servico: 'Limpeza de fossa comercial', preco: 'R$ 500 a R$ 900' },
          { servico: 'Limpeza de caixa de gordura', preco: 'R$ 180 a R$ 350' },
          { servico: 'Desincrustação de fossa', preco: 'R$ 600 a R$ 1.200' },
        ],
      },
      {
        heading: 'Como escolher uma empresa de limpa fossa em Curitiba?',
        content: `A escolha de uma empresa de limpa fossa exige cuidados extras em relação a outros serviços hidráulicos, porque envolve questões ambientais e sanitárias. Verifique se a empresa possui Licença de Operação (LO) emitida pelo órgão ambiental competente — sem essa licença, o descarte dos resíduos pode ser irregular.\n\nConfirme se a empresa emite o Manifesto de Transporte de Resíduos (MTR), documento obrigatório que comprova a destinação correta dos resíduos coletados. Empresas sérias enviam cópia digital desse documento após o serviço.\n\nNo Serviços no Bairro, verificamos a documentação de todas as empresas de limpa fossa antes de incluí-las no diretório. Cada perfil mostra a nota média, número de avaliações, se a empresa atende 24h e quais bairros são cobertos.\n\nEvite contratar empresas que ofereçam preços muito abaixo da média — o descarte irregular de resíduos pode resultar em multas para o contratante do serviço.`,
      },
      {
        heading: 'Bairros com maior demanda de limpa fossa em Curitiba',
        content: `Em Curitiba, os bairros com maior demanda por serviços de limpa fossa são aqueles com menor cobertura da rede de esgoto da Sanepar: Tatuquara, Campo de Santana, Ganchinho, Umbará, Caximba, Augusta e regiões periféricas da CIC. Também há demanda significativa em condomínios horizontais de bairros como Santa Felicidade, Campo Comprido e Butiatuvinha.\n\nNa Região Metropolitana, cidades como Fazenda Rio Grande, Mandirituba, Campo Magro e Rio Branco do Sul possuem alta concentração de imóveis com fossa séptica e são cobertas pelo nosso diretório.`,
      },
    ],
  },

  // ── PÁGINA 5: Hidrojateamento Curitiba ──────────────────
  {
    slug: 'hidrojateamento-curitiba',
    route: '/servicos/hidrojateamento-curitiba',
    title: 'Hidrojateamento em Curitiba | Desentupimento Industrial | Serviços no Bairro',
    metaDescription: 'Hidrojateamento em Curitiba para residências, comércios e indústrias. Limpeza de tubulações com alta pressão. Orçamento gratuito.',
    h1: 'Hidrojateamento em Curitiba — Limpeza de Tubulações',
    cidade: 'Curitiba',
    servicoSlug: 'hidrojateamento',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Serviços', url: '/busca' },
      { name: 'Hidrojateamento em Curitiba', url: '/servicos/hidrojateamento-curitiba' },
    ],
    heroSubtitle: 'Hidrojateamento de alta pressão para desentupimento de tubulações, limpeza de esgoto industrial e manutenção preventiva. Equipamentos profissionais e equipe técnica especializada.',
    buscaQuery: '/busca?servico=hidrojateamento&cidade=curitiba',
    contentBlocks: [
      {
        heading: 'O que é hidrojateamento e como funciona?',
        content: `O hidrojateamento é uma técnica avançada de desentupimento e limpeza de tubulações que utiliza jatos de água em altíssima pressão — geralmente entre 150 e 500 bar — para remover obstruções, incrustações e resíduos aderidos às paredes internas dos canos.\n\nDiferente do desentupimento convencional com máquina rotativa, o hidrojateamento limpa toda a superfície interna da tubulação, removendo gordura acumulada, raízes que invadiram o encanamento, depósitos calcários e outros materiais que reduzem o fluxo de água.\n\nEm Curitiba, o hidrojateamento é especialmente indicado para imóveis antigos no Centro, Batel e Rebouças, onde as tubulações de ferro fundido acumulam décadas de incrustações. Também é muito utilizado em condomínios, restaurantes, indústrias da CIC e estabelecimentos comerciais que precisam de limpeza preventiva periódica.\n\nO procedimento é realizado com um caminhão equipado com bomba de alta pressão, tanque de água e mangueira especial com bico rotativo. O processo não danifica as tubulações e é ecologicamente correto, já que utiliza apenas água — sem produtos químicos.`,
      },
      {
        heading: 'Quanto custa hidrojateamento em Curitiba?',
        content: 'O investimento em hidrojateamento é superior ao desentupimento convencional, mas o resultado é muito mais duradouro. Valores praticados em Curitiba:',
        type: 'table',
        tableData: [
          { servico: 'Hidrojateamento residencial (até 20m)', preco: 'R$ 350 a R$ 800' },
          { servico: 'Hidrojateamento comercial', preco: 'R$ 500 a R$ 1.500' },
          { servico: 'Hidrojateamento industrial', preco: 'R$ 800 a R$ 3.000' },
          { servico: 'Limpeza preventiva de rede (condomínio)', preco: 'R$ 1.000 a R$ 4.000' },
          { servico: 'Hidrojateamento + câmera de inspeção', preco: 'R$ 600 a R$ 1.800' },
        ],
      },
      {
        heading: 'Vantagens do hidrojateamento sobre métodos convencionais',
        content: `O hidrojateamento oferece diversas vantagens em comparação com o desentupimento convencional com máquina rotativa. Primeiro, a limpeza é completa — enquanto a máquina rotativa apenas perfura a obstrução criando um canal para passagem da água, o hidrojateamento remove todo o material aderido às paredes do tubo, restaurando o diâmetro original da tubulação.\n\nSegundo, o resultado é mais duradouro. Após um hidrojateamento bem feito, a tubulação pode ficar 2 a 3 anos sem entupir, enquanto o desentupimento convencional resolve o problema imediato mas não previne recorrências.\n\nTerceiro, é mais seguro para as tubulações. O jato de água, apesar da alta pressão, é controlado por profissionais treinados e não causa desgaste nos canos. Diferente de arames ou máquinas rotativas, não há risco de perfurar a tubulação.\n\nQuarto, permite diagnóstico completo. Muitas empresas de Curitiba combinam o hidrojateamento com câmera de inspeção, permitindo visualizar o interior da tubulação antes e depois do serviço — você vê exatamente o que foi feito.`,
      },
      {
        heading: 'Bairros e regiões atendidas em Curitiba',
        content: `O serviço de hidrojateamento está disponível em todos os bairros de Curitiba através do nosso diretório. As regiões com maior demanda são a CIC (Cidade Industrial), onde indústrias e galpões necessitam de limpeza periódica, e os bairros centrais com edificações antigas — Centro, São Francisco, Rebouças, Batel e Alto da Rua XV.\n\nCondomínios em bairros como Ecoville, Champagnat, Campo Comprido e Mossunguê também são clientes frequentes de hidrojateamento preventivo, contratando o serviço anualmente para manter a rede de esgoto do edifício em perfeito funcionamento.`,
      },
    ],
  },

  // ── PÁGINA 6: São José dos Pinhais ──────────────────
  {
    slug: 'sao-jose-dos-pinhais',
    route: '/sao-jose-dos-pinhais',
    title: 'Desentupidoras em São José dos Pinhais — 24h | Serviços no Bairro',
    metaDescription: 'Encontre desentupidoras e encanadores em São José dos Pinhais. Profissionais verificados, atendimento 24h, orçamento grátis via WhatsApp.',
    h1: 'Desentupidoras e Encanadores em São José dos Pinhais — 24h',
    cidade: 'São José dos Pinhais',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Região Metropolitana', url: '/busca' },
      { name: 'São José dos Pinhais', url: '/sao-jose-dos-pinhais' },
    ],
    heroSubtitle: 'Profissionais verificados de desentupimento e encanamento em São José dos Pinhais, PR. Atendimento 24h, emergência, orçamento grátis. A 15km do centro de Curitiba.',
    buscaQuery: '/busca?cidade=sao-jose-dos-pinhais',
    contentBlocks: [
      {
        heading: 'Serviços hidráulicos em São José dos Pinhais',
        content: `São José dos Pinhais é a cidade mais populosa da Região Metropolitana de Curitiba, com mais de 330 mil habitantes e crescimento urbano acelerado. Essa expansão gera demanda constante por serviços de desentupimento, encanamento, limpa fossa e manutenção hidráulica.\n\nA cidade abriga o Aeroporto Internacional Afonso Pena, um dos maiores parques industriais do Paraná e dezenas de condomínios residenciais novos. Tanto residências quanto empresas precisam de profissionais hidráulicos qualificados para instalação, manutenção e emergências.\n\nNo Serviços no Bairro, listamos desentupidoras e encanadores que atendem São José dos Pinhais com rapidez — a maioria das empresas chega em até 45 minutos. Todas possuem CNPJ verificado, avaliações reais e oferecem orçamento gratuito pelo WhatsApp.\n\nOs serviços mais procurados em SJP são: desentupimento de esgoto (especialmente em loteamentos novos com rede subdimensionada), conserto de vazamentos em condomínios, limpeza de fossa séptica em áreas rurais e instalação hidráulica em obras novas.`,
      },
      {
        heading: 'Quanto custam serviços hidráulicos em São José dos Pinhais?',
        content: 'Os preços em SJP são similares aos praticados em Curitiba, com pequena variação dependendo da distância:',
        type: 'table',
        tableData: [
          { servico: 'Desentupimento de vaso/pia', preco: 'R$ 150 a R$ 350' },
          { servico: 'Desentupimento de esgoto', preco: 'R$ 250 a R$ 550' },
          { servico: 'Encanador (reparo de vazamento)', preco: 'R$ 120 a R$ 350' },
          { servico: 'Limpa fossa residencial', preco: 'R$ 280 a R$ 500' },
          { servico: 'Hidrojateamento', preco: 'R$ 400 a R$ 1.200' },
        ],
      },
      {
        heading: 'Principais bairros atendidos em São José dos Pinhais',
        content: `O Serviços no Bairro cobre as principais regiões de São José dos Pinhais: Centro, Afonso Pena, Aristocrata, Boneca do Iguaçu, Borda do Campo, Braga, Campo Largo da Roseira, Colônia Rio Grande, Costeira, Cruzeiro, Del Rey, Guatupê, Ipê, Itália, Jardim Amazonas, Ouro Fino, Pedro Moro, Quissisana, Rio Pequeno, Roseira de São Sebastião, São Cristóvão, São Domingos, São Marcos, Silveira da Motta e Vila Rúbia.\n\nMuitas empresas que atendem SJP também cobrem cidades vizinhas como Piraquara, Pinhais e Fazenda Rio Grande, facilitando o atendimento em toda a região leste e sul da RMC.`,
      },
      {
        heading: 'Por que usar o Serviços no Bairro em São José dos Pinhais?',
        content: `Diferente de buscar "desentupidora São José dos Pinhais" no Google e receber resultados aleatórios, no Serviços no Bairro cada empresa é verificada antes de entrar no diretório. Conferimos CNPJ, documentação, e monitoramos as avaliações dos clientes.\n\nAlém disso, você vê de forma transparente a nota média, o número de avaliações, os serviços oferecidos, se a empresa atende 24h, quais formas de pagamento aceita e pode solicitar orçamento direto pelo WhatsApp — sem formulários, sem espera.\n\nSão José dos Pinhais tem particularidades que exigem profissionais experientes: solo argiloso que dificulta obras, rede de esgoto em expansão com trechos antigos, e áreas rurais com sistema de fossa. As empresas do nosso diretório conhecem essas características e estão preparadas para lidar com elas.`,
      },
    ],
  },

  // ── PÁGINA 7: Colombo ──────────────────
  {
    slug: 'colombo',
    route: '/colombo',
    title: 'Desentupidoras em Colombo — PR | 24h | Serviços no Bairro',
    metaDescription: 'Desentupidoras e encanadores em Colombo, PR. Emergência 24h, profissionais verificados, orçamento grátis. Atendimento rápido.',
    h1: 'Desentupidoras e Encanadores em Colombo — PR',
    cidade: 'Colombo',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Região Metropolitana', url: '/busca' },
      { name: 'Colombo', url: '/colombo' },
    ],
    heroSubtitle: 'Profissionais de desentupimento e encanamento verificados em Colombo, Paraná. Emergência 24h, orçamento grátis. Atendemos todas as regiões da cidade.',
    buscaQuery: '/busca?cidade=colombo',
    contentBlocks: [
      {
        heading: 'Serviços de desentupimento e encanamento em Colombo',
        content: `Colombo é a segunda cidade mais populosa da Região Metropolitana de Curitiba, com mais de 240 mil habitantes concentrados em uma área que faz divisa direta com bairros como Santa Cândida, Atuba e Abranches. Essa proximidade com Curitiba faz com que muitas desentupidoras e encanadores atendam ambas as cidades.\n\nA infraestrutura de esgoto de Colombo apresenta desafios próprios: muitos bairros ainda possuem rede mista (pluvial + esgoto), e áreas de ocupação mais recente frequentemente enfrentam problemas com tubulações subdimensionadas. Nas regiões mais afastadas do centro, como Guaraituba, São Gabriel e Roça Grande, o uso de fossa séptica ainda é comum.\n\nNo Serviços no Bairro, você encontra desentupidoras e encanadores que conhecem a realidade de Colombo e atendem com rapidez — a maioria chega em 30 a 50 minutos. Todos os profissionais são verificados, com CNPJ ativo e avaliações reais de clientes.\n\nOs serviços mais procurados em Colombo incluem desentupimento de esgoto, conserto de vazamentos, limpeza de fossa, hidrojateamento e instalação hidráulica para construções novas.`,
      },
      {
        heading: 'Preços de serviços hidráulicos em Colombo',
        content: 'Valores praticados por profissionais que atendem Colombo e região:',
        type: 'table',
        tableData: [
          { servico: 'Desentupimento residencial', preco: 'R$ 150 a R$ 400' },
          { servico: 'Desentupimento de esgoto', preco: 'R$ 250 a R$ 600' },
          { servico: 'Encanador (reparos)', preco: 'R$ 100 a R$ 300' },
          { servico: 'Limpa fossa', preco: 'R$ 300 a R$ 550' },
          { servico: 'Caça vazamento', preco: 'R$ 200 a R$ 500' },
        ],
      },
      {
        heading: 'Regiões atendidas em Colombo',
        content: `Cobrimos todas as principais regiões de Colombo: Centro, Alto Maracanã, Atuba, Campo Pequeno, Colônia Faria, Fátima, Guaraituba, Guarani, Maracanã, Monza, Osasco, Palmital, Rio Verde, Roça Grande, Santa Gema, São Dimas, São Gabriel e Vila Liberdade.\n\nA proximidade com Curitiba permite que empresas de bairros como Santa Cândida, Abranches e Boa Vista atendam Colombo com rapidez, especialmente nas regiões sul da cidade que ficam a poucos minutos desses bairros curitibanos.`,
      },
      {
        heading: 'Dicas para contratar serviços hidráulicos em Colombo',
        content: `Ao contratar uma desentupidora ou encanador em Colombo, verifique se a empresa realmente atende a sua região — Colombo tem extensão territorial grande e nem todas as empresas cobrem bairros mais afastados como Guaraituba ou São Gabriel.\n\nPeça sempre orçamento por escrito e confirme se o valor inclui deslocamento. Algumas empresas de Curitiba cobram taxa adicional para atendimento em Colombo, enquanto outras já incluem no preço. No Serviços no Bairro, essa informação é transparente no perfil de cada empresa.\n\nPara emergências fora do horário comercial, filtre por empresas com selo "24h" — elas mantêm equipe de plantão e veículo equipado para atendimento imediato, inclusive de madrugada e em feriados.`,
      },
    ],
  },

  // ── PÁGINA 8: Pinhais ──────────────────
  {
    slug: 'pinhais',
    route: '/pinhais',
    title: 'Desentupidoras em Pinhais — 24h | Serviços no Bairro',
    metaDescription: 'Desentupidoras e encanadores em Pinhais (PR). Emergência 24h, verificados, orçamento grátis. 8km de Curitiba.',
    h1: 'Desentupidoras e Encanadores em Pinhais — PR',
    cidade: 'Pinhais',
    breadcrumb: [
      { name: 'Início', url: '/' },
      { name: 'Região Metropolitana', url: '/busca' },
      { name: 'Pinhais', url: '/pinhais' },
    ],
    heroSubtitle: 'Encontre desentupidoras e encanadores verificados em Pinhais, PR. A apenas 8km de Curitiba, com atendimento 24h e orçamento gratuito via WhatsApp.',
    buscaQuery: '/busca?cidade=pinhais',
    contentBlocks: [
      {
        heading: 'Serviços hidráulicos em Pinhais',
        content: `Pinhais é uma das menores cidades da Região Metropolitana de Curitiba em área territorial, mas uma das mais densamente povoadas, com mais de 130 mil habitantes. Localizada a apenas 8 km do centro de Curitiba, faz divisa com bairros como Cajuru, Capão da Imbuia e Tarumã.\n\nEssa proximidade é uma vantagem para os moradores: muitas desentupidoras e encanadores de Curitiba atendem Pinhais sem cobrar taxa de deslocamento, e o tempo de chegada é similar ao de bairros curitibanos — entre 20 e 40 minutos.\n\nA cidade de Pinhais tem infraestrutura de esgoto bem desenvolvida na região central, mas bairros mais novos e loteamentos na periferia ainda enfrentam problemas com rede subdimensionada, entupimentos recorrentes e necessidade de limpeza de caixa de gordura.\n\nNo Serviços no Bairro, você encontra profissionais que conhecem Pinhais e atendem com agilidade. Todos possuem CNPJ verificado, avaliações reais e oferecem orçamento gratuito.`,
      },
      {
        heading: 'Preços de desentupimento em Pinhais',
        content: 'Valores similares aos praticados em Curitiba, sem taxa de deslocamento na maioria dos casos:',
        type: 'table',
        tableData: [
          { servico: 'Desentupimento de vaso/pia', preco: 'R$ 130 a R$ 320' },
          { servico: 'Desentupimento de esgoto', preco: 'R$ 200 a R$ 500' },
          { servico: 'Encanador (reparos gerais)', preco: 'R$ 100 a R$ 280' },
          { servico: 'Limpa fossa', preco: 'R$ 280 a R$ 500' },
          { servico: 'Instalação hidráulica (ponto)', preco: 'R$ 150 a R$ 350' },
        ],
      },
      {
        heading: 'Bairros e regiões atendidas em Pinhais',
        content: `Atendemos todas as regiões de Pinhais: Centro, Alphaville Graciosa, Alto Atiradores, Emiliano Perneta, Estância Pinhais, Maria Antonieta, Palmital, Pineville, Sete Vilas, Vale das Águas, Vargem Grande, Vila Amélia, Vila Esplanada, Vila Maria Antonieta, Vila Tarumã e Weissópolis.\n\nA região do Alphaville Graciosa e arredores, com seus condomínios de alto padrão, demanda encanadores especializados em sistemas hidráulicos modernos — aquecimento central, reúso de água e irrigação automatizada. Já regiões como Palmital e Vargem Grande têm perfil mais residencial com necessidades típicas de desentupimento e reparos.`,
      },
      {
        heading: 'Por que escolher profissionais verificados em Pinhais?',
        content: `Pinhais recebe muita oferta de serviços hidráulicos informais — panfletos em postes, anúncios em classificados sem verificação. O risco de contratar um profissional sem referências é alto: serviço mal feito, falta de garantia, materiais de baixa qualidade e até golpes.\n\nNo Serviços no Bairro, cada empresa passa por verificação antes de ser listada. Conferimos CNPJ ativo na Receita Federal, solicitamos documentação de alvará e monitoramos continuamente as avaliações dos clientes. Se uma empresa recebe reclamações graves, ela é removida do diretório.\n\nAlém disso, o contato é feito diretamente pelo WhatsApp — você conversa com a empresa, recebe orçamento e agenda o serviço sem intermediários. Transparência total, do orçamento ao pagamento.`,
      },
    ],
  },
];

/** Get a landing page by its slug */
export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return landingPages.find(p => p.slug === slug);
}
