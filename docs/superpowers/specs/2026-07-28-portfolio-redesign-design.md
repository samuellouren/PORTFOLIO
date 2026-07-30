# Redesign do portfólio — Samuel Lourenço

Data: 2026-07-28
Status: aprovado para planejamento

## 1. Problema

O portfólio atual (React + Vite + Tailwind + Framer Motion) tem dois defeitos
independentes.

**Visual.** Feedback de terceiros diz que parece gerado por IA. As causas não são
a paleta — o site já é marrom escuro com âmbar — e sim a estrutura: hero
centralizado com pílula "Disponível para novas oportunidades" e bolinha pulsante,
menu de serviços marcado `01 / 02 / 03`, Playfair Display em itálico no accent,
bloco de estatísticas de vaidade, barras de nível de skill. Cada um desses é um
padrão reconhecível de página gerada. Trocar hex não resolve.

**Técnico.** O conteúdo só existe depois do JS rodar no cliente. Crawlers, preview
de link no WhatsApp e LinkedIn, e alguns bots de recrutamento veem uma página
vazia.

## 2. Objetivos

1. O HTML servido contém o conteúdo, sem depender de JS no cliente.
2. Meta tags OG e Twitter completas, por idioma.
3. O design lê como trabalho de um dev humano, não de um gerador.
4. Projetos apresentados pelo que resolveram, não pela stack.
5. Responsivo até mobile, foco de teclado visível, `prefers-reduced-motion`
   respeitado.
6. Menos JS que hoje.

## 3. Não-objetivos

- **Sem páginas de detalhe por projeto** (`/projetos/[slug]`). Foram consideradas e
  descartadas: o conteúdo que as justificaria (problema, decisão, resultado) ainda
  não existe, e páginas de detalhe vazias são piores que ausência delas. O caso de
  uso — crawler e preview de link — é resolvido por duas rotas. Se o conteúdo
  aparecer depois, a extensão é aditiva.
- **Sem CMS, sem blog, sem modo claro.** A página é escura por decisão de design,
  não por preferência de sistema.
- Sem refatoração de código não relacionada ao redesign.

## 4. Design

### 4.1 Paleta — "Bancada"

Conceito material: nogueira escura, luz de oficina, brasa. Não é "modo escuro com
accent"; é uma superfície de madeira com pouquíssima cor aplicada.

| Token | Hex | Papel | Frequência |
|---|---|---|---|
| `torra` | `#14100D` | Fundo único da página | ~85% da tela |
| `bancada` | `#1D1815` | Superfície elevada: painel de projeto, rodapé | ~10% |
| `serragem` | `#E9E1D5` | Texto principal (branco quente) | todo o texto |
| `fumo` | `#9B8E81` | Texto secundário, marginália, metadados | secundário |
| `brasa` | `#CE6733` | **Só ação**: hover de link, preenchimento do CTA, marca da seção ativa | ~4 por tela |
| `verdete` | `#7D9384` | **Só estado**: ponto de disponibilidade, etiqueta "cliente real" | 2 usos no site |

Bordas e réguas não são token de cor — são `serragem` a 8–12% de alpha.

Contraste medido contra `torra`: `serragem` ≈ 15:1, `fumo` ≈ 5.6:1,
`brasa` ≈ 4.9:1, `verdete` ≈ 5.6:1. Texto `torra` sobre botão `brasa` ≈ 4.9:1,
usado só em peso bold ≥ 15px.

Racional: o clichê a evitar é *fundo claro + um accent quente carregando toda a
hierarquia*. Aqui a hierarquia vem de peso tipográfico e espaço. `brasa` aparece
tão pouco que quando aparece significa alguma coisa. `verdete` (cobre oxidado) é o
contrapeso frio que impede a tela de virar degradê monótono de marrom.

### 4.2 Tipografia — duas fontes, invertidas

| Papel | Fonte | Uso |
|---|---|---|
| Display | **Bricolage Grotesque** (variable: peso, largura, optical size) | Nome, títulos de seção, nomes de projeto, etiquetas de stack |
| Corpo | **Newsreader** (variable, itálico real) | Texto corrido, descrições, marginália (itálico) |

