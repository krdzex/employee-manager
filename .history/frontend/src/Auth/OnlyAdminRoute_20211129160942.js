import React from 'react';
import { Outlet } from 'react-router';
import authHelper from './authHelper';

const OnlyAdminRoute = () => {

    return authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/" />;

};

export default OnlyAdminRoute;