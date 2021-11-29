import React from 'react';
import authHelper from './authHelper';

const OnlyAdminRoute = () => {

    return authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/teams" />;

};

export default OnlyAdminRoute;