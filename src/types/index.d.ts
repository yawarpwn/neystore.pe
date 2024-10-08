// type Id = string
type Id = `${string}-${string}-${string}-${string}-${string}`

export const PRODUCT_CATEGORY = {
	Toys: 'Juguetes',
	Tecnology: 'Tecnologia',
} as const

type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY]

export type ProductAsset = {
	id: Id
	thumbUrl: string
	mediumUrl: string
	smallUrl: string
	url: string
	width: number
	height: number
	publicId: string
	productId: string
	format: string
	type: 'image' | 'video'
}

export type Product = {
	id: Id
	title: string
	features: string[] | null
	details: Record<string, string> | null
	price: number
	cost: number
	ranking: number
	category: ProductCategory
	offert?: number
	stock: number
	slug: string
	assets: ProductAsset[]
	tags: string[]
}

export type DatabaseResponse<T> = DatabaseResponseSuccess<T> | DatabaseResponseFailure
