/**
 * Conteúdo da landing de assistência técnica em cervejeiras
 * (anúncio da Santa Catarina Refrigeração — Navegantes/SC).
 * Os textos descrevem serviços solicitados; nenhuma promessa de prazo,
 * garantia, preço ou vínculo de autorização de marca é feita.
 */

export const EMPRESA_CERVEJEIRA_SLUG = 'santa-catarina-refrigeracao-navegantes';
export const WHATSAPP_CERVEJEIRA = '5547992245172';
export const TELEFONE_CERVEJEIRA = '(47) 99224-5172';
export const MSG_WHATSAPP_CERVEJEIRA =
  'Olá! Preciso de assistência técnica para minha cervejeira.';

export const cidadesPrioritarias = ['Navegantes', 'Penha'];

export const cidadesAtendimento = [
  'Balneário Piçarras',
  'Itajaí',
  'Barra Velha',
  'Balneário Camboriú',
  'Camboriú',
  'Itapema',
  'Porto Belo',
  'Bombinhas',
  'Brusque',
  'Gaspar',
  'Blumenau',
  'Ilhota',
  'Luiz Alves',
  'Guabiruba',
  'Massaranduba',
  'Araquari',
  'Guaramirim',
  'São João do Itaperiú',
  'Balneário Barra do Sul',
  'São Francisco do Sul',
  'Joinville',
];

export const problemasCervejeira = [
  'Cervejeira não gela',
  'Cervejeira gelando pouco',
  'Cervejeira congelando as bebidas',
  'Cervejeira não liga',
  'Cervejeira não desliga',
  'Cervejeira fazendo barulho',
  'Cervejeira vazando água',
  'Painel apresentando erro',
  'Temperatura oscilando',
  'Problema no compressor',
  'Problema no termostato',
  'Problema no sensor de temperatura',
  'Problema na placa eletrônica',
  'Problema na ventilação',
  'Problema no sistema de degelo',
  'Problema na vedação da porta',
  'Suspeita de vazamento de fluido refrigerante',
];

export const servicosCervejeira: { titulo: string; descricao: string }[] = [
  { titulo: 'Diagnóstico de cervejeiras', descricao: 'Verificação do defeito relatado, das condições de instalação e do comportamento do equipamento antes de qualquer intervenção.' },
  { titulo: 'Conserto de cervejeira residencial', descricao: 'Atendimento a cervejeiras de residências, apartamentos e casas de temporada, conforme marca, modelo e disponibilidade.' },
  { titulo: 'Conserto de cervejeira comercial', descricao: 'Atendimento a bares, restaurantes, lanchonetes, mercados, conveniências, padarias, hotéis, pousadas e clubes.' },
  { titulo: 'Manutenção preventiva', descricao: 'Verificações periódicas para reduzir paradas: temperatura, ventilação, vedação, dreno e limpeza técnica do condensador, quando aplicável.' },
  { titulo: 'Manutenção corretiva', descricao: 'Correção da falha identificada no diagnóstico, com definição das peças somente após a avaliação do equipamento.' },
  { titulo: 'Verificação de temperatura', descricao: 'Medição e conferência da faixa de trabalho para equipamentos que gelam pouco, congelam bebidas ou oscilam.' },
  { titulo: 'Sensores e termostatos', descricao: 'Avaliação de sensores de temperatura, termostatos e comando eletrônico responsáveis pelo controle de refrigeração.' },
  { titulo: 'Diagnóstico de placa eletrônica', descricao: 'Análise da placa e do painel em equipamentos que apresentam código de erro ou comportamento irregular.' },
  { titulo: 'Compressor e sistema de partida', descricao: 'Verificação do compressor, relé, protetor térmico e componentes de partida.' },
  { titulo: 'Ventiladores e circulação de ar', descricao: 'Avaliação dos ventiladores e da circulação interna, causa frequente de gelo irregular e temperatura desigual.' },
  { titulo: 'Sistema de degelo', descricao: 'Verificação do degelo em equipamentos com formação excessiva de gelo ou evaporador congelado.' },
  { titulo: 'Vedação da porta e dreno', descricao: 'Conferência da borracha de vedação, do fechamento da porta e desobstrução do dreno em casos de vazamento de água.' },
  { titulo: 'Ruídos e vibrações', descricao: 'Identificação da origem de ruídos e vibrações anormais durante o funcionamento.' },
  { titulo: 'Circuito de refrigeração', descricao: 'Avaliação técnica do circuito antes de qualquer recarga de fluido refrigerante, para identificar possível vazamento.' },
];

