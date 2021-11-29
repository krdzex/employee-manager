import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const BlockedRoute = () => {
    return authHelper.isAuthentcated() ? <Outlet /> : <Navigate to="/employees" />;
};

export default BlockedRoute;



const PrivateRoute = () => {
    
};

export default PrivateRoute;
