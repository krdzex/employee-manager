import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = async() => {
    const { id } = useParams();
    let isGood = authHelper.isAuthorized(id)
        .then(res => {
            console.log(res)
            isGood = res;
            if (isGood) {
                return <Outlet />;
            } else {
                <Navigate to="/about" />
            }
        }).catch((error) => {
            console.log(error)
        })
}

export default PrivateRouteUser