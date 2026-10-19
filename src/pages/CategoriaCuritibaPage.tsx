import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { CompanyCard } from '@/components/CompanyCard';
import { ServiceIcon } from '@/components/ServiceIcon';
import { getEmpresasDoHubServico, getHubCuritiba, hubsCuritiba } from '@/data/hubs-curitiba';
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFAQSchema, useSEO } from '@/hooks/useSEO';

/** Only complete, explicitly registered guides are routed and indexed. */
export default function CategoriaCuritibaPage({ categoriaSlug }: { categoriaSlug: string }) {
  const hub = getHubCuritiba(categoriaSlug)!;
  const contexto = `categoria=${encodeURIComponent(hub.slug)}&cidade=curitiba`;

  useSEO({
    title: `${hub.titulo} | Serviços no Bairro`,
    description: hub.descricao,
    canonical: hub.path,
    geoPlacename: 'Curitiba, Paraná',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Curitiba', url: '/curitiba' },
        { name: hub.nome, url: hub.path },
      ]),
      buildCollectionPageSchema({
        name: hub.titulo,
        description: hub.descricao,
        url: hub.path,
        about: { '@type': 'Thing', name: `${hub.nome} em Curitiba` },
        // ItemList representa os guias de serviço visíveis, não um ranking de fornecedores.
        items: hub.servicos.map((servico) => ({ name: servico.nome, url: `${hub.path}#${servico.slug}` })),
      }),
      buildFAQSchema(hub.perguntas),
    ],
  });

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <nav aria-label="Trilha de navegação" className="container mx-auto px-4 py-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link><span aria-hidden="true">›</span>
          <Link to="/curitiba" className="hover:text-primary">Curitiba</Link><span aria-hidden="true">›</span>
          <span aria-current="page" className="text-foreground font-medium">{hub.nome}</span>
        </nav>
      </div>
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <ServiceIcon name={hub.icone} className="h-10 w-10 mb-4" />
          <p className="text-sm mb-3">Guia de contratação · Curitiba, PR</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">{hub.titulo}</h1>
          <p className="text-lg leading-relaxed max-w-3xl">{hub.introducao}</p>
          <a href="#servicos" className="inline-flex gap-2 items-center mt-6 rounded-lg bg-background text-foreground px-5 py-3 font-semibold">Escolher o serviço <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <aside className="rounded-xl border bg-muted p-5 mb-10" aria-label="Sobre este guia">
          <h2 className="font-bold mb-2">Cadastro em formação, cobertura explícita</h2>
          <p className="text-sm text-muted-foreground">Este é um guia editorial, não uma lista das “melhores” empresas. Só mostramos perfis associados ao serviço e à cobertura descritos. Não completar uma lista com outros ramos evita indicar uma empresa que não atende à sua necessidade. A contratação e a confirmação de disponibilidade são feitas diretamente com o prestador.</p>
        </aside>
        <section id="servicos" className="scroll-mt-24 mb-12" aria-labelledby="servicos-titulo">
          <h2 id="servicos-titulo" className="text-2xl font-bold mb-3">Qual serviço você precisa?</h2>
          <nav aria-label={`Serviços de ${hub.nome.toLowerCase()}`} className="flex flex-wrap gap-3 mb-8">
            {hub.servicos.map((servico) => <a key={servico.slug} href={`#${servico.slug}`} className="rounded-lg border bg-card px-4 py-3 text-sm font-medium hover:border-primary">{servico.nome}</a>)}
          </nav>
          <div className="space-y-6">
            {hub.servicos.map((servico) => {
              const empresas = getEmpresasDoHubServico(servico);
              return (
                <section id={servico.slug} key={servico.slug} className="scroll-mt-24 border rounded-xl bg-card p-5 md:p-7">
                  <h3 className="text-xl font-bold mb-3">{servico.nome}</h3>
                  <p className="text-muted-foreground mb-4">{servico.resumo}</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm mb-5">{servico.orientacoes.map((item) => <li key={item}>{item}</li>)}</ul>
                  {empresas.length > 0 ? (
                    <div>
                      <h4 className="font-semibold mb-2">{empresas.length === 1 ? 'Perfil relacionado a este trajeto' : 'Perfis relacionados a este trajeto'}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{servico.cobertura}</p>
                      <div className="space-y-4">{empresas.map((empresa) => <CompanyCard key={empresa.slug} empresa={empresa} />)}</div>
                      {servico.linkServico && <Link to={servico.linkServico} className="text-sm text-primary underline underline-offset-4 mt-4 inline-block">Consultar a página do serviço e sua região de atendimento</Link>}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm font-medium">Ainda não há empresa cadastrada nesta seção com cobertura declarada compatível com o serviço descrito.</p>
                      <p className="text-sm text-muted-foreground mt-2">Use as orientações acima para preparar seu orçamento. Se sua empresa presta este serviço em Curitiba, solicite a inclusão de um perfil com dados e área de atendimento.</p>
                      <Link to={`/cadastrar-empresa?${contexto}`} className="text-sm font-semibold text-primary underline underline-offset-4 mt-3 inline-block">Cadastrar empresa nesta categoria</Link>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </section>
        <section className="mb-12" aria-labelledby="checklist-titulo">
          <h2 id="checklist-titulo" className="text-2xl font-bold flex gap-2 items-center mb-5"><ClipboardList className="h-6 w-6 text-primary" /> Antes de pedir um orçamento</h2>
          <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">{hub.checklist.map((item) => <li key={item}>{item}</li>)}</ol>
          <p className="text-sm text-muted-foreground mt-5">Compare propostas com o mesmo escopo. O portal não define preço, prazo, garantia ou condições em nome das empresas.</p>
        </section>
        <section className="mb-12" aria-labelledby="faq-titulo">
          <h2 id="faq-titulo" className="text-2xl font-bold mb-5">Perguntas frequentes sobre {hub.nome.toLowerCase()} em Curitiba</h2>
          <div className="space-y-3">{hub.perguntas.map((item) => (
            <details key={item.pergunta} className="rounded-xl border bg-card p-5">
              <summary className="font-semibold cursor-pointer">{item.pergunta}</summary>
              <p className="text-muted-foreground mt-3 leading-relaxed">{item.resposta}</p>
            </details>
          ))}</div>
        </section>
        <aside className="rounded-xl bg-primary text-primary-foreground p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold mb-3">Sua empresa atua com {hub.nome.toLowerCase()} em Curitiba?</h2>
          <p className="mb-5">Apresente os serviços que realmente oferece, origem e destino atendidos, horários e contatos. Consulte os planos e as condições de cadastro. Estar no diretório não garante posição nos buscadores nem quantidade de clientes.</p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/cadastrar-empresa?${contexto}`} className="rounded-lg bg-background text-foreground px-5 py-3 font-semibold">Solicitar cadastro</Link>
            <Link to={`/anuncie-aqui?${contexto}`} className="rounded-lg border border-primary-foreground px-5 py-3 font-semibold">Conhecer planos de anúncio</Link>
          </div>
        </aside>
        <nav aria-label="Outros guias em Curitiba" className="flex flex-wrap gap-4 text-sm">
          <Link to="/curitiba" className="text-primary underline underline-offset-4">Serviços em Curitiba</Link>
          {hubsCuritiba.filter((outro) => outro.slug !== hub.slug).map((outro) => <Link key={outro.slug} to={outro.path} className="text-primary underline underline-offset-4">{outro.nome} em Curitiba</Link>)}
        </nav>
      </div>
    </div>
  );
}
