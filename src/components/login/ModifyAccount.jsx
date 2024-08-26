import React from 'react';
import { useModifyAccountForm } from '../../hooks/authorization/useModifyAccountForm';
import '../../assets/styles/style.scss';
import { useSelector } from 'react-redux';

function ModifyAccount() {
  const { formData, passwordConfirm, previewUrl, handleChange, handleFileChange, handleSubmit, errors } = useModifyAccountForm();
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const savenameinfo = userData.apiData.savename;
  const SpringbaseUrl = useSelector(state => state.url.SpringbaseUrl);
  
  return (
    <div className="modify-nagnae-container">
      <div className="form-content">
        <h1 className='modify-title'>Modify NAGNAE</h1>
        
        <div className="profile-picture">
          <label htmlFor="file-upload" className="picture-placeholder">
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl ? (
              <img className='user-profile-img' src={previewUrl} alt="Profile preview" />
            ) : (
              (() => {
                if (savenameinfo != null) {
                  return <img className='user-profile-img' src={`${SpringbaseUrl}/upload/${savenameinfo}`} alt="Profile preview" />;
                } else {
                  return <span>picture</span>;
                }
              })()
            )}
          </label>
        </div>

        <form onSubmit={handleSubmit} className='modify-form-box'>
          <div className="input-row">
            <div className="input-group">
              <input
                type="text"
                className="email"
                placeholder="EMAIL"
                value={formData.email}
                disabled
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
                type="password"
                className="passwordConfirm"
                placeholder="PASSWORD CONFIRM"
                value={passwordConfirm}
                onChange={handleChange} 
              />
              {errors.passwordConfirm && <span className="error-message">{errors.passwordConfirm}</span>}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <input
                type="text"
                className="username"
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
                className="nationlity"
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
                className="userhp"
                placeholder="HP"
                value={formData.userhp}
                onChange={handleChange}
              />
              {errors.userhp && <span className="error-message">{errors.userhp}</span>}
            </div>
          </div>

          <button type="submit" className="create-account-btn">Modify Account</button>
          {errors.form && <span className="form-error-message">{errors.form}</span>}
        </form>
      </div>
    </div>
  );
}

export default ModifyAccount;