import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../context/language-context";
import Monogram from "./Monogram";

function LangToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className="flex rounded-full border border-border bg-bgAlt p-[3px]"
    >
      {["pt", "en"].map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${
              active
                ? "bg-accent text-ink"
                : "text-subtle hover:text-textSoft"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t.navAbout, href: "#sobre" },
    { label: t.navWork, href: "#projetos" },
    { label: t.navSkills, href: "#skills" },
    { label: t.navContact, href: "#contato" },
  ];

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-borderSoft bg-bg/[0.86] backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between gap-6 px-5 sm:px-7">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-text transition-opacity hover:opacity-80"
        >
          <Monogram size={30} />
          <span className="font-display text-[15px] font-semibold tracking-[0.01em] sm:text-[17px]">
            Samuel Lourenço
          </span>
        </a>

        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden items-center gap-6 lg:gap-[26px] md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors duration-200 hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <LangToggle />

          <a
            href="#contato"
            className="hidden rounded-[10px] border border-borderStrong bg-accent/10 px-4 py-[9px] text-[13px] font-semibold text-accentSoft transition-colors duration-200 hover:border-accent hover:bg-accent/20 md:inline-block"
          >
            {t.navCta}
          </a>

          <button
            type="button"
            className="text-muted transition-colors hover:text-text md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
          >
            <span className="flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-borderSoft bg-bg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4 sm:px-7">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-2 py-3 font-display text-lg text-textSoft transition-colors hover:bg-accent/10 hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contato"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block rounded-[10px] border border-borderStrong bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accentSoft"
                >
                  {t.navCta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
