import React from 'react';
import { Row, Col, Card } from 'antd';

const features = [
    {
        title: 'Welcome to our Preowned/Used Car Website—your go-to source for quality and affordable preowned vehicles. ',
        description: 'If youre in search of a dependable and budget-friendly car, youve come to the right place. Our site offers a wide range of preowned vehicles to match your budget and lifestyle. With our extensive inventory, competitive prices, and outstanding customer service, were dedicated to making your preowned car shopping experience both convenient and satisfying.',
    },
    {
        title: 'Find a Wide Selection of Quality Preowned Vehicles',
        description: "At our Preowned/Used Car Website, we provide a wide variety of preowned vehicles to meet every need and preference. Whether you're looking for a compact sedan, a roomy SUV, or a versatile crossover, our inventory has you covered. Each vehicle undergoes a comprehensive inspection to ensure its quality and reliability, so you can buy with confidence knowing you’re getting a dependable preowned car.",
    },
    {
        title: 'Unbeatable Value for Your Money',
        description: "We recognize the importance of getting value for your money when buying a preowned car. That’s why we aim to offer competitive prices, making quality preowned vehicles affordable for everyone. Our pricing is clear and straightforward, with no hidden fees or surprises. Additionally, we provide flexible financing options to fit your budget, so you can drive away in your ideal car without overspending.",
    },
    {
        title: 'Comprehensive Vehicle Information for Informed Decisions',
        description: "We’re committed to empowering you with the information needed to make well-informed decisions. Each preowned car listing on our website includes detailed specifications, mileage, ownership history, service records, and Carfax reports. Our goal is to provide complete transparency about the vehicle’s condition and background, ensuring you can select the preowned car that perfectly suits your needs.",
    },
    {
        title: 'Simple and Convenient Online Shopping Experience',
        description: "We value your time, which is why we’ve designed our Preowned/Used Car Website to streamline your car shopping experience. Our intuitive interface lets you easily browse our inventory, filter results based on your preferences, and view detailed vehicle listings from the comfort of your home. You can also schedule test drives, request more information, and apply for financing directly through our site.",
    },
    {
        title: 'Exceptional Customer Service Every Step of the Way',
        description: "At our Preowned/Used Car Website, we are committed to delivering outstanding customer service. Our team of knowledgeable and friendly professionals is here to support you throughout the entire car-buying process. Whether you have questions about a specific vehicle, need help with financing options, or require assistance with paperwork, we are dedicated to ensuring your complete satisfaction and making your preowned car purchase smooth and hassle-free.",
    },
    {
        title: 'Start Your Preowned Car Journey Today!',
        description: "Ready to find the ideal preowned vehicle? Visit our Preowned/Used Car Website today and explore a diverse selection of high-quality cars at exceptional prices. With our clear pricing, detailed vehicle information, and top-notch customer service, we're confident you'll find a preowned car that exceeds your expectations. Start your preowned car journey with us and enjoy the satisfaction of driving a reliable and affordable vehicle.",
    },
    {
        title: 'Safar cars - Your Trusted Destination for Quality Used Cars!',
        description: "Welcome to Safar Cars, where owning a reliable and affordable used car becomes a reality! We’re proud to be your trusted source for high-quality pre-owned vehicles that suit both your budget and lifestyle. Whether you’re a first-time buyer or a seasoned car enthusiast, our extensive inventory of well-maintained used cars has something perfect for you. ",
    },
];

const DreamPreowned = () => {
    return (
        <div style={{ }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h2>Discover Your Dream Preowned Car Today!</h2>
                        <p>Explore our inventory, schedule a test drive, and take the first step towards owning a quality preowned vehicle. Our Preowned Car Home Page is designed to provide you with all the information you need to make an informed decision. Start your car-buying journey with us and experience the satisfaction of finding your perfect preowned car.</p>
                        <Row gutter={[16, 16]}>
                            {features.map((feature, index) => (
                                <Col xs={24} sm={24} md={12} key={index}>
                                    <Card
                                        style={{
                                            textAlign: 'center',
                                            height: '100%',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                        }}
                                    >
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

export default DreamPreowned;
