import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Card, Descriptions, message, Typography } from 'antd';
import { Link } from 'react-router-dom';

const Profile = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const userId = useSelector((state) => state.auth.userId);

    const { Title } = Typography;


    const fetchUserData = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/getCurrentUser.php`, {
                params: { id },
            });
            if (response.data.status === 'success') {
                setUser(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        }
    }, [userId]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '100px', backgroundColor:'#F0F2F5',  minHeight:'80vh' }}>
                <Card style={{ width: '600px' }}>
                    {loading && <p>Loading...</p>}
                    {user ? (
                        <>
                            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome, {user.name}</Title>
                            <Descriptions size='large' column={1} bordered>
                                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                                <Descriptions.Item label="Mobile">{user.mobile}</Descriptions.Item>
                                <Descriptions.Item label="Address">{user.address && user.address}</Descriptions.Item>
                                <Descriptions.Item label="Password">
                                    ********
                                    <Link to={'/changepassword'}>
                                        <Button type='primary'>Change Password</Button>
                                    </Link>
                                </Descriptions.Item>
                            </Descriptions>
                        </>
                    ) : (
                        !loading && <p>No user data available.</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Profile;
