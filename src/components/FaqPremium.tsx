import { useState, useMemo, useCallback } from 'react';
import { Search, Link2, Phone, MessageCircle, ChevronDown, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FaqItem {
  pergunta: string;
  resposta: string;
  categoria?: string;
}

interface FaqPremiumProps {
  perguntas: FaqItem[];
  titulo?: string;
  subtitulo?: string;
  mostrarBusca?: boolean;
  mostrarAbas?: boolean;
  limitePorCategoria?: number;
}

const CATEGORIAS_CONFIG: Record<string, { label: string; emoji: string; cor: string }> = {
  emergencia: { label: 'Emergência', emoji: '🚨', cor: 'hsl(0, 72%, 51%)' },
  precos: { label: 'Preços', emoji: '💰', cor: 'hsl(38, 92%, 50%)' },
  tecnico: { label: 'Técnico', emoji: '🔧', cor: 'hsl(217, 91%, 60%)' },
  localidade: { label: 'Localidade', emoji: '📍', cor: 'hsl(160, 84%, 39%)' },
  legal: { label: 'Legal', emoji: '⚖️', cor: 'hsl(258, 90%, 66%)' },
  sustentavel: { label: 'Sustentável', emoji: '🌱', cor: 'hsl(142, 71%, 45%)' },
  antes: { label: 'Antes de Contratar', emoji: '📋', cor: 'hsl(217, 91%, 60%)' },
  durante: { label: 'Durante o Serviço', emoji: '🔧', cor: 'hsl(38, 92%, 50%)' },
  depois: { label: 'Depois do Serviço', emoji: '✅', cor: 'hsl(160, 84%, 39%)' },
};

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="bg-yellow-200 rounded px-0.5">$1</mark>');
}

export function FaqPremium({ perguntas, titulo, subtitulo, mostrarBusca = true, mostrarAbas = true, limitePorCategoria = 5 }: FaqPremiumProps) {
  const [busca, setBusca] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('todas');
  const [abertos, setAbertos] = useState<Set<number>>(new Set());
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set());

  const categorias = useMemo(() => {
    const cats = new Set(perguntas.map(p => p.categoria || 'geral'));
    return Array.from(cats);
  }, [perguntas]);

  const filtradas = useMemo(() => {
    let result = perguntas;
    if (abaAtiva !== 'todas') {
      result = result.filter(p => p.categoria === abaAtiva);
    }
    if (busca.trim()) {
      const q = busca.toLowerCase();
      result = result.filter(p =>
        p.pergunta.toLowerCase().includes(q) || p.resposta.toLowerCase().includes(q)
      );
    }
    return result;
  }, [perguntas, abaAtiva, busca]);

  const contadorPorCategoria = useMemo(() => {
    const counts: Record<string, number> = { todas: perguntas.length };
    perguntas.forEach(p => {
      const cat = p.categoria || 'geral';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [perguntas]);

  const toggle = useCallback((idx: number) => {
    setAbertos(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }, []);

  const copiarLink = useCallback((pergunta: string, idx: number) => {
    const slug = pergunta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 60);
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${slug}`);
    toast({ title: 'Link copiado!', description: 'Cole e compartilhe a pergunta.' });
  }, []);

  const mostrarMais = useCallback((cat: string) => {
    setExpandidos(prev => new Set(prev).add(cat));
  }, []);

  // Group by categoria for display
  const grupos = useMemo(() => {
    if (abaAtiva !== 'todas' || busca.trim()) {
      return [{ categoria: abaAtiva, perguntas: filtradas }];
    }
    const map = new Map<string, FaqItem[]>();
    filtradas.forEach(p => {
      const cat = p.categoria || 'geral';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(p);
    });
    return Array.from(map.entries()).map(([categoria, perguntas]) => ({ categoria, perguntas }));
  }, [filtradas, abaAtiva, busca]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div>
        {titulo && <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{titulo}</h2>}
        {subtitulo && <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{subtitulo}</p>}

        {/* Search */}
        {mostrarBusca && (
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar por termo ou dúvida..."
              className="w-full h-11 pl-10 pr-10 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Tabs */}
        {mostrarAbas && categorias.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            <button
              onClick={() => setAbaAtiva('todas')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${abaAtiva === 'todas' ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'}`}
            >
              Todas ({contadorPorCategoria.todas})
            </button>
            {categorias.map(cat => {
              const config = CATEGORIAS_CONFIG[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setAbaAtiva(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${abaAtiva === cat ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                >
                  {config?.label || cat} ({contadorPorCategoria[cat] || 0})
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ items */}
        <div className="space-y-4">
          {grupos.map(grupo => {
            const config = CATEGORIAS_CONFIG[grupo.categoria];
            const isExpanded = expandidos.has(grupo.categoria);
            const visibleItems = isExpanded ? grupo.perguntas : grupo.perguntas.slice(0, limitePorCategoria);
            const hasMore = grupo.perguntas.length > limitePorCategoria && !isExpanded;

            return (
              <div key={grupo.categoria}>
                {abaAtiva === 'todas' && !busca.trim() && config && (
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2.5 mt-2">
                    {config.label}
                  </h3>
                )}
                <div className="space-y-2">
                  {visibleItems.map((p, i) => {
                    const globalIdx = perguntas.indexOf(p);
                    const isOpen = abertos.has(globalIdx);

                    return (
                      <div
                        key={globalIdx}
                        className="bg-card rounded-md border border-border/90 overflow-hidden transition-colors hover:border-foreground/20"
                      >
                        <button
                          onClick={() => toggle(globalIdx)}
                          className="w-full flex items-center justify-between p-4 text-left gap-4"
                        >
                          <span
                            className="text-sm font-semibold text-foreground flex-1 leading-snug"
                            dangerouslySetInnerHTML={{ __html: highlightText(p.pergunta, busca) }}
                          />
                          <div className="flex items-center gap-2 shrink-0">
                            {config && (
                              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                                {config.label}
                              </span>
                            )}
                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 border-t border-border/60 bg-muted/20">
                            <div
                              className="text-xs sm:text-sm leading-relaxed text-muted-foreground pt-2"
                              dangerouslySetInnerHTML={{ __html: highlightText(p.resposta, busca) }}
                            />
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/40">
                              <div className="flex items-center gap-4 text-xs">
                                <a href="tel:+554133451194" className="flex items-center gap-1.5 text-foreground hover:underline font-medium">
                                  <Phone className="h-3 w-3 text-muted-foreground" /> (41) 3345-1194
                                </a>
                                <a href="https://wa.me/5541985171966" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:underline font-medium">
                                  <MessageCircle className="h-3 w-3" /> WhatsApp
                                </a>
                              </div>
                              <button onClick={() => copiarLink(p.pergunta, globalIdx)} className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Copiar link da pergunta">
                                <Link2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {hasMore && (
                  <button
                    onClick={() => mostrarMais(grupo.categoria)}
                    className="mt-3 text-sm text-primary font-bold hover:underline"
                  >
                    Ver mais {grupo.perguntas.length - limitePorCategoria} perguntas →
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">Nenhuma pergunta encontrada para "{busca}"</p>
            <a
              href="https://wa.me/5541985171966?text=Olá! Tenho uma dúvida que não encontrei no FAQ. Pode me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent font-bold hover:underline"
            >
              <MessageCircle className="h-4 w-4" /> Fale conosco pelo WhatsApp (41) 98517-1966
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
