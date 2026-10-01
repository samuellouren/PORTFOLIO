import Link from "next/link";
import { content } from "@/data/content";
import { homeHref, type Lang } from "@/data/types";

export default function Header({
  lang,
  alternateHref,
  onHome,
}: {
  lang: Lang;
  // A mesma pagina no outro idioma.
  alternateHref: string;
  onHome: boolean;
}) {
  const t = content[lang];
  const home = homeHref(lang);
  const rotulo = lang === "pt" ? "EN" : "PT";
  // Fora da home as ancoras precisam voltar para ela.
  const ancora = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);

  return (
    <header className="mx-auto flex max-w-[900px] flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-traco px-5 py-5 sm:px-8">
      <Link
        href={home}
        className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-serragem"
      >
        Samuel Lourenço
      </Link>
      <nav className="flex items-baseline gap-5 text-[14px] text-fumo">
        {/* Ancoras internas: hover em serragem. O brasa fica pra acao. */}
        <a className="-my-3 py-3 transition-colors hover:text-serragem" href={ancora("projetos")}>{t.navWork}</a>
        <a className="-my-3 py-3 transition-colors hover:text-serragem" href={ancora("sobre")}>{t.navAbout}</a>
        <a className="-my-3 py-3 transition-colors hover:text-serragem" href={ancora("contato")}>{t.navContact}</a>
        <Link
          className="-my-3 py-3 transition-colors hover:text-brasa"
          href={alternateHref}
          hrefLang={lang === "pt" ? "en" : "pt-BR"}
        >
          {rotulo}
        </Link>
      </nav>
    </header>
  );
}
