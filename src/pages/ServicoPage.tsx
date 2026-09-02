import { useParams, Link } from 'react-router-dom';
import { getServicoBySlug } from '@/data/servicos';
import { getEmpresasPorServico } from '@/data/empresas';
import { CompanyCard } from '@/components/CompanyCard';
import { ServiceIcon } from '@/components/ServiceIcon';
import { FaqPremium } from '@/components/FaqPremium';
import { DicasRapidas } from '@/components/DicasRapidas';
import { getAllFaqServico, getDicasServico, getFaqServico } from '@/data/faq-servicos';
import { DollarSign } from 'lucide-react';
import { useSEO, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';

const ServicoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const servico = getServicoBySlug(slug || '');
  const empresas = getEmpresasPorServico(slug || '');

  // Região principal por categoria de serviço (SEO semântico correto por segmento)
  const regiao = servico?.categoria === 'lavanderia'
    ? 'Osasco e Região'
    : servico?.categoria === 'motofrete'
      ? 'São Paulo e Curitiba'
      : 'Curitiba';

  const faqData = getFaqServico(slug || '');
  const allFaqItems = getAllFaqServico(slug || '');
  const dicas = getDicasServico(slug || '');

  const faqServico = allFaqItems.length > 0
    ? allFaqItems.map(f => ({ pergunta: f.pergunta, resposta: f.resposta, categoria: f.categoria }))
    : servico ? [
      { pergunta: `Quanto custa ${servico.nome.toLowerCase()} em ${regiao}?`, resposta: `O preço médio para ${servico.nome.toLowerCase()} em ${regiao} é ${servico.precoMedio || 'sob consulta'}.`, categoria: 'precos' },
      { pergunta: `${servico.nome} tem atendimento 24 horas?`, resposta: `Sim! Diversas empresas oferecem ${servico.nome.toLowerCase()} com atendimento 24 horas em ${regiao}.`, categoria: 'emergencia' },
      { pergunta: `Como funciona o serviço de ${servico.nome.toLowerCase()}?`, resposta: servico.descricao, categoria: 'tecnico' },
    ] : [];

  useSEO({
    title: servico ? `${servico.nome} em ${regiao} — Preços, Empresas e 24h | Serviços no Bairro` : 'Serviço não encontrado',
    description: servico ? `${servico.descricao} Preço médio: ${servico.precoMedio || 'sob consulta'}. ${empresas.length} empresas disponíveis em ${regiao}. Orçamento grátis.` : '',
    canonical: servico ? `/servicos/${servico.slug}` : undefined,
    jsonLd: servico ? [
      buildServiceSchema(servico.nome, servico.descricao, servico.precoMedio, empresas.length),
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Serviços', url: '/busca' },
        { name: servico.nome, url: `/servicos/${servico.slug}` },
      ]),
      buildFAQSchema(faqServico),
    ] : undefined,
  });

  if (!servico) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
        <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <span>Serviços</span>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">{servico.nome}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <ServiceIcon name={servico.icone} className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-2xl md:text-3xl font-black mb-4">{servico.nome} em {regiao}</h1>
          <p className="text-muted-foreground text-lg mb-4">{servico.descricao}</p>
          {servico.precoMedio && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-lg font-bold mb-8">
              <DollarSign className="h-4 w-4" /> Preço médio: {servico.precoMedio}
            </div>
          )}

          <h2 className="text-xl font-bold mb-4 mt-8">
            Empresas que oferecem {servico.nome} ({empresas.length})
          </h2>
          {empresas.length > 0 ? (
            <div className="space-y-4 mb-12">
              {empresas.map(e => <CompanyCard key={e.slug} empresa={e} />)}
            </div>
          ) : (
            <div className="bg-muted rounded-xl p-8 text-center mb-12">
              <p className="text-muted-foreground">Nenhuma empresa cadastrada para este serviço ainda.</p>
              <Link to="/busca" className="text-primary font-bold hover:underline mt-2 block">Ver todas as empresas →</Link>
            </div>
          )}

          {/* Dicas */}
          {dicas.length > 0 && <DicasRapidas dicas={dicas} />}

          {/* FAQ Premium */}
          <FaqPremium
            perguntas={faqServico}
            titulo="Perguntas Frequentes"
            subtitulo={`${faqServico.length} perguntas sobre ${servico.nome.toLowerCase()} em ${regiao}`}
            mostrarBusca={faqServico.length > 5}
            mostrarAbas={!!faqData}
            limitePorCategoria={5}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicoPage;
