import { Link, useParams, Navigate } from 'react-router-dom';
import { Clock, CalendarDays, Info } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';
import { getArtigoBySlug, getArtigosRelacionados, getCategoriaBySlug } from '@/data/blog';
import { servicos } from '@/data/servicos';
import { RelatedLinks } from '@/components/RelatedLinks';

const SITE_URL = 'https://www.servicosnobairro.com.br';

const BlogArtigoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const artigo = slug ? getArtigoBySlug(slug) : undefined;
  const categoria = artigo ? getCategoriaBySlug(artigo.categoria) : undefined;
  const relacionados = artigo ? getArtigosRelacionados(artigo) : [];

  useSEO({
    title: artigo ? artigo.titulo : 'Guia',
    description: artigo?.descricao ?? '',
    canonical: `/blog/${slug}`,
    type: 'article',
    jsonLd: artigo
      ? [
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: categoria?.nome ?? 'Guias', url: `/blog/categoria/${artigo.categoria}` },
            { name: artigo.h1, url: `/blog/${artigo.slug}` },
          ]),
          buildFAQSchema(artigo.faq),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: artigo.h1,
            description: artigo.descricao,
            inLanguage: 'pt-BR',
            datePublished: artigo.atualizadoEm,
            dateModified: artigo.atualizadoEm,
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${artigo.slug}` },
            author: { '@type': 'Organization', name: 'Serviços no Bairro', url: SITE_URL },
            publisher: {
              '@type': 'Organization',
              name: 'Serviços no Bairro',
              url: SITE_URL,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
            },
            about: { '@type': 'Thing', name: categoria?.nome ?? 'Serviços hidráulicos' },
            spatialCoverage: { '@type': 'Place', name: 'Curitiba e Região Metropolitana, PR' },
          },
        ]
      : undefined,
  });

  if (!artigo) return <Navigate to="/blog" replace />;

  const servicosRelacionados = artigo.servicos
    .map((s) => servicos.find((sv) => sv.slug === s))
    .filter((s): s is (typeof servicos)[number] => Boolean(s));

  return (
    <div className="container mx-auto px-4 py-10">
      <nav aria-label="Você está aqui" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Início</Link> <span aria-hidden="true">/</span>{' '}
        <Link to="/blog" className="hover:text-primary">Blog</Link> <span aria-hidden="true">/</span>{' '}
        <Link to={`/blog/categoria/${artigo.categoria}`} className="hover:text-primary">
          {categoria?.nome}
        </Link>
      </nav>

      <article className="max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{artigo.h1}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Atualizado em {new Date(artigo.atualizadoEm).toLocaleDateString('pt-BR')}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {artigo.leituraMin} min de leitura
            </span>
          </div>
        </header>

        <section aria-label="Resposta direta" className="bg-secondary/10 border-l-4 border-secondary rounded-r-xl p-5 mb-10">
          <p className="text-lg leading-relaxed">{artigo.respostaDireta}</p>
        </section>

        {artigo.secoes.map((secao) => (
          <section key={secao.h2} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{secao.h2}</h2>

            {secao.paragrafos?.map((p) => (
              <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}

            {secao.lista && (
              <ul className="space-y-2 mb-4">
                {secao.lista.map((item) => (
                  <li key={item.slice(0, 40)} className="flex gap-2">
                    <span className="text-primary font-bold" aria-hidden="true">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {secao.tabela && (
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left border rounded-xl overflow-hidden">
                  <caption className="sr-only">{secao.h2}</caption>
                  <thead className="bg-muted">
                    <tr>
                      {secao.tabela.colunas.map((c) => (
                        <th key={c} scope="col" className="p-3 font-semibold">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {secao.tabela.linhas.map((linha) => (
                      <tr key={linha.join('|')} className="border-t">
                        {linha.map((celula, i) => (
                          <td key={celula + i} className="p-3">{celula}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {secao.destaque && (
              <p className="flex gap-2 bg-card border rounded-xl p-4">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-medium">{secao.destaque}</span>
              </p>
            )}
          </section>
        ))}

        <section aria-labelledby="faq-artigo" className="mb-12">
          <h2 id="faq-artigo" className="text-2xl font-bold mb-4">Perguntas frequentes</h2>
          <div className="space-y-4">
            {artigo.faq.map((item) => (
              <div key={item.pergunta} className="bg-card border rounded-xl p-5">
                <h3 className="font-bold mb-2">{item.pergunta}</h3>
                <p className="text-muted-foreground">{item.resposta}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm text-muted-foreground border-t pt-5 mb-12">
          Conteúdo produzido pela equipe editorial do Serviços no Bairro com base em faixas de preço
          praticadas em Curitiba e Região Metropolitana. Valores são médias de mercado e podem variar.
          Veja nossa <Link to="/politica-editorial" className="text-primary underline">política editorial</Link>.
        </p>
      </article>

      {servicosRelacionados.length > 0 && (
        <RelatedLinks
          title="Serviços relacionados"
          links={servicosRelacionados.map((s) => ({
            label: s.nome,
            to: `/servicos/${s.slug}`,
            hint: s.precoMedio ? `Média: ${s.precoMedio}` : undefined,
          }))}
        />
      )}

      <RelatedLinks
        title="Continue lendo"
        links={relacionados
          .map((a) => ({ label: a.h1, to: `/blog/${a.slug}`, hint: `${a.leituraMin} min de leitura` }))
          .concat([
            { label: `Mais sobre ${categoria?.nome}`, to: `/blog/categoria/${artigo.categoria}`, hint: 'Ver categoria' },
          ])}
      />
    </div>
  );
};

export default BlogArtigoPage;
