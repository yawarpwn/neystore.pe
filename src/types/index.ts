import { DatabaseError } from '@/errors'
type Id = `${string}-${string}-${string}-${string}-${string}`

export const PRODUCT_CATEGORY = {
	Toys: 'Juguetes',
	Tecnology: 'Tecnologia',
} as const

const PRODUCT_TAGS = {
	Teclados: 'teclado',
	Keychron: 'keychron',
	Montessori: 'montessori',
	Juguetes: 'juguete',
	Lenguaje: 'lenguaje',
	Sensorial: 'sensorial',
	Antiestrés: 'antiestrés',
	Autismo: 'autismo',
	Psicomotricidad: 'psicomotricidad',
} as const

type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY]

export type ProductTags = (typeof PRODUCT_TAGS)[keyof typeof PRODUCT_TAGS]

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

export type InsertProduct = Omit<Product, 'id'>

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
