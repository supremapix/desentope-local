import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface RelatedLink {
  label: string;
  to: string;
  hint?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

/**
 * Malha de links internos reutilizável: distribui autoridade entre
 * bairros vizinhos, serviços relacionados e páginas institucionais.
 */
export function RelatedLinks({ title = 'Continue navegando', links }: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <nav aria-label={title} className="mb-14">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="flex items-start gap-2 bg-card border rounded-xl p-4 hover:border-primary transition-colors h-full"
            >
              <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold block">{link.label}</span>
                {link.hint && (
                  <span className="text-sm text-muted-foreground">{link.hint}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
