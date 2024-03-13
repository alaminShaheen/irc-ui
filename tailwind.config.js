/** @type {import("tailwindcss").Config} */

import defaultTailwindColors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
      width: {
        checkbox: "30px"
      },
      height: {
        checkbox: "30px"
      },
      colors: {
        ...defaultTailwindColors,
        primary: {
          5: "#FAFBFC",
          25: "#F3F5F6",
          50: "#E6EBEE",
          100: "#CED8DD",
          200: "#B5C4CC",
          300: "#9DB1BB",
          400: "#849DAA",
          500: "#6B8A99",
          600: "#537788",
          700: "#3A6377",
          800: "#225066",
          900: "#093C55",
          DEFAULT: "#093C55",
        },
        secondary: {
          5: "#FFFCFB",
          25: "#FEF8F4",
          50: "#FEF0E9",
          100: "#FDE2D4",
          200: "#FBD3BE",
          300: "#FAC4A9",
          400: "#F9B593",
          500: "#F8A77D",
          600: "#F79868",
          700: "#F58952",
          800: "#F47B3D",
          900: "#F36C27",
          DEFAULT: "#F36C27",
        },
        graphite: {
          5: "#FBFBFB",
          25: "#F5F5F6",
          50: "#ECECEC",
          100: "#D9D9D9",
          200: "#C6C6C6",
          300: "#B3B3B3",
          400: "#A09FA0",
          500: "#8D8C8E",
          600: "#7A797B",
          700: "#676668",
          800: "#545355",
          900: "#414042",
          DEFAULT: "#414042",
        },
        white: {
          5: "#050505",
          25: "#0D0D0D",
          50: "#1A1A1A",
          100: "#333333",
          200: "#4D4D4D",
          300: "#666666",
          400: "#808080",
          500: "#999999",
          600: "#B2B2B2",
          700: "#CCCCCC",
          800: "#E5E5E5",
          900: "#FFFFFF",
          DEFAULT: "#FFFFFF",
        },
        focus: "#F8D177",
      },
    },
  },
};

