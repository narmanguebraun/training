import { sanityClient, urlFor } from '../sanity'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home = ({ properties }) => {
  console.log(properties)
  return (
    <div>
      {properties && (
        <div className="main">
          <div className="feed_container">
            <h1>Places to stay near you</h1>
            <div className="feed">
            {properties.map((property, index) => (
              <div key={property._id} className="card">
                <img src={urlFor(property.mainImage)} />
              </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '* [ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if(!properties.length) {
    return {
      props: {
        properties: [],
      },
    } 
  } else {
    return {
      props: {
        properties
      }
    }
  }
}

export default Home