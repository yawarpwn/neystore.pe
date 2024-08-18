import { uploadAsset } from '../src/lib/cloudinary'

import { input } from '@inquirer/prompts'

async function main() {
	const imageUrl = await input({ message: 'image url' })
	const [error, response] = await uploadAsset(imageUrl, 'image')

	if (error) {
		console.log(error)
		return
	}

	console.log({
		id: crypto.randomUUID(),
		url: response?.secure_url,
		publicId: response?.public_id,
		width: response?.width,
		height: response?.height,
		format: response?.format,
		type: response?.resource_type,
	})
}

main()
