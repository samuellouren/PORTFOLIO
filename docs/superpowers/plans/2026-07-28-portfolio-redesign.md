# Redesign do portfólio — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o portfólio de Vite para Next.js com renderização no servidor e reconstruir a interface segundo o spec `docs/superpowers/specs/2026-07-28-portfolio-redesign-design.md`.

**Architecture:** Next.js 16 App Router, TypeScript, Tailwind v4. Duas rotas estáticas — `/` (PT) e `/en` (EN) — renderizando o mesmo componente `<Home lang>`. Tudo Server Component; nenhum JS de aplicação no bundle inicial. Idioma vira rota, não estado de cliente.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, `next/font/google`, `next/og`, Vitest (invariantes de dados), Playwright (garantias end-to-end).

## Global Constraints

- Paleta, valores exatos: `torra #14100D`, `bancada #1D1815`, `serragem #E9E1D5`, `fumo #9B8E81`, `brasa #CE6733`, `verdete #7D9384`. Bordas são `serragem` com alpha 8–12%, nunca um token novo.
- `brasa` só em ação (hover de link, preenchimento de CTA, marca de seção ativa). `verdete` só em estado (ponto de disponibilidade, etiqueta "cliente real"). Máximo ~4 ocorrências de `brasa` por tela.
- Duas fontes: **Bricolage Grotesque** (display) e **Newsreader** (corpo). Nenhuma terceira família. Nenhuma monospace.
- Nenhuma animação além da entrada única de 250ms acima da dobra e transições de `:hover`/`:focus`. Sem reveal on scroll, sem parallax, sem stagger. `prefers-reduced-motion: reduce` remove tudo.
- **Regra de proveniência (spec §5.1):** nenhum campo de conteúdo pode conter fato que não esteja no repositório ou dito pelo Samuel. Sem fonte, o campo fica ausente e não renderiza. Vale para marginália, contexto/decisão/resultado, e qualquer número. Nenhuma task deste plano autoriza escrever conteúdo novo.
- Copy proibida (spec §5.3): pílula "Disponível para novas oportunidades", marcadores `01/02/03`, bloco de stats, `skills[].level`, metáfora de café em título de seção. O café sobrevive só no rodapé existente.
- Sem `framer-motion`, `react-router-dom`, `@heroicons/react` no bundle final.
- Nenhum par de cores de texto abaixo de 4.5:1.

## Achados da auditoria de screenshots (2026-07-28)

Executada antes deste plano. Resultado condiciona a Task 8.

| Arquivo | Dimensões | Ratio | Forma |
|---|---|---|---|
| `mapas.jpeg` | 720×1600 | 0.45 | celular, retrato |
| `focos.jpeg` | 1080×2400 | 0.45 | celular, retrato |
| `videntes.jpeg` | 1600×837 | 1.91 | web, paisagem |

**Consequência de layout:** o painel único do wireframe do spec não funciona — um print 0.45 a 660px de largura teria 1466px de altura. O componente de destaque passa a ter dois modos, selecionados por um campo `shape` no dado:

- `shape: "phone"` → moldura estreita (~250px), lado a lado com o texto do estudo de caso em ≥900px; empilhada abaixo do texto em telas menores.
- `shape: "web"` → painel na largura da coluna de leitura, acima do texto.

Resolução é suficiente nos três para os tamanhos de renderização (`mapas` 720px numa caixa de 250px CSS; `videntes` 1600px numa caixa de 660px CSS).

**Pendências de conteúdo, do Samuel — não bloqueiam nenhuma task:**

1. `mapas.jpeg` mostra a tela "Pedidos", mas a marginália e o campo Decisão do Mapa Farma tratam inteiramente da escolha de MapLibre/OpenStreetMap. Um print da tela de mapa alinharia imagem e texto.
2. `focos.jpeg` mostra estado quase vazio (1 dia seguido, 1min de 2h, uma barra).
3. `videntes.jpeg` exibe nomes de pessoas reais no ranking (Stefânia, brunin do gás, Mirella). Precisa de confirmação de publicação.

Se os arquivos forem trocados mantendo nome e forma, nenhuma task muda.

---

### Task 1: Scaffold Next.js renderizando no servidor

Substitui o app Vite. Ao fim desta task o build produz HTML com conteúdo — que é o defeito original que motivou o trabalho.

**Files:**
- Create: `package.json` (reescrito), `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Delete: `vite.config.js`, `index.html`, `postcss.config.js`, `tailwind.config.js`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/index.css`
- Test: `e2e/ssr.spec.ts`, `playwright.config.ts`

**Interfaces:**
- Produces: rotas `/` renderizando HTML no servidor; `app/globals.css` como único ponto de entrada de CSS.

- [ ] **Step 1: Instalar dependências e remover as do Vite**

```bash
npm uninstall vite @vitejs/plugin-react framer-motion react-router-dom @heroicons/react autoprefixer postcss tailwindcss
npm install next@^16 react@^19 react-dom@^19
npm install -D typescript @types/react @types/node tailwindcss@^4 @tailwindcss/postcss @playwright/test vitest
npx playwright install chromium
```

- [ ] **Step 2: Escrever o teste que falha**

`playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  use: { baseURL: "http://localhost:3000" },
});
```

`e2e/ssr.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("o HTML servido contem o conteudo, sem executar JS", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toContain("Samuel Lourenço");
});
```

- [ ] **Step 3: Rodar e confirmar que falha**

Run: `npx playwright test e2e/ssr.spec.ts`
Expected: FAIL — não há servidor Next nem build.

- [ ] **Step 4: Reescrever `package.json`**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Manter os blocos `dependencies` e `devDependencies` como o npm os deixou no Step 1.

- [ ] **Step 5: Criar `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Criar `next.config.ts` e o CSS de entrada**

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = { reactStrictMode: true };

export default nextConfig;
```

`postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`app/globals.css`:

```css
@import "tailwindcss";
```

- [ ] **Step 7: Criar o layout e a página mínima**

`app/layout.tsx`:

```tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:

