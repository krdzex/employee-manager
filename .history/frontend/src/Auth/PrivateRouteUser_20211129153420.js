import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteUser = async() => {

    const { id } = useParams();

    useEffect(() => {
        (async function() {
          try {
            /* Update effect logic to track correct state */
            let da = await authHelper.isAuthorized(id)
            setState(isUserLogged ? 'loggedin' : 'redirect');
          }
          catch {
            setState('redirect');
          }
        })();
      }, []);

    
    return authHelper.isAuthorized(id) ? <Outlet /> : <Navigate to="/signIn" />;

}

export default PrivateRouteUser