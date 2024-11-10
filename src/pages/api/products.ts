import { type APIRoute } from 'astro'
import { type Product } from '@/types'
import path from 'node:path'
import { JSONFilePreset } from 'lowdb/node'

export const GET: APIRoute = async ({ request }) => {
	type Data = {
		products: Product[]
	}

	const defaultData: Data = {
		products: [],
	}

	const JSON_PRODUCTS_PATH = path.join('src/db/db.json')
	try {
		const db = await JSONFilePreset<Data>(JSON_PRODUCTS_PATH, defaultData)
		const { products } = db.data
		return new Response(JSON.stringify({ products }), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify({ message: 'Error obteniendo productos' }), { status: 500 })
	}
}
