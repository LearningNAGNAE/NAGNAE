// useSignUpForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../contexts/authorization/SignUpApi';

export function useSignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    nationlity: '',
    userhp: '',
    fileno: null
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
        fileno: file
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
      const signUpInfo = await signUp(formData);

      console.log('회원가입 정보:', signUpInfo);
      navigate('/SignPage?type=signin');
    } catch (err) {
      setError('빈 칸이 있습니다. 확인해주세요');
    }

    

    navigate('/SignPage?type=signin');
  };

  return { formData, previewUrl, handleChange, handleFileChange, handleSubmit };
}