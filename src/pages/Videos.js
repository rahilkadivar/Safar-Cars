import React from 'react';
import { Row, Col, Card } from 'antd';
import FourImageSection from '../components/FourImageSection';

const videos = [
  {
    thumbnail: './images/car-img-01.jpg',
    title: 'Delivery of Mercedes Benz Car',
    link: 'https://www.youtube.com/watch?v=DbqU6pgy3Qc&embeds_referring_euri=https%3A%2F%2Fjollymotors.in%2F&source_ve_path=Mjg2NjY'
  },
  {
    thumbnail: './images/car-img-01.jpg',
    title: 'Delivery of Mercedes Benz Car',
    link: 'https://www.youtube.com/watch?v=DbqU6pgy3Qc&embeds_referring_euri=https%3A%2F%2Fjollymotors.in%2F&source_ve_path=Mjg2NjY'
  },
  {
    thumbnail: './images/car-img-01.jpg',
    title: 'Delivery of Mercedes Benz Car',
    link: 'https://www.youtube.com/watch?v=DbqU6pgy3Qc&embeds_referring_euri=https%3A%2F%2Fjollymotors.in%2F&source_ve_path=Mjg2NjY'
  },
  {
    thumbnail: './images/car-img-01.jpg',
    title: 'Delivery of Mercedes Benz Car',
    link: 'https://www.youtube.com/watch?v=DbqU6pgy3Qc&embeds_referring_euri=https%3A%2F%2Fjollymotors.in%2F&source_ve_path=Mjg2NjY'
  },
  {
    thumbnail: './images/car-img-01.jpg',
    title: 'Delivery of Mercedes Benz Car',
    link: 'https://www.youtube.com/watch?v=DbqU6pgy3Qc&embeds_referring_euri=https%3A%2F%2Fjollymotors.in%2F&source_ve_path=Mjg2NjY'
  },
  {
    thumbnail: './images/car-img-01.jpg',
    title: 'Delivery of Mercedes Benz Car',
    link: 'https://www.youtube.com/watch?v=DbqU6pgy3Qc&embeds_referring_euri=https%3A%2F%2Fjollymotors.in%2F&source_ve_path=Mjg2NjY'
  },

];


const Videos = () => {
  return (
    <div>
      <section className='video-section' style={{ padding: '30px' }}>
        <div className='container'>
          <Row gutter={[16, 16]}>
            {videos.map((video, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <a href={video.link} target="_blank" rel="noopener noreferrer">
                  <Card
                    hoverable
                    cover={<img alt={video.title} src={video.thumbnail} />}
                    style={{ textAlign: 'center', height: '100%' }}
                  >
                    <h4>{video.title}</h4>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section>
        <FourImageSection />
      </section>
    </div>
  )
}

export default Videos
