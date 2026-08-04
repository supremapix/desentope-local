/**
 * Câmera de inspeção de esgoto — conteúdo editorial do silo.
 *
 * Página pilar: /servicos/camera-inspecao-esgoto-curitiba
 * Páginas locais: /camera-inspecao-esgoto/:local
 *
 * Regra editorial: cada local recebe contexto próprio (rede, solo, perfil de
 * imóvel e problemas mais comuns) para evitar conteúdo duplicado.
 */

import { cidadesRMC } from './cidades-rmc';

export interface EtapaProcesso {
  titulo: string;
  descricao: string;
}

export interface CardConteudo {
  titulo: string;
  descricao: string;
}

export interface CameraFAQ {
  pergunta: string;
  resposta: string;
  categoria?: string;
}

export interface LocalInspecao {
  slug: string;
  nome: string;
  tipo: 'cidade' | 'bairro';
  /** Resposta direta 40-60 palavras (AEO/GEO) */
  respostaDireta: string;
  contexto: string[];
  problemasComuns: string[];
  prioridade: number;
}

/** Resposta direta da página pilar — formato citável por IA. */
export const respostaDiretaPilar =
  'A câmera de inspeção de esgoto em Curitiba é um exame por vídeo que percorre o interior da tubulação e mostra, em tempo real e em alta resolução, onde está o entupimento, a rachadura, a raiz ou o afundamento. O diagnóstico é feito sem quebrar piso ou parede e custa, em média, de R$ 200 a R$ 600.';

export const comoFunciona: EtapaProcesso[] = [
  {
    titulo: 'Introdução da câmera',
    descricao:
      'O técnico escolhe o ponto de acesso mais próximo do problema — caixa de inspeção, caixa de gordura, ralo, vaso removido ou tubo de queda — e introduz a haste flexível com o cabeçote de vídeo na boca da tubulação.',
  },
  {
    titulo: 'Percurso interno da tubulação',
    descricao:
      'O cabo avança pelo ramal acompanhando curvas, joelhos e conexões. Em redes residenciais o alcance típico é de 30 a 60 metros; em redes prediais e industriais, equipamentos robotizados chegam a 100 metros ou mais.',
  },
  {
    titulo: 'Gravação em vídeo HD',
    descricao:
      'Todo o percurso é gravado. A iluminação LED do cabeçote revela incrustações de gordura, trincas, deslocamento de junta, raízes, esmagamento do tubo e trechos com contra-caimento (água parada).',
  },
  {
    titulo: 'Localização eletrônica do ponto',
    descricao:
      'O sonda-transmissor embutido na câmera emite sinal captado por um receptor na superfície. Isso marca no piso, com precisão de centímetros, a posição e a profundidade exata do defeito — evitando quebra exploratória.',
  },
  {
    titulo: 'Relatório e vídeo entregues',
    descricao:
      'Você recebe o vídeo da inspeção e um relatório técnico com metragem, tipo de material do tubo, defeito encontrado e fotos dos trechos críticos. Esse documento serve para condomínio, seguradora, obra e negociação com construtora.',
  },
  {
    titulo: 'Indicação da solução ideal',
    descricao:
      'Com o diagnóstico em mãos, define-se o que realmente resolve: hidrojateamento, corte de raízes, troca de um trecho pontual, correção de caimento ou apenas manutenção preventiva — sem obra desnecessária.',
  },
];

export const quandoUtilizar: CardConteudo[] = [
  { titulo: 'Água voltando pelo ralo', descricao: 'Retorno de água ou esgoto em ralos e vaso indica obstrução no ramal coletor. A câmera mostra se o bloqueio é interno ou está na rede pública.' },
  { titulo: 'Ralo entupido com frequência', descricao: 'Entupimento que volta poucas semanas depois da desobstrução quase sempre esconde um defeito estrutural no tubo.' },
  { titulo: 'Mau cheiro constante', descricao: 'Odor de esgoto sem causa aparente pode vir de tubo trincado, junta aberta ou sifão seco. A inspeção localiza a origem.' },
  { titulo: 'Tubulação antiga', descricao: 'Imóveis com tubo de barro, cimento amianto ou ferro fundido merecem inspeção antes de reforma para saber o estado real da rede.' },
  { titulo: 'Raízes de árvore', descricao: 'Raízes entram por juntas e formam novelos dentro do cano. O vídeo mostra a extensão da invasão e se o tubo já foi rompido.' },
  { titulo: 'Entupimento recorrente', descricao: 'Quando o mesmo trecho entope sempre, a câmera identifica contra-caimento, degrau de junta ou esmagamento como causa real.' },
  { titulo: 'Infiltração em parede ou piso', descricao: 'Mancha de umidade, bolha na pintura e piso frio podem vir de vazamento de esgoto oculto sob o contrapiso.' },
  { titulo: 'Afundamento de piso ou calçada', descricao: 'Solo cedendo em cima da linha de esgoto costuma indicar tubo rompido lavando o aterro ao redor.' },
  { titulo: 'Vazamento sem ponto visível', descricao: 'Combinada com a caça-vazamentos, a inspeção diferencia vazamento de água limpa de rompimento de esgoto.' },
  { titulo: 'Compra, laudo ou vistoria', descricao: 'Antes de comprar imóvel, receber obra ou fechar reforma, o vídeo documenta o estado da rede e evita prejuízo depois.' },
];

