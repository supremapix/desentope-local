import { cidadesRMC, entornoAmplo } from './cidades-rmc';

export interface FaqCidadeItem {
  id: string;
  categoria: 'emergencia' | 'precos' | 'tecnico' | 'localidade';
  pergunta: string;
  resposta: string;
  tags: string[];
}

export interface FaqCidadeData {
  cidade: string;
  distancia: string;
  perguntas: FaqCidadeItem[];
}

const CTA = '\n\n📞 Ligue agora: (41) 3345-1194 | 💬 WhatsApp: (41) 98517-1966 — Atendimento 24h!';

function gerarPerguntasCidade(nome: string, slug: string, distanciaKm: number): FaqCidadeItem[] {
  return [
    {
      id: `${slug}-c01`, categoria: 'emergencia',
      pergunta: `Tem desentupidora em ${nome}/PR? Atende 24h?`,
      resposta: `Sim! Temos profissionais que atendem ${nome} e toda a Região Metropolitana de Curitiba com atendimento 24 horas, incluindo madrugadas, finais de semana e feriados. A distância de ${distanciaKm}km de Curitiba é coberta rapidamente pelas equipes. O tempo médio de chegada em ${nome} é de 40 a 90 minutos. Para situações de emergência como esgoto transbordando, cano estourado ou vaso entupido, o atendimento é prioritário.${CTA}`,
      tags: ['24h', slug, 'emergência'],
    },
    {
      id: `${slug}-c02`, categoria: 'precos',
      pergunta: `Qual o preço de desentupimento em ${nome}/PR?`,
      resposta: `O preço médio de desentupimento em ${nome} varia conforme o serviço: vaso sanitário R$ 180 a R$ 400, esgoto residencial R$ 250 a R$ 550, hidrojateamento R$ 400 a R$ 900, limpa-fossa R$ 300 a R$ 800. Os valores podem ser ligeiramente superiores aos de Curitiba devido à taxa de deslocamento (distância de ${distanciaKm}km). Algumas empresas não cobram taxa de deslocamento para ${nome}. Solicite orçamento sem compromisso para comparar preços.${CTA}`,
      tags: ['preço', slug, 'orçamento'],
    },
    {
      id: `${slug}-c03`, categoria: 'precos',
      pergunta: `Distância de Curitiba até ${nome} afeta o preço do serviço?`,
      resposta: `A distância de ${distanciaKm}km entre Curitiba e ${nome} pode influenciar o valor final do serviço. Algumas empresas cobram taxa de deslocamento que varia de R$ 30 a R$ 100, dependendo da distância. Porém, muitas desentupidoras que já atendem a Região Metropolitana incluem ${nome} na área de cobertura sem custo adicional. Recomendamos perguntar sobre a taxa de deslocamento ao solicitar o orçamento. No Serviços no Bairro, você pode filtrar empresas que atendem ${nome} especificamente.${CTA}`,
      tags: ['distância', 'deslocamento', slug],
    },
    {
      id: `${slug}-c04`, categoria: 'localidade',
      pergunta: `Desentupidora de ${nome} atende zona rural?`,
      resposta: `Sim! A maioria das desentupidoras que atendem ${nome} também cobre distritos e áreas rurais do município. Para áreas rurais mais afastadas, o tempo de deslocamento pode ser maior (60 a 120 minutos) e pode haver taxa adicional de deslocamento. Serviços como limpa-fossa são especialmente procurados em áreas rurais, onde o sistema de esgoto não é ligado à rede pública. Informe o endereço completo ou ponto de referência ao solicitar o orçamento.${CTA}`,
      tags: ['zona rural', slug, 'atendimento'],
    },
    {
      id: `${slug}-c05`, categoria: 'tecnico',
      pergunta: `Tem encanador em ${nome}/PR com boa avaliação?`,
      resposta: `Sim! No Serviços no Bairro, listamos encanadores e desentupidoras que atendem ${nome} com avaliações reais de clientes. Você pode verificar a nota média, total de avaliações, serviços oferecidos, formas de pagamento e se o profissional atende 24 horas. Todos os profissionais verificados passam por checagem de documentação (CNPJ ativo, certificações). Busque por "${nome}" no nosso site para ver os profissionais disponíveis na sua cidade.${CTA}`,
      tags: ['encanador', 'avaliação', slug],
    },
    {
      id: `${slug}-c06`, categoria: 'localidade',
      pergunta: `Como chamar desentupidora em ${nome} pelo WhatsApp?`,
      resposta: `Para solicitar desentupidora em ${nome} pelo WhatsApp, siga estes passos: 1) Acesse o Serviços no Bairro e busque "${nome}"; 2) Escolha uma empresa com boas avaliações; 3) Clique no botão "WhatsApp" no perfil da empresa; 4) Informe: tipo de problema, endereço em ${nome}, urgência e nome para contato; 5) Aguarde a confirmação do orçamento e horário de chegada. Você também pode mandar mensagem diretamente para (41) 98517-1966 informando que precisa de atendimento em ${nome}.${CTA}`,
      tags: ['whatsapp', 'solicitar', slug],
    },
    {
      id: `${slug}-c07`, categoria: 'tecnico',
      pergunta: `Limpa fossa em ${nome}/PR — empresas disponíveis?`,
      resposta: `Sim! Temos empresas com caminhão limpa-fossa que atendem ${nome} e região. O serviço inclui sucção completa da fossa séptica, transporte e descarte adequado dos resíduos conforme normas ambientais. Preço médio: R$ 300 a R$ 800, variando conforme o volume da fossa. A limpeza deve ser feita a cada 1-3 anos ou quando houver sinais de fossa cheia: mau cheiro, escoamento lento, borbulhamento ou extravasamento.${CTA}`,
      tags: ['fossa', 'limpeza', slug],
    },
    {
      id: `${slug}-c08`, categoria: 'tecnico',
      pergunta: `Hidrojateamento está disponível em ${nome}/PR?`,
      resposta: `Sim! O serviço de hidrojateamento está disponível em ${nome} através de empresas parceiras do Serviços no Bairro. O hidrojateamento utiliza jato de água em alta pressão (até 4.000 PSI) para limpar tubulações de esgoto, removendo gordura acumulada, raízes e incrustações. É o método mais eficaz para tubulações com diâmetro acima de 75mm. Custo médio em ${nome}: R$ 400 a R$ 900. Ideal para manutenção preventiva e entupimentos graves.${CTA}`,
      tags: ['hidrojateamento', slug],
    },
    {
      id: `${slug}-c09`, categoria: 'tecnico',
      pergunta: `Serviço de câmera de inspeção em ${nome}/PR?`,
      resposta: `Sim! Empresas com câmera de inspeção de esgoto (videoscopia) atendem ${nome}. A câmera permite visualizar o interior da tubulação em tempo real, identificando: ponto exato do entupimento, rachaduras, junções deslocadas, raízes invasoras e desgaste da tubulação. Custo: R$ 250 a R$ 600. O laudo da inspeção pode ser gravado em vídeo e entregue ao cliente. Serviço recomendado antes de comprar imóvel usado ou em entupimentos recorrentes.${CTA}`,
      tags: ['câmera', 'inspeção', slug],
    },
    {
      id: `${slug}-c10`, categoria: 'localidade',
      pergunta: `Desentupidora de Curitiba atende ${nome}/PR?`,
      resposta: `Sim! A maioria das desentupidoras de grande porte de Curitiba atende ${nome} e toda a Região Metropolitana. Com ${distanciaKm}km de distância, ${nome} está dentro da área de cobertura regular. O deslocamento leva em média ${Math.ceil(distanciaKm * 1.5)} minutos em condições normais de trânsito. No Serviços no Bairro, filtre por "${nome}" para ver todas as empresas que confirmaram atendimento na sua cidade. Para emergências, ligue diretamente para agilizar.${CTA}`,
      tags: ['curitiba', 'atendimento', slug],
    },
  ];
}

function gerarTodosFaqCidades(): Record<string, FaqCidadeData> {
  const result: Record<string, FaqCidadeData> = {};
  const todas = [...cidadesRMC, ...entornoAmplo];

  for (const cidade of todas) {
    result[cidade.slug] = {
      cidade: cidade.nome,
      distancia: `${cidade.distanciaKm}km de Curitiba`,
      perguntas: gerarPerguntasCidade(cidade.nome, cidade.slug, cidade.distanciaKm),
    };
  }

  return result;
}

export const faqPorCidade = gerarTodosFaqCidades();

export function getFaqCidade(slug: string): FaqCidadeItem[] {
  return faqPorCidade[slug]?.perguntas || [];
}
