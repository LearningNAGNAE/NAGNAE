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
    errors,
    handleIdCheck,
    passwordConfirm,
    isEmailVerified,
    handleNationalityChange,
    handleNationalitySelectChange,
    isNationalityInputEditable
  } = useSignUpForm();

  return (
    <div className="join-nagnae-container">
      <div className="form-content">
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
                  placeholder="DOMAIN"
                  readOnly={!isInputEditable}
                  onKeyDown={handleKeyDown}
                />
                <select id="email-select" onChange={handleSelectChange}>
                  <option value="">Select Domain</option>
                  <option value="@naver.com">naver.com</option>
                  <option value="@gmail.com">gmail.com</option>
                  <option value="@nate.com">nate.com</option>
                  <option value="EnterManually">Enter Manually</option>
                </select>
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
              <div className='id-check-box'>
                <button 
                  type="button"
                  className={`id-check-btn ${isEmailVerified ? 'verified' : ''}`}
                  onClick={handleIdCheck}
                >
                  {isEmailVerified ? 'Duplicate Check' : 'Duplicate Check'}
                </button>
              </div>
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
                type="password"
                name="passwordConfirm"
                placeholder="PASSWORD CHECK"
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
              <div className="nationality-input-group">
                <input
                  type="text"
                  name="nationlity"
                  placeholder="NATIONLITY"
                  value={formData.nationlity}
                  onChange={handleNationalityChange}
                  readOnly={!isNationalityInputEditable}
                />
                <select onChange={handleNationalitySelectChange}>
                  <option value="">Select Nationality</option>
                  <option value="United States">United States</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Canada">Canada</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Russia">Russia</option>
                  <option value="Australia">Australia</option>
                  <option value="Spain">Spain</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Poland">Poland</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Austria">Austria</option>
                  <option value="Norway">Norway</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Israel">Israel</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Finland">Finland</option>
                  <option value="Greece">Greece</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Romania">Romania</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Chile">Chile</option>
                  <option value="Peru">Peru</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Morocco">Morocco</option>
                  <option value="EnterManually">Enter Manually</option>
                </select>
              </div>
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
            <div className='create-account-btn-box'>
              <button type="submit" className="create-account-btn">Create Account</button>
              {errors.form && <span className="error-message">{errors.form}</span>}
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;