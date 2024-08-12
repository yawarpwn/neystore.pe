import { createClient } from '@libsql/client'
import { envs } from '@/config'

export const client = createClient({
	url: envs.TURSO_CONNECTION_URL,
	authToken: envs.TURSO_AUTH_TOKEN,
})
