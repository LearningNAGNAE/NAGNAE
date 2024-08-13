import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../redux/actions/AuthActions';
import { loginUser } from '../../contexts/authorization/AuthorizationApi';
import { useNavigate } from 'react-router-dom';

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 60분을 밀리초로 변환

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setAuthToken = (token) => {
    const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
    dispatch(setToken(token));
  };

  const getAuthToken = () => {
    const token = sessionStorage.getItem('token');
    const expiration = sessionStorage.getItem('tokenExpiration');
    
    if (!token || !expiration) {
      return null;
    }

    if (new Date().getTime() > parseInt(expiration)) {
      // 토큰이 만료되었으면 제거
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');
      dispatch(clearToken());
      return null;
    }

    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { token, userData } = await loginUser(email, password);
      setAuthToken(token);
      sessionStorage.setItem('userData', JSON.stringify(userData)); // 사용자 데이터 저장
      console.log('저장된 토큰:', token);
      console.log('저장된 사용자 데이터:', userData);
      navigate(-2);
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    getAuthToken
  };
};
