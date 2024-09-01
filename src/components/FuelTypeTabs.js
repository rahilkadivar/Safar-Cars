import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const FuelTypeTabs = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const productData = useSelector((state) => state.product.data);
    const [selectedTab, setSelectedTab] = useState('Hatchback');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const matchProduct = () => {
        const matchedProducts = productData.filter(product => product.body_type === selectedTab);
        const tabProduct = matchedProducts.reverse().slice(0, 4);

        if (tabProduct.length > 0) {
            setData(tabProduct);
        } else {
            setData([]);
        }
    };

    useEffect(() => {
        if (productData.length > 0) {
            matchProduct();
        }
    }, [selectedTab, productData]);

    const products = [
        { key: 'Hatchback', name: 'Hatchback', image: './images/bodytype/hatchback.png' },
        { key: 'Sedan', name: 'Sedan', image: './images/bodytype/sedan.png' },
        { key: 'SUV', name: 'SUV', image: './images/bodytype/suv.png' },
        { key: 'MUV', name: 'MUV', image: './images/bodytype/muv.png' },
        { key: 'Luxury Sedan', name: 'Luxury Sedan', image: './images/bodytype/luxury-sedan.png' },
        { key: 'Luxury SUV', name: 'Luxury SUV', image: './images/bodytype/luxury-suv.png' },
    ];

    const onTabChange = (key) => {
        setSelectedTab(key);
    };


    // Product click to show detail page 
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

        navigate(`/product/${convertSlug}`)
    }

    return (
        <div className='fuel_tabs'>
            <div className="container">
                            <div className="row">
            <Tabs defaultActiveKey="Hatchback" centered onChange={onTabChange}>
                {products.map((product) => (
                    <TabPane
                        tab={
                            <a href="javascript:void(0);">
                                <span>{product.name}</span>
                            </a>
                        }
                        key={product.key}
                    ><div className="row">
                                {data && data.map((item, index) => (
                                    
                                        <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                                            <div className='car-item'>

                                                <div className='car-image' style={{ cursor: 'pointer' }} onClick={() => onDetailPage(item.product_name)}>
                                                    <img src={`${API_BASE_URL}/${item.image[0]}`} alt={item.product_name} />
                                                    <span className='car-badge'>Certified</span>
                                                    <div className='car-price'>₹{item.price}</div>
                                                </div>
                                                <div className='car-content'>
                                                    <h3 className='item-title' style={{ cursor: 'pointer' }} onClick={() => onDetailPage(item.product_name)}>{item.product_name}</h3>

                                                    <div className='car-list'>
                                                        <ul className='list-inline'>
                                                            <li><img src='images/calendar.png' alt="Calendar" /> {item.manufacturing_year}</li>
                                                            <li><img src='images/km.png' alt="KM Driven" /> {item.km_driven} km</li>
                                                            <li><img src='images/fuel.png' alt="Fuel Type" /> {item.fuel_type}</li>
                                                            <li><img src='images/processing.png' alt="Transmission" /> {item.transmission}</li>
                                                        </ul>
                                                    </div>
                                                    <div className='location'>
                                                        <img src='images/location.png' alt="Location" />
                                                        <span>S.G Highway, Ahmedabad</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                ))}
                                </div>
                    </TabPane>
                ))}
            </Tabs>
            
            </div>
                        </div>
        </div>
    );
};

export default FuelTypeTabs;
