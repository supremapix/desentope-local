import { Link } from 'react-router-dom';
import { ServiceIcon } from './ServiceIcon';
import { hubsCuritiba } from '@/data/hubs-curitiba';

export function CuritibaCategoryLinks() {
  return (
    <section className="py-12 bg-muted" aria-labelledby="guias-curitiba-titulo">
      <div className="container mx-auto px-4">
        <h2 id="guias-curitiba-titulo" className="text-2xl font-bold text-center mb-2">Mudanças, transportes e entregas em Curitiba</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">Guias para escolher o serviço, preparar o orçamento e consultar a cobertura dos cadastros. As categorias estão em formação.</p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {hubsCuritiba.map((hub) => (
            <Link key={hub.slug} to={hub.path} className="rounded-xl bg-card border p-6 hover:border-primary transition-colors">
              <ServiceIcon name={hub.icone} className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">{hub.nome} em Curitiba</h3>
              <p className="text-sm text-muted-foreground mb-4">{hub.descricao}</p>
              <span className="text-sm text-primary font-semibold">Consultar guia e serviços →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
