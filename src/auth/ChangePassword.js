import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;


const ChangePassword = ({ email, onClose }) => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleChangePassword = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('current_password', values.current_password);
        formData.append('new_password', values.new_password);

        try {
            const response = await axios.post(`${API_BASE_URL}/changePassword.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                message.success('Password changed successfully');
                form.resetFields();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('An error occurred while changing the password');
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div id='auth-form'>

            <Card className='auth_form_card' >

                <Title level={3} style={{ textAlign: 'center', marginBottom: '40px' }}>Change Password</Title>
                <Form form={form} onFinish={handleChangePassword} layout="vertical">
                    <Form.Item
                        name="current_password"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="new_password"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    
                    <Form.Item style={{ marginTop: '40px' }}>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ChangePassword;
