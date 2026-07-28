import "./globals.css";
import { bricolage, newsreader } from "./fonts";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
