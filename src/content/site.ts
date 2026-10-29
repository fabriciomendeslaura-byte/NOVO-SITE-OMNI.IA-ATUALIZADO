/**
 * Conteúdo do site — TEXTO, separado do CÓDIGO.
 *
 * Mudar uma frase não pode exigir abrir um componente e arriscar quebrar
 * layout. Aqui o texto é dado; nos componentes é apresentação.
 *
 * Fonte: site oficial (SITE OMNI.IA/src/content/site.ts), README do OmniZap e
 * docs/project-context.md do Clique Agenda — extraído em 29/10/2026.
 *
 * NARRATIVA (revisada em 29/10/2026)
 * Tom executivo, focado em valor. Cada seção segue o mesmo arco:
 *   dor concreta → custo de não resolver → solução → resultado para o negócio.
 * Regra que não muda: nenhum número, cliente ou depoimento inventado.
 * Toda promessa aqui precisa ser verdade na operação.
 */

export const EMPRESA = {
  nome: 'OMNI.IA',
  razao: 'OMNI.IA Tecnologia',
  local: 'Rio de Janeiro · atendemos todo o Brasil',
  email: 'contato@omniiabr.tech',
  instagram: 'https://www.instagram.com/omniiabr/',
  /** Só dígitos — formato que o link do WhatsApp exige. */
  whatsappNumero: '5521994277725',
  whatsappExibicao: '+55 (21) 99427-7725',
  whatsappMensagem: 'Olá! Gostaria de agendar uma consultoria gratuita.',
} as const

/** Links dos produtos. Trocou o domínio? Muda só aqui. */
export const LINKS = {
  omnizap: 'https://app.omniiabr.com',
  cliqueAgenda: 'https://cliqueagenda.app',
} as const

/** `encodeURIComponent` evita link quebrado (e injeção de parâmetro) por acento e espaço. */
export const linkWhatsApp = (mensagem: string = EMPRESA.whatsappMensagem): string =>
  `https://wa.me/${EMPRESA.whatsappNumero}?text=${encodeURIComponent(mensagem)}`

export const NAVEGACAO = [
  { rotulo: 'Soluções', href: '#servicos' },
  { rotulo: 'Agentes de IA', href: '#agentes' },
  { rotulo: 'OmniZap', href: '#omnizap' },
  { rotulo: 'Clique Agenda', href: '#clique-agenda' },
  { rotulo: 'Engenharia', href: '#engenharia' },
] as const

export const HERO = {
  etiqueta: 'Engenharia de software e IA',
  titulo: 'Sua empresa operando com',
  tituloDestaque: 'Inteligência Artificial.',
  subtitulo:
    'Agentes de IA, automações e software sob medida que eliminam o trabalho manual, aceleram o crescimento e dão a você controle total da operação.',
  ctaPrimario: 'Quero meu diagnóstico gratuito',
  ctaSecundario: 'Ver o que construímos',
} as const

/**
 * CENA "UM DIA NA SUA EMPRESA" (decidida em 29/10/2026).
 *
 * A melhor frase do site antigo vira título, e a cena PROVA a frase: um relógio
 * corre das 06:00 à meia-noite no ritmo do scroll, o fundo vai do amanhecer à
 * noite, e cada horário mostra uma tarefa que a IA fez sozinha.
 *
 * ⚠️ Horários e tarefas são EXEMPLOS ilustrativos de um dia típico — não são
 * dados de cliente. Por isso nenhum deles cita empresa, nome ou resultado.
 */
