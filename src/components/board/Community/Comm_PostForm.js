// src/components/PostForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/board/Community/Comm_PostForm.scss';

function Comm_PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, date: new Date().toISOString().split('T')[0], hits: 0 });
    setTitle('');
    setContent('');
  };

  return (
    <div className="comm-form-container">
      <div className='comm-form-wrap'>
        <h1 className='comm_h1'>Community</h1>
        <form>
          <div className='comm-input-box'>
            <div className="comm-input-group">
              <label className='comm-write-title' htmlFor="comm-title">title</label>
              <input id="comm-title" type="text" />
            </div>
            
            <div className="comm-input-group">
              <textarea placeholder='글쓰기 에디터 api 시간나면...' id="comm-content" />
            </div>
          </div>
          <div className='comm-list-write-btn'>
            <button type="submit" className="comm-submit-button">Write</button>
            <Link className='comm-link-btn' to="/BoardPage?type=Comm_PostList">List</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Comm_PostForm;