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
		fs.writeFile(FILE_PATH, JSON.stringify(this.data, null, 2))
	}

	async update(cb: (data: Data) => Data): Promise<void> {
		const data = cb(this.data)
		this.data = data
		await this.write()
	}

	async read(): Promise<void> {
		const data = JSON.parse(await fs.readFile(FILE_PATH, 'utf-8'))
		if (data) this.data = data
	}
}
