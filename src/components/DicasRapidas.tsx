import type { DicaRapida } from '@/data/faq-servicos';

interface DicasRapidasProps {
  dicas: DicaRapida[];
  titulo?: string;
}

export function DicasRapidas({ dicas, titulo = 'Orientações práticas de contratação' }: DicasRapidasProps) {
  if (!dicas.length) return null;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold tracking-tight mb-4 text-foreground">{titulo}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {dicas.map((dica, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-4.5 transition-colors hover:border-foreground/20"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base" aria-hidden="true">{dica.icone}</span>
              <h3 className="font-semibold text-sm text-foreground">{dica.titulo}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-6">{dica.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

