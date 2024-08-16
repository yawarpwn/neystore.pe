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

type Options = {
	folder: string
}
export class Cloudinary {
	static async uploadFromBuffer(file: File, opts?: Options): Promise<UploadApiResponse> {
		console.log('FILEEEEEEE', file)
		return
		const blob = await file.arrayBuffer()
		const buffer = new Uint8Array(blob)
		const options: UploadApiOptions = {
			folder: 'test',
			resource_type: 'auto',
			...opts,
		}

		return new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(options, (error, result) => {
					if (error) return reject(error)
					else resolve(result as UploadApiResponse)
				})
				.end(buffer)
		})
	}
}

export function transformAsset(
	publicId: string,
	options: TransformationOptions | ConfigAndUrlOptions
) {
	const url = cloudinary.url(publicId, options)
	return url
}
