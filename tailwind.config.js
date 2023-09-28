/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: { 144: "36rem", 120: "30rem" },
      keyframes: {
        "open-menu-x": {
          "0%": { transform: "scaleX(0)" },
          "80%": { transform: "scaleX(1.1)" },
          "100%": { transform: "scaleX(1)" },
        },
        "open-menu-y": {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.1)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "open-menu-x": "open-menu-x 0.4s ease-in-out forwards",
        "open-menu-y": "open-menu-y 0.3s ease-in-out forwards",
      },
      fontFamily: {
        "f-iran-sans": ["Iran Sans", "sans-serif"],
        "f-nazanin": ["Nazanin", "sans-serif"],
        "f-tahoma": ["Tahoma", "sans-serif"],
        "f-yekan": ["Yekan", "sans-serif"],
        "f-b-yekan": ["B Yekan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
