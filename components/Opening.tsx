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
            <span>{t.openToRemote}</span>
          </div>
        </div>
      }
    >
      <h1 className="entrada max-w-[560px] font-display text-[clamp(1.9rem,5.5vw,2.9rem)] font-semibold leading-[1.12]">
        Samuel Lourenço
      </h1>
      <p className="entrada mt-4 max-w-[560px] text-[17px] leading-[1.7] text-serragem">
        {t.heroSub}
      </p>
      <p className="mt-3 max-w-[560px] text-[16px] text-fumo">{t.workSub}</p>
      <div className="mt-7 flex flex-wrap items-center gap-5 text-[15px]">
        <a
          href="#projetos"
          className="-my-2.5 border-b border-brasa py-2.5 font-display text-serragem transition-colors hover:text-brasa"
        >
          {t.ctaWork} <span aria-hidden="true">↓</span>
        </a>
        <a
          href={cv.url}
          download={cv.name}
          className="-my-2.5 border-b border-traco-forte py-2.5 font-display text-fumo transition-colors hover:border-brasa hover:text-serragem"
        >
          {t.ctaCv} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </Ruled>
  );
}
