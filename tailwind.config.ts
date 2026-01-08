import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["var(--font-open-sans)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
