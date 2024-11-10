import { input, select, confirm, Separator, checkbox } from '@inquirer/prompts'
import { PRODUCT_TAGS } from '@/constants'

const tags = Object.entries(PRODUCT_TAGS)

export async function askTags(): Promise<string[]> {
	const answer = await checkbox({
		message: 'Select a package manager',
		choices: tags.map(([key, value]) => ({ name: key, value })),
	})

	return answer
}

function isValidAmazonUrl(url: string) {
	// Expresión regular para verificar si la URL pertenece a Amazon
	var amazonUrlPattern = /^(https?:\/\/)?(www\.)?(amazon\.[a-z]{2,3})(\/[^ "]+)?$/
	return amazonUrlPattern.test(url)
}

function isValidAliExpressUrl(url: string) {
	// Expresión regular para verificar si la URL pertenece a AliExpress
	var aliExpressUrlPattern = /^(https?:\/\/)?(www\.)?(es.aliexpress\.[a-z]{2,3})(\/[^ "]+)?$/
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

export async function getUrl(provider: 'amazon' | 'aliexpress') {
	const url = await input({
		message: `type url ${provider} product`,
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

export async function askPrice() {
	const price = await input({
		message: 'Price',
		validate: (price) => !isNaN(Number(price)),
	})
	return price
}

export async function askCost() {
	const cost = await input({
		message: 'Cost',
		validate: (price) => !isNaN(Number(price)),
	})
	return cost
}

export async function azkRank() {
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

export async function askCategory() {
	const category = await select({
		message: 'Choise a category',
		choices: [
			{ name: 'Juguetes', value: 'Juguetes' },
			{ name: 'Tecnologia', value: 'Tecnologia' },
		],
	})

	return category
}
