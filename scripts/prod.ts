import fs from 'node:fs'
import products from '../src/muckup/products.json'
import type { Product } from '../src/types'

// <<<<<<< HEAD
// =======
// 		"cost": 75,
// 		"ranking": 5,
// 		"category": "Juguetes",
// >>>>>>> 4221fdd (add tags)

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

// {
// 	"id": "bcbc7129-71e4-44e0-a5ef-5f2fd788329c",
// 	"title": "Tablero de actividades Montessori de madera con 8 interruptores de luz LED, juguetes sensoriales para niños de 1 a 3 años",
// 	"features": [
// 		"Especialmente diseñada para niños pequeños que aman los interruptores y las luces LED. Hay 8 interruptores diferentes configurados en esta placa ocupada, y cada interruptor corresponde a un color o estilo diferente de luz LED. ",
// 		"El brillo de cada LED se ajusta para que sea justo para el bebé, no demasiado brillante, demasiado deslumbrante o demasiado oscuro para ver con claridad.",
// 		"Este juguete sensorial puede ejercitar la capacidad de pensamiento del bebé y la capacidad práctica.",
// 		"Este es el juguete de viaje perfecto que hará que tu bebé se calme y haga lo suyo.",
// 		"Fuerte y resistente a diferencia de otros métodos de producción de busyboard en el mercado, nuestra tabla sensorial está cortada en una sola pieza de troncos en lugar de enchapar pegada. Cada tabla ocupada para bebés se muele cuidadosamente a mano para garantizar una superficie lisa. La tabla ocupada no tiene bordes afilados ni partes pequeñas que se desprendan fácilmente. No tienes que preocuparte de que tu bebé lo rompa."
// 	],
// 	"details": {
// 		"Tamaño": "7.5 x 3.9 x 2 pulgadas",
// 		"Material": "Madera",
// 		"Cantidad Leds": "8",
// 		"Pilas": "AA (NO incluidas)",
// 		"Edad": "1 a 5 años"
// 	},
// 	"price": 100,
// 	"cost": 60,
// 	"category": "Juguetes",
// 	"ranking": 4,
// 	"slug": "montessori-tablero-madera-8-interruptores-luz-led-juguetes",
// 	"assets": [
// 		{
// 			"id": "71bf8383-4add-4c18-8b95-ecf56915d71e",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1726176794/neystore/wz3wrta9hv70pzwetfjs.jpg",
// 			"format": "jpg",
// 			"width": 427,
// 			"height": 457,
// 			"publicId": "neystore/wz3wrta9hv70pzwetfjs",
// 			"type": "image"
// 		},
// 		{
// 			"id": "037f8940-ea7c-463e-b91e-e8097d0355d8",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1726176794/neystore/f5yvdii5xe7x72va8a3u.jpg",
// 			"format": "jpg",
// 			"width": 500,
// 			"height": 498,
// 			"publicId": "neystore/f5yvdii5xe7x72va8a3u",
// 			"type": "image"
// 		},
//
// 		{
// 			"id": "d531e1eb-20f7-4392-a796-dcbaf0530faf",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/video/upload/v1726176944/neystore/hlec5xkpmm3gfbjyqwii.mp4",
// 			"publicId": "neystore/hlec5xkpmm3gfbjyqwii",
// 			"width": 1920,
// 			"height": 1080,
// 			"format": "mp4",
// 			"type": "video"
// 		},
// 		{
// 			"id": "392c6550-a6ab-44ee-be96-07e7ccbf5543",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1726176794/neystore/mzboszqwequk39fm8vn8.jpg",
// 			"format": "jpg",
// 			"width": 500,
// 			"height": 500,
// 			"publicId": "neystore/mzboszqwequk39fm8vn8",
// 			"type": "image"
// 		},
// 		{
// 			"id": "9709e3b8-ebf6-4403-a86c-8caee9a27f89",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1726176794/neystore/emzi61tvl6aj2ssn2h5z.jpg",
// 			"format": "jpg",
// 			"width": 500,
// 			"height": 500,
// 			"publicId": "neystore/emzi61tvl6aj2ssn2h5z",
// 			"type": "image"
// 		},
// 		{
// 			"id": "743a984f-6ad0-4c71-b371-39d09a3d6d5d",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1726176794/neystore/wbnsgxphemobtccyjtgi.jpg",
// 			"format": "jpg",
// 			"width": 500,
// 			"height": 500,
// 			"publicId": "neystore/wbnsgxphemobtccyjtgi",
// 			"type": "image"
// 		},
// 		{
// 			"id": "c1719eff-1c8b-476b-880f-46a579678250",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1726176794/neystore/ofrrul59o0x7tusbb5tg.jpg",
// 			"format": "jpg",
// 			"width": 500,
// 			"height": 500,
// 			"publicId": "neystore/ofrrul59o0x7tusbb5tg",
// 			"type": "image"
// 		}
// 	]
// }

const newProducts = products.map((product) => {
	let tags: string[] = []

	if (product.features) {
		const largeString = product.features.join(' ').toLowerCase()

		//incluir teclados
		if (largeString.includes('keychron')) {
			tags.push('Mecánico', 'Custom')
		}

		Object.entries(TAGS).forEach(([key, value]) => {
			if (largeString.includes(value)) {
				tags.push(key)
			}
		})
	}

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
		tags,
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

fs.writeFileSync('./src/muckup/products.json', JSON.stringify(newProducts, null, 2))
