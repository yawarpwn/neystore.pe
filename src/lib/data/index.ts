import { db, Products, Videos, Images } from 'astro:db'
import productsJson from '@/muckup/total-product.json'

export async function getProducts() {
  return productsJson
}
