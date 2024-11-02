import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

// import { CLOUDINARY_API_SECRET } from 'astro:env/server'

cloudinary.config({
	cloud_name: 'dyshhk5h6',
	api_key: '533526923894852',
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }
