import { client } from './client'
import { drizzle } from 'drizzle-orm/libsql'

export const db = drizzle(client)
