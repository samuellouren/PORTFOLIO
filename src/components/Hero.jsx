import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/language-context";
import { CV_FILES } from "../data/content";

export default function Hero() {
  const { lang, t } = useLanguage();
  const cv = CV_FILES[lang];
  const reduceMotion = useReducedMotion();

  // Entrada escalonada do conteúdo above-the-fold.
  const intro = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.3, 1] },
        };

  return (
    <section className="mx-auto max-w-[960px] px-5 pb-20 pt-16 text-center sm:px-7 sm:pb-[104px] sm:pt-24">
      <motion.div
        {...intro(0.05)}
        className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-bgAlt px-3.5 py-[7px] sm:mb-[30px]"
      >
        <span className="h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_0_4px_rgba(184,134,11,0.18)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold sm:text-[11px]">
          {t.heroStatus}
        </span>
      </motion.div>

      <motion.h1
        {...intro(0.12)}
        className="mx-auto mb-6 max-w-[820px] font-display text-[clamp(2.25rem,8vw,4.625rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-text text-pretty sm:mb-[26px]"
      >
        {t.heroB1} <em className="italic text-accent">{t.heroB2}</em>
      </motion.h1>

      <motion.p
        {...intro(0.2)}
        className="mx-auto mb-9 max-w-[600px] text-[16px] leading-[1.75] text-muted text-pretty sm:text-[17.5px]"
      >
        {t.heroSub}
      </motion.p>

      <motion.div
        {...intro(0.28)}
        className="mb-14 flex flex-wrap justify-center gap-3 sm:mb-16"
      >
        <a
          href="#projetos"
          className="rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-ink shadow-cta transition-colors duration-200 hover:bg-gold hover:text-bg"
        >
          {t.ctaWork}
        </a>
        <a
          href={cv.url}
          download={cv.name}
          className="rounded-xl border border-[#5A4030] px-6 py-3.5 text-sm font-semibold text-textSoft transition-colors duration-200 hover:border-accent hover:bg-accent/[0.08] hover:text-text"
        >
          {t.ctaCv}
        </a>
      </motion.div>

      <motion.div
        {...intro(0.36)}
        className="grid gap-7 border-y border-borderSoft py-7 text-left sm:py-[30px] md:grid-cols-3 md:gap-[26px]"
      >
        {t.menu.map((item) => (
          <div key={item.n} className="flex items-baseline gap-3.5">
            <span className="font-mono text-[11px] text-gold">0{item.n}</span>
            <div>
              <div className="mb-[5px] font-display text-[19px] text-text">
                {item.title}
              </div>
              <div className="text-[13.5px] leading-[1.6] text-subtle">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
