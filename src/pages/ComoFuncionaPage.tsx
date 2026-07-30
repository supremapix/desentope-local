import { useSEO, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';
import { RelatedLinks } from '@/components/RelatedLinks';

const passos = [
  {
    titulo: 'Escolha o bairro ou a cidade',
    texto:
      'Use a busca ou navegue pelas regionais de Curitiba e pelas cidades da RMC. Cada página mostra apenas empresas que declaram atender aquela região.',
  },
  {
    titulo: 'Compare empresas e preços',
    texto:
      'Veja anos de experiência, serviços oferecidos, horários, formas de pagamento, nota média e avaliações reais. As páginas de serviço trazem a faixa de preço praticada em Curitiba.',
  },
  {
    titulo: 'Fale direto com a empresa',
    texto:
      'O contato é por WhatsApp ou telefone diretamente com o profissional. Não há intermediação, cadastro obrigatório nem cobrança para o morador.',
  },
  {
    titulo: 'Peça orçamento antes de autorizar',
    texto:
      'Confirme o valor, o que está incluso e a garantia antes de o serviço começar. Em emergências, pergunte o tempo estimado de chegada ao seu bairro.',
  },
  {
    titulo: 'Avalie o atendimento',
    texto:
      'Depois do serviço, envie sua avaliação. Só publicamos relatos de clientes reais, com serviço e data identificados — é o que mantém o diretório útil.',
  },
];

const faq = [
  {
    pergunta: 'O Serviços no Bairro cobra alguma taxa do morador?',
    resposta:
      'Não. A busca, a comparação e o contato com as empresas são gratuitos. O site é mantido por planos de destaque contratados pelas empresas cadastradas.',
  },
  {
    pergunta: 'Vocês executam o serviço de desentupimento?',
    resposta:
      'Não. Somos um diretório: a execução, o preço e a garantia são responsabilidade da empresa contratada, que atende você diretamente.',
  },
  {
    pergunta: 'Consigo atendimento 24 horas?',
    resposta:
      'Sim. Boa parte das empresas listadas atende emergências 24 horas, inclusive fins de semana e feriados. Os perfis indicam quem opera em regime 24h.',
  },
  {
    pergunta: 'Em quanto tempo recebo retorno?',
    resposta:
      'Nas regiões centrais de Curitiba, o retorno costuma ocorrer em poucos minutos e o deslocamento em 30 a 60 minutos. Em cidades da RMC mais distantes, o prazo pode ser maior.',
  },
];

const ComoFuncionaPage = () => {
  useSEO({
    title: 'Como Funciona — Serviços no Bairro',
    description:
      'Entenda como usar o Serviços no Bairro: buscar por bairro, comparar empresas verificadas, pedir orçamento e contratar desentupidora ou encanador em Curitiba sem custo.',
    canonical: '/como-funciona',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Como Funciona', url: '/como-funciona' },
      ]),
      buildFAQSchema(faq),
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Como contratar uma desentupidora ou encanador em Curitiba',
        step: passos.map((p, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: p.titulo,
          text: p.texto,
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Como Funciona</h1>
          <p className="text-lg text-primary-foreground">
            Em cinco passos você encontra, compara e contrata uma desentupidora ou encanador
            verificado no seu bairro — de graça e sem intermediação.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <ol className="space-y-6 mb-12">
          {passos.map((p, i) => (
            <li key={p.titulo} className="flex gap-4">
              <span className="shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h2 className="text-lg font-bold mb-1">{p.titulo}</h2>
                <p className="text-muted-foreground leading-relaxed">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Perguntas frequentes</h2>
          <dl className="space-y-5">
            {faq.map((item) => (
              <div key={item.pergunta} className="bg-card border rounded-xl p-5">
                <dt className="font-bold mb-1">{item.pergunta}</dt>
                <dd className="text-muted-foreground">{item.resposta}</dd>
              </div>
            ))}
          </dl>
        </section>

        <RelatedLinks
          links={[
            { to: '/busca', label: 'Buscar empresas agora', hint: 'Filtre por bairro e serviço' },
            { to: '/como-selecionamos-profissionais', label: 'Como selecionamos profissionais', hint: 'Critérios de verificação' },
            { to: '/quem-somos', label: 'Quem somos', hint: 'Nossa missão e independência' },
            { to: '/faq', label: 'Perguntas frequentes', hint: 'Preços, prazos e garantias' },
            { to: '/servicos/desentupimento-curitiba', label: 'Desentupimento em Curitiba', hint: 'Preços e serviços' },
            { to: '/servicos/encanador-curitiba', label: 'Encanador em Curitiba', hint: 'Reparos e instalações' },
          ]}
        />
      </div>
    </div>
  );
};

export default ComoFuncionaPage;
