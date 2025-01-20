/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4ade80", // Olive green
        blackLight: "#9ca3af",
        secondary: "#f0fdf4", // Beige gold
        light: "#ffffff", // White
      },
    },
  },
  plugins: [require('daisyui'),],
}

