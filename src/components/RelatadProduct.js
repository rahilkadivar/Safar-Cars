import { EnvironmentOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RelatedProduct = ({ brand, }) => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const productData = useSelector((state) => state.product.data);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    function convertToSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    const onDetailPage = (slug) => {
        const convertSlug = convertToSlug(slug);
        navigate(`/product/${convertSlug}`);
    };

    const matchProduct = () => {
        const matchedProducts = productData.filter(product => product.make === brand);
        const latestProducts = matchedProducts.reverse().slice(0, 4);

        if (latestProducts.length > 0) {
            setData(latestProducts);
        } else {
            alert('Product Url is Not Correct');
            navigate("/buycar");
        }
    };

    useEffect(() => {
        if (productData.length > 0 && data.length === 0) {
            matchProduct();
        }
    }, [productData]);

    return (
        <div>
            <Row gutter={16} style={{display:'flex', gap:'20px'}}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className='car-item' style={{width:'23%'}}  >

                            <div className='car-image' style={{ cursor: 'pointer' }} onClick={() => onDetailPage(item.product_name)}>
                                <img src={`${API_BASE_URL}/${item.image[0]}`} alt={item.product_name} />
                                <span className='car-badge'>Certified</span>
                                <div className='car-price'>₹{item.price}</div>
                            </div>
                            <div className='car-content'>
                                <h3 className='item-title' style={{ cursor: 'pointer' }} onClick={() => onDetailPage(item.product_name)}>{item.product_name}</h3>

                                <div className='car-list'>
                                    <ul className='list-inline'>
                                        <li>
                                            <img src='../images/calendar.png' alt="Calendar" /> {item.manufacturing_year}
                                        </li>
                                        <li>
                                            <img src='../images/km.png' alt="KM Driven" /> {item.km_driven} km
                                        </li>
                                        <li>
                                            <img src='../images/fuel.png' alt="Fuel Type" /> {item.fuel_type}
                                        </li>
                                        <li>
                                            <img src='../images/processing.png' alt="Transmission" /> {item.transmission}
                                        </li>
                                    </ul>
                                </div>
                                <div className='location'>
                                    <img src='../images/location.png' alt="Location" />
                                    <span>S.G Highway, Ahmedabad</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No related products found.</p>
                )}
            </Row>
        </div>
    );
};

export default RelatedProduct;
