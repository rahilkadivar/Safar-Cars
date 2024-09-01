import React from 'react';
import { ShareAltOutlined, WhatsAppOutlined, CopyOutlined, MessageOutlined } from '@ant-design/icons';
import { Tooltip, Button, message } from 'antd';

const ShareProduct = ({ url, title }) => {
    const handleShareWhatsApp = () => {
        const message = `Car Name: ${title}%0A%0ACar URL: ${url}`;
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShareTelegram = () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(telegramUrl, '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        message.success('Link copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap:'20px', marginTop: '20px' }}>
            <Tooltip title="Share on WhatsApp">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<WhatsAppOutlined />}
                    onClick={handleShareWhatsApp}
                />
            </Tooltip>
            <Tooltip title="Share on Telegram">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<MessageOutlined />}
                    onClick={handleShareTelegram}
                />
            </Tooltip>
            <Tooltip title="Copy Link">
                <Button
                    type="default"
                    shape="circle"
                    icon={<CopyOutlined />}
                    onClick={handleCopyLink}
                />
            </Tooltip>
        </div>
    );
};

export default ShareProduct;