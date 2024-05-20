import type { Product } from '../src/types'
import products from '../src/muckup/products.json'
import { scrapAmazonProduct } from './amazon'
import fs from 'node:fs/promises'
import readline from 'node:readline/promises'
import { uploadAsset, transformAsset } from '../src/lib/cloudinary/index'

const CATEGORIES = {
  1: 'Juguetes',
  2: 'Tecnologia',
}

function isValidUrl(text: string) {
  return
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    const url = await rl.question('Url to scrap \n')
    const productFromAmazon = await scrapAmazonProduct(url)

    console.log(productFromAmazon)

    const canUploadImage = await rl.question('Subo la imagen (Y/N) \n')
    if (canUploadImage.toLowerCase() === 'n') return

    let video
    const price = await rl.question('Dame un precio \n')
    const cost = await rl.question('Dame un Costo \n')
    const ranking = await rl.question('Dame un ranking de 1 - 5')
    const category = await rl.question('--1 Juguetes \n --2 Tecnologia \n')
    rl.close()

    const id = crypto.randomUUID()

    //format video
    if (productFromAmazon.video) {
      const [error, data] = await uploadAsset(
        productFromAmazon.video.url,
        'video',
      )
      if (error) console.log('ERROR UPLOADIN VIDEO', error)
      if (data) {
        video = {
          id: crypto.randomUUID(),
          url: data.secure_url,
          format: data.format,
          width: data.width,
          height: data.height,
          product_id: id,
          publid_id: data.public_id,
          type: data.resource_type,
          cover: productFromAmazon.video.cover,
          title: productFromAmazon.video.title,
        }
      } else {
        video = null
      }
    }

    console.log('sucess: ---upload video')

    //Guardar imagenes  en cloudinary
    const images = await Promise.all(
      productFromAmazon.images.map(async (url) => {
        const [error, data] = await uploadAsset(url)
        if (error) console.log('ERROR UPLOADING IMAGE')
        if (data) {
          return {
            id: crypto.randomUUID(),
            large: data.secure_url,
            url: transformAsset(data.public_id, {
              height: 500,
              crop: 'scale',
            }),
            format: data.format,
            width: data.width,
            height: data.height,
            product_id: id,
            publid_id: data.public_id,
            type: data.resource_type,
            title: productFromAmazon.title,
            thumb: transformAsset(data.public_id, {
              height: 100,
              crop: 'thumb',
            }),
          }
        }
      }),
    )
    console.log('sucess: ---upload images')

    const product = {
      id,
      title: productFromAmazon.title,
      features: productFromAmazon.features,
      details: productFromAmazon.details,
      price: Number(price),
      cost: Number(cost),
      category: CATEGORIES[category],
      ranking: Number(ranking),
      images,
      video: video,
    }

    fs.writeFile('./src/muckup/new-product.json', JSON.stringify(product))
      .then((data) => console.log('saved product', data))
      .catch((error) => console.log(error))
  } catch (error) {
    console.log('error, ', error)
  }
}

main()
