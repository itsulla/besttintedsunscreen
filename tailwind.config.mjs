/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        dmserif: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        cream: {
          50: "#FBF9F4",
          100: "#F5F1E8",
          200: "#EDE6D3",
        },
        ink: {
          900: "#1A1814",
          800: "#2A251E",
          700: "#3D362C",
          600: "#5A5044",
          500: "#7A6E5E",
          400: "#9B907E",
          300: "#BDB4A3",
        },
        sun: {
          50: "#FFF8EB",
          100: "#FFEFCE",
          200: "#FEDE9B",
          300: "#FDC668",
          400: "#FBAA3A",
          500: "#F18F1C",
          600: "#D66F0A",
          700: "#A6530B",
          800: "#7A3E0E",
          900: "#5A2E0C",
        },
        glow: {
          bg:     "#FFF8F1",
          bg2:    "#FFEFE0",
          panel:  "#FFF2E5",
          ink:    "#2A1A10",
          muted:  "#A07860",
          accent: "#E8B088",
          gold:   "#D4A15E",
          rose:   "#D89680",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.025em",
        widest:   "0.5em",
      },
      maxWidth: {
        prose:    "65ch",
        readable: "42rem",
        page:     "72rem",
        glow:     "90rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
