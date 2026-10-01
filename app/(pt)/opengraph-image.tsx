import { ogSize, renderOg } from "../og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Samuel Lourenço — dev full-stack";

export default function OG() {
  return renderOg({ title: "Samuel Lourenço", subtitle: "Dev full-stack · Maceió, Alagoas" });
}