export const DIA = {
  etiqueta: 'Um dia na sua empresa',
  titulo: 'Você abre o painel de manhã e o dia já está organizado.',
  tituloDestaque: 'Sem ninguém ter passado a noite atualizando planilha.',
  fecho: 'Ninguém da sua equipe precisou fazer nada disso.',
  fechoApoio: 'Enquanto os agentes cuidam da rotina, seu time cuida do que faz a empresa crescer.',
  /** `minuto` = minutos desde 00:00; é o que posiciona o card na linha do tempo. */
  eventos: [
    { hora: '07:00', minuto: 420, area: 'Financeiro', icone: 'nota', texto: 'Notas fiscais do dia conferidas. Uma divergência sinalizada ao financeiro.' },
    { hora: '09:12', minuto: 552, area: 'Vendas', icone: 'lead', texto: 'Lead do Instagram qualificado e reunião marcada na agenda do comercial.' },
    { hora: '12:30', minuto: 750, area: 'Relacionamento', icone: 'loop', texto: 'Follow-up enviado para 18 clientes que pararam de responder.' },
    { hora: '18:00', minuto: 1080, area: 'Gestão', icone: 'relatorio', texto: 'Relatório do dia entregue na caixa de entrada do gestor.' },
    { hora: '23:47', minuto: 1427, area: 'Atendimento', icone: 'chat', texto: 'Cliente atendido no WhatsApp e horário confirmado — com a empresa fechada.' },
  ],
} as const

export const FAIXA = [
  'Agentes de IA',
  'Software sob medida',
  'Automações',
  'CRM inteligente',
  'Aplicativos',
  'Sites',
  'Integrações',
  'Infraestrutura dedicada',
] as const

export const SECAO_SERVICOS = {
  etiqueta: 'O que construímos',
  titulo: 'Software feito para a sua operação,',
  tituloDestaque: 'não para a média do mercado.',
  descricao:
    'Sistemas prontos obrigam sua empresa a se adaptar a eles — e o que não encaixa vira planilha, retrabalho e controle paralelo. Nós partimos do seu processo e construímos a tecnologia em volta dele.',
} as const

/**
 * A ORDEM É ARGUMENTO: começando por software, o visitante conclui
 * "constroem software de verdade" — e não "são uma agência de automação".
 */
export const SERVICOS = [
  {
    id: 'software',
    codigo: '01',
    titulo: 'Software Sob Medida',
    chamada: 'Quando nenhum sistema pronto serve, a gente constrói o seu.',
    descricao:
      'Sua operação já tem um jeito de funcionar. Sistema pronto obriga a mudar esse jeito — e sobra planilha para tapar o que ele não faz. A gente constrói o sistema em volta do seu processo.',
    itens: ['Projeto do zero, sem template', 'Conversa com os sistemas que você já usa', 'Painéis em tempo real'],
  },
  {
    id: 'agentes',
    codigo: '02',
    titulo: 'Agentes de IA',
    chamada: 'Um agente para cada trabalho que consome seu time.',
    descricao:
      'Marketing montando relatório toda segunda. Financeiro conferindo nota na mão. Atendimento respondendo a mesma pergunta quarenta vezes por dia. Cada função vira um agente — com as ferramentas e o acesso que ela precisa.',
    itens: ['Marketing, financeiro, relatórios e atendimento', 'Acesso aos sistemas da sua empresa', 'Decide o próximo passo sem roteiro fixo'],
  },
  {
    id: 'automacoes',
    codigo: '03',
    titulo: 'Automações e Integrações',
    chamada: 'Automatizamos o que consome o seu dia.',
    descricao:
      'O dado digitado duas vezes porque os sistemas não conversam. A aprovação que dorme no e-mail. A gente liga as pontas e isso passa a acontecer sozinho, no horário certo.',
    itens: ['Sistemas que não conversavam, conversando', 'Tarefas repetitivas rodando sozinhas', 'Alerta quando algo sai do padrão'],
  },
  {
    id: 'crm',
    codigo: '04',
    titulo: 'CRM Inteligente',
    chamada: 'O CRM que se preenche sozinho.',
    descricao:
      'Lead do WhatsApp, do Instagram, do formulário e dos anúncios caindo no mesmo lugar, já pontuado e com o histórico da conversa. Sua equipe abre e sabe com quem falar primeiro.',
    itens: ['WhatsApp, Instagram, site e anúncios', 'Pontuação automática de lead', 'Painel de métricas do funil'],
  },
  {
    id: 'aplicativos',
    codigo: '05',
    titulo: 'Aplicativos e Sites',
    chamada: 'No bolso de quem executa. No Google de quem procura.',
    descricao:
      'O app que a equipe usa onde o trabalho acontece — mesmo com internet ruim. E o site que traz cliente, não só elogio: rápido no 4G, pronto para o Google e legível pelas IAs.',
    itens: ['Celular e tablet, mesmo offline', 'Estruturado para Google e IAs', 'Agente de IA integrado desde o lançamento'],
  },
  {
    id: 'infra',
    codigo: '06',
    titulo: 'Infraestrutura Dedicada',
    chamada: 'Servidor exclusivo. Não condomínio.',
    descricao:
      'Nuvem compartilhada quer dizer que o pico de outro cliente vira a sua lentidão. Cada projeto sobe em uma VPS própria, isolada, com tráfego criptografado e backup diário.',
    itens: ['Sem vizinho dividindo recursos', 'Backup diário em mais de um lugar', 'Monitoramento 24/7'],
  },
] as const

