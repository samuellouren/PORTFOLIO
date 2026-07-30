// Copy da interface em PT e EN, vinda do projeto do Claude Design.
// Conteúdo de projetos e skills fica em ./projects.ts — aqui só texto de UI.
import type { Lang } from "./types";

export interface Copy {
  navAbout: string;
  navWork: string;
  navContact: string;

  heroSub: string;
  ctaWork: string;
  ctaCv: string;

  aboutLabel: string;
  aboutParagraphs: string[];

  workTitle: string;
  workSub: string;
  linkCode: string;
  linkDemo: string;
  indexLabel: string;

  skillsTitle: string;

  contactTitle: string;
  contactSub: string;

  footer: string;
  skipLink: string;
  openToRemote: string;
  caseDecision: string;
  caseResult: string;
}

export interface Contact {
  id: string;
  label: string;
  value: string;
  href: string;
}

export const content: Record<Lang, Copy> = {
  pt: {
    navAbout: "Sobre",
    navWork: "Projetos",
    navContact: "Contato",

    heroSub:
      "Dev full-stack. Construo aplicações de ponta a ponta com React, TypeScript e Node.js, e gosto de entender o problema direito antes de escrever a primeira linha.",
    ctaWork: "Ver projetos",
    ctaCv: "Baixar currículo",

    aboutLabel: "Sobre mim",
    aboutParagraphs: [
      "Sou de Maceió, Alagoas, e estudo Engenharia de Software na UMJ. Antes da faculdade já tinha base prática: formação técnica em desenvolvimento web pelo SENAI.",
      "Aprendo construindo projeto real, não seguindo tutorial. Meu ciclo é simples: aprender, construir, revisar — é fazendo que a coisa gruda.",
      "Hoje procuro uma vaga como dev remoto, no Brasil ou fora, para crescer construindo produto que as pessoas usam de verdade.",
    ],

    workTitle: "Projetos",
    workSub:
      "Três em destaque — um cliente real, um produto próprio e um app publicado.",
    linkCode: "Ver código",
    linkDemo: "Demo ao vivo",
    indexLabel: "o resto",

    skillsTitle: "Ferramentas",

    contactTitle: "Contato",
    contactSub:
      "Aberto a vagas, freelas ou só um papo sobre tecnologia. Costumo responder no mesmo dia.",

    footer: "Feito com café em Maceió.",
    skipLink: "Pular para o conteúdo",
    openToRemote: "aberto a remoto",
    caseDecision: "Decisão",
    caseResult: "Resultado",
  },

  en: {
    navAbout: "About",
    navWork: "Work",
    navContact: "Contact",

    heroSub:
      "Full-stack developer. I build applications end to end with React, TypeScript and Node.js, and I like to understand the problem properly before writing the first line.",
    ctaWork: "See projects",
    ctaCv: "Download resume",

    aboutLabel: "About me",
    aboutParagraphs: [
      "I'm from Maceió, Brazil, studying Software Engineering at UMJ. I had hands-on ground before university: a technical web development degree from SENAI.",
      "I learn by building real projects, not by following tutorials. The loop is simple: learn, build, review — it only sticks when you make something.",
      "I'm looking for a remote developer role, in Brazil or abroad, to grow by building products people actually use.",
    ],

    workTitle: "Work",
    workSub:
      "Three highlights — a real client, a product of my own and a published app.",
    linkCode: "View code",
    linkDemo: "Live demo",
    indexLabel: "the rest",

    skillsTitle: "Tools",

    contactTitle: "Contact",
    contactSub:
      "Open to roles, freelance work or just talking shop. I usually reply the same day.",

    footer: "Made with coffee in Maceió, Brazil.",
    skipLink: "Skip to content",
    openToRemote: "open to remote",
    caseDecision: "Decision",
    caseResult: "Result",
  },
};

export const contacts: Contact[] = [
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
export const CV_FILES: Record<Lang, { url: string; name: string }> = {
  pt: {
    url: "/cv-samuel-lourenco-pt.pdf",
    name: "Samuel Lourenco - Curriculo.pdf",
  },
  en: {
    url: "/cv-samuel-lourenco-en.pdf",
    name: "Samuel Lourenco - Resume.pdf",
  },
};
