import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { CompanyCard } from '@/components/CompanyCard';
import { regionais } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { bairrosSaoPaulo, cidadesSaoPauloRegiao } from '@/data/bairros-sp';
import { cidadesSantaCatarina } from '@/data/cidades-sc';
import { categoriasRapidas } from '@/data/servicos';
import { getEmpresasDestaque } from '@/data/empresas';
import { Shield, Clock, Star, Zap, AlertTriangle, Search, ShieldCheck, MessageCircle } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { useSEO, buildWebsiteSchema, buildOrganizationSchema, buildFAQSchema } from '@/hooks/useSEO';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const perguntasHome = [
  {
    pergunta: 'Como encontrar um profissional ou empresa de serviços perto de mim?',
    resposta:
      'Digite o serviço que você precisa e o nome da sua cidade ou bairro na busca do Serviços no Bairro. A plataforma lista as empresas cadastradas que declaram atender aquela região, com serviços oferecidos, áreas de cobertura e contato direto por WhatsApp ou telefone.',
  },
  {
    pergunta: 'O Serviços no Bairro executa os serviços anunciados?',
    resposta:
      'Não. O Serviços no Bairro é um diretório: conectamos você às empresas e profissionais cadastrados. A execução, o orçamento, a garantia e a nota fiscal são responsabilidade da empresa contratada.',
  },
  {
    pergunta: 'Quem atende no meu bairro?',
    resposta:
      'Cada página de bairro e de cidade lista as empresas cadastradas que informam atender aquela área, além de bairros e cidades vizinhas. Se ainda não houver empresa para o seu bairro, a busca sugere prestadores das regiões próximas.',
  },
  {
    pergunta: 'O que significa uma empresa "Verificada"?',
    resposta:
      'Significa que nossa equipe conferiu os dados informados no cadastro — nome, contato, endereço e existência da empresa. Não é auditoria de qualidade nem garantia de execução, e nem toda empresa do diretório é verificada.',
  },
  {
    pergunta: 'Preciso pagar para usar o Serviços no Bairro?',
    resposta:
      'Não há cobrança para quem procura um serviço. A busca e o contato com as empresas são gratuitos. Empresas que desejam divulgar seus serviços podem se cadastrar na página "Cadastrar minha empresa".',
  },
];

