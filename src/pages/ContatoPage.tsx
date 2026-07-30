import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';
import { RelatedLinks } from '@/components/RelatedLinks';

const ContatoPage = () => {
  useSEO({
    title: 'Contato — Serviços no Bairro',
    description:
      'Fale com a equipe do Serviços no Bairro: dúvidas, correções de conteúdo, cadastro de empresa, denúncias sobre atendimento e parcerias em Curitiba e Região Metropolitana.',
    canonical: '/contato',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Contato', url: '/contato' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contato — Serviços no Bairro',
        url: 'https://www.servicosnobairro.com.br/contato',
        mainEntity: { '@id': 'https://www.servicosnobairro.com.br/#organization' },
      },
    ],
  });

  const canais = [
    {
      icon: MessageCircle,
      titulo: 'WhatsApp',
      valor: '(41) 99272-1004',
      href: 'https://wa.me/5541992721004?text=Olá! Vim pelo site Serviços no Bairro.',
      externo: true,
    },
    {
      icon: Phone,
      titulo: 'Telefone',
      valor: '(41) 98700-1004',
      href: 'tel:+5541987001004',
    },
    {
      icon: Mail,
      titulo: 'E-mail',
      valor: 'sac@aloanuncio.com.br',
      href: 'mailto:sac@aloanuncio.com.br',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Contato</h1>
          <p className="text-lg text-primary-foreground">
            Fale com a equipe editorial do Serviços no Bairro. Para contratar um serviço, procure a
            empresa diretamente na página do seu bairro — o contato é direto, sem intermediação.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Canais de atendimento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {canais.map(({ icon: Icon, titulo, valor, href, externo }) => (
              <a
                key={titulo}
                href={href}
                {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="bg-card border rounded-xl p-5 hover:border-primary transition-colors"
              >
                <Icon className="h-6 w-6 text-primary mb-2" />
                <div className="font-bold">{titulo}</div>
                <div className="text-sm text-muted-foreground break-words">{valor}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Para que assunto escrever</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong className="text-foreground">Correção de conteúdo:</strong> informe a URL da página e qual dado está incorreto.</li>
            <li><strong className="text-foreground">Problema com uma empresa listada:</strong> descreva o ocorrido, a data e o serviço contratado. Perfis são suspensos quando o problema se confirma.</li>
            <li><strong className="text-foreground">Cadastro de empresa:</strong> use a página de cadastro para enviar CNPJ, serviços e área de atendimento.</li>
            <li><strong className="text-foreground">Publicidade e parcerias:</strong> confira as opções na página Anuncie Aqui.</li>
            <li><strong className="text-foreground">Privacidade e dados pessoais:</strong> solicitações de exclusão ou acesso conforme a LGPD.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">Área de cobertura</h2>
          <p className="text-muted-foreground leading-relaxed flex gap-2">
            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>
              Curitiba (bairros oficiais, vilas e regiões populares) e Região Metropolitana:
              Pinhais, Colombo, São José dos Pinhais, Araucária, Almirante Tamandaré, Campo Largo,
              Campo Magro, Fazenda Rio Grande, Piraquara, Quatro Barras, Campina Grande do Sul,
              Mandirituba, Balsa Nova, Rio Branco do Sul, Itaperuçu e Tijucas do Sul.
            </span>
          </p>
        </section>

        <RelatedLinks
          links={[
            { to: '/cadastrar-empresa', label: 'Cadastrar empresa', hint: 'Entre no diretório' },
            { to: '/anuncie-aqui', label: 'Anuncie aqui', hint: 'Planos de destaque' },
            { to: '/como-selecionamos-profissionais', label: 'Critérios de verificação', hint: 'Como avaliamos empresas' },
            { to: '/politica-editorial', label: 'Política editorial', hint: 'Correções e independência' },
            { to: '/privacidade', label: 'Política de privacidade', hint: 'LGPD' },
            { to: '/busca', label: 'Buscar empresas', hint: 'Filtre por bairro e serviço' },
          ]}
        />
      </div>
    </div>
  );
};

export default ContatoPage;
