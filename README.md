# 🗂️ Samuel Lourenço — Portfolio

Site pessoal desenvolvido com Next.js (App Router), apresentando meus projetos, habilidades e formas de contato. Duas rotas renderizadas no servidor: `/` (pt) e `/en` (en).

🔗 **[Ver ao vivo](https://portfolio-murex-zeta-35.vercel.app/)**

---

## ✨ Seções

- **Opening** — apresentação com status de disponibilidade
- **Sobre** — background, metodologia e informações pessoais
- **Projetos** — três projetos em destaque com estudo de caso, mais um índice compacto dos demais
- **Contato** — links diretos para GitHub, LinkedIn e email

---

## 🛠️ Tecnologias

- [Next.js](https://nextjs.org) (App Router, Server Components — sem `"use client"`)
- [React](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) — tokens de design em `@theme`, dentro de `app/globals.css`

---

## 🚀 Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/samuellouren/portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

Build de produção:

```bash
npm run build
npm start
```

Verificação:

```bash
npm run lint
npx vitest run
npx playwright test
```

---

## 📁 Estrutura

```
app/          # rotas (pt em /, en em /en), layout, metadata OG
components/   # Header, Home, About, Contact, ProjectFeature, ProjectIndex, Ruled, MarginNote, CaseField
data/         # content.ts, projects.ts, types.ts — edite aqui para adicionar projetos
e2e/          # testes Playwright
```

---

## 📜 Proveniência e spec

Este redesign segue o spec em
[`docs/superpowers/specs/2026-07-28-portfolio-redesign-design.md`](docs/superpowers/specs/2026-07-28-portfolio-redesign-design.md).
Todo o conteúdo de projetos obedece à **regra de proveniência (§5.1)**: nenhum campo
pode conter fato que não esteja escrito no repositório ou dito pelo Samuel em
conversa registrada — sem fonte, o campo fica vazio e não renderiza.

---

## 📬 Contato

- GitHub: [@samuellouren](https://github.com/samuellouren)
- LinkedIn: [linkedin.com/in/samuellouren](https://linkedin.com/in/samuellouren)

---

<p align="center">Feito com Next.js por <strong>Samuel Lourenço</strong></p>
