import productsJson from '@/muckup/products.json'
import type { Product } from '@/types'

class ProductError extends Error {
	constructor(message: string) {
		super(message)
	}

	static notFound() {
		return new ProductError('Product not found')
	}

	static internalError() {
		return new ProductError('Internal Server error')
	}
}

type TODO = any

export async function getProducts() {
	return productsJson
}

export async function getProductById(
	id: string
): Promise<{ data: Product | null; error: ProductError | null }> {
	try {
		const product = productsJson.find((p) => p.id === id)

		if (!product) {
			return {
				data: null,
				error: ProductError.notFound(),
			}
		}

		return {
			data: product,
			error: null,
		}
	} catch (error) {
		return {
			data: null,
			error: ProductError.internalError(),
		}
	}
}

export async function updateProduct(id: string, product: TODO) {}

export async function deleteProduct(id: string) {}
