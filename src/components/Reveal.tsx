import { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export const Reveal = ({ children, delay = 0 }: RevealProps) => {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref as any}
      className={`reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
