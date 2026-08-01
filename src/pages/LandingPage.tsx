import { useParams, Link, useLocation } from 'react-router-dom';
import { getLandingPageBySlug, landingPages } from '@/data/landing-pages';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { Shield, Clock, Star, Zap, AlertTriangle, Phone } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema, buildServiceSchema, buildFAQSchema } from '@/hooks/useSEO';
import { FaqPremium } from '@/components/FaqPremium';
import { RelatedLinks } from '@/components/RelatedLinks';
import { empresas } from '@/data/empresas';
import { regionais } from '@/data/bairros';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const LandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  // For city pages like /colombo, extract slug from pathname
  const resolvedSlug = slug || location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const page = getLandingPageBySlug(resolvedSlug);

  // Filter companies by service or city
  const filteredEmpresas = empresas.filter(e => {
    if (page?.servicoSlug) {
      return e.servicosOferecidos.includes(page.servicoSlug);
    }
    if (page?.cidade && page.cidade !== 'Curitiba') {
      const cidadeSlug = toSlug(page.cidade);
      return e.cidadesAtendidas?.includes(cidadeSlug) || e.cidadesAtendidas?.includes('curitiba');
    }
    return true;
  }).slice(0, 6);

  useSEO({
    title: page?.title || 'Serviços no Bairro',
    description: page?.metaDescription || '',
    canonical: page?.route,
    jsonLd: page ? [
      buildBreadcrumbSchema(page.breadcrumb),
      buildServiceSchema(
        page.h1,
        page.metaDescription,
        undefined,
        filteredEmpresas.length || 47
      ),
      ...(page.faq?.length ? [buildFAQSchema(page.faq)] : []),
    ] : undefined,
  });

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
        <Link to="/" className="text-primary hover:underline font-bold">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          {page.breadcrumb.map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">›</span>}
              {i < page.breadcrumb.length - 1 ? (
                <Link to={item.url} className="hover:text-primary">{item.name}</Link>
              ) : (
                <span className="text-foreground font-medium">{item.name}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{page.h1}</h1>
          <p className="text-lg md:text-xl text-primary-foreground mb-8 max-w-3xl mx-auto">
            {page.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              to={page.buscaQuery}
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors text-lg"
            >
              Buscar Profissional Agora →
            </Link>
            <a
              href="https://wa.me/5541992721004?text=Olá! Preciso de orçamento para serviço hidráulico. [via landing page - servicosnobairro.com.br]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors text-lg gap-2"
            >
              <Phone className="h-5 w-5" /> WhatsApp Orçamento
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-primary-foreground/90">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-secondary" /> Resposta em até 15min</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-accent" /> +500 empresas cadastradas</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-secondary" /> Avaliações reais</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" /> Atendimento 24h</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-10">
          <SearchBar />
        </div>

        {/* Resposta direta — bloco AEO/GEO */}
        {page.respostaDireta && (
          <section aria-labelledby="resposta-rapida" className="mb-10">
            <div className="rounded-xl border-l-4 border-primary bg-muted p-6">
              <h2 id="resposta-rapida" className="text-lg font-bold mb-2">Resumo rápido</h2>
              <p className="text-base leading-relaxed">{page.respostaDireta}</p>
            </div>
          </section>
        )}

        {/* Companies */}
        {filteredEmpresas.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6">
              Top Empresas {page.cidade !== 'Curitiba' ? `em ${page.cidade}` : 'em Curitiba'} ({filteredEmpresas.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredEmpresas.map(e => (
                <CompanyCard key={e.slug} empresa={e} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                to={page.buscaQuery}
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
              >
                Ver Todas as Empresas →
              </Link>
            </div>
          </section>
        )}

        {/* Content Blocks (SEO) */}
        {page.contentBlocks.map((block, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold mb-4">{block.heading}</h2>

            {block.content.split('\n\n').map((p, j) => (
              <p key={j} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}

            {block.type === 'list' && block.listItems && (
              <ul className="grid gap-2 sm:grid-cols-2 mt-2">
                {block.listItems.map((item, k) => (
                  <li key={k} className="rounded-lg border bg-card px-4 py-3 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            )}

            {block.type === 'table' && block.tableData && (
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse bg-card rounded-xl overflow-hidden border">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="text-left px-4 py-3 font-bold">Serviço</th>
                      <th className="text-right px-4 py-3 font-bold">Preço Médio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.tableData.map((row, k) => (
                      <tr key={k} className="border-t border-border hover:bg-muted/50">
                        <td className="px-4 py-3 text-foreground">{row.servico}</td>
                        <td className="px-4 py-3 text-right font-semibold text-primary">{row.preco}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {/* FAQ */}
        {page.faq && page.faq.length > 0 && (
          <div className="mb-14">
            <FaqPremium
              perguntas={page.faq}
              titulo="Perguntas Frequentes"
              subtitulo={`${page.faq.length} dúvidas comuns sobre ${page.h1.split(' em ')[0].toLowerCase()} em ${page.cidade}`}
              mostrarBusca={false}
            />
          </div>
        )}

        {/* Links relacionados */}
        {page.relatedLinks && page.relatedLinks.length > 0 && (
          <RelatedLinks links={page.relatedLinks} />
        )}

        {/* Bairros linking (only for Curitiba pages) */}
        {page.cidade === 'Curitiba' && (
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4">Bairros de Curitiba</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(regionais).slice(0, 6).map(([regional, bairrosNomes]) => (
                <div key={regional} className="bg-card rounded-xl p-4 border">
                  <h3 className="font-bold text-primary mb-2 text-sm">Regional {regional}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {bairrosNomes.slice(0, 8).map(b => (
                      <Link
                        key={b}
                        to={`/curitiba/${toSlug(b)}`}
                        className="text-xs bg-muted px-2.5 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {b}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" /> Precisa de Atendimento Agora?
          </h2>
          <p className="text-primary-foreground mb-6">
            Solicite um orçamento gratuito e receba resposta em até 15 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/5541992721004?text=Olá! Preciso de orçamento urgente para serviço hidráulico. [via landing page - servicosnobairro.com.br]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors text-lg gap-2"
            >
              <Phone className="h-5 w-5" /> WhatsApp (41) 99272-1004
            </a>
            <a
              href="tel:+554198700-1004"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors text-lg"
            >
              Ligar (41) 98700-1004
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
