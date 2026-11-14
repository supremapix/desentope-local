# Guias locais — 14/11/2026

Referência estudada: https://pimentelservicos.app.br/desentupidora_piraquara.html.
Adotado: organização por problemas, processo de contratação, orçamento e navegação local. Não copiados: marca, telefone, preços, chegada em 30 minutos, garantia, licença ou avaliações.

O portal permanece multiempresas, com todos os cadastros/contatos originais preservados. A cobertura geral dos bairros foi confirmada pelo proprietário nesta solicitação; não se afirma filial local nem chegada imediata.

- Páginas existentes de bairro/cidade: guias de contratação, sinais para descrever o problema, perguntas frequentes e contatos por empresa. Retirados do template os preços/prazos genéricos e o fornecedor único implícito no schema.
- 158 nomes de bairros/localidades documentados em oito cidades. Seleções de Araucária, Fazenda Rio Grande, Almirante Tamandaré e Campo Largo são parciais, não inventário completo.
- Seis novas páginas individuais, com fontes próprias, em Piraquara e São José dos Pinhais. Demais bairros aparecem no índice municipal, não têm ainda página individual.
- Novas rotas em sitemap e pré-renderização. URLs anteriores preservadas. Nenhuma mudança em DNS, e-mail, cadastro empresarial ou migração.

Verificação: 80 testes Vitest passaram; Vite + pré-renderização e validador passaram para 308 páginas. ESLint dos arquivos alterados passou. Checagem TypeScript geral continua bloqueada por sete erros preexistentes de categoria `religiao` em empresas/serviços (não alterados). Comando npm build do ambiente exige alternativa `node --import tsx` por restrição de socket IPC do tsx; mesmas etapas foram executadas. Tentativa de QA visual Chromium bloqueada por socket do ambiente; não equivale a teste visual concluído.

Fontes de nomes e fichas: arquivos JSON neste diretório. Orientações de manutenção: https://www.sanepar.com.br/ligacao-na-rede. Não foi consultado volume de buscas do Search Console; oportunidades editoriais, não demanda quantitativa comprovada ou promessa de ranking.
