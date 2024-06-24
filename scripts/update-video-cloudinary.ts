import { uploadAsset } from '../src/lib/cloudinary'

;(async () => {
  const res = await uploadAsset(
    'https://video.aliexpress-media.com/play/u/ae_sg_item/2215323262407/p/1/e/6/t/10301/5000107042906.mp4?from=firefox',
    'video',
  )

  console.log(res)
})()
