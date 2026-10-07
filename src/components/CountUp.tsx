import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
}

export const CountUp = ({ end, duration = 1600 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') {
      setCount(end);
      return;
    }
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // easeOutCubic
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(easedProgress * end));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      }
    });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={elementRef}>{count.toLocaleString('pt-BR')}</span>;
};
