import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const OnlyAdminRoute = () => {

    return  authHelper.isAuthentcated()  ? <Outlet /> : <Navigate to="/about" />;

};

export default OnlyAdminRoute;