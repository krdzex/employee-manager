import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = async () => {

    const [state, setState] = useState('loading');
    const { id } = useParams();

    useEffect(() => {
        (async function () {
            try {
                /* Update effect logic to track correct state */
                let isAuthorized = await authHelper.isAuthorized(id)
                setState(isAuthorized);
            }
            catch {
                setState('redirect');
            }
        })();
    }, []);

    if(state === 'loading') {
        return <div>Loading..</div>
      }
      

    return authHelper.isAuthorized(id) ? <Outlet /> : <Navigate to="/signIn" />;

}

export default PrivateRouteUser