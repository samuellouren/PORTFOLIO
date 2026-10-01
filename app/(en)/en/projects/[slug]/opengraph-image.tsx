import { ogSize } from "../../../../og";
import { caseOg, caseParams } from "../../../../case";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study — Samuel Lourenço";
export const generateStaticParams = caseParams;

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  return caseOg((await params).slug, "en");
}
