import { getProducts } from '@/lib/data'
import { uploadAsset } from '@/lib/cloudinary'
import productsJson from '@/muckup/products.json'
import { db } from 'astro:db'
;(async () => {
  console.log(db)
})()
