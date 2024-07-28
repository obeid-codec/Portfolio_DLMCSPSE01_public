import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as userUtil from './userUtil';

const PrivateRoute = ({ element: Component }) => {
    const location = useLocation();

    return userUtil.isLoggedIn() ? (
        Component
    ) : (
        <Navigate to="/" state={{ from: location }} />
    );
};

export default PrivateRoute;
