import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
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
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${isPremium ? 'border-secondary border-2 relative' : ''}`}>
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-secondary text-secondary-foreground font-bold gap-1">
            <Star className="h-3 w-3" /> DESTAQUE
          </Badge>
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <img src={empresa.logo || '/favicon.png'} alt={`Logo ${empresa.nome}`} className="w-full h-full object-contain p-1" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={`/empresa/${empresa.slug}`} className="font-bold text-lg text-foreground hover:text-primary transition-colors truncate">
                {empresa.nome}
              </Link>
              {empresa.verificada && (
                <Badge variant="outline" className="text-accent border-accent gap-1 text-xs">
                  <ShieldCheck className="h-3 w-3" /> Verificado
                </Badge>
              )}
              {empresa.atende24h && (
                <Badge variant="outline" className="text-primary border-primary gap-1 text-xs">
                  <Clock className="h-3 w-3" /> 24H
                </Badge>
              )}
              {empresa.atendeEmergencia && (
                <Badge variant="outline" className="text-destructive border-destructive gap-1 text-xs">
                  <Zap className="h-3 w-3" /> Emergência
                </Badge>
              )}
            </div>

            <div className="mt-1">
              <RatingStars nota={empresa.notaMedia} total={empresa.totalAvaliacoes} />
            </div>

            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">
                  {empresa.bairrosAtendidos.slice(0, 3).map(b => b.replace(/-/g, ' ')).map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}
                  {empresa.bairrosAtendidos.length > 3 && ` + ${empresa.bairrosAtendidos.length - 3} bairros`}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">
                  {empresa.tipoServico.map(t => t === 'desentupimento' ? 'Desentupimento' : t === 'motofrete' ? 'Motofrete e entregas' : 'Encanamento').join(' | ')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{empresa.formasPagamento.join(' • ')}</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                to={`/empresa/${empresa.slug}`}
                className="inline-flex items-center justify-center h-9 px-4 rounded-md border border-input bg-background text-sm font-medium hover:bg-muted transition-colors"
              >
                Ver Perfil
              </Link>
              <WhatsAppButton
                whatsapp={empresa.whatsapp}
                mensagem={`Olá! Vi o perfil da ${empresa.nome} no Serviços no Bairro e gostaria de solicitar um orçamento. [via ${whatsappSource}]`}
                size="sm"
              />
              <a
                href={`tel:${empresa.telefone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md border border-destructive text-destructive text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Phone className="h-3.5 w-3.5" /> Ligar
              </a>
              {empresa.email && (
                <a
                  href={`mailto:${empresa.email}`}
                  className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md border border-input text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
