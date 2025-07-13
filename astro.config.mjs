import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint';
import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://davidweid.github.io',
  base: '/davids-place',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
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
      lastmod: new Date('2025-07-06'),
    }),
    showTailwindcssBreakpoint({
      breakpoints: {
        t: '768px',
        l: '1024px',
        d: '1440px',
        dxl: '1920px',
      },
    }),
    compressor(),
  ],
  server: {
    open: true,
  },
});
