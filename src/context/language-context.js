import { createContext, useContext } from "react";
import { content } from "../data/content";

export const LANGS = ["pt", "en"];

export const LanguageContext = createContext({
  lang: "pt",
  setLang: () => {},
  t: content.pt,
});

// t = dicionário do idioma ativo; lang serve para escolher campos { pt, en } nos dados.
export function useLanguage() {
  return useContext(LanguageContext);
}
