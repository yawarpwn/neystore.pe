import { scrapAmazonProduct } from '../src/lib/scrap/amazon'
import { scrapProductFromAliExpress } from '../src/lib/scrap/aliexpress'
import { slugify } from '../src/lib/utils/string'
import fs from 'node:fs/promises'
import type { ProductRaw } from '../src/types/index.d.ts'
import products from '../src/muckup/products.json'
import { uploadAsset, transformAsset } from '../src/lib/cloudinary/index'
import {
	getCategory,
	getRank,
	getProvider,
	getCost,
	getPrice,
	getCanUpload,
	getUrl,
} from '../src/lib/scrap/questions'

async function main() {
	try {
		const provider = await getProvider()
		const url = await getUrl(provider)

		let productScrapped: ProductRaw
		if (provider === 'amazon') {
			productScrapped = await scrapAmazonProduct(url)
		} else {
			productScrapped = await scrapProductFromAliExpress(url)
		}

		console.log({
			productFound: true,
			title: productScrapped.title,
			totalImages: productScrapped.images.length,
			hasVideo: productScrapped.video ? true : false,
			hasDetails: productScrapped.details ? true : false,
			hasFeatures: productScrapped.features ? true : false,
		})

		const canUpload = await getCanUpload()

		if (!canUpload) return

		let video
		const price = await getPrice()
		const cost = await getCost()
		const ranking = await getRank()
		const category = await getCategory()

		const id = crypto.randomUUID()

		if (productScrapped.video) {
			const [error, data] = await uploadAsset(productScrapped.video.url, 'video')

			if (error) console.log('ERROR UPLOADIN VIDEO', error)

			if (data) {
				video = {
					id: crypto.randomUUID(),
					url: data.secure_url,
					format: data.format,
					width: data.width,
					height: data.height,
					product_id: id,
					publid_id: data.public_id,
					type: data.resource_type,
					cover: productScrapped.video.cover,
					title: productScrapped.video.title,
				}
			} else {
				video = null
			}
		}

		console.log('sucess: ---upload video')

		//Guardar imagenes  en cloudinary
		const images = await Promise.all(
			productScrapped.images.map(async (url) => {
				const [error, data] = await uploadAsset(url, 'image')
				if (error) console.log('ERROR UPLOADING IMAGE')
				if (data) {
					return {
						id: crypto.randomUUID(),
						large: data.secure_url,
						url: transformAsset(data.public_id, {
							height: 500,
							crop: 'scale',
						}),
						format: data.format,
						width: data.width,
						height: data.height,
						product_id: id,
						publid_id: data.public_id,
						type: data.resource_type,
						title: productScrapped.title,
						thumb: transformAsset(data.public_id, {
							height: 100,
							crop: 'thumb',
						}),
					}
				}
			})
		)
		console.log('sucess: ---upload images')

		const product = {
			id,
			title: productScrapped.title,
			features: productScrapped.features,
			details: productScrapped.details,
			price: Number(price),
			cost: Number(cost),
			category: category,
			ranking: Number(ranking),
			slug: slugify(productScrapped.title),
			images,
			video: video,
		}

		const productsToUpdate = [...products, product]

		fs.writeFile('./src/muckup/products.json', JSON.stringify(productsToUpdate, null, 2))
			.then((data) => console.log('saved product'))
			.catch((error) => console.log(error))
	} catch (error) {
		console.log('error, ', error)
	}
}

main()
