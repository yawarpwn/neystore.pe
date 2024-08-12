export type * from '../db/schemas'

export const PRODUCT_CATEGORY = {
	Toys: 'Juguetes',
	Tecnology: 'Tecnologia',
} as const

type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY]

type DatabaseResponseSuccess<T> = {
	data: T
	error: null
}

type DatabaseResponseFailure = {
	data: null
	error: DatabaError
}

export type DatabaseResponse<T> = DatabaseResponseSuccess<T> | DatabaseResponseFailure
