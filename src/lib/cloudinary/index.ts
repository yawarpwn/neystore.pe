import {
	v2 as cloudinary,
	type UploadApiResponse,
	type UploadApiOptions,
	type TransformationOptions,
	type ConfigAndUrlOptions,
} from 'cloudinary'

import { envs } from '../../config/index'

cloudinary.config({
	cloud_name: 'dyshhk5h6',
	api_key: '533526923894852',
	api_secret: envs.CLOUDINARY_API_SECRET,
})

export async function uploadAsset(
	file: string,
	type: 'image' | 'video'
): Promise<[undefined, UploadApiResponse] | [Error, undefined]> {
	try {
		const data = await cloudinary.uploader.upload(file, {
			folder: 'neystore',
			resource_type: type ?? 'image',
		})

		return [undefined, data]
	} catch (error) {
		console.log(error)
		return [new Error('Error uploading asset to cloudinary'), undefined]
	}
}

export function transformAsset(
	publicId: string,
	options: TransformationOptions | ConfigAndUrlOptions
) {
	const url = cloudinary.url(publicId, options)
	return url
}
