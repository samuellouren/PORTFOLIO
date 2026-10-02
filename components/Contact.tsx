import Ruled from "./Ruled";
import { content, contacts } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Contact({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="contato"
      margin={
        <h2 className="font-display text-[0.75rem] uppercase tracking-[0.14em] text-fumo">
          {t.contactTitle}
        </h2>
      }
    >
      <p className="mb-5 max-w-[560px] text-[1rem]">{t.contactSub}</p>
      {/* Cada contato e uma linha pautada de largura fixa: a regua embaixo
          tem sempre o mesmo comprimento e a mesma distancia do texto,
          independente do tamanho do valor. */}
      <ul data-testid="contact" className="max-w-[560px] text-[1rem]">
        {contacts.map((c) => (
          <li key={c.id}>
            <a
              href={c.href}
              // O email e a acao principal da pagina: so ele leva brasa (spec 4.1).
              className={`group grid min-h-11 grid-cols-[92px_minmax(0,1fr)] items-baseline gap-x-4 border-b py-2.5 transition-colors ${c.id === "email" ? "border-brasa" : "border-traco-forte hover:border-brasa"}`}
            >
              <span className="font-display text-[0.75rem] uppercase tracking-[0.14em] text-fumo">
                {c.label}
              </span>
              <span className={`transition-colors [overflow-wrap:anywhere] ${c.id === "email" ? "text-brasa group-hover:text-serragem" : "group-hover:text-brasa"}`}>
                {/* Se o email nao couber, quebra antes do @, nao no meio do ".com". */}
                {c.value.includes("@") && !c.value.startsWith("@") ? (
                  <>
                    {c.value.slice(0, c.value.indexOf("@"))}
                    <wbr />
                    {c.value.slice(c.value.indexOf("@"))}
                  </>
                ) : (
                  c.value
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Ruled>
  );
}
