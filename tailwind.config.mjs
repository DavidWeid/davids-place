import defaultTheme from 'tailwindcss/defaultTheme';

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
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      black: 900,
      'mono-thin': 100,
      'mono-extralight': 200,
      'mono-light': 300,
      'mono-normal': 400,
      'mono-medium': 500,
      'mono-semibold': 600,
      'mono-bold': 700
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono Variable', ...defaultTheme.fontFamily.mono]
      },
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
