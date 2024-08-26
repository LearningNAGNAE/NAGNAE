import React from "react";
import { Link } from "react-router-dom";
import BoardQuillCustom from "../board/BoardQuillCustum";
import "react-quill/dist/quill.snow.css";

function CommonPostForm({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  formType,
  listPageUrl,
  cssClasses,
  quillRef,
}) {
  return (
    <div className={cssClasses.formContainer}>
      <div className={cssClasses.formWrap}>
        <h1 className={cssClasses.h1}>{formType}</h1>
        <form onSubmit={handleSubmit}>
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
                value={content}
                onTextChange={(value) => setContent(value)}
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