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
        brand: {
          bg: "#0B0F19",
          card: "#161D30",
          primary: "#2563EB",
          primaryHover: "#1D4ED8",
          success: "#16A34A",
          warning: "#EAB308",
          danger: "#DC2626",
          text: "#F3F4F6",
          textSecondary: "#9CA3AF",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
