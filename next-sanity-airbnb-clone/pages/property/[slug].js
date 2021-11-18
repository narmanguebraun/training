import { sanityClient } from '../../sanity'
import { isMultiple } from '../../utils'
import Image from '../../components/Image'
import Review from '../../components/Review'
import Map from '../../components/Map'
import Link from 'next/link'

export const Property = ({ 
	title,
	location,
	propertyType,
	mainImage,
	images,
	pricePerNight,
	beds,
	bedrooms,
	description,
	host,
	reviews 
}) => {

	const reviewAmount = reviews.length

	return (
		<div className="container">
			<h1>{title}</h1>
			<p>{reviewAmount} review{isMultiple(reviewAmount)}</p>

			<div className="images_section">
				<Image identifier="main_image" image={mainImage} />
				<div className="sub_images_section">
					{images.map((_key, image) => <Image identifier="image" image={ image } />)}
				</div>
			</div>

			<div className="section">

				<div className="information">
					<h2>{propertyType} hosted by {host?.name}</h2>
					<h4>{bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)}</h4>
					<hr />
					<h4>Enhanced Clean</h4>
					<p>This host is commited to Airbnb's 5-step enhanced cleaning process</p>
					<h4>Amenities for everyday living</h4>
					<p>This host has equipped this place for long stays - kitchen, shampoo, conditionner, hairdryer.</p>
					<h4>House rules</h4>
					<p>This place is not suitable for pets and the host does not allow parties or smoking.</p>
				</div>
				<div className="price_box">
						<h2>$ {pricePerNight}</h2>
						<h4>{reviewAmount} review{isMultiple(reviewAmount)}</h4>
						<Link href="/"><div className="button">Change Dates</div></Link>
					</div>
			</div>
			<hr />
			<h4>{description}</h4>
			<hr />
			<h2>{reviewAmount} review{isMultiple(reviewAmount)}</h2>
			{reviewAmount > 0 && reviews.map((review) => <Review key={review._key} review={review} />)}
			<hr />
			<h2>Location</h2>
			<Map location={location}></Map>
		</div>
	)
}

export const getServerSideProps = async (pageContext) => {
	const pageSlug = pageContext.query.slug

	const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
		title,
		location,
		propertyType,
		mainImage,
		images,
		pricePerNight,
		beds,
		bedrooms,
		description,
		host->{
			_id,
			name, 
			slug,
			image
		},
		reviews[]{
			...,
			traveller->{
				_id,
				name,
				slug,
				image
			}
		}
	}`

	const property = await sanityClient.fetch(query, { pageSlug })

	if (!property) {
		return {
			props: null,
			notFound: true,
		}
	} else {
		return {
			props:{
				title: property.title,
				location: property.location,
				propertyType: property.propertyType,
				mainImage: property.mainImage,
				images: property.images,
				pricePerNight: property.pricePerNight,
				beds: property.beds,
				bedrooms: property.bedrooms,
				description: property.description,
				host: property.host,
				reviews: property.reviews
			}
		}
	}
}

export default Property;