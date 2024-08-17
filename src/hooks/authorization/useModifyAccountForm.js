// useSignUpForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modifyAccount } from '../../contexts/authorization/ModifyAccountApi';

export function useModifyAccountForm() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))

  const [formData, setFormData] = useState({
    userno: userData.apiData.userno,
    email: userData.apiData.email,
    fileno: userData.apiData.fileno,
    password: '',
    username: '',
    nationlity: '',
    userhp: '',
    file: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { className, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [className]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        file: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // 여기에 회원가입 로직을 추가하세요
    setError('');
    try {
      const ModifyInfo = await modifyAccount(formData);

      console.log('회원정보 수정:', ModifyInfo);
      navigate('/');
    } catch (err) {
      setError('빈 칸이 있습니다. 확인해주세요');
    }

  };

  return { formData, previewUrl, handleChange, handleFileChange, handleSubmit };
}