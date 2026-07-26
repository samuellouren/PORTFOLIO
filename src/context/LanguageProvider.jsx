import { useCallback, useEffect, useMemo, useState } from "react";
import { content } from "../data/content";
import { LANGS, LanguageContext } from "./language-context";

const STORAGE_KEY = "portfolio-lang";

function initialLang() {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (LANGS.includes(saved)) return saved;
  // Sem preferência salva: só cai pro inglês se o navegador não for PT.
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next) => {
    if (LANGS.includes(next)) setLangState(next);
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, t: content[lang] ?? content.pt }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
