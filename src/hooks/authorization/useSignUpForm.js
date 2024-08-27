// useSignUpForm.js
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, checkIdDuplicate } from '../../contexts/authorization/SignUpApi';

export function useSignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    nationlity: '',
    userhp: '',
    file: null
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [isInputEditable, setIsInputEditable] = useState(true);
  const [errors, setErrors] = useState({});
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNationalityInputEditable, setIsNationalityInputEditable] = useState(false);

  // 이메일 입력 필드가 변경될 때마다 isEmailVerified를 false로 설정
  useEffect(() => {
    setIsEmailVerified(false);
  }, [emailId, emailDomain]);

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
      // 영문자와 숫자만 허용하는 정규표현식
      const emailIdRegex = /^[a-zA-Z0-9]*$/;
      if (emailIdRegex.test(value)) {
        setEmailId(value);
      }
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value.replace(/\s/g, ''));
    } else {
      // 공백을 제거한 값
      const trimmedValue = value.replace(/\s/g, '');
      setFormData(prevState => ({
        ...prevState,
        [name]: trimmedValue
      }));
    }
  };

  const handleNationalityChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      nationlity: value
    }));
  };
  const handleNationalitySelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'EnterManually') {
      setFormData(prevState => ({
        ...prevState,
        nationlity: ''
      }));
      setIsNationalityInputEditable(true);
    } else {
      setFormData(prevState => ({
        ...prevState,
        nationlity: selectedValue
      }));
      setIsNationalityInputEditable(false);
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

  const handleEmailDomainChange = (event) => {
    let value = event.target.value;
    // '@'로 시작하지 않으면 추가
    if (!value.startsWith('@')) {
      value = '@' + value;
    }
    // '@' 이후의 문자열만 정규식으로 검사
    const domainPart = value.slice(1);
    // 영문자, 숫자, '.'만 허용하는 정규식
    const domainRegex = /^[a-z0-9.]*$/;
    // '..'이 포함되어 있는지 확인
    const noDotDotRegex = /\.{2,}/;
    if (domainRegex.test(domainPart) && !noDotDotRegex.test(domainPart)) {
      setEmailDomain(value);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
    return regex.test(password);
  };
  
  const validateForm = () => {
    let tempErrors = {};
    if (!emailId) tempErrors.email = "이메일 아이디를 입력해주세요.";
    if (!emailDomain) tempErrors.email = "이메일 도메인을 선택하거나 입력해주세요.";
    if (!/^[a-zA-Z0-9]+$/.test(emailId)) tempErrors.email = "이메일 아이디는 영문자와 숫자만 사용할 수 있습니다.";
    if (!/^@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/.test(emailDomain)) tempErrors.email = "유효하지 않은 이메일 도메인입니다.";
    if (!isEmailVerified) tempErrors.email = "이메일 중복 확인을 해주세요.";
    if (!formData.password) {
      tempErrors.password = "비밀번호를 입력해주세요.";
    } else if (!validatePassword(formData.password)) {
      tempErrors.password = "비밀번호는 6자리 이상이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";
    }
    if (!passwordConfirm) tempErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
    if (formData.password !== passwordConfirm) tempErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
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

  const handleIdCheck = async (e) => {
    e.preventDefault();
    console.log("ID 중복확인:", formData.email);
    
    if (!formData.email) {
      setErrors({ email: '이메일을 입력해주세요.' });
      return;
    }
  
    try {
      const isAvailable = await checkIdDuplicate(formData.email);
      if (!isAvailable) {
        console.log("사용 가능한 이메일입니다.");
        setErrors({ email: '사용 가능합니다.' });
        setIsEmailVerified(true);  // 이메일 확인 완료
      } else {
        console.log("이미 사용 중인 이메일입니다.");
        setErrors({ email: '이미 사용 중인 이메일입니다.' });
        setIsEmailVerified(false);  // 이메일 확인 실패
      }
    } catch (err) {
      console.error("ID 중복 확인 중 오류 발생:", err);
      setErrors({ email: 'ID 중복 확인 중 오류가 발생했습니다.' });
      setIsEmailVerified(false);  // 오류 발생 시 확인 실패
    }
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
    errors,
    handleIdCheck,
    passwordConfirm,
    isEmailVerified,
    handleNationalityChange,
    handleNationalitySelectChange,
    isNationalityInputEditable
  };
}