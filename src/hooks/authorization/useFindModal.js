import { useState } from 'react';
import { sendEmailId, sendEmailPw } from '../../contexts/authorization/FindModalApi';

export const useFindModal = () => {
  const [findIdData, setFindIdData] = useState({
    name: '',
    hp: '',
    send_email: '',
  });

  const [findPwData, setFindPwData] = useState({
    id: '',
    hp: '',
    send_email: '',
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

  const handleFindId = async () => {  // e 파라미터 제거
    try {
      const emailData = {
        to: findIdData.send_email,
        subject: 'Your ID Recovery',
        text: ``,
        username: findIdData.name,
        userhp: findIdData.hp
      };
      await sendEmailId(emailData);
      alert('ID recovery email sent successfully!');
    } catch (error) {
      alert('Failed to send ID recovery email. Please try again.');
    }
  };
  

  const handleFindPw = async () => {  // e 파라미터 제거
    try {
      const emailData = {
        to: findPwData.send_email,
        subject: 'Your Password Recovery',
        text: ``,
        userid: findPwData.id,
        username: findPwData.name,
        userhp: findPwData.hp,
        email: findPwData.send_email,
      };
      await sendEmailPw(emailData);
      alert('Password recovery email sent successfully!');
    } catch (error) {
      alert('Failed to send password recovery email. Please try again.');
    }
  };

  const handleIdSubmit = (e) => {
    e.preventDefault();
    handleFindId();
  };

  const handlePwSubmit = (e) => {
    e.preventDefault();
    handleFindPw();
  };

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'id') {
        handleFindId();
      } else if (type === 'pw') {
        handleFindPw();
      }
    }
  };

  return {
    findIdData,
    findPwData,
    handleIdChange,
    handlePwChange,
    handleIdSubmit,
    handlePwSubmit,
    handleKeyDown
  };
};