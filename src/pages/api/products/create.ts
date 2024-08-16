export const prepareCache = 'auto'
import type { APIRoute } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import { ProductsModel } from '@/models/products'
import { Cloudinary } from '@/lib/cloudinary'

export const prerender = false

type Product = {
	title: string
	images: {
		url: string
	}[]
	video: {
		url: string
	} | null
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const uploadPaths = path.join(import.meta.dirname, 'uploads/temp')
		if (!fs.existsSync(uploadPaths)) {
			fs.mkdirSync(uploadPaths, { recursive: true })
		}

		cb(null, uploadPaths)
	},
	filename: (req, file, cb) => {
		const uniqueName = Date.now() + '-' + file.originalname
		cb(null, uniqueName)
	},
})

const upload = multer({ storage })

export const POST: APIRoute = async ({ request }) => {
	const r = upload.single('filepond')
	const formData = await request.formData()
	const file = formData.get('filepond') as File
	console.log(file)
	return new Response(JSON.stringify({ error: 'Not implemented' }), {
		status: 200,
	})
}

export const DELETE: APIRoute = async ({ request }) => {
	console.log('DELETE')
	console.log(await request.formData())
	return new Response(JSON.stringify({ error: 'Not implemented' }), {
		status: 200,
	})
}
