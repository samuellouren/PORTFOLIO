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
