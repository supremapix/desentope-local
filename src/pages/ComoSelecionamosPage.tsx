import { CheckCircle2, XCircle } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';
import { RelatedLinks } from '@/components/RelatedLinks';

const criterios = [
  {
    titulo: 'CNPJ ativo e situação cadastral regular',
    texto:
      'Conferimos o CNPJ na base pública da Receita Federal. Empresas com situação baixada, suspensa ou inapta não são publicadas.',
  },
  {
    titulo: 'Telefone e WhatsApp em funcionamento',
    texto:
      'Testamos os canais de contato antes da publicação e reconferimos periodicamente. Perfil que deixa de atender é despublicado.',
  },
  {
    titulo: 'Área de atendimento declarada e coerente',
    texto:
      'A empresa informa quais bairros e cidades atende. Só aparece na página de um bairro quem declara atender aquele bairro.',
  },
  {
    titulo: 'Escopo de serviços compatível',
    texto:
      'Verificamos se os serviços anunciados correspondem à atividade da empresa — desentupimento, hidrojateamento, limpa fossa, encanamento e correlatos.',
  },
  {
    titulo: 'Histórico de reclamações',
    texto:
      'Consultamos plataformas públicas de reclamação. Reincidência de reclamações graves sem resolução leva à suspensão do perfil.',
  },
  {
    titulo: 'Avaliações identificáveis',
    texto:
      'Só publicamos avaliações com cliente, serviço e data. Não geramos, compramos nem editamos avaliações.',
  },
];

const naoFazemos = [
  'Não garantimos preço, prazo ou qualidade da execução — isso é responsabilidade da empresa contratada.',
  'Não somos órgão certificador e não emitimos selo com valor legal.',
  'Não vendemos posição em troca de avaliação positiva.',
  'Não publicamos avaliação anônima ou sem serviço identificado.',
];

const ComoSelecionamosPage = () => {
  useSEO({
    title: 'Como Selecionamos Profissionais — Serviços no Bairro',
    description:
      'Critérios de verificação das desentupidoras e encanadores listados: CNPJ ativo, contato testado, área de atendimento, histórico de reclamações e avaliações identificáveis.',
    canonical: '/como-selecionamos-profissionais',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Como Selecionamos Profissionais', url: '/como-selecionamos-profissionais' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Como Selecionamos Profissionais',
        url: 'https://www.servicosnobairro.com.br/como-selecionamos-profissionais',
        publisher: { '@id': 'https://www.servicosnobairro.com.br/#organization' },
      },
    ],
  });

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Como Selecionamos Profissionais</h1>
          <p className="text-lg text-primary-foreground/80">
            Toda empresa listada passa por uma checagem documental e de contato antes de ser
            publicada. Abaixo estão exatamente os critérios que aplicamos — e os limites do que
            nossa verificação significa.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Nossos critérios</h2>
          <ul className="space-y-4">
            {criterios.map((c) => (
              <li key={c.titulo} className="flex gap-3 bg-card border rounded-xl p-5">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">{c.titulo}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">O que a verificação não é</h2>
          <ul className="space-y-3">
            {naoFazemos.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Encontrou um problema?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Se uma empresa listada não atendeu, cobrou fora do combinado ou não corresponde ao
            perfil publicado, avise a nossa equipe pela página de contato. Analisamos cada relato e
            suspendemos perfis quando o problema se confirma.
          </p>
        </section>

        <RelatedLinks
          links={[
            { to: '/contato', label: 'Relatar um problema', hint: 'Fale com a equipe editorial' },
            { to: '/politica-editorial', label: 'Política editorial', hint: 'Independência e correções' },
            { to: '/quem-somos', label: 'Quem somos', hint: 'Como o projeto se sustenta' },
            { to: '/cadastrar-empresa', label: 'Cadastrar minha empresa', hint: 'Entrar no diretório' },
            { to: '/busca', label: 'Buscar empresas', hint: 'Filtre por bairro e serviço' },
            { to: '/faq', label: 'Perguntas frequentes', hint: 'Dúvidas gerais' },
          ]}
        />
      </div>
    </div>
  );
};

export default ComoSelecionamosPage;
