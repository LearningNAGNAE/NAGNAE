// SignUp.js
import React from 'react';
import { useModifyAccountForm } from '../../hooks/authorization/useModifyAccountForm';
import '../../assets/styles/style.scss';
// import user_img from '../../assets/images/img/1723902099215a950f7ed-4993-4b93-a8c1-5b57874997ee.png';

function ModifyAccount() {
  const { formData, previewUrl, handleChange, handleFileChange, handleSubmit } = useModifyAccountForm();
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const savenameinfo = userData.apiData.savename;
  

  return (
    <div className="join-nagnae-container">
      <h1 className='join-title'>Modify NAGNAE</h1>
      
      <div className="profile-picture">
        <label htmlFor="file-upload" className="picture-placeholder">
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl ? (
            <img className='user-profile-img' src={previewUrl} alt="Profile preview" />
          ) : (
            (() => {
              if (savenameinfo != null) {
                return <img className='user-profile-img' src={require(`../../assets/images/profile/${savenameinfo}`)} alt="Profile preview" />;
              } else {
                return <span>picture</span>;
              }
            })()
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
              type="text"
              className="username"
              placeholder="NAME"
              value={formData.username}
              onChange={handleChange}
            />
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
          </div>
        </div>

        <button type="submit" className="create-account-btn">Modify Account</button>
      </form>
    </div>
  );
}

export default ModifyAccount;