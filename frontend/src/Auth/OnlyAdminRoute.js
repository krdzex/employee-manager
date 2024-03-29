import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const OnlyAdminRoute = () => {

    return authHelper.isAuthentcated() ? authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/about" /> : <Navigate to="/about" />;

};

export default OnlyAdminRoute;