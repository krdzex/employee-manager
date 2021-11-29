import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateProjectRoute = () => {

    const [state, setState] = useState('loading');
    const { id } = useParams();

    useEffect(() => {
        (async function () {
            try {
                let isAuthorized = await authHelper.isAuthorized(id)
                setState(isAuthorized);
            }
            catch {
                setState(false);
            }
        })();
    }, []);

    if (state === 'loading') {
        return null
    }

    return state || authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/teams" />;

}

export default PrivateProjectRoute