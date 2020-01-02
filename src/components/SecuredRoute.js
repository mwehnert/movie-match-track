import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../auth/auth0-wrapper';
import Home from './Home';

function SecuredRoute(props) {
  const { component: Component, path } = props;
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Route
      path={path}
      exact
      render={() => {
        if (!isAuthenticated) {
          return <Home />;
        }
        return <Component />;
      }}
    />
  );
}

export default SecuredRoute;
