import {
  extractTitleFromAmazon,
  extractVideoFromAmazon,
  extractImagesFromAmazon,
  extractFeaturesFromAmazon,
  extractDetailsFromAmazon,
} from '../src/lib/scrap'
import { chromium } from 'playwright'

type ProductRaw = {
  title: string
  imagesLinks: string[]
  features: string[]
  details: Record<string, string> | null
}

export async function scrapAmazonProduct(url: string) {
  const browser = await chromium.launch({ headless: false })
  // const context = await browser.newContext()
  const page = await browser.newPage()

  page.setDefaultTimeout(30000)
  await page.goto(url)

  const title = await extractTitleFromAmazon(page)
  const features = await extractFeaturesFromAmazon(page)
  const images = await extractImagesFromAmazon(page)
  const video = await extractVideoFromAmazon(page)
  const details = await extractDetailsFromAmazon(page)

  // await context.close()
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
