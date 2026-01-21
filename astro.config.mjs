import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint';
import compressor from 'astro-compressor';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: 'https://davids-place-portfolio.web.app',
  trailingSlash: 'never',
  output: 'server',

  prefetch: {
    prefetchAll: true,
  },

  image: {
    responsiveStyles: false,
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: 'light-plus',
        dark: 'dark-plus',
      },
    },
  },

  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date('2025-08-19'),
    }),
    showTailwindcssBreakpoint({
      breakpoints: {
        m: '0px',
        t: '768px',
        l: '1024px',
        d: '1440px',
        dxl: '1920px',
      },
    }),
    compressor(),
  ],

  experimental: {
    svgo: true,
  },

  server: {
    open: true,
  },

  adapter: node({
    mode: 'middleware',
  }),
});