export const beneficios: CardConteudo[] = [
  { titulo: 'Sem quebrar piso', descricao: 'O diagnóstico é 100% não destrutivo: nada de abrir parede, piso ou calçada em busca do problema.' },
  { titulo: 'Economia real', descricao: 'Você conserta só o trecho defeituoso, em vez de trocar a rede inteira ou pagar desentupimentos repetidos.' },
  { titulo: 'Precisão centimétrica', descricao: 'A localização eletrônica marca o ponto e a profundidade exata do defeito na superfície.' },
  { titulo: 'Imagem em alta definição', descricao: 'Câmeras HD com iluminação LED mostram trincas finas, incrustação e deslocamento de junta com nitidez.' },
  { titulo: 'Gravação do percurso', descricao: 'Todo o trajeto é gravado e entregue, permitindo segunda opinião técnica sem refazer o serviço.' },
  { titulo: 'Relatório técnico', descricao: 'Documento com metragem, material, defeito e recomendação — aceito por condomínios e seguradoras.' },
  { titulo: 'Diagnóstico completo', descricao: 'Uma única inspeção avalia ramais, coluna predial, caixa de gordura, caixa de inspeção e rede pluvial.' },
  { titulo: 'Atendimento rápido', descricao: 'Equipes atendem Curitiba e RMC no mesmo dia, inclusive em emergência 24 horas.' },
  { titulo: 'Equipe especializada', descricao: 'Operadores treinados em leitura de imagem sabem diferenciar sujeira temporária de dano estrutural.' },
  { titulo: 'Equipamento profissional', descricao: 'Cabeçote autonivelante, haste de fibra e sonda transmissora de 512 Hz — padrão usado em rede pública.' },
];

export const problemasEncontrados: CardConteudo[] = [
  { titulo: 'Rachaduras e trincas', descricao: 'Fissuras longitudinais em PVC e barro que vazam esgoto para o solo e provocam infiltração.' },
  { titulo: 'Raízes dentro do cano', descricao: 'Novelos de raiz que entram por junta aberta e retêm papel e gordura até fechar a seção do tubo.' },
  { titulo: 'Desníveis e contra-caimento', descricao: 'Trechos onde a água fica parada por falta de declividade, acelerando o acúmulo de resíduo.' },
  { titulo: 'Afundamento (barriga)', descricao: 'Depressão no tubo causada por recalque do solo — ponto clássico de entupimento repetido.' },
  { titulo: 'Tubo de concreto deteriorado', descricao: 'Corrosão por gás sulfídrico que descasca a parede interna e solta material dentro da linha.' },
  { titulo: 'PVC deformado', descricao: 'Tubo ovalizado por peso de aterro, tráfego ou compactação inadequada na obra.' },
  { titulo: 'Ferro fundido corroído', descricao: 'Incrustação e escamas de ferrugem que reduzem o diâmetro útil e prendem resíduo.' },
  { titulo: 'Manilha de barro quebrada', descricao: 'Comum em imóveis antigos de Curitiba: junta descolada, caco solto e infiltração de terra.' },
  { titulo: 'Obstruções sólidas', descricao: 'Massa de cimento, argamassa e entulho deixados por obra dentro da tubulação.' },
  { titulo: 'Gordura solidificada', descricao: 'Camada dura que fecha a seção em ramais de cozinha, restaurantes e caixas de gordura.' },
  { titulo: 'Objetos estranhos', descricao: 'Panos, fraldas, lenços umedecidos, brinquedos e absorventes travados em curvas.' },
  { titulo: 'Infiltração de lençol freático', descricao: 'Entrada de água pelo tubo danificado, que sobrecarrega a fossa e a rede coletora.' },
  { titulo: 'Quebras por obra vizinha', descricao: 'Tubo perfurado por estaca, poste ou escavação de terceiros.' },
  { titulo: 'Conexões mal executadas', descricao: 'Joelho de 90° indevido, emenda desalinhada e degrau de junta que travam o fluxo.' },
  { titulo: 'Tubulação esmagada', descricao: 'Colapso total do tubo sob passagem de veículos ou peso de laje — exige troca do trecho.' },
];

