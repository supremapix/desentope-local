import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';
import { RelatedLinks } from '@/components/RelatedLinks';

const PoliticaEditorialPage = () => {
  useSEO({
    title: 'Política Editorial — Serviços no Bairro',
    description:
      'Como produzimos, revisamos e corrigimos o conteúdo do Serviços no Bairro: fontes de preço, separação entre editorial e publicidade, uso de IA e política de correções.',
    canonical: '/politica-editorial',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Política Editorial', url: '/politica-editorial' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Política Editorial',
        url: 'https://www.servicosnobairro.com.br/politica-editorial',
        publisher: { '@id': 'https://www.servicosnobairro.com.br/#organization' },
      },
    ],
  });

  const secoes = [
    {
      titulo: 'Quem produz o conteúdo',
      texto:
        'Os textos sobre serviços, preços e procedimentos são produzidos pela equipe editorial do Serviços no Bairro com base em orçamentos praticados por empresas do setor em Curitiba e na Região Metropolitana, e revisados antes da publicação.',
    },
    {
      titulo: 'Faixas de preço',
      texto:
        'As faixas de preço são referências médias coletadas junto a empresas cadastradas e a orçamentos públicos, revisadas periodicamente. Não são tabela oficial nem proposta comercial: o valor final depende do diagnóstico, do acesso ao local, do horário e da complexidade do serviço.',
    },
    {
      titulo: 'Separação entre editorial e publicidade',
      texto:
        'Planos de destaque alteram apenas a posição de exibição de um perfil e são sinalizados. Nenhum anunciante define, revisa ou vetoriza conteúdo editorial, avaliações ou critérios de verificação.',
    },
    {
      titulo: 'Avaliações',
      texto:
        'Publicamos apenas avaliações de clientes reais, com serviço e data identificados. Não compramos, geramos nem editamos o teor de avaliações. Empresas podem responder publicamente, sem alterar o texto original do cliente.',
    },
    {
      titulo: 'Uso de ferramentas de IA',
      texto:
        'Ferramentas de IA podem ser usadas como apoio na estruturação e revisão de textos. Nenhum conteúdo é publicado sem revisão humana, e dados factuais (preços, prazos, contatos, área de atendimento) são conferidos manualmente.',
    },
    {
      titulo: 'Correções',
      texto:
        'Erros factuais são corrigidos assim que identificados. Se você encontrou uma informação incorreta, escreva para a nossa equipe pela página de contato descrevendo a página e o dado em questão.',
    },
    {
      titulo: 'Independência',
      texto:
        'Não temos vínculo societário com nenhuma das empresas listadas. Perfis podem ser suspensos por descumprimento dos critérios de verificação, independentemente de contrato comercial vigente.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Política Editorial</h1>
          <p className="text-lg text-primary-foreground/80">
            Como o conteúdo do Serviços no Bairro é produzido, revisado, sinalizado e corrigido.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {secoes.map((s) => (
          <section key={s.titulo} className="mb-8">
            <h2 className="text-xl font-bold mb-2">{s.titulo}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.texto}</p>
          </section>
        ))}

        <RelatedLinks
          links={[
            { to: '/como-selecionamos-profissionais', label: 'Como selecionamos profissionais', hint: 'Critérios de verificação' },
            { to: '/quem-somos', label: 'Quem somos', hint: 'Missão e modelo de negócio' },
            { to: '/contato', label: 'Contato', hint: 'Solicitar correção' },
            { to: '/termos', label: 'Termos de uso', hint: 'Regras da plataforma' },
            { to: '/privacidade', label: 'Política de privacidade', hint: 'Tratamento de dados' },
            { to: '/faq', label: 'Perguntas frequentes', hint: 'Dúvidas gerais' },
          ]}
        />
      </div>
    </div>
  );
};

export default PoliticaEditorialPage;
