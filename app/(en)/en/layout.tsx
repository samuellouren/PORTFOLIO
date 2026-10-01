import { RootHtml, rootMetadata, rootViewport } from "../../root";
import type { ReactNode } from "react";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
