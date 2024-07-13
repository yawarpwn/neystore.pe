import productsJson from '@/muckup/products.json'

export function seedTables() {
	const products = []
	const images = []
	const videos = []

	for (const product of productsJson) {
		const { title, price, cost, ranking, category, features, details, id } = product

		const productToInsert = {
			id,
			title,
			price,
			cost,
			ranking,
			category,
			features,
			details,
		}

		products.push(productToInsert)

		if (product.video) {
			videos.push({
				id: crypto.randomUUID(),
				cover: product.video.cover,
				title: product.video.title,
				url: product.video.url,
				product_id: id,
			})
		}

		const imagesMapped = product.images.map((img) => ({
			...img,
			product_id: id,
			id: crypto.randomUUID(),
		}))

		images.push(imagesMapped)
	}

	return { products, images, videos }
}
