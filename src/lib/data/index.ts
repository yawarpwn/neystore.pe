import productsJson from '@/muckup/products.json'

import { v2 } from 'cloudinary'

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
			offert: product.offert,
			stock: product.stock,
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
						publicId: asset.publicId,
					}
				}),
			],
		}
	})

	return productsMapped
}
