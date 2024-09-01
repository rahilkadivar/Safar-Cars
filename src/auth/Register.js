import React from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;


const Register = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('address', values.address);
        formData.append('password', values.password);
        formData.append('confirm_password', values.confirm_password);


        try {
            const response = await axios.post(`${API_BASE_URL}/register.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success(response.data.message);
            form.resetFields();
        } catch (error) {
            message.error('Failed to submit data');
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            <div id='auth-form'>

                <Card className='auth_form_card' >

                <Title level={3} style={{ textAlign: 'center', marginBottom:'40px' }}>Register</Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
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
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 8, message: 'Password must be Minimum 8 digits!' }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        
                        <Form.Item style={{ marginTop: '40px' }}>
                            <Button type="primary" htmlType="submit" block>Register</Button>
                        </Form.Item>
                    </Form>

                    <Text type="secondary">
                        You Are Already Ragistered ? <Link to={'/login'}>Login Now</Link>
                    </Text>
                </Card>
            </div>
        </>

    );
};

export default Register;
