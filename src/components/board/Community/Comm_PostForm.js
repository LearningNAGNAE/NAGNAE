// Comm_PostForm.js
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PostFormProvider, usePostFormContext } from '../../../hooks/board/useBoardComm_PostForm.js';
import '../../../assets/styles/board/Community/Comm_PostForm.scss';
import Editor from '../BoardQuillEditor.js';
import 'react-quill/dist/quill.snow.css';


function PostFormContent() {
  const { title, setTitle, content, setContent, handleSubmit } = usePostFormContext();
  const quillRef = useRef(null);

  

  return (
    <div className="comm-form-container">
      <div className='comm-form-wrap'>
        <h1 className='comm_h1'>Community</h1>
        <form onSubmit={handleSubmit}>
          <div className='comm-input-box'>
            <div className="comm-input-group">
              <label className='comm-write-title' htmlFor="comm-title">title</label>
              <input 
                id="comm-title" 
                type="text" 
                theme="snow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="comm-input-group">
              <Editor 
              ref={quillRef}
                className='quill-editor'
                value={content}
                onChange={setContent}
                placeholder='내용을 입력하세요...'
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
    <PostFormProvider>
      <PostFormContent />
    </PostFormProvider>
  );
}

export default Comm_PostForm;