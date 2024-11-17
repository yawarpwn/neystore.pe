import { DatabaseError } from '@/errors'
import { PRODUCT_CATEGORY, PRODUCT_TAGS } from '@/constants'
// type Id = `${string}-${string}-${string}-${string}-${string}`
type Id = string

export type ProductTags = keyof typeof PRODUCT_TAGS

export type ProductAsset = {
	id: Id
	url: string
	thumbUrl: string
	smallUrl: string
	mediumUrl: string
	width: number
	height: number
	publicId: string
	format: string
	type: 'image' | 'video'
}

export type Product = {
	id: Id
	title: string
	features: string[] | null | undefined
	details: Record<string, string> | null | undefined
	price: number
	cost: number
	ranking: number
	offert?: number | null
	stock: number
	slug: string
	assets: ProductAsset[]
	tags: ProductTags[]
	createdAt: string
}

export type InsertProduct = Omit<Product, 'id' | 'createdAt'>

export type UpdateProduct = Partial<InsertProduct>

type DatabaseResponseSuccess<T> = {
	data: T
	error: null
}

type DatabaseResponseFailure = {
	data: null
	error: DatabaseError
}
export type DatabaseResponse<T> = DatabaseResponseSuccess<T> | DatabaseResponseFailure
