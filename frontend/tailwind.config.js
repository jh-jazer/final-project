/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lucidity: ['Lucidity Expand', 'sans-serif'], // Custom font family
      },
      fontSize: {
        base: '12px', // Change the default font size from 16px to 18px
      },
    },
  },
  plugins: [],
}
