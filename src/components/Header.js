import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  CarOutlined,
  DollarOutlined,
  PictureOutlined,
  PhoneOutlined,
  LoginOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { setSelectedBrand } from '../redux/brandSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const { Header } = Layout;

const AppHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticate);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSelectedBrand = () => {
    dispatch(setSelectedBrand());
  };

  const logOUt = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
    {
      key: '/buycar',
      icon: <CarOutlined />,
      label: <Link onClick={handleSelectedBrand} to="/buycar">Buy Car</Link>,
    },
    {
      key: '/sellcar',
      icon: <DollarOutlined />,
      label: <Link to="/sellcar">Sell Car</Link>,
    },
    {
      key: '/gallery',
      icon: <PictureOutlined />,
      label: <Link to="/gallery">Gallery</Link>,
    },
    {
      key: '/contact',
      icon: <PhoneOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
    isAuthenticated ?
      {
        key: 'Profile',
        icon: <LoginOutlined />,
        label: <Link>Profile</Link>,
        children: [
          {
            key: '/profile',
            label: <Link to="/profile">Profile</Link>,
          },
          {
            key: '/wishlist',
            label: <Link to="/wishlist">WishList</Link>,
          },
          {
            key: 'logout',
            label: <Link onClick={logOUt}>Log Out</Link>,
          }
        ],
      } :
      {
        key: 'Auth',
        icon: <LoginOutlined />,
        label: <Link>Login</Link>,
        children: [
          {
            key: '/login',
            label: <Link to="/login">Login</Link>,
          },
          {
            key: '/register',
            label: <Link to="/register">Register</Link>,
          }
        ],
      },
  ];

  let selectedKey = location.pathname;
  if (location.pathname.startsWith('/product/')) {
    selectedKey = '/buycar';
  }

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const openWhatsAppChat = () => {
    const phoneNumber = "9327647995";

    const message = `Hello, I have an inquiry regarding your services.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <Header className="header">
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className="header-top">
              <div className="logo">
                <Link to={'/'}>
                  <img src={`${process.env.PUBLIC_URL}/logo/black.png`} alt="logo" />
                </Link>
              </div>
              <div className="right-side">
                <div className="social-icons desktop_device">
                  <Link to={'https://facebook.com'} target='blank'>
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Link>
                  <Link to={'https://instagram.com'} target='blank'>
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                  <Link onClick={openWhatsAppChat}>
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </Link>
                </div>
                <div className="action-buttons desktop_device">
                  <Link to={'/buycar'}>
                    <Button type="primary">Buy</Button>
                  </Link>
                  <Link to={'/sellcar'}>
                    <Button type="primary">Sell</Button>
                  </Link>
                  <Link to={'tel:9327647995'} target='blank'>
                    <Button type="default" icon={<PhoneOutlined />}>7096061000</Button>
                  </Link>
                </div>
                <div className='mobile_device'>
                  <Button className="menu-toggle" type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="header-line"></div>
      <Menu
        mode="horizontal"
        className="menu header-menu desktop_device"
        selectedKeys={[selectedKey]}
        items={menuItems}
        overflowedIndicator="More"
      />

      <Drawer style={{ position: 'relative' }} className='mobile_device' title="Menu" placement="right" onClose={closeDrawer} open={drawerVisible}>
        <Menu mode="vertical" selectedKeys={[selectedKey]} items={menuItems} onClick={closeDrawer} />

        <div className="header-line"></div>

        <div className="social-icons-mobile">
          <Link to={'https://facebook.com'} target='blank'>
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
          <Link to={'https://instagram.com'} target='blank'>
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link onClick={openWhatsAppChat}>
            <FontAwesomeIcon icon={faWhatsapp} />
          </Link>
        </div>

        <div className="action-buttons-mobile">
          <Link to={'/buycar'}>
            <Button type="primary">Buy</Button>
          </Link>
          <Link to={'/sellcar'}>
            <Button type="primary">Sell</Button>
          </Link>
          <Link style={{ width: '100%' }} to={'tel:9327647995'} target='blank'>
            <Button type="default" icon={<PhoneOutlined />}>9327647995</Button>
          </Link>
        </div>
      </Drawer>

    </Header>
  );
};

export default AppHeader;
