import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const LayoutComponent = ({ children }) => {
    return (
        <Layout style={{  }}>
            <AppHeader />
            <Layout>
                <Content style={{ overflow: 'initial', background: '#fff' }}>
                    <div style={{ }}>
                        {children}
                    </div>
                </Content>
            </Layout>
            <Footer />
        </Layout>
    )
}

export default LayoutComponent;