A decisão central é a inversão. O padrão de landing page — e de página gerada — é
serifa no display e sans no corpo, que é exatamente o que o site tem hoje
(Playfair + Manrope). Aqui é o contrário: grotesca no título, serifa no texto. O
resultado lê como documento, não como página de produto.

- Bricolage Grotesque tem eixo de largura variável: títulos grandes podem condensar
  e virar quase sinalização de oficina. Uso quase nulo em portfólios.
- Newsreader foi desenhada para leitura de tela em texto longo e tem itálico
  desenhado, não oblíquo sintético — que é onde a marginália vive.

**Sem terceira fonte.** Sem monospace: mono decorativa em portfólio de dev virou
fantasia de terminal. Metadado técnico usa Bricolage em peso baixo, tamanho
pequeno, tracking aberto.

Alternativa registrada: se Bricolage parecer excêntrica demais na implementação,
**Archivo** substitui na mesma função, sem outras mudanças.

### 4.3 Layout — documento com margem anotada

Coluna de leitura (~660px) com margem de anotação fixa à esquerda (~200px),
separadas por uma régua contínua com entalhes nos limites de seção. A página lê de
cima a baixo como um caderno de bancada. Não existe seção "hero": acima da dobra há
uma declaração de três linhas, e logo abaixo, trabalho real.

