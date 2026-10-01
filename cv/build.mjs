// Gera os PDFs do currículo a partir do HTML em cv/, com o Chromium do
// Playwright. Os nomes de saída não mudam: o site linka para eles (CV_FILES).
// Falha se algum PDF passar de uma página — currículo de estágio/júnior é 1 A4.
import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = new URL("../", import.meta.url);
const alvos = [
  { html: "cv/curriculo.pt.html", pdf: "public/curriculoPt.pdf" },
  { html: "cv/curriculo.en.html", pdf: "public/curriculoen.pdf" },
];

// O Chromium grava cada página como um objeto "/Type /Page" sem compressão.
export function contarPaginas(pdf) {
  return (pdf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
}

const browser = await chromium.launch();
let erro = false;
try {
  const page = await browser.newPage();
  for (const { html, pdf } of alvos) {
    await page.goto(pathToFileURL(fileURLToPath(new URL(html, raiz))).href);
    const buf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    await writeFile(new URL(pdf, raiz), buf);
    const paginas = contarPaginas(buf);
    console.log(`${pdf}: ${paginas} página(s), ${(buf.length / 1024).toFixed(0)} KB`);
    if (paginas !== 1) {
      console.error(`  ERRO: ${pdf} precisa ter exatamente 1 página.`);
      erro = true;
    }
  }
} finally {
  await browser.close();
}
if (erro) process.exit(1);
