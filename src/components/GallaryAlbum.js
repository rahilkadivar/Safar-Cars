import React, { useState } from 'react';
import { Row, Col, Card, Image, Modal, Button } from 'antd';

const GalleryAlbum = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);

    const galleryImages = {
        album1: ['./images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg'],

        album2: ['./images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg'],

        album3: ['./images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg'],

        album4: ['./images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg',
            './images/banner-01.jpg']
    };

    const openModal = (images, image) => {
        setSelectedImages(images);
        setCurrentImage(image);
        setIsModalVisible(true);
    };

    const handleNext = () => {
        const currentIndex = selectedImages.indexOf(currentImage);
        const nextIndex = (currentIndex + 1) % selectedImages.length;
        setCurrentImage(selectedImages[nextIndex]);
    };

    const handlePrev = () => {
        const currentIndex = selectedImages.indexOf(currentImage);
        const prevIndex = (currentIndex - 1 + selectedImages.length) % selectedImages.length;
        setCurrentImage(selectedImages[prevIndex]);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='gallaryalbum'>
            <Row gutter={[16, 16]}>
                {Object.entries(galleryImages).map(([album, images], index) => (
                    <Col xs={24} sm={12} md={8} key={album}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    preview={false}
                                    src={images[0]}
                                    onClick={() => openModal(images, images[0])}
                                />
                            }
                        >
                            <Row gutter={[1, 1]}>
                                {images.slice(1, 4).map((image, idx) => (
                                    <Col span={8} key={idx}>
                                        <Image
                                            preview={false}
                                            src={image}
                                            onClick={() => openModal(images, image)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <Image preview={false} src={currentImage} />
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <Button onClick={handlePrev}>Previous</Button>
                    <Button type='primary' onClick={handleNext} style={{ marginLeft: 20 }}>Next</Button>
                </div>
            </Modal>
        </div>
    );
};


export default GalleryAlbum;
