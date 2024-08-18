import products from '../src/muckup/products.json'

const newProducts = products.map((product) => {
	const prod = {
		id: product.id,
		price: product.price,
		cost: product.cost,
		ranking: product.ranking,
		category: product.category,
		features: product.features,
		details: product.details,
		assets: [
			...product.images.map((img) => ({
				id: img.id,
				url: img.url,
				format: img.format,
				width: img.width,
				height: img.height,
				type: img.type,
				title: img.title,
			})),
		],
	}

	if (product.video)
		prod.assets.push({
			id: product.video.id,
			url: product.video.url,
			width: product.video.width,
			height: product.video.height,
			type: product.video.type,
			title: product.video.title,
		})

	return prod
})

console.log(newProducts)
