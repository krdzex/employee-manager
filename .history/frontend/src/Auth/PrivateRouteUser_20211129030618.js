import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = async () => {
    const { id } = useParams();
    let isGood = await authHelper.isAuthorized(id)
        
            if (isGood) {
                return <Outlet />;
            } else {
                <Navigate to="/about" />
            }
}

export default PrivateRouteUser