export type Servico = (typeof SERVICOS)[number]

/**
 * AGENTES DE IA — a seção que explica o que é um agente, de forma geral.
 *
 * Decisão de 29/10/2026 (pedido do Fabricio): agente de IA não é "robô de
 * WhatsApp". A OMNI.IA faz agente para qualquer área, configura o Claude Code
 * para a equipe do cliente e desenha arquiteturas multiagente. A cena mostra
 * quatro aplicações diferentes numa mesma janela, trocando com o scroll.
 */
export const SECAO_AGENTE = {
  etiqueta: 'Agentes de IA',
  titulo: 'Um agente para cada trabalho.',
  tituloDestaque: 'Uma arquitetura para a empresa inteira.',
  descricao:
    'Agente de IA não é chatbot. É um sistema que entende o contexto, usa as ferramentas da sua empresa e executa tarefas do início ao fim — em qualquer área, não só no atendimento.',
} as const

/** Cada passo acende junto com a "tela" correspondente na janela ao lado. */
export const PASSOS_AGENTE = [
  {
    rotulo: 'Atendimento e vendas',
    texto: 'Responde em segundos, qualifica e agenda — no WhatsApp, Instagram ou site. Domingo às 23h47 também.',
  },
  {
    rotulo: 'Operações e financeiro',
    texto: 'Confere notas, concilia pagamentos e aponta divergências antes de virarem prejuízo.',
  },
  {
    rotulo: 'Claude Code na sua equipe',
    texto: 'Configuramos o Claude Code com as habilidades, os acessos e as regras da sua empresa. Sua equipe pede, ele executa.',
  },
  {
    rotulo: 'Arquitetura multiagente',
    texto: 'Agentes especialistas trabalhando juntos, coordenados por um orquestrador e conectados aos seus sistemas.',
  },
] as const

/** Tela 1 — conversa curta de atendimento. */
export const CONVERSA = [
  { de: 'cliente', texto: 'Oi, vocês fazem implante? Quanto custa?', hora: '23:47' },
  { de: 'agente', texto: 'Olá, Marina! Fazemos sim 😊 É para um dente ou mais? Prefere manhã ou tarde?', hora: '23:47' },
  { de: 'cliente', texto: 'Um dente. De manhã', hora: '23:48' },
  { de: 'agente', texto: 'Tenho quinta às 9h para a avaliação gratuita. Posso confirmar?', hora: '23:48' },
  { de: 'cliente', texto: 'Pode!', hora: '23:49' },
  { de: 'agente', texto: 'Agendado ✅ Quinta, 9h. Lead registrado no CRM.', hora: '23:49' },
] as const

