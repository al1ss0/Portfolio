// Tudo que você pode querer trocar sem mexer nos componentes fica aqui.
// Textos com { en, pt } mudam com o botão de idioma.

const EMAIL = 'alissonbsa05@gmail.com';

export const tabs = {
  home: 'Alisson Bosa',
  about: { en: 'About me', pt: 'Sobre mim' },
  contact: { en: 'Let’s Work Together', pt: 'Contatos' },
  projects: { en: 'Projects', pt: 'Projetos' },
};

export const contacts = [
  {
    label: { en: 'EMAIL', pt: 'E-MAIL' },
    value: EMAIL,
    // abre a tela de escrever email do Gmail já com o destinatário
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
  },
  { label: 'LINKEDIN', value: '/in/alissonbosa', href: 'https://www.linkedin.com/in/alissonbosa' },
  { label: 'GITHUB', value: '@al1ss0', href: 'https://github.com/al1ss0' },
  { label: 'INSTAGRAM', value: '@_alissobsa', href: 'https://www.instagram.com/_alissobsa' },
];

// WhatsApp: (54) 9 9406-7234 → DDI 55 + DDD 54 + número
export const whatsappNumber = '5554994067234';
export const whatsappMessage = {
  en: "Hi Alisson! I saw your portfolio and I'd like to talk.",
  pt: 'Oi, Alisson! Vi seu portfólio e queria conversar.',
};

export const cvFile = { en: '/cv-alisson-bosa-en.pdf', pt: '/cv-alisson-bosa-pt.pdf' };

export const about = {
  bio: {
    en: [
      'Hey, I’m Alisson! I’m a Computer Science student from Passo Fundo, Brazil, and somewhere along the way I realized I don’t want to',
      'choose between designing things and building them, so I do both. Right now I’m deep into prototyping, the part where an idea finally gets a shape, and honestly that’s my favorite place to be. I’m a good listener, so I love getting to know people’s real problems and turning them into something that actually works (and looks good doing it).',
    ],
    // em português a bio são 5 caixas, como no Figma, contornando o Paint
    pt: [
      'Oi, eu sou o Alisson! Estudo Ciência da Computação em Passo Fundo e, no meio do caminho, percebi que não queria escolher entre desenhar as coisas e construir elas, então estou aprendendo a fazer',
      'as duas. Hoje estou mergulhado em prototipagem, a',
      'parte em que a ideia finalmente ganha forma, e sinceramente é onde eu mais gosto de estar. Sou bom de',
      'conversa, então adoro entender as dores reais das',
      'pessoas e transformar isso em algo que funciona de verdade (e que fica bonito no processo).',
    ],
  },
  // só a versão em português é desenhada em HTML; a inglesa usa a imagem original do Figma
  info: [
    { label: 'VIVENDO EM', value: 'Passo Fundo, BR' },
    { label: 'ESTUDANDO', value: 'Ciência da Computação' },
    { label: 'ATUALMENTE', value: 'A busca de estágio' },
    { label: 'EM 3 PALAVRAS', value: 'Intenso, parceiro e divertido' },
  ],
  cvButton: { en: 'Download my CV', pt: 'Baixar meu CV' },
};

export const projects = [
  {
    id: 'booking',
    name: 'Booking System',
    description: {
      en: 'A room and lab booking system for universities: no double bookings, just open slots and instant notifications.',
      pt: 'Sistema de reservas de salas e laboratórios para faculdade: sem conflito de horário, só os horários livres e notificação na hora.',
    },
    card: '/assets/card-booking-bg.png',
    href: 'https://github.com/al1ss0/Booking-System',
  },
  {
    id: 'rfid',
    name: 'RFID Attendance',
    description: {
      en: 'A smart turnstile for campus: students tap their RFID card to get in, and entry, exit and attendance are logged automatically.',
      pt: 'Uma catraca inteligente para o campus: o aluno passa o cartão para entrar, e todas as ações ficam registradas sozinhas.',
    },
    card: '/assets/card-rfid-bg.png',
    href: 'https://github.com/al1ss0/RFID-Project',
  },
  {
    id: 'ilpi',
    name: 'ILPI Bem Viver',
    description: {
      en: "Visual identity and app for a senior care home, built to bring families closer to their loved ones' daily routine.",
      pt: 'Identidade visual e app para uma casa de repouso, pensados para aproximar as famílias do dia a dia de quem elas amam.',
    },
    card: '/assets/card-ilpi-bg.png',
    href: '',
  },
];

