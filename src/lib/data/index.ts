import { db, Products, Videos, Images } from 'astro:db'
import productsJson from '@/muckup/total-product.json'
import { transformAsset } from '@/lib/cloudinary/index'

// export async function getProducts() {
//   const products = await db.select().from(Products)
//   const images = await db.select().from(Images)
//   const videos = await db.select().from(Videos)
//
//   const mappedProduct = []
//
//   for (const product of products) {
//     const imagesForProduct = images.filter(
//       (img) => img.product_id === product.id,
//     )
//
//     const videoForProduct = videos.find(
//       (video) => video.product_id === product.id,
//     )
//
//     mappedProduct.push({
//       ...product,
//       images: imagesForProduct,
//       video: videoForProduct,
//     })
//   }
//
//   return mappedProduct
// }

export async function getProducts() {
  return productsJson.map((prod) => ({
    ...prod,
    images: prod.images.map((img) => ({
      ...img,
      title: prod.title,
      url: transformAsset(img.publid_id, {
        height: 500,
        crop: 'scale',
      }),
      thumb: transformAsset(img.publid_id, {
        height: 100,
        crop: 'thumb',
      }),
    })),
  }))
}
