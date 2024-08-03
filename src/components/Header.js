import React, { useEffect, useState } from 'react';
// import useAuth from '../hooks/useAuth';
// import fetchData from '../contexts/apiService'; // fetchData 함수 가져오기
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Header() {
  // const isAuthenticated = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const showNavLink = () => setIsVisible(true);
  const hideNavLink = () => setIsVisible(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // 인증된 경우에만 fetchData 함수 호출
  //     fetchData()
  //       .then(data => {
  //         setData(data);
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         setError(error.message);
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //     setError('User not authenticated');
  //   }
  // }, [isAuthenticated]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;







  
  return (
    // <div>

    //   <Link to={'/'}>Home</Link>
    //   <Link to={'/ContactPage'}>ContactPage</Link>
    //   <Link to={'/AboutPage'}>AboutPage</Link>


    //   {/* 데이터를 사용하는 UI 구현 */}
    //   <ul>
    //     {data.map(item => (
    //       <li key={item.id}>{item.name}</li>
    //     ))}
    //   </ul>

      
    // </div>
    <header className="nagnae_header">
      <div className='header-content' 
          onMouseEnter={showNavLink}>
        <div className="logo-container">
          <img src={logo} alt="logo" className="header-logo" />
          <a className='logo' href='/'>NAGNAE</a>
        </div>
        <nav>
          <Link className='sign_up' to="/SignPage?type=signup">Sign Up</Link>
          <Link className='sign_in' to="/SignPage?type=signin">Sign in</Link>
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
      </div>
    </header>
  );
}

export default Header;
