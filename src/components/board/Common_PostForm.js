import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardQuillCustom from "../board/BoardQuillCustum";
import "react-quill/dist/quill.snow.css";

function CommonPostForm({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  handleImageUpload,
  formType,
  listPageUrl,
  cssClasses,
}) {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor();
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    const content = quillRef.current.getEditor().editor.delta
    console.log(content)
    handleSubmit(title, content);
  };

  return (
    <div className={cssClasses.formContainer}>
      <div className={cssClasses.formWrap}>
        <h1 className={cssClasses.h1}>{formType}</h1>
        <form onSubmit={onSubmit}>
          <div className={cssClasses.inputBox}>
            <div className={cssClasses.inputGroup}>
              <label
                className={cssClasses.writeTitle}
                htmlFor={cssClasses.titleId}
              >
                Title
              </label>
              <input
                id={cssClasses.titleId}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={cssClasses.inputGroup}>
              <BoardQuillCustom
                ref={quillRef}
                defaultValue={content}
                onTextChange={(value) => setContent(value)}
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>
          <div className={cssClasses.listWriteBtn}>
            <button type="submit" className={cssClasses.submitButton}>
              {formType.includes("Modify") ? "Update" : "Write"}
            </button>
            <Link className={cssClasses.linkBtn} to={listPageUrl}>
              List
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommonPostForm;