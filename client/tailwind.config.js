/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        tahiti: {
          50: "#fafafa",
          100: "#f0f4f8",
          150: "#4cb5f9",
          200: "#252738",
          300: "#101223",
        },
      },
      fontSize: {
        xxs: ".60rem",
      },
      margin: {
        97: "24.2rem",
        100: "37rem",
        150: "48rem",
      },
      width: {
        99: "80%",
        101: "95%",
        111: "97%",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar")],
};
