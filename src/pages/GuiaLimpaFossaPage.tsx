import { Link } from 'react-router-dom';
import { Droplets, AlertTriangle, CalendarClock, Wallet, ShieldCheck } from 'lucide-react';
import { useSEO, buildBreadcrumbSchema, buildFAQSchema } from '@/hooks/useSEO';
import { RelatedLinks } from '@/components/RelatedLinks';

const faqItems = [
  {
    pergunta: 'De quanto em quanto tempo é preciso fazer limpa fossa?',
    resposta:
      'Em média a cada 1 a 2 anos para uma residência com 4 pessoas e fossa de 3.000 litros. Imóveis com mais moradores, comércios e restaurantes costumam precisar de limpeza a cada 6 a 12 meses.',
  },
  {
    pergunta: 'Quanto custa um limpa fossa em Curitiba?',
    resposta:
      'A faixa praticada na região é de R$ 350 a R$ 900 por caminhão limpa fossa (até 6.000 litros), variando conforme volume, distância e dificuldade de acesso. Peça sempre orçamento antes do serviço.',
  },
  {
    pergunta: 'Quais são os sinais de que a fossa está cheia?',
    resposta:
      'Mau cheiro constante no quintal, ralos e vaso sanitário escoando devagar, retorno de esgoto, solo encharcado ou grama muito verde sobre a fossa e ruídos de borbulhamento na tubulação.',
  },
  {
    pergunta: 'Posso limpar a fossa sozinho?',
    resposta:
      'Não. A fossa acumula gases tóxicos (metano e gás sulfídrico) que podem causar desmaio e morte em minutos. A limpeza exige caminhão a vácuo, EPI adequado e destinação do resíduo em estação licenciada.',
  },
  {
    pergunta: 'O que não pode ser jogado na fossa séptica?',
    resposta:
      'Óleo de cozinha, papel higiênico em excesso, lenços umedecidos, absorventes, fraldas, produtos químicos fortes e soda cáustica. Esses itens matam as bactérias que digerem o esgoto e aceleram o entupimento.',
  },
];

const sinais = [
  { icon: AlertTriangle, titulo: 'Mau cheiro persistente', texto: 'Odor de esgoto no quintal ou banheiro mesmo após limpeza indica fossa saturada.' },
  { icon: Droplets, titulo: 'Escoamento lento', texto: 'Vaso e ralos demoram a esvaziar em todos os pontos da casa ao mesmo tempo.' },
  { icon: CalendarClock, titulo: 'Tempo desde a última limpeza', texto: 'Passou de 24 meses sem sucção? Programe a limpeza antes do transbordamento.' },
  { icon: Wallet, titulo: 'Solo encharcado', texto: 'Poça ou grama muito verde sobre o sumidouro é sinal de vazamento do efluente.' },
];

