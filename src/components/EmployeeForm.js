import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;

const EmployeeForm = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        const formData = new FormData();
        formData.append('employeeName', values.employeeName);
        formData.append('mobileNumber', values.mobileNumber);
        formData.append('email', values.email);
        console.log(values.resume);
        if (values.resume && values.resume.fileList.length > 0) {
            formData.append('resume', values.resume.fileList[0].originFileObj);
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/addEmploye.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.status === 'success') {
                message.success('Form submitted successfully!');
            } else {
                message.error('Failed to submit form: ' + response.data.message);
            }
        } catch (error) {
            message.error('Error submitting form: ' + error.message);
        }
    };

    const handleFileChange = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const beforeUpload = (file) => {
        const isSupportedFormat = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        if (!isSupportedFormat) {
            message.error('You can only upload PDF or Word files!');
        }
        const isLargeEnough = file.size / 1024 / 1024 >= 1;
        if (!isLargeEnough) {
            message.error('File must be at least 1MB!');
        }
        return isSupportedFormat && isLargeEnough;
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            style={{ maxWidth: '500px', margin: '0 auto', marginTop: '50px' }}
        >
            <Form.Item
                label="Employee Name"
                name="employeeName"
                rules={[{ required: true, message: 'Please enter the employee name' }]}
            >
                <Input placeholder="Enter employee name" />
            </Form.Item>

            <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                    { required: true, message: 'Please enter the mobile number' },
                    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                ]}
            >
                <Input placeholder="Enter mobile number" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter the email' },
                    { type: 'email', message: 'Please enter a valid email' }
                ]}
            >
                <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
                label="Attachment of Resume (PDF & Word Only)"
                name="resume"
                valuePropName="file"
                rules={[{ required: true, message: 'Please upload your resume' }]}
            >
                <Dragger
                    name="file"
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange}
                    multiple={false}
                    maxCount={1}
                    customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)} 
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only PDF and Word files with a minimum size of 1MB.
                    </p>
                </Dragger>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EmployeeForm;
