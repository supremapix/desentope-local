import { useParams, Link } from 'react-router-dom';
import { getBairroBySlug, regionais } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { getEmpresasPorBairro, getEmpresasPorCidade, getCoordenadasBairro } from '@/data/empresas';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { FaqPremium } from '@/components/FaqPremium';
import { DicasRapidas } from '@/components/DicasRapidas';
import { getFaqBairro } from '@/data/faq-bairros';
import { getFaqCidade } from '@/data/faq-cidades';
import { useSEO, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const BairroPage = () => {
  const { bairro } = useParams<{ bairro: string }>();
  
  // Try as bairro first, then as RMC city
  const bairroData = getBairroBySlug(bairro || '');
  const cidadeData = !bairroData ? cidadesRMC.find(c => c.slug === bairro) : null;
  
  const localNome = bairroData?.nome || cidadeData?.nome || '';
  const localRegional = bairroData?.regional || '';
  const isCidade = !!cidadeData;
  
  const empresas = bairroData 
    ? getEmpresasPorBairro(bairro || '')
    : cidadeData 
      ? getEmpresasPorCidade(bairro || '')
      : [];

  const coords = getCoordenadasBairro(bairro || '');

  const faqDataBairro = bairroData ? getFaqBairro(bairro || '') : [];
  const faqDataCidade = cidadeData ? getFaqCidade(bairro || '') : [];
  const faqItems = (faqDataBairro.length > 0 ? faqDataBairro : faqDataCidade).map(f => ({
    pergunta: f.pergunta,
    resposta: f.resposta,
    categoria: f.categoria,
  }));

  const dicas = [
    { icone: '💡', titulo: 'Orçamento grátis', texto: `Solicite orçamento gratuito pelo WhatsApp para serviços ${isCidade ? 'em' : 'no'} ${localNome}`, tipo: 'dica' as const },
    { icone: '⚠️', titulo: 'Não use soda cáustica', texto: 'Soda cáustica corrói tubulações de PVC e pode causar queimaduras graves', tipo: 'alerta' as const },
    { icone: '✅', titulo: 'Profissional verificado', texto: 'Confira o selo de verificação e as avaliações reais no perfil da empresa', tipo: 'ok' as const },
    { icone: '🕐', titulo: 'Preventivo é mais barato', texto: 'Manutenção preventiva custa 3x menos que chamado de emergência', tipo: 'tempo' as const },
  ];

  const pageTitle = isCidade
    ? `Desentupidoras em ${localNome} — PR | 24h | Serviços no Bairro`
    : `Desentupidoras no ${localNome} — Curitiba | 24h | Serviços no Bairro`;

  useSEO({
    title: pageTitle,
    description: `Encontre desentupidoras e encanadores ${isCidade ? 'em' : 'no'} ${localNome}${!isCidade ? ', Curitiba' : ', PR'}. ${empresas.length} empresas verificadas com atendimento 24h. Orçamento grátis via WhatsApp.`,
    canonical: isCidade ? `/rmc/${bairro}` : `/curitiba/${bairro}`,
    geoPosition: coords,
    geoPlacename: isCidade ? `${localNome}, PR` : `${localNome}, Curitiba, PR`,
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        ...(isCidade ? [{ name: 'Região Metropolitana', url: '/busca' }] : [{ name: 'Curitiba', url: '/' }]),
        { name: localNome, url: isCidade ? `/rmc/${bairro}` : `/curitiba/${bairro}` },
      ]),
      buildFAQSchema(faqItems),
    ],
  });

  if (!bairroData && !cidadeData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Localidade não encontrada</h1>
        <p className="text-muted-foreground mb-4">O bairro ou cidade que você procura não está cadastrado.</p>
        <Link to="/" className="text-primary hover:underline font-bold">Voltar ao início</Link>
      </div>
    );
  }

  const vizinhosNomes = bairroData?.vizinhos?.map(slug => {
    const found = Object.values(regionais).flat().find(n => toSlug(n) === slug);
    return found ? { nome: found, slug } : null;
  }).filter(Boolean) || [];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          {isCidade ? (
            <>
              <span>Região Metropolitana</span>
              <span className="mx-2">›</span>
              <span className="text-foreground font-medium">{localNome}</span>
            </>
          ) : (
            <>
              <span>Paraná</span>
              <span className="mx-2">›</span>
              <Link to="/" className="hover:text-primary">Curitiba</Link>
              <span className="mx-2">›</span>
              <span className="text-foreground font-medium">{localNome}</span>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-black mb-2">
          Desentupidoras {isCidade ? 'em' : 'no'} {localNome} {!isCidade ? '— Curitiba' : '— PR'} | 24h
        </h1>
        <p className="text-muted-foreground mb-6">
          Encontre desentupidoras e encanadores {isCidade ? 'em' : 'no'} {localNome}
          {!isCidade && `, regional ${localRegional} de Curitiba`}. 
          Profissionais verificados com atendimento 24h, orçamento grátis via WhatsApp. 
          {empresas.length > 0 ? ` ${empresas.length} empresas atendem ${isCidade ? 'esta cidade' : 'este bairro'}.` : ''}
        </p>

        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Empresas */}
        {empresas.length > 0 ? (
          <div className="space-y-4 mb-12">
            <h2 className="text-xl font-bold">Empresas {isCidade ? 'em' : 'no'} {localNome} ({empresas.length})</h2>
            {empresas.map(e => (
              <CompanyCard key={e.slug} empresa={e} />
            ))}
          </div>
        ) : (
          <div className="bg-muted rounded-xl p-8 text-center mb-12">
            <p className="text-lg font-medium mb-2">Nenhuma empresa cadastrada nesta região ainda</p>
            <p className="text-muted-foreground mb-4">Em breve teremos profissionais disponíveis {isCidade ? 'em' : 'no'} {localNome}.</p>
            <Link to="/busca" className="text-primary font-bold hover:underline">Buscar em outras regiões →</Link>
          </div>
        )}

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Perguntas Frequentes — {localNome}</h2>
          <Accordion type="single" collapsible className="bg-card rounded-xl border p-4">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.pergunta}</AccordionTrigger>
                <AccordionContent>{item.resposta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bairros vizinhos */}
        {vizinhosNomes.length > 0 && (
          <div className="mb-12">
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
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Não encontrou o que procura?</h2>
          <p className="text-primary-foreground/80 mb-4">Solicite um orçamento e receba respostas em minutos.</p>
          <a
            href="https://wa.me/5541985171966?text=Olá! Preciso de orçamento para desentupimento/encanamento. [via página bairro - servicosnobairro.com.br]"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-11 px-6 rounded-lg bg-secondary text-secondary-foreground font-bold hover:bg-secondary/90 transition-colors"
          >
            Solicitar Orçamento →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BairroPage;
