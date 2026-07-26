import { useLanguage } from "../context/language-context";
import { contacts, CV_FILES } from "../data/content";
import Reveal from "./Reveal";

export default function Contact() {
  const { lang, t } = useLanguage();
  const cv = CV_FILES[lang];

  return (
    <section
      id="contato"
      className="mx-auto max-w-[1120px] border-t border-borderSoft px-5 py-16 sm:px-7 sm:pb-24 sm:pt-[88px]"
    >
      <Reveal className="rounded-[26px] border border-border bg-[linear-gradient(150deg,#3D2A1E_0%,#33231A_60%,#2B1D14_100%)] p-7 shadow-panel sm:p-[52px] sm:py-14">
        <div className="eyebrow mb-4 block sm:mb-[18px]">{t.contactLabel}</div>

        <h2 className="mb-4 font-display text-[clamp(2rem,6vw,2.875rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-text">
          {t.contactTitle}
        </h2>

        <p className="mb-9 max-w-[480px] text-[16.5px] leading-[1.7] text-muted text-pretty sm:mb-10">
          {t.contactSub}
        </p>

        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          {contacts.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target={c.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 rounded-2xl border border-border bg-bg/[0.55] px-5 py-5 text-text transition-colors duration-200 hover:border-accent hover:bg-accent/[0.09]"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                {c.label}
              </span>
              <span className="break-all text-[14.5px] font-semibold">
                {c.value}
              </span>
            </a>
          ))}
        </div>

        <a
          href={cv.url}
          download={cv.name}
          className="inline-block rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-ink shadow-cta transition-colors duration-200 hover:bg-gold hover:text-bg"
        >
          {t.ctaCv} <span aria-hidden="true">↓</span>
        </a>
      </Reveal>
    </section>
  );
}
