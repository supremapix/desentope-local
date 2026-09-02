export interface Bairro {
  slug: string;
  nome: string;
  regional: string;
  oficial: boolean;
  vizinhos: string[];
}

export interface CidadeRMC {
  slug: string;
  nome: string;
  distanciaKm: number;
  bairros?: string[];
}

export interface Servico {
  slug: string;
  nome: string;
  icone: string;
  categoria: 'desentupimento' | 'encanamento';
  descricao: string;
  descricaoLonga?: string;
  precoMedio?: string;
}

export interface HorarioFuncionamento {
  dia: string;
  abertura: string;
  fechamento: string;
  fechado?: boolean;
}

export interface Avaliacao {
  id: string;
  nomeCliente: string;
  nota: number;
  data: string;
  servicoRealizado: string;
  texto: string;
  respostaEmpresa?: string;
}

export interface Empresa {
  slug: string;
  nome: string;
  logo?: string;
  fotoCapa?: string;
  fotos: string[];
  descricao: string;
  descricaoLonga: string;
  whatsapp: string;
  telefone: string;
  email?: string;
  cnpj?: string;
  endereco?: string;
  site?: string;
  youtubeVideoId?: string;
  anosExperiencia: number;
  verificada: boolean;
  destaque: boolean;
  atende24h: boolean;
  atendeEmergencia: boolean;
  tipoServico: ('desentupimento' | 'encanamento' | 'motofrete')[];
  servicosOferecidos: string[];
  bairrosAtendidos: string[];
  cidadesAtendidas: string[];
  formasPagamento: string[];
  horarios: HorarioFuncionamento[];
  avaliacoes: Avaliacao[];
  notaMedia: number;
  totalAvaliacoes: number;
  redesSociais?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    googleMeuNegocio?: string;
  };
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export interface FAQCategoria {
  slug: string;
  nome: string;
  icone: string;
  perguntas: FAQItem[];
}
