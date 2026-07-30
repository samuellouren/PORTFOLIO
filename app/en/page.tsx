import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Samuel Lourenço — full-stack developer",
  description:
    "Full-stack developer in Maceió, Brazil. End-to-end web and mobile applications with React, TypeScript and Node.js.",
  alternates: { canonical: "/en", languages: { "pt-BR": "/", en: "/en" } },
  openGraph: {
    type: "website",
    url: "/en",
    siteName: "Samuel Lourenço",
    locale: "en_US",
    title: "Samuel Lourenço — full-stack developer",
    description:
      "End-to-end web and mobile applications with React, TypeScript and Node.js.",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Home lang="en" />;
}
