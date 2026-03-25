import { Link } from 'react-router-dom';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';

const TermosPage = () => {
  useSEO({
    title: 'Termos de Uso | Serviços no Bairro',
    description: 'Leia os Termos de Uso do Serviços no Bairro. Regras para uso do diretório, cadastro de empresas e responsabilidades.',
    canonical: '/termos',
    jsonLd: buildBreadcrumbSchema([
      { name: 'Início', url: '/' },
      { name: 'Termos de Uso', url: '/termos' },
    ]),
  });

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">Termos de Uso</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-black mb-2">Termos de Uso</h1>
        <p className="text-muted-foreground mb-8">Última atualização: 25 de março de 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-bold mb-3">1. O que é o Serviços no Bairro</h2>
            <p>O <strong>Serviços no Bairro</strong> (acessível em servicosnobairro.com.br) é um <strong>diretório online</strong> que conecta moradores de Curitiba e Região Metropolitana a empresas de desentupimento, encanamento e serviços hidráulicos. O Serviços no Bairro <strong>não é uma empresa prestadora de serviços hidráulicos</strong> — atuamos exclusivamente como plataforma de intermediação e divulgação.</p>
            <p>Nosso papel é listar, verificar e organizar informações de empresas prestadoras de serviço, facilitando o contato entre o usuário que precisa de atendimento e o profissional que pode realizá-lo.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site servicosnobairro.com.br, você declara ter lido, compreendido e aceito estes Termos de Uso em sua totalidade. Caso não concorde com qualquer disposição, solicitamos que não utilize nossos serviços.</p>
            <p>Estes Termos podem ser atualizados periodicamente. A continuidade do uso do site após alterações constitui aceitação dos novos termos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Responsabilidades do Usuário</h2>
            <p>Ao utilizar o Serviços no Bairro, o usuário se compromete a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fornecer informações verdadeiras e atualizadas ao solicitar orçamentos ou entrar em contato com empresas.</li>
              <li>Utilizar o site de forma ética e legal, não realizando ações que possam prejudicar o funcionamento da plataforma ou de terceiros.</li>
              <li>Não utilizar o diretório para fins fraudulentos, como cadastrar empresas fictícias ou publicar avaliações falsas.</li>
              <li>Avaliar de forma honesta e construtiva os serviços recebidos, contribuindo para a qualidade do diretório.</li>
              <li>Verificar diretamente com a empresa contratada as condições do serviço, preço, prazo e garantia antes de autorizar qualquer trabalho.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Responsabilidades das Empresas Listadas</h2>
            <p>As empresas cadastradas no Serviços no Bairro se comprometem a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Manter CNPJ ativo e regularizado junto aos órgãos competentes.</li>
              <li>Fornecer informações verdadeiras sobre serviços oferecidos, horários de atendimento, áreas de cobertura e preços.</li>
              <li>Prestar serviços com qualidade, profissionalismo e dentro das normas técnicas aplicáveis.</li>
              <li>Responder às solicitações de orçamento de forma ágil e transparente.</li>
              <li>Comunicar ao Serviços no Bairro qualquer alteração nos dados cadastrais, serviços ou horários de funcionamento.</li>
              <li>Cumprir todas as obrigações previstas no Código de Defesa do Consumidor (Lei nº 8.078/1990) e demais legislações aplicáveis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Limitação de Responsabilidade</h2>
            <p>O Serviços no Bairro <strong>não se responsabiliza</strong> por:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Qualidade dos serviços prestados:</strong> a contratação é feita diretamente entre o usuário e a empresa. O Serviços no Bairro não participa da negociação, execução ou pagamento dos serviços.</li>
              <li><strong>Danos causados por empresas listadas:</strong> eventuais prejuízos decorrentes de serviços mal realizados, atrasos, cobranças indevidas ou qualquer outro problema são de responsabilidade exclusiva da empresa contratada.</li>
              <li><strong>Disponibilidade das empresas:</strong> não garantimos que as empresas listadas estarão disponíveis para atendimento em todos os horários ou regiões indicados.</li>
              <li><strong>Precisão dos preços:</strong> os valores exibidos no site são estimativas baseadas em médias de mercado e podem variar de acordo com a complexidade do serviço, localização e empresa contratada.</li>
              <li><strong>Indisponibilidade do site:</strong> o Serviços no Bairro pode ficar temporariamente indisponível por manutenção, atualizações ou questões técnicas fora do nosso controle.</li>
            </ul>
            <p className="mt-3">O Serviços no Bairro atua de boa-fé na verificação das empresas listadas, mas <strong>não oferece garantia absoluta</strong> sobre a idoneidade, qualificação técnica ou solidez financeira das empresas cadastradas.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Como Reportar Problemas</h2>
            <p>Se você teve um problema com uma empresa listada no nosso diretório, entre em contato conosco para que possamos investigar e tomar as medidas cabíveis:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>E-mail:</strong> <a href="mailto:sac@aloanuncio.com.br" className="text-primary hover:underline">sac@aloanuncio.com.br</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/5541992721004" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(41) 99272-1004</a></li>
            </ul>
            <p className="mt-3">Analisamos todas as denúncias e reclamações recebidas. Empresas com histórico de reclamações graves ou recorrentes podem ter o selo de verificação removido ou ser excluídas do diretório.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Regras para Cadastro de Empresa</h2>
            <p>Para ser listada no Serviços no Bairro, a empresa deve atender aos seguintes requisitos:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Possuir CNPJ ativo e regularizado na Receita Federal.</li>
              <li>Atuar no segmento de desentupimento, encanamento, hidráulica ou serviços correlatos.</li>
              <li>Atender a cidade de Curitiba e/ou cidades da Região Metropolitana.</li>
              <li>Fornecer informações verídicas e comprováveis sobre serviços, preços e horários.</li>
              <li>Não possuir histórico de fraudes, golpes ou reclamações graves não resolvidas em plataformas de defesa do consumidor.</li>
            </ul>
            <p className="mt-3">O Serviços no Bairro se reserva o direito de recusar ou cancelar o cadastro de qualquer empresa, a qualquer momento, sem necessidade de justificativa prévia, caso identifique violação destes termos ou práticas prejudiciais aos usuários.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site servicosnobairro.com.br — incluindo textos, imagens, logotipo, layout, código-fonte e base de dados — é de propriedade do Serviços no Bairro ou de seus licenciadores, e está protegido pelas leis brasileiras de propriedade intelectual.</p>
            <p>É proibida a reprodução, distribuição, modificação ou uso comercial do conteúdo do site sem autorização prévia e por escrito.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Legislação Aplicável e Foro</h2>
            <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Curitiba, Estado do Paraná, para dirimir quaisquer questões oriundas destes termos, renunciando as partes a qualquer outro, por mais privilegiado que seja.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Contato</h2>
            <p>Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Serviços no Bairro</strong></li>
              <li>E-mail: <a href="mailto:sac@aloanuncio.com.br" className="text-primary hover:underline">sac@aloanuncio.com.br</a></li>
              <li>WhatsApp: <a href="https://wa.me/5541992721004" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(41) 99272-1004</a></li>
              <li>Telefone: <a href="tel:+5541987001004" className="text-primary hover:underline">(41) 98700-1004</a></li>
              <li>Site: <a href="https://www.servicosnobairro.com.br" className="text-primary hover:underline">servicosnobairro.com.br</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermosPage;
