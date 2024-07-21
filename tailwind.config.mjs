import defaultTheme from 'tailwindcss/defaultTheme';

export const customColors = {
  dark: '#13151a',
  light: '#f5f5f5',
  medium: '#23262d',
  accent: '#883aea',
  'accent-light': '#e0ccfa',
  'accent-dark': '#310a65',
  red: {
    dark: '#C84B44',
    light: '#F8756A',
  },
  blue: {
    dark: '#3844C6',
    light: '#5C68F3',
  },
  green: {
    dark: '#2e9c51',
    emerald: '#50C878',
    light: '#9fdeb0',
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px',
      desktopxl: '1920px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        tablet: '2rem',
        laptop: '2.25rem',
        desktop: '2.5rem',
        desktopxl: '3rem',
      },
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
      'mono-bold': 700,
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono Variable', ...defaultTheme.fontFamily.mono],
      },
      colors: customColors,
      boxShadow: {
        sharp: '12px 12px 2px 1px rgba(0, 0, 0, 0.2)',
        deep: '0 22px 70px 4px rgba(0, 0, 0, 0.6)',
        shallow: '0 11px 35px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
