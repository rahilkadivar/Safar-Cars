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
                                    <a href={"https://www.google.com/maps/place/CARS24+Network+-+Sell+Car+in+Anand/@22.5847677,72.9702992,17z/data=!4m8!3m7!1s0x395e4fa868f1ee5d:0x7ac64b7b58e9230f!8m2!3d22.5847628!4d72.9728741!9m1!1b1!16s%2Fg%2F11lcbdtjfc?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D"} target="_blank" rel="noopener noreferrer">
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
