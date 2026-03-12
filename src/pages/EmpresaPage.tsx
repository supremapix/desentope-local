import { useParams, Link } from 'react-router-dom';
import { getEmpresaBySlug, getEmpresasPorBairro } from '@/data/empresas';
import { getCoordenadasBairro } from '@/data/empresas';
import { servicos } from '@/data/servicos';
import { RatingStars } from '@/components/RatingStars';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CompanyCard } from '@/components/CompanyCard';
import { ShieldCheck, Clock, Zap, Phone, MapPin, CreditCard, Star, Wrench, Mail, AlertTriangle, MessageCircle, Send } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { useEffect, useState, useMemo } from 'react';
import { useSEO, buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/hooks/useSEO';

const EmpresaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const empresa = getEmpresaBySlug(slug || '');
  const [formData, setFormData] = useState({ nome: '', telefone: '', problema: '', bairro: '', descricao: '', urgencia: 'normal' });

  const bairroSlug = empresa?.bairrosAtendidos[0] || 'centro';
  const coords = getCoordenadasBairro(bairroSlug);
  const bairroNome = bairroSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const similares = useMemo(() => {
    if (!empresa) return [];
    const bairroEmpresas = getEmpresasPorBairro(bairroSlug);
    return bairroEmpresas.filter(e => e.slug !== empresa.slug).slice(0, 3);
  }, [empresa, bairroSlug]);

  const servicosDetalhes = useMemo(() => {
    if (!empresa) return [];
    return empresa.servicosOferecidos.map(s => servicos.find(sv => sv.slug === s)).filter(Boolean) as { nome: string; precoMedio?: string }[];
  }, [empresa]);

  useSEO({
    title: empresa ? `${empresa.nome} — Desentupidora em ${bairroNome}, Curitiba | Serviços no Bairro` : 'Empresa não encontrada',
    description: empresa ? `${empresa.descricao} Atendimento ${empresa.atende24h ? '24h' : 'rápido'} em ${bairroNome}. Nota ${empresa.notaMedia}/5 com ${empresa.totalAvaliacoes} avaliações. Orçamento grátis via WhatsApp.` : '',
    canonical: empresa ? `/empresa/${empresa.slug}` : undefined,
    type: empresa ? 'business.business' : 'website',
    geoPosition: coords,
    geoPlacename: `${bairroNome}, Curitiba, PR`,
    jsonLd: empresa ? [
      buildLocalBusinessSchema(empresa, coords, bairroNome, servicosDetalhes),
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Curitiba', url: `/curitiba/${bairroSlug}` },
        { name: bairroNome, url: `/curitiba/${bairroSlug}` },
        { name: empresa.nome, url: `/empresa/${empresa.slug}` },
      ]),
      buildFAQSchema([
        { pergunta: `Quanto custa ${empresa.nome.split(' ')[0].toLowerCase()} no ${bairroNome}?`, resposta: `Os serviços da ${empresa.nome} variam de R$ 150 a R$ 800, dependendo do tipo de serviço. Solicite orçamento grátis pelo WhatsApp (41) 98517-1966.` },
        { pergunta: `${empresa.nome} atende 24 horas?`, resposta: empresa.atende24h ? `Sim! A ${empresa.nome} oferece atendimento 24 horas, inclusive feriados e fins de semana.` : `A ${empresa.nome} atende em horário comercial estendido. Para emergências, ligue (41) 3345-1194.` },
        { pergunta: `${empresa.nome} é uma empresa verificada?`, resposta: empresa.verificada ? `Sim! A ${empresa.nome} é verificada pelo Serviços no Bairro com nota ${empresa.notaMedia}/5 baseada em ${empresa.totalAvaliacoes} avaliações reais.` : `A ${empresa.nome} está em processo de verificação.` },
      ]),
    ] : undefined,
  });

  if (!empresa) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Empresa não encontrada</h1>
        <p className="text-muted-foreground mb-4">A empresa que você procura não está cadastrada ou o link pode estar incorreto.</p>
        <Link to="/busca" className="text-primary hover:underline font-bold">Buscar empresas →</Link>
      </div>
    );
  }

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Vi o cadastro da ${empresa.nome} no Serviços no Bairro.\n\nPreciso de: ${formData.problema || 'serviço de desentupimento/encanamento'}\nBairro: ${formData.bairro}\nMeu nome: ${formData.nome}\n${formData.descricao ? `Descrição: ${formData.descricao}` : ''}\nUrgência: ${formData.urgencia}\n[via formulário perfil - servicosnobairro.com.br]`;
    window.open(`https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const servicosDetalhes = empresa.servicosOferecidos.map(slug => servicos.find(s => s.slug === slug)).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <Link to={`/curitiba/${bairroSlug}`} className="hover:text-primary">{bairroNome}</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">{empresa.nome}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {empresa.logo ? (
                    <img src={empresa.logo} alt={empresa.nome} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-primary">{empresa.nome.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-black">{empresa.nome}</h1>
                    {empresa.verificada && (
                      <Badge variant="outline" className="text-accent border-accent gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verificado
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1">
                    <RatingStars nota={empresa.notaMedia} total={empresa.totalAvaliacoes} />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {empresa.atende24h && <Badge className="bg-primary text-primary-foreground"><Clock className="h-3 w-3 mr-1" /> 24H</Badge>}
                    {empresa.atendeEmergencia && <Badge className="bg-destructive text-destructive-foreground"><Zap className="h-3 w-3 mr-1" /> Emergência</Badge>}
                    {empresa.tipoServico.map(t => (
                      <Badge key={t} variant="secondary">{t === 'desentupimento' ? 'Desentupimento' : 'Encanamento'}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <WhatsAppButton
                  whatsapp={empresa.whatsapp}
                  mensagem={`Olá! Vi o perfil da ${empresa.nome} no Serviços no Bairro e gostaria de solicitar um orçamento. [via perfil - servicosnobairro.com.br]`}
                  size="lg"
                  label="CHAMAR NO WHATSAPP"
                />
                <a
                  href={`tel:${empresa.telefone.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border-2 border-destructive text-destructive font-bold hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <Phone className="h-5 w-5" /> <AlertTriangle className="h-4 w-4" /> LIGAR EMERGÊNCIA
                </a>
                {empresa.email && (
                  <a
                    href={`mailto:${empresa.email}`}
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Mail className="h-5 w-5" /> EMAIL
                  </a>
                )}
              </div>
            </div>

            {/* Sobre */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">Sobre a Empresa</h2>
                <p className="text-muted-foreground leading-relaxed">{empresa.descricaoLonga}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-black text-primary">{empresa.anosExperiencia}</div>
                    <div className="text-xs text-muted-foreground">Anos de experiência</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-black text-primary">{empresa.totalAvaliacoes}</div>
                    <div className="text-xs text-muted-foreground">Avaliações</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-black text-primary">{empresa.bairrosAtendidos.length}</div>
                    <div className="text-xs text-muted-foreground">Bairros atendidos</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-black text-primary">{empresa.servicosOferecidos.length}</div>
                    <div className="text-xs text-muted-foreground">Serviços</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Serviços */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Serviços Oferecidos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicosDetalhes.map(s => s && (
                    <Link
                      key={s.slug}
                      to={`/servicos/${s.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary transition-colors"
                    >
                      <ServiceIcon name={s.icone} className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{s.nome}</div>
                        {s.precoMedio && <div className="text-xs text-muted-foreground">{s.precoMedio}</div>}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Avaliações */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Avaliações</h2>
                <div className="flex items-center gap-4 mb-6 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary">{empresa.notaMedia.toFixed(1)}</div>
                    <RatingStars nota={empresa.notaMedia} showCount={false} />
                    <div className="text-xs text-muted-foreground mt-1">{empresa.totalAvaliacoes} avaliações</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map(n => {
                      const count = empresa.avaliacoes.filter(a => Math.floor(a.nota) === n).length;
                      const pct = empresa.avaliacoes.length > 0 ? (count / empresa.avaliacoes.length) * 100 : 0;
                      return (
                        <div key={n} className="flex items-center gap-2 text-xs">
                          <span className="w-3">{n}</span>
                          <Star className="h-3 w-3 fill-secondary text-secondary" />
                          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  {empresa.avaliacoes.map(a => (
                    <div key={a.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{a.nomeCliente}</span>
                        <span className="text-xs text-muted-foreground">{new Date(a.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <RatingStars nota={a.nota} showCount={false} />
                      <div className="text-xs text-muted-foreground mt-1">Serviço: {a.servicoRealizado}</div>
                      <p className="text-sm mt-2">{a.texto}</p>
                      {a.respostaEmpresa && (
                        <div className="mt-2 ml-4 p-3 bg-muted rounded-lg text-sm">
                          <span className="font-medium">Resposta da empresa:</span> {a.respostaEmpresa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Horário</div>
                    {empresa.horarios.map((h, i) => (
                      <div key={i} className="text-xs text-muted-foreground">
                        {h.dia}: {h.fechado ? 'Fechado' : `${h.abertura} - ${h.fechamento}`}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Bairros Atendidos</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {empresa.bairrosAtendidos.map(b => (
                        <Link key={b} to={`/curitiba/${b}`} className="text-xs bg-muted px-2 py-0.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                          {b.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Pagamento</div>
                    <div className="text-xs text-muted-foreground">{empresa.formasPagamento.join(' • ')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Contatos</div>
                    <div className="text-xs text-muted-foreground">{empresa.telefone}</div>
                    {empresa.email && <div className="text-xs text-muted-foreground">{empresa.email}</div>}
                  </div>
                </div>
                {empresa.cnpj && (
                  <div className="flex items-start gap-2">
                    <Wrench className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">CNPJ</div>
                      <div className="text-xs text-muted-foreground">{empresa.cnpj}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Send className="h-5 w-5 text-primary" /> Solicitar Orçamento</h3>
                <form onSubmit={handleWhatsApp} className="space-y-3">
                  <input type="text" placeholder="Seu nome" value={formData.nome} onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))} className="w-full h-10 px-3 rounded-md border bg-background text-sm" required />
                  <input type="tel" placeholder="Telefone" value={formData.telefone} onChange={e => setFormData(prev => ({ ...prev, telefone: e.target.value }))} className="w-full h-10 px-3 rounded-md border bg-background text-sm" />
                  <select value={formData.problema} onChange={e => setFormData(prev => ({ ...prev, problema: e.target.value }))} className="w-full h-10 px-3 rounded-md border bg-background text-sm">
                    <option value="">Tipo de problema</option>
                    {servicosDetalhes.map(s => s && <option key={s.slug} value={s.nome}>{s.nome}</option>)}
                  </select>
                  <input type="text" placeholder="Endereço/Bairro" value={formData.bairro} onChange={e => setFormData(prev => ({ ...prev, bairro: e.target.value }))} className="w-full h-10 px-3 rounded-md border bg-background text-sm" />
                  <textarea placeholder="Descreva o problema" value={formData.descricao} onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))} className="w-full h-20 px-3 py-2 rounded-md border bg-background text-sm resize-none" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Urgência:</div>
                    <div className="flex gap-3 text-sm">
                      {['normal', 'urgente', 'emergencia'].map(u => (
                        <label key={u} className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="urgencia" value={u} checked={formData.urgencia === u} onChange={e => setFormData(prev => ({ ...prev, urgencia: e.target.value }))} />
                          {u === 'normal' ? 'Normal' : u === 'urgente' ? 'Urgente' : 'Emergência'}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full h-11 rounded-lg bg-accent text-accent-foreground font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors">
                    <MessageCircle className="h-5 w-5" /> ENVIAR VIA WHATSAPP
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similares */}
        {similares.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Empresas Similares em {bairroNome}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {similares.map(e => (
                <CompanyCard key={e.slug} empresa={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpresaPage;
