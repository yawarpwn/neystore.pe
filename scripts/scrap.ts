import { scrapAmazonProduct } from '../src/lib/scrap/amazon'
import { ProductsModel } from '../src/models/products'
import { scrapProductFromAliExpress } from '../src/lib/scrap/aliexpress'
import { slugify } from '../src/lib/utils/string'
import type { InsertProduct, Product, ProductAsset } from '../src/types'
import { uploadAsset, transformAsset } from '../src/lib/cloudinary/index'
import {
	askCategory,
	azkRank,
	getProvider,
	askCost,
	askPrice,
	getCanUpload,
	askTags,
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
			title: productScrapped.title,
			totalImages: productScrapped.images.length,
			// images: productScrapped.images,
			hasVideo: productScrapped.video ? true : false,
			hasDetails: productScrapped.details ? true : false,
			hasFeatures: productScrapped.features ? true : false,
		})

		const canUpload = await getCanUpload()
		if (!canUpload) return

		const tags = await askTags()

		let video
		const price = await askPrice()
		const cost = await askCost()
		const ranking = await azkRank()
		const category = await askCategory()
		const id = crypto.randomUUID()

		if (productScrapped.video) {
			console.log('Uploading product video')
			const [error, data] = await uploadAsset(productScrapped.video.url, 'video')
			console.log('Product video uploaded Successfully')

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
					type: 'image',
				}  g
			}
		}

		//Guardar imagenes  en cloudinary
		const images = await Promise.all(
			productScrapped.images.map(async (url) => {
				console.log('Uploading Photo: ' + url)
				const [error, data] = await uploadAsset(url, 'image')
				if (error) {
					console.log('ERROR UPLOADING IMAGE')
					throw new Error('Error subiendo foto a cloudinary')
				}

				const photo = {
					id: crypto.randomUUID(),
					url: data.secure_url,
					format: data.format,
					width: data.width,
					height: data.height,
					publicId: data.public_id,
					type: data.resource_type,
				}

				return photo
			})
		)

		const product: InsertProduct = {
			title: productScrapped.title,
			features: productScrapped.features,
			details: productScrapped.details,
			price: Number(price),
			cost: Number(cost),
			category: category as Product['category'],
			stock: 1,
			tags, 
			ranking: Number(ranking),
			slug: slugify(productScrapped.title),
			assets: images.map(img => {
        return {
          ...img,
						thumbUrl: transformAsset(img.publicId, {
							height: 100,
							crop: 'thumb',
						}),
						smallUrl: transformAsset(img.publicId, {
							height: 200,
							crop: 'scale',
						}),
						mediumUrl: transformAsset(img.publicId, {
							height: 500,
							crop: 'scale',
						}),
        }
      }),
		}

		//Ordenar el video como item 3
		if (video) {
			product.assets.push(video)
		}

    console.log(product)

		// const { data, error } = await ProductsModel.create(product)
		// if (error) throw error
		console.log('Create a new Product Successfully')
	} catch (error) {
		console.log('error, ', error)
	}
}

main()
