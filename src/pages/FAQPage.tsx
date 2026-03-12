import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqCategorias } from '@/data/faq';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { useEffect } from 'react';

const FAQPage = () => {
  const [busca, setBusca] = useState('');

  useEffect(() => {
    document.title = 'Perguntas Frequentes — Desentupidoras Curitiba | Serviços no Bairro';
  }, []);

  const filteredCategorias = faqCategorias.map(cat => ({
    ...cat,
    perguntas: cat.perguntas.filter(p =>
      busca === '' ||
      p.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      p.resposta.toLowerCase().includes(busca.toLowerCase())
    ),
  })).filter(cat => cat.perguntas.length > 0);

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">FAQ</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-center mb-2">Perguntas Frequentes</h1>
          <p className="text-center text-muted-foreground mb-8">Tudo que você precisa saber sobre desentupimento e encanamento em Curitiba</p>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar pergunta..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Categories */}
          <div className="space-y-8">
            {filteredCategorias.map(cat => (
              <div key={cat.slug}>
                <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
                  <span className="text-2xl">{cat.icone}</span>
                  {cat.nome}
                </h2>
                <Accordion type="single" collapsible className="bg-card rounded-xl border p-4">
                  {cat.perguntas.map((p, i) => (
                    <AccordionItem key={i} value={`${cat.slug}-${i}`}>
                      <AccordionTrigger className="text-left text-sm">{p.pergunta}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{p.resposta}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {filteredCategorias.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhuma pergunta encontrada para "{busca}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
