import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBoardComm_PostForm } from '../../../hooks/board/useBoardComm_PostForm';
import '../../../assets/styles/board/Community/Comm_PostForm.scss';
import Editor from '../../board/BoardQuillCustum.js';
import 'react-quill/dist/quill.snow.css';
import { PostFormAPIProvider } from '../../../contexts/board/Board_Comm_PostFormApi.js';

function PostFormContent() {
  const { title, setTitle, handleSubmit, handleImageUpload } = useBoardComm_PostForm();
  const quillRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const content = quillRef.current.getContents();
    handleSubmit(title, content);
  };

  return (
    <div className="comm-form-container">
      <div className='comm-form-wrap'>
        <h1 className='comm_h1'>Community</h1>
        <form onSubmit={onSubmit}>
          <div className='comm-input-box'>
            <div className="comm-input-group">
              <label className='comm-write-title' htmlFor="comm-title">Title</label>
              <input 
                id="comm-title" 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="comm-input-group">
              <Editor 
                ref={quillRef}
                placeholder='내용을 입력하세요...'
                onImageUpload={handleImageUpload}
              />
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

function Comm_PostForm() {
  return (
    <PostFormAPIProvider>
      <PostFormContent />
    </PostFormAPIProvider>
  );
}

export default Comm_PostForm;
