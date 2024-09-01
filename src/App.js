import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './auth/Profile';
import SellCar from './pages/SellCar';
import About from './pages/About';
import BuyCar from './pages/BuyCar';
import Gallary from './pages/Gallary';
import Videos from './pages/Videos';
import OurTeam from './pages/OurTeam';
import Carrer from './pages/Carrer';
import Contact from './pages/Contact';
import { useDispatch, useSelector } from 'react-redux';
import LayoutComponent from './components/Layout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'
import { addData } from './redux/productSlice';
import axios from 'axios';
import { message } from 'antd';
import ProductDetails from './pages/ProductDetails';
import { addBrands } from './redux/brandSlice';
import Loader from './components/Loader';
import ForgotPassword from './auth/ForgotPassword';
import ChangePassword from './auth/ChangePassword';
import WishListItems from './pages/WishListItems';

function App() {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const isAuthenticated = useSelector(state => state.auth.isAuthenticate);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, brandsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/getProducts.php`),
          axios.get(`${API_BASE_URL}/getBrands.php`)
        ]);

        dispatch(addData(productsResponse.data));
        dispatch(addBrands(brandsResponse.data));
      } catch (error) {
        message.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, API_BASE_URL]);
  

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LayoutComponent><Home /></LayoutComponent>} />
            <Route path="/about" element={<LayoutComponent><About /></LayoutComponent>} />
            <Route path="/buycar" element={<LayoutComponent><BuyCar /></LayoutComponent>} />
            <Route path="/product/:slug" element={<LayoutComponent><ProductDetails /></LayoutComponent>} />
            <Route path="/sellcar" element={<LayoutComponent><SellCar /></LayoutComponent>} />
            <Route path="/gallery" element={<LayoutComponent><Gallary /></LayoutComponent>} />
            <Route path="/videos" element={<LayoutComponent><Videos /></LayoutComponent>} />
            <Route path="/ourteam" element={<LayoutComponent><OurTeam /></LayoutComponent>} />
            <Route path="/career" element={<LayoutComponent><Carrer /></LayoutComponent>} />
            <Route path="/contact" element={<LayoutComponent><Contact /></LayoutComponent>} />

            {!isAuthenticated && <Route path="/login" element={<LayoutComponent><Login /></LayoutComponent>} />}
            {!isAuthenticated && <Route path="/register" element={<LayoutComponent><Register /></LayoutComponent>} />}
            {!isAuthenticated && <Route path="/forgotpassword" element={<LayoutComponent><ForgotPassword /></LayoutComponent>} />}

            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/changepassword" element={<PrivateRoute component={ChangePassword} />} />
            <Route path="/wishlist" element={<PrivateRoute component={WishListItems} />} />

          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
