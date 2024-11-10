import { uploadAsset } from '../src/lib/cloudinary'
import { ProductsModel } from '../src/models/products'
import { transformAsset } from '../src/lib/cloudinary'

import { input } from '@inquirer/prompts'

async function main() {
	try {
		const imageUrl = await input({ message: 'image url' })
		const [error, response] = await uploadAsset(imageUrl, 'image')

		if (error || !response) {
			throw new Error('Uploading to cloudinary')
		}

		const newPhoto = {
			id: crypto.randomUUID(),
			url: response?.secure_url,
			publicId: response?.public_id,
			width: response?.width,
			height: response?.height,
			format: response?.format,
			type: response?.resource_type,
			thumbUrl: transformAsset(response?.public_id, {
				height: 100,
				crop: 'thumb',
			}),
			smallUrl: transformAsset(response.public_id, {
				height: 200,
				crop: 'scale',
			}),
			mediumUrl: transformAsset(response.public_id, {
				height: 500,
				crop: 'scale',
			}),
		}

		console.log(newPhoto)

		const productId = await input({ message: 'Product id to update' })
		const { data: productFound, error: errorProduct } = await ProductsModel.getById(productId)

		if (errorProduct) throw errorProduct

		await ProductsModel.update(
			{
				...productFound,
				assets: [...productFound.assets, newPhoto],
			},
			productId
		)
	} catch (error) {
		console.log('Error: ', error)
	}
}

main()
