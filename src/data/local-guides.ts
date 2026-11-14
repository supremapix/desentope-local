/** Editorial guidance: no prices, rankings, travel times or equipment guarantees. */
export const hiringTopics = [
  { slug: 'desentupimento-pia-cozinha', title: 'Pia ou ralo com escoamento lento', text: 'Informe qual ponto está obstruído, quando começou e se outros ralos também apresentam retorno. Fotos do acesso ao sifão ou à caixa de gordura ajudam a empresa a entender o chamado, mas não substituem a avaliação.' },
  { slug: 'desentupimento-vaso-sanitario', title: 'Vaso sanitário entupido', text: 'Explique se houve queda de objeto e se a água sobe ao acionar a descarga. Evite insistir na descarga quando houver risco de transbordamento. Confirme o método de trabalho e se eventual retirada da louça entra no orçamento.' },
  { slug: 'desentupimento-esgoto-residencial', title: 'Retorno de esgoto no imóvel', text: 'Diga se o retorno aparece em um ponto ou em vários ambientes. Em condomínio, informe a administração e verifique quem autoriza acesso às áreas comuns. Um problema na rede pública deve ser comunicado à concessionária responsável.' },
  { slug: 'conserto-vazamento', title: 'Vazamento e reparo hidráulico', text: 'Diferencie água limpa vazando de água que não escoa. Informe onde a umidade aparece e se há registro acessível. Peça ao encanador que separe diagnóstico, reparo, peças e eventual recomposição de acabamento.' },
  { slug: 'hidrojateamento', title: 'Limpeza e diagnóstico da tubulação', text: 'Hidrojateamento e inspeção com câmera são recursos a avaliar, não a escolha automática para todo entupimento. Pergunte por que o método foi indicado, quais acessos serão necessários e se o registro do diagnóstico será entregue.' },
  { slug: 'limpa-fossa', title: 'Imóvel com fossa ou acesso para caminhão', text: 'Informe se há sistema individual de esgoto, onde fica o acesso e se o veículo pode entrar. Confirme com a empresa a capacidade necessária, a forma de cobrança e os comprovantes de transporte e destinação do material.' },
];

export function localQuestions(place: string) {
  return [
    { pergunta: `Como contratar encanador ou desentupidora em ${place}?`, resposta: `Escolha um perfil do guia, confira os serviços anunciados e use o contato da própria empresa. Informe ${place}, endereço, problema e urgência. O portal reúne prestadores independentes: negociação, disponibilidade e execução são combinadas com o escolhido.` },
    { pergunta: 'O atendimento é feito por uma única empresa?', resposta: 'Não. Cada cadastro representa uma empresa ou profissional e conserva seus próprios canais. A presença em uma página de localidade indica área de atendimento, não uma filial instalada naquele bairro.' },
    { pergunta: `Como saber o valor do serviço em ${place}?`, resposta: 'Peça proposta escrita com escopo, critério de medição, deslocamento, materiais e total previsto. Se a cobrança for por metro, hora ou volume, solicite como a quantidade será verificada e qual limite depende de nova autorização. Compare propostas para o mesmo serviço.' },
    { pergunta: 'Há plantão e chegada imediata?', resposta: 'Consulte o indicador de plantão no perfil e confirme a disponibilidade no momento do chamado. Cobertura do bairro não significa chegada imediata. Peça previsão real de deslocamento antes de autorizar a visita.' },
    { pergunta: 'O que fazer antes de pedir orçamento?', resposta: 'Separe fotos, descreva os pontos afetados, avise sobre intervenções anteriores e informe condições de acesso. Não misture produtos químicos e avise ao profissional se algum produto já foi utilizado. Evite contato com esgoto e mantenha crianças e animais afastados da área afetada.' },
    { pergunta: 'O que conferir ao finalizar o atendimento?', resposta: 'Peça demonstração do funcionamento, descrição do serviço e comprovante. Confira materiais usados, condições de garantia e recomendações de manutenção oferecidas pela empresa, sem presumir que todas adotam o mesmo prazo.' },
  ];
}
