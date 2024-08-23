// useSignUpForm.js
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../contexts/authorization/SignUpApi';

export function useSignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    nationlity: '',
    userhp: '',
    file: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isInputEditable, setIsInputEditable] = useState(true);
  const [errors, setErrors] = useState({});
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');

  useEffect(() => {
    // 이메일 아이디와 도메인을 합쳐서 formData의 email 필드에 저장
    setFormData(prev => ({
      ...prev,
      email: emailId && emailDomain ? `${emailId}${emailDomain}` : ''
    }));
  }, [emailId, emailDomain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmailId(value);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
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

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "이메일을 입력해주세요.";
    if (!formData.password) tempErrors.password = "비밀번호를 입력해주세요.";
    if (!formData.username) tempErrors.username = "이름을 입력해주세요.";
    if (!formData.nationlity) tempErrors.nationlity = "국적을 입력해주세요.";
    if (!formData.userhp) tempErrors.userhp = "전화번호를 입력해주세요.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const signUpInfo = await signUp(formData);
        console.log('회원가입 정보:', signUpInfo);
        navigate('/SignPage?type=signin');
      } catch (err) {
        setErrors({ form: '회원가입 중 오류가 발생했습니다.' });
      }
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'EnterManually') {
      setEmailDomain('@');  // 직접 입력 시 '@'를 기본값으로 설정
      setIsInputEditable(true);
    } else {
      setEmailDomain(selectedValue);
      setIsInputEditable(false);
    }
  };

  const handleEmailDomainChange = (event) => {
    let value = event.target.value;
    if (!value.startsWith('@')) {
      value = '@' + value;  // 항상 '@'로 시작하도록 보장
    }
    setEmailDomain(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return { 
    formData, 
    emailId,
    emailDomain,
    previewUrl, 
    handleChange, 
    handleFileChange, 
    handleSubmit,
    isInputEditable,
    handleSelectChange,
    handleEmailDomainChange,
    handleKeyDown,
    errors
  };
}