import { useState } from 'react';

export const useFindModal = () => {
  const [findIdData, setFindIdData] = useState({
    name: '',
    hp: '',
    email: '',
    foreignerNumber: ''
  });

  const [findPwData, setFindPwData] = useState({
    id: '',
    hp: '',
    email: '',
    name: ''
  });

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setFindIdData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setFindPwData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFindId = (e) => {
    e.preventDefault();
    console.log('Find ID with:', findIdData);
    alert('ID: luuu');
    // ID 찾기 로직 구현
  };

  const handleFindPw = (e) => {
    e.preventDefault();
    console.log('Find PW with:', findPwData);
    alert('PW: 3213');
    // 비밀번호 찾기 로직 구현
  };

  return {
    findIdData,
    findPwData,
    handleIdChange,
    handlePwChange,
    handleFindId,
    handleFindPw
  };
};