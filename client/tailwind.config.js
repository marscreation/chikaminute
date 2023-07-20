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
        },
      },
      fontSize: {
        xxs: ".50rem",
      },
    },
  },
  plugins: [],
};
