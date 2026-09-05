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
import { useSEO, buildWebsiteSchema, buildOrganizationSchema } from '@/hooks/useSEO';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const Index = () => {
  const empresasDestaque = getEmpresasDestaque();

  useSEO({
    title: 'Serviços no Bairro | Empresas e Profissionais Perto de Você',
    description: 'Encontre empresas e profissionais de serviços por categoria, cidade e bairro. Diretório com perfis, áreas atendidas e contato direto por WhatsApp — Curitiba, RMC, São Paulo, Osasco e litoral de SC.',
    canonical: '/',
    jsonLd: [buildWebsiteSchema(), buildOrganizationSchema()],
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Encontre Empresas e Profissionais<br className="hidden md:block" /> de Serviços Perto de Você
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground mb-8 max-w-3xl mx-auto">
            Busque serviços por cidade ou bairro e encontre empresas e profissionais disponíveis na sua região.
            O Serviços no Bairro é um diretório: reunimos perfis, áreas atendidas e contatos — quem executa o serviço é a empresa escolhida por você.
          </p>

          <SearchBar />


          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium text-primary-foreground">
            <span className="flex items-center gap-1.5"><Search className="h-4 w-4 text-secondary" /> Busca por serviço, cidade e bairro</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-accent" /> Perfis com dados conferidos pela equipe</span>
            <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4 text-secondary" /> Contato direto com a empresa</span>
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
          <h2 className="text-2xl font-bold text-center mb-2">Bairros de São Paulo e Grande SP</h2>
          <p className="text-center text-muted-foreground mb-8">
            Motofrete e entregas com coleta no Centro de São Paulo e região, em um raio de até 60 km — e viagens
            frequentes São Paulo → Curitiba.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {bairrosSaoPaulo.slice(0, 24).map(b => (
              <Link
                key={b.slug}
                to={`/busca?local=${encodeURIComponent(b.nome)}`}
                className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
              >
                {b.nome.replace(' — São Paulo', '')}
              </Link>
            ))}
            <Link to="/busca?local=S%C3%A3o%20Paulo" className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-bold hover:bg-primary/90 transition-colors">
              Ver empresas em São Paulo →
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6 max-w-3xl mx-auto">
            Também atendemos {cidadesSaoPauloRegiao.slice(1, 12).map(c => c.nome).join(', ')} e demais cidades da
            Grande São Paulo.
          </p>
        </div>
      </section>



      {/* Santa Catarina — Navegantes e litoral */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Cidades de Santa Catarina atendidas</h2>
          <p className="text-center text-muted-foreground mb-8">
            Assistência técnica em refrigeração comercial, industrial e residencial com base em Navegantes (SC):
            câmara fria, freezer, balcão refrigerado, geladeira, frigobar e mais. Confirme a cobertura pelo WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {cidadesSantaCatarina.map(c => (
              <Link
                key={c.slug}
                to={`/busca?local=${encodeURIComponent(c.nome)}`}
                className="bg-card border rounded-lg px-4 py-2.5 hover:border-primary hover:shadow-sm transition-all text-sm font-medium"
              >
                {c.nome}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Como Funciona o Serviços no Bairro</h2>
          <p className="text-center text-muted-foreground mb-8">3 passos simples para encontrar empresas de serviços perto de você</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Busque seu Bairro</h3>
              <p className="text-sm text-muted-foreground">Selecione o tipo de serviço e seu bairro ou cidade na Região Metropolitana de Curitiba</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Veja Profissionais Verificados</h3>
              <p className="text-sm text-muted-foreground">Todas as empresas têm CNPJ conferido, avaliações reais e histórico de atendimento</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Peça Orçamento Grátis</h3>
              <p className="text-sm text-muted-foreground">Entre em contato pelo WhatsApp e receba resposta em até 15 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Empresas em Destaque */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Empresas em Destaque</h2>
          <p className="text-center text-muted-foreground mb-8">Profissionais verificados e bem avaliados</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {empresasDestaque.map(e => (
              <CompanyCard key={e.slug} empresa={e} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/busca" className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
              Ver Todas as Empresas →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Emergência */}
      <section className="py-16 bg-destructive text-destructive-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="h-8 w-8" /> Emergência Agora?
          </h2>
          <p className="text-lg mb-6 text-destructive-foreground">Esgoto voltando? Vaso transbordando? Encontre atendimento 24h imediato.</p>
          <Link
            to="/busca?24h=true"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-card text-foreground font-bold hover:bg-card/90 transition-colors text-lg"
          >
            Ver Empresas Disponíveis Agora →
          </Link>
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
