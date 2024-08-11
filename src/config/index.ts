import env from 'env-var'

export const envs = {
	CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
}
