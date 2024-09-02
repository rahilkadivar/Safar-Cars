import React from 'react'
import GalleryAlbum from '../components/GallaryAlbum'
import FourImageSection from '../components/FourImageSection'

const Gallary = () => {
  return (
    <div>
      <div>
        <div className='container-fuild'>
          <div className='row g-0'>
            <div className='col-12'>
              <div className='inner-banner'>
                <img className='w-100' src={`${process.env.PUBLIC_URL}/images/about-banner-img.jpg`} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
