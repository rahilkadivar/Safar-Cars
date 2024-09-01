import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Input, Row, Select } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductFilter from '../filter/ProductFilter';
import { clearAllFilter } from '../redux/productSlice';
import FourImageSection from '../components/FourImageSection';

const { Option } = Select;

const BuyCar = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const filteredData = useSelector((state) => state.product.filteredData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);


  const selectedBrand = useSelector((state) => state.brand.selectedBrand);
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

  const handleClearAll = () => {
    dispatch(clearAllFilter(true))
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const getSortedData = () => {
    let sortedData = [...filteredData];

    if (searchQuery) {
      sortedData = sortedData.filter(item =>
        item.product_name.toLowerCase().includes(searchQuery) ||
        item.fuel_type.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedBrand) {
      sortedData = sortedData.sort((a, b) => {
        const isBrandA = a.make === selectedBrand;
        const isBrandB = b.make === selectedBrand;

        if (isBrandA && !isBrandB) return -1;
        if (!isBrandA && isBrandB) return 1;
        return 0;
      });
    }

    if (sortOption === 'priceLowToHigh') {
      sortedData = sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      sortedData = sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'kmDrivenLowToHigh') {
      sortedData = sortedData.sort((a, b) => a.km_driven - b.km_driven);
    } else if (sortOption === 'yearNewToOld') {
      sortedData = sortedData.sort((a, b) => b.manufacturing_year - a.manufacturing_year);
    } else if (sortOption === 'newestFirst') {
      sortedData = sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return sortedData;
  };

  const sortedData = getSortedData();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <section className='pb-0'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='buycar-product'>
                <div className='row'>
                  <Drawer style={{ position: 'relative' }} className='mobile_device_filter' title="Filter On Products" placement="left" onClose={closeDrawer} visible={drawerVisible}>
                    <div className='sidebar'>
                      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
                        <Button onClick={handleClearAll}>
                          Clear All
                        </Button>
                      </div>
                      <Row style={{}}>
                        <ProductFilter />
                      </Row>
                    </div>
                  </Drawer>

                  <div className='col-lg-4 col-xl-3 desktop-device-filter'>
                    <div className='sidebar'>
                      <div className='clear-button'>
                        <Button onClick={handleClearAll}>
                          Clear All
                        </Button>
                      </div>
                      <Row style={{}}>
                        <ProductFilter />
                      </Row>
                    </div>
                  </div>
                  <div className='col-lg-8 col-xl-9'>
                    <div className='safarcar-brows-products'>
                      <Row style={{}}>


                        <div className='roduct-filters-badge'>
                          <div className='fillter-search mobile'>
                            <Input
                              placeholder="Search Products"
                              value={searchQuery}
                              onChange={handleSearch}
                              prefix={<SearchOutlined />}
                              style={{ width: '300px', marginRight: '20px' }}
                            />
                          </div>

                          <div className='fillter-btn-mobile'>
                            <Button className='mobile-filter-button' onClick={showDrawer}>Filter</Button>
                          </div>

                          <div className='fillter-search desktop'>
                            <Input
                              placeholder="Search Products"
                              value={searchQuery}
                              onChange={handleSearch}
                              prefix={<SearchOutlined />}
                              style={{ width: '300px', marginRight: '20px' }}
                            />
                          </div>
                          <div className='fillter-custom-price-select'>
                            <Select
                              placeholder="Sort By"
                              value={sortOption}
                              onChange={handleSortChange}
                            >

                              <Option value={null}>Sort By</Option>
                              <Option value="priceLowToHigh">Price: Low to High</Option>
                              <Option value="priceHighToLow">Price: High to Low</Option>
                              <Option value="kmDrivenLowToHigh">KM Driven: Low to High</Option>
                              <Option value="yearNewToOld">Year: New to Old</Option>
                              <Option value="newestFirst">Newest First</Option>
                            </Select>
                          </div>

                        </div>
                        <div className='fillter-product-found'>
                          <span style={{}}>
                            {sortedData.length} products found
                          </span>
                        </div>


                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                          {sortedData && sortedData.map((item, index) => (

                            <div key={index} className='car-item' >

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
                                      <img src='images/calendar.png' alt="Calendar" /> {item.manufacturing_year}
                                    </li>
                                    <li>
                                      <img src='images/km.png' alt="KM Driven" /> {item.km_driven} km
                                    </li>
                                    <li>
                                      <img src='images/fuel.png' alt="Fuel Type" /> {item.fuel_type}
                                    </li>
                                    <li>
                                      <img src='images/processing.png' alt="Transmission" /> {item.transmission}
                                    </li>
                                  </ul>
                                </div>
                                <div className='location'>
                                  <img src='images/location.png' alt="Location" />
                                  <span>S.G Highway, Ahmedabad</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <FourImageSection />
      </section>
    </>
  )
}

export default BuyCar









// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!isAuthenticated) {
//     navigate('/login', { state: { from: window.location.pathname, formData } });
//   } else {
//     // Form submission logic here
//     console.log('Form submitted:', formData);
//   }
// };