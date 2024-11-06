import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD } from 'astro:env/server'

// const transporter = nodemailer.createTransport({
// 	host: 'smtp.ethereal.email',
// 	port: 587,
// 	secure: false, // true for port 465, false for other ports
// 	auth: {
// 		user: 'maddison53@ethereal.email',
// 		pass: 'jn7jnAPss4f63QBp6D',
// 	},
// })

// Configuramos el transporte de nodemailer
const transporter = nodemailer.createTransport({
	service: 'Gmail', // Usamos Gmail como servicio de correo
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'ventas.neystore@gmail.com', // Tu dirección de correo de Gmail
		pass: EMAIL_PASSWORD, // La contraseña de tu correo o app password si tienes 2FA activado
	},
})

export async function sendEmail({
	name,
	email,
	message,
}: {
	name: string
	email: string
	message: string
}) {
	// send mail with defined transport object
	try {
		const info = await transporter.sendMail({
			from: `"${name}" <${email}>`, // sender address
			to: 'ventas.neystore@gmail.com', // list of receivers
			subject: 'Cliente de pagina ✔', // Subject line
			text: 'Hello world?', // plain text body
			html: `<b>${message}</b>`, // html body
		})

		console.log('Message sent: %s', info.messageId)
		return {
			data: 'Mensaje enviado',
			error: null,
		}
	} catch (error) {
		console.log(error)
		return {
			data: null,
			error: 'Error al enviar el correo',
		}
	}

	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
