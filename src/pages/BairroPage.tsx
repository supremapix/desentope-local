import { useParams, Link } from 'react-router-dom';
import { getBairroBySlug, regionais } from '@/data/bairros';
import { getEmpresasPorBairro } from '@/data/empresas';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useEffect } from 'react';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const BairroPage = () => {
  const { bairro } = useParams<{ bairro: string }>();
  const bairroData = getBairroBySlug(bairro || '');
  const empresas = getEmpresasPorBairro(bairro || '');

  useEffect(() => {
    if (bairroData) {
      document.title = `Desentupidoras no ${bairroData.nome} — Curitiba | 24h | Serviços no Bairro`;
    }
  }, [bairroData]);

  if (!bairroData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Bairro não encontrado</h1>
        <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
      </div>
    );
  }

  const vizinhosNomes = bairroData.vizinhos.map(slug => {
    const found = Object.values(regionais).flat().find(n => toSlug(n) === slug);
    return found ? { nome: found, slug } : null;
  }).filter(Boolean);

  const faqBairro = [
    { q: `Quanto custa um desentupimento no ${bairroData.nome}?`, a: `O preço médio de desentupimento no ${bairroData.nome} varia de R$ 150 a R$ 500, dependendo do tipo de serviço. Solicite orçamentos gratuitos pelo WhatsApp das empresas listadas acima.` },
    { q: `Tem desentupidora 24h no ${bairroData.nome}?`, a: `Sim! Diversas empresas oferecem atendimento 24 horas no ${bairroData.nome}. Use o filtro "24h" para encontrar as opções disponíveis agora.` },
    { q: `Como escolher uma desentupidora no ${bairroData.nome}?`, a: 'Verifique as avaliações, se a empresa é verificada, formas de pagamento aceitas e se oferece garantia. No Serviços no Bairro, todas as informações estão disponíveis para facilitar sua escolha.' },
    { q: `Encanador no ${bairroData.nome} aceita cartão?`, a: 'Muitos encanadores e desentupidoras aceitam cartão de crédito e débito. Verifique as formas de pagamento no perfil de cada empresa.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Brasil</Link>
          <span className="mx-2">›</span>
          <span>Paraná</span>
          <span className="mx-2">›</span>
          <Link to="/" className="hover:text-primary">Curitiba</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">{bairroData.nome}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-black mb-2">
          Desentupidoras no {bairroData.nome} — Curitiba | 24h
        </h1>
        <p className="text-muted-foreground mb-6">
          Encontre desentupidoras e encanadores no {bairroData.nome}, regional {bairroData.regional} de Curitiba. 
          Profissionais verificados com atendimento 24h, orçamento grátis via WhatsApp. 
          {empresas.length > 0 ? ` ${empresas.length} empresas atendem este bairro.` : ' Em breve novas empresas nesta região.'}
        </p>

        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Empresas */}
        {empresas.length > 0 ? (
          <div className="space-y-4 mb-12">
            <h2 className="text-xl font-bold">Empresas no {bairroData.nome}</h2>
            {empresas.map(e => (
              <CompanyCard key={e.slug} empresa={e} />
            ))}
          </div>
        ) : (
          <div className="bg-muted rounded-xl p-8 text-center mb-12">
            <p className="text-lg font-medium mb-2">Nenhuma empresa cadastrada neste bairro ainda</p>
            <p className="text-muted-foreground mb-4">Em breve teremos profissionais disponíveis no {bairroData.nome}.</p>
            <Link to="/busca" className="text-primary font-bold hover:underline">Buscar em bairros vizinhos →</Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Perguntas Frequentes — {bairroData.nome}</h2>
          <Accordion type="single" collapsible className="bg-card rounded-xl border p-4">
            {faqBairro.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bairros vizinhos */}
        {vizinhosNomes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bairros Vizinhos</h2>
            <div className="flex flex-wrap gap-2">
              {vizinhosNomes.map(v => v && (
                <Link
                  key={v.slug}
                  to={`/curitiba/${v.slug}`}
                  className="bg-muted px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {v.nome}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Não encontrou o que procura?</h2>
          <p className="text-primary-foreground/80 mb-4">Solicite um orçamento e receba respostas em minutos.</p>
          <Link
            to="/busca"
            className="inline-flex items-center h-11 px-6 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors"
          >
            Solicitar Orçamento →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BairroPage;
