import { ProductsModel } from '@/models/products'
import productsJson from '@/muckup/products.json'

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
	const { data, error } = await ProductsModel.getAll()

	if (error) console.log(error)
	console.log(data)
	return productsJson
}

export async function getProductById(id: string) {
	const { data, error } = await ProductsModel.getById(id)
	if (error) console.log(error)
	return data
}

export async function updateProduct(id: string, product: TODO) {}

export async function deleteProduct(id: string) {}
