/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        '7.5xl': '96rem', // 1536px (halfway between 7xl and full)
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
