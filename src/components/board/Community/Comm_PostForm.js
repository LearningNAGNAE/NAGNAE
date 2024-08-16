// PostFormContent.js
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePostForm } from '../../../hooks/board/useBoardComm_PostForm.js';
import '../../../assets/styles/board/Community/Comm_PostForm.scss';
import QuillToolbar from '../BoardQuillCustum.js';
import 'react-quill/dist/quill.snow.css';
import { PostFormAPIProvider } from '../../../contexts/board/Board_Comm_PostFormApi.js';

function PostFormContent() {
  const { title, setTitle, handleSubmit, handleImageUpload } = usePostForm();
  const quillRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const quillContent = quillRef.current ? quillRef.current.root.innerHTML : '';
    handleSubmit(title, quillContent);
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
              <QuillToolbar 
                ref={quillRef}
                modules={{
                  toolbar: {
                    container: '#toolbar',
                    handlers: {
                      image: () => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.click();
                        input.onchange = async () => {
                          const file = input.files[0];
                          const url = await handleImageUpload(file);
                          if (url) {
                            const quill = quillRef.current.getEditor();
                            const range = quill.getSelection(true);
                            quill.insertEmbed(range.index, 'image', url);
                          }
                        };
                      }
                    }
                  }
                }}
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
    <PostFormAPIProvider>
      <PostFormContent />
    </PostFormAPIProvider>
  );
}

export default Comm_PostForm;
