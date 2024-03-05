import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://davidweid.github.io',
  base: '/davids-place',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true
  },
  integrations: [alpinejs(), tailwind({ applyBaseStyles: false }), mdx()]
});
