import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = () => {
    let isGood;
    const { id } = useParams();
    authHelper.isAuthorized(id)
        .then(res => {
            isGood = res;
            if (isGood) {
                return <Outlet />;
            } else {
                <Navigate to="/about" />
            }
        }).catch((error) => {
            console.log(error)
        })
        return null;
}

export default PrivateRouteUser