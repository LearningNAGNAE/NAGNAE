import React from "react";
import { useBoard_PostModify } from "../../../hooks/board/useBoard_PostModify";
import { PostModifyAPIProvider } from "../../../contexts/board/Board_PostModifyApi";
import CommonPostForm from "../Common_PostForm";
import "../../../assets/styles/board/Community/Comm_PostForm.scss";

function PostFormModify() {
  const {
    title,
    setTitle,
    content,
    setContent,
    handleUpdate,
    handleImageUpload,
    loading,
    error,
    userData,
    quillRef,
  } = useBoard_PostModify();

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

  if (loading) {
    return <div className="comm-loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="comm-error">오류 발생: {error}</div>;
  }

  if (!userData) {
    return (
      <div className="comm-error">
        사용자 데이터가 없습니다. 다시 로그인해주세요.
      </div>
    );
  }

  return (
    <CommonPostForm
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      handleSubmit={handleUpdate}
      handleImageUpload={handleImageUpload}
      formType="Modify Community Post"
      listPageUrl="/BoardPage?type=Comm_PostList"
      cssClasses={cssClasses}
      quillRef={quillRef}
    />
  );
}

function Comm_PostModify() {
  return (
    <PostModifyAPIProvider>
      <PostFormModify />
    </PostModifyAPIProvider>
  );
}

export default Comm_PostModify;