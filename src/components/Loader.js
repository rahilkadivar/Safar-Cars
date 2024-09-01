import React from 'react';
import '../css/Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <img src={`${process.env.PUBLIC_URL}/images/gif/car-dealer-loader-gif.gif`} alt="Loading..." className="loader-gif" />
        </div>
    );
};

export default Loader;
