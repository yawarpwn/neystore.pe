import fs from 'node:fs'
import data from '../src/db/db.json'
import { transformAsset } from '../src/lib/cloudinary/index'
import type { Product } from '../src/types'

const TAGS = {
	MONTESSORI: 'Montessori',
	PSYCHOMOTRICITY: 'Psicomotricidad',
	LANGUAGE: 'Lenguaje',
	SENSORY: 'Sensorial',
	STRESS_RELIEF: 'Antiestrés',
	KEYBOARDS: 'Teclados',
	TECHNOLOGY: 'Tecnologia',
	TOYS: 'Juguetes',
}

const newProducts = data.products.map((product) => {
	return {
		id: product.id,
		title: product.title,
		slug: product.slug,
		price: product.price,
		cost: product.cost,
		stock: product.stock,
		ranking: product.ranking,
		features: product.features,
		details: product.details,
		tags: product.tags
			.map((tag) => {
				const t = tag.toLowerCase()
				if (t === 'teclados') return 'KEYBOARDS'
				if (t === 'teclado') return 'KEYBOARDS'
				if (t === 'keychron') return 'KEYCHRON'
				if (t === 'lenguaje') return 'LANGUAGE'
				if (t === 'sensorial') return 'SENSORY'
				if (t === 'Antiestrés') return 'STRESS_RELIEF'
				if (t === 'piscomotricidad') return 'PSYCHOMOTRICITY'
				if (t === 'montessori') return 'MONTESSORI'
				if (t === 'juguetes') return 'TOYS'
				if (t === 'tecnologia') return 'TECHNOLOGY'
				return null
			})
			.filter(Boolean),
		assets: product.assets,
		createdAt: product.createdAt,
	}
})

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
