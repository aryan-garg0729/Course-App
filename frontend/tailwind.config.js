/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
    addUtilities({
      '.line-clamp-3': {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '3',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
      },
    });
  },
  ],
}