export const contact = {
  intro: {
    en: ['Got an idea, a project or just want to say hi?', 'My inbox is always open — I promise I reply faster than I finish side projects.'],
    pt: ['Tem uma ideia, um projeto ou só quer dar um oi?', 'Meu inbox tá sempre aberto — prometo responder mais rápido do que termino meus projetos.'],
  },
  button: { en: 'Send me a message', pt: 'Me mande uma mensagem' },
};

// ---------- versão de celular (Figma: página Mobile) ----------
export const mobile = {
  menu: {
    file: { en: 'File', pt: 'Arquivo' },
    edit: { en: 'Edit', pt: 'Editar' },
    view: { en: 'View', pt: 'Exibir' },
    help: { en: 'Help', pt: 'Ajuda' },
  },
  editAlert: {
    title: { en: 'Error', pt: 'Erro' },
    text: {
      en: 'You can’t edit this portfolio. Go make your own! ;)',
      pt: 'Não é possível editar este portfólio. Crie o seu! ;)',
    },
  },
  age: { en: '21 years old', pt: '21 anos' },
  firstOnline: { en: 'First online: Nov 14, 2005', pt: 'Primeira vez online: 14 nov. 2005' },
  lastSeen: { en: 'Last seen in: Passo Fundo, BR', pt: 'Última localidade: Passo Fundo, BR' },
  // [quem fala, texto]
  chat: {
    en: [['user', 'hey'], ['me', 'hey'], ['user', 'what do u do?'], ['me', 'started with code but I love design, couldn’t pick one, so I do both :)'], ['user', 'sick, what else?'], ['me', 'gym, lots of music and games']],
    pt: [['user', 'eai'], ['me', 'eai'], ['user', 'qq vc faz?'], ['me', 'comecei no código mas gosto de design, não sei escolher, por isso quero os dois :)'], ['user', 'foda, oq mais?'], ['me', 'academia, mta musica e games']],
  },
  bio: {
    en: ['Hey, Alisson here!', 'I study Computer Science and, somewhere along the way, I realized I didn’t want to choose between designing things and building them, so I’m learning to do both.', 'Right now I’m deep into prototyping, the part where an idea finally takes shape, and honestly that’s my favorite place to be.', 'I’m a good talker, so I love understanding people’s real problems and turning them into something that actually works (and looks good doing it).'],
    pt: ['Alisson aqui!', 'Estudo Ciência da Computação e, no meio do caminho, percebi que não queria escolher entre desenhar as coisas e construir elas, então estou aprendendo a fazer as duas.', 'Hoje estou mergulhado em prototipagem, a parte em que a ideia finalmente ganha forma, e sinceramente é onde eu mais gosto de estar.', 'Sou bom de conversa, então adoro entender as dores reais das pessoas e transformar isso em algo que funciona de verdade (e que fica bonito no processo).'],
  },
  factSheet: { en: 'fact sheet', pt: 'ficha técnica' },
  info: [
    { label: { en: 'living in', pt: 'habitando' }, value: 'Passo Fundo, BR' },
    { label: { en: 'studying', pt: 'estudando' }, value: { en: 'Computer Science', pt: 'Ciência da Computação' } },
    { label: { en: 'currently', pt: 'atualmente' }, value: { en: 'Looking for an internship', pt: 'A busca de estágio' } },
    { label: { en: 'in 3 words', pt: 'em 3 palavras' }, value: { en: 'Intense, loyal and fun', pt: 'Intenso, parceiro e divertido' } },
  ],
  links: [
    { label: 'E-mail', href: `mailto:${EMAIL}`, color: '#44a73b' },
    { label: 'Linkedin', href: 'https://www.linkedin.com/in/alissonbosa', color: '#7c3e98' },
    { label: 'Github', href: 'https://github.com/al1ss0', color: '#4c90a9' },
  ],
  player: {
    title: { en: 'Listening now', pt: 'Escutando agora' },
    label: { en: 'Alisson’s playing:', pt: 'Alisson ouvindo:' },
    fallback: { song: 'alisson-bosa.mp3', artist: '128 kbps' },
  },
  status: { title: 'site status', visitor: { en: 'you are visitor number', pt: 'você é o visitante número' } },
  projectsTitle: { en: 'projects', pt: 'projetos' },
  projectImages: { booking: '/assets/m/proj-booking.jpg', rfid: '/assets/m/proj-rfid.jpg', ilpi: '/assets/m/proj-ilpi.jpg' },
  work: { en: 'Let’s work together >>>>>>', pt: 'Bora trabalhar junto >>>>>>' },
  email: `mailto:${EMAIL}?subject=${encodeURIComponent('Portfólio')}`,
  exit: { en: 'exit', pt: 'sair' },
};
