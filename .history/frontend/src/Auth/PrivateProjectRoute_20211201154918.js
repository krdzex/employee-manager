import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateProjectRoute = () => {

    const [state, setState] = useState('loading');
    const { id } = useParams();

    useEffect(() => {
        (async function () {
            try {
                let isAuthorized = await authHelper.isAuthorizedProjects(id)
                setState(isAuthorized);
            }
            catch {
                setState(false);
            }
        })();
    }, [id]);

    if (state === 'loading') {
        return null
    }

    return state || authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/projects" />;
    return state ? <Outlet /> : authHelper.isAuthentcated() ? authHelper.isAuthentcated().user.role === "Admin" ? <Outlet /> : <Navigate to="/teams" /> : <Navigate to="/projects" />;
}

export default PrivateProjectRoute