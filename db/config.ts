import { defineDb, defineTable, column, NOW } from 'astro:db'

const Products = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text(),
		features: column.json({ optional: false }),
		details: column.json({ optional: true }),
		price: column.number(),
		cost: column.number(),
		created_at: column.date({ default: NOW }),
		updated_at: column.date(),
	},
	indexes: [{ on: ['title'], unique: true }],
})

const Images = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		product_id: column.text({ references: () => Products.columns.id }),
		url: column.text(),
		thumb: column.text(),
		created_at: column.date({ default: NOW }),
		updated_at: column.date(),
	},
})

const Videos = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		product_id: column.text({ references: () => Products.columns.id }),
		url: column.text(),
		title: column.text(),
		cover: column.text(),
		created_at: column.date({ default: NOW }),
		updated_at: column.date(),
	},
})

const Comment = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		product_id: column.text(),
		name: column.text(),
		body: column.text(),
		created_at: column.date({ default: NOW }),
		updated_at: column.date(),
	},
	foreignKeys: [
		{
			columns: ['product_id'],
			references: () => [Products.columns.id],
		},
	],
})

const Category = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text(),
	},
})

const Ranking = defineTable({
	columns: {
		product_id: column.text({ references: () => Products.columns.id }),
		total: column.text(),
	},
})

export default defineDb({
	tables: {
		Products,
		Images,
		Videos,
		Comment,
		Ranking,
		Category,
	},
})
