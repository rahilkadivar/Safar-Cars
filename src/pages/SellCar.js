import { Button, Descriptions, Form, Input, List, message, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { rto } from '../data/rto';
import { kilometers, models, variant, years } from '../data/data';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import FourImageSection from '../components/FourImageSection';

const SellCar = () => {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentItem, setCurrentItem] = useState(0);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getBrands = useSelector((state) => state.brand.brands);

    useEffect(() => {
        setBrands(getBrands);
    }, [getBrands]);

    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const onFinish = async (values) => {
        setLoading(true)
        const finalData = { ...formData, ...values };
        console.log('Form Values:', finalData);
        try {
            const response = await axios.post(`${API_BASE_URL}/submitSellForm.php`, finalData);
            if (response.data.status === 'success') {
                message.success('Form submitted successfully!');
                form.resetFields();
                setCurrentStep(0);
                setFormData({});
                setLoading(false)
            } else {
                message.error('Failed to submit form!');
                setLoading(false);
            }
        } catch (error) {
            message.error('Error submitting form!');
            setLoading(false);
        }
    };


    const next = () => {
        form.validateFields().then((values) => {
            setFormData({ ...formData, ...values });
            setCurrentStep(currentStep + 1);
        }).catch((error) => {
            console.log('Validation Failed:', error);
        });
    };
    const nextItem = () => {
        form.validateFields().then((values) => {
            setFormData({ ...formData, ...values });
            if (currentItem <= 1) {
                setCurrentItem(currentItem + 1);
            }
        }).catch((error) => {
            console.log('Validation Failed:', error);
        });
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div>
            <section className='cell-car-product pb-0'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='carsell-content'>
                                {formData &&
                                    <List className="horizontal-list">
                                        {formData?.brand_name && <List.Item className="horizontal-list-item">{formData?.brand_name}</List.Item>}
                                        {formData?.rto && <List.Item className="horizontal-list-item">{formData?.rto}</List.Item>}
                                        {formData?.manufacturing_year && <List.Item className="horizontal-list-item">{formData?.manufacturing_year}</List.Item>}
                                        {formData?.model && <List.Item className="horizontal-list-item">{formData?.model}</List.Item>}
                                        {formData?.fuel_type && <List.Item className="horizontal-list-item">{formData?.fuel_type}</List.Item>}
                                        {formData?.transmission && <List.Item className="horizontal-list-item">{formData?.transmission}</List.Item>}
                                        {formData?.variant && <List.Item className="horizontal-list-item">{formData?.variant}</List.Item>}
                                        {formData?.ownership && <List.Item className="horizontal-list-item">{formData?.ownership}</List.Item>}
                                        {formData?.kilometers && <List.Item className="horizontal-list-item">{formData?.kilometers}</List.Item>}
                                        {formData?.want_to_sell && <List.Item className="horizontal-list-item">{formData?.want_to_sell}</List.Item>}
                                    </List>
                                }
                                <Form className='carsell-steps'
                                    form={form}
                                    name="sellcar_form"
                                    onFinish={onFinish}
                                    layout="vertical"
                                    initialValues={formData}
                                >
                                    {currentStep === 0 && (
                                        <>
                                            <Form.Item 
                                                label="Select the brand"
                                                name="brand_name"
                                                rules={[{ required: true, message: 'Please select a brand!' }]}
                                            >
                                                <Radio.Group className='carsell-brands' onChange={next}>
                                                    {brands && brands.map((brand, index) => (
                                                        <Radio className='brand-name-list' key={index} value={brand.brand_name} onClick={() => next()} >
                                                            <img src={`${API_BASE_URL}/${brand.image}`} alt='brand' /> 
                                                            <p>{brand.brand_name}</p>
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </>
                                    )}

                                    {currentStep === 1 && (
                                        <>
                                            <Form.Item className='rto-location-step'
                                                label={
                                                    <span>
                                                        <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} />
                                                        Select RTO location
                                                    </span>
                                                }
                                                name="rto"
                                                rules={[{ required: true, message: 'Please select an RTO!' }]}
                                            >
                                                <Radio.Group className='rto-location-list' onChange={next} >
                                                    {rto && rto.map((item, index) => (
                                                        <Radio className='rto-location-name' key={index} value={item} onClick={() => next()}>{item}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </>
                                    )}

                                    {currentStep === 2 && (
                                        <>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} />
                                                        Select the car manufacturing year
                                                    </span>
                                                }
                                                name="manufacturing_year"
                                                rules={[{ required: true, message: 'Please select an manufacturing year!' }]}
                                            >
                                                <Radio.Group className='car-manufacturing-year' onChange={next}>
                                                    {years && years.map((item, index) => (
                                                        <Radio className='car-year' key={index} value={item} onClick={() => next()}>{item}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>

                                        </>
                                    )}

                                    {currentStep === 3 && (
                                        <>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} />
                                                        Select the model
                                                    </span>
                                                }
                                                name="model"
                                                rules={[{ required: true, message: 'Please select an model!' }]}
                                            >
                                                <Radio.Group className='car-mobel-list' onChange={next}>
                                                    {models && models.map((item, index) => (
                                                        <Radio className='car-model-name' key={index} value={item} onClick={() => next()}>{item}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </>
                                    )}

                                    {currentStep === 4 && (
                                        <>
                                            <p> <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} /> Select the variant of your car</p>

                                            {currentItem === 0 || currentItem === 1 || currentItem === 2 ?
                                                <Form.Item
                                                    label=" SELECT FUEL TYPE"
                                                    name="fuel_type"
                                                    rules={[{ required: true, message: 'Please select an Fuel Type!' }]}
                                                >
                                                    <Radio.Group className='car-fuel' onChange={nextItem}>
                                                        <Radio className='car-fuel-type' value='Petrol'>Petrol</Radio>
                                                        <Radio className='car-fuel-type' value='Diesel'>Diesel</Radio>
                                                        <Radio className='car-fuel-type' value='CNG'>CNG</Radio>
                                                        <Radio className='car-fuel-type' value='Electric'>Electric</Radio>
                                                        <Radio className='car-fuel-type' value='Petrol / Hybrid'>Petrol / Hybrid</Radio>
                                                        <Radio className='car-fuel-type' value='Other'>Other</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                : ''
                                            }

                                            {currentItem === 1 || currentItem === 2 ?
                                                <Form.Item
                                                    label=" SELECT TRANSMISSION"
                                                    name="transmission"
                                                    rules={[{ required: true, message: 'Please select an transmission!' }]}
                                                >
                                                    <Radio.Group className='car-transmission-list' onChange={nextItem}>
                                                        <Radio className='car-transmission' value='Manual'>Manual</Radio>
                                                        <Radio className='car-transmission' value='Automatic'>Automatic</Radio>
                                                        <Radio className='car-transmission' value='iMT'>iMT</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                                : ''
                                            }

                                            {currentItem === 2 ?
                                                <Form.Item
                                                    label=" SELECT VARIANT"
                                                    name="variant"
                                                    rules={[{ required: true, message: 'Please select an variant!' }]}
                                                >
                                                    <Radio.Group className='car-variant-list' onChange={next}>
                                                        {variant && variant.map((item, index) => (
                                                            <Radio className='car-variant' key={index} value={item} onClick={() => next()}>{item}</Radio>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>
                                                : ''
                                            }
                                        </>
                                    )}

                                    {currentStep === 5 && (
                                        <>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} />
                                                        Select the ownership
                                                    </span>
                                                }
                                                name="ownership"
                                                rules={[{ required: true, message: 'Please select an ownership!' }]}
                                            >
                                                <Radio.Group className='ownership-category' onChange={next}>
                                                    <Radio className='ownership' value='1st owner' onClick={() => next()}>1st owner</Radio>
                                                    <Radio className='ownership' value='2nd owner' onClick={() => next()}>2nd owner</Radio>
                                                    <Radio className='ownership' value='3rd owner' onClick={() => next()}>3rd owner</Radio>
                                                    <Radio className='ownership' value='I am a car dealer' onClick={() => next()} >I am a car dealer</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </>
                                    )}

                                    {currentStep === 6 && (
                                        <>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} />
                                                        Select the kilometers
                                                    </span>
                                                }
                                                name="kilometers"
                                                rules={[{ required: true, message: 'Please select an kilometers!' }]}
                                            >
                                                <Radio.Group className='car-kilometers' onChange={next}>
                                                    {kilometers && kilometers.map((item, index) => (
                                                        <Radio className='kilometers-number' key={index} value={item} onClick={() => next()}>{item}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>

                                        </>
                                    )}

                                    {currentStep === 7 && (
                                        <>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        <ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} />
                                                        When do you want to sell
                                                    </span>
                                                }
                                                name="want_to_sell"
                                                rules={[{ required: true, message: 'Please select an want to sell!' }]}
                                            >
                                                <Radio.Group className='car-want-sell-list' onChange={next}>
                                                    <Radio className='car-want-sell' value='Immediately' onClick={() => next()}>Immediately</Radio>
                                                    <Radio className='car-want-sell' value='Within a month' onClick={() => next()}>Within a month</Radio>
                                                    <Radio className='car-want-sell' value='After a month' onClick={() => next()}>After a month</Radio>
                                                    <Radio className='car-want-sell' value='Just checking price' onClick={() => next()}>Just checking price</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                        </>
                                    )}

                                    {currentStep === 8 && (
                                        <>
                                            <h5><ArrowLeftOutlined onClick={prev} style={{ marginRight: 8 }} /> Please review your details & Submit.</h5>
                                            <div className='car-submit-from'>
                                                <Form.Item
                                                    name="name"
                                                    label="Name"
                                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    label="Email"
                                                    rules={[
                                                        { required: true, message: 'Please input your email!' },
                                                        { type: 'email', message: 'The input is not valid E-mail!' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="mobile"
                                                    label="Mobile"
                                                    rules={[
                                                        { required: true, message: 'Please input your mobile number!' },
                                                        { len: 10, message: 'Mobile number must be 10 digits!' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="address"
                                                    label="Address"
                                                >
                                                    <Input.TextArea />
                                                </Form.Item>

                                                <Form.Item  wrapperCol={{ }} style={{ textAlign: 'right' }}>
                                                    <Button loading={loading} type="primary" htmlType="submit">
                                                        Submit
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                            {formData &&
                                                <>
                                                    <h5>Your Car Details</h5>
                                                    <Descriptions bordered column={1} labelStyle={{ width: '50%' }} style={{  }} >
                                                        {formData?.brand_name && <Descriptions.Item label="Select the brand of your car">{formData?.brand_name}</Descriptions.Item>}
                                                        {formData?.rto && <Descriptions.Item label="Select RTO location of your car">{formData?.rto}</Descriptions.Item>}
                                                        {formData?.manufacturing_year && <Descriptions.Item label="Select the car manufacturing year">{formData?.manufacturing_year}</Descriptions.Item>}
                                                        {formData?.model && <Descriptions.Item label="Select the model of your car">{formData?.model}</Descriptions.Item>}
                                                        {formData?.fuel_type && <Descriptions.Item label="Select the FUEL TYPE of your car">{formData?.fuel_type}</Descriptions.Item>}
                                                        {formData?.transmission && <Descriptions.Item label="Select the TRANSMISSION of your car">{formData?.transmission}</Descriptions.Item>}
                                                        {formData?.variant && <Descriptions.Item label="Select the variant of your car">{formData?.variant}</Descriptions.Item>}
                                                        {formData?.ownership && <Descriptions.Item label="Select the ownership history of your car">{formData?.ownership}</Descriptions.Item>}
                                                        {formData?.kilometers && <Descriptions.Item label="Select the kilometers driven by your car">{formData?.kilometers}</Descriptions.Item>}
                                                        {formData?.want_to_sell && <Descriptions.Item label="When do you want to sell your car?">{formData?.want_to_sell}</Descriptions.Item>}
                                                    </Descriptions>
                                                </>
                                            }
                                        </>
                                    )}

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <FourImageSection />
            </section>

        </div>
    );
};

export default SellCar;
