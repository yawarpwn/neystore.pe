import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'node:path'

import type {
	Product,
	InsertProduct,
	UpdateProduct,
	DatabaseResponse,
	ProductTags,
} from '@/types/index'
import { DatabaseError } from '@/errors'

const JSON_PRODUCTS_PATH = path.join('src/db/db.json')
const db = new Low<Product[]>(new JSONFile(JSON_PRODUCTS_PATH), [])

export class ProductsModel {
	static async getAll(
		filter: { category?: ProductTags } | undefined = {}
	): Promise<DatabaseResponse<Product[]>> {
		const { category } = filter

		try {
			await db.read()
			const filterdProducts = category ? db.data.filter((p) => p.tags.includes(category)) : db.data

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
			await db.read()
			const product = db.data.find((p) => p.id === id)

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
			const id = crypto.randomUUID()
			db.data.push({
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
			db.update((products) => products.map((p) => (p.id === id ? product : p)))

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
