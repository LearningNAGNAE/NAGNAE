import React from 'react'
import { useLocation } from 'react-router-dom';
import SignUp from '../components/login/SignUp';
import Login from '../components/login/SignIn';

function SignPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  return (
    <div className="login-wrap">
      <div className="login-contents">
        <div>
          {type === 'signup' ? <SignUp /> : <Login />}
        </div>
      </div>
    </div>
  )
}

export default SignPage