import { z } from 'astro/zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
	CLOUDINARY_API_SECRET: z.string(),
})

const env = envSchema.safeParse(import.meta.env)
export default env
