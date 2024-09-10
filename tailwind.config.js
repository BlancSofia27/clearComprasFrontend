/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        celeste: "#2fae93",
        slate:"#cbd5e1",
        smooke: "#C4C4C4",
        whitee:"#c7ced8",
        greyStep:"#E8E8E8",
        },
        screens:{
          xs:'300px',
        }
    },
  },
  plugins: [],
};


