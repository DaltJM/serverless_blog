import React, { useState } from 'react';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';

const userPoolId = import.meta.env.VITE_USER_POOL_ID;
const clientId = import.meta.env.VITE_CLIENT_ID;

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

function ActivateAccount() {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('Account successfully activated');
      console.log('Activation result:', result);
      //Redirect to login component
      navigate('/login');
    });
  };
  const handleResendCode = () => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        setResendStatus(`Error: ${err.message || JSON.stringify(err)}`);
        return;
      }
      setResendStatus('Verification code sent successfully');
      console.log('Resend code result:', result);
    });
  };

  return (
    <div>
      <h1>Activate Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Verification Code"
          required
        />
        <button type="submit">Activate Account</button>
      </form>
      {/* DEV: element feedback for any errors on sending user the code */}
      <button onClick={handleResendCode}>Resend Code</button>
      {resendStatus && <p>{resendStatus}</p>}
    </div>
  );
}

export default ActivateAccount;