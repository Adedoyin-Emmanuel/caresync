import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          "1": "#EEF6FC",
          "5": "#DCEDF9",
          "10": "#CBE5F6",
          "20": "#BADCF3",
          "30": "#A8D3F0",
          "40": "#97CAED",
          "50": "#86C2EA",
          "100": "#74B9E7",
          "200": "#63BOE3",
          "300": "#52A7E0",
          "400": "#3498DB",
          "500": "#2F96DA",
          "600": "#258CD0",
          "700": "#2280BF",
          "800": "#1F74AD",
          "900": "#1C699C",
        },
      },
    },
  },
  plugins: [],
};
export default config
