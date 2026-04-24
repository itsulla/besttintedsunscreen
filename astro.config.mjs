import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://besttintedsunscreen.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    preact(),
  ],
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: "astro-preact-opts-stub",
            setup(build) {
              build.onResolve({ filter: /^astro:preact:opts$/ }, () => ({
                path: "astro:preact:opts",
                namespace: "astro-preact-opts-stub",
              }));
              build.onLoad({ filter: /.*/, namespace: "astro-preact-opts-stub" }, () => ({
                contents: "export default {}",
                loader: "js",
              }));
            },
          },
        ],
      },
    },
  },
});