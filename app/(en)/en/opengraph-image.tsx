import { ogSize, renderOg } from "../../og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Samuel Lourenço — full-stack developer";

export default function OG() {
  return renderOg({ title: "Samuel Lourenço", subtitle: "Full-stack developer · Maceió, Brazil" });
}