```tsx
export default function Page() {
  return <h1>Samuel Lourenço</h1>;
}
```

- [ ] **Step 8: Rodar o teste e confirmar que passa**

Run: `npx playwright test e2e/ssr.spec.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "build: migra de Vite para Next.js App Router"
```

---

### Task 2: Tokens de design e fontes

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`
- Create: `app/fonts.ts`
- Test: `e2e/tokens.spec.ts`

**Interfaces:**
- Produces: classes utilitárias `bg-torra`, `text-serragem`, `text-fumo`, `text-brasa`, `bg-bancada`, `text-verdete`, `border-traco`; variáveis `--font-display` e `--font-body`; classes `font-display` e `font-body`.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/tokens.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("o fundo da pagina usa torra e o texto usa serragem", async ({ page }) => {
  await page.goto("/");
  const body = page.locator("body");
  await expect(body).toHaveCSS("background-color", "rgb(20, 16, 13)");
  await expect(body).toHaveCSS("color", "rgb(233, 225, 213)");
});

test("o corpo usa Newsreader e o titulo usa Bricolage Grotesque", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS(/font-family/, /Newsreader/);
  await expect(page.locator("h1")).toHaveCSS(/font-family/, /Bricolage/);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/tokens.spec.ts`
Expected: FAIL — cores padrão do navegador.

