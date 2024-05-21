import { slugify } from '../src/lib/utils/string'
import productsJson from '../src/muckup/total-product.json'
import fs from 'fs/promises'

const mappedProducts = productsJson.map((prod) => ({
  ...prod,
  slug: slugify(prod.title),
}))

fs.writeFile('src/muckup/products.json', JSON.stringify(mappedProducts))

// import { uploadAsset, transformAsset } from '@/lib/cloudinary'
// ;(async () => {
//   console.time('uploadTime()')
//   const products = []
//   for (const product of productsJson) {
//     let video
//     if (product.video) {
//       const [error, data] = await uploadAsset(product.video.url, 'video')
//       if (error) console.log('uploading video: ', error)
//       if (data) {
//         video = {
//           id: crypto.randomUUID(),
//           url: data.secure_url,
//           format: data.format,
//           width: data.width,
//           height: data.height,
//           product_id: product.id,
//           publid_id: data.public_id,
//           type: data.resource_type,
//           cover: product.video.cover,
//           title: product.video.title,
//         }
//       }
//     }
//     const mappedImages = await Promise.all(
//       product.images.map(async (img) => {
//         const [error, data] = await uploadAsset(img.url)
//         if (error) {
//           console.log('error uploading image: ', error)
//         }
//         if (data) {
//           return {
//             id: crypto.randomUUID(),
//             large: data.secure_url,
//             url: transformAsset(data.public_id, {
//               height: 500,
//               crop: 'scale',
//             }),
//             format: data.format,
//             width: data.width,
//             height: data.height,
//             product_id: product.id,
//             publid_id: data.public_id,
//             type: data.resource_type,
//             title: product.title,
//             thumb: transformAsset(data.public_id, {
//               height: 100,
//               crop: 'thumb',
//             }),
//           }
//         }
//       }),
//     )
//
//     products.push({
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       cost: product.cost,
//       category: product.category,
//       ranking: product.ranking,
//       images: mappedImages,
//       video: video ?? null,
//       features: product.features,
//       details: product.details,
//     })
//   }
//
//   fs.writeFile('src/muckup/total-product.json', JSON.stringify(products))
//   console.timeEnd('uploadTime()')
// })()
