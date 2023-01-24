/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  purge: ['./src/**/*.html', './index.html', './src/**/*.js'],

  theme: {
    extend: {},
  },
  plugins: [],
};
