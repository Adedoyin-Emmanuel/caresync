import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9333ea",
          secondary: "#A67EF1",
          accent: "#C0A3F5",
          neutral: "#8b5cf6",
          natural: "#C0A3F5",
          "base-100": "#f3f4f6",
          info: "#62CCF9",
          success: "#2CC98F",
          warning: "#FBC337",
          error: "#F76464",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
