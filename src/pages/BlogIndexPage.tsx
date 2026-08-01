import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';
import { blogArtigos, blogCategorias } from '@/data/blog';
import { RelatedLinks } from '@/components/RelatedLinks';

const BlogIndexPage = () => {
  useSEO({
    title: 'Blog: Desentupimento e Encanamento em Curitiba',
    description:
      'Guias técnicos sobre desentupimento, vazamentos e manutenção hidráulica em Curitiba e Região Metropolitana, com preços reais e orientação passo a passo.',
    canonical: '/blog',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Blog', url: '/blog' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog Serviços no Bairro',
        description:
          'Conteúdo técnico sobre desentupimento, encanamento e manutenção hidráulica em Curitiba e RMC.',
        blogPost: blogArtigos.map((a) => ({
          '@type': 'BlogPosting',
          headline: a.h1,
          description: a.descricao,
          datePublished: a.atualizadoEm,
          dateModified: a.atualizadoEm,
          url: `https://desentupa-agora-pr.lovable.app/blog/${a.slug}`,
        })),
      },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <nav aria-label="Você está aqui" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Início</Link> <span aria-hidden="true">/</span> Blog
      </nav>

      <header className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          Conteúdo técnico
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Blog de desentupimento e encanamento em Curitiba
        </h1>
        <p className="text-lg text-muted-foreground">
          Guias escritos com base no que realmente acontece nas redes hidráulicas de Curitiba e da
          Região Metropolitana: causas, soluções, faixas de preço praticadas e o limite entre o que
          dá para resolver sozinho e o que exige profissional.
        </p>
      </header>

      <section aria-labelledby="categorias" className="mb-12">
        <h2 id="categorias" className="text-2xl font-bold mb-4">Categorias</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogCategorias.map((cat) => (
            <li key={cat.slug}>
              <Link
                to={`/blog/categoria/${cat.slug}`}
                className="block bg-card border rounded-xl p-5 h-full hover:border-primary transition-colors"
              >
                <span className="font-bold text-lg block mb-1">{cat.nome}</span>
                <span className="text-sm text-muted-foreground">{cat.intro}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="artigos" className="mb-14">
        <h2 id="artigos" className="text-2xl font-bold mb-4">Todos os guias</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {blogArtigos.map((artigo) => {
            const cat = blogCategorias.find((c) => c.slug === artigo.categoria);
            return (
              <li key={artigo.slug}>
                <article className="bg-card border rounded-xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="bg-secondary/10 text-secondary font-semibold px-2 py-0.5 rounded">
                      {cat?.nome}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {artigo.leituraMin} min
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    <Link to={`/blog/${artigo.slug}`} className="hover:text-primary">
                      {artigo.h1}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">{artigo.descricao}</p>
                  <Link
                    to={`/blog/${artigo.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary"
                  >
                    Ler o guia <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <RelatedLinks
        title="Precisa de atendimento agora?"
        links={[
          { label: 'Desentupidora 24h em Curitiba', to: '/servicos/desentupidora-24h-curitiba', hint: 'Atendimento emergencial' },
          { label: 'Encanador em Curitiba', to: '/servicos/encanador-curitiba', hint: 'Reparos e instalações' },
          { label: 'Guia de limpa fossa', to: '/servicos/guia-limpa-fossa', hint: 'Frequência e preços' },
          { label: 'Como selecionamos profissionais', to: '/como-selecionamos-profissionais', hint: 'Nossos critérios' },
        ]}
      />
    </div>
  );
};

export default BlogIndexPage;
