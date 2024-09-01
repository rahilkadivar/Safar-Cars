import React from 'react'
import GalleryAlbum from '../components/GallaryAlbum'
import FourImageSection from '../components/FourImageSection'

const Gallary = () => {
  return (
    <div>
      <img width={'100%'} src="./images/banner-01.jpg" alt="" />

      <section>
        <div className="container">
          <div className="row">
            <GalleryAlbum />
          </div>
        </div>
      </section>

      <section style={{marginTop:'0 !important'}}>
        <FourImageSection />
      </section>
    </div>
  )
}

export default Gallary
