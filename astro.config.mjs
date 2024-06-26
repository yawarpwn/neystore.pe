import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'

import db from '@astrojs/db'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.neystore.pe',
  trailingSlash: 'never',
  base: '/',
  output: 'static',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  scopedStyleStrategy: 'attribute',
  build: {
    assets: '_astro',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    sitemap(),
    db(),
  ],
})
