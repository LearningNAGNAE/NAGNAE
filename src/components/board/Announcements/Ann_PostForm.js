import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/board/Announcements/Ann_PostForm.scss";
import Editor from "../../board/BoardQuillCustum.js";
import "react-quill/dist/quill.snow.css";
import { AnnPostFormAPIProvider } from "../../../contexts/board/Board_Ann_PostFormApi";
import { useBoard_Ann_PostForm } from "../../../hooks/board/useBoard_Ann_PostForm";

function AnnPostFormContent() {
  const { title, setTitle, handleSubmit, handleImageUpload } =
    useBoard_Ann_PostForm();
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

    handleSubmit(title, content);
  };

  return (
    <div className="ann-form-container">
      <div className="ann-form-wrap">
        <h1 className="ann_h1">Announcements</h1>
        <form onSubmit={onSubmit}>
          <div className="ann-input-box">
            <div className="ann-input-group">
              <label className="ann-write-title" htmlFor="ann-title">
                Title
              </label>
              <input
                id="ann-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="ann-input-group">
              <Editor
                ref={quillRef}
                placeholder="내용을 입력하세요..."
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>
          <div className="ann-list-write-btn">
            <button type="submit" className="ann-submit-button">
              Write
            </button>
            <Link className="ann-link-btn" to="/BoardPage?type=Ann_PostList">
              List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Ann_PostForm() {
  return (
    <AnnPostFormAPIProvider>
      <AnnPostFormContent />
    </AnnPostFormAPIProvider>
  );
}

export default Ann_PostForm;
