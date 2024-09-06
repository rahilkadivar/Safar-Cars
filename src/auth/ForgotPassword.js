import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Card } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const ForgotPassword = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const [form] = Form.useForm();
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('email', values.email);
        try {
            const response = await axios.post(`${API_BASE_URL}/forgotPassword.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                message.success(response.data.message);
                setOtpSent(true);
                setEmail(values.email);
                setLoading(false);

            } else {
                message.error(response.data.message);
                setLoading(false);
            }
        } catch (error) {
            message.error('Failed to submit data');
            console.error('There was an error!', error);
        }
    };

    const handleVerifyOtp = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/verifyOtp.php`, JSON.stringify({
                email: email,
                otp: values.otp
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data); 
            if (response.data.success) {
                message.success('OTP verified successfully');
                setOtpVerified(true);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('An error occurred while verifying OTP');
            console.error('Error details:', error.response ? error.response.data : error.message); 
        } finally {
            setLoading(false); 
        }
    };




    const handleResetPassword = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/resetPassword.php`, JSON.stringify({
                email: email,
                password: values.password
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                message.success('Password reset successfully');
                form.resetFields();
                setOtpSent(false);
                setOtpVerified(false);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('An error occurred while resetting your password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='auth-form'>

            <Card className='auth_form_card' >

                <Title level={3} style={{ textAlign: 'center', marginBottom: '40px' }}>Forgot Password</Title>

                <Form form={form} onFinish={otpSent ? (otpVerified ? handleResetPassword : handleVerifyOtp) : handleSendOtp} layout="vertical">
                    {!otpSent && (
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {otpSent && !otpVerified && (
                        <Form.Item
                            name="otp"
                            label="OTP"
                            rules={[{ required: true, message: 'Please input the OTP sent to your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {otpVerified && (
                        <Form.Item
                            name="password"
                            label="New Password"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item style={{ marginTop: '40px' }}>
                        <Button loading={loading} type="primary" htmlType="submit" block>
                            {otpSent ? (otpVerified ? 'Reset Password' : 'Verify OTP') : 'Send OTP'}
                        </Button>
                    </Form.Item>
                </Form>

                <Text type="secondary">
                    You Are Not Ragistered ? <Link to={'/register'}>Ragister Now</Link>
                </Text>
            </Card>
        </div>
    );
};

export default ForgotPassword;
