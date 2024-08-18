import { uploadAsset } from '../src/lib/cloudinary'

import { input } from '@inquirer/prompts'
;(async () => {
	const videoUrl = await input({ message: 'video url' })
	const [error, response] = await uploadAsset(videoUrl, 'video')

	if (error) console.log('Error uploadin ', error)
	console.log({
		id: crypto.randomUUID(),
		url: response?.secure_url,
		publicId: response?.public_id,
		width: response?.width,
		height: response?.height,
		format: response?.format,
		type: response?.resource_type,
	})
})()
