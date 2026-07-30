import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Users, Star } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';
import { RelatedLinks } from '@/components/RelatedLinks';

const QuemSomosPage = () => {
  useSEO({
    title: 'Quem Somos — Serviços no Bairro | Diretório de Curitiba',
    description:
      'Conheça o Serviços no Bairro: diretório independente de desentupidoras e encanadores verificados em Curitiba e Região Metropolitana. Como nascemos e como trabalhamos.',
    canonical: '/quem-somos',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Quem Somos', url: '/quem-somos' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Quem Somos — Serviços no Bairro',
        url: 'https://www.servicosnobairro.com.br/quem-somos',
        about: { '@id': 'https://www.servicosnobairro.com.br/#organization' },
      },
    ],
  });

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Quem Somos</h1>
          <p className="text-lg text-primary-foreground">
            O Serviços no Bairro é um diretório independente que conecta moradores e empresas de
            Curitiba e da Região Metropolitana a desentupidoras e encanadores verificados,
            organizados por bairro e por tipo de serviço.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Por que existimos</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Um cano estourado ou um esgoto entupido é uma urgência: quem procura ajuda não tem tempo
            de comparar dezenas de anúncios, checar CNPJ e ligar para números que não atendem. A
            maioria dos resultados de busca para "desentupidora perto de mim" são anúncios pagos de
            intermediários que repassam o serviço, sem qualquer verificação.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Criamos o Serviços no Bairro para reduzir esse ruído: reunimos empresas que realmente
            atendem cada bairro, mostramos faixas de preço praticadas na cidade, tempo médio de
            atendimento e formas de contato diretas — sem intermediação e sem cobrança do morador.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">O que fazemos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin, titulo: 'Cobertura por bairro', texto: 'Bairros oficiais de Curitiba (IPPUC), vilas e regiões populares, além das cidades da RMC.' },
              { icon: ShieldCheck, titulo: 'Verificação de empresas', texto: 'Conferimos CNPJ ativo, telefone e área de atendimento antes de publicar um perfil.' },
              { icon: Star, titulo: 'Avaliações reais', texto: 'Publicamos apenas avaliações de clientes reais, com serviço e data identificados.' },
              { icon: Users, titulo: 'Contato direto', texto: 'O contato vai direto para a empresa. Não cobramos comissão do morador.' },
            ].map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="bg-card border rounded-xl p-5">
                <Icon className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold mb-1">{titulo}</h3>
                <p className="text-sm text-muted-foreground">{texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Como nos sustentamos</h2>
          <p className="text-muted-foreground leading-relaxed">
            O uso é gratuito para quem procura um profissional. A operação é mantida por planos de
            destaque contratados por empresas cadastradas. Destaque comercial altera a posição de
            exibição, nunca o conteúdo editorial, as avaliações ou os critérios de verificação — e
            perfis em destaque são identificados como tal. Os detalhes estão na nossa{' '}
            <Link to="/politica-editorial" className="text-primary font-semibold hover:underline">
              política editorial
            </Link>
            .
          </p>
        </section>

        <RelatedLinks
          links={[
            { to: '/como-funciona', label: 'Como funciona', hint: 'Do primeiro clique ao serviço executado' },
            { to: '/como-selecionamos-profissionais', label: 'Como selecionamos profissionais', hint: 'Nossos critérios de verificação' },
            { to: '/politica-editorial', label: 'Política editorial', hint: 'Independência e transparência' },
            { to: '/contato', label: 'Contato', hint: 'Fale com a nossa equipe' },
            { to: '/busca', label: 'Buscar empresas', hint: 'Filtre por bairro e serviço' },
            { to: '/faq', label: 'Perguntas frequentes', hint: 'Dúvidas sobre preços e prazos' },
          ]}
        />
      </div>
    </div>
  );
};

export default QuemSomosPage;
