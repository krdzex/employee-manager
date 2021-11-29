import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = () => {

    return authHelper.isAuthorized(auth) ? <Outlet /> : <Navigate to="/signIn" />;

}

export default PrivateRouteUser