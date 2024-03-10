/** @type {import("tailwindcss").Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '414px',
    
        },
      colors: {
        "primary": "#093C55",
        "secondary": "#F5F5F5",
        "gray": "#F3F5F6"
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: []
    
};
