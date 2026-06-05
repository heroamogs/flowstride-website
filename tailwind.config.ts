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
        primary: {
          DEFAULT: "#6D28D9", // Your signature Flowstride Purple
          dark: "#4C1D95",
          light: "#8B5CF6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