const Index = () => {
  const empresasDestaque = getEmpresasDestaque();

  useSEO({
    title: 'Serviços no Bairro | Empresas e Profissionais Perto de Você',
    description: 'Encontre empresas e profissionais de serviços por categoria, cidade e bairro. Diretório com perfis, áreas atendidas e contato direto por WhatsApp — Curitiba, RMC, São Paulo, Osasco e litoral de SC.',
    canonical: '/',
    jsonLd: [buildFAQSchema(perguntasHome)],
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 border-b border-border/80 bg-gradient-to-b from-card via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Guia regional de serviços com contato direto
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-[1.15] tracking-tight text-foreground max-w-3xl mx-auto">
            Encontre Empresas e Profissionais de Serviços Perto de Você
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Catálogo regional organizado por especialidade, cidade e bairro.
            Consulte perfis com dados conferidos, áreas de atendimento e fale direto com o prestador pelo WhatsApp.
          </p>

          <SearchBar />

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Perfis com dados de contato conferidos
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              Identificação de plantão 24h para urgências
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Negociação sem taxa de intermediação
            </span>
          </div>
        </div>
      </section>

      {/* Categorias Rápidas */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">O que você precisa?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categoriasRapidas.map(s => (
              <Link
                key={s.slug}
                to={`/servicos/${s.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border hover:border-primary hover:shadow-md transition-all text-center group"
              >
                <ServiceIcon name={s.icone} className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-foreground group-hover:text-primary leading-tight">{s.nome}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bairros por Regional */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Bairros de Curitiba</h2>
          <p className="text-center text-muted-foreground mb-8">75 bairros organizados por regional</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(regionais).map(([regional, bairrosNomes]) => (
              <div key={regional} className="bg-card rounded-xl p-5 border">
                <h3 className="font-bold text-primary mb-3">Regional {regional}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {bairrosNomes.map(b => (
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
        </div>
      </section>

      {/* Cidades RMC */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Região Metropolitana</h2>
          <p className="text-center text-muted-foreground mb-8">29 cidades da RMC + entorno</p>

          <div className="flex flex-wrap justify-center gap-2">
            {cidadesRMC.slice(0, 15).map(c => (
              <Link
                key={c.slug}
                to={`/rmc/${c.slug}`}
                className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm"
              >
                <span className="font-medium">{c.nome}</span>
                <span className="text-muted-foreground ml-1.5 text-xs">({c.distanciaKm}km)</span>
              </Link>
            ))}
            <Link to="/busca" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors">
              Ver todas →
            </Link>
          </div>
        </div>
      </section>

      {/* São Paulo — bairros e região */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Atendimento em São Paulo e Grande SP</h2>
          <p className="text-center text-muted-foreground mb-8">
            Motofrete e entregas com coleta no Centro de São Paulo e região, em um raio de até 60 km — e viagens
            frequentes São Paulo → Curitiba, além de serviços de lavanderia profissional em Osasco.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/empresa/motofrete-sao-paulo-curitiba"
              className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
            >
              Motofrete São Paulo — Centro e Região (60 km)
            </Link>
            <Link
              to="/empresa/lavanderia-inovata-osasco"
              className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
            >
              Lavanderia Inovata — Osasco e Região
            </Link>
            <Link to="/busca" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors">
              Buscar empresas em São Paulo →
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6 max-w-3xl mx-auto">
            Coletas e entregas atendendo o Centro, Vila Leopoldina, Lapa, Pinheiros, Moema, Osasco, Barueri, Guarulhos e demais regiões de SP.
          </p>
        </div>
      </section>

      {/* Santa Catarina — Navegantes e litoral */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Cidades de Santa Catarina atendidas</h2>
          <p className="text-center text-muted-foreground mb-8">
            Assistência técnica em refrigeração comercial, industrial e residencial com base em Navegantes (SC):
            câmara fria, freezer, balcão refrigerado, geladeira, frigobar e mais.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/empresa/santa-catarina-refrigeracao-navegantes"
              className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
            >
              Santa Catarina Refrigeração — Navegantes
            </Link>
            <Link
              to="/empresa/refrigeracao-navegantes-sc"
              className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
            >
              Refrigeração Navegantes SC — Assistência Técnica
            </Link>
            <Link
              to="/servicos/conserto-cervejeira-navegantes"
              className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
            >
              Conserto de Cervejeira em Navegantes
            </Link>
            <Link to="/busca" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors">
              Buscar empresas em Santa Catarina →
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-14 bg-background border-t border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Como Funciona o Guia de Serviços</h2>
            <p className="text-sm text-muted-foreground">Etapas objetivas para consultar, avaliar e contatar profissionais na sua localidade</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">Passo 01</span>
                <h3 className="font-bold text-base text-foreground mt-2 mb-2">Localize a cobertura</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Selecione o tipo de serviço e sua cidade ou bairro para visualizar empresas com rota de atendimento confirmada.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">Passo 02</span>
                <h3 className="font-bold text-base text-foreground mt-2 mb-2">Verifique as credenciais</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Confira especialidades, disponibilidade de plantão 24h para urgências e o selo de verificação cadastral.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">Passo 03</span>
                <h3 className="font-bold text-base text-foreground mt-2 mb-2">Fale direto com a equipe</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Inicie o atendimento pelo WhatsApp ou telefone. Você negocia prazos, orçamentos e detalhes diretamente com o técnico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas em Destaque */}
      <section className="py-14 bg-muted/50 border-t border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-1.5">Empresas em Destaque</h2>
            <p className="text-sm text-muted-foreground">Prestadores cadastrados com histórico e atuação regional</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {empresasDestaque.map(e => (
              <CompanyCard key={e.slug} empresa={e} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/busca"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-xs"
            >
              Consultar catálogo completo de empresas →
            </Link>
          </div>
        </div>
      </section>

      {/* Plantão 24h & Urgências */}
      <section className="py-14 bg-slate-900 text-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium mb-4">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              Atendimento Noturno e Fins de Semana
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Precisa de atendimento de urgência agora?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              Casos como refluxo de esgoto, vazamentos graves ou falhas em câmaras frigoríficas exigem prontidão imediata.
              Consulte a listagem de empresas que oferecem escala de plantão 24 horas na sua região.
            </p>
            <Link
              to="/busca?24h=true"
              className="inline-flex items-center justify-center h-11 px-7 rounded-md bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors shadow-sm"
            >
              Ver empresas com plantão 24h disponível →
            </Link>
          </div>
        </div>
      </section>
      {/* Sobre o Serviços no Bairro */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-6">Sobre o Serviços no Bairro</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              O Serviços no Bairro é um diretório de empresas e profissionais de serviços organizado por categoria, cidade e bairro. A plataforma não executa serviços: ela reúne perfis com descrição, serviços oferecidos, áreas atendidas e contato direto, para que você fale com a empresa que atende a sua região.
            </p>
            <p>
              O selo "Verificado" indica que nossa equipe conferiu os dados informados no cadastro — nome, contato, endereço e existência da empresa. Não é auditoria de qualidade nem garantia de execução, e nem toda empresa listada é verificada. Avaliações exibidas pertencem ao perfil de origem da empresa e faixas de preço são médias de mercado, não tabela oficial.
            </p>
            <p>
              A cobertura atual concentra-se em Curitiba (75 bairros, 9 regionais) e nas 29 cidades da Região Metropolitana, além de São Paulo capital, Grande São Paulo e Osasco, e de 23 cidades do litoral norte e Vale do Itajaí em Santa Catarina. Categorias ativas: hidráulica e desentupimento, motofrete e entregas, lavanderia e passadoria, refrigeração e climatização. Novas categorias e cidades entram no ar conforme empresas reais são cadastradas.
            </p>
          </div>
        </div>
      </section>

      {/* Respostas rápidas (AEO/GEO) */}
      <section className="py-14 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-6">Perguntas frequentes sobre encontrar serviços perto de você</h2>
          <dl className="space-y-5">
            {perguntasHome.map(f => (
              <div key={f.pergunta} className="bg-card border rounded-xl p-5">
                <dt className="font-semibold text-foreground mb-1">{f.pergunta}</dt>
                <dd className="text-sm text-muted-foreground">{f.resposta}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

    </div>
  );
};

export default Index;
