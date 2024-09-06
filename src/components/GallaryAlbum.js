import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Image, Modal, Button } from 'antd';
import { useSelector } from 'react-redux';

const GalleryAlbum = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [imageData, setImageData] = useState([]);

    const data = useSelector((state) => state.product.data);

    // Filter and sort products
    const filteredProducts = data.filter(product => product?.image && product?.image.length >= 4);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const latestImageA = new Date(Math.max(...a?.image.map(img => new Date(img.created_at))));
        const latestImageB = new Date(Math.max(...b?.image.map(img => new Date(img.created_at))));
        return latestImageB - latestImageA;
    });

    const latestProduct = sortedProducts[0];
    const lastFourItems = [latestProduct, ...sortedProducts.slice(1, 8)];

    useEffect(() => {
        setImageData(lastFourItems);
    }, [data]);

    // Modal handlers
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
        <div className='galleryalbum'>
            <Row gutter={[16, 16]}>
                {imageData[0] !== undefined ? (<>
                    {imageData?.map((album, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card
                                hoverable
                                cover={
                                    <Image
                                        preview={false}
                                        src={`https://safarcars.com/api/${album?.image[0]}`}
                                        onClick={() => openModal(album?.image, `${album?.image[0]}`)}
                                    />
                                }
                            >
                                <Row gutter={[1, 1]}>
                                    {album?.image.slice(1, 4).map((image, idx) => (
                                        <Col span={8} key={idx}>
                                            <Image
                                                preview={false}
                                                src={`https://safarcars.com/api/${image}`}
                                                onClick={() => openModal(album?.image, `${image}`)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </>) : 'Album Not Found'}
            </Row>

            <Modal
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <Image preview={false} src={`https://safarcars.com/api/${currentImage}`} />
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <Button onClick={handlePrev}>Previous</Button>
                    <Button type='primary' onClick={handleNext} style={{ marginLeft: 20 }}>Next</Button>
                </div>
            </Modal>
        </div>
    );
};

export default GalleryAlbum;
