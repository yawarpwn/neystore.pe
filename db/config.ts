import { defineDb, defineTable, column, NOW } from 'astro:db'

const Products = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    features: column.json({ optional: true }),
    details: column.json({ optional: true }),
    price: column.number(),
    cost: column.number(),
    ranking: column.number(),
    category: column.text(),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
  },
})

const Images = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    product_id: column.text({ references: () => Products.columns.id }),
    url: column.text(),
    thumb: column.text(),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
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
    updated_at: column.date({ default: NOW }),
  },
})

export default defineDb({
  tables: {
    Products,
    Images,
    Videos,
  },
})