/** Tela 2 — agente financeiro conferindo notas. Valores são ilustrativos. */
export const CONFERENCIA = [
  { doc: 'NF 4821 · Alfa Distribuidora', valor: 'R$ 12.430,00', ok: true, aviso: '' },
  { doc: 'NF 4822 · Beta Logística', valor: 'R$ 3.180,00', ok: true, aviso: '' },
  { doc: 'NF 4823 · Gama Insumos', valor: 'R$ 8.950,00', ok: false, aviso: 'Valor R$ 380 acima do pedido de compra' },
  { doc: 'NF 4824 · Delta Serviços', valor: 'R$ 1.200,00', ok: true, aviso: '' },
] as const

/** Tela 3 — Claude Code configurado para a empresa. */
export const CLAUDE_CODE = {
  pedido: 'Monte o relatório semanal de vendas e envie para a diretoria',
  passos: [
    'Lendo o CRM · 142 negócios da semana',
    'Cruzando com a planilha de metas',
    'Gerando relatorio-semana-43.pdf',
    'Enviando para diretoria@suaempresa.com.br',
  ],
  final: 'Pronto. Relatório enviado com o resumo por vendedor.',
} as const

/** Tela 4 — arquitetura: orquestrador, agentes especialistas e ferramentas. */
export const ARQUITETURA = {
  orquestrador: 'Orquestrador',
  agentes: ['Atendimento', 'Comercial', 'Financeiro', 'Relatórios'],
  ferramentas: ['CRM', 'ERP', 'Agenda', 'E-mail'],
} as const

/** Como um agente funciona — o bloco explicativo abaixo da cena. */
export const ANATOMIA = {
  titulo: 'Como um agente de IA funciona',
  descricao: 'Quatro camadas que transformam um modelo de IA em alguém que trabalha na sua operação.',
  partes: [
    { titulo: 'Raciocínio', texto: 'Um modelo de IA de ponta interpreta o pedido, planeja os passos e decide o que fazer em seguida.' },
    { titulo: 'Ferramentas', texto: 'Acesso controlado a CRM, ERP, planilhas, e-mail e agenda — para executar, não só responder.' },
    { titulo: 'Conhecimento', texto: 'Treinado com os documentos, processos e regras de negócio da sua empresa.' },
    { titulo: 'Controle', texto: 'Permissões definidas, registro de cada ação e aprovação humana onde ela for necessária.' },
  ],
  areasTitulo: 'Onde aplicamos',
  areas: [
    'Atendimento',
    'Vendas e SDR',
    'Financeiro',
    'Marketing',
    'RH e recrutamento',
    'Contratos e documentos',
    'Suporte técnico',
    'Logística',
    'Relatórios gerenciais',
    'Desenvolvimento de software',
  ],
} as const

export const SECAO_PRODUTOS = {
  etiqueta: 'Produtos OMNI.IA',
  titulo: 'Nossa engenharia não fica no discurso.',
  tituloDestaque: 'Ela roda em produtos próprios.',
  descricao:
    'Desenvolvemos e operamos nossas próprias plataformas. É a mesma tecnologia, a mesma segurança e o mesmo padrão de qualidade que levamos para o projeto da sua empresa.',
} as const

/** Resumo de uma linha de cada produto, usado nos cards de entrada. */
export const PORTAIS = {
  omnizap: 'Agente de IA no WhatsApp que atende, qualifica, agenda e recupera leads.',
  cliqueAgenda: 'Agenda online com confirmação e lembrete automáticos para negócios de hora marcada.',
} as const

export const OMNIZAP = {
  etiqueta: 'OmniZap',
  titulo: 'Seu WhatsApp',
  tituloDestaque: 'trabalhando por você.',
  subtitulo:
    'Cada mensagem sem resposta é um cliente a caminho do concorrente. O OmniZap coloca um agente de IA no WhatsApp da sua empresa que atende na hora, qualifica, agenda, registra no CRM e retoma quem parou de responder.',
  cta: 'Testar grátis por 7 dias',
  ctaSecundario: 'Falar com um especialista',
  recursos: [
    { icone: 'bot', titulo: 'Atendimento com IA', texto: 'Respostas imediatas e naturais, 24 horas por dia.' },
    { icone: 'loop', titulo: 'Follow-up automático', texto: 'Retoma contatos que esfriaram, no momento certo.' },
    { icone: 'users', titulo: 'CRM de leads', texto: 'Funil organizado automaticamente a cada conversa.' },
    { icone: 'calendar', titulo: 'Agendamento', texto: 'Reuniões marcadas direto no Google Agenda.' },
    { icone: 'shield', titulo: 'Dados protegidos', texto: 'As informações de cada empresa ficam isoladas e seguras.' },
  ],
  destaque: 'Agentes de IA + CRM + Follow-up + Agendamentos',
} as const

