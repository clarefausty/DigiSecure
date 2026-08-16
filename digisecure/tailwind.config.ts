import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        digi: {
          dark: "#1F2E24",      // deepest bg (below hero green)
          forest: "#344D3C",     // primary dark green (hero bg, primary buttons)
          sage: "#71AA83",       // secondary green (feature buttons)
          mist: "#EBEEEC",       // light green input bg
          fog: "#ECEDF1",        // light blue-grey input bg
          ice: "#E1E6E3",        // light text on dark bg
          slate: "#C3C8D5",      // link / accent blue
          steel: "#9FA1A1",      // placeholder grey
          cyan: "#26D2D0",       // logo accent
        },
      },
      fontFamily: {
        display: ["var(--font-raleway)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        xl2: "16px",
      },
      maxWidth: {
        app: "430px",
      },
    },
  },
  plugins: [],
};
export default config;
