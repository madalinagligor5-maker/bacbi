import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          ink: "var(--primary-ink)",
          soft: "var(--primary-soft)",
        },
        accent: { DEFAULT: "var(--accent)", soft: "var(--accent-soft)" },
        success: { DEFAULT: "var(--success)", soft: "var(--success-soft)" },
        danger: { DEFAULT: "var(--danger)", soft: "var(--danger-soft)" },
        warn: { DEFAULT: "var(--warn)", soft: "var(--warn-soft)" },
      },
      fontFamily: {
        sans: ["var(--font-text)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-text)", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
