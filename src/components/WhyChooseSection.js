import React from 'react';
import { Row, Col, Card } from 'antd';

const features = [
    {
        imageSrc: './images/whychoose/lp-wnuc-1.png',
        title: 'Extensive Selection',
        description: 'We offer a wide selection of used cars from a variety of makes and models, giving you plenty of choices. Each vehicle undergoes a thorough inspection to ensure it meets our top standards for quality and performance.',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-2.png',
        title: 'Certified Quality',
        description: 'Every used car in our inventory is meticulously inspected by our skilled technicians. We provide certified pre-owned vehicles with available warranty options, ensuring you have the peace of mind you deserve with your purchase.',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-3.png',
        title: 'Transparent History',
        description: 'At Safar cars, we prioritize transparency. Each used car includes a detailed vehicle history report, offering you a complete record of its past ownership, service history, and any accident reports. ',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-4.png',
        title: 'Financing Made Easy',
        description: 'Our finance experts are ready to guide you through the financing process with ease. We collaborate with trusted lenders to provide competitive financing options that are customized to your needs and credit score.',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-5.png',
        title: 'Trade-In Assistance',
        description: 'Ready to upgrade your current vehicle? Our trade-in assistance program offers a fair evaluation of your trade-in, applying its value toward the purchase of your new used car.',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-6.png',
        title: 'Expert Advice',
        description: 'Our expert and approachable sales team is committed to helping you find the ideal used car that meets your needs and preferences. We’re here to answer all your questions and support you throughout the entire buying process.',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-7.png',
        title: 'Customer Satisfaction',
        description: 'Your satisfaction is our highest priority. From the moment you enter our showroom to the day you drive off in your used car, we are dedicated to delivering outstanding customer service and support.',
    },
    {
        imageSrc: './images/whychoose/lp-wnuc-8.png',
        title: 'Explore Our Used Car Inventory',
        description: 'Our easy-to-navigate website lets you explore our current inventory online. You can search by make, model, price range, and other criteria to find the used car that fits your needs. Each listing features detailed specifications, photos, and pricing information to assist you in making an informed decision.',
    },
];

const WhyChooseSection = () => {
    return (
        <div style={{  }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h2 style={{ textAlign:'center', marginBottom:'20px'}}>Why Choose Safar Cars for Your Next Used Car?</h2>
                        <Row gutter={[16, 16]} style={{ justifyContent:'center' }}>
                            {features.map((feature, index) => (
                                <Col xs={24} sm={24} md={8} key={index}>
                                    <Card bordered={true} style={{ textAlign: 'center', height: '100%' }}>
                                        <div>
                                            <img
                                                src={feature.imageSrc}
                                                alt={feature.title}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </div>
                                        <h5 style={{ marginTop: '15px', marginBottom: '10px' }}>{feature.title}</h5>
                                        <p>{feature.description}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseSection;
