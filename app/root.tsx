// Base comum dos dois root layouts — app/(pt)/layout.tsx e app/(en)/en/layout.tsx.
// O App Router so deixa o <html> no root layout, e o root layout nao sabe em
// que rota esta. Com um root layout por idioma (route groups), cada um fixa o
// seu <html lang> no servidor, sem Client Component.
import "./globals.css";
import { bricolage, newsreader } from "./fonts";
import { siteUrl } from "./site";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export const rootViewport: Viewport = {
  themeColor: "#14100D",
  // A pagina e sempre escura (spec 3): controles nativos, como os do <video>
  // e a barra de rolagem, tambem.
  colorScheme: "dark",
};

export function RootHtml({
  lang,
  children,
}: {
  lang: "pt-BR" | "en";
  children: ReactNode;
}) {
  return (
    <html lang={lang} className={`${bricolage.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
