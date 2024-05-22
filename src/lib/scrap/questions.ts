import { input, select, confirm, Separator } from '@inquirer/prompts'

function isValidAmazonUrl(url: string) {
  // Expresión regular para verificar si la URL pertenece a Amazon
  var amazonUrlPattern =
    /^(https?:\/\/)?(www\.)?(amazon\.[a-z]{2,3})(\/[^ "]+)?$/
  return amazonUrlPattern.test(url)
}

function isValidAliExpressUrl(url: string) {
  // Expresión regular para verificar si la URL pertenece a AliExpress
  var aliExpressUrlPattern =
    /^(https?:\/\/)?(www\.)?(es.aliexpress\.[a-z]{2,3})(\/[^ "]+)?$/
  return aliExpressUrlPattern.test(url)
}

type Theme = {
  prefix: string
  spinner: {
    interval: number
    frames: string[]
  }
  style: {
    answer: (text: string) => string
    message: (text: string) => string
    error: (text: string) => string
    defaultAnswer: (text: string) => string
  }
}

export async function getProvider() {
  const provider = await select({
    message: 'Select a provider',
    choices: [
      { name: 'Amazon', value: 'amazon' },
      { name: 'AliExpress', value: 'aliexpress' },
    ],
  })

  return provider as 'amazon' | 'aliexpress'
}

export async function getUrl() {
  const url = await input({
    message: 'type url amazon product',
    validate: (url) => isValidAmazonUrl(url) || isValidAliExpressUrl(url),
  })
  return url
}

export async function getCanUpload() {
  const canUploadImage = await confirm({
    message: 'Must be Upload images and video to cloudinary?',
  })
  return canUploadImage
}

export async function getPrice() {
  const price = await input({
    message: 'Price',
    validate: (price) => !isNaN(Number(price)),
  })
  return price
}

export async function getCost() {
  const cost = await input({
    message: 'Cost',
    validate: (price) => !isNaN(Number(price)),
  })
  return cost
}

export async function getRank() {
  const ranking = await input({
    message: 'Ranking 1 - 5',
    validate: (rank) => {
      const rankNumber = Number(rank)
      if (isNaN(rankNumber)) {
        return false
      }
      if (rankNumber < 0 || rankNumber > 5) return false

      return true
    },
  })
  return ranking
}

export async function getCategory() {
  const category = await select({
    message: 'Choise a category',
    choices: [
      { name: 'Juguetes', value: 'Juguetes' },
      { name: 'Tecnologia', value: 'Tecnologia' },
    ],
  })

  return category
}
