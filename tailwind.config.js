/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fundos
        bg: "#1F1510",
        bgAlt: "#2B1D14",
        // Cards e superfícies
        surface: "#3D2A1E",
        surfaceAlt: "#33231A",
        // Traços
        border: "#4A3527",
        borderSoft: "#402C1F",
        borderStrong: "#6B4B33",
        // Acentos
        accent: "#C9915B",
        accentSoft: "#E0AE79",
        gold: "#B8860B",
        // Texto
        text: "#EDE4D8",
        textSoft: "#D8C7B6",
        muted: "#B9A492",
        subtle: "#9C8778",
        faint: "#8A7466",
        ink: "#241811",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      boxShadow: {
        card: "0 20px 40px -30px rgba(20,10,4,0.9)",
        cardLg: "0 34px 60px -40px rgba(20,10,4,0.95)",
        panel: "0 40px 80px -50px rgba(20,10,4,0.95)",
        cta: "0 16px 32px -16px rgba(201,145,91,0.75)",
      },
    },
  },
  plugins: [],
};
