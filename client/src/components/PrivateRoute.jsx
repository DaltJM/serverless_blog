import React from 'react';
import { Navigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPoolId = import.meta.env.VITE_USER_POOL_ID;
const clientId = import.meta.env.VITE_CLIENT_ID;

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

function PrivateRoute({ children }) {
  const currentUser = userPool.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
