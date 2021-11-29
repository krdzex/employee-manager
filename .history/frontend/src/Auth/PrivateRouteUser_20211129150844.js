import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = () => {

    const { id } = useParams();

    //console.log(authHelper.isAuthorized(id))
    return authHelper.isAuthorized(id) ? <Outlet /> : <Navigate to="/signIn" />;

}

export default PrivateRouteUser