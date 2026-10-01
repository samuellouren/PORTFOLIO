// 404 de URL que nao casa com nenhuma rota. Nao passa por nenhum root layout,
// entao monta o documento inteiro. A URL nao diz o idioma: o texto sai nos
// dois, PT primeiro (idioma da raiz), EN marcado com lang proprio.
import "./globals.css";
import Link from "next/link";
import { bricolage, newsreader } from "./fonts";
import { siteUrl } from "./site";
import { content } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "404 — Samuel Lourenço",
  robots: { index: false },
};

export default function GlobalNotFound() {
  const pt = content.pt;
  const en = content.en;
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${newsreader.variable}`}>
      <body>
        <main className="mx-auto max-w-[660px] px-5 py-24 sm:px-8">
          <p className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">404</p>
          <h1 className="mt-3 font-display text-[28px] font-semibold">{pt.notFoundTitle}</h1>
          <p lang="en" className="mt-1 text-[17px] italic text-fumo">{en.notFoundTitle}</p>
          <div className="mt-8 flex flex-wrap gap-6 text-[15px]">
            <Link
              href="/"
              className="-my-2.5 border-b border-traco-forte py-2.5 font-display transition-colors hover:border-brasa hover:text-brasa"
            >
              <span aria-hidden="true">←</span> {pt.notFoundBack}
            </Link>
            <Link
              href="/en"
              lang="en"
              hrefLang="en"
              className="-my-2.5 border-b border-traco-forte py-2.5 font-display transition-colors hover:border-brasa hover:text-brasa"
            >
              <span aria-hidden="true">←</span> {en.notFoundBack}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
