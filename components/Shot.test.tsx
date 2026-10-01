import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Shot from "./Shot";

// Nenhum projeto tem vídeo ainda; aqui um vídeo fictício cobre o caminho.
const video = { src: "/projects/demo.mp4", poster: "/projects/demo.jpg" };

describe("Shot", () => {
  it("sem vídeo, mostra o print", () => {
    const html = renderToStaticMarkup(<Shot src="/projects/mapas.jpeg" alt="ALT" shape="phone" />);
    expect(html).toContain("<img");
    expect(html).not.toContain("<video");
  });

  it("com vídeo, troca o print por dois <video> que o CSS alterna por reduced motion", () => {
    const html = renderToStaticMarkup(
      <Shot src="/projects/mapas.jpeg" alt="ALT" shape="phone" video={video} />
    );
    expect(html).not.toContain("<img");
    const videos = html.match(/<video[^>]*>/g) ?? [];
    expect(videos).toHaveLength(2);
    for (const v of videos) {
      for (const attr of ['muted=""', 'loop=""', 'playsInline=""', 'preload="none"',
        `poster="${video.poster}"`, 'aria-label="ALT"']) {
        expect(v).toContain(attr);
      }
    }
    const [auto, manual] = videos;
    expect(auto).toContain('autoPlay=""');
    expect(auto).not.toContain("controls");
    expect(auto).toContain("motion-reduce:hidden");
    expect(manual).toContain('controls=""');
    expect(manual).not.toContain("autoPlay");
    expect(manual).toMatch(/class="hidden [^"]*motion-reduce:block/);
    expect(html).toContain(`<source src="${video.src}"/>`);
  });
});
