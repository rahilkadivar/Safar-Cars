import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import '../css/Footer.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

    const openWhatsAppChat = () => {
        const phoneNumber = "9327647995";

        const message = `Hello, I have an inquiry regarding your services.`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const isAuthenticated = useSelector(state => state.auth.isAuthenticate);



    return (
        <div>
            <section className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className='footer-widget pe-lg-5'>
                                <div className='sfc-footer-logo'>
                                    <img src={`${process.env.PUBLIC_URL}/logo/black.png`} width={200} alt="logo" />
                                </div>
                                <div className="sesfooter_about">
                                    <p>Welcome to Safar Cars, your trusted destination for top-quality used vehicles. With years of experience in the automotive industry, we pride ourselves on offering a seamless car buying experience. Explore our diverse selection of well-maintained pre-owned cars to find the perfect match for your needs.</p>
                                </div>
                                <div className='footer-social-media'>
                                    <div className="social-icons">
                                        <Link to={'https://facebook.com'} target='blank'>
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </Link>
                                        <Link to={'https://instagram.com'} target='blank'>
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Link>
                                        <Link onClick={openWhatsAppChat}>
                                            <FontAwesomeIcon icon={faWhatsapp} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="_copyright">©2024 Copyright Safar Cars. All Rights Reserved.</div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className='footer-widget'>
                                        <h4 className='footer-title'>Pages</h4>
                                        <ul className='footer-menu'>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/about">About</Link>
                                            </li>
                                            <li>
                                                <Link to="/buycar">Buy Car</Link>
                                            </li>
                                            <li>
                                                <Link to="/sellcar">Sell Car</Link>
                                            </li>
                                            <li>
                                                <Link to="/gallery">Gallery</Link>
                                            </li>
                                            <li>
                                                <Link to="/contact">Contact</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className='footer-widget'>
                                        <h4 className='footer-title'>Other</h4>
                                        <ul>
                                            <li>
                                                <Link to="/buycar">Buying a Used Car</Link>
                                            </li>
                                            {!isAuthenticated && (
                                                <>
                                                    <li>
                                                        <Link to="/login">Login</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/register">Register</Link>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className='footer-widget'>
                                    <Link className='other-logo'><img src={`${process.env.PUBLIC_URL}/logo/car24-dark.png`} width={200} alt="logo" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='footer_buttons'>
                                        <Link to={'tel:9327647995'} target='blank'>
                                            <Button type="default" icon={<PhoneOutlined />}>7096061000</Button>
                                        </Link>
                                        <Link to={'/buycar'}>
                                            <Button type="primary">Buy</Button>
                                        </Link>
                                        <Link to={'/sellcar'}>
                                            <Button type="primary">Sell</Button>
                                        </Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer