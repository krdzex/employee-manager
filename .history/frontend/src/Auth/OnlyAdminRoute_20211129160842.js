import React from 'react';

const OnlyAdminRoute = () => {

    return state || authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/teams" />;

};

export default OnlyAdminRoute;