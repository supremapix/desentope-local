import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getEmpresaBySlug } from '@/data/empresas';

interface WhatsAppButtonProps {
  whatsapp: string;
  mensagem?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function WhatsAppButton({ whatsapp, mensagem, size = 'md', className = '', label }: WhatsAppButtonProps) {
  const url = `https://wa.me/${whatsapp}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''}`;

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base font-semibold',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {label || 'WhatsApp'}
    </a>
  );
}

export function WhatsAppFloating() {
  const { pathname } = useLocation();
  const roofSlug = pathname.match(/^\/(?:empresa|perfil)\/(alpha-telhados-curitiba|acquatec-calhas-telhados-curitiba)\/?$/)?.[1];
  const roofing = roofSlug ? getEmpresaBySlug(roofSlug) : undefined;
  const isEngeum = /\/(empresa|perfil)\/engeum-engenharia\/?$/.test(pathname);
  return (
    <a
      href={roofing ? `https://wa.me/${roofing.whatsapp}?text=${encodeURIComponent(`Olá! Vi o perfil da ${roofing.nome} no Serviços no Bairro e gostaria de pedir um orçamento.`)}` : isEngeum ? `https://wa.me/5541996646761?text=${encodeURIComponent("Olá! Vi o perfil da Engeum Engenharia no Serviços no Bairro e gostaria de conversar sobre meu projeto.")}` : "https://wa.me/5541985171966?text=Olá! Preciso de atendimento urgente. [via botão flutuante - servicosnobairro.com.br]"}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all hover:scale-110"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
