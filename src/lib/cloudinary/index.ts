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

// type Result<T = void, E extends Error = Error> = T | E

type Result<T, E> = [undefined, T] | [E, undefined]

function isError<T>(value: T): value is T & Error {
	return value instanceof Error
}

export async function uploadAsset(
	file: string,
	type: 'image' | 'video'
): Promise<[undefined, UploadApiResponse] | [Error, undefined]> {
	try {
		const data = await cloudinary.uploader.upload(file, {
			folder: 'neystore',
			resource_type: type ?? 'auto',
		})

		return [undefined, data]
	} catch (error) {
		return [new Error('Error uploading file'), undefined]
	}
}

export function transformAsset(
	publicId: string,
	options: TransformationOptions | ConfigAndUrlOptions
) {
	const url = cloudinary.url(publicId, options)
	return url
}
