import React from 'react'
import Banner from '../components/Banner';
import '../css/CarItem.css';
import '../css/BrandLogo.css';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import FuelTypeTabs from '../components/FuelTypeTabs';
import WhyChooseSection from '../components/WhyChooseSection';
import DreamPreowned from '../components/DreamPreownedSection';
import FourImageSection from '../components/FourImageSection';
import { useNavigate } from 'react-router-dom';
import { setSelectedBrand } from '../redux/brandSlice';

const Home = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const latestProducts = useSelector((state) => state.product.latestProducts);
  const brands = useSelector((state) => state.brand.brands);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <ArrowRightOutlined />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <ArrowLeftOutlined />
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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

  const handleBrandClick = (brand) => {
    dispatch(setSelectedBrand(brand));
    navigate(`/buycar`);
  };


  return (
    <div>
      <Banner />

      <section className='safarcar-product' >
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Slider {...sliderSettings} >
                {latestProducts && latestProducts.map((item, index) => (
                  <div key={index} className='car-item'  >

                    <div className='car-image' style={{ cursor: 'pointer' }} onClick={() => onDetailPage(item.product_name)}>
                      <img src={`${API_BASE_URL}/${item.image[0]}`} alt={item.product_name} />
                      <span className='car-badge'>Certified</span>
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
                      <div className='car-price'>₹{item.price}</div>
                      {/* <div className='location'>
                        <img src='images/location.png' alt="Location" />
                        <span>S.G Highway, Ahmedabad</span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>



      <section className='bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='brand-logo-list'>
                <ul>
                  {brands && brands.map((item, index) => (
                    <li key={index} className='brand-logo-img'>
                      <div className='brand-a' onClick={() => handleBrandClick(item.brand_name)}>
                        <img src={`${API_BASE_URL}/${item.image}`} alt={item.brand_name}></img>
                        <p className="brand-name">{item.brand_name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='pb-0'>
        <FuelTypeTabs />
      </section>

      <section className='why-choose pb-0'>
        <WhyChooseSection />
      </section>

      <section className='pb-0'>
        <DreamPreowned />
      </section>

      <section>
        <FourImageSection />
      </section>

    </div>
  )
}

export default Home

