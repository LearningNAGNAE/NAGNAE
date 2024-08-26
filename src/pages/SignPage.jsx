import React from 'react'
import { useLocation } from 'react-router-dom';
import SignUp from '../components/login/SignUp';
import SignIn from '../components/login/SignIn';
import ModifyAccount from '../components/login/ModifyAccount';

function SignPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  return (
    <div className="login-wrap">
      <div className="login-contents">
        {(() => {
          switch (type) {
            case 'signup':
              return <SignUp />;
            case 'signin':
              return <SignIn />;
            case 'modifyaccount':
              return <ModifyAccount />;
            default:
          }
        })()}
      </div>
    </div>
  )
}

export default SignPage