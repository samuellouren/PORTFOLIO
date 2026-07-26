// Copy da interface em PT e EN, vinda do projeto do Claude Design.
// Conteúdo de projetos e skills fica em ./projects.js — aqui só texto de UI.
export const content = {
  pt: {
    navAbout: "Sobre",
    navWork: "Projetos",
    navSkills: "Skills",
    navContact: "Contato",
    navCta: "Vamos conversar",

    heroStatus: "Disponível para novas oportunidades",
    heroB1: "Produtos web e mobile",
    heroB2: "feitos com calma e cuidado.",
    heroSub:
      "Ola meu nome é Samuel, sou dev full-stack. Construo aplicações de ponta a ponta com React, TypeScript e Node.js — e gosto de entender o problema direito antes de escrever a primeira linha.",
    ctaWork: "Ver projetos",
    ctaCv: "Baixar currículo",
    menu: [
      {
        n: 1,
        title: "Web full-stack",
        desc: "Front-end React/Next.js com API própria em Node ou Python.",
      },
      {
        n: 2,
        title: "Apps mobile",
        desc: "React Native e Expo, do protótipo à loja.",
      },
      {
        n: 3,
        title: "APIs e integrações",
        desc: "REST, autenticação JWT e bancos SQL.",
      },
    ],

    aboutLabel: "Sobre mim",
    aboutTitle: "Curioso por natureza, movido por metas",
    aboutParagraphs: [
      "Sou de Maceió, Alagoas, e estudo Engenharia de Software na UMJ. Antes da faculdade já tinha base prática: formação técnica em desenvolvimento web pelo SENAI.",
      "Aprendo construindo projeto real, não seguindo tutorial. Meu ciclo é simples: aprender, construir, revisar — é fazendo que a coisa gruda.",
      "Hoje procuro uma vaga como dev remoto, no Brasil ou fora, para crescer construindo produto que as pessoas usam de verdade.",
    ],
    stats: [
      { value: "7+", label: "Projetos publicados" },
      { value: "10+", label: "Tecnologias no dia a dia" },
      { value: "UMJ", label: "Eng. de Software" },
      { value: "Maceió", label: "Alagoas · remoto" },
    ],

    workLabel: "Projetos",
    workTitle: "O que eu construí",
    workSub:
      "Três em destaque — um cliente real, um produto próprio e um app publicado.",
    linkCode: "Ver código",
    linkDemo: "Demo ao vivo",
    moreLabel: "Também no forno",

    skillsLabel: "Habilidades",
    skillsTitle: "O que tem no balcão",

    contactLabel: "Contato",
    contactTitle: "Vamos tomar um café?",
    contactSub:
      "Aberto a vagas, freelas ou só um papo sobre tecnologia. Costumo responder no mesmo dia.",

    footer: "Feito com café em Maceió.",
    langLabel: "Idioma",
    menuLabel: "Menu",
  },

  en: {
    navAbout: "About",
    navWork: "Work",
    navSkills: "Skills",
    navContact: "Contact",
    navCta: "Let's talk",

    heroStatus: "Available for new opportunities",
    heroB1: "Web and mobile products",
    heroB2: "built slowly, on purpose.",
    heroSub:
      "Hello, my name is Samuel, i am a full-stack developer. I build products end to end with React, TypeScript and Node.js — and I like to understand the problem properly before writing the first line.",
    ctaWork: "See projects",
    ctaCv: "Download resume",
    menu: [
      {
        n: 1,
        title: "Full-stack web",
        desc: "React/Next.js front ends with my own Node or Python API.",
      },
      {
        n: 2,
        title: "Mobile apps",
        desc: "React Native and Expo, from prototype to store.",
      },
      {
        n: 3,
        title: "APIs & integrations",
        desc: "REST, JWT auth and SQL databases.",
      },
    ],

    aboutLabel: "About me",
    aboutTitle: "Curious by nature, driven by goals",
    aboutParagraphs: [
      "I'm from Maceió, Brazil, studying Software Engineering at UMJ. I had hands-on ground before university: a technical web development degree from SENAI.",
      "I learn by building real projects, not by following tutorials. The loop is simple: learn, build, review — it only sticks when you make something.",
      "I'm looking for a remote developer role, in Brazil or abroad, to grow by building products people actually use.",
    ],
    stats: [
      { value: "7+", label: "Shipped projects" },
      { value: "10+", label: "Technologies in use" },
      { value: "UMJ", label: "Software Engineering" },
      { value: "Brazil", label: "Maceió · remote" },
    ],

    workLabel: "Work",
    workTitle: "What I've built",
    workSub:
      "Three highlights — a real client, a product of my own and a published app.",
    linkCode: "View code",
    linkDemo: "Live demo",
    moreLabel: "Also brewing",

    skillsLabel: "Skills",
    skillsTitle: "What's on the counter",

    contactLabel: "Contact",
    contactTitle: "Coffee and a chat?",
    contactSub:
      "Open to roles, freelance work or just talking shop. I usually reply the same day.",

    footer: "Made with coffee in Maceió, Brazil.",
    langLabel: "Language",
    menuLabel: "Menu",
  },
};

export const contacts = [
  {
    id: "email",
    label: "Email",
    value: "samuel.lourenco.sls@gmail.com",
    href: "mailto:samuel.lourenco.sls@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/in/samuel-lourenco",
    href: "https://www.linkedin.com/in/samuel-lourenco-50b780306/",
  },
  {
    id: "github",
    label: "GitHub",
    value: "@samuellouren",
    href: "https://github.com/samuellouren",
  },
];

// Currículo por idioma — arquivos em public/, servidos a partir da raiz.
// `name` vira o nome do arquivo salvo pelo navegador (atributo download).
export const CV_FILES = {
  pt: {
    url: "/cv-samuel-lourenco-pt.pdf",
    name: "Samuel Lourenco - Curriculo.pdf",
  },
  en: {
    url: "/cv-samuel-lourenco-en.pdf",
    name: "Samuel Lourenco - Resume.pdf",
  },
};