const GuiaLimpaFossaPage = () => {
  useSEO({
    title: 'Limpa Fossa: Guia Completo de Quando e Como Limpar',
    description:
      'Guia de limpa fossa em Curitiba: sinais de fossa cheia, frequência ideal, preços praticados, o que não jogar na fossa e como contratar empresa licenciada.',
    canonical: '/servicos/guia-limpa-fossa',
    type: 'article',
    jsonLd: [
      buildBreadcrumbSchema([
        { name: 'Início', url: '/' },
        { name: 'Serviços', url: '/servicos/limpa-fossa-curitiba' },
        { name: 'Guia de Limpa Fossa', url: '/servicos/guia-limpa-fossa' },
      ]),
      buildFAQSchema(faqItems),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Limpa fossa: quando e como limpar a fossa séptica',
        description:
          'Guia prático sobre limpeza de fossa séptica: sinais de saturação, frequência recomendada, custos e cuidados de segurança em Curitiba e Região Metropolitana.',
        inLanguage: 'pt-BR',
        about: 'Limpa fossa',
        articleSection: 'Saneamento',
      },
    ],
  });

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Limpa fossa: quando limpar, quanto custa e como contratar
          </h1>
          <p className="text-lg text-primary-foreground">
            Resposta direta: uma fossa séptica residencial deve ser esvaziada a cada 1 a 2 anos, ou
            assim que aparecerem mau cheiro, escoamento lento e solo encharcado. Em Curitiba o
            serviço custa em média de R$ 350 a R$ 900 por caminhão a vácuo.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">O que é a limpa fossa</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Limpa fossa é a sucção do lodo e do efluente acumulados na fossa séptica ou no
            sumidouro, feita por caminhão a vácuo (auto-vácuo). O material retirado precisa ser
            descartado em estação de tratamento licenciada — no Paraná, com autorização ambiental
            e comprovante de destinação final entregue ao cliente.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A fossa funciona por decantação: os sólidos afundam e são digeridos por bactérias, e o
            líquido segue para o sumidouro ou filtro. Com o tempo o lodo ocupa o volume útil do
            tanque, o esgoto deixa de ser tratado e volta pela tubulação. Por isso a limpeza é
            manutenção preventiva, não emergência.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Sinais de que a fossa precisa de limpeza</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sinais.map((s) => (
              <div key={s.titulo} className="bg-card border rounded-xl p-5">
                <s.icon className="h-6 w-6 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-bold mb-1">{s.titulo}</h3>
                <p className="text-sm text-muted-foreground">{s.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Com que frequência limpar</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border rounded-xl overflow-hidden">
              <caption className="sr-only">Frequência recomendada de limpa fossa por tipo de imóvel</caption>
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="p-3 font-bold">Imóvel</th>
                  <th scope="col" className="p-3 font-bold">Volume típico</th>
                  <th scope="col" className="p-3 font-bold">Frequência</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t"><td className="p-3">Casa até 4 pessoas</td><td className="p-3">3.000 L</td><td className="p-3">A cada 18–24 meses</td></tr>
                <tr className="border-t"><td className="p-3">Casa 5 a 8 pessoas</td><td className="p-3">5.000 L</td><td className="p-3">A cada 12 meses</td></tr>
                <tr className="border-t"><td className="p-3">Condomínio pequeno</td><td className="p-3">10.000 L</td><td className="p-3">A cada 6–12 meses</td></tr>
                <tr className="border-t"><td className="p-3">Restaurante / lanchonete</td><td className="p-3">Caixa de gordura + fossa</td><td className="p-3">A cada 3–6 meses</td></tr>
                <tr className="border-t"><td className="p-3">Chácara / sítio</td><td className="p-3">Uso intermitente</td><td className="p-3">A cada 24 meses</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Quanto custa em Curitiba e RMC</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            As faixas abaixo são médias de mercado coletadas na região — sempre peça orçamento por
            escrito antes de autorizar o serviço:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Caminhão até 6.000 litros: <strong className="text-foreground">R$ 350 a R$ 600</strong></li>
            <li>• Caminhão de 8.000 a 12.000 litros: <strong className="text-foreground">R$ 600 a R$ 900</strong></li>
            <li>• Limpeza de caixa de gordura junto: <strong className="text-foreground">+ R$ 150 a R$ 300</strong></li>
            <li>• Hidrojateamento do sumidouro entupido: <strong className="text-foreground">R$ 400 a R$ 1.200</strong></li>
            <li>• Deslocamento para cidades da RMC: <strong className="text-foreground">+ R$ 80 a R$ 200</strong></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Como contratar com segurança</h2>
          <ol className="space-y-3 text-muted-foreground list-decimal pl-5">
            <li>Confirme CNPJ ativo e licença ambiental para transporte de resíduos.</li>
            <li>Exija o comprovante de destinação final do efluente após o serviço.</li>
            <li>Peça o preço fechado por caminhão, não por hora, e confirme o volume incluso.</li>
            <li>Verifique se a equipe usa EPI e nunca entra na fossa sem equipamento de resgate.</li>
            <li>Compare pelo menos duas empresas que atendam o seu bairro.</li>
          </ol>
          <div className="mt-5 flex items-start gap-3 bg-muted rounded-xl p-4">
            <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Nunca use soda cáustica para "resolver" fossa cheia: ela mata as bactérias que
              digerem o esgoto, corrói tubulação de PVC e agrava o problema.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Perguntas frequentes sobre limpa fossa</h2>
          <div className="space-y-5">
            {faqItems.map((f) => (
              <div key={f.pergunta}>
                <h3 className="font-bold mb-1">{f.pergunta}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.resposta}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks
          links={[
            { label: 'Limpa fossa em Curitiba', to: '/servicos/limpa-fossa-curitiba', hint: 'Empresas com caminhão a vácuo por bairro' },
            { label: 'Hidrojateamento em Curitiba', to: '/servicos/hidrojateamento-curitiba', hint: 'Desobstrução de sumidouro e rede de esgoto' },
            { label: 'Desentupidora 24h', to: '/servicos/desentupidora-24h-curitiba', hint: 'Atendimento de emergência na região' },
            { label: 'Como selecionamos profissionais', to: '/como-selecionamos-profissionais', hint: 'Nossos critérios de verificação' },
          ]}
        />

        <p className="text-muted-foreground">
          Precisa de atendimento agora?{' '}
          <Link to="/busca" className="text-primary font-bold hover:underline">
            Busque empresas pelo seu bairro
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default GuiaLimpaFossaPage;
