import { JSONFilePreset } from 'lowdb/node'
import type {
	Product,
	InsertProduct,
	UpdateProduct,
	DatabaseResponse,
	ProductTags,
} from '@/types/index'
import { DatabaseError } from '@/errors'

type Data = {
	products: Product[]
}

const defaultData: Data = {
	products: [],
}

const JSON_PRODUCTS_PATH = './src/db/db.json'

export class ProductsModel {
	static async getAll(
		filter: { category?: ProductTags } | undefined = {}
	): Promise<DatabaseResponse<Product[]>> {
		const { category } = filter

		const isDevelopment = process.env.NODE_ENV === 'development'
		const URL = isDevelopment
			? 'http://localhost:4321/api/products'
			: 'https://neystore.pe/api/products'

		try {
			const data = (await fetch(URL).then((res) => {
				if (!res.ok) throw new Error('Error obteniendo productos')
				return res.json()
			})) as Data
			const { products } = data

			const filterdProducts = category
				? products.filter((p) => p.tags.includes(category))
				: products

			return {
				data: filterdProducts,
				error: null,
			}
		} catch (error) {
			return {
				data: null,
				error: DatabaseError.internalError('Erorr obteniendo productos en DB'),
			}
		}
	}

	static async getById(id: Product['id']): Promise<DatabaseResponse<Product>> {
		try {
			const db = await JSONFilePreset<Data>(JSON_PRODUCTS_PATH, defaultData)
			await db.read()
			const product = db.data.products.find((p) => p.id === id)

			if (!product) throw new Error('Producto con id: ' + id + 'no encontrado')

			return {
				data: product,
				error: null,
			}
		} catch (error) {
			return {
				error: DatabaseError.notFound('Producto con id: ' + id + 'no encontrado'),
				data: null,
			}
		}
	}

	static async create(product: InsertProduct): Promise<DatabaseResponse<{ id: Product['id'] }>> {
		try {
			const db = await JSONFilePreset<Data>(JSON_PRODUCTS_PATH, defaultData)
			await db.read()
			const id = crypto.randomUUID()
			db.data.products.push({
				...product,
				id,
				createdAt: new Date().toISOString(),
			})

			await db.write()
			return {
				data: { id },
				error: null,
			}
		} catch (error) {
			return {
				data: null,
				error: DatabaseError.internalError('Error creando producto en DB'),
			}
		}
	}

	static async update(
		product: UpdateProduct,
		id: Product['id']
	): Promise<DatabaseResponse<{ id: Product['id'] }>> {
		try {
			const db = await JSONFilePreset<Data>(JSON_PRODUCTS_PATH, defaultData)
			db.update((data) => data.products.map((p) => (p.id === id ? product : p)))

			return {
				data: { id },
				error: null,
			}
		} catch (error) {
			return {
				data: null,
				error: DatabaseError.internalError('Error actualizando producto con id: ' + id),
			}
		}
	}

	static async delete(id: Product['id']) {
		try {
		} catch (error) {}
	}
}