export const tecnologia: CardConteudo[] = [
  { titulo: 'Câmera HD colorida', descricao: 'Sensor de alta resolução que registra detalhe de trinca fina mesmo com o tubo parcialmente úmido.' },
  { titulo: 'Iluminação LED regulável', descricao: 'Anel de LEDs no cabeçote com intensidade ajustável para tubos escuros de ferro e concreto.' },
  { titulo: 'Cabeçote giratório e autonivelante', descricao: 'Permite girar a visão 360°, olhar a lateral da junta e manter a imagem sempre na horizontal.' },
  { titulo: 'Gravação em vídeo e fotos', descricao: 'Arquivo digital com contador de metragem sobreposto à imagem, entregue ao cliente.' },
  { titulo: 'Sonda de localização 512 Hz', descricao: 'Transmissor no cabeçote lido por receptor na superfície: aponta posição e profundidade.' },
  { titulo: 'Mapeamento do traçado', descricao: 'Marcação do caminho real da tubulação no piso ou terreno, útil para obras e projetos as-built.' },
  { titulo: 'Diagnóstico eletrônico integrado', descricao: 'Combinação com geofone e correlacionador quando o caso envolve vazamento de água limpa.' },
  { titulo: 'Método não destrutivo', descricao: 'Nenhuma etapa exige demolição: a decisão de abrir só acontece depois do defeito confirmado.' },
];

export const antesDepois: { titulo: string; antes: string; depois: string }[] = [
  {
    titulo: 'Ramal de cozinha com gordura',
    antes: 'Imagem mostra parede interna coberta por camada de gordura endurecida, com passagem reduzida a cerca de 20% do diâmetro.',
    depois: 'Após hidrojateamento, o vídeo confirma tubo limpo, parede lisa e escoamento livre em toda a extensão inspecionada.',
  },
  {
    titulo: 'Raiz em manilha de barro',
    antes: 'Novelo de raízes ocupando a junta a 7 metros da caixa de inspeção, retendo papel e provocando retorno no ralo.',
    depois: 'Corte mecânico da raiz e substituição de 1,5 m de tubo no ponto marcado pela sonda, sem abrir o restante do quintal.',
  },
  {
    titulo: 'Afundamento sob o piso da garagem',
    antes: 'Trecho com água parada por contra-caimento, provocando entupimento a cada dois meses mesmo após desentupir.',
    depois: 'Correção da declividade em 2 metros localizados; nova inspeção mostra escoamento contínuo e fim da recorrência.',
  },
];

export const processo: EtapaProcesso[] = [
  { titulo: 'Diagnóstico inicial', descricao: 'Conversa técnica sobre sintomas, idade do imóvel, histórico de entupimentos e pontos de acesso disponíveis.' },
  { titulo: 'Inspeção por câmera', descricao: 'Percurso gravado do ramal, coluna ou rede pluvial, com avaliação de material, incrustação e integridade.' },
  { titulo: 'Localização do ponto', descricao: 'Marcação na superfície da posição e profundidade exatas do defeito com sonda eletrônica.' },
  { titulo: 'Relatório técnico', descricao: 'Entrega do vídeo, das imagens críticas e do parecer com metragens e recomendação de solução.' },
  { titulo: 'Execução da solução', descricao: 'Hidrojateamento, corte de raiz, troca pontual ou plano preventivo — sempre com reinspeção ao final.' },
];

export const publicosAtendidos: CardConteudo[] = [
  { titulo: 'Residências', descricao: 'Casas e sobrados com ramal de esgoto no quintal, garagem ou área de serviço.' },
  { titulo: 'Condomínios', descricao: 'Prumadas, colunas de esgoto, ramais coletivos e galerias pluviais de prédios residenciais.' },
  { titulo: 'Empresas e escritórios', descricao: 'Redes internas de banheiros coletivos e copas em edifícios comerciais.' },
  { titulo: 'Indústrias', descricao: 'Redes de efluente, canaletas e caixas separadoras com inspeção de grande diâmetro.' },
  { titulo: 'Comércios', descricao: 'Lojas, padarias e mercados com ramais sujeitos a alta carga de gordura e resíduo.' },
  { titulo: 'Hospitais e clínicas', descricao: 'Inspeção programada com mínima interferência na operação e registro documental do laudo.' },
  { titulo: 'Escolas e creches', descricao: 'Vistoria preventiva em períodos de recesso para evitar interdição de banheiros em aula.' },
  { titulo: 'Restaurantes', descricao: 'Diagnóstico de caixa de gordura e ramal de cozinha antes da fiscalização sanitária.' },
  { titulo: 'Shopping centers', descricao: 'Redes extensas com múltiplos pontos de acesso e necessidade de mapeamento as-built.' },
];

