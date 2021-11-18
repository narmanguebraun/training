import { urlFor } from '../sanity'

const Image = ({ identifier, image }) => {
	return (
		<div className={identifier === "main_image" ? "main_image" : "image"}>
			<img src={urlFor(image).auto('format')} />
		</div>
	)
}

export default Image