/** Confirmação e lembrete por WhatsApp: confirmado em produção pelo Fabricio (29/10/2026). */
export const CLIQUE_AGENDA = {
  etiqueta: 'Clique Agenda',
  titulo: 'Agenda cheia.',
  tituloDestaque: 'Sem interromper o atendimento.',
  subtitulo:
    'Enquanto você atende, o WhatsApp não para — e cada mensagem sem resposta pode virar um horário vazio. Com o Clique Agenda, o cliente agenda sozinho pelo seu link, recebe confirmação e lembrete automáticos, e as faltas diminuem.',
  cta: 'Criar minha agenda',
  publico: ['Barbearias', 'Salões', 'Estética', 'Manicure', 'Pet shops'],
  passos: [
    { titulo: 'O cliente escolhe o serviço', texto: 'Pelo seu link exclusivo, sem baixar aplicativo e sem cadastro.' },
    { titulo: 'Escolhe o horário', texto: 'Só aparecem os horários realmente disponíveis. Zero conflito.' },
    { titulo: 'Recebe tudo no WhatsApp', texto: 'Confirmação imediata e lembrete antes do horário — menos faltas.' },
  ],
} as const

export const SECAO_ENGENHARIA = {
  etiqueta: 'Padrão de engenharia',
  titulo: 'O que não aparece no orçamento',
  tituloDestaque: 'é o que sustenta o seu negócio.',
  descricao:
    'Sistema mal construído funciona na demonstração e falha no volume. Por isso, em todo projeto da OMNI.IA, segurança, monitoramento e propriedade dos dados são requisito — nunca opcional.',
} as const

export const PILARES = [
  {
    codigo: '01',
    titulo: 'Segurança desde a primeira linha',
    descricao: 'Permissões validadas no banco de dados, não apenas na tela. Cada usuário acessa somente o que é dele.',
    marcador: 'RLS · validação no servidor',
  },
  {
    codigo: '02',
    titulo: 'Código pronto para crescer',
    descricao: 'Tipado, documentado e organizado por responsabilidade. Qualquer equipe técnica consegue evoluir o sistema.',
    marcador: 'TypeScript estrito · arquitetura em camadas',
  },
  {
    codigo: '03',
    titulo: 'Monitoramento contínuo',
    descricao: 'Se algo sair do padrão às duas da manhã, o alerta chega para nós — antes de chegar ao seu cliente.',
    marcador: 'monitoramento 24/7 · backup diário',
  },
  {
    codigo: '04',
    titulo: 'Propriedade total',
    descricao: 'Servidor no seu nome, código no seu repositório, dados no seu banco. Sem dependência e sem aprisionamento.',
    marcador: 'sem lock-in · acesso total',
  },
] as const

/** Linhas do terminal da seção de engenharia — digitadas quando a seção entra. */
export const TERMINAL = [
  { tipo: 'cmd', texto: 'omni deploy --cliente sua-empresa' },
  { tipo: 'ok', texto: '✓ Servidor dedicado provisionado' },
  { tipo: 'ok', texto: '✓ Regras de acesso ativas no banco' },
  { tipo: 'ok', texto: '✓ Certificado SSL emitido' },
  { tipo: 'ok', texto: '✓ Backup diário agendado (2 destinos)' },
  { tipo: 'ok', texto: '✓ Agente de atendimento online' },
  { tipo: 'info', texto: '→ monitoramento 24/7 ativo' },
] as const

