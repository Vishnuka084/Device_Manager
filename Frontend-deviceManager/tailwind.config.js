/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Lex:['Lexend'],
        Poppins:['Poppins'],
        Zet:['Lexend Zetta'],
        Nunito:['Nunito'],
        Euclid:['Euclid Circular A']
      }
    },
  },
  plugins: [],
}