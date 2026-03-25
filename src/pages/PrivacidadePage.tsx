import { Link } from 'react-router-dom';
import { useSEO, buildBreadcrumbSchema } from '@/hooks/useSEO';

const PrivacidadePage = () => {
  useSEO({
    title: 'Política de Privacidade | Serviços no Bairro',
    description: 'Leia a Política de Privacidade do Serviços no Bairro. Saiba como coletamos, usamos e protegemos seus dados conforme a LGPD.',
    canonical: '/privacidade',
    jsonLd: buildBreadcrumbSchema([
      { name: 'Início', url: '/' },
      { name: 'Política de Privacidade', url: '/privacidade' },
    ]),
  });

  return (
    <div className="min-h-screen">
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">Política de Privacidade</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-black mb-2">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-8">Última atualização: 25 de março de 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introdução</h2>
            <p>O <strong>Serviços no Bairro</strong> (acessível em servicosnobairro.com.br) é um diretório online de desentupidoras e encanadores que opera em Curitiba e Região Metropolitana. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos os dados pessoais dos nossos usuários e das empresas cadastradas, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).</p>
            <p>Ao utilizar nosso site, você concorda com as práticas descritas nesta política. Caso não concorde, recomendamos que não utilize nossos serviços.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Dados que Coletamos</h2>
            <p>Coletamos os seguintes tipos de dados pessoais:</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">2.1. Dados fornecidos voluntariamente</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Usuários que buscam serviços:</strong> nome, número de telefone/WhatsApp, e-mail, bairro ou cidade de localização, e descrição do serviço necessário — quando enviados via formulário de contato ou WhatsApp.</li>
              <li><strong>Empresas cadastradas:</strong> razão social, CNPJ, nome fantasia, endereço comercial, telefone, e-mail, WhatsApp, serviços oferecidos, horários de atendimento, fotos e logotipo.</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2">2.2. Dados coletados automaticamente</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Endereço IP e geolocalização aproximada</li>
              <li>Tipo de navegador e sistema operacional</li>
              <li>Páginas visitadas, tempo de permanência e origem do acesso</li>
              <li>Cookies essenciais para funcionamento do site e cookies analíticos (Google Analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Como Usamos seus Dados</h2>
            <p>Utilizamos os dados pessoais coletados para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Conectar usuários a prestadores de serviço:</strong> encaminhar solicitações de orçamento e contato para as empresas cadastradas que atendem a região e o tipo de serviço solicitado.</li>
              <li><strong>Operar e melhorar o diretório:</strong> manter o cadastro atualizado, exibir informações relevantes e personalizar a experiência de busca.</li>
              <li><strong>Comunicação:</strong> responder a dúvidas, enviar confirmações de cadastro e notificações sobre o serviço.</li>
              <li><strong>Análise e estatísticas:</strong> compreender como os usuários utilizam o site para melhorar a experiência e o conteúdo.</li>
              <li><strong>Cumprimento de obrigações legais:</strong> atender a requisições judiciais e obrigações previstas em lei.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Compartilhamento de Dados</h2>
            <p>Seus dados pessoais poderão ser compartilhados nas seguintes situações:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Com empresas parceiras listadas no diretório:</strong> quando você solicita orçamento ou entra em contato com uma empresa via nosso site, seus dados de contato (nome, telefone, descrição do serviço) são compartilhados com a empresa selecionada para que ela possa atendê-lo.</li>
              <li><strong>Com prestadores de serviços técnicos:</strong> utilizamos serviços de hospedagem (Vercel), análise (Google Analytics) e comunicação (WhatsApp Business) que podem processar dados de forma limitada para operar o site.</li>
              <li><strong>Por obrigação legal:</strong> quando exigido por lei, decisão judicial ou autoridade competente.</li>
            </ul>
            <p className="mt-3"><strong>Não vendemos, alugamos ou comercializamos seus dados pessoais</strong> para terceiros que não estejam diretamente relacionados à operação do diretório.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Retenção dos Dados</h2>
            <p>Os dados pessoais são armazenados pelos seguintes períodos:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Dados de usuários:</strong> mantidos enquanto necessário para atender à solicitação de serviço, e por até 12 meses após o último contato para fins estatísticos.</li>
              <li><strong>Dados de empresas cadastradas:</strong> mantidos enquanto o cadastro estiver ativo no diretório. Após exclusão do cadastro, os dados são removidos em até 30 dias, exceto quando a retenção for necessária para cumprimento de obrigações legais.</li>
              <li><strong>Dados de navegação:</strong> cookies analíticos são retidos por até 26 meses conforme configuração do Google Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Direitos do Titular dos Dados (LGPD Art. 18)</h2>
            <p>De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e obter cópia das informações.</li>
              <li><strong>Correção:</strong> solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Anonimização, bloqueio ou eliminação:</strong> solicitar a anonimização ou exclusão de dados desnecessários ou tratados em desconformidade com a LGPD.</li>
              <li><strong>Portabilidade:</strong> solicitar a transferência dos seus dados a outro fornecedor de serviço.</li>
              <li><strong>Eliminação:</strong> solicitar a exclusão dos dados pessoais tratados com base no seu consentimento.</li>
              <li><strong>Informação sobre compartilhamento:</strong> saber com quais entidades públicas ou privadas seus dados foram compartilhados.</li>
              <li><strong>Revogação do consentimento:</strong> retirar o consentimento a qualquer momento.</li>
              <li><strong>Oposição:</strong> opor-se ao tratamento quando realizado em desconformidade com a LGPD.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Como Exercer seus Direitos</h2>
            <p>Para exercer qualquer um dos direitos acima, entre em contato conosco:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>E-mail:</strong> <a href="mailto:sac@aloanuncio.com.br" className="text-primary hover:underline">sac@aloanuncio.com.br</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/5541992721004" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(41) 99272-1004</a></li>
            </ul>
            <p className="mt-3">Responderemos às solicitações em até 15 dias úteis, conforme previsto na LGPD.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Segurança dos Dados</h2>
            <p>Empregamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, destruição, perda, alteração ou qualquer forma de tratamento inadequado. Essas medidas incluem criptografia SSL/TLS em todas as páginas, controle de acesso restrito e monitoramento contínuo.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Alterações nesta Política</h2>
            <p>Esta Política de Privacidade pode ser atualizada periodicamente. Alterações significativas serão comunicadas na página principal do site. A data de última atualização será sempre indicada no topo deste documento.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Contato</h2>
            <p>Se tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato:</p>
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

export default PrivacidadePage;
