import React from "react";
import { useBoard_PostForm } from "../../../hooks/board/useBoard_PostForm";
import { PostFormAPIProvider } from "../../../contexts/board/Board_PostFormApi";
import CommonPostForm from "../Common_PostForm";
import "../../../assets/styles/board/Community/Comm_PostForm.scss";

function Comm_PostForm() {
  const {
    title,
    setTitle,
    content,
    setContent,
    handleSubmit,
    handleImageUpload,
  } = useBoard_PostForm();

  const cssClasses = {
    formContainer: "comm-form-container",
    formWrap: "comm-form-wrap",
    h1: "comm_h1",
    inputBox: "comm-input-box",
    inputGroup: "comm-input-group",
    writeTitle: "comm-write-title",
    titleId: "comm-title",
    listWriteBtn: "comm-list-write-btn",
    submitButton: "comm-submit-button",
    linkBtn: "comm-link-btn",
  };

  return (
    <PostFormAPIProvider>
      <CommonPostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        formType="Community"
        listPageUrl="/BoardPage?type=Comm_PostList"
        cssClasses={cssClasses}
      />
    </PostFormAPIProvider>
  );
}

export default Comm_PostForm;
