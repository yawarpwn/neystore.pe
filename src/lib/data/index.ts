import { db, Products, Videos, Images } from 'astro:db'

export async function getProducts() {
  const products = await db.select().from(Products)
  const images = await db.select().from(Images)
  const videos = await db.select().from(Videos)

  console.log('images', images)
  console.log('videos', videos)

  const mappedProduct = []

  for (const product of products) {
    const imagesForProduct = images.filter(
      (img) => img.product_id === product.id,
    )

    const videoForProduct = videos.find(
      (video) => video.product_id === product.id,
    )

    mappedProduct.push({
      ...product,
      images: imagesForProduct,
      video: videoForProduct,
    })
  }

  return mappedProduct
}
