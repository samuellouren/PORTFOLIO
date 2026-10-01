import Header from "./Header";
import { content } from "@/data/content";
import type { Lang } from "@/data/types";
import type { ReactNode } from "react";

// Moldura comum das paginas: skip link, timbre, <main> e rodape.
export default function Shell({
  lang,
  alternateHref,
  onHome = false,
  children,
}: {
  lang: Lang;
  alternateHref: string;
  onHome?: boolean;
  children: ReactNode;
}) {
  const t = content[lang];
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-bancada focus:px-4 focus:py-2"
      >
        {t.skipLink}
      </a>
      <Header lang={lang} alternateHref={alternateHref} onHome={onHome} />
      <main id="conteudo" lang={lang === "pt" ? "pt-BR" : "en"}>
        {children}
      </main>
      <footer className="mx-auto max-w-[900px] border-t border-traco px-5 py-8 text-[14px] text-fumo sm:px-8">
        {t.footer}
      </footer>
    </>
  );
}
