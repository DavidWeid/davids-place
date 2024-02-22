/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: '768px',
      laptop: '1024px',
      desktop: '1400px'
    },
    extend: {
      colors: {
        dark: '#13151a',
        light: '#f5f5f5',
        medium: '#23262d',
        accent: '#883aea',
        'accent-light': '#e0ccfa',
        'accent-dark': '#310a65'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
