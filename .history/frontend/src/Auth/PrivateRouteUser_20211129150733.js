import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = () => {

    const { id } = useParams();

    return authHelper.isAuthentcated() acebook() ? <Outlet /> : <Navigate to="/signIn" />;

}

export default PrivateRouteUser