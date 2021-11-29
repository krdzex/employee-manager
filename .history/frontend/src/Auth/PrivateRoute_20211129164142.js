import React from 'react';

const PrivateRoute = () => {
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router';
import authHelper from './authHelper';

const OnlyAdminRoute = () => {

   

};

export default OnlyAdminRoute;