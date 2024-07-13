import { db, Products, Videos, Images } from 'astro:db'
import productsJson from '@/muckup/products.json'

export async function getProducts() {
	return productsJson
}
