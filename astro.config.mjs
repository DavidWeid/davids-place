import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: awsAmplify(),
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    alpinejs(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
});
