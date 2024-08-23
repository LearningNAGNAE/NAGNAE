import React from 'react';
import { useSignUpForm } from '../../hooks/authorization/useSignUpForm';
import '../../assets/styles/style.scss';

function SignUp() {
  const { 
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
  } = useSignUpForm();

  return (
    <div className="join-nagnae-container">
      <h1 className='join-title'>JOIN NAGNAE</h1>

      <div className="profile-picture">
        <label htmlFor="file-upload" className="picture-placeholder">
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl ? (
            <img className='user-profile-img' src={previewUrl} alt="Profile preview" />
          ) : (
            <span>picture</span>
          )}
        </label>
      </div>

      <form onSubmit={handleSubmit} className='join-form-box'>
        <div className="input-row">
          <div className="input-group">
            <input
              type="text"
              name="email"
              id="email-id"
              placeholder="EMAIL"
              value={emailId}
              onChange={handleChange}
            />
            <div>
              <input
                className='email-selectbox-text'
                type="text" 
                value={emailDomain} 
                onChange={handleEmailDomainChange} 
                placeholder="EMAIL ADDRESS"
                readOnly={!isInputEditable}
                onKeyDown={handleKeyDown}
              />
              <select id="email-select" onChange={handleSelectChange}>
                <option value="">주소를 선택하세요.</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@nate.com">@nate.com</option>
                <option value="EnterManually">Enter Manually</option>
              </select>
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="NAME"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="text"
              name="nationlity"
              placeholder="NATIONLITY"
              value={formData.nationlity}
              onChange={handleChange}
            />
            {errors.nationlity && <span className="error-message">{errors.nationlity}</span>}
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="tel"
              name="userhp"
              placeholder="HP"
              value={formData.userhp}
              onChange={handleChange}
            />
            {errors.userhp && <span className="error-message">{errors.userhp}</span>}
          </div>
        </div>

        <button type="submit" className="create-account-btn">Create Account</button>
        {errors.form && <span className="error-message">{errors.form}</span>}
      </form>
    </div>
  );
}

export default SignUp;