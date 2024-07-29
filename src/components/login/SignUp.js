import React, { useState } from 'react'
import '../../assets/styles/login/SignUp.scss';

function SignUp() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nationality: '',
    birthDate: '',
    hp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 여기에 회원가입 로직을 추가하세요
  };

  return (
    <div className="join-nagnae-container">
      <h1 className='join-title'>JOIN NAGNAE</h1>
      
      <div className="profile-picture">
        <div className="picture-placeholder">picture</div>
      </div>

      <form onSubmit={handleSubmit} className='join-form-box'>
        <div className="input-row">
          <div className="input-group">
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <input
              type="text"
              name="nationality"
              placeholder="NATIONALITY"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              name="birthDate"
              placeholder="birth date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <input
              type="tel"
              name="hp"
              placeholder="HP"
              value={formData.hp}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="create-account-btn">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp