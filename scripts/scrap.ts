import { scrapAmazonProduct } from '../src/lib/scrap/amazon'
import { scrapProductFromAliExpress } from '../src/lib/scrap/aliexpress'
import { slugify } from '../src/lib/utils/string'
import fs from 'node:fs/promises'
import productsJson from '../src/muckup/products.json'
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

		let productScrapped
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

			if (error) {
				throw error
			}

			if (data) {
				video = {
					id: crypto.randomUUID(),
					url: data.secure_url,
					format: data.format,
					width: data.width,
					height: data.height,
					publicId: data.public_id,
					type: data.resource_type,
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
						url: data.secure_url,
						format: data.format,
						width: data.width,
						height: data.height,
						publicId: data.public_id,
						type: data.resource_type,
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
			assets: [...images],
		}

		if (video) {
			product.assets.splice(2, 0, {
				...video,
			})
		}

		const productsToUpdate = [...productsJson, product]

		fs.writeFile('./src/muckup/products.json', JSON.stringify(productsToUpdate, null, 2))
			.then((data) => console.log('saved product'))
			.catch((error) => console.log(error))
	} catch (error) {
		console.log('error, ', error)
	}
}

main()
