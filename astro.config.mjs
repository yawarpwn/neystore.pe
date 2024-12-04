import { defineConfig, envField } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { site } from './src/config/site'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
	site: site.url,
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
		icon(),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap({
			filter: (page) =>
				page !== `${site.url}/politicas-de-devolucion` &&
				page !== `${site.url}/preguntas-frecuentes`,
		}),
	],

	serverIslands: true,
	env: {
		schema: {
			CLOUDINARY_API_SECRET: envField.string({
				context: 'server',
				access: 'secret',
			}),
			EMAIL_PASSWORD: envField.string({
				context: 'server',
				access: 'secret',
			}),
		},
	},

	adapter: vercel(),
	// adapter: nodejs({ mode: 'standalone' }),
})
