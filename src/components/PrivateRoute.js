import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LayoutComponent from './Layout';

const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticate);

    return isAuthenticated ? (
        <LayoutComponent>
            <Component />
        </LayoutComponent>
    ) : (
        <Navigate to="/login" />
    );
}

export default PrivateRoute;
