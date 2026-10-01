// Verifica todos os links externos do site já construído (`npm run build`) e
// dos PDFs do currículo. Uso: `npm run links`. Sai com erro se algum link
// estiver quebrado.
//
// - HTML: as páginas pré-renderizadas em .next/server/app.
// - PDFs: os links gravados em public/curriculo*.pdf (o Chromium grava cada
//   link como "/URI (...)" sem compressão).
// - Links internos para PDF (/curriculoPt.pdf…) precisam existir em public/.
//
// O LinkedIn responde 999 a qualquer acesso automatizado, mesmo com o perfil
// no ar. Esse caso sai como aviso, não como erro: o script não tem como provar
// que o link está quebrado.
import { readdir, readFile, access } from "node:fs/promises";

const raiz = new URL("../", import.meta.url);
const app = new URL(".next/server/app/", raiz);

async function* arquivos(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = new URL(e.name + (e.isDirectory() ? "/" : ""), dir);
    if (e.isDirectory()) yield* arquivos(p);
    else yield p;
  }
}

const origem = new Map(); // url -> conjunto de arquivos onde aparece
const anotar = (url, onde) => {
  const u = url.replace(/&amp;/g, "&");
  if (!origem.has(u)) origem.set(u, new Set());
  origem.get(u).add(onde);
};
const pdfsInternos = new Set();

try {
  await access(app);
} catch {
  console.error("Build não encontrado. Rode `npm run build` antes.");
  process.exit(1);
}

for await (const f of arquivos(app)) {
  if (!f.pathname.endsWith(".html")) continue;
  const html = await readFile(f, "utf8");
  const onde = f.pathname.split(".next/server/app/")[1];
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (/^https?:\/\//.test(href)) anotar(href, onde);
    else if (href.endsWith(".pdf")) pdfsInternos.add(href);
  }
}

for (const pdf of ["public/curriculoPt.pdf", "public/curriculoen.pdf"]) {
  const bin = (await readFile(new URL(pdf, raiz))).toString("latin1");
  for (const [, uri] of bin.matchAll(/\/URI\s*\(([^)]+)\)/g)) {
    if (/^https?:\/\//.test(uri)) anotar(uri, pdf);
  }
}

async function status(url) {
  const opcoes = {
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
    headers: { "user-agent": "Mozilla/5.0 (link-check do portfólio)", accept: "text/html,*/*" },
  };
  try {
    const r = await fetch(url, opcoes);
    return { codigo: r.status, final: r.url };
  } catch (e) {
    return { codigo: 0, final: url, erro: e.cause?.code ?? e.name };
  }
}

let quebrados = 0;
let avisos = 0;
const linhas = [];

for (const p of pdfsInternos) {
  try {
    await access(new URL("public" + p, raiz));
    linhas.push(["ok  ", "arquivo", p, "public/"]);
  } catch {
    linhas.push(["ERRO", "ausente", p, "public/"]);
    quebrados++;
  }
}

const urls = [...origem.keys()].sort();
const resultados = await Promise.all(urls.map(status));
urls.forEach((url, i) => {
  const { codigo, final, erro } = resultados[i];
  const onde = [...origem.get(url)].join(", ");
  const nota = final !== url ? ` → ${final}` : "";
  if (codigo >= 200 && codigo < 400) {
    linhas.push(["ok  ", String(codigo), url + nota, onde]);
  } else if (codigo === 999 && new URL(url).hostname.endsWith("linkedin.com")) {
    linhas.push(["aviso", "999", url + " (LinkedIn bloqueia robôs)", onde]);
    avisos++;
  } else {
    linhas.push(["ERRO", erro ?? String(codigo), url + nota, onde]);
    quebrados++;
  }
});

for (const [estado, codigo, url, onde] of linhas) {
  console.log(`${estado.padEnd(5)} ${codigo.padEnd(7)} ${url}\n              em: ${onde}`);
}
console.log(
  `\n${linhas.length} links: ${linhas.length - quebrados - avisos} ok, ${avisos} aviso(s), ${quebrados} quebrado(s).`
);
if (quebrados > 0) process.exit(1);
