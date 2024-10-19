import { defineConfig, envField } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import { site } from './src/config/site'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	site: site.url,
	trailingSlash: 'never',
	base: '/',
	output: 'hybrid',
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
		sitemap({
			filter: (page) =>
				page !== `${site.url}/politicas-de-devolucion` &&
				page !== `${site.url}/preguntas-frecuentes`,
		}),
	],

	experimental: {
		env: {
			schema: {
				CLOUDINARY_API_SECRET: envField.string({
					context: 'server',
					access: 'secret',
				}),
			},
		},
	},

	adapter: vercel(),
})
