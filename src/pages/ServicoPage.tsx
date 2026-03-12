import { useParams, Link } from 'react-router-dom';
import { getServicoBySlug } from '@/data/servicos';
import { getEmpresasPorServico } from '@/data/empresas';
import { CompanyCard } from '@/components/CompanyCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useEffect } from 'react';

const ServicoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const servico = getServicoBySlug(slug || '');
  const empresas = getEmpresasPorServico(slug || '');

  useEffect(() => {
    if (servico) {
      document.title = `${servico.nome} em Curitiba | Serviços no Bairro`;
    }
  }, [servico]);

  if (!servico) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
        <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
      </div>
    );
  }

  const faqServico = [
    { q: `Quanto custa ${servico.nome.toLowerCase()} em Curitiba?`, a: `O preço médio para ${servico.nome.toLowerCase()} em Curitiba é ${servico.precoMedio || 'sob consulta'}. Valores variam conforme a gravidade do problema e o profissional contratado.` },
    { q: `${servico.nome} tem atendimento 24 horas?`, a: `Sim! Diversas empresas oferecem ${servico.nome.toLowerCase()} com atendimento 24 horas em Curitiba. Confira as empresas listadas abaixo e filtre por disponibilidade.` },
    { q: `Como funciona o serviço de ${servico.nome.toLowerCase()}?`, a: servico.descricao },
  ];

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
          <div className="text-5xl mb-4">{servico.icone}</div>
          <h1 className="text-2xl md:text-3xl font-black mb-4">{servico.nome} em Curitiba</h1>
          <p className="text-muted-foreground text-lg mb-4">{servico.descricao}</p>
          {servico.precoMedio && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-lg font-bold mb-8">
              💰 Preço médio: {servico.precoMedio}
            </div>
          )}

          {/* Empresas */}
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

          {/* FAQ */}
          <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="bg-card rounded-xl border p-4 mb-8">
            {faqServico.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ServicoPage;
