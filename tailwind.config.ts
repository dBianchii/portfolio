import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
