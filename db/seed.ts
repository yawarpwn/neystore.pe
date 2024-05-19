import { db, Products, Videos, Images } from 'astro:db'
import { seedTables } from '@/lib/utils/products'

// https://astro.build/db/seed
export default async function seed() {
  const { products, images, videos } = seedTables()
  // console.log('-------------------')
  //
  let imagesQuery = []

  for (const image of images) {
    imagesQuery.push(db.insert(Images).values(image))
  }

  await db.insert(Products).values(products)
  await db.insert(Videos).values(videos)
  await db.batch(imagesQuery)
}
