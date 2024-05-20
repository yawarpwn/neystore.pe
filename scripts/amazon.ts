import { chromium, type Page, type Locator } from 'playwright'
import fs from 'node:fs'
import { title } from 'process'

// const url =
//   'https://www.amazon.com/Imploding-Kittens-First-Expansion-Exploding/dp/B01HSIIFQ2/]?th=1'
//
const url =
  'https://www.amazon.com/-/es/dp/B09X9HF8BB?psc=1&ref=ppx_yo2ov_dt_b_product_details'
/**
* Save data as list of dictionaries
as json file
* @param {object} data
*/
function saveData(data: string) {
  let dataStr = JSON.stringify(data, null, 2)
  fs.writeFile('data.json', dataStr, 'utf8', function (err) {
    if (err) {
      console.log('An error occurred while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}

function cleanData(data: string) {
  if (!data) {
    return
  }
  // removing extra spaces and unicode characters
  let cleanedData = data.split(/\s+/).join(' ').trim()
  cleanedData = cleanedData.replace(/[^\x00-\x7F]/g, '')
  return cleanedData
}

// The data extraction function used to extract
// necessary data from the element.

async function extractData(data: Locator, type: 'innerText') {
  let count = await data.count()
  if (count) {
    if (type == 'innerText') {
      return await data.innerText()
    } else {
      return await data.getAttribute(type)
    }
  }
  return null
}

async function parsePage(page: Page) {
  // initializing xpaths
  let titleXPath = "h1[id='title']"
  let ratingXPath =
    "//div[@id='prodDetails']//i[contains(@class,'review-stars')]/span"
  let sellingPriceXPath = "//input[@id='priceValue']"
  let imgLinkXPath = "//div[contains(@class,'imgTagWrapper')]//img"
  let brandXPath =
    "//tr[contains(@class,'po-brand')]//span[@class='a-size-base po-break-word']"
  let statusXPath =
    "//div[@id='availabilityInsideBuyBox_feature_div']//div[@id='availability']/span"
  let descriptionULXPath =
    "//ul[@class='a-unordered-list a-vertical a-spacing-mini']/li"
  let productDescriptionXPath = "//div[@id='productDescription']//span"

  // wait until page loads
  await page.waitForSelector(titleXPath)

  // extract data using xpath
  let productTitle = await page.locator(titleXPath).innerText()

  // let asin = page.locator(asinSelector)
  // asin = await extractData(asin, (type = 'data-asin'))
  //
  // let rating = page.locator(ratingXPath)
  // rating = await extractData(rating, (type = 'innerText'))
  //
  // let ratingCount = page.locator(ratingsCountXPath)
  // ratingCount = await extractData(ratingCount, (type = 'innerText'))
  //
  // let sellingPrice = page.locator(sellingPriceXPath)
  // sellingPrice = await extractData(sellingPrice, (type = 'value'))
  //
  // let listingPrice = page.locator(listingPriceXPath)
  // listingPrice = await extractData(listingPrice, (type = 'innerText'))
  //
  // let brand = page.locator(brandXPath)
  // brand = await extractData(brand, (type = 'innerText'))
  //
  // const productDescription = await page
  //   .locator(productDescriptionXPath)
  //   .innerText()
  //
  const images = await page.locator(imgLinkXPath).all()
  for (const img of images) {
    console.log(await img.getAttribute('src'))
  }
  //
  // let status = page.locator(statusXPath)
  // status = await extractData(status, (type = 'innerText'))
  //
  // // since fulldescription is in <li> element , iteration is needed let fullDescriptionList = []; let descLists = page.locator(descriptionULXPath); let descCount = await descLists.count(); for (let index = 0; index < descCount; index++) { let liElement = descLists.nth(index); let desc = liElement.locator('//span'); desc = await extractData(desc, type ='innerText'); fullDescriptionList.push(desc); } let fullDescription = fullDescriptionList.join(" | ") || null;
  // // cleaning data
  // productTitle = cleanData(productTitle)
  // asin = cleanData(asin)
  // rating = cleanData(rating)
  // ratingCount = cleanData(ratingCount)
  // sellingPrice = cleanData(sellingPrice)
  // listingPrice = cleanData(listingPrice)
  // brand = cleanData(brand)
  // imageLink = cleanData(imageLink)
  // status = cleanData(status)
  // productDescription = cleanData(productDescription)
  // fullDescription = cleanData(fullDescription)
  //
  // let dataToSave = {
  //   productTitle: productTitle,
  //   asin: asin,
  //   rating: rating,
  //   ratingCount: ratingCount,
  //   sellingPrice: sellingPrice,
  //   listingPrice: listingPrice,
  //   brand: brand,
  //   imageLinks: imageLink,
  //   status: status,
  //   productDescription: productDescription,
  //   fullDescription: fullDescription,
  // }
  //
  // saveData(dataToSave)
  console.log({ productTitle })
}

/**
 * The main function initiates a browser object and handles the navigation.
 */
async function run() {
  // initializing browser and creating new page
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.setViewportSize({ width: 1920, height: 1080 })
  page.setDefaultTimeout(30000)

  // Navigating to the home page
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await parsePage(page)

  await context.close()
  await browser.close()
}

run()
