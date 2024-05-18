import type { Product } from '@/types'
import {
  extractTitleFromAmazon,
  extractVideoFromAmazon,
  extractImagesFromAmazon,
  extractFeaturesFromAmazon,
  extractDetailsFromAmazon,
} from '@/lib/scrap'
import products from '../muckup/products.json'
import { chromium } from 'playwright'
import fs from 'node:fs/promises'

type ProductRaw = {
  title: string
  imagesLinks: string[]
  features: string[]
  details: Record<string, string> | null
}

async function scrapAmazonProduct(url: string) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const title = await extractTitleFromAmazon(page)
  const features = await extractFeaturesFromAmazon(page)
  const images = await extractImagesFromAmazon(page)
  const video = await extractVideoFromAmazon(page)
  const details = await extractDetailsFromAmazon(page)

  await browser.close()

  const product = {
    title,
    details,
    features,
    video,
    images,
  }

  return product
}

function saveProduct(product: Product) {
  const updateProducts = [...products, product]

  fs.writeFile(
    './src/muckup/update-products.json',
    JSON.stringify(updateProducts),
  )
    .then((data) => console.log('saved product', data))
    .catch((error) => console.log(error))
}

async function main() {
  // const tablerUrl =
  //   'https://www.amazon.com/-/es/magn%C3%A9ticas-may%C3%BAsculas-min%C3%BAsculas-motricidad-Montessori/dp/B09X9HF8BB/ref=sr_1_6?__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-6'
  const rompecabezasUrl =
    'https://www.amazon.com/Rompecabezas-magn%C3%A9tico-Montessori-habilidades-sensoriales/dp/B0CP5XQ2DR/ref=sxin_16_pa_sp_search_thematic_sspa?__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&cv_ct_cx=Rompecabezas+magn%C3%A9tico+de+letras+del+alfabeto+laberinto%2C+juguetes+Montessori+de+habilidades+motoras+finas+para+ni%C3%B1os+de+3+a%C3%B1os+en+adelante%2C+juguetes+sensoriales+para+ni%C3%B1as+y+ni%C3%B1os%2C+juguetes&pd_rd_i=B0CP5XQ2DR&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-3-364cf978-ce2a-480a-9bb0-bdb96faa0f61-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&psc=1'
  const expresionUrl =
    'https://www.amazon.com/-/es/Rompecabezas-Montessori-educativos-aprendizaje-preescolar/dp/B0CGLQ7ZWV/ref=sr_1_8?__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-8'

  const productFromAmazon = await scrapAmazonProduct(expresionUrl)

  const id = crypto.randomUUID()

  const productToSave: Product = {
    id,
    ...productFromAmazon,
    price: 0,
    cost: 0,
    category: 'Juguetes',
    ranking: 5,
  }

  console.log({ productToSave })
  saveProduct(productToSave)
}

main()
