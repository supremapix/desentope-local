import { Clock, ArrowRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { empresas } from '../data/empresas';

export function EmergencyBanner() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sortedEmpresas = [...empresas].sort((a, b) => {
    const aScore = (a.destaque ? 2 : 0) + (a.verificada ? 1 : 0);
    const bScore = (b.destaque ? 2 : 0) + (b.verificada ? 1 : 0);
    return bScore - aScore;
  });

  const animate = useCallback(() => {
    if (isPaused || !containerRef.current || !contentRef.current) return;
    
    const container = containerRef.current;
    const content = contentRef.current;
    
    let currentX = parseFloat(content.style.transform.replace('translateX(', '').replace('px)', '') || '0');
    currentX -= 0.5; // ~40px/s at 60fps
    
    if (Math.abs(currentX) >= content.scrollWidth / 2) {
      currentX = 0;
    }
    
    content.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [animate]);

  return (
    <aside
      aria-label="Empresas cadastradas e atendimento de emergência"
      className="bg-[#1F5E4B] text-white border-b border-white/20 text-xs sm:text-sm"
    >
      <div className="container mx-auto flex items-center gap-4 py-2 px-4 h-11">
        <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-sm bg-white/15 text-[11px] uppercase tracking-wider shrink-0 whitespace-nowrap">
          <Clock className="h-3 w-3" /> Plantão 24h
        </span>

        <nav
          aria-label="Empresas cadastradas"
          className="flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          ref={containerRef}
        >
          <div
            ref={contentRef}
            className="flex items-center gap-6 whitespace-nowrap will-change-transform"
          >
            {[...sortedEmpresas, ...sortedEmpresas].map((emp, i) => (
              <a
                key={`${emp.slug}-${i}`}
                href={`/perfil/${emp.slug}`}
                className="inline-flex items-center gap-1.5 font-semibold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                {emp.nome} · {emp.bairrosAtendidos[0] || 'Curitiba'}
                {emp.atende24h && <span title="Plantão 24h">⏱</span>}
              </a>
            ))}
          </div>
        </nav>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 hover:bg-white/10 rounded shrink-0"
          aria-label={isPaused ? "Continuar animação" : "Pausar animação"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>

        <Link
          to="/busca?24h=true"
          className="inline-flex items-center gap-1 font-semibold text-xs whitespace-nowrap hover:underline text-white shrink-0"
        >
          Ver empresas com plantão <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