```
┌─────────────────────────────────────────────────────────────────┐
│  SAMUEL LOURENÇO                projetos  sobre  contato  pt│en │ ← timbre; estático, não flutua
├──────────────┬──────────────────────────────────────────────────┤
│  Maceió, AL  │  Dev full-stack. Construo web e mobile           │
│  ●           │  de ponta a ponta — React, TypeScript,           │
│  aberto a    ├─ Node. Um cliente real, um produto próprio,      │
│  remoto      │  um app publicado.                               │
│              │                                                  │
│              │  ver projetos ↓        currículo (pdf) ↓         │
├──────────────┼──────────────────────────────────────────────────┤
│  2026        ┤  MAPA FARMA                       cliente real   │ ← entalhe na régua
│              │  ┌──────────────────────────────────────────┐    │
│  "o cliente  │  │             screenshot                    │    │
│   queria um  │  └──────────────────────────────────────────┘    │
│   software   │  [descrição existente de projects.js]            │
│   gratuito.  │                                                  │
│   usei Open- │  Problema   A distribuidora não tinha um app     │
│   StreetMap  │             para isso. Os reps controlavam       │
│   em vez de  │             visita, pedido e rota em planilhas.  │
│   Google     │  Decisão    MapLibre com OpenStreetMap em vez    │
│   Maps por   │             de Google Maps. O cliente queria     │
│   causa      │             uma solução gratuita, e essa foi a   │
│   disso."    │             razão da escolha.                    │
│              │  Resultado  Está no ar e sendo usado.            │
│  ↑ MARGINÁLIA│                                                  │
│              │                                                  │
│              │  React Native · Node · Turso      código ↗       │
├──────────────┼──────────────────────────────────────────────────┤
│  2026        ┤  CHUTE DO VIDENTE              produto próprio   │
│  "nasceu de  │  [screenshot]                                    │
│   brinca-    │                                                  │
│   deira por  │  Origem     Não era demanda de cliente…          │ ← rótulo difere
│   causa da   │  Decisão    Cristais como moeda fictícia…        │
│   Copa."     │  Resultado  No ar. Mais de 25 pessoas…           │
├──────────────┼──────────────────────────────────────────────────┤
│  2025        ┤  FOCUSDROP                             mobile    │
│  "começou    │  [screenshot]                                    │
│   como um    │  [descrição existente]                           │
│   timer      │                                                  │
│   simples…"  │  ⌷ sem estudo de caso — três linhas não          │ ← degradação
│              │    renderizam                                    │
├──────────────┼──────────────────────────────────────────────────┤
│  o resto     │  TalentMatch       React · Node            ↗     │ ← índice enxuto, sem card
│              │  jobtracker        Python · FastAPI        ↗     │
│              │  Elemental Depths  C# · Unity              ↗     │
│              │  shim de pagamento Java · Angular          ↗     │
│              │    projeto de estudo. primeiro contato meu       │ ← nota inline no índice
│              │    com Java e Spring Boot.                       │
├──────────────┴──────────────────────────────────────────────────┤
│  SOBRE  ·  CONTATO  ·  rodapé                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile.** A margem colapsa: a marginália vira uma linha em itálico logo abaixo do
título do projeto, e a régua vira borda esquerda de 1px. Uma coluna, mesma ordem de
leitura.

**Animação.** Entrada única de 250ms no conteúdo acima da dobra, e nada mais. Sem
reveal on scroll, sem parallax, sem stagger. Transição apenas em `:hover` e
`:focus` de elementos interativos. `prefers-reduced-motion: reduce` remove o que
sobrou. Framer Motion sai do projeto — o que resta cabe em CSS.

### 4.4 Elemento de assinatura — a marginália

Cada projeto pode carregar, na margem esquerda, uma frase em primeira pessoa, em
itálico, tamanho pequeno: o comentário que Samuel faria mostrando o código para
alguém sentado do lado.

Por que este elemento:

- **Não é templatizável.** Paleta e fonte se copiam em vinte minutos. Uma observação
  sobre um cliente de Maceió, não.
- **Demonstra em vez de afirmar.** O texto atual diz "gosto de entender o problema
  direito antes de escrever a primeira linha" — uma alegação que todo portfólio tem.
  A marginália é a evidência.
- **Custo zero de performance.** É texto: sem componente, sem biblioteca, sem
  animação.

**Margens vazias são parte do desenho, não falha.** Se toda linha tivesse nota, o
padrão leria como decoração — um espaço que precisa ser preenchido. Com margens
vazias no meio, as notas que existem leem como coisas sobre as quais havia algo a
dizer. O modo de falha do elemento não é a ausência de notas; é o excesso de notas
mornas.

## 5. Conteúdo

### 5.1 Regra de proveniência (vinculante)

> Nenhum campo de conteúdo pode conter fato que não esteja **(a)** escrito hoje no
> repositório ou **(b)** dito pelo Samuel em conversa registrada. Rascunho significa
> reescrever o que já existe — nunca acrescentar. Sem fonte, o campo fica vazio e
> não renderiza.

Vale para marginália, `problema`/`decisao`/`resultado`, e qualquer número ou
métrica. A regra existe porque na primeira rodada deste design foram geradas frases
falsas em primeira pessoa ("os reps anotavam visita no caderno", "comecei sem cache
e ia derreter na primeira rodada") que o Samuel teria que defender numa entrevista.

### 5.2 Estado do conteúdo

| Projeto | Marginália | Estudo de caso |
|---|---|---|
| Mapa Farma | `"o cliente queria um software gratuito. usei OpenStreetMap em vez de Google Maps por causa disso."` | completo — rótulo **Problema** |
| Chute do Vidente | `"nasceu de brincadeira por causa da Copa."` | completo — rótulo **Origem** |
| FocusDrop | `"começou como um timer simples e virou um app focado no desvício do celular."` | ausente |
| shim de pagamento Java | `"projeto de estudo. primeiro contato meu com Java e Spring Boot."` (nota inline no índice) | n/a |
| TalentMatch, jobtracker, Elemental Depths | ausente | n/a |

Fonte de todo o conteúdo acima: declarações do Samuel em 2026-07-28, registradas em
`src/data/projects.js`.

**O rótulo do primeiro campo varia por projeto.** Mapa Farma resolveu o problema de
um cliente, então o rótulo é `Problema`. Chute do Vidente nasceu de vontade própria
— a resposta do Samuel foi "queria fazer um projeto divertido", que é origem e não
problema. Rotular como `Problema` forçaria o conteúdo dentro do template e
descreveria o projeto de forma levemente falsa. O rótulo passa a ser um campo do
projeto (ver 6.7).

FocusDrop tem marginália mas não tem estudo de caso: só a nota foi confirmada. Um
destaque sem os três campos mostra screenshot + descrição existente + stack + links.
Degrada limpo, sem buraco visual — e reforça que os campos aparecem quando há o que
dizer, não por obrigação de layout.

### 5.3 Conteúdo que sai

| Item | Motivo |
|---|---|
| Bloco de stats (`7+ projetos`, `10+ tecnologias`) | Métrica de vaidade; lê como júnior. Três projetos bem contados valem mais |
| `skills[].level` (React 80%, etc.) | Indefensável em entrevista |
| Seção `skillGroups` com 4 categorias | Redundante — o stack já aparece em cada projeto. Vira uma linha de prosa + lista inline no fim da página |
| Menu de serviços `01/02/03` (`content.menu`) | Estrutura de site de agência, e marcador numerado sem sequência real |
| Metáfora de café nos títulos ("O que tem no balcão", "Também no forno", "Vamos tomar um café?") | Metáfora aplicada em toda seção é marca de texto gerado. Títulos ficam secos: `Projetos`, `Sobre`, `Contato`. O café sobrevive uma vez, no rodapé que já existe: "Feito com café em Maceió" |
| Pílula "Disponível para novas oportunidades" com bolinha pulsante | Clichê. Vira texto simples na margem: "aberto a remoto" com ponto `verdete` estático |
| `heroSub` PT e EN | Reescrever. A versão EN começa com "Hello, my name is Samuel", o padrão exato a evitar, e tem "i" minúsculo |

A linha do timbre — "um cliente real, um produto próprio, um app publicado" — vem do
`workSub` existente em `content.js`, não é fato novo.

## 6. Arquitetura técnica

### 6.1 Stack

Migração de Vite para **Next.js 16 (App Router)**, em TypeScript, com Tailwind CSS
v4. TypeScript porque o CV lista TypeScript como stack principal e o scaffold é
novo — a superfície é de ~10 componentes. Tailwind v4 porque a configuração passa a
ser CSS (`@theme`), o que elimina `tailwind.config.js`.

Sai: `framer-motion`, `react-router-dom`, `@heroicons/react`, `vite`.

### 6.2 Rotas e idioma

Duas rotas estáticas, sem middleware:

```
app/
  layout.tsx            → root layout, <html lang="pt-BR">
  page.tsx              → "/"    (PT)
  opengraph-image.tsx   → OG PT, gerado com next/og
  en/
    page.tsx            → "/en"  (EN)
    opengraph-image.tsx → OG EN
  components/…