export const tabelaPrecos: { servico: string; preco: string }[] = [
  { servico: 'Inspeção por câmera — ramal residencial (até 30 m)', preco: 'R$ 200 a R$ 400' },
  { servico: 'Inspeção por câmera — ramal estendido (30 a 60 m)', preco: 'R$ 350 a R$ 600' },
  { servico: 'Inspeção predial (coluna/prumada de condomínio)', preco: 'R$ 500 a R$ 1.200' },
  { servico: 'Inspeção com relatório técnico e vídeo completo', preco: 'R$ 350 a R$ 800' },
  { servico: 'Inspeção industrial ou rede de grande diâmetro', preco: 'Sob consulta' },
  { servico: 'Inspeção + hidrojateamento (combinado)', preco: 'R$ 600 a R$ 1.500' },
  { servico: 'Adicional noturno, feriado ou emergência', preco: '+30% a +50%' },
];

export const faqCameraInspecao: CameraFAQ[] = [
  { pergunta: 'Como funciona a câmera de inspeção de esgoto?', resposta: 'Uma câmera de vídeo montada em haste flexível é introduzida na tubulação por um ponto de acesso e percorre o interior do cano transmitindo imagem em tempo real. O técnico avalia o trecho, grava o percurso e marca na superfície o ponto exato de qualquer defeito.', categoria: 'tecnico' },
  { pergunta: 'Quanto custa uma câmera de inspeção em Curitiba?', resposta: 'A faixa praticada em Curitiba em 2026 é de R$ 200 a R$ 600 para ramal residencial e de R$ 500 a R$ 1.200 para inspeção predial de condomínio. O valor varia com a metragem, o acesso e a entrega ou não de relatório técnico formal.', categoria: 'precos' },
  { pergunta: 'Precisa quebrar piso ou parede para inspecionar?', resposta: 'Não. A inspeção é um método não destrutivo: a câmera entra por caixa de inspeção, caixa de gordura, ralo ou tubo de queda já existentes. A quebra só é considerada depois, e apenas no ponto exato marcado pela sonda, se o reparo exigir.', categoria: 'tecnico' },
  { pergunta: 'Quanto tempo demora a inspeção?', resposta: 'Uma inspeção residencial típica leva de 40 minutos a 2 horas, incluindo preparação, percurso, localização eletrônica e explicação do resultado. Redes prediais e industriais podem exigir meio período ou mais, conforme o número de ramais.', categoria: 'tecnico' },
  { pergunta: 'A câmera detecta vazamento de esgoto?', resposta: 'Sim. O vídeo mostra trincas, juntas abertas e furos por onde o esgoto escapa para o solo, além de trechos com entrada de água externa. Para vazamento de água limpa pressurizada, o método complementar é a caça-vazamentos com geofone.', categoria: 'tecnico' },
  { pergunta: 'A inspeção detecta raiz dentro do cano?', resposta: 'Sim, e é uma das aplicações mais comuns em bairros arborizados de Curitiba. A imagem mostra o novelo de raiz, a junta por onde entrou e o quanto da seção do tubo já foi tomada, permitindo decidir entre corte mecânico e troca do trecho.', categoria: 'tecnico' },
  { pergunta: 'A câmera identifica rachadura no tubo?', resposta: 'Identifica trincas longitudinais, fissuras em junta, tubo ovalizado e colapso parcial. Com boa iluminação LED e cabeçote giratório, é possível ver fissuras finas e o deslocamento de conexões que provocam infiltração.', categoria: 'tecnico' },
  { pergunta: 'Serve para condomínio e prédio?', resposta: 'Sim. Em condomínios a inspeção avalia prumadas, colunas de esgoto, ramais coletivos, galeria pluvial e subsolo. O relatório em vídeo costuma ser exigido em assembleia e ajuda o síndico a justificar orçamento de manutenção.', categoria: 'localidade' },
  { pergunta: 'Serve para empresa, indústria e comércio?', resposta: 'Serve. Restaurantes, padarias, hospitais, escolas, indústrias e shoppings usam a inspeção tanto de forma preventiva quanto para instruir laudos, vistorias sanitárias e obras de ampliação.', categoria: 'localidade' },
  { pergunta: 'A inspeção grava vídeo?', resposta: 'Sim. O percurso é gravado e entregue em arquivo digital, normalmente com contador de metragem sobreposto à imagem. Isso permite revisão posterior e segunda opinião técnica sem refazer o serviço.', categoria: 'depois' },
  { pergunta: 'É emitido laudo ou relatório técnico?', resposta: 'Empresas sérias entregam relatório com data, ponto de acesso, metragem percorrida, material da tubulação, defeitos encontrados, imagens dos trechos críticos e recomendação de solução. Confirme a entrega do documento no orçamento.', categoria: 'depois' },
  { pergunta: 'Atende emergência e finais de semana?', resposta: 'Sim, há equipes com plantão 24 horas em Curitiba e Região Metropolitana. Atendimentos noturnos, em feriados e fora do horário comercial costumam ter acréscimo de 30% a 50% sobre a tabela normal.', categoria: 'emergencia' },
  { pergunta: 'Funciona em tubulação muito antiga?', resposta: 'Funciona, e é justamente onde mais agrega valor. Em manilhas de barro, cimento amianto e ferro fundido de imóveis antigos, a imagem revela o estado real do material antes de qualquer decisão de reforma.', categoria: 'tecnico' },
  { pergunta: 'Qual é o diâmetro mínimo e máximo inspecionável?', resposta: 'Cabeçotes pequenos entram a partir de 40 mm, adequados para ramais de pia e lavatório. Cabeçotes maiores e robôs autopropelidos cobrem de 100 mm até galerias com mais de 600 mm.', categoria: 'tecnico' },
  { pergunta: 'Qual é o alcance da câmera?', resposta: 'Em equipamentos de haste flexível o alcance usual é de 30 a 60 metros. Sistemas robotizados com carretel motorizado alcançam 100 metros ou mais, dependendo de curvas e do estado interno do tubo.', categoria: 'tecnico' },
  { pergunta: 'Precisa desentupir antes de inspecionar?', resposta: 'Depende. Se o tubo está totalmente obstruído, a câmera não avança e a desobstrução vem primeiro. O ideal é desentupir, inspecionar em seguida e descobrir a causa — evitando que o mesmo problema volte em semanas.', categoria: 'antes' },
  { pergunta: 'A inspeção resolve o entupimento?', resposta: 'A inspeção diagnostica; ela não desobstrui. O que resolve é o serviço indicado pelo diagnóstico: hidrojateamento, rotosonda, corte de raiz, troca pontual ou correção de caimento.', categoria: 'antes' },
  { pergunta: 'Vale a pena inspecionar antes de comprar um imóvel?', resposta: 'Vale, principalmente em casas com mais de 20 anos. Descobrir tubo de barro rompido ou rede com afundamento antes da escritura muda a negociação e evita uma obra de milhares de reais logo após a mudança.', categoria: 'antes' },
  { pergunta: 'Vale a pena antes de uma reforma?', resposta: 'Sim. Inspecionar antes de assentar piso novo ou fechar contrapiso evita a pior situação possível: quebrar acabamento recém-instalado meses depois para corrigir um defeito que já existia.', categoria: 'antes' },
  { pergunta: 'A câmera diferencia problema meu de problema da rede pública?', resposta: 'Sim. Ao percorrer até a caixa de calçada é possível ver se a obstrução está dentro do lote (responsabilidade do proprietário) ou no coletor público, caso em que a Sanepar deve ser acionada sem custo para o morador.', categoria: 'legal' },
  { pergunta: 'A inspeção serve como prova em seguro ou disputa?', resposta: 'O vídeo com data e o relatório técnico são amplamente aceitos por seguradoras, administradoras e em discussões com construtoras. Peça o arquivo original e não apenas capturas de tela.', categoria: 'legal' },
  { pergunta: 'Preciso estar presente durante a inspeção?', resposta: 'É recomendável. Acompanhar a tela permite ver o defeito no momento em que aparece e tirar dúvidas sobre a solução. Se não puder, exija a entrega do vídeo completo.', categoria: 'durante' },
  { pergunta: 'A inspeção suja ou danifica a casa?', resposta: 'Não. O trabalho ocorre pelos pontos de acesso existentes, com proteção da área. Não há demolição, poeira de quebra nem remoção de revestimento durante o diagnóstico.', categoria: 'durante' },
  { pergunta: 'Dá para inspecionar rede pluvial e de águas de chuva?', resposta: 'Dá. Calhas subterrâneas, galerias pluviais e drenos de garagem são inspecionados do mesmo modo, o que é comum em imóveis que alagam mesmo com chuva moderada.', categoria: 'tecnico' },
  { pergunta: 'Dá para inspecionar fossa e sumidouro?', resposta: 'Os ramais que chegam à fossa e o tubo de saída para o sumidouro podem ser inspecionados. O interior da fossa, por conter gases tóxicos, é avaliado por procedimento próprio com equipe de limpa fossa.', categoria: 'tecnico' },
  { pergunta: 'Com que frequência fazer inspeção preventiva?', resposta: 'Residências sem histórico de problema: a cada 3 a 5 anos. Condomínios e imóveis antigos: a cada 2 anos. Restaurantes e cozinhas industriais: anualmente, junto com a limpeza da caixa de gordura.', categoria: 'antes' },
  { pergunta: 'O que fazer depois de descobrir um tubo rompido?', resposta: 'Com o ponto marcado, o reparo é localizado: abre-se apenas o trecho indicado, troca-se o segmento danificado e faz-se nova inspeção para confirmar o resultado antes de fechar o piso.', categoria: 'depois' },
  { pergunta: 'Existe garantia do serviço de inspeção?', resposta: 'A garantia usual cobre a fidelidade do diagnóstico e a reinspeção do trecho após o reparo. Confirme por escrito o que está incluso: nova visita, vídeo adicional e prazo de cobertura.', categoria: 'depois' },
  { pergunta: 'Qual a diferença entre vídeo inspeção e hidrojateamento?', resposta: 'A vídeo inspeção é diagnóstico: mostra o que existe dentro do cano. O hidrojateamento é tratamento: usa água a alta pressão para remover gordura, incrustação e resíduo. Um mostra o problema, o outro resolve.', categoria: 'tecnico' },
  { pergunta: 'Qual a diferença entre inspeção e caça-vazamentos?', resposta: 'A inspeção por câmera atua dentro de tubulações de esgoto e pluvial, sem pressão. A caça-vazamentos usa geofone e gás traçador para achar vazamento em tubulação de água pressurizada embutida em piso ou parede.', categoria: 'tecnico' },
  { pergunta: 'Atende Curitiba inteira e a Região Metropolitana?', resposta: 'Sim. Há profissionais cadastrados para todos os 75 bairros de Curitiba e para as cidades da RMC, incluindo CIC, Batel, Piraquara, São José dos Pinhais, Pinhais, Colombo, Araucária, Campo Largo, Quatro Barras, Campina Grande do Sul, Almirante Tamandaré, Fazenda Rio Grande e Campo Magro.', categoria: 'localidade' },
  { pergunta: 'Como contratar sem cair em golpe?', resposta: 'Peça CNPJ, orçamento por escrito antes da visita, confirme se o vídeo e o relatório estão inclusos e desconfie de quem indica troca de rede inteira sem apresentar imagem do defeito. Diagnóstico sério mostra a evidência na tela.', categoria: 'antes' },
];

