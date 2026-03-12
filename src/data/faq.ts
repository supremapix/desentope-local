import { FAQCategoria } from '@/types';

export const faqCategorias: FAQCategoria[] = [
  {
    slug: 'emergencias',
    nome: 'Emergências e Urgências',
    icone: '🚨',
    perguntas: [
      { pergunta: 'O que fazer quando o vaso sanitário entupiu e está transbordando?', resposta: 'Primeiro, feche o registro de água do vaso (geralmente atrás ou embaixo). Não tente dar descarga novamente. Se a água estiver subindo, use baldes para remover o excesso. Em seguida, entre em contato com uma desentupidora profissional. Evite usar produtos químicos caseiros, pois podem danificar a tubulação.' },
      { pergunta: 'Desentupidora atende de madrugada em Curitiba?', resposta: 'Sim! Diversas desentupidoras em Curitiba oferecem atendimento 24 horas, incluindo madrugadas, finais de semana e feriados. No Serviços no Bairro, você pode filtrar empresas com atendimento 24h para encontrar a mais próxima de você.' },
      { pergunta: 'Qual a diferença entre entupimento e ruptura de cano?', resposta: 'Entupimento é quando há bloqueio na tubulação (por gordura, objetos, raízes, etc.), impedindo o fluxo da água. Ruptura é quando o cano se rompe, causando vazamento. O entupimento geralmente causa acúmulo de água nos ralos e vasos; a ruptura causa infiltrações, manchas nas paredes e aumento na conta de água.' },
      { pergunta: 'Meu esgoto está voltando pela pia, é grave?', resposta: 'Sim, isso indica um entupimento na rede de esgoto que precisa de atenção imediata. O retorno de esgoto pode trazer bactérias e contaminação. Não utilize a pia até resolver o problema e chame uma desentupidora profissional o mais rápido possível.' },
      { pergunta: 'Em quanto tempo uma desentupidora chega após o chamado?', resposta: 'Em Curitiba, a maioria das desentupidoras profissionais chega entre 30 minutos e 1 hora, dependendo do bairro e horário. Empresas com atendimento 24h costumam ter equipes de plantão prontas para deslocamento imediato.' },
      { pergunta: 'Entupimento de esgoto pode contaminar a água potável?', resposta: 'Em casos graves de ruptura na rede de esgoto próxima à rede de água, pode haver contaminação cruzada. Por isso é essencial resolver entupimentos de esgoto rapidamente e contar com profissionais que verifiquem a integridade da rede hidráulica.' },
    ],
  },
  {
    slug: 'precos',
    nome: 'Preços e Orçamentos',
    icone: '💰',
    perguntas: [
      { pergunta: 'Quanto custa desentupir um vaso sanitário em Curitiba?', resposta: 'O preço médio para desentupir um vaso sanitário em Curitiba varia de R$ 150 a R$ 350, dependendo da gravidade do entupimento e do método utilizado. Entupimentos simples custam menos; obstruções profundas na rede podem custar mais. Sempre peça orçamento antes.' },
      { pergunta: 'Desentupidora cobra visita mesmo se não resolver o problema?', resposta: 'A maioria das desentupidoras cobra uma taxa de visita/deslocamento, que geralmente é abatida do valor do serviço. Pergunte antes de agendar. No Serviços no Bairro, muitas empresas oferecem orçamento grátis via WhatsApp.' },
      { pergunta: 'Por que os preços variam tanto entre desentupidoras?', resposta: 'Os preços variam conforme: equipamentos utilizados (manuais vs. hidrojateamento), experiência da equipe, região de atendimento, horário (madrugada e feriados costumam ter acréscimo), e gravidade do problema. Empresas com CNPJ e nota fiscal tendem a ter preços mais padronizados.' },
      { pergunta: 'Existe preço tabelado para desentupimento no Paraná?', resposta: 'Não existe tabela oficial de preços. Cada empresa define seus valores. Recomendamos solicitar pelo menos 3 orçamentos antes de contratar. No Serviços no Bairro, você pode contatar várias empresas rapidamente pelo WhatsApp.' },
      { pergunta: 'Posso pedir orçamento por WhatsApp antes do técnico vir?', resposta: 'Sim! A maioria das empresas cadastradas no Serviços no Bairro aceita pedidos de orçamento via WhatsApp. Descreva o problema com detalhes e, se possível, envie fotos ou vídeos para um diagnóstico mais preciso.' },
      { pergunta: 'O seguro residencial cobre serviços de desentupimento?', resposta: 'Muitos seguros residenciais incluem cobertura para serviços de encanamento e desentupimento de emergência. Verifique sua apólice ou entre em contato com sua seguradora. Geralmente há um limite de valor e número de chamados por ano.' },
    ],
  },
  {
    slug: 'servicos-tecnicas',
    nome: 'Serviços e Técnicas',
    icone: '🔧',
    perguntas: [
      { pergunta: 'Qual a diferença entre desentupidora e encanador?', resposta: 'Desentupidora é especializada em desobstruir tubulações entupidas (vasos, pias, esgotos, ralos). Encanador trabalha com instalação, manutenção e reparo de sistemas hidráulicos (canos, torneiras, registros, caixas d\'água). Muitas empresas oferecem ambos os serviços.' },
      { pergunta: 'O que é hidrojateamento e quando é necessário?', resposta: 'Hidrojateamento é a limpeza de tubulações com jato de água de alta pressão (até 4.000 PSI). É necessário em entupimentos graves, acúmulo de gordura em redes de esgoto, obstruções por raízes e limpeza preventiva de tubulações antigas. É mais eficiente que métodos manuais.' },
      { pergunta: 'Para que serve a câmera de inspeção de esgoto?', resposta: 'A câmera de inspeção é introduzida na tubulação para visualizar internamente o estado dos canos. Serve para: localizar entupimentos, identificar rupturas, verificar a condição da tubulação e planejar reparos sem necessidade de quebrar o piso. É um serviço de diagnóstico.' },
      { pergunta: 'O que é limpa-fossa e com que frequência devo fazer?', resposta: 'Limpa-fossa é o serviço de sucção e remoção dos resíduos acumulados na fossa séptica. A frequência depende do tamanho da fossa e do número de pessoas na residência, mas em geral recomenda-se a cada 6 a 12 meses para evitar entupimentos e mau cheiro.' },
      { pergunta: 'Desentupimento com produtos químicos faz mal às tubulações?', resposta: 'Sim, o uso frequente de produtos químicos pode corroer tubulações de PVC e ferro, causar danos ambientais e não resolve entupimentos graves. Para casos simples, água quente com detergente pode ajudar. Para problemas persistentes, sempre chame um profissional.' },
      { pergunta: 'Quando é necessário trocar a tubulação ao invés de desentupir?', resposta: 'A troca é necessária quando: a tubulação está corroída ou quebrada, há infiltrações recorrentes, o cano é muito antigo (ferro galvanizado), houve invasão de raízes que danificaram a estrutura, ou quando os entupimentos são muito frequentes no mesmo ponto.' },
    ],
  },
  {
    slug: 'residencial-comercial',
    nome: 'Residencial vs Comercial',
    icone: '🏠',
    perguntas: [
      { pergunta: 'Desentupidoras residenciais atendem condomínios?', resposta: 'Sim, a maioria atende condomínios. Para áreas comuns (rede principal de esgoto), o síndico ou administradora deve solicitar o serviço. Para unidades individuais, o morador pode contratar diretamente. Alguns condomínios têm contratos fixos com desentupidoras.' },
      { pergunta: 'Restaurante com cozinha entupida: qual profissional chamar?', resposta: 'Chame uma desentupidora especializada em esgoto comercial. Restaurantes geralmente precisam de limpeza de caixa de gordura e desentupimento da rede de esgoto. É importante contratar empresa que atenda normas da vigilância sanitária. A manutenção preventiva mensal é essencial.' },
      { pergunta: 'Desentupimento industrial é diferente do residencial?', resposta: 'Sim. O desentupimento industrial lida com tubulações de maior diâmetro, resíduos mais pesados e redes mais complexas. Requer equipamentos mais potentes (hidrojateamento industrial) e profissionais especializados. Os preços também são diferentes.' },
      { pergunta: 'Empresa com contrato mensal de manutenção: vale a pena?', resposta: 'Para empresas, restaurantes e condomínios, sim. Contratos mensais de manutenção preventiva evitam entupimentos emergenciais (que custam mais caro), mantêm as tubulações em bom estado e podem incluir limpa-fossa e limpeza de caixa de gordura periódicas.' },
    ],
  },
  {
    slug: 'como-escolher',
    nome: 'Como Escolher',
    icone: '📋',
    perguntas: [
      { pergunta: 'Como verificar se uma desentupidora é confiável em Curitiba?', resposta: 'Verifique: 1) Se possui CNPJ ativo; 2) Avaliações de clientes reais; 3) Tempo de mercado; 4) Se emite nota fiscal; 5) Se oferece garantia do serviço; 6) Se tem endereço fixo. No Serviços no Bairro, empresas verificadas passaram por checagem de documentação.' },
      { pergunta: 'Desentupidora precisa de registro no CREA ou SINDUSCON?', resposta: 'Desentupidoras não precisam obrigatoriamente de registro no CREA. Porém, serviços de encanamento mais complexos (projetos hidráulicos, reformas) devem ter acompanhamento de profissional com registro. A empresa deve ter alvará de funcionamento e CNPJ.' },
      { pergunta: 'Devo pedir nota fiscal do serviço de desentupimento?', resposta: 'Sim, sempre! A nota fiscal é sua garantia legal do serviço prestado. Em caso de problemas posteriores, a nota fiscal comprova a contratação. Além disso, empresa que emite nota fiscal é mais confiável e está regularizada.' },
      { pergunta: 'Como evitar golpes de desentupidoras em Curitiba?', resposta: 'Cuidado com: preços muito abaixo do mercado, empresas sem CNPJ, que pedem pagamento total antecipado, que não fornecem orçamento antes, ou que "descobrem" problemas adicionais durante o serviço. Use plataformas como o Serviços no Bairro para encontrar empresas avaliadas.' },
      { pergunta: 'O que perguntar antes de contratar uma desentupidora?', resposta: 'Pergunte: 1) Qual o valor do orçamento/visita? 2) Há taxa de deslocamento? 3) Qual a garantia do serviço? 4) Emite nota fiscal? 5) Aceita quais formas de pagamento? 6) Quanto tempo para chegar? 7) Qual o método utilizado? 8) Há taxa extra para horário noturno/feriado?' },
    ],
  },
  {
    slug: 'por-regiao',
    nome: 'Por Bairro/Região',
    icone: '🌍',
    perguntas: [
      { pergunta: 'Quais desentupidoras atendem no Centro de Curitiba 24h?', resposta: 'Diversas desentupidoras atendem o Centro de Curitiba 24 horas. No Serviços no Bairro, você pode filtrar por bairro "Centro" e marcar o filtro "24h" para ver todas as opções disponíveis com avaliações e contato direto via WhatsApp.' },
      { pergunta: 'Tem desentupidora no Batel que aceita cartão?', resposta: 'Sim! Várias desentupidoras que atendem o Batel aceitam cartão de crédito e débito. Use o filtro de forma de pagamento no Serviços no Bairro para encontrar as opções que aceitam cartão na sua região.' },
      { pergunta: 'Desentupidora em São José dos Pinhais: como encontrar?', resposta: 'No Serviços no Bairro, acesse a página de São José dos Pinhais na seção Região Metropolitana. Lá você encontrará todas as desentupidoras que atendem a cidade, com avaliações, serviços oferecidos e contato direto.' },
      { pergunta: 'Serviço de esgoto em condomínio no Água Verde: quem chamar?', resposta: 'Para problemas de esgoto em condomínios no Água Verde, busque desentupidoras que atendam o bairro e tenham experiência com condomínios. No Serviços no Bairro, filtre por "Água Verde" e "Esgoto" para encontrar profissionais especializados.' },
    ],
  },
];

export function getFAQBySlug(slug: string): FAQCategoria | undefined {
  return faqCategorias.find(c => c.slug === slug);
}
