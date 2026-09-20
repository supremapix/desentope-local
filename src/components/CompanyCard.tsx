import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { RatingStars } from './RatingStars';
import { WhatsAppButton } from './WhatsAppButton';
import { Empresa } from '@/types';
import { MapPin, Wrench, CreditCard, Clock, ShieldCheck, Zap, Phone, Mail, Star } from 'lucide-react';

interface CompanyCardProps {
  empresa: Empresa;
}

export function CompanyCard({ empresa }: CompanyCardProps) {
  const isPremium = empresa.destaque;
  const whatsappSource = `card-${empresa.slug}`;

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 border rounded-lg bg-card ${
        isPremium
          ? 'border-amber-300/80 dark:border-amber-800/60 shadow-xs ring-1 ring-amber-400/20'
          : 'border-border hover:border-foreground/20 hover:shadow-xs'
      }`}
    >
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-muted/60 border border-border/80 flex items-center justify-center overflow-hidden p-1.5 self-start">
            <img
              src={empresa.logo || '/favicon.png'}
              alt={`Logo da empresa ${empresa.nome}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  to={`/empresa/${empresa.slug}`}
                  className="font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors tracking-tight"
                >
                  {empresa.nome}
                </Link>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200/70 dark:border-amber-800/40">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Destaque
                  </span>
                )}
                {empresa.verificada && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200/70 dark:border-emerald-800/40">
                    <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> Verificado
                  </span>
                )}
                {empresa.atende24h && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200/80 dark:border-slate-700">
                    <Clock className="h-3 w-3 text-slate-500" /> 24h
                  </span>
                )}
                {empresa.atendeEmergencia && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-800 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300 px-2 py-0.5 rounded border border-rose-200/70 dark:border-rose-800/40">
                    <Zap className="h-3 w-3 text-rose-600" /> Urgência
                  </span>
                )}
              </div>
            </div>

            <div className="mt-1">
              <RatingStars nota={empresa.notaMedia} total={empresa.totalAvaliacoes} />
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />
                <span className="truncate">
                  {empresa.bairrosAtendidos.slice(0, 3).map(b => b.replace(/-/g, ' ')).map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}
                  {empresa.bairrosAtendidos.length > 3 && ` + ${empresa.bairrosAtendidos.length - 3} bairros`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />
                <span className="truncate">
                  {empresa.tipoServico.map(t => t === 'desentupimento' ? 'Desentupimento' : t === 'motofrete' ? 'Motofrete e entregas' : t === 'lavanderia' ? 'Lavanderia e passadoria' : t === 'refrigeracao' ? 'Refrigeração e assistência técnica' : 'Encanamento').join(' · ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/80" />
                <span className="truncate">{empresa.formasPagamento.join(' · ')}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2">
              <WhatsAppButton
                whatsapp={empresa.whatsapp}
                mensagem={`Olá! Vi o perfil da ${empresa.nome} no Serviços no Bairro e gostaria de solicitar um orçamento. [via ${whatsappSource}]`}
                size="sm"
              />
              <Link
                to={`/empresa/${empresa.slug}`}
                className="inline-flex items-center justify-center h-9 px-3.5 rounded-md border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Ver perfil completo
              </Link>
              <a
                href={`tel:${empresa.telefone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-md border border-border text-foreground text-xs font-medium hover:bg-muted transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Ligar
              </a>
              {empresa.email && (
                <a
                  href={`mailto:${empresa.email}`}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-md border border-border text-foreground text-xs font-medium hover:bg-muted transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" /> E-mail
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
