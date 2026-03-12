import type { DicaRapida } from '@/data/faq-servicos';

interface DicasRapidasProps {
  dicas: DicaRapida[];
  titulo?: string;
}

const BG_COLORS: Record<string, string> = {
  dica: 'bg-primary/5 border-primary/20',
  alerta: 'bg-destructive/5 border-destructive/20',
  ok: 'bg-accent/5 border-accent/20',
  tempo: 'bg-secondary/5 border-secondary/20',
};

export function DicasRapidas({ dicas, titulo = '💡 Dicas de Quem Entende' }: DicasRapidasProps) {
  if (!dicas.length) return null;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4">{titulo}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {dicas.map((dica, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 ${BG_COLORS[dica.tipo] || 'bg-muted border-border'}`}
          >
            <div className="text-2xl mb-2">{dica.icone}</div>
            <h3 className="font-bold text-sm mb-1">{dica.titulo}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{dica.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
