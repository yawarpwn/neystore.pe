import { type Page } from 'playwright'

function cleanData(data: string) {
  let cleanedData = data.split(/\s+/).join(' ').trim()
  const regex = /[^a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ¿¡,.]/g
  cleanedData = cleanedData.replace(regex, '')
  return cleanedData
}

export async function extractTitleFromAmazon(page: Page) {
  const title =
    (await page.locator('h1[id="title"]').textContent()) || 'Default title'
  const cleanedTitle = cleanData(title)
  return cleanedTitle
}

export async function extractVideoFromAmazon(
  page: Page,
): Promise<{ title: string; url: string; cover: string } | null> {
  const script = await page
    .locator('#imageBlockVariations_feature_div script')
    .textContent()

  if (!script) return null

  const regex = /'\{([^']*)\}'/
  // const regex = /\{'\{([^]*)\}'\}/
  const match = script.match(regex)

  if (match) {
    const result = match[1]
    const validJSon = `{${result}}`
    const productInfo = JSON.parse(validJSon)
    const videos = productInfo.videos
    const mappedVideos = videos.map((video) => ({
      url: video.url,
      title: video.title,
      cover: video.slateUrl,
    }))
    return mappedVideos[0]
  } else {
    return null
  }
}

export async function extractImagesFromAmazon(
  page: Page,
): Promise<{ url: string; thumb: string }[]> {
  const imagesEl = await page.locator('#altImages ul li img').all()

  let imageLinks: string[] = []

  for (const img of imagesEl) {
    const src = await img.getAttribute('src')
    if (src) {
      imageLinks.push(src)
    }
    continue
  }

  const filteredImages = imageLinks.filter(
    (url) => url.endsWith('AC_US100_.jpg') || url.endsWith('AC_US40_.jpg'),
  )

  // const slicedImagesLinks = [...imagesLinks].slice(0, imagesLinks.length - 1)
  const mappedImages = filteredImages.map((link) => ({
    url: link.replace(/US(100|40)/, 'ST450'),
    thumb: link.replace(/US40/, 'US100'),
  }))

  return mappedImages
}

export async function extractFeaturesFromAmazon(page: Page) {
  const features = await page
    .locator('#feature-bullets ul li .a-list-item')
    .allInnerTexts()

  const cleanedFeatures = features.map(cleanData)
  return cleanedFeatures
}

export async function extractDetailsFromAmazon(page: Page) {
  try {
    const overviewRows = await page
      .locator('#productOverview_feature_div table tr')
      .all()

    let details: Record<string, string> = {}

    if (overviewRows && overviewRows.length > 0) {
      for (const row of overviewRows) {
        const entry = await row.locator('th').textContent()
        const value = await row.locator('td').textContent()

        if (entry && value) {
          details[entry.trim()] = value.trim()
        }
      }
    } else {
      const detailsRows = await page
        .locator('#productDetails_detailBullets_sections1 tr')
        .all()

      for (const row of detailsRows) {
        const entry = await row.locator('th').textContent()
        const value = await row.locator('td').textContent()

        if (value && value.length > 200) {
          break
        }

        if (entry && value) {
          details[entry.trim()] = value.trim()
        }
      }

      return details
    }

    return null
  } catch (error) {
    return null
  }
}
