import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRoute = () => {
    let isGood;
    const { id } = useParams();
    let location = useLocation();
    authHelper.isAuthorized(id)
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


    export default PrivateRoute