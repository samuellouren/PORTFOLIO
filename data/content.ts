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

  pathTitle: string;

  aboutLabel: string;
  aboutParagraphs: string[];

  workTitle: string;
  linkCode: string;
  linkDemo: string;
  indexLabel: string;

  skillsTitle: string;
  skillsMain: string;
  skillsAlso: string;

  contactTitle: string;
  contactSub: string;

  footer: string;
  skipLink: string;
  openTo: string;
  caseDecisions: string;
  caseOtherDecisions: string;
  caseResult: string;

  notFoundTitle: string;
  notFoundBack: string;

  caseRead: string;
  caseKicker: string;
  caseBack: string;
  caseNext: string;
  caseGallery: string;
  caseArchitecture: string;
  caseChallenge: string;
  caseLearning: string;
  caseStack: string;
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

    // Só fatos que já estão em projects.ts: o CRM do Mapa Farma (representantes,
    // trabalho de rua) e os mais de 25 participantes do Chute do Vidente.
    // "Sozinho, do zero" é o papel dos destaques (meta.papel), dito só aqui na
    // home; os cards mostram ano e status.
    heroSub:
      "Dev full-stack em Maceió. Fiz sozinho, do zero, o CRM que os representantes de uma distribuidora farmacêutica usam na rua e um bolão da Copa que mais de 25 pessoas jogaram. React, React Native e Node.js.",
    ctaWork: "Ver projetos",
    ctaCv: "Baixar currículo",

    pathTitle: "Trajetória",

    aboutLabel: "Sobre mim",
    // Faculdade e curso técnico saíram daqui: agora estão na Trajetória.
    aboutParagraphs: [
      "Sou de Maceió, Alagoas, e aprendo construindo projeto real, não seguindo tutorial. Meu ciclo é simples: aprender, construir, revisar — é fazendo que a coisa gruda.",
      // Equipe: TalentMatch (currículo: mediação e troca de stack na reta final)
      // e Global Game Jam Alagoas, dita pelo Samuel. Nome, ano e stack do jogo já
      // estão na Trajetória e não se repetem aqui.
      "Em equipe, mediei divergências de escopo e visual no TalentMatch, que entregamos no prazo mesmo com a troca de stack exigida na última semana, e encarei com o time a pressão de tempo real de uma game jam.",
      // Mesmo alvo do currículo: estágio ou júnior, remoto ou em Maceió (dito
      // pelo Samuel em 2026-10-01). "No Brasil ou fora" saiu junto com o
      // "remoto internacional" do currículo.
      "Hoje procuro estágio ou vaga júnior como dev, remoto ou em Maceió, para crescer construindo produto que as pessoas usam de verdade.",
    ],

    workTitle: "Projetos",
    linkCode: "Código",
    linkDemo: "Demo",
    indexLabel: "Outros Projetos",

    skillsTitle: "Ferramentas",
    // Mesmos rótulos da seção Habilidades do currículo.
    skillsMain: "Principais",
    skillsAlso: "Complementares",

    contactTitle: "Contato",
    // Fonte: dito pelo Samuel em 2026-10-01 (CLT, estágio e freelas; começa já).
    contactSub:
      "Aberto a vagas CLT, estágio e freelas, remoto ou em Maceió. Posso começar agora. Costumo responder no mesmo dia.",

    footer: "Feito com café em Maceió.",
    skipLink: "Pular para o conteúdo",
    // Status de disponibilidade, com o ponto verde. Dito pelo Samuel em
    // 2026-10-01: remoto ou em Maceió (mesmo do contato), pode começar agora.
    openTo: "disponível · remoto ou Maceió",
    caseDecisions: "Decisões",
    caseOtherDecisions: "Outras decisões",
    caseResult: "Resultado",

    notFoundTitle: "Página não encontrada.",
    notFoundBack: "Voltar ao início",

    caseRead: "Ler estudo de caso",
    caseKicker: "Estudo de caso",
    caseBack: "Voltar aos projetos",
    caseNext: "Próximo projeto",
    caseGallery: "Galeria",
    caseArchitecture: "Arquitetura",
    caseChallenge: "Maior desafio",
    caseLearning: "O que faria diferente",
    caseStack: "Stack",
  },

  en: {
    navAbout: "About",
    navWork: "Work",
    navContact: "Contact",

    heroSub:
      "Full-stack developer in Maceió, Brazil. I built, solo and from scratch, the CRM a pharmaceutical distributor's sales reps use out in the field, and a World Cup prediction game more than 25 people played. React, React Native and Node.js.",
    ctaWork: "See projects",
    ctaCv: "Download resume",

    pathTitle: "Path",

    aboutLabel: "About me",
    aboutParagraphs: [
      "I'm from Maceió, Brazil, and I learn by building real projects, not by following tutorials. The loop is simple: learn, build, review — it only sticks when you make something.",
      "On teams, I mediated scope and design disagreements on TalentMatch, which we delivered on time despite a stack change required in the final week, and took on the real time pressure of a game jam with my team.",
      "I'm looking for an internship or a junior developer role, remote or in Maceió, to grow by building products people actually use.",
    ],

    workTitle: "Work",
    linkCode: "Code",
    linkDemo: "Demo",
    indexLabel: "Other projects",

    skillsTitle: "Tools",
    skillsMain: "Core",
    skillsAlso: "Complementary",

    contactTitle: "Contact",
    // Fonte: dito pelo Samuel em 2026-10-01 (CLT, estágio e freelas; começa já).
    contactSub:
      "Open to full-time roles, internships and freelance work, remote or in Maceió. I can start right away. I usually reply the same day.",

    footer: "Made with coffee in Maceió, Brazil.",
    skipLink: "Skip to content",
    // Status de disponibilidade, com o ponto verde. Dito pelo Samuel em
    // 2026-10-01: remoto ou em Maceió (mesmo do contato), pode começar agora.
    openTo: "available · remote or Maceió",
    caseDecisions: "Decisions",
    caseOtherDecisions: "Other decisions",
    caseResult: "Result",

    notFoundTitle: "Page not found.",
    notFoundBack: "Back to home",

    caseRead: "Read case study",
    caseKicker: "Case study",
    caseBack: "Back to projects",
    caseNext: "Next project",
    caseGallery: "Gallery",
    caseArchitecture: "Architecture",
    caseChallenge: "Hardest problem",
    caseLearning: "What I'd do differently",
    caseStack: "Stack",
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
    url: "/curriculoPt.pdf",
    name: "Samuel Lourenco - Curriculo.pdf",
  },
  en: {
    url: "/curriculoen.pdf",
    name: "Samuel Lourenco - Resume.pdf",
  },
};
