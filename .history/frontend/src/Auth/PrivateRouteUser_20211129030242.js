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
                    console.log("AA")
                    return <Outlet />;
                }
            }).catch((error) => {
                return <Navigate to='/signin' />
            })
            console.log("AA2")
    return authHelper.isAuthentcated() ? <Outlet /> : <Navigate to="/about" />;
}

export default PrivateRoute