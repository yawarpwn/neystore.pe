import fs from 'node:fs'
import products from '../src/muckup/new-products.json'
import type { Product } from '../src/types'

const newProducts: Product[] = products.map((product) => {
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
					url: asset.largeUrl ?? asset.url,
					format: asset.format,
					width: asset.width,
					height: asset.height,
					type: asset.type,
					productId: asset.productId,
					publicId: asset.publicId,
				}
			}),
		],
	}

	return prod
})

fs.writeFileSync('./src/muckup/new-products.json', JSON.stringify(newProducts))
