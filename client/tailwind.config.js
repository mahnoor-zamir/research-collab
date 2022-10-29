/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#191a23",
        baseLight: "#21232e",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
