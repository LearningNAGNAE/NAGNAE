import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import fetchData from '../contexts/apiService'; // fetchData 함수 가져오기
import { Link } from 'react-router-dom';

function Header() {
  const isAuthenticated = useAuth();


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
    <div>

      <Link to={'/'}>Home</Link>
      <Link to={'/ContactPage'}>ContactPage</Link>
      <Link to={'/AboutPage'}>AboutPage</Link>


      {/* 데이터를 사용하는 UI 구현 */}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      
    </div>
  );
}

export default Header;
