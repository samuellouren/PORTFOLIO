import type { Lang } from "@/data/types";

export default function Home({ lang }: { lang: Lang }) {
  return (
    <main id="conteudo" lang={lang === "pt" ? "pt-BR" : "en"}>
      {/* seções entram nas Tasks 6-9 */}
    </main>
  );
}
