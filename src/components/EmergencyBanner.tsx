import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmergencyBanner() {
  return (
    <div className="bg-destructive text-destructive-foreground">
      <div className="container mx-auto flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium">
        <AlertTriangle className="h-4 w-4 animate-pulse" />
        <span>EMERGÊNCIA 24H — Esgoto voltando? Entupimento grave?</span>
        <Link
          to="/busca?24h=true"
          className="ml-2 underline font-bold hover:no-underline"
        >
          Ver empresas disponíveis AGORA →
        </Link>
      </div>
    </div>
  );
}
