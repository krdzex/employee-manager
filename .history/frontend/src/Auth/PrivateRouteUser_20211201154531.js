import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = () => {

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
    }, [id]);

    if(state === 'loading') {
        return null
      }

    

    return state ? <Outlet /> : <Navigate to="/teams" />;

}

export default PrivateRouteUser