import React from 'react';
import { Button, Carousel } from 'antd';
import '../css/Banner.css';
import { Link } from 'react-router-dom';

const contentStyle = {
    margin: 0,
    height: '800px',
    color: '#fff',
    textAlign: 'left',
};

const Banner = () => {
    

    return (
        <div className='banner'>
            <Carousel autoplay draggable >
                <div>
                    <div style={{
                        ...contentStyle,
                        backgroundImage: `url('./images/banner-01.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                    >
                        <div className='container'>
                            <div className='banner-content'>
                                <h1 className='banner-title'>Best Place for Sell your Car </h1>
                                <p className='banner-description'>Get doorstep pick up and instant payment</p>
                                <Link to={'/sellcar'}>
                                    <Button className='btn-primary'>Sell Car</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{
                        ...contentStyle,
                        backgroundImage: `url('./images/banner-02.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                    >
                        <div className='container'>
                            <div className='banner-content'>
                                <h1 className='banner-title'>Sell Your Car At The Best Price</h1>
                                <p className='banner-description'>Get doorstep pick up and instant payment</p>
                                <Link to={'/sellcar'}>
                                    <Button className='btn-primary'>Sell Car</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{
                        ...contentStyle,
                        backgroundImage: `url('./images/banner-03.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                    >
                        <div className='container'>
                            <div className='banner-content'>
                                <h1 className='banner-title'>Sell Your Car At The Best Price</h1>
                                <p className='banner-description'>Get doorstep pick up and instant payment</p>
                                <Link to={'/sellcar'}>
                                    <Button className='btn-primary'>Sell Car</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
