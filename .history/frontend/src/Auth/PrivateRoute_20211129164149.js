
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const PrivateRoute = () => {
    return (
        return authHelper.isAuthentcated() ? authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/about" /> : <Navigate to="/about" />;
    );
};

export default PrivateRoute;


const OnlyAdminRoute = () => {

   

};

export default OnlyAdminRoute;