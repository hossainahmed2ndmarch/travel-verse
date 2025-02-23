/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: "var(--primary-bg-color)",
        secondaryBg: "var(--secondary-bg-color)",
        primaryText: "var(--primary-text-color)",
        secondaryText: "var(--secondary-text-color)",
      },
    },
  },
  plugins: [require('daisyui'),],
}

