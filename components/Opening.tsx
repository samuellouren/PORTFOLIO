import Ruled from "./Ruled";
import { content, CV_FILES } from "@/data/content";
import type { Lang } from "@/data/types";

export default function Opening({ lang }: { lang: Lang }) {
  const t = content[lang];
  const cv = CV_FILES[lang];

  return (
    <Ruled
      margin={
        <div className="text-[13px] leading-[1.7] text-fumo">
          <div>Maceió, AL</div>
          <div className="mt-1 flex items-center gap-2 min-[900px]:justify-end">
            <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-full bg-verdete" />
            <span>{lang === "pt" ? "aberto a remoto" : "open to remote"}</span>
          </div>
        </div>
      }
    >
      <h1 className="max-w-[560px] font-display text-[clamp(1.9rem,5.5vw,2.9rem)] font-600 leading-[1.12]">
        Samuel Lourenço
      </h1>
      <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-serragem">
        {t.heroSub}
      </p>
      <p className="mt-3 max-w-[560px] text-[16px] text-fumo">{t.workSub}</p>
      <div className="mt-7 flex flex-wrap items-center gap-5 text-[15px]">
        <a
          href="#projetos"
          className="border-b border-brasa pb-[2px] font-display text-serragem transition-colors hover:text-brasa"
        >
          {t.ctaWork} ↓
        </a>
        <a
          href={cv.url}
          download={cv.name}
          className="border-b border-traco-forte pb-[2px] font-display text-fumo transition-colors hover:border-brasa hover:text-serragem"
        >
          {t.ctaCv} ↓
        </a>
      </div>
    </Ruled>
  );
}
