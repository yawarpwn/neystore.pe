// import { db, Products, Comment, Category } from 'astro:db'
// import { asDrizzleTable } from '@astrojs/db/utils';
// import { seedTables } from '@/lib/utils/products'
import productsJson from '@/muckup/products.json'
// import { uploadAsset } from '@/lib/cloudinary'

// https://astro.build/db/seed
export default async function seed() {
	// const response = await db.insert(
	// 	productsJson.map((prod) => ({
	// 		id: prod.id,
	// 		title: prod.title,
	// 		price: prod.price,
	// 		cost: prod.cost,
	// 		features: prod.features,
	// 		details: prod.details,
	// 	}))
	// )

	db.insert(Category).values([
		{
			id: '1',
			title: 'Juguetes',
		},
		{
			id: '2',
			title: 'Tecnologia',
		},
	])

	console.log('seed complete')
	// for (const product of productsJson) {
	//    const {id, title, price, cost, ranking, category, features, details} = product
	// 	// product.images.map(async (img) => {
	// 	// 	// const [error, data] = uploadAsset(img.url)
	// 	// })
	// }
	// const { products, images, videos } = seedTables()
	// // console.log('-------------------')
	// //
	// let imagesQuery = []
	//
	// for (const image of images) {
	//   imagesQuery.push(db.insert(Images).values(image))
	// }
	//
	// await db.insert(Products).values(products)
	// await db.insert(Videos).values(videos)
	// await db.batch(imagesQuery)
}
