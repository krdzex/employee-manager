import React from 'react';

const PrivateRoute = () => {
    return (
        return authHelper.isAuthentcated() ? authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/about" /> : <Navigate to="/about" />;
    );
};

export default PrivateRoute;


const OnlyAdminRoute = () => {

   

};

export default OnlyAdminRoute;