import fs from 'node:fs'
import products from '../src/muckup/products.json'
import type { Product } from '../src/types'

const TAGS = {
	Teclados: 'teclado',
	Keychron: 'keychron',
	Montessori: 'montessori',
	Juguetes: 'juguete',
	Lenguaje: 'lenguaje',
	Sensorial: 'sensorial',
	Antiestrés: 'antiestrés',
	Autismo: 'autismo',
	Psicomotricidad: 'psicomotricidad',
}

const newProducts = products.map((product) => {
	// let tags: string[] = []
	//
	// if (product.features) {
	// 	const largeString = product.features.join(' ').toLowerCase()
	//
	// 	//incluir teclados
	// 	if (largeString.includes('keychron')) {
	// 		tags.push('Mecánico', 'Custom')
	// 	}
	//
	// 	Object.entries(TAGS).forEach(([key, value]) => {
	// 		if (largeString.includes(value)) {
	// 			tags.push(key)
	// 		}
	// 	})
	// }

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
		offert: product.offert,
		stock: 1,
		tags: [...product.tags],
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

	if (product.category === 'Tecnologia') {
		prod.tags.push('Tecnologia')
	}

	return prod
})

fs.writeFileSync('./src/muckup/products.json', JSON.stringify(newProducts, null, 2))