const locaisPrioritarios: LocalInspecao[] = [
  {
    slug: 'curitiba',
    nome: 'Curitiba',
    tipo: 'cidade',
    respostaDireta: respostaDiretaPilar,
    contexto: [
      'Curitiba combina bairros centenários com ocupação vertical recente, e isso define o tipo de defeito que a câmera encontra. Nas regiões consolidadas do eixo central, boa parte dos ramais internos ainda é de manilha de barro ou ferro fundido, materiais que trincam nas juntas e abrem caminho para raiz e infiltração.',
      'Nos bairros de expansão, o problema típico é outro: tubo de PVC recente instalado com caimento irregular ou esmagado por aterro mal compactado. Em ambos os casos, a inspeção por vídeo separa entupimento passageiro de dano estrutural antes de qualquer obra.',
      'A rede coletora da Sanepar cobre a maior parte da cidade, o que torna importante identificar em qual lado da caixa de calçada está a obstrução: dentro do lote é responsabilidade do proprietário; no coletor público, o atendimento é da concessionária.',
    ],
    problemasComuns: ['Raízes em manilha de barro nos bairros arborizados', 'Gordura solidificada em ramais de cozinha', 'Contra-caimento em reformas mal executadas', 'Prumadas de condomínio com incrustação'],
    prioridade: 1,
  },
  {
    slug: 'cic',
    nome: 'CIC (Cidade Industrial)',
    tipo: 'bairro',
    respostaDireta:
      'A câmera de inspeção de esgoto no CIC diagnostica, sem quebra, entupimentos e danos de tubulação em residências, vilas e galpões da Cidade Industrial de Curitiba. O vídeo mostra gordura, raiz, esmagamento e afundamento, e a sonda marca o ponto exato no piso. Faixa usual: R$ 200 a R$ 600.',
    contexto: [
      'O CIC é o maior bairro de Curitiba em área e mistura parque industrial, conjuntos habitacionais e dezenas de vilas — Neoville, Vila Sandra, Vila Caiuá, Vila Sabará, entre outras. Essa diversidade cria dois cenários de inspeção bem distintos.',
      'Nas áreas industriais e de galpões, a inspeção normalmente envolve redes de efluente de diâmetro maior, caixas separadoras e pisos submetidos a tráfego pesado de caminhão — condição que provoca ovalização e esmagamento de tubo enterrado raso.',
      'Nas vilas e conjuntos residenciais, predominam ramais curtos de PVC com caimento irregular e ligações feitas em mutirão ao longo dos anos, com emendas improvisadas e degraus de junta que retêm resíduo. A câmera evita abrir todo o quintal para achar o trecho errado.',
    ],
    problemasComuns: ['Tubulação esmagada por tráfego de caminhão', 'Emendas improvisadas em ampliações residenciais', 'Alta carga de gordura em cozinhas industriais e refeitórios', 'Caixas separadoras e redes de efluente saturadas'],
    prioridade: 1,
  },
  {
    slug: 'batel',
    nome: 'Batel',
    tipo: 'bairro',
    respostaDireta:
      'A câmera de inspeção de esgoto no Batel avalia prumadas, colunas e ramais de prédios residenciais e comerciais sem quebrar acabamento. O vídeo identifica incrustação, junta deslocada e trecho rompido em edifícios antigos e novos, e o relatório serve para assembleia de condomínio. Faixa usual: R$ 200 a R$ 1.200.',
    contexto: [
      'O Batel é predominantemente vertical, com edifícios de décadas diferentes convivendo lado a lado. Em prédios das décadas de 1970 e 1980, as prumadas originais de ferro fundido apresentam incrustação e escamas que reduzem o diâmetro útil e provocam retorno nos andares baixos.',
      'Nos empreendimentos mais recentes, o problema típico não é o material e sim o uso: descarte de gordura e resíduo sólido em unidades e restaurantes do térreo, que se acumula nos coletores horizontais do subsolo.',
      'Por ser um bairro de alto padrão com acabamentos caros, o custo de uma quebra exploratória é alto — porcelanato, mármore e forro embutido. É exatamente onde o diagnóstico não destrutivo mais se paga, além de gerar o relatório que o síndico leva à assembleia.',
    ],
    problemasComuns: ['Prumadas de ferro fundido incrustadas', 'Coletores de subsolo com gordura de restaurantes', 'Retorno de esgoto nos andares inferiores', 'Necessidade de laudo técnico para condomínio'],
    prioridade: 1,
  },
  {
    slug: 'piraquara',
    nome: 'Piraquara',
    tipo: 'cidade',
    respostaDireta:
      'A câmera de inspeção de esgoto em Piraquara localiza entupimentos, raízes e rompimentos em imóveis com rede coletora e também nos que dependem de fossa e sumidouro. A inspeção é feita sem quebra, com vídeo e marcação do ponto no terreno. Faixa usual em Piraquara: R$ 250 a R$ 650.',
    contexto: [
      'Piraquara está em área de mananciais, com grande parte do território sob restrição ambiental e boa parcela dos imóveis ainda atendida por fossa séptica e sumidouro em vez de rede coletora. Isso muda o foco da inspeção.',
      'Nesses imóveis, a câmera avalia o ramal que chega à fossa e o tubo de saída para o sumidouro — trechos onde o entupimento costuma se confundir com fossa saturada. Diferenciar as duas situações evita pagar limpa fossa quando o problema é um tubo rompido, e vice-versa.',
      'Terrenos com lençol freático alto e solo argiloso favorecem infiltração de água externa pelo tubo danificado, sobrecarregando a fossa. A vegetação abundante da região também torna a invasão de raízes um achado frequente nas juntas.',
    ],
    problemasComuns: ['Confusão entre fossa saturada e ramal rompido', 'Entrada de lençol freático por tubo trincado', 'Raízes em áreas de vegetação densa', 'Sumidouro colmatado por resíduo do ramal'],
    prioridade: 1,
  },
];

