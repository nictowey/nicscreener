/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#38bdf8",
        secondary: "#818cf8"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
