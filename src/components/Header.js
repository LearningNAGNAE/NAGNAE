import React, { useEffect, useState } from 'react';
// import useAuth from '../hooks/useAuth';
// import fetchData from '../contexts/apiService'; // fetchData 함수 가져오기
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/AuthActions';

function Header() {
  // const isAuthenticated = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const showNavLink = () => setIsVisible(true);
  const hideNavLink = () => setIsVisible(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  
  const handleLogout = () => {
    dispatch(logout());
    // 필요한 경우 여기에 추가 로직 (예: 홈 페이지로 리다이렉트)
  };
  
  return (
    <header className="nagnae_header">
      <div className='header-content' 
          onMouseEnter={showNavLink}>
        <div className="logo-container">
          <img src={logo} alt="logo" className="header-logo" />
          <a className='logo' href='/'>NAGNAE</a>
        </div>
        <nav>
          {token ? (
            <>
              <Link className='modify_account' to="/SignPage?type=modifyaccount">Modify Account</Link>
              <button className='sign_out' onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <>
              <Link className='sign_up' to="/SignPage?type=signup">Sign Up</Link>
              <Link className='sign_in' to="/SignPage?type=signin">Sign In</Link>
            </>
          )}
        </nav>
      </div>
      <div 
        className={`header-nav-link ${isVisible ? 'show' : ''}`}
        onMouseEnter={showNavLink}
        onMouseLeave={hideNavLink}
      >
        <Link to="/ChatBotPage">ChatBot</Link>
        <Link to="/BoardPage">Board</Link>
        <Link to="/StudyPage">Study</Link>
        <Link to="">Game</Link>
      </div>
    </header>
  );
}

export default Header;
