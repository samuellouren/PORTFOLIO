import type { NextConfig } from "next";
import { CV_FILES } from "./data/content";

// O atributo `download` do <a> so vale nos navegadores que o implementam:
// webviews e navegadores embutidos em apps o ignoram e seguem o
// Content-Disposition do servidor. A Vercel serve PDF de public/ como
// `inline`, entao nesses navegadores o toque nao salva nada — e no Chrome e
// no Firefox o `inline` ainda sobrescreve o nome de arquivo escolhido.
// Forcar `attachment` aqui tira o download da mao do cliente.
const cvHeaders = Object.values(CV_FILES).map(({ url, name }) => ({
  source: url,
  headers: [
    {
      key: "Content-Disposition",
      value: `attachment; filename="${name}"; filename*=UTF-8''${encodeURIComponent(name)}`,
    },
  ],
}));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  headers: async () => cvHeaders,
};

export default nextConfig;
