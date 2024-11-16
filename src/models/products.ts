import { Database } from '@/db'
import databaseJson from '@/db/db.json'

import type {
	Product,
	InsertProduct,
	UpdateProduct,
	DatabaseResponse,
	ProductTags,
} from '@/types/index'
import { DatabaseError } from '@/errors'

export class ProductsModel {
	static async getAll(
		filter: { category?: ProductTags } | undefined = {}
	): Promise<DatabaseResponse<Product[]>> {
		const { category } = filter

		try {
			// const { products } = data
			//
			const { products } = databaseJson

			const filterdProducts = category
				? products.filter((p) =>
						p.tags.map((t) => t.toLowerCase()).includes(category.toLowerCase())
					)
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
			const db = new Database()
			await db.read()
			const { products } = db.data

			const product = products.find((p) => p.id === id)

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
			const db = new Database()
			await db.read()
			const { products } = db.data
			const id = crypto.randomUUID()
			products.push({
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
			const db = new Database()
			await db.read()
			const { products } = db.data

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
