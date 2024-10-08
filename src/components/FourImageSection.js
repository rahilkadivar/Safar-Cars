import React from 'react';
import { Row, Col } from 'antd';

const images = [
    { src: './images/imagesection/01.png', link: 'http://localhost:3000/' },
    { src: './images/imagesection/02.png', link: 'http://localhost:3000/' },
    { src: './images/imagesection/03.png', link: 'http://localhost:3000/' },
    { src: './images/imagesection/04.png', link: 'http://localhost:3000/' },
];

const FourImageSection = () => {
    return (
        <div className='image-row-section' style={{  }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
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
                </div>
            </div>
        </div>
    );
};

export default FourImageSection;
