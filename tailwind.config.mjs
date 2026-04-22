/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
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
          // warm sunset orange/gold as the brand color
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
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      maxWidth: {
        prose: "65ch",
        readable: "42rem",
        page: "72rem",
      },
    },
  },
  plugins: [],
};
