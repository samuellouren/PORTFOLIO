import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Cartao OG no tema do site: fundo torra, texto serragem, traco brasa.
// `kicker` e opcional e sai acima do titulo (usado nos estudos de caso).
export function renderOg({
  title,
  subtitle,
  kicker,
}: {
  title: string;
  subtitle: string;
  kicker?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#14100D",
          color: "#E9E1D5",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {kicker ? (
          <div style={{ fontSize: 26, color: "#9B8E81", letterSpacing: 4, marginBottom: 16 }}>
            {kicker.toUpperCase()}
          </div>
        ) : null}
        <div style={{ fontSize: 76, letterSpacing: -2 }}>{title}</div>
        <div style={{ fontSize: 34, color: "#9B8E81", marginTop: 12 }}>{subtitle}</div>
        <div style={{ height: 4, width: 120, background: "#CE6733", marginTop: 32 }} />
      </div>
    ),
    ogSize
  );
}
