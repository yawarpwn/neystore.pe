export const prerender = false
import { type APIRoute } from 'astro'
import { sendEmail } from '@/lib/mail'

function validateFields({
	name,
	email,
	message,
}: {
	name?: string
	email?: string
	message?: string
}) {
	if (!name || !email || !message) {
		return false
	}

	return true
}

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData()
	const name = formData.get('name')
	const email = formData.get('email')
	const message = formData.get('message')

	const info = {
		name: name?.toString(),
		email: email?.toString(),
		message: message?.toString(),
	}

	//Validar datos
	if (!validateFields(info)) {
		return new Response(
			JSON.stringify({
				message: 'Faltan campos requeridos',
			}),
			{
				status: 400,
			}
		)
	}

	// Enviar Correo
	const { data, error } = await sendEmail({ name, email, message })
	if (error) {
		return new Response(JSON.stringify({ message: error }), { status: 500 })
	}

	// Devolver respuesta
	return new Response(
		JSON.stringify({
			message: '¡Éxito!',
		}),
		{ status: 200 }
	)
}
