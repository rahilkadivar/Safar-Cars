import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    YoutubeOutlined,
    WhatsAppOutlined,
    PhoneOutlined
  } from '@ant-design/icons';
import '../css/Footer.css';

const Footer = () => {
    return (
        <div>
            <section className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className='footer-widget'>
                                <div className='sfc-footer-logo'>
                                    <img src={`${process.env.PUBLIC_URL}/images/logo.png`} width={300} alt="logo" />
                                </div>
                                <div class="sesfooter_about">
                                    <p>Welcome to Jolly Motors, your one-stop destination for finding top-quality used cars that you can trust. With years of experience in the automotive industry, we have established ourselves as a reputable and reliable source for pre-owned vehicles. Our mission is to provide our customers with a seamless and enjoyable car buying experience, offering a diverse selection of well-maintained used cars to meet various needs and preferences.</p>
                                </div>
                                <div className='footer-social-media'>
                                    <div className="social-icons">
                                        <FacebookOutlined />
                                        <InstagramOutlined />
                                        <WhatsAppOutlined />
                                    </div>
                                </div>
                                <div class="_copyright">©2024 Copyright Jolly Motors. All Rights Reserved.</div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className='footer-widget'>
                                        <h4 className='footer-title'>Pages</h4>
                                        <ul className='footer-menu'>
                                            <li>
                                                <Link to="javascript:void(0)">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Buy Car</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Sell Car</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Music</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Our Team</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Contact</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">About</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Inquiry</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Gallery</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Videos</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Careers</Link>
                                            </li>
                                            <li>
                                                <Link to="javascript:void(0)">Pay</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className='footer-widget'>
                                        <h4 className='footer-title'>FAQ's</h4>
                                        <ul>
                                            <li>
                                                <Link to="javascript:void(0)">Buying a Used Car</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className='footer-widget'>
                                        <h4 className='footer-title'>Other</h4>
                                        <ul>
                                            <li>
                                                <Link to="javascript:void(0)">Privacy & Terms of Service</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='footer_buttons'>
                                        <Button type="primary" icon={<PhoneOutlined />}>9327647995</Button>
                                        <Button type="default">Login</Button>
                                        <Button type="default">Sign Up</Button>
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