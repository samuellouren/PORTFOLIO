// Estrutura preservada: id, title, description, tech, github, demo, featured.
// Campos adicionados no redesign (todos opcionais):
//   tag           — rótulo da categoria no card em destaque { pt, en }
//   image         — src da screenshot; null usa o painel listrado como placeholder
//   imageAlt      — texto alternativo da screenshot { pt, en }. Descreve só o que
//                   está visível na imagem, sem acrescentar fato.
//   shape         — proporção da screenshot, para o layout do painel: "phone" | "web"
//   stack         — resumo do stack em uma linha. No índice compacto e, nos
//                   destaques, no card da home abaixo do resultado (no máximo 3).
//   resumo        — 1 frase do que o projeto é { pt, en }. É o que o card da home
//                   mostra. A `description` fica para a página do caso, como versão
//                   expandida, e não pode conter o resumo palavra por palavra.
//   nota          — marginália { pt, en }: frase em 1ª pessoa na margem esquerda.
//                   Só existe se trouxer fato que NÃO aparece em outro campo do
//                   mesmo projeto; nota que repete descrição/origem/decisão sai.
//   meta          — metadados da margem { ano?, papel?, status? }, renderizados
//                   como coluna de datas: "2026 · no ar" na primeira linha. O
//                   papel sai só na página do caso, um trecho por linha (na home
//                   quem diz "sozinho, do zero" é o hero). papel só nos três
//                   destaques, feitos sozinho (dito pelo Samuel em 2026-10-01);
//                   Elemental Depths e TalentMatch foram em equipe e não levam papel.
//   resultado     — o que mudou de fato, em 1 frase { pt, en }. Sai no card e no caso.
//
// Só na página de estudo de caso (/projetos/[slug], /en/projects/[slug]):
//   contexto      — { label: { pt, en }, pt, en }. O rótulo é por projeto:
//                   "Problema" em trabalho de cliente, "Origem" em projeto que
//                   nasceu por conta própria.
//   decisoes      — escolhas técnicas [{ titulo: { pt, en }, pt, en, destaque?, curta? }].
//                   As com `destaque` saem primeiro, inteiras; as outras viram
//                   "Outras decisões", com título e `curta` (uma linha).
//   galeria       — prints extras [{ src, alt: { pt, en }, shape? }]
//   arquitetura   — camadas do sistema, uma por item, de cima (cliente) para
//                   baixo (dados) [{ pt, en, aparte? }]; vira um diagrama
//                   empilhado. `aparte` é o serviço externo ligado à camada.
//   desafio       — maior desafio técnico { pt, en }
//   aprendizado   — o que faria diferente { pt, en }
//
// REGRA DE PROVENIÊNCIA (ver docs/superpowers/specs/2026-07-28-portfolio-redesign-design.md §5.1):
// nenhum destes campos pode conter fato que não esteja no repositório ou que não
// tenha sido dito pelo Samuel. Sem fonte, o campo fica ausente e não renderiza.
// Fontes externas permitidas: README e docs/ públicos de
// github.com/samuellouren/{Mapa-Farma, Bolao-Copa, FocusDrop}. Cada fato vindo
// de lá leva, em comentário, o arquivo de origem.
import { slugOf, type Marco, type Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Chute do Vidente",
    // Fonte do resumo e da descrição: Bolao-Copa/README.md (abertura, "Sobre o
    // projeto", "Funcionalidades").
    resumo: {
      pt: "Bolão da Copa 2026 com identidade mística, para cravar palpites e disputar o ranking com os amigos.",
      en: "A 2026 World Cup prediction game with a mystic twist, for making picks and fighting over the leaderboard with friends.",
    },
    description: {
      pt: "Plataforma full-stack de bolão para a Copa do Mundo 2026. Os palpites travam sozinhos 5 minutos antes de cada jogo, e a pontuação sai dos resultados oficiais: placar exato, resultado certo ou erro. Há ranking geral e ranking por grupo privado, com convite por código. Os pontos aparecem como cristais, com níveis e uma taxa de “premonição”, e a Madame Placar, a vidente de plantão, conduz a experiência.",
      en: "A full-stack prediction platform for the 2026 World Cup. Picks lock automatically 5 minutes before each match, and scoring comes from the official results: exact score, right outcome or miss. There is a global leaderboard and one per private group, joined by invite code. Points show up as crystals, with levels and a “premonition” rate, and Madame Placar, the resident fortune teller, runs the show.",
    },
    tech: [
      // React: pedido do Samuel em 2026-10-01 (Next.js é framework React).
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "JWT",
      // Era "Turso"; Bolao-Copa/README.md diz "Turso (libSQL distribuído)".
      "Turso (libSQL)",
      "Tailwind CSS",
    ],
    github: "https://github.com/samuellouren/Bolao-Copa",
    demo: "https://bolao-copa-samuel-lourencos-projects.vercel.app/",
    featured: true,
    tag: { pt: "Produto próprio", en: "Own product" },
    image: "/projects/videntes.jpeg",
    imageAlt: {
      pt: "Página de ranking do Chute do Vidente: participantes listados por cristais acumulados, com medalhas nos três primeiros.",
      en: "Chute do Vidente leaderboard page: participants listed by crystals earned, with medals for the top three.",
    },
    shape: "web",
    stack: "Next.js · Node.js · Turso",
    // nota removida: "nasceu de brincadeira por causa da Copa" repetia o contexto (Origem).
    meta: {
      // Fonte: github.com/samuellouren/Bolao-Copa — primeiro commit em 2026-06-19
      // e README.md ("Bolão da Copa do Mundo 2026").
      ano: "2026",
      // Fonte: dito pelo Samuel em 2026-10-01 (full-stack, sozinho, do zero).
      papel: { pt: "full-stack · sozinho, do zero", en: "full-stack · solo, from scratch" },
      // Fonte: resultado abaixo ("Está no ar").
      status: { pt: "no ar", en: "live" },
    },
    contexto: {
      label: { pt: "Origem", en: "Origin" },
      pt: "Não era demanda de cliente. Eu queria fazer um projeto divertido, e ele nasceu como brincadeira em torno da Copa.",
      en: "Not client work. I wanted to build something fun, and it started as a joke around the World Cup.",
    },
    resultado: {
      pt: "Está no ar, e os amigos usaram de verdade: mais de 25 pessoas participaram.",
      en: "It's live, and friends actually used it: more than 25 people joined.",
    },
    // Em destaque: a pontuação automática (agendamento externo, rota protegida e
    // API de resultados) e o fechamento do palpite antes do jogo, que é o que
    // mantém a disputa justa. Cristais é escolha de produto; rate limiting é padrão.
    decisoes: [
      {
        // Fonte: Bolao-Copa/README.md ("Pontuação automatizada", "Integrações" e a
        // variável ADMIN_SECRET na tabela de ambiente).
        destaque: true,
        titulo: { pt: "Pontuação sem ninguém apertar botão", en: "Scoring with nobody pressing a button" },
        pt: "Um agendamento externo no cron-job.org dispara o processamento dos jogos encerrados, por uma rota administrativa protegida por segredo. A API busca os resultados oficiais na football-data.org e calcula os pontos de cada palpite.",
        en: "An external schedule on cron-job.org triggers the processing of finished matches, through an admin route guarded by a secret. The API pulls the official results from football-data.org and scores every pick.",
      },
      {
        // Fonte: Bolao-Copa/README.md ("Palpites em tempo real").
        destaque: true,
        titulo: { pt: "Palpite fecha antes do apito", en: "Picks close before kickoff" },
        pt: "O placar é validado e o palpite fecha automaticamente 5 minutos antes do início de cada jogo.",
        en: "Scores are validated and picks close automatically 5 minutes before each match starts.",
      },
      {
        // Fonte: dito pelo Samuel (spec do portfólio §5.2; antes era o campo `decisao`).
        titulo: { pt: "Cristais em vez de dinheiro", en: "Crystals instead of money" },
        pt: "Os cristais são moeda fictícia, justamente por ser brincadeira. Nada de dinheiro real envolvido.",
        en: "The crystals are fictional currency, precisely because it's a joke. No real money involved.",
        curta: {
          pt: "Moeda fictícia, sem dinheiro real.",
          en: "Fictional currency, no real money.",
        },
      },
      {
        // Fonte: Bolao-Copa/README.md ("Backend").
        titulo: { pt: "Rate limiting nas rotas sensíveis", en: "Rate limiting on sensitive routes" },
        pt: "Autenticação, palpites, grupos e recuperação de senha têm limite de requisições.",
        en: "Authentication, picks, groups and password recovery are rate limited.",
        curta: {
          pt: "Limite no login, palpites, grupos e senha.",
          en: "Limits on login, picks, groups and passwords.",
        },
      },
    ],
    // Fonte: Bolao-Copa/README.md ("Stack técnica", "Integrações").
    arquitetura: [
      { pt: "Front-end Next.js (App Router), na Vercel", en: "Next.js front end (App Router), on Vercel" },
      {
        pt: "API REST em Node + Express, no Render · JWT e bcrypt",
        en: "REST API in Node + Express, on Render · JWT and bcrypt",
        aparte: {
          pt: "resultados da football-data.org, disparados pelo cron-job.org · e-mails pelo Resend",
          en: "results from football-data.org, triggered by cron-job.org · email through Resend",
        },
      },
      { pt: "Turso (libSQL)", en: "Turso (libSQL)" },
    ],
    // PENDENTE (sem fonte): galeria (novo print), desafio, aprendizado.
  },
  {
    id: 7,
    title: "Mapa Farma",
    // Fonte do resumo e da descrição: Mapa-Farma/README.md (abertura, "O que o app faz").
    resumo: {
      pt: "CRM mobile para os representantes de uma distribuidora farmacêutica de Maceió.",
      en: "A mobile CRM for the sales reps of a pharmaceutical distributor in Maceió.",
    },
    description: {
      pt: "App Android nativo para o trabalho de rua. Os representantes veem todas as farmácias de Maceió num mapa real, filtram por cliente, visita e perfil de pagamento, registram visitas, lançam pedidos e acompanham a carteira num painel de 7, 30 ou 90 dias. A equipe também cadastra as farmácias que não estão no mapa.",
      en: "A native Android app for field work. Reps see every pharmacy in Maceió on a real map, filter by client, visit and payment profile, log visits, enter orders and follow their accounts on a 7, 30 or 90 day dashboard. The team can also add pharmacies that aren't on the map.",
    },
    tech: [
      "React Native",
      "Expo",
      "Node.js",
      // Express e MapLibre: Mapa-Farma/README.md ("Stack").
      "Express",
      "TypeScript",
      "OpenStreetMap",
      "MapLibre",
      "Turso (libSQL)",
    ],
    github: "https://github.com/samuellouren/Mapa-Farma",
    demo: null,
    featured: true,
    tag: { pt: "Cliente real", en: "Client work" },
    image: "/projects/mapas.jpeg",
    imageAlt: {
      pt: "Tela do app com mapa de Maceió e farmácias marcadas, busca por nome ou bairro no topo e legenda de cliente e não cliente.",
      en: "App screen with a map of Maceió and pharmacies marked, a search by name or neighborhood at the top and a client / non-client legend.",
    },
    shape: "phone",
    stack: "React Native · Node.js · Turso",
    // nota removida: "o cliente queria um software gratuito. usei OpenStreetMap…"
    // repetia a decisão palavra por palavra.
    meta: {
      // Fonte: github.com/samuellouren/Mapa-Farma —
      // docs/superpowers/specs/2026-07-07-mapa-farma-design.md (Data: 2026-07-07);
      // public/curriculoPt.pdf ("Mapa Farma … Maceió, AL · 2026").
      ano: "2026",
      // Fonte: dito pelo Samuel em 2026-10-01 (full-stack, sozinho, do zero).
      papel: { pt: "full-stack · sozinho, do zero", en: "full-stack · solo, from scratch" },
      // Fonte: resultado abaixo ("em uso").
      status: { pt: "em uso", en: "in use" },
    },
    contexto: {
      // Fonte: Mapa-Farma/README.md ("O problema").
      label: { pt: "Problema", en: "Problem" },
      pt: "A distribuidora não tinha um app para o trabalho de rua. Os representantes controlavam visitas, pedidos e rotas em planilhas, sem uma visão única de quais farmácias eram clientes, quem foi visitado e quando, nem de quem paga em dia.",
      en: "The distributor had no app for field work. Reps tracked visits, orders and routes in spreadsheets, with no single view of which pharmacies were clients, who had been visited and when, or who pays on time.",
    },
    resultado: {
      // Fonte: Mapa-Farma/README.md ("Está no ar e em uso pela equipe comercial") e
      // public/curriculoPt.pdf ("substituindo o controle de visitas e pedidos por planilha").
      pt: "Está em uso pela equipe comercial e tirou das planilhas o controle de visitas e pedidos.",
      en: "It's in use by the sales team and took visit and order tracking out of spreadsheets.",
    },
    // Fonte de todas as decisões: Mapa-Farma/README.md ("Decisões técnicas") e
    // docs/superpowers/specs/2026-07-07-mapa-farma-design.md (§2, §3 e a revisão de 2026-07-07).
    // Em destaque, na ordem pedida pelo Samuel em 2026-10-01: dados abertos, app
    // nativo, fuso de Maceió.
    decisoes: [
      {
        destaque: true,
        titulo: { pt: "Base de farmácias a partir de dados abertos", en: "Pharmacy data from open sources" },
        pt: "A carga inicial vem da Overpass API (OpenStreetMap), com seed complementar do CNES/DataSUS que descarta unidades públicas. Se a mesma farmácia aparece nas duas fontes a até 150 m e com nome compatível, os campos vazios são enriquecidos em vez de duplicar o registro. Um teste point-in-polygon contra o polígono real de Maceió descarta coordenadas erradas, como pontos caídos na lagoa.",
        en: "The initial load comes from the Overpass API (OpenStreetMap), with a complementary CNES/DataSUS seed that drops public units. When the same pharmacy shows up in both sources within 150 m and with a matching name, empty fields are filled in instead of duplicating the record. A point-in-polygon test against Maceió's real boundary drops bad coordinates, such as points that land in the lagoon.",
      },
      {
        destaque: true,
        titulo: { pt: "App nativo em vez de PWA", en: "Native app instead of a PWA" },
        pt: "A primeira versão foi planejada como PWA (React + Vite). Virou app React Native com Expo e .apk gerado pelo EAS Build, porque a equipe queria um app instalado de verdade, não um atalho do navegador. O backend não mudou com a troca.",
        en: "The first version was planned as a PWA (React + Vite). It became a React Native app with Expo and an .apk built by EAS Build, because the team wanted a real installed app, not a browser shortcut. The backend didn't change.",
      },
      {
        destaque: true,
        titulo: { pt: "Datas no fuso de Maceió", en: "Dates in Maceió's time zone" },
        pt: "Gravada em UTC, uma venda feita às 22h cairia no dia seguinte. O fallback de data usa o dia local de Maceió (UTC−3), independente do fuso do servidor, e isso é coberto por teste.",
        en: "Stored in UTC, a sale made at 10 p.m. would land on the next day. The date fallback uses Maceió's local day (UTC−3), whatever the server's time zone, and a test covers it.",
      },
      {
        titulo: { pt: "MapLibre + OpenStreetMap em vez de Google Maps", en: "MapLibre + OpenStreetMap instead of Google Maps" },
        pt: "O cliente queria uma solução gratuita. MapLibre com tiles do OpenStreetMap dispensa chave de API e cobrança por uso. O react-native-maps saiu porque usa o Google Maps SDK como base no Android.",
        en: "The client wanted a free solution. MapLibre with OpenStreetMap tiles needs no API key and no usage billing. react-native-maps was dropped because it sits on the Google Maps SDK on Android.",
        curta: {
          pt: "Gratuito, sem chave de API nem cobrança.",
          en: "Free: no API key, no usage billing.",
        },
      },
      {
        titulo: { pt: "Perfil de pagamento efetivo", en: "Effective payment profile" },
        pt: "O ajuste manual vence. Sem ajuste, o perfil vem do status do pedido mais recente. Uma única função SQL alimenta a Ficha, o filtro do Mapa e o Painel, para o app não dar respostas diferentes em telas diferentes.",
        en: "A manual override wins. Without one, the profile follows the status of the latest order. A single SQL function feeds the pharmacy page, the map filter and the dashboard, so the app never gives different answers on different screens.",
        curta: {
          pt: "Uma só função SQL para todas as telas.",
          en: "One SQL function for every screen.",
        },
      },
      {
        titulo: { pt: "Banco compartilhado, sem papéis", en: "One shared database, no roles" },
        pt: "A equipe usa um banco único. usuario_id registra quem fez algo, mas nunca restringe o que cada um vê, e não existe sistema de papéis. As estatísticas são sempre calculadas por query, sem tabelas pré-agregadas.",
        en: "The team shares a single database. usuario_id records who did something but never limits what anyone sees, and there is no role system. Stats are always computed by query, with no pre-aggregated tables.",
        curta: {
          pt: "usuario_id registra autoria, não restringe.",
          en: "usuario_id records authorship, never access.",
        },
      },
    ],
    // Fonte: Mapa-Farma/README.md ("Arquitetura", diagrama mermaid).
    arquitetura: [
      {
        pt: "App Android · React Native + Expo",
        en: "Android app · React Native + Expo",
        aparte: { pt: "mapa com tiles do OpenStreetMap via MapLibre", en: "map with OpenStreetMap tiles via MapLibre" },
      },
      {
        pt: "API REST/JSON · Node + Express, com JWT",
        en: "REST/JSON API · Node + Express, with JWT",
        aparte: { pt: "busca e geocoding reverso no Nominatim", en: "search and reverse geocoding on Nominatim" },
      },
      {
        pt: "Turso (libSQL)",
        en: "Turso (libSQL)",
        aparte: { pt: "farmácias carregadas pelos seeds Overpass + CNES", en: "pharmacies loaded by the Overpass + CNES seeds" },
      },
    ],
    // PENDENTE (sem fonte): galeria, desafio, aprendizado.
  },
  {
    id: 2,
    title: "FocusDrop",
    // Fonte do resumo e da descrição: FocusDrop/README.MD (abertura, "About", "Features").
    // O README deixa "Google Play release" desmarcado: o app NÃO foi publicado.
    resumo: {
      pt: "App Android de produtividade: timer de foco, rotina e histórico de sessões.",
      en: "An Android productivity app: focus timer, routine and session history.",
    },
    description: {
      // "Começou como um timer simples…" não entra aqui: já está na nota.
      pt: "Junta um timer de foco sem distrações (Pomodoro de 25 minutos com pausa automática, ou modo livre) com uma rotina semanal executada etapa por etapa, cada uma com o seu descanso proporcional. Tem histórico agrupado por dia com sequência de dias ativos, estatísticas da semana com meta diária e registro de humor. Sem conta e sem internet: tudo fica no aparelho.",
      en: "It pairs a distraction-free focus timer (25-minute Pomodoro with an automatic break, or free mode) with a weekly routine run step by step, each step with its own proportional rest. There's a history grouped by day with an active-day streak, weekly stats with a daily goal, and mood tracking. No account and no internet: everything stays on the device.",
    },
    tech: ["React Native", "TypeScript", "Expo", "AsyncStorage"],
    github: "https://github.com/samuellouren/FocusDrop",
    demo: null,
    featured: true,
    tag: { pt: "Mobile", en: "Mobile" },
    image: "/projects/focos.jpeg",
    imageAlt: {
      pt: "Tela de estatísticas do app: dias seguidos, minutos de foco no dia, gráfico de barras da semana, dias ativos e humor da semana.",
      en: "The app's stats screen: day streak, focus minutes today, a weekly bar chart, active days and the week's mood.",
    },
    shape: "phone",
    stack: "React Native · Expo · TypeScript",
    meta: {
      // Fonte: github.com/samuellouren/FocusDrop — primeiro commit em 2026-05-30.
      ano: "2026",
      // Fonte: dito pelo Samuel em 2026-10-01 (full-stack, sozinho, do zero).
      papel: { pt: "full-stack · sozinho, do zero", en: "full-stack · solo, from scratch" },
    },
    nota: {
      pt: "começou como um timer simples e virou um app focado no uso consciente do celular.",
      en: "started as a plain timer and became an app about breaking the phone habit.",
    },
    contexto: {
      // Fonte: FocusDrop/README.MD ("About": "deliberate practice project applying
      // React Native fundamentals in a real, feature-complete app"; "What I learned":
      // "learn → build → review").
      label: { pt: "Origem", en: "Origin" },
      pt: "Nasceu como prática deliberada: aplicar os fundamentos de React Native num app completo de verdade, no ciclo aprender, construir, revisar.",
      en: "It started as deliberate practice: applying React Native fundamentals in a real, feature-complete app, in a learn, build, review loop.",
    },
    // resultado ausente: o README não registra publicação nem uso.
    // Fonte de todas as decisões: FocusDrop/README.MD ("Architecture decisions").
    // Em destaque: a navegação (corrigiu um bug real do botão de voltar) e o
    // timer em hooks próprios, que é o coração do app. As outras duas são
    // organização de código.
    decisoes: [
      {
        destaque: true,
        titulo: { pt: "Stack raiz com abas aninhadas", en: "Root stack with nested tabs" },
        pt: "Atividade, etapa e descanso são telas de Stack empilhadas sobre as abas. A versão anterior, só com abas e telas escondidas, deixava o botão de voltar imprevisível, porque não havia pilha de verdade para desempilhar.",
        en: "Activity, step and rest are Stack screens pushed on top of the tabs. The earlier version, tabs only with hidden screens, made the back button unpredictable because there was no real stack to pop.",
      },
      {
        destaque: true,
        titulo: { pt: "Hooks próprios em vez de biblioteca", en: "Custom hooks instead of a library" },
        pt: "useTimer e useCycle cuidam de todo o timer em React puro, em cerca de 80 linhas, sem dependência extra e testáveis isoladamente.",
        en: "useTimer and useCycle handle all the timer logic in plain React, in about 80 lines, with no extra dependency and testable in isolation.",
      },
      {
        titulo: { pt: "Identificador fixo por notificação", en: "A fixed id per notification" },
        pt: "O lembrete diário usa um id fixo e cada atividade usa atividade_<id>. Cancelar é direto, sem listar tudo o que está agendado para achar o alvo.",
        en: "The daily reminder uses a fixed id and each activity uses atividade_<id>. Cancelling is direct, without listing everything scheduled to find the target.",
        curta: {
          pt: "Cancela o lembrete direto, sem listar tudo.",
          en: "Cancels a reminder directly, no listing.",
        },
      },
      {
        titulo: { pt: "Um serviço por domínio", en: "One service per domain" },
        pt: "Sessões, atividades, notificações e humor têm cada um o seu arquivo de serviço, e a lista de atividades já sai dessa camada ordenada por horário. Trocar o AsyncStorage por outro armazenamento mexe em um arquivo por domínio, não em todas as telas.",
        en: "Sessions, activities, notifications and mood each have their own service file, and the activity list comes out of that layer already sorted by time. Swapping AsyncStorage for another store touches one file per domain, not every screen.",
        curta: {
          pt: "Trocar o storage mexe num arquivo por domínio.",
          en: "Swapping storage touches one file per domain.",
        },
      },
    ],
    // Fonte: FocusDrop/README.MD ("Project structure", "Tech stack").
    arquitetura: [
      { pt: "Telas · Expo Router, Stack raiz com abas", en: "Screens · Expo Router, root Stack with tabs" },
      { pt: "Hooks · useTimer e useCycle", en: "Hooks · useTimer and useCycle" },
      {
        pt: "Serviços · sessões, rotina, notificações, humor",
        en: "Services · sessions, routine, notifications, mood",
        aparte: { pt: "lembretes locais pelo expo-notifications", en: "local reminders through expo-notifications" },
      },
      { pt: "AsyncStorage, no próprio aparelho", en: "AsyncStorage, on the device" },
    ],
    // PENDENTE (sem fonte): galeria, desafio, aprendizado. O README tem "What I
    // learned", mas o bloco é "O que faria diferente", que é outra pergunta.
  },
  {
    id: 3,
    title: "TalentMatch",
    description: {
      pt: "Sistema full-stack de gestão de candidatos e vagas de emprego. Backend REST com autenticação JWT, banco SQLite e frontend React com contexto global.",
      en: "Full-stack candidate and job management system. REST backend with JWT auth, SQLite database and a React front end with global context.",
    },
    tech: ["React", "Node.js", "Express", "SQLite", "JWT", "Axios"],
    github: "https://github.com/samuellouren/projetointegrador25",
    demo: "https://talent-match-two.vercel.app",
    featured: false,
    stack: "React · Node",
  },
  {
    id: 4,
    title: "JobTracker",
    description: {
      pt: "API REST desenvolvida em Python com FastAPI para rastrear candidaturas a vagas de emprego. Conta com autenticação JWT, banco de dados SQLite, operações CRUD completas e validação de status com Enum. Documentação automática via Swagger UI.",
      en: "REST API built in Python with FastAPI to track job applications. JWT auth, SQLite database, full CRUD and Enum-validated status. Auto-generated docs via Swagger UI.",
    },
    tech: ["Python", "FastAPI", "SQLite", "Uvicorn", "JWT", "REST API"],
    github: "https://github.com/samuellouren/JobTracker-API",
    demo: null,
    featured: false,
    stack: "Python · FastAPI",
  },
  {
    id: 5,
    title: "Elemental Depths",
    description: {
      pt: "Jogo produzido em equipe na Global Game Jam de Alagoas. Desenvolvimento colaborativo em C# com Unity sob pressão de tempo real.",
      en: "A game built with a team at the Global Game Jam in Alagoas. Collaborative C# and Unity development under real time pressure.",
    },
    tech: ["C#", "Unity", "Game Jam"],
    github: "https://github.com/samuellouren/Elemental-Depths_Global-game-jam",
    demo: null,
    featured: false,
    stack: "C# · Unity",
  },
  {
    id: 6,
    title: "Pagamento Pix (Java)",
    description: {
      pt: "Projeto de estudo criado para o primeiro contato com Java e Spring Boot, integrando um backend Java a um frontend Angular.",
      en: "A study project for my first contact with Java and Spring Boot, wiring a Java backend to an Angular front end.",
    },
    tech: ["Java", "Spring Boot", "Angular", "TypeScript"],
    github: "https://github.com/samuellouren/shim_de_pagamentoJava",
    demo: null,
    featured: false,
    stack: "Java · Angular",
    // A nota fica: o índice não mostra a descrição, então aqui ela não repete nada na tela.
    nota: {
      pt: "projeto de estudo. primeiro contato meu com Java e Spring Boot.",
      en: "study project. my first contact with Java and Spring Boot.",
    },
  },
];

export const featured: Project[] = projects.filter((p) => p.featured);

export function featuredBySlug(slug: string): Project | undefined {
  return featured.find((p) => slugOf(p.title) === slug);
}

// Trajetória, do mais recente para o mais antigo. Todo item tem ano. Nada aqui
// pode repetir o texto do Sobre.
export const trajetoria: Marco[] = [
  {
    // Fonte: dito pelo Samuel em 2026-10-01 (papel nos destaques: full-stack,
    // sozinho, do zero). Mapa Farma e Chute do Vidente são de 2026 (meta.ano).
    ano: "2026",
    texto: {
      pt: "Dev full-stack independente: Mapa Farma (cliente real) e Chute do Vidente (produto próprio), sozinho e do zero.",
      en: "Independent full-stack developer: Mapa Farma (client work) and Chute do Vidente (own product), solo and from scratch.",
    },
    slugs: ["mapa-farma", "chute-do-vidente"],
  },
  {
    // Fonte: public/curriculoPt.pdf, "Formação" ("1º período · Em andamento");
    // ano de início dito pelo Samuel em 2026-10-01.
    ano: "2026",
    texto: {
      pt: "Bacharelado em Sistemas de Informação no CESMAC, em andamento.",
      en: "Bachelor's in Information Systems at CESMAC, in progress.",
    },
  },
  {
    // Fonte: public/curriculoPt.pdf, "Formação" ("Técnico em Informática para
    // Internet · SENAI · 2024 - 2025").
    ano: "2024–2025",
    texto: {
      pt: "Técnico em Informática para Internet, SENAI.",
      en: "Technical degree in Web Development (Informática para Internet), SENAI.",
    },
  },
  {
    // Fonte: descrição do Elemental Depths (índice); ano dito pelo Samuel em 2026-10-01.
    ano: "2024",
    texto: {
      pt: "Global Game Jam Alagoas: Elemental Depths, jogo feito em equipe com C# e Unity.",
      en: "Global Game Jam Alagoas: Elemental Depths, a team game built in C# and Unity.",
    },
  },
];

// As mesmas 17 ferramentas de sempre, numa lista só: separar em níveis não
// acrescenta nem remove tecnologia.
export const skills: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "React Native",
  "Expo",
  "Node.js",
  "Express",
  "Python",
  "FastAPI",
  "Java",
  "Spring Boot",
  "SQL",
  "SQLite",
  "Turso (libSQL)",
  "Git",
];

// Principais = as que aparecem no `tech` de algum destaque. Calculado, não
// escrito à mão: mudou o stack de um destaque, muda aqui.
const usadasNosDestaques = new Set(featured.flatMap((p) => p.tech));
export const skillsPrincipais = skills.filter((s) => usadasNosDestaques.has(s));
export const skillsTambem = skills.filter((s) => !usadasNosDestaques.has(s));
