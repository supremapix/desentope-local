import { useState } from 'react';

/** Local-only draft. Never submits personal data or sends a WhatsApp message. */
export function LocalRequestPlanner({ place }: { place: string }) {
  const [problem, setProblem] = useState('Entupimento de pia ou ralo');
  const [property, setProperty] = useState('Casa ou sobrado');
  const [details, setDetails] = useState('');
  const draft = `Olá! Encontrei seu perfil no Serviços no Bairro. Preciso de atendimento em ${place}.\nProblema: ${problem}.\nImóvel: ${property}.${details.trim() ? `\nInformações: ${details.trim()}` : ''}\nPode informar disponibilidade, como funciona a visita e o que entra no orçamento? Antes de iniciar, gostaria de confirmar escopo, critério de cobrança e valor previsto.`;
  return <section aria-labelledby="preparar-pedido" className="mb-12 rounded-xl border p-5 md:p-7">
    <h2 id="preparar-pedido" className="text-2xl font-bold mb-3">Prepare seu pedido para {place}</h2>
    <p className="text-muted-foreground mb-5">Monte um rascunho para revisar e copiar. Nada é enviado: depois, escolha a empresa e use o contato dela. Não é necessário informar seus dados pessoais aqui.</p>
    <div className="grid gap-4 md:grid-cols-2">
      <label className="font-semibold">Qual é o problema?<select className="block w-full bg-background border rounded-lg p-3 mt-2 font-normal" value={problem} onChange={e => setProblem(e.target.value)}>{['Entupimento de pia ou ralo','Vaso sanitário entupido','Retorno de esgoto','Vazamento de água','Limpeza de caixa de gordura','Avaliação de fossa','Outro reparo hidráulico'].map(p => <option key={p}>{p}</option>)}</select></label>
      <label className="font-semibold">Tipo de imóvel<select className="block w-full bg-background border rounded-lg p-3 mt-2 font-normal" value={property} onChange={e => setProperty(e.target.value)}>{['Casa ou sobrado','Apartamento','Área comum de condomínio','Comércio','Outro imóvel'].map(p => <option key={p}>{p}</option>)}</select></label>
    </div>
    <label className="block font-semibold mt-4">Detalhes do problema e acesso (opcional)<textarea maxLength={1200} value={details} onChange={e => setDetails(e.target.value)} className="block w-full bg-background border rounded-lg p-3 mt-2 font-normal" rows={3} placeholder="Ex.: dois ralos afetados; combinar entrada com a portaria." /></label>
    <label className="block font-semibold mt-5">Rascunho para revisar e copiar<textarea readOnly value={draft} onFocus={e => e.currentTarget.select()} rows={7} className="block w-full bg-muted border rounded-lg p-3 mt-2 font-normal leading-relaxed" /></label>
    <p className="mt-2 text-xs text-muted-foreground">Os campos ficam apenas nesta página, sem cadastro ou envio automático.</p>
    <a href="#empresas-locais" className="inline-flex min-h-12 items-center bg-primary text-primary-foreground font-bold rounded-lg px-5 mt-4">Escolher empresa para conversar</a>
  </section>;
}
