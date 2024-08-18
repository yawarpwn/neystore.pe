import fs from 'node:fs'
import products from '../src/muckup/products.json'
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
			...product.images.map((img) => ({
				id: img.id,
				url: img.url,
				format: img.format,
				width: img.width,
				height: img.height,
				type: img.type,
				title: img.title,
				thumbUrl: img.thumb,
				largeUrl: img.large,
				productId: img.product_id,
				publicId: img.publid_id,
			})),
		],
	}

	if (product.video)
		prod.assets.splice(2, 0, {
			id: product.video.id,
			url: product.video.url,
			width: product.video.width,
			format: product.video.format || 'mp4',
			height: product.video.height,
			type: product.video.type,
			title: product.video.title,
			cover: product.video.cover,
			productId: product.video.product_id,
			publicId: product.video.public_id ?? product.video.publid_id,
		})

	return prod
})

fs.writeFileSync('./src/muckup/new-products.json', JSON.stringify(newProducts))
