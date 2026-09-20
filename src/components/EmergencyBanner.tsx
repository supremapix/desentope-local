import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmergencyBanner() {
  return (
    <aside
      aria-label="Aviso de atendimento de emergência 24 horas"
      className="bg-primary text-primary-foreground border-b border-primary/20 text-xs sm:text-sm"
    >
      <div className="container mx-auto flex items-center justify-between gap-3 py-2 px-4">
        <div className="flex items-center gap-2.5 truncate">
          <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-sm bg-primary-foreground/15 text-[11px] uppercase tracking-wider shrink-0">
            <Clock className="h-3 w-3" /> Plantão 24h
          </span>
          <span className="truncate text-primary-foreground/90 font-medium">
            Atendimento para urgências residenciais, comerciais e industriais
          </span>
        </div>
        <Link
          to="/busca?24h=true"
          className="inline-flex items-center gap-1 font-semibold text-xs whitespace-nowrap hover:underline text-primary-foreground shrink-0"
        >
          Ver empresas com plantão
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
