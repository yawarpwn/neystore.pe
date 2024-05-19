import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dyshhk5h6',
  api_key: '533526923894852',
  api_secret: import.meta.env.ClOUDINARY_API_SECRET,
})

export async function uploadAsset(url: string) {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: 'neystore',
    })

    console.log(result.url)
  } catch (error) {
    console.log(error)
  }
}

export function transform(publicId: string) {
  const url = cloudinary.url(publicId, {
    width: 100,
    height: 150,
    crop: 'fill',
  })
  return url
}

;(() => {})()
