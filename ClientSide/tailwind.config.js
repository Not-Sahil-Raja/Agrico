/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class", // or 'media' or 'class'
    extend: {
      colors: {
        pYellow: "#DFAF5E",
        oliveGreen: "#61714D",
        lightOlive: "#8FAE93",
        lightYellow: "#fffeaa",
        extralightYellow: "#fffed1",
        lightOrange: "#ffdaaa",
      },
      fontFamily: {
        NunitoSans: "Nunito Sans",
        Archivo: "Archivo",
        Epilogue: "Epilogue",
        Montserrat: "Montserrat",
        Poppins: "Poppins",
        Syne: "Syne",
      },
    },
  },
  plugins: [],
};
