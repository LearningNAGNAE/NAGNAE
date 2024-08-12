// useSignUpForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    user_name: '',
    nationality: '',
    hp: '',
    profilePicture: null 
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();


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
        profilePicture: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // 여기에 회원가입 로직을 추가하세요











    

    navigate('/');
  };

  return { formData, previewUrl, handleChange, handleFileChange, handleSubmit };
}