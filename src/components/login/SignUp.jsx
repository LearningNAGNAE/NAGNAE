// SignUp.js
import React from 'react';
import { useSignUpForm } from '../../hooks/authorization/useSignUpForm';

function SignUp() {
  const { formData, previewUrl, handleChange, handleFileChange, handleSubmit } = useSignUpForm();

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
              className="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="text"
              className="user_name"
              placeholder="NAME"
              value={formData.user_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="password"
              className="password"
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
              className="nationality"
              placeholder="NATIONALITY"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <input
              type="tel"
              className="hp"
              placeholder="HP"
              value={formData.hp}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="create-account-btn">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp;