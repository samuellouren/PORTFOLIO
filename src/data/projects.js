// Estrutura preservada: id, title, description, tech, github, demo, featured.
// Campos adicionados no redesign (todos opcionais):
//   descriptionEn — versão EN de `description`
//   tag           — rótulo da categoria no card em destaque { pt, en }
//   shot          — legenda do painel de screenshot { pt, en }
//   image         — src da screenshot; null usa o painel listrado como placeholder
//   summary       — versão curta { pt, en } usada no índice compacto
//   stack         — resumo do stack em uma linha, para o índice compacto
//   nota          — marginália { pt, en }: frase em 1ª pessoa na margem esquerda
//   contexto      — 1º campo do estudo de caso { label: { pt, en }, pt, en }.
//                   O rótulo é por projeto: "Problema" em trabalho de cliente,
//                   "Origem" em projeto que nasceu por conta própria.
//   decisao       — escolha técnica e o motivo real { pt, en }
//   resultado     — o que mudou de fato { pt, en }
//
// REGRA DE PROVENIÊNCIA (ver docs/superpowers/specs/2026-07-28-portfolio-redesign-design.md §5.1):
// nenhum destes campos pode conter fato que não esteja no repositório ou que não
// tenha sido dito pelo Samuel. Sem fonte, o campo fica ausente e não renderiza.
export const projects = [
  {
    id: 1,
    title: "Chute do Vidente",
    description:
      "Bolão da Copa 2026 com identidade mística: palpites em tempo real, grupos privados por convite, ranking geral e por grupo, gamificação com cristais e pontuação processada automaticamente via API oficial.",
    descriptionEn:
      "A 2026 World Cup prediction platform with a mystic identity: live picks, invite-only groups, global and group leaderboards, crystal-based gamification and scoring processed automatically from the official API.",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "JWT",
      "Turso",
      "Tailwind CSS",
    ],
    github: "https://github.com/samuellouren/Bolao-Copa",
    demo: "https://bolao-copa-samuel-lourencos-projects.vercel.app/",
    featured: true,
    tag: { pt: "Produto próprio", en: "Own product" },
    shot: {
      pt: "screenshot — bolão / ranking",
      en: "screenshot — pool / leaderboard",
    },
    image: "/projects/videntes.jpeg",
    stack: "Next.js · Node",
    nota: {
      pt: "nasceu de brincadeira por causa da Copa.",
      en: "born as a joke, because of the World Cup.",
    },
    contexto: {
      label: { pt: "Origem", en: "Origin" },
      pt: "Não era demanda de cliente. Eu queria fazer um projeto divertido, e ele nasceu como brincadeira em torno da Copa.",
      en: "Not client work. I wanted to build something fun, and it started as a joke around the World Cup.",
    },
    decisao: {
      pt: "Os cristais são moeda fictícia, justamente por ser brincadeira — nada de dinheiro real envolvido.",
      en: "The crystals are fictional currency, precisely because it's a joke — no real money involved.",
    },
    resultado: {
      pt: "Está no ar. Os amigos usaram de verdade: mais de 25 pessoas participaram.",
      en: "It's live. Friends actually used it: more than 25 people joined.",
    },
  },
  {
    id: 7,
    title: "Mapa Farma",
    description:
      "CRM comercial para uma distribuidora farmacêutica de Maceió. Representantes veem farmácias no mapa, registram relatórios de visita, gerenciam pedidos e acompanham estatísticas de venda em tempo real.",
    descriptionEn:
      "A sales CRM for a pharmaceutical distributor in Maceió. Reps see pharmacies on the map, log visit reports, manage orders and follow sales stats in real time.",
    tech: [
      "React Native/Expo",
      "Node.js",
      "TypeScript",
      "OpenStreetmap",
      "Turso(libSQL)",
    ],
    github: "https://github.com/samuellouren/Mapa-Farma",
    demo: null,
    featured: true,
    tag: { pt: "Cliente real", en: "Client work" },
    shot: {
      pt: "screenshot — mapa + rota do rep",
      en: "screenshot — map + rep route",
    },
    image: "/projects/mapas.jpeg",
    stack: "React Native · Node",
    nota: {
      pt: "antes era tudo planilha.",
      en: "before this, it was all spreadsheets.",
    },
    contexto: {
      label: { pt: "Problema", en: "Problem" },
      pt: "A distribuidora não tinha um app para isso. Os representantes controlavam visita, pedido e rota em planilhas.",
      en: "The distributor had no app for this. Reps tracked visits, orders and routes in spreadsheets.",
    },
    decisao: {
      pt: "MapLibre com OpenStreetMap em vez de Google Maps, para ficar gratuito e mais personalizável.",
      en: "MapLibre with OpenStreetMap instead of Google Maps, to keep it free and more customizable.",
    },
    resultado: {
      pt: "Está no ar e sendo usado.",
      en: "It's live and in use.",
    },
  },
  {
    id: 2,
    title: "FocusDrop",
    description:
      "App de produtividade e bem-estar: ciclos Pomodoro, registro de humor e estatísticas semanais. Começou como um timer simples e virou uma ferramenta completa de rotina.",
    descriptionEn:
      "A productivity and wellbeing app: Pomodoro cycles, mood tracking and weekly stats. It started as a plain timer and grew into a full routine tool.",
    tech: ["React Native", "TypeScript", "Expo", "AsyncStorage"],
    github: "https://github.com/samuellouren/FocusDrop",
    demo: null,
    featured: true,
    tag: { pt: "Mobile", en: "Mobile" },
    shot: { pt: "screenshot — timer + humor", en: "screenshot — timer + mood" },
    image: "/projects/focos.jpeg",
    stack: "React Native · Expo",
    nota: {
      pt: "começou como um timer simples e virou um app focado no desvício do celular.",
      en: "started as a plain timer and became an app about breaking the phone habit.",
    },
    // contexto/decisao/resultado ausentes de propósito: sem fatos confirmados.
  },
  {
    id: 3,
    title: "TalentMatch",
    description:
      "Sistema full-stack de gestão de candidatos e vagas de emprego. Backend REST com autenticação JWT, banco SQLite e frontend React com contexto global.",
    descriptionEn:
      "Full-stack candidate and job management system. REST backend with JWT auth, SQLite database and a React front end with global context.",
    tech: ["React", "Node.js", "Express", "SQLite", "JWT", "Axios"],
    github: "https://github.com/samuellouren/projetointegrador25",
    demo: "https://talent-match-two.vercel.app",
    featured: false,
    summary: {
      pt: "Gestão de candidatos e vagas, com auth JWT e contexto global no front.",
      en: "Candidate and job management, JWT auth and global context on the front end.",
    },
    stack: "React · Node",
  },
  {
    id: 4,
    title: "jobtracker",
    description:
      "API REST desenvolvida em Python com FastAPI para rastrear candidaturas a vagas de emprego. Conta com autenticação JWT, banco de dados SQLite, operações CRUD completas e validação de status com Enum. Documentação automática via Swagger UI.",
    descriptionEn:
      "REST API built in Python with FastAPI to track job applications. JWT auth, SQLite database, full CRUD and Enum-validated status. Auto-generated docs via Swagger UI.",
    tech: ["Python", "FastAPI", "SQLite", "Uvicorn", "JWT", "REST API"],
    github: "https://github.com/samuellouren/JobTracker-API",
    demo: null,
    featured: false,
    summary: {
      pt: "API REST para rastrear candidaturas, documentada no Swagger.",
      en: "REST API to track job applications, documented with Swagger.",
    },
    stack: "Python · FastAPI",
  },
  {
    id: 5,
    title: "Elemental Depths",
    description:
      "Jogo produzido em equipe na Global Game Jam de Alagoas. Desenvolvimento colaborativo em C# com Unity sob pressão de tempo real.",
    descriptionEn:
      "A game built with a team at the Global Game Jam in Alagoas. Collaborative C# and Unity development under real time pressure.",
    tech: ["C#", "Unity", "Game Jam"],
    github: "https://github.com/samuellouren/Elemental-Depths_Global-game-jam",
    demo: null,
    featured: false,
    summary: {
      pt: "Jogo feito em equipe na Global Game Jam de Alagoas.",
      en: "A game built with my team at the Global Game Jam in Alagoas.",
    },
    stack: "C# · Unity",
  },
  {
    id: 6,
    title: "shim de pagamento Java",
    description:
      "Projeto de estudo criado para o primeiro contato com Java e Spring Boot, integrando um backend Java a um frontend Angular.",
    descriptionEn:
      "A study project for my first contact with Java and Spring Boot, wiring a Java backend to an Angular front end.",
    tech: ["Java", "Spring Boot", "Angular", "TypeScript"],
    github: "https://github.com/samuellouren/shim_de_pagamentoJava",
    demo: null,
    featured: false,
    summary: {
      pt: "Primeiro contato com Java e Spring Boot ligado a um front Angular.",
      en: "First contact with Java and Spring Boot wired to an Angular front end.",
    },
    stack: "Java · Angular",
    nota: {
      pt: "projeto de estudo. primeiro contato meu com Java e Spring Boot.",
      en: "study project. my first contact with Java and Spring Boot.",
    },
  },
];

