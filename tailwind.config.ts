/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,vue}'],
  theme: {
    fontFamly: {
      serif: ['DM Serif Display', 'serif'],
      sans: ['Be Vietnam Pro', 'sans-serif']
    },
    extend: {}
  },
  plugins: [require('daisyui')]
}
