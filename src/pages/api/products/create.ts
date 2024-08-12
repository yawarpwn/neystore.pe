export const prepareCache = 'auto'
import type { APIRoute } from 'astro'
import { ProductsModel } from '@/models/products'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('content-type')?.includes('multipart/form-data')) {
		const formData = await request.formData()
		const title = formData.get('title') as string
		const id = await ProductsModel.create({ id: crypto.randomUUID(), title })

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Producto creado con exito' + ' ' + id,
			})
		)
	}

	return new Response(
		JSON.stringify({
			success: false,
			message: 'No se pudo crear el producto',
		})
	)
}
