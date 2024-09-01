import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageSlider from '../components/ImageSlider';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, List, message, Modal, Tooltip } from 'antd';
import {
    CameraOutlined,
    CarOutlined,
    CheckCircleFilled,
    FormOutlined,
    LockOutlined,
    PoweroffOutlined,
    CalendarOutlined,
    IdcardOutlined,
    SafetyOutlined,
    EnvironmentOutlined,
    BgColorsOutlined,
    TrophyOutlined,
    DashboardOutlined,
    UserOutlined,
    CloudFilled,
    CoffeeOutlined,
    FireTwoTone,
    WarningOutlined,
    SwitcherFilled,
    SwitcherOutlined,
    UpSquareOutlined,
    PhoneOutlined,
    DashboardFilled,
    FundProjectionScreenOutlined,
    VideoCameraOutlined,
    HeatMapOutlined,
    FireOutlined,
    CrownOutlined,
    BulbOutlined,
    AndroidOutlined,
    AppleOutlined,
    RadarChartOutlined,
    RedEnvelopeOutlined,
    LockFilled,
    SettingOutlined,
    SkinOutlined,
    AudioOutlined,
    WindowsOutlined,
    HeartFilled,
    HeartOutlined
} from '@ant-design/icons';
import ShareProduct from '../components/ShareProduct';
import RelatadProduct from '../components/RelatadProduct';
import InqueryForm from '../components/InqueryForm';

import html2canvas from 'html2canvas';
import WishList from '../components/WishList';


