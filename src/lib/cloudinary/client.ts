import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

import { envs } from '../../config/index'

cloudinary.config({
	cloud_name: 'dyshhk5h6',
	api_key: '533526923894852',
	api_secret: envs.CLOUDINARY_API_SECRET,
})

export { cloudinary }
