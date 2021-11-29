import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const BlockedRoute = () => {
    return !authHelper.isAuthentcated() ? <Outlet /> : <Navigate to="/about" />;
};

export default BlockedRoute;