const ProductDetails = () => {
    const productData = useSelector((state) => state.product.data);
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const convertToSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const matchProduct = () => {
        const matchedProduct = productData.find(product => convertToSlug(product.product_name) === slug);
        if (matchedProduct) {
            setData(matchedProduct);
        } else {
            alert('Product Url is Not Correct');
            navigate("/buycar");
        }
    };

    useEffect(() => {
        if (productData.length > 0) {
            matchProduct();
        }
    }, [productData, slug]);


    const featureIcons = {
        "ABS": <SafetyOutlined />,
        "Keyless Start": <LockOutlined />,
        "Power Windows": <WindowsOutlined />,
        "Sunroof": <CarOutlined />,
        "Integrated (In-Dash) Music System": <AudioOutlined />,
        "Leather Seats": <SkinOutlined />,
        "Audio Controls on Steering": <SettingOutlined />,
        "Power Steering": <CarOutlined />,
        "Central Locking": <LockFilled />,
        "Rear AC Vent": <RedEnvelopeOutlined />,
        "Child Safety Locks": <SafetyOutlined />,
        "Airbags": <SafetyOutlined />,
        "GPS Navigation System": <EnvironmentOutlined />,
        "Rear Camera": <CameraOutlined />,
        "Rear Parking Sensor": <RadarChartOutlined />,
        "Apple Car Play": <AppleOutlined />,
        "Android Auto Audio System": <AndroidOutlined />,
        "Heads Up Display": <DashboardOutlined />,
        "360 Degree Camera": <CameraOutlined />,
        "Fancy Ambient Lighting": <BulbOutlined />,
        "Ventilated Seats": <CrownOutlined />,
        "Ventilated Rear Seats": <FireOutlined />,
        "Heated Steering Wheel": <HeatMapOutlined />,
        "Dual Zone Climate Control": <DashboardOutlined />,
        "Rear Seat Infotainment": <VideoCameraOutlined />,
        "Front Camera + Parking Sensors": <CameraOutlined />,
        "Digital Instrument Clusters": <FundProjectionScreenOutlined />,
        "TPMS (Tyre Pressure Monitoring System)": <DashboardFilled />,
        "Wireless Phone Charging": <PhoneOutlined />,
        "Paddle Shifters": <UpSquareOutlined />,
        "Electrically Adjustable & Foldable ORVMs": <SwitcherOutlined />,
        "Electrically Adjustable ORVMs": <SwitcherFilled />,
        "Keyless Entry": <LockOutlined />,
        "Push Button Start/Stop": <PoweroffOutlined />,
        "Autonomous Emergency Braking": <WarningOutlined />,
        "Collision Avoidance Systems": <FireTwoTone />,
        "Headlamp Washers": <CoffeeOutlined />,
        "Switchable Drive Modes": <CloudFilled />,
        "Auto Climate Control": <DashboardOutlined />,
    };

    const currentUrl = window.location.href;

    const handleScreenshotDownload = () => {
        const input = document.getElementById('screenshot-content');

        const images = Array.from(input.querySelectorAll('img'));
        const promises = images.map(img => {
            if (img.complete) {
                return Promise.resolve();
            }
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        Promise.all(promises).then(() => {
            html2canvas(input, {
                scrollY: -window.scrollY,
                useCORS: true,
                allowTaint: false,
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'safarcars.png';
                link.click();
            }).catch((error) => {
                console.error("Error capturing screenshot:", error);
                alert('Failed to capture screenshot.');
            });
        }).catch((error) => {
            console.error('Error loading images:', error);
            alert('Failed to load all images.');
        });
    };

    const openWhatsAppChat = () => {
        const phoneNumber = "9327647995";
        const productName = data.product_name; // Replace with your actual data object or variables

        const message = `Hello, I have an inquiry regarding your services.%0A%0ACar Name: ${productName}%0A%0AProduct URL: ${currentUrl}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };


    return (
        <section className='product-details' id="screenshot-content">
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        {data && (
                            <>
                                {/* <h3>Product Details</h3> */}

                                <div className='row'>
                                    <div className='col-lg-8'>
                                        <div className='sfrcar-img-slider'>
                                            <ImageSlider images={data && data?.image} />

                                            {data?.description !== "undefined" && (
                                                <Card title={"Description"}>
                                                    <List
                                                        grid={{
                                                            gutter: 16,
                                                            xs: 1,
                                                            sm: 2,
                                                            md: 4,
                                                            lg: 4,
                                                            xl: 6,
                                                            xxl: 3,
                                                        }}>
                                                        <List.Item.Meta
                                                            avatar={<FormOutlined />}
                                                            title={"Description"}
                                                            description={data.description}
                                                        />
                                                    </List>
                                                </Card>
                                            )}
                                        </div>
                                        <div className='sesproduct_profile_fields'>
                                            <div className='profile_fields'>
                                                <Card title={"Car Overview"}>
                                                    <List grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}>
                                                        <List.Item.Meta
                                                            avatar={<CarOutlined />}
                                                            title={"Make:"}
                                                            description={data.make}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CarOutlined />}
                                                            title={"Model:"}
                                                            description={data.model}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<IdcardOutlined />}
                                                            title={"Variant:"}
                                                            description={data.variant}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CalendarOutlined />}
                                                            title={"Manufacturing Year:"}
                                                            description={data.manufacturing_year}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CalendarOutlined />}
                                                            title={"Registration Year:"}
                                                            description={data.registration_year}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CarOutlined />}
                                                            title={"Fuel Type:"}
                                                            description={data.fuel_type}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<DashboardOutlined />}
                                                            title={"KM Driven:"}
                                                            description={data.km_driven}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CarOutlined />}
                                                            title={"Transmission:"}
                                                            description={data.transmission}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<UserOutlined />}
                                                            title={"Number of Owners:"}
                                                            description={data.owners}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<SafetyOutlined />}
                                                            title={"Insurance Validity:"}
                                                            description={data.insurance_validity}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<SafetyOutlined />}
                                                            title={"Insurance Type:"}
                                                            description={data.insurance_type}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<EnvironmentOutlined />}
                                                            title={"RTO:"}
                                                            description={data.rto}
                                                        />
                                                    </List>
                                                </Card>
                                            </div>
                                            <div className='profile_fields'>
                                                <Card title={"Car Specifications"}>
                                                    <List grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}>
                                                        <List.Item.Meta
                                                            avatar={<BgColorsOutlined />}
                                                            title={"Colour:"}
                                                            description={data.colour}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CarOutlined />}
                                                            title={"Ground Clearance (mm):"}
                                                            description={data.ground_clearance}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<TrophyOutlined />}
                                                            title={"Boot Space (liters):"}
                                                            description={data.boot_space}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<UserOutlined />}
                                                            title={"Seating Capacity (person):"}
                                                            description={data.seating_capacity}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<CarOutlined />}
                                                            title={"Fuel Tank Capacity (liters):"}
                                                            description={data.fuel_tank_capacity}
                                                        />
                                                        <List.Item.Meta
                                                            avatar={<DashboardOutlined />}
                                                            title={"Max Power (bhp):"}
                                                            description={data.max_power}
                                                        />
                                                    </List>
                                                </Card>
                                            </div>
                                            <div className='profile_fields feature-list'>
                                                <Card title={"Features"}>
                                                    <List grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}>
                                                        {data.features && data.features.map((item, index) => (
                                                            <List.Item.Meta
                                                                key={index}
                                                                avatar={featureIcons[item] || <CarOutlined />}
                                                                title={item}
                                                                description={<CheckCircleFilled />}
                                                            />
                                                        ))}
                                                    </List>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='car-details'>
                                            <Card>

                                                <WishList productId={data.id} />

                                                <h5 className='car-name-title'>{data.product_name}</h5>
                                                <p><p>{data.manufacturing_year} | {data.km_driven} km | {data.fuel_type} | {data.transmission}</p></p>
                                                <p> <EnvironmentOutlined /> S.G Highway, Ahmedabad</p>
                                                <hr />
                                                <h3 className='car-price'>₹{data.price}</h3>
                                                <hr />
                                                {/* --------------------------------- */}
                                                <div className='sesproduct_information_report_btns _contact'>
                                                    <div>
                                                        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                                                            Inquery Now
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <Button type="primary" onClick={openWhatsAppChat}>
                                                            Inquery For Whatsapp
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className='sesproduct_information_report_btns _contact'>
                                                    <div>
                                                        <Button type='primary' onClick={handleScreenshotDownload}>Download</Button>
                                                    </div>
                                                </div>

                                                {/* ---------------------------------- */}
                                            </Card>
                                            <div>
                                                <ShareProduct url={currentUrl} title={data.product_name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='similar-products'>
                                    <Card title={"Similar products"}>
                                        <RelatadProduct brand={data.make} />
                                    </Card>
                                </div>

                                {/* --------------------------------------- */}
                                {/* Popup Inquery Form */}
                                <Modal
                                    title="Inquery Form"
                                    open={isAddModalOpen}
                                    onCancel={() => setIsAddModalOpen(false)}
                                    footer={null}
                                >
                                    <InqueryForm slug={slug} productId={data.id} onClose={() => setIsAddModalOpen(false)} />
                                </Modal>
                                {/* ------------------------------------ */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
