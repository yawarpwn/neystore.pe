export const prepareCache = 'auto'
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('content-type')?.includes('multipart/form-data')) {
		const formData = await request.formData()
		console.log(formData)
	}

	return new Response(
		JSON.stringify({
			success: true,
			message: 'Producto creado con exito',
		})
	)
}
