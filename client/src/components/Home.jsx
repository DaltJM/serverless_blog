import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPoolId = import.meta.env.VITE_USER_POOL_ID;
const clientId = import.meta.env.VITE_CLIENT_ID;

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      // Redirect to landing component
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <img src="http://www.quickmeme.com/img/52/52bae247bbdd636bb751a1e5f942df392aefd10e8a9071dcaa31dbcb19df6e92.jpg" />
      <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