export const publicoCervejeira = [
  'Residências', 'Apartamentos', 'Casas de temporada', 'Bares', 'Restaurantes',
  'Lanchonetes', 'Conveniências', 'Mercados', 'Padarias', 'Hotéis', 'Pousadas',
  'Clubes', 'Salões de festas', 'Empresas', 'Comércios com bebidas refrigeradas',
];

export const passosSolicitacao = [
  'Cidade e bairro',
  'Marca e modelo da cervejeira',
  'Descrição do problema',
  'Foto da etiqueta de identificação',
  'Foto ou vídeo do painel e do defeito, quando possível',
];

export const faqCervejeira: { pergunta: string; resposta: string; categoria?: string }[] = [
  {
    pergunta: 'Quem conserta cervejeira em Navegantes e Penha?',
    resposta:
      'A Santa Catarina Refrigeração recebe solicitações de diagnóstico, manutenção e conserto de cervejeiras em Navegantes, Penha e outras cidades atendidas. A cobertura e a disponibilidade devem ser confirmadas pelo WhatsApp (47) 99224-5172.',
    categoria: 'localidade',
  },
  {
    pergunta: 'Minha cervejeira não está gelando. O que pode ser?',
    resposta:
      'As possíveis causas incluem configuração incorreta, ventilação obstruída, condensador sujo, falha de sensor, termostato, placa, ventilador, sistema de degelo, vedação ou compressor. O diagnóstico deve ser feito antes da troca de componentes.',
    categoria: 'tecnico',
  },
  {
    pergunta: 'Cervejeira que congela as bebidas tem conserto?',
    resposta:
      'O problema pode estar relacionado ao ajuste de temperatura, sensor, termostato, circulação de ar ou comando eletrônico. É necessário identificar a causa e o modelo do equipamento.',
    categoria: 'tecnico',
  },
  {
    pergunta: 'Fazem recarga de gás em cervejeira?',
    resposta:
      'O circuito de refrigeração deve ser avaliado antes. Se houver perda de fluido refrigerante, é necessário localizar e corrigir a origem do vazamento antes de qualquer recarga.',
    categoria: 'tecnico',
  },
  {
    pergunta: 'Consertam cervejeira comercial?',
    resposta:
      'A empresa recebe solicitações para cervejeiras residenciais e comerciais. O modelo, a capacidade e a aplicação devem ser informados para confirmar o atendimento.',
    categoria: 'antes',
  },
  {
    pergunta: 'O reparo é feito no local?',
    resposta:
      'A possibilidade de diagnóstico e reparo no local depende do modelo, do defeito, da peça necessária e do tipo de intervenção.',
    categoria: 'durante',
  },
  {
    pergunta: 'Quais informações devo enviar?',
    resposta:
      'Informe cidade, bairro, marca, modelo e defeito. Fotos da etiqueta, do painel e do interior da cervejeira ajudam na triagem.',
    categoria: 'antes',
  },
  {
    pergunta: 'Vale a pena consertar uma cervejeira?',
    resposta:
      'A decisão depende da idade, do estado geral, da causa da falha, da disponibilidade de peças e do custo do reparo. O diagnóstico permite comparar o conserto com a substituição.',
    categoria: 'antes',
  },
];
