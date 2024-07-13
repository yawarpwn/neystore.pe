import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

cloudinary.config({
	cloud_name: 'dyshhk5h6',
	api_key: '533526923894852',
	api_secret: import.meta.env.CLOUDINARY_API_SECRET,
})

export default {
	cloudinary,
}
