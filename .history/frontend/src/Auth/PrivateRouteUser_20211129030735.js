import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = () => {
    const { id } = useParams();
    let isGood = await authHelper.isAuthorized(id)

    return isGood ? <Outlet /> : <Navigate to="/about" />;

}

export default PrivateRouteUser