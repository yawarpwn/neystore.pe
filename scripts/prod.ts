import fs from 'node:fs'
import products from '../src/db/db.json'
import { transformAsset } from '../src/lib/cloudinary/index'
import type { Product } from '../src/types'

// const newProducts = products.map((product) => {
// 	return {
// 		...product,
// 		createdAt: new Date().toISOString(),
// 	}
// })

// const newProducts = products.map((product) => {
// 	// let tags: string[] = []
// 	//
// 	// if (product.features) {
// 	// 	const largeString = product.features.join(' ').toLowerCase()
// 	//
// 	// 	//incluir teclados
// 	// 	if (largeString.includes('keychron')) {
// 	// 		tags.push('Mecánico', 'Custom')
// 	// 	}
// 	//
// 	// 	Object.entries(TAGS).forEach(([key, value]) => {
// 	// 		if (largeString.includes(value)) {
// 	// 			tags.push(key)
// 	// 		}
// 	// 	})
// 	// }
//
// 	const prod = {
// 		id: product.id,
// 		price: product.price,
// 		title: product.title,
// 		cost: product.cost,
// 		ranking: product.ranking,
// 		category: product.category,
// 		features: product.features,
// 		details: product.details,
// 		slug: product.slug,
// 		offert: product.offert,
// 		stock: 1,
// 		tags: [...product.tags],
// 		assets: [
// 			...product.assets.map((asset) => {
// 				return {
// 					id: asset.id,
// 					url: asset.url,
// 					format: asset.format,
// 					width: asset.width,
// 					height: asset.height,
// 					type: asset.type,
// 					publicId: asset.publicId,
// 				}
// 			}),
// 		],
// 	}
//
// 	if (product.category === 'Tecnologia') {
// 		prod.tags.push('Tecnologia')
// 	}
//
// 	return prod
// })

// fs.writeFileSync('./src/muckup/products.json', JSON.stringify(newProducts, null, 2))

fs.writeFileSync('./src/db/db.json', JSON.stringify(newProducts, null, 2))
