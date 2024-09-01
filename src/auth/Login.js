import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, setUserId } from '../redux/authSlice';
import '../css/auth.css';

const { Title, Text } = Typography;


const Login = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const [form] = Form.useForm();
    const [identifierStatus, setIdentifierStatus] = useState('');
    const [passwordStatus, setPasswordStatus] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || '/';

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('identifier', values.identifier);
        formData.append('password', values.password);

        try {
            const response = await axios.post(`${API_BASE_URL}/login.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                message.success(response.data.message);
                form.resetFields();
                setIdentifierStatus('');
                setPasswordStatus('');

                dispatch(setUserId(response.data.userId))
                dispatch(login());
                navigate(redirectTo);
            } else {
                message.error(response.data.message);
                setIdentifierStatus('error');
                setPasswordStatus('error');
            }
        } catch (error) {
            message.error('An error occurred. Please try again.');
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            <div id='auth-form'>

                <Card className='auth_form_card' >

                    <Title level={3} style={{ textAlign: 'center', marginBottom:'40px' }}>Login</Title>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="identifier"
                            label="Email or Mobile"
                            validateStatus={identifierStatus}
                            help={identifierStatus === 'error' ? 'Invalid email or mobile number' : ''}
                            rules={[
                                { required: true, message: 'Please input your email or mobile number!' }
                            ]}
                        >
                            <Input autoComplete="identifier" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            validateStatus={passwordStatus}
                            help={passwordStatus === 'error' ? 'Invalid password' : ''}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            hasFeedback
                        >
                            <Input.Password autoComplete="new-password" />
                        </Form.Item>

                        <Text type="secondary" style={{ textAlign: 'end', display: 'block' }}>
                            <Link to={'/forgotpassword'}>Forgot Password ?</Link>
                        </Text>

                        <Form.Item style={{ marginTop: '40px' }}>
                            <Button type="primary" htmlType="submit" block>Login</Button>
                        </Form.Item>
                    </Form>

                    <Text type="secondary">
                        You Are Not Ragistered ? <Link to={'/register'}>Ragister Now</Link>
                    </Text>

                </Card>
            </div>
        </>
    );
};

export default Login;