const contextosCidade: Record<string, { resumo: string; problemas: string[] }> = {
  'sao-jose-dos-pinhais': {
    resumo:
      'São José dos Pinhais combina centro urbano consolidado, distritos industriais e áreas rurais. A inspeção alterna entre ramais residenciais antigos no centro, redes de efluente em indústrias e diagnósticos de fossa em bairros sem coletor.',
    problemas: ['Redes industriais de efluente', 'Ramais antigos na região central', 'Imóveis rurais com fossa e sumidouro'],
  },
  pinhais: {
    resumo:
      'Pinhais é a menor cidade do Paraná em área e uma das mais densas, com ocupação compacta e lotes pequenos. Ramais curtos passando sob garagens e áreas cimentadas tornam a marcação eletrônica do ponto essencial antes de qualquer quebra.',
    problemas: ['Ramais sob garagem e piso cimentado', 'Lotes pequenos com pouco acesso', 'Rede pluvial sobrecarregada em chuvas'],
  },
  colombo: {
    resumo:
      'Colombo tem forte presença de solo cárstico e relevo acidentado, além de bairros de crescimento rápido na divisa com Curitiba. Recalque de solo e afundamento de trecho enterrado aparecem com frequência nas inspeções.',
    problemas: ['Recalque de solo e afundamento de tubo', 'Bairros de expansão com rede recente mal assentada', 'Raízes em áreas de chácara'],
  },
  araucaria: {
    resumo:
      'Araucária concentra polo industrial e refinaria ao lado de bairros residenciais. As inspeções vão de redes industriais de grande diâmetro a ramais residenciais em loteamentos com aterro recente.',
    problemas: ['Redes industriais de grande diâmetro', 'Loteamentos com aterro compactado de forma irregular', 'Caixas separadoras em oficinas e postos'],
  },
  'campo-largo': {
    resumo:
      'Campo Largo tem território extenso com distritos afastados e presença histórica de cerâmica e olaria. Muitas casas mantêm manilha de barro em ramais antigos, material que trinca e abre junta com facilidade.',
    problemas: ['Manilha de barro em imóveis antigos', 'Distritos afastados sem rede coletora', 'Solo argiloso com movimentação'],
  },
  'quatro-barras': {
    resumo:
      'Quatro Barras fica no pé da Serra do Mar, com muita vegetação e chuvas intensas. Invasão de raízes e entrada de água de chuva em redes de esgoto são achados recorrentes na inspeção.',
    problemas: ['Raízes de mata nativa nas juntas', 'Entrada de água pluvial na rede de esgoto', 'Terrenos em declive com caimento irregular'],
  },
  'campina-grande-do-sul': {
    resumo:
      'Campina Grande do Sul mistura área urbana concentrada e grandes porções rurais. Boa parte dos imóveis fora do centro depende de fossa, o que direciona a inspeção para ramais e saída de sumidouro.',
    problemas: ['Imóveis rurais com fossa e sumidouro', 'Ramais longos até a caixa de inspeção', 'Raízes e infiltração em áreas verdes'],
  },
  'almirante-tamandare': {
    resumo:
      'Almirante Tamandaré está sobre aquífero cárstico, com solo sujeito a dolinas e movimentação. Afundamento localizado do terreno sobre a linha de esgoto é uma ocorrência típica investigada por câmera.',
    problemas: ['Afundamento de terreno sobre a tubulação', 'Solo cárstico com movimentação', 'Ocupações com rede improvisada'],
  },
  'fazenda-rio-grande': {
    resumo:
      'Fazenda Rio Grande cresceu rapidamente por loteamentos residenciais. Redes recentes, mas assentadas com pressa, apresentam contra-caimento e degrau de junta que geram entupimento repetido.',
    problemas: ['Contra-caimento em loteamentos novos', 'Degrau de junta em emendas mal feitas', 'Ampliações residenciais sem projeto hidráulico'],
  },
  'campo-magro': {
    resumo:
      'Campo Magro tem perfil de chácaras e condomínios horizontais em área de manancial, com predomínio de fossa séptica e ramais longos atravessando terreno permeável.',
    problemas: ['Ramais longos em terreno de chácara', 'Fossa e sumidouro em vez de rede coletora', 'Raízes em vegetação abundante'],
  },
};

