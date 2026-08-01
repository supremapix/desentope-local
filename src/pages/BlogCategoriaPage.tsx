import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';
import { blogCategorias, getArtigosPorCategoria, getCategoriaBySlug } from '@/data/blog';
import { RelatedLinks } from '@/components/RelatedLinks';

const BlogCategoriaPage = () => {
  const { categoria: slug } = useParams<{ categoria: string }>();
  const categoria = slug ? getCategoriaBySlug(slug) : undefined;
  const artigos = slug ? getArtigosPorCategoria(slug) : [];

  useSEO({
    title: categoria ? categoria.titulo : 'Categoria do blog',
    description: categoria?.descricao ?? 'Categoria do blog Serviços no Bairro.',
    canonical: `/blog/categoria/${slug}`,
    jsonLd: categoria
      ? [
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: categoria.nome, url: `/blog/categoria/${categoria.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: categoria.titulo,
            description: categoria.descricao,
            hasPart: artigos.map((a) => ({
              '@type': 'BlogPosting',
              headline: a.h1,
              description: a.descricao,
              url: `https://desentupa-agora-pr.lovable.app/blog/${a.slug}`,
            })),
          },
        ]
      : undefined,
  });

  if (!categoria) return <Navigate to="/blog" replace />;

  return (
    <div className="container mx-auto px-4 py-10">
      <nav aria-label="Você está aqui" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Início</Link> <span aria-hidden="true">/</span>{' '}
        <Link to="/blog" className="hover:text-primary">Blog</Link> <span aria-hidden="true">/</span>{' '}
        {categoria.nome}
      </nav>

      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoria.nome} em Curitiba e RMC</h1>
        <p className="text-lg text-muted-foreground">{categoria.intro}</p>
      </header>

      <section aria-labelledby="artigos-categoria" className="mb-14">
        <h2 id="artigos-categoria" className="text-2xl font-bold mb-4">
          Guias de {categoria.nome.toLowerCase()}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {artigos.map((artigo) => (
            <li key={artigo.slug}>
              <article className="bg-card border rounded-xl p-6 h-full flex flex-col">
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {artigo.leituraMin} min de leitura
                </span>
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
          ))}
        </ul>
      </section>

      <RelatedLinks
        title="Outras categorias"
        links={blogCategorias
          .filter((c) => c.slug !== categoria.slug)
          .map((c) => ({ label: c.nome, to: `/blog/categoria/${c.slug}`, hint: c.descricao }))
          .concat([{ label: 'Todos os guias', to: '/blog', hint: 'Índice completo do blog' }])}
      />
    </div>
  );
};

export default BlogCategoriaPage;
