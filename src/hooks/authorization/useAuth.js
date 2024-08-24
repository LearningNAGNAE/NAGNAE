import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../redux/actions/AuthActions';
import { loginUser, sendTokenToBackend } from '../../contexts/authorization/AuthorizationApi';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd'; // Form을 import 합니다.

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 60분을 밀리초로 변환

export const useAuth = () => {
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('rememberedPassword') || '');
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('rememberedEmail') && localStorage.getItem('rememberedPassword');
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Form 인스턴스를 생성합니다.

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

    // Form 초기값 설정
    form.setFieldsValue({
      email: email,
      password: password,
      remember: rememberMe
    });
  }, [rememberMe, email, password, form]);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    // values 객체에 폼 데이터가 포함되어 있습니다
    handleSubmit({ preventDefault: () => {} }); // 이벤트 객체를 모방합니다
  };

  const onSuccess = (credentialResponse) => {
    console.log("Login Success: ", credentialResponse);
    googlehandleSubmit(credentialResponse.credential);
  };

  const onFailure = () => {
    console.log("Login failed");
  };

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
      sessionStorage.setItem('userData', JSON.stringify(userData));

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      navigate('/');
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  const googlehandleSubmit = async (tokenId) => {
    setError('');
    try {
      const { token, userData } = await sendTokenToBackend(tokenId);
      console.log('Success:', userData);
      if (userData.apiData.newUser) {
        // 새 사용자인 경우 추가 정보 입력 페이지로 이동
        setAuthToken(token);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        console.log('저장된 토큰:', token);
        console.log('저장된 사용자 데이터:', userData);
        navigate('/');
      } else {
        // 기존 사용자인 경우 JWT 토큰 저장 및 홈페이지로 이동
        setAuthToken(token);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        console.log('저장된 토큰:', token);
        console.log('저장된 사용자 데이터:', userData);
        navigate('/');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Google 로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };





  

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    getAuthToken,
    isModalVisible,
    handleModalOpen,
    handleModalClose,
    onFinish,
    onSuccess,
    onFailure,
    rememberMe,
    setRememberMe,
    form
  };
};
