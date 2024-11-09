import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token'); // Replace with your authentication token storage method

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;