import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Samuel Lourenço — full-stack developer";

export default function OG() {
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
        <div style={{ fontSize: 76, letterSpacing: -2 }}>Samuel Lourenço</div>
        <div style={{ fontSize: 34, color: "#9B8E81", marginTop: 12 }}>
          Full-stack developer · Maceió, Brazil
        </div>
        <div style={{ height: 4, width: 120, background: "#CE6733", marginTop: 32 }} />
      </div>
    ),
    size
  );
}
