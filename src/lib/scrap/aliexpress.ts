import { type Page } from 'playwright'
import { chromium } from 'playwright'

function cleanData(data: string) {
  let cleanedData = data.split(/\s+/).join(' ').trim()
  const regex = /[^a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ¿¡,.]/g
  cleanedData = cleanedData.replace(regex, '')
  return cleanedData
}

export async function extractTitleFromAliExpress(page: Page) {
  const title = (await page.locator('h1').textContent()) || 'Default title'
  const cleanedTitle = cleanData(title)
  return cleanedTitle
}

//main image --> https://ae01.alicdn.com/kf/Sf1ee08e24c1a469caad908568bce42bfC/Lenovo-auriculares-inal-mbricos-LP40-Pro-TWS-cascos-deportivos-con-Bluetooth-5-1-reducci-n-de.jpg_.webp
//thumb image --> https://ae01.alicdn.com/kf/Sf1ee08e24c1a469caad908568bce42bfC/Lenovo-auriculares-inal-mbricos-LP40-Pro-TWS-cascos-deportivos-con-Bluetooth-5-1-reducci-n-de.jpg_80x80.jpg_.webp
export async function extractImagesFromAliExpress(
  page: Page,
): Promise<string[]> {
  const imagesEl = await page.locator('.slider--img--D7MJNPZ > img').all()
  let images = []
  for (const imgEl of imagesEl) {
    const src = (await imgEl.getAttribute('src')) as string
    //thumb image --> https://ae01.alicdn.com/kf/Sf1ee08e24c1a469caad908568bce42bfC/Lenovo-auriculares-inal-mbricos-LP40-Pro-TWS-cascos-deportivos-con-Bluetooth-5-1-reducci-n-de.jpg_80x80.jpg_.webp
    const replaced = src.replace('_80x80.jpg_.webp', '')

    images.push(replaced)
  }

  console.log(images)
  return images
}

export async function extractDetailsFromAliExpress(
  page: Page,
): Promise<Record<string, string> | null> {
  await page
    .locator('#nav-specification')
    .getByRole('button', { name: 'Ver más' })
    .click()

  const itemsList = await page.locator('.specification--line--iUJOqof').all()

  let details: Record<string, string> = {}

  for (const item of itemsList) {
    const key = (await item
      .locator('div > div > span')
      .first()
      .textContent()) as string
    const value = (await item
      .locator('div > div > span')
      .nth(1)
      .textContent()) as string
    details[key.trim()] = value.trim()
  }

  return !details ? null : details
}

type ProductRaw = {
  title: string
  details: Record<string, string> | null
  features: string[] | null
  video: {
    url: string
    cover: string
    title: string
  } | null
  images: string[]
}

export async function scrapProductFromAliExpress(
  url: string,
): Promise<ProductRaw> {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await browser.newPage()

  page.setDefaultTimeout(30000)
  await page.goto(url)

  const title = await extractTitleFromAliExpress(page)

  // TODO: scrap features
  // const features = await extractFeaturesFromAmazon(page)
  const images = await extractImagesFromAliExpress(page)
  // TODO: scrap video
  // const video = await extractVideoFromAmazon(page)
  const details = await extractDetailsFromAliExpress(page)

  const product = {
    title,
    details,
    features: null,
    video: null,
    images,
  }

  await context.close()
  await browser.close()

  return product
}
