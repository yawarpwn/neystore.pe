import EmblaCarousel, { type EmblaCarouselType, type EmblaEventType } from 'embla-carousel'

export function setupLazyloadImage(emblaApi: EmblaCarouselType) {
	const imagesInView: number[] = []
	const slidesNodes = emblaApi.slideNodes()
	const spinnerNodes = slidesNodes.map((slideNode) => slideNode.querySelector('.embla__spinner'))
	const imagesNodes = slidesNodes.map((slideNode) => slideNode.querySelector('.embla__img'))

	const loadImageView = (index: number) => {
		const imageNode = imagesNodes[index] as HTMLImageElement
		const slideNode = slidesNodes[index] as HTMLDivElement
		const spinnerNode = spinnerNodes[index] as HTMLSpanElement
		const src = imageNode?.getAttribute('data-src')

		imageNode.src = src || ''
		imagesInView.push(index)
		// embla__slide--has-loaded
		const onLoad = () => {
			slideNode.classList.add('embla__slide--has-loaded')
			spinnerNode.parentElement?.removeChild(spinnerNode)
			imageNode.removeEventListener('load', onLoad)
		}

		imageNode.addEventListener('load', onLoad)
	}

	const loadImagesInView = () => {
		emblaApi
			.slidesInView()
			.filter((index) => !imagesInView.includes(index))
			.forEach(loadImageView)

		return imagesInView.length === imagesNodes.length
	}

	const loadImagesInViewAndDestroyIfDone = (
		emblaApi: EmblaCarouselType,
		eventName: EmblaEventType
	) => {
		const loadedAll = loadImagesInView()
		if (loadedAll) emblaApi.off(eventName, loadImagesInViewAndDestroyIfDone)
	}

	return loadImagesInViewAndDestroyIfDone
}
