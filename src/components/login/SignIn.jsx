import React from 'react'
import userIcon from '../../assets/images/free_user.png'; // 이미지 파일 경로
import lockIcon from '../../assets/images/free-lock.png'; // 이미지 파일 경로
import FindModal from '../login/FindModal.jsx';

function SignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
    // console.log('Login attempt with:', id, password);
  };
  return (
    <div className="login-container">
      <h2 className='login-title'>LOGIN</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className="input-group">
        <label htmlFor="id"><img src={userIcon} alt="User" className="login-user-icon" /></label>
          <input
            id="id"
            type="text"
            placeholder="ID"
            className='login-id-input'
          />
        </div>
        <div className="input-group">
          <label htmlFor="password"><img src={lockIcon} alt="User" className="login-lock-icon" /></label>
          <input
            id="password"
            type="password"
            placeholder="PASSWORD"
            className='login-pw-input'
          />
        </div>
        <button type="submit" className="login-button">Sign In</button>
        <div className="options">
          <FindModal />
          <a className="signup-button">Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default SignIn