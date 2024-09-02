import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const InqueryForm = ({ productId, onClose, slug }) => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('mobileNumber', values.mobileNumber);
        formData.append('email', values.email);
        formData.append('message', values.message);
        formData.append('productId', productId);
        formData.append('slug', slug);

        try {
            const response = await axios.post(`${API_BASE_URL}/addInquery.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                message.success('Form submitted successfully!');
                onClose();
                setLoading(false);
            } else {
                message.error('Failed to submit form: ' + response.data.message);
                setLoading(false);
            }
        } catch (error) {
            message.error('Error submitting form: ' + error.message);
            setLoading(false);
        }
    };


    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            style={{ maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                    { required: true, message: 'Please enter your mobile number' },
                    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                ]}
            >
                <Input placeholder="Enter your mobile number" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email address' }
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
            >
                <TextArea rows={4} placeholder="Enter your message" />
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InqueryForm;
