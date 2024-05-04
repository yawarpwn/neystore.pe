import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://ney-store.vercel.app',
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
  ],
})