```

Ambas as rotas renderizam um único componente `<Home lang="pt" | "en" />`. O idioma
deixa de ser estado do cliente e passa a ser rota — cada idioma ganha HTML próprio e OG
próprio. O `LanguageProvider`, o contexto e o hook `useInView` são removidos.

O toggle de idioma vira dois `<Link>`, com `hreflang` recíproco no `<head>`.

**Limitação conhecida (registrada na Task 10):** o App Router permite um único
`<html>`, no root layout, e o root layout não recebe o segmento de rota — logo
`<html lang>` não pode variar entre `/` e `/en` sem introduzir um Client Component,
o que violaria a restrição de zero JS de aplicação. Decisão: `<html lang="pt-BR">`
fica fixo no root, e a rota EN declara o idioma no `<main>` de `Home` (`<main
lang="en">`), que é HTML válido, sobrepõe o do ancestral e é o sinal que leitores de
tela usam para trocar de voz. O custo é que `<html lang>` fica impreciso em `/en`
para consumidores que só olham a raiz. Alternativa rejeitada: mover as duas rotas
para `app/[lang]/` com `generateStaticParams` — resolveria o `<html lang>`, mas
tiraria a rota PT de `/` (para `/pt` ou via rewrite), e a URL raiz em português é a
que já está publicada e compartilhada.

### 6.3 Renderização

Tudo Server Component. O único Client Component é o menu mobile, se ele precisar de
estado — a primeira tentativa deve ser `<details>`/`<summary>` nativo, que dispensa
JS. Meta: zero JS de aplicação no bundle inicial.

### 6.4 Metadata e OG

`generateMetadata` por rota: `title`, `description`, `openGraph` (title, description,
url, siteName, locale, type, images), `twitter` (`card: summary_large_image`),
`alternates.canonical` e `alternates.languages`.

`og:image` 1200×630 gerado em build por `opengraph-image.tsx` com `next/og`: nome,
função, cidade, sobre fundo `torra`, na tipografia do site. Um por idioma.

### 6.5 Fontes

`next/font/google` para Bricolage Grotesque e Newsreader — self-hosted no build, sem
requisição a `fonts.googleapis.com`. O `<link>` do Google Fonts sai do HTML.

### 6.6 Imagens

`next/image` para os três screenshots em `public/projects/`, com `width`/`height`
explícitos e `sizes` correto, para não gerar CLS.

**Risco aberto:** os screenshots existentes precisam aguentar aparecer a ~660px.
Se forem capturas de tela cheia com pouco contraste, o painel vira mancha. A
verificação acontece no início da implementação; o plano B é recorte fechado em uma
tela-chave por projeto.

### 6.7 Modelo de dados

`projects.js` vira `projects.ts`, com campos novos, todos opcionais:

```ts
type Texto = { pt: string; en: string };

