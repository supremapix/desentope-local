import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBairroBySlug } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { getEmpresasPorBairro, getEmpresasPorCidade } from '@/data/empresas';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { LocalRequestPlanner } from '@/components/LocalRequestPlanner';
import { useSEO, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';
import { hiringTopics, localQuestions } from '@/data/local-guides';
import { bairrosRMC, fichasBairrosRMC, slugLocal } from '@/data/bairros-rmc';

const BASE = 'https://www.servicosnobairro.com.br';
const normalizar = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function BairroPage() {
  const { bairro = '', cidade, localidade } = useParams();
  const [filtroBairros, setFiltroBairros] = useState('');
  const bairroData = !cidade ? getBairroBySlug(bairro) : undefined;
  const cidadeData = !bairroData ? cidadesRMC.find(c => c.slug === (cidade || bairro)) : undefined;
  const cadastro = cidadeData ? bairrosRMC.find(c => c.slug === cidadeData.slug) : undefined;
  const ficha = localidade && cidadeData ? fichasBairrosRMC.find(b => b.cidade === cidadeData.slug && b.slug === localidade) : undefined;
  const valido = Boolean((bairroData || cidadeData) && (!localidade || ficha));
  const nome = ficha?.nome || bairroData?.nome || cidadeData?.nome || 'Localidade';
  const cidadeNome = cidadeData?.nome || 'Curitiba';
  const localCompleto = ficha || bairroData ? `${nome}, ${cidadeNome}` : cidadeNome;
  const path = cidade ? `/rmc/${cidade}/${localidade}` : `${bairroData ? '/curitiba' : '/rmc'}/${bairro}`;
  const empresas = !valido ? [] : bairroData ? getEmpresasPorBairro(bairro) : getEmpresasPorCidade(cidadeData!.slug);
  const perguntas = localQuestions(localCompleto);
  const breadcrumbs = [{ name: 'Início', url: '/' },
    ...(cidadeData && ficha ? [{ name: cidadeNome, url: `/rmc/${cidadeData.slug}` }] : bairroData ? [{ name: 'Curitiba', url: '/curitiba' }] : []),
    { name: nome, url: path }];

  useSEO({
    title: `Encanadores e desentupidoras em ${localCompleto} | Serviços no Bairro`,
    description: `Encontre prestadores para ${localCompleto}. Compare serviços, prepare o orçamento e fale direto com cada empresa. Guia local de encanamento e desentupimento.`,
    canonical: path, omitGeo: true, noindex: !valido,
    jsonLd: [buildBreadcrumbSchema(breadcrumbs), {
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: `Encanadores e desentupidoras em ${localCompleto}`,
      url: `${BASE}${path}`, about: { '@type': 'Place', name: localCompleto },
      mainEntity: { '@type': 'ItemList', numberOfItems: empresas.length, itemListElement: empresas.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.nome, url: `${BASE}/empresa/${e.slug}` })) },
    }, buildFAQSchema(perguntas)],
  });

  if (!valido) return <div className="container mx-auto px-4 py-16"><h1 className="text-2xl font-bold">Localidade não encontrada</h1><Link to="/" className="text-primary underline">Voltar ao guia</Link></div>;

  return <div className="container mx-auto px-4 py-8 max-w-6xl">
    <nav aria-label="Caminho da página" className="flex flex-wrap gap-2 text-sm mb-6">{breadcrumbs.map((b, i) => <span key={b.url}>{i > 0 && <span aria-hidden="true"> / </span>}{i === breadcrumbs.length - 1 ? b.name : <Link to={b.url} className="text-primary underline">{b.name}</Link>}</span>)}</nav>
    <header className="rounded-2xl bg-muted p-6 md:p-10 mb-8">
      <p className="text-sm font-semibold text-primary mb-2">Guia local • Contato direto com prestadores</p>
      <h1 className="text-2xl md:text-4xl font-black mb-4">Encanadores e desentupidoras em {localCompleto}</h1>
      <p className="text-muted-foreground leading-relaxed mb-5">Precisa resolver um entupimento, vazamento ou reparo hidráulico? Compare os perfis abaixo e combine o atendimento diretamente com a empresa escolhida. O Serviços no Bairro é um guia de prestadores independentes, não uma única desentupidora.</p>
      <div className="flex flex-wrap gap-3"><a href="#empresas-locais" className="inline-flex items-center justify-center min-h-12 rounded-lg px-5 bg-primary text-primary-foreground font-bold">Ver empresas e contatos</a><a href="#planejar" className="inline-flex items-center min-h-12 rounded-lg px-5 border font-semibold">Preparar meu orçamento</a>{cadastro && !ficha && <a href="#bairros-da-cidade" className="inline-flex items-center min-h-12 rounded-lg px-5 border font-semibold">Escolher bairro</a>}</div>
    </header>
    <div className="mb-8"><SearchBar /></div>

    <section className="mb-10" aria-labelledby="orientacao-local">
      <h2 id="orientacao-local" className="text-xl font-bold mb-3">Atendimento em {localCompleto}: como orientar o chamado</h2>
      {ficha ? <><p className="leading-relaxed mb-3">{ficha.contexto}</p><p className="leading-relaxed mb-3">{ficha.orientacao}</p><a href={ficha.fonte} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">Consultar referência municipal do bairro</a></> : <>
        <p className="leading-relaxed mb-3">{cadastro?.contexto || `Para um atendimento em ${localCompleto}, informe o endereço completo e o nome usado no cadastro do imóvel. Bairro e cidade precisam acompanhar o ponto de referência para evitar confusão com localidades de mesmo nome.`}</p>
        <p className="leading-relaxed">{bairroData ? `No pedido para ${nome}, Curitiba, diferencie o ponto do problema do endereço de acesso: em apartamento ou condomínio, indique bloco, portaria e quem libera as áreas comuns. Se o nome de uma vila ou loteamento for mais conhecido, informe também o bairro do endereço.` : `A cobertura inclui os bairros de ${cidadeNome}. Para cada chamado, combine serviço, disponibilidade, deslocamento e acesso diretamente com o prestador. Atendimento na cidade não significa que a empresa tenha uma filial em cada bairro.`}</p>
      </>}
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        <article className="border rounded-xl p-5"><h3 className="font-bold mb-2">Casa ou sobrado</h3><p className="text-sm leading-relaxed">Informe se o problema está em pia, ralo, vaso ou área externa, quais ambientes são afetados e onde ficam os acessos à tubulação.</p></article>
        <article className="border rounded-xl p-5"><h3 className="font-bold mb-2">Condomínio</h3><p className="text-sm leading-relaxed">Confirme com a administração se o chamado envolve unidade privativa ou área comum. Combine acesso, responsável pela autorização e horário possível.</p></article>
        <article className="border rounded-xl p-5"><h3 className="font-bold mb-2">Comércio</h3><p className="text-sm leading-relaxed">Descreva como o problema afeta a operação e informe restrições de circulação, acesso às caixas e janelas possíveis para a manutenção.</p></article>
      </div>
    </section>

    <section id="empresas-locais" className="scroll-mt-24 mb-12" aria-labelledby="empresas-titulo"><h2 id="empresas-titulo" className="text-2xl font-bold mb-3">Empresas para consultar em {localCompleto}</h2><p className="text-muted-foreground mb-5">Escolha o cadastro e use o telefone ou WhatsApp dele. Os serviços e condições variam entre as empresas; confirme a solução adequada ao seu imóvel.</p>
      {empresas.length ? <div className="space-y-4">{empresas.map(e => <CompanyCard key={e.slug} empresa={e} />)}</div> : <p className="rounded-xl border p-5">A seleção de perfis desta cidade está em atualização. <Link to="/busca" className="text-primary underline">Consulte os prestadores no guia</Link> e confirme o atendimento ao seu endereço.</p>}
    </section>

    <section className="mb-12" aria-labelledby="problemas"><h2 id="problemas" className="text-2xl font-bold mb-4">Qual problema você precisa resolver?</h2><p className="mb-5 text-muted-foreground">Use estes sinais para descrever o chamado, não como diagnóstico. Os guias explicam o serviço; a execução depende da avaliação e do perfil escolhido.</p><div className="grid md:grid-cols-2 gap-4">{hiringTopics.map(t => <article key={t.slug} className="rounded-xl border p-5"><h3 className="font-bold text-lg mb-2">{t.title}</h3><p className="leading-relaxed text-sm mb-3">{t.text}</p><Link to={`/servicos/${t.slug}`} className="text-primary underline font-medium">Entender este serviço →</Link></article>)}</div></section>

    <section id="planejar" className="scroll-mt-24 mb-12 rounded-2xl bg-muted p-6"><h2 className="text-2xl font-bold mb-4">Antes de autorizar o serviço em {localCompleto}</h2><ol className="list-decimal pl-5 space-y-3"><li><strong>Descreva o caso.</strong> Envie endereço, cidade, bairro, fotos e quais pontos estão afetados. Informe qualquer tentativa anterior de desobstrução.</li><li><strong>Peça o escopo por escrito.</strong> Confira visita, diagnóstico, mão de obra, peças, deslocamento e recomposição de acabamento.</li><li><strong>Entenda a cobrança.</strong> Quando houver preço por metro, hora ou volume, combine a medição e o limite que exige uma nova autorização. Não compare apenas o preço inicial do anúncio.</li><li><strong>Combine conclusão e garantia.</strong> Peça demonstração do funcionamento e comprovante do serviço, com as condições de garantia oferecidas pelo prestador.</li></ol><p className="mt-4 text-sm">Não há preço único para todas as empresas do guia nem prazo de chegada garantido pelo portal.</p></section>

    {cadastro && !ficha && <section id="bairros-da-cidade" className="scroll-mt-24 mb-12"><h2 className="text-2xl font-bold mb-3">Bairros e localidades de {cidadeNome}</h2><p className="mb-4">Encontre o nome do seu bairro para organizar o chamado. Os links “Guia do bairro” abrem páginas individuais; as demais localidades já aparecem neste índice e compartilham os prestadores da cidade.</p><label htmlFor="filtro-bairros" className="block font-semibold mb-2">Filtrar bairros de {cidadeNome}</label><input id="filtro-bairros" type="search" value={filtroBairros} onChange={e => setFiltroBairros(e.target.value)} className="border rounded-lg p-3 w-full max-w-md mb-5 bg-background" placeholder="Digite o nome do bairro" />
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{cadastro.bairros.filter(n => normalizar(n).includes(normalizar(filtroBairros))).map(n => { const individual = fichasBairrosRMC.find(f => f.cidade === cidadeData!.slug && f.slug === slugLocal(n)); return <li key={n} className="border rounded-xl p-4"><h3 className="font-bold mb-2">{n}</h3><p className="text-xs text-muted-foreground mb-2">{cadastro.classificacoes[n]}</p>{individual ? <Link to={`/rmc/${cidadeData!.slug}/${individual.slug}`} className="text-primary underline">Guia do bairro →</Link> : <a href="#empresas-locais" className="text-primary underline">Consultar prestadores da cidade</a>}</li>; })}</ul>
      {!cadastro.bairros.some(n => normalizar(n).includes(normalizar(filtroBairros))) && <p role="status" className="mt-4">Nome não localizado neste índice. Confira a grafia ou consulte o prestador informando seu endereço completo.</p>}<p className="text-sm mt-5">Nomes e classificação: <a href={cadastro.fonte} target="_blank" rel="noopener noreferrer" className="text-primary underline">fonte municipal</a>. {cadastro.nota}</p></section>}

    <LocalRequestPlanner key={path} place={localCompleto} />
    <section className="mb-12" aria-labelledby="duvidas"><h2 id="duvidas" className="text-2xl font-bold mb-4">Dúvidas sobre atendimento em {localCompleto}</h2><div className="space-y-3">{perguntas.map(q => <details key={q.pergunta} className="border rounded-xl p-5"><summary className="font-bold cursor-pointer min-h-8">{q.pergunta}</summary><p className="mt-3 leading-relaxed">{q.resposta}</p></details>)}</div></section>
    <aside className="border rounded-xl p-5 mb-10"><h2 className="font-bold mb-2">Cuidados com a rede de esgoto</h2><p className="text-sm leading-relaxed">Evite descartar óleo e objetos no vaso ou no ralo. Água de chuva e esgoto têm destinos diferentes; uma avaliação técnica ajuda a identificar ligações inadequadas. <a href="https://www.sanepar.com.br/ligacao-na-rede" className="text-primary underline" target="_blank" rel="noopener noreferrer">Veja as orientações da Sanepar</a>.</p></aside>
    <nav aria-label="Outras localidades" className="border-t pt-6"><h2 className="font-bold mb-4">Continue por cidade e bairro</h2><div className="flex flex-wrap gap-3"><Link to="/curitiba" className="border rounded-lg px-4 py-3">Curitiba</Link>{cidadesRMC.filter(c => !cidadeData || c.slug !== cidadeData.slug || ficha).map(c => <Link key={c.slug} to={`/rmc/${c.slug}`} className="border rounded-lg px-4 py-3 hover:text-primary">{c.nome}</Link>)}</div></nav>
  </div>;
}
