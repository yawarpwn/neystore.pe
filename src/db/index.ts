import fs from 'fs/promises'
import { type Product } from '@/types'

const FILE_PATH = 'src/db/db.json'

type Data = {
	products: Product[]
}

export class Database {
	data: Data = {
		products: [],
	}

	constructor() {}

	async write() {
		fs.writeFile(JSON.stringify(this.data), FILE_PATH)
	}

	async finOne() {
		this.read()
	}

	async read() {
		const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf-8'))
		this.data = data
		return this.data
	}
}