nota?:      Texto                        // marginália
contexto?:  Texto & { label: Texto }     // 1º campo; rótulo por projeto
decisao?:   Texto
resultado?: Texto
```

`contexto.label` existe porque nem todo projeto tem "problema" (ver 5.2). Valores em
uso: `Problema`/`Problem` e `Origem`/`Origin`. O rótulo mora no dado, não no
componente, para que um projeto novo não seja forçado ao enquadramento errado.

Campo ausente ou string vazia não renderiza rótulo nem linha. `skills[].level` é
removido; `skillGroups` é achatado numa lista simples.

## 7. Acessibilidade

- Foco visível em todo elemento interativo: contorno `brasa` de 2px com offset de
  2px, nunca `outline: none` sem substituto.
- Skip link para o conteúdo principal.
- Ordem de leitura no DOM igual à ordem visual, inclusive na margem anotada — a
  marginália vem depois do título do projeto no DOM, posicionada por grid.
- Marginália não é decorativa: é texto real, lido por leitor de tela.
- `prefers-reduced-motion: reduce` remove transições e a entrada inicial.
- Alvos de toque ≥ 44px no mobile.
- Contrastes conforme 4.1; nenhum par abaixo de 4.5:1 para texto.

## 8. Verificação

O critério que originou o trabalho é testável diretamente:

1. `npm run build && npm start`, depois `curl -s localhost:3000 | grep "Mapa Farma"`
   → deve retornar a linha. Idem para `/en`.
2. `curl -s localhost:3000 | grep 'og:image'` → presente nas duas rotas.
3. Carregar a página com JS desabilitado no navegador: conteúdo completo e legível.
4. Lighthouse em mobile: performance e acessibilidade ≥ 95.
5. Navegação só por teclado da primeira à última âncora, com foco sempre visível.
6. Emulação de `prefers-reduced-motion: reduce`: nenhuma animação dispara.
7. Vistoria visual em 360px, 768px e 1440px.

## 9. Questões em aberto

1. Qualidade dos screenshots a 660px (ver 6.6).
2. Bricolage Grotesque pode ser trocada por Archivo se parecer excêntrica demais na
   tela.
Resolvidos em 2026-07-28: conteúdo dos estudos de caso e das marginálias (ver 5.2),
já gravado em `src/data/projects.js`.

- "desvício" na nota do FocusDrop é intencional (des-vício, largar o vício do
  celular), não digitação. Não corrigir.
- A escolha de MapLibre/OpenStreetMap no Mapa Farma foi **requisito do cliente**
  (queria solução gratuita), não preferência por personalização. A primeira versão
  deste spec dizia "gratuito e mais personalizável"; está errado e foi corrigido.

## 10. Autocrítica registrada

O risco do conceito é que "caderno de bancada / documento anotado" é um gênero
reconhecível na web indie. Sozinho, seria só um template mais bem escolhido. O que o
diferencia é exclusivamente o conteúdo da marginália ser real e específico. Se essas
frases saírem genéricas, o redesign falha pelo mesmo motivo que o design atual
falha — com fonte diferente. Por isso a regra de proveniência na seção 5.1 é
vinculante e não uma recomendação.
