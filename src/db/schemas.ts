import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const productsTable = sqliteTable('products', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	createdAt: text('created_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

// export const postsTable = sqliteTable('posts', {
//   id: integer('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: text('created_at')
//     .default(sql`(CURRENT_TIMESTAMP)`)
//     .notNull(),
//   updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
// });

export type InsertProduct = typeof productsTable.$inferInsert
export type SelectProduct = typeof productsTable.$inferSelect
export type UpdateProduct = Partial<Omit<SelectProduct, 'id' | 'createdAt' | 'updateAt'>>

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
