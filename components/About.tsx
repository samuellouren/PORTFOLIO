import Ruled from "./Ruled";
import { content } from "@/data/content";
import { skills } from "@/data/projects";
import type { Lang } from "@/data/types";

export default function About({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <Ruled
      id="sobre"
      margin={
        <h2 className="font-display text-[12px] uppercase tracking-[0.14em] text-fumo">
          {t.aboutLabel}
        </h2>
      }
    >
      {t.aboutParagraphs.map((p) => (
        <p key={p} className="mb-4 max-w-[560px] text-[16px] leading-[1.75]">
          {p}
        </p>
      ))}
      <p className="mt-6 max-w-[560px] text-[15px] leading-[1.8] text-fumo">
        <span className="font-display uppercase tracking-[0.14em]">
          {t.skillsTitle}
        </span>{" "}
        — {skills.join(", ")}.
      </p>
    </Ruled>
  );
}
