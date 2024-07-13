// import { db, Products, Videos, Images } from 'astro:db'
import { seedTables } from "@/lib/utils/products";
import productsJson from "@/muckup/products.json";
import { uploadAsset } from "@/lib/cloudinary";

// https://astro.build/db/seed
export default async function seed() {
  for (const product of productsJson) {
    product.images.map(async (img) => {
      // const [error, data] = uploadAsset(img.url)
    });
  }
  // const { products, images, videos } = seedTables()
  // // console.log('-------------------')
  // //
  // let imagesQuery = []
  //
  // for (const image of images) {
  //   imagesQuery.push(db.insert(Images).values(image))
  // }
  //
  // await db.insert(Products).values(products)
  // await db.insert(Videos).values(videos)
  // await db.batch(imagesQuery)
}
