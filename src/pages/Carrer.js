import React from 'react'
import EmployeeForm from '../components/EmployeeForm'
import FourImageSection from '../components/FourImageSection'
import { Col, Row } from 'antd';

const images = [
  { src: './images/imagesection/01.png', link: 'http://localhost:3000/' },
  { src: './images/imagesection/02.png', link: 'http://localhost:3000/' },
  { src: './images/imagesection/03.png', link: 'http://localhost:3000/' },
  { src: './images/imagesection/04.png', link: 'http://localhost:3000/' },
];

const Carrer = () => {
  return (
    <div>
      <section>
        <img width={'100%'} src="./images/banner-01.jpg" alt="" />
      </section>

      <section className='image-row-section' style={{ padding: '20px' }}>
            <div className='container'>
                <Row gutter={[16, 16]}>
                    {images.map((image, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <a href={image.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={image.src}
                                    alt={`image-${index}`}
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>

      <section>
        <EmployeeForm />
      </section>

      <section>
        <FourImageSection />
      </section>
    </div>
  )
}

export default Carrer
