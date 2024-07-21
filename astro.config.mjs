import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: defineConfig({
    ssr: {
      external: ['tailwind.config.mjs'],
    }
  }),
  site: 'https://davidweid.github.io',
  base: '/davids-place',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
});
