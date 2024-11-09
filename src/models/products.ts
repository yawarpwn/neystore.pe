import { productsTable } from '@/db/schemas'
import type { Product, InsertProduct, UpdateProduct, DatabaseResponse } from '@/types'

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
	static async getAll(): Promise<DatabaseResponse<Product[]>> {
		try {
			return []
		} catch (error) {}
	}

	static async getById(id: Product['id']): Promise<DatabaseResponse<Product | null>> {
		try {
		} catch (error) {}
	}

	static async create(product: InsertProduct) {}

	static async update(product: UpdateProduct, id: Product['id']) {
		try {
		} catch (error) {}
	}

	static async delete(id: Product['id']) {
		try {
		} catch (error) {}
	}
}
