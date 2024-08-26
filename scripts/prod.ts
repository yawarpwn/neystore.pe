import fs from 'node:fs'
import products from '../src/muckup/products.json'
import type { Product } from '../src/types'

const newProducts = products.map((product) => {
	const prod = {
		id: product.id,
		price: product.price,
		title: product.title,
		cost: product.cost,
		ranking: product.ranking,
		category: product.category,
		features: product.features,
		details: product.details,
		slug: product.slug,
		assets: [
			...product.assets.map((asset) => {
				return {
					id: asset.id,
					url: asset.url,
					format: asset.format,
					width: asset.width,
					height: asset.height,
					type: asset.type,
					publicId: asset.publicId,
				}
			}),
		],
	}

	return prod
})

fs.writeFileSync('./src/muckup/products.json', JSON.stringify(newProducts))
