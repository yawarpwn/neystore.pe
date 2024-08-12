import env from 'env-var'

export const envs = {
	CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
	TURSO_AUTH_TOKEN: env.get('TURSO_AUTH_TOKEN').required().asString(),
	TURSO_CONNECTION_URL: env.get('TURSO_CONNECTION_URL').required().asString(),
}
