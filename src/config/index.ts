import env from 'env-var'

export const site = {
	name: 'Ney Store',
	title: 'Tecnologia y juguetes Didacticos',
	url: 'https://www.neystore.pe',
	ogImage: 'https://www.neystore.pe/assets/images/tecnologia.avif',
	description:
		'Somos importadores de juegos didácticos, periféricos originales y artículos relacionados. Consulta nuestras promociones y descuentos.',
	phone: '900224005',
	email: 'ventas.neystore@gmail.com',
	address: 'Maquinaria 325 - Reynoso - Lima ',
	socialLinks: {
		tiktok: 'https://www.tiktok.com/@mamaazulraquel',
		facebook: 'https://www.facebook.com/people/NeyStore/100068073616022/?mibextid=ZbWKwL',
	},
}

export const envs = {
	CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
}
