import productsJson from '@/muckup/new-products.json'
import type { Product } from '@/types'
import { transformAsset } from '../cloudinary'

export async function getProducts(): Promise<Product[]> {
	const productsMapped = productsJson.map((product) => {
		return {
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
						thumbUrl: transformAsset(asset.publicId, {
							height: 100,
							crop: 'thumb',
						}),
						smallUrl: transformAsset(asset.publicId, {
							height: 200,
							crop: 'scale',
						}),
						mediumUrl: transformAsset(asset.publicId, {
							height: 500,
							crop: 'scale',
						}),
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
	})

	return productsMapped
}
