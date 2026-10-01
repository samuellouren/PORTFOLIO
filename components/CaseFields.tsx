import CaseField from "./CaseField";
import { content } from "@/data/content";
import { pick, type Lang, type Project } from "@/data/types";

// Problema/Origem -> Resultado, só na página do caso. Campo ausente não
// renderiza; sem nenhum dos dois, não sai nem o <dl>.
export default function CaseFields({ project: p, lang }: { project: Project; lang: Lang }) {
  if (!p.contexto && !p.resultado) return null;
  const t = content[lang];
  return (
    <dl>
      {p.contexto ? (
        <CaseField label={pick(p.contexto.label, lang)}>{pick(p.contexto, lang)}</CaseField>
      ) : null}
      {p.resultado ? <CaseField label={t.caseResult}>{pick(p.resultado, lang)}</CaseField> : null}
    </dl>
  );
}
