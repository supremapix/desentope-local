import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { CompanyCard } from '@/components/CompanyCard';
import { regionais } from '@/data/bairros';
import { cidadesRMC } from '@/data/cidades-rmc';
import { categoriasRapidas } from '@/data/servicos';
import { getEmpresasDestaque } from '@/data/empresas';
import { Shield, Clock, Star, Zap, AlertTriangle } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';

function toSlug(nome: string): string {
  return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const Index = () => {
  const empresasDestaque = getEmpresasDestaque();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Desentupidoras e Encanadores<br className="hidden md:block" /> em Curitiba e Região
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Encontre profissionais verificados, disponíveis 24h, perto de você
          </p>

          <SearchBar />

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium text-primary-foreground/70">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-secondary" /> Resposta em até 15min</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-accent" /> +500 empresas cadastradas</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-secondary" /> Avaliações reais</span>
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
          <p className="text-lg mb-6 text-destructive-foreground/80">Esgoto voltando? Vaso transbordando? Encontre atendimento 24h imediato.</p>
          <Link
            to="/busca?24h=true"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-card text-foreground font-bold hover:bg-card/90 transition-colors text-lg"
          >
            Ver Empresas Disponíveis Agora →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
