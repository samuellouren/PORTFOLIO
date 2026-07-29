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
      <main id="conteudo" lang={lang === "pt" ? "pt-BR" : "en"}>
        <Opening lang={lang} />
      </main>
      <footer className="mx-auto max-w-[900px] border-t border-traco px-5 py-8 text-[14px] text-fumo sm:px-8">
        {t.footer}
      </footer>
    </>
  );
}
