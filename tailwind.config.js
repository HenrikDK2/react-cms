/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: ["grid-cols-fill-2", "grid-cols-fill-3", "grid-cols-fill-4"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fill-4": "repeat(auto-fill, 245px)",
        "fill-3": "repeat(auto-fill, 348px)",
        "fill-2": "repeat(auto-fill, 554px)",
      },
    },
  },
  plugins: [],
};