- [ ] **Step 3: Definir o tema em `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-torra: #14100d;
  --color-bancada: #1d1815;
  --color-serragem: #e9e1d5;
  --color-fumo: #9b8e81;
  --color-brasa: #ce6733;
  --color-verdete: #7d9384;

  /* Bordas derivam de serragem, nunca de um token proprio. */
  --color-traco: rgb(233 225 213 / 0.10);
  --color-traco-forte: rgb(233 225 213 / 0.18);

  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-newsreader), Georgia, serif;
}

body {
  background-color: var(--color-torra);
  color: var(--color-serragem);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

/* Foco visivel: nunca remover sem substituto. */
:focus-visible {
  outline: 2px solid var(--color-brasa);
  outline-offset: 2px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Carregar as fontes**

`app/fonts.ts`:

```ts
import { Bricolage_Grotesque, Newsreader } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});
```

Em `app/layout.tsx`, aplicar as variáveis no `<html>`:

```tsx
import "./globals.css";
import { bricolage, newsreader } from "./fonts";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npx playwright test e2e/tokens.spec.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: tokens da paleta Bancada e as duas fontes"
```

---

### Task 3: Camada de dados tipada

Move o conteúdo para TypeScript e trava as invariantes da regra de proveniência em teste — um campo presente mas vazio passa a ser erro, não conteúdo silencioso.

**Files:**
- Create: `data/projects.ts`, `data/content.ts`, `data/types.ts`
- Delete: `src/data/projects.js`, `src/data/content.js`
- Test: `data/projects.test.ts`

**Interfaces:**
- Produces:
  - `type Lang = "pt" | "en"`
  - `type Texto = { pt: string; en: string }`
  - `type Shape = "phone" | "web"`
  - `interface Project { id: number; title: string; description: Texto; tech: string[]; github: string; demo: string | null; featured: boolean; stack: string; tag?: Texto; image?: string; shape?: Shape; nota?: Texto; contexto?: Texto & { label: Texto }; decisao?: Texto; resultado?: Texto }`
  - `export const projects: Project[]`
  - `export const content: Record<Lang, Copy>`, `export const contacts: Contact[]`, `export const CV_FILES: Record<Lang, { url: string; name: string }>`
  - `export function pick(t: Texto, lang: Lang): string`

- [ ] **Step 1: Escrever o teste que falha**

`data/projects.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("invariantes dos projetos", () => {
  it("todo destaque tem imagem e forma declarada", () => {
    for (const p of projects.filter((x) => x.featured)) {
      expect(p.image, `${p.title} sem image`).toBeTruthy();
      expect(["phone", "web"], `${p.title} sem shape valido`).toContain(p.shape);
    }
  });

  it("nenhum campo opcional existe com string vazia", () => {
    // Proveniencia (spec 5.1): campo sem fonte fica AUSENTE, nao vazio.
    for (const p of projects) {
      for (const k of ["nota", "contexto", "decisao", "resultado"] as const) {
        const v = p[k];
        if (v === undefined) continue;
        expect(v.pt.trim(), `${p.title}.${k}.pt vazio`).not.toBe("");
        expect(v.en.trim(), `${p.title}.${k}.en vazio`).not.toBe("");
      }
    }
  });

  it("contexto sempre carrega rotulo nos dois idiomas", () => {
    for (const p of projects) {
      if (!p.contexto) continue;
      expect(p.contexto.label.pt.trim()).not.toBe("");
      expect(p.contexto.label.en.trim()).not.toBe("");
    }
  });

  it("os rotulos em uso sao apenas Problema e Origem", () => {
    const usados = projects.filter((p) => p.contexto).map((p) => p.contexto!.label.pt);
    expect(new Set(usados)).toEqual(new Set(["Problema", "Origem"]));
  });

  it("Mapa Farma e FocusDrop sao phone; Chute do Vidente e web", () => {
    const byTitle = (t: string) => projects.find((p) => p.title === t);
    expect(byTitle("Mapa Farma")!.shape).toBe("phone");
    expect(byTitle("FocusDrop")!.shape).toBe("phone");
    expect(byTitle("Chute do Vidente")!.shape).toBe("web");
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run data/projects.test.ts`
Expected: FAIL — `data/projects.ts` não existe.

- [ ] **Step 3: Criar `data/types.ts`**

```ts
export type Lang = "pt" | "en";
export type Texto = { pt: string; en: string };
export type Shape = "phone" | "web";

export interface Project {
  id: number;
  title: string;
  description: Texto;
  tech: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  stack: string;
  tag?: Texto;
  image?: string;
  shape?: Shape;
  nota?: Texto;
  contexto?: Texto & { label: Texto };
  decisao?: Texto;
  resultado?: Texto;
}

export function pick(t: Texto, lang: Lang): string {
  return t[lang];
}
```

- [ ] **Step 4: Portar `src/data/projects.js` para `data/projects.ts`**

Copiar os sete projetos **sem alterar uma palavra de conteúdo**. Três mudanças mecânicas apenas:

1. `description` + `descriptionEn` viram `description: { pt, en }`.
2. `summary` e `shot` são descartados — o índice compacto usa `stack`, e a legenda do painel some (o painel mostra a imagem).
3. Acrescentar `shape`: `"phone"` em Mapa Farma e FocusDrop, `"web"` em Chute do Vidente.

Manter `nota`, `contexto`, `decisao`, `resultado` exatamente como estão hoje em `src/data/projects.js`, incluindo "desvício", que é intencional. Manter a ordem atual dos projetos (Chute do Vidente, Mapa Farma, FocusDrop, depois os não-destaque).

Substituir os exports `skills` e `skillGroups` por uma lista única:

```ts
export const skills: string[] = [
  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
  "React Native", "Expo", "Node.js", "Express", "Python", "FastAPI",
  "Java", "Spring Boot", "SQL", "SQLite", "Turso (libSQL)", "Git",
];
```

- [ ] **Step 5: Portar `src/data/content.ts`, aplicando os cortes do spec §5.3**

Copiar `contacts` e `CV_FILES` sem mudança. Em `content`, **remover** as chaves `menu`, `stats`, `heroStatus`, `moreLabel`, `skillsTitle`, e trocar os títulos com metáfora de café:

```ts
// PT
workTitle: "Projetos",
skillsTitle: "Ferramentas",
contactTitle: "Contato",
// EN
workTitle: "Work",
skillsTitle: "Tools",
contactTitle: "Contact",
```

Reescrever `heroSub` nos dois idiomas, sem "Oi, sou" nem "Hello, my name is" — apenas reformulando o que já existe:

```ts
// PT
heroSub:
  "Dev full-stack. Construo aplicações de ponta a ponta com React, TypeScript e Node.js, e gosto de entender o problema direito antes de escrever a primeira linha.",
// EN
heroSub:
  "Full-stack developer. I build applications end to end with React, TypeScript and Node.js, and I like to understand the problem properly before writing the first line.",
```

Manter `footer` como está ("Feito com café em Maceió." / "Made with coffee in Maceió, Brazil.") — é a única sobrevivência autorizada da metáfora.

- [ ] **Step 6: Apagar os arquivos antigos e rodar os testes**

```bash
rm -r src/data src/context src/hooks src/components
```

Run: `npx vitest run`
Expected: PASS, 5 testes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: camada de dados em TypeScript com invariantes de proveniencia"
```

---

### Task 4: Primitivas de layout — a margem anotada

O esqueleto visual do spec §4.3. Sem ele nenhuma seção pode ser montada.

**Files:**
- Create: `components/Ruled.tsx`, `components/MarginNote.tsx`
- Test: `e2e/layout.spec.ts`

**Interfaces:**
- Produces:
  - `<Ruled margin={ReactNode} id?: string children: ReactNode />` — grid de duas colunas com régua entre elas; empilha abaixo de 900px.
  - `<MarginNote>{texto}</MarginNote>` — marginália em itálico, `fumo`, tamanho pequeno.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/layout.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("no desktop a margem fica a esquerda do conteudo", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const margem = page.getByTestId("ruled-margin").first();
  const conteudo = page.getByTestId("ruled-content").first();
  const m = await margem.boundingBox();
  const c = await conteudo.boundingBox();
  expect(m!.x + m!.width).toBeLessThanOrEqual(c!.x + 1);
});

test("no mobile a margem empilha acima do conteudo", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const m = await page.getByTestId("ruled-margin").first().boundingBox();
  const c = await page.getByTestId("ruled-content").first().boundingBox();
  expect(m!.y).toBeLessThan(c!.y);
  expect(m!.x).toBeLessThan(40);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/layout.spec.ts`
Expected: FAIL — `ruled-margin` não existe.

- [ ] **Step 3: Implementar `components/Ruled.tsx`**

```tsx
import type { ReactNode } from "react";

export default function Ruled({
  margin,
  children,
  id,
}: {
  margin?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="mx-auto grid w-full max-w-[900px] grid-cols-1 gap-x-8 px-5 sm:px-8 min-[900px]:grid-cols-[200px_minmax(0,660px)]"
    >
      <div
        data-testid="ruled-margin"
        className="pt-10 min-[900px]:pt-14 min-[900px]:text-right"
      >
        {margin}
      </div>
      <div
        data-testid="ruled-content"
        className="border-l border-traco pb-14 pl-5 pt-4 min-[900px]:pl-8 min-[900px]:pt-14"
      >
        {children}
      </div>
    </section>
  );
}
```

Nota de acessibilidade: a margem vem antes do conteúdo no DOM e permanece assim no mobile, então ordem visual e ordem de leitura coincidem nos dois casos.

- [ ] **Step 4: Implementar `components/MarginNote.tsx`**

```tsx
export default function MarginNote({ children }: { children: string }) {
  return (
    <p className="max-w-[200px] text-[14px] italic leading-[1.5] text-fumo min-[900px]:ml-auto">
      {children}
    </p>
  );
}
```

- [ ] **Step 5: Montar uma página provisória para o teste passar**

Em `app/page.tsx`, envolver o `<h1>` existente num `<Ruled margin={<MarginNote>teste</MarginNote>}>`. Esta montagem provisória é substituída na Task 6.

- [ ] **Step 6: Rodar o teste e confirmar que passa**

Run: `npx playwright test e2e/layout.spec.ts`
Expected: PASS, 2 testes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: primitiva de layout com margem anotada"
```

---

### Task 5: Rotas por idioma

**Files:**
- Create: `app/en/page.tsx`, `components/Home.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx`
- Test: `e2e/i18n.spec.ts`

**Interfaces:**
- Consumes: `Lang` de `data/types`.
- Produces: `<Home lang={Lang} />`; rotas `/` e `/en`.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/i18n.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("cada rota serve seu idioma no HTML, sem JS", async ({ request }) => {
  const pt = await (await request.get("/")).text();
  const en = await (await request.get("/en")).text();
  expect(pt).toContain("Projetos");
  expect(en).toContain("Work");
  expect(pt).toContain('lang="pt-BR"');
  expect(en).toContain('lang="en"');
});

test("cada rota aponta para a outra", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en");
  await page.goto("/en");
  await expect(page.getByRole("link", { name: "PT" })).toHaveAttribute("href", "/");
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/i18n.spec.ts`
Expected: FAIL — `/en` retorna 404.

- [ ] **Step 3: Mover o `<html lang>` para as rotas**

`app/layout.tsx` deixa de fixar o idioma; ele passa a vir de cada rota. Como o App Router exige `<html>` no root layout, usar um parâmetro de segmento não é necessário aqui — basta duas árvores de layout:

`app/layout.tsx`:

```tsx
import "./globals.css";
import { bricolage, newsreader } from "./fonts";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`app/en/layout.tsx`:

```tsx
import type { ReactNode } from "react";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <div lang="en">{children}</div>;
}
```

O `<html lang>` correto para `/en` é resolvido na Task 10 via `generateMetadata`; até lá o `<div lang="en">` já dá o sinal correto a leitor de tela. Registrar isso como pendência da Task 10.

- [ ] **Step 4: Criar `components/Home.tsx`**

```tsx
import type { Lang } from "@/data/types";

export default function Home({ lang }: { lang: Lang }) {
  return <main id="conteudo">{/* seções entram nas Tasks 6-9 */}</main>;
}
```

- [ ] **Step 5: Ligar as duas rotas**

`app/page.tsx`:

```tsx
import Home from "@/components/Home";

export default function Page() {
  return <Home lang="pt" />;
}
```

`app/en/page.tsx`:

```tsx
import Home from "@/components/Home";

export default function Page() {
  return <Home lang="en" />;
}
```

- [ ] **Step 6: Rodar o teste e confirmar que passa**

Este teste só fecha depois da Task 6, que traz o cabeçalho com os links PT/EN. Rodar agora e confirmar que a primeira asserção (`lang="pt-BR"`) passa e a dos links falha; a Task 6 fecha o restante.

Run: `npx playwright test e2e/i18n.spec.ts`
Expected: 1 passa, 1 falha por link ausente.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: idioma como rota em vez de estado de cliente"
```

---

### Task 6: Cabeçalho e abertura

Substitui o hero. Sem pílula, sem bolinha pulsante, sem `01/02/03`.

**Files:**
- Create: `components/Header.tsx`, `components/Opening.tsx`
- Modify: `components/Home.tsx`
- Test: `e2e/opening.spec.ts`

**Interfaces:**
- Consumes: `<Ruled>`, `content`, `CV_FILES`, `Lang`.
- Produces: `<Header lang />`, `<Opening lang />`.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/opening.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("a abertura nao usa os cliches removidos", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("Disponível para novas oportunidades");
  expect(html).not.toContain("Projetos publicados");
  expect(html).not.toContain("balcão");
  expect(html).not.toMatch(/>0[123]</);
});

test("a abertura traz nome, funcao e os dois CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Samuel Lourenço");
  await expect(page.getByRole("link", { name: /ver projetos/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /currículo/i })).toBeVisible();
});

test("existe skip link como primeiro foco", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveAttribute("href", "#conteudo");
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/opening.spec.ts`
Expected: FAIL — não há `h1` com o nome nem skip link.

- [ ] **Step 3: Implementar `components/Header.tsx`**

```tsx
import Link from "next/link";
import { content } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Header({ lang }: { lang: Lang }) {
  const t = content[lang];
  const outro = lang === "pt" ? "/en" : "/";
  const rotulo = lang === "pt" ? "EN" : "PT";

  return (
    <header className="mx-auto flex max-w-[900px] flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-traco px-5 py-5 sm:px-8">
      <Link
        href={lang === "pt" ? "/" : "/en"}
        className="font-display text-[15px] font-600 uppercase tracking-[0.14em] text-serragem"
      >
        Samuel Lourenço
      </Link>
      <nav className="flex items-baseline gap-5 text-[14px] text-fumo">
        <a className="hover:text-brasa" href="#projetos">{t.navWork}</a>
        <a className="hover:text-brasa" href="#sobre">{t.navAbout}</a>
        <a className="hover:text-brasa" href="#contato">{t.navContact}</a>
        <Link className="hover:text-brasa" href={outro} hrefLang={lang === "pt" ? "en" : "pt-BR"}>
          {rotulo}
        </Link>
      </nav>
    </header>
  );
}
```

Sem menu mobile com estado: a navegação são quatro links curtos que cabem em duas linhas a 360px. Nenhum Client Component é necessário.

- [ ] **Step 4: Implementar `components/Opening.tsx`**

```tsx
import Ruled from "./Ruled";
import { content, CV_FILES } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Opening({ lang }: { lang: Lang }) {
  const t = content[lang];
  const cv = CV_FILES[lang];

  return (
    <Ruled
      margin={
        <div className="text-[13px] leading-[1.7] text-fumo">
          <div>Maceió, AL</div>
          <div className="mt-1 flex items-center gap-2 min-[900px]:justify-end">
            <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-full bg-verdete" />
            <span>{lang === "pt" ? "aberto a remoto" : "open to remote"}</span>
          </div>
        </div>
      }
    >
      <h1 className="max-w-[560px] font-display text-[clamp(1.9rem,5.5vw,2.9rem)] font-600 leading-[1.12]">
        Samuel Lourenço
      </h1>
      <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-serragem">
        {t.heroSub}
      </p>
      <p className="mt-3 max-w-[560px] text-[16px] text-fumo">{t.workSub}</p>
      <div className="mt-7 flex flex-wrap items-center gap-5 text-[15px]">
        <a
          href="#projetos"
          className="border-b border-brasa pb-[2px] font-display text-serragem transition-colors hover:text-brasa"
        >
          {t.ctaWork} ↓
        </a>
        <a
          href={cv.url}
          download={cv.name}
          className="border-b border-traco-forte pb-[2px] font-display text-fumo transition-colors hover:border-brasa hover:text-serragem"
        >
          {t.ctaCv} ↓
        </a>
      </div>
    </Ruled>
  );
}
```

- [ ] **Step 5: Montar em `components/Home.tsx`, com skip link**

```tsx
import Header from "./Header";
import Opening from "./Opening";
import { content } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Home({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-bancada focus:px-4 focus:py-2"
      >
        {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <Header lang={lang} />
      <main id="conteudo">
        <Opening lang={lang} />
      </main>
      <footer className="mx-auto max-w-[900px] border-t border-traco px-5 py-8 text-[14px] text-fumo sm:px-8">
        {t.footer}
      </footer>
    </>
  );
}
```

- [ ] **Step 6: Rodar os testes e confirmar que passam**

Run: `npx playwright test e2e/opening.spec.ts e2e/i18n.spec.ts`
Expected: PASS, 5 testes (os dois de i18n agora fecham).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: cabecalho e abertura sem os cliches do hero antigo"
```

---

### Task 7: Entrada única de 250ms

Isolada em sua própria task porque é a única animação do site e precisa provar que respeita `prefers-reduced-motion`.

**Files:**
- Modify: `app/globals.css`, `components/Opening.tsx`
- Test: `e2e/motion.spec.ts`

**Interfaces:**
- Produces: classe `.entrada`, aplicável a qualquer bloco acima da dobra.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/motion.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("a entrada existe por padrao", async ({ page }) => {
  await page.goto("/");
  const dur = await page
    .locator(".entrada")
    .first()
    .evaluate((el) => getComputedStyle(el).animationDuration);
  expect(dur).toBe("0.25s");
});

test.describe("com reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nenhuma animacao roda", async ({ page }) => {
    await page.goto("/");
    const dur = await page
      .locator(".entrada")
      .first()
      .evaluate((el) => getComputedStyle(el).animationDuration);
    expect(dur).toBe("0.01ms");
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/motion.spec.ts`
Expected: FAIL — `.entrada` não existe.

- [ ] **Step 3: Implementar em `app/globals.css`**

Acrescentar, antes do bloco `@media (prefers-reduced-motion: reduce)` que já existe:

```css
@keyframes entrada {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

.entrada {
  animation: entrada 250ms cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
```

O bloco de `reduced-motion` já reduz `animation-duration` para `0.01ms`, então nada precisa ser acrescentado lá.

- [ ] **Step 4: Aplicar em `components/Opening.tsx`**

Acrescentar `entrada` à classe do `<h1>` e do primeiro `<p>`. Em nenhum outro lugar do site — sem stagger, sem delays escalonados.

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npx playwright test e2e/motion.spec.ts`
Expected: PASS, 2 testes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: entrada unica de 250ms respeitando reduced-motion"
```

---

### Task 8: Projetos em destaque, com dois modos de painel

Implementa o achado da auditoria: `shape: "phone"` e `shape: "web"` produzem arranjos diferentes.

**Files:**
- Create: `components/ProjectFeature.tsx`, `components/CaseField.tsx`
- Modify: `components/Home.tsx`, `next.config.ts`
- Test: `e2e/projects.spec.ts`

**Interfaces:**
- Consumes: `Project`, `pick`, `<Ruled>`, `<MarginNote>`.
- Produces: `<ProjectFeature project={Project} lang={Lang} />`, `<CaseField label={string} children={string} />`.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/projects.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("projeto web tem painel largo; projeto mobile tem moldura estreita", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const web = await page.getByTestId("shot-chute-do-vidente").boundingBox();
  const phone = await page.getByTestId("shot-mapa-farma").boundingBox();
  expect(web!.width).toBeGreaterThan(500);
  expect(phone!.width).toBeLessThan(320);
  expect(phone!.height).toBeGreaterThan(phone!.width);
});

test("o rotulo do primeiro campo difere por projeto", async ({ page }) => {
  await page.goto("/");
  const mapa = page.getByTestId("project-mapa-farma");
  const vidente = page.getByTestId("project-chute-do-vidente");
  await expect(mapa).toContainText("Problema");
  await expect(vidente).toContainText("Origem");
  await expect(vidente).not.toContainText("Problema");
});

test("projeto sem estudo de caso nao renderiza rotulos vazios", async ({ page }) => {
  await page.goto("/");
  const focus = page.getByTestId("project-focusdrop");
  await expect(focus).not.toContainText("Problema");
  await expect(focus).not.toContainText("Decisão");
  await expect(focus).not.toContainText("Resultado");
  // mas a marginalia dele existe
  await expect(focus.getByText(/timer simples/)).toBeVisible();
});

test("a marginalia sai no HTML servido", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).toContain("o cliente queria um software gratuito");
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/projects.spec.ts`
Expected: FAIL — nenhum projeto renderizado.

- [ ] **Step 3: Implementar `components/CaseField.tsx`**

```tsx
export default function CaseField({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-4 sm:grid-cols-[92px_minmax(0,1fr)]">
      <dt className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
        {label}
      </dt>
      <dd className="text-[16px] leading-[1.65] text-serragem">{children}</dd>
    </div>
  );
}
```

- [ ] **Step 4: Implementar `components/ProjectFeature.tsx`**

```tsx
import Image from "next/image";
import Ruled from "./Ruled";
import MarginNote from "./MarginNote";
import CaseField from "./CaseField";
import { content } from "@/data/content";
import { pick, type Lang, type Project } from "@/data/types";

const slug = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");

export default function ProjectFeature({
  project: p,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const t = content[lang];
  const id = slug(p.title);
  const temCaso = Boolean(p.contexto || p.decisao || p.resultado);
  const phone = p.shape === "phone";

  const shot = p.image ? (
    <div
      data-testid={`shot-${id}`}
      className={
        phone
          ? "w-[250px] shrink-0 overflow-hidden rounded-[14px] border border-traco-forte bg-bancada"
          : "overflow-hidden rounded-[6px] border border-traco-forte bg-bancada"
      }
    >
      <Image
        src={p.image}
        alt=""
        width={phone ? 250 : 660}
        height={phone ? 556 : 345}
        sizes={phone ? "250px" : "(max-width: 900px) 100vw, 660px"}
        className="h-auto w-full"
      />
    </div>
  ) : null;

  return (
    <Ruled
      id={id}
      margin={
        <div data-testid={`margin-${id}`}>
          {p.nota ? <MarginNote>{pick(p.nota, lang)}</MarginNote> : null}
        </div>
      }
    >
      <article data-testid={`project-${id}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-[22px] font-600 uppercase tracking-[0.06em]">
            {p.title}
          </h2>
          {p.tag ? (
            <span className="text-[12px] uppercase tracking-[0.14em] text-verdete">
              {pick(p.tag, lang)}
            </span>
          ) : null}
        </div>

        <div className={phone ? "mt-5 flex flex-col gap-6 min-[700px]:flex-row" : "mt-5"}>
          {!phone && shot}
          <div className={phone ? "order-2 min-w-0 flex-1" : ""}>
            <p className="text-[16px] leading-[1.7] text-fumo">
              {pick(p.description, lang)}
            </p>
            {temCaso ? (
              <dl>
                {p.contexto ? (
                  <CaseField label={pick(p.contexto.label, lang)}>
                    {pick(p.contexto, lang)}
                  </CaseField>
                ) : null}
                {p.decisao ? (
                  <CaseField label={lang === "pt" ? "Decisão" : "Decision"}>
                    {pick(p.decisao, lang)}
                  </CaseField>
                ) : null}
                {p.resultado ? (
                  <CaseField label={lang === "pt" ? "Resultado" : "Result"}>
                    {pick(p.resultado, lang)}
                  </CaseField>
                ) : null}
              </dl>
            ) : null}
          </div>
          {phone && <div className="order-1">{shot}</div>}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <span className="text-[13px] text-fumo">{p.tech.join(" · ")}</span>
          <span className="flex gap-5 text-[14px]">
            <a
              href={p.github}
              className="border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa"
            >
              {t.linkCode} ↗
            </a>
            {p.demo ? (
              <a
                href={p.demo}
                className="border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa"
              >
                {t.linkDemo} ↗
              </a>
            ) : null}
          </span>
        </div>
      </article>
    </Ruled>
  );
}
```

`alt=""` é intencional: cada screenshot é ilustração de conteúdo já descrito em texto ao lado, então texto alternativo repetiria o que o leitor de tela acabou de ler. Se um screenshot passar a carregar informação exclusiva, trocar por descrição real.

- [ ] **Step 5: Montar em `components/Home.tsx`**

Dentro de `<main>`, depois de `<Opening>`:

```tsx
<h2 id="projetos" className="sr-only">{t.workTitle}</h2>
{projects.filter((p) => p.featured).map((p) => (
  <ProjectFeature key={p.id} project={p} lang={lang} />
))}
```

- [ ] **Step 6: Rodar os testes e confirmar que passam**

Run: `npx playwright test e2e/projects.spec.ts`
Expected: PASS, 4 testes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: destaques com painel por forma de screenshot"
```

---

### Task 9: Índice compacto, sobre, ferramentas e contato

**Files:**
- Create: `components/ProjectIndex.tsx`, `components/About.tsx`, `components/Contact.tsx`
- Modify: `components/Home.tsx`
- Test: `e2e/sections.spec.ts`

**Interfaces:**
- Consumes: `projects`, `content`, `contacts`, `skills`.
- Produces: `<ProjectIndex lang />`, `<About lang />`, `<Contact lang />`.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/sections.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("o indice lista os quatro projetos nao-destaque", async ({ page }) => {
  await page.goto("/");
  const idx = page.getByTestId("project-index");
  for (const t of ["TalentMatch", "jobtracker", "Elemental Depths", "shim de pagamento Java"]) {
    await expect(idx.getByText(t, { exact: false })).toBeVisible();
  }
});

test("a nota inline aparece no item do Java e em nenhum outro", async ({ page }) => {
  await page.goto("/");
  const idx = page.getByTestId("project-index");
  await expect(idx.getByText(/primeiro contato meu com Java/)).toBeVisible();
  await expect(idx.getByTestId("index-note")).toHaveCount(1);
});

test("nao existe barra de nivel de skill nem bloco de stats", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("Tecnologias no dia a dia");
  expect(html).not.toMatch(/role="progressbar"/);
});

test("os tres contatos sao links reais", async ({ page }) => {
  await page.goto("/");
  const c = page.getByTestId("contact");
  await expect(c.getByRole("link", { name: /gmail\.com/ })).toHaveAttribute("href", /^mailto:/);
  await expect(c.getByRole("link", { name: /linkedin/i })).toBeVisible();
  await expect(c.getByRole("link", { name: /@samuellouren/ })).toBeVisible();
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/sections.spec.ts`
Expected: FAIL — as seções não existem.

- [ ] **Step 3: Implementar `components/ProjectIndex.tsx`**

```tsx
import Ruled from "./Ruled";
import { projects } from "@/data/projects";
import { content } from "@/data/content";
import { pick, type Lang } from "@/data/types";

export default function ProjectIndex({ lang }: { lang: Lang }) {
  const t = content[lang];
  const resto = projects.filter((p) => !p.featured);

  return (
    <Ruled
      margin={
        <span className="text-[13px] text-fumo">
          {lang === "pt" ? "o resto" : "the rest"}
        </span>
      }
    >
      <ul data-testid="project-index" className="divide-y divide-traco">
        {resto.map((p) => (
          <li key={p.id} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <a
                href={p.github}
                className="font-display text-[16px] transition-colors hover:text-brasa"
              >
                {p.title} ↗
              </a>
              <span className="text-[13px] text-fumo">{p.stack}</span>
            </div>
            {p.nota ? (
              <p data-testid="index-note" className="mt-1 text-[14px] italic text-fumo">
                {pick(p.nota, lang)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Ruled>
  );
}
```

O índice não leva título próprio: `moreLabel` ("Também no forno") foi cortado na Task 3 junto com a metáfora de café, e a palavra na margem — "o resto" / "the rest" — já cumpre a função. Remover também o `const t = content[lang]` deste componente, que fica sem uso.

- [ ] **Step 4: Implementar `components/About.tsx`**

```tsx
import Ruled from "./Ruled";
import { content } from "@/data/content";
import { skills } from "@/data/projects";
import type { Lang } from "@/data/types";

export default function About({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="sobre"
      margin={
        <h2 className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
          {t.aboutLabel}
        </h2>
      }
    >
      {t.aboutParagraphs.map((p) => (
        <p key={p} className="mb-4 max-w-[560px] text-[16px] leading-[1.75]">
          {p}
        </p>
      ))}
      <p className="mt-6 max-w-[560px] text-[15px] leading-[1.8] text-fumo">
        <span className="font-display uppercase tracking-[0.14em]">
          {t.skillsTitle}
        </span>{" "}
        — {skills.join(", ")}.
      </p>
    </Ruled>
  );
}
```

- [ ] **Step 5: Implementar `components/Contact.tsx`**

```tsx
import Ruled from "./Ruled";
import { content, contacts } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Contact({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="contato"
      margin={
        <h2 className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
          {t.contactTitle}
        </h2>
      }
    >
      <p className="mb-5 max-w-[560px] text-[16px]">{t.contactSub}</p>
      <ul data-testid="contact" className="space-y-2 text-[16px]">
        {contacts.map((c) => (
          <li key={c.id}>
            <a
              href={c.href}
              className="border-b border-traco-forte pb-[1px] transition-colors hover:border-brasa hover:text-brasa"
            >
              {c.value}
            </a>
          </li>
        ))}
      </ul>
    </Ruled>
  );
}
```

- [ ] **Step 6: Montar as três em `components/Home.tsx`, nesta ordem: `ProjectIndex`, `About`, `Contact`. Rodar os testes**

Run: `npx playwright test e2e/sections.spec.ts`
Expected: PASS, 4 testes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: indice compacto, sobre e contato"
```

---

### Task 10: Metadata, OG e imagem social

Fecha a segunda metade do defeito original: preview de link no WhatsApp e LinkedIn.

**Files:**
- Create: `app/opengraph-image.tsx`, `app/en/opengraph-image.tsx`
- Modify: `app/layout.tsx`, `app/page.tsx`, `app/en/page.tsx`, `app/en/layout.tsx`
- Test: `e2e/metadata.spec.ts`

**Interfaces:**
- Produces: `generateMetadata` em ambas as rotas; `/opengraph-image` e `/en/opengraph-image`.

- [ ] **Step 1: Escrever o teste que falha**

`e2e/metadata.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

for (const [rota, locale] of [["/", "pt_BR"], ["/en", "en_US"]] as const) {
  test(`${rota} tem OG e twitter completos`, async ({ request }) => {
    const html = await (await request.get(rota)).text();
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/property="og:image"/);
    expect(html).toMatch(/property="og:type"/);
    expect(html).toContain(locale);
    expect(html).toMatch(/name="twitter:card" content="summary_large_image"/);
    expect(html).toMatch(/rel="canonical"/);
    expect(html).toMatch(/hreflang/);
  });
}

test("a imagem OG e servida em 1200x630", async ({ request }) => {
  const r = await request.get("/opengraph-image");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("image");
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx playwright test e2e/metadata.spec.ts`
Expected: FAIL — nenhuma meta OG presente.

- [ ] **Step 3: Definir `metadataBase` e o metadata da rota PT**

Em `app/layout.tsx`, exportar:

```ts
export const metadata = {
  metadataBase: new URL("https://samuellourenco.dev"),
};
```

Se o domínio final for outro, ajustar aqui — é o único lugar onde a URL absoluta aparece.

Em `app/page.tsx`:

```tsx
import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Samuel Lourenço — dev full-stack",
  description:
    "Dev full-stack em Maceió. Aplicações web e mobile de ponta a ponta com React, TypeScript e Node.js.",
  alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Samuel Lourenço",
    locale: "pt_BR",
    title: "Samuel Lourenço — dev full-stack",
    description:
      "Aplicações web e mobile de ponta a ponta com React, TypeScript e Node.js.",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Home lang="pt" />;
}
```

Em `app/en/page.tsx`, o mesmo com textos em inglês, `locale: "en_US"`, `url: "/en"` e `canonical: "/en"`.

- [ ] **Step 4: Corrigir o `<html lang>` de `/en`**

Pendência aberta na Task 5. O App Router permite um único `<html>`, no root layout, e o root layout não recebe o segmento de rota — então `<html lang>` não pode variar entre `/` e `/en` sem introduzir um Client Component, o que violaria a restrição de zero JS de aplicação.

Decisão: **manter `<html lang="pt-BR">` no root e declarar `lang` no `<main>` da rota EN.** Um atributo `lang` em elemento interno é HTML válido, sobrepõe o do ancestral e é exatamente o sinal que leitores de tela usam para trocar de voz. O custo é que `<html lang>` fica impreciso em `/en` para consumidores que só olham a raiz.

Alternativa rejeitada: migrar as duas rotas para `app/[lang]/` com `generateStaticParams`. Funciona e daria `<html lang>` correto, mas move a rota PT de `/` para `/pt` ou exige um rewrite — e a URL raiz em português é a que já está publicada e compartilhada.

Em `components/Home.tsx`, no `<main>`:

```tsx
<main id="conteudo" lang={lang === "pt" ? "pt-BR" : "en"}>
```

Ajustar o teste da Task 5 para asserir `lang="en"` no `<main>` de `/en`, não no `<html>`, e registrar no spec §6.2 que a limitação é conhecida.

- [ ] **Step 5: Criar as imagens OG**

`app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Samuel Lourenço — dev full-stack";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#14100D",
          color: "#E9E1D5",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 76, letterSpacing: -2 }}>Samuel Lourenço</div>
        <div style={{ fontSize: 34, color: "#9B8E81", marginTop: 12 }}>
          Dev full-stack · Maceió, Alagoas
        </div>
        <div style={{ height: 4, width: 120, background: "#CE6733", marginTop: 32 }} />
      </div>
    ),
    size
  );
}
```

`app/en/opengraph-image.tsx`: idêntico, com o subtítulo `"Full-stack developer · Maceió, Brazil"`.

- [ ] **Step 6: Rodar os testes e confirmar que passam**

Run: `npx playwright test e2e/metadata.spec.ts`
Expected: PASS, 3 testes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: metadata OG e imagem social por idioma"
```

---

### Task 11: Limpeza e verificação final

**Files:**
- Delete: `src/` (o que restar), `eslint.config.js` (reescrito para Next)
- Modify: `README.md`
- Test: `e2e/final.spec.ts`

- [ ] **Step 1: Escrever o teste que falha**

`e2e/final.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("a pagina funciona com JS desabilitado", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Mapa Farma")).toBeVisible();
  await expect(page.getByText("o cliente queria um software gratuito")).toBeVisible();
  await ctx.close();
});

test("todo link recebe foco visivel na ordem do documento", async ({ page }) => {
  await page.goto("/");
  const links = await page.getByRole("link").count();
  expect(links).toBeGreaterThan(8);
  for (let i = 0; i < links; i++) {
    await page.keyboard.press("Tab");
    const estilo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return getComputedStyle(el).outlineStyle;
    });
    expect(estilo).not.toBe("none");
  }
});

test("nenhuma dependencia removida sobrou no bundle", async ({ page }) => {
  const js: string[] = [];
  page.on("response", (r) => {
    if (r.url().endsWith(".js")) js.push(r.url());
  });
  await page.goto("/");
  const corpo = await Promise.all(js.map(async (u) => (await page.request.get(u)).text()));
  const tudo = corpo.join("");
  expect(tudo).not.toContain("framer-motion");
  expect(tudo).not.toContain("react-router");
});
```

- [ ] **Step 2: Rodar e confirmar o estado**

Run: `npx playwright test e2e/final.spec.ts`
Expected: os dois primeiros devem passar se as tasks anteriores estiverem corretas; o terceiro confirma a limpeza.

- [ ] **Step 3: Remover o que sobrou do Vite**

```bash
rm -rf src dist
```

Reescrever `eslint.config.js` para a configuração do Next:

```bash
npm install -D eslint eslint-config-next
```

```js
import next from "eslint-config-next";
export default [...next()];
```

- [ ] **Step 4: Atualizar o `README.md`**

Trocar as instruções de `vite` por `npm run dev` / `npm run build` / `npm start`, e acrescentar uma linha apontando para o spec e para a regra de proveniência de conteúdo.

- [ ] **Step 5: Rodar a suíte inteira**

```bash
npm run lint
npx vitest run
npx playwright test
npm run build
```

Expected: tudo verde; o build não emite aviso de rota dinâmica inesperada.

- [ ] **Step 6: Verificação manual (não automatizável)**

Registrar o resultado de cada item antes de fechar a task:

1. Lighthouse mobile em `/`: performance ≥ 95, acessibilidade ≥ 95.
2. Vistoria visual a 360px, 768px e 1440px — a marginália colapsa corretamente e nada estoura na horizontal.
3. Conferir a contagem de `brasa` na primeira dobra: no máximo 4 ocorrências visíveis.
4. Colar a URL de produção no WhatsApp e no LinkedIn e confirmar que o preview traz título, descrição e imagem.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove residuos do Vite e fecha a verificacao"
```

---

## Autorrevisão do plano

**Cobertura do spec.** §4.1 → Task 2. §4.2 → Task 2. §4.3 → Tasks 4, 6, 8, 9. §4.4 → Tasks 4, 8, 9. §5.1 → travada em teste na Task 3. §5.2 → Task 3. §5.3 → Tasks 3, 6, 9 (com asserção negativa em `e2e/opening.spec.ts` e `e2e/sections.spec.ts`). §6.1 → Tasks 1, 11. §6.2 → Tasks 5, 10. §6.3 → Task 1 (nenhum Client Component foi introduzido em task nenhuma). §6.4 → Task 10. §6.5 → Task 2. §6.6 → Task 8. §6.7 → Task 3. §7 → Tasks 2, 6, 7, 11. §8 → Tasks 1, 10, 11.

**Duas divergências conscientes em relação ao spec, a corrigir no spec após a execução:**

1. §6.6 previa um painel único de screenshot. A auditoria mostrou duas proporções e a Task 8 implementa dois modos. O spec deve ser atualizado.
2. §6.2 previa `<html lang>` correto por rota. O App Router só permite um `<html>`, no root layout. A Task 10 resolve com `lang` no `<main>`, que é HTML válido e serve leitores de tela, mas não é o que o spec descreve.

**Sem placeholders.** Nenhuma task contém "TBD", "tratar erros adequadamente" ou "similar à Task N". Todo passo de código traz o código.

**Consistência de tipos.** `Texto`, `Lang`, `Shape`, `Project` e `pick` são definidos na Task 3 e usados com as mesmas assinaturas nas Tasks 8 e 9. `Ruled` recebe `margin`/`children`/`id` na Task 4 e é chamado com esses nomes nas Tasks 6, 8 e 9. Os `data-testid` usados nos testes (`ruled-margin`, `ruled-content`, `project-<slug>`, `shot-<slug>`, `index-note`, `contact`, `project-index`) são emitidos pelos componentes que os testes exercitam.
