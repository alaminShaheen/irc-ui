/** @type {import("tailwindcss").Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#093C55",
        "secondary": "#F5F5F5",
        "orange": "#F36C27",
        "tertiary": "#F3F5F6",
        "off-white": "#FAFBFC"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: []
  }
};

