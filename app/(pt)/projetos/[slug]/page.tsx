import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { featuredBySlug } from "@/data/projects";
import { caseMetadata, caseParams } from "../../../case";

type Props = { params: Promise<{ slug: string }> };

// So existem os slugs dos projetos em destaque; o resto e 404.
export const dynamicParams = false;
export const generateStaticParams = caseParams;

export async function generateMetadata({ params }: Props) {
  return caseMetadata((await params).slug, "pt");
}

export default async function Page({ params }: Props) {
  const p = featuredBySlug((await params).slug);
  if (!p) notFound();
  return <CaseStudy project={p} lang="pt" />;
}
