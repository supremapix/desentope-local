import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlobalAnimations() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector('header');
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (reduce) return () => window.removeEventListener('scroll', onScroll);
    const t = setTimeout(() => {
      const sel = 'main section, main h2, main article, main li > a, main [class*="rounded-xl"], main [class*="rounded-2xl"], footer > div';
      const els = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter(el => !el.closest('.reveal') && el.getBoundingClientRect().top > window.innerHeight * 0.85);
      const groups = new Map<Element | null, number>();
      els.forEach(el => {
        const i = groups.get(el.parentElement) ?? 0;
        groups.set(el.parentElement, i + 1);
        el.classList.add('reveal');
        el.style.transitionDelay = Math.min(i * 70, 560) + 'ms';
      });
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => io.observe(el));
      document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
        const end = Number(el.dataset.count); let started = false;
        const o = new IntersectionObserver(([en]) => {
          if (!en.isIntersecting || started) return; started = true;
          const t0 = performance.now();
          const step = (now: number) => { const p = Math.min((now - t0) / 1600, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('pt-BR'); if (p < 1) requestAnimationFrame(step); };
          requestAnimationFrame(step);
        }); o.observe(el);
      });
    }, 120);
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, [pathname]);
  return null;
}
