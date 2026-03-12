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
    <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)' }}>
      <div className="p-6 md:p-8">
        {titulo && <h2 className="text-xl md:text-2xl font-black mb-1">{titulo}</h2>}
        {subtitulo && <p className="text-muted-foreground mb-6">{subtitulo}</p>}

        {/* Search */}
        {mostrarBusca && (
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar pergunta..."
              className="w-full h-12 pl-12 pr-10 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setAbaAtiva('todas')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${abaAtiva === 'todas' ? 'bg-primary text-primary-foreground' : 'bg-card border text-muted-foreground hover:text-foreground'}`}
            >
              Todas ({contadorPorCategoria.todas})
            </button>
            {categorias.map(cat => {
              const config = CATEGORIAS_CONFIG[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setAbaAtiva(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${abaAtiva === cat ? 'bg-primary text-primary-foreground' : 'bg-card border text-muted-foreground hover:text-foreground'}`}
                >
                  {config?.emoji || '📌'} {config?.label || cat} ({contadorPorCategoria[cat] || 0})
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ items */}
        <div className="space-y-6">
          {grupos.map(grupo => {
            const config = CATEGORIAS_CONFIG[grupo.categoria];
            const isExpanded = expandidos.has(grupo.categoria);
            const visibleItems = isExpanded ? grupo.perguntas : grupo.perguntas.slice(0, limitePorCategoria);
            const hasMore = grupo.perguntas.length > limitePorCategoria && !isExpanded;

            return (
              <div key={grupo.categoria}>
                {abaAtiva === 'todas' && !busca.trim() && config && (
                  <h3 className="text-base font-bold flex items-center gap-2 mb-3">
                    <span>{config.emoji}</span> {config.label}
                  </h3>
                )}
                <div className="space-y-2">
                  {visibleItems.map((p, i) => {
                    const globalIdx = perguntas.indexOf(p);
                    const isOpen = abertos.has(globalIdx);
                    const borderColor = config?.cor || 'hsl(var(--primary))';

                    return (
                      <div
                        key={globalIdx}
                        className="bg-card rounded-xl border overflow-hidden transition-shadow hover:shadow-md"
                        style={{ borderLeftWidth: '4px', borderLeftColor: borderColor }}
                      >
                        <button
                          onClick={() => toggle(globalIdx)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className="text-sm font-semibold pr-4 flex-1"
                            dangerouslySetInnerHTML={{ __html: highlightText(p.pergunta, busca) }}
                          />
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {config && (
                              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                                {config.label}
                              </span>
                            )}
                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        <div
                          className="overflow-hidden transition-all duration-300 ease-in-out"
                          style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0 }}
                        >
                          <div className="px-4 pb-4">
                            <div
                              className="text-sm leading-relaxed text-muted-foreground bg-muted/50 rounded-lg p-4"
                              dangerouslySetInnerHTML={{ __html: highlightText(p.resposta, busca) }}
                            />
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-3 text-xs">
                                <a href="tel:+554133451194" className="flex items-center gap-1 text-primary hover:underline font-medium">
                                  <Phone className="h-3 w-3" /> (41) 3345-1194
                                </a>
                                <a href="https://wa.me/5541985171966" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent hover:underline font-medium">
                                  <MessageCircle className="h-3 w-3" /> WhatsApp
                                </a>
                              </div>
                              <button onClick={() => copiarLink(p.pergunta, globalIdx)} className="text-muted-foreground hover:text-primary transition-colors" title="Copiar link">
                                <Link2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
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
