import React from 'react';
import { Link } from 'react-router-dom';
import { PostFormProvider } from '../../../contexts/board/Board_Comm_PostFormApi.js';
import { usePostFormContext } from '../../../contexts/board/Board_Comm_PostFormApi.js';
import '../../../assets/styles/board/Community/Comm_PostForm.scss';

function PostFormContent() {
  const { title, setTitle, content, setContent, handleSubmit } = usePostFormContext();

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="comm-input-group">
              <textarea 
                placeholder='글쓰기 에디터 api 시간나면...' 
                id="comm-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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