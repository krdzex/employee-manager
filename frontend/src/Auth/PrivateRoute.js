import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const PrivateRoute = () => {
    return authHelper.isAuthentcated() ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoute;

