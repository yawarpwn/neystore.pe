import { type Page } from 'playwright'
import { chromium } from 'playwright'

function cleanData(data: string) {
	let cleanedData = data.split(/\s+/).join(' ').trim()
	const regex = /[^a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ¿¡,.]/g
	cleanedData = cleanedData.replace(regex, '')
	return cleanedData
}

export async function extractTitleFromAliExpress(page: Page) {
	const titles = await page.locator('h1').all()
	const title = (await titles[0].textContent()) || 'Default title'

	const cleanedTitle = cleanData(title)
	return cleanedTitle
}

export async function extractImagesFromAliExpress(page: Page): Promise<string[]> {
	const imagesEl = await page.locator('.slider--img--K0YbWW2 > img').all()
	let images = []
	for (const imgEl of imagesEl) {
		const src = (await imgEl.getAttribute('src')) as string
		//thumb image --> https://ae01.alicdn.com/kf/Sf1ee08e24c1a469caad908568bce42bfC/Lenovo-auriculares-inal-mbricos-LP40-Pro-TWS-cascos-deportivos-con-Bluetooth-5-1-reducci-n-de.jpg_80x80.jpg_.webp
		//https://ae-pic-a1.aliexpress-media.com/kf/S5336e00098ac49df99e8927581c7c1ddf.jpg_220x220q75.jpg_.avif
		const replaced = src.replace(/(80x80|120x120|220x220)/, '1000x1000')
		console.log(replaced)

		images.push(replaced)
	}
	return images
}

export async function extractDetailsFromAliExpress(
	page: Page
): Promise<Record<string, string> | null> {
	// await page
	//   .locator('#nav-specification')
	//   .getByRole('button', { name: 'Ver más' })
	//   .click()

	const itemsList = await page.locator('.specification--line--iUJOqof').all()

	let details: Record<string, string> = {}

	for (const item of itemsList) {
		const key = (await item.locator('div > div > span').first().textContent()) as string
		const value = (await item.locator('div > div > span').nth(1).textContent()) as string
		details[key.trim()] = value.trim()
	}

	return !details ? null : details
}

export async function extractVideoFromAliExpress(page: Page, title: string) {
	try {
		const videoEl = page.locator('video')

		const poster = await videoEl.getAttribute('poster')
		if (!poster) return null

		const sourceEl = videoEl.locator('source')
		const src = await sourceEl.getAttribute('src')

		if (!src) return null

		return {
			cover: poster,
			url: src,
			title,
		}
	} catch (error) {
		console.log('video not found')
		return null
	}
}

export async function scrapProductFromAliExpress(url: string): Promise<any> {
	const browser = await chromium.launch({ headless: false })
	// const context = await browser.newContext()
	const page = await browser.newPage()

	page.setDefaultTimeout(30000)
	await page.goto(url)

	const title = await extractTitleFromAliExpress(page)
	// TODO: scrap features
	// const features = await extractFeaturesFromAmazon(page)
	const images = await extractImagesFromAliExpress(page)
	// TODO: scrap video
	// const video = await extractVideoFromAliExpress(page, title)
	const details = await extractDetailsFromAliExpress(page)

	const product = {
		title,
		details: null,
		features: null,
		video: null,
		images,
	}

	// await context.close()
	await browser.close()

	return product
}
