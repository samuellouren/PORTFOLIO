import CaseField from "./CaseField";
import { content } from "@/data/content";
import { pick, type Lang, type Project } from "@/data/types";

// Problema/Origem -> Decisao -> Resultado. Campo ausente nao renderiza; sem
// nenhum dos tres, nao sai nem o <dl>.
export default function CaseFields({ project: p, lang }: { project: Project; lang: Lang }) {
  if (!p.contexto && !p.decisao && !p.resultado) return null;
  const t = content[lang];
  return (
    <dl>
      {p.contexto ? (
        <CaseField label={pick(p.contexto.label, lang)}>{pick(p.contexto, lang)}</CaseField>
      ) : null}
      {p.decisao ? <CaseField label={t.caseDecision}>{pick(p.decisao, lang)}</CaseField> : null}
      {p.resultado ? <CaseField label={t.caseResult}>{pick(p.resultado, lang)}</CaseField> : null}
    </dl>
  );
}