// Mantido para compatibilidade — o redesign exibe skills agrupadas (skillGroups),
// mas este array continua disponível caso as barras de nível voltem.
export const skills = [
  { name: "React", level: 80 },
  { name: "Java", level: 40 },
  { name: "Angular", level: 40 },
  { name: "JavaScript", level: 75 },
  { name: "TypeScript", level: 75 },
  { name: "Node.js", level: 80 },
  { name: "HTML & CSS", level: 85 },
  { name: "C#", level: 50 },
  { name: "Python", level: 70 },
  { name: "SQL", level: 60 },
  { name: "Next.js", level: 70 },
];

// Skills agrupadas por área — formato usado pela seção Skills do redesign.
export const skillGroups = [
  {
    id: "front",
    title: { pt: "Front-end", en: "Front-end" },
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML & CSS",
      "Angular",
    ],
  },
  {
    id: "back",
    title: { pt: "Back-end", en: "Back-end" },
    items: ["Node.js", "Express", "Python", "FastAPI", "Java", "Spring Boot"],
  },
  {
    id: "data",
    title: { pt: "Dados & infra", en: "Data & infra" },
    items: ["SQL", "SQLite", "Turso (libSQL)", "JWT", "APIs REST", "Git"],
  },
  {
    id: "mobile",
    title: { pt: "Mobile & outros", en: "Mobile & other" },
    items: ["React Native", "Expo", "C#", "Unity", "OpenStreetMap"],
  },
];
