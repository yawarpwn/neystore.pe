import { defineConfig } from 'drizzle-kit'
import { envs } from '@/config'

export default defineConfig({
	schema: './src/db/schemas.ts',
	out: './migrations',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: {
		url: envs.TURSO_CONNECTION_URL!,
		authToken: envs.TURSO_AUTH_TOKEN!,
	},
})
