import env from 'env-var'
export { site } from './site'

export const envs = {
	CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
}
