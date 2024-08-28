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
	const url = v2.url(publicId, options)
	return url
}
