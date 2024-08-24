import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBoard_PostModify } from "../../../hooks/board/useBoard_PostModify.js";
import "../../../assets/styles/board/Community/Comm_PostForm.scss";
import Editor from "../BoardQuillCustum.js";
import "react-quill/dist/quill.snow.css";
import { PostModifyAPIProvider } from "../../../contexts/board/Board_PostModifyApi.js";

function PostFormContent() {
  const { title, setTitle, handleUpdate, handleImageUpload } =useBoard_PostModify();
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getContents();
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    const content = quillRef.current.getContents();
    if (
      !content.ops ||
      content.ops.length === 0 ||
      (content.ops.length === 1 && content.ops[0].insert.trim() === "")
    ) {
      alert("내용을 입력해주세요.");
      return;
    }

    handleUpdate(title, content);
  };

  return (
    <div className="comm-form-container">
      <div className="comm-form-wrap">
        <h1 className="comm_h1">Community</h1>
        <form onSubmit={onSubmit}>
          <div className="comm-input-box">
            <div className="comm-input-group">
              <label className="comm-write-title" htmlFor="comm-title">
                Title
              </label>
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
                placeholder="내용을 입력하세요..."
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>
          <div className="comm-list-write-btn">
            <button type="submit" className="comm-submit-button">
              Write
            </button>
            <Link className="comm-link-btn" to="/BoardPage?type=Comm_PostList">
              List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Comm_PostForm() {
  return (
    <PostModifyAPIProvider>
      <PostFormContent />
    </PostModifyAPIProvider>
  );
}

export default Comm_PostForm;
