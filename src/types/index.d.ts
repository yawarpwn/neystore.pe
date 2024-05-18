export const PRODUCT_CATEGORY = {
  Toys: 'Juguetes',
  Tecnology: 'Tecnologia',
} as const

type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY]

export type ProductImage = {
  thumb: string
  url: string
}

export type ProductVideo = {
  cover: string
  url: string
  title: string
}
export type Product = {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  images: ProductImage[]
  features: string[]
  details: Record<string, string> | null
  video: ProductVideo | null
  price: number
  cost: number
  ranking: number
  category: ProductCategory
}