export const SECAO_PROCESSO = {
  etiqueta: 'Como trabalhamos',
  titulo: 'Do diagnóstico à operação,',
  tituloDestaque: 'com previsibilidade em cada etapa.',
} as const

export const PASSOS = [
  {
    codigo: '01',
    titulo: 'Diagnóstico',
    duracao: 'gratuito · sem compromisso',
    descricao: 'Mapeamos sua operação, identificamos os gargalos e mostramos onde a tecnologia gera retorno mais rápido.',
  },
  {
    codigo: '02',
    titulo: 'Proposta e construção',
    duracao: 'escopo, investimento e prazo definidos',
    descricao: 'Você aprova tudo antes de começarmos e acompanha cada entrega. Sem surpresas no meio do caminho.',
  },
  {
    codigo: '03',
    titulo: 'Operação e evolução',
    duracao: 'acompanhamento contínuo',
    descricao: 'Monitoramos, ajustamos e evoluímos o sistema junto com o crescimento da sua empresa.',
  },
] as const

export const SECAO_FAQ = {
  etiqueta: 'Perguntas frequentes',
  titulo: 'O que você precisa saber antes de decidir.',
} as const

export const PERGUNTAS = [
  {
    pergunta: 'Como funciona o diagnóstico gratuito?',
    resposta:
      'É uma conversa técnica e de negócio. Entendemos seus fluxos de trabalho, identificamos os gargalos e mapeamos onde a tecnologia gera o maior retorno imediato. Você sai com um roteiro claro — baseado na sua realidade, não em suposições — e sem nenhum compromisso.',
  },
  {
    pergunta: 'Qual a diferença entre um agente de IA e um chatbot?',
    resposta:
      'O chatbot segue um roteiro fixo e devolve texto. O agente de IA entende o contexto, consulta seus sistemas, executa tarefas e decide o próximo passo. Na prática, ele assume trabalho que hoje consome horas da sua equipe.',
  },
  {
    pergunta: 'OmniZap e Clique Agenda são para quem?',
    resposta:
      'O OmniZap é para empresas que vendem pelo WhatsApp e não podem perder lead por demora: ele atende, qualifica, agenda e faz follow-up. O Clique Agenda é para negócios de hora marcada — barbearias, salões, clínicas de estética — que querem o cliente agendando sozinho. Os dois podem ser testados gratuitamente.',
  },
  {
    pergunta: 'A integração com os meus sistemas atuais é complexa?',
    resposta:
      'Não para você. Nossa engenharia conecta as ferramentas que sua empresa já usa — ERP, CRM, agenda e meios de pagamento — e a sincronização roda em segundo plano, sem exigir esforço técnico da sua equipe.',
  },
  {
    pergunta: 'Meus dados ficam seguros?',
    resposta:
      'Sim. Projetos sob medida rodam em infraestrutura exclusiva, isolada de outros clientes, com tráfego criptografado e backup diário. O acesso e os dados ficam no nome da sua empresa — sempre.',
  },
  {
    pergunta: 'Quanto custa?',
    resposta:
      'O investimento depende do escopo: quantas áreas serão atendidas, quantas integrações são necessárias e se há software sob medida. Por isso apresentamos a proposta depois do diagnóstico, já com escopo, prazo e valor fechados. O diagnóstico é gratuito.',
  },
] as const

/**
 * CONTATO — mesmo contrato de dados do site oficial
 * (SITE OMNI.IA/docs/integracao-formulario.md). O n8n não precisa mudar nada.
 */
