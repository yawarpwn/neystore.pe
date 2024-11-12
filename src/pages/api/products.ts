import { type APIRoute } from 'astro'
import { type Product } from '@/types'
import { ProductsModel } from '@/models/products'

export const GET: APIRoute = async ({ request }) => {
	try {
		const { data: products, error } = await ProductsModel.getAll()

		if (error) throw error

		return new Response(JSON.stringify({ products }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.log(error)
		return new Response(null, { status: 500 })
	}
}
