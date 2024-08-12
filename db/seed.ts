import { db, ProductsTable } from 'astro:db'
// https://astro.build/db/seed
export default async function seed() {
	db.insert(ProductsTable).values([
		{
			id: '1',
			title: 'Product 1',
		},
		{
			id: '2',
			title: 'Product 2',
		},
		{
			id: '3',
			title: 'Product 3',
		},
	])
}
