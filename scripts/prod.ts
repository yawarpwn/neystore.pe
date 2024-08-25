import fs from 'node:fs'
import products from '../src/muckup/new-products.json'
import type { Product } from '../src/types'

// {
// 	"id": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 	"price": 70,
// 	"title": "Juguetes para niños pequeños, tarjetas didácticas en español, 224 palabras visuales, juguetes de terapia del habla de bolsillo, tarjetas flash bilingües, juguetes sensoriales para autismo para niños autistas, juguetes Montessori de aprendizaje, color azul",
// 	"cost": 38,
// 	"ranking": 4.7,
// 	"category": "Juguetes",
// 	"features": [
// 		"Versión bilingüe en inglés y español Juguetes de aprendizaje para niños pequeños: Las tarjetas flash parlantes para niños pequeños incluyen una máquina de tarjetas de aprendizaje y 225 tarjetas de doble cara 510 palabras a la vista que cubren 31 temas, agregando tres canciones para niños. Grandes juguetes Montessori para niños y niñas de más de 3 años. Puede ayudar a su hijo a ejercitar la escucha, mejorar la capacidad cognitiva y mejorar eficazmente la memoria y la concentración de los niños.",
// 		"Tarjetas educativas de aprendizaje inteligentes: diseñadas por profesores, una excelente herramienta para el uso de la educación en casa o en el aula preescolar, el juguete educativo interactivo también cuenta con sonidos realistas de simulación de animales y automóviles, que es bueno para inspirar las habilidades fonológicas de los niños y las ilustraciones coloridas y los sonidos divertidos pueden atraer la atención de los niños y el interés de aprendizaje.",
// 		"Aplicable tanto para el hogar como para la clase: estos juguetes para niños pequeños pueden ser utilizados por padres y maestros para enseñar a los más pequeños a aprender a hablar, ampliar el vocabulario y reforzar las palabras de vista de una manera mucho más interesante, especialmente útil para que los niños autistas desarrollen la capacidad del habla.",
// 		"Fácil de usar: Coloque la tarjeta en la ranura del lector de tarjetas, el lector de tarjetas pronunciará las palabras. Cuando se inserta una tarjeta de animal o una tarjeta de transporte, el lector de tarjetas reproducirá el sonido real de animales o de transporte. Presione el botón de repetición para repetir la pronunciación y el efecto de sonido. Este juguete Montessori mantiene a los niños lejos del teléfono móvil y las tabletas, reduce el tiempo de pantalla de manera efectiva.",
// 		"Regalos perfectos para niños de más de 3 años: es un gran juguete educativo para niños de 3, 4, 5, 6 años. Esta será tu elección perfecta para regalos divertidos de juguetes de aprendizaje para niños. Se aplica tanto para el hogar como para la clase. Juega con los niños, disfruta del tiempo familiar harmonius mientras aprendes y juegas."
// 	],
// 	"details": {
// 		"Tema": "510 Palabras Rosa",
// 		"Marca": "ACMEMATION",
// 		"Talla": "Toddler",
// 		"Material": "Plástico",
// 		"Objetivo Educativo": "Habilidades lingüísticas"
// 	},
// 	"slug": "juguetes-ninos-pequenos-tarjetas-didacticas-en-espanol-224",
// 	"assets": [
// 		{
// 			"id": "4918e821-5520-4453-9c71-c137573cad70",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164055/neystore/n8c5rscj0suct6n2xslh.jpg",
// 			"format": "jpg",
// 			"width": 1556,
// 			"height": 1476,
// 			"type": "image",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/n8c5rscj0suct6n2xslh"
// 		},
// 		{
// 			"id": "011987dd-ddaa-49ae-bfc3-b5cdf38751f8",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164055/neystore/vftp8sfxtyouteepdo64.jpg",
// 			"format": "jpg",
// 			"width": 1600,
// 			"height": 1591,
// 			"type": "image",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/vftp8sfxtyouteepdo64"
// 		},
// 		{
// 			"id": "624714c6-9c81-49e9-b8c4-935df73efff0",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/video/upload/v1716164051/neystore/a5fuje14bdqs5hzdtrzc.mp4",
// 			"format": "mp4",
// 			"width": 854,
// 			"height": 480,
// 			"type": "video",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/a5fuje14bdqs5hzdtrzc"
// 		},
// 		{
// 			"id": "d139ee08-c1ef-49b5-8a18-4840a92205b0",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164055/neystore/zlx8dltwkcqzdohiskl9.jpg",
// 			"format": "jpg",
// 			"width": 1600,
// 			"height": 1564,
// 			"type": "image",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/zlx8dltwkcqzdohiskl9"
// 		},
// 		{
// 			"id": "46f2cd75-eae9-472c-923f-bbc41b8656db",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164055/neystore/a7yooiyt0nkkt9ue5udo.jpg",
// 			"format": "jpg",
// 			"width": 1600,
// 			"height": 1585,
// 			"type": "image",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/a7yooiyt0nkkt9ue5udo"
// 		},
// 		{
// 			"id": "491b71c2-82a3-4a0a-94e7-5f9faef38573",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164055/neystore/ujkzkcyvae1l19nestsv.jpg",
// 			"format": "jpg",
// 			"width": 1600,
// 			"height": 1600,
// 			"type": "image",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/ujkzkcyvae1l19nestsv"
// 		},
// 		{
// 			"id": "d9b459e1-8cde-46b6-ba17-329214f95bf8",
// 			"url": "https://res.cloudinary.com/dyshhk5h6/image/upload/v1716164055/neystore/dvml1she6ewk8fdlp5br.jpg",
// 			"format": "jpg",
// 			"width": 1600,
// 			"height": 1600,
// 			"type": "image",
// 			"productId": "d25e49d3-9441-4321-ba63-b6a8d3985b6b",
// 			"publicId": "neystore/dvml1she6ewk8fdlp5br"
// 		}
// 	]
// },

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
