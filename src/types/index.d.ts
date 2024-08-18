// type Id = `${string}-${string}-${string}-${string}-${string}`
type Id = string

export const PRODUCT_CATEGORY = {
	Toys: 'Juguetes',
	Tecnology: 'Tecnologia',
} as const

type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY]

export type ProductImage = {
	id: Id
	thumbUrl: string
	largeUrl: string
	url: string
	width: number
	height: number
	publicId: string
	productId: string
	format: string
	type: 'image'
	title: string
}

export type ProductVideo = {
	id: Id
	cover: string
	url: string
	title: string
	width: number
	height: number
	productId: string
	publicId: string
	format: string
	format: string
	type: 'video'
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
	slug: string
	assets: (ProductVideo | ProductImage)[]
}

type ProductRaw = {
	title: string
	details: Record<string, string> | null
	features: string[]
	video: {
		url: string
		cover: string
		title: string
	} | null
	images: string[]
}
