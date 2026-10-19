import { useParams, Link } from 'react-router-dom';
import { getServicoBySlug } from '@/data/servicos';
import { getEmpresasPorServico } from '@/data/empresas';
import { cidadesRMC, entornoAmplo } from '@/data/cidades-rmc';
import { cidadesSaoPauloRegiao } from '@/data/bairros-sp';
import { cidadesSantaCatarina } from '@/data/cidades-sc';
import { CompanyCard } from '@/components/CompanyCard';
import { ServiceIcon } from '@/components/ServiceIcon';
import { FaqPremium } from '@/components/FaqPremium';
import { DicasRapidas } from '@/components/DicasRapidas';
import { getAllFaqServico, getDicasServico, getFaqServico } from '@/data/faq-servicos';
import { DollarSign } from 'lucide-react';
import { useSEO, buildServiceSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';

const normalizarCidade = (cidade: string) => cidade.trim().toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');

const nomesCidades = new Map([
  { slug: 'curitiba', nome: 'Curitiba' },
  ...cidadesRMC,
  ...entornoAmplo,
  ...cidadesSaoPauloRegiao,
  ...cidadesSantaCatarina,
].map(cidade => [cidade.slug, cidade.nome]));

const ServicoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const servico = getServicoBySlug(slug || '');
  const empresas = getEmpresasPorServico(slug || '');

  // Cobertura declarada nos cadastros, nunca inferida da categoria ou sede.
  const regioes = [...new Map(empresas.flatMap(empresa => empresa.cidadesAtendidas)
    .filter(cidade => cidade.trim())
    .map(cidade => {
      const chave = normalizarCidade(cidade);
      return [chave, nomesCidades.get(chave) || cidade.trim()] as const;
    })).values()];
  const localTitulo = regioes.length > 0 && regioes.length <= 3 ? ` em ${regioes.join(', ')}` : '';
  const resumoCadastros = empresas.length === 0
    ? 'Nenhuma empresa cadastrada para este serviço.'
    : `${empresas.length} ${empresas.length === 1 ? 'empresa cadastrada' : 'empresas cadastradas'} para este serviço.`;
  const empresas24h = empresas.filter(empresa => empresa.atende24h).length;
  const resposta24h = empresas.length === 0
    ? 'Ainda não há empresa cadastrada para este serviço. Não há confirmação de atendimento 24 horas.'
    : empresas24h === 0
      ? 'Nenhuma das empresas cadastradas informa atendimento 24 horas. Consulte os horários e a disponibilidade diretamente com a empresa.'
      : `${empresas24h} ${empresas24h === 1 ? 'empresa cadastrada informa' : 'empresas cadastradas informam'} atendimento 24 horas. Confirme a disponibilidade para o serviço e a sua região diretamente com a empresa.`;
  const precoInformado = servico?.precoMedio?.trim();
  const sobConsulta = !precoInformado || /^sob consulta$/i.test(precoInformado);
  const resumoPreco = sobConsulta
    ? `Preço: ${precoInformado || 'sob consulta'}.`
    : `Referência de preço publicada: ${servico?.precoMedio}.`;

  const faqData = getFaqServico(slug || '');
  const allFaqItems = getAllFaqServico(slug || '');
  const dicas = getDicasServico(slug || '');

  const faqServico = allFaqItems.length > 0
    ? allFaqItems.map(f => ({ pergunta: f.pergunta, resposta: f.resposta, categoria: f.categoria }))
    : servico ? [
      { pergunta: `Quanto custa ${servico.nome.toLowerCase()}?`, resposta: `${resumoPreco} Consulte a empresa para confirmar o valor e as condições do serviço.`, categoria: 'precos' },
      { pergunta: `${servico.nome} tem atendimento 24 horas?`, resposta: resposta24h, categoria: 'emergencia' },
      { pergunta: `Como funciona o serviço de ${servico.nome.toLowerCase()}?`, resposta: servico.descricao, categoria: 'tecnico' },
    ] : [];

  useSEO({
    title: servico ? `${servico.nome}${localTitulo} — Empresas e informações | Serviços no Bairro` : 'Serviço não encontrado',
    description: servico ? `${servico.descricao} ${resumoPreco} ${resumoCadastros}` : '',
    canonical: servico ? `/servicos/${servico.slug}` : undefined,
    noindex: !servico,
    omitGeo: true,
    jsonLd: servico ? [
      buildServiceSchema(servico.nome, servico.descricao, servico.precoMedio, empresas.length, {
        regioes,
        listagem: { url: `/servicos/${servico.slug}`, empresas },
      }),
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
          <h1 className="text-2xl md:text-3xl font-black mb-4">{servico.nome}{localTitulo}</h1>
          <p className="text-muted-foreground text-lg mb-4">{servico.descricao}</p>
          {servico.precoMedio && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-lg font-bold mb-8">
              <DollarSign className="h-4 w-4" /> {sobConsulta ? 'Preço' : 'Referência de preço'}: {servico.precoMedio}
            </div>
          )}

          <p className="text-sm text-muted-foreground">{resumoCadastros} O portal é um diretório e não executa os serviços. Confirme preço, horário e disponibilidade diretamente com cada empresa.</p>
          {regioes.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">Localidades citadas nos cadastros: {regioes.join(', ')}. Confirme origem, destino, bairros e condições de atendimento diretamente com a empresa.</p>
          )}

          {servico.categoria === 'motofrete' && empresas.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">A lista de localidades não significa atendimento em qualquer trajeto. Consulte o perfil para conferir a rota anunciada.</p>
          )}

          <h2 className="text-xl font-bold mb-4 mt-8">
            Empresas cadastradas para {servico.nome} ({empresas.length})
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
            subtitulo={`${faqServico.length} perguntas sobre ${servico.nome.toLowerCase()}${localTitulo}`}
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
