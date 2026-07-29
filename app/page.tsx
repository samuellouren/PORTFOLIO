import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Samuel Lourenço — dev full-stack",
  description:
    "Dev full-stack em Maceió. Aplicações web e mobile de ponta a ponta com React, TypeScript e Node.js.",
  alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Samuel Lourenço",
    locale: "pt_BR",
    title: "Samuel Lourenço — dev full-stack",
    description:
      "Aplicações web e mobile de ponta a ponta com React, TypeScript e Node.js.",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Home lang="pt" />;
}