function localDeCidade(cidade: { slug: string; nome: string; distanciaKm: number }): LocalInspecao {
  const custom = contextosCidade[cidade.slug];
  const resumo =
    custom?.resumo ||
    `${cidade.nome} fica a cerca de ${cidade.distanciaKm} km de Curitiba e é atendida pelas mesmas equipes de inspeção por câmera que operam na capital. O deslocamento é combinado no orçamento e o diagnóstico segue o mesmo padrão: percurso gravado, localização eletrônica do ponto e relatório técnico.`;

  return {
    slug: cidade.slug,
    nome: cidade.nome,
    tipo: 'cidade',
    respostaDireta: `A câmera de inspeção de esgoto em ${cidade.nome} identifica entupimentos, raízes, trincas e afundamentos dentro da tubulação sem quebrar piso ou parede. O técnico grava o percurso, marca o ponto exato do defeito no terreno e entrega relatório com a solução recomendada. Faixa usual na região: R$ 250 a R$ 700.`,
    contexto: [
      resumo,
      `A inspeção em ${cidade.nome} atende casas, condomínios, comércios, indústrias e imóveis com fossa séptica. Em qualquer um deles o objetivo é o mesmo: descobrir a causa real antes de autorizar obra, e não desentupir repetidamente o mesmo trecho.`,
      `Depois do diagnóstico, o serviço indicado pode ser hidrojateamento, corte de raiz, troca pontual de um segmento ou apenas manutenção preventiva programada. Profissionais que atendem ${cidade.nome} estão cadastrados no diretório com avaliações verificadas.`,
    ],
    problemasComuns: custom?.problemas || ['Gordura acumulada em ramal de cozinha', 'Raízes em juntas de tubulação antiga', 'Contra-caimento provocando entupimento recorrente'],
    prioridade: custom ? 2 : 3,
  };
}

const slugsPrioritarios = new Set(locaisPrioritarios.map((l) => l.slug));

export const locaisInspecao: LocalInspecao[] = [
  ...locaisPrioritarios,
  ...cidadesRMC.filter((c) => !slugsPrioritarios.has(c.slug)).map(localDeCidade),
];

export function getLocalInspecao(slug?: string): LocalInspecao | undefined {
  if (!slug) return undefined;
  return locaisInspecao.find((l) => l.slug === slug);
}
