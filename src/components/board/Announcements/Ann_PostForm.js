// src/components/PostForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Announcements/Ann_PostForm.scss';

function Ann_PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, date: new Date().toISOString().split('T')[0], hits: 0 });
    setTitle('');
    setContent('');
  };

  return (
    <div className="ann-form-container">
      <div className='ann-form-wrap'>
        <h1 className='ann_h1'>Announcements</h1>
        <form>
          <div className='ann-input-box'>
            <div className="ann-input-group">
              <label className='ann-write-title' htmlFor="ann-title">title</label>
              <input id="ann-title" type="text" />
            </div>
            
            <div className="ann-input-group">
              <textarea placeholder='글쓰기 에디터 api 시간나면...' id="ann-content" />
            </div>
          </div>
          <div className='ann-list-write-btn'>
            <button type="submit" className="ann-submit-button">Write</button>
            <Link className='ann-link-btn' to="/BoardPage?type=Ann_PostList">List</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Ann_PostForm;