import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqCategorias } from '@/data/faq';
import { FaqPremium } from '@/components/FaqPremium';
import { ServiceIcon } from '@/components/ServiceIcon';
import { useSEO, buildFAQSchema, buildBreadcrumbSchema } from '@/hooks/useSEO';

const FAQPage = () => {
  const allQuestions = faqCategorias.flatMap(c =>
    c.perguntas.map(p => ({ ...p, categoria: c.slug }))
  );

  useSEO({
    title: 'Perguntas Frequentes — Desentupimento e Encanamento em Curitiba | Serviços no Bairro',
    description: `${allQuestions.length}+ perguntas respondidas sobre desentupimento, encanamento, preços, emergências e manutenção em Curitiba. Guia completo para resolver seu problema hidráulico.`,
    canonical: '/faq',
    jsonLd: [
      buildFAQSchema(allQuestions.slice(0, 20)),
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'FAQ', url: '/faq' },
      ]),
    ],
  });

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
          <h1 className="text-2xl md:text-3xl font-black text-center mb-2">Central de Dúvidas</h1>
          <p className="text-center text-muted-foreground mb-8">
            {allQuestions.length}+ perguntas respondidas sobre desentupimento e encanamento em Curitiba
          </p>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {faqCategorias.map(cat => (
              <div key={cat.slug} className="bg-card border rounded-xl p-4 text-center hover:border-primary transition-colors cursor-pointer">
                <ServiceIcon name={cat.icone} className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-sm font-bold">{cat.nome}</div>
                <div className="text-xs text-muted-foreground">{cat.perguntas.length} perguntas</div>
              </div>
            ))}
          </div>

          <FaqPremium
            perguntas={allQuestions}
            mostrarBusca={true}
            mostrarAbas={true}
            limitePorCategoria={5}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
