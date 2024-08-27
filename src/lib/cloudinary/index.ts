import {
	v2,
	type UploadApiResponse,
	type UploadApiOptions,
	type TransformationOptions,
	type ConfigAndUrlOptions,
} from 'cloudinary'

import { cloudinary } from './client'

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
	const url = v2.url(publicId, options)
	return url
}
