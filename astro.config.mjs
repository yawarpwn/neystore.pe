import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icons from 'astro-icons'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://ney-store.vercel.app',
  base: '/',
  trailingSlash: 'never',
  output: 'static',
  compressHTML: true,
  scopedStyleStrategy: 'attribute',
  build: {
    assets: '_astro',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icons(),
    icon(),
  ],
})

