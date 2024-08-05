import React from 'react';
import { useAuth } from '../../hooks/authorization/useAuth';
import '../../assets/styles/style.scss';

function SignIn() {
  const { email, setEmail, password, setPassword, error, handleSubmit } = useAuth();

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default SignIn;