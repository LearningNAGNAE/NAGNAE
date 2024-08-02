// src/components/PostForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Infomation/Info_PostForm.scss';

function Info_PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, date: new Date().toISOString().split('T')[0], hits: 0 });
    setTitle('');
    setContent('');
  };

  return (
    <div className="info-form-container">
      <div className='info-form-wrap'>
        <h1 className='info_h1'>Information</h1>
        <form>
          <div className='info-input-box'>
            <div className="info-input-group">
              <label className='info-write-title' htmlFor="info-title">title</label>
              <input id="info-title" type="text" />
            </div>
            
            <div className="info-input-group">
              <textarea placeholder='글쓰기 에디터 api 시간나면...' id="info-content" />
            </div>
          </div>
          <div className='info-list-write-btn'>
            <button type="submit" className="info-submit-button">Write</button>
            <Link className='info-link-btn' to="/BoardPage?type=Info_PostList">List</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Info_PostForm;