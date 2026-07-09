/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EF",
        sage: "#8FAE8A",
        tomato: "#D9644A",
        ink: "#241F1C",
        cocoa: "#6B4F3F",
      },
    },
  },
  plugins: [],
};
