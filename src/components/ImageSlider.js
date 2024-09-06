import React, { useState } from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ images }) => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2,
        adaptiveHeight: true,
    };

    const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: nav1,
        focusOnSelect: true,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
    };

    return (
        <div>
            {images && images.length > 1 ?
                <>
                    <Slider
                        {...settingsMain}
                        asNavFor={nav2}
                        ref={(slider1) => setNav1(slider1)}
                    >
                        {images && images.map((img, index) => (
                            <div key={index}>
                                <img src={`${API_BASE_URL}/${img}`} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </Slider>

                    <Slider
                        {...settingsThumbs}
                        asNavFor={nav1}
                        ref={(slider2) => setNav2(slider2)}
                        className="thumbnail-slider"
                    >
                        {images && images.map((img, index) => (
                            <div key={index}>
                                <img src={`${API_BASE_URL}/${img}`} alt={`Thumbnail ${index}`} style={{ width: '100%', height: '100px', objectFit: 'cover', cursor: 'pointer' }} />
                            </div>
                        ))}
                    </Slider>
                </> :
                <>
                    {images && images.map((img, index) => (
                        <div key={index}>
                            <img src={`${API_BASE_URL}/${img}`} alt={`Slide ${index}`} style={{ width: '100%', maxHeight: '700px', objectFit: 'cover' }} />
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

export default ImageSlider;
