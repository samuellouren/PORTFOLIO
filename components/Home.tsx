import type { Lang } from "@/data/types";
import Ruled from "@/components/Ruled";
import MarginNote from "@/components/MarginNote";

export default function Home({ lang }: { lang: Lang }) {
  return (
    <main id="conteudo" lang={lang === "pt" ? "pt-BR" : "en"}>
      <Ruled margin={<MarginNote>teste</MarginNote>}>
        <h1>Samuel Lourenço</h1>
      </Ruled>
    </main>
  );
}
