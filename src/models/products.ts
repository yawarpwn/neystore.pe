import { db } from '@/db'
import type { SelectProduct, InsertProduct, UpdateProduct } from '@/types'
import type { DatabaseResponse } from '@/types'
import { productsTable } from '@/db/schemas'

export class DatabaError extends Error {
	constructor(message: string) {
		super(message)
	}

	static notFound() {
		return new DatabaError('Product not found')
	}

	static internalError() {
		return new DatabaError('Internal error')
	}
}

export class ProductsModel {
	static async getAll(): Promise<DatabaseResponse<SelectProduct[]>> {
		try {
			const products = await db.select().from(productsTable)
			return {
				data: products,
				error: null,
			}
		} catch (error) {
			console.log(error)
			return {
				data: null,
				error: DatabaError.notFound(),
			}
		}
	}

	static async getById(id: SelectProduct['id']) {
		try {
		} catch (error) {}
	}

	static async create(product: InsertProduct): Promise<DatabaseResponse<string>> {
		try {
			const products = await db
				.insert(productsTable)
				.values(product)
				.returning({ id: productsTable.id })
			return {
				data: products[0].id,
				error: null,
			}
		} catch (error) {
			console.log(error)
			return {
				data: null,
				error: DatabaError.internalError(),
			}
		}
	}

	static async update(product: UpdateProduct) {
		try {
		} catch (error) {}
	}

	static async delete(id: SelectProduct['id']) {
		try {
		} catch (error) {}
	}
}
