import React from 'react';
import { Button, Carousel } from 'antd';
import '../css/Banner.css';

const contentStyle = {
    margin: 0,
    height: '800px',
    color: '#fff',
    textAlign: 'left',
};

const Banner = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <div className='banner'>
            <Carousel afterChange={onChange}>       
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
                                <h1 className='banner-title'>Sell Your Car At The Best Price</h1>
                                <p className='banner-description'>Get doorstep pick up and instant payment</p>
                                <Button className='btn-primary'>Sell Car</Button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <h1 className='banner-title'>Sell Your Car At The Best Price</h1>
                                <p className='banner-description'>Get doorstep pick up and instant payment</p>
                                <Button className='btn-primary'>Sell Car</Button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <h1 className='banner-title'>Sell Your Car At The Best Price</h1>
                                <p className='banner-description'>Get doorstep pick up and instant payment</p>
                                <Button className='btn-primary'>Sell Car</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
