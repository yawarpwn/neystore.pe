import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://neystore.vercel.app',
  base: '/',
  trailingSlash: 'never',
  output: 'static',
  compressHTML: true,
  scopedStyleStrategy: 'attribute',
  build: {
    assets: '_astro',
  },
  integrations: [tailwind()]
});