export const SECAO_CONTATO = {
  etiqueta: 'Diagnóstico gratuito',
  titulo: 'Descubra onde sua operação está perdendo tempo.',
  tituloDestaque: 'E quanto isso custa.',
  descricao:
    'Conte como sua empresa funciona hoje. Nossa equipe analisa o cenário e mostra, com clareza, o que pode ser automatizado, onde está o maior ganho e por onde começar.',
  garantias: ['Resposta imediata', 'Sem compromisso', 'Dados protegidos pela LGPD'],
  botao: 'Solicitar meu diagnóstico gratuito',
  botaoEnviando: 'Enviando…',
  // Sem botão de WhatsApp e sem "nossa IA vai te chamar" na tela de sucesso:
  // decisões de 08/09/2026, ver comentários no site oficial.
  sucessoTitulo: 'Recebemos sua solicitação.',
  sucessoTexto:
    'Nossa equipe já está analisando as informações da sua empresa. Em instantes você recebe o contato no WhatsApp informado — mantenha o celular por perto.',
  erroTexto: 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.',
} as const

export const FATURAMENTOS = [
  'Até R$ 50 mil/mês',
  'R$ 50 mil a R$ 200 mil/mês',
  'R$ 200 mil a R$ 500 mil/mês',
  'Acima de R$ 500 mil/mês',
  'Prefiro não informar',
] as const

export const VOLUMES_LEADS = [
  'Até 10 por dia',
  '10 a 50 por dia',
  '50 a 100 por dia',
  'Acima de 100 por dia',
  'Não acompanhamos esse número',
] as const

/** Mesmos valores do contrato com o n8n — não renomear sem mudar o workflow. */
export const INTERESSES = [
  'Software sob medida',
  'Agentes de IA',
  'Automações e integrações',
  'Aplicativo',
  'Site',
  'Ainda não sei — quero entender',
] as const

export const PRIVACIDADE = {
  titulo: 'Política de Privacidade',
  blocos: [
    {
      titulo: 'Quem trata os seus dados',
      texto:
        'A OMNI.IA Tecnologia, sediada no Rio de Janeiro, é a responsável pelos dados coletados neste site. Para qualquer assunto sobre privacidade, escreva para contato@omniiabr.tech ou chame no WhatsApp (21) 99427-7725.',
    },
    {
      titulo: 'Que dados coletamos',
      texto:
        'Somente o que você digita no formulário de diagnóstico: nome, e-mail, WhatsApp, empresa, site ou LinkedIn, faixa de faturamento e volume de leads (opcionais), o que você procura e a descrição da sua operação. Não coletamos dado sensível, não compramos lista e não pedimos documento nem dado bancário.',
    },
    {
      titulo: 'Para que usamos',
      texto:
        'Exclusivamente para responder à sua solicitação, preparar o diagnóstico e conversar sobre o projeto. Não enviamos mensagem em massa e não fazemos disparo sem que você tenha pedido.',
    },
    {
      titulo: 'Com que autorização',
      texto:
        'Com o seu consentimento, que você dá ao marcar a caixa antes de enviar o formulário. Sem essa marcação o envio não acontece. Você pode retirar o consentimento quando quiser, e nesse caso apagamos os seus dados.',
    },
    {
      titulo: 'Com quem compartilhamos',
      texto:
        'Com ninguém. Não vendemos, não cedemos e não compartilhamos os seus dados com terceiros para fins comerciais.',
    },
    {
      titulo: 'Por quanto tempo guardamos',
      texto:
        'Enquanto durar a conversa sobre o projeto e por até 12 meses depois. Passado esse prazo, os dados são apagados — ou antes, se você pedir.',
    },
    {
      titulo: 'Cookies',
      texto: 'Este site não usa cookies de medição nem de anúncio, e não rastreia a sua navegação.',
    },
    {
      titulo: 'Seus direitos',
      texto:
        'A LGPD garante que você pode pedir, a qualquer momento: confirmação de que tratamos seus dados, acesso, correção, exclusão e revogação do consentimento. Respondemos em até 15 dias.',
    },
    {
      titulo: 'Segurança',
      texto:
        'Os dados trafegam criptografados por HTTPS e ficam em infraestrutura com acesso restrito. Nenhuma senha ou chave de acesso é armazenada neste site.',
    },
  ],
} as